
(function () {
    'use strict';
    angular.module('ctrp.module.dataservices')
        .service('AppSettingsService', AppSettingsService);

    AppSettingsService.$inject = ['PromiseService'];

    function AppSettingsService( PromiseService ) {
        var appSettingsService = this;
        appSettingsService.appSettings = {};

        appSettingsService.getSettings = function (requestedSettings) {
            return appSettingsService.appSettings[requestedSettings.setting] || _getRequestedSettings(requestedSettings);
        };
        
        appSettingsService.destroySettings = function (requestedSettings) {
            appSettingsService.appSettings[requestedSettings.setting] = undefined;
        };
        
        var _getRequestedSettings = function (requestedSettings) {
            var requestURL = '/ctrp/';
            requestURL = requestedSettings.json_path ? requestedSettings.json_path : (requestedSettings.external ?
                requestURL + 'app_settings_ext/'  + requestedSettings.setting: requestURL + 'app_settings/' + requestedSettings.setting);
            requestURL += '.json';
            if (requestedSettings.location) {
                requestURL += '?location=' + requestedSettings.location;
            }
            appSettingsService.appSettings[requestedSettings.setting] = PromiseService.getData(requestURL);
            return appSettingsService.appSettings[requestedSettings.setting];
        };

    }
})();
