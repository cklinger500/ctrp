class AddFKsToOrganization < ActiveRecord::Migration
  def change
    add_reference :organizations, :service_request, index: true
    add_foreign_key :organizations, :service_requests

    add_reference :organizations, :ctep_org_type, index: true
    add_foreign_key :organizations, :ctep_org_types

    add_reference :organizations, :org_funding_mechanism, index: true
    add_foreign_key :organizations, :org_funding_mechanisms

  end
end
