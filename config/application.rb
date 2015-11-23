require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Ctrp
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.

    # Application version to display site-wide. Increment after every production deployment.
    # Use 5.x for minor point releases such as for new features or upgrades. Use 5.0.x for patch/bugfix point releases.
    config.application_version = "5.0"
    config.organizations_id_sequence_start_with = 65000000
    config.persons_id_sequence_start_with = 65000000
    config.families_id_sequence_start_with = 65000000

    #config.serve_static_files = true
    #paths['public'] = File.join 'public', 'ctrp', 'ui2', 'src'


    #configure for path rewrite
    config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
        rewrite   '/ctrp/ui2',  '/ui'
    end

    ## Rack-cors settings for Rails
    config.middleware.insert_before 0, "Rack::Cors", :debug => true, :logger => (-> { Rails.logger }) do

      allow do
        origins '*'
        resource '*',
            :headers => :any,
            :expose => ['Access-Control-Allow-Headers'],
            :methods => [:get, :post, :delete, :put, :patch, :head, :options],
            :max_age => 0
      end

    end


    config.active_record.raise_in_transactional_callbacks = true

    config.paths["log"] = "../../logs/#{Rails.env}.log"

  end
end
