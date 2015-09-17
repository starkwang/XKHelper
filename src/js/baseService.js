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
                        console.log(localStorage.courseModelData);
                        this.data = JSON.parse(localStorage.courseModelData);
                    }
                },
                update: function(course) {
                    var parseResult = timeParser(course['时间']);
                    var weekday = parseResult.weekday;
                    var start = parseResult.start;
                    var courseLength = parseResult.length;

                    if (this.data[weekday][start] === 0 && this.data[weekday][start + 1] === 0 && this.data[weekday][start + courseLength - 1] === 0) {
                        for (var i = 0; i < courseLength; i++) {
                            courseModel.data[weekday][start + i] = course;
                        }
                    } else {

                        //冲突课程名的数组
                        var conflictName = [];
                        for (var i = 0; i < courseLength; i++) {
                            console.log(this.data[weekday][start + i]);
                            if (conflictName.indexOf(this.data[weekday][start + i]['课程名称']) == -1) {
                                conflictName.push(this.data[weekday][start + i]['课程名称']);
                            }

                        }
                        console.log(conflictName);
                        var name = conflictName.length > 1 ? conflictName.join('、') : conflictName[0];
                        if (confirm('这门课与' + name + '冲突，是否替换？')) {
                            //删除之前的课
                            for (var i = 0; i < 13; i++) {
                                if (conflictName.indexOf(this.data[weekday][i]) != -1) {
                                    this.data[weekday][i] = 0;
                                }
                            }

                            for (var i = 0; i < courseLength; i++) {
                                courseModel.data[weekday][start + i] = course;
                            }
                            console.log(courseModel);
                        }
                    }
                    var data_ = this.data;
                    localStorage.courseModelData = JSON.stringify(data_);
                    $rootScope.$broadcast('courseModelUpdate', data_);
                }
            };

            courseModel.init();

            function search(specification) {
                if(!(specification.time.length||specification.keywords.length||specification.courseID.length||specification.category.length)){
                    return [];
                }
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
                courseModel: courseModel
            };
            return service;
        }
    ]);
