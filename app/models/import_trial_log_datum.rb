class ImportTrialLogDatum < ActiveRecord::Base
  mount_uploader :file, ImportTrialLogDatumUploader
end
