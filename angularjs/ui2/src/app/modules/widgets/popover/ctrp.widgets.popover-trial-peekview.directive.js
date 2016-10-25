/**
 * Created by wangg5 on 04/08/16.
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('ctrpTrialPeekView', ctrpTrialPeekView);

    ctrpTrialPeekView.$inject = ['$timeout', '$compile', '$mdDialog', 'TrialService'];

    function ctrpTrialPeekView($timeout, $compile, $mdDialog, TrialService) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_trial_peek_modal.tpl.html';
        var directiveObj = {
            restrict: 'A',
            priority: 100,
            scope: {
                trialId: '=' // trial id
            },
            link: linkerFn
        };

        return directiveObj;

        function linkerFn(scope, element, attrs) {

            element.bind('click', function(event) {
                event.preventDefault();

                $mdDialog.show({
                  templateUrl: attrs.peekTemplate || defaultTemplateUrl,
                  targetEvent: event,
                  locals: {
                    trialId: scope.trialId
                  },
                  clickOutsideToClose: true,
                  scope: scope.$new(), //create a child scope
                  controller: trialPeekerCtrl
              }).then(function(trialObj) {
                  // console.info('done with peeking: ', trialObj);
                  // scope.trialObjCached = trialObj;
              });
            });
        } // linkerFn

        function trialPeekerCtrl($scope, $mdDialog, trialId, TrialService) {
            $scope.trialId = trialId;
            $scope.curTrial = null; //$scope.$parent.trialObjCached;

            fetchTrial($scope.trialId);
            $scope.close = function() {
                // close and return the curTrial for possible caching
                $mdDialog.hide($scope.curTrial);
            }; // close

            function fetchTrial(trialId) {
                $scope.loadingTrial = true;
                TrialService.getTrialById(trialId).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        $scope.curTrial = res;
                        $scope.$parent.trialObjCached = angular.copy($scope.curTrial);
                    }
                }).catch(function(err) {
                    console.error('error: ', err);
                }).finally(function() {
                    $scope.loadingTrial = false;
                });
            } // fetchTrial

        } // trialPeekerCtrl
    }

})();
