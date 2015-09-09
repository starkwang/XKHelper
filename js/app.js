'use strict';
angular.module('starkAPP', [
        'ngRoute',
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
            //话题审核
                .when('/topic/', {
                    templateUrl: './html/a.html',
                    controller: '',
                    reloadOnSearch: false
                })
                //重定向到club入口页面
                .otherwise({
                    redirectTo: '/topic/'
                });
        }
    ])
