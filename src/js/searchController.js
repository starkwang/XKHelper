//侧边搜索栏
angular.module('starkAPP')
    .controller('searchController', ['$scope', 'BaseService', '$timeout', '$location',
        function($scope, BaseService, $timeout, $location) {
            $scope.$on('showSearch', function() {
                $('.search').css('z-index', '100');
                $scope.searchShow = true;
                $timeout(function() {
                    $('.search-bar input').focus();
                }, 700);

            })

            $scope.close = function() {
                if (/bg/.test(event.target.className)) {
                    $scope.searchShow = false;
                    $timeout(function() {
                        $('.search').css('z-index', '-9999');
                    }, 700);
                }
            }

            $scope.kwChange = function() {
                var params = {
                    category: [],
                    keywords: $scope.keywords,
                    courseID: '',
                    time: ''
                }
                var result = BaseService.search(params);
                console.log(result);
                $scope.result = result;
                if(result.length> 0){
                    $scope.resultShow = true;
                }else{
                    $scope.resultShow = false;
                }
            }

            $scope.mouseover = function(){
                $scope.detail = this.course;
            }
            $scope.courseUpdate = function(){
                BaseService.courseModel.update(this.detail);
            }
        }
    ]);
