//课表
angular.module('starkAPP')
    .controller('mainController', ['$scope', 'BaseService', '$timeout',
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
            $scope.$on('courseModelUpdate', function(event, data) {
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
                            text: item['选课序号'] + '\n' + item['课程名称'],
                            type: 'double1'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text: item['教室'] + ' ' + item['教师'],
                            type: 'double2'
                        };
                    }
                    if (parseResult.length == 3) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text: item['选课序号'],
                            type: 'triple1'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text: item['课程名称'],
                            type: 'triple2'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 2] = {
                            text: item['教室'] + ' ' + item['教师'],
                            type: 'triple3'
                        };
                    }
                    if (parseResult.length == 4) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text: item['选课序号'],
                            type: 'fourfold1'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text: item['课程名称'],
                            type: 'fourfold2'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 2] = {
                            text: item['教室'],
                            type: 'fourfold3'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 3] = {
                            text: item['教师'],
                            type: 'fourfold4'
                        };
                    }
                });
            });



            var b = {
                category: [],
                keywords: '',
                courseID: '',
                time:'一 6-7'
            };
            var result = BaseService.search(b);
            BaseService.courseModel.update(result[5]);
            BaseService.courseModel.update(result[2]);

        }
    ]);
