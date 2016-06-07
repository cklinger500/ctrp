
(function() {
  'use strict';
    angular.module('ctrp.module.validators')
            .directive('ctrpSubmit', ctrpSubmit);

            ctrpSubmit.$inject = ['$parse', '$log', '$rootScope'];

            function ctrpSubmit($parse, $log, $rootScope) {

                var directiveObject = {
                    restrict: 'A',
                    require: ['ctrpSubmit', '?form'],
                    link: linkerFn,
                    controller: controllerFn
                };
                return directiveObject;

                function linkerFn(scope, element, attrs, controllers) {
                    var submitController = controllers[0];
                    var formController = controllers[1]; //get form controller
                    var hasSecondaryTask = attrs.hasOwnProperty('ctrpSubmitDelete') ? true : false;
                    submitController.setFormController(formController);

                    scope.ctrpbtn = scope.ctrpbtn || {};
                    scope.ctrpbtn[attrs.name] = submitController;
                    scope.formAction = $parse(attrs.ctrpSubmit);

                    if (hasSecondaryTask) {
                        $rootScope.$on('deleteConfirmationComplete', function(e) {
                            if (!formController.$invalid) {
                                scope.formAction(scope);
                            }
                        });
                    }

                    element.bind('submit', function(event) {
                        var formAction = scope.formAction;

                        submitController.attempted = formController.$submitted;
                        $log.info('form is submitted: ' + formController.$submitted);

                        if (!scope.$$phase) {
                            scope.$apply();
                        }

                        if (formController.$invalid) { //|| formController.$pristine
                            $log.error('form submission invalid or untouched!');
                            return false;
                        } else if (hasSecondaryTask) {
                            $rootScope.$broadcast('confirmDelete');
                        } else {
                            /* execute the form action if valid */
                            scope.$apply(function() {
                                formAction(scope, {$event: event});
                            });
                        }
                    });
                } //linkerFn

                function controllerFn($scope, $element, $attrs) {
                    this.attempted = false;
                    var formController = null;

                    this.setFormController = function(controller) {
                        console.log('setting form controller!');
                        formController = controller;
                    };

                    /* fieldModelController is ngModel controller */
                    /**
                     * Verify the validity of the field and set form invalid or valid
                     * @param  {Object} fieldModelController [form field]
                     * @param  {boolean} isFieldInvalid        [set the form field invalid directly]
                     * @return {boolean}                      [true or false]
                     */
                    this.needsAttention = function(fieldModelController, isFieldInvalid) {
                        if (angular.isDefined(isFieldInvalid) && isFieldInvalid === true) {
                            formController.$invalid = true;
                            return formController.$submitted && isFieldInvalid;
                        }

                        if (!formController) {
                            return false;
                        }

                        /* Used in PA:
                           formController.$setPristine sets $submitted property to false.
                           Setting this.attempted based on $submitted value allows for resetting
                           a CRUD form when list/CRUD views are displayed separately in the UI
                        */

                        if (fieldModelController) {
                            return formController.$submitted && fieldModelController.$invalid &&
                                (fieldModelController.$dirty || this.attempted);
                        } else {
                            return formController &&
                                formController.$submitted && formController.$invalid &&
                                (formController.$dirty || this.attempted);
                        }
                    }; //needsAttention

                    /*
                    function cb() {
                        $log.info('cb said false!');
                        return false;
                    }
                    */
                } //controllerFn



            }



})();
