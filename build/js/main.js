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

//搜索结果
angular.module('starkAPP')
    .controller('resultController',['$scope', 'searchService', 
        function ($scope, searchService) {
        // body...
    }]);
angular.module('searchService', [])
    .factory('SearchService', function() {
        var a = {
            
        };
        function matchCourse(){

        }
        var service = {
            search : function(specification){

            }
        };
    });

//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController',['$scope', 'searchService', 
        function ($scope, searchService) {
        // body...
    }]);

//课表
angular.module('starkAPP')
    .controller('tableController',['$scope', 'searchService', 
        function ($scope, searchService) {
        // body...
    }]);