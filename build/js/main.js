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
                    templateUrl: './html/main.html'
                })
                .when('/all/', {
                    templateUrl: './html/all.html'
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
                    var timeCollection = course['时间'].split('{time}');
                    var _this = this;
                    for (var i = 0; i < timeCollection.length; i++) {
                        var parseResult = timeParser(timeCollection[i]);
                        var weekday = parseResult.weekday;
                        var start = parseResult.start;
                        var courseLength = parseResult.length;
                        var courseRank = i + 1 - 1;
                        _this.updateOne(course, weekday, start, courseLength, courseRank);
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);

                },
                //courseRank是这周的第几节课，比如这周的第2(1)节数分大课
                updateOne: function(course, weekday, start, courseLength, courseRank) {
                    var isConflict = false;
                    var _this = this;
                    for (var i = 0; i < courseLength; i++) {
                        
                        if (this.data[weekday][start + i] != 0) {
                            isConflict = true;
                        }
                    }
                    console.log(isConflict);
                    if (!isConflict) {
                        for (var i = 0; i < courseLength; i++) {
                            courseModel.data[weekday][start + i] = course;
                            courseModel.data[weekday][start + i].rank = courseRank;
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
                        console.log(conflictName);
                        var name = conflictName.length > 1 ? conflictName.join('》、《') : conflictName[0];
                        if (confirm('这门课与《' + name + '》冲突，是否替换？')) {
                            //删除之前的课
                            conflictCourse.forEach(function(course) {
                                _this.remove(course);
                                console.log(course);
                            });
                            this.update(course);
                        }
                    }

                },
                remove:function(course){
                    var timeArr = course['时间'].split('{time}');
                    var _this = this;
                    timeArr.forEach(function(time){
                        var parseResult = timeParser(time);
                        _this.removeOne(course,parseResult);
                    })
                },
                removeOne: function(course,parseResult) {
                    var weekday = parseResult.weekday;
                    for (var i = 0; i < 13; i++) {
                        if (this.data[weekday][i]['选课序号'] == course['选课序号']) {
                            this.data[weekday][i] = 0;
                        }
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);
                },

                check: function(courseID) {
                    var IDlist = [];
                    this.data.forEach(function(i) {
                        i.forEach(function(course) {
                            if (course != 0 && IDlist.indexOf(course['选课序号']) === -1) {
                                IDlist.push(course['选课序号']);
                            }
                        })
                    })
                    return IDlist.indexOf(courseID) != -1;
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

angular.module('starkAPP')
    .controller('allController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function($scope, $rootScope, BaseService, $timeout, $location) {
            var data = [];
            for (name in COURSE_DATA) {
                data.push({
                    name: name,
                    courses: COURSE_DATA[name]
                })
            }
            $scope.data = data;
            var handleCourse;
            $scope.handle = {};
            $scope.showHandle = function() {
                var e = e || window.event;
                handleCourse = this.course;

                if (BaseService.courseModel.check(this.course['选课序号'])) {
                    $scope.handle.text1 = '已选入课表';
                    $scope.update = function() {
                        alert('已经在课表里啦~');
                    }
                }else{
                    $scope.handle.text1 = '加入课表';
                    $scope.update = function() {
                        BaseService.courseModel.update(handleCourse);
                    }
                }
                $scope.handleIsShow = true;
            }

        }
    ]);

//课表
angular.module('starkAPP')
    .controller('courseTableController', ['$scope', 'BaseService', '$timeout',
        function($scope, BaseService, $timeout) {

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

                function render(item, parseResult) {
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
                }
                courseModel.forEach(function(item) {
                    var timeArr = item['时间'].split('{time}');
                    for (var i = 0; i < timeArr.length; i++) {
                        var parseResult = BaseService.timeParser(timeArr[i]);
                        render(item, parseResult);
                    }
                });
            }

            $scope.remove = function(weekday, No) {
                var course = BaseService.courseModel.data[weekday][No];
                BaseService.courseModel.remove(course);
            }

            $scope.hover = function(line, row) {
                var color = "background:#ddd";
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
                var color = "";
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

            $scope.showDetail = function(weekday, No) {
                var e = e || window.event;
                if (BaseService.courseModel.data[weekday][No] === 0) {
                    return;
                }
                $scope.detail = BaseService.courseModel.data[weekday][No];
                if ($scope.detailIsShow == true) {
                    $scope.detailIsShow = false;
                    $timeout(function() {
                        $scope.detailIsShow = true;
                    }, 0);
                } else {
                    $scope.detailIsShow = true;
                }

                if (weekday === 0 || weekday === 1 || weekday === 2) {
                    var top = e.layerY - 100 < 0 ? 0 : e.layerY - 100;
                    var left = (weekday + 1) * 15 + 10;
                    $scope.detailPosition = "top:" + top + "px;left:" + left + "%;";
                }
                if (weekday === 3 || weekday === 4 || weekday === 5) {
                    var top = e.layerY - 100 < 0 ? 0 : e.layerY - 100;
                    var right = (6 - weekday) * 15;
                    $scope.detailPosition = "top:" + top + "px;right:" + right + "%;";
                }
            }

            $scope.closeDetail = function() {
                $scope.detailIsShow = false;
            }

            $scope.removeCourse = function() {
                BaseService.courseModel.remove($scope.detail);
            }

        }
    ]);

//搜索结果
angular.module('starkAPP')
    .controller('courseTotalController', ['$scope', 'BaseService',
        function($scope, BaseService) {
            refreshen(BaseService.courseModel.data);

            $scope.$on('courseModelUpdate', function(event, data) {
                refreshen(data);
            });   
            function refreshen(data) {
                var list = [];
                var idList = [];
                var totalCredit = 0;
                data.forEach(function(i) {
                    i.forEach(function(course) {
                        if (course != 0 && idList.indexOf(course['选课序号']) === -1) {
                            idList.push(course['选课序号']);
                            list.push(course);
                            totalCredit += parseInt(course['学分']);
                        }
                    })
                })
                $scope.list = list;
                $scope.totalCredit = totalCredit;
            }
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
                var e = e || window.event;
                if (/bg/.test(e.target.className)) {
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
                $scope.result = result;
                if (result.length > 0) {
                    $scope.resultShow = true;
                } else {
                    $scope.resultShow = false;
                }
            }

            $scope.mouseover = function() {
                $scope.detail = this.course;
            }
            $scope.courseUpdate = function() {
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
            if($location.path() == '/all/'){
                $scope.allIsActive = true;
            }

            $scope.showSearch = function(){
                $rootScope.$broadcast('showSearch');
            }
        }
    ]);
