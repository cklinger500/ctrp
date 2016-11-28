json.array!(@ncit_disease_codes) do |ncit_disease_code|
  json.extract! ncit_disease_code, :id, :disease_code, :nt_term_id, :preferred_name, :menu_display_name
end
