p @organization.created_at
p @organization.updated_at

json.extract! @organization, :id, :source_id, :name, :address, :address2, :city, :state_province, :postal_code,
              :country, :email, :phone, :fax, :ctrp_id, :source_context_id, :source_status_id, :created_at, :updated_at,
              :families, :name_aliases,:created_by, :updated_by, :ctep_id, :cluster, :uuid, :lock_version






