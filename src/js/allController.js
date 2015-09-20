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
