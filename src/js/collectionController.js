//收藏夹
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
