class AddExpectedAbstractionCompletionDateCommentsToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :expected_abstraction_completion_date_comments, :string
  end
end
