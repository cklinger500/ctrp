#SEEDS for QA environment only

AppSetting.find_or_create_by(code: 'LOGIN_BULLETIN', name: 'Login Bulletin', description: 'Message for login page if needed.', value: 'see big value', big_value: 'This is the QA tier at the FNLCR.')

AppSetting.find_or_create_by(code: 'APP_RELEASE_MILESTONE', name: 'Application Release Milestone', description: 'Use this for identifying a milestone of a software release, e.g. 5.0 M1', value: 'S8 (ELT + seed)', big_value: '')

#Seed test records for this environment
load(Rails.root.join( 'db', 'seeds', "po_test_records.rb"))
load(Rails.root.join( 'db', 'seeds', "trial_test_records.rb"))