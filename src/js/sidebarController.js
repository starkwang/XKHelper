//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', 'SearchService','$timeout','$location',
        function($scope, SearchService, $timeout,$location) {
            if($location.path() == '/main/'){
                $scope.mainIsActive = true;
            }
        }
    ]);
