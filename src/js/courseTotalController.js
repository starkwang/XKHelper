//课程清单、考试时间
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
