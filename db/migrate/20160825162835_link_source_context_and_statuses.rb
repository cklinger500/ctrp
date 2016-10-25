class LinkSourceContextAndStatuses < ActiveRecord::Migration
  def change
    add_reference :source_statuses, :source_context, index: true
    add_foreign_key :source_statuses, :source_contexts
  end
end
