namespace :ctrp_swagger do
  desc "Rails Swagger specific jobs"
  task vers2: :environment do
    ctrp_api_files_arr = JSON.load(open("public/api-docs.json"))["apis"].map do |hash|
      hash["path"].sub! "{format}", "json"
    end
    ctrp_api_files_arr.each do |file|
      file_loc = "public/#{file}"
      file_in_json = JSON.load(open(file_loc,"r"))

      file_in_json["apis"].each do |v|
        v["path"] = "/" + v["path"]
      end
      # writing over file to make it Swagger UI version 2 friendly:
      File.open(file_loc, "w") {|file| file.puts file_in_json.to_json }
    end
    p 'Updated paths for Swagger UI 2.0'
  end
end
