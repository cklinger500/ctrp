# == Schema Information
#
# Table name: other_ids
#
#  id                    :integer          not null, primary key
#  protocol_id           :string(255)
#  protocol_id_origin_id :integer
#  trial_id              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  uuid                  :string(255)
#  lock_version          :integer          default(0)
#
# Indexes
#
#  index_other_ids_on_protocol_id_origin_id  (protocol_id_origin_id)
#  index_other_ids_on_trial_id               (trial_id)
#

class OtherId < TrialBase

  belongs_to :protocol_id_origin
  belongs_to :trial, touch: true

  validates :protocol_id, presence: true
  validates :protocol_id_origin, presence: true
  validates :protocol_id, length: {maximum: 30} #, if: self.protocol_id_origin_id == ProtocolIdOrigin.find_by_code('NCT').id

  scope :by_value, ->  (value) {
    joins(:protocol_id_origin).where("other_ids.protocol_id_origin_id = protocol_id_origins.id and protocol_id_origins.code = ?","#{value.to_s}")
  }

  scope :by_value_array, -> (value) {
    conditions = []
    q = ""
    value.delete('NCI')
    value.each_with_index { |e, i|
      # next if e == 'NCI'  # skip NCI, because it is not other_id
      if i == 0
        q = "other_ids.protocol_id_origin_id = protocol_id_origins.id and protocol_id_origins.code = ?" #, "#{e.to_s}"
      else
        new_q = " OR other_ids.protocol_id_origin_id = protocol_id_origins.id and protocol_id_origins.code = ?" #, "#{e.to_s}"
        q += new_q
      end
      p "e is #{e}, i is: #{i}"
      conditions.push(e)
    }
    conditions.insert(0, q)

    joins(:protocol_id_origin).where(conditions)
  }

  scope :latest, -> {
    order("updated_at DESC").first
  }

  ## Audit Trail Callbacks
  after_save :touch_trial
  after_destroy :touch_trial

  private

  def touch_trial
    find_current_user = nil
    updated_by = nil
    last_version_transaction_id = 0
    last_version = self.versions.last
    last_version_transaction_id = last_version.transaction_id if last_version
    user_id = last_version.whodunnit if last_version
    find_current_user = User.find_by_id(user_id) if user_id
    if find_current_user
      updated_by = find_current_user.username
    end
    does_trial_modified_during_this_transaction_size = 0
    does_trial_modified_during_this_transaction = TrialVersion.where("item_type= ? and transaction_id= ?","Trial", last_version_transaction_id)
    does_trial_modified_during_this_transaction_size = does_trial_modified_during_this_transaction.size if does_trial_modified_during_this_transaction
    ##If trail has been modified during the same transaction , then there is no need to update Trail again to create another version.
    if does_trial_modified_during_this_transaction_size == 0
      self.trial.update(updated_by:updated_by, updated_at:Time.now)
    end
  end

end
