//侧边栏
var starkAPP = require('./app.js');
starkAPP.controller('sidebarController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function($scope, $rootScope, BaseService, $timeout, $location) {
            function refreshen() {
                $scope.active = {};
                var path = $location.path().split('/')[1];
                $scope.active[path + 'IsActive'] = true;
            }

            refreshen();

            $scope.changeURL = function(url) {
                $location.url(url);
                refreshen();
            }

            $scope.showSearch = function() {
                $rootScope.$broadcast('showSearch');
            }
        }
    ]);
module.exports = starkAPP;