module TableLoggable
  extend ActiveSupport::Concern

  module ClassMethods

    def request_logging(doc,action,request_or_response,user,model)
        return add_log_file("import_log.xml", doc, "xml", "tmp", action, "","",user,model)
    end

    def response_logging(trial,status, response_body,model,request_record)
        if trial
          object_id = trial.id
        else
          object_id =""
        end
        logDatum = model.find_by_id(request_record.id) if request_record
        logDatum.update({:status => status, :object_id => object_id, :response_body => response_body}) if logDatum
    end

    def add_log_file(file_name, file_content,document_type,tmp_file_name, action,status,trial_id,user,model)
          if file_content.nil?
            return
          end
          decode_base64_content = file_content
          file_extension = File.extname(file_name).delete('.') ##sample.pdf will give pdf
          file_format    = File.extname(file_name)             ##sample.pdf will give .pdf

          temp_file = Tempfile.new(['Sample2',file_format])
          temp_file.binmode
          temp_file <<  decode_base64_content
          #temp_file.rewind
          file_params = {:filename => file_name, :tempfile => temp_file}

          uploaded_file = ActionDispatch::Http::UploadedFile.new(file_params)
          log_datum_params = {:file => uploaded_file, :document_type =>document_type, :file_name => file_name, :context => "Import", :object =>"ImportTrial", :method => action, :status => status, :object_id => trial_id, :user => user}
          request_record = model.create(log_datum_params)
          return request_record
    end

  end

end
