/**
 * Configure routes for person component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(userRoutes);

    userRoutes.$inject = ['$stateProvider'];
    function userRoutes($stateProvider) {
        $stateProvider
            .state('main.test_user', {
                url: '/user_test',
                templateUrl: 'app/user/test_user.html'
            })

            .state('main.sign_in', {
                    url: '/sign_in',
                    templateUrl: 'app/user/sign_in.html',
                    controller: 'userCtrl as userView',

                    resolve: {
                        UserService: 'UserService'
                    },
                    onEnter: function($state, UserService, toastr) {
                        if (UserService.isLoggedIn()) {
                            toastr.warning('Redirected ...', 'You are already signed in');
                            $state.go('main.defaultContent');
                        }
                    },
                    ncyBreadcrumb: {
                        parent: '',
                        label: 'CTRP Sign In'
                        // skip: true,
                    }
                })
                .state('main.signup', {
                    url: '/sign_up',
                    templateUrl: 'app/user/sign_up.html',
                    controller: 'userSignupCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    },
                    ncyBreadcrumb: {
                        parent: 'main.sign_in',
                        label: 'CTRP Sign Up'
                        // skip: true,
                    }
                })
                .state('main.welcome_signup', {
                    url: '/welcome_signup',
                    templateUrl: 'app/user/welcome_signup.html',
                    ncyBreadcrumb: {
                        parent: 'main.sign_in',
                        label: 'CTRP Welcome'
                        // skip: true,
                    }
                })

                .state('main.gsa', {
                    url: '/gsa',
                    templateUrl: 'app/user/gsa.html',
                    controller: 'gsaCtrl as gsaView',
                    resolve: {
                        UserService: 'UserService',
                        gsaObj : function(UserService) {
                            return UserService.getGsa();
                        },
                    }
                })

                .state('main.users', {
                    url: '/users',
                    templateUrl: 'app/user/user_list.html',
                    controller: 'userListCtrl as userView',
                    resolve: {
                        UserService: 'UserService',
                        userDetailObj: function(UserService) {
                            return UserService.getCurrentUserDetails();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'User Management'
                    }
                })

                .state('main.assignTrials', {
                    url: '/assign-trial-ownership',
                    templateUrl: 'app/user/assign_trials_user_list.html',
                    controller: 'userAssignTrialCtrl as trialOwnershipView',
                    resolve: {
                        UserService: 'UserService',
                        TrialService: 'TrialService',
                        userDetailObj: function(UserService) {
                            return UserService.getCurrentUserDetails();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.users',
                        label: 'Assign Trial Ownership'
                    }
                })

                .state('main.registeredUsers', {
                    url: '/registered-users',
                    templateUrl: 'app/user/user_list.html',
                    controller: 'userListCtrl as userView',
                    resolve: {
                        UserService: 'UserService',
                        userDetailObj: function(UserService) {
                            return UserService.getCurrentUserDetails();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'Registered CTRP Users'
                    }
                })

                .state('main.changePassword', {
                    url: '/change_password',
                    templateUrl: 'app/user/changePassword.html',
                    controller: 'userChangePasswordCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    },
                    username : function(UserService) {
                        return UserService.getLoggedInUsername();
                    }
                })

                .state('main.manageUserDetail', {
                    url: '/manage-user-detail/:username',
                    templateUrl: 'app/user/regUserDetails.html',
                    controller: 'userDetailCtrl as userDetailView',
                    section: 'user',
                    resolve: {
                        UserService: 'UserService',
                        userDetailObj : function(UserService, $stateParams) {
                            return UserService.getUserDetailsByUsername($stateParams.username);
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.users',
                        label: 'User Profile'
                    }
                })

                .state('main.regUserDetail', {
                    url: '/reg-user-detail/:username',
                    templateUrl: 'app/user/regUserDetails.html',
                    controller: 'userDetailCtrl as userDetailView',
                    section: 'user',
                    resolve: {
                        UserService: 'UserService',
                        userDetailObj : function(UserService, $stateParams) {
                            return UserService.getUserDetailsByUsername($stateParams.username);
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.users',
                        label: 'User Profile'
                    }
                })

                .state('main.submitterDetail', {
                    url: '/user-trial-details/:username',
                    templateUrl: 'app/user/regUserDetails.html',
                    controller: 'userDetailCtrl as userDetailView',
                    section: 'user',
                    resolve: {
                        UserService: 'UserService',
                        userDetailObj : function(UserService, $stateParams) {
                            return UserService.getUserDetailsByUsername($stateParams.username);
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        label: 'User Profile'
                    }
                })

                .state('main.myprofile', {
                    url: '/settings/profile',
                    templateUrl: 'app/user/userDetails.html',
                    controller: 'userDetailCtrl as userDetailView',
                    section: 'user',
                    resolve: {
                        UserService: 'UserService',
                        userDetailObj : function(UserService) {
                            return UserService.getUserDetailsByUsername(UserService.currentUser());
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'User Profile'
                    }
                })

                .state('main.userDetail', {
                    url: '/user-detail/:username',
                    templateUrl: 'app/user/userDetails.html',
                    controller: 'userDetailCtrl as userDetailView',
                    section: 'user',
                    resolve: {
                        UserService: 'UserService',
                        userDetailObj : function(UserService, $stateParams) {
                            return UserService.getUserDetailsByUsername($stateParams.username);
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.users',
                        label: 'User Profile'
                    }
                });
    } //userRoutes

}());
