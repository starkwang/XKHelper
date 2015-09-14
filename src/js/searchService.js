angular.module('searchService', [])
    .factory('SearchService', function() {
        String.prototype.trim = function() {　　
            return this.replace(/(^\s*)|(\s*$)/g, "");　　
        }
        var b = {
            time: ['四 8-9', '三 1-2'],
            category: [],
            keywords: '',
            courseID: 'HIST',
        };

        function matchCourse(specification, course) {
            if (specification.time) {
                if (specification.time.indexOf(course['时间'].trim()) == -1) {
                    return false;
                }
            }
            if (specification.keywords) {
                if (course['课程名称'].trim().indexOf(specification.keywords.trim()) == -1) {
                    return false;
                }
            }
            if (specification.courseID) {
                if (course['选课序号'].trim().indexOf(specification.courseID.trim()) == -1) {
                    return false;
                }
            }
            return true;
        }


        var service = {
            search: function(specification) {
                var result = [];
                if (specification.category.length > 0) {
                    specification.category.forEach(function(category) {
                        COURSE_DATA[category].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        })
                    })
                } else {
                    for (var i in COURSE_DATA) {
                        COURSE_DATA[i].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        })
                    }
                }
                return result;
            },
            timeParser: function(time) {
                //'二 3-4'
                var t = time.trim();
                var weekday;
                switch (t.split(' ')[0]) {
                    case '一':
                        weekday = 1;
                        break;
                    case '二':
                        weekday = 2;
                        break;
                    case '三':
                        weekday = 3;
                        break;
                    case '四':
                        weekday = 4;
                        break;
                    case '五':
                        weekday = 5;
                        break;
                    case '六':
                        weekday = 6;
                        break;
                }
                var length = parseInt(t.split(' ')[1].split('-')[1]) - parseInt(t.split(' ')[1].split('-')[0]) + 1;
                var start = parseInt(t.split(' ')[1].split('-')[0]);
                //{weekday:2,length:2,start:3}
                return {
                    weekday: weekday,
                    length: length,
                    start: start-1
                }
            }
        };
        return service;
    });
