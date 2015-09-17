//侧边搜索栏
angular.module('starkAPP')
    .controller('searchController', ['$scope', 'BaseService', '$timeout', '$location',
        function($scope, BaseService, $timeout, $location) {
            $scope.$on('showSearch', function() {
                $('.search').css('z-index', '0');
                $scope.searchShow = true;
            })

            $scope.close = function() {
                $scope.searchShow = false;
                $timeout(function() {
                    $('.search').css('z-index', '-9999');
                },1000);
            }
        }
    ]);
