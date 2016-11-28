# a container to store all your methods you want to use a hash to access
class MethodHash < ApplicationController
  alias [] send
  def one
    puts "I'm one"
  end
  def two
    puts "I'm two"
  end

  def protocol_source_id_imp
    #if _appCodes.key?(:protocol_source_id_imp)
    #  appCode = _appCodes[:protocol_source_id_imp]
    #else
    #appCodes['protocol_source_id_im'] = InternalSource.find_by_code('IMP').id
    #  appCode = _appCodes[:protocol_source_id_imp]
    #end
    #appCode
    InternalSource.find_by_code('IMP').id
  end

  def protocol_source_id_pro
    #if _appCodes.key?(:protocol_source_pro)
    #  appCode = _appCodes[:protocol_source_pro]
    #else
    #  appCodes[:protocol_source_pro] = InternalSource.find_by_code('PRO').id
    #  appCode = _appCodes[:protocol_source_pro]
    #end
    #appCode
    InternalSource.find_by_code('PRO').id
  end
end