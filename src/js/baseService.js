var angular = require('angular');
angular.module('baseService', [])
    .factory('BaseService', ['$rootScope', '$http',
        function($rootScope, $http) {
            String.prototype.trim = function() {　　
                return this.replace(/(^\s*)|(\s*$)/g, "");　　
            };


            var courseModel = {
                data: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                init: function() {
                    this.data.forEach(function(d) {
                        for (var i = 0; i < 13; i++) {
                            d.push(0);
                        }
                    });
                    if (localStorage.courseModelData !== undefined) {
                        this.data = JSON.parse(localStorage.courseModelData);
                    }
                },
                update: function(course) {
                    var timeCollection = course['时间'].split('{time}');
                    var _this = this;
                    var conflictName = [];
                    var conflictCourse = [];
                    for (var i = 0; i < timeCollection.length; i++) {
                        console.log('check');
                        var parseResult = timeParser(timeCollection[i]);
                        var weekday = parseResult.weekday;
                        var start = parseResult.start;
                        var courseLength = parseResult.length;
                        for (var j = 0; j < courseLength; j++) {
                            console.log(this.data[weekday][start + j]);
                            if (this.data[weekday][start + j] != 0 && conflictName.indexOf(this.data[weekday][start + j]['课程名称']) == -1) {
                                conflictName.push(this.data[weekday][start + j]['课程名称']);
                                conflictCourse.push(this.data[weekday][start + j]);
                            }
                        }
                    }
                    var name = conflictName.length > 1 ? conflictName.join('》、《') : conflictName[0];
                    if (conflictName.length > 0) {
                        if (confirm('这门课与《' + name + '》冲突，是否替换？')) {
                            //删除之前的课
                            conflictCourse.forEach(function(course) {
                                _this.remove(course);
                            });
                            this.update(course);
                        } else {
                            return;
                        }

                    }
                    for (var i = 0; i < timeCollection.length; i++) {
                        var parseResult = timeParser(timeCollection[i]);
                        var weekday = parseResult.weekday;
                        var start = parseResult.start;
                        var courseLength = parseResult.length;
                        var courseRank = i;
                        _this.updateOne(course, weekday, start, courseLength, courseRank);
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);

                },
                //courseRank是这周的第几节课，比如这周的第2(1)节数分大课
                updateOne: function(course, weekday, start, courseLength, courseRank) {
                    for (var i = 0; i < courseLength; i++) {
                        courseModel.data[weekday][start + i] = course;
                        courseModel.data[weekday][start + i].rank = courseRank;
                    }

                },
                remove: function(course) {
                    var timeArr = course['时间'].split('{time}');
                    var _this = this;
                    timeArr.forEach(function(time) {
                        var parseResult = timeParser(time);
                        _this.removeOne(course, parseResult);
                    })
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);
                },
                removeOne: function(course, parseResult) {
                    var weekday = parseResult.weekday;
                    for (var i = 0; i < 13; i++) {
                        if (this.data[weekday][i]['选课序号'] == course['选课序号']) {
                            this.data[weekday][i] = 0;
                        }
                    }
                },

                check: function(courseID) {
                    var IDlist = [];
                    this.data.forEach(function(i) {
                        i.forEach(function(course) {
                            if (course != 0 && IDlist.indexOf(course['选课序号']) === -1) {
                                IDlist.push(course['选课序号']);
                            }
                        })
                    })
                    return IDlist.indexOf(courseID) != -1;
                },

                getCourseData: function() {
                    var courses = [];
                    var ID = [];
                    var colorBox = ['#66CCFF', '#FF9900', '#99CC33', '#FF6666', '#33CC99', '#336699', '#CCCC44', '#339933'];
                    var colorCounter = 0;
                    this.data.forEach(function(weekday) {
                        weekday.forEach(function(course) {
                            console.log(course);
                            if (course && ID.indexOf(course['选课序号']) === -1) {
                                var time = course['时间'].split('{time}');
                                time.forEach(function(time) {
                                    var item = {
                                        name: course['课程名称'],
                                        day: timeParser(time).weekday,
                                        section: time.split(' ')[1],
                                        info: course['教室'] + '(' + course['教师'] + ')',
                                        "background-color": colorBox[colorCounter]
                                    }
                                    courses.push(item);
                                })
                                colorCounter++;
                                if (colorCounter === colorBox.length) {
                                    colorCounter = 0;
                                }
                                ID.push(course['选课序号'])
                            }
                        });
                    });
                    return courses;
                }
            };

            courseModel.init();

            var collectionModel = {
                data: [],
                init: function() {
                    if (localStorage.collectionModelData !== undefined) {
                        this.data = JSON.parse(localStorage.collectionModelData);
                    }
                },
                update: function(course) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i]['选课序号'] == course['选课序号']) {
                            return;
                        }
                    }
                    this.data.push(course);
                    var data_ = this.data;
                    localStorage.collectionModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('collectionUpdate', data_);
                },
                remove: function(courseID) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i]['选课序号'] == courseID) {
                            this.data.splice(i, 1);
                            break;
                        }
                    }
                    var data_ = this.data;
                    localStorage.collectionModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('collectionUpdate', data_);
                },
                check: function(courseID) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i]['选课序号'] == courseID) {
                            return true;
                        }
                    }
                    return false;
                }

            }
            collectionModel.init();

            function matchCourse(specification, course) {
                if (specification.keywords) {
                    var reg = new RegExp(specification.keywords.trim(), 'i');
                    if (!reg.test(course['课程名称']) && !reg.test(course['教师']) && !reg.test(course['选课序号'])) {
                        return false;
                    }
                }
                if (specification.time) {
                    var timeArr = course['时间'].split('{time}');
                    for (var i = 0; i < timeArr.length; i++) {
                        //《宪法学》没有时间
                        if (timeArr[i].trim().length === 0) {
                            return true;
                        }
                        if (judgeTime(specification.time.start, specification.time.end, timeArr[i].trim())) {
                            return true;
                        }
                    }
                    return false;
                }
                return true;
            }

            function search(specification) {
                if (specification.category.length === 0) {
                    return [];
                }
                if (specification.keywords.length === 0 && specification.category.length === 9) {
                    return [];
                }

                var result = [];
                if (specification.category.length > 0) {
                    specification.category.forEach(function(category) {
                        COURSE_DATA[category].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        });
                    });
                } else {
                    for (var i in COURSE_DATA) {
                        COURSE_DATA[i].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        });
                    }
                }
                return result;
            }

            function timeParser(time) {
                //'二 3-4'
                var t = time.trim();
                var weekday = chToNumber(t.split(' ')[0]);
                var length = parseInt(t.split(' ')[1].split('-')[1]) - parseInt(t.split(' ')[1].split('-')[0]) + 1;
                var start = parseInt(t.split(' ')[1].split('-')[0]);
                //{weekday:2,length:2,start:3}
                return {
                    weekday: weekday - 1,
                    length: length,
                    start: start - 1
                };
            }

            function chToNumber(chinese) {
                var weekday;
                switch (chinese) {
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
                return weekday;
            }

            function judgeTime(startTime, endTime, courseTime) {
                //'一 2','二 4','一 3-5'
                var ch = courseTime.trim().split(' ')[0];
                var start = courseTime.trim().split(' ')[1].split('-')[0];
                var end = courseTime.trim().split(' ')[1].split('-')[1];
                var courseTimeStart = ch + ' ' + start;
                var courseTimeEnd = ch + ' ' + end;
                if (compareTime(startTime, courseTimeStart) && compareTime(courseTimeEnd, endTime)) {
                    return true;
                } else {
                    return false;
                }
            }

            function compareTime(time1, time2) {
                //'一 2','一 3'
                //time1比time2更早或者相等的话，返回true
                var weekday1 = chToNumber(time1.trim().split(' ')[0]);
                var weekday2 = chToNumber(time2.trim().split(' ')[0]);
                var No1 = parseInt(time1.trim().split(' ')[1]);
                var No2 = parseInt(time2.trim().split(' ')[1]);
                if (weekday1 === weekday2) {
                    return No1 <= No2;
                } else {
                    return weekday1 < weekday2;
                }
            }

            //生成图片
            var saveToPhone = function(data) {
                return $http.post('/xk/api/', data);
            }

            var service = {
                search: search,
                timeParser: timeParser,
                courseModel: courseModel,
                collectionModel: collectionModel,
                judgeTime: judgeTime,
                saveToPhone: saveToPhone
            };
            return service;
        }
    ])
    .filter("timeFilter", function() {
        var filter = function(time) {
            if (time != undefined) {
                return time.replace(/{time}/g, '，');
            } else {
                return time;
            }
        };
        return filter;
    });
module.exports = angular;
