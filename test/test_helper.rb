require 'simplecov'
SimpleCov.start
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

if ENV['RAILS_ENV'] == 'development'
  require 'simplecov'
  SimpleCov.start 'rails'
  puts "required simplecov"
end


class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  class ActionController::TestCase
    include Devise::TestHelpers
  end
end
