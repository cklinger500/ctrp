class CreateTrialHistories < ActiveRecord::Migration
  def change
    create_table :trial_histories do |t|
      t.json :snapshot
      t.references :submission, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_histories, :submissions
  end
end
