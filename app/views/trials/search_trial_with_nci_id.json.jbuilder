json.nct_id @search_result[:nci_id]
json.official_title @search_result[:official_title]
json.research_category @search_result[:research_category_id].nil? ? nil : ResearchCategory.find(@search_result[:research_category_id])["name"]
json.error_msg @search_result[:error_msg]