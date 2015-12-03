#Shell script for Mac OS X to completely refresh local Rails CTRP AUM dev env after latest git pull
#By shivece 2015-OCT-23
#Usage: ./bounce_local.sh
#If you get an error, try setting execute perms: sudo chmod +x bounce_local.sh

#Check for running WEBrick instances and stop gracefully
ps -ef | grep [r]ails | grep -v grep | awk '{print $2}' | xargs kill -15

#Fully reset db (depends on properly configured config/database.yml)
rake db:drop
rake db:create
rake db:migrate

#Launch new Mac OS X terminal, navigate to project, start WEBrick
osascript -e 'tell app "Terminal"
#   do script "cd /local/content/ctrp/apps/ctrp/public/ctrp/ui2 && bower install"
   do script "cd /local/content/ctrp/apps/ctrp/ && rails s" 
end tell'

#Wait for WEBrick to start
sleep 5

#Instantiate data via REST and ActiveRecord db seeding
ruby db/add_users.rb
rake db:seed


#Note: as written, this script won't close terminals previously opened by this script

#Other commands used while developing this script:
#ps ax | grep [r]ails | awk '{ print "local server pid = " $1; }'
#kill $(ps aux | grep '[r]ails' | awk '{print $2}')
