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

            $scope.saveToPhone = function() {
                var course_data = {
                    courses: BaseService.courseModel.getCourseData(),
                    "day-content":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                    "line-color":"#fff",
                    "background-color":"#fff",
                    "width":480,
                    "height":960,
                    "font-size":36,
                    "info-font-size":30,
                    "header-font-size":30,
                    "siderbar-font-size":24
                };
                var data = JSON.stringify(course_data);
                console.log(data);
                BaseService.saveToPhone({
                    "course_data": data,
                }).then(function(result) {
                    $scope.qrcode = true;
                    var url = 'http://stu.fudan.edu.cn/xk/img/' + result.data;
                    console.log(url);
                    $('.qrcode').qrcode({
                        width: 200,
                        height: 200,
                        text: url
                    })
                });
            }

            $scope.hideQrcode = function(){
                $scope.qrcode = false;
            }
        }
    ]);
