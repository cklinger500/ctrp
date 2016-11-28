/**
 * Created by wangg5 on 7/2/15
 *
 * Improved PromiseService with $timeout and $resource
 * reference: https://developer.rackspace.com/blog/cancelling-ajax-requests-in-angularjs-applications/
 */



(function () {
    'use strict';

    angular.module('ctrp.module.PromiseTimeoutService',
    ['ngResource', 'toastr', 'ctrp.module.constants', 'ctrp.module.authInterceptor'])
    .config(httpInterceptorConfig)
    .service('PromiseTimeoutService', PromiseTimeoutService);

    httpInterceptorConfig.$inject = ['$httpProvider'];
    function httpInterceptorConfig($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    } //httpInterceptorConfig

    PromiseTimeoutService.$inject = ['$q', '$resource', '$timeout', '$log', '$http', 'toastr', 'HOST'];

    function PromiseTimeoutService($q, $resource, $timeout, $log, $http, toastr, HOST) {

        /**
         * get data from service
         *
         * @param url
         * @returns {*}
         */
        this.getData = function (url) {
            var deferred = $q.defer();
            //temporary cachebuster until better solution in gulp
            var cacheBuster = (url.indexOf('?')>-1?'&':'?') + '_=' + Date.now();
            url = HOST + url + cacheBuster;
            $http.get(url).success(function (data, status, headers, config) {
                // $log.info('status: ' + status);
                var packagedData = packageDataWithResponse(data, status, headers, config);
                deferred.resolve(packagedData);
            }).error(function (error, status, headers, config) {
                var packagedError = packageDataWithResponse(error, status, headers, config);
                raiseErrorMessage(error);
                deferred.reject(packagedError);
            });

            return deferred.promise;
        }; //getData


        /**
         *
         * @param url
         * @param params: JSON object
         */
        this.postDataExpectObj = function (url, params) {
            var deferred = $q.defer();
            var cacheBuster = '?_=' + Date.now();
            //temporary cachebuster until better solution in gulp
            url = HOST + url + cacheBuster;
            $http.post(url, params).success(function (data, status, headers, config) {
                var packagedData = packageDataWithResponse(data, status, headers, config);
                deferred.resolve(packagedData);
            }).error(function (error, status, headers, config) {
                var packagedError = packageDataWithResponse(error, status, headers, config);
                raiseErrorMessage(error);
                deferred.reject(packagedError);
            });
            return deferred.promise;
        };


        /**
         * Perform PUT request to update object
         *
         * @param url
         * @param params
         * @param configObj
         * @returns {*}
         */
        this.updateObj = function (url, params, configObj) {

            var deferred = $q.defer();
            url = HOST + url;
            $http.put(url, params, configObj).success(function (data, status, headers, config) {
                var packagedData = packageDataWithResponse(data, status, headers, config);
                deferred.resolve(packagedData);
            }).error(function (error, status, headers, config) {
                var packagedError = packageDataWithResponse(error, status, headers, config);
                raiseErrorMessage(error);
                deferred.reject(packagedError);
            });
            return deferred.promise;
        }; //updateObj


        /**
         *
         * @param url (e.g. http://localhost/ctrp/organizations/15.json)
         * @returns {HttpPromise}
         */
        this.deleteObjFromBackend = function (url) {
            url = HOST + url;
            return $http.delete(url);
        }; //deleteObjFromBackend

        /**
         * Group promises call, will resolve individually
         * @param  {Array} promiseObjArr, Array of promises
         * @return {Grouped promises}
         */
        this.groupPromises = function(promiseObjArr) {
            var deferred = $q.defer();
            deferred.notify('grouping promises array: ', promiseObjArr);
            return $q.all(promiseObjArr);
        };


        /**
         * Raise error message for AJAX calls
         * @param error
         * @param deferred
         */
        function raiseErrorMessage(error) {
            var errorMsg = 'Failed to retrieve data from service';
            if (error.status === 408) {
                errorMsg = 'Retrieving data from service timed out';
            }
            toastr.error(errorMsg, 'Error', { timeOut: 0});
            console.log('request has timed out');
        } //raiseErrorMessage


        /**
         * Package status code (e.g. 200), headers, and config in the response field
         * of the data, leaving the original data untouched
         *
         * @param data
         * @param status
         * @param headers
         * @param config
         * @returns {*}
         */
        function packageDataWithResponse(data, status, headers, config) {
            if (!!data) {
              data['server_response'] = {};
              data['server_response'].status = status;
              data['server_response'].headers = headers;
              data['server_response'].config = config;

              return data;
          } else {
            return {'server_response': ''};
          }
        }


    } //PromiseTimeoutService

})();
