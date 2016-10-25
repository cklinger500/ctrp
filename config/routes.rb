Rails.application.routes.draw do

  resources :import_trial_log_data

  resources :ct_gov_import_exports

  get 'validation_rule/index'

  get 'validation_rule/show'

  get 'validation_rule/validate'

  resources :marker_biomarker_purpose_associations

  resources :accrual_disease_terms

  resources :trial_documents

  scope "/ctrp" do

    namespace "ws" do
      scope '/api' do
        scope '/v1' do
          scope '/trials' do
            scope '/complete' do
              post '/' => 'api_trials#create'
              post '/:idType/:id' => 'api_trials#update',constraints: {
                                                            idType:  'nci'
                                                        }
              put '/:idType/:id' => 'api_trials#amend',constraints: {
                                                          idType:  'nci'
                                                      }
              #put  '/:id/status' =>  'api_trials#change_status'
            end
            scope '/import' do
              post '/:id' => 'api_trials#import_trial'
            end
          end
        end
      end
    end



    devise_for :users
    root 'ctrp#index'

    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

    get '/ctrp/', :to => redirect('/index.html')
    resources :organizations do
      collection do
        get 'search'
        get '/associated/:id', to: 'organizations#associated'
        post 'associated', to: 'organizations#associated', defaults: {format: 'json'}
        post 'dis_associate', to: 'organizations#dis_associate', defaults: {format: 'json'}
        post 'search'
        post 'select'
        post 'curate'
        post 'clone'
        post 'unique', defaults: {format: 'json'}
      end
    end

    resources :associated_trials

    resources :trial_ownerships do
      collection do
        post 'add'
        post 'search'
        post 'transfer'
        post 'end'
        post 'unique', defaults: {format: 'json'}
      end
    end

    resources :source_statuses do
      collection do
        post 'search'
      end
    end
    resources :service_requests
    resources :org_funding_mechanisms
    resources :ctep_org_types

    resources :source_contexts

    resources :families do
      collection do
            get 'search'
            post 'search'
            post 'unique', defaults: {format: 'json'}
          end
    end

    resources :families do
      member do
        get  'get_orgs'
      end
      end

    #TODO put related routs in namespaces
    scope '/familystuff' do

      resources :family_statuses, :family_types, :family_relationships, :family_memberships

    end

    resources :family_statuses

    resources :family_types

    resources :family_relationships

    resources :family_memberships

    resources :pa_trials
    get '/pa/trial/:trial_id/checkout/:type', to: 'trials#checkout_trial'
    post '/pa/trial/:trial_id/checkin/:type', to: 'trials#checkin_trial'

    resources :comments
    get '/instance/:uuid/comments/count(/:field)', to: 'comments#count'
    get '/instance/:uuid/comments(/:field)', to: 'comments#comments_for_instance'

    get '/users/search' => 'users#search'
    get '/users/gsa' => 'users#gsa'
    get '/users/user_statuses' => 'user_statuses#index'
    post '/users/search' => 'users#search'
    post '/users/request_admin/:username' => 'users#request_admin_access'

    # All the User routes(non-devise) should be accessed by username
    # rather that "id" in order to prevent exposing the "id"
    resources :users, param: :username do
      member do
        post 'approve'
        post 'disapprove'
      end
    end

    resources :people do
      collection do
        get 'search'
        post 'search'
        post 'curate'
        post 'unique', defaults: {format: 'json'}
        get '/associate_context/:ctep_person_id/:ctrp_id', to: 'people#associate_person'
        get '/association/remove/:ctep_person_id', to: 'people#remove_association'
        post '/clone_ctep', to: 'people#clone_ctep_person'
      end
    end

    resources :trial_versions do
      collection do
        get 'index'
        post 'history'
        post 'updates_history'
        post 'submissions_history'
      end
    end

    resources :cadsr_markers do
      collection do
        get 'index'
        post 'search'
      end
    end


    resources :outcome_measure_types
    resources :po_affiliations
    resources :po_affiliation_statuses

    resources :assay_types
    resources :evaluation_types
    resources :specimen_types
    resources :biomarker_uses
    resources :biomarker_purposes

    resources :marker_spec_type_associations

    resources :marker_eval_type_associations

    resources :marker_assay_type_associations



    get '/app_settings/:settings' => 'util#get_app_settings'
    get '/app_settings_ext/:settings' => 'util#get_app_settings_ext'

    post '/trial_submissions' => 'submissions#search'
    post '/trial_submission_expect_complete' => 'submissions#update'

    get '/countries' => 'util#get_countries'
    get '/countries_for_registry' => 'util#get_countries'
    get '/get_authorities_for_a_country' => 'util#get_authorities_for_a_country'
    get '/states' => 'util#get_states'
    get '/backoffice' => 'backoffice#index'
    get '/backoffice/download_log'
    get '/backoffice/static_members'

    #DmzUtils routes
    get '/dmzutils/app_version' => 'dmz_utils#get_app_version'
    get '/dmzutils/app_rel_milestone' => 'dmz_utils#get_app_rel_milestone'
    get '/dmzutils/login_bulletin' => 'dmz_utils#get_login_bulletin'
    get '/dmzutils/git_info' => 'dmz_utils#get_git_info'

    # Devise related routes
    devise_scope :user do
      delete "sign_out" => "sessions#destroyrailslogin", :as => :destroyrailslogin_session
    end

    devise_for :ldap_users, :local_users, skip: [ :sessions ]
    devise_for :omniauth_users, :controllers => { :omniauth_callbacks => "omniauth_users/omniauth_callbacks" }
    devise_scope :local_user do
      get 'sign_in' => 'sessions#new', :as => :new_session
      post 'sign_in' => 'sessions#create', :as => :create_session
      post 'sign_out' => 'sessions#destroy', :as => :destroy_session
      post 'sign_up' => 'registrations#create', :as => :create_registration
      get 'change_password' => 'registrations#edit', :as => :edit_registration
      post 'change_password' => 'registrations#update', :as => :update_registration
    end

    scope '/pa' do
      get 'nih_nci_div_pa' => 'util#get_nih_nci_div_pa'
      get 'nih_nci_prog_pa' => 'util#get_nih_nci_prog_pa'
      get 'trial_document_types' => 'util#get_trial_document_types'
      post 'paa_validate_trial_status' => 'trials#paa_validate_trial_status'
      post 'abstraction_validate_trial_status' => 'trials#abstraction_validate_trial_status'
      resources :submission_methods
    end

    scope '/model' do
      resources :validation_rules do
        collection do
          get 'trial/:trial_id' => 'validation_rules#validate_trial'
        end
      end
    end

    scope '/registry' do
      resources :submissions
      resources :study_sources
      resources :phases
      resources :primary_purposes
      resources :secondary_purposes
      resources :accrual_disease_terms
      resources :responsible_parties
      resources :trials do
        collection do
          get  'search'
          post 'search'
          get  'search_pa'
          post 'search_pa'
          post 'validate_status'
          post 'validate_milestone'
          get  'get_grants_serialnumber'
          post 'get_grants_serialnumber'
          get  'get_central_contact_types'
          get  'search_clinical_trials_gov'
          get  'search_trial_with_nci_id'
          get  'search_clinical_trials_gov_ignore_exists'
          post 'import_clinical_trials_gov'
          get  'get_board_approval_statuses'
          get  'get_intervention_models'
          get  'get_maskings'
          get  'get_allocations'
          get  'study_classifications'
          get  'study_models'
          get  'time_perspectives'
          get  'biospecimen_rententions'
          get  'genders'
          get  'age_units'
          get  'trial_identifier_types'
          post 'lookup_imported_ncit_interventions'
          get  'get_intervention_types'
          get  'search_ctrp_interventions'
          get  'get_mail_logs'
          get  'get_trial_checkout_history'
          post 'rollback'
          get  'amendment_reasons'
        end
      end

      resources :protocol_id_origins
      resources :holder_types
      resources :expanded_access_types
      resources :trial_statuses
      resources :processing_statuses
      resources :milestones
      resources :onhold_reasons
      resources :research_categories
      resources :site_recruitment_statuses
      resources :anatomic_sites
      resources :participating_sites do
        collection do
          post 'validate_status'
        end
      end
      resources :outcome_measures
      #resources :site_rec_status_wrappers
      resources :trial_documents do
        collection do
          get 'download/:id' => 'trial_documents#download'
          get  'download_tsr_in_rtf/:trial_id' => 'trial_documents#download_tsr_in_rtf'
          post 'deleted_documents' # => 'trial_documents#deleted_documents'
        end
      end

      resources :sub_groups
      get 'funding_mechanisms' => 'util#get_funding_mechanisms'
      get 'institute_codes' => 'util#get_institute_codes'
      get 'nci' => 'util#get_nci'
      get 'nih' => 'util#get_nih'
      get 'accepted_file_types_for_registry' => 'util#get_accepted_file_types_for_registry'
      get 'accepted_file_types' => 'util#get_accepted_file_types'
      get 'sampling_methods' => 'util#get_sampling_methods'

      resources :internal_sources
    end




    resources :ncit_disease_codes do
      collection do
        get 'get_tree'
        post 'get_tree'
        get 'search'
        post 'search'
      end
    end
  end
  # Devise related routes

  #get '/ctrp/', :to => redirect('/index.html')

  # Devise related routes
  #devise_for :users
  #devise_for :ldap_users, :local_users, skip: [ :sessions ]
  #devise_for :omniauth_users, :controllers => { :omniauth_callbacks => "omniauth_users/omniauth_callbacks" }
  #devise_scope :local_user do
  #   get 'sign_in' => 'sessions#new', :as => :new_session
  #   post 'sign_in' => 'sessions#create', :as => :create_session
  #   delete 'sign_out' => 'sessions#destroy', :as => :destroy_session
  #end


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
