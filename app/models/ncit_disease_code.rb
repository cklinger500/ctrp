# == Schema Information
#
# Table name: ncit_disease_codes
#
#  id                :integer          not null, primary key
#  disease_code      :string(255)
#  nt_term_id        :string(255)
#  preferred_name    :string(1000)
#  menu_display_name :string(1000)
#  ncit_status_id    :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#
# Indexes
#
#  index_ncit_disease_codes_on_ncit_status_id  (ncit_status_id)
#

class NcitDiseaseCode < ActiveRecord::Base
  include BasicConcerns

  belongs_to :ncit_status
  has_many :ncit_disease_synonyms, -> { order 'ncit_disease_synonyms.id' }
  # Self-referential many-to-many
  has_many :child_ncit_disease_parents, class_name: "NcitDiseaseParent", foreign_key: "parent_id"
  has_many :children, through: :child_ncit_disease_parents
  has_many :parent_ncit_disease_parents, class_name: "NcitDiseaseParent", foreign_key: "child_id"
  has_many :parents, through: :parent_ncit_disease_parents

  def self.import_ncit
    ActiveRecord::Base.transaction do
      FileUtils.rm_rf('../../storage/ncit')
      FileUtils.mkdir_p('../../storage/ncit')

      NcitDiseaseParent.delete_all
      NcitDiseaseSynonym.delete_all
      NcitDiseaseCode.delete_all

      url = AppSetting.find_by_code('NCI_THESAURUS_URL').value
      file_names = AppSetting.find_by_code('NCI_THESAURUS_FILES').big_value.split(',')
      act = NcitStatus.find_by_code('ACT')

      file_names.each do |file_name|
        File.open("../../storage/ncit/#{file_name}", 'wb') do |fo|
          fo.write open(url + file_name).read
        end

        # Populate ncit_disease_codes and ncit_disease_synonyms table
        Zip::File.open("../../storage/ncit/#{file_name}") do |zipfile|
          zipfile.each do |entry|
            xml = Nokogiri::XML(entry.get_input_stream.read)
            # Only search for owl:Class element with rdf:about attribute
            xml.xpath('//owl:Class[@rdf:about]').each do |node|
              nt_term_id = node.xpath('@rdf:about').text
              if nt_term_id[0] == '#'
                nt_term_id.slice!(0)
              end

              if !NcitDiseaseCode.exists?(nt_term_id: nt_term_id)
                name = node.xpath('rdfs:label').text
                new_disease_code = NcitDiseaseCode.create(nt_term_id: nt_term_id, preferred_name: name, menu_display_name: name, ncit_status: act)

                node.css('P90').xpath('ncicp:ComplexTerm/ncicp:term-name').each do |synonym|
                  if !NcitDiseaseSynonym.exists?(alternate_name: synonym.text, ncit_disease_code: new_disease_code)
                    NcitDiseaseSynonym.create(alternate_name: synonym.text, ncit_status: act, ncit_disease_code: new_disease_code)
                  end
                end
              end
            end
          end
        end
      end

      file_names.each do |file_name|
        # Populate ncit_disease_parents table
        Zip::File.open("../../storage/ncit/#{file_name}") do |zipfile|
          zipfile.each do |entry|
            xml = Nokogiri::XML(entry.get_input_stream.read)
            # Only search for owl:Class element with rdf:about attribute
            xml.xpath('//owl:Class[@rdf:about]').each do |node|
              nt_term_id = node.xpath('@rdf:about').text
              if nt_term_id[0] == '#'
                nt_term_id.slice!(0)
              end

              child_record = NcitDiseaseCode.find_by_nt_term_id(nt_term_id)
              if child_record.present?
                node.xpath('owl:equivalentClass/owl:Class/owl:intersectionOf/rdf:Description/@rdf:about').each do |about|
                  parent = about.text
                  if parent[0] == '#'
                    parent.slice!(0)
                  end

                  parent_record = NcitDiseaseCode.find_by_nt_term_id(parent)
                  if parent_record.present? && !NcitDiseaseParent.exists?(child: child_record, parent: parent_record)
                    NcitDiseaseParent.create(ncit_status: act, child: child_record, parent: parent_record)
                  end
                end

                node.xpath('rdfs:subClassOf/@rdf:resource').each do |resource|
                  parent = resource.text
                  if parent[0] == '#'
                    parent.slice!(0)
                  end

                  parent_record = NcitDiseaseCode.find_by_nt_term_id(parent)
                  if parent_record.present? && !NcitDiseaseParent.exists?(child: child_record, parent: parent_record)
                    NcitDiseaseParent.create(ncit_status: act, child: child_record, parent: parent_record)
                  end
                end
              end
            end
          end
        end
      end
    end
  end

  private

  scope :with_name, -> (name, synonym) do
    name_splits = name.split('|')

    if synonym
      q1 = ''
      q2 = ''
      params1 = []
      params2 = []

      name_splits.each_with_index { |e, i|
        if i == 0
          q1 = 'ncit_disease_codes.preferred_name ilike ?'
          q2 = 'ncit_disease_synonyms.alternate_name ilike ?'
        else
          q1 += ' AND ncit_disease_codes.preferred_name ilike ?'
          q2 += ' AND ncit_disease_synonyms.alternate_name ilike ?'
        end
        params1.push("%#{e.strip}%")
        params2.push("%#{e.strip}%")
      }

      conditions = params1 + params2
      q = '(' + q1 + ') OR (' + q2 + ')'
      conditions.insert(0, q)
      join_clause = 'LEFT JOIN ncit_disease_synonyms ON ncit_disease_synonyms.ncit_disease_code_id = ncit_disease_codes.id'

      joins(join_clause).where(conditions)
    else
      conditions = []
      q = ''

      name_splits.each_with_index { |e, i|
        if i == 0
          q = 'preferred_name ilike ?'
        else
          q += ' AND preferred_name ilike ?'
        end
        conditions.push("%#{e.strip}%")
      }
      conditions.insert(0, q)

      where(conditions)
    end
  end
end
