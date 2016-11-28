(function() {
  'use strict';

  angular.module('ctrpApp.widgets',[
    //angular modules
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons',

    //third-party modules
    'angularMoment',
    'angularUtils.directives.dirPagination',
    'agGrid',
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.selection',
    'ui.scrollpoint',
    'formly',
    'formlyBootstrap',

    //ctrp modules
    //'ctrpApp',
    'ctrp.module.dataservices',
    'ctrp.module.common',
    'ctrp.module.constants',
    'ctrp.module.PromiseTimeoutService',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.popover'
  ]);

})();
