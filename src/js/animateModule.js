//课表
angular.module('starkAPP')
    .animation('.hide-animation', function() {
        return {
            beforeAddClass: function(element, className, done) {
                if (className === 'ng-hide') {
                    element.animate({
                        opacity: 0
                    }, 500, done);
                } else {
                    done();
                }
            },
            removeClass: function(element, className, done) {
                if (className === 'ng-hide') {
                    element.css('opacity', 0);
                    element.animate({
                        opacity: 1
                    }, 500, done);
                } else {
                    done();
                }
            }
        };
    });
