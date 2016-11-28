(function () {
    'use strict';

    angular.module('ctrp.app.layout')
        .directive('bodyCssClassname', bodyCssClassname);

    function bodyCssClassname($rootScope, $location) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, elem, attr, ctrl) {
                $rootScope.$on('$stateChangeSuccess', function () {
                    elem.removeAttr('class');
                    elem.addClass(/[^/]*$/.exec($location.path())[0]);
                });
            }
        }
    }
}());