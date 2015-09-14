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
