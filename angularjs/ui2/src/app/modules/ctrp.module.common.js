/**
 * Created by wangg5 on 6/23/15.
 */

(function() {

    'use strict';

    angular.module('ctrp.module.common', ['ui.bootstrap.modal'])
        .service('Common', Common);

    Common.$inject = ['$rootScope', '_', '$mdDialog', '$uibModal'];

    function Common($rootScope, _, $mdDialog) {

        /**
         * A-Z Comparator for sorting an array of JSON objects
         * by the 'name' field in each JSON object
         *
         */
        this.a2zComparator = function() {
            var compare = function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            };

            return compare;
        }; //a2zComparator


        /**
         * Broastcast message to other components
         * @param message
         */
        this.broadcastMsg = function(message, data) {
            $rootScope.$broadcast(message, {data: data});
        }; //broadcastMsg


        /**
         * Find the index of the given keyName and needleValue in the array of JSON
         * -1: not found
         * @param arrayOfJson
         * @param keyName
         * @param needleValue
         * @returns {number}
         */
        this.indexOfObjectInJsonArray = function(arrayOfJson, keyName, needleValue) {
            var queryObj = {};
            queryObj[keyName] = needleValue;
            return _.findIndex(arrayOfJson, queryObj);
        };

        /**
         * Extract value in the nested JSON object with the given path
         * e.g. var nestedObj = {
         * 		person: {
         * 			"name": "David",
         * 			"age": 23,
         * 			"location": {
         * 				"city": "Denver",
         * 				"state": "Colorado"
         * 				}
         * 			}
         * 		}
         * 	to extract the value for the key 'state', use this method:
         *
         * 		valueAtPathInObject(nestedObj, 'person.location.state')
         *
         * @param  {JSON object} nestedJsonObj [description]
         * @param  {path in string with dot delimited key name at each depth} pathString    [description]
         * @return {any non-undefined value if found or undefined otherwise}
         */
        this.valueAtPathInObject = function(nestedJsonObj, pathString) {
            var pathArr = pathString.split('.');
            var obj = nestedJsonObj[pathArr.shift()];
            while (obj && pathArr.length) {
                obj = obj[pathArr.shift()];
            }

            return obj;
        };

        /**
         * Parse String to JSON object
         * @param  {String} jsonStr [description]
         * @return {JSON or null}         [description]
         */
        this.jsonStrToObject = function(jsonStr) {
            var result = null;
            try {
                result = JSON.parse(jsonStr);
            } catch(err) {
                console.error('err in parsing jsonStr: ', err);
            }
            return result;
        };

        /**
         * Pop up an alert dialog for user to confirm the operation
         *
         * @param  {String} alertMessage [message for user to make a choice on the operation: cancel or ok]
         * @return {Promise, resolved to boolean value}              ['OK' => resolved to true; 'Cancel' => resolve to false]
         */
        this.alertConfirm = function(alertMessage) {

            var confirm = $mdDialog.confirm()
              .title('Please Confirm')
    //          .textContent(alertMessage) // for newer version
              .content(alertMessage)
              .clickOutsideToClose(false)
              .ariaLabel('Confirm')
              .targetEvent('')
              .ok('OK')
              .cancel('Cancel');

          return $mdDialog.show(confirm);
        };
    } // Common

})();
