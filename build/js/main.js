'use strict';
var starkAPP = angular.module('starkAPP', [
        'ngRoute',
        'ngAnimate',
        'routeStyles',
        'baseService'
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: './html/main.html',
                    css: './build/css/main.css'
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ]);

angular.module('baseService', [])
    .factory('BaseService', ['$rootScope',
        function($rootScope) {
            String.prototype.trim = function() {　　
                return this.replace(/(^\s*)|(\s*$)/g, "");　　
            };


            var courseModel = {
                data: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                init: function() {
                    this.data.forEach(function(d) {
                        for (var i = 0; i < 13; i++) {
                            d.push(0);
                        }
                    });
                    if (localStorage.courseModelData !== undefined) {
                        this.data = JSON.parse(localStorage.courseModelData);
                    }
                },
                update: function(course) {
                    var parseResult = timeParser(course['时间']);
                    var weekday = parseResult.weekday;
                    var start = parseResult.start;
                    var courseLength = parseResult.length;
                    var isConflict = false;
                    var _this = this;
                    for (var i = 0; i < courseLength; i++) {
                        if (this.data[weekday][start + i] != 0) {
                            isConflict = true;
                        }
                    }
                    if (!isConflict) {
                        for (var i = 0; i < courseLength; i++) {
                            courseModel.data[weekday][start + i] = course;
                        }
                    } else {
                        //冲突课程名的数组
                        var conflictName = [];
                        var conflictCourse = [];
                        for (var i = 0; i < courseLength; i++) {
                            if (conflictName.indexOf(this.data[weekday][start + i]['课程名称']) == -1 && this.data[weekday][start + i] != 0) {
                                conflictName.push(this.data[weekday][start + i]['课程名称']);
                                conflictCourse.push(this.data[weekday][start + i]);
                            }
                        }
                        var name = conflictName.length > 1 ? conflictName.join('》、《') : conflictName[0];
                        if (confirm('这门课与《' + name + '》冲突，是否替换？')) {
                            //删除之前的课
                            conflictCourse.forEach(function(course){
                                _this.remove(course);
                            })
                            this.update(course);
                        }
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);
                },

                remove: function(course) {
                    var parseResult = timeParser(course['时间']);
                    var weekday = parseResult.weekday;
                    var start = parseResult.start;
                    var courseLength = parseResult.length;
                    for (var i = 0; i < 13; i++) {
                        if (this.data[weekday][i]['选课序号'] == course['选课序号']) {
                            this.data[weekday][i] = 0;
                        }
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);
                }
            };

            courseModel.init();

            function search(specification) {
                if (!(specification.time.length || specification.keywords.length || specification.courseID.length || specification.category.length)) {
                    return [];
                }

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
                var result = [];
                if (specification.category.length > 0) {
                    specification.category.forEach(function(category) {
                        COURSE_DATA[category].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        });
                    });
                } else {
                    for (var i in COURSE_DATA) {
                        COURSE_DATA[i].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        });
                    }
                }
                return result;
            }

            function timeParser(time) {
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
                    weekday: weekday - 1,
                    length: length,
                    start: start - 1
                };
            }
            var service = {
                search: search,
                timeParser: timeParser,
                courseModel: courseModel
            };
            return service;
        }
    ]);

//搜索结果
angular.module('starkAPP')
    .controller('resultController', ['$scope', 'BaseService',
        function($scope, BaseService) {
            // // body...
            // var b = {
            //     time: ['四 8-9', '三 1-2'],
            //     category: [],
            //     keywords: '',
            //     courseID: 'HIST',
            // };
            // $scope.result = BaseService.search(b);
        }
    ]);

//侧边搜索栏
angular.module('starkAPP')
    .controller('searchController', ['$scope', 'BaseService', '$timeout', '$location',
        function($scope, BaseService, $timeout, $location) {
            $scope.$on('showSearch', function() {
                $('.search').css('z-index', '100');
                $scope.searchShow = true;
                $timeout(function() {
                    $('.search-bar input').focus();
                }, 700);

            })

            $scope.close = function() {
                if (/bg/.test(event.target.className)) {
                    $scope.searchShow = false;
                    $timeout(function() {
                        $('.search').css('z-index', '-9999');
                    }, 700);
                }
            }

            $scope.kwChange = function() {
                var params = {
                    category: [],
                    keywords: $scope.keywords,
                    courseID: '',
                    time: ''
                }
                var result = BaseService.search(params);
                console.log(result);
                $scope.result = result;
                if(result.length> 0){
                    $scope.resultShow = true;
                }else{
                    $scope.resultShow = false;
                }
            }

            $scope.mouseover = function(){
                $scope.detail = this.course;
            }
            $scope.courseUpdate = function(){
                BaseService.courseModel.update(this.detail);
            }
        }
    ]);

//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', '$rootScope','BaseService','$timeout','$location',
        function($scope, $rootScope,BaseService, $timeout,$location) {
            if($location.path() == '/main/'){
                $scope.mainIsActive = true;
            }

            $scope.showSearch = function(){
                $rootScope.$broadcast('showSearch');
            }
        }
    ]);

//课表
angular.module('starkAPP')
    .controller('tableController', ['$scope', 'BaseService', '$timeout',
        function($scope, BaseService, $timeout) {
            // body...



            refreshen(BaseService.courseModel.data);

            $scope.$on('courseModelUpdate', function(event, data) {
                refreshen(data);
            });


            function refreshen(data) {
                $scope.tableView = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ];
                $scope.tableView.forEach(function(a) {
                    for (var i = 0; i < 13; i++) {
                        a.push({
                            length: 1
                        });
                    }
                })
                var courseModel = [];

                data.forEach(function(i) {
                    i.forEach(function(j) {
                        if (j != 0) {
                            courseModel.push(j);
                        }

                    })
                });
                courseModel.forEach(function(item) {
                    var parseResult = BaseService.timeParser(item['时间']);
                    if (parseResult.length == 2) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text1: item['选课序号'],
                            text2: item['课程名称'],
                            length: parseResult.length,
                            No: 0,
                            show: true,
                            style: '',
                            locate: 'start'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text1: item['教室'],
                            text2: item['教师'],
                            length: parseResult.length,
                            No: 1,
                            show: true,
                            locate: 'end'
                        };
                    }
                    if (parseResult.length == 3) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text1: item['选课序号'],
                            length: parseResult.length,
                            No: 0,
                            show: true,
                            style: '',
                            locate: 'start'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text1: item['课程名称'],
                            length: parseResult.length,
                            No: 1,
                            show: true,
                            style: '',
                            locate: 'body'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 2] = {
                            text1: item['教室'],
                            text2: item['教师'],
                            length: parseResult.length,
                            No: 2,
                            show: true,
                            style: '',
                            locate: 'end'
                        };
                    }
                    if (parseResult.length >= 4) {
                        var tag = ['选课序号', '课程名称', '教室', '教师'];
                        var lineStart = Math.floor((parseResult.length - 4) / 2);

                        for (var i = 0; i < parseResult.length; i++) {
                            $scope.tableView[parseResult.weekday][parseResult.start + i] = {
                                length: parseResult.length,
                                No: i,
                                show: true,
                                style: '',
                                locate: 'body'
                            };
                            if (i == 0) {
                                $scope.tableView[parseResult.weekday][parseResult.start + i].locate = 'start';
                            }
                            if (i == parseResult.length - 1) {
                                $scope.tableView[parseResult.weekday][parseResult.start + i].locate = 'end';
                            }
                        }

                        for (var i = 0; i < 4; i++) {
                            var No = lineStart + i;
                            $scope.tableView[parseResult.weekday][parseResult.start + lineStart + i]['text1'] = item[tag[i]];
                        }

                    }
                });
            }

            $scope.remove =function(weekday,No){
                var course = BaseService.courseModel.data[weekday][No];
                BaseService.courseModel.remove(course);
            }

            $scope.hover = function(line, row) {
                var color = "background:rgba(255, 255, 255, 0.7)";
                var nowItem = line;
                //往上几格
                var up = $scope.tableView[row][line].No || 0;
                var down = $scope.tableView[row][line].length - up - 1 || 0;
                for (var i = 0; i <= up; i++) {
                    $scope.tableView[row][line - i].style = color;
                }
                for (var i = 0; i <= down; i++) {
                    $scope.tableView[row][line + i].style = color;
                }
            }
            $scope.out = function(line, row) {
                var color = "background:rgba(255, 255, 255, 0.0)";
                var nowItem = line;
                //往上几格
                var up = $scope.tableView[row][line].No || 0;
                var down = $scope.tableView[row][line].length - up - 1 || 0;
                for (var i = 0; i <= up; i++) {
                    $scope.tableView[row][line - i].style = color;
                }
                for (var i = 0; i <= down; i++) {
                    $scope.tableView[row][line + i].style = color;
                }
            }

        }
    ]);
