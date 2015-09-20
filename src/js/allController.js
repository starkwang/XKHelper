//侧边搜索栏
angular.module('starkAPP')
    .controller('allController', ['$scope', '$rootScope','BaseService','$timeout','$location',
        function($scope, $rootScope,BaseService, $timeout,$location) {
            var data = [];
            for(name in COURSE_DATA){
                data.push({
                    name: name,
                    courses: COURSE_DATA[name]
                })
            }
            $scope.data = data;
            console.log($scope.data);
        }
    ]);
