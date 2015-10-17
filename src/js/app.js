'use strict';
document.documentElement.style.overflowY = 'hidden';
var starkAPP = angular.module('starkAPP', [
        'ngRoute',
        'ngAnimate',
        'routeStyles',
        'baseService',
        'clipBoard'
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: './html/main.html'
                })
                .when('/all/', {
                    templateUrl: './html/all.html'
                })
                .when('/collection/', {
                    templateUrl: './html/collection.html'
                })
                .when('/forum/', {
                    templateUrl: './html/forum.html'
                })
                .when('/forum/course/', {
                    templateUrl: './html/forum_course.html'
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ]);
