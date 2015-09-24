angular.module('baseService', [])
    .factory('BaseService', ['$rootScope',
        function($rootScope) {
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
                    for (var i = 0; i < timeCollection.length; i++) {
                        var parseResult = timeParser(timeCollection[i]);
                        var weekday = parseResult.weekday;
                        var start = parseResult.start;
                        var courseLength = parseResult.length;
                        var courseRank = i + 1 - 1;
                        _this.updateOne(course, weekday, start, courseLength, courseRank);
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);

                },
                //courseRank是这周的第几节课，比如这周的第2(1)节数分大课
                updateOne: function(course, weekday, start, courseLength, courseRank) {
                    var isConflict = false;
                    var _this = this;
                    for (var i = 0; i < courseLength; i++) {

                        if (this.data[weekday][start + i] != 0) {
                            isConflict = true;
                        }
                    }
                    console.log(isConflict);
                    if (!isConflict) {
                        for (var i = 0; i < courseLength; i++) {
                            courseModel.data[weekday][start + i] = course;
                            courseModel.data[weekday][start + i].rank = courseRank;
                        }
                    } else {
                        //冲突课程名的数组

                        var conflictName = [];
                        var conflictCourse = [];
                        for (var i = 0; i < courseLength; i++) {
                            if (conflictName.indexOf(this.data[weekday][start + i]['课程名称']) == -1 && this.data[weekday][start + i] != 0) {
                                conflictName.push(this.data[weekday][start + i]['课程名称']);
                                conflictCourse.push(this.data[weekday][start + i]);
                            }
                        }
                        console.log(conflictName);
                        var name = conflictName.length > 1 ? conflictName.join('》、《') : conflictName[0];
                        if (confirm('这门课与《' + name + '》冲突，是否替换？')) {
                            //删除之前的课
                            conflictCourse.forEach(function(course) {
                                _this.remove(course);
                                console.log(course);
                            });
                            this.update(course);
                        }
                    }

                },
                remove: function(course) {
                    var timeArr = course['时间'].split('{time}');
                    var _this = this;
                    timeArr.forEach(function(time) {
                        var parseResult = timeParser(time);
                        _this.removeOne(course, parseResult);
                    })
                },
                removeOne: function(course, parseResult) {
                    var weekday = parseResult.weekday;
                    for (var i = 0; i < 13; i++) {
                        if (this.data[weekday][i]['选课序号'] == course['选课序号']) {
                            this.data[weekday][i] = 0;
                        }
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);
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
                    console.log(this.data);
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
                check:function(courseID){
                    for(var i=0;i<this.data.length;i++){
                        if(this.data[i]['选课序号'] == courseID){
                            return true;
                        }
                    }
                    return false;
                }

            }
            collectionModel.init();

            function search(specification) {
                if (!(specification.time.length || specification.keywords.length || specification.courseID.length || specification.category.length)) {
                    return [];
                }

                function matchCourse(specification, course) {
                    if (specification.time) {
                        if (specification.time.indexOf(course['时间'].trim()) == -1) {
                            return false;
                        }
                    }
                    if (specification.keywords) {
                        if (course['课程名称'].trim().indexOf(specification.keywords.trim()) == -1 && course['教师'].trim().indexOf(specification.keywords.trim()) == -1) {
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
                    weekday: weekday - 1,
                    length: length,
                    start: start - 1
                };
            }
            var service = {
                search: search,
                timeParser: timeParser,
                courseModel: courseModel,
                collectionModel: collectionModel
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
