/**
 * Created by wangg5 on 10/27/15.

 * This directive supports in-place edit and save. Required fields/attributes for this directive include
 * on-save handler and template. If template is not provided or reachable, it will use the default
 * template
 */

(function() {
    'use strict';

    angular.module('ctrpApp.widgets')
    .directive('inPlaceEdit', inPlaceEdit);

    inPlaceEdit.$inject = ['$timeout', '$compile', 'MESSAGES', 'UserService', '$document'];

    function inPlaceEdit($timeout, $compile, MESSAGES, UserService, $document) {
      var defaultTemplateUrl = 'app/modules/widgets/ctrp.widgets.in-place-edit.default_template.html';
      var directiveObj = {
        restrict: 'A',
        transclude: true,
        scope: {
          model: '=inPlaceEdit',
          saveHandler: '&onSave'
        },
        link: linkerFn,
        templateUrl: function(element, attrs) {
          return attrs.template || defaultTemplateUrl;
        },
        controller: function($scope) {
            $scope.errorMsg = '';
            $scope.$watch('model', function(newVal, oldVal) {
                // console.info('newVal model: ', newVal, oldVal);
                if (!newVal) {
                    $scope.errorMsg = 'Enter a value';
                } else {
                    $scope.errorMsg = '';
                }
            });
        }
      };
      return directiveObj;

      function linkerFn(scope, element, attrs) {
        scope.editMode = false;
        scope.writeModeEnabled = UserService.isCurationModeEnabled() || false;
        //if not set, isEditable is considered to be false
        scope.isEditable = attrs.hasOwnProperty('isEditable') ? scope.$eval(attrs.isEditable) : false;
        scope.edit = edit;
        scope.saveEdit = saveEdit;
        scope.cancelEdit = cancelEdit;
        var prevValue;
        var inputElem = element.find('input');

        //cancel edit on blur
        //element.on('blur', cancelEdit);

        //Esc for canceling edit
        element.bind('keydown', function(event) {
            if (event.which === 27) {
              cancelEdit(event.target, event);
            }
        });

        //functions below
        checkWriteMode();
        function edit() {
          scope.editMode = true;
          prevValue = scope.model;

          $timeout(function() {
            // element.find('textarea')[0].focus();
            var field = element.find('textarea')[0];
            if (field) {
                field.focus();
            }
            // if 'id' attribute is specified, use it to focus on the field
            // e.g. id="#edit_field"
            var curField = !!attrs.id ? $document[0].querySelector(attrs.id) : null;
            if (!!curField) {
                curField.focus();
            }
            // element.find('input')[0].focus();
          }, 0, false);
        }

        function saveEdit() {
          scope.editMode = false;
          scope.saveHandler({value: scope.model});
        }

        function cancelEdit(e) {
          scope.editMode = false;
          scope.model = prevValue;
        }

        //Listen to the write-mode switch
        scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
          checkWriteMode();
          // $compile(element.contents())(scope);
        });

        /* check for the global write mode */
        function checkWriteMode() {
          scope.writeModeEnabled = UserService.isCurationModeEnabled() || false;
          scope.editMode = !scope.writeModeEnabled ? false : scope.editMode;
        }

      } //linkerFn


    } //inPlaceEdit
})();
