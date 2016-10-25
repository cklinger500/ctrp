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

ActiveRecord::Schema.define(version: 20161016031557) do

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

  create_table "age_units", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "allocations", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "alternate_titles", force: :cascade do |t|
    t.string   "category",     limit: 255
    t.text     "title"
    t.integer  "trial_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
    t.string   "source"
  end

  add_index "alternate_titles", ["trial_id"], name: "index_alternate_titles_on_trial_id", using: :btree

  create_table "amendment_reasons", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "anatomic_site_wrappers", force: :cascade do |t|
    t.integer  "anatomic_site_id"
    t.integer  "trial_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at"
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
  end

  add_index "anatomic_site_wrappers", ["anatomic_site_id"], name: "index_anatomic_site_wrappers_on_anatomic_site_id", using: :btree
  add_index "anatomic_site_wrappers", ["trial_id"], name: "index_anatomic_site_wrappers_on_trial_id", using: :btree

  create_table "anatomic_sites", force: :cascade do |t|
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

  create_table "arms_groups", force: :cascade do |t|
    t.string   "label",            limit: 255
    t.text     "description"
    t.integer  "trial_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
    t.string   "arms_groups_type"
  end

  add_index "arms_groups", ["trial_id"], name: "index_arms_groups_on_trial_id", using: :btree

  create_table "arms_groups_interventions_associations", force: :cascade do |t|
    t.integer  "arms_group_id"
    t.integer  "intervention_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
  end

  add_index "arms_groups_interventions_associations", ["arms_group_id"], name: "index_arms_groups_interventions_associations_on_arms_group_id", using: :btree
  add_index "arms_groups_interventions_associations", ["intervention_id"], name: "index_arms_groups_interventions_associations_on_intervention_id", using: :btree

  create_table "assay_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "associated_trials", force: :cascade do |t|
    t.string   "trial_identifier",       limit: 255
    t.integer  "identifier_type_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "uuid",                   limit: 255
    t.integer  "lock_version",                       default: 0
    t.text     "official_title"
    t.string   "research_category_name"
  end

  add_index "associated_trials", ["identifier_type_id"], name: "index_associated_trials_on_identifier_type_id", using: :btree
  add_index "associated_trials", ["trial_id"], name: "index_associated_trials_on_trial_id", using: :btree

  create_table "biomarker_purposes", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "biomarker_uses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "biospecimen_retentions", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "board_approval_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "cadsr_marker_statuses", force: :cascade do |t|
    t.string   "code"
    t.string   "name"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "cadsr_marker_synonyms", force: :cascade do |t|
    t.string   "alternate_name"
    t.integer  "cadsr_marker_id"
    t.integer  "cadsr_marker_status_id"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "uuid",                   limit: 255
    t.integer  "lock_version",                       default: 0
  end

  add_index "cadsr_marker_synonyms", ["cadsr_marker_id"], name: "index_cadsr_marker_synonyms_on_cadsr_marker_id", using: :btree
  add_index "cadsr_marker_synonyms", ["cadsr_marker_status_id"], name: "index_cadsr_marker_synonyms_on_cadsr_marker_status_id", using: :btree

  create_table "cadsr_markers", force: :cascade do |t|
    t.string   "name",                   limit: 2000
    t.string   "meaning",                limit: 2000
    t.text     "description"
    t.integer  "cadsr_id"
    t.string   "nv_term_identifier",     limit: 200
    t.string   "pv_name",                limit: 2000
    t.integer  "cadsr_marker_status_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "uuid",                   limit: 255
    t.integer  "lock_version",                        default: 0
  end

  add_index "cadsr_markers", ["cadsr_marker_status_id"], name: "index_cadsr_markers_on_cadsr_marker_status_id", using: :btree

  create_table "central_contact_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "central_contacts", force: :cascade do |t|
    t.string   "phone",                   limit: 255
    t.string   "email",                   limit: 255
    t.integer  "central_contact_type_id"
    t.integer  "person_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "uuid",                    limit: 255
    t.integer  "lock_version",                        default: 0
    t.string   "extension",               limit: 255
    t.string   "fullname"
  end

  add_index "central_contacts", ["central_contact_type_id"], name: "index_central_contacts_on_central_contact_type_id", using: :btree
  add_index "central_contacts", ["person_id"], name: "index_central_contacts_on_person_id", using: :btree
  add_index "central_contacts", ["trial_id"], name: "index_central_contacts_on_trial_id", using: :btree

  create_table "citations", force: :cascade do |t|
    t.string   "pub_med_id",        limit: 255
    t.text     "description"
    t.string   "results_reference", limit: 255
    t.integer  "trial_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "uuid",              limit: 255
    t.integer  "lock_version",                  default: 0
  end

  add_index "citations", ["trial_id"], name: "index_citations_on_trial_id", using: :btree

  create_table "collaborators", force: :cascade do |t|
    t.string   "org_name"
    t.integer  "organization_id"
    t.integer  "trial_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
  end

  add_index "collaborators", ["organization_id"], name: "index_collaborators_on_organization_id", using: :btree
  add_index "collaborators", ["trial_id"], name: "index_collaborators_on_trial_id", using: :btree

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

  create_table "ct_gov_import_exports", force: :cascade do |t|
    t.string   "from",             limit: 255
    t.string   "to",               limit: 255
    t.string   "import_or_export", limit: 255
    t.string   "model",            limit: 255
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
  end

  create_table "ctep_org_types", force: :cascade do |t|
    t.string   "code",          limit: 255
    t.string   "name",          limit: 255
    t.string   "record_status"
    t.string   "sent_to_ctrp"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "uuid",          limit: 255
    t.integer  "lock_version",              default: 0
  end

  create_table "diseases", force: :cascade do |t|
    t.string   "preferred_name",   limit: 255
    t.string   "code",             limit: 255
    t.string   "thesaurus_id",     limit: 255
    t.string   "display_name",     limit: 255
    t.text     "parent_preferred"
    t.integer  "trial_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
    t.string   "rank",             limit: 255
  end

  add_index "diseases", ["trial_id"], name: "index_diseases_on_trial_id", using: :btree

  create_table "evaluation_types", force: :cascade do |t|
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

  create_table "genders", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "grants", force: :cascade do |t|
    t.string   "funding_mechanism",   limit: 255
    t.string   "institute_code",      limit: 255
    t.string   "nci",                 limit: 255
    t.integer  "trial_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uuid",                limit: 255
    t.integer  "lock_version",                    default: 0
    t.string   "serial_number",       limit: 255
    t.text     "deletion_comment"
    t.datetime "deleted_at"
    t.string   "deleted_by_username"
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

  create_table "identifier_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "import_trial_log_data", force: :cascade do |t|
    t.string   "file"
    t.string   "file_name",        limit: 255
    t.string   "document_type",    limit: 255
    t.string   "document_subtype", limit: 255
    t.string   "context",          limit: 255
    t.string   "object",           limit: 255
    t.string   "method",           limit: 255
    t.string   "status",           limit: 255
    t.string   "object_id",        limit: 255
    t.string   "user",             limit: 255
    t.text     "response_body"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
  end

  create_table "ind_ides", force: :cascade do |t|
    t.string   "ind_ide_type",   limit: 255
    t.string   "grantor",        limit: 255
    t.string   "nih_nci",        limit: 255
    t.integer  "holder_type_id"
    t.integer  "trial_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uuid",           limit: 255
    t.integer  "lock_version",               default: 0
    t.string   "ind_ide_number", limit: 255
  end

  add_index "ind_ides", ["holder_type_id"], name: "index_ind_ides_on_holder_type_id", using: :btree
  add_index "ind_ides", ["trial_id"], name: "index_ind_ides_on_trial_id", using: :btree

  create_table "internal_sources", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "intervention_models", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "intervention_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
    t.string   "category"
  end

  create_table "interventions", force: :cascade do |t|
    t.string   "name",                 limit: 1000
    t.string   "other_name",           limit: 1000
    t.text     "description"
    t.integer  "intervention_type_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "uuid",                 limit: 255
    t.integer  "lock_version",                      default: 0
    t.integer  "index"
    t.string   "c_code"
  end

  add_index "interventions", ["c_code"], name: "index_interventions_on_c_code", using: :btree
  add_index "interventions", ["intervention_type_id"], name: "index_interventions_on_intervention_type_id", using: :btree
  add_index "interventions", ["trial_id"], name: "index_interventions_on_trial_id", using: :btree

  create_table "links", force: :cascade do |t|
    t.text     "url"
    t.text     "description"
    t.integer  "trial_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  add_index "links", ["trial_id"], name: "index_links_on_trial_id", using: :btree

  create_table "log_data", force: :cascade do |t|
    t.string   "file"
    t.string   "file_name",        limit: 255
    t.string   "document_type",    limit: 255
    t.string   "document_subtype", limit: 255
    t.string   "context",          limit: 255
    t.string   "object",           limit: 255
    t.string   "method",           limit: 255
    t.string   "status",           limit: 255
    t.string   "object_id",        limit: 255
    t.string   "user",             limit: 255
    t.text     "response_body"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
  end

  create_table "mail_logs", force: :cascade do |t|
    t.string   "from"
    t.string   "to"
    t.string   "cc"
    t.string   "bcc"
    t.string   "subject"
    t.text     "body"
    t.string   "email_template_name"
    t.string   "result"
    t.integer  "trial_id"
    t.integer  "mail_template_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  add_index "mail_logs", ["mail_template_id"], name: "index_mail_logs_on_mail_template_id", using: :btree
  add_index "mail_logs", ["trial_id"], name: "index_mail_logs_on_trial_id", using: :btree

  create_table "mail_templates", force: :cascade do |t|
    t.text     "from"
    t.text     "to"
    t.text     "cc"
    t.text     "bcc"
    t.text     "subject"
    t.text     "body_text"
    t.text     "body_html"
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "marker_assay_type_associations", force: :cascade do |t|
    t.integer  "marker_id"
    t.integer  "assay_type_id"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "uuid",          limit: 255
    t.integer  "lock_version",              default: 0
  end

  add_index "marker_assay_type_associations", ["assay_type_id"], name: "index_marker_assay_type_associations_on_assay_type_id", using: :btree
  add_index "marker_assay_type_associations", ["marker_id"], name: "index_marker_assay_type_associations_on_marker_id", using: :btree

  create_table "marker_biomarker_purpose_associations", force: :cascade do |t|
    t.integer  "marker_id"
    t.integer  "biomarker_purpose_id"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "uuid",                 limit: 255
    t.integer  "lock_version",                     default: 0
  end

  add_index "marker_biomarker_purpose_associations", ["biomarker_purpose_id"], name: "index_on_biomarker_purpose", using: :btree
  add_index "marker_biomarker_purpose_associations", ["marker_id"], name: "index_marker_biomarker_purpose_associations_on_marker_id", using: :btree

  create_table "marker_eval_type_associations", force: :cascade do |t|
    t.integer  "marker_id"
    t.integer  "evaluation_type_id"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.string   "uuid",               limit: 255
    t.integer  "lock_version",                   default: 0
  end

  add_index "marker_eval_type_associations", ["evaluation_type_id"], name: "index_marker_eval_type_associations_on_evaluation_type_id", using: :btree
  add_index "marker_eval_type_associations", ["marker_id"], name: "index_marker_eval_type_associations_on_marker_id", using: :btree

  create_table "marker_spec_type_associations", force: :cascade do |t|
    t.integer  "marker_id"
    t.integer  "specimen_type_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
  end

  add_index "marker_spec_type_associations", ["marker_id"], name: "index_marker_spec_type_associations_on_marker_id", using: :btree
  add_index "marker_spec_type_associations", ["specimen_type_id"], name: "index_marker_spec_type_associations_on_specimen_type_id", using: :btree

  create_table "markers", force: :cascade do |t|
    t.string   "name",                  limit: 255
    t.string   "record_status",         limit: 255
    t.integer  "biomarker_use_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "uuid",                  limit: 255
    t.integer  "lock_version",                      default: 0
    t.string   "evaluation_type_other", limit: 255
    t.string   "assay_type_other",      limit: 255
    t.string   "specimen_type_other",   limit: 255
    t.string   "protocol_marker_name",  limit: 255
    t.integer  "cadsr_marker_id"
  end

  add_index "markers", ["biomarker_use_id"], name: "index_markers_on_biomarker_use_id", using: :btree
  add_index "markers", ["cadsr_marker_id"], name: "index_markers_on_cadsr_marker_id", using: :btree
  add_index "markers", ["trial_id"], name: "index_markers_on_trial_id", using: :btree

  create_table "maskings", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "milestone_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "milestone_wrappers", force: :cascade do |t|
    t.date     "milestone_date"
    t.integer  "milestone_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "uuid",              limit: 255
    t.integer  "lock_version",                  default: 0
    t.integer  "submission_id"
    t.text     "comment"
    t.integer  "milestone_type_id"
    t.string   "created_by",        limit: 255
  end

  add_index "milestone_wrappers", ["milestone_id"], name: "index_milestone_wrappers_on_milestone_id", using: :btree
  add_index "milestone_wrappers", ["milestone_type_id"], name: "index_milestone_wrappers_on_milestone_type_id", using: :btree
  add_index "milestone_wrappers", ["submission_id"], name: "index_milestone_wrappers_on_submission_id", using: :btree
  add_index "milestone_wrappers", ["trial_id"], name: "index_milestone_wrappers_on_trial_id", using: :btree

  create_table "milestones", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "name_aliases", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.integer  "organization_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
  end

  add_index "name_aliases", ["organization_id"], name: "index_name_aliases_on_organization_id", using: :btree

  create_table "ncit_disease_codes", force: :cascade do |t|
    t.string   "disease_code",      limit: 255
    t.string   "nt_term_id",        limit: 255
    t.string   "preferred_name",    limit: 1000
    t.string   "menu_display_name", limit: 1000
    t.integer  "ncit_status_id"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.string   "uuid",              limit: 255
    t.integer  "lock_version",                   default: 0
  end

  add_index "ncit_disease_codes", ["ncit_status_id"], name: "index_ncit_disease_codes_on_ncit_status_id", using: :btree

  create_table "ncit_disease_parents", force: :cascade do |t|
    t.string   "parent_disease_code", limit: 255
    t.integer  "ncit_status_id"
    t.integer  "child_id"
    t.integer  "parent_id"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.string   "uuid",                limit: 255
    t.integer  "lock_version",                    default: 0
  end

  add_index "ncit_disease_parents", ["child_id"], name: "index_ncit_disease_parents_on_child_id", using: :btree
  add_index "ncit_disease_parents", ["ncit_status_id"], name: "index_ncit_disease_parents_on_ncit_status_id", using: :btree
  add_index "ncit_disease_parents", ["parent_id"], name: "index_ncit_disease_parents_on_parent_id", using: :btree

  create_table "ncit_disease_synonyms", force: :cascade do |t|
    t.string   "alternate_name",       limit: 1000
    t.integer  "ncit_status_id"
    t.integer  "ncit_disease_code_id"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "uuid",                 limit: 255
    t.integer  "lock_version",                      default: 0
  end

  add_index "ncit_disease_synonyms", ["ncit_disease_code_id"], name: "index_ncit_disease_synonyms_on_ncit_disease_code_id", using: :btree
  add_index "ncit_disease_synonyms", ["ncit_status_id"], name: "index_ncit_disease_synonyms_on_ncit_status_id", using: :btree

  create_table "ncit_interventions", force: :cascade do |t|
    t.string   "preferred_name"
    t.string   "synonyms"
    t.text     "definition"
    t.integer  "ncit_status_id"
    t.string   "type_code"
    t.string   "ct_gov_type_code"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "c_code"
  end

  add_index "ncit_interventions", ["c_code"], name: "index_ncit_interventions_on_c_code", using: :btree
  add_index "ncit_interventions", ["ncit_status_id"], name: "index_ncit_interventions_on_ncit_status_id", using: :btree
  add_index "ncit_interventions", ["preferred_name"], name: "index_ncit_interventions_on_preferred_name", using: :btree

  create_table "ncit_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "onhold_reasons", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "onholds", force: :cascade do |t|
    t.text     "onhold_desc"
    t.date     "onhold_date"
    t.integer  "onhold_reason_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.string   "uuid",               limit: 255
    t.integer  "lock_version",                   default: 0
    t.string   "onhold_reason_code", limit: 255
    t.date     "offhold_date"
  end

  add_index "onholds", ["onhold_reason_id"], name: "index_onholds_on_onhold_reason_id", using: :btree
  add_index "onholds", ["trial_id"], name: "index_onholds_on_trial_id", using: :btree

  create_table "org_funding_mechanisms", force: :cascade do |t|
    t.string   "code",          limit: 255
    t.string   "name",          limit: 255
    t.string   "record_status"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "uuid",          limit: 255
    t.integer  "lock_version",              default: 0
  end

  create_table "organizations", force: :cascade do |t|
    t.string   "source_id",                limit: 255
    t.string   "name",                     limit: 255
    t.string   "address",                  limit: 255
    t.string   "address2",                 limit: 255
    t.string   "city",                     limit: 255
    t.string   "state_province",           limit: 255
    t.string   "postal_code",              limit: 255
    t.string   "country",                  limit: 255
    t.string   "email",                    limit: 255
    t.string   "phone",                    limit: 255
    t.integer  "source_status_id"
    t.integer  "source_context_id"
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
    t.string   "uuid",                     limit: 255
    t.integer  "lock_version",                         default: 0
    t.integer  "ctrp_id"
    t.string   "created_by"
    t.string   "updated_by"
    t.string   "extension",                limit: 255
    t.string   "processing_status"
    t.string   "address3"
    t.integer  "service_request_id"
    t.integer  "ctep_org_type_id"
    t.integer  "org_funding_mechanism_id"
    t.datetime "association_date"
  end

  add_index "organizations", ["ctep_org_type_id"], name: "index_organizations_on_ctep_org_type_id", using: :btree
  add_index "organizations", ["org_funding_mechanism_id"], name: "index_organizations_on_org_funding_mechanism_id", using: :btree
  add_index "organizations", ["service_request_id"], name: "index_organizations_on_service_request_id", using: :btree
  add_index "organizations", ["source_context_id"], name: "index_organizations_on_source_context_id", using: :btree
  add_index "organizations", ["source_status_id"], name: "index_organizations_on_source_status_id", using: :btree

  create_table "other_criteria", force: :cascade do |t|
    t.string   "criteria_type", limit: 255
    t.integer  "trial_id"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "uuid",          limit: 255
    t.integer  "lock_version",              default: 0
    t.text     "criteria_desc"
    t.integer  "index"
  end

  add_index "other_criteria", ["trial_id"], name: "index_other_criteria_on_trial_id", using: :btree

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

  create_table "outcome_measure_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "outcome_measures", force: :cascade do |t|
    t.text     "title"
    t.string   "time_frame",              limit: 255
    t.text     "description"
    t.string   "safety_issue",            limit: 255
    t.integer  "outcome_measure_type_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "uuid",                    limit: 255
    t.integer  "lock_version",                        default: 0
    t.integer  "index"
  end

  add_index "outcome_measures", ["outcome_measure_type_id"], name: "index_outcome_measures_on_outcome_measure_type_id", using: :btree
  add_index "outcome_measures", ["trial_id"], name: "index_outcome_measures_on_trial_id", using: :btree

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

  create_table "participating_site_investigators", force: :cascade do |t|
    t.integer  "participating_site_id"
    t.integer  "person_id"
    t.boolean  "set_as_contact"
    t.string   "investigator_type",     limit: 255
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "uuid",                  limit: 255
    t.integer  "lock_version",                      default: 0
  end

  add_index "participating_site_investigators", ["participating_site_id"], name: "index_participating_site_investigators_on_participating_site_id", using: :btree
  add_index "participating_site_investigators", ["person_id"], name: "index_participating_site_investigators_on_person_id", using: :btree

  create_table "participating_sites", force: :cascade do |t|
    t.string   "protocol_id",            limit: 255
    t.string   "program_code",           limit: 255
    t.string   "contact_name",           limit: 255
    t.string   "contact_phone",          limit: 255
    t.string   "contact_email",          limit: 255
    t.integer  "trial_id"
    t.integer  "organization_id"
    t.integer  "person_id"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at"
    t.string   "uuid",                   limit: 255
    t.integer  "lock_version",                       default: 0
    t.string   "extension",              limit: 255
    t.string   "contact_type",           limit: 255
    t.string   "local_trial_identifier"
    t.integer  "legacy_ps_id"
  end

  add_index "participating_sites", ["organization_id"], name: "index_participating_sites_on_organization_id", using: :btree
  add_index "participating_sites", ["person_id"], name: "index_participating_sites_on_person_id", using: :btree
  add_index "participating_sites", ["trial_id"], name: "index_participating_sites_on_trial_id", using: :btree

  create_table "people", force: :cascade do |t|
    t.string   "source_id",              limit: 255
    t.string   "prefix",                 limit: 255
    t.string   "suffix",                 limit: 255
    t.string   "email",                  limit: 255
    t.string   "phone",                  limit: 255
    t.integer  "source_status_id"
    t.integer  "source_context_id"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "uuid",                   limit: 255
    t.integer  "lock_version",                       default: 0
    t.string   "fname",                  limit: 255
    t.string   "mname",                  limit: 255
    t.string   "lname",                  limit: 255
    t.integer  "ctrp_id"
    t.string   "created_by"
    t.string   "updated_by"
    t.string   "extension",              limit: 255
    t.string   "processing_status"
    t.datetime "association_start_date"
    t.string   "registration_type"
    t.integer  "service_request_id"
  end

  add_index "people", ["service_request_id"], name: "index_people_on_service_request_id", using: :btree
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

  create_table "processing_status_wrappers", force: :cascade do |t|
    t.date     "status_date"
    t.integer  "processing_status_id"
    t.integer  "trial_id"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "uuid",                 limit: 255
    t.integer  "lock_version",                     default: 0
    t.integer  "submission_id"
  end

  add_index "processing_status_wrappers", ["processing_status_id"], name: "index_processing_status_wrappers_on_processing_status_id", using: :btree
  add_index "processing_status_wrappers", ["submission_id"], name: "index_processing_status_wrappers_on_submission_id", using: :btree
  add_index "processing_status_wrappers", ["trial_id"], name: "index_processing_status_wrappers_on_trial_id", using: :btree

  create_table "processing_statuses", force: :cascade do |t|
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
    t.string   "section"
  end

  create_table "registration_types", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
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

  create_table "service_requests", force: :cascade do |t|
    t.string   "code",          limit: 255
    t.string   "name",          limit: 255
    t.string   "record_status"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "uuid",          limit: 255
    t.integer  "lock_version",              default: 0
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
  add_index "sessions", ["updated_at"], name: "index_sessions_on_updated_at", using: :btree

  create_table "site_rec_status_wrappers", force: :cascade do |t|
    t.date     "status_date"
    t.integer  "site_recruitment_status_id"
    t.integer  "participating_site_id"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "uuid",                       limit: 255
    t.integer  "lock_version",                           default: 0
    t.text     "comments"
  end

  add_index "site_rec_status_wrappers", ["participating_site_id"], name: "index_site_rec_status_wrappers_on_participating_site_id", using: :btree
  add_index "site_rec_status_wrappers", ["site_recruitment_status_id"], name: "index_site_rec_status_wrappers_on_site_recruitment_status_id", using: :btree

  create_table "site_recruitment_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

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
    t.string   "code",              limit: 255
    t.string   "name",              limit: 255
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "uuid",              limit: 255
    t.integer  "lock_version",                  default: 0
    t.string   "record_status"
    t.integer  "source_context_id"
  end

  add_index "source_statuses", ["source_context_id"], name: "index_source_statuses_on_source_context_id", using: :btree

  create_table "specimen_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "study_classifications", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "study_models", force: :cascade do |t|
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

  create_table "sub_groups", force: :cascade do |t|
    t.string   "label",        limit: 255
    t.text     "description"
    t.integer  "trial_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
    t.integer  "index"
  end

  add_index "sub_groups", ["trial_id"], name: "index_sub_groups_on_trial_id", using: :btree

  create_table "submission_methods", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "submission_sources", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "submission_types", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "submissions", force: :cascade do |t|
    t.integer  "submission_num"
    t.date     "submission_date"
    t.date     "amendment_date"
    t.integer  "amendment_reason_id"
    t.integer  "trial_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uuid",                                          limit: 255
    t.integer  "lock_version",                                              default: 0
    t.string   "amendment_num",                                 limit: 255
    t.integer  "submission_type_id"
    t.integer  "submission_source_id"
    t.integer  "submission_method_id"
    t.integer  "user_id"
    t.string   "acknowledge",                                   limit: 255
    t.text     "acknowledge_comment"
    t.date     "acknowledge_date"
    t.string   "acknowledged_by",                               limit: 255
    t.string   "status"
    t.date     "expected_abstraction_completion_date"
    t.string   "expected_abstraction_completion_date_comments"
  end

  add_index "submissions", ["amendment_reason_id"], name: "index_submissions_on_amendment_reason_id", using: :btree
  add_index "submissions", ["submission_method_id"], name: "index_submissions_on_submission_method_id", using: :btree
  add_index "submissions", ["submission_source_id"], name: "index_submissions_on_submission_source_id", using: :btree
  add_index "submissions", ["submission_type_id"], name: "index_submissions_on_submission_type_id", using: :btree
  add_index "submissions", ["trial_id"], name: "index_submissions_on_trial_id", using: :btree
  add_index "submissions", ["user_id"], name: "index_submissions_on_user_id", using: :btree

  create_table "tempgrants", force: :cascade do |t|
    t.integer  "serial_number"
    t.string   "institution_name"
    t.string   "project_title"
    t.string   "funding_mechanism"
    t.string   "institute_code"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "pi_full_name",      limit: 255
  end

  add_index "tempgrants", ["funding_mechanism"], name: "index_tempgrants_on_funding_mechanism", using: :btree
  add_index "tempgrants", ["institute_code"], name: "index_tempgrants_on_institute_code", using: :btree

  create_table "time_perspectives", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "trial_checkout_logs", force: :cascade do |t|
    t.integer  "trial_id"
    t.string   "abstraction_type"
    t.string   "category"
    t.string   "username"
    t.string   "full_name"
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "result"
    t.text     "checkin_comment"
  end

  add_index "trial_checkout_logs", ["trial_id"], name: "index_trial_checkout_logs_on_trial_id", using: :btree
  add_index "trial_checkout_logs", ["user_id"], name: "index_trial_checkout_logs_on_user_id", using: :btree

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
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uuid",             limit: 255
    t.integer  "lock_version",                 default: 0
    t.integer  "submission_id"
    t.string   "status",                       default: "active"
    t.string   "why_deleted"
    t.string   "source_document",              default: "Registry"
    t.string   "deleted_by"
    t.date     "deletion_date"
  end

  add_index "trial_documents", ["added_by_id"], name: "index_trial_documents_on_added_by_id", using: :btree
  add_index "trial_documents", ["submission_id"], name: "index_trial_documents_on_submission_id", using: :btree
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

  create_table "trial_histories", force: :cascade do |t|
    t.json     "snapshot"
    t.integer  "submission_id"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "uuid",          limit: 255
    t.integer  "lock_version",              default: 0
  end

  add_index "trial_histories", ["submission_id"], name: "index_trial_histories_on_submission_id", using: :btree

  create_table "trial_ownerships", force: :cascade do |t|
    t.integer  "trial_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
    t.datetime "ended_at"
  end

  add_index "trial_ownerships", ["trial_id"], name: "index_trial_ownerships_on_trial_id", using: :btree
  add_index "trial_ownerships", ["user_id"], name: "index_trial_ownerships_on_user_id", using: :btree

  create_table "trial_status_wrappers", force: :cascade do |t|
    t.date     "status_date"
    t.text     "why_stopped"
    t.integer  "trial_status_id"
    t.integer  "trial_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uuid",            limit: 255
    t.integer  "lock_version",                default: 0
    t.text     "comment"
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
    t.string   "explanation"
  end

  create_table "trial_versions", force: :cascade do |t|
    t.string   "item_type",      null: false
    t.integer  "item_id",        null: false
    t.string   "event",          null: false
    t.string   "whodunnit"
    t.jsonb    "object"
    t.datetime "created_at"
    t.jsonb    "object_changes"
    t.integer  "transaction_id"
  end

  add_index "trial_versions", ["item_type", "item_id"], name: "index_trial_versions_on_item_type_and_item_id", using: :btree
  add_index "trial_versions", ["transaction_id"], name: "index_trial_versions_on_transaction_id", using: :btree

  create_table "trials", force: :cascade do |t|
    t.string   "nci_id",                        limit: 255
    t.string   "lead_protocol_id",              limit: 255
    t.text     "official_title"
    t.string   "pilot",                         limit: 255
    t.string   "primary_purpose_other",         limit: 255
    t.text     "secondary_purpose_other"
    t.string   "program_code",                  limit: 255
    t.string   "grant_question",                limit: 255
    t.date     "start_date"
    t.string   "start_date_qual",               limit: 255
    t.date     "primary_comp_date"
    t.string   "primary_comp_date_qual",        limit: 255
    t.date     "comp_date"
    t.string   "comp_date_qual",                limit: 255
    t.string   "ind_ide_question",              limit: 255
    t.string   "intervention_indicator",        limit: 255
    t.string   "sec801_indicator",              limit: 255
    t.string   "data_monitor_indicator",        limit: 255
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
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at"
    t.string   "uuid",                          limit: 255
    t.integer  "lock_version",                               default: 0
    t.integer  "research_category_id"
    t.integer  "accrual_disease_term_id"
    t.string   "investigator_title",            limit: 255
    t.integer  "investigator_aff_id"
    t.string   "created_by",                    limit: 255
    t.string   "updated_by",                    limit: 255
    t.boolean  "is_draft"
    t.text     "admin_checkout"
    t.text     "scientific_checkout"
    t.text     "check_in_comment"
    t.string   "process_priority",              limit: 255
    t.text     "process_comment"
    t.string   "xml_required",                  limit: 255
    t.string   "acronym",                       limit: 255
    t.text     "keywords"
    t.string   "nih_nci_div",                   limit: 255
    t.string   "nih_nci_prog",                  limit: 255
    t.string   "send_trial",                    limit: 255
    t.string   "board_approval_num",            limit: 255
    t.text     "brief_title"
    t.text     "brief_summary"
    t.text     "detailed_description"
    t.text     "objective"
    t.integer  "target_enrollment"
    t.integer  "final_enrollment"
    t.integer  "accruals"
    t.string   "accept_vol",                    limit: 255
    t.integer  "min_age"
    t.integer  "max_age"
    t.integer  "assigned_to_id"
    t.integer  "board_approval_status_id"
    t.integer  "intervention_model_id"
    t.integer  "masking_id"
    t.integer  "allocation_id"
    t.integer  "study_classification_id"
    t.integer  "gender_id"
    t.integer  "min_age_unit_id"
    t.integer  "max_age_unit_id"
    t.integer  "num_of_arms"
    t.date     "verification_date"
    t.string   "sampling_method",               limit: 255
    t.text     "study_pop_desc"
    t.string   "board_name",                    limit: 255
    t.integer  "board_affiliation_id"
    t.boolean  "masking_role_caregiver"
    t.boolean  "masking_role_investigator"
    t.boolean  "masking_role_outcome_assessor"
    t.boolean  "masking_role_subject"
    t.string   "study_model_other",             limit: 255
    t.string   "time_perspective_other",        limit: 255
    t.integer  "study_model_id"
    t.integer  "time_perspective_id"
    t.integer  "biospecimen_retention_id"
    t.text     "biospecimen_desc"
    t.integer  "internal_source_id"
    t.string   "nci_specific_comment",          limit: 4000
    t.string   "send_trial_flag"
    t.boolean  "is_rejected"
  end

  add_index "trials", ["accrual_disease_term_id"], name: "index_trials_on_accrual_disease_term_id", using: :btree
  add_index "trials", ["allocation_id"], name: "index_trials_on_allocation_id", using: :btree
  add_index "trials", ["assigned_to_id"], name: "index_trials_on_assigned_to_id", using: :btree
  add_index "trials", ["biospecimen_retention_id"], name: "index_trials_on_biospecimen_retention_id", using: :btree
  add_index "trials", ["board_affiliation_id"], name: "index_trials_on_board_affiliation_id", using: :btree
  add_index "trials", ["board_approval_status_id"], name: "index_trials_on_board_approval_status_id", using: :btree
  add_index "trials", ["gender_id"], name: "index_trials_on_gender_id", using: :btree
  add_index "trials", ["internal_source_id"], name: "index_trials_on_internal_source_id", using: :btree
  add_index "trials", ["intervention_model_id"], name: "index_trials_on_intervention_model_id", using: :btree
  add_index "trials", ["investigator_aff_id"], name: "index_trials_on_investigator_aff_id", using: :btree
  add_index "trials", ["investigator_id"], name: "index_trials_on_investigator_id", using: :btree
  add_index "trials", ["lead_org_id"], name: "index_trials_on_lead_org_id", using: :btree
  add_index "trials", ["masking_id"], name: "index_trials_on_masking_id", using: :btree
  add_index "trials", ["max_age_unit_id"], name: "index_trials_on_max_age_unit_id", using: :btree
  add_index "trials", ["min_age_unit_id"], name: "index_trials_on_min_age_unit_id", using: :btree
  add_index "trials", ["phase_id"], name: "index_trials_on_phase_id", using: :btree
  add_index "trials", ["pi_id"], name: "index_trials_on_pi_id", using: :btree
  add_index "trials", ["primary_purpose_id"], name: "index_trials_on_primary_purpose_id", using: :btree
  add_index "trials", ["research_category_id"], name: "index_trials_on_research_category_id", using: :btree
  add_index "trials", ["responsible_party_id"], name: "index_trials_on_responsible_party_id", using: :btree
  add_index "trials", ["secondary_purpose_id"], name: "index_trials_on_secondary_purpose_id", using: :btree
  add_index "trials", ["sponsor_id"], name: "index_trials_on_sponsor_id", using: :btree
  add_index "trials", ["study_classification_id"], name: "index_trials_on_study_classification_id", using: :btree
  add_index "trials", ["study_model_id"], name: "index_trials_on_study_model_id", using: :btree
  add_index "trials", ["study_source_id"], name: "index_trials_on_study_source_id", using: :btree
  add_index "trials", ["time_perspective_id"], name: "index_trials_on_time_perspective_id", using: :btree

  create_table "user_statuses", force: :cascade do |t|
    t.string   "code",         limit: 255
    t.string   "name",         limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid",         limit: 255
    t.integer  "lock_version",             default: 0
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                       limit: 255, default: "", null: false
    t.string   "username",                    limit: 255, default: "", null: false
    t.string   "encrypted_password",          limit: 255, default: "", null: false
    t.string   "type"
    t.string   "provider",                    limit: 255
    t.string   "uid",                         limit: 255
    t.string   "role",                        limit: 255
    t.string   "reset_password_token",        limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                           default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",          limit: 255
    t.string   "last_sign_in_ip",             limit: 255
    t.integer  "failed_attempts",                         default: 0,  null: false
    t.string   "unlock_token",                limit: 255
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "middle_name"
    t.string   "prs_organization_name"
    t.boolean  "receive_email_notifications"
    t.string   "role_requested"
    t.integer  "organization_id"
    t.string   "source"
    t.integer  "user_status_id"
    t.string   "phone"
    t.string   "domain"
    t.datetime "status_date"
    t.string   "phone_ext"
  end

  add_index "users", ["organization_id"], name: "index_users_on_organization_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree
  add_index "users", ["user_status_id"], name: "index_users_on_user_status_id", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "validation_rules", force: :cascade do |t|
    t.string   "code"
    t.string   "section"
    t.string   "item"
    t.string   "rule"
    t.text     "description"
    t.text     "remark"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "model"
    t.string   "category"
  end

  create_table "version_associations", force: :cascade do |t|
    t.integer "version_id"
    t.string  "foreign_key_name", null: false
    t.integer "foreign_key_id"
  end

  add_index "version_associations", ["foreign_key_name", "foreign_key_id"], name: "index_version_associations_on_foreign_key", using: :btree
  add_index "version_associations", ["version_id"], name: "index_version_associations_on_version_id", using: :btree

  create_table "versions", force: :cascade do |t|
    t.string   "item_type",      null: false
    t.integer  "item_id",        null: false
    t.string   "event",          null: false
    t.string   "whodunnit"
    t.jsonb    "object"
    t.datetime "created_at"
    t.jsonb    "object_changes"
    t.integer  "transaction_id"
  end

  add_index "versions", ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree
  add_index "versions", ["transaction_id"], name: "index_versions_on_transaction_id", using: :btree

  add_foreign_key "alternate_titles", "trials"
  add_foreign_key "anatomic_site_wrappers", "anatomic_sites"
  add_foreign_key "anatomic_site_wrappers", "trials"
  add_foreign_key "arms_groups", "trials"
  add_foreign_key "arms_groups_interventions_associations", "arms_groups"
  add_foreign_key "arms_groups_interventions_associations", "interventions"
  add_foreign_key "associated_trials", "identifier_types"
  add_foreign_key "associated_trials", "trials"
  add_foreign_key "cadsr_marker_synonyms", "cadsr_marker_statuses"
  add_foreign_key "cadsr_marker_synonyms", "cadsr_markers"
  add_foreign_key "cadsr_markers", "cadsr_marker_statuses"
  add_foreign_key "central_contacts", "central_contact_types"
  add_foreign_key "central_contacts", "people"
  add_foreign_key "central_contacts", "trials"
  add_foreign_key "citations", "trials"
  add_foreign_key "collaborators", "organizations"
  add_foreign_key "collaborators", "trials"
  add_foreign_key "diseases", "trials"
  add_foreign_key "families", "family_statuses"
  add_foreign_key "families", "family_types"
  add_foreign_key "family_memberships", "families"
  add_foreign_key "family_memberships", "family_relationships"
  add_foreign_key "family_memberships", "organizations"
  add_foreign_key "grants", "trials"
  add_foreign_key "ind_ides", "holder_types"
  add_foreign_key "ind_ides", "trials"
  add_foreign_key "interventions", "intervention_types"
  add_foreign_key "interventions", "trials"
  add_foreign_key "links", "trials"
  add_foreign_key "mail_logs", "mail_templates"
  add_foreign_key "mail_logs", "trials"
  add_foreign_key "marker_assay_type_associations", "assay_types"
  add_foreign_key "marker_assay_type_associations", "markers"
  add_foreign_key "marker_biomarker_purpose_associations", "biomarker_purposes"
  add_foreign_key "marker_biomarker_purpose_associations", "markers"
  add_foreign_key "markers", "biomarker_uses"
  add_foreign_key "markers", "cadsr_markers"
  add_foreign_key "markers", "trials"
  add_foreign_key "milestone_wrappers", "milestone_types"
  add_foreign_key "milestone_wrappers", "milestones"
  add_foreign_key "milestone_wrappers", "submissions"
  add_foreign_key "milestone_wrappers", "trials"
  add_foreign_key "name_aliases", "organizations"
  add_foreign_key "ncit_disease_codes", "ncit_statuses"
  add_foreign_key "ncit_disease_parents", "ncit_disease_codes", column: "child_id"
  add_foreign_key "ncit_disease_parents", "ncit_disease_codes", column: "parent_id"
  add_foreign_key "ncit_disease_parents", "ncit_statuses"
  add_foreign_key "ncit_disease_synonyms", "ncit_disease_codes"
  add_foreign_key "ncit_disease_synonyms", "ncit_statuses"
  add_foreign_key "ncit_interventions", "ncit_statuses"
  add_foreign_key "onholds", "onhold_reasons"
  add_foreign_key "onholds", "trials"
  add_foreign_key "organizations", "ctep_org_types"
  add_foreign_key "organizations", "org_funding_mechanisms"
  add_foreign_key "organizations", "service_requests"
  add_foreign_key "organizations", "source_contexts"
  add_foreign_key "organizations", "source_statuses"
  add_foreign_key "other_criteria", "trials"
  add_foreign_key "other_ids", "protocol_id_origins"
  add_foreign_key "other_ids", "trials"
  add_foreign_key "outcome_measures", "outcome_measure_types"
  add_foreign_key "outcome_measures", "trials"
  add_foreign_key "oversight_authorities", "trials"
  add_foreign_key "participating_site_investigators", "participating_sites"
  add_foreign_key "participating_site_investigators", "people"
  add_foreign_key "participating_sites", "organizations"
  add_foreign_key "participating_sites", "people"
  add_foreign_key "participating_sites", "trials"
  add_foreign_key "people", "service_requests"
  add_foreign_key "people", "source_contexts"
  add_foreign_key "people", "source_statuses"
  add_foreign_key "po_affiliations", "organizations"
  add_foreign_key "po_affiliations", "people"
  add_foreign_key "po_affiliations", "po_affiliation_statuses"
  add_foreign_key "processing_status_wrappers", "processing_statuses"
  add_foreign_key "processing_status_wrappers", "submissions"
  add_foreign_key "processing_status_wrappers", "trials"
  add_foreign_key "site_rec_status_wrappers", "participating_sites"
  add_foreign_key "site_rec_status_wrappers", "site_recruitment_statuses"
  add_foreign_key "source_statuses", "source_contexts"
  add_foreign_key "sub_groups", "trials"
  add_foreign_key "submissions", "amendment_reasons"
  add_foreign_key "submissions", "submission_methods"
  add_foreign_key "submissions", "submission_sources"
  add_foreign_key "submissions", "submission_types"
  add_foreign_key "submissions", "trials"
  add_foreign_key "submissions", "users"
  add_foreign_key "trial_checkout_logs", "trials"
  add_foreign_key "trial_checkout_logs", "users"
  add_foreign_key "trial_co_lead_orgs", "organizations"
  add_foreign_key "trial_co_lead_orgs", "trials"
  add_foreign_key "trial_co_pis", "people"
  add_foreign_key "trial_co_pis", "trials"
  add_foreign_key "trial_documents", "submissions"
  add_foreign_key "trial_documents", "trials"
  add_foreign_key "trial_documents", "users", column: "added_by_id"
  add_foreign_key "trial_funding_sources", "organizations"
  add_foreign_key "trial_funding_sources", "trials"
  add_foreign_key "trial_histories", "submissions"
  add_foreign_key "trial_ownerships", "trials"
  add_foreign_key "trial_ownerships", "users"
  add_foreign_key "trial_status_wrappers", "trial_statuses"
  add_foreign_key "trial_status_wrappers", "trials"
  add_foreign_key "trials", "accrual_disease_terms"
  add_foreign_key "trials", "age_units", column: "max_age_unit_id"
  add_foreign_key "trials", "age_units", column: "min_age_unit_id"
  add_foreign_key "trials", "allocations"
  add_foreign_key "trials", "biospecimen_retentions"
  add_foreign_key "trials", "board_approval_statuses"
  add_foreign_key "trials", "genders"
  add_foreign_key "trials", "internal_sources"
  add_foreign_key "trials", "intervention_models"
  add_foreign_key "trials", "maskings"
  add_foreign_key "trials", "organizations", column: "board_affiliation_id"
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
  add_foreign_key "trials", "study_classifications"
  add_foreign_key "trials", "study_models"
  add_foreign_key "trials", "study_sources"
  add_foreign_key "trials", "time_perspectives"
  add_foreign_key "trials", "users", column: "assigned_to_id"
  add_foreign_key "users", "user_statuses"
  create_sequence "accrual_disease_terms_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "age_units_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "allocations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "alternate_titles_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "amendment_reasons_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "anatomic_site_wrappers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "anatomic_sites_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "app_settings_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "arms_groups_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "arms_groups_interventions_associations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "assay_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "associated_trials_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "biomarker_purposes_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "biomarker_uses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "biospecimen_retentions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "board_approval_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "cadsr_marker_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "cadsr_marker_synonyms_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "cadsr_markers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "central_contact_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "central_contacts_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "citations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "collaborators_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "comments_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ct_gov_import_exports_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ctep_org_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "diseases_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "evaluation_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "families_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_memberships_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_relationships_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "family_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "genders_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "grants_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "holder_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "identifier_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "import_trial_log_data_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ind_ides_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "internal_sources_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "intervention_models_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "intervention_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "interventions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "links_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "log_data_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "mail_logs_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "mail_templates_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "marker_assay_type_associations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "marker_biomarker_purpose_associations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "marker_eval_type_associations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "marker_spec_type_associations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "markers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "maskings_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "milestone_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "milestone_wrappers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "milestones_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "name_aliases_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ncit_disease_codes_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ncit_disease_parents_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ncit_disease_synonyms_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ncit_interventions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "ncit_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "onhold_reasons_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "onholds_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "org_funding_mechanisms_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "organizations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "other_criteria_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "other_ids_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "outcome_measure_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "outcome_measures_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "oversight_authorities_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "participating_site_investigators_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "participating_sites_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "people_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "phases_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "po_affiliation_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "po_affiliations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "primary_purposes_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "processing_status_wrappers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "processing_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "protocol_id_origins_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "registration_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "research_categories_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "responsible_parties_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "secondary_purposes_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "seq_families_id", :increment => 5, :min => 1, :max => 9223372036854775807, :start => 65000000, :cache => 1, :cycle => false
  create_sequence "seq_organizations_id", :increment => 5, :min => 1, :max => 9223372036854775807, :start => 65000000, :cache => 1, :cycle => false
  create_sequence "seq_persons_id", :increment => 5, :min => 1, :max => 9223372036854775807, :start => 65000000, :cache => 1, :cycle => false
  create_sequence "service_requests_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "sessions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "site_rec_status_wrappers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "site_recruitment_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "source_clusters_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "source_contexts_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "source_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "specimen_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "study_classifications_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "study_models_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "study_sources_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "sub_groups_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "submission_methods_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "submission_sources_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "submission_types_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "submissions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "tempgrants_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "time_perspectives_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_checkout_logs_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_co_lead_orgs_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_co_pis_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_documents_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_funding_sources_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_histories_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_ownerships_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_status_wrappers_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trial_versions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "trials_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "user_statuses_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "users_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "validation_rules_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "version_associations_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false
  create_sequence "versions_id_seq", :increment => 1, :min => 1, :max => 9223372036854775807, :start => 1, :cache => 1, :cycle => false

end
