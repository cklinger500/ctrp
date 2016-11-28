class AddSourceToAlternateTitles < ActiveRecord::Migration
  def change
    add_column :alternate_titles, :source, :string
  end
end
