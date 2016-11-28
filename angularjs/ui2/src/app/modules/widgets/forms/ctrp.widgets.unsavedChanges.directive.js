/**
 * Created by aasheer1978 on 06/15/2016
*/

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
        .controller('unSavedChangesModalCtrl', unSavedChangesModalCtrl)
        .directive('unsavedChanges', unsavedChanges);

        unSavedChangesModalCtrl.$inject = ['$scope', '$uibModalInstance', 'saveRequired'];
        unsavedChanges.$inject = ['$window', '$uibModal', '$parse', 'UserService', '$state'];

        function unsavedChanges($window, $uibModal, $parse, UserService, $state) {

            var directiveObject = {
                restrict: 'A',
                link: linkerFn,
                scope: {
                    ngConfirm: '&unsavedCallback'
                }
            };

            return directiveObject;

            function linkerFn(scope, element, attrs) {
                var formName;
                var formController;
                var formArray = element.controller() && element.controller().formArray ? element.controller().formArray : null; // Passed in when pages have multiple tabs
                var currentTabIndex = element.controller() ? element.controller().tabIndex : 0;
                var newTabIndex = 0;
                var element = element;
                var stateEventOccurred = false;

                /* Set UserService flag for (self) unsaved-changes directive */
                UserService.setUnsavedFormFlag(true);

                setFormVars();

                /* For pages with seperate list/CRUD views */
                attrs.$observe('unsavedFormContext', function(newVal) {
                    var newContext = parseInt(newVal, 10);

                    if (newContext !== currentTabIndex) {
                        newTabIndex = newContext;
                        evaluateForms();
                    }
                });

                $window.onbeforeunload = function(event) {
                    var alertMsg = 'Are you sure you want to leave this page? You may have unsaved changes.';

                    if (!formArray.length) {
                        if (checkFormStatus()) {
                            return alertMsg;
                        }
                    } else {
                        // For multiple forms
                        var dirtyFlag = false;
                        var formItem;

                        for (var i = 0; i < formArray.length; i++) {
                            formItem = typeof formArray[i] === 'object' ? formArray[i].name : formArray[i];
                            if (scope.$parent[formItem].$dirty) {
                                dirtyFlag = true;
                            }
                        }

                        if (dirtyFlag) {
                            return alertMsg;
                        }
                    }
                };

                scope.$on('$stateChangeStart', function(event) {
                    if (!stateEventOccurred) {
                        stateEventOccurred = true;

                        if (!formArray.length) {
                            if (checkFormStatus('stateChange')) {
                            //if (formName && scope.$parent[formName].$dirty && !scope.$parent[formName].$submitted) {
                                checkSignOut(event);
                                return;
                            }
                        } else {
                            // For multiple forms
                            var formItem;
                            var dirtyFlag = false;

                            for (var i = 0; i < formArray.length; i++) {
                                formItem = typeof formArray[i] === 'object' ? formArray[i].name : formArray[i];
                                if (scope.$parent[formItem].$dirty && !scope.$parent[formItem].$submitted) {
                                    dirtyFlag = true;
                                }
                            }

                            if (dirtyFlag) {
                                checkSignOut(event);
                                return;
                            }
                        }

                        if (UserService.getSignoutFlagValue()) {
                            UserService.logout();
                        }
                    }
                });

                function setFormVars() {
                    /* formArray already defined (true when pages have multiple tabs) */
                    if (formArray && formArray.length) {
                        return;
                    }

                    /* For the case when there are multiple forms on a single page */
                    formArray = element.find('form');

                    /* Single form */
                    if (!formArray.length) {
                        formName = attrs.name ? attrs.name : element.parent().prop('name');

                        if (attrs.unsavedFormInChildScope) {
                            var formLabel = formName.split('.')[1];
                            formName = element.controller()[formLabel];
                        }

                    }
                }

                /* Checks form on current tab, when user is attempting leave the tab */
                function evaluateForms() {
                    var form = scope.$parent[formArray[currentTabIndex]];

                    if (form) {
                        if (form.$dirty) {
                            activateModal();
                            element.controller().tabIndex = currentTabIndex;
                        } else {
                            currentTabIndex = newTabIndex;
                            element.controller().tabIndex = newTabIndex;

                        }
                    }
                }

                function activateModal() {
                    var isSaveRequired = element.find('md-tab-item.md-active > span').hasClass('save-required');

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/modules/widgets/forms/unsaved_changes_modal.html',
                        controller: 'unSavedChangesModalCtrl as unChgs',
                        size: 'md',
                        resolve: {
                            saveRequired: function () {
                                return isSaveRequired;
                            }
                        },
                        windowClass: 'modal-center'
                    });

                    modalInstance.result.then(function(result) {
                        if (result === 'Confirm') {
                            scope.ngConfirm();
                            currentTabIndex = newTabIndex;
                            element.controller().tabIndex = newTabIndex;
                        }
                    });
                }

                function checkSignOut(e) {
                    if (!confirm('Are you sure you want to leave this page? You may have unsaved changes.')) {
                        e.preventDefault();
                        UserService.setSignoutFlagValue(false);
                        stateEventOccurred = false;
                    } else if (UserService.getSignoutFlagValue()) {
                        UserService.logout();
                    }
                }

                function checkFormStatus(eventType) {
                    var formCondition;

                    if (eventType === 'stateChange') {
                        if (typeof formName === 'object') {
                            formCondition = formName.$dirty && !formName.$submitted;
                        } else {
                            formCondition = formName && scope.$parent[formName].$dirty && !scope.$parent[formName].$submitted;
                        }
                    } else {
                        if (typeof formName === 'object') {
                            formCondition = formName.$dirty;
                        } else {
                            formCondition = formName && scope.$parent[formName] && scope.$parent[formName].$dirty;
                        }

                    }

                    return formCondition;
                }
            }
        }

        function unSavedChangesModalCtrl($scope, $uibModalInstance, isSaveRequired) {
            var vm = this;

            vm.message = '';
            vm.confirmButtonText = '';
            vm.isSaveRequired = isSaveRequired;

            if (vm.isSaveRequired) {
                vm.message = 'You have unsaved changes in this form. The form requires items to be saved before moving to another tab. Please save the form before moving to another tab.';
                vm.confirmButtonText = 'Ok';
            } else {
                vm.message = 'You have unsaved changes in this form. Are you sure you want to leave without saving changes?';
                vm.confirmButtonText = 'Confirm';
            }

            vm.confirm = function() {
                if (vm.isSaveRequired) {
                    $uibModalInstance.close('Ok');
                } else {
                    $uibModalInstance.close('Confirm');
                }
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss('canceled');
            };
        }
})();
