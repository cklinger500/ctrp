namespace :import do
  desc "Import NCI Thesaurus"
  task ncit: :environment do
    p 'Importing NCI Thesaurus started ...'
    NcitDiseaseCode.import_ncit
    p 'Importing NCI Thesaurus ended ...'
  end

  desc "Import Interventions"
  task interventions: :environment do
    p 'Importing Interventions started ...'
    NcitIntervention.import_ncit_interventions
    p 'Importing Interventions ended ...'
  end
end
