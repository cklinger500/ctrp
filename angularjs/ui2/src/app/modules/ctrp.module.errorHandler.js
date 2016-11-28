
(function() {
    'use strict';

    angular.module('ctrp.module.errorHandler', [])
    .service('ErrorHandlingService', ErrorHandlingService);

    ErrorHandlingService.$inject = ['$timeout'];

    function ErrorHandlingService($timeout) {
        var errorDict = {
            301: 'Resources moved permanently',
            400: 'Bad Request',
            401: 'Unauthorized access',
            402: '',
            403: 'Request was forbidden',
            404: 'Requested resource not found',
            405: 'Request method is not allowed',
            406: 'Request is not acceptable',
            407: 'Proxy authentication is Required',
            408: 'Request has timed out',
            409: 'Submitted data have conflicted with existing resources',
            410: 'Requested resources are no longer available',
            413: 'Reuest entity is too large for the server to process',
            414: 'Request URL is too long',
            415: 'Request contains unsupported media/file type',
            422: 'Object cannot be saved',
            500: 'Internal server error encountered',
            503: 'Service is not available',
            504: 'Gateway has timedout',
            505: 'HTTP version is not supported'
        };

        /**
         * Translate the http status error code to error message
         * @param  {integer} httpStatusCode [description]
         * @return {String}                [description]
         */
        this.getErrorMsg = function(httpStatusCode) {
            return errorDict[httpStatusCode] || 'Unknown Error';
        };

    } // ErrorHandlingService



})();
