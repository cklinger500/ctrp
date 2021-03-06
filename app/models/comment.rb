# == Schema Information
#
# Table name: comments
#
#  id            :integer          not null, primary key
#  instance_uuid :string(255)
#  content       :text
#  username      :string(255)
#  fullname      :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  uuid          :string(255)
#  lock_version  :integer          default(0)
#  model         :string
#  field         :string
#  parent_id     :integer
#

class Comment < ActiveRecord::Base
  include BasicConcerns
  
  scope :matches, -> (column, value) { where("comments.#{column} = ?", "#{value}") }
end
