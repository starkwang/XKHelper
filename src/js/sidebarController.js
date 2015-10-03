//侧边栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function($scope, $rootScope, BaseService, $timeout, $location) {
            function refreshen() {
                $scope.mainIsActive = $scope.allIsActive = $scope.collectionIsActive = false;
                if ($location.path() == '/main/') {
                    $scope.mainIsActive = true;
                }
                if ($location.path() == '/all/') {
                    $scope.allIsActive = true;
                }
                if ($location.path() == '/collection/') {
                    $scope.collectionIsActive = true;
                }
            }

            refreshen();
            
            $scope.changeURL = function(url){
                $location.url(url);
                refreshen();
            }

            $scope.showSearch = function() {
                $rootScope.$broadcast('showSearch');
            }
        }
    ]);
