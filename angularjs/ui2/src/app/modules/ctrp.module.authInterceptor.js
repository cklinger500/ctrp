(function() {
    'use strict';
    angular.module('ctrp.module.authInterceptor', ['LocalCacheModule', 'ctrp.module.errorHandler'])
        .factory('AuthInterceptor', AuthInterceptor);
    AuthInterceptor.$inject = ['LocalCacheService', '$injector', 'ErrorHandlingService'];
    //function AuthInterceptor(AuthTokenService) {
    function AuthInterceptor(LocalCacheService, $injector, ErrorHandlingService) {

        //var uService = $injector.get('UserService');
        var methodObj = {
            request: request,
            response: response,
            responseError: responseError
        };
        var errorCount = 0;
        return methodObj;


        /*************** implementations below ****************/

        function request(config) {
            config.timeout = 15000; //15 seconds timeout
            var token = LocalCacheService.getCacheWithKey('token');
            //console.log('token is: ' + token);
            if (token) {
                var gsaFlag =  (LocalCacheService.getCacheWithKey('gsaFlag') || 'Reject') + ' ';
                //console.log('gsaFlag = ' + gsaFlag);
                config.headers.Authorization = gsaFlag + token;
            }
            return config;
        } //request


        /**
         * return the HTTP response through the interceptor, could inject something here
         *
         * @param res
         * @returns {*}
         */
        function response(res) {
            return res;
        } //response

        function responseError(rejection) {
            var ignoredFields = ['new', 'id', 'server_response']; // fields ignored in the response body
            if(rejection.status === 401) {
              //if unauthenticated or unauthorized, kick the user back to sign_in
              $injector.get('$state').go('main.sign_in');
              $injector.get('toastr').error('Access to the resources is not authorized', 'Please sign in to continue');
            } else if (rejection.status > 226 && errorCount < 3) {
                $injector.get('toastr').clear();
                var errorMsg = '<u>Error Code</u>: ' + rejection.status;
                errorMsg += '\nError Message: ' + ErrorHandlingService.getErrorMsg(rejection.status);
                errorMsg += '\nCause(s): ' + (rejection.error || '');

                Object.keys(rejection.data).forEach(function(field, index) {
                    if (ignoredFields.indexOf(field) === -1) {
                        errorMsg += '\n ' + field + ' field: ' + rejection.data[field];
                    }
                });

                $injector.get('toastr').error(errorMsg, {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
                // $injector.get('UserService').logout();
                errorCount++;
            }

            return rejection;
        }
    }

}());
