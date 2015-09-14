'use strict';
var starkAPP = angular.module('starkAPP', [
        'ngRoute',
        'searchService'
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: './html/main.html'
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ]);
