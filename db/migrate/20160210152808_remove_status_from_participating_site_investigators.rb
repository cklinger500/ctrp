class RemoveStatusFromParticipatingSiteInvestigators < ActiveRecord::Migration
  def change
    remove_column :participating_site_investigators, :status, :string
  end
end
