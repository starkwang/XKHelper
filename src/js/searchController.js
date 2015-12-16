//搜索
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

            $scope.moreSearchShow = false;
            $scope.keywords = '';
            $scope.result = [];
            $scope._result = [];
            $scope.resultCnt = 0;

            function resetCertainCategory() {
                $scope.certainCategory = {
                    '二专课程': true,
                    '军事理论': true,
                    '大学外语': true,
                    '文科专业课': true,
                    '模块课程': true,
                    '理科课程': true,
                    '留学生': true,
                    '美育': true,
                    '计算机': true,
                }
            }

            function resetCertainTime() {
                $scope.certainTime = {
                    startDay: '一',
                    endDay: '六',
                    startCourse: '1',
                    endCourse: '13'
                }
            }
            resetCertainTime();
            resetCertainCategory();

            $scope.close = function($event) {
                var e = $event;
                if (/bg/.test(e.target.className)) {
                    $scope.searchShow = false;
                    $timeout(function() {
                        $('.search').css('z-index', '-9999');
                    }, 700);
                }
            }

            $scope.kwChange = function() {
                var category = [];
                var time = {
                    start: $scope.certainTime.startDay + ' ' + $scope.certainTime.startCourse,
                    end: $scope.certainTime.endDay + ' ' + $scope.certainTime.endCourse,
                };
                for (var item in $scope.certainCategory) {
                    if ($scope.certainCategory[item]) {
                        category.push(item);
                    }
                }
                var params = {
                    category: category,
                    keywords: $scope.keywords,
                    time: time
                };
                $scope._result = BaseService.search(params);
                $scope.result = $scope._result.slice(0, 10);
                $scope.resultCnt = 10;

                if ($scope.result.length > 0) {
                    $scope.resultShow = true;
                } else {
                    $scope.resultShow = false;
                }
            }

            $scope.loadMore = function () {
                $timeout(function () {
                    for (var i = 0; i < 10; ++i) {
                        if ($scope.resultCnt >= $scope._result.length)
                            return;
                        $scope.result.push($scope._result[$scope.resultCnt++]);
                    }
                });
            };

            function refreshenDetail(id) {
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
            $scope.$on('courseModelUpdate', function() {
                if ($scope.detail) {
                    refreshenDetail($scope.detail['选课序号']);
                }

            });
            $scope.$on('collectionUpdate', function() {
                if ($scope.detail) {
                    refreshenDetail($scope.detail['选课序号']);
                }
            });
            $scope.courseUpdate = function() {
                BaseService.courseModel.update(this.detail);
            }
            $scope.collectionUpdate = function() {
                BaseService.collectionModel.update(this.detail);
            }
            $scope.moreSearch = function() {
                if ($scope.moreSearchShow) {
                    resetCertainCategory();
                } else {
                    $scope.certainCategory = {
                        '二专课程': false,
                        '军事理论': false,
                        '大学外语': false,
                        '文科专业课': false,
                        '模块课程': false,
                        '理科课程': false,
                        '留学生': false,
                        '美育': false,
                        '计算机': false,
                    }
                }
                $scope.moreSearchShow = !$scope.moreSearchShow;

            }
        }
    ]);
