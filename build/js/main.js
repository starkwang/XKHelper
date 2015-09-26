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
                .when('/collection/',{
                    templateUrl:'./html/collection.html'
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
                    var conflictName = [];
                    var conflictCourse = [];
                    for (var i = 0; i < timeCollection.length; i++) {
                        var parseResult = timeParser(timeCollection[i]);
                        var weekday = parseResult.weekday;
                        var start = parseResult.start;
                        var courseLength = parseResult.length;
                        for (var i = 0; i < courseLength; i++) {
                            if (conflictName.indexOf(this.data[weekday][start + i]['课程名称']) == -1 && this.data[weekday][start + i] != 0) {
                                conflictName.push(this.data[weekday][start + i]['课程名称']);
                                conflictCourse.push(this.data[weekday][start + i]);
                            }
                        }
                    }
                    var name = conflictName.length > 1 ? conflictName.join('》、《') : conflictName[0];
                    if (conflictName.length > 0 && confirm('这门课与《' + name + '》冲突，是否替换？')) {
                        //删除之前的课
                        conflictCourse.forEach(function(course) {
                            _this.remove(course);
                        });
                        this.update(course);
                    }
                    for (var i = 0; i < timeCollection.length; i++) {
                        var parseResult = timeParser(timeCollection[i]);
                        var weekday = parseResult.weekday;
                        var start = parseResult.start;
                        var courseLength = parseResult.length;
                        var courseRank = i;
                        _this.updateOne(course, weekday, start, courseLength, courseRank);
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);

                },
                //courseRank是这周的第几节课，比如这周的第2(1)节数分大课
                updateOne: function(course, weekday, start, courseLength, courseRank) {
                    for (var i = 0; i < courseLength; i++) {
                        courseModel.data[weekday][start + i] = course;
                        courseModel.data[weekday][start + i].rank = courseRank;
                    }

                },
                remove: function(course) {
                    var timeArr = course['时间'].split('{time}');
                    var _this = this;
                    timeArr.forEach(function(time) {
                        var parseResult = timeParser(time);
                        _this.removeOne(course, parseResult);
                    })
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);
                },
                removeOne: function(course, parseResult) {
                    var weekday = parseResult.weekday;
                    for (var i = 0; i < 13; i++) {
                        if (this.data[weekday][i]['选课序号'] == course['选课序号']) {
                            this.data[weekday][i] = 0;
                        }
                    }
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

            var collectionModel = {
                data: [],
                init: function() {
                    if (localStorage.collectionModelData !== undefined) {
                        this.data = JSON.parse(localStorage.collectionModelData);
                    }
                },
                update: function(course) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i]['选课序号'] == course['选课序号']) {
                            return;
                        }
                    }
                    this.data.push(course);
                    var data_ = this.data;
                    localStorage.collectionModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('collectionUpdate', data_);
                },
                remove: function(courseID) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i]['选课序号'] == courseID) {
                            this.data.splice(i, 1);
                            break;
                        }
                    }
                    var data_ = this.data;
                    localStorage.collectionModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('collectionUpdate', data_);
                },
                check: function(courseID) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i]['选课序号'] == courseID) {
                            return true;
                        }
                    }
                    return false;
                }

            }
            collectionModel.init();

            function matchCourse(specification, course) {
                if (specification.keywords) {
                    if (course['课程名称'].trim().indexOf(specification.keywords.trim()) == -1 && course['教师'].trim().indexOf(specification.keywords.trim()) == -1) {
                        return false;
                    }
                }
                if (specification.courseID) {

                    if (course['选课序号'].trim().indexOf(specification.courseID.trim()) == -1) {
                        return false;
                    }
                }
                if (specification.time) {
                    var timeArr = course['时间'].split('{time}');
                    for (var i = 0; i < timeArr.length; i++) {
                        //《宪法学》没有时间
                        if(timeArr[i].trim().length ===0){
                            return true;
                        }
                        if (judgeTime(specification.time.start, specification.time.end, timeArr[i].trim())) {
                            return true;
                        }
                    }
                    return false;
                }
                return true;
            }

            function search(specification) {
                if (specification.category.length === 0) {
                    return [];
                }
                if (specification.keywords.length === 0 && specification.category.length === 9) {
                    return [];
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
                var weekday = chToNumber(t.split(' ')[0]);
                var length = parseInt(t.split(' ')[1].split('-')[1]) - parseInt(t.split(' ')[1].split('-')[0]) + 1;
                var start = parseInt(t.split(' ')[1].split('-')[0]);
                //{weekday:2,length:2,start:3}
                return {
                    weekday: weekday - 1,
                    length: length,
                    start: start - 1
                };
            }

            function chToNumber(chinese) {
                var weekday;
                switch (chinese) {
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
                return weekday;
            }

            function judgeTime(startTime, endTime, courseTime) {
                //'一 2','二 4','一 3-5'
                var ch = courseTime.trim().split(' ')[0];
                var start = courseTime.trim().split(' ')[1].split('-')[0];
                var end = courseTime.trim().split(' ')[1].split('-')[1];
                var courseTimeStart = ch + ' ' + start;
                var courseTimeEnd = ch + ' ' + end;
                if (compareTime(startTime, courseTimeStart) && compareTime(courseTimeEnd, endTime)) {
                    return true;
                } else {
                    return false;
                }
            }

            function compareTime(time1, time2) {
                //'一 2','一 3'
                //time1比time2更早的话，返回true
                var weekday1 = chToNumber(time1.trim().split(' ')[0]);
                var weekday2 = chToNumber(time2.trim().split(' ')[0]);
                var No1 = parseInt(time1.trim().split(' ')[1]);
                var No2 = parseInt(time2.trim().split(' ')[1]);
                if (weekday1 === weekday2) {
                    return No1 < No2;
                } else {
                    return weekday1 < weekday2;
                }
            }

            var service = {
                search: search,
                timeParser: timeParser,
                courseModel: courseModel,
                collectionModel: collectionModel,
                judgeTime: judgeTime
            };
            return service;
        }
    ])
    .filter("timeFilter", function() {
        var filter = function(time) {
            if (time != undefined) {
                return time.replace(/{time}/g, '，');
            } else {
                return time;
            }
        };
        return filter;
    });

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

                this.$parent.category.handle = {};
                if (BaseService.courseModel.check(this.course['选课序号'])) {
                    this.$parent.category.handle.text1 = '已选入课表';
                    this.$parent.category.handle.isInCourseTable = true;
                } else {
                    this.$parent.category.handle.text1 = '加入课表';
                    this.$parent.category.handle.isInCourseTable = false;
                }
                if (BaseService.collectionModel.check(this.course['选课序号'])) {
                    this.$parent.category.handle.text2 = '已在收藏夹';
                    this.$parent.category.handle.isInCollection = true;
                } else {
                    this.$parent.category.handle.text2 = '加入收藏夹';
                    this.$parent.category.handle.isInCollection = false;
                }
                var top = e.clientY;
                var left = e.clientX;
                this.$parent.category.handle.name = this.course['课程名称'];
                this.$parent.category.handle.teacher = this.course['教师'];
                this.$parent.category.handle.position = 'left:' + left + 'px;top:' + top + 'px;';
                this.$parent.category.handleIsShow = true;
            }
            $scope.closeHandle = function() {
                this.category.handleIsShow = false;
            }
            $scope.update = function() {
                BaseService.courseModel.update(handleCourse);
            }
            $scope.addIntoBox = function(){
                BaseService.collectionModel.update(handleCourse);
            }

        }
    ]);

//侧边搜索栏
angular.module('starkAPP')
    .controller('collectionController', ['$scope', '$rootScope','BaseService','$timeout','$location',
        function($scope, $rootScope,BaseService, $timeout,$location) {
            function refreshen(){
                $scope.courses = BaseService.collectionModel.data;
                $scope.courses.forEach(function(course){
                    if(BaseService.courseModel.check(course['选课序号'])){
                        course.isInCourseTable = true;
                    }else{
                        course.isInCourseTable = false;
                    }
                    course.text = course.isInCourseTable?'已加入课表':'加入课表';
                });
            }
            refreshen();
            $scope.$on('collectionUpdate',function(data){
                refreshen();
            });
            $scope.$on('courseModelUpdate',function(data){
                refreshen();
            });

            $scope.addCourse = function(){
                BaseService.courseModel.update(this.course);
            }
            $scope.remove = function(){
                BaseService.collectionModel.remove(this.course['选课序号']);
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

            $scope.moreSearchShow = false;
            $scope.keywords = '';

            function resetCertainCategory() {
                $scope.certainCategory = {
                    '二专课程': true,
                    '军事理论': true,
                    '大学外语': true,
                    '文科专业课': true,
                    '模块课程': true,
                    '理科课程': true,
                    '留学生': true,
                    '美育': true,
                    '计算机': true,
                }
            }

            function resetCertainTime() {
                $scope.certainTime = {
                    startDay: '一',
                    endDay: '六',
                    startCourse: '1',
                    endCourse: '13'
                }
            }
            resetCertainTime();
            resetCertainCategory();

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
                var category = [];
                var time = {
                    start: $scope.certainTime.startDay + ' ' + $scope.certainTime.startCourse,
                    end: $scope.certainTime.endDay + ' ' + $scope.certainTime.endCourse,
                };
                for (var item in $scope.certainCategory) {
                    if ($scope.certainCategory[item]) {
                        category.push(item);
                    }
                }
                if ($scope.keywords.length > 0 && /^[a-zA-Z]/.test($scope.keywords[0])) {
                    //选课号
                    var params = {
                        category: category,
                        keywords: '',
                        courseID: $scope.keywords,
                        time: time
                    }
                    $scope.result = BaseService.search(params);
                } else {
                    var params = {
                        category: category,
                        keywords: $scope.keywords,
                        courseID: '',
                        time: time
                    }
                    $scope.result = BaseService.search(params);
                }

                if ($scope.result.length > 0) {
                    $scope.resultShow = true;
                } else {
                    $scope.resultShow = false;
                }
            }

            function refreshenDetail(id) {
                if (BaseService.courseModel.check(id)) {
                    $scope.detail.isInCourseTable = true;
                    $scope.detail.text1 = '已加入课表';
                } else {
                    $scope.detail.isInCourseTable = false;
                    $scope.detail.text1 = '加入课表';
                }
                if (BaseService.collectionModel.check(id)) {
                    $scope.detail.isInCollection = true;
                    $scope.detail.text2 = '已在收藏夹';
                } else {
                    $scope.detail.isInCollection = false;
                    $scope.detail.text2 = '加入收藏夹';
                }
            }
            $scope.mouseover = function() {
                $scope.detail = this.course;
                refreshenDetail($scope.detail['选课序号']);
            }
            $scope.$on('courseModelUpdate', function() {
                refreshenDetail($scope.detail['选课序号']);
            });
            $scope.$on('collectionUpdate', function() {
                refreshenDetail($scope.detail['选课序号']);
            });
            $scope.courseUpdate = function() {
                BaseService.courseModel.update(this.detail);
            }
            $scope.collectionUpdate = function() {
                BaseService.collectionModel.update(this.detail);
            }
            $scope.moreSearch = function() {
                $scope.moreSearchShow = !$scope.moreSearchShow;
            }
        }
    ]);

//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function($scope, $rootScope, BaseService, $timeout, $location) {
            function refreshen() {
                $scope.mainIsActive = $scope.allIsActive = $scope.collectionIsActive = false;
                if ($location.path() == '/main/') {
                    $scope.mainIsActive = true;
                }
                if ($location.path() == '/all/') {
                    $scope.allIsActive = true;
                }
                if ($location.path() == '/collection/') {
                    $scope.collectionIsActive = true;
                }
            }

            refreshen();
            
            $scope.changeURL = function(url){
                $location.url(url);
                refreshen();
            }

            $scope.showSearch = function() {
                $rootScope.$broadcast('showSearch');
            }
        }
    ]);
