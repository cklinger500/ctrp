class CtGovImportExport < ActiveRecord::Base

  def self.import_trial_statuses
    statuses = self.where(import_or_export:"import", model:"Trial Status")
    return statuses
  end

  def self.import_phases
    phases = self.where(import_or_export:"import", model:"Phase")
    return phases
  end

  def self.import_allocations
    allocations = self.where(import_or_export:"import", model:"Allocation")
    return allocations
  end

  def self.import_study_classifications
    study_classifications = self.where(import_or_export:"import", model:"StudyClassification")
    return study_classifications
  end

  def self.import_intervention_models
    intervention_models = self.where(import_or_export:"import", model:"InterventionModel")
    return intervention_models
  end

  def self.import_primary_purposes
    primary_purposes = self.where(import_or_export:"import", model:"PrimaryPurpose")
    return primary_purposes
  end

end
