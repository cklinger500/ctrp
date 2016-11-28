class UtilController < ApplicationController
  before_filter :wrapper_authenticate_user, :except => [:get_app_settings_ext] unless Rails.env.test?

  def get_app_settings
    requestedSettings = params[:settings]
    valueLoc = params[:location] || "big_value"
    results = AppSetting.find_by_code(requestedSettings) ? AppSetting.find_by_code(requestedSettings)[valueLoc].gsub("\n",'').split.join(" ") : nil
    @settings = [results]
  end

  def get_app_settings_ext
    requestedSettings = params[:settings]
    valueLoc = params[:location] || "big_value"
    permittedSettings = ['LOGIN_BULLETIN','USER_DOMAINS','USER_ROLES','NIH_USER_FUNCTIONS','NIHEXT_USER_FUNCTIONS','Federated_USER_FUNCTIONS','APP_VERSION','APP_RELEASE_MILESTONE']
    if permittedSettings.include? requestedSettings
      results = AppSetting.find_by_code(requestedSettings) ? AppSetting.find_by_code(requestedSettings)[valueLoc].gsub("\n",'').split.join(" ")  : nil
      @settings = [results]
    end
  end

  def get_countries
    geo_location_service = GeoLocationService.new
    @countries = geo_location_service.get_countries
  end

  def get_countries_for_registry
     geo_location_service = GeoLocationService.new
     @countries = geo_location_service.get_countries
  end

  def get_authorities_for_a_country
      @authorities = []
      geo_location_service = GeoLocationService.new
      @authorities = geo_location_service.getAuthorityOrgArr(params[:country])
  end


  def get_states
    geo_location_service = GeoLocationService.new
    @states = geo_location_service.get_states(params[:country])
  end

  def get_funding_mechanisms
    @funding_mechanisms = AppSetting.find_by_code('FM').big_value.split(',')
  end

  def get_institute_codes
    @institute_codes = AppSetting.find_by_code('IC').big_value.split(',')
  end

  def get_nci
    @nci = AppSetting.find_by_code('NCI').big_value.split(',')
  end

  def get_nih
    @nih = AppSetting.find_by_code('NIH').big_value.split(';')
  end

  def get_sampling_methods
    @methods = AppSetting.find_by_code('SAMPLING_METHOD_PA').value.split(',')
    respond_to do |format|
      format.json { render :json => @methods }
    end
  end

  def get_nih_nci_div_pa
    @nih_nci_div_pa = AppSetting.find_by_code('NIH_NCI_DIV_PA').big_value.split(',')
  end

  def get_nih_nci_prog_pa
    @nih_nci_prog_pa = AppSetting.find_by_code('NIH_NCI_PROG_PA').big_value.split(',')
  end

  def get_accepted_file_types_for_registry
    @file_extensions = AppSetting.find_by_code('ACCEPTED_FILE_TYPES_REG').value
    @file_types = AppSetting.find_by_code('ACCEPTED_FILE_TYPES_REG').big_value
  end

  def get_accepted_file_types
    @file_extensions = AppSetting.find_by_code('ACCEPTED_FILE_TYPES').value
    @file_types = AppSetting.find_by_code('ACCEPTED_FILE_TYPES').big_value
  end

  def get_trial_document_types
    @doc_types = AppSetting.find_by_code('TRIAL_DOCUMENT_TYPES').value
    respond_to do |format|
      format.json { render :json => {:types => @doc_types} }
    end
  end

end
