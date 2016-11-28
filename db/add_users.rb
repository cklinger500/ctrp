require "rest-client"

url = "http://localhost:3000/ctrp/local_users"
#url = "http://localhost/ctrp/local_users"

["ctrpsuper", "ctrpsuper2", "ctrpsuper3", "ctrpadmin", "ctrpcurator", "ctrpro", "ctrptrialsubmitter", "ctrptrialsubmitter2", "ctrptrialsubmitter3", "ctrpaccrualsubmitter", "ctrpsitesu", "ctrpsitesu2", "ctrpabstractor", "ctrpabstractor2", "ctrpabstractor3", "ctrpabstractorsu", "ctepservice", "dcpservice", "ccrservice", "ctrpaccountapprover1", "ctrpaccountapprover2"].each do |username|

  body =    { "local_user" => {"username" => username, "password" => "Welcome01", "email" => "#{username}@ctrp-ci.nci.nih.gov"},
      "type" => "LocalUser"
  }

  RestClient.post(url, body.to_json, :content_type => :json) do |response, request, result, &block|
        if [301, 302, 307].include? response.code
            redirected_url = response.headers[:location]
        else
            response.return!(request, result, &block)
        end
    end
end
