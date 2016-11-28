module Errors
class UnauthorizedAccessError < Error
  def status
    401
  end

  def message
    'unauthorized access'
  end

  def to_hash
    {
        meta: {
            code: status,
            message: message
        }
    }
  end

  def to_json(*)
    to_hash.to_json
  end
end

end