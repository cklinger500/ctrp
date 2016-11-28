require 'rufus-scheduler'

# Let's use the rufus-scheduler singleton
#
s = Rufus::Scheduler.singleton


# Stupid recurrent task...
#
s.every '1d' do
  #puts 'hello.........'
  Rails.logger.info "hello123, it's #{Time.now}"
  #Rails.logger.flush
  begin
    require 'dbi'
    dbh = DBI.connect("DBI:OCI8:NDMSGT.nci.nih.gov:nci-ocm-qa.nci.nih.gov:1610", "ctrp_ru", "facWjvj0Xh")
    #dbh = DBI.connect('DBI:OCI8:', 'ctrp_ru', 'facWjvj0Xh')
    rs = dbh.prepare('SELECT * FROM RDM_RH.CTRP_GRANTS_R_MV')
    rs.execute
    while rsRow = rs.fetch do
      p rsRow
      #Alternative output: puts rsRow
      #Alternative output: pp rsRow
    end
    rs.finish
    dbh.disconnect
  rescue Exception => e
    Rails.logger.info "Exception thrown = #{e.inspect}"
    Rails.logger.info e.backtrace
  end
end