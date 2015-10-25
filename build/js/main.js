var angular = require('angular');
angular.module('clipBoard', [])
    .directive('clipBoard', function() {
        /*!
         * modified from clipboard.js v1.4.2
         * https://zenorocha.github.io/clipboard.js
         *
         * Licensed MIT © Zeno Rocha
         */
        var Clipboard =function() {
            var define, module, exports;
            return (function e(t, n, r) {
                function s(o, u) {
                    if (!n[o]) {
                        if (!t[o]) {
                            var a = typeof require == "function" && require;
                            if (!u && a) return a(o, !0);
                            if (i) return i(o, !0);
                            var f = new Error("Cannot find module '" + o + "'");
                            throw f.code = "MODULE_NOT_FOUND", f
                        }
                        var l = n[o] = {
                            exports: {}
                        };
                        t[o][0].call(l.exports, function(e) {
                            var n = t[o][1][e];
                            return s(n ? n : e)
                        }, l, l.exports, e, t, n, r)
                    }
                    return n[o].exports
                }
                var i = typeof require == "function" && require;
                for (var o = 0; o < r.length; o++) s(r[o]);
                return s
            })({
                1: [function(require, module, exports) {
                    /**
                     * Module dependencies.
                     */

                    var closest = require('closest'),
                        event = require('component-event');

                    /**
                     * Delegate event `type` to `selector`
                     * and invoke `fn(e)`. A callback function
                     * is returned which may be passed to `.unbind()`.
                     *
                     * @param {Element} el
                     * @param {String} selector
                     * @param {String} type
                     * @param {Function} fn
                     * @param {Boolean} capture
                     * @return {Function}
                     * @api public
                     */

                    // Some events don't bubble, so we want to bind to the capture phase instead
                    // when delegating.
                    var forceCaptureEvents = ['focus', 'blur'];

                    exports.bind = function(el, selector, type, fn, capture) {
                        if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

                        return event.bind(el, type, function(e) {
                            var target = e.target || e.srcElement;
                            e.delegateTarget = closest(target, selector, true, el);
                            if (e.delegateTarget) fn.call(el, e);
                        }, capture);
                    };

                    /**
                     * Unbind event `type`'s callback `fn`.
                     *
                     * @param {Element} el
                     * @param {String} type
                     * @param {Function} fn
                     * @param {Boolean} capture
                     * @api public
                     */

                    exports.unbind = function(el, type, fn, capture) {
                        if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

                        event.unbind(el, type, fn, capture);
                    };

                }, {
                    "closest": 2,
                    "component-event": 4
                }],
                2: [function(require, module, exports) {
                    var matches = require('matches-selector')

                    module.exports = function(element, selector, checkYoSelf) {
                        var parent = checkYoSelf ? element : element.parentNode

                        while (parent && parent !== document) {
                            if (matches(parent, selector)) return parent;
                            parent = parent.parentNode
                        }
                    }

                }, {
                    "matches-selector": 3
                }],
                3: [function(require, module, exports) {

                    /**
                     * Element prototype.
                     */

                    var proto = Element.prototype;

                    /**
                     * Vendor function.
                     */

                    var vendor = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

                    /**
                     * Expose `match()`.
                     */

                    module.exports = match;

                    /**
                     * Match `el` to `selector`.
                     *
                     * @param {Element} el
                     * @param {String} selector
                     * @return {Boolean}
                     * @api public
                     */

                    function match(el, selector) {
                        if (vendor) return vendor.call(el, selector);
                        var nodes = el.parentNode.querySelectorAll(selector);
                        for (var i = 0; i < nodes.length; ++i) {
                            if (nodes[i] == el) return true;
                        }
                        return false;
                    }
                }, {}],
                4: [function(require, module, exports) {
                    var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
                        unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
                        prefix = bind !== 'addEventListener' ? 'on' : '';

                    /**
                     * Bind `el` event `type` to `fn`.
                     *
                     * @param {Element} el
                     * @param {String} type
                     * @param {Function} fn
                     * @param {Boolean} capture
                     * @return {Function}
                     * @api public
                     */

                    exports.bind = function(el, type, fn, capture) {
                        el[bind](prefix + type, fn, capture || false);
                        return fn;
                    };

                    /**
                     * Unbind `el` event `type`'s callback `fn`.
                     *
                     * @param {Element} el
                     * @param {String} type
                     * @param {Function} fn
                     * @param {Boolean} capture
                     * @return {Function}
                     * @api public
                     */

                    exports.unbind = function(el, type, fn, capture) {
                        el[unbind](prefix + type, fn, capture || false);
                        return fn;
                    };
                }, {}],
                5: [function(require, module, exports) {
                    function E() {
                        // Keep this empty so it's easier to inherit from
                        // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
                    }

                    E.prototype = {
                        on: function(name, callback, ctx) {
                            var e = this.e || (this.e = {});

                            (e[name] || (e[name] = [])).push({
                                fn: callback,
                                ctx: ctx
                            });

                            return this;
                        },

                        once: function(name, callback, ctx) {
                            var self = this;
                            var fn = function() {
                                self.off(name, fn);
                                callback.apply(ctx, arguments);
                            };

                            return this.on(name, fn, ctx);
                        },

                        emit: function(name) {
                            var data = [].slice.call(arguments, 1);
                            var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                            var i = 0;
                            var len = evtArr.length;

                            for (i; i < len; i++) {
                                evtArr[i].fn.apply(evtArr[i].ctx, data);
                            }

                            return this;
                        },

                        off: function(name, callback) {
                            var e = this.e || (this.e = {});
                            var evts = e[name];
                            var liveEvents = [];

                            if (evts && callback) {
                                for (var i = 0, len = evts.length; i < len; i++) {
                                    if (evts[i].fn !== callback) liveEvents.push(evts[i]);
                                }
                            }

                            // Remove event from queue to prevent memory leak
                            // Suggested by https://github.com/lazd
                            // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

                            (liveEvents.length) ? e[name] = liveEvents: delete e[name];

                            return this;
                        }
                    };

                    module.exports = E;

                }, {}],
                6: [function(require, module, exports) {
                    /**
                     * Inner class which performs selection from either `text` or `target`
                     * properties and then executes copy or cut operations.
                     */
                    'use strict';

                    exports.__esModule = true;

                    var _createClass = (function() {
                        function defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ('value' in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        return function(Constructor, protoProps, staticProps) {
                            if (protoProps) defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) defineProperties(Constructor, staticProps);
                            return Constructor;
                        };
                    })();

                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError('Cannot call a class as a function');
                        }
                    }

                    var ClipboardAction = (function() {
                        /**
                         * @param {Object} options
                         */

                        function ClipboardAction(options) {
                            _classCallCheck(this, ClipboardAction);

                            this.resolveOptions(options);
                            this.initSelection();
                        }

                        /**
                         * Defines base properties passed from constructor.
                         * @param {Object} options
                         */

                        ClipboardAction.prototype.resolveOptions = function resolveOptions() {
                            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                            this.action = options.action;
                            this.emitter = options.emitter;
                            this.target = options.target;
                            this.text = options.text;
                            this.trigger = options.trigger;

                            this.selectedText = '';
                        };

                        /**
                         * Decides which selection strategy is going to be applied based
                         * on the existence of `text` and `target` properties.
                         */

                        ClipboardAction.prototype.initSelection = function initSelection() {
                            if (this.text && this.target) {
                                throw new Error('Multiple attributes declared, use either "target" or "text"');
                            } else if (this.text) {
                                this.selectFake();
                            } else if (this.target) {
                                this.selectTarget();
                            } else {
                                throw new Error('Missing required attributes, use either "target" or "text"');
                            }
                        };

                        /**
                         * Creates a fake textarea element, sets its value from `text` property,
                         * and makes a selection on it.
                         */

                        ClipboardAction.prototype.selectFake = function selectFake() {
                            var _this = this;

                            this.removeFake();

                            this.fakeHandler = document.body.addEventListener('click', function() {
                                return _this.removeFake();
                            });

                            this.fakeElem = document.createElement('textarea');
                            this.fakeElem.style.position = 'absolute';
                            this.fakeElem.style.left = '-9999px';
                            this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
                            this.fakeElem.setAttribute('readonly', '');
                            this.fakeElem.value = this.text;
                            this.selectedText = this.text;

                            document.body.appendChild(this.fakeElem);

                            this.fakeElem.select();
                            this.copyText();
                        };

                        /**
                         * Only removes the fake element after another click event, that way
                         * a user can hit `Ctrl+C` to copy because selection still exists.
                         */

                        ClipboardAction.prototype.removeFake = function removeFake() {
                            if (this.fakeHandler) {
                                document.body.removeEventListener('click');
                                this.fakeHandler = null;
                            }

                            if (this.fakeElem) {
                                document.body.removeChild(this.fakeElem);
                                this.fakeElem = null;
                            }
                        };

                        /**
                         * Selects the content from element passed on `target` property.
                         */

                        ClipboardAction.prototype.selectTarget = function selectTarget() {
                            if (this.target.nodeName === 'INPUT' || this.target.nodeName === 'TEXTAREA') {
                                this.target.select();
                                this.selectedText = this.target.value;
                            } else {
                                var range = document.createRange();
                                var selection = window.getSelection();

                                selection.removeAllRanges();
                                range.selectNodeContents(this.target);
                                selection.addRange(range);
                                this.selectedText = selection.toString();
                            }

                            this.copyText();
                        };

                        /**
                         * Executes the copy operation based on the current selection.
                         */

                        ClipboardAction.prototype.copyText = function copyText() {
                            var succeeded = undefined;

                            try {
                                succeeded = document.execCommand(this.action);
                            } catch (err) {
                                succeeded = false;
                            }

                            this.handleResult(succeeded);
                        };

                        /**
                         * Fires an event based on the copy operation result.
                         * @param {Boolean} succeeded
                         */

                        ClipboardAction.prototype.handleResult = function handleResult(succeeded) {
                            if (succeeded) {
                                this.emitter.emit('success', {
                                    action: this.action,
                                    text: this.selectedText,
                                    trigger: this.trigger,
                                    clearSelection: this.clearSelection.bind(this)
                                });
                            } else {
                                this.emitter.emit('error', {
                                    action: this.action,
                                    trigger: this.trigger,
                                    clearSelection: this.clearSelection.bind(this)
                                });
                            }
                        };

                        /**
                         * Removes current selection and focus from `target` element.
                         */

                        ClipboardAction.prototype.clearSelection = function clearSelection() {
                            if (this.target) {
                                this.target.blur();
                            }

                            window.getSelection().removeAllRanges();
                        };

                        /**
                         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
                         * @param {String} action
                         */

                        /**
                         * Destroy lifecycle.
                         */

                        ClipboardAction.prototype.destroy = function destroy() {
                            this.removeFake();
                        };

                        _createClass(ClipboardAction, [{
                            key: 'action',
                            set: function set() {
                                var action = arguments.length <= 0 || arguments[0] === undefined ? 'copy' : arguments[0];

                                this._action = action;

                                if (this._action !== 'copy' && this._action !== 'cut') {
                                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                                }
                            },

                            /**
                             * Gets the `action` property.
                             * @return {String}
                             */
                            get: function get() {
                                return this._action;
                            }

                            /**
                             * Sets the `target` property using an element
                             * that will be have its content copied.
                             * @param {Element} target
                             */
                        }, {
                            key: 'target',
                            set: function set(target) {
                                if (target !== undefined) {
                                    if (target && typeof target === 'object' && target.nodeType === 1) {
                                        this._target = target;
                                    } else {
                                        throw new Error('Invalid "target" value, use a valid Element');
                                    }
                                }
                            },

                            /**
                             * Gets the `target` property.
                             * @return {String|HTMLElement}
                             */
                            get: function get() {
                                return this._target;
                            }
                        }]);

                        return ClipboardAction;
                    })();

                    exports['default'] = ClipboardAction;
                    module.exports = exports['default'];

                }, {}],
                7: [function(require, module, exports) {
                    'use strict';

                    exports.__esModule = true;

                    function _interopRequireDefault(obj) {
                        return obj && obj.__esModule ? obj : {
                            'default': obj
                        };
                    }

                    function _classCallCheck(instance, Constructor) {
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError('Cannot call a class as a function');
                        }
                    }

                    function _inherits(subClass, superClass) {
                        if (typeof superClass !== 'function' && superClass !== null) {
                            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
                        }
                        subClass.prototype = Object.create(superClass && superClass.prototype, {
                            constructor: {
                                value: subClass,
                                enumerable: false,
                                writable: true,
                                configurable: true
                            }
                        });
                        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                    }

                    var _clipboardAction = require('./clipboard-action');

                    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

                    var _delegateEvents = require('delegate-events');

                    var _delegateEvents2 = _interopRequireDefault(_delegateEvents);

                    var _tinyEmitter = require('tiny-emitter');

                    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

                    /**
                     * Base class which takes a selector, delegates a click event to it,
                     * and instantiates a new `ClipboardAction` on each click.
                     */

                    var Clipboard = (function(_Emitter) {
                        _inherits(Clipboard, _Emitter);

                        /**
                         * @param {String} selector
                         * @param {Object} options
                         */

                        function Clipboard(selector, options) {
                            _classCallCheck(this, Clipboard);

                            _Emitter.call(this);

                            this.resolveOptions(options);
                            this.delegateClick(selector);
                        }

                        /**
                         * Helper function to retrieve attribute value.
                         * @param {String} suffix
                         * @param {Element} element
                         */

                        /**
                         * Defines if attributes would be resolved using internal setter functions
                         * or custom functions that were passed in the constructor.
                         * @param {Object} options
                         */

                        Clipboard.prototype.resolveOptions = function resolveOptions() {
                            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                        };

                        /**
                         * Delegates a click event on the passed selector.
                         * @param {String} selector
                         */

                        Clipboard.prototype.delegateClick = function delegateClick(selector) {
                            var _this = this;

                            this.binding = _delegateEvents2['default'].bind(document.body, selector, 'click', function(e) {
                                return _this.onClick(e);
                            });
                        };

                        /**
                         * Undelegates a click event on body.
                         * @param {String} selector
                         */

                        Clipboard.prototype.undelegateClick = function undelegateClick() {
                            _delegateEvents2['default'].unbind(document.body, 'click', this.binding);
                        };

                        /**
                         * Defines a new `ClipboardAction` on each click event.
                         * @param {Event} e
                         */

                        Clipboard.prototype.onClick = function onClick(e) {
                            if (this.clipboardAction) {
                                this.clipboardAction = null;
                            }

                            this.clipboardAction = new _clipboardAction2['default']({
                                action: this.action(e.delegateTarget),
                                target: this.target(e.delegateTarget),
                                text: this.text(e.delegateTarget),
                                trigger: e.delegateTarget,
                                emitter: this
                            });
                        };

                        /**
                         * Default `action` lookup function.
                         * @param {Element} trigger
                         */

                        Clipboard.prototype.defaultAction = function defaultAction(trigger) {
                            return getAttributeValue('action', trigger);
                        };

                        /**
                         * Default `target` lookup function.
                         * @param {Element} trigger
                         */

                        Clipboard.prototype.defaultTarget = function defaultTarget(trigger) {
                            var selector = getAttributeValue('target', trigger);

                            if (selector) {
                                return document.querySelector(selector);
                            }
                        };

                        /**
                         * Default `text` lookup function.
                         * @param {Element} trigger
                         */

                        Clipboard.prototype.defaultText = function defaultText(trigger) {
                            return getAttributeValue('text', trigger);
                        };

                        /**
                         * Destroy lifecycle.
                         */

                        Clipboard.prototype.destroy = function destroy() {
                            this.undelegateClick();

                            if (this.clipboardAction) {
                                this.clipboardAction.destroy();
                                this.clipboardAction = null;
                            }
                        };

                        return Clipboard;
                    })(_tinyEmitter2['default']);

                    function getAttributeValue(suffix, element) {
                        var attribute = 'clip-board-' + suffix;

                        if (!element.hasAttribute(attribute)) {
                            return;
                        }

                        return element.getAttribute(attribute);
                    }

                    exports['default'] = Clipboard;
                    module.exports = exports['default'];

                }, {
                    "./clipboard-action": 6,
                    "delegate-events": 1,
                    "tiny-emitter": 5
                }]
            }, {}, [7])(7)
        }();

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                new Clipboard('[clip-board]');
            }
        }
    });
module.exports = angular;
'use strict';
var angular = require('angular');
document.documentElement.style.overflowY = 'hidden';
var starkAPP = angular.module('starkAPP', [
        'ngRoute',
        'ngAnimate',
        'routeStyles',
        'baseService',
        'clipBoard'
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: './html/main.html'
                })
                .when('/all/', {
                    templateUrl: './html/all.html'
                })
                .when('/collection/', {
                    templateUrl: './html/collection.html'
                })
                .when('/forum/', {
                    templateUrl: './html/forum.html'
                })
                .when('/forum/course/', {
                    templateUrl: './html/forum_course.html'
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ]);
module.exports = starkAPP;

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

//全部课程
var starkAPP = require('./app.js')
starkAPP.controller('allController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function($scope, $rootScope, BaseService, $timeout, $location) {
            var data = [];
            for (name in COURSE_DATA) {
                data.push({
                    name: name,
                    courses: COURSE_DATA[name]
                })
            }
            $scope.data = data;
            var handleCourse;
            $scope.handle = {};
            $scope.showHandle = function() {
                var e = e || window.event;
                handleCourse = this.course;

                this.$parent.category.handle = {};
                if (BaseService.courseModel.check(this.course['选课序号'])) {
                    this.$parent.category.handle.text1 = '已选入课表';
                    this.$parent.category.handle.isInCourseTable = true;
                } else {
                    this.$parent.category.handle.text1 = '加入课表';
                    this.$parent.category.handle.isInCourseTable = false;
                }
                if (BaseService.collectionModel.check(this.course['选课序号'])) {
                    this.$parent.category.handle.text2 = '已在收藏夹';
                    this.$parent.category.handle.isInCollection = true;
                } else {
                    this.$parent.category.handle.text2 = '加入收藏夹';
                    this.$parent.category.handle.isInCollection = false;
                }
                var top = e.clientY;
                var left = e.clientX;
                this.$parent.category.handle.name = this.course['课程名称'];
                this.$parent.category.handle.teacher = this.course['教师'];
                this.$parent.category.handle.position = 'left:' + left + 'px;top:' + top + 'px;';
                this.$parent.category.handleIsShow = true;
            }
            $scope.closeHandle = function() {
                this.category.handleIsShow = false;
            }
            $scope.update = function() {
                BaseService.courseModel.update(handleCourse);
            }
            $scope.addIntoBox = function(){
                BaseService.collectionModel.update(handleCourse);
            }

        }
    ]);
module.exports = starkAPP;
//收藏夹
var starkAPP = require('./app.js');
starkAPP.controller('collectionController', ['$scope', '$rootScope','BaseService','$timeout','$location',
        function($scope, $rootScope,BaseService, $timeout,$location) {
            function refreshen(){
                $scope.courses = BaseService.collectionModel.data;
                $scope.courses.forEach(function(course){
                    if(BaseService.courseModel.check(course['选课序号'])){
                        course.isInCourseTable = true;
                    }else{
                        course.isInCourseTable = false;
                    }
                    course.text = course.isInCourseTable?'已加入课表':'加入课表';
                });
            }
            refreshen();
            $scope.$on('collectionUpdate',function(data){
                refreshen();
            });
            $scope.$on('courseModelUpdate',function(data){
                refreshen();
            });

            $scope.addCourse = function(){
                BaseService.courseModel.update(this.course);
            }
            $scope.remove = function(){
                BaseService.collectionModel.remove(this.course['选课序号']);
            }
        }
    ]);
module.exports = starkAPP;

//课表
var starkAPP = require('./app.js');
starkAPP.controller('courseTableController', ['$scope', 'BaseService', '$timeout',
        function($scope, BaseService, $timeout) {

            refreshen(BaseService.courseModel.data);

            $scope.$on('courseModelUpdate', function(event, data) {
                refreshen(data);
            });


            function refreshen(data) {
                $scope.tableView = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ];
                $scope.tableView.forEach(function(a) {
                    for (var i = 0; i < 13; i++) {
                        a.push({
                            length: 1
                        });
                    }
                })
                var courseModel = [];
                data.forEach(function(i) {
                    i.forEach(function(j) {
                        if (j != 0) {
                            courseModel.push(j);
                        }

                    })
                });

                function render(item, parseResult) {
                    if (parseResult.length == 2) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text1: item['选课序号'],
                            text2: item['课程名称'],
                            length: parseResult.length,
                            No: 0,
                            show: true,
                            style: '',
                            locate: 'start'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text1: item['教室'],
                            text2: item['教师'],
                            length: parseResult.length,
                            No: 1,
                            show: true,
                            locate: 'end'
                        };
                    }
                    if (parseResult.length == 3) {
                        $scope.tableView[parseResult.weekday][parseResult.start] = {
                            text1: item['选课序号'],
                            length: parseResult.length,
                            No: 0,
                            show: true,
                            style: '',
                            locate: 'start'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 1] = {
                            text1: item['课程名称'],
                            length: parseResult.length,
                            No: 1,
                            show: true,
                            style: '',
                            locate: 'body'
                        };
                        $scope.tableView[parseResult.weekday][parseResult.start + 2] = {
                            text1: item['教室'],
                            text2: item['教师'],
                            length: parseResult.length,
                            No: 2,
                            show: true,
                            style: '',
                            locate: 'end'
                        };
                    }
                    if (parseResult.length >= 4) {
                        var tag = ['选课序号', '课程名称', '教室', '教师'];
                        var lineStart = Math.floor((parseResult.length - 4) / 2);

                        for (var i = 0; i < parseResult.length; i++) {
                            $scope.tableView[parseResult.weekday][parseResult.start + i] = {
                                length: parseResult.length,
                                No: i,
                                show: true,
                                style: '',
                                locate: 'body'
                            };
                            if (i == 0) {
                                $scope.tableView[parseResult.weekday][parseResult.start + i].locate = 'start';
                            }
                            if (i == parseResult.length - 1) {
                                $scope.tableView[parseResult.weekday][parseResult.start + i].locate = 'end';
                            }
                        }

                        for (var i = 0; i < 4; i++) {
                            var No = lineStart + i;
                            $scope.tableView[parseResult.weekday][parseResult.start + lineStart + i]['text1'] = item[tag[i]];
                        }

                    }
                }
                courseModel.forEach(function(item) {
                    var timeArr = item['时间'].split('{time}');
                    for (var i = 0; i < timeArr.length; i++) {
                        var parseResult = BaseService.timeParser(timeArr[i]);
                        render(item, parseResult);
                    }
                });
            }

            $scope.remove = function(weekday, No) {
                var course = BaseService.courseModel.data[weekday][No];
                BaseService.courseModel.remove(course);
            }

            $scope.hover = function(line, row) {
                var color = "background:#ddd";
                var nowItem = line;
                //往上几格
                var up = $scope.tableView[row][line].No || 0;
                var down = $scope.tableView[row][line].length - up - 1 || 0;
                for (var i = 0; i <= up; i++) {
                    $scope.tableView[row][line - i].style = color;
                }
                for (var i = 0; i <= down; i++) {
                    $scope.tableView[row][line + i].style = color;
                }
            }
            $scope.out = function(line, row) {
                var color = "";
                var nowItem = line;
                //往上几格
                var up = $scope.tableView[row][line].No || 0;
                var down = $scope.tableView[row][line].length - up - 1 || 0;
                for (var i = 0; i <= up; i++) {
                    $scope.tableView[row][line - i].style = color;
                }
                for (var i = 0; i <= down; i++) {
                    $scope.tableView[row][line + i].style = color;
                }
            }

            $scope.showDetail = function(weekday, No, $event) {
                
                var e = e || window.event || $event;
                //console.log($event,e);
                if (BaseService.courseModel.data[weekday][No] === 0) {
                    return;
                }
                $scope.detail = BaseService.courseModel.data[weekday][No];
                if ($scope.detailIsShow == true) {
                    $scope.detailIsShow = false;
                    $timeout(function() {
                        $scope.detailIsShow = true;
                    }, 0);
                } else {
                    $scope.detailIsShow = true;
                }

                if (weekday === 0 || weekday === 1 || weekday === 2) {
                    var top;
                    if(e.layerY != undefined){
                        top = e.layerY - 100 < 0 ? 0 : e.layerY - 100;
                    }else{
                        top= e.clientY+$('#bg')[0].scrollTop-100;
                    }
                    var left = (weekday + 1) * 15 + 10;
                    $scope.detailPosition = "top:" + top + "px;left:" + left + "%;";
                }
                if (weekday === 3 || weekday === 4 || weekday === 5) {
                    var top;
                    if(e.layerY != undefined){
                        top = e.layerY - 100 < 0 ? 0 : e.layerY - 100;
                    }else{
                        top= e.clientY+$('#bg')[0].scrollTop-100;
                    }
                    var right = (6 - weekday) * 15;
                    $scope.detailPosition = "top:" + top + "px;right:" + right + "%;";
                }
            }

            $scope.closeDetail = function() {
                $scope.detailIsShow = false;
            }

            $scope.removeCourse = function() {
                BaseService.courseModel.remove($scope.detail);
            }

            $scope.saveToPhone = function() {
                var course_data = {
                    courses: BaseService.courseModel.getCourseData(),
                    "day-content": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    "line-color": "#fff",
                    "background-color": "#fff",
                    "width": 480,
                    "height": 960,
                    "font-size": 36,
                    "info-font-size": 30,
                    "header-font-size": 30,
                    "siderbar-font-size": 24
                };
                var data = JSON.stringify(course_data);
                console.log(data);
                BaseService.saveToPhone({
                    "course_data": data,
                }).then(function(result) {
                    $scope.qrcode = true;
                    var url = 'http://stu.fudan.edu.cn/xk/img/' + result.data;
                    $('.qrcode').html('');
                    $('.qrcode').qrcode({
                        width: 200,
                        height: 200,
                        text: url
                    })
                });
            }

            $scope.hideQrcode = function() {
                $scope.qrcode = false;
            }
        }
    ]);
module.exports = starkAPP;
//课程清单、考试时间
var starkAPP = require('./app.js');
starkAPP.controller('courseTotalController', ['$scope', 'BaseService',
        function($scope, BaseService) {
            refreshen(BaseService.courseModel.data);

            $scope.$on('courseModelUpdate', function(event, data) {
                refreshen(data);
            });

            function refreshen(data) {
                var list = [];
                var idList = [];
                var totalCredit = 0;
                data.forEach(function(i) {
                    i.forEach(function(course) {
                        if (course != 0 && idList.indexOf(course['选课序号']) === -1) {
                            idList.push(course['选课序号']);
                            list.push(course);
                            totalCredit += parseInt(course['学分']);
                        }
                    })
                })
                $scope.list = list;
                $scope.totalCredit = totalCredit;
            }
        }
    ]);
module.exports = starkAPP;
//课程论坛
var starkAPP = require('./app.js');
starkAPP.controller('forumController', ['$scope', 'BaseService',
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
module.exports = starkAPP;
//课程论坛详情页
var starkAPP = require('./app.js');
starkAPP.controller('forumCourseController', ['$scope', 'BaseService',
        function($scope, BaseService) {

        }
    ]);
module.exports = starkAPP;
//搜索
var starkAPP = require('./app.js');
starkAPP.controller('searchController', ['$scope', 'BaseService', '$timeout', '$location',
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
                }
                $scope.result = BaseService.search(params);

                if ($scope.result.length > 0) {
                    $scope.resultShow = true;
                } else {
                    $scope.resultShow = false;
                }
            }

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
                $scope.moreSearchShow = !$scope.moreSearchShow;
            }
        }
    ]);
module.exports = starkAPP;
//侧边栏
var starkAPP = require('./app.js');
starkAPP.controller('sidebarController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function($scope, $rootScope, BaseService, $timeout, $location) {
            function refreshen() {
                $scope.active = {};
                var path = $location.path().split('/')[1];
                $scope.active[path + 'IsActive'] = true;
            }

            refreshen();

            $scope.changeURL = function(url) {
                $location.url(url);
                refreshen();
            }

            $scope.showSearch = function() {
                $rootScope.$broadcast('showSearch');
            }
        }
    ]);
module.exports = starkAPP;