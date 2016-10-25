# == Schema Information
#
# Table name: associated_trials
#
#  id                     :integer          not null, primary key
#  trial_identifier       :string(255)
#  identifier_type_id     :integer
#  trial_id               :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#  official_title         :text
#  research_category_name :string
#
# Indexes
#
#  index_associated_trials_on_identifier_type_id  (identifier_type_id)
#  index_associated_trials_on_trial_id            (trial_id)
#

class AssociatedTrial < TrialBase
  include BasicConcerns

  belongs_to :identifier_type
  belongs_to :trial
  after_save :create_reverse

  scope :search_trial_associations, -> (trial_identifier, identifier_type_id, trial_id) {
    where(trial_identifier: trial_identifier, identifier_type_id: identifier_type_id, trial_id: trial_id)
    # where(trial_identifier: trial_identifier)
  }

  ## Audit Trail Callbacks
  #after_save :touch_trial
  #after_destroy :touch_trial

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

  def create_reverse

    @parent_trial = Trial.find_by_nci_id(self.trial_identifier) # reverse child to this parent
    # @parent_trial = Trial.with_nci_id(self.trial_identifier)
    @child_trial = Trial.find_by_id(self.trial_id) # reverse parent to this child


    if (!@parent_trial.nil? and !@child_trial.nil?)
      # Rails.logger.info "parent_trial nci_id: #{@parent_trial.nci_id}"
      # Rails.logger.info "child_trial.id: #{@child_trial.id}"

      identifier_type_id = IdentifierType.find_by_code('NCI').id
      isExisted = AssociatedTrial.search_trial_associations(@child_trial.nci_id, identifier_type_id, @parent_trial.id).count > 0

      if (!isExisted)
        # Rails.logger.info "creating a reverse trial association"
        # Rails.logger.info "parent_trial.id: #{@parent_trial.id}, child_trial.nci_id: #{@child_trial.nci_id}"

        @research_category = ResearchCategory.find_by_id(@child_trial.research_category_id)

        at = AssociatedTrial.new(trial_identifier: @child_trial.nci_id, identifier_type_id: identifier_type_id, trial_id: @parent_trial.id, official_title: @child_trial.official_title, research_category_name: @research_category.nil? ? '' : @research_category.name)
        at.save!
      else
        Rails.logger.error "reverse trial already exists!"
      end

    end

  end




end
