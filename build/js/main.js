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
        String.prototype.trim = function() {　　
            return this.replace(/(^\s*)|(\s*$)/g, "");　　
        }
        var b = {
            time: ['四 8-9', '三 1-2'],
            category: [],
            keywords: '',
            courseID: 'HIST',
        };

        function matchCourse(specification, course) {
            if (specification.time) {
                if (specification.time.indexOf(course['时间'].trim()) == -1) {
                    return false;
                }
            }
            if (specification.keywords) {
                if (course['课程名称'].trim().indexOf(specification.keywords.trim()) == -1) {
                    return false;
                }
            }
            if (specification.courseID) {
                if (course['选课序号'].trim().indexOf(specification.courseID.trim()) == -1) {
                    return false;
                }
            }
            return true;
        }
        var service = {
            search: function(specification) {
                var result = [];
                if (specification.category.length > 0) {
                    specification.category.forEach(function(category) {
                        COURSE_DATA[category].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        })
                    })
                } else {
                    for (var i in COURSE_DATA) {
                        COURSE_DATA[i].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        })
                    }
                }
                return result;
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