class TrialBase < ActiveRecord::Base
  self.abstract_class = true
  include BasicConcerns
  has_paper_trail :class_name => "TrialVersion"
end