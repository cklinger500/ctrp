(function() {
    'use strict';

    angular.module('ctrpApp.widgets')
    .directive('modal', function ($parse, $window) {
        return {
            template: '<div class="modal fade {{ modal_id }}">' +
            '<div class="modal-dialog {{ modal_size }}">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h3 class="modal-title">{{ title }}</h3>' +
            '</div>' +
            '<div class="dir-modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:true,
            link: function postLink(scope, element, attrs) {
                scope.windowElem = angular.element($window);
                scope.modal_id = attrs.id;
                scope.modal_size = attrs.size ? 'modal-' + attrs.size : '';
                scope.title = attrs.title;

                scope.$watch(attrs.id, function(value){
                    if (value == true) {

                        scope.modal_id = attrs.id;
                    }
                });

                scope.$watch(attrs.visible, function(value){

                    if(value == true) {

                        $(element).modal('show');
                    } else {
                        $(element).modal('hide');
                    }
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });

                    /* Manually trigger a window resize event to resolve grid rendering issues */
                    scope.windowElem.resize();
                });

                //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
                $(element).bind("hide.bs.modal", function () {
                    $parse(attrs.visible).assign(scope, false);
                    if (!scope.$$phase && !scope.$root.$$phase)
                        scope.$apply();
                });
            }
        };
    });
})();
