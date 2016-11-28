class AddColumnsToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :submitter, :string, :limit => 255

    add_reference :submissions, :submission_type, index: true
    add_foreign_key :submissions, :submission_types
    add_reference :submissions, :submission_source, index: true
    add_foreign_key :submissions, :submission_sources
    add_reference :submissions, :submission_method, index: true
    add_foreign_key :submissions, :submission_methods
    add_reference :submissions, :organization, index: true
    add_foreign_key :submissions, :organizations
  end
end
