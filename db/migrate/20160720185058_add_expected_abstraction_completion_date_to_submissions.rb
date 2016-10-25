class AddExpectedAbstractionCompletionDateToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :expected_abstraction_completion_date, :date
  end
end
