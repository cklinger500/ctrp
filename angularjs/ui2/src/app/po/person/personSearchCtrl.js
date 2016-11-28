/**
 * Created by wangg5 on 8/21/15.
 */

(function() {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('personSearchCtrl', personSearchCtrl);

    personSearchCtrl.$inject = ['PersonService', '$scope'];

    function personSearchCtrl(PersonService, $scope) {
        var vm = this;

        $scope.personSearchResults = {people: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedPersonsArray = []; // persons selected in the ui-grid, fed by the embedded directive controller scope
        vm.name = "Tony W";
        vm.selection = null; // receiver
        vm.trySubmit = function() {
            console.log('inside the person search form, trySubmit!');
        };
        vm.selectedPerson = [];

        activate();


        function activate() {
            watchpersonSearchResults();
        }


        /**
         * watch the organization search results
         */
        function watchpersonSearchResults() {
            $scope.$watch('personSearchResults', function(newVal, oldVal) {
                $scope.personSearchResults = newVal;
               // console.log("received personSearchResults: " + JSON.stringify(newVal));
            }, true);

            $scope.$watch(function() {return vm.selection;}, function(newVal) {
                console.info('vm.selection is: ', newVal);
            });


            $scope.$watch('selectedPersonsArray', function(newVal, oldVal) {
                 $scope.selectedPersonsArray = newVal;
                 console.log("received selectedPersonsArray: " + JSON.stringify(newVal));
            }, true);
        } //watchpersonSearchResults


    } //personSearchCtrl


})();
