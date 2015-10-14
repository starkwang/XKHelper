//课程论坛
angular.module('starkAPP')
    .controller('forumController', ['$scope', 'BaseService',
        function($scope, BaseService) {

            $scope.commentTitle = '点击此处可分享你的上课心得（已有999条评论）';
            $scope.showComment = function(){
                $scope.commentShow = !$scope.commentShow;
                if($scope.commentShow){
                    $scope.commentTitle = '发表评论';
                }else{
                    $scope.commentTitle = '点击此处可分享你的上课心得（已有999条评论）';
                }
                
            }

            $scope.search = function(){
                if($scope.keywords.length>0){
                    $scope.isSearch = true;
                    return;
                }
                $scope.isSearch = false;
            }

            $scope.open = function(){
                window.open('http://stu.fudan.edu.cn/xk/#/forum/course/');
            }
        }
    ]);
