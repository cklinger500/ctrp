module MigrationHelper
  def ctrp_base_columns
    column :uuid, :string, :limit => 255
    column :lock_version, :integer, default: 0
  end

  def static_member_base_columns
    column :code, :string, :limit => 255
    column :name, :string, :limit => 255
  end
end

ActiveRecord::ConnectionAdapters::TableDefinition.include(MigrationHelper)
