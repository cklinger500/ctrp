/**
 * Created by wangg5 on 5/11/2016
 *
 * This directive is used as an attribute in a button element, example:
 *         <button class="btn btn-primary" id="person_search_modal" person-search-modal-button2 ng-model="personSearchView.selectedPersons" restriction-field>Search Person</button>
 * the ng-model directive in the above button element receives the selected person(s);
 *
 * Note: If more than one (1) person is allowed for selection each time, then you have to add the attribute "max-row-selectable= number (int)" to
 * the button, e.g.
 * <button class="btn btn-primary" id="person_search_modal" person-search-modal-button2 ng-model="personSearchView.selectedPersons" max-row-selectable=2 restriction-field>Search Person</button>
 * You do not have to add the attribute "max-row-selectable" if one (1) person is allowed for selection
 *
 */

(function() {
    'use strict';
    angular.module('ctrp.app.po')
           .directive('personSearchModalButton2', personSearchModalButton2);

           personSearchModalButton2.$inject = ['$uibModal', '$compile', '$timeout'];

           function personSearchModalButton2($uibModal, $compile, $timeout) {
              var directiveObj = {
                  restrict: 'A',
                  require: '^ngModel',
                  scope: {
                      sourceContextOnly: '=?',
                      maxRowSelectable: '=?',
                      ngModel: '='
                  },
                  link: linkerFn
              };

              return directiveObj;

              /* implementations below */
              function linkerFn(scope, element, attrs, ngModelCtrl) {
                  $compile(element.contents())(scope);
                  var modalOpened = false;
                  element.bind('click', function() {
                      var modalInstance = $uibModal.open({
                          animation: true,
                          templateUrl: 'app/po/person/directives/advanced_person_search_form_modal.html',
                          controller: 'advancedPersonSearchModalCtrl as advPersonSearchModalView',
                          size: 'lg',
                          resolve: {
                              sourceContextOnly: function() {
                                return scope.sourceContextOnly || 'CTRP'; // CTRP as default context
                              },
                              maxRowSelectable: function () {
                                  return scope.maxRowSelectable || 1; // 1 as default
                              }
                          }
                      }); // open
                      var modalOpened = true;

                      modalInstance.result.then(function(selection) {
                          if (angular.isArray(selection) && selection.length > 0) {
                              ngModelCtrl.$setViewValue(selection); // value type is Array
                          }
                          modalOpened = false;
                      }, function() {
                          // modal dismissed
                          modalOpened = false;
                      }); // result.then
                  }); // bind click

              } // linkerFn

           } // personSearchModalButton2
})();
