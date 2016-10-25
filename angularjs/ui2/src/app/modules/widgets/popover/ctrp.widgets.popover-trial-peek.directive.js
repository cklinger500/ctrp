/**
 * Created by wangg5 on 04/08/16.
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('ctrpTrialPeek', ctrpTrialPeek);

    ctrpTrialPeek.$inject = ['$timeout', '$compile', '$popover', 'TrialService'];

    function ctrpTrialPeek($timeout, $compile, $popover, TrialService) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_trial_peek.tpl.html';
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
            var popover = $popover(element, {
                title: 'View Trial',
                templateUrl: attrs.peekTemplate || defaultTemplateUrl,
                html: true,
                trigger: 'manual',
                placement: 'auto top',
                animation: 'am-flip-x',
                content: 'Trial information',
                autoClose: true,
                scope: scope
            });

            scope.curTrial = null;
            scope.loadingTrial = false;
            element.bind('click', function(event) {
                event.preventDefault();
                if (popover.$isShown) {
                    popover.hide();
                } else {
                    if (scope.curTrial === null) {
                        fetchTrial(scope.trialId);
                    }
                    popover.show();
                }
            });

            scope.$on('$destroy', function() {popover.destroy();}); // clean up

            function fetchTrial(trialId) {
                scope.loadingTrial = true;
                TrialService.getTrialById(trialId).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        scope.curTrial = res;
                    }
                }).catch(function(err) {
                    console.error('error: ', err);
                }).finally(function() {
                    scope.loadingTrial = false;
                });
            }
        }
    }

})();
