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
            config.timeout = 150000; //150 seconds timeout
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
            console.log('rejection is: ', rejection);
            var ignoredFields = ['new', 'id', 'server_response']; // fields ignored in the response body

            if (!rejection.data) {
                $injector.get('toastr').error('Please try again.', 'The server may be down', { timeOut: 0});
            }

            if(rejection.status === 401) {
              //if unauthenticated or unauthorized, kick the user back to sign_in
              $injector.get('$state').go('main.sign_in');
              $injector.get('toastr').error('Access to the resources is not authorized', 'Please sign in to continue', { timeOut: 0});
            } else if (rejection.status > 226 && errorCount < 7) {
                $injector.get('toastr').clear();
                var errorMsg = '<u>Error Code</u>: ' + rejection.status;
                errorMsg += '\nError Message: ' + ErrorHandlingService.getErrorMsg(rejection.status);
                errorMsg += '\nCause(s): ';
                /*
                if ('data' in rejection) {
                    Object.keys(rejection.data).forEach(function(field, index) {
                        if (ignoredFields.indexOf(field) === -1 && !angular.isNumber(field)) {
                            errorMsg += '\n ' + field + ': ' + rejection.data[field];
                        }
                    });
                }
                */
               console.info('rejection: ', rejection);
                if ('errors' in rejection) {
                    Object.keys(rejection.errors).forEach(function(field, index) {
                        if (ignoredFields.indexOf(field) === -1 && !angular.isNumber(field)) {
                            errorMsg += '\n ' + field + ': ' + rejection.errors[field];
                        }
                    });
                }
                var validationErrors = '\n';
                delete rejection.data.server_response;
                if (!!rejection.data && angular.isArray(rejection.data)) {
                    rejection.data.forEach(function(errMsg) {
                        validationErrors += '\n ' + errMsg;
                    });
                } else if (!!rejection.data) {
                    Object.keys(rejection.data).forEach(function(key) {
                        var arr = rejection.data[key];
                        if (angular.isArray(arr)) {
                            arr.forEach(function(msg) {
                                validationErrors += '\n' + key + ' ' + msg;
                            });
                        }
                    });
                }
                // console.info('Validation Errors: ', validationErrors);

                errorMsg += validationErrors; // concatenate
                var toastrService = $injector.get('toastr');
                // toastrService.error(validationErrors, '', { timeOut: 0 });

                toastrService.error(errorMsg, '', { timeOut: 0 });
                // $injector.get('UserService').logout();
                errorCount++;
            }

            return rejection;
        }
    }

}());
