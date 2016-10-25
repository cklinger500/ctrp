class GeoLocationService

  def get_country_name_from_alpha3(alpha3)
    obj = Country.find_country_by_alpha3('USA')
    if !obj.nil?
      return obj.name
    else
      return nil
    end
  end

  def get_countries
    @countries = Country.all.sort
    us_idx = @countries.index(["United States", "US"])
    @countries.insert(0, @countries.delete_at(us_idx))
    canada_idx = @countries.index(["Canada", "CA"])
    @countries.insert(1, @countries.delete_at(canada_idx))
    return @countries
  end

  def get_states(country)
    country = Country.find_country_by_name(country)
    @states = country.states.sort_by { |k, v| v["name"] } if country.present?
  end

  def is_country_existed(name)
  end

  def getAuthorityOrgArr(country)
      authorityOrgArr = Array.new
      case  country

          when 'United States'
              authorityOrgArr = ['Federal Government', 'Food and Drug Administration', 'Institutional Review Board'];
          when 'Canada'
              authorityOrgArr = ['Canadian Institutes of Health Research', 'Ethics Review Committee', 'Health Canada', 'Ministry of Health & Long Term Care, Ontario'];
          when 'Afghanistan'
              authorityOrgArr = ['Ministry of Public Health'];
          when 'Albania'
              authorityOrgArr = ['Ministry of Health Department of Pharmacy'];
          when 'Algeria'
              authorityOrgArr = ['Ministry of Health'];
          when 'Andorra'
              authorityOrgArr = ['Ministeri de Salut i Benestar'];
          when 'Argentina'
              authorityOrgArr = ['Administracion Nacional de Medicamentos, Alimentos y Tecnologia Medica', 'Human Research Bioethics Committee', 'Ministry of Health'];
          when 'Armenia'
              authorityOrgArr = ['Ministry of Health'];
          when 'Australia'
              authorityOrgArr = ['Department of Health and Ageing Therapeutic Goods Administration', 'Human Research Ethics Committee', 'National Health and Medical Research Council'];
          when 'Austria'
              authorityOrgArr = ['Federal Ministry for Labour, Health, and Social Affairs',
                                 'Agency for Health and Food Safety',
                                 'Ethikkommission',
                                 'Federal Ministry for Health Family and Youth',
                                 'Federal Ministry for Health and Women',
                                 'Federal Office for Safety in Health Care'];
          when 'Bangladesh'
              authorityOrgArr = ['Bangladesh Medical Research Council', 'Directorate of Drug Administration', 'Ethical Review Committee'];
          when 'Barbados'
              authorityOrgArr = ['Ministry of Health'];
          when 'Belarus'
              authorityOrgArr = ['Ministry of Health'];
          when 'Belgium'
              authorityOrgArr = ['Directorate general for the protection of Public health',
                                 'Federal Agency for Medicinal Products and Health Products',
                                 'Institutional Review Board',
                                 'Ministry of Social Affairs, Public Health and the Environment',
                                 'The Federal Public Service (FPS) Health, Food Chain Safety and Environment'];
          when 'Bolivia'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Health'];
          when 'Bosnia'
              authorityOrgArr = ['Federal Ministry of Health'];
          when 'Botswana'
              authorityOrgArr = ['Health Research and Development Committee', 'Ministry of Health'];
          when 'Brazil'
              authorityOrgArr = ['Ethics Committee',
                                 'Ministry of Health',
                                 'National Committee of Ethics in Research',
                                 'National Health Surveillance Agency'];
          when 'Bulgaria'
              authorityOrgArr = ['Bulgarian Drug Agency', 'Ministry of Health'];
          when 'Burkina Faso'
              authorityOrgArr = ['Ministry for Higher Education and Research', 'Ministry of Health'];
          when 'Cambodia'
              authorityOrgArr = ['Ministry of Health'];
          when 'Cameroon'
              authorityOrgArr = ['Ministry of Public Health'];
          when 'Chile'
              authorityOrgArr = ['Comisión Nacional de Investigación Científica y Tecnológica', 'Instituto de Salud Publica de Chile'];
          when 'China'
              authorityOrgArr = ['Ethics Committee',
                                 'Ministry of Health',
                                 'National Natural Science Foundation',
                                 'State Food and Drug Administration'];
          when 'Colombia'
              authorityOrgArr = ['INVIMA Instituto Nacional de Vigilancia de Medicamentos y Alimentos',
                                 'Institutional Review Board', 'National Institutes of Health'];
          when 'Costa Rica'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Health Costa Rica'];
          when 'Côte D\'Ivoire'
              authorityOrgArr = ['Ministry of AIDS',
                                 'Ministry of Health and Public Hygiene',
                                 'National Research and Ethics Committee',
                                 'Ministry for the Public Health'];
          when 'Croatia'
              authorityOrgArr = ['Agency for Medicinal Product and Medical Devices',
                                 'Ethics Committee',
                                 'Ministry of Health and Social Care',
                                 'Ministry of Science, Education and Sports'];

          when 'Sudan'
              authorityOrgArr = ['Ministry of Health'];

          when 'Sweden'
              authorityOrgArr = ['Institutional Review Board', 'Medical Products Agency', 'Regional Ethical Review Board', 'Swedish National Council on Medical Ethics', 'Swedish Research Council', 'The National Board of Health and Welfare'];

          when 'Switzerland'
              authorityOrgArr = ['Ethikkommission', 'Federal Office of Public Health', 'Laws and standards', 'Swissmedic'];

          when 'Taiwan, Republic Of China'
              authorityOrgArr = ['Center for Drug Evaluation', 'Department of Health', 'Institutional Review Board', 'National Bureau of Controlled Drugs'];

          when 'Tanzania, United Republic of'
              authorityOrgArr = ['Food & Drug Administration', 'Ministry of Health', 'National Institute for Medical Research'];

          when 'Thailand'
              authorityOrgArr = ['Ethical Committee', 'Food and Drug Administration', 'Khon Kaen University Ethics Committee for Human Research', 'Ministry of Public Health'];

          when 'Trinidad and Tobago'
              authorityOrgArr = ['Ministry of Health'];

          when 'Tunisia'
              authorityOrgArr = ['Ministry of Public Health', 'Office of Pharmacies and Medicines'];

          when 'Turkey'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Health'];

          when 'Uganda'
              authorityOrgArr = ['Ministry of Health', 'National Council for Science and Technology', 'National Drug Authority', 'Research Ethics Committee'];

          when 'Ukraine'
              authorityOrgArr = ['Ministry of Health', 'State Pharmacological Center - Ministry of Health'];

          when 'United Arab Emirates'
              authorityOrgArr = ['Drug Control Department - Medicines and Pharmacy Control - Ministry of Health', 'General Authority for Health Services for Abu Dhabi'];

          when 'United Kingdom'
              authorityOrgArr = ['Department of Health', 'Food Standards Agency', 'Medicines and Healthcare Products Regulatory Agency', 'National Health Service', 'National Institute for Health Research', 'Research Ethics Committee'];

          when 'United Nations'
              authorityOrgArr = ['International Atomic Energy Agency'];

          when 'Uruguay'
              authorityOrgArr = ['Comite de Etica'];

          when 'Venezuela, Bolivarian Republic of'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Health and Social Development'];

          when 'Vietnam'
              authorityOrgArr = ['Ho Chi Minh City Health Service', 'Ministry of Health'];

          when 'Yemen'
              authorityOrgArr = ['Ministry of Public Health and Population'];

          when 'Zambia'
              authorityOrgArr = ['Ministry of Health', 'Pharmaceutical Regulatory Authority', 'Research Ethics Committee'];

          when 'Zanzibar'
              authorityOrgArr = ['Ministry of Health and Social Welfare'];

          when 'Zimbabwe'
              authorityOrgArr = ['Medical Research Council'];
          when 'Cuba'
              authorityOrgArr = ['Ministry of Public Health', 'Scientific and Ethics Committee'];

          when 'Czech Republic'
              authorityOrgArr = ['Ethics Committee', 'State Institute for Drug Control'];

          when 'Denmark'
              authorityOrgArr = ['Danish Dataprotection Agency',
                                 'Danish Medicines Agency',
                                 'Ethics Committee',
                                 'National Board of Health',
                                 'The Danish National Committee on Biomedical Research Ethics',
                                 'The Ministry of the Interior and Health',
                                 'The Regional Committee on Biomedical Research Ethics'];

          when 'Dominican Republic'
              authorityOrgArr = ['Consejo Nacional de Bioetica en Salud',
                                 'Secretaría del Estado de Salud Pública y Asistencia Social (SESPAS)'];

          when 'Ecuador'
              authorityOrgArr = ['Ethical Committee', 'Public Health Ministry'];

          when 'Egypt'
              authorityOrgArr = ['Institutional Review Board',
                                 'Ministry of Health and Population',
                                 'Ministry of Health, Drug Policy and Planning Center'];

          when 'Estonia'
              authorityOrgArr = ['The State Agency of Medicine'];

          when 'Ethiopia'
              authorityOrgArr = ['Drug Administration and Control Authority',
                                 'Ethical Review Committee',
                                 'Ethiopia Science and Technology Commission',
                                 'Ministry of Health'];

          when 'European Union'
              authorityOrgArr = ['European Medicines Agency'];

          when 'Fiji'
              authorityOrgArr = ['Ministry of Health'];

          when 'Finland'
              authorityOrgArr = ['Data Protection Board',
                                 'Ethics Committee',
                                 'Finnish Medicines Agency',
                                 'Ministry of Social Affairs and Health',
                                 'National Advisory Board on Health Care Ethics'];

          when 'France'
              authorityOrgArr = ['Afssaps - French Health Products Safety Agency',
                                 'Comité consultatif sur le traitement de l\'information en matière de recherche dans le domaine de la santé',
                                 'Direction Générale de la Santé',
                                 'French Data Protection Authority',
                                 'Haute Autorité de Santé Transparency Commission',
                                 'Institutional Ethical Committee',
                                 'Ministry of Health',
                                 'National Consultative Ethics Committee for Health and Life Sciences'];

          when 'Gabon'
              authorityOrgArr = ['Ministry of Health'];

          when 'Gambia'
              authorityOrgArr = ['Department of State for Health and Social Welfare',
                                 'MRC Ethics Committee'];

          when 'Georgia'
              authorityOrgArr = ['Ministry of Health'];

          when 'Germany'
              authorityOrgArr = ['Ethics Commission',
                                 'Federal Institute for Drugs and Medical Devices',
                                 'Federal Ministry of Education and Research',
                                 'Federal Ministry of Food, Agriculture and Consumer Protection',
                                 'Federal Office for Radiation Protection',
                                 'German Institute of Medical Documentation and Information',
                                 'Ministry of Health', 'Paul-Ehrlich-Institut',
                                 'The Bavarian State Ministry of the Environment and Public Health'];

          when 'Ghana'
              authorityOrgArr = ['Committee on Human Research', 'Ministry of Health'];

          when 'Greece'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Health and Welfare', 'National Organization of Medicines'];

          when 'Guatemala'
              authorityOrgArr = ['Ministry of Public Health and Social Assistance'];

          when 'Guinea-Bissau'
              authorityOrgArr = ['Ministry of Health'];

          when 'Hong Kong'
              authorityOrgArr = ['Department of Health',
                                 'Ethics Committee',
                                 'Joint CUHK-NTEC Clinical Research Ethics Committee'];

          when 'Hungary'
              authorityOrgArr = ['Institutional Ethics Committee',
                                 'National Institute of Pharmacy',
                                 'Research Ethics Medical Committee'];

          when 'Iceland'
              authorityOrgArr = ['Icelandic Medicines Control Agency',
                                 'Ministry of Health and Social Security'];

          when 'India'
              authorityOrgArr = ['Central Drugs Standard Control Organization',
                                 'Department of Atomic Energy',
                                 'Drugs Controller General of India',
                                 'Indian Council of Medical Research',
                                 'Institutional Review Board',
                                 'Ministry of Health',
                                 'Ministry of Science and Technology',
                                 'Science and Engineering Research Council'];

          when 'Indonesia'
              authorityOrgArr = ['Departement Kesehatan (Department of Health)', 'National Agency of Drug and Food Control'];

          when 'Iran, Islamic Republic Of'
              authorityOrgArr = ['Ethics Committee',
                                 'Ministry of Health'];

          when 'Ireland'
              authorityOrgArr = ['Irish Medicines Board',
                                 'Medical Ethics Research Committee',
                                 'Ministry of Health',
                                 'Research Ethics Committee'];

          when 'Israel'
              authorityOrgArr = ['Ethics Commission',
                                 'Israeli Health Ministry Pharmaceutical Administration',
                                 'Ministry of Health',
                                 'The Israel National Institute for Health Policy Research and Health Services Research'];

          when 'Italy'
              authorityOrgArr = ['Ethics Committee',
                                 'Ministry of Health',
                                 'National Bioethics Committee',
                                 'National Institute of Health',
                                 'National Monitoring Centre for Clinical Trials - Ministry of Health',
                                 'The Italian Medicines Agency'];

          when 'Jamaica'
              authorityOrgArr = ['Ministry of Health'];

          when 'Japan'
              authorityOrgArr = ['Foundation for Biomedical Research and Innovation',
                                 'Institutional Review Board',
                                 'Ministry of Education, Culture, Sports, Science and Technology',
                                 'Ministry of Health, Labor and Welfare',
                                 'Pharmaceuticals and Medical Devices Agency'];

          when 'Jordan'
              authorityOrgArr = ['Ethical Committee'];

          when 'Kazakhstan'
              authorityOrgArr = ['Ethical Commission'];

          when 'Kenya'
              authorityOrgArr = ['Ethical Review Committee',
                                 'Institutional Review Board',
                                 'Ministry of Health'];

          when 'Korea, Republic of'
              authorityOrgArr = ['Food and Drug Administration',
                                 'Institutional Review Board',
                                 'Ministry for Health, Welfare and Family Affairs'];

          when 'Latvia'
              authorityOrgArr = ['Institutional Review Board',
                                 'State Agency of Medicines'];

          when 'Lebanon'
              authorityOrgArr = ['Institutional Review Board',
                                 'Ministry of Public Health'];

          when 'Liechtenstein'
              authorityOrgArr = ['Control Authority for Medicinal Products'];

          when 'Lithuania'
              authorityOrgArr = ['Bioethics Committee',
                                 'State Medicine Control Agency - Ministry of Health'];

          when 'Luxembourg'
              authorityOrgArr = ['Comite National d\'Ethique de Recherche', 'Ministère de la Santé'];

          when 'Macedonia'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Health'];

          when 'Madagascar'
              authorityOrgArr = ['Ministry of Health'];

          when 'Malawi'
              authorityOrgArr = ['College of Medicine Research and Ethics Committee',
                                 'National Health Sciences Research Committee'];

          when 'Malaysia'
              authorityOrgArr = ['Ministry of Health'];

          when 'Mali'
              authorityOrgArr = ['Ministry of Health'];

          when 'Malta'
              authorityOrgArr = ['Medicines Authority'];

          when 'Mauritius'
              authorityOrgArr = ['Ministry of Health and Quality of Life'];

          when 'Mexico'
              authorityOrgArr = ['Ethics Committee',
                                 'Federal Commission for Protection Against Health Risks',
                                 'Federal Commission for Sanitary Risks Protection',
                                 'Ministry of Health',
                                 'National Council of Science and Technology',
                                 'National Institute of Public Health, Health Secretariat'];

          when 'Moldavia'
              authorityOrgArr = ['Ministry of Health'];

          when 'Morocco'
              authorityOrgArr = ['Ministry of Public Health'];

          when 'Mozambique'
              authorityOrgArr = ['Ministry of Health (MISAU)'];

          when 'Netherlands'
              authorityOrgArr = ['Independent Ethics Committee', 'Dutch Health Care Inspectorate', 'Medical Ethics Review Committee (METC)', 'Medicines Evaluation Board (MEB)', 'Ministry of Health, Welfare and Sport', 'The Central Committee on Research Involving Human Subjects (CCMO)'];

          when 'New Zealand'
              authorityOrgArr = ['Food Safety Authority', 'Health Research Council', 'Health and Disability Ethics Committees', 'Institutional Review Board', 'Medsafe', 'Ministry of Health'];

          when 'Niger'
              authorityOrgArr = ['Institutional Review Board'];

          when 'Nigeria'
              authorityOrgArr = ['The National Agency for Food and Drug Administration and Control'];

          when 'Norway'
              authorityOrgArr = ['Data Inspectorate',
                                 'Directorate for Health and Social Affairs',
                                 'Ethics Committee',
                                 'Norwegian Institute of Public Health',
                                 'Norwegian Medicines Agency',
                                 'Norwegian Social Science Data Services',
                                 'Royal Norwegian Ministry of Health and Care Services',
                                 'The National Committees for Research Ethics in Norway'];

          when 'Pakistan'
              authorityOrgArr = ['Ministry of Health', 'Research Ethics Committee'];

          when 'Panama'
              authorityOrgArr = ['Commemorative Institute GORGAS of Studies of Health', 'Ministry of Health'];

          when 'Paraguay'
              authorityOrgArr = ['Ministerio de Salud Pública y Bienestar Social'];

          when 'Peru'
              authorityOrgArr = ['Ethics Committee',
                                 'General Directorate of Pharmaceuticals, Devices, and Drugs',
                                 'Instituto Nacional de Salud', 'Ministry of Health'];

          when 'Philippines'
              authorityOrgArr = ['Bureau of Food and Drugs',
                                 'Department of Health', 'Ethics Committee',
                                 'Philippine Council for Health Research and Development'];

          when 'Poland'
              authorityOrgArr = ['Ethics Committee',
                                 'Ministry of Health',
                                 'Ministry of Science and Higher Education',
                                 'Office for Registration of Medicinal Products, Medical Devices and Biocidal Products',
                                 'The Central Register of Clinical Trials'];

          when 'Portugal'
              authorityOrgArr = ['Ethics Committee for Clinical Research',
                                 'Health Ethic Committee',
                                 'National Pharmacy and Medicines Institute'];

          when 'Qatar'
              authorityOrgArr = ['Hamad Medical Corporation'];

          when 'Romania'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Public Health',
                                 'National Authority for Scientific Research',
                                 'National Medicines Agency',
                                 'State Institute for Drug Control'];

          when 'Russian Federation'
              authorityOrgArr = ['Ethics Committee',
                                 'FSI Scientific Center of Expertise of Medical Application',
                                 'Ministry of Health and Social Development of the Russian Federation',
                                 'Pharmacological Committee, Ministry of Health'];

          when 'Rwanda'
              authorityOrgArr = ['Ethics Committee'];

          when 'Saudi Arabia'
              authorityOrgArr = ['Ethics Committee', 'Ministry of Health', 'Research Advisory Council'];

          when 'Scotland'
              authorityOrgArr = ['Scottish Executive Health Department'];

          when 'Senegal'
              authorityOrgArr = ['Ministere de la sante'];

          when 'Serbia and Montenegro'
              authorityOrgArr = ['Agency for Drugs and Medicinal Devices'];

          when 'Serbia'
              authorityOrgArr = ['Ethics Committee'];

          when 'Sierra Leone'
              authorityOrgArr = ['Ministry of Health and Sanitation'];

          when 'Singapore'
              authorityOrgArr = ['Clinical Trials & Epidemiology Research Unit (CTERU)', 'Domain Specific Review Boards', 'Health Sciences Authority'];

          when 'Slovakia'
              authorityOrgArr = ['Ethics Committee', 'State Institute for Drug Control'];

          when 'Slovenia'
              authorityOrgArr = ['Agency for Medicinal Products - Ministry of Health', 'Ethics Committee', 'Ministry of Health'];

          when 'Solomon Islands'
              authorityOrgArr = ['National Health Research Ethics Committee'];

          when 'South Africa'
              authorityOrgArr = ['Department of Health', 'Human Research Ethics Committee', 'Medicines Control Council', 'National Health Research Ethics Council'];

          when 'South Korea'
              authorityOrgArr = ['Institutional Review Board', 'Korea Food and Drug Administration (KFDA)'];

          when 'Spain'
              authorityOrgArr = ['Agencia Española de Medicamentos y Productos Sanitarios', 'Comité Ético de Investigación Clínica', 'Ethics Committee', 'Ministry of Health', 'Ministry of Health and Consumption', 'Spanish Agency of Medicines'];

          when 'Sri Lanka'
              authorityOrgArr = ['Ministry of Healthcare & Nutrition'];


          else
              authorityOrgArr = [];
      end
      return authorityOrgArr;
  end

end