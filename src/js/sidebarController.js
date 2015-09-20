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
