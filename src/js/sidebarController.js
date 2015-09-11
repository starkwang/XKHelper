//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController',['$scope', 'SearchService', 
        function ($scope,SearchService) {
            var b = {
                time: ['四 8-9', '三 1-2'],
                category: [],
                keywords: '',
                courseID: 'HIST',
            };
            $scope.result = SearchService.search(b);
            //$scope.result = 123;
    }]);
