'use strict';
angular.module('starkAPP', [
        'ngRoute',
        'searchService'
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: './html/a.html'
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ]);
