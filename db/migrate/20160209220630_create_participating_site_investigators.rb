class CreateParticipatingSiteInvestigators < ActiveRecord::Migration
  def change
    create_table :participating_site_investigators do |t|
      t.references :participating_site, index: true
      t.references :person, index: true
      t.boolean :set_as_contact
      t.string :investigator_type, :limit => 255
      t.string :status, :limit => 255

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :participating_site_investigators, :participating_sites
    add_foreign_key :participating_site_investigators, :people
  end
end
