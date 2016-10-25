/**
 * Created by wangg5 on 8/24/15.
 */

/**
 * Modal for wrapping the advancedPersonSearchForm directive
 *
 */

(function() {

    'use strict';

    angular.module('ctrp.app.po')
        .controller('advancedPersonSearchModalCtrl', advancedPersonSearchModalCtrl)
        .directive('ctrpPersonAdvSearchModalButton', ctrpPersonAdvSearchModalButton);

    advancedPersonSearchModalCtrl.$inject = ['$scope', '$uibModalInstance', 'maxRowSelectable', 'sourceContextOnly']; //for modal controller
    ctrpPersonAdvSearchModalButton.$inject = ['$uibModal', '$compile', '_', '$timeout', 'Common']; //modal button directive


    function ctrpPersonAdvSearchModalButton($uibModal, $compile, _, $timeout, Common) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                maxRowSelectable : '=?', //int, required!
                useBuiltInTemplate: '=?', //boolean
                selectedPersonsArray: '=',
                allowOverwrite: '=?' //boolean, overwrite previously selected person or not (default to true)
            },
            templateUrl: 'app/po/person/directives/personAdvSearchModalButtonTemplate.html',
            link: linkerFn,
            controller: personAdvSearchModalButtonController
        };

        return directiveObj;


        function linkerFn(scope, element, attrs) {
            $compile(element.contents())(scope);
            console.log('in linkerFn for personAdvSearchModal Button');
          //  scope.useBuiltInTemplate = attrs.useBuiltInTemplate == undefined ? false : true;
        } //linkerFn


        function personAdvSearchModalButtonController($scope, $timeout) {
            $scope.savedSelection = [];
            $scope.showGrid = true;
            $scope.curationMode = false;
            $scope.selectedPersonsArray = [];
            //$scope.useBuiltInTemplate = $scope.useBuiltInTemplate == undefined ? false : $scope.useBuiltInTemplate;
            $scope.allowOverwrite = $scope.allowOverwrite == undefined ? true : $scope.allowOverwrite;
            var modalOpened = false;

            $scope.searchPerson = function(size) {
                if (modalOpened) return; //prevent modal open twice in single click

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/po/person/directives/advanced_person_search_form_modal.html',
                    controller: 'advancedPersonSearchModalCtrl as advPersonSearchModalView',
                    size: size,
                    resolve: {
                        maxRowSelectable: function () {
                            return $scope.maxRowSelectable;
                        }
                    }
                });
                modalOpened = true;

                modalInstance.result.then(function (selectedPersons) {

                    if (angular.isArray(selectedPersons) && selectedPersons.length > 0) {

                        if ($scope.allowOverwrite) {
                            console.log('overwring the previous person');
                            $scope.savedSelection = selectedPersons;
                            $scope.selectedPersonsArray = selectedPersons;
                        } else {
                            //concatenate
                            _.each(selectedPersons, function(aPerson, index) {
                                //prevent pushing duplicated org
                                if (Common.indexOfObjectInJsonArray($scope.savedSelection, "id", aPerson.id) == -1) {
                                    $scope.savedSelection.push(aPerson);
                                }
                            });

                            $scope.selectedPersonsArray = $scope.savedSelection; //$scope.selectedOrgsArray.concat(selectedOrgs);
                        }
                    }

                    modalOpened = false;
                }, function () {
                    modalOpened = false;
                    console.log("operation canceled");
                });
            }; //searchPerson

            $scope.$watch('selectedPersonsArray', function(newVal) {
                $scope.selectedPersonsArray = newVal;
            }.bind(this));


            //delete the affiliated organization from table view
            $scope.toggleSelection = function (index) {
                if (index < $scope.savedSelection.length) {
                    $scope.savedSelection.splice(index, 1);
                    // $scope.savedSelection[index]._destroy = !$scope.savedSelection[index]._destroy;
                }
            };// toggleSelection


            $scope.batchSelect = function(intention) {
                if (intention == 'removeAll') {
                    $scope.savedSelection.length = 0;
                }
            }


        } //personAdvSearchModalButtonController

    } //personAdvSearchModalButton



    /**
     * Adv person search modal controller
     *
     * @param $scope
     * @param $uibModalInstance
     */
    function advancedPersonSearchModalCtrl($scope, $uibModalInstance, maxRowSelectable, sourceContextOnly) {
        var vm = this;
        vm.maxRowSelectable = maxRowSelectable; //to be passed to the adv person search form
        vm.sourceContextOnly = sourceContextOnly; // to be passed to the adv person search form

        $scope.personSearchResults = {people: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedPersonsArray = [];  // persons selected in the modal

        vm.cancel = function() {
            $uibModalInstance.dismiss('canceled');
        }; //cancel

        vm.confirmSelection = function() {
            $uibModalInstance.close($scope.selectedPersonsArray);
        }; //confirmSelection


        activate();

        function activate() {
            watchPersonSearchResults();
            watchSelectedPersons();
        }


        function watchPersonSearchResults() {
            $scope.$watch('personSearchResults', function (newVal, oldVal) {
                $scope.personSearchResults = newVal;
                //console.log('in Modal, personSearchResults: ' + JSON.stringify($scope.personSearchResults));
            }, true);
        } //watchPersonSearchResults


        function watchSelectedPersons() {
            $scope.$watch('selectedPersonsArray', function(newVal, oldVal) {
                console.log('In Person search modal, selectedPersonsArray.length: ' + $scope.selectedPersonsArray.length);
            }, true);

        } //watchSelectedPersons
    }





})();
