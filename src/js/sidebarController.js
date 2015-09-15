//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', 'BaseService','$timeout','$location',
        function($scope, BaseService, $timeout,$location) {
            if($location.path() == '/main/'){
                $scope.mainIsActive = true;
            }
        }
    ]);
