'use strict';
var starkAPP = angular.module('starkAPP', [
        'ngRoute',
        'ngAnimate',
        'routeStyles',
        'searchService'
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: '/html/main.html',
                    css: '/build/css/main.css'
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ]);
