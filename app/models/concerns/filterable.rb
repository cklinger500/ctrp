module Filterable
  extend ActiveSupport::Concern

  module ClassMethods

    def filter(results,filtering_params)
      if results.nil?
        results = self.where(nil)
      end

      filtering_params.each do |key, value|
        results = results.public_send(key, value) if value.present?
      end
      results
    end
  end
end
