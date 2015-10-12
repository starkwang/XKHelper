//课程论坛
angular.module('starkAPP')
    .controller('forumController', ['$scope', 'BaseService',
        function($scope, BaseService) {

            $scope.commentTitle = '点击此处可分享你的上课心得（已有999条评论）';
            $scope.showComment = function(){
                $scope.commentShow = true;
                $scope.commentTitle = '发表评论';
            }
        }
    ]);
