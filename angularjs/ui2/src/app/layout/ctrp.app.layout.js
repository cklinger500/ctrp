(function() {
    'use strict';

    angular.module('ctrp.app.layout', [
        /* Angular modules */
        'ngTouch',
        'ngAnimate',
        'ngSanitize',

        /* ctrp cross-app modules */
        'ctrp.module.routes',
        'ctrp.module.timeout',
        'ctrp.module.dataservices',
        'ctrp.module.common',
        'ctrp.module.constants',
        'ctrp.module.underscoreWrapper',

        /* ctrp feature modules */


        /* 3rd party */
        'ui.router'

    ]).run(function($rootScope, $urlRouter, $state, $stateParams, $injector, UserService, AppSettingsService, LocalCacheService, toastr) {
            $rootScope.$on('stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var statesNotRequiringGsa = ['main.sign_in', 'main.sign_up', 'main.gsa'];
                if (statesNotRequiringGsa.indexOf(toState.name) === -1 &&
                    LocalCacheService.getCacheWithKey('gsaFlag') !== 'Accept') {
                    $state.go('main.gsa');
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

                event.preventDefault();
                toastr.clear();
                var writeModeSupported = false; //is write mode supported for the toState?
                if (toState.section) {
                    writeModeSupported = UserService.isWriteModeSupportedForSection(toState.section);
                }
                $rootScope.$broadcast('isWriteModeSupported', writeModeSupported); //broadcast this

                if (toState.name === 'main.sign_in' || toState.name === 'main.sign_up') {

                    if (!UserService.isLoggedIn()) {
                        UserService.getAppVerFromDMZ().then(function(data) {
                            var status = data.server_response.status;

                            if (status >= 200 && status <= 210) {
                                UserService.setAppVersion(data['app_version']);
                            }
                        });

                        AppSettingsService.getSettings({ setting: 'APP_RELEASE_MILESTONE', external: true, location: "value" }).then(function (response) {
                            var status = response.status;

                            if (status >= 200 && status <= 210) {
                                UserService.setAppRelMilestone(response.data[0] ? response.data[0].settings : '');
                            }
                        });
                    }
                } else {
                    //do not show app version or release milestone on other pages unless authenticated
                    if (!UserService.isLoggedIn()) {
                        UserService.setAppVersion('');
                        UserService.setAppRelMilestone('');
                    }
                }
            });


            /*
            $rootScope.$on('$stateChangeStart', function(event, next, current) {
                if (next && current) {
                    var answer = confirm("Are you sure you want to navigate away from this page");
                    if (!answer) {
                        event.preventDefault();
                    }
                }

            });
            */
        });

})();
