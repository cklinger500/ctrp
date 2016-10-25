# == Schema Information
#
# Table name: trial_documents
#
#  id               :integer          not null, primary key
#  file             :string
#  file_name        :string(255)
#  document_type    :string(255)
#  document_subtype :string(255)
#  added_by_id      :integer
#  trial_id         :integer
#  created_at       :datetime
#  updated_at       :datetime
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  submission_id    :integer
#  status           :string           default("active")
#  why_deleted      :string
#  source_document  :string           default("Registry")
#  deleted_by       :string
#  deletion_date    :date
#
# Indexes
#
#  index_trial_documents_on_added_by_id    (added_by_id)
#  index_trial_documents_on_submission_id  (submission_id)
#  index_trial_documents_on_trial_id       (trial_id)
#

require 'test_helper'

class TrialDocumentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
