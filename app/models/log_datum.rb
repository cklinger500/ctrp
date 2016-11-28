class LogDatum < ActiveRecord::Base
  mount_uploader :file, LogDatumUploader
end
