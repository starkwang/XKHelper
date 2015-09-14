//课表
angular.module('starkAPP')
    .controller('mainController',['$scope', 'SearchService', 
        function ($scope, SearchService) {
        // body...
        $scope.selectedCourse = 1;
    }]);