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
            },
            timeParser: function(time) {
                //'二 3-4'
                var t = time.trim();
                var weekday;
                switch (t.split(' ')[0]) {
                    case '一':
                        weekday = 1;
                        break;
                    case '二':
                        weekday = 2;
                        break;
                    case '三':
                        weekday = 3;
                        break;
                    case '四':
                        weekday = 4;
                        break;
                    case '五':
                        weekday = 5;
                        break;
                    case '六':
                        weekday = 6;
                        break;
                }
                var length = parseInt(t.split(' ')[1].split('-')[1]) - parseInt(t.split(' ')[1].split('-')[0]) + 1;
                var start = parseInt(t.split(' ')[1].split('-')[0]);
                //{weekday:2,length:2,start:3}
                return {
                    weekday: weekday,
                    length: length,
                    start: start-1
                }
            }
        };
        return service;
    });

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

//搜索结果
angular.module('starkAPP')
    .controller('resultController', ['$scope', 'SearchService',
        function($scope, SearchService) {
            // // body...
            // var b = {
            //     time: ['四 8-9', '三 1-2'],
            //     category: [],
            //     keywords: '',
            //     courseID: 'HIST',
            // };
            // $scope.result = SearchService.search(b);
        }
    ]);

//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', 'SearchService','$timeout','$location',
        function($scope, SearchService, $timeout,$location) {
            if($location.path() == '/main/'){
                $scope.mainIsActive = true;
            }
        }
    ]);

//课表
angular.module('starkAPP')
    .controller('mainController', ['$scope', 'SearchService', '$timeout',
        function($scope, SearchService, $timeout) {
            // body...
            var b = {
                category: [],
                keywords: '',
                courseID: 'HIST',
            };
            var result = SearchService.search(b);

            var courseModel = [];
            $scope.tableView = [[],[],[],[],[],[]];
            courseModel.push(result[1]);
            courseModel.push(result[5]);
            courseModel.push(result[8]);
            console.log(courseModel);

            courseModel.forEach(function(item){
                var parseResult = SearchService.timeParser(item['时间']);
                console.log(parseResult);
                if(parseResult.length == 2){
                    $scope.tableView[parseResult.weekday][parseResult.start] = {
                        text : item['选课序号']+'\n'+item['课程名称'],
                        type : 'double1'
                    };
                    $scope.tableView[parseResult.weekday][parseResult.start+1] = {
                        text : item['教室']+' '+item['教师'],
                        type : 'double2'
                    };
                }
                if(parseResult.length == 3){
                    $scope.tableView[parseResult.weekday][parseResult.start] = {
                        text : item['选课序号'],
                        type : 'triple1'
                    };
                    $scope.tableView[parseResult.weekday][parseResult.start+1] = {
                        text : item['课程名称'],
                        type : 'triple2'
                    };
                    $scope.tableView[parseResult.weekday][parseResult.start+2] = {
                        text : item['教室']+' '+item['教师'],
                        type : 'triple3'
                    };
                }
                if(parseResult.length == 4){
                    $scope.tableView[parseResult.weekday][parseResult.start] = {
                        text : item['选课序号'],
                        type : 'fourfold1'
                    };
                    $scope.tableView[parseResult.weekday][parseResult.start+1] = {
                        text : item['课程名称'],
                        type : 'fourfold2'
                    };
                    $scope.tableView[parseResult.weekday][parseResult.start+2] = {
                        text : item['教室'],
                        type : 'fourfold3'
                    };
                    $scope.tableView[parseResult.weekday][parseResult.start+3] = {
                        text : item['教师'],
                        type : 'fourfold4'
                    };
                }
            })

        }
    ]);
