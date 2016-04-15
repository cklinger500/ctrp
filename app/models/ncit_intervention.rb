# == Schema Information
#
# Table name: ncit_interventions
#
#  id               :integer          not null, primary key
#  preferred_name   :string
#  synonyms         :string
#  description      :text
#  type_code        :string
#  ct_gov_type_code :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  ncit_status_id   :integer
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
              if !NcitIntervention.exists?(preferred_name: name) # no duplicate preferred_name
                synonyms = ''
                node.css('P90').xpath('ncicp:ComplexTerm/ncicp:term-name').each do |synonym|
                  synonyms += "; #{synonym.text}"  # concatenate each synonym
                end
                synonyms = synonyms.sub(';', '') # remove the first semi-colon
                # intervention_type_code = intervention_types.sample # generate a random intervention type code
                p "about to save ncit intervention, name: #{name}, synonyms: #{synonyms}, type_code: #{intervention_type_code}"
                NcitIntervention.create(preferred_name: name, synonyms: synonyms, description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
              end

            end

          end
        end

      end

    end
  end

end
