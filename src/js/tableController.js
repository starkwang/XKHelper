//课表
angular.module('starkAPP')
    .controller('tableController', ['$scope', 'BaseService', '$timeout',
        function($scope, BaseService, $timeout) {
            // body...

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

            refreshen(BaseService.courseModel.data);

            $scope.$on('courseModelUpdate', function(event, data) {
                refreshen(data);
            });


            function refreshen(data) {
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
                            type: 'double1',
                            show: true,
                            style: ''
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text1: item['教室'],
                            text2: item['教师'],
                            type: 'double2',
                            show: true,
                            style: ''
                        };
                    }
                    if (parseResult.length == 3) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text1: item['选课序号'],
                            type: 'triple1',
                            show: true,
                            style: ''
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text1: item['课程名称'],
                            type: 'triple2',
                            show: true,
                            style: ''
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 2] = {
                            text1: item['教室'] ,
                            text2: item['教师'],
                            type: 'triple3',
                            show: true,
                            style: ''
                        };
                    }
                    if (parseResult.length == 4) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text1: item['选课序号'],
                            type: 'fourfold1',
                            show: true,
                            style: ''
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text1: item['课程名称'],
                            type: 'fourfold2',
                            show: true,
                            style: ''
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 2] = {
                            text1: item['教室'],
                            type: 'fourfold3',
                            show: true,
                            style: ''
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 3] = {
                            text1: item['教师'],
                            type: 'fourfold4',
                            show: true,
                            style: ''
                        };
                    }
                });
            }

            $scope.hover = function(line, row) {
                var color = "background:rgba(255, 255, 255, 0.7)";
                if ($scope.tableView[row][line].type == undefined) {
                    $scope.tableView[row][line].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'double1') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'double2') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'triple1') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line + 2].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'triple2') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'triple3') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    $scope.tableView[row][line - 2].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold1') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line + 2].style = color;
                    $scope.tableView[row][line + 3].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold2') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line + 2].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold3') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    $scope.tableView[row][line - 2].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold4') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    $scope.tableView[row][line - 2].style = color;
                    $scope.tableView[row][line - 3].style = color;
                    return;
                }
            }
            $scope.out = function(line, row) {
                var color = "background:rgba(255, 255, 255, 0)";
                if ($scope.tableView[row][line].type == undefined) {
                    $scope.tableView[row][line].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'double1') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'double2') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'triple1') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line + 2].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'triple2') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'triple3') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    $scope.tableView[row][line - 2].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold1') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line + 2].style = color;
                    $scope.tableView[row][line + 3].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold2') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line + 2].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold3') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line + 1].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    $scope.tableView[row][line - 2].style = color;
                    return;
                }
                if ($scope.tableView[row][line].type == 'fourfold4') {
                    $scope.tableView[row][line].style = color;
                    $scope.tableView[row][line - 1].style = color;
                    $scope.tableView[row][line - 2].style = color;
                    $scope.tableView[row][line - 3].style = color;
                    return;
                }
            }

        }
    ]);
