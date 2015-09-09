'use strict';
angular.module('starkAPP', [
        'ngRoute',
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: './html/a.html',
                    controller: '',
                    reloadOnSearch: false
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ])
