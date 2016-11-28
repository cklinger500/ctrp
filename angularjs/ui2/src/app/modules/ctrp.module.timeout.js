/**
 * Created by wangg5 on 8/20/15.
 */

(function() {
    'use strict';

    angular.module('ctrp.module.timeout', [
        'ngIdle',
        'ui.bootstrap'
    ])
        .config(function(IdleProvider, KeepaliveProvider) {
            IdleProvider.idle(1800);  // 5 min of threshold for inactivity
            IdleProvider.timeout(10); //amount of time for user to react
            KeepaliveProvider.interval(1800);  // 5 min, half hour?
        });
})();
