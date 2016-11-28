class ChangeSubmissionColumns < ActiveRecord::Migration
  def change
    remove_reference :submissions, :organization, index: true
    remove_column :submissions, :submitter, :string
    add_reference :submissions, :user, index: true
    add_foreign_key :submissions, :users
  end
end
