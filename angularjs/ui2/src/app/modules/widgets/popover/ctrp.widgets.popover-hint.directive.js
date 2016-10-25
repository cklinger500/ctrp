/**
 * Created by aasheer1978 on 09/08/2016
*/

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
        //.controller('ctrpHintModalCtrl', ctrpHintModalCtrl)
        .directive('ctrpHint', ctrpHint);

        //ctrpHintModalCtrl.$inject = ['$scope', '$uibModalInstance'];
        ctrpHint.$inject = ['$window', '$uibModal', '$popover', '$timeout', '$rootScope'];

        function ctrpHint($window, $uibModal, $popover, $timeout, $rootScope) {
            var hintCount = 0;
            var directiveObject = {
                restrict: 'A',
                link: linkerFn
            };

            /* Resets hint count when user traverses to another page */
            $rootScope.$on('$stateChangeStart', function(e) {
                hintCount = 0;
            });

            return directiveObject;

            function linkerFn(scope, element, attrs) {
                var hintFields = element.find('input, select, textarea'); //array of fields that need to be checked on change
                var addButton = element.find('.btn-add');
                var elementToAppend;

                if (attrs.hintAppendElement) {
                    elementToAppend = element.closest(attrs.hintAppendElement);
                } else {
                    elementToAppend = addButton;
                }
                var popover = $popover(elementToAppend, {
                    title: 'Hint',
                    templateUrl: 'app/modules/widgets/popover/_default_popover_hint.tpl.html',
                    html: true,
                    trigger: 'manual',
                    placement: 'top',
                    animation: 'am-flip-x',
                    scope: scope
                });

                hintFields.on('change keyup', function(e) {
                    if (hintCount > 1) {
                        return;
                    }

                    if (checkHintFields()) {
                        var event = e;
                        if (!popover.$isShown) {
                            popover.show();
                            hintCount += 1;
                            /*
                                Popover rendering causes current input to blur.
                                Code below focuses back on target input field
                            */
                            $timeout(function() {
                                event.target.focus();
                            }, 1);
                        }
                    } else {
                        cancel();
                    }
                });

                /* Removes hint after Add button has been clicked */
                addButton.on('click', function(e) {
                    cancel();
                });

                scope.cancel = cancel;

                // If any field has a value, hint should be displayed
                function checkHintFields() {
                    var hintFlag = false;

                    _.each(hintFields, function(field) {
                        if (field.value) {
                            hintFlag = true;
                        }
                    });

                    return hintFlag;
                }

                function cancel() {
                    popover.hide();
                }

            }
        }
})();
