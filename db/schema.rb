# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151014200704) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accrual_disease_terms", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "app_settings", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.text     "description"
    t.string   "value",        limit: 255
    t.text     "big_value"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "comments", force: :cascade do |t|
    t.string   "instance_uuid", limit: 255
    t.text     "content"
    t.string   "username",      limit: 255
    t.string   "fullname",      limit: 255
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "uuid",          limit: 255
    t.integer  "lock_version",              default: 0
    t.string   "model"
    t.string   "field"
    t.integer  "parent_id"
  end

  create_table "expanded_access_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "families", force: :cascade do |t|
    t.string   "name",             limit: 255
    t.integer  "family_status_id"
    t.integer  "family_type_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
    t.integer  "ctrp_id"
  end

  add_index "families", ["family_status_id"], name: "index_families_on_family_status_id", using: :btree
  add_index "families", ["family_type_id"], name: "index_families_on_family_type_id", using: :btree

  create_table "family_memberships", force: :cascade do |t|
    t.integer  "family_id"
    t.integer  "organization_id"
    t.integer  "family_relationship_id"
    t.datetime "effective_date"
    t.datetime "expiration_date"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "uuid",                   limit: 255
    t.integer  "lock_version",                       default: 0
  end

  add_index "family_memberships", ["family_id"], name: "index_family_memberships_on_family_id", using: :btree
  add_index "family_memberships", ["family_relationship_id"], name: "index_family_memberships_on_family_relationship_id", using: :btree
  add_index "family_memberships", ["organization_id"], name: "index_family_memberships_on_organization_id", using: :btree

  create_table "family_relationships", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "family_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "family_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "grants", force: :cascade do |t|
    t.string   "funding_mechanism", limit: 255
    t.string   "institute_code",    limit: 255
    t.string   "nci",               limit: 255
    t.integer  "trial_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "uuid",              limit: 255
    t.integer  "lock_version",                  default: 0
    t.string   "serial_number",     limit: 255
  end

  add_index "grants", ["trial_id"], name: "index_grants_on_trial_id", using: :btree

  create_table "holder_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "ind_ides", force: :cascade do |t|
    t.string   "ind_ide_type",            limit: 255
    t.string   "grantor",                 limit: 255
    t.string   "nih_nci",                 limit: 255
    t.integer  "holder_type_id"
    t.integer  "expanded_access_type_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "uuid",                    limit: 255
    t.integer  "lock_version",                        default: 0
    t.boolean  "expanded_access"
    t.boolean  "exempt"
    t.string   "ind_ide_number",          limit: 255
  end

  add_index "ind_ides", ["expanded_access_type_id"], name: "index_ind_ides_on_expanded_access_type_id", using: :btree
  add_index "ind_ides", ["holder_type_id"], name: "index_ind_ides_on_holder_type_id", using: :btree
  add_index "ind_ides", ["trial_id"], name: "index_ind_ides_on_trial_id", using: :btree

  create_table "name_aliases", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.integer  "organization_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
  end

  add_index "name_aliases", ["organization_id"], name: "index_name_aliases_on_organization_id", using: :btree

  create_table "organizations", force: :cascade do |t|
    t.string   "source_id",         limit: 255
    t.string   "name",              limit: 255
    t.string   "address",           limit: 255
    t.string   "address2",          limit: 255
    t.string   "city",              limit: 255
    t.string   "state_province",    limit: 255
    t.string   "postal_code",       limit: 255
    t.string   "country",           limit: 255
    t.string   "email",             limit: 255
    t.string   "phone",             limit: 255
    t.string   "fax",               limit: 255
    t.integer  "source_status_id"
    t.integer  "source_context_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "uuid",              limit: 255
    t.integer  "lock_version",                  default: 0
    t.integer  "ctrp_id"
    t.string   "created_by"
    t.string   "updated_by"
  end

  add_index "organizations", ["source_context_id"], name: "index_organizations_on_source_context_id", using: :btree
  add_index "organizations", ["source_status_id"], name: "index_organizations_on_source_status_id", using: :btree

  create_table "other_ids", force: :cascade do |t|
    t.string   "protocol_id",           limit: 255
    t.integer  "protocol_id_origin_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "uuid",                  limit: 255
    t.integer  "lock_version",                      default: 0
  end

  add_index "other_ids", ["protocol_id_origin_id"], name: "index_other_ids_on_protocol_id_origin_id", using: :btree
  add_index "other_ids", ["trial_id"], name: "index_other_ids_on_trial_id", using: :btree

  create_table "oversight_authorities", force: :cascade do |t|
    t.string   "country",      limit: 255
    t.string   "organization", limit: 255
    t.integer  "trial_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  add_index "oversight_authorities", ["trial_id"], name: "index_oversight_authorities_on_trial_id", using: :btree

  create_table "people", force: :cascade do |t|
    t.string   "source_id",         limit: 255
    t.string   "prefix",            limit: 255
    t.string   "suffix",            limit: 255
    t.string   "email",             limit: 255
    t.string   "phone",             limit: 255
    t.integer  "source_status_id"
    t.integer  "source_context_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "uuid",              limit: 255
    t.integer  "lock_version",                  default: 0
    t.string   "fname",             limit: 255
    t.string   "mname",             limit: 255
    t.string   "lname",             limit: 255
    t.integer  "ctrp_id"
    t.string   "created_by"
    t.string   "updated_by"
  end

  add_index "people", ["source_context_id"], name: "index_people_on_source_context_id", using: :btree
  add_index "people", ["source_status_id"], name: "index_people_on_source_status_id", using: :btree

  create_table "phases", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "po_affiliation_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "po_affiliations", force: :cascade do |t|
    t.integer  "person_id"
    t.integer  "organization_id"
    t.integer  "po_affiliation_status_id"
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
    t.string   "uuid",                     limit: 255
    t.integer  "lock_version",                         default: 0
    t.datetime "effective_date"
    t.datetime "expiration_date"
  end

  add_index "po_affiliations", ["organization_id"], name: "index_po_affiliations_on_organization_id", using: :btree
  add_index "po_affiliations", ["person_id"], name: "index_po_affiliations_on_person_id", using: :btree
  add_index "po_affiliations", ["po_affiliation_status_id"], name: "index_po_affiliations_on_po_affiliation_status_id", using: :btree

  create_table "primary_purposes", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "protocol_id_origins", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "research_categories", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "responsible_parties", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "secondary_purposes", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
  add_index "sessions", ["updated_at"], name: "index_sessions_on_updated_at", using: :btree

  create_table "source_clusters", force: :cascade do |t|
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "source_contexts", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "source_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "study_sources", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "trial_co_lead_orgs", force: :cascade do |t|
    t.integer  "trial_id"
    t.integer  "organization_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
  end

  add_index "trial_co_lead_orgs", ["organization_id"], name: "index_trial_co_lead_orgs_on_organization_id", using: :btree
  add_index "trial_co_lead_orgs", ["trial_id"], name: "index_trial_co_lead_orgs_on_trial_id", using: :btree

  create_table "trial_co_pis", force: :cascade do |t|
    t.integer  "trial_id"
    t.integer  "person_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  add_index "trial_co_pis", ["person_id"], name: "index_trial_co_pis_on_person_id", using: :btree
  add_index "trial_co_pis", ["trial_id"], name: "index_trial_co_pis_on_trial_id", using: :btree

  create_table "trial_documents", force: :cascade do |t|
    t.string   "file"
    t.string   "file_name",        limit: 255
    t.string   "document_type",    limit: 255
    t.string   "document_subtype", limit: 255
    t.integer  "added_by_id"
    t.integer  "trial_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
  end

  add_index "trial_documents", ["added_by_id"], name: "index_trial_documents_on_added_by_id", using: :btree
  add_index "trial_documents", ["trial_id"], name: "index_trial_documents_on_trial_id", using: :btree

  create_table "trial_funding_sources", force: :cascade do |t|
    t.integer  "trial_id"
    t.integer  "organization_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
  end

  add_index "trial_funding_sources", ["organization_id"], name: "index_trial_funding_sources_on_organization_id", using: :btree
  add_index "trial_funding_sources", ["trial_id"], name: "index_trial_funding_sources_on_trial_id", using: :btree

  create_table "trial_status_wrappers", force: :cascade do |t|
    t.date     "status_date"
    t.text     "why_stopped"
    t.integer  "trial_status_id"
    t.integer  "trial_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
  end

  add_index "trial_status_wrappers", ["trial_id"], name: "index_trial_status_wrappers_on_trial_id", using: :btree
  add_index "trial_status_wrappers", ["trial_status_id"], name: "index_trial_status_wrappers_on_trial_status_id", using: :btree

  create_table "trial_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "trials", force: :cascade do |t|
    t.string   "nci_id",                  limit: 255
    t.string   "lead_protocol_id",        limit: 255
    t.text     "official_title"
    t.string   "pilot",                   limit: 255
    t.string   "primary_purpose_other",   limit: 255
    t.string   "secondary_purpose_other", limit: 255
    t.string   "program_code",            limit: 255
    t.string   "grant_question",          limit: 255
    t.date     "start_date"
    t.string   "start_date_qual",         limit: 255
    t.date     "primary_comp_date"
    t.string   "primary_comp_date_qual",  limit: 255
    t.date     "comp_date"
    t.string   "comp_date_qual",          limit: 255
    t.string   "ind_ide_question",        limit: 255
    t.string   "intervention_indicator",  limit: 255
    t.string   "sec801_indicator",        limit: 255
    t.string   "data_monitor_indicator",  limit: 255
    t.json     "history"
    t.integer  "study_source_id"
    t.integer  "phase_id"
    t.integer  "primary_purpose_id"
    t.integer  "secondary_purpose_id"
    t.integer  "responsible_party_id"
    t.integer  "lead_org_id"
    t.integer  "pi_id"
    t.integer  "sponsor_id"
    t.integer  "investigator_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "uuid",                    limit: 255
    t.integer  "lock_version",                        default: 0
    t.integer  "research_category_id"
    t.integer  "accrual_disease_term_id"
    t.string   "investigator_title",      limit: 255
    t.integer  "investigator_aff_id"
    t.string   "created_by",              limit: 255
    t.string   "updated_by",              limit: 255
    t.boolean  "is_draft"
  end

  add_index "trials", ["accrual_disease_term_id"], name: "index_trials_on_accrual_disease_term_id", using: :btree
  add_index "trials", ["investigator_aff_id"], name: "index_trials_on_investigator_aff_id", using: :btree
  add_index "trials", ["investigator_id"], name: "index_trials_on_investigator_id", using: :btree
  add_index "trials", ["lead_org_id"], name: "index_trials_on_lead_org_id", using: :btree
  add_index "trials", ["phase_id"], name: "index_trials_on_phase_id", using: :btree
  add_index "trials", ["pi_id"], name: "index_trials_on_pi_id", using: :btree
  add_index "trials", ["primary_purpose_id"], name: "index_trials_on_primary_purpose_id", using: :btree
  add_index "trials", ["research_category_id"], name: "index_trials_on_research_category_id", using: :btree
  add_index "trials", ["responsible_party_id"], name: "index_trials_on_responsible_party_id", using: :btree
  add_index "trials", ["secondary_purpose_id"], name: "index_trials_on_secondary_purpose_id", using: :btree
  add_index "trials", ["sponsor_id"], name: "index_trials_on_sponsor_id", using: :btree
  add_index "trials", ["study_source_id"], name: "index_trials_on_study_source_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                       limit: 255, default: "",    null: false
    t.string   "username",                    limit: 255, default: "",    null: false
    t.string   "encrypted_password",          limit: 255, default: "",    null: false
    t.string   "type"
    t.string   "provider",                    limit: 255
    t.string   "uid",                         limit: 255
    t.string   "role",                        limit: 255
    t.string   "reset_password_token",        limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                           default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",          limit: 255
    t.string   "last_sign_in_ip",             limit: 255
    t.integer  "failed_attempts",                         default: 0,     null: false
    t.string   "unlock_token",                limit: 255
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.text     "street_address"
    t.string   "zipcode"
    t.string   "country"
    t.string   "state"
    t.string   "middle_name"
    t.string   "prs_organization_name"
    t.boolean  "receive_email_notifications"
    t.string   "role_requested"
    t.boolean  "approved",                                default: false, null: false
    t.integer  "organization_id"
    t.string   "source"
  end

  add_index "users", ["approved"], name: "index_users_on_approved", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["organization_id"], name: "index_users_on_organization_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "versions", force: :cascade do |t|
    t.string   "item_type",      null: false
    t.integer  "item_id",        null: false
    t.string   "event",          null: false
    t.string   "whodunnit"
    t.text     "object"
    t.datetime "created_at"
    t.text     "object_changes"
  end

  add_index "versions", ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree

  add_foreign_key "families", "family_statuses"
  add_foreign_key "families", "family_types"
  add_foreign_key "family_memberships", "families"
  add_foreign_key "family_memberships", "family_relationships"
  add_foreign_key "family_memberships", "organizations"
  add_foreign_key "grants", "trials"
  add_foreign_key "ind_ides", "expanded_access_types"
  add_foreign_key "ind_ides", "holder_types"
  add_foreign_key "ind_ides", "trials"
  add_foreign_key "name_aliases", "organizations"
  add_foreign_key "organizations", "source_contexts"
  add_foreign_key "organizations", "source_statuses"
  add_foreign_key "other_ids", "protocol_id_origins"
  add_foreign_key "other_ids", "trials"
  add_foreign_key "oversight_authorities", "trials"
  add_foreign_key "people", "source_contexts"
  add_foreign_key "people", "source_statuses"
  add_foreign_key "po_affiliations", "organizations"
  add_foreign_key "po_affiliations", "people"
  add_foreign_key "po_affiliations", "po_affiliation_statuses"
  add_foreign_key "trial_co_lead_orgs", "organizations"
  add_foreign_key "trial_co_lead_orgs", "trials"
  add_foreign_key "trial_co_pis", "people"
  add_foreign_key "trial_co_pis", "trials"
  add_foreign_key "trial_documents", "trials"
  add_foreign_key "trial_documents", "users", column: "added_by_id"
  add_foreign_key "trial_funding_sources", "organizations"
  add_foreign_key "trial_funding_sources", "trials"
  add_foreign_key "trial_status_wrappers", "trial_statuses"
  add_foreign_key "trial_status_wrappers", "trials"
  add_foreign_key "trials", "accrual_disease_terms"
  add_foreign_key "trials", "organizations", column: "investigator_aff_id"
  add_foreign_key "trials", "organizations", column: "lead_org_id"
  add_foreign_key "trials", "organizations", column: "sponsor_id"
  add_foreign_key "trials", "people", column: "investigator_id"
  add_foreign_key "trials", "people", column: "pi_id"
  add_foreign_key "trials", "phases"
  add_foreign_key "trials", "primary_purposes"
  add_foreign_key "trials", "research_categories"
  add_foreign_key "trials", "responsible_parties"
  add_foreign_key "trials", "secondary_purposes"
  add_foreign_key "trials", "study_sources"
  create_sequence "accrual_disease_terms_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "app_settings_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "comments_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "expanded_access_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "families_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_memberships_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_relationships_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "grants_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "holder_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ind_ides_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "name_aliases_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "organizations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "other_ids_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "oversight_authorities_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "people_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "phases_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "po_affiliation_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "po_affiliations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "primary_purposes_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "protocol_id_origins_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "research_categories_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "responsible_parties_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "secondary_purposes_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "seq_families_id", :increment => 5, :min => 1, :max => 9223372036854775807, :start => 65000000, :cache => 1, :cycle => false
  create_sequence "seq_organizations_id", :increment => 5, :min => 1, :max => 9223372036854775807, :start => 65000000, :cache => 1, :cycle => false
  create_sequence "seq_persons_id", :increment => 5, :min => 1, :max => 9223372036854775807, :start => 65000000, :cache => 1, :cycle => false
  create_sequence "sessions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "source_clusters_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "source_contexts_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "source_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "study_sources_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_co_lead_orgs_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_co_pis_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_documents_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_funding_sources_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_status_wrappers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trials_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "users_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "versions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false

end
