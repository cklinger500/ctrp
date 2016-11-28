class ChangeInternalSourceTrials < ActiveRecord::Migration
  def change
    add_reference :trials, :internal_source, index: true
    add_foreign_key :trials, :internal_sources
  end
end
