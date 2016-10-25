# == Schema Information
#
# Table name: ncit_interventions
#
#  id               :integer          not null, primary key
#  preferred_name   :string
#  synonyms         :string
#  definition       :text
#  ncit_status_id   :integer
#  type_code        :string
#  ct_gov_type_code :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  c_code           :string
#
# Indexes
#
#  index_ncit_interventions_on_c_code          (c_code)
#  index_ncit_interventions_on_ncit_status_id  (ncit_status_id)
#  index_ncit_interventions_on_preferred_name  (preferred_name)
#

class NcitIntervention < ActiveRecord::Base
  include BasicConcerns

  belongs_to :ncit_status

  def self.import_ncit_interventions
    ActiveRecord::Base.transaction do
      FileUtils.rm_rf('../../storage/ncit_interventions')
      FileUtils.mkdir_p('../../storage/ncit_interventions')

      NcitIntervention.delete_all
      url = AppSetting.find_by_code('NCI_THESAURUS_URL').value
      intervention_file_names = AppSetting.find_by_code('NCI_THESAURUS_INTERVENTIONS').big_value.split(',')
      act = NcitStatus.find_by_code('ACT')
      # intervention_types = ['DRUG', 'DEVI', 'BIOL', 'PROC', 'RAD', 'BEHA', 'GENE', 'DSUP', 'OTH'] # for sampling/mocking data TODO: replace it with actual intervention type

      intervention_file_names.each do |file_name|
        File.open("../../storage/ncit_interventions/#{file_name}", 'wb') do |fo|
          fo.write open(url + file_name).read
        end

        # Populate ncit_interventions table
        Zip::File.open("../../storage/ncit_interventions/#{file_name}") do |zipfile|
          zipfile.each do |entry|
            xml = Nokogiri::XML(entry.get_input_stream.read)
            
            # Search for label as preferred name
            xml.xpath('//owl:Class[@rdf:about]').each do |node|
              # extract preferred_name and synonyms
              name = node.xpath('rdfs:label').text

              c_code = node.css('code')
              c_code = c_code.present? ? c_code.text : nil
              if !NcitIntervention.exists?(c_code: c_code) # no duplicate c_code
                synonyms = ''
                node.css('P90').xpath('ncicp:ComplexTerm/ncicp:term-name').each do |synonym|
                  synonyms += "; #{synonym.text}"  # concatenate each synonym
                end
                synonyms = synonyms.sub(';', '') # remove the first semi-colon
                # intervention_type_code = intervention_types.sample # generate a random intervention type code
                #p "about to save ncit intervention, name: #{name}, synonyms: #{synonyms}" # , type_code: #{intervention_type_code}

                ## extract the definition field
                definition = node.css('P97').xpath('ncicp:ComplexDefinition/ncicp:def-definition')
                definition = definition.present? ? definition.text : nil
                # p "NcitIntervention.create(preferred_name: \"#{name}\", synonyms: \"#{synonyms}\", definition: \"#{definition}\", type_code: \"nil\", ct_gov_type_code: \"nil\", ncit_status: #{act.id}, c_code: \"#{c_code}\")"
                NcitIntervention.create(preferred_name: name, synonyms: synonyms, definition: definition, type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: c_code)
              end

            end

          end
        end

      end

    end
  end

  private

  # scope :match_exact_preferred_name, -> (value) { where(preferred_name: value.strip) }
  scope :matches_exact, -> (column, value) { where("ncit_interventions.#{column} = ?", "#{value}") }

  scope :matches_like, -> (column, value) { where("ncit_interventions.#{column} ilike ?", "%#{value}%")} # like?

  # support like and wildcard queries
  scope :match_loosely_preferred_name, -> (value) {
    where_clause = 'ncit_interventions.preferred_name ilike ?'
    value = value.strip
    str_len = value.length

    if value[0] == '*' && value[str_len - 1] != '*'
      value_exp = "%#{value[1..str_len - 1]}"
    elsif value[0] != '*' && value[str_len - 1] == '*'
      value_exp = "#{value[0..str_len - 2]}%"
    elsif value[0] == '*' && value[str_len - 1] == '*'
      value_exp = "%#{value[1..str_len - 2]}%"
    else
      value_exp = "%#{value}%"
    end

    where(where_clause, value_exp)
  }

  scope :sort_by_col, -> (params) {
    column = params[:sort]
    order = params[:order]
    order("#{column} #{order}")
  }



end
