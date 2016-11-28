class RemoveAnatomicSiteRefFromTrials < ActiveRecord::Migration
  def change
    remove_reference :trials, :anatomic_site, index: true
  end
end
