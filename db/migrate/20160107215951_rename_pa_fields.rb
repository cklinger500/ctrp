class RenamePaFields < ActiveRecord::Migration
  def up
    remove_column :trials, :board_affiliation, :string
    add_column :trials, :board_name, :string, :limit => 255

    remove_reference :trials, :board, references: :organizations, index: true
    add_reference :trials, :board_affiliation, references: :organizations, index: true
    add_foreign_key :trials, :organizations, column: :board_affiliation_id
  end

  def down
    remove_column :trials, :board_name, :string
    add_column :trials, :board_affiliation, :string, :limit => 255

    remove_reference :trials, :board_affiliation, references: :organizations, index: true
    add_reference :trials, :board, references: :organizations, index: true
    add_foreign_key :trials, :organizations, column: :board_id
  end
end
