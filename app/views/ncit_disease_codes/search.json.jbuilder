json.diseases do
  json.array!(@diseases) do |disease|
    json.extract! disease, :id, :disease_code, :nt_term_id, :preferred_name, :menu_display_name, :ncit_status_id

    json.ncit_status do
      json.extract! disease.ncit_status, :id, :name, :code
    end

    json.ncit_disease_synonyms do
      json.array!(disease.ncit_disease_synonyms) do |synonym|
        json.extract! synonym, :id, :alternate_name
      end
    end

    json.parents do
      json.array!(disease.parents) do |parent|
        json.extract! parent, :preferred_name
      end
    end
  end
end
json.info_url AppSetting.find_by_code('NCI_THESAURUS_INFO_URL').value
json.tree_url AppSetting.find_by_code('NCI_THESAURUS_TREE_URL').value
json.start params[:start]
json.rows params[:rows]
json.total @diseases.respond_to?(:total_count) ? @diseases.total_count : @diseases.size
json.sort params[:sort]
json.order params[:order]
