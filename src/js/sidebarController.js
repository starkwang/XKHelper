//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', 'SearchService',
        function($scope, SearchService, $timeout, $interval) {
            var b = {
                time: ['四 8-9', '三 1-2'],
                category: [],
                keywords: '',
                courseID: 'HIST',
            };
            $scope.$watch($scope.items, function(oldv, newv, scope) {
                console.log(oldv, newv);
            }, true);
            $scope.result = SearchService.search(b);
            $scope.items = ['123', '456'];
            $scope.items.push('123');
            $scope.items.push('123');
            $scope.items.push('123');
        }
    ]);
