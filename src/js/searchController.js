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
                var e = e || window.event;
                if (/bg/.test(e.target.className)) {
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
                $scope.result = result;
                if (result.length > 0) {
                    $scope.resultShow = true;
                } else {
                    $scope.resultShow = false;
                }
            }
            function refreshenDetail (id) {
                if (BaseService.courseModel.check(id)) {
                    $scope.detail.isInCourseTable = true;
                    $scope.detail.text1 = '已加入课表';
                } else {
                    $scope.detail.isInCourseTable = false;
                    $scope.detail.text1 = '加入课表';
                }
                if (BaseService.collectionModel.check(id)) {
                    $scope.detail.isInCollection = true;
                    $scope.detail.text2 = '已在收藏夹';
                } else {
                    $scope.detail.isInCollection = false;
                    $scope.detail.text2 = '加入收藏夹';
                }
            }
            $scope.mouseover = function() {
                $scope.detail = this.course;
                refreshenDetail($scope.detail['选课序号']);
            }
            $scope.$on('courseModelUpdate',function(){
                refreshenDetail($scope.detail['选课序号']);
            });
            $scope.$on('collectionUpdate',function(){
                refreshenDetail($scope.detail['选课序号']);
            });
            $scope.courseUpdate = function() {
                BaseService.courseModel.update(this.detail);
            }
            $scope.collectionUpdate = function() {
                BaseService.collectionModel.update(this.detail);
            }
        }
    ]);
