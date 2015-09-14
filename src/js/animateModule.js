//课表
angular.module('starkAPP')
    .animation('.my-crazy-animation', function() {
        return {
            enter: function(element, done) {
                console.log("entering...");
                var width = element.width();
                element.css({
                    position: 'relative',
                    left: -10,
                    opacity: 0
                });
                element.animate({
                    left: 0,
                    opacity: 1
                }, done);
            },
        }
    }]);
