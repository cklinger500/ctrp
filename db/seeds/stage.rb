#SEEDS for development environment only

AppSetting.find_or_create_by(code: 'LOGIN_BULLETIN', name: 'Login Bulletin', description: 'Message for login page if needed.', value: 'see big value', big_value: 'This is the STAGE tier at CBIIT.')

AppSetting.find_or_create_by(code: 'APP_RELEASE_MILESTONE', name: 'Application Release Milestone', description: 'Use this for identifying a milestone of a software release, e.g. 5.0 M1', value: 'M4', big_value: '')
