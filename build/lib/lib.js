!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.CSV=e()}(this,function(){"use strict";function t(t){var e=typeof t;return"function"===e||"object"===e&&!!t}function e(t){return"string"==typeof t}function n(t){return!isNaN(+t)}function i(t){return 0==t||1==t}function r(t){return null==t}function o(t){return null!=t}function c(t,e){return o(t)?t:e}function u(t,e){for(var n=0,i=t.length;i>n&&e(t[n],n)!==!1;n+=1);}function s(t){return t.replace(/"/g,'\\"')}function a(t){return"attrs["+t+"]"}function l(t,e){return n(t)?"Number("+a(e)+")":i(t)?"Boolean("+a(e)+" == true)":"String("+a(e)+")"}function f(t,n,i,r){var o=[];return 3==arguments.length?(n?g(n)?u(i,function(i,r){e(n[r])?n[r]=n[r].toLowerCase():t[n[r]]=n[r],o.push("deserialize[cast["+r+"]]("+a(r)+")")}):u(i,function(t,e){o.push(l(t,e))}):u(i,function(t,e){o.push(a(e))}),o="return ["+o.join(",")+"]"):(n?g(n)?u(i,function(i,c){e(n[c])?n[c]=n[c].toLowerCase():t[n[c]]=n[c],o.push('"'+s(r[c])+'": deserialize[cast['+c+"]]("+a(c)+")")}):u(i,function(t,e){o.push('"'+s(r[e])+'": '+l(t,e))}):u(i,function(t,e){o.push('"'+s(r[e])+'": '+a(e))}),o="return {"+o.join(",")+"}"),Function("attrs","deserialize","cast",o)}function h(t,e){var n,i=0;return u(e,function(e){var r,o=e;-1!=p.indexOf(e)&&(o="\\"+o),r=t.match(RegExp(o,"g")),r&&r.length>i&&(i=r.length,n=e)}),n||e[0]}var p=["|","^"],d=[",",";","  ","|","^"],m=["\r\n","\r","\n"],g=Array.isArray||function(t){return"[object Array]"===toString.call(t)},y=function(){function n(t,n){if(n||(n={}),g(t))this.mode="encode";else{if(!e(t))throw Error("Incompatible format!");this.mode="parse"}this.data=t,this.options={header:c(n.header,!1),cast:c(n.cast,!0)};var i=n.lineDelimiter||n.line,r=n.cellDelimiter||n.delimiter;this.isParser()?(this.options.lineDelimiter=i||h(this.data,m),this.options.cellDelimiter=r||h(this.data,d),this.data=o(this.data,this.options.lineDelimiter)):this.isEncoder()&&(this.options.lineDelimiter=i||"\r\n",this.options.cellDelimiter=r||",")}function i(t,e,n,i,r){t(new e(n,i,r))}function o(t,e){return t.slice(-e.length)!=e&&(t+=e),t}function s(n){return g(n)?"array":t(n)?"object":e(n)?"string":r(n)?"null":"primitive"}return n.prototype.set=function(t,e){return this.options[t]=e},n.prototype.isParser=function(){return"parse"==this.mode},n.prototype.isEncoder=function(){return"encode"==this.mode},n.prototype.parse=function(t){function e(){s={escaped:!1,quote:!1,cell:!0}}function n(){m.cell=""}function r(){m.line=[]}function o(t){m.line.push(s.escaped?t.slice(1,-1).replace(/""/g,'"'):t),n(),e()}function c(t){o(t.slice(0,1-p.lineDelimiter.length))}function u(){d?g(d)?(a=f(y,p.cast,m.line,d),(u=function(){i(t,a,m.line,y,p.cast)})()):d=m.line:(a||(a=f(y,p.cast,m.line)),(u=function(){i(t,a,m.line,y,p.cast)})())}if("parse"==this.mode){if(0===this.data.trim().length)return[];var s,a,l,h=this.data,p=this.options,d=p.header,m={cell:"",line:[]},y=this.deserialize;t||(l=[],t=function(t){l.push(t)}),1==p.lineDelimiter.length&&(c=o);var v,A,D,b=h.length,j=p.cellDelimiter.charCodeAt(0),w=p.lineDelimiter.charCodeAt(p.lineDelimiter.length-1);for(e(),v=0,A=0;b>v;v++)D=h.charCodeAt(v),s.cell&&(s.cell=!1,34==D)?s.escaped=!0:s.escaped&&34==D?s.quote=!s.quote:(s.escaped&&s.quote||!s.escaped)&&(D==j?(o(m.cell+h.slice(A,v)),A=v+1):D==w&&(c(m.cell+h.slice(A,v)),A=v+1,u(),r()));return l?l:this}},n.prototype.deserialize={string:function(t){return t+""},number:function(t){return+t},"boolean":function(t){return!!t}},n.prototype.serialize={object:function(t){var e=this,n=Object.keys(t),i=Array(n.length);return u(n,function(n,r){i[r]=e[s(t[n])](t[n])}),i},array:function(t){var e=this,n=Array(t.length);return u(t,function(t,i){n[i]=e[s(t)](t)}),n},string:function(t){return'"'+(t+"").replace(/"/g,'""')+'"'},"null":function(){return""},primitive:function(t){return t}},n.prototype.encode=function(t){function n(t){return t.join(c.cellDelimiter)}if("encode"==this.mode){if(0==this.data.length)return"";var i,r,o=this.data,c=this.options,a=c.header,l=o[0],f=this.serialize,h=0;t||(r=Array(o.length),t=function(t,e){r[e+h]=t}),a&&(g(a)||(i=Object.keys(l),a=i),t(n(f.array(a)),0),h=1);var p,d=s(l);return"array"==d?(g(c.cast)?(p=Array(c.cast.length),u(c.cast,function(t,n){e(t)?p[n]=t.toLowerCase():(p[n]=t,f[t]=t)})):(p=Array(l.length),u(l,function(t,e){p[e]=s(t)})),u(o,function(e,i){var r=Array(p.length);u(e,function(t,e){r[e]=f[p[e]](t)}),t(n(r),i)})):"object"==d&&(i=Object.keys(l),g(c.cast)?(p=Array(c.cast.length),u(c.cast,function(t,n){e(t)?p[n]=t.toLowerCase():(p[n]=t,f[t]=t)})):(p=Array(i.length),u(i,function(t,e){p[e]=s(l[t])})),u(o,function(e,r){var o=Array(i.length);u(i,function(t,n){o[n]=f[p[n]](e[t])}),t(n(o),r)})),r?r.join(c.lineDelimiter):this}},n.prototype.forEach=function(t){return this[this.mode](t)},n}();return y.parse=function(t,e){return new y(t,e).parse()},y.encode=function(t,e){return new y(t,e).encode()},y.forEach=function(t,e,n){return 2==arguments.length&&(n=e),new y(t,e).forEach(n)},y});
;(function () {
    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function() { return method.apply(context, arguments); };
        }


        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function(type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function(type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                        if (!event.propagationStopped) {
                            callback(event);
                        }
                    }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function(event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
    * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
    *
    * @type boolean
    */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function(target) {
        switch (target.nodeName.toLowerCase()) {

        // Don't send a synthetic click to disabled inputs (issue #62)
        case 'button':
        case 'select':
        case 'textarea':
            if (target.disabled) {
                return true;
            }

            break;
        case 'input':

            // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
            if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                return true;
            }

            break;
        case 'label':
        case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
        case 'video':
            return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function(target) {
        switch (target.nodeName.toLowerCase()) {
        case 'textarea':
            return true;
        case 'select':
            return !deviceIsAndroid;
        case 'input':
            switch (target.type) {
            case 'button':
            case 'checkbox':
            case 'file':
            case 'image':
            case 'radio':
            case 'submit':
                return false;
            }

            // No point in attempting to focus disabled inputs
            return !target.disabled && !target.readOnly;
        default:
            return (/\bneedsfocus\b/).test(target.className);
        }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function(targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function(targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function(targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function(targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function(event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function(event) {
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function(event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function(labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function(event) {
        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
        }

        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            if (!deviceIsIOS || targetTagName !== 'select') {
                this.targetElement = null;
                event.preventDefault();
            }

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function() {
        this.trackingClick = false;
        this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function(event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function(event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function() {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function(layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick
                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

            // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function(layer, options) {
        return new FastClick(layer, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return FastClick;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
}());

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
var COURSE_DATA = {};

var temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,备注,考试时间,选课限制条件\r\n\
MATH120001.01,高等数学A(上）,5.0,徐惠平,副教授,100,H3308,一 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 自然科学试验班\r\n\
15 技术科学试验班"\r\n\
MATH120001.01,高等数学A(上）,5.0,徐惠平,副教授,100,H3308,三 1-2 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 自然科学试验班\r\n\
15 技术科学试验班"\r\n\
MATH120001.01,高等数学A(上）,5.0,徐惠平,副教授,100,H3308,五 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 自然科学试验班\r\n\
15 技术科学试验班"\r\n\
MATH120001.02,高等数学A(上）,5.0,程晋,教授,120,H4201,一 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
MATH120001.02,高等数学A(上）,5.0,程晋,教授,120,H4201,三 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
MATH120001.02,高等数学A(上）,5.0,程晋,教授,120,H4201,五 1-2 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
MATH120003.01,高等数学B(上）,5.0,黄云敏,副教授,90,HGX308,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 旅游管理\r\n\
15 新闻传播学类\r\n\
15 历史学类\r\n\
15 经济学院"\r\n\
MATH120003.01,高等数学B(上）,5.0,黄云敏,副教授,90,HGX308,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 旅游管理\r\n\
15 新闻传播学类\r\n\
15 历史学类\r\n\
15 经济学院"\r\n\
MATH120003.01,高等数学B(上）,5.0,黄云敏,副教授,90,HGX308,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 旅游管理\r\n\
15 新闻传播学类\r\n\
15 历史学类\r\n\
15 经济学院"\r\n\
MATH120003.02,高等数学B(上）,5.0,王巨平,副教授,90,HGX407,一 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 历史学类\r\n\
15 经济学院\r\n\
15 公共事业管理\r\n\
15 旅游管理\r\n\
15 新闻传播学类"\r\n\
MATH120003.02,高等数学B(上）,5.0,王巨平,副教授,90,HGX407,三 1-2 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 历史学类\r\n\
15 经济学院\r\n\
15 公共事业管理\r\n\
15 旅游管理\r\n\
15 新闻传播学类"\r\n\
MATH120003.02,高等数学B(上）,5.0,王巨平,副教授,90,HGX407,五 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 历史学类\r\n\
15 经济学院\r\n\
15 公共事业管理\r\n\
15 旅游管理\r\n\
15 新闻传播学类"\r\n\
MATH120003.03,高等数学B(上）,5.0,张仑,副研究员,90,H4303,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 新闻传播学类\r\n\
15 经济学院\r\n\
15 历史学类\r\n\
15 旅游管理"\r\n\
MATH120003.03,高等数学B(上）,5.0,张仑,副研究员,90,H4303,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 新闻传播学类\r\n\
15 经济学院\r\n\
15 历史学类\r\n\
15 旅游管理"\r\n\
MATH120003.03,高等数学B(上）,5.0,张仑,副研究员,90,H4303,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 新闻传播学类\r\n\
15 经济学院\r\n\
15 历史学类\r\n\
15 旅游管理"\r\n\
MATH120003.04,高等数学B(上）,5.0,石磊,副教授,90,H3306,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 经济学院\r\n\
15 新闻传播学类\r\n\
15 公共事业管理\r\n\
15 自然科学试验班\r\n\
15 历史学类\r\n\
15 旅游管理"\r\n\
MATH120003.04,高等数学B(上）,5.0,石磊,副教授,90,H3306,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 经济学院\r\n\
15 新闻传播学类\r\n\
15 公共事业管理\r\n\
15 自然科学试验班\r\n\
15 历史学类\r\n\
15 旅游管理"\r\n\
MATH120003.04,高等数学B(上）,5.0,石磊,副教授,90,H3306,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 经济学院\r\n\
15 新闻传播学类\r\n\
15 公共事业管理\r\n\
15 自然科学试验班\r\n\
15 历史学类\r\n\
15 旅游管理"\r\n\
MATH120003.05,高等数学B(上）,5.0,黄云敏,副教授,70,HGX309,一 11-12 ,15级不得选修,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH120003.05,高等数学B(上）,5.0,黄云敏,副教授,70,HGX309,三 11-12 ,15级不得选修,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH120003.05,高等数学B(上）,5.0,黄云敏,副教授,70,HGX309,五 11-12 ,15级不得选修,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH120005.01,高等数学C(上）,4.0,杭国明,高级讲师,110,H4204,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 药学\r\n\
MATH120005.01,高等数学C(上）,4.0,杭国明,高级讲师,110,H4204,四 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 药学\r\n\
MATH120005.02,高等数学C(上）,4.0,肖晓,高级讲师,110,H4101,一 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 基础医学\r\n\
15 临床医学(五年制)\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 预防医学(武警班)\r\n\
15 留学生\r\n\
15 法医学\r\n\
15 预防医学"\r\n\
MATH120005.02,高等数学C(上）,4.0,肖晓,高级讲师,110,H4101,四 6-8 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 基础医学\r\n\
15 临床医学(五年制)\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 预防医学(武警班)\r\n\
15 留学生\r\n\
15 法医学\r\n\
15 预防医学"\r\n\
MATH120005.03,高等数学C(上）,4.0,刘进,讲师,100,H4405,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 预防医学\r\n\
15 基础医学\r\n\
15 留学生\r\n\
15 法医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 预防医学(武警班)\r\n\
15 临床医学(五年制)"\r\n\
MATH120005.03,高等数学C(上）,4.0,刘进,讲师,100,H4405,四 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 预防医学\r\n\
15 基础医学\r\n\
15 留学生\r\n\
15 法医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 预防医学(武警班)\r\n\
15 临床医学(五年制)"\r\n\
MATH120005.04,高等数学C(上）,4.0,曲鹏,青年副研究员,100,H4403,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 临床医学(五年制)\r\n\
15 法医学\r\n\
15 留学生\r\n\
15 基础医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 预防医学\r\n\
15 预防医学(武警班)"\r\n\
MATH120005.04,高等数学C(上）,4.0,曲鹏,青年副研究员,100,H4403,四 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 临床医学(五年制)\r\n\
15 法医学\r\n\
15 留学生\r\n\
15 基础医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 预防医学\r\n\
15 预防医学(武警班)"\r\n\
MATH120005.05,高等数学C(上）,4.0,朱慧敏,高级讲师,100,H3206,一 3-5 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 八年制临床医学(二军大)\r\n\
15 临床医学(八年制)"\r\n\
MATH120005.05,高等数学C(上）,4.0,朱慧敏,高级讲师,100,H3206,四 8-9 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 八年制临床医学(二军大)\r\n\
15 临床医学(八年制)"\r\n\
MATH120005.06,高等数学C(上）,4.0,王剑波,讲师,100,H3108,一 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 八年制临床医学(二军大)\r\n\
15 临床医学(八年制)"\r\n\
MATH120005.06,高等数学C(上）,4.0,王剑波,讲师,100,H3108,四 8-9 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 八年制临床医学(二军大)\r\n\
15 临床医学(八年制)"\r\n\
MATH120005.07,高等数学C(上）,4.0,王剑波,讲师,60,H3305,一 11-13 ,15级不得选修,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH120007.01,高等数学D,4.0,许虹,副教授,80,HGX409,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 新闻学(武警班)\r\n\
15 社会科学试验班"\r\n\
MATH120007.01,高等数学D,4.0,许虹,副教授,80,HGX409,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 新闻学(武警班)\r\n\
15 社会科学试验班"\r\n\
MATH120007.02,高等数学D,4.0,许虹,副教授,80,HGX409,二 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 社会科学试验班\r\n\
15 新闻传播学类\r\n\
15 新闻学(武警班)"\r\n\
MATH120007.02,高等数学D,4.0,许虹,副教授,80,HGX409,四 11-13 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 社会科学试验班\r\n\
15 新闻传播学类\r\n\
15 新闻学(武警班)"\r\n\
MATH120007.03,高等数学D,4.0,谷晓明,讲师,150,H3309,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 社会科学试验班\r\n\
15 新闻学(武警班)\r\n\
15 新闻传播学类"\r\n\
MATH120007.03,高等数学D,4.0,谷晓明,讲师,150,H3309,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 社会科学试验班\r\n\
15 新闻学(武警班)\r\n\
15 新闻传播学类"\r\n\
MATH120007.04,高等数学D,4.0,朱慧敏,高级讲师,80,H3206,二 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 艺术教育中心\r\n\
15 护理学院"\r\n\
MATH120007.04,高等数学D,4.0,朱慧敏,高级讲师,80,H3206,四 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 艺术教育中心\r\n\
15 护理学院"\r\n\
MATH120010.01,解析几何,3.0,傅吉祥,教授,100,HGX307,二 1-2 ,"周四34节双周习题课\r\n\
习题课教师：周武斌博士后","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120010.01,解析几何,3.0,傅吉祥,教授,100,HGX307,四 3-4 ,周四34节双周习题课,习题课教师：周武斌博士后,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120010.02,解析几何,3.0,杨翎,副教授,100,HGX407,二 1-2 ,周四34节双周习题课,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120010.02,解析几何,3.0,杨翎,副教授,100,HGX407,四 3-4 ,周四34节双周习题课,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.01,高等代数Ⅰ,5.0,朱胜林,教授,40,HGX307,一 6-7 ,"上海市精品课程\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.01,高等代数Ⅰ,5.0,朱胜林,教授,40,HGX307,二 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.01,高等代数Ⅰ,5.0,朱胜林,教授,40,HGX307,五 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.02,高等代数Ⅰ,5.0,朱胜林,教授,40,HGX307,一 8-9 ,"上海市精品课程\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.02,高等代数Ⅰ,5.0,朱胜林,教授,40,HGX307,二 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.02,高等代数Ⅰ,5.0,朱胜林,教授,40,HGX307,五 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.03,高等代数Ⅰ,5.0,谢启鸿,教授,40,HGX507,一 6-7 ,"上海市精品课程\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.03,高等代数Ⅰ,5.0,谢启鸿,教授,40,HGX507,二 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.03,高等代数Ⅰ,5.0,谢启鸿,教授,40,HGX507,五 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.04,高等代数Ⅰ,5.0,谢启鸿,教授,40,HGX507,一 8-9 ,"上海市精品课程\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.04,高等代数Ⅰ,5.0,谢启鸿,教授,40,HGX507,二 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120011.04,高等代数Ⅰ,5.0,谢启鸿,教授,40,HGX507,五 3-4 ,"上海市精品课程,\r\n\
第一周周一习题课不上","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.01,数学分析AI,5.0,陈纪修,教授,40,HGX104,一 3-4 ,"国家精品课程\r\n\
国家教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.01,数学分析AI,5.0,陈纪修,教授,40,HGX104,三 3-4 ,"国家精品课程,\r\n\
国家教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.01,数学分析AI,5.0,陈纪修,教授,40,HGX104,四 6-7 ,"国家精品课程,\r\n\
国家教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.02,数学分析AI,5.0,陈纪修,教授,40,HGX104,一 3-4 ,"国家精品课程\r\n\
国家教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.02,数学分析AI,5.0,陈纪修,教授,40,HGX104,三 3-4 ,"国家精品课程\r\n\
国家教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.02,数学分析AI,5.0,陈纪修,教授,40,HGX104,四 8-9 ,"国家精品课程\r\n\
国家教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.03,数学分析AI,5.0,严金海,副教授,80,HGX307,一 1-2 ,国家精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.03,数学分析AI,5.0,严金海,副教授,40,HGX307,三 3-4 ,国家精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.03,数学分析AI,5.0,严金海,副教授,40,HGX307,四 6-7 ,国家精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 数学类\r\n\
MATH120014.04,数学分析AI,5.0,楼红卫,教授,80,HGX408,一 3-4 ,国家精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","15 数学类\r\n\
15 经济学院"\r\n\
MATH120014.04,数学分析AI,5.0,楼红卫,教授,80,HGX408,四 1-2 ,国家精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","15 数学类\r\n\
15 经济学院"\r\n\
MATH120014.04,数学分析AI,5.0,楼红卫,教授,80,HGX408,五 8-9 ,国家精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","15 数学类\r\n\
15 经济学院"\r\n\
MATH120016.08,数学分析BI,5.0,王利彬,副教授,60,HGX205,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 技术科学试验班\r\n\
15 经济学类"\r\n\
MATH120016.08,数学分析BI,5.0,王利彬,副教授,60,HGX205,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 技术科学试验班\r\n\
15 经济学类"\r\n\
MATH120016.08,数学分析BI,5.0,王利彬,副教授,60,HGX205,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 技术科学试验班\r\n\
15 经济学类"\r\n\
MATH120016.09,数学分析BI,5.0,谢纳庆,副教授,60,HGX404,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 经济学类\r\n\
15 技术科学试验班"\r\n\
MATH120016.09,数学分析BI,5.0,谢纳庆,副教授,60,HGX404,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 经济学类\r\n\
15 技术科学试验班"\r\n\
MATH120016.09,数学分析BI,5.0,谢纳庆,副教授,60,HGX404,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 经济学类\r\n\
15 技术科学试验班"\r\n\
MATH120021.01,高等数学A(上）,5.0,金路,教授,100,H3109,一 3-4 ,"上海市精品课程\r\n\
上海市教学名师","考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 技术科学试验班\r\n\
15 工商管理类\r\n\
15 核科学与技术系\r\n\
15 经济学类\r\n\
15 新闻传播学类\r\n\
15 自然科学试验班"\r\n\
MATH120021.01,高等数学A(上）,5.0,金路,教授,100,H3109,三 1-2 ,"上海市精品课程\r\n\
上海市教学名师","考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH120021.01,高等数学A(上）,5.0,金路,教授,100,H3109,五 3-4 ,"上海市精品课程\r\n\
上海市教学名师","考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH120021.02,高等数学A(上）,5.0,吴汉忠,副教授,100,H4106,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 新闻传播学类\r\n\
15 经济学类\r\n\
15 自然科学试验班\r\n\
15 技术科学试验班"\r\n\
MATH120021.02,高等数学A(上）,5.0,吴汉忠,副教授,100,H4106,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 新闻传播学类\r\n\
15 经济学类\r\n\
15 自然科学试验班\r\n\
15 技术科学试验班"\r\n\
MATH120021.02,高等数学A(上）,5.0,吴汉忠,副教授,100,H4106,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 新闻传播学类\r\n\
15 经济学类\r\n\
15 自然科学试验班\r\n\
15 技术科学试验班"\r\n\
MATH120021.03,高等数学A(上）,5.0,范恩贵,教授,100,H3209,一 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 自然科学试验班\r\n\
15 经济学类"\r\n\
MATH120021.03,高等数学A(上）,5.0,范恩贵,教授,100,H3209,三 1-2 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 自然科学试验班\r\n\
15 经济学类"\r\n\
MATH120021.03,高等数学A(上）,5.0,范恩贵,教授,100,H3209,五 3-4 ,上海市精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 自然科学试验班\r\n\
15 经济学类"\r\n\
MATH120021.04,高等数学A(上）,5.0,刘旭胜,讲师,100,H3101,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 自然科学试验班\r\n\
15 经济学类\r\n\
15 技术科学试验班\r\n\
15 新闻传播学类"\r\n\
MATH120021.04,高等数学A(上）,5.0,刘旭胜,讲师,100,H3101,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 自然科学试验班\r\n\
15 经济学类\r\n\
15 技术科学试验班\r\n\
15 新闻传播学类"\r\n\
MATH120021.04,高等数学A(上）,5.0,刘旭胜,讲师,100,H3101,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 工商管理类\r\n\
15 自然科学试验班\r\n\
15 经济学类\r\n\
15 技术科学试验班\r\n\
15 新闻传播学类"\r\n\
MATH120021.05,高等数学A(上）,5.0,周子翔,教授,100,H3208,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 经济学类\r\n\
15 工商管理类\r\n\
15 自然科学试验班"\r\n\
MATH120021.05,高等数学A(上）,5.0,周子翔,教授,100,H3208,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 经济学类\r\n\
15 工商管理类\r\n\
15 自然科学试验班"\r\n\
MATH120021.05,高等数学A(上）,5.0,周子翔,教授,100,H3208,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 经济学类\r\n\
15 工商管理类\r\n\
15 自然科学试验班"\r\n\
MATH120021.06,高等数学A(上）,5.0,陆帅,副研究员,100,H4404,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 经济学类\r\n\
15 自然科学试验班\r\n\
15 技术科学试验班\r\n\
15 工商管理类"\r\n\
MATH120021.06,高等数学A(上）,5.0,陆帅,副研究员,100,H4404,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 经济学类\r\n\
15 自然科学试验班\r\n\
15 技术科学试验班\r\n\
15 工商管理类"\r\n\
MATH120021.06,高等数学A(上）,5.0,陆帅,副研究员,100,H4404,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 经济学类\r\n\
15 自然科学试验班\r\n\
15 技术科学试验班\r\n\
15 工商管理类"\r\n\
MATH120044.05,线性代数,3.0,杭国明,高级讲师,60,H6407,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 旅游管理\r\n\
MATH120044.05,线性代数,3.0,杭国明,高级讲师,60,H6407,四 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 旅游管理\r\n\
MATH130001.01,数学分析III,5.0,李洪全,教授,50,HGX407,一 6-7 ,国家精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.01,数学分析III,5.0,李洪全,教授,50,HGX407,三 11-12 ,国家精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.01,数学分析III,5.0,李洪全,教授,50,HGX407,五 6-7 ,国家精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.02,数学分析III,5.0,李洪全,教授,50,HGX407,一 6-7 ,国家精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.02,数学分析III,5.0,李洪全,教授,50,HGX407,三 11-12 ,国家精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.02,数学分析III,5.0,李洪全,教授,50,HGX407,五 8-9 ,国家精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.03,数学分析III,5.0,肖体俊,教授,50,HGX308,一 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.03,数学分析III,5.0,肖体俊,教授,50,HGX308,三 8-9 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.03,数学分析III,5.0,肖体俊,教授,50,HGX308,五 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.04,数学分析III,5.0,肖体俊,教授,50,HGX308,一 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.04,数学分析III,5.0,肖体俊,教授,50,HGX308,三 8-9 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130001.04,数学分析III,5.0,肖体俊,教授,50,HGX308,五 8-9 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 数学类\r\n\
MATH130004.01,常微分方程,3.0,林伟,教授,100,H3406,二 1-2 ,周五34节双周习题课,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130004.01,常微分方程,3.0,林伟,教授,100,H3406,五 3-4 ,周五34节双周习题课,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130004.02,常微分方程,3.0,张国华,教授,100,HGX408,三 3-4 ,周五34节双周习题课,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130004.02,常微分方程,3.0,张国华,教授,100,HGX408,五 3-4 ,周五34节双周习题课,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130005.01,抽象代数,3.0,陈猛,教授,100,HGX308,二 3-4 ,周四89节双周习题课,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130005.01,抽象代数,3.0,陈猛,教授,100,HGX308,四 8-9 ,周三89节双周习题课,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130005.02,抽象代数,3.0,王庆雪,副教授,100,HGX407,二 3-4 ,周四67节双周习题课,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130005.02,抽象代数,3.0,王庆雪,副教授,100,HGX407,四 6-7 ,周四67节双周习题课,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 数学类\r\n\
MATH130006.01,复变函数,3.0,邱维元,教授,50,HGX405,二 3-4 ,周五12节双周习题课,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
MATH130006.01,复变函数,3.0,邱维元,教授,50,HGX405,五 1-2 ,周五12节双周习题课,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
MATH130007.01,实变函数,3.0,陈伯勇,教授,50,H3409,一 3-4 ,周四34节双周习题课,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH130007.01,实变函数,3.0,陈伯勇,教授,50,H3409,四 3-4 ,周四34节双周习题课,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MATH130009.01,概率论,3.0,张奇,副教授,100,H3109,五 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 数学科学学院\r\n\
MATH130009.02,概率论,3.0,谢践生,副教授,100,H3206,五 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 数学科学学院\r\n\
MATH130011.01,泛函分析,3.0,黄昭波,副教授,100,HGX508,二 3-4 ,习题课安排在14-16周上,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",13 数学科学学院\r\n\
MATH130011.01,泛函分析,3.0,黄昭波,副教授,100,HGX508,五 3-4 ,习题课安排在14-16周上,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",13 数学科学学院\r\n\
MATH130011.02,泛函分析,3.0,徐胜芝,副教授,100,H4101,二 1-2 ,每周四第1节习题课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",13 数学科学学院\r\n\
MATH130011.02,泛函分析,3.0,徐胜芝,副教授,100,H4101,四 1-2 ,每周四第1节习题课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",13 数学科学学院\r\n\
MATH130012.01,数理方程,3.0,雷震,教授,50,H2101,三 3-4 ,周五34节双周习题课,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
MATH130012.01,数理方程,3.0,雷震,教授,50,H2101,五 3-4 ,周五34节双周习题课,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
MATH130013.01,微分几何,3.0,王志张,副研究员,160,H3308,一 6-8 ,周二89节双周习题课,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 数学与应用数学\r\n\
MATH130013.01,微分几何,3.0,王志张,副研究员,160,H3308,二 8-9(双周),周二89节双周习题课,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 数学与应用数学\r\n\
MATH130014.01,生产实习,1.0,应坚刚,教授,10,H院系自主,六 1-1 ,选修,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130015.01,毕业论文(含专题讨论),6.0,曹沅,正高级讲师,5,H4301,三 1-3 ,复旦教学名师,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130015.02,毕业论文(含专题讨论),6.0,吴宗敏,教授,5,HGX509,四 3-5 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130015.03,毕业论文(含专题讨论),6.0,林伟,教授,5,H2210,四 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130015.04,毕业论文(含专题讨论),6.0,赵冬华,副教授,5,H2209,四 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130015.05,毕业论文(含专题讨论),6.0,王_,副教授,5,H2112B,一 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130015.06,毕业论文(含专题讨论),6.0,田学廷,副教授,5,HGX405,五 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130015.07,毕业论文(含专题讨论),6.0,应志良,教授,5,H4405,三 6-8 ,统计方向,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 数学科学学院\r\n\
MATH130017.01,微分流形,3.0,丁青,教授,20,H2113A,一 6-8(2-16周),从第二周开始上课,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130018.01,小波分析,3.0,张德志,讲师,20,H4205,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130021.01,计算几何,3.0,刘进,讲师,20,H4203,一 6-8 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130027.01,数学金融学,3.0,"汤善健\r\n\
张静","教授\r\n\
讲师",30,H2112A,四 3-5 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-12:30","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130030.01,专题讨论,2.0,赵冬华,副教授,20,HGX306,五 6-8 ,大维统计分析,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130032.01,动力系统,3.0,严军,教授,20,H2106B,一 6-8 ,要求选修学生有一定的理论力学基础，对Lagrange力学和Hamilton力学有初步的了解，修过实分析，泛函分析，拓扑学的本科课程,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130036.01,计算方法,3.0,高卫国,教授,40,H4101,三 1-3 ,"计算与信息方向\r\n\
运筹与控制方向","考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",13 信息与计算科学\r\n\
MATH130047.01,数理方程续论,3.0,王志强,副教授,20,HGX202,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130055.01,非寿险精算数学,3.0,李荣敏,副教授,50,HGX503,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130056.01,复分析,3.0,王_,副教授,20,H4106,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130057.01,控制理论基础,3.0,许亚善,副教授,30,H4403,三 6-8 ,运筹与控制方向,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",13 信息与计算科学\r\n\
MATH130059.01,数据结构,3.0,朱松,副教授,20,H2105B,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130062.01,线性规划,3.0,杨卫红,教授,40,H2113A,四 6-8 ,运筹与控制方向,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 信息与计算科学\r\n\
MATH130063.01,信息论基础,3.0,张德志,讲师,30,H2106A,四 6-8 ,计算与信息方向,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-16:10",13 信息与计算科学\r\n\
MATH130067.01,时间序列分析,3.0,"冯建峰\r\n\
杨伟","教授\r\n\
青年副研究员",20,HGX402,二 6-8 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130068.01,抽象代数续论,3.0,吴泉水,教授,20,HGX403,"一 1-2\r\n\
(1-12周)",与研究生合上,"考试日期：2015-11-25\r\n\
\r\n\
考试时间：08:00-10:00","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130068.01,抽象代数续论,3.0,吴泉水,教授,20,HGX403,"三 1-2\r\n\
(1-12周)",与研究生合上,"考试日期：2015-11-25\r\n\
\r\n\
考试时间：08:00-10:00","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130070.01,测度论,3.0,吴波,副研究员,20,HGX401,二 6-8 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130072.01,数值逼近,3.0,苏仰锋,教授,30,,"二 6-7\r\n\
(2-16周双周)","计算与信息方向\r\n\
周二下午在光华楼东主楼17楼机房上课\r\n\
第一周上机课不上","考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",13 信息与计算科学\r\n\
MATH130072.01,数值逼近,3.0,苏仰锋,教授,30,HGX410,四 3-4 ,"计算与信息方向\r\n\
周二下午在光华楼东主楼17楼机房上课\r\n\
第一周上机课不上","考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",13 信息与计算科学\r\n\
MATH130073.01,数值代数,3.0,薛军工,教授,30,H2112B,四 6-8 ,计算与信息方向,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 信息与计算科学\r\n\
MATH130074.01,积分方程数值解法,3.0,张云新,教授,20,H4203,三 6-8 ,计算方向,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",12 信息与计算科学\r\n\
MATH130078.01,数学建模与实验(下),3.0,曹沅,正高级讲师,35,HGX310,三 6-9 ,"上海市精品课\r\n\
复旦大学教学名师","考试日期：其他\r\n\
\r\n\
考试时间：-",13 数学科学学院\r\n\
MATH130078.02,数学建模与实验(下),3.0,蔡志杰,教授,35,HGX310,三 6-9 ,"上海市精品课\r\n\
复旦大学教学名师","考试日期：其他\r\n\
\r\n\
考试时间：-",13 数学科学学院\r\n\
MATH130080.01,科学计算,3.0,魏益民,教授,20,HGX207,五 3-5 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-12:30","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130083.01,应用数学,2.0,蔡志杰,教授,60,HGX201,四 6-7 ,复旦教学名师,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:00-15:00",14 化学\r\n\
MATH130091.01,数学分析原理,5.0,梁振国,副教授,50,H6508,一 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","14 数学类\r\n\
15 数学类"\r\n\
MATH130091.01,数学分析原理,5.0,梁振国,副教授,50,HGX503,三 8-9 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","14 数学类\r\n\
15 数学类"\r\n\
MATH130091.01,数学分析原理,5.0,梁振国,副教授,50,HGX503,五 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","14 数学类\r\n\
15 数学类"\r\n\
MATH130102.01,对策论,3.0,许亚善,副教授,60,H4205,一 1-3 ,运筹与控制方向,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：08:00-10:40",13 信息与计算科学\r\n\
MATH130103.01,统计方法选讲,3.0,张淑芹,副教授,30,H2209,二 3-5 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-12:30","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130105.01,有限元方法,3.0,吴新明,讲师,20,HGX302,二 6-8 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130111.01,流形的拓扑学,3.0,吕志,教授,20,HGX309,五 6-8 ,与研究生合上,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130112.01,拓扑学Ⅱ,3.0,马继明,副教授,20,H2216,一 11-13 ,与研究生合上,"考试日期：2015-12-21\r\n\
考试时间：18:30-21:05","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130113.01,几何拓扑选讲,3.0,马继明,副教授,20,H2106B,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130114.01,泛函分析续论,3.0,郭坤宇,教授,20,H4105,三 6-8 ,与研究生合上,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130115.01,现代概率论基础,3.0,谢践生,副教授,20,H2218,三 11-13 ,与研究生合上,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：18:30-21:05","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130118.01,Sobolev空间,3.0,陈文斌,教授,20,H3309,一 3-5 ,与研究生合上,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-12:30","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130121.01,现代偏微分方程,3.0,周忆,教授,20,H2214,三 3-5 ,与研究生合上,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-12:30","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130122.01,复流形,3.0,傅吉祥,教授,20,H3108,三 1-3 ,与研究生合上,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:00-10:40","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130125.01,椭圆曲线入门,3.0,王庆雪,副教授,20,H4404,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130127.01,变分法与偏微分方程,3.0,刘宪高,教授,20,H2207,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130130.01,代数几何初步,3.0,张毅,教授,20,H2208,四 8-10 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:25-18:00","12 数学科学学院\r\n\
13 数学科学学院"\r\n\
MATH130131.01,代数数论初步,3.0,王巨平,副教授,20,H4104,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
MATH130132.01,拓扑群,3.0,周国晖,青年副研究员,20,H4204,一 6-8 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-16:10","13 数学科学学院\r\n\
12 数学科学学院"\r\n\
PHYS120003.01,普通物理B,3.0,冀敏,副教授,40,H2218,二 1-2 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 留学生 临床医学院\r\n\
15 留学生 基础医学院"\r\n\
PHYS120003.01,普通物理B,3.0,冀敏,副教授,40,H2218,四 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 留学生 临床医学院\r\n\
15 留学生 基础医学院"\r\n\
PHYS120003.02,普通物理B,3.0,冀敏,副教授,50,JB102,四 8-10 ,校级精品课程团队,"考试日期：\r\n\
2015-12-24\r\n\
考试时间：15:25--18:00\r\n\
",\r\n\
PHYS120003.03,普通物理B,3.0,杜四德,副教授,120,H2201,一 1-2 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 八年制临床医学（二军大）\r\n\
15 预防医学(武警班)\r\n\
15 预防医学"\r\n\
PHYS120003.03,普通物理B,3.0,杜四德,副教授,120,H2201,三 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 八年制临床医学（二军大）\r\n\
15 预防医学(武警班)\r\n\
15 预防医学"\r\n\
PHYS120003.04,普通物理B,3.0,杜四德,副教授,120,H2115,二 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 基础医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 临床医学(五年制)\r\n\
15 临床医学(八年制)\r\n\
15 药学\r\n\
15 法医学"\r\n\
PHYS120003.04,普通物理B,3.0,杜四德,副教授,120,H3308,四 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 基础医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 临床医学(五年制)\r\n\
15 临床医学(八年制)\r\n\
15 药学\r\n\
15 法医学"\r\n\
PHYS120003.05,普通物理B,3.0,符维娟,讲师,120,H2220,二 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 药学\r\n\
15 临床医学(五年制)\r\n\
15 法医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 基础医学\r\n\
15 临床医学(八年制)"\r\n\
PHYS120003.05,普通物理B,3.0,符维娟,讲师,120,H3209,四 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 药学\r\n\
15 临床医学(五年制)\r\n\
15 法医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 基础医学\r\n\
15 临床医学(八年制)"\r\n\
PHYS120003.06,普通物理B,3.0,吕景林,副教授,120,H2214,二 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 基础医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 药学\r\n\
15 法医学\r\n\
15 临床医学(五年制)\r\n\
15 临床医学(八年制)"\r\n\
PHYS120003.06,普通物理B,3.0,吕景林,副教授,120,H3208,四 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 基础医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 药学\r\n\
15 法医学\r\n\
15 临床医学(五年制)\r\n\
15 临床医学(八年制)"\r\n\
PHYS120003.07,普通物理B,3.0,修发贤,研究员,120,H2101,二 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 临床医学(八年制)\r\n\
15 临床医学(五年制)\r\n\
15 药学\r\n\
15 法医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 基础医学"\r\n\
PHYS120003.07,普通物理B,3.0,修发贤,研究员,120,H2101,四 3-4 ,校级精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 临床医学(八年制)\r\n\
15 临床医学(五年制)\r\n\
15 药学\r\n\
15 法医学\r\n\
15 临床医学(五年制)(武警班)\r\n\
15 基础医学"\r\n\
PHYS120003.08,普通物理B,3.0,刘_韬,研究员,30,HGD405,三 1-2 ,"全英语教学\r\n\
校级精品课程团队","考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 临床医学(六年制)\r\n\
PHYS120003.08,普通物理B,3.0,刘_韬,研究员,30,HGD405,五 3-4 ,"全英语教学\r\n\
校级精品课程团队","考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 临床医学(六年制)\r\n\
PHYS120013.01,大学物理B(上),4.0,石磊,青年研究员,60,H3109,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.01,大学物理B(上),4.0,石磊,青年研究员,60,H3106,"三 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.01,大学物理B(上),4.0,石磊,青年研究员,60,H3109,三 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.01,大学物理B(上),4.0,石磊,青年研究员,60,H3109,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.02,大学物理B(上),4.0,张远波,教授,60,H4204,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 自然科学试验班\r\n\
15 核工程与核技术"\r\n\
PHYS120013.02,大学物理B(上),4.0,张远波,教授,60,H4201,"三 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 自然科学试验班\r\n\
15 核工程与核技术"\r\n\
PHYS120013.02,大学物理B(上),4.0,张远波,教授,60,H4204,三 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 自然科学试验班\r\n\
15 核工程与核技术"\r\n\
PHYS120013.02,大学物理B(上),4.0,张远波,教授,60,H4204,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 自然科学试验班\r\n\
15 核工程与核技术"\r\n\
PHYS120013.03,大学物理B(上),4.0,向红军,教授,60,H3306,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.03,大学物理B(上),4.0,向红军,教授,60,H3206,"三 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.03,大学物理B(上),4.0,向红军,教授,60,H3306,三 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.03,大学物理B(上),4.0,向红军,教授,60,H3306,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.04,大学物理B(上),4.0,张童,副研究员,60,HGX103,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.04,大学物理B(上),4.0,张童,副研究员,60,HGX103,"三 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.04,大学物理B(上),4.0,张童,副研究员,60,HGX507,三 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.04,大学物理B(上),4.0,张童,副研究员,60,HGX103,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.05,大学物理B(上),4.0,谭鹏,青年研究员,60,HGX104,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.05,大学物理B(上),4.0,谭鹏,青年研究员,60,HGX104,"三 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.05,大学物理B(上),4.0,谭鹏,青年研究员,60,HGX408,三 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.05,大学物理B(上),4.0,谭鹏,青年研究员,60,HGX104,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120013.06,大学物理B(上),4.0,陆明,教授,60,H4103,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.06,大学物理B(上),4.0,陆明,教授,60,H4201,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.06,大学物理B(上),4.0,陆明,教授,60,H4103,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.06,大学物理B(上),4.0,陆明,教授,60,H4103,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.07,大学物理B(上),4.0,庄军,教授,60,H4205,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.07,大学物理B(上),4.0,庄军,教授,60,H4206,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.07,大学物理B(上),4.0,庄军,教授,60,H4206,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.07,大学物理B(上),4.0,庄军,教授,60,H4206,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.08,大学物理B(上),4.0,王松有,教授,60,H4105,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 技术科学试验班\r\n\
15 新闻传播学类"\r\n\
PHYS120013.08,大学物理B(上),4.0,王松有,教授,60,H4106,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 技术科学试验班\r\n\
15 新闻传播学类"\r\n\
PHYS120013.08,大学物理B(上),4.0,王松有,教授,60,H4106,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 技术科学试验班\r\n\
15 新闻传播学类"\r\n\
PHYS120013.08,大学物理B(上),4.0,王松有,教授,60,H4106,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 技术科学试验班\r\n\
15 新闻传播学类"\r\n\
PHYS120013.09,大学物理B(上),4.0,倪刚,副教授,60,H4101,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.09,大学物理B(上),4.0,倪刚,副教授,60,H4104,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.09,大学物理B(上),4.0,倪刚,副教授,60,H4104,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.09,大学物理B(上),4.0,倪刚,副教授,60,H4104,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.10,大学物理B(上),4.0,张浩,副教授,60,H4404,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.10,大学物理B(上),4.0,张浩,副教授,60,H4405,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.10,大学物理B(上),4.0,张浩,副教授,60,H4405,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.10,大学物理B(上),4.0,张浩,副教授,60,H4405,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 保密管理\r\n\
15 技术科学试验班"\r\n\
PHYS120013.11,大学物理B(上),4.0,詹义强,副研究员,60,H4303,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.11,大学物理B(上),4.0,詹义强,副研究员,60,H4306,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.11,大学物理B(上),4.0,詹义强,副研究员,60,H4303,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.11,大学物理B(上),4.0,詹义强,副研究员,60,H4303,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻传播学类\r\n\
15 技术科学试验班\r\n\
15 保密管理"\r\n\
PHYS120013.12,大学物理B(上),4.0,孙晓光,副教授,60,H4301,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.12,大学物理B(上),4.0,孙晓光,副教授,60,H4304,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.12,大学物理B(上),4.0,孙晓光,副教授,60,H4304,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.12,大学物理B(上),4.0,孙晓光,副教授,60,H4304,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.13,大学物理B(上),4.0,马世红,教授,60,H2201,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.13,大学物理B(上),4.0,马世红,教授,60,H2208,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.13,大学物理B(上),4.0,马世红,教授,60,H2201,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.13,大学物理B(上),4.0,马世红,教授,60,H2201,四 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 新闻传播学类\r\n\
15 技术科学试验班"\r\n\
PHYS120013.14,大学物理B(上),4.0,殷立峰,副研究员,100,H3108,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
PHYS120013.14,大学物理B(上),4.0,殷立峰,副研究员,100,H3201,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
PHYS120013.14,大学物理B(上),4.0,殷立峰,副研究员,100,H3201,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
PHYS120013.14,大学物理B(上),4.0,殷立峰,副研究员,100,H3201,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
PHYS120013.15,大学物理B(上),4.0,黄敏,助理研究员,60,H6504,二 1-2,上海市精品课程团队,,15 自然科学试验班\r\n\
,,,,,,H6504,三 8-9(双周),,,\r\n\
,大学物理B(上),4.0,黄敏,助理研究员,60,H6505,,,,15 自然科学试验班\r\n\
,大学物理B(上),4.0,黄敏,助理研究员,60,H6504,四 3-4,,,15 自然科学试验班\r\n\
PHYS120014.01,大学物理B(下),4.0,吴骅,研究员,90,H2214,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120014.01,大学物理B(下),4.0,吴骅,研究员,90,H2215,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120014.01,大学物理B(下),4.0,吴骅,研究员,90,H2214,一 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120014.01,大学物理B(下),4.0,吴骅,研究员,90,H2214,三 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120014.02,大学物理B(下),4.0,吴施伟,教授,90,H2218,"一 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120014.02,大学物理B(下),4.0,吴施伟,教授,90,H2220,一 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120014.02,大学物理B(下),4.0,吴施伟,教授,90,H2220,一 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120014.02,大学物理B(下),4.0,吴施伟,教授,90,H2220,三 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 数学科学学院\r\n\
PHYS120015.01,基础物理实验,2.0,,,96,H3209,"一 12:45-15:00\r\n\
(1-2周)","国家级精品课程团队 \r\n\
具体实验任课教师开学第一周见实验中心网页\r\n\
(http://phylab.fudan.edu.cn)或光华楼西辅楼8楼实验室橱窗","考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 临床医学(五年制)\r\n\
15 临床医学(五年制)(武警班)"\r\n\
PHYS120015.01,基础物理实验,2.0,,,96,"\r\n\
H光华西辅8楼","一 12:45-15:00\r\n\
(3-16周)","国家级精品课程团队 \r\n\
具体实验任课教师\r\n\
开学第一周见实验中心网页\r\n\
(http://phylab.fudan.edu.cn)\r\n\
或光华楼西辅楼8楼实验室橱窗","考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 临床医学(五年制)\r\n\
15 临床医学(五年制)(武警班)"\r\n\
PHYS120015.02,基础物理实验,2.0,,,86,H3209,"一 15:25-17:40\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 临床医学(五年制)\r\n\
15 临床医学(五年制)(武警班)"\r\n\
PHYS120015.02,基础物理实验,2.0,,,86,H光华西辅8楼,"一 15:25-17:40\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 临床医学(五年制)\r\n\
15 临床医学(五年制)(武警班)"\r\n\
PHYS120015.03,基础物理实验,2.0,,,90,H3209,"二  8:55-11:10\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 预防医学\r\n\
15 预防医学(武警班)"\r\n\
PHYS120015.03,基础物理实验,2.0,,,90,H光华西辅8楼,"二  8:55-11:10\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 预防医学\r\n\
15 预防医学(武警班)"\r\n\
PHYS120015.04,基础物理实验,2.0,,,96,H3209,"二 15:25-17:40\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",15 临床医学(八年制)\r\n\
PHYS120015.04,基础物理实验,2.0,,,96,H光华西辅8楼,"二 15:25-17:40\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",15 临床医学(八年制)\r\n\
PHYS120015.05,基础物理实验,2.0,,,96,H3209,"三 12:45-15:00\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",14 数学科学学院\r\n\
PHYS120015.05,基础物理实验,2.0,,,96,H光华西辅8楼,"三 12:45-15:00\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",14 数学科学学院\r\n\
PHYS120015.06,基础物理实验,2.0,,,90,H3209,"三 15:25-17:40\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",15 药学\r\n\
PHYS120015.06,基础物理实验,2.0,,,90,H光华西辅8楼,"三 15:25-17:40\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",15 药学\r\n\
PHYS120015.07,基础物理实验,2.0,,,54,H3209,"四 12:45-15:00\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",14 数学科学学院\r\n\
PHYS120015.07,基础物理实验,2.0,,,54,H光华西辅8楼,"四 12:45-15:00\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",14 数学科学学院\r\n\
PHYS120015.08,基础物理实验,2.0,,,96,H3209,"四 15:25-17:40\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",15 自然科学试验班\r\n\
PHYS120015.08,基础物理实验,2.0,,,96,H光华西辅8楼,"四 15:25-17:40\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00",15 自然科学试验班\r\n\
PHYS120015.09,基础物理实验,2.0,,,76,H3209,"五 12:45-15:00\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 八年制临床医学（二军大）\r\n\
15 临床医学(八年制)"\r\n\
PHYS120015.09,基础物理实验,2.0,,,76,H光华西辅8楼,"五 12:45-15:00\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 八年制临床医学（二军大）\r\n\
15 临床医学(八年制)"\r\n\
PHYS120015.10,基础物理实验,2.0,,,96,H3209,"五 15:25-17:40\r\n\
(1-2周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 法医学\r\n\
15 留学生\r\n\
15 核工程与核技术\r\n\
15 基础医学"\r\n\
PHYS120015.10,基础物理实验,2.0,,,96,H光华西辅8楼,"五 15:25-17:40\r\n\
(3-16周)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-14:00","15 法医学\r\n\
15 留学生\r\n\
15 核工程与核技术\r\n\
15 基础医学"\r\n\
PHYS120016.01,大学物理A：力学,4.0,蒋最敏,教授,80,H2201,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120016.01,大学物理A：力学,4.0,蒋最敏,教授,80,H2115,"三 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120016.01,大学物理A：力学,4.0,蒋最敏,教授,80,H2201,三 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120016.01,大学物理A：力学,4.0,蒋最敏,教授,80,H2201,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120016.02,大学物理A：力学,4.0,刘晓晗,教授,80,H2220,二 1-2 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120016.02,大学物理A：力学,4.0,刘晓晗,教授,80,H2214,"三 8-9\r\n\
(2-16周双周)",上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120016.02,大学物理A：力学,4.0,刘晓晗,教授,80,H2220,三 8-9(2-16周双周),上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS120016.02,大学物理A：力学,4.0,刘晓晗,教授,80,H2220,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
PHYS130002.01,线性代数与概率统计,3.0,朱胜林,教授,120,H4201,二 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 物理学系\r\n\
PHYS130002.01,线性代数与概率统计,3.0,朱胜林,教授,120,H4201,四 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 物理学系\r\n\
PHYS130003.01,经典力学,3.0,徐晓华,副教授,120,H3106,一 3-4 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 物理学系\r\n\
PHYS130003.01,经典力学,3.0,徐晓华,副教授,120,H3106,三 1-2 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 物理学系\r\n\
PHYS130004.01,物理实验(上),2.0,"岑剡\r\n\
白翠琴\r\n\
晏湖根\r\n\
陈元杰","工程师\r\n\
工程师\r\n\
研究员\r\n\
工程师",30,H物理楼3楼,四 6-8 ,"国家级精品课程团队\r\n\
要求修过《基础物理实验》\r\n\
第一周绪论课在物理楼221B","考试日期：其他\r\n\
\r\n\
考试时间：-",14 光信息科学与技术\r\n\
PHYS130004.02,物理实验(上),2.0,"岑剡\r\n\
白翠琴\r\n\
晏湖根\r\n\
陈元杰","工程师\r\n\
工程师\r\n\
研究员\r\n\
工程师",30,H物理3楼,四 6-8 ,"国家级精品课程团队\r\n\
要求修过《基础物理实验》\r\n\
第一周绪论课在物理楼221B","考试日期：其他\r\n\
\r\n\
考试时间：-",14 核工程与核技术\r\n\
PHYS130004.03,物理实验(上),2.0,"岑剡\r\n\
白翠琴\r\n\
周诗韵\r\n\
陈元杰","工程师\r\n\
工程师\r\n\
讲师\r\n\
工程师",60,H物理3楼,一 6-8 ,"国家级精品课程团队\r\n\
要求修过《基础物理实验》\r\n\
第一周绪论课在物理楼221B","考试日期：其他\r\n\
\r\n\
考试时间：-",14 物理学系\r\n\
PHYS130004.04,物理实验(上),2.0,"白翠琴\r\n\
周诗韵\r\n\
马世红\r\n\
陈元杰","工程师\r\n\
讲师\r\n\
教授\r\n\
工程师",60,H物理三楼,三 6-8 ,"国家级精品课程团队\r\n\
要求修过《基础物理实验》\r\n\
第一周绪论课在物理楼221B","考试日期：其他\r\n\
\r\n\
考试时间：-",14 物理学系\r\n\
PHYS130006.01,数学物理方法A,4.0,马永利,教授,26,HGX206,二 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 核工程与核技术\r\n\
PHYS130006.01,数学物理方法A,4.0,马永利,教授,26,HGX206,五 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 核工程与核技术\r\n\
PHYS130008.01,量子力学I,4.0,吴长勤,教授,150,H4101,二 3-5 ,国家级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 物理学系\r\n\
PHYS130008.01,量子力学I,4.0,吴长勤,教授,150,H4101,五 3-5 ,国家级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 物理学系\r\n\
PHYS130009.01,电动力学,3.0,周磊,教授,150,H2115,一 3-4 ,校级精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 物理学系\r\n\
PHYS130009.01,电动力学,3.0,周磊,教授,150,H2115,四 3-4 ,校级精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 物理学系\r\n\
PHYS130009.01,电动力学,3.0,周磊,教授,150,H3404,四 3-4(1-16周),校级精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 物理学系\r\n\
PHYS130017.01,半导体物理A,3.0,陆_,教授,8,H光华东主楼2902,五 6-8(2-16周双周),上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","13 物理学系\r\n\
12 物理学系"\r\n\
PHYS130019.01,表面物理,3.0,杨新菊,教授,30,H4105,三 3-5 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-12:30",12 物理学系\r\n\
PHYS130020.01,低温和超导物理,3.0,王熠华,,30,HGX309,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10",12 物理学系\r\n\
PHYS130031.01,C语言程序设计,2.0,左光宏,副教授,25,H3104,五 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 物理学系\r\n\
PHYS130035.01,热力学与统计物理II,3.0,黄旭光,青年研究员,60,HGX103,五 3-5 ,国家级精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",12 物理学系\r\n\
PHYS130036.01,量子力学II,3.0,肖江,教授,60,HGX103,一 6-8 ,国家级精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 物理学系\r\n\
PHYS130042.01,应用数学,3.0,徐建军,副教授,80,H4105,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-16:10",13 物理学系\r\n\
PHYS130055.01,近代物理A,4.0,徐晓华,副教授,80,H3306,二 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 材料物理\r\n\
14 电子科学与技术"\r\n\
PHYS130055.01,近代物理A,4.0,徐晓华,副教授,80,H3306,五 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 材料物理\r\n\
14 电子科学与技术"\r\n\
PHYS130056.01,近代物理实验A,3.0,"李世燕\r\n\
侯晓远\r\n\
殳蕾","教授\r\n\
教授\r\n\
副研究员",54,H物理楼3楼,三 3-9 ,"国家级精品课程团队\r\n\
第三阶段不开放选课限制\r\n\
不接受中期退课\r\n\
第一周绪论课在物理楼221B","考试日期：其他\r\n\
\r\n\
考试时间：-","13 光信息科学与技术\r\n\
13 材料物理"\r\n\
PHYS130056.03,近代物理实验A,3.0,"俞熹\r\n\
何琼\r\n\
姚红英","高级讲师\r\n\
讲师\r\n\
讲师",28,H物理楼3楼,四 3-9 ,"国家级精品课程团队\r\n\
第三阶段不开放选课限制\r\n\
不接受中期退课\r\n\
第一周绪论课在物理楼221B","考试日期：其他\r\n\
\r\n\
考试时间：-",13 电子科学与技术\r\n\
PHYS130058.01,近代物理实验I,4.0,"俞熹\r\n\
何琼\r\n\
姚红英","高级讲师\r\n\
讲师\r\n\
讲师",26,H物理三楼,四 3-9 ,"国家级精品课程团队\r\n\
第三阶段不开放选课限制\r\n\
不接受中期退课\r\n\
第一周绪论课在物理楼221B","考试日期：其他\r\n\
\r\n\
考试时间：-",13 核工程与核技术\r\n\
PHYS130061.01,近代物理实验II,3.0,乐永康,,20,H物理楼,四 3-8 ,国家级精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130062.01,科研实践,2.0,陶瑞宝,教授,50,H院系自主,六 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 物理学系\r\n\
PHYS130067.01,量子计算与量子信息,3.0,施郁,教授,30,HGX210,一 3-4(5-16周),,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35",12 物理学系\r\n\
PHYS130067.01,量子计算与量子信息,3.0,施郁,教授,30,HGX210,二 3-4(5-16周),,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35",12 物理学系\r\n\
PHYS130069.01,量子场论,3.0,Antonino Marciano,青年研究员,30,HGX410,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-16:10",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,,20,HGX206,"一 1-2\r\n\
(第2周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"一 9-10\r\n\
（2-3周）",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"二 1-2\r\n\
(第3周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"二 6-7\r\n\
（2-3周）",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"三 9-10\r\n\
(第2周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"三 1-2\r\n\
（2-3周）",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"四 1-2\r\n\
(第3周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"四 9-10\r\n\
（2-3周）",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"五 1-2\r\n\
(第3周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"五 9-10\r\n\
(第3周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130076.01,经济物理,2.0,陈昱,教授,20,HGX206,"六 3-4\r\n\
(第3周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130077.01,设计性研究性物理实验,3.0,乐永康等,,30,H物理3楼,三 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 物理学系\r\n\
PHYS130088.01,医学物理实验,2.0,"冀敏\r\n\
季敏标\r\n\
姚红英","副教授\r\n\
研究员\r\n\
讲师",36,H逸夫科技楼407,五 13:05-15:20 ,上海市精品课程团队,"考试日期：其他\r\n\
\r\n\
考试时间：-","基础医学院\r\n\
临床医学院"\r\n\
PHYS130088.02,医学物理实验,2.0,"冀敏\r\n\
季敏标\r\n\
姚红英","副教授\r\n\
研究员\r\n\
讲师",30,H逸夫科技楼407,五 8-10 ,上海市精品课程团队,"考试日期：其他\r\n\
\r\n\
考试时间：-",物理学系\r\n\
PHYS130089.01,量子光学,3.0,吴赛骏,研究员,30,HGX106,一 3-5 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-12:30",12 物理学系\r\n\
PHYS130090.01,软凝聚态物理导论,3.0,谭鹏,青年研究员,30,HGX105,五 11-13 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:30-21:05",12 物理学系\r\n\
PHYS130092.01,大学物理A：光学,3.0,资剑,教授,120,H4201,二 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 物理学系\r\n\
PHYS130092.01,大学物理A：光学,3.0,资剑,教授,120,H4201,四 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 物理学系\r\n\
PHYS130098.01,计算物理模拟实验,3.0,龚新高,教授,6,H院系自主,六 2-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 物理学系\r\n\
PHYS130102.01,生活中的物理学,2.0,Andrey Varlamov,,80,HGX410,"一 11-13\r\n\
(3-7周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",物理学系\r\n\
PHYS130102.01,生活中的物理学,2.0,Andrey Varlamov,,80,HGX410,"四 11-13\r\n\
(3-7周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",物理学系\r\n\
TCPH130002.01,辐射防护,2.0,王旭飞,副研究员,40,H2215,一 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 核工程与核技术\r\n\
TCPH130003.01,核辐射探测与测量方法,3.0,张雪梅,副教授,35,H2207,二 3-5 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",13 核工程与核技术\r\n\
TCPH130005.01,核技术概论,3.0,沈皓,教授,35,H2216,三 3-5 ,"全英语教学\r\n\
校精品课程","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 核工程与核技术\r\n\
TCPH130008.01,核技术综合实验,3.0,"张雪梅\r\n\
张斌\r\n\
王旭飞\r\n\
肖君\r\n\
沈皓\r\n\
施立群","副教授\r\n\
副研究员\r\n\
副研究员\r\n\
副研究员\r\n\
教授\r\n\
研究员",30,,二 6-9 ,限核技术专业,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 核技术\r\n\
TCPH130008.01,核技术综合实验,3.0,"张雪梅\r\n\
张斌\r\n\
王旭飞\r\n\
肖君\r\n\
沈皓\r\n\
施立群","副教授\r\n\
副研究员\r\n\
副研究员\r\n\
副研究员\r\n\
教授\r\n\
研究员",30,,五 1-2 ,限核技术专业,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 核技术\r\n\
TCPH130009.01,生产实习,1.0,陆广成,助理研究员,30,,六 3-3 ,限核技术专业,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 核技术\r\n\
TCPH130011.01,核科学与技术前沿讲座,2.0,陆广成,助理研究员,30,,六 4-5 ,限核技术专业,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 核技术\r\n\
TCPH130014.01,原子物理学,3.0,赵凯锋,副研究员,40,H2216,一 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 核工程与核技术\r\n\
TCPH130014.01,原子物理学,3.0,赵凯锋,副研究员,40,H2216,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 核工程与核技术\r\n\
TCPH130015.01,同位素分离技术,2.0,傅云清,副研究员,55,H4304,三 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：15:30-17:30","13 核工程与核技术\r\n\
12 核技术"\r\n\
TCPH130016.01,误差分析和数据处理,2.0,李增花,副教授,35,H4303,三 6-7 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",14 核工程与核技术\r\n\
TCPH130017.01,薄膜物理与技术,2.0,施立群,研究员,25,H2217,三 3-4 ,部分课程安排参观实践,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",12 核技术\r\n\
TCPH130018.01,核聚变等离子体物理,2.0,肖君,副研究员,25,H2104B,四 6-7 ,全英语教学,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 核技术\r\n\
TCPH130021.01,真空技术,2.0,施立群,研究员,35,H2217,一 8-9 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30",13 核工程与核技术\r\n\
TCPH130022.01,生命科学中的微量元素,2.0,沈皓,教授,25,H2104B,四 3-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 核技术\r\n\
TCPH130023.01,科技英语写作,2.0,Roger Hutton,教授,55,H3404,三 8-9 ,全英语教学,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：15:30-17:30","12 核技术\r\n\
13 核工程与核技术"\r\n\
TCPH130025.01,核电厂安全,2.0,陈建新,研究员,25,H2102B,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 核技术\r\n\
TCPH130028.01,理论物理（下）,4.0,李增花,副教授,25,H4408,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 核工程与核技术\r\n\
TCPH130028.01,理论物理（下）,4.0,李增花,副教授,25,H4304,五 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 核工程与核技术\r\n\
TCPH130034.01,信号处理与总线,2.0,沈扬,助理研究员,35,H2207,二 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 核工程与核技术\r\n\
TCPH130035.01,计算物理基础,2.0,王月霞,副教授,35,H2215,一 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",13 核工程与核技术\r\n\
CHEM120005.01,普通化学A（上）,2.0,华伟明,教授,80,H4305,二 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",自然科学试验班\r\n\
CHEM120005.02,普通化学A（上）,2.0,赵东元,教授,100,H4205,二 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",自然科学试验班\r\n\
CHEM120005.03,普通化学A（上）,2.0,姚萍,教授,80,H4306,二 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",自然科学试验班\r\n\
CHEM120005.04,普通化学A（上）,2.0,岳斌,教授,80,H4403,二 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",自然科学试验班\r\n\
CHEM120005.05,普通化学A（上）,2.0,郑耿锋,教授,30,HGX408,二 3-4 ,"全英文授课\r\n\
上海市精品","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",自然科学试验班\r\n\
CHEM120005.06,普通化学A（上）,2.0,华伟明,教授,130,H4401,五 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30","药学\r\n\
八年制临床医学(二军大)\r\n\
临床医学(八年制)\r\n\
预防医学"\r\n\
CHEM120005.07,普通化学A（上）,2.0,张亚红,教授,130,H4301,五 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30","预防医学(武警班)\r\n\
八年制临床医学(二军大)\r\n\
预防医学\r\n\
临床医学(八年制)\r\n\
药学"\r\n\
CHEM120005.08,普通化学A（上）,2.0,王丛笑,副教授,110,H4201,五 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30","八年制临床医学(二军大)\r\n\
预防医学\r\n\
药学\r\n\
临床医学(八年制)"\r\n\
CHEM120005.09,普通化学A（上）,2.0,郑耿锋,教授,40,HGX402,一 3-4 ,"全英文授课\r\n\
上海市精品","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",临床医学(六年制)\r\n\
CHEM120007.01,普通化学B（上）,2.0,侯秀峰,教授,60,H4505,二 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",自然科学试验班\r\n\
CHEM120007.02,普通化学B（上）,2.0,沈建中,副教授,60,H4406,二 3-4 ,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",自然科学试验班\r\n\
CHEM120009.01,普通化学实验I,1.0,沈建中,副教授,84,H老化1楼,"一 6-9\r\n\
(1-16周单周)","选周一双周现代生物科学实验的学生选修\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",自然科学试验班\r\n\
CHEM120009.02,普通化学实验I,1.0,沈建中,副教授,84,H老化1楼,"一 6-9\r\n\
(2-16周双周)","选周一单周现代生物科学实验的学生选修\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",自然科学试验班\r\n\
CHEM120009.03,普通化学实验I,1.0,沈建中,副教授,84,H老化1楼,"四 6-9\r\n\
(1-16周单周)","选周四双周现代生物科学实验的学生选修\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",自然科学试验班\r\n\
CHEM120009.04,普通化学实验I,1.0,沈建中,副教授,84,H老化1楼,"四 6-9\r\n\
(2-16周双周)","选周四单周现代生物科学实验的学生选修\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",自然科学试验班\r\n\
CHEM120009.05,普通化学实验I,1.0,沈建中,副教授,84,H老化1楼,"五 6-9\r\n\
(1-16周单周)","选周五双周现代生物科学实验的学生选修\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",自然科学试验班\r\n\
CHEM120009.06,普通化学实验I,1.0,沈建中,副教授,84,H老化1楼,"五 6-9\r\n\
(2-16周双周)","选周五单周现代生物科学实验的学生选修\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",自然科学试验班\r\n\
CHEM120009.07,普通化学实验I,1.0,沈建中,副教授,10,H老化1楼,日 14-14 ,"限转入14级化学系、高分子系学生\r\n\
第0周周一、二、三、五上课\r\n\
第三次选课才开放\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-","14 高分子科学系\r\n\
14 化学系"\r\n\
CHEM120009.07,普通化学实验I,1.0,沈建中,副教授,10,,日 14-14(1-16周),"限转入14级化学系、高分子系学生\r\n\
第0周周一、二、三、五上课\r\n\
第三次选课才开放\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-","14 高分子科学系\r\n\
14 化学系"\r\n\
CHEM120009.08,普通化学实验I,1.0,沈建中,副教授,30,H老化1楼,日 14-14 ,"第0周周一、二、三、五上课\r\n\
第三次选课才开放\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",14 材料科学系\r\n\
CHEM120009.08,普通化学实验I,1.0,沈建中,副教授,30,,日 14-14(1-16周),"第0周周一、二、三、五上课\r\n\
第三次选课才开放\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",14 材料科学系\r\n\
CHEM120009.09,普通化学实验I,1.0,陈末华,副教授,28,H老化1楼,"二 6-9\r\n\
(1-16周单周)","全英文授课\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",临床医学(六年制)\r\n\
CHEM120010.01,普通化学实验II,1.0,沈建中,副教授,10,,日 14-14 ,"限转入14级化学系、高分子系学生\r\n\
第三次选课才开放\r\n\
复旦大学精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-","14 化学系\r\n\
14 高分子科学系"\r\n\
CHEM120013.01,普通化学C,3.0,侯秀峰,教授,120,H3106,三 3-4,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30","临床医学(五年制)\r\n\
基础医学\r\n\
法医学"\r\n\
CHEM120013.01,普通化学C,3.0,侯秀峰,教授,120,H3106,"五 3-4\r\n\
(单周)",上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30","临床医学(五年制)\r\n\
基础医学\r\n\
法医学"\r\n\
CHEM120013.02,普通化学C,3.0,沈建中,副教授,110,H3206,三 3-4,上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30","临床医学(五年制)\r\n\
法医学\r\n\
基础医学"\r\n\
CHEM120013.02,普通化学C,3.0,沈建中,副教授,110,H3206,"五 3-4\r\n\
(单周)",上海市精品,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30","临床医学(五年制)\r\n\
法医学\r\n\
基础医学"\r\n\
CHEM120013.03,普通化学C,3.0,陈萌,副教授,20,H3405,三 3-4,"上海市精品\r\n\
临床五年留学生","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",临床医学(五年制)\r\n\
CHEM120013.03,普通化学C,3.0,陈萌,副教授,20,H3405,"五 3-4\r\n\
(单周)","上海市精品\r\n\
临床五年留学生","考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",临床医学(五年制)\r\n\
CHEM130001.01,分析化学AⅠ,2.0,刘宝红,教授,60,H4103,二 1-2 ,复旦大学精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 化学系\r\n\
CHEM130001.02,分析化学AⅠ,2.0,樊惠芝,正高级讲师,40,H4104,二 1-2 ,"建议拔尖班学生修读\r\n\
复旦大学精品课程","考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 化学系\r\n\
CHEM130001.03,分析化学AⅠ,2.0,张松,副教授,40,H4105,二 1-2 ,复旦大学精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 高分子科学系\r\n\
CHEM130003.01,无机化学和化学分析实验Ⅰ,2.0,"赵滨\r\n\
樊惠芝","高级讲师\r\n\
正高级讲师",45,H老化2楼,"一 1-9\r\n\
(1-16周单周)",上海市精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 化学系\r\n\
CHEM130003.02,无机化学和化学分析实验Ⅰ,2.0,"赵滨\r\n\
樊惠芝","高级讲师\r\n\
正高级讲师",36,H老化2楼,"三 1-9\r\n\
(1-16周单周)","建议拔尖班学生修读\r\n\
上海市精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",14 化学系\r\n\
CHEM130003.03,无机化学和化学分析实验Ⅰ,2.0,"汪伟志\r\n\
赵滨","副教授\r\n\
高级讲师",30,H老化2楼,三 1-9,上海市精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 高分子科学系\r\n\
CHEM130003.04,无机化学和化学分析实验Ⅰ,2.0,赵滨,高级讲师,30,H老化2楼,"三 1-9\r\n\
(2-16周双周)",上海市精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 材料化学\r\n\
CHEM130004.01,无机化学和化学分析实验Ⅱ,2.0,"赵滨\r\n\
樊惠芝","高级讲师\r\n\
正高级讲师",45,H老化2楼,"一 1-9\r\n\
(2-16周双周)",上海市精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 化学系\r\n\
CHEM130004.02,无机化学和化学分析实验Ⅱ,2.0,"赵滨\r\n\
樊惠芝","高级讲师\r\n\
正高级讲师",36,H老化2楼,"三 1-9\r\n\
(2-16周双周)","建议拔尖班学生修读\r\n\
上海市精品课程","考试日期：其他\r\n\
\r\n\
考试时间：-",14 化学系\r\n\
CHEM130006.01,仪器分析和物理化学实验A中,2.0,"刘永梅\r\n\
戴维林","副教授\r\n\
教授",125,H老化3楼,"三 1-9\r\n\
(2-16周双周)",复旦大学精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 化学系\r\n\
CHEM130006.02,仪器分析和物理化学实验A中,2.0,"刘旭军\r\n\
刘永梅\r\n\
冯嘉春\r\n\
钱再波","副教授\r\n\
副教授\r\n\
教授\r\n\
讲师",70,H老化3楼,"五 1-9\r\n\
(2-16周双周)",复旦大学精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 高分子材料与工程\r\n\
13 材料化学"\r\n\
CHEM130011.01,合成化学实验(下),2.0,"匡云艳\r\n\
高翔","\r\n\
教授",125,H老化3楼,"三 1-9\r\n\
(1-16周单周)",复旦大学精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 化学系\r\n\
CHEM130011.02,合成化学实验(下),2.0,"姚晋荣\r\n\
匡云艳\r\n\
俞麟\r\n\
程元荣\r\n\
钱再波","讲师\r\n\
\r\n\
副教授\r\n\
副教授\r\n\
讲师",70,H老化3楼,"五 1-9\r\n\
(1-16周单周)",复旦大学精品课程,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 材料化学\r\n\
13 高分子材料与工程"\r\n\
CHEM130012.01,物理化学AⅠ,3.0,周鸣飞,教授,60,H4104,"三 3-4\r\n\
(1-16周单周)",国家精品,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130012.01,物理化学AⅠ,3.0,周鸣飞,教授,60,H4104,五 3-4 ,国家精品,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130012.02,物理化学AⅠ,3.0,"徐昕\r\n\
吴剑鸣","教授\r\n\
副研究员",40,H4203,"二 3-4\r\n\
(1-16周单周)","建议拔尖班学生修读\r\n\
国家精品","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130012.02,物理化学AⅠ,3.0,"徐昕\r\n\
吴剑鸣","教授\r\n\
副研究员",40,H4203,五 3-4 ,"建议拔尖班学生修读\r\n\
国家精品","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130012.03,物理化学AⅠ,3.0,刘智攀,教授,70,H4204,"二 3-4\r\n\
(1-16周单周)",国家精品,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","14 高分子材料与工程\r\n\
14 材料化学"\r\n\
CHEM130012.03,物理化学AⅠ,3.0,刘智攀,教授,70,H4204,五 3-4 ,国家精品,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","14 高分子材料与工程\r\n\
14 材料化学"\r\n\
CHEM130014.01,物理化学AⅢ,3.0,"乔明华\r\n\
刘永梅","教授\r\n\
副教授",90,H4304,"一 3-4\r\n\
(2-16周双周)",国家精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 化学系\r\n\
CHEM130014.01,物理化学AⅢ,3.0,"乔明华\r\n\
刘永梅","教授\r\n\
副教授",90,H4304,四 3-4 ,国家精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 化学系\r\n\
CHEM130014.02,物理化学AⅢ,3.0,乐英红,教授,50,H4103,"一 3-4\r\n\
(2-16周双周)","建议拔尖班学生修读\r\n\
国家精品课程","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 化学系\r\n\
CHEM130014.02,物理化学AⅢ,3.0,乐英红,教授,50,H4103,四 3-4 ,"建议拔尖班学生修读\r\n\
国家精品课程","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 化学系\r\n\
CHEM130014.03,物理化学AⅢ,3.0,"蔡文斌\r\n\
郭娟","教授\r\n\
讲师",80,H4203,一 3-4 ,国家精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30","13 材料化学\r\n\
13 高分子材料与工程"\r\n\
CHEM130014.03,物理化学AⅢ,3.0,"蔡文斌\r\n\
郭娟","教授\r\n\
讲师",80,H4203,"四 3-4\r\n\
(1-16周单周)",国家精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30","13 材料化学\r\n\
13 高分子材料与工程"\r\n\
CHEM130016.01,无机化学,3.0,"林阳辉\r\n\
岳斌","副教授\r\n\
教授",50,H4305,"一 3-4\r\n\
(1-16周单周)",建议拔尖班学生修读,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 化学系\r\n\
CHEM130016.01,无机化学,3.0,"林阳辉\r\n\
岳斌","副教授\r\n\
教授",50,H4305,五 3-4 ,建议拔尖班学生修读,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 化学系\r\n\
CHEM130017.01,生产实习,1.0,叶匀分,副教授,120,,日 13-13 ,开学前两周,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 化学系\r\n\
CHEM130019.01,化学信息学,2.0,乐英红,教授,120,H3206,二 1-2 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：08:00-09:40",13 化学系\r\n\
CHEM130021.01,现代化学专题(分子设计),2.0,周鸣飞,教授,50,H3205,"二 3-4\r\n\
(3-16周)",第三周开始上课,"考试日期：论文,2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35",12 化学系\r\n\
CHEM130022.01,现代化学专题(生物与分离),2.0,王文宁,教授,50,H4103,"三 3-4\r\n\
(3-16周)",第三周开始上课,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 化学系\r\n\
CHEM130025.01,综合化学实验II,2.0,牛国兴,副教授,80,H化学西楼4楼,"四 1-9\r\n\
(3-16周)",第三周开始上课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 化学\r\n\
CHEM130025.02,综合化学实验II,2.0,牛国兴,副教授,0,H化学西楼4楼,六 1-9,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 化学系\r\n\
CHEM130035.01,环境化学B,2.0,邓春晖,教授,30,H4306,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",13 化学系\r\n\
CHEM130037.01,精细有机化学,2.0,陈芬儿,教授,30,H3104,"一 6-7\r\n\
(3-16周)",第三周开始上课,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",12 化学系\r\n\
CHEM130039.01,计算化学,2.0,李振华,教授,60,H4206,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",14 化学系\r\n\
CHEM130043.01,应用化学实验,2.0,牛国兴,副教授,30,H化学西楼4楼,"四 1-9\r\n\
(3-16周)",第三周开始上课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 应用化学\r\n\
CHEM130045.01,化工原理,2.0,叶匀分,副教授,125,H4301,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 化学系\r\n\
CHEM130047.01,化工制图,2.0,徐华龙,教授,50,H3204,二 3-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35",13 化学系\r\n\
CHEM130048.01,应用化学专题,2.0,乐英红,教授,30,H3105,"五 3-4\r\n\
(3-16周)",第三周开始上课,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",12 化学系\r\n\
CHEM130049.01,有机化学,4.0,贾瑜,副教授,60,H4403,二 1-2 ,复旦大学精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 生命科学学院\r\n\
CHEM130049.01,有机化学,4.0,贾瑜,副教授,60,H4403,五 3-4 ,复旦大学精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 生命科学学院\r\n\
CHEM130049.02,有机化学,4.0,王辉,讲师,60,H4205,二 1-2 ,复旦大学精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 生命科学学院\r\n\
CHEM130049.02,有机化学,4.0,王辉,讲师,60,H4205,五 3-4 ,复旦大学精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 生命科学学院\r\n\
CHEM130050.01,有机化学实验,2.0,林阳辉,副教授,16,H老化3楼,"四 1-9\r\n\
(单周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 环境科学与工程系\r\n\
CHEM130050.02,有机化学实验,2.0,林阳辉,副教授,105,H老化3楼,"四 1-9\r\n\
(1-16周单周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 生命科学学院\r\n\
CHEM130052.01,科学训练实验,2.0,牛国兴,副教授,50,,六 1-9,"讨论型课程\r\n\
第三周开始上课","考试日期：其他\r\n\
\r\n\
考试时间：-",12 化学系\r\n\
CHEM130053.01,光电功能材料,2.0,熊焕明,教授,30,H4208,"二 6-7\r\n\
(3-16周)",第三周开始上课,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：13:30-15:10","12 化学系\r\n\
13 化学系"\r\n\
CHEM130061.01,分子组装与分子器件,2.0,钱东金,教授,15,H3104,"一 3-4\r\n\
(3-16周)","讨论型课程\r\n\
第三周开始上课","考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35",12 化学系\r\n\
CHEM130066.01,配位化学,2.0,张道,副教授,30,H3105,"一 6-7\r\n\
(3-16周)",第三周开始上课,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",12 化学系\r\n\
CHEM130067.01,有机化学AⅠ,4.0,高翔,教授,60,H4404,二 3-4 ,"上海市精品课程\r\n\
复旦大学教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130067.01,有机化学AⅠ,4.0,高翔,教授,60,H4404,四 3-4 ,"上海市精品课程\r\n\
复旦大学教学名师","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130067.02,有机化学AⅠ,4.0,孙兴文,副教授,40,H3105,一 3-4 ,"建议拔尖班学生修读\r\n\
上海市精品课程","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130067.02,有机化学AⅠ,4.0,孙兴文,副教授,40,H3105,四 3-4 ,"建议拔尖班学生修读\r\n\
上海市精品课程","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 化学系\r\n\
CHEM130067.03,有机化学AⅠ,4.0,张丹维,副教授,70,H4105,一 3-4 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 材料化学\r\n\
14 高分子材料与工程"\r\n\
CHEM130067.03,有机化学AⅠ,4.0,张丹维,副教授,70,H4105,四 3-4 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 材料化学\r\n\
14 高分子材料与工程"\r\n\
CHEM130071.01,分析化学,2.0,包慧敏,副教授,60,H6404,二 3-4,,"考试日期：2016-01-04\r\n\
考试时间：13:00-15:00",14 生命科学学院\r\n\
CHEM130071.02,分析化学,2.0,雷杰,高级讲师,60,H6504,二 3-4,,,14 生命科学学院\r\n\
CHEM130072.01,分析化学实验,2.0,樊惠芝,正高级讲师,105,H老化2楼,"四 1-9\r\n\
(双周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 生命科学学院\r\n\
CHEM130075.01,有机结构的探秘和解析,2.0,范仁华,教授,15,H3304,五 6-7 ,研讨型课程,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",13 化学系\r\n\
CHEM130076.01,元素化学,2.0,王华冬,教授,60,H4103,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",14 化学系\r\n\
CHEM130077.01,金属有机化学的研究方法和策略,2.0,周锡庚,教授,20,H3404,"三 6-7\r\n\
(3-16周)","讨论型课程\r\n\
第三周开始上课","考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",12 化学系\r\n\
CHEM130081.01,现代化学专题（能源化学）,1.0,王忠胜,研究员,10,J先材楼,"一 8-9\r\n\
(1-8周)",研讨型课程,"考试日期：2015-10-26\r\n\
\r\n\
考试时间：15:25-17:05",13 化学系\r\n\
CHEM130091.01,化学生物学导论,2.0,张琪,研究员,50,H3404,二 6-7 ,全英文授课,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:25-17:05",13 化学系\r\n\
COMP120004.01,线性代数,3.0,阚海斌,教授,65,H4306,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120004.01,线性代数,3.0,阚海斌,教授,65,H4306,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120004.02,线性代数,3.0,张巍,副教授,65,H4305,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120004.02,线性代数,3.0,张巍,副教授,65,H4305,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120004.03,线性代数,3.0,章忠志,副研究员,65,H4303,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120004.03,线性代数,3.0,章忠志,副研究员,65,H4303,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120004.04,线性代数,3.0,张建国,副教授,65,H4106,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30","15 技术科学试验班\r\n\
15 保密管理"\r\n\
COMP120004.04,线性代数,3.0,张建国,副教授,65,H4106,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30","15 技术科学试验班\r\n\
15 保密管理"\r\n\
COMP120004.05,线性代数,3.0,赵运磊,教授,65,H4206,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120004.05,线性代数,3.0,赵运磊,教授,65,H4206,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:00-10:30",15 技术科学试验班\r\n\
COMP120005.01,集合与图论,3.0,阚海斌,教授,35,Z2201,一 6-7 ,上海市精品课程，限拔尖班选课,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 计算机科学与技术\r\n\
COMP120005.01,集合与图论,3.0,阚海斌,教授,35,Z2201,四 6-7 ,上海市精品课程，限拔尖班选课,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 计算机科学与技术\r\n\
COMP120005.02,集合与图论,3.0,章忠志,副研究员,35,Z2308A,一 6-7 ,上海市精品课程,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 计算机科学与技术\r\n\
COMP120005.02,集合与图论,3.0,章忠志,副研究员,35,Z2308A,四 6-7 ,上海市精品课程,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 计算机科学与技术\r\n\
COMP120005.03,集合与图论,3.0,王智慧,讲师,55,Z2101,一 6-7 ,上海市精品课程,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30","14 保密管理\r\n\
14 信息安全\r\n\
14 信息安全(保密方向)"\r\n\
COMP120005.03,集合与图论,3.0,王智慧,讲师,55,Z2101,四 6-7 ,上海市精品课程,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30","14 保密管理\r\n\
14 信息安全\r\n\
14 信息安全(保密方向)"\r\n\
COMP120006.01,程序设计,4.0,周水庚,教授,50,H计算中心2号机房,三 1-2 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.01,程序设计,4.0,周水庚,教授,50,H4206,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.02,程序设计,4.0,周向东,教授,50,H计算中心2号机房,三 6-7 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.02,程序设计,4.0,周向东,教授,50,H4304,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.03,程序设计,4.0,刘卉,讲师,60,H计算中心2号机房,二 8-9 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 技术科学试验班\r\n\
15 核科学与技术系"\r\n\
COMP120006.03,程序设计,4.0,刘卉,讲师,50,H3104,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.04,程序设计,4.0,谈子敬,副教授,50,H计算中心三楼3号机房,三 1-2 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.04,程序设计,4.0,谈子敬,副教授,50,H4303,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.05,程序设计,4.0,周雅倩,讲师,79,H计算中心三楼3号机房,二 8-9 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 保密管理\r\n\
15 技术科学试验班\r\n\
15 核科学与技术系"\r\n\
COMP120006.05,程序设计,4.0,周雅倩,讲师,65,H4305,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 保密管理\r\n\
15 技术科学试验班"\r\n\
COMP130002.01,数字逻辑与部件设计,3.0,唐志强,高级实验师,70,Z2104,五 2-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：09:00-11:00",14 计算机科学与技术\r\n\
COMP130002.02,数字逻辑与部件设计,3.0,孙晓光,副教授,30,Z2208A,一 2-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：09:00-11:00",14 信息安全\r\n\
COMP130003.01,数字逻辑与部件设计实验,1.0,唐志强,高级实验师,50,Z计算机学院机房(1),一 2-4(7-16周),,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 计算机科学与技术\r\n\
COMP130003.02,数字逻辑与部件设计实验,1.0,朱子聪,工程师,50,Z计算机学院机房(2),五 6-8(7-16周),,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 信息安全\r\n\
14 计算机科学与技术"\r\n\
COMP130004.01,数据结构,4.0,孙未未,副教授,35,Z计算机学院机房(2),一 11-12 ,"复旦大学校级精品课程\r\n\
拔尖班课程","考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:00-11:00",14 计算机科学与技术\r\n\
COMP130004.01,数据结构,4.0,孙未未,副教授,35,Z2103,三 6-8 ,复旦大学校级精品课程，拔尖班课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:00-11:00",14 计算机科学与技术\r\n\
COMP130004.02,数据结构,4.0,张_杰,教授,45,Z计算机学院机房(1),一 11-12 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:00-11:00","14 计算机科学与技术\r\n\
14 信息安全"\r\n\
COMP130004.02,数据结构,4.0,张_杰,教授,45,Z2211,三 2-4 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:00-11:00","14 计算机科学与技术\r\n\
14 信息安全"\r\n\
COMP130004.03,数据结构,4.0,陈彤兵,讲师,50,Z院系自主,一 11-12 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:00-11:00","14 保密管理\r\n\
14 信息安全\r\n\
14 信息安全(保密方向)"\r\n\
COMP130004.03,数据结构,4.0,陈彤兵,讲师,50,Z2207,三 2-4 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:00-11:00","14 保密管理\r\n\
14 信息安全\r\n\
14 信息安全(保密方向)"\r\n\
COMP130006.01,概率论与数理统计,4.0,张巍,副教授,40,Z2201,三 6-8 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",13 计算机科学与技术\r\n\
COMP130006.01,概率论与数理统计,4.0,张巍,副教授,40,Z2201,五 6-7 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",13 计算机科学与技术\r\n\
COMP130006.02,概率论与数理统计,4.0,王勇,讲师,40,Z2302,三 6-8 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",13 计算机科学与技术\r\n\
COMP130006.02,概率论与数理统计,4.0,王勇,讲师,40,Z2302,五 6-7 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",13 计算机科学与技术\r\n\
COMP130006.03,概率论与数理统计,4.0,郭跃飞,副教授,35,Z2308A,三 6-8 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30","13 信息安全\r\n\
13 信息安全(保密方向)"\r\n\
COMP130006.03,概率论与数理统计,4.0,郭跃飞,副教授,35,Z2308A,五 6-7 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30","13 信息安全\r\n\
13 信息安全(保密方向)"\r\n\
COMP130014.01,编译,3.0,邱锡鹏,副教授,95,Z2307B,一 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00","12 计算机科学与技术\r\n\
12 信息安全"\r\n\
COMP130014.01,编译,3.0,邱锡鹏,副教授,95,Z计算机学院机房,二 11-12 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00","12 计算机科学与技术\r\n\
12 信息安全"\r\n\
COMP130017.01,数据通信与计算机网络,3.0,曹袖,高级工程师,40,Z2207,一 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00",13 计算机科学与技术\r\n\
COMP130017.01,数据通信与计算机网络,3.0,曹袖,高级工程师,40,Z院系自主,三 11-12 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00",13 计算机科学与技术\r\n\
COMP130017.02,数据通信与计算机网络,3.0,毛迪林,讲师,40,Z计算机学院机房(1),三 11-12 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00",13 计算机科学与技术\r\n\
COMP130017.02,数据通信与计算机网络,3.0,毛迪林,讲师,40,Z2302,五 2-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00",13 计算机科学与技术\r\n\
COMP130017.03,数据通信与计算机网络,3.0,肖晓春,工程师,58,Z计算机学院机房(2),二 11-12 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00","13 信息安全(保密方向)\r\n\
13 保密管理\r\n\
13 信息安全"\r\n\
COMP130017.03,数据通信与计算机网络,3.0,肖晓春,工程师,58,Z2102,五 2-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00","13 信息安全(保密方向)\r\n\
13 保密管理\r\n\
13 信息安全"\r\n\
COMP130018.01,计算机图形学A,3.0,李伟,教授,40,Z2201,五 2-4 ,复旦大学校级精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：09:00-11:00",12 计算机科学与技术\r\n\
COMP130018.02,计算机图形学A,3.0,冯瑞,研究员,40,Z2101,五 2-4 ,复旦大学校级精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：09:00-11:00",12 计算机科学与技术\r\n\
COMP130019.01,生产实习,1.0,汪卫,教授,80,Z院系自主,六 6-7 ,复旦大学教学名师,"考试日期：\r\n\
\r\n\
考试时间：-",12 计算机科学与技术\r\n\
COMP130019.02,生产实习,1.0,汪卫,教授,15,Z院系自主,六 6-7 ,复旦大学教学名师,"考试日期：\r\n\
\r\n\
考试时间：-",12 计算机科学与技术\r\n\
COMP130019.03,生产实习,1.0,汪卫,教授,12,Z院系自主,六 6-7 ,复旦大学教学名师,"考试日期：\r\n\
\r\n\
考试时间：-",12 信息安全(保密方向)\r\n\
COMP130021.01,信息安全原理,3.0,赵一鸣,副教授,30,Z2202,二 2-4 ,成组选修A组,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：08:55-11:35","13 计算机科学与技术\r\n\
12 计算机科学与技术"\r\n\
COMP130025.01,软件体系结构,2.0,陈彤兵,讲师,30,Z2311,四 3-4 ,成组选修A组,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35","13 计算机科学与技术\r\n\
12 计算机科学与技术"\r\n\
COMP130030.01,模式识别,3.0,池明_,副教授,30,Z2313,二 3-5 ,成组选修B组,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-12:30","13 计算机科学与技术\r\n\
12 计算机科学与技术"\r\n\
COMP130031.01,人工智能A,3.0,危辉,教授,30,Z2202,一 2-4 ,成组选修B组,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：08:55-11:35","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130035.01,中文信息处理,2.0,黄萱菁,教授,30,Z2202,四 3-4 ,成组选修B组,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130039.01,微型机系统与接口及实验,4.0,陈利锋,讲师,30,Z2402,二 2-4 ,成组选修C组,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 计算机科学与技术\r\n\
12 计算机科学与技术"\r\n\
COMP130041.01,硬件实验,3.0,陈利锋,讲师,30,Z2206,一 2-4 ,成组选修C组,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130052.01,数据库与数据仓库设计,2.0,"熊_\r\n\
朱扬勇","副教授\r\n\
教授",30,Z2203,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130058.01,计算机组织与科学计算,2.0,沈一帆,教授,30,Z2203,四 1-2 ,论文,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130065.01,近世代数,3.0,马建庆,讲师,30,Z2303,一 6-7(双周),,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：09:00-11:00",13 计算机科学与技术\r\n\
COMP130065.01,近世代数,3.0,马建庆,讲师,30,Z2303,四 2-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：09:00-11:00",13 计算机科学与技术\r\n\
COMP130070.01,网络程序设计,2.0,荆一楠,讲师,15,Z2206,三 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:30-15:30",12 信息安全\r\n\
COMP130071.01,网络攻击与防御技术,2.0,吴承荣,副教授,27,Z2203,二 3-4 ,,"考试日期：2015-01-06\r\n\
\r\n\
考试时间：09:00-11:00","12 信息安全(保密方向)\r\n\
12 信息安全"\r\n\
COMP130093.01,数字水印技术,2.0,刘文海,高级工程师,30,Z2201,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35","12 信息安全(保密方向)\r\n\
13 信息安全\r\n\
12 信息安全\r\n\
13 信息安全(保密方向)"\r\n\
COMP130095.01,电子商务结构和安全,2.0,傅维明,工程师,25,Z2203,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35","12 信息安全\r\n\
14 信息安全\r\n\
12 信息安全(保密方向)"\r\n\
COMP130096.01,计算机病毒及其防治,2.0,廖志成,工程师,30,Z2302,二 3-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35","14 信息安全\r\n\
14 保密管理\r\n\
13 信息安全(保密方向)\r\n\
14 信息安全(保密方向)\r\n\
13 信息安全"\r\n\
COMP130101.01,防火墙技术,2.0,廖健,讲师,30,Z2308A,二 3-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35","13 信息安全\r\n\
13 信息安全(保密方向)\r\n\
14 保密管理\r\n\
14 信息安全\r\n\
14 信息安全(保密方向)"\r\n\
COMP130105.01,网络存储导论,2.0,傅维明,工程师,30,Z2311,二 2-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：08:55-11:35","13 信息安全(保密方向)\r\n\
14 信息安全\r\n\
13 信息安全\r\n\
14 信息安全(保密方向)\r\n\
14 保密管理"\r\n\
COMP130108.01,信息内容安全,2.0,曾剑平,副教授,30,Z2303,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35","12 信息安全(保密方向)\r\n\
13 信息安全(保密方向)\r\n\
12 信息安全\r\n\
13 信息安全"\r\n\
COMP130110.01,操作系统,3.0,张亮,教授,32,Z院系自主,二 8-9 ,复旦大学校级精品课程，复旦大学教学名师，拔尖班课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 计算机科学与技术\r\n\
COMP130110.01,操作系统,3.0,张亮,教授,32,Z2212,四 6-8 ,复旦大学校级精品课程，复旦大学教学名师，拔尖班课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 计算机科学与技术\r\n\
COMP130110.02,操作系统,3.0,赵进,副教授,30,Z计算机学院机房(1),二 8-9 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30","13 计算机科学与技术\r\n\
13 信息安全\r\n\
13 信息安全(保密方向)"\r\n\
COMP130110.02,操作系统,3.0,赵进,副教授,30,Z2211,四 6-8 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30","13 计算机科学与技术\r\n\
13 信息安全\r\n\
13 信息安全(保密方向)"\r\n\
COMP130110.03,操作系统,3.0,王飞,副教授,38,Z计算机学院机房(2),二 8-9 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30","13 计算机科学与技术\r\n\
13 保密管理\r\n\
13 信息安全"\r\n\
COMP130110.03,操作系统,3.0,王飞,副教授,38,Z2209A,四 6-8 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30","13 计算机科学与技术\r\n\
13 保密管理\r\n\
13 信息安全"\r\n\
COMP130110.04,操作系统,3.0,谢志鹏,副教授,35,Z院系自主,二 8-9 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30","13 保密管理\r\n\
13 计算机科学与技术\r\n\
13 信息安全"\r\n\
COMP130110.04,操作系统,3.0,谢志鹏,副教授,35,Z2206,四 6-8 ,复旦大学校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30","13 保密管理\r\n\
13 计算机科学与技术\r\n\
13 信息安全"\r\n\
COMP130112.01,软件工程化开发,2.0,沈立炜,副教授,80,Z2104,三 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 计算机科学与技术\r\n\
COMP130113.01,电子学基础,2.0,杨夙,教授,30,Z2208A,二 2-4 ,成组选修C组,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：08:55-11:35","13 计算机科学与技术\r\n\
12 计算机科学与技术"\r\n\
COMP130115.01,法学基础与保密法学,3.0,吴承荣,副教授,35,Z2209A,五 2-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00","14 信息安全(保密方向)\r\n\
14 保密管理"\r\n\
COMP130116.01,保密技术概论,3.0,吴杰,研究员,27,Z2206,四 2-4 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：09:00-11:00","13 保密管理\r\n\
13 信息安全(保密方向)"\r\n\
COMP130120.01,计算机取证,2.0,曾剑平,副教授,25,Z2203,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35","13 信息安全(保密方向)\r\n\
13 保密管理\r\n\
12 信息安全(保密方向)"\r\n\
COMP130123.01,分布式系统,3.0,"张奇\r\n\
王晓阳","副教授\r\n\
教授",30,Z2209A,三 2-4 ,成组选修A组,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:55-11:35","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130124.01,计算机视觉,3.0,陈雁秋,教授,30,Z2308A,三 2-4 ,成组选修B组,论文,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130125.01,大数据分析技术,2.0,"王鹏\r\n\
汪卫","副教授\r\n\
教授",30,Z2102,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35","13 计算机科学与技术\r\n\
12 计算机科学与技术"\r\n\
COMP130126.01,信息检索导论,3.0,李伟,教授,30,Z2101,三 2-4 ,论文,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 计算机科学与技术\r\n\
12 计算机科学与技术"\r\n\
COMP130129.01,游戏开发基础,3.0,徐志平,讲师,30,Z2212,三 2-4 ,论文,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 计算机科学与技术\r\n\
13 计算机科学与技术"\r\n\
COMP130131.01,运筹学,3.0,张建国,副教授,25,Z2212,一 2-4 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：09:00-11:00",14 保密管理\r\n\
COMP130143.01,计算机系统基础（上）,3.0,"路红\r\n\
袁春风","教授\r\n\
教授",35,Z2209A,二 2-4 ,拔尖班,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:30-15:30",14 计算机科学与技术\r\n\
COMP130143.01,计算机系统基础（上）,3.0,"路红\r\n\
袁春风","教授\r\n\
教授",35,Z计算机学院机房(2),"四 8-9\r\n\
(2-16周双周)",拔尖班,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:30-15:30",14 计算机科学与技术\r\n\
COMP130143.01,计算机系统基础（上）,3.0,"路红\r\n\
袁春风","教授\r\n\
教授",35,Z计算机学院机房(2),"四 8-9\r\n\
(1-16周单周)",拔尖班,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:30-15:30",14 计算机科学与技术\r\n\
COMP130150.01,算法竞赛导论,3.0,孙未未,副教授,30,Z2211,日 6-8 ,实验报告，ACM队,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 计算机科学与技术\r\n\
14 计算机科学与技术"\r\n\
MATH120012.01,微积分（上）,4.0,王轶彤,副教授,30,HGD405,二 2-4 ,HGD405,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",15 留学生 临床医学(六年制)\r\n\
MATH120012.01,微积分（上）,4.0,王轶彤,副教授,30,HGD405,四 3-4 ,HGD405,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",15 留学生 临床医学(六年制)\r\n\
MATH120016.01,数学分析BI,5.0,张建国,副教授,75,H4405,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 技术科学试验班"\r\n\
MATH120016.01,数学分析BI,5.0,张建国,副教授,75,H4405,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 技术科学试验班"\r\n\
MATH120016.01,数学分析BI,5.0,张建国,副教授,75,H4405,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 保密管理\r\n\
15 技术科学试验班"\r\n\
MATH120016.02,数学分析BI,5.0,张守志,副教授,60,H3408,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.02,数学分析BI,5.0,张守志,副教授,60,H3408,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.02,数学分析BI,5.0,张守志,副教授,60,H3408,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.03,数学分析BI,5.0,王勇,讲师,60,H3109,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.03,数学分析BI,5.0,王勇,讲师,60,H3109,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.03,数学分析BI,5.0,王勇,讲师,60,H3109,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.04,数学分析BI,5.0,郭跃飞,副教授,60,H3409,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.04,数学分析BI,5.0,郭跃飞,副教授,60,H3409,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.04,数学分析BI,5.0,郭跃飞,副教授,60,H3409,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.05,数学分析BI,5.0,张巍,副教授,70,H4403,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.05,数学分析BI,5.0,张巍,副教授,70,H4403,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.05,数学分析BI,5.0,张巍,副教授,70,H4403,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
TFSY118003.01,音乐科技导论,1.0,李伟,教授,30,H2103,"五 11-12\r\n\
(1-8周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
MATE130003.01,纳米材料学,2.0,陈敏,教授,35,HGX206,五 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 材料化学\r\n\
MATE130005.01,材料化学,2.0,"叶明新\r\n\
沈剑锋","教授\r\n\
副教授",35,H2113A,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 材料化学\r\n\
MATE130007.01,高分子材料化学,2.0,"马晓华\r\n\
武利民","教授\r\n\
教授",40,H4101,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 材料化学\r\n\
MATE130008.01,生产实习,1.0,郭艳辉,副教授,30,,,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 材料化学\r\n\
MATE130008.02,生产实习,1.0,戎瑞芬,高级工程师,35,,,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 材料物理\r\n\
MATE130008.03,生产实习,1.0,戎瑞芬,高级工程师,25,,,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 电子科学与技术\r\n\
MATE130010.01,材料物理,3.0,吴晓京,教授,45,H2113B,四 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 材料物理\r\n\
MATE130013.01,半导体物理C,3.0,曾_,副教授,45,H4304,五 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 材料物理\r\n\
MATE130016.01,集成电路的分析与设计,3.0,李楠,高级工程师,35,H2207,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 材料物理\r\n\
MATE130017.01,电子材料分析,3.0,黄曜,副教授,45,HGX208,二 2-4 ,校级精品课程团队,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 材料物理\r\n\
MATE130018.01,专业英语(材料物理),2.0,江素华,副教授,30,H2218,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",12 材料科学系\r\n\
MATE130019.01,真空物理与技术,3.0,蒋益明,教授,30,H4305,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 电子科学与技术\r\n\
MATE130023.01,电子物理实验,3.0,"徐辉\r\n\
张群","副教授\r\n\
教授",25,H材料2楼,一 1-4 ,材料二楼106,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 电子科学与技术\r\n\
MATE130026.01,文献检索,2.0,于瀛,副教授,30,HGX202,二 1-2 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：08:00-09:40","12 材料科学系\r\n\
13 材料科学系"\r\n\
MATE130029.01,专业外语,2.0,胡林峰,副教授,30,H2105A,二 3-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130032.01,薄膜材料工艺学,2.0,俞宏坤,副教授,30,H6310,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",12 材料科学系\r\n\
MATE130034.01,材料科学导论,3.0,杨振国,教授,100,H3208,四 6-8 ,上海市精品课程团队,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 材料科学系\r\n\
MATE130035.01,工程材料的电学性质,2.0,李越生,教授,30,H5116,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130036.01,半导体材料,2.0,高尚鹏,教授,30,H2105A,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130037.01,新型能源材料,2.0,"方方\r\n\
郭艳辉","副教授\r\n\
副教授",30,H2105A,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",材料科学系\r\n\
MATE130038.01,光电子发光材料,2.0,曾_,副教授,10,H院系自主,五 3-4 ,"1-6周上课\r\n\
7-16周实验","考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",12 材料科学系\r\n\
MATE130042.01,电子与信息材料,3.0,徐辉,副教授,30,H2105B,一 6-8 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130048.01,液晶物理学,2.0,许军,副教授,30,H2105B,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 材料科学系\r\n\
13 材料科学系"\r\n\
MATE130050.01,数学物理方法,4.0,王_,副教授,30,H4306,一 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 电子科学与技术\r\n\
MATE130050.01,数学物理方法,4.0,王_,副教授,30,H4306,三 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 电子科学与技术\r\n\
MATE130051.01,无机功能材料,2.0,余学斌,教授,30,H2104A,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",材料科学系\r\n\
MATE130052.01,材料科学前沿讲座,2.0,梁子骐,研究员,30,H5107,三 6-7 ,全英语课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130053.01,计算材料学,2.0,高尚鹏,教授,30,H2102B,一 3-4 ,全英语课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 材料科学系\r\n\
13 材料科学系"\r\n\
MATE130054.01,光子晶体导论,2.0,胡新华,研究员,30,H2102B,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130058.01,模拟与数字电子线路,3.0,"宋云\r\n\
方方","工程师\r\n\
副教授",20,H5216,三 6-8 ,自科试验班分流,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 材料物理\r\n\
MATE130058.02,模拟与数字电子线路,3.0,"宋云\r\n\
方方","工程师\r\n\
副教授",20,H6210,五 3-5 ,技科试验班分流,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 材料物理\r\n\
MATE130061.01,材料制备与加工,3.0,"周树学\r\n\
沈杰","教授\r\n\
副教授",90,H4404,二 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",13 材料科学系\r\n\
MATE130063.01,固体物理导论,4.0,梅永丰,研究员,30,H6408,三 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 电子科学与技术\r\n\
MATE130063.01,固体物理导论,4.0,梅永丰,研究员,30,H6407,五 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 电子科学与技术\r\n\
MATE130066.01,光电技术与器件,3.0,"肖倩\r\n\
赵栋\r\n\
洪广伟\r\n\
王超","工程师\r\n\
副教授\r\n\
副教授\r\n\
副研究员",25,H2103,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 电子科学与技术\r\n\
MATE130067.01,材料力学,2.0,王_,副教授,45,H2111,一 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",13 材料物理\r\n\
MATE130068.01,材料分析化学（上）,2.0,黄曜,副教授,30,H2104A,一 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 材料化学\r\n\
MATE130070.01,材料化学实验,3.0,"周树学\r\n\
韦嘉\r\n\
钱再波","教授\r\n\
副教授\r\n\
讲师",35,H院系自主,一 1-8 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 材料化学\r\n\
MATE130073.01,柔性光电子学,2.0,许军,副教授,30,H5107,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130074.01,固体材料光谱学,2.0,"梅永丰\r\n\
黄高山","研究员\r\n\
副研究员",30,H5112,五 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 材料科学系\r\n\
13 材料科学系"\r\n\
MATE130080.01,有机半导体材料与器件概论,2.0,钟高余,副教授,30,H5107,五 9-10 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：16:20-18:00","12 材料科学系\r\n\
13 材料科学系"\r\n\
MATE130081.01,电子材料的化学处理,2.0,俞宏坤,副教授,30,H5105,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",12 材料科学系\r\n\
MATE130082.01,复合材料,2.0,于志强,副教授,30,H6108,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35","13 材料科学系\r\n\
12 材料科学系"\r\n\
MATE130083.01,精细化工工艺学,2.0,"顾广新\r\n\
游波","副教授\r\n\
教授",30,H6306,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35","12 材料科学系\r\n\
13 材料科学系"\r\n\
MATE130087.01,智能材料,2.0,郭艳辉,副教授,30,H2104B,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10","14 材料科学系\r\n\
13 材料科学系"\r\n\
TFSY118002.01,生活中的材料启示,2.0,梅永丰,研究员,15,H2307,三 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",15\r\n\
TFSY118007.01,生命、医学与材料,2.0,马晓华,教授,35,H2308,"一 6-8\r\n\
(1-8周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",15\r\n\
MACR130001.01,高分子化学A,3.0,"姚晋荣\r\n\
邵正中","讲师\r\n\
教授",48,HGX209,二 1-3 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",13 高分子材料与工程\r\n\
MACR130007.01,专业英语及文献,3.0,汤慧,副教授,40,H5314,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 高分子材料与工程\r\n\
MACR130009.01,高分子化学B,2.0,杨武利,教授,130,H4201,四 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","13 化学\r\n\
13 应用化学"\r\n\
MACR130010.01,高分子工艺制图,2.0,王海涛,副教授,78,H4303,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10","12 高分子材料与工程\r\n\
13 高分子材料与工程"\r\n\
MACR130013.01,高分子专题(高分子光谱学),2.0,周平,教授,40,H2112A,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 高分子材料与工程\r\n\
MACR130014.01,高分子专题(高分子科学前沿),2.0,"武培怡\r\n\
丁建东\r\n\
汪长春\r\n\
何军坡","教授\r\n\
教授\r\n\
教授\r\n\
教授",30,H2103,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 高分子材料与工程\r\n\
MACR130015.01,糖化学与糖生物,2.0,陈国颂,教授,40,H跃进楼106,三 3-4 ,全英语课程,"考试日期：其他,2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",13 高分子材料与工程\r\n\
MACR130016.01,化工传质与分离过程,3.0,汤蓓蓓,副教授,40,H2112A,四 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 高分子材料与工程\r\n\
MACR130020.01,聚合物电子封装材料基础,2.0,余英丰,教授,40,H6502,三 3-4 ,,,12 高分子材料与工程\r\n\
MACR130023.01,高分子材料结构性能与应用,2.0,"邱枫\r\n\
唐萍","教授\r\n\
教授",45,H2110,四 6-7 ,,,13 高分子材料与工程\r\n\
MACR130024.01,高分子学术前沿讲座,2.0,何军坡,教授,30,H院系自主,"六 3-4\r\n\
(第1周)",,"考试日期：其他,2015-12-21\r\n\
\r\n\
考试时间：15:25-17:05",14 高分子科学系\r\n\
MACR130029.01,光电功能高分子材料,2.0,魏大程,研究员,40,H2112A,一 8-9 ,,"考试日期：其他,2015-12-21\r\n\
\r\n\
考试时间：15:25-17:05",12 高分子材料与工程\r\n\
XDSY118003.01,科学研究如何起步及进行,2.0,周平,教授,30,H2102B,一 8-9 ,,"考试日期：其他,2015-12-14\r\n\
\r\n\
考试时间：15:25-17:05",\r\n\
ENVI130003.01,生态学,2.0,王寿兵,副教授,50,H4101,一 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
ENVI130005.01,环境生物学,3.0,樊正球,副教授,50,H4104,四 3-5 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 环境科学与工程系\r\n\
ENVI130007.01,环境监测实验,1.5,"邓丛蕊\r\n\
郑志坚","副教授\r\n\
高级工程师",35,H环境楼,"四 2-9\r\n\
(单周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 环境科学与工程系\r\n\
ENVI130008.01,环境工程学A,3.0,万春黎,讲师,20,H4208,五 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 环境科学\r\n\
ENVI130008.02,环境工程学A,3.0,张轶,讲师,20,H4408,五 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 环境科学(环境工程方向)\r\n\
ENVI130010.01,环境工程基础,3.0,刘燕,教授,50,HGX201,一 6-8 ,校级精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 环境科学\r\n\
ENVI130011.01,环境化学A,3.0,"陈建民\r\n\
叶兴南","教授\r\n\
副教授",55,HGX202,二 6-8 ,复旦大学教学名师 校级精品课程,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 环境科学与工程系\r\n\
ENVI130020.01,有机化学,4.0,张仁熙,副教授,25,H3205,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 环境科学与工程系\r\n\
ENVI130020.01,有机化学,4.0,张仁熙,副教授,25,H3205,三 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 环境科学与工程系\r\n\
ENVI130020.02,有机化学,4.0,陈宏,讲师,25,H3204,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 环境科学与工程系\r\n\
ENVI130020.02,有机化学,4.0,陈宏,讲师,25,H3204,三 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 环境科学与工程系\r\n\
ENVI130022.01,环境物理学导论,3.0,"周斌\r\n\
张艳","教授\r\n\
副教授",20,H2106A,一 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130024.01,环境统计学,2.0,张浩,副教授,30,H3205,五 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 环境科学与工程系\r\n\
ENVI130025.01,大气污染与控制,3.0,"张仁熙\r\n\
马臻","副教授\r\n\
教授",30,H4208,二 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","13 环境科学与工程系\r\n\
12 环境科学与工程系"\r\n\
ENVI130026.01,水污染与控制,3.0,"何坚\r\n\
郑正","讲师\r\n\
教授",20,H3105,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:30",13 环境科学与工程系\r\n\
ENVI130027.01,固体废物处理与资源化,2.0,"张士成\r\n\
罗兴章","教授\r\n\
副教授",40,H4208,二 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 环境科学与工程系\r\n\
12 环境科学与工程系"\r\n\
ENVI130028.01,专业英语,2.0,马臻,教授,20,H6302,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 环境科学(环境工程方向)\r\n\
ENVI130028.02,专业英语,2.0,"杨晓英\r\n\
Marie Harder","副教授\r\n\
教授",20,H4306,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:55",13 环境科学(环境管理方向)\r\n\
ENVI130029.01,环境微生物学,2.0,"刘思秀\r\n\
代瑞华","副教授\r\n\
副教授",65,H4104,五 6-7 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30","12 环境科学与工程系\r\n\
14 环境科学与工程系"\r\n\
ENVI130030.01,环境地学基础,2.0,高效江,副教授,25,H4208,三 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 环境科学与工程系\r\n\
ENVI130032.01,产业生态学,2.0,王寿兵,副教授,30,H4408,二 3-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","12 环境科学与工程系\r\n\
13 环境科学与工程系"\r\n\
ENVI130033.01,环境材料导论,2.0,"张士成\r\n\
董维阳","教授\r\n\
高级工程师",30,H4208,三 1-2 ,研讨型课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 环境科学与工程系\r\n\
ENVI130040.01,环境与贸易,2.0,马涛,副教授,20,HGX202,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 环境科学与工程系\r\n\
ENVI130044.01,全球环境变化,2.0,"陈莹\r\n\
张艳","教授\r\n\
副教授",30,HGX202,四 3-4 ,全英文授课,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130047.01,城市规划原理,2.0,"袁樵\r\n\
王新军\r\n\
苏海龙","副教授\r\n\
研究员\r\n\
工程师",25,H3105,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 环境科学\r\n\
ENVI130049.01,城市生态学,2.0,张浩,副教授,20,H2107,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130051.01,自然资源经济学,2.0,刘平养,讲师,20,H3204,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:55",13 环境科学与工程系\r\n\
ENVI130052.01,田野调查方法,2.0,张真,副教授,20,HGX202,一 3-4 ,,"考试日期：\r\n\
\r\n\
考试时间：-",13 环境科学与工程系\r\n\
ENVI130054.01,全球气候变化与低碳经济,2.0,"马涛\r\n\
陈红敏","副教授\r\n\
副教授",20,H2104A,四 3-4 ,研讨型课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 环境科学与工程系\r\n\
ENVI130056.01,环境法,3.0,黄文芳,副教授,20,HGX202,一 6-8 ,研讨型课程,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:30",13 环境科学与工程系\r\n\
ENVI130057.01,环境核算与审计,2.0,"雷一东\r\n\
陈红敏","副教授\r\n\
副教授",25,H2106A,四 1-2 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：08:00-09:40",12 环境科学与工程系\r\n\
ENVI130059.01,能源材料与储能技术,2.0,李溪,教授,20,H2103,四 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130060.01,生态工程,2.0,张继彪,讲师,25,H3205,三 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130063.01,环境水文学基础,2.0,杨晓英,副教授,25,H3204,三 6-7 ,全英文授课,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130065.01,环境分析化学,3.0,"李想\r\n\
陈宏","副教授\r\n\
讲师",50,H3304,二 3-5 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 环境科学与工程系\r\n\
ENVI130067.01,环境管理,3.0,戴星翼,教授,50,HGX210,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 环境科学与工程系\r\n\
ENVI130071.01,仪器分析,2.0,隋国栋,教授,20,H2105A,一 6-7 ,全英文授课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130073.01,环境规划原理,3.0,包存宽,教授,20,H3205,五 3-5 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130075.01,环境评价,2.0,"余琦\r\n\
张艳","副教授\r\n\
副教授",55,H4106,三 3-4 ,研讨型课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 环境科学与工程系\r\n\
ENVI130076.01,环境毒理学原理,3.0,李丹,青年副研究员,20,H3205,三 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
ENVI130082.01,环境纳米技术,2.0,张立武,研究员,20,H2105B,一 3-4 ,全英文授课,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 环境科学与工程系\r\n\
JWCH110005.01,专题讲座,0.0,外教,,60,Z软院机房303,五 9-9 ,"张江\r\n\
不向外系开放\r\n\
爱尔兰班必修","考试日期：\r\n\
\r\n\
考试时间：-",\r\n\
JWCH110005.01,专题讲座,0.0,外教,,60,Z2202,五 6-8 ,张江，不向外系开放，爱尔兰班必修,"考试日期：\r\n\
\r\n\
考试时间：-",\r\n\
SOFT120001.01,程序设计A,5.0,戴开宇,讲师,55,H6402,一 6-7 ,"邯郸\r\n\
必修\r\n\
单学号必选","考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
SOFT120001.01,程序设计A,5.0,戴开宇,讲师,55,H计算中心A110,二 3-4 ,邯郸，必修，单学号必选,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
SOFT120001.01,程序设计A,5.0,戴开宇,讲师,55,H6402,三 6-7 ,邯郸，必修，单学号必选,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
SOFT120001.02,程序设计A,5.0,陈荣华,讲师,55,H6502,一 6-7 ,"邯郸\r\n\
必修\r\n\
双学号必选","考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
SOFT120001.02,程序设计A,5.0,陈荣华,讲师,55,H6502,三 6-7 ,邯郸，必修，双学号必选,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
SOFT120001.02,程序设计A,5.0,陈荣华,讲师,55,H计算中心A110,四 8-9 ,邯郸，必修，双学号必选,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",15 软件学院\r\n\
SOFT130004.01,数据结构与算法设计,5.0,郑骁庆,副教授,55,Z2302,一 6-7 ,"张江\r\n\
必修\r\n\
建议卓越班修读","考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130004.01,数据结构与算法设计,5.0,郑骁庆,副教授,55,Z2302,三 3-4 ,张江，必修，建议卓越班修读,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130004.01,数据结构与算法设计,5.0,郑骁庆,副教授,55,Z软院机房303,三 8-9 ,张江，必修，建议卓越班修读,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130004.02,数据结构与算法设计,5.0,韩伟力,副教授,60,Z2202,一 6-7 ,"张江\r\n\
必修","考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130004.02,数据结构与算法设计,5.0,韩伟力,副教授,60,Z软院机房303,三 11-12 ,张江，必修,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130004.02,数据结构与算法设计,5.0,韩伟力,副教授,60,Z2202,三 3-4 ,张江，必修,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130007.01,概率统计,3.0,金玲飞,青年副研究员,100,Z2204,一 1-2 ,"张江\r\n\
不向外系开放\r\n\
必修","考试日期：2015-12-29\r\n\
\r\n\
考试时间：09:00-11:00",13 软件学院\r\n\
SOFT130007.01,概率统计,3.0,金玲飞,青年副研究员,100,Z2204,一 6-8 ,张江，不向外系开放，必修,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：09:00-11:00",13 软件学院\r\n\
SOFT130010.01,项目管理,3.0,高晓桐,,100,Z2104,六 2-4 ,"张江\r\n\
不向外系开放\r\n\
必修","考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",12 软件学院\r\n\
SOFT130011.01,计算机前沿讲座(上),0.0,赵一鸣,副教授,100,Z2104,五 6-7 ,"张江\r\n\
不向外系开放\r\n\
必修\r\n\
论文","考试日期：论文\r\n\
\r\n\
考试时间：-",13 软件学院\r\n\
SOFT130013.01,专业实践与生产实习(上),3.0,赵一鸣,副教授,100,Z院系自主,日 11-12 ,"张江\r\n\
不向外系开放\r\n\
必修\r\n\
论文","考试日期：论文\r\n\
\r\n\
考试时间：-",12 软件学院\r\n\
SOFT130015.01,数据库设计,3.0,吴毅坚,副教授,80,Z2102,二 2-4 ,张江，不向外系开放，A方向必修,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:30-15:30",13 软件学院\r\n\
SOFT130017.01,面向对象分析和设计,3.0,张天戈,工程师,50,Z2203,四 11-13 ,"张江\r\n\
不向外系开放\r\n\
A方向必修","考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:30-15:30",12 软件学院\r\n\
SOFT130021.01,数字部件设计,4.0,张睿,高级工程师,50,Z软院机房303,一 3-4 ,"张江\r\n\
不向外系开放\r\n\
B方向必修","考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:30",13 软件学院\r\n\
SOFT130021.01,数字部件设计,4.0,张睿,高级工程师,50,Z2203,三 6-8 ,张江，不向外系开放，B方向必修,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:30",13 软件学院\r\n\
SOFT130029.01,人工智能,2.0,外教,,60,Z软院机房303,五 1-1 ,"张江\r\n\
不向外系开放\r\n\
爱尔兰班必修","考试日期：\r\n\
\r\n\
考试时间：-",12 软件学院\r\n\
SOFT130029.01,人工智能,2.0,外教,,60,Z2202,五 2-4 ,张江，不向外系开放，爱尔兰班必修,"考试日期：\r\n\
\r\n\
考试时间：-",12 软件学院\r\n\
SOFT130031.01,操作系统II,2.0,外教,,60,Z软院机房303,六 9-9 ,"张江\r\n\
不向外系开放\r\n\
爱尔兰班必修","考试日期：\r\n\
\r\n\
考试时间：-",12 软件学院\r\n\
SOFT130031.01,操作系统II,2.0,外教,,60,Z2202,六 6-8 ,张江，不向外系开放，爱尔兰班必修,"考试日期：\r\n\
\r\n\
考试时间：-",12 软件学院\r\n\
SOFT130039.01,离散数学(上),3.0,赵一鸣,副教授,105,Z2307B,一 3-4 ,"张江\r\n\
必修","考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130039.01,离散数学(上),3.0,赵一鸣,副教授,105,Z2307B,三 6-7 ,张江，必修,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130045.01,ERP原理与实施,2.0,李敏波,副教授,65,Z2102,一 11-12 ,"张江\r\n\
选修\r\n\
12、13、14级共同开课","考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30","12 软件学院\r\n\
14 软件学院\r\n\
13 软件学院"\r\n\
SOFT130049.01,智能系统原理与开发,4.0,郑骁庆,副教授,50,Z2203,一 11-12 ,"张江\r\n\
不向外系开放\r\n\
A方向必修","考试日期：2016-01-07\r\n\
\r\n\
考试时间：09:00-11:00",13 软件学院\r\n\
SOFT130049.01,智能系统原理与开发,4.0,郑骁庆,副教授,50,Z2203,三 11-12 ,张江，不向外系开放，A方向必修,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：09:00-11:00",13 软件学院\r\n\
SOFT130051.01,多媒体技术基础,3.0,姜秀艳,讲师,60,Z2208A,三 2-4 ,"张江\r\n\
不向外系开放\r\n\
C方向必修","考试日期：2015-12-23\r\n\
\r\n\
考试时间：18:30-20:30",13 软件学院\r\n\
SOFT130056.01,计算机系统基础（上）,3.0,唐渊,讲师,35,Z2303,二 3-4 ,"张江\r\n\
必修","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130056.01,计算机系统基础（上）,3.0,唐渊,讲师,35,Z2303,四 6-7 ,张江，必修,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130057.01,计算机系统基础（下）,3.0,"张为华\r\n\
李涛","副教授\r\n\
教授",65,Z2208A,四 6-7 ,"张江\r\n\
必修\r\n\
建议已修读过计算机系统基础(上)的卓越班修读","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130057.01,计算机系统基础（下）,3.0,"张为华\r\n\
李涛","副教授\r\n\
教授",65,Z2208A,五 3-4 ,张江，必修，建议已修读过计算机系统基础(上)的卓越班修读,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130057.01,计算机系统基础（下）,3.0,"张为华\r\n\
李涛","副教授\r\n\
教授",65,Z2208A,六 2-4 ,张江，必修，建议已修读过计算机系统基础(上)的卓越班修读,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130057.01,计算机系统基础（下）,3.0,"张为华\r\n\
李涛","副教授\r\n\
教授",65,Z2208A,六 6-8 ,张江，必修，建议已修读过计算机系统基础(上)的卓越班修读,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 软件学院\r\n\
SOFT130060.01,操作系统Ⅰ,3.0,李_,讲师,100,Z2307B,四 2-4 ,"张江\r\n\
不向外系开放\r\n\
B方向必修","考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",13 软件学院\r\n\
SOFT130061.01,编译原理,3.0,杨珉,副教授,70,Z2102,五 11-13 ,"张江\r\n\
不向外系开放\r\n\
B方向/爱尔兰班必修","考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 软件学院\r\n\
SOFT130061.01,编译原理,3.0,杨珉,副教授,70,Z2102,六 11-12 ,张江，不向外系开放，B方向/爱尔兰班必修,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 软件学院\r\n\
SOFT130062.01,计算机图形学,3.0,姜忠鼎,副教授,50,Z2203,四 6-8 ,"张江\r\n\
不向外系开放\r\n\
C方向必修","考试日期：2016-01-06\r\n\
\r\n\
考试时间：09:00-11:00",13 软件学院\r\n\
SOFT130063.01,人机交互,2.0,姜忠鼎,副教授,50,Z2203,五 6-7 ,"张江\r\n\
不向外系开放\r\n\
C方向必修","考试日期：2016-01-04\r\n\
\r\n\
考试时间：09:00-11:00",12 软件学院\r\n\
SOFT130064.01,软件测试,2.0,沈立炜,副教授,45,Z2203,五 11-12 ,"张江\r\n\
选修\r\n\
12、13级共同开课","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:30-20:30","12 软件学院\r\n\
12 软件学院"\r\n\
SOFT130067.01,智能移动平台应用开发,2.0,陈辰,讲师,65,Z2102,四 11-12 ,"张江\r\n\
选修\r\n\
12、13、14级共同开课","考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30","12 软件学院\r\n\
14 软件学院\r\n\
13 软件学院"\r\n\
SOFT130069.01,客户智能,2.0,赵卫东,副教授,45,Z2303,四 11-12 ,"张江\r\n\
选修\r\n\
12、13、14级共同开课","考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30","14 软件学院\r\n\
12 软件学院\r\n\
13 软件学院"\r\n\
SOFT130070.01,并行计算与性能优化,2.0,唐渊,讲师,45,Z2209B,三 6-7 ,"张江\r\n\
选修\r\n\
12、13级共同开课","考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:30","13 软件学院\r\n\
12 软件学院"\r\n\
COMP120004.06,线性代数,3.0,倪卫明,副教授,65,H4405,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
COMP120004.06,线性代数,3.0,倪卫明,副教授,65,H4405,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
COMP120004.07,线性代数,3.0,刘鹏,副教授,65,H4406,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
COMP120004.07,线性代数,3.0,刘鹏,副教授,65,H4406,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
COMP120004.08,线性代数,3.0,张祥朝,副研究员,65,H4401,二 1-2 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
COMP120004.08,线性代数,3.0,张祥朝,副研究员,65,H4401,四 3-4 ,上海市精品课程,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
COMP120006.06,程序设计,4.0,张美玉,高级工程师,55,H4106,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.06,程序设计,4.0,张美玉,高级工程师,55,H计算中心3楼3号机房,五 6-7 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.07,程序设计,4.0,吴晓峰,,55,H4205,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.07,程序设计,4.0,吴晓峰,,55,H计算中心3楼2号机房,五 8-9 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.08,程序设计,4.0,陶俊,讲师,45,H4404,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.08,程序设计,4.0,陶俊,讲师,45,H计算中心3楼1号机房,五 8-9 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.09,程序设计,4.0,杨帆,副教授,50,H4406,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.09,程序设计,4.0,杨帆,副教授,50,H计算中心3楼3号机房,五 8-9 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.10,程序设计,4.0,郑达安,讲师,55,H4401,四 6-8 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
COMP120006.10,程序设计,4.0,郑达安,讲师,55,H计算中心3楼2号机房,五 6-7 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",15 技术科学试验班\r\n\
INFO120003.01,数字逻辑基础,4.0,尹建君,讲师,80,H4406,一 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","14 生物医学工程\r\n\
14 电子信息科学与技术"\r\n\
INFO120003.01,数字逻辑基础,4.0,尹建君,讲师,80,H4406,三 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","14 生物医学工程\r\n\
14 电子信息科学与技术"\r\n\
INFO120003.02,数字逻辑基础,4.0,范益波,副教授,60,Z2102,一 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 微电子科学与工程\r\n\
INFO120003.02,数字逻辑基础,4.0,范益波,副教授,60,Z2102,三 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 微电子科学与工程\r\n\
INFO120003.03,数字逻辑基础,4.0,解玉凤,讲师,60,H3201,一 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","14 电气工程及其自动化\r\n\
14 核工程与核技术"\r\n\
INFO120003.03,数字逻辑基础,4.0,解玉凤,讲师,60,H3201,三 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","14 电气工程及其自动化\r\n\
14 核工程与核技术"\r\n\
INFO120003.04,数字逻辑基础,4.0,徐丰,研究员,60,H4401,一 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","14 光电信息科学与工程\r\n\
14 通信工程"\r\n\
INFO120003.04,数字逻辑基础,4.0,徐丰,研究员,60,H4401,三 3-4 ,校精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","14 光电信息科学与工程\r\n\
14 通信工程"\r\n\
INFO120003.05,数字逻辑基础,4.0,易婷,副教授,22,H2102B,二 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 电子信息科学类(卓越工程师班)\r\n\
INFO120003.05,数字逻辑基础,4.0,易婷,副教授,22,H2102B,四 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 电子信息科学类(卓越工程师班)\r\n\
INFO120010.01,数字逻辑基础实验,0.0,孔庆生,副教授,37,H物理327,二 1-2 ,,"考试日期：\r\n\
\r\n\
考试时间：-","14 生物医学工程\r\n\
14 电子信息科学与技术"\r\n\
INFO120010.02,数字逻辑基础实验,0.0,赵燕,高级实验师,28,H物理327,三 1-2 ,,"考试日期：\r\n\
\r\n\
考试时间：-",14 电气工程及其自动化\r\n\
INFO120010.03,数字逻辑基础实验,0.0,郭翌,工程师,37,H物理537,四 3-4 ,,"考试日期：\r\n\
\r\n\
考试时间：-",14 通信工程\r\n\
INFO120010.04,数字逻辑基础实验,0.0,马煜,讲师,40,H物理537,四 8-9 ,,"考试日期：\r\n\
\r\n\
考试时间：-",14 电子信息科学与技术\r\n\
INFO120010.05,数字逻辑基础实验,0.0,赵燕,高级实验师,44,H物理537,五 6-7 ,,"考试日期：\r\n\
\r\n\
考试时间：-","14 光电信息科学与工程\r\n\
14 核工程与核技术"\r\n\
INFO120010.06,数字逻辑基础实验,0.0,"陶新萱\r\n\
秦亚杰","工程师\r\n\
讲师",60,Z计算机学院机房(2),三 8-9 ,,"考试日期：\r\n\
\r\n\
考试时间：-",14 微电子科学与工程\r\n\
INFO120010.07,数字逻辑基础实验,0.0,孔庆生,副教授,22,H物理五楼,五 3-4 ,,"考试日期：\r\n\
\r\n\
考试时间：-",14 电子信息科学类(卓越工程师班)\r\n\
INFO130001.01,概率、数理统计与随机过程,3.0,王斌,教授,80,H4403,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 电子信息科学与技术\r\n\
14 生物医学工程"\r\n\
INFO130001.02,概率、数理统计与随机过程,3.0,荆明娥,副研究员,60,Z2202,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00",14 微电子科学与工程\r\n\
INFO130001.03,概率、数理统计与随机过程,3.0,朱晓松,副教授,38,H3105,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 通信工程\r\n\
INFO130002.01,工程数学,4.0,王建军,副教授,80,H3408,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00","14 电子信息科学与技术\r\n\
14 生物医学工程"\r\n\
INFO130002.01,工程数学,4.0,王建军,副教授,80,H3408,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00","14 电子信息科学与技术\r\n\
14 生物医学工程"\r\n\
INFO130002.02,工程数学,4.0,黄大鸣,教授,30,Z2103,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:30",14 微电子科学与工程\r\n\
INFO130002.02,工程数学,4.0,黄大鸣,教授,30,Z2103,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:30",14 微电子科学与工程\r\n\
INFO130002.03,工程数学,4.0,江安全,研究员,30,Z2211,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:30",14 微电子科学与工程\r\n\
INFO130002.03,工程数学,4.0,江安全,研究员,30,Z2211,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:30",14 微电子科学与工程\r\n\
INFO130002.04,工程数学,4.0,蒋耿明,副教授,38,HGX305,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 通信工程\r\n\
INFO130002.04,工程数学,4.0,蒋耿明,副教授,38,HGX305,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 通信工程\r\n\
INFO130002.05,工程数学,4.0,郑玉祥,教授,20,H3205,一 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 光电信息科学与工程\r\n\
INFO130002.05,工程数学,4.0,郑玉祥,教授,20,H3205,四 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 光电信息科学与工程\r\n\
INFO130002.06,工程数学,4.0,刘鹏,副教授,22,H3404,一 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 电子信息科学类(卓越工程师班)\r\n\
INFO130002.06,工程数学,4.0,刘鹏,副教授,22,H3404,三 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 电子信息科学类(卓越工程师班)\r\n\
INFO130006.01,模拟与数字电路实验(下),3.0,"徐峰\r\n\
周锋","工程师\r\n\
副教授",46,H物理五楼,一 6-9 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:00","13 电子信息科学与技术\r\n\
13 生物医学工程"\r\n\
INFO130006.02,模拟与数字电路实验(下),3.0,王勇,副教授,48,H物理五楼,三 1-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:00",13 通信工程\r\n\
INFO130006.03,模拟与数字电路实验(下),3.0,"童立青\r\n\
孔庆生","讲师\r\n\
副教授",50,H物理五楼,四 6-9 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:00",13 电子信息科学与技术\r\n\
INFO130006.04,模拟与数字电路实验(下),3.0,王勇,副教授,20,H物理五楼,五 1-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:00",13 微电子科学与工程\r\n\
INFO130006.05,模拟与数字电路实验(下),3.0,"崔旭高\r\n\
孔庆生","副教授\r\n\
副教授",47,H物理五楼,五 6-9 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:00",13 微电子科学与工程\r\n\
INFO130010.01,数字信号处理A,3.0,吴晓峰,,95,H4103,五 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30","13 生物医学工程\r\n\
13 电子信息科学与技术"\r\n\
INFO130010.02,数字信号处理A,3.0,程旭,助理研究员,70,Z2102,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:30",13 微电子科学与工程\r\n\
INFO130010.03,数字信号处理A,3.0,迟楠,教授,50,HGX305,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 通信工程\r\n\
INFO130013.01,近代无线电实验(下),3.0,陆起涌,主任技师,85,H物理楼,二 1-4 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 电子信息科学与技术\r\n\
INFO130014.01,自动控制原理,3.0,陈雄,副教授,85,H4104,一 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",12 电子信息科学与技术\r\n\
INFO130015.01,生产实习,1.0,赵燕,高级实验师,95,H物理楼,一 11-11 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","12 电子信息科学与技术\r\n\
12 生物医学工程"\r\n\
INFO130015.02,生产实习,1.0,陈_,副教授,73,H物理楼1楼,一 14-14 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 微电子学\r\n\
INFO130015.03,生产实习,1.0,付海洋,讲师,48,H物理楼,一 14-14 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 通信工程\r\n\
INFO130015.04,生产实习,1.0,张荣君,研究员,28,H物理121,一 14-14 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 光信息科学与技术\r\n\
INFO130015.05,生产实习,1.0,葛爱明,副教授,37,H物理楼 414,一 14-14 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 电气工程及其自动化\r\n\
INFO130019.01,生物医学工程专业实验(下),3.0,周国辉,讲师,20,H物理楼5楼信息学院机房,三 6-9 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物医学工程\r\n\
INFO130020.01,生物医学工程学基础,3.0,邬小玫,教授,20,H2102A,一 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",12 生物医学工程\r\n\
INFO130023.01,半导体器件原理,4.0,蒋玉龙,教授,23,Z2209B,一 6-7 ,校精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 微电子科学与工程\r\n\
INFO130023.01,半导体器件原理,4.0,蒋玉龙,教授,23,Z2209B,三 3-4 ,校精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 微电子科学与工程\r\n\
INFO130023.02,半导体器件原理,4.0,茹国平,教授,23,Z2310B,一 6-7 ,校精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 微电子科学与工程\r\n\
INFO130023.02,半导体器件原理,4.0,茹国平,教授,23,Z2310B,三 3-4 ,校精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 微电子科学与工程\r\n\
INFO130023.03,半导体器件原理,4.0,仇志军,副教授,23,Z2103,一 6-7 ,校精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 微电子科学与工程\r\n\
INFO130023.03,半导体器件原理,4.0,仇志军,副教授,23,Z2103,三 3-4 ,校精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",13 微电子科学与工程\r\n\
INFO130025.01,模拟集成电路设计原理,3.0,许俊,副教授,37,Z2209B,四 2-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：09:00-11:00",12 微电子学\r\n\
INFO130025.02,模拟集成电路设计原理,3.0,唐长文,教授,37,Z2310B,四 2-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：09:00-11:00",12 微电子学\r\n\
INFO130026.01,数字集成电路设计原理,3.0,任俊彦,教授,37,Z2212,二 2-4 ,校精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:30-15:30",12 微电子学\r\n\
INFO130026.02,数字集成电路设计原理,3.0,叶凡,副研究员,37,Z2209B,二 2-4 ,校精品课程,"考试日期：2015-12-31\r\n\
考试时间：13:30-15:30",12 微电子学\r\n\
INFO130027.01,集成电路实验(上),3.0,胡春凤,工程师,24,H物理四楼,三 1-4 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 微电子学\r\n\
INFO130027.02,集成电路实验(上),3.0,胡春凤,工程师,24,H物理四楼,三 6-9 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 微电子学\r\n\
INFO130027.03,集成电路实验(上),3.0,胡春凤,工程师,24,H物理四楼,四 6-9 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 微电子学\r\n\
INFO130031.01,计算机通信与网络,3.0,任久春,讲师,50,HGX306,五 3-5 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 通信工程\r\n\
INFO130033.01,电信网络基础,2.0,钱松荣,教授,48,H3305,一 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",12 通信工程\r\n\
INFO130038.01,计算机体系结构,3.0,钱松荣,教授,30,H2217,二 3-5 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:55",12 通信工程\r\n\
INFO130042.01,固体物理,4.0,张宗芝,教授,20,H3304,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 光电信息科学与工程\r\n\
INFO130042.01,固体物理,4.0,张宗芝,教授,20,H3304,四 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 光电信息科学与工程\r\n\
INFO130044.01,激光原理与技术,3.0,朱鹤元,教授,20,H3404,四 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 光电信息科学与工程\r\n\
INFO130046.01,光子学器件与工艺,2.0,张荣君,研究员,28,HGX402,四 6-7 ,校精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",12 光信息科学与技术\r\n\
INFO130047.01,专业实验,3.0,吴嘉达,教授,28,H光学楼地下室,三 6-8 ,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:30",12 光信息科学与技术\r\n\
INFO130071.01,电工实验,2.0,汪兴轩,副教授,30,H光学楼408室,四 6-9 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 电子信息科学与技术\r\n\
14 生物医学工程"\r\n\
INFO130071.02,电工实验,2.0,汪兴轩,副教授,30,H光学楼408室,五 6-9 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 生物医学工程\r\n\
14 电子信息科学与技术"\r\n\
INFO130077.01,计算机网络,2.0,陆起涌,主任技师,50,H3305,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10","12 电子信息科学与技术\r\n\
12 生物医学工程"\r\n\
INFO130079.01,科技英语,2.0,徐跃东,青年副研究员,50,H3105,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10","13 生物医学工程\r\n\
13 电子信息科学与技术"\r\n\
INFO130079.02,科技英语,2.0,虞惠华,副教授,55,Z2102,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",13 微电子科学与工程\r\n\
INFO130079.03,科技英语,2.0,缪健,讲师,50,H3204,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",13 通信工程\r\n\
INFO130080.01,可编程器件与硬件描述语言,2.0,李旦,讲师,80,H4206,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10","13 通信工程\r\n\
13 电子信息科学与技术\r\n\
13 生物医学工程"\r\n\
INFO130084.01,网络工程规划与设计,2.0,朱谦,高级实验师,70,H3106,四 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 电子信息科学与技术\r\n\
12 生物医学工程\r\n\
12 通信工程"\r\n\
INFO130090.01,医学成象技术,2.0,郭翌,工程师,45,H4306,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35","13 电子信息科学与技术\r\n\
13 生物医学工程"\r\n\
INFO130091.01,医学传感器,2.0,陈国平,副研究员,45,H4203,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35","13 生物医学工程\r\n\
13 电子信息科学与技术"\r\n\
INFO130095.01,专用集成电路设计方法实验,2.0,李文宏,副教授,40,Z行政楼313机房,一 6-8 ,上课地点：张江校区行政楼313机房,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:30",12 微电子学\r\n\
INFO130098.01,Perl语言入门和提高,2.0,周晓方,高级工程师,75,HGX210,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35","13 微电子科学与工程\r\n\
13 电子信息科学与技术\r\n\
13 生物医学工程\r\n\
13 通信工程"\r\n\
INFO130102.01,近代物理基础,2.0,胡光喜,副研究员,60,Z2202,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",14 微电子科学与工程\r\n\
INFO130103.01,半导体材料,2.0,陈琳,副研究员,35,Z2203,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",13 微电子科学与工程\r\n\
INFO130104.01,深亚微米工艺技术,2.0,丁士进,研究员,40,Z2211,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 微电子学\r\n\
INFO130105.01,传感器原理及应用,2.0,陈国平,副研究员,40,Z2103,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",12 微电子学\r\n\
INFO130106.01,微电子机械系统应用,2.0,纪新明,副教授,40,Z2212,五 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 微电子学\r\n\
INFO130108.01,薄膜物理与技术,2.0,周鹏,教授,30,Z2211,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 微电子学\r\n\
INFO130109.01,电子材料薄膜测试表征方法,2.0,卢红亮,教授,35,Z2103,一 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 微电子科学与工程\r\n\
INFO130112.01,半导体光电子器件,2.0,茹国平,教授,40,Z2103,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35",13 微电子科学与工程\r\n\
INFO130114.01,射频微电子学概论,2.0,闫娜,副教授,30,Z2206,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 微电子科学与工程\r\n\
INFO130118.01,通信系统实验(下),3.0,朱谦,高级实验师,23,H物理118,四 6-8 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 通信工程\r\n\
INFO130118.02,通信系统实验(下),3.0,任久春,讲师,23,H物理118,三 6-8 ,实验报告,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 通信工程\r\n\
INFO130119.01,操作系统B,2.0,周强,讲师,35,H3305,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:30",13 通信工程\r\n\
INFO130122.01,网络协议与网络安全基础,2.0,凌力,副教授,30,H3404,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",12 通信工程\r\n\
INFO130131.01,光通信网络基础,2.0,缪健,讲师,70,H4303,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10","12 通信工程\r\n\
12 光信息科学与技术\r\n\
12 生物医学工程\r\n\
12 电子信息科学与技术"\r\n\
INFO130137.01,卫星与移动通信B,2.0,陈晓光,副教授,60,H3305,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35","12 生物医学工程\r\n\
12 电子信息科学与技术\r\n\
12 通信工程"\r\n\
INFO130140.01,信息论基础,2.0,马煜,讲师,50,H3104,二 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","13 电子信息科学与技术\r\n\
13 生物医学工程"\r\n\
INFO130140.02,信息论基础,2.0,尹建君,讲师,50,HGX502,二 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","13 电子信息科学与技术\r\n\
13 生物医学工程"\r\n\
INFO130140.03,信息论基础,2.0,周小林,副教授,50,H3105,二 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:00",13 通信工程\r\n\
INFO130141.01,遥感原理与技术,2.0,付海洋,讲师,35,H2208,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",12 通信工程\r\n\
INFO130145.01,光生物医学,2.0,糜岚,副教授,18,H3304,五 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 光电信息科学与工程\r\n\
INFO130146.01,集成光学,2.0,吴翔,研究员,25,H2205,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 光信息科学与技术\r\n\
INFO130147.01,微机原理和接口技术B,4.0,李旦,讲师,40,H3305,二 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10","13 光电信息科学与工程\r\n\
13 电气工程及其自动化"\r\n\
INFO130147.01,微机原理和接口技术B,4.0,李旦,讲师,40,H3305,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10","13 光电信息科学与工程\r\n\
13 电气工程及其自动化"\r\n\
INFO130233.01,微机原理与接口技术,3.0,杨翠微,副教授,40,H3204,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:30","13 通信工程\r\n\
13 微电子科学与工程\r\n\
13 生物医学工程\r\n\
13 电子信息科学与技术"\r\n\
INFO130234.01,工程图学及应用,2.0,赵燕,高级实验师,40,H3405,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","14 生物医学工程\r\n\
14 电子信息科学与技术"\r\n\
INFO130235.01,DSP芯片原理与应用,2.0,杨涛,副教授,20,H物理四楼,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 生物医学工程\r\n\
12 电子信息科学与技术"\r\n\
INFO130237.01,光学,4.0,费义艳,副研究员,20,H3404,二 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 光电信息科学与工程\r\n\
INFO130237.01,光学,4.0,费义艳,副研究员,20,H3404,五 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 光电信息科学与工程\r\n\
INFO130252.01,灯具设计,3.0,徐蔚,讲师,30,H3104,三 6-8 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:30",12 电气工程及其自动化\r\n\
INFO130253.01,电力电子学,3.0,刘克富,教授,38,H3304,四 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 电气工程及其自动化\r\n\
INFO130257.01,射频微波测试基础,2.0,李巍,研究员,30,Z2209B,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35",12 微电子学\r\n\
INFO130261.01,激光工程,2.0,沈德元,研究员,25,H2107,四 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 光信息科学与技术\r\n\
INFO130262.01,电子学方法实验,2.0,徐峰,工程师,20,H物理五楼,四 6-9 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:30",13 物理学\r\n\
INFO130267.01,真空与薄膜技术基础,2.0,崔旭高,副教授,30,H3305,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",13 电气工程及其自动化\r\n\
INFO130269.01,有机微电子技术,2.0,詹义强,副研究员,30,Z2211,一 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 微电子科学与工程\r\n\
INFO130273.01,光学和光电子测量,3.0,孙剑,副教授,20,H3304,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 光电信息科学与工程\r\n\
INFO130276.01,MATLAB编程及其仿真,2.0,何晓颖,副研究员,18,HGX201,二 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 光电信息科学与工程\r\n\
INFO130280.01,光学薄膜设计导论,2.0,李晶,教授,18,H2102A,四 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 光电信息科学与工程\r\n\
INFO130281.01,模拟电子线路,2.0,张建秋,教授,80,H3101,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","14 电子信息科学与技术\r\n\
14 生物医学工程"\r\n\
INFO130281.02,模拟电子线路,2.0,尹建君,讲师,20,HGX402,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","14 生物医学工程\r\n\
14 通信工程\r\n\
14 电子信息科学与技术"\r\n\
INFO130281.03,模拟电子线路,2.0,孔庆生,副教授,60,H4305,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","14 通信工程\r\n\
14 电气工程及其自动化"\r\n\
INFO130281.04,模拟电子线路,2.0,黄煜梅,副教授,60,Z2102,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 微电子科学与工程\r\n\
INFO130286.01,工程数学,3.0,刘洋,讲师,28,H3205,四 6-8 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 电气工程及其自动化\r\n\
INFO130287.01,应用光学,3.0,葛爱明,副教授,28,H3405,二 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 电气工程及其自动化\r\n\
INFO130293.01,应用电磁学基础,2.0,梁荣庆,教授,38,HGX401,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 电气工程及其自动化\r\n\
INFO130294.01,数字控制理论与应用,3.0,周小丽,副教授,38,H4301,三 6-8 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30",13 电气工程及其自动化\r\n\
INFO130295.01,光源原理,3.0,张善端,研究员,38,HGX306,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 电气工程及其自动化\r\n\
INFO130295.01,光源原理,3.0,张善端,研究员,38,HGX306,四 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 电气工程及其自动化\r\n\
INFO130299.01,照明设计,3.0,袁樵,副教授,37,H4206,五 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",12 电气工程及其自动化\r\n\
INFO130300.01,LED器件及应用技术,2.0,刘木清,教授,37,H3304,三 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:30-15:00",12 电气工程及其自动化\r\n\
INFO130302.01,概率、数理统计与随机过程,4.0,余锦华,副研究员,22,H2102B,二 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 电子信息科学类(卓越工程师班)\r\n\
INFO130302.01,概率、数理统计与随机过程,4.0,余锦华,副研究员,22,H2102B,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 电子信息科学类(卓越工程师班)\r\n\
INFO130303.01,模拟电子线路,5.0,唐长文,教授,22,H3405,一 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 电子信息科学类(卓越工程师班)\r\n\
INFO130303.01,模拟电子线路,5.0,唐长文,教授,22,H3405,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 电子信息科学类(卓越工程师班)\r\n\
INFO130309.01,数字信号处理,4.0,杨涛,副教授,17,HGX503,三 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 电子信息科学类(卓越工程师班)\r\n\
INFO130309.01,数字信号处理,4.0,杨涛,副教授,17,HGX503,五 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 电子信息科学类(卓越工程师班)\r\n\
INFO130313.01,通信原理,4.0,朱宇,副教授,10,H4408,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 电子信息科学类(卓越工程师班)\r\n\
INFO130313.01,通信原理,4.0,朱宇,副教授,10,H4408,四 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 电子信息科学类(卓越工程师班)\r\n\
INFO130317.01,生物医学工程学基础,4.0,邬小玫,教授,1,H院系自主,一 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 电子信息科学类(卓越工程师班)\r\n\
INFO130319.01,集成电路工艺,4.0,"仇志军\r\n\
胡春凤","副教授\r\n\
工程师",10,H2102A,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 电子信息科学类(卓越工程师班)\r\n\
INFO130319.01,集成电路工艺,4.0,"仇志军\r\n\
胡春凤","副教授\r\n\
工程师",10,H2102A,四 6-7 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 电子信息科学类(卓越工程师班)\r\n\
TFSY118006.01,人体信息建模与计算机仿真,2.0,汪源源,教授,8,H物理503,五 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",15 技术科学试验班\r\n\
MATH120016.10,数学分析BI,5.0,谢锡麟,副教授,60,HGX510,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
MATH120016.10,数学分析BI,5.0,谢锡麟,副教授,60,HGX510,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 技术科学试验班\r\n\
,,,,,,,五 1-2 ,,,\r\n\
MECH130001.01,工程数学,3.0,祖迎庆,副研究员,35,HGX206,四 6-8 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 理论与应用力学\r\n\
MECH130005.01,理论力学(上),3.0,杨永明,副教授,65,HGX105,三 1-2,周五12节单周上,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 力学与工程科学系\r\n\
MECH130005.01,理论力学(上),3.0,杨永明,副教授,65,HGX105,"五 1-2\r\n\
(单周)",周五12节单周上,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 力学与工程科学系\r\n\
MECH130008.01,弹性力学,4.0,丁淑蓉,副教授,35,HGX405,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 理论与应用力学\r\n\
MECH130008.01,弹性力学,4.0,丁淑蓉,副教授,35,HGX405,三 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 理论与应用力学\r\n\
MECH130009.01,流体力学I,4.0,姚伟,教授,35,HGX305,一 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 理论与应用力学\r\n\
MECH130009.01,流体力学I,4.0,姚伟,教授,35,HGX305,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 理论与应用力学\r\n\
MECH130010.01,振动基础,4.0,王皓,副教授,35,HGX406,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 理论与应用力学\r\n\
MECH130010.01,振动基础,4.0,王皓,副教授,35,HGX406,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 理论与应用力学\r\n\
MECH130011.01,材料力学实验,1.0,刘琰玲,工程师,35,,五 6-6 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 理论与应用力学\r\n\
MECH130019.01,生产实习、实践,1.0,张迪,副教授,65,,六 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 力学与工程科学系\r\n\
MECH130022.01,微分方程,3.0,曹博超,讲师,30,HGX203,一 1-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 飞行器设计与工程\r\n\
MECH130025.01,结构振动基础,3.0,唐国安,教授,30,HGX403,三 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 飞行器设计与工程\r\n\
MECH130030.01,自动控制原理,2.0,艾剑良,教授,30,HGX302,四 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 飞行器设计与工程\r\n\
MECH130031.01,CAD与工程图学基础A,3.0,沈涛虹,工程师,65,HGX403,五 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 力学与工程科学系\r\n\
MECH130033.01,工程材料,1.0,马建敏,教授,30,HGX502,"一 3-4\r\n\
(1-9周)",,"考试日期：2015-11-02\r\n\
\r\n\
考试时间：09:55-11:35",13 飞行器设计与工程\r\n\
MECH130036.01,流体力学实验Ⅱ,2.0,郭明_,讲师,35,HGX206,一 6-7 ,,"考试日期：论文,2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",12 理论与应用力学\r\n\
MECH130038.01,固体力学实验,2.0,刘琰玲,工程师,35,H院系自主,三 6-7 ,,"考试日期：论文,2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",12 理论与应用力学\r\n\
MECH130042.01,结构动力学实验,2.0,崔升,副教授,35,HGX205,五 6-7 ,,"考试日期：其他,2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",12 理论与应用力学\r\n\
MECH130045.01,生物医学工程概论,2.0,王盛章,副教授,40,H3204,五 8-9 ,,"考试日期：2015-12-25\r\n\
考试时间：15:25-17:05","12 力学与工程科学系\r\n\
13 力学与工程科学系"\r\n\
MECH130046.01,优化设计,2.0,陈力奋,副教授,40,HGX502,一 8-9 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:25-17:05","13 力学与工程科学系\r\n\
12 力学与工程科学系"\r\n\
MECH130059.01,交通流体力学,2.0,吴正,副教授,30,HGX210,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",13 理论与应用力学\r\n\
MECH130060.01,数字信号处理,2.0,郭明_,讲师,30,HGX301,四 3-4 ,,"考试日期：论文,2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",13 理论与应用力学\r\n\
MECH130065.01,飞行器总体设计,3.0,孙刚,教授,30,HGX402,二 3-5 ,考试包括两部分,最后一节课的随堂考试一节课和大作业,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35",12 飞行器设计与工程\r\n\
MECH130066.01,飞行器结构分析与设计,3.0,华诚,副研究员,30,HGX404,五 3-5 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",12 飞行器设计与工程\r\n\
MECH130072.01,气动力动态测试技术,2.0,郭明_,讲师,30,H院系自主,四 6-7 ,,"考试日期：论文,2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",13 飞行器设计与工程\r\n\
MECH130090.01,断裂损伤,2.0,华诚,副研究员,40,HGX501,五 8-9 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：15:25-17:05","12 力学与工程科学系\r\n\
13 力学与工程科学系"\r\n\
MECH130092.01,工程热力学,2.0,黄骏,副研究员,40,HGX401,四 8-9 ,全英语课程,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:25-17:05","12 力学与工程科学系\r\n\
13 力学与工程科学系"\r\n\
MECH130093.01,张量分析与微分几何基础,2.0,谢锡麟,副教授,40,HGX510,一 8-9 ,校级精品课程,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30","13 力学与工程科学系\r\n\
12 力学与工程科学系"\r\n\
MECH130094.01,计算流体力学,2.0,田振夫,教授,40,HGX205,四 8-9 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:25-17:05","13 力学与工程科学系\r\n\
12 力学与工程科学系"\r\n\
MECH130095.01,基于Matlab的工程分析,2.0,崔升,副教授,40,HGX306,三 8-9 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：15:25-17:05","13 力学与工程科学系\r\n\
12 力学与工程科学系"\r\n\
MECH130096.01,计算方法,2.0,杨永明,副教授,30,HGX401,四 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 飞行器设计与工程\r\n\
MECH130097.01,工程固体力学,3.0,倪玉山,教授,30,HGX405,五 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 飞行器设计与工程\r\n\
MECH130100.01,金工实习,1.0,"马建敏\r\n\
徐建明\r\n\
王和庆","教授\r\n\
实验员\r\n\
助理工程师",65,,六 3-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 力学与工程科学系\r\n\
MECH130100.02,金工实习,1.0,"马建敏\r\n\
徐建明\r\n\
王和庆","教授\r\n\
实验员\r\n\
助理工程师",47,,六 1-2 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 核工程与核技术\r\n\
MECH130107.01,常微分方程,3.0,崔升,副教授,35,HGX406,一 1-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 理论与应用力学\r\n\
MECH130110.01,流形上的微积分,2.0,谢锡麟,副教授,40,HGX510,三 8-9 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：13:00-15:00","13 力学与工程科学系\r\n\
12 力学与工程科学系"\r\n\
MECH130111.01,空气动力学,3.0,杨爱明,副教授,30,HGX401,二 3-5 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 飞行器设计与工程\r\n\
MECH130113.01,数学分析选讲,2.0,霍永忠,教授,35,HGX302,二 3-4 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",14 理论与应用力学\r\n\
MECH130114.01,高等代数与解析几何,4.0,陈力奋,副教授,65,HGX203,一 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 力学与工程科学系\r\n\
MECH130114.01,高等代数与解析几何,4.0,陈力奋,副教授,65,HGX203,四 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 力学与工程科学系\r\n\
BIOL120002.01,现代生物科学导论A,3.0,姚纪花,副教授,60,HGX303,一 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.02,现代生物科学导论A,3.0,"明凤\r\n\
陈红岩","副教授\r\n\
副教授",60,HGX306,一 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.03,现代生物科学导论A,3.0,"张鹭\r\n\
倪挺","讲师\r\n\
研究员",60,HGX204,一 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.04,现代生物科学导论A,3.0,蔡亮,研究员,60,HGX203,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.05,现代生物科学导论A,3.0,"南蓬\r\n\
朱炎","副教授\r\n\
副教授",60,HGX303,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.06,现代生物科学导论A,3.0,"明凤\r\n\
黄青山","副教授\r\n\
副教授",60,HGX304,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.07,现代生物科学导论A,3.0,"王玉国\r\n\
黄青山","副教授\r\n\
副教授",60,HGX305,五 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.08,现代生物科学导论A,3.0,"南蓬\r\n\
朱炎","副教授\r\n\
副教授",60,HGX404,五 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120002.09,现代生物科学导论A,3.0,"陈红岩\r\n\
张鹭","副教授\r\n\
讲师",60,HGX210,五 6-8 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 自然科学试验班\r\n\
BIOL120004.01,现代生物科学导论C,2.0,"王久存\r\n\
阮文婕","教授\r\n\
讲师",60,HGX309,三 3-4 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 护理学院\r\n\
15 药学院\r\n\
15 临床医学(八年制)"\r\n\
BIOL120004.02,现代生物科学导论C,2.0,"常芳\r\n\
季朝能","副教授\r\n\
教授",60,HGX310,三 3-4 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 护理学院\r\n\
15 临床医学(八年制)\r\n\
15 药学院"\r\n\
BIOL120004.03,现代生物科学导论C,2.0,"杨亚军\r\n\
杨金水","高级工程师\r\n\
教授",60,HGX409,三 3-4 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 药学院\r\n\
15 临床医学(八年制)\r\n\
15 护理学院"\r\n\
BIOL120004.04,现代生物科学导论C,2.0,姚纪花,副教授,60,HGX410,三 3-4 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 护理学院\r\n\
15 药学院\r\n\
15 临床医学(八年制)"\r\n\
BIOL120004.05,现代生物科学导论C,2.0,"王玉国\r\n\
卢大儒","副教授\r\n\
教授",60,HGX509,三 3-4 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 护理学院\r\n\
15 临床医学(八年制)\r\n\
15 药学院"\r\n\
BIOL120004.06,现代生物科学导论C,2.0,杨鲜梅,副教授,60,H3101,三 3-4 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 护理学院\r\n\
15 药学院\r\n\
15 临床医学(八年制)"\r\n\
BIOL120004.07,现代生物科学导论C,2.0,"王久存\r\n\
阮文婕","教授\r\n\
讲师",60,HGX306,四 6-7 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 二军大委培生\r\n\
BIOL120004.08,现代生物科学导论C,2.0,"常芳\r\n\
季朝能","副教授\r\n\
教授",60,HGX304,一 6-7 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 预防医学\r\n\
15 预防医学(武警班)"\r\n\
BIOL120004.09,现代生物科学导论C,2.0,"杨亚军\r\n\
杨金水","高级工程师\r\n\
教授",60,H4106,一 6-7 ,上海市精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 预防医学\r\n\
15 预防医学(武警班)"\r\n\
BIOL120004.10,现代生物科学导论C,2.0,杨鲜梅,副教授,40,HGD405,一 6-7 ,"上海市精品课程团队\r\n\
全英语课程","考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",15 临床医学(六年制)\r\n\
BIOL120005.01,现代生物科学实验,1.0,"王英明\r\n\
吴纪华\r\n\
宋志平\r\n\
傅萃长\r\n\
郭滨\r\n\
皮妍\r\n\
吴燕华\r\n\
梅其春\r\n\
尹隽\r\n\
乔守怡\r\n\
陆红\r\n\
曹洋","讲师\r\n\
教授\r\n\
教授\r\n\
教授\r\n\
讲师\r\n\
讲师\r\n\
副教授\r\n\
副教授\r\n\
讲师\r\n\
教授\r\n\
副教授\r\n\
讲师",84,H立人生物楼,"一 6-\r\n\
9(1-16周单周)",选修本时段学生请同时选普通化学实验I周一6-9（双周）,"考试日期：其他\r\n\
\r\n\
考试时间：-",15 自然科学试验班\r\n\
BIOL120005.02,现代生物科学实验,1.0,"王英明\r\n\
吴纪华\r\n\
宋志平\r\n\
傅萃长\r\n\
郭滨\r\n\
皮妍\r\n\
吴燕华\r\n\
梅其春\r\n\
尹隽\r\n\
乔守怡\r\n\
陆红\r\n\
曹洋","讲师\r\n\
教授\r\n\
教授\r\n\
教授\r\n\
讲师\r\n\
讲师\r\n\
副教授\r\n\
副教授\r\n\
讲师\r\n\
教授\r\n\
副教授\r\n\
讲师",84,H立人生物楼,"一 6-9\r\n\
(2-16周双周)",选修本时段学生请同时选普通化学实验I周一 6-9（单周）,"考试日期：其他\r\n\
\r\n\
考试时间：-",15 自然科学试验班\r\n\
BIOL120005.03,现代生物科学实验,1.0,"王英明\r\n\
吴纪华\r\n\
宋志平\r\n\
傅萃长\r\n\
郭滨\r\n\
皮妍\r\n\
吴燕华\r\n\
梅其春\r\n\
尹隽\r\n\
乔守怡\r\n\
陆红\r\n\
曹洋","讲师\r\n\
教授\r\n\
教授\r\n\
教授\r\n\
讲师\r\n\
讲师\r\n\
副教授\r\n\
副教授\r\n\
讲师\r\n\
教授\r\n\
副教授\r\n\
讲师",84,H立人生物楼,"四 6-9\r\n\
(1-16周单周)",选修本时段学生请同时选普通化学实验I周四 6-9（双周）,"考试日期：其他\r\n\
\r\n\
考试时间：-",15 自然科学试验班\r\n\
BIOL120005.04,现代生物科学实验,1.0,"王英明\r\n\
吴纪华\r\n\
宋志平\r\n\
傅萃长\r\n\
郭滨\r\n\
皮妍\r\n\
吴燕华\r\n\
梅其春\r\n\
尹隽\r\n\
乔守怡\r\n\
陆红\r\n\
曹洋","讲师\r\n\
教授\r\n\
教授\r\n\
教授\r\n\
讲师\r\n\
讲师\r\n\
副教授\r\n\
副教授\r\n\
讲师\r\n\
教授\r\n\
副教授\r\n\
讲师",84,H立人生物楼,"四 6-9\r\n\
(2-16周双周)",选修本时段学生请同时选普通化学实验I周四 6-9（单周）,"考试日期：其他\r\n\
\r\n\
考试时间：-",15 自然科学试验班\r\n\
BIOL120005.05,现代生物科学实验,1.0,"王英明\r\n\
吴纪华\r\n\
宋志平\r\n\
傅萃长\r\n\
郭滨\r\n\
皮妍\r\n\
吴燕华\r\n\
梅其春\r\n\
尹隽\r\n\
乔守怡\r\n\
陆红\r\n\
曹洋","讲师\r\n\
教授\r\n\
教授\r\n\
教授\r\n\
讲师\r\n\
讲师\r\n\
副教授\r\n\
副教授\r\n\
讲师\r\n\
教授\r\n\
副教授\r\n\
讲师",84,H立人生物楼,"五 6-9\r\n\
(1-16周单周)",选修本时段学生请同时选普通化学实验I周五 6-9（双周）,"考试日期：其他\r\n\
\r\n\
考试时间：-",15 自然科学试验班\r\n\
BIOL120005.06,现代生物科学实验,1.0,"王英明\r\n\
吴纪华\r\n\
宋志平\r\n\
傅萃长\r\n\
郭滨\r\n\
皮妍\r\n\
吴燕华\r\n\
梅其春\r\n\
尹隽\r\n\
乔守怡\r\n\
陆红\r\n\
曹洋","讲师\r\n\
教授\r\n\
教授\r\n\
教授\r\n\
讲师\r\n\
讲师\r\n\
副教授\r\n\
副教授\r\n\
讲师\r\n\
教授\r\n\
副教授\r\n\
讲师",84,H立人生物楼,"五 6-9\r\n\
(2-16周双周)",选修本时段学生请同时选普通化学实验I周五 6-9（单周）,"考试日期：其他\r\n\
\r\n\
考试时间：-",15 自然科学试验班\r\n\
BIOL130003.01,动物学,2.0,"马志军\r\n\
傅萃长\r\n\
殷明波","教授\r\n\
教授\r\n\
副研究员",100,H3406,一 3-4 ,校级精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 生物科学\r\n\
BIOL130004.01,动物学实验,1.5,吴纪华,教授,55,,一 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 生态学\r\n\
14 生物科学"\r\n\
BIOL130004.02,动物学实验,1.5,吴纪华,教授,55,,一 11-13 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 生物科学\r\n\
14 生态学"\r\n\
BIOL130005.01,生物化学A(上),3.0,王维荣,讲师,40,H3404,一 6-8 ,上海市精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 生物技术\r\n\
BIOL130006.01,生物化学A(下),3.0,杨青,教授,30,H2111,二 3-5 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 生物科学\r\n\
BIOL130006.02,生物化学A(下),3.0,俞瑜,讲师,30,H5308,三 3-5 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 生物科学\r\n\
BIOL130006.03,生物化学A(下),3.0,王维荣,讲师,30,H2208,四 1-3 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 生物科学\r\n\
BIOL130010.01,微生物学,3.0,刘明秋,副教授,40,HGX205,二 3-5 ,校级精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 生命科学学院\r\n\
BIOL130010.02,微生物学,3.0,丁晓明,副教授,40,H5115,三 3-5 ,校级精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 生命科学学院\r\n\
BIOL130010.03,微生物学,3.0,丁晓明,副教授,40,H2110,四 3-5 ,校级精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 生命科学学院\r\n\
BIOL130011.01,微生物学实验,1.5,王英明,讲师,24,H立人生物楼,五 1-3 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130011.02,微生物学实验,1.5,刘明秋,副教授,24,H立人生物楼,三 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130011.03,微生物学实验,1.5,王英明,讲师,24,H立人生物楼,三 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130011.04,微生物学实验,1.5,王英明,讲师,24,H立人生物楼,四 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130011.05,微生物学实验,1.5,王英明,讲师,24,H立人生物楼,五 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130012.01,遗传学,3.0,"吴燕华\r\n\
乔守怡","副教授\r\n\
教授",80,HGX409,一 3-5 ,"国家级教学名师\r\n\
国家级精品课程团队","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 生命科学学院\r\n\
BIOL130012.02,遗传学,3.0,"林娟\r\n\
卢大儒","副教授\r\n\
教授",60,HGX204,一 3-5 ,"上海市教学名师\r\n\
国家级精品课程团队","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 生命科学学院\r\n\
BIOL130013.01,遗传学实验,1.5,皮妍,讲师,24,H立人生物楼,五 1-3 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130013.02,遗传学实验,1.5,皮妍,讲师,24,H立人生物楼,三 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130013.03,遗传学实验,1.5,郭滨,讲师,24,H立人生物楼,三 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130013.04,遗传学实验,1.5,郭滨,讲师,24,H立人生物楼,四 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130013.05,遗传学实验,1.5,皮妍,讲师,24,H立人生物楼,四 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130016.01,高级生化技术,1.5,陆红,副教授,24,H立人生物楼,四 1-8(1-16周单周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物科学\r\n\
BIOL130016.02,高级生化技术,1.5,陆红,副教授,24,H立人生物楼,四 1-8(2-16周双周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物科学\r\n\
BIOL130016.03,高级生化技术,1.5,陆红,副教授,36,H立人生物楼,五 1-8(2-16周双周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物科学\r\n\
BIOL130017.01,基因工程实验,1.5,吴燕华,副教授,24,H立人生物楼,四 1-8(1-16周单周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物科学\r\n\
BIOL130017.02,基因工程实验,1.5,吴燕华,副教授,24,H立人生物楼,四 1-8(2-16周双周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物科学\r\n\
BIOL130017.03,基因工程实验,1.5,郭滨,讲师,36,H立人生物楼,五 1-8(1-16周单周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物科学\r\n\
BIOL130017.04,基因工程实验,1.5,郭滨,讲师,24,H立人生物楼,五 1-8(2-16周双周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 生物技术\r\n\
BIOL130019.01,现代生物学基础实验,2.0,梅其春,副教授,24,H立人生物楼,五 6-8 ,不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",14 生物技术\r\n\
BIOL130021.01,生物化学实验A(下),1.5,陆红,副教授,24,H立人生物楼,五 1-8(1-16周单周),不接受期中退课,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 生物技术\r\n\
BIOL130024.01,生物统计学,3.0,"陆晨琪\r\n\
胡跃清\r\n\
罗泽伟","助理研究员\r\n\
研究员\r\n\
教授",20,H2209,一 6-8 ,上海市精品课程团队,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30",生命科学学院\r\n\
BIOL130026.01,免疫学,2.0,"李瑞\r\n\
朱乃硕","讲师\r\n\
教授",50,HGX203,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130027.01,发育生物学B,3.0,邓可京,正高级实验师,40,H2110,四 11-13 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",生命科学学院\r\n\
BIOL130029.01,医学分子遗传学,2.0,陈红岩,副教授,30,H3304,三 8-9 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：15:20-17:00",生命科学学院\r\n\
BIOL130031.01,病毒学,2.0,钟江,教授,50,H5302,三 3-4 ,校级精品课程团队,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",生命科学学院\r\n\
BIOL130037.01,基因组学,2.0,"罗小金\r\n\
杨金水","副研究员\r\n\
教授",50,H3204,二 8-9 ,"复旦大学教学名师\r\n\
校级精品课程团队","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",生命科学学院\r\n\
BIOL130040.01,生物控制论,2.0,"明灯明\r\n\
曹洋","副研究员\r\n\
讲师",30,H3405,三 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130049.01,生物技术概论与应用,2.0,"朱焕章\r\n\
卢大儒\r\n\
刘建平","教授\r\n\
教授\r\n\
副教授",50,HGX501,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130052.01,细胞因子及其应用,2.0,刘建平,副教授,50,H3105,三 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130053.01,转基因动物技术,2.0,朱焕章,教授,50,H3105,一 8-9 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:20-17:00",生命科学学院,考试时间已经改,\r\n\
BIOL130057.01,遗传分析原理,2.0,吴晓晖,教授,40,H2111,一 11-12 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",生命科学学院\r\n\
BIOL130058.01,真核生物转录调控和RNA干扰,2.0,曹立环,副教授,30,H2103,二 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130061.01,现代药物与给药系统,3.0,"印春华\r\n\
唐翠","教授\r\n\
教授",40,H2209,四 11-13 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130063.01,生物化学B,3.0,俞瑜,讲师,40,H2111,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-16:05",化学系\r\n\
BIOL130065.01,分子生物学,2.0,朱乃硕,教授,50,H3204,三 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130067.01,生命科学科研伦理和规范,2.0,孙_,教授,50,HGX501,一 6-7 ,全英语课程,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",生命科学学院\r\n\
BIOL130069.01,生物地理学,2.0,傅萃长,教授,50,H3305,三 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130071.01,药物分析方法与应用,2.0,南蓬,副教授,30,H2103,四 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130072.01,生物芯片的研究与应用,2.0,"黄燕\r\n\
李瑶","副教授\r\n\
教授",30,H5306,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",生命科学学院\r\n\
BIOL130076.01,功能基因组学专题,2.0,谢君,副教授,30,H2103,二 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130078.01,法医人类学,2.0,李士林,副教授,40,H2110,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130079.01,多基因遗传病,2.0,王笑峰,副教授,35,H2111,三 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130085.01,发育神经生物学,2.0,"郑煜芳\r\n\
俞洪波","副研究员\r\n\
教授",40,H2208,二 3-4 ,全英语课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130087.01,植物生理学,2.0,"刘建祥\r\n\
李琳","研究员\r\n\
青年研究员",30,H2216,一 8-9 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:20-17:00",生命科学学院\r\n\
BIOL130088.01,病原微生物学基础,2.0,张雪莲,副教授,50,HGX201,二 6-7 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：13:30-15:10",生命科学学院\r\n\
BIOL130095.01,遗传工程原理与应用,2.0,"吕红\r\n\
余文博\r\n\
余_","教授\r\n\
讲师\r\n\
副研究员",60,HGX303,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35",生命科学学院\r\n\
BIOL130100.01,系统生物学,2.0,罗若愚,副研究员,30,H2103,二 11-12 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130101.01,基因组医学与进化,2.0,汪海健,副教授,30,H2208,二 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130109.01,生态学模型,2.0,周淑荣,教授,40,H2208,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
BIOL130120.01,动物生物学,3.0,"吴纪华\r\n\
马志军\r\n\
傅萃长\r\n\
殷明波","教授\r\n\
教授\r\n\
教授\r\n\
副研究员",30,H2103,二 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",14 生态学\r\n\
BIOL130122.01,生物多样性科学导论,2.0,"宋志平\r\n\
王玉国\r\n\
陈家宽\r\n\
张文驹","教授\r\n\
副教授\r\n\
教授\r\n\
教授",30,H6310,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",14 生态学\r\n\
BIOL130123.01,种群生态学,2.0,"李博\r\n\
潘晓云","教授\r\n\
副教授",30,H6210,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",14 生态学\r\n\
BIOL130124.01,群落生态学,2.0,"傅萃长\r\n\
周淑荣","教授\r\n\
教授",30,H3204,三 1-2 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:00-09:40",14 生态学\r\n\
BIOL130143.01,生命科学研究设计与实践I,2.0,"任国栋\r\n\
闫致强","研究员\r\n\
研究员",30,JB103,六 6-7 ,"拔尖人才专项课程\r\n\
TSI:AIBS（生化、神经、植物）","考试日期：其他\r\n\
\r\n\
考试时间：-",14 生命科学学院\r\n\
BIOL130143.02,生命科学研究设计与实践I,2.0,"吴晓晖\r\n\
张瑞霖","教授\r\n\
研究员",30,JB102,六 6-7 ,"拔尖人才专项课程\r\n\
TSI:AIBS（动物、遗传、细胞）","考试日期：其他\r\n\
\r\n\
考试时间：-",14 生命科学学院\r\n\
BIOL130145.01,生命科学研究设计与实践III,2.0,"郑丙莲\r\n\
陆平利","研究员\r\n\
青年研究员",20,JB106,六 6-7 ,"拔尖人才专项课程\r\n\
TSI:AIBS（植物、遗传、细胞）","考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130145.02,生命科学研究设计与实践III,2.0,"李琳\r\n\
李继喜","青年研究员\r\n\
研究员",20,JB105,六 6-7 ,"拔尖人才专项课程\r\n\
TSI:AIBS（生化、植物、动物）","考试日期：其他\r\n\
\r\n\
考试时间：-",13 生命科学学院\r\n\
BIOL130147.01,生命科学研究设计与实践V,2.0,"鲁伯埙\r\n\
缑金营","研究员\r\n\
青年研究员",20,JB202,六 6-7 ,"拔尖人才专项课程\r\n\
TSI:AIBS（神经、植物、遗传）","考试日期：其他\r\n\
\r\n\
考试时间：-",12 生命科学学院\r\n\
BIOL130147.02,生命科学研究设计与实践V,2.0,"麻锦彪\r\n\
蔡亮","教授\r\n\
研究员",20,JB303,六 6-7 ,"拔尖人才专项课程\r\n\
TSI:AIBS（生化、细胞、动物）","考试日期：其他\r\n\
\r\n\
考试时间：-",12 生命科学学院\r\n\
BIOL130148.01,发育与代谢,2.0,"钟涛\r\n\
闫致强\r\n\
余巍\r\n\
张瑞霖","教授\r\n\
研究员\r\n\
研究员\r\n\
研究员",30,HGX305,三 6-7 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",生命科学学院\r\n\
XDSY118005.01,经典与前沿：细胞生物学,2.0,蔡亮,研究员,20,H2102A,四 11-12 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n\
XDSY118006.01,现代人类学,2.0,李辉,教授,15,H2103,六 1-4 ,共9次课，任课教师随堂通知下次上课时间,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n\
XDSY118008.01,遗传学经典与前沿,2.0,"倪挺\r\n\
卢大儒","研究员\r\n\
教授",15,H2102B,"一 11-13\r\n\
(1-12周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n\
XDSY118009.01,肿瘤发生、预防和治疗,1.0,吴家雪,研究员,15,H2102B,"四 11-12\r\n\
(1-9周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n\
XDSY118010.01,探索大脑,2.0,俞洪波,教授,15,F2302,四 11-12 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n\
XDSY118018.01,生命的魅力与生命科学的挑战,2.0,蒯本科,教授,20,H2102A,二 8-9 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n\
XDSY118020.01,疾病中的生命科学,2.0,王久存,教授,20,H2102A,"二 11-13\r\n\
(1-12周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n\
XDSY118021.01,代谢与生活,2.0,赵世民,教授,20,H2104A,"一 11-13\r\n\
(1-12周)",,"考试日期：其他\r\n\
\r\n\
考试时间：-",15\r\n';

COURSE_DATA['理科课程'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,备注,考试时间,开课系\r\n\
ENGL110009.01,英美文化概论,2.0,孙文捷,副教授,30,H5113,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110009.02,英美文化概论,2.0,孙文捷,副教授,30,H5113,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110009.03,英美文化概论,2.0,孙文捷,副教授,30,H5113,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110009.04,英美文化概论,2.0,孙文捷,副教授,30,H5113,四 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110009.05,英美文化概论,2.0,孙文捷,副教授,30,H5113,四 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110009.06,英美文化概论,2.0,姚燕瑾,副教授,30,H6102,二 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110009.07,英美文化概论,2.0,姚燕瑾,副教授,30,H6102,二 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110012.01,英语视听,2.0,肖英,讲师,30,H5209,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:10",大学英语教学部 \r\n\
ENGL110012.02,英语视听,2.0,肖英,讲师,30,H5209,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:10",大学英语教学部\r\n\
ENGL110012.03,英语视听,2.0,肖英,讲师,30,H5209,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:10",大学英语教学部 \r\n\
ENGL110012.04,英语视听,2.0,徐欣,副教授,30,H5209,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:10",大学英语教学部\r\n\
ENGL110012.05,英语视听,2.0,李萍,讲师,30,H5214,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:10",大学英语教学部 \r\n\
ENGL110012.06,英语视听,2.0,杨霞,讲师,30,H5209,五 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:10",大学英语教学部\r\n\
ENGL110024.01,影视与英美文化讨论,2.0,吴晓真,副教授,30,H5112,一 1-2 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110024.02,影视与英美文化讨论,2.0,吴晓真,副教授,30,H5112,一 3-4 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110024.03,影视与英美文化讨论,2.0,吴晓真,副教授,30,H5112,一 6-7 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110025.01,英美报刊选读,2.0,姚燕瑾,副教授,30,H6102,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:10",大学英语教学部\r\n\
ENGL110025.02,英美报刊选读,2.0,姚燕瑾,副教授,30,H6102,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:10",大学英语教学部 \r\n\
ENGL110025.03,英美报刊选读,2.0,姚燕瑾,副教授,30,H6102,四 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:10",大学英语教学部\r\n\
ENGL110033.01,高级英语视听说,2.0,葛宁,讲师,30,H5214,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:25",大学英语教学部 \r\n\
ENGL110033.02,高级英语视听说,2.0,葛宁,讲师,30,H5214,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:25",大学英语教学部\r\n\
ENGL110033.03,高级英语视听说,2.0,涂伶俐,讲师,30,H5209,一 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:25",大学英语教学部 \r\n\
ENGL110035.01,实用交际英语口语,2.0,季佩英,教授,25,H2110,三 1-2 ,"复旦大学教学名师\r\n\
建议修完大学英语III","考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部 \r\n\
ENGL110035.02,实用交际英语口语,2.0,季佩英,教授,25,H2110,四 1-2 ,"复旦大学教学名师\r\n\
建议修完大学英语III","考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部\r\n\
ENGL110035.03,实用交际英语口语,2.0,陆丽萍,副教授,25,H2113A,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部 \r\n\
ENGL110035.04,实用交际英语口语,2.0,陆丽萍,副教授,25,H2113A,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部\r\n\
ENGL110035.05,实用交际英语口语,2.0,陆丽萍,副教授,25,H2113A,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部 \r\n\
ENGL110035.06,实用交际英语口语,2.0,陆丽萍,副教授,25,H2113A,五 6-7 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部\r\n\
ENGL110035.07,实用交际英语口语,2.0,陆丽萍,副教授,25,H2113A,五 8-9 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部 \r\n\
ENGL110035.08,实用交际英语口语,2.0,陈进,副教授,25,H2105A,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部\r\n\
ENGL110035.09,实用交际英语口语,2.0,宣枫,讲师,25,H2113B,一 3-4 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部 \r\n\
ENGL110035.10,实用交际英语口语,2.0,宣枫,讲师,25,H2113B,一 6-7 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部\r\n\
ENGL110035.11,实用交际英语口语,2.0,宣枫,讲师,25,H2113B,一 8-9 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部 \r\n\
ENGL110035.12,实用交际英语口语,2.0,向丁丁,讲师,25,H5108,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部\r\n\
ENGL110036.01,英语公众演说,2.0,万江波,高级讲师,25,H5115,四 6-7 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",大学英语教学部\r\n\
ENGL110036.02,英语公众演说,2.0,万江波,高级讲师,25,H5115,四 8-9 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",大学英语教学部 \r\n\
ENGL110036.03,英语公众演说,2.0,时丽娜,讲师,25,H2112B,三 1-2 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-16\r\n\
\r\n\
考试时间：08:00-09:40",大学英语教学部\r\n\
ENGL110036.04,英语公众演说,2.0,时丽娜,讲师,25,H2112B,三 3-4 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",大学英语教学部 \r\n\
ENGL110036.05,英语公众演说,2.0,Jeffrey Stuart KLEIN,,25,H2102A,一 6-7 ,建议修完大学英语III,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：13:30-15:10",大学英语教学部\r\n\
ENGL110036.06,英语公众演说,2.0,Jeffrey Stuart KLEIN,,25,H2102A,一 8-9 ,建议修完大学英语III,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：15:25-17:05",大学英语教学部 \r\n\
ENGL110042.01,英语笔译,2.0,范劲松,副教授,25,HGX403,二 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110042.02,英语笔译,2.0,范劲松,副教授,25,HGX403,四 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110042.03,英语笔译,2.0,范劲松,副教授,25,HGX403,四 8-9 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110042.04,英语笔译,2.0,艾斐,讲师,25,HGX403,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110042.05,英语笔译,2.0,艾斐,讲师,25,HGX403,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110042.06,英语笔译,2.0,艾斐,讲师,25,HGX403,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110042.07,英语笔译,2.0,艾斐,讲师,25,HGX403,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110043.01,英语口译,2.0,康志峰,教授,30,H5108,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部 \r\n\
ENGL110043.02,英语口译,2.0,康志峰,教授,30,H5108,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部\r\n\
ENGL110043.03,英语口译,2.0,康志峰,教授,30,H5108,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部 \r\n\
ENGL110043.04,英语口译,2.0,康志峰,教授,30,H5108,四 6-7 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部\r\n\
ENGL110043.05,英语口译,2.0,康志峰,教授,30,H5108,四 8-9 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部 \r\n\
ENGL110043.06,英语口译,2.0,向丁丁,讲师,30,H5108,五 6-7 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部\r\n\
ENGL110043.07,英语口译,2.0,向丁丁,讲师,30,H5108,五 8-9 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部 \r\n\
ENGL110043.08,英语口译,2.0,涂伶俐,讲师,30,H5108,一 1-2 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部\r\n\
ENGL110043.09,英语口译,2.0,涂伶俐,讲师,30,H5108,一 3-4 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部 \r\n\
ENGL110045.01,学术英语（科学技术）,2.0,蔡基刚,教授,25,H2110,一 8-9 ,"复旦大学教学名师\r\n\
建议修完大学英语III","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:10",大学英语教学部\r\n\
ENGL110045.02,学术英语（科学技术）,2.0,蔡基刚,教授,25,H2110,五 1-2 ,"复旦大学教学名师\r\n\
建议修完大学英语III","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:10",大学英语教学部 \r\n\
ENGL110045.03,学术英语（科学技术）,2.0,贺灿文,讲师,25,HGX401,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:10",大学英语教学部\r\n\
ENGL110045.04,学术英语（科学技术）,2.0,贺灿文,讲师,25,HGX401,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:10",大学英语教学部 \r\n\
ENGL110046.01,学术英语（社会科学）,2.0,张颖,高级讲师,25,H5105,三 1-2 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110046.02,学术英语（社会科学）,2.0,张颖,高级讲师,25,H5105,三 3-4 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110046.03,学术英语（社会科学）,2.0,张颖,高级讲师,25,H5105,五 1-2 ,"建议修完大学英语III\r\n\
校级精品课程I","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110046.04,学术英语（社会科学）,2.0,张颖,高级讲师,25,H5105,五 3-4 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110047.01,学术英语（文史哲）,2.0,王建伟,讲师,25,H2107,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110047.02,学术英语（文史哲）,2.0,王建伟,讲师,25,H2107,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110047.03,学术英语（文史哲）,2.0,黄红霞,讲师,25,H2106B,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110048.01,学术英语（管理科学）,2.0,季佩英,教授,25,H2110,三 3-4 ,"复旦大学教学名师 \r\n\
建议修完大学英语III","考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110048.02,学术英语（管理科学）,2.0,王薇,讲师,25,HGX402,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110048.03,学术英语（管理科学）,2.0,王薇,讲师,25,HGX402,五 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110054.01,文化阅读,2.0,徐真,讲师,30,H2112A,二 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110054.02,文化阅读,2.0,徐真,讲师,30,H2112A,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110054.03,文化阅读,2.0,吴宝雷,讲师,30,H2205,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110056.01,英语论辩与思辨,2.0,Thame,,25,H2110,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：09:55-11:35",大学英语教学部\r\n\
ENGL110056.02,英语论辩与思辨,2.0,Thame,,25,H2110,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",大学英语教学部 \r\n\
ENGL110056.03,英语论辩与思辨,2.0,Thame,,25,H2110,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",大学英语教学部\r\n\
ENGL110057.01,英国文学欣赏指南,2.0,韦春晓,讲师,30,H2105B,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-20:50",大学英语教学部 \r\n\
ENGL110057.02,英国文学欣赏指南,2.0,韦春晓,讲师,30,H2105B,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-20:50",大学英语教学部\r\n\
ENGL110057.03,英国文学欣赏指南,2.0,韦春晓,讲师,30,H2105B,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-20:50",大学英语教学部 \r\n\
ENGL110057.04,英国文学欣赏指南,2.0,王绍梅,高级讲师,30,HGX304,五 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-20:50",大学英语教学部\r\n\
ENGL110057.05,英国文学欣赏指南,2.0,Jeffrey Stuart KLEIN,,30,H2102A,四 8-9 ,建议修完大学英语III,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",大学英语教学部 \r\n\
ENGL110059.01,大学英语IV,2.0,张勤,讲师,30,H2111,三 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",大学英语教学部\r\n\
ENGL110059.02,大学英语IV,2.0,张勤,讲师,30,H2111,三 6-7 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",大学英语教学部 \r\n\
ENGL110059.03,大学英语IV,2.0,张勤,讲师,30,H2111,三 8-9 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",大学英语教学部\r\n\
ENGL110061.01,英语论说文写作,2.0,董宏乐,副教授,20,H6202,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.02,英语论说文写作,2.0,董宏乐,副教授,20,H6202,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.03,英语论说文写作,2.0,董宏乐,副教授,20,H6202,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.04,英语论说文写作,2.0,董宏乐,副教授,20,H6202,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.05,英语论说文写作,2.0,汪中平,讲师,20,H5214,一 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.06,英语论说文写作,2.0,汪中平,讲师,20,H5214,一 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.07,英语论说文写作,2.0,汪中平,讲师,20,H5214,四 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.08,英语论说文写作,2.0,汪中平,讲师,20,H5214,四 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.09,英语论说文写作,2.0,张雪波,讲师,20,HGX404,二 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.10,英语论说文写作,2.0,张雪波,讲师,20,HGX404,二 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.11,英语论说文写作,2.0,张雪波,讲师,20,HGX404,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.12,英语论说文写作,2.0,张雪波,讲师,20,HGX404,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.13,英语论说文写作,2.0,顾乡,讲师,20,H2106A,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.14,英语论说文写作,2.0,韦春晓,讲师,20,H2105B,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.15,英语论说文写作,2.0,韦春晓,讲师,20,H2105B,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.16,英语论说文写作,2.0,杜方圆,讲师,20,H6102,一 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.17,英语论说文写作,2.0,杜方圆,讲师,20,H6102,一 8-9 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.18,英语论说文写作,2.0,杜方圆,讲师,20,H6102,四 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.19,英语论说文写作,2.0,杜方圆,讲师,20,H6102,四 8-9 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110061.20,英语论说文写作,2.0,Thame,,20,H2110,五 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部\r\n\
ENGL110061.21,英语论说文写作,2.0,Thame,,20,H2110,五 8-9 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:30",大学英语教学部 \r\n\
ENGL110062.01,研究论文写作,2.0,范劲松,副教授,20,HGX403,二 3-4 ,建议修完大学英语III,"考试日期：论文\r\n\
\r\n\
考试时间：-",大学英语教学部\r\n\
ENGL110063.01,创意写作,2.0,Jeffrey Stuart KLEIN,,20,H2102A,五 6-7 ,建议修完大学英语III,"考试日期：论文\r\n\
\r\n\
考试时间：-",大学英语教学部 \r\n\
ENGL110063.02,创意写作,2.0,Jeffrey Stuart KLEIN,,20,H2102A,五 8-9 ,建议修完大学英语III,"考试日期：论文\r\n\
\r\n\
考试时间：-",大学英语教学部\r\n\
ENGL110064.01,英语应用文写作,2.0,曹京渊,正高级讲师,20,H2104B,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:00",大学英语教学部 \r\n\
ENGL110064.02,英语应用文写作,2.0,刘亦春,高级讲师,20,HGX204,二 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:00",大学英语教学部\r\n\
ENGL110064.03,英语应用文写作,2.0,刘亦春,高级讲师,20,HGX204,四 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:00",大学英语教学部 \r\n\
ENGL110064.04,英语应用文写作,2.0,刘亦春,高级讲师,20,HGX204,四 6-7 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:00",大学英语教学部\r\n\
ENGL110064.05,英语应用文写作,2.0,陈洁倩,副教授,20,HGX203,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:00",大学英语教学部 \r\n\
ENGL110064.06,英语应用文写作,2.0,张勤,讲师,20,H2111,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:00",大学英语教学部\r\n\
ENGL110064.07,英语应用文写作,2.0,张勤,讲师,20,H2111,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：17:00-18:00",大学英语教学部 \r\n\
ENGL110065.01,西方儒学研究名著导读,2.0,王建伟,讲师,30,H2107,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：08:00-09:40",大学英语教学部\r\n\
ENGL110066.01,商务英语沟通,2.0,吴晓真,副教授,30,H5112,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：08:00-09:40",大学英语教学部 \r\n\
ENGL110066.02,商务英语沟通,2.0,吴晓真,副教授,30,H5112,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",大学英语教学部\r\n\
ENGL110067.01,学术英语（综合）,2.0,吴晶,高级讲师,25,HGX302,四 8-9 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110067.02,学术英语（综合）,2.0,吴晶,高级讲师,25,HGX302,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110067.03,学术英语（综合）,2.0,吴晶,高级讲师,25,HGX302,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110069.01,文学翻译鉴赏,2.0,万江波,高级讲师,30,H5115,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
ENGL110069.02,文学翻译鉴赏,2.0,万江波,高级讲师,30,H5115,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
ENGL110070.01,大学英语III,2.0,刘亦春,高级讲师,30,HGX204,三 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:00-15:00",大学英语教学部\r\n\
ENGL110070.02,大学英语III,2.0,刘亦春,高级讲师,30,HGX204,三 6-7 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:00-15:00",大学英语教学部 \r\n\
ENGL110070.03,大学英语III,2.0,管阳阳,讲师,30,HGX303,三 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:00-15:00",大学英语教学部\r\n\
ENGL110070.04,大学英语III,2.0,管阳阳,讲师,30,HGX303,五 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:00-15:00",大学英语教学部 \r\n\
ENGL110071.01,美国文学选读,2.0,叶如兰,讲师,30,HGX301,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110071.02,美国文学选读,2.0,叶如兰,讲师,30,HGX301,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110071.03,美国文学选读,2.0,叶如兰,讲师,30,HGX301,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
ENGL110071.04,美国文学选读,2.0,叶如兰,讲师,30,HGX301,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
ENGL110072.01,中外大学文化对比研究,2.0,彭华,讲师,30,H2208,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：08:00-09:40",大学英语教学部 \r\n\
FORE110044.01,基础日语Ⅰ,2.0,王初文,高级讲师,30,H3104,三 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
FORE110044.02,基础日语Ⅰ,2.0,王初文,高级讲师,30,H3104,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部 \r\n\
FORE110044.03,基础日语Ⅰ,2.0,王初文,高级讲师,30,H3104,四 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:10-19:20",大学英语教学部\r\n\
FORE110045.01,基础日语Ⅱ,2.0,王初文,高级讲师,30,H3104,四 3-4 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部 \r\n\
FORE110045.02,基础日语Ⅱ,2.0,王初文,高级讲师,30,H3104,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：19:50-21:00",大学英语教学部\r\n\
FORE110050.01,基础西班牙语Ⅰ,4.0,Julio,,20,HGX105,一 6-7 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",大学英语教学部 \r\n\
,基础西班牙语Ⅰ,4.0,Julio,,20,HGX105,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",大学英语教学部 \r\n\
,基础西班牙语Ⅰ,4.0,Julio,,20,HGX105,五 6-7 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",大学英语教学部 \r\n\
FORE110051.01,基础西班牙语Ⅱ,4.0,Julio,,20,HGX105,一 3-4 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",大学英语教学部\r\n\
FORE110051.01,基础西班牙语Ⅱ,,,,,HGX105,三 3-4 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",大学英语教学部\r\n\
FORE110051.01,基础西班牙语Ⅱ,4.0,Julio,,20,HGX105,五 3-4 ,建议修完大学英语III,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",大学英语教学部\r\n\
FORE110064.01,基础葡萄牙语I,4.0,Mariana do Nascimento Ramos,,20,HGX106,三 6-7 ,建议修完大学英语III,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：08:00-09:40",大学英语教学部 \r\n\
,基础葡萄牙语I,4.0,Mariana do Nascimento Ramos,,20,HGX106,五 1-2 ,建议修完大学英语III,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：08:00-09:40",大学英语教学部 \r\n\
FORE110065.01,基础葡萄牙语II,4.0,Mariana do Nascimento Ramos,,20,HGX106,三 8-9 ,建议修完大学英语III,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：09:55-11:35",大学英语教学部\r\n\
FORE110065.01,基础葡萄牙语II,4.0,Mariana do Nascimento Ramos,,20,,五 3-4 ,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：09:55-11:35",\r\n\
FORE110040.01,基础俄语Ⅰ,2.0,曾婷,讲师,40,H5302,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院 \r\n\
FORE110041.01,基础俄语Ⅱ,2.0,汪吉,讲师,40,H5306,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院\r\n\
FORE110042.01,基础法语Ⅰ,2.0,彭俞霞,讲师,40,H6107,五 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院 \r\n\
FORE110044.04,基础日语Ⅰ,2.0,王菁洁,,40,H5308,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院\r\n\
FORE110046.01,基础韩语Ⅰ,2.0,黄贤玉,副教授,40,H6108,五 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院 \r\n\
FORE110046.02,基础韩语Ⅰ,2.0,吴仙花,讲师,40,H5106,五 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院\r\n\
FORE110047.01,基础韩语Ⅱ,2.0,姜颖,讲师,40,H5110,五 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院 \r\n\
FORE110048.01,基础德语Ⅰ,2.0,李晶浩,讲师,40,H6209,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院\r\n\
FORE110054.01,基础瑞典语Ⅰ,4.0,Lin Engdahl,,30,HGX206,一 11-12,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",外国语言文学学院 \r\n\
FORE110054.01,基础瑞典语Ⅰ,4.0,Lin Engdahl,,30,HGX206,四 11-12,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",外国语言文学学院 \r\n\
FORE110057.01,梵语 I,2.0,刘震,研究员,150,HGX103,五 11-12,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:10",外国语言文学学院\r\n\
FORE110059.01,梵语 III,2.0,Eberhard Guhe,副教授,20,HGX205,五 11-12,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:10",外国语言文学学院\r\n\
ENGL110035.13,实用交际英语口语,2.0,向丁丁,讲师,30,JB106,四 3-4 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：13:00-14:30",大学英语教学部 \r\n\
ENGL110043.10,英语口译,2.0,向丁丁,讲师,30,JB106,四 1-2 ,"建议修完大学英语III\r\n\
校级精品课程","考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部\r\n\
ENGL110033.04,高级英语视听说,2.0,涂伶俐,讲师,35,Z2212,四 3-4 ,建议修完大学英语III,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-16:25",大学英语教学部\r\n\
ENGL110043.11,英语口译,2.0,涂伶俐,讲师,35,Z2212,四 1-2 ,建议修完大学英语III,"考试日期：2015-12-13\r\n\
\r\n\
考试时间：15:00-17:00",大学英语教学部 \r\n\
ENGL110070.05,大学英语III,2.0,朱彦,,35,Z2103,一 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:00-15:00",大学英语教学部\r\n\
ENGL110055.01,学术英语（医学）,2.0,蔡和兵,讲师,35,F2202,四 1-2 ,建议修完大学英语III,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：08:00-09:40",大学英语教学部 '

COURSE_DATA['大学外语'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,选修专业,备注,考试安排,开课系\r\n\
911.001.1.01,现代汉语(上),2.0,陶寰,副教授,15,H6404,一 3-4 ,"14 汉语言文学(二专)\r\n\
12 汉语言文学(二学位)",,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",中国语言文学系\r\n\
911.002.1.01,语言学概论,2.0,张新华,副教授,30,H2104B,四 11-12 ,"12 汉语言文学(二学位)\r\n\
14 汉语言文学(二专)",,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",中国语言文学系 \r\n\
911.007.1.01,古代汉语,3.0,王文晖,副教授,15,HGX410,五 3-5 ,"12 汉语言文学(二学位)\r\n\
13 汉语言文学(二专)",,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",中国语言文学系\r\n\
911.012.1.01,文学概论,2.0,张岩冰,副教授,15,HGX307,三 6-7 ,"13 汉语言文学(二专)\r\n\
12 汉语言文学(二学位)",,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",中国语言文学系 \r\n\
911.014.1.01,中国古代文学史(上),2.0,张金耀,讲师,15,H3408,四 8-9 ,"14 汉语言文学(二专)\r\n\
12 汉语言文学(二学位)",,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",中国语言文学系\r\n\
911.014.3.01,中国古代文学史(下),2.0,吴兆路,研究员,15,HGX304,二 3-4 ,"13 汉语言文学(二专)\r\n\
12 汉语言文学(二学位)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",中国语言文学系 \r\n\
911.015.1.01,中国现当代文学史(上),2.0,栾梅健,教授,15,H3406,三 6-7 ,"12 汉语言文学(二学位)\r\n\
14 汉语言文学(二专)",,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",中国语言文学系\r\n\
911.019.1.01,断代文学研究,2.0,张金耀,讲师,30,H2216,四 6-7 ,12 汉语言文学(二学位),,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",中国语言文学系 \r\n\
911.021.1.01,中外作家研究,2.0,张芙鸣,副教授,30,H2107,四 11-12 ,12 汉语言文学(二学位),,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",中国语言文学系\r\n\
911.026.1.01,中国现代影视剧研究,2.0,杨新宇,副教授,30,H6310,三 6-7 ,12 汉语言文学(二学位),,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",中国语言文学系 \r\n\
911.029.1.01,外国文学史,3.0,王宏图,教授,15,HGX509,一 3-5 ,"13 汉语言文学(二学位)\r\n\
12 汉语言文学(二学位)",,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",中国语言文学系\r\n\
912.003.1.01,翻译概论,3.0,强晓,讲师,120,H2214,一 11-13 ,英汉双语翻译(二专),14,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-21:05",外国语言文学学院 \r\n\
912.004.2.01,英语写作(下),3.0,强晓,讲师,100,H6201,二 11-13 ,英汉双语翻译(二专),13,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-21:05",外国语言文学学院\r\n\
912.005.2.01,英汉互译技巧II,3.0,姜倩,讲师,100,H6101,五 11-13 ,英汉双语翻译(二专),13,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-21:05",外国语言文学学院 \r\n\
912.006.2.01,英汉视译II,3.0,管玉华,讲师,100,H6101,四 11-13 ,英汉双语翻译(二专),13,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-21:05",外国语言文学学院\r\n\
912.011.1.01,世界文学导读,2.0,汪洪章,教授,30,H6112,五 6-7 ,英汉双语翻译(二专),13/14,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院 \r\n\
912.013.1.01,英美报刊,2.0,高永伟,副教授,30,H6112,三 6-7 ,英汉双语翻译(二专),13/14,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",外国语言文学学院\r\n\
912.018.1.01,非虚构文学赏析,2.0,沈黎,教授,5,H5115,二 1-2 ,英汉双语翻译(二专),13,"考试日期：论文\r\n\
\r\n\
考试时间：-",外国语言文学学院 \r\n\
912.020.1.01,英美短篇小说,2.0,汪洪章,教授,20,H6101,三 1-2 ,英汉双语翻译(二专),13,"考试日期：论文\r\n\
\r\n\
考试时间：-",外国语言文学学院\r\n\
912.021.1.01,英美散文,2.0,丁骏,讲师,30,H5106,四 3-4 ,英汉双语翻译(二专),13,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",外国语言文学学院 \r\n\
912.026.1.01,基础口译（I）,3.0,冯超,讲师,120,H2214,二 11-13 ,英汉双语翻译(二专),14,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-21:05",外国语言文学学院\r\n\
912.027.1.01,英语读译,3.0,陶友兰,副教授,120,H2214,三 11-13 ,英汉双语翻译(二专),14,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-21:05",外国语言文学学院 \r\n\
913.006.1.01,新闻法规与职业道德,2.0,陈建云,教授,50,HQ301,三 11-12 ,12,12级,"考试日期：论文\r\n\
\r\n\
考试时间：-",新闻学院\r\n\
913.014.1.01,广告学概论,2.0,张殿元,教授,90,HQ201,二 11-12 ,"12\r\n\
14",12级、14级,"考试日期：论文\r\n\
\r\n\
考试时间：-",新闻学院 \r\n\
913.008.1.01,广告策划与创意,2.0,唐乐,讲师,50,HQ203,四 11-12 ,13,13级,"考试日期：论文\r\n\
\r\n\
考试时间：-",新闻学院\r\n\
913.013.1.01,广播电视与当代社会,2.0,赵民,副教授,50,HQ203,二 11-12 ,13,13级,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：18:30-20:30",新闻学院 \r\n\
913.023.1.01,中国新闻传播史,3.0,林溪声,副教授,50,HQ203,五 11-13 ,13,13级,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:30-20:30",新闻学院\r\n\
913.001.1.01,新闻学概论,3.0,伍静,讲师,70,HQ201,三 11-13 ,14,14级,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：18:30-20:30",新闻学院 \r\n\
913.015.1.01,马恩新闻思想,2.0,徐佳,讲师,50,HQ201,一 11-12 ,14,14级,"考试日期：论文\r\n\
\r\n\
考试时间：-",新闻学院\r\n\
913.021.1.01,新闻采访与写作,3.0,许燕,副教授,70,HQ201,四 11-13 ,14,14级,"考试日期：其他\r\n\
\r\n\
考试时间：-",新闻学院 \r\n\
917.002.1.01,国际关系导论,3.0,陈玉聃,讲师,40,H6202,二 11-13 ,外交与公共事务,14,"考试日期：论文\r\n\
\r\n\
考试时间：-",国际关系与公共事务学院\r\n\
917.004.1.01,当代中国对外关系,3.0,俞沂暄,讲师,40,H6202,四 11-13 ,外交与公共事务,14,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",国际关系与公共事务学院 \r\n\
917.007.1.01,国际谈判,2.0,沈逸,副教授,40,H2101,一 11-12 ,外交与公共事务,13,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",国际关系与公共事务学院\r\n\
917.008.1.01,外交与外事管理,2.0,张骥,助理研究员,40,H4304,四 11-12 ,外交与公共事务,13,"考试日期：论文\r\n\
\r\n\
考试时间：-",国际关系与公共事务学院 \r\n\
917.013.1.01,美国政治与对外关系,2.0,徐以骅,教授,40,H6112,五 9-10 ,外交与公共事务,13,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：16:20-18:00",国际关系与公共事务学院\r\n\
917.014.1.01,欧盟政治与对外关系,2.0,简军波,副研究员,40,H6102,三 9-10 ,外交与公共事务,14,"考试日期：论文\r\n\
\r\n\
考试时间：-",国际关系与公共事务学院 \r\n\
917.022.1.01,中国古代政治智慧与治国方略,3.0,陈超群,副教授,40,H6110,三 11-13 ,外交与公共事务,14,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",国际关系与公共事务学院\r\n\
917.023.1.01,公众领导力,3.0,宋道雷,讲师,40,H6110,一 11-13 ,外交与公共事务,14,"考试日期：论文\r\n\
\r\n\
考试时间：-",国际关系与公共事务学院 \r\n\
917.037.1.01,行政技能与实践,3.0,陈水生,副教授,40,H6110,二 11-13 ,外交与公共事务,13,"考试日期：论文\r\n\
\r\n\
考试时间：-",国际关系与公共事务学院\r\n\
924.002.1.01,概率论与数理统计,4.0,张巍,副教授,140,H3409,二 11-13 ,14 数据科学(二专),,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",计算机科学技术学院 \r\n\
924.002.1.01,概率论与数理统计,4.0,张巍,副教授,140,H3409,四 11-12 ,14 数据科学(二专),,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",计算机科学技术学院 \r\n\
972.012.1.01,数据结构,4.0,陈彤兵,讲师,140,H计算中心三楼机房,一 11-12 ,14 数据科学(二专),,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",计算机科学技术学院\r\n\
972.012.1.01,数据结构,4.0,陈彤兵,讲师,140,H3309,三 11-13 ,14 数据科学(二专),,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",计算机科学技术学院\r\n\
972.014.1.01,数据库引论,3.0,汪卫,教授,140,H计算中心三楼机房,四 13-14 ,14 数据科学(二专),,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:30",计算机科学技术学院 \r\n\
972.014.1.01,数据库引论,3.0,汪卫,教授,140,H4101,五 11-13 ,14 数据科学(二专),,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:30",计算机科学技术学院 \r\n\
927.005.1.01,民法Ⅱ,4.0,班天可,讲师,100,H4103,三 11-14 ,13 法学,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",法学院\r\n\
927.007.1.01,民事诉讼法,3.0,杨严炎,副教授,100,H4104,四 11-13 ,13 法学,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",法学院 \r\n\
927.010.1.01,刑法Ⅱ,2.0,杜宇,教授,100,H4103,一 11-12 ,13 法学,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",法学院\r\n\
927.012.1.01,刑事诉讼法,3.0,马贵翔,教授,100,H4103,五 11-13 ,13 法学,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:30",法学院 \r\n\
927.001.1.01,法学基础理论,3.0,姚军,,115,H3306,一 11-13 ,14 法学,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",法学院\r\n\
927.009.1.01,宪法,3.0,涂云新,讲师,115,H4401,三 11-13 ,14 法学,9月潘伟杰上,10月以后涂云新上,"考试日期：2015-12-21\r\n\
考试时间：18:30-20:30",法学院 \r\n\
927.014.1.01,中国法制史,3.0,韩涛,副教授,115,H3306,四 11-13 ,14 法学,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",法学院\r\n\
934.018.1.01,公共安全管理,3.0,滕五晓,副教授,15,H院系自主,二 8-10 ,公共事业管理(社会管理方向)(二专),,"考试日期：论文\r\n\
\r\n\
考试时间：-",社会发展与公共政策学院 \r\n\
934.020.1.01,公共政策概论,3.0,胡湛,副教授,12,H6209,四 11-13 ,公共事业管理(社会管理方向)(二专),,"考试日期：论文\r\n\
\r\n\
考试时间：-",社会发展与公共政策学院\r\n\
934.021.1.01,公共经济学,3.0,程远,教授,15,H院系自主,一 11-13 ,公共事业管理(社会管理方向)(二专),,"考试日期：论文\r\n\
\r\n\
考试时间：-",社会发展与公共政策学院 \r\n\
934.023.1.01,社会学概论,3.0,王威海,教授,15,H6312,二 3-5 ,公共事业管理(社会管理方向)(二专),,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：18:30-20:30",社会发展与公共政策学院\r\n\
934.024.1.01,非政府组织管理,3.0,赵德余,教授,15,H院系自主,二 11-13 ,公共事业管理(社会管理方向)(二专),,"考试日期：论文\r\n\
\r\n\
考试时间：-",社会发展与公共政策学院 \r\n\
934.031.1.01,就业市场管理和政策,2.0,王菊芬,研究员,15,,三 11-13 ,公共事业管理(社会管理方向)(二专),,"考试日期：论文\r\n\
\r\n\
考试时间：-",社会发展与公共政策学院\r\n\
934.036.1.01,GIS在公共管理中的应用,2.0,张伊娜,副教授,10,H5314,一 6-7 ,公共事业管理(社会管理方向)(二专),,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：13:30-15:10",社会发展与公共政策学院 \r\n\
945.001.1.01,环境学原理,3.0,余琦,副教授,5,H4208,一 11-13 ,14 环境科学与公共政策(二专),,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",环境科学与工程系\r\n\
945.002.1.01,环境工程学,3.0,张轶,讲师,5,H4408,五 3-5 ,14 环境科学与公共政策(二专),,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",环境科学与工程系 \r\n\
945.007.1.01,全球环境变化,2.0,陈莹,教授,5,HGX202,四 3-4 ,14 环境科学与公共政策(二专),,"考试日期：论文\r\n\
\r\n\
考试时间：-",环境科学与工程系\r\n\
945.010.1.01,环境生物学,3.0,樊正球,副教授,5,H4104,四 3-5 ,14 环境科学与公共政策(二专),,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",环境科学与工程系 \r\n\
945.011.1.01,基础生态学,2.0,王寿兵,副教授,5,H4101,一 1-2 ,14 环境科学与公共政策(二专),,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",环境科学与工程系\r\n\
945.005.1.01,环境法学,3.0,黄文芳,副教授,5,HGX202,一 6-8 ,环境科学与公共政策(二专),,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:30",环境科学与工程系 \r\n\
957.033.1.02,微观经济学,3.0,"应晓华\r\n\
张璐莹\r\n\
蒋虹丽","教授\r\n\
讲师\r\n\
讲师",20,JA106,一 11-12 ,11 公共事业管理,,"考试日期：\r\n\
\r\n\
考试时间：-",公共卫生学院\r\n\
957.014.1.01,卫生事业管理,4.0,"励晓红\r\n\
吕军\r\n\
李程跃","副教授\r\n\
教授\r\n\
讲师",20,JA201,五 6-9 ,12 公共事业管理,,"考试日期：\r\n\
\r\n\
考试时间：-",公共卫生学院 \r\n\
957.032.1.01,管理学,3.0,"吕军\r\n\
孙梅","教授\r\n\
副教授",20,F院系自主,二 11-12 ,12 公共事业管理,,"考试日期：\r\n\
\r\n\
考试时间：-",公共卫生学院\r\n\
957.030.1.01,医疗保险,2.0,"叶露\r\n\
应晓华\r\n\
蒋虹丽","教授\r\n\
教授\r\n\
讲师",20,JA206,三 10-13(1-9周),,,,公共卫生学院 \r\n\
968.023.1.01,货币经济学,3.0,田素华,教授,65,H6104,三 11-13 ,国际经济与贸易(二专),13 国际经济与贸易(二专),"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",经济学院\r\n\
968.025.1.01,国际经营,3.0,强永昌,教授,65,H6105,二 11-13 ,国际经济与贸易(二专),13 国际经济与贸易(二专),"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",经济学院 \r\n\
968.029.1.01,统计学,3.0,高虹,师资博士后,90,H6101,一 11-13 ,经济学(二专),13 级经济学(二专）,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",经济学院\r\n\
968.033.1.01,概率论与数理统计,3.0,朱弘鑫,副教授,60,H6208,三 11-13 ,国际经济与贸易(二专),14 国际经济与贸易(二专),"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",经济学院 \r\n\
968.033.1.02,概率论与数理统计,3.0,汪思海,讲师,160,H6112,五 11-13 ,经济学(二专),14 级经济学(二专）,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:30",经济学院\r\n\
968.034.1.01,国际金融,3.0,张涛,副教授,90,H6106,三 11-13 ,经济学(二专),13 级经济学(二专）,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",经济学院 \r\n\
968.034.1.02,国际金融,3.0,郑辉,副教授,65,H6104,四 11-13 ,国际经济与贸易(二专),13 国际经济与贸易(二专),"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",经济学院\r\n\
968.036.1.01,国际经济学,3.0,蔡晓月,副教授,65,H6105,五 11-13 ,国际经济与贸易(二专),13 国际经济与贸易(二专),"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:30",经济学院 \r\n\
968.037.1.01,微观经济学,3.0,冯剑亮,讲师,60,H6209,二 11-13 ,国际经济与贸易(二专),14 国际经济与贸易(二专),"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",经济学院\r\n\
968.037.1.02,微观经济学,3.0,冯剑亮,讲师,160,H6112,四 11-13 ,经济学(二专),14 经济学(二专）,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",经济学院 \r\n\
968.038.1.01,发展经济学,3.0,章奇,副研究员,90,H6101,二 11-13 ,经济学(二专),13 级经济学(二专）,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",经济学院\r\n\
969.001.1.01,会计学,3.0,孙琳,副教授,160,H6112,二 11-13 ,经济学(二专),14 级经济学(二专）,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",经济学院 \r\n\
969.001.1.02,会计学,3.0,徐筱凤,副教授,60,H6107,四 11-13 ,国际经济与贸易(二专),14 国际经济与贸易(二专),"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",经济学院\r\n\
942.001.2.01,中级财务会计(下),3.0,徐志翰,副教授,80,H4106,二 11-14 ,会计学(二学位),13,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：18:30-20:30",管理学院 \r\n\
942.002.1.01,成本管理会计,3.0,徐浩萍,副教授,80,H4106,一 11-14 ,会计学(二学位),13,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",管理学院\r\n\
942.006.1.01,国际会计,3.0,朱振梅,讲师,70,H6201,一 11-13 ,会计学(二学位),12,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",管理学院 \r\n\
942.007.1.01,税务会计,2.0,娄贺统,高级讲师,80,H4106,四 11-12 ,会计学(二学位),13,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",管理学院\r\n\
942.008.1.01,财务报表分析,2.0,曹利,讲师,70,H6201,四 11-12 ,会计学(二学位),12,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",管理学院 \r\n\
942.009.1.01,会计职业道德,2.0,金__,讲师,130,H4301,一 11-12 ,会计学(二学位),14,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30",管理学院\r\n\
942.015.1.01,毕业论文,4.0,徐志翰,副教授,70,H院系自主,六 1-1 ,会计学(二学位),12,"考试日期：论文\r\n\
\r\n\
考试时间：-",管理学院 \r\n\
942.016.1.01,保险学,3.0,张真,副教授,80,H4106,三 11-13 ,会计学(二学位),13,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",管理学院\r\n\
968.037.1.03,微观经济学,3.0,冯剑亮,讲师,130,H4201,五 11-13 ,会计学(二学位),14,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：18:30-20:30",管理学院 \r\n\
969.001.1.03,会计学,3.0,洪剑峭,教授,130,H4201,四 11-13 ,会计学(二学位),14,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",管理学院\r\n\
969.002.1.01,管理学导论,3.0,唐跃军,副教授,130,H4201,三 11-13 ,会计学(二学位),14,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",管理学院 \r\n\
993.001.1.01,语言学概论,2.0,高顺全,教授,20,HGD413,一 11-12 ,对外汉语(二专),14,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院\r\n\
993.002.1.01,现代汉语,4.0,陶炼,副教授,20,HGD504,三 8-9 ,对外汉语(二专),14,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院 \r\n\
993.002.1.01,现代汉语,4.0,陶炼,副教授,20,HGD504,四 8-9 ,对外汉语(二专),14,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院 \r\n\
993.004.1.01,中国古代文学(上),2.0,施国锋,讲师,20,HGD414,五 11-12 ,对外汉语(二专),13,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院\r\n\
993.007.1.01,教育心理学,2.0,杨蓉蓉,副教授,20,HGD413,五 11-12 ,对外汉语(二专),14,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院 \r\n\
993.008.1.01,跨文化交际理论,2.0,杨蓉蓉,副教授,20,HGD504,五 8-9 ,对外汉语(二专),13,"考试日期：论文,2015-12-25\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
993.009.1.01,第二语言习得理论,2.0,陈钰,讲师,20,HGD506,四 8-9 ,对外汉语(二专),13,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院 \r\n\
993.014.1.01,语音与语音教学,2.0,盛青,讲师,20,HGD410,四 11-12 ,对外汉语(二专),13,"考试日期：论文,2015-12-24\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院\r\n\
993.015.1.01,词汇与词汇教学,2.0,盛若菁,副教授,20,HGD412,一 11-12 ,对外汉语(二专),13,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院 \r\n\
993.016.1.01,语法与语法教学,2.0,耿直,讲师,20,HGD504,一 8-9 ,对外汉语(二专),13,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
993.017.1.01,汉字与汉字教学,2.0,胡文华,副教授,20,HGD413,三 11-12 ,对外汉语(二专),13,"考试日期：论文,2015-12-23\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院 \r\n\
916.016.1.01,现代科学技术与社会发展,2.0,徐志宏,讲师,10,HGX203,四 3-4,"哲学(二专)\r\n\
宗教学(二专)",,"考试日期：论文\r\n\
考试时间：-",哲学学院\r\n\
916.051.1.01,西方哲学史(上),2.0,佘碧平,教授,10,HGX409,二 3-4,"宗教学(二专)\r\n\
哲学(二专)",,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",哲学学院\r\n\
916.056.1.01,马克思主义哲学导论,2.0,王德峰,教授,10,HGX510,四 6-7,"哲学(二专)\r\n\
宗教学(二专)",上海市教学名师,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",哲学学院\r\n\
916.057.1.01,中国哲学史（上）,2.0,刘康德,教授,10,HGX105,二 1-2,"宗教学(二专)\r\n\
哲学(二专)",,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：08:00-09:40",哲学学院 \r\n\
916.060.1.01,马克思主义哲学史,2.0,吴晓明,教授,10,HGX207,三 8-9,"宗教学(二专)\r\n\
哲学(二专)",上海市教学名师,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",哲学学院\r\n\
916.062.1.01,哲学阅读和写作,1.0,"郝兆宽\r\n\
徐英瑾","教授\r\n\
教授",10,H3109,二 6-7(1-8周),"宗教学(二专)\r\n\
哲学(二专)",,"考试日期：论文\r\n\
考试时间：-",哲学学院 \r\n\
916.063.1.01,古希腊哲学,2.0,丁耘,教授,10,HGX203,二 8-10,"宗教学(二专)\r\n\
哲学(二专)",,"考试日期：论文\r\n\
考试时间：-",哲学学院\r\n\
916.064.1.01,先秦诸子,2.0,杨泽波,教授,10,HGX103,四 8-9,"宗教学(二专)\r\n\
哲学(二专)",,"考试日期：论文,2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",哲学学院 \r\n\
916.065.1.01,佛教哲学,2.0,刘宇光,副教授,4,H5307,三 6-7,"哲学(二专)\r\n\
宗教学(二专)",,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",哲学学院\r\n\
916.075.1.01,价值哲学,2.0,冯平,教授,10,HGX401,一 11-12,"宗教学(二专)\r\n\
哲学(二专)",复旦大学教学名师,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:10",哲学学院 \r\n\
916.076.1.01,伦理学原著选读,2.0,邓安庆,教授,10,HGX204,四 8-9,"哲学(二专)\r\n\
宗教学(二专)",,"考试日期：论文\r\n\
考试时间：-",哲学学院\r\n\
916.077.1.01,宗教学导论,2.0,朱晓红,副教授,10,H5102,一 6-7,"宗教学(二专)\r\n\
哲学(二专)",,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",哲学学院 \r\n\
916.078.1.01,伦理学导论,2.0,罗亚玲,副教授,7,HGX406,三 6-7,"哲学(二专)\r\n\
宗教学(二专)",,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",哲学学院\r\n\
916.081.1.01,基督教史,2.0,刘平,副教授,10,HGX501,一 8-9,"宗教学(二专)\r\n\
哲学(二专)",,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30",哲学学院 \r\n\
916.083.1.01,儒教的理论与历史,2.0,李天纲,教授,10,HGX301,二 8-9,"哲学(二专)\r\n\
宗教学(二专)",,"考试日期：论文\r\n\
考试时间：-",哲学学院\r\n\
916.033.1.01,数理逻辑I,2.0,郝兆宽,教授,10,HGX204,四 1-2,数理逻辑与科学哲学(二专),,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",哲学学院 \r\n\
916.036.1.01,集合论,2.0,杨睿之,讲师,10,HGX302,四 11-12,数理逻辑与科学哲学(二专),,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",哲学学院\r\n\
916.046.1.01,可计算性理论,2.0,杨睿之,讲师,10,HGX202,五 11-12,数理逻辑与科学哲学(二专),,"考试日期：论文\r\n\
考试时间：-",哲学学院 \r\n\
916.055.1.01,现代西方哲学原著选读,2.0,王金林,教授,10,HGX507,三 3-4,数理逻辑与科学哲学(二专),海德格尔《形而上学导论》,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",哲学学院 \r\n\
916.089.1.01,《圣经》与西方宗教传统,2.0,王新生,教授,10,H3108,二 3-4,数理逻辑与科学哲学(二专),,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：09:55-11:35",哲学学院 '

COURSE_DATA['二专课程'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,备注,考试时间,开课系,选课限制条件\r\n\
COMP110001.01,计算机高级办公自动化,1.0,陈海洪,工程师,89,H4501,一 6-7 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110001.02,计算机高级办公自动化,1.0,肖川,工程师,71,H4503,一 8-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110001.03,计算机高级办公自动化,1.0,王欢,高级工程师,71,H4506,四 8-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110003.01,计算机网络与网页制作,1.0,肖川,工程师,71,H4503,一 3-4 ,混合式教学,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110003.02,计算机网络与网页制作,1.0,肖川,工程师,71,H4503,一 6-7 ,混合式教学,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110003.03,计算机网络与网页制作,1.0,肖川,工程师,71,H4503,三 3-4 ,混合式教学,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110003.04,计算机网络与网页制作,1.0,陈学青,副教授,71,H4504,三 6-7 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110003.05,计算机网络与网页制作,1.0,陈彤兵,讲师,89,H4501,五 3-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110004.01,计算机基础与数据库,1.0,王放,副教授,71,H4505,一 1-2 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110004.02,计算机基础与数据库,1.0,王放,副教授,71,H4505,一 3-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110004.03,计算机基础与数据库,1.0,王智慧,讲师,71,H4504,二 3-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110004.04,计算机基础与数据库,1.0,肖川,工程师,71,H4503,三 1-2 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110004.05,计算机基础与数据库,1.0,马颖琦,高级讲师,71,H4505,三 8-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110004.06,计算机基础与数据库,1.0,王欢,高级工程师,71,H4506,四 3-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110004.07,计算机基础与数据库,1.0,王欢,高级工程师,71,H4506,四 6-7 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110032.01,计算机多媒体应用（初级）,1.0,陈海洪,工程师,89,H4501,一 1-2 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110032.02,计算机多媒体应用（初级）,1.0,张向东,讲师,89,H4501,三 6-7 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110032.03,计算机多媒体应用（初级）,1.0,张向东,讲师,89,H4501,三 8-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110032.04,计算机多媒体应用（初级）,1.0,张向东,讲师,89,H4501,三 11-12 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,留学生\r\n\
COMP110033.01,计算机多媒体应用（高级）,1.0,孙晓光,副教授,89,H4501,一 8-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110033.02,计算机多媒体应用（高级）,1.0,张向东,讲师,89,H4501,四 1-2 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110033.03,计算机多媒体应用（高级）,1.0,张向东,讲师,89,H4501,四 3-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110034.01,计算机初级办公自动化,1.0,肖川,工程师,71,H4503,一 1-2 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110034.02,计算机初级办公自动化,1.0,陈海洪,工程师,89,H4501,一 3-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110034.03,计算机初级办公自动化,1.0,马颖琦,高级讲师,71,H4505,三 6-7 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,\r\n\
COMP110034.04,计算机初级办公自动化,1.0,王欢,高级工程师,71,H4506,四 1-2 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,\r\n\
COMP110034.05,计算机初级办公自动化,1.0,张向东,讲师,89,H4501,四 11-12 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,留学生\r\n\
COMP110036.01,C程序设计,2.0,陈学青,副教授,71,H4504,一 6-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,"15 管理学院\r\n\
15 自然科学试验班\r\n\
15 旅游管理\r\n\
15 经济学院\r\n\
15 临床医学(八年制)"\r\n\
COMP110036.02,C程序设计,2.0,张守志,副教授,79,H3106,二 1-2 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,"15 自然科学试验班\r\n\
15 旅游管理\r\n\
15 临床医学(八年制)\r\n\
15 经济学院\r\n\
15 管理学院"\r\n\
COMP110036.02,C程序设计,2.0,张守志,副教授,79,H计算中心三楼3号机房,二 3-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,"15 自然科学试验班\r\n\
15 旅游管理\r\n\
15 临床医学(八年制)\r\n\
15 经济学院\r\n\
15 管理学院\r\n\
15 核科学与技术系"\r\n\
COMP110036.03,C程序设计,2.0,陈学青,副教授,71,H4504,三 1-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,"15 临床医学(八年制)\r\n\
15 旅游管理\r\n\
15 经济学院\r\n\
15 管理学院\r\n\
15 自然科学试验班"\r\n\
COMP110036.04,C程序设计,2.0,肖川,工程师,71,H4503,三 6-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,"15 自然科学试验班\r\n\
15 管理学院\r\n\
15 旅游管理\r\n\
15 经济学院\r\n\
15 临床医学(八年制)"\r\n\
COMP110036.05,C程序设计,2.0,王智慧,讲师,71,H4504,四 1-4 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,"15 管理学院\r\n\
15 临床医学(八年制)\r\n\
15 自然科学试验班\r\n\
15 经济学院\r\n\
15 旅游管理"\r\n\
COMP110036.06,C程序设计,2.0,陈彤兵,讲师,89,H4501,五 6-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,"15 旅游管理\r\n\
15 自然科学试验班\r\n\
15 临床医学(八年制)\r\n\
15 管理学院\r\n\
15 经济学院"\r\n\
COMP110037.01,VB程序设计,2.0,陈学青,副教授,71,H4504,一 1-4 ,"非自然科学试验班\r\n\
临床医学(八年制)、核工程与核技术学生选修","考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,15\r\n\
COMP110037.02,VB程序设计,2.0,肖川,工程师,71,H4503,二 1-4 ,非自然科学试验班、临床医学(八年制)学生选修,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,15\r\n\
COMP110037.03,VB程序设计,2.0,张向东,讲师,89,H4501,三 1-4 ,非自然科学试验班、临床医学(八年制)学生选修,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,15\r\n\
COMP110037.04,VB程序设计,2.0,王欢,高级工程师,71,H4506,三 6-9 ,非自然科学试验班、临床医学(八年制)学生选修,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,15\r\n\
COMP110037.05,VB程序设计,2.0,马颖琦,高级讲师,71,H4505,四 1-4 ,非自然科学试验班、临床医学(八年制)学生选修,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,15\r\n\
COMP110037.06,VB程序设计,2.0,卢暾,副教授,71,H4503,四 6-9 ,非自然科学试验班、临床医学(八年制)学生选修,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,15\r\n\
COMP110037.07,VB程序设计,2.0,马颖琦,高级讲师,71,H4505,四 6-9 ,非自然科学试验班、临床医学(八年制)学生选修,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院 ,15\r\n\
COMP110042.01,Python程序设计,2.0,张向东,讲师,89,H4501,四 6-9 ,,"考试日期：2015-12-19\r\n\
\r\n\
考试时间：08:00-22:00",计算机科学技术学院,'

COURSE_DATA['计算机'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,开课系,备注,考试安排\r\n\
NDEC110002.01,军事理论,1.0,黄荣国,副教授,100,H3401,一 8-9 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.02,军事理论,1.0,范科琪,助理研究员,100,H3401,一 11-12 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.03,军事理论,1.0,范科琪,助理研究员,100,H3401,二 1-2 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.04,军事理论,1.0,范科琪,助理研究员,100,H3401,二 3-4 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.05,军事理论,1.0,陈莹莹,助理研究员,100,H3401,三 1-2 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.06,军事理论,1.0,陈莹莹,助理研究员,100,H3401,三 3-4 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.07,军事理论,1.0,陈莹莹,助理研究员,100,H3401,三 6-7 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.08,军事理论,1.0,黄荣国,副教授,100,H3401,三 8-9 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.09,军事理论,1.0,赵亮,助理研究员,100,H3401,三 11-12 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.10,军事理论,1.0,赵亮,助理研究员,100,H3401,四 1-2 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.11,军事理论,1.0,范科琪,助理研究员,100,H3401,四 3-4 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.12,军事理论,1.0,赵亮,助理研究员,100,H3401,四 6-7 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.13,军事理论,1.0,赵亮,助理研究员,100,H3401,五 6-7 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.14,军事理论,1.0,赵亮,助理研究员,100,H3401,五 8-9 ,军事理论教研室,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30"\r\n\
NDEC110002.15,军事理论,1.0,,,500,H院系自主,二 11-12 ,军事理论教研室,慕课,"考试日期：\r\n\
\r\n\
考试时间：-"'

COURSE_DATA['军事理论'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,备注,考试时间,开课系,选课限制条件\r\n\
ICES110001.01,留学生高级汉语I,4.0,赵国军,助理研究员,60,HGX209,三 1-2 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：8:00-9:40",中国语言文学系,15 法学\r\n\
ICES110001.01,留学生高级汉语I,4.0,赵国军,助理研究员,60,HGX209,五 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：8:00-9:40",中国语言文学系,15 法学\r\n\
ICES110003.01,留学生专业汉语I,4.0,卢英顺,教授,50,HGX502,三 1-2 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:00-09:40",中国语言文学系 ,留学生\r\n\
ICES110003.01,留学生专业汉语I,4.0,卢英顺,教授,50,HGX502,五 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:00-09:40",中国语言文学系 ,留学生\r\n\
ICES110001.02,留学生高级汉语I,4.0,顾昕,副教授,20,HQ302,二 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",新闻学院,\r\n\
ICES110001.02,留学生高级汉语I,4.0,顾昕,副教授,20,HQ302,四 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",新闻学院,\r\n\
ICES110001.04,留学生高级汉语I,4.0,林涓,助理研究员,30,H6110,三 3-4 ,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：13:30-15:10",国际关系与公共事务学院,15 留学生 国际关系与公共事务学院\r\n\
ICES110001.04,留学生高级汉语I,4.0,林涓,助理研究员,30,H6110,五 6-7 ,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：13:30-15:10",国际关系与公共事务学院,15 留学生 国际关系与公共事务学院\r\n\
ICES110003.02,留学生专业汉语I,4.0,黄以天,讲师,30,H6209,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",国际关系与公共事务学院 ,14 国际关系与公共事务学院\r\n\
ICES110003.02,留学生专业汉语I,4.0,黄以天,讲师,30,H6209,五 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",国际关系与公共事务学院 ,14 国际关系与公共事务学院\r\n\
ICES110001.05,留学生高级汉语I,4.0,赵立行,教授,60,H5312,三 1-2 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",法学院,15 法学\r\n\
ICES110001.05,留学生高级汉语I,4.0,赵立行,教授,60,H3204,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",法学院,15 法学\r\n\
ICES110003.03,留学生专业汉语I,4.0,韩涛,副教授,30,JB307,三 8-9 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",法学院 ,14 留学生 法学\r\n\
ICES110003.03,留学生专业汉语I,4.0,韩涛,副教授,30,JB307,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",法学院 ,14 留学生 法学\r\n\
ICES110003.04,留学生专业汉语I,4.0,袁斌,讲师,5,H院系自主,二 11-12 ,管理学院李达三楼105室,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",管理学院,13 管理学院\r\n\
ICES110003.04,留学生专业汉语I,4.0,袁斌,讲师,5,H院系自主,四 11-12 ,管理学院李达三楼105室,,管理学院,13 管理学院\r\n\
ICES110003.05,留学生专业汉语I,4.0,许静,讲师,5,H院系自主,二 11-12 ,"管理学院\r\n\
史带楼\r\n\
503室","考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",管理学院 ,13 管理学院\r\n\
ICES110003.05,留学生专业汉语I,4.0,许静,讲师,5,H院系自主,四 11-12 ,管理学院史带楼503室,,管理学院 ,13 管理学院\r\n\
ICES110001.03,留学生高级汉语I,4.0,姚萱,副教授,30,HGD411,二 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院,外国交流学生\r\n\
ICES110001.03,留学生高级汉语I,4.0,姚萱,副教授,30,HGD411,四 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院,外国交流学生\r\n\
ICES110012.01,中国概况（上）,2.0,许静,讲师,30,HGD405,四 8-9 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:25-16:55",国际文化交流学院,15 临床医学(六年制)\r\n\
ICES110012.02,中国概况（上）,2.0,赵雪倩,高级讲师,40,HGD414,一 11-12 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院 ,15 留学生\r\n\
ICES110012.03,中国概况（上）,2.0,许金生,副教授,40,HGD414,二 11-12 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院,15 留学生\r\n\
ICES110012.04,中国概况（上）,2.0,赵雪倩,高级讲师,40,HGD414,三 11-12 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院 ,15 留学生\r\n\
ICES110012.05,中国概况（上）,2.0,许金生,副教授,40,HGD414,四 11-12 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：18:30-20:00",国际文化交流学院,15 留学生'

COURSE_DATA['留学生'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,备注,考试时间,开课系,选课限制条件\r\n\
FINE110001.01,影视剧艺术,2.0,龚金平,副教授,50,H6204,一 8-9 ,上海市精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心,\r\n\
FINE110001.03,影视剧艺术,2.0,周涛,讲师,50,H4306,四 8-9 ,上海市精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心,\r\n\
FINE110006.01,校园歌曲赏析和创作,2.0,钱武杰,讲师,20,H6210,三 11-12 ,研讨型课程,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
FINE110006.02,校园歌曲赏析和创作,2.0,钱武杰,讲师,20,H6210,四 8-9 ,研讨型课程,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110014.01,中外音乐审美,2.0,陈莉萍,高级讲师,50,H2101,三 8-9 ,上海市精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心 ,\r\n\
FINE110014.02,中外音乐审美,2.0,陈莉萍,高级讲师,50,H2101,三 11-12 ,上海市精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心,\r\n\
FINE110014.03,中外音乐审美,2.0,钱武杰,讲师,50,H6209,三 8-9 ,上海市精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心 ,\r\n\
FINE110014.04,中外音乐审美,2.0,乔靖,讲师,50,H6105,一 11-12 ,上海市精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心,\r\n\
FINE110015.01,中西美术,2.0,张勇,高级讲师,50,H4206,四 11-12 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心 ,\r\n\
FINE110017.01,书法审美,2.0,晏海林,副教授,15,H艺术设计系207,三 8-9 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110018.01,艺术设计原理,2.0,周进,高级讲师,30,H4408,一 11-12 ,研讨型课程,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心 ,\r\n\
FINE110029.01,爵士乐赏析,2.0,乔靖,讲师,50,H6105,一 8-9 ,校级精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心,\r\n\
FINE110031.01,数码钢琴演奏（初级）,2.0,花白,讲师,24,H艺术教育馆2F钢琴教室,四 11-12 ,,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
FINE110032.01,数码钢琴演奏（中级）,2.0,"陈瑜\r\n\
花白","讲师\r\n\
讲师",24,H艺术教育馆2F钢琴教室,三 8-9 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110032.02,数码钢琴演奏（中级）,2.0,花白,讲师,24,H艺术教育馆2F钢琴教室,四 8-9 ,,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110033.01,中外电影比较研究,2.0,龚金平,副教授,30,H6202,一 11-12 ,研讨型课程,"考试日期：论文,2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
FINE110033.02,中外电影比较研究,2.0,龚金平,副教授,30,H6202,三 11-12 ,研讨型课程,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
FINE110034.01,合唱作品赏析与实践（初级）,2.0,"陈瑜\r\n\
张鹿","讲师\r\n\
助理研究员",50,H艺术教育馆2F排练厅二,三 11-12 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
FINE110036.01,世界民族音乐文化,2.0,陈莉萍,高级讲师,50,H2101,四 8-9 ,校级精品课程团队,"考试日期：论文,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110036.02,世界民族音乐文化,2.0,花白,讲师,50,H4206,三 11-12 ,校级精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",艺术教育中心,\r\n\
FINE110038.01,中外建筑与环境艺术,2.0,张榉文,讲师,50,H6301,三 8-9 ,,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110039.01,中世纪艺术,2.0,宋可即,助理研究员,20,H2110,一 11-12 ,全英语课程,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
FINE110040.01,现代设计思维,2.0,赵阳,讲师,15,H艺术设计系207,一 8-9 ,,"考试日期：论文,2015-12-14\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110040.02,现代设计思维,2.0,赵阳,讲师,15,H艺术设计系207,四 8-9 ,,"考试日期：论文,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110042.01,构成艺术与设计思维,2.0,丁玉红,讲师,30,H6207,四 8-9 ,,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110042.02,构成艺术与设计思维,2.0,丁玉红,讲师,30,H6207,四 11-12 ,,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
FINE110043.01,数码艺术设计基础,2.0,白建松,讲师,15,H6202,三 8-9 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110045.01,新媒体艺术,2.0,白建松,讲师,50,H4303,三 11-12 ,,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
FINE110046.01,数字动画艺术与设计,2.0,白建松,讲师,15,H6202,四 8-9 ,,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110048.01,室内设计基础,2.0,宋颖,讲师,50,H6206,三 11-12 ,,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
FINE110053.01,外国代表性舞蹈表演与赏析,2.0,张鹿,助理研究员,15,H艺术教育馆2F排练厅二,三 8-9 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110054.01,建筑空间艺术之旅,2.0,丁玉红,讲师,50,H6207,三 8-9 ,,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110056.01,视觉艺术流派解析,2.0,赵阳,讲师,50,H4303,三 8-9 ,,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110057.01,影视编剧新视野,2.0,周涛,讲师,15,H2210,一 8-9 ,研讨型课程,"考试日期：其他,2015-12-14\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110058.01,建筑艺术创意解读,2.0,张榉文,讲师,35,H6102,三 11-12 ,研讨型课程,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
FINE110058.02,建筑艺术创意解读,2.0,张榉文,讲师,35,H6102,四 11-12 ,研讨型课程,"考试日期：论文,2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
FINE110059.01,中国音乐史（上）,2.0,,,30,HGX305,一 8-9 ,,,艺术教育中心 ,15 艺术管理\r\n\
FINE110061.01,西方音乐史（上）,2.0,王丹丹,教授,30,HGX206,二 8-9 ,,,艺术教育中心,15 艺术管理\r\n\
FINE110063.01,城市公共艺术,2.0,汤筠冰,副教授,50,H4303,一 11-12 ,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
FINE110071.01,素描.,2.0,王天德,教授,15,H3301,三 8-9 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110071.02,素描.,2.0,王天德,教授,15,H3301,三 11-12 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
FINE110071.03,素描.,2.0,汤筠冰,副教授,15,H3301,一 8-9 ,,"考试日期：其他,2015-12-14\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110071.04,素描.,2.0,汤筠冰,副教授,15,H3301,四 8-9 ,,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110072.01,色彩.,2.0,周进,高级讲师,20,H艺术设计系206,五 8-9 ,,"考试日期：其他,2015-12-18\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110073.01,写生,2.0,张勇,高级讲师,20,H艺术设计系201,三 8-9 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110073.02,写生,2.0,张勇,高级讲师,20,H艺术设计系201,四 8-9 ,,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110075.01,室内设计理论与实践,2.0,宋颖,讲师,18,H6210,一 11-12 ,研讨型课程,"考试日期：论文,2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
FINE110076.01,微电影与微时代,2.0,许肖潇,讲师,35,H6202,一 8-9 ,研讨型课程,"考试日期：其他,2015-12-14\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
FINE110077.01,微影人的自我修养,2.0,许肖潇,讲师,15,H6210,三 8-9 ,研讨型课程,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
FINE110001.02,影视剧艺术,2.0,许肖潇,讲师,50,JB303,一 11-12 ,上海市精品课程团队,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,'
COURSE_DATA['美育'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '选课序号,课程名称,学分,教师,职称,人数,教室,时间,备注,考试时间,选课限制条件\r\n\
CHIN120002.01,中国文学传统,2.0,汪涌豪,教授,100,HGX207,一 3-4 ,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：9:55-11:35","15 中国语言文学类\r\n\
15 新闻传播学类"\r\n\
CHIN120002.02,中国文学传统,2.0,朱刚,教授,100,HGX307,一 3-4 ,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：9:55-11:35","15 中国语言文学类\r\n\
15 新闻传播学类"\r\n\
CHIN120003.01,美学,2.0,张宝贵,教授,80,HGX105,一 8-9 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:25-17:05",15 中国语言文学类\r\n\
CHIN120006.01,现代文艺赏析,2.0,金理,副教授,60,H6301,三 6-7 ,,"考试日期：论文,2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",15 中国语言文学类\r\n\
CHIN120007.01,现代语言学,2.0,盛益民,讲师,60,HGX310,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",15 中国语言文学类\r\n\
CHIN120008.01,语言学名著选读,2.0,霍四通,副教授,60,H6201,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",15 中国语言文学类\r\n\
CHIN120009.01,中西文艺学名著导读,2.0,张旭曙,副教授,60,HGX404,四 8-9 ,,"考试日期：论文,2015-12-24\r\n\
\r\n\
考试时间：15:25-17:05",15 中国语言文学类\r\n\
CHIN120011.01,汉语概论,2.0,"董建交\r\n\
盛益民\r\n\
陶寰","讲师\r\n\
讲师\r\n\
副教授",100,HGX507,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",15 中国语言文学类\r\n\
CHIN120012.01,中国文学经典,3.0,周兴陆,教授,80,HGX509,二 1-4 ,单周上课，双周上课加讨论,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：18:30-20:30",15 中国语言文学类\r\n\
CHIN120012.02,中国文学经典,3.0,张金耀,讲师,80,HGX510,二 1-4 ,单周上课，双周上课加讨论,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：18:30-20:30",15 中国语言文学类\r\n\
CHIN120012.03,中国文学经典,3.0,王文晖,副教授,80,H3209,二 1-4 ,单周上课，双周上课加讨论,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：18:30-20:30",15 中国语言文学类\r\n\
CHIN130001.01,古代汉语,3.0,梁银峰,副教授,50,H5114,五 3-5 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",13 中国语言文学系\r\n\
CHIN130001.02,古代汉语,3.0,王文晖,副教授,50,HGX410,五 3-5 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",13 中国语言文学系\r\n\
CHIN130001.03,古代汉语,3.0,董建交,讲师,50,HGX509,五 3-5 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",13 中国语言文学系\r\n\
CHIN130002.01,现代汉语(上),2.0,陶寰,副教授,60,H6404,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30","14 新闻学院\r\n\
14 中国语言文学系"\r\n\
CHIN130002.02,现代汉语(上),2.0,陈忠敏,教授,60,HGX510,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30","14 中国语言文学系\r\n\
14 新闻学院"\r\n\
CHIN130002.03,现代汉语(上),2.0,平悦铃,副教授,60,H6209,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30","14 新闻学院\r\n\
14 中国语言文学系"\r\n\
CHIN130004.01,中国现当代文学史(上),2.0,栾梅健,教授,65,H3406,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 中国语言文学系\r\n\
14 新闻学院"\r\n\
CHIN130004.02,中国现当代文学史(上),2.0,陈思和,教授,65,H3109,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","14 新闻学院\r\n\
14 中国语言文学系"\r\n\
CHIN130006.01,中国古代文学史(上),2.0,张金耀,讲师,121,H3408,四 8-9 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","14 新闻学院\r\n\
14 中国语言文学系"\r\n\
CHIN130008.01,中国古代文学史(下),2.0,吴兆路,研究员,60,HGX304,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 中国语言文学系\r\n\
CHIN130008.02,中国古代文学史(下),2.0,罗书华,教授,60,HGX303,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 中国语言文学系\r\n\
CHIN130009.01,外国文学史,3.0,王宏图,教授,50,HGX509,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 中国语言文学系\r\n\
CHIN130009.02,外国文学史,3.0,戴从容,教授,50,H6206,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 中国语言文学系\r\n\
CHIN130010.01,文学概论,2.0,张岩冰,副教授,115,HGX307,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 中国语言文学系\r\n\
CHIN130013.01,中国文学批评史,3.0,邬国平,教授,50,H6509,三 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：8:30-10:30",12 汉语言文学\r\n\
CHIN130013.02,中国文学批评史,3.0,羊列荣,副教授,50,H6401,三 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：8:30-10:30",12 汉语言文学\r\n\
CHIN130015.01,鲁迅精读,2.0,郜元宝,教授,50,HGX301,二 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 汉语言文学\r\n\
CHIN130017.01,《文心雕龙》精读,2.0,周兴陆,教授,50,HGX406,一 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 汉语言文学\r\n\
CHIN130017.02,《文心雕龙》精读,2.0,邬国平,教授,50,HGX403,一 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 汉语言文学\r\n\
CHIN130020.01,专业英语(汉语言文学),3.0,王柏华,副教授,80,,四 3-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 汉语言文学\r\n\
CHIN130020.01,专业英语(汉语言文学),3.0,王柏华,副教授,80,HGX106,四 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 汉语言文学\r\n\
CHIN130024.01,《普通语言学教程》精读,2.0,申小龙,教授,30,HGX302,二 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 汉语言\r\n\
CHIN130025.01,《中国话的文法》精读,2.0,杨宁,副教授,30,HGX509,一 6-7 ,,"考试日期：论文,2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 汉语言\r\n\
CHIN130026.01,《说文解字》精读,2.0,殷寄明,教授,30,HGX404,一 3-4 ,,"考试日期：2015-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 汉语言\r\n\
CHIN130030.01,西方语言学,2.0,蒋勇,副教授,35,H6504,三 3-4 ,全英文课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",12 汉语言\r\n\
CHIN130031.01,专业英语(汉语言),3.0,龚群虎,教授,35,HGX306,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",12 汉语言\r\n\
CHIN130037.01,中国古典美学,2.0,谢金良,教授,50,HGX304,四 3-4 ,,"考试日期：论文,2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",13 汉语言文学\r\n\
CHIN130228.01,报刊阅读（留学生）,4.0,戴从容,教授,3,H6507,一 6-7,,"考试日期：2015-12-30\r\n\
考试时间：08:30-10:30",留学生\r\n\
CHIN130228.01,报刊阅读（留学生）,4.0,戴从容,教授,3,H4208,三 3-4,,,留学生\r\n\
CHIN130056.01,《世说新语》精读,2.0,骆玉明,教授,80,H2115,一 6-7 ,,"考试日期：论文,2016-01-04\r\n\
\r\n\
考试时间：13:30-15:10",14 汉语言文学\r\n\
CHIN130058.01,《胡适文存》精读,2.0,段怀清,副教授,50,HGX510,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",14 汉语言文学\r\n\
CHIN130093.01,西方古典美学,2.0,王才勇,研究员,50,H6101,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",13 汉语言文学\r\n\
CHIN130111.01,沈从文精读,2.0,张新颖,教授,50,HGX103,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 汉语言文学\r\n\
CHIN130112.01,中国当代文学专题,2.0,李振声,教授,50,H6407,三 3-4 ,,"考试日期：论文,2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",12 汉语言文学\r\n\
CHIN130118.01,《管锥编》精读,2.0,傅杰,教授,40,HGX203,二 11-12 ,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:10",13 汉语言文学\r\n\
CHIN130126.01,现当代话剧专题研究,2.0,梁燕丽,副教授,50,HGX401,三 11-12 ,,"考试日期：论文,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",12 汉语言文学\r\n\
CHIN130133.01,音韵学,2.0,董建交,讲师,35,HGX309,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 汉语言\r\n\
CHIN130137.01,社会语言学,2.0,霍四通,副教授,30,H2217,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",13 汉语言\r\n\
CHIN130139.01,汉语修辞学史,2.0,吴礼权,教授,30,HGX407,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",14 汉语言\r\n\
CHIN130152.01,语法学,2.0,卢英顺,教授,30,H2220,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",14 汉语言\r\n\
CHIN130153.01,古文字学,2.0,郭永秉,副教授,30,H2107,四 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",12 汉语言\r\n\
CHIN130154.01,《马氏文通》精读,2.0,赵国军,助理研究员,30,HGX508,三 3-4 ,,"考试日期：论文,2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 汉语言\r\n\
CHIN130155.01,计算语言学,2.0,陈振宇,副教授,30,HGX404,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",12 汉语言\r\n\
CHIN130168.01,语言统计学,2.0,马良,讲师,30,HGX409,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",13 汉语言\r\n\
CHIN130177.01,汉语语法词汇史,2.0,梁银峰,副教授,30,H2217,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",13 汉语言\r\n\
CHIN130182.01,近现代通俗文学专题,2.0,袁进,教授,50,H5114,三 3-4 ,,"考试日期：论文,2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",13 汉语言文学\r\n\
CHIN130184.01,中国电影史研究,2.0,杨新宇,副教授,50,HGX406,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",14 汉语言文学\r\n\
CHIN130187.01,语音学,2.0,平悦铃,副教授,35,H3201,一 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 汉语言\r\n\
CHIN130197.01,比较史诗研究,2.0,白钢,副研究员,50,HGX508,一 6-7 ,,"考试日期：论文,2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",12 汉语言文学\r\n\
CHIN130213.01,语言类型学,2.0,盛益民,讲师,30,HGX406,四 8-9 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:25-15:05",13 汉语言\r\n\
CHIN130215.01,新媒体语言研究,2.0,赵国军,助理研究员,30,HGX302,三 11-12 ,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",14 汉语言\r\n\
CHIN130216.01,唐代社会与文学,2.0,唐雯,副研究员,50,H3306,一 6-7 ,,"考试日期：论文,2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",13 汉语言文学\r\n\
CHIN130217.01,神经语言学,2.0,马良,讲师,30,H6210,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",12 汉语言\r\n\
CHIN130218.01,民间文学与民俗文化专题,2.0,张勤,副教授,50,H3408,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",12 汉语言文学\r\n\
ICES110001.01,留学生高级汉语I,4.0,赵国军,助理研究员,60,HGX209,三 1-2 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：8:00-9:40",15 法学\r\n\
ICES110001.01,留学生高级汉语I,4.0,赵国军,助理研究员,60,HGX209,五 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：8:00-9:40",15 法学\r\n\
ICES110003.01,留学生专业汉语I,4.0,卢英顺,教授,50,HGX502,三 1-2 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:00-09:40",留学生\r\n\
ICES110003.01,留学生专业汉语I,4.0,卢英顺,教授,50,HGX502,五 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:00-09:40",留学生\r\n\
RZSY118001.01,语言科学,2.0,陈忠敏,教授,20,HGX502,一 11-12 ,,"考试日期：其他,2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",\r\n\
RZSY118005.01,文化语言学,2.0,申小龙,教授,20,H5318,三 3-4 ,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",\r\n\
FORE120001.01,语言学导论,2.0,熊学亮,教授,150,HGX104,一 6-7 ,"复旦大学教学名师\r\n\
上海市精品课程团队","考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
FORE120001.02,语言学导论,2.0,冯予力,讲师,100,H6201,五 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
FORE120002.01,世界文学导读,2.0,汪洪章,教授,100,H6112,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
FORE120003.01,美国文学史选读,2.0,王爱萍,副教授,50,H5116,三 6-7 ,全英文课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
FORE120006.01,英美报刊,2.0,高永伟,副教授,80,H6112,三 6-7 ,全英文课程,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
FORE120007.01,美国历史与文化,2.0,朱建新,副教授,80,H6101,三 6-7 ,全英文课程,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
FORE120011.01,希腊文化，神话和哲学,2.0,吴勇立,副教授,50,H6105,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
FORE120012.01,非虚构文学赏析,2.0,沈黎,教授,35,H5115,二 1-2 ,全英文课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
FORE120013.01,英语短篇小说导读,2.0,张琼,副教授,50,H5110,一 6-7 ,全英文课程,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
FORE130003.01,中级英语(上),4.0,王爱萍,副教授,20,H5310,三 3-4 ,A班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.01,中级英语(上),4.0,王爱萍,副教授,20,H5310,五 3-4 ,A班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.02,中级英语(上),4.0,沈园,教授,20,H5304,三 3-4 ,B班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.02,中级英语(上),4.0,沈园,教授,20,H5304,五 3-4 ,B班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.03,中级英语(上),4.0,朱绩崧,讲师,20,H5408,三 3-4 ,C班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.03,中级英语(上),4.0,朱绩崧,讲师,20,H5408,五 3-4 ,C班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.04,中级英语(上),4.0,朱建新,副教授,13,H5415,三 1-2 ,留学生班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.04,中级英语(上),4.0,朱建新,副教授,13,H5415,五 3-4 ,留学生班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130003.05,中级英语(上),4.0,姜倩,讲师,16,H5220,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 翻译\r\n\
FORE130003.05,中级英语(上),4.0,姜倩,讲师,16,H5220,四 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 翻译\r\n\
FORE130005.01,高级英语(上),4.0,张楠,讲师,24,H5412,三 3-4 ,A班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130005.01,高级英语(上),4.0,张楠,讲师,24,H5412,五 3-4 ,A班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130005.02,高级英语(上),4.0,金雯,副教授,24,H5414,三 3-4 ,B班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130005.02,高级英语(上),4.0,金雯,副教授,24,H5414,五 3-4 ,B班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130005.03,高级英语(上),4.0,包慧怡,,13,H5220,三 3-4 ,留学生班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130005.03,高级英语(上),4.0,包慧怡,,13,H5220,五 3-4 ,留学生班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130007.01,英语写作I(上),2.0,Miles Link,,30,H5314,二 1-2 ,AB班,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130007.02,英语写作I(上),2.0,Miles Link,,30,H5314,二 3-4 ,BC班,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130007.03,英语写作I(上),2.0,Miles Link,,13,H5216,一 3-4 ,留学生班,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",14 英语\r\n\
FORE130007.04,英语写作I(上),2.0,刘敬国,副教授,16,H5415,四 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",14 翻译\r\n\
FORE130009.01,英语写作II(上),2.0,曲卫国,教授,24,H5208,二 1-2 ,"A班\r\n\
上海市教学名师","考试日期：论文\r\n\
\r\n\
考试时间：-",13 英语\r\n\
FORE130009.02,英语写作II(上),2.0,宋_,讲师,24,H5213,二 1-2 ,B班,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 英语\r\n\
FORE130009.03,英语写作II(上),2.0,包慧怡,,13,H5220,四 1-2 ,留学生班,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130018.01,英语听说II(上),2.0,外教,,30,H5205,三 1-2 ,AB班,"考试日期：口试\r\n\
\r\n\
考试时间：-",14 英语\r\n\
FORE130018.02,英语听说II(上),2.0,外教,,30,H5205,五 1-2 ,BC班,"考试日期：口试\r\n\
\r\n\
考试时间：-",14 英语\r\n\
FORE130018.03,英语听说II(上),2.0,外教,,13,H5205,一 6-7 ,留学生班,"考试日期：口试\r\n\
\r\n\
考试时间：-",14 英语\r\n\
FORE130020.01,英语写作III,2.0,郑咏滟,副教授,50,H5108,二 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 英语\r\n\
FORE130021.01,英国文学史(上),2.0,孙建,教授,70,H5108,二 3-4 ,"复旦大学教学名师\r\n\
研讨型课程","考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130023.01,美国文学史,2.0,金雯,副教授,50,H5108,三 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 英语\r\n\
FORE130024.01,翻译理论与技巧(一),2.0,张冲,教授,24,H5201,一 3-4 ,"A班\r\n\
上海市教学名师\r\n\
 研讨型课程","考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130024.02,翻译理论与技巧(一),2.0,孙靖,副教授,24,H5308,一 1-2 ,B班,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130024.03,翻译理论与技巧(一),2.0,谈峥,教授,13,H5308,一 3-4 ,留学生班,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 英语\r\n\
FORE130027.01,英汉口译,2.0,孙靖,副教授,50,H5202,一 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",12 英语\r\n\
FORE130034.01,高级德语(上),6.0,DAAD,,15,H5416,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 德语\r\n\
FORE130034.01,高级德语(上),6.0,DAAD,,15,H5416,四 1-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 德语\r\n\
FORE130046.01,德语写作II,2.0,Guenther,,23,H5105,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 德语\r\n\
FORE130048.01,翻译理论与技巧(德语)(上),2.0,吴勇立,副教授,23,H5417,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 德语\r\n\
FORE130051.01,德语文学史及作品选读(下),2.0,吴勇立,副教授,23,H5417,五 3-4 ,研讨型课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 德语\r\n\
FORE130059.01,法语写作I(上),2.0,Laetitia,,17,H5220,二 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 法语\r\n\
FORE130061.01,法语写作II(上),2.0,Cyril,,17,H5305,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 法语\r\n\
FORE130063.01,法语写作III,2.0,Cyril,,29,H6302,四 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 法语\r\n\
FORE130064.01,翻译理论与技巧(法语)(上),2.0,袁莉,副教授,17,H5419,二 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 法语\r\n\
FORE130066.01,法语报刊,2.0,Cyril,,17,H5418,五 1-2 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 法语\r\n\
FORE130067.01,法国概况,2.0,褚孝泉,教授,17,H5419,二 3-4 ,复旦大学教学名师,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 法语\r\n\
FORE130068.01,法国文学史(上),2.0,陈杰,,17,H5418,五 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 法语\r\n\
FORE130072.01,日语II(上),8.0,"赵彦志\r\n\
艾菁","副教授\r\n\
讲师",16,H5211,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 日语\r\n\
FORE130072.01,日语II(上),8.0,"赵彦志\r\n\
艾菁","副教授\r\n\
讲师",16,H5211,一 6-7 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 日语\r\n\
FORE130072.01,日语II(上),8.0,"赵彦志\r\n\
艾菁","副教授\r\n\
讲师",16,H5211,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 日语\r\n\
FORE130072.01,日语II(上),8.0,"赵彦志\r\n\
艾菁","副教授\r\n\
讲师",16,H5211,四 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 日语\r\n\
FORE130074.01,日语III(上),6.0,岛田由利子,,16,H5107,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 日语\r\n\
FORE130074.01,日语III(上),6.0,岛田由利子,,16,H5107,二 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 日语\r\n\
FORE130074.01,日语III(上),6.0,岛田由利子,,16,H5107,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 日语\r\n\
FORE130081.01,日语写作II,2.0,岛田由利子,,13,H5408,一 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 日语\r\n\
FORE130082.01,翻译理论与技巧(上),2.0,庞志春,副教授,16,H5308,二 3-4 ,研讨型课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 日语\r\n\
FORE130085.01,日本文学史(下),2.0,岛田由利子,,13,H5314,四 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",12 日语\r\n\
FORE130088.01,日本文学选读(下),2.0,邹波,高级讲师,13,H5319,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 日语\r\n\
FORE130089.01,日语文法,2.0,赵彦志,副教授,16,H5109,五 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 日语\r\n\
FORE130095.01,高级俄语(上),6.0,李新梅,副教授,13,H5218,二 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 俄语\r\n\
FORE130095.01,高级俄语(上),6.0,李新梅,副教授,13,H5218,四 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 俄语\r\n\
FORE130095.01,高级俄语(上),6.0,李新梅,副教授,13,H5218,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 俄语\r\n\
FORE130097.01,高级俄语(下),4.0,谢尔盖,,13,H5404,一 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 俄语\r\n\
FORE130097.01,高级俄语(下),4.0,谢尔盖,,13,H5404,三 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 俄语\r\n\
FORE130099.01,俄语视听说II(上),2.0,娜塔莉娅,,15,H5203,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130099.01,俄语视听说II(上),2.0,娜塔莉娅,,15,H5203,四 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130109.01,俄语报刊,2.0,谢尔盖,,13,H5419,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：15:30-17:30",13 俄语\r\n\
FORE130112.01,中级韩国语(上),8.0,"郭一诚\r\n\
姜颖","讲师\r\n\
讲师",15,H5218,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 朝鲜语\r\n\
FORE130112.01,中级韩国语(上),8.0,"郭一诚\r\n\
姜颖","讲师\r\n\
讲师",15,H5218,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 朝鲜语\r\n\
FORE130112.01,中级韩国语(上),8.0,"郭一诚\r\n\
姜颖","讲师\r\n\
讲师",15,H5218,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 朝鲜语\r\n\
FORE130112.01,中级韩国语(上),8.0,"郭一诚\r\n\
姜颖","讲师\r\n\
讲师",15,H5218,五 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 朝鲜语\r\n\
FORE130117.01,韩国语视听说I(下),2.0,外教,,15,H5203,二 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 朝鲜语\r\n\
FORE130117.01,韩国语视听说I(下),2.0,外教,,15,H5203,四 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 朝鲜语\r\n\
FORE130119.01,韩国语视听说II(下),2.0,外教,,15,H5203,二 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 朝鲜语\r\n\
FORE130119.01,韩国语视听说II(下),2.0,外教,,15,H5203,四 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 朝鲜语\r\n\
FORE130125.01,翻译理论与技巧韩国语(上),2.0,郭一诚,讲师,17,H5110,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 朝鲜语\r\n\
FORE130127.01,韩国语写作(上),2.0,姜颖,讲师,15,H5309,二 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 朝鲜语\r\n\
FORE130129.01,韩语报刊选读,2.0,姜宝有,教授,17,H5110,五 3-4 ,复旦大学教学名师,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 朝鲜语\r\n\
FORE130131.01,英语多文体阅读(上),2.0,强晓,讲师,20,H6210,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 翻译\r\n\
FORE130136.01,口译初步与视译(下),2.0,管玉华,讲师,18,H5207,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",12 翻译\r\n\
FORE130141.01,交替传译I,2.0,管玉华,讲师,20,H5207,五 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 翻译\r\n\
FORE130144.01,英汉互译技巧I,2.0,王建开,教授,20,H5418,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 翻译\r\n\
FORE130151.01,翻译理论与策略,2.0,陶友兰,副教授,18,H5218,四 3-4 ,上海市精品课程团队,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 翻译\r\n\
FORE130180.01,第二外语(日语)(上),4.0,王菁洁,,35,H5109,一 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","13 翻译\r\n\
13 英语"\r\n\
FORE130180.01,第二外语(日语)(上),4.0,王菁洁,,35,H5109,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","13 翻译\r\n\
13 英语"\r\n\
FORE130182.01,第二外语(日语)(下),4.0,杨晓敏,讲师,35,H6406,一 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","12 英语\r\n\
12 翻译"\r\n\
FORE130182.01,第二外语(日语)(下),4.0,杨晓敏,讲师,35,H6406,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","12 英语\r\n\
12 翻译"\r\n\
FORE130183.01,第二外语(法语)(上),4.0,陈杰,,35,H6504,一 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","13 英语\r\n\
13 翻译"\r\n\
FORE130183.01,第二外语(法语)(上),4.0,陈杰,,35,H6504,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","13 英语\r\n\
13 翻译"\r\n\
FORE130185.01,第二外语(法语)(下),4.0,杨振,讲师,35,H6401,一 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","12 英语\r\n\
12 翻译"\r\n\
FORE130185.01,第二外语(法语)(下),4.0,杨振,讲师,35,H6401,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","12 英语\r\n\
12 翻译"\r\n\
FORE130186.01,第二外语(德语)(上),4.0,李晶浩,讲师,35,H6409,一 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","13 翻译\r\n\
13 英语"\r\n\
FORE130186.01,第二外语(德语)(上),4.0,李晶浩,讲师,35,H6409,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","13 翻译\r\n\
13 英语"\r\n\
FORE130188.01,第二外语(德语)(下),4.0,"刘炜\r\n\
Luger","副教授\r\n\
",35,H6408,一 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","12 英语\r\n\
12 翻译"\r\n\
FORE130188.01,第二外语(德语)(下),4.0,"刘炜\r\n\
Luger","副教授\r\n\
",35,H6408,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10","12 英语\r\n\
12 翻译"\r\n\
FORE130195.01,英美戏剧(上),2.0,谈峥,教授,70,H5108,四 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-03:00",13 英语\r\n\
FORE130199.01,英美散文(上),2.0,丁骏,讲师,50,H5106,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",12 英语\r\n\
FORE130205.01,英美短篇小说,2.0,汪洪章,教授,80,H6101,三 1-2 ,研讨型课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 翻译\r\n\
13 英语"\r\n\
FORE130206.01,商务英语,2.0,高永伟,副教授,50,H6104,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",12 英语\r\n\
FORE130222.01,法国现代短篇小说,2.0,Laetitia,,29,H6302,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 法语\r\n\
FORE130223.01,法国戏剧,2.0,郭斯嘉,讲师,29,H6302,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",12 法语\r\n\
FORE130227.01,中法文化比较,2.0,张华,讲师,29,H5302,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 法语\r\n\
FORE130231.01,日本文语文法,2.0,岛田由利子,,13,H5314,四 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",12 日语\r\n\
FORE130237.01,俄语词汇学,2.0,谢尔盖,,13,H5404,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",12 俄语\r\n\
FORE130237.01,俄语词汇学,2.0,谢尔盖,,13,H5404,三 3-4(1-16周),,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",12 俄语\r\n\
FORE130239.01,外贸俄语,2.0,汪海霞,讲师,13,H5310,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 俄语\r\n\
FORE130240.01,俄罗斯诗歌,2.0,娜塔莉娅,,13,H5404,二 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 俄语\r\n\
FORE130252.01,韩国文化,2.0,黄贤玉,副教授,17,HGD605,三 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",12 朝鲜语\r\n\
FORE130255.01,韩语语法学,2.0,吴仙花,讲师,15,H5309,五 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 朝鲜语\r\n\
FORE130269.01,俄语泛读(中),2.0,汪海霞,讲师,15,H5309,二 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130275.01,德语国家国情,2.0,Luger,,12,H5105,二 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","13 德语\r\n\
12 德语"\r\n\
FORE130276.01,奥地利文化,2.0,Luger,,12,H5105,二 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","12 德语\r\n\
13 德语"\r\n\
FORE130283.01,英语阅读Ⅱ,2.0,宋_,讲师,30,H5302,二 3-4 ,AB班,"考试日期：论文,2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 英语\r\n\
FORE130283.02,英语阅读Ⅱ,2.0,冯予力,讲师,30,H5417,三 1-2 ,BC班,"考试日期：论文,2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 英语\r\n\
FORE130283.03,英语阅读Ⅱ,2.0,宋_,讲师,13,H5402,三 3-4 ,留学生班,"考试日期：论文,2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 英语\r\n\
FORE130286.01,英语听说与译述（上）,2.0,冯超,讲师,16,H5207,一 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 翻译\r\n\
FORE130287.01,古汉语选读（上）,2.0,刘敬国,副教授,16,H5415,五 1-2 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 翻译\r\n\
FORE130292.01,日语听音（下）,2.0,黄小丽,讲师,16,H5207,四 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 日语\r\n\
FORE130294.01,日语会话（下）,2.0,杨晓敏,讲师,16,H5410,三 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 日语\r\n\
FORE130296.01,基础德语（上）,10.0,"魏育青\r\n\
刘炜\r\n\
姜林静","教授\r\n\
副教授\r\n\
讲师",18,H5409,一 1-2 ,复旦大学教学名师,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 德语\r\n\
FORE130296.01,基础德语（上）,10.0,"魏育青\r\n\
刘炜\r\n\
姜林静","教授\r\n\
副教授\r\n\
讲师",18,H5409,二 3-4 ,复旦大学教学名师,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 德语\r\n\
FORE130296.01,基础德语（上）,10.0,"魏育青\r\n\
刘炜\r\n\
姜林静","教授\r\n\
副教授\r\n\
讲师",18,H5409,三 3-4 ,复旦大学教学名师,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 德语\r\n\
FORE130296.01,基础德语（上）,10.0,"魏育青\r\n\
刘炜\r\n\
姜林静","教授\r\n\
副教授\r\n\
讲师",18,H5409,四 3-4 ,复旦大学教学名师,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 德语\r\n\
FORE130296.01,基础德语（上）,10.0,"魏育青\r\n\
刘炜\r\n\
姜林静","教授\r\n\
副教授\r\n\
讲师",18,H5409,五 3-4 ,复旦大学教学名师,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 德语\r\n\
FORE130300.01,中级德语（上）,10.0,"王滨滨\r\n\
孔婧倩","教授\r\n\
讲师",16,H5208,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 德语\r\n\
FORE130300.01,中级德语（上）,10.0,"王滨滨\r\n\
孔婧倩","教授\r\n\
讲师",16,H5208,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 德语\r\n\
FORE130300.01,中级德语（上）,10.0,"王滨滨\r\n\
孔婧倩","教授\r\n\
讲师",16,H5208,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 德语\r\n\
FORE130300.01,中级德语（上）,10.0,"王滨滨\r\n\
孔婧倩","教授\r\n\
讲师",16,H5208,四 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 德语\r\n\
FORE130300.01,中级德语（上）,10.0,"王滨滨\r\n\
孔婧倩","教授\r\n\
讲师",16,H5208,五 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 德语\r\n\
FORE130301.01,德语视听Ⅱ（上）,2.0,Guenther,,16,H5203,一 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 德语\r\n\
FORE130307.01,中级法语（上）,10.0,"郭斯嘉\r\n\
蔡槐鑫","讲师\r\n\
副教授",17,H5109,一 1-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 法语\r\n\
FORE130307.01,中级法语（上）,10.0,"郭斯嘉\r\n\
蔡槐鑫","讲师\r\n\
副教授",17,H5109,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 法语\r\n\
FORE130307.01,中级法语（上）,10.0,"郭斯嘉\r\n\
蔡槐鑫","讲师\r\n\
副教授",17,H5109,四 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 法语\r\n\
FORE130312.01,中级俄语（上）,10.0,"姜宏\r\n\
赵艳秋","教授\r\n\
讲师",15,H5215,一 3-4 ,"复旦大学教学名师\r\n\
研讨型课程","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130312.01,中级俄语（上）,10.0,"姜宏\r\n\
赵艳秋","教授\r\n\
讲师",15,H5215,二 1-2 ,"复旦大学教学名师\r\n\
研讨型课程","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130312.01,中级俄语（上）,10.0,"姜宏\r\n\
赵艳秋","教授\r\n\
讲师",15,H5215,三 3-4 ,"复旦大学教学名师\r\n\
研讨型课程","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130312.01,中级俄语（上）,10.0,"姜宏\r\n\
赵艳秋","教授\r\n\
讲师",15,H5215,四 3-4 ,"复旦大学教学名师\r\n\
研讨型课程","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130312.01,中级俄语（上）,10.0,"姜宏\r\n\
赵艳秋","教授\r\n\
讲师",15,H5215,五 3-4 ,"复旦大学教学名师\r\n\
研讨型课程","考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 俄语\r\n\
FORE130313.01,俄语视听说Ⅲ,1.0,谢尔盖,,13,H5203,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 俄语\r\n\
FORE130315.01,基础韩国语（上）,10.0,黄贤玉,副教授,16,H5216,二 3-4 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 朝鲜语\r\n\
FORE130315.01,基础韩国语（上）,10.0,黄贤玉,副教授,16,H5216,三 3-4 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 朝鲜语\r\n\
FORE130315.01,基础韩国语（上）,10.0,黄贤玉,副教授,16,H5216,四 3-4 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 朝鲜语\r\n\
FORE130315.01,基础韩国语（上）,10.0,黄贤玉,副教授,16,H5216,五 1-4 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 朝鲜语\r\n\
FORE130318.01,韩国语泛读Ⅱ,2.0,崔惠玲,讲师,15,H5208,五 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 朝鲜语\r\n\
FORE130320.01,高级韩国语（上）,8.0,"吴仙花\r\n\
崔惠玲","讲师\r\n\
讲师",15,H5309,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 朝鲜语\r\n\
FORE130320.01,高级韩国语（上）,8.0,"吴仙花\r\n\
崔惠玲","讲师\r\n\
讲师",15,H5309,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 朝鲜语\r\n\
FORE130320.01,高级韩国语（上）,8.0,"吴仙花\r\n\
崔惠玲","讲师\r\n\
讲师",15,H5309,四 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 朝鲜语\r\n\
FORE130320.01,高级韩国语（上）,8.0,"吴仙花\r\n\
崔惠玲","讲师\r\n\
讲师",15,H5309,五 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 朝鲜语\r\n\
FORE130322.01,学术前沿专题,2.0,李征,教授,30,H6205,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 日语\r\n\
12 日语"\r\n\
FORE130323.01,商务口译,2.0,冯超,讲师,18,H5207,一 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 翻译\r\n\
FORE130327.01,高级法语(上),4.0,张华,讲师,17,H5208,一 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 法语\r\n\
FORE130327.01,高级法语(上),4.0,张华,讲师,17,H5208,四 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 法语\r\n\
FORE130345.01,英语演讲,2.0,单理杨,,24,H5205,二 3-4 ,,"考试日期：口试\r\n\
\r\n\
考试时间：-",15 英语类\r\n\
FORE130345.02,英语演讲,2.0,单理杨,,24,H5205,四 1-2 ,,"考试日期：口试\r\n\
\r\n\
考试时间：-",15 英语类\r\n\
FORE130345.03,英语演讲,2.0,单理杨,,24,H5205,四 3-4 ,,"考试日期：口试\r\n\
\r\n\
考试时间：-",15 英语类\r\n\
FORE130345.04,英语演讲,2.0,冯予力,讲师,20,H5207,四 3-4 ,留学生班,"考试日期：口试\r\n\
\r\n\
考试时间：-",15 英语\r\n\
FORE130346.01,英语精读（上）,4.0,张琼,副教授,19,H5415,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.01,英语精读（上）,4.0,张琼,副教授,19,H5415,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.02,英语精读（上）,4.0,郑咏滟,副教授,18,H5417,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.02,英语精读（上）,4.0,郑咏滟,副教授,18,H5417,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.03,英语精读（上）,4.0,丁骏,讲师,18,H5419,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.03,英语精读（上）,4.0,丁骏,讲师,18,H5419,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.04,英语精读（上）,4.0,段枫,副教授,18,H5418,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.04,英语精读（上）,4.0,段枫,副教授,18,H5418,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130346.05,英语精读（上）,4.0,徐蔚,讲师,20,H5107,二 3-4 ,留学生班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语\r\n\
FORE130346.05,英语精读（上）,4.0,徐蔚,讲师,20,H5107,三 3-4 ,留学生班,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 英语\r\n\
FORE130347.01,写作入门（上）,2.0,外教,,24,H5417,四 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130347.02,写作入门（上）,2.0,外教,,24,H5417,二 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130347.03,写作入门（上）,2.0,外教,,24,H5415,二 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",15 英语类\r\n\
FORE130347.04,写作入门（上）,2.0,徐蔚,讲师,20,H5107,五 3-4 ,留学生班,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",15 英语\r\n\
FORE130348.01,英语文学导读（上）,2.0,陈靓,副教授,24,H5306,二 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",15 英语类\r\n\
FORE130348.02,英语文学导读（上）,2.0,陈靓,副教授,24,H5306,二 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",15 英语类\r\n\
FORE130348.03,英语文学导读（上）,2.0,陈靓,副教授,24,H5306,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",15 英语类\r\n\
FORE130348.04,英语文学导读（上）,2.0,张楠,讲师,20,H5107,三 1-2 ,留学生班,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",15 英语\r\n\
FORE130398.01,第二外语(西班牙语)上,6.0,鹿秀川,,10,H5105,一 3-4 ,,"考试日期：2015-01-05\r\n\
\r\n\
考试时间：13:00-15:00",14 英语\r\n\
FORE130398.01,第二外语(西班牙语)上,6.0,鹿秀川,,10,H5105,四 3-4 ,,"考试日期：2015-01-05\r\n\
\r\n\
考试时间：13:00-15:00",14 英语\r\n\
FORE130398.01,第二外语(西班牙语)上,6.0,鹿秀川,,10,H5105,五 6-7 ,,"考试日期：2015-01-05\r\n\
\r\n\
考试时间：13:00-15:00",14 英语\r\n\
FORE130401.01,基础俄语（上）,10.0,"曾婷\r\n\
纪春萍","讲师\r\n\
讲师",16,H5211,一 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 俄语\r\n\
FORE130401.01,基础俄语（上）,10.0,"曾婷\r\n\
纪春萍","讲师\r\n\
讲师",16,H5211,二 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 俄语\r\n\
FORE130401.01,基础俄语（上）,10.0,"曾婷\r\n\
纪春萍","讲师\r\n\
讲师",16,H5211,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 俄语\r\n\
FORE130401.01,基础俄语（上）,10.0,"曾婷\r\n\
纪春萍","讲师\r\n\
讲师",16,H5211,四 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 俄语\r\n\
FORE130401.01,基础俄语（上）,10.0,"曾婷\r\n\
纪春萍","讲师\r\n\
讲师",16,H5211,五 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 俄语\r\n\
FORE130405.01,俄语会话（上）,2.0,娜塔莉娅,,16,H5415,四 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",15 俄语\r\n\
FORE130413.01,德语媒介与交际I,2.0,Guenther,,18,H5203,一 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 德语\r\n\
FORE130421.01,基础法语（上）,8.0,"彭俞霞\r\n\
杨振","讲师\r\n\
讲师",16,H5314,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 法语\r\n\
FORE130421.01,基础法语（上）,8.0,"彭俞霞\r\n\
杨振","讲师\r\n\
讲师",16,H5314,三 1-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 法语\r\n\
FORE130421.01,基础法语（上）,8.0,"彭俞霞\r\n\
杨振","讲师\r\n\
讲师",16,H5314,五 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 法语\r\n\
FORE130431.01,法国初级视听,2.0,Laetitia,,16,H5205,二 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 法语\r\n\
FORE130432.01,综合日语Ⅰ（上）,10.0,"刘佳琦\r\n\
黄小丽","讲师\r\n\
讲师",16,H5213,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 日语\r\n\
FORE130432.01,综合日语Ⅰ（上）,10.0,"刘佳琦\r\n\
黄小丽","讲师\r\n\
讲师",16,H5213,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 日语\r\n\
FORE130432.01,综合日语Ⅰ（上）,10.0,"刘佳琦\r\n\
黄小丽","讲师\r\n\
讲师",16,H5213,三 1-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 日语\r\n\
FORE130432.01,综合日语Ⅰ（上）,10.0,"刘佳琦\r\n\
黄小丽","讲师\r\n\
讲师",16,H5213,四 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",15 日语\r\n\
PHIL120006.01,佛教哲学,2.0,刘宇光,副教授,20,H5307,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
PHIL120012.01,哲学导论,3.0,郑召利,教授,120,H5302,"三 8-9\r\n\
(双周)",双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120012.01,哲学导论,3.0,郑召利,教授,120,H5306,三 8-9(双周),双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120012.01,哲学导论,3.0,郑召利,教授,120,H5308,三 8-9(双周),双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120012.01,哲学导论,3.0,郑召利,教授,120,HGX103,三 6-7 ,双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120012.02,哲学导论,3.0,张志林,教授,120,H5113,"三 8-9\r\n\
(双周)",双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120012.02,哲学导论,3.0,张志林,教授,120,H6402,三 8-9(双周),双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120012.02,哲学导论,3.0,张志林,教授,120,H6502,三 8-9(双周),双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120012.02,哲学导论,3.0,张志林,教授,120,HGX104,三 6-7 ,双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120013.01,逻辑学,3.0,陈伟,副教授,100,HGX508,一 3-4 ,双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120013.01,逻辑学,3.0,陈伟,副教授,100,H5114,"三 8-9\r\n\
(双周)",双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120013.01,逻辑学,3.0,陈伟,副教授,100,H5116,三 8-9(双周),双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120013.01,逻辑学,3.0,陈伟,副教授,100,H6104,三 8-9(双周),双周周三8-9讨论课,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
PHIL120014.01,先秦哲学,2.0,杨泽波,教授,55,HGX103,四 8-9 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",\r\n\
PHIL120015.01,宗教学导论,2.0,朱晓红,副教授,60,HGX5102,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
PHIL130001.01,马克思主义哲学导论,2.0,王德峰,教授,59,HGX510,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 哲学学院\r\n\
PHIL130005.01,西方哲学史(上),2.0,佘碧平,教授,74,HGX409,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","14 宗教学\r\n\
14 哲学\r\n\
13 哲学(国学方向)"\r\n\
PHIL130007.01,现代西方哲学,3.0,张庆熊,教授,91,HGX103,三 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 哲学\r\n\
PHIL130008.01,中国哲学史(上),2.0,刘康德,教授,68,HGX105,二 1-2 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：08:00-09:40",14 哲学学院\r\n\
PHIL130010.01,现代中国哲学,2.0,徐洪兴,教授,91,H3406,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",13 哲学\r\n\
PHIL130011.01,逻辑学导论,2.0,邵强进,教授,59,HGX309,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35","14 宗教学\r\n\
14 哲学"\r\n\
PHIL130012.01,伦理学导论,2.0,罗亚玲,副教授,59,HGX406,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:10","14 哲学\r\n\
14 宗教学"\r\n\
PHIL130013.01,宗教学导论,2.0,朱晓红,副教授,58,HGX5102,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10","14 宗教学\r\n\
14 哲学"\r\n\
PHIL130014.01,社会实践,2.0,郭晓东,教授,8,H院系自主,六 1-1 ,,"考试日期：\r\n\
\r\n\
考试时间：-",12 哲学(国学方向)\r\n\
PHIL130014.02,社会实践,2.0,李天纲,教授,5,H院系自主,六 1-1 ,,"考试日期：\r\n\
\r\n\
考试时间：-",12 宗教学\r\n\
PHIL130014.03,社会实践,2.0,郑召利,教授,43,H院系自主,六 1-1 ,,"考试日期：\r\n\
\r\n\
考试时间：-",12 哲学\r\n\
PHIL130015.01,学年论文,1.0,郑召利,教授,4,H院系自主,六 2-2 ,,"考试日期：\r\n\
\r\n\
考试时间：-",\r\n\
PHIL130017.01,基督教史,2.0,刘平,副教授,30,HGX501,一 8-9 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30",宗教学\r\n\
PHIL130021.01,宗教哲学,2.0,刘宇光,副教授,20,H5305,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",宗教学\r\n\
PHIL130025.01,社会哲学,2.0,邹诗鹏,教授,40,HGX205,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",哲学\r\n\
PHIL130043.01,中外逻辑史,2.0,邵强进,教授,40,HGX301,三 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",哲学学院\r\n\
PHIL130061.01,价值哲学,2.0,冯平,教授,30,HGX401,一 11-12 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:10",哲学学院\r\n\
PHIL130062.01,现代科学技术与社会发展,2.0,徐志宏,讲师,60,HGX203,四 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 哲学\r\n\
14 哲学"\r\n\
PHIL130073.01,国学通论,2.0,郭晓东,教授,9,HGX202,四 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 哲学(国学方向)\r\n\
PHIL130074.01,小学基础,2.0,李若晖,教授,9,HGX306,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：15:30-17:30",14 哲学(国学方向)\r\n\
PHIL130078.01,儒教的理论与历史,2.0,李天纲,教授,40,HGX301,二 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 宗教学\r\n\
13 宗教学\r\n\
13 哲学\r\n\
14 哲学\r\n\
12 宗教学\r\n\
12 哲学"\r\n\
PHIL130088.01,西方哲学原著选读I,2.0,,,60,HGX303,四 3-4 ,威廉.詹姆士《心理学原理》,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 哲学\r\n\
PHIL130092.01,伦理学原著选读I,2.0,邓安庆,教授,40,HGX204,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 哲学学院\r\n\
12 哲学学院"\r\n\
PHIL130093.01,伦理学原著选读II,2.0,孙小玲,副教授,60,HGX503,四 6-7 ,全英文课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 哲学\r\n\
13 哲学"\r\n\
PHIL130097.01,现代西方哲学原著选读,2.0,王金林,教授,40,HGX507,三 3-4 ,海德格尔《形而上学导论》,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",哲学学院\r\n\
PHIL130102.01,专业外语,2.0,徐英瑾,教授,60,HGX205,二 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 哲学学院\r\n\
PHIL130112.01,教育哲学,2.0,林晖,副教授,60,HGX510,三 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 哲学\r\n\
12 哲学"\r\n\
PHIL130118.01,汉传佛教哲学,2.0,刘宇光,副教授,20,HGX305,四 3-4 ,全英文课程,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：09:55-11:35",宗教学\r\n\
PHIL130121.01,马克思主义哲学史,2.0,吴晓明,教授,91,HGX207,三 8-9 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 哲学\r\n\
PHIL130129.01,《周易》,2.0,刘康德,教授,30,HGX201,二 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",哲学(国学方向)\r\n\
PHIL130133.01,《论语》,2.0,张汝伦,教授,9,HGX301,四 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 哲学(国学方向)\r\n\
PHIL130156.01,哲学阅读和写作,1.0,"郝兆宽\r\n\
徐英瑾\r\n\
孙向晨\r\n\
郁_隽\r\n\
黄翔\r\n\
才清华\r\n\
张双利","教授\r\n\
教授\r\n\
教授\r\n\
副教授\r\n\
教授\r\n\
副教授\r\n\
教授",157,H3109,"二 6-7\r\n\
(1-8周)",上前8周,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 哲学学院\r\n\
12 哲学学院"\r\n\
PHIL130161.01,可计算性与随机性,2.0,杨睿之,讲师,40,HGX202,五 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",哲学学院\r\n\
PHIL130165.01,藏语Ⅰ,2.0,刘震,研究员,30,HGX502,五 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",哲学学院\r\n\
PHIL130167.01,巴利语Ⅰ,2.0,刘震,研究员,30,HGX201,五 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",哲学学院\r\n\
PHIL130171.01,古希腊哲学,3.0,丁耘,教授,60,HGX203,二 8-10 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",15 哲学学院\r\n\
PHIL130175.01,数理逻辑,2.0,郝兆宽,教授,60,HGX204,四 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",15 哲学学院\r\n\
PHIL130176.01,先秦哲学,2.0,杨泽波,教授,60,HGX103,四 8-9 ,,"考试日期：论文,2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",15 哲学学院\r\n\
PHIL130188.01,马克思恩格斯著作选读,2.0,张双利,教授,40,HGX406,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 哲学\r\n\
13 哲学"\r\n\
PHIL130191.01,社会批判理论,2.0,王凤才,研究员,40,HGX201,四 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 哲学\r\n\
13 哲学"\r\n\
PHIL130213.01,《资本论》及其手稿,2.0,鲁绍臣,助理研究员,30,H2207,"一 3-4\r\n\
(第1周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",哲学学院\r\n\
PHIL130226.01,佛教经典选读,2.0,王雷泉,教授,160,H5301,四 11-12 ,《金刚经》,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:10",哲学学院\r\n\
PHIL130237.01,东亚儒学探究,2.0,吴震,教授,55,H光华西主楼2404,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 哲学学院\r\n\
13 哲学学院"\r\n\
PHIL130257.01,拉丁语与罗马宗教,2.0,魏明德,教授,60,HGX205,一 8-9 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:00-15:00",15 哲学学院\r\n\
RZSY118002.01,分配正义论,2.0,汪行福,教授,30,H光华西主楼2603,二 11-12 ,新生研讨课,"考试日期：论文\r\n\
\r\n\
考试时间：-",15 哲学学院\r\n\
ECON120003.01,宏观经济学A,3.0,黄亚钧,教授,60,H6304,三 6-8 ,国家级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 新闻学院\r\n\
14 经济学院"\r\n\
ECON120003.02,宏观经济学A,3.0,程向前,高级讲师,60,H6105,三 6-8 ,国家级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 经济学院\r\n\
14 新闻学院"\r\n\
ECON120003.03,宏观经济学A,3.0,樊潇彦,讲师,60,H6305,三 6-8 ,国家级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 经济学院\r\n\
14 新闻学院"\r\n\
ECON120003.04,宏观经济学A,3.0,冯剑亮,讲师,60,H6307,三 6-8 ,国家级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 经济学院\r\n\
14 新闻学院"\r\n\
ECON120003.05,宏观经济学A,3.0,王弟海,教授,60,H6107,三 6-8 ,国家级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 新闻学院\r\n\
14 经济学院"\r\n\
ECON120003.06,宏观经济学A,3.0,李丹,副研究员,60,H6204,三 6-8 ,"校级精品课程团队\r\n\
全英语课程","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 新闻学院\r\n\
14 经济学院"\r\n\
ECON120004.01,当代西方经济学流派,2.0,方钦,讲师,60,H4206,一 11-12 ,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
ECON120007.01,国际金融与贸易,2.0,干杏娣,研究员,60,H4204,四 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
ECON120008.01,货币与金融市场,2.0,李天栋,副教授,60,H2201,三 11-12 ,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
ECON120012.01,国际经济学,2.0,唐东波,讲师,60,H6107,一 11-12 ,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
ECON120012.02,国际经济学,2.0,罗长远,副教授,60,H4105,二 11-12 ,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
ECON120015.01,会计学,3.0,孙琳,副教授,70,H6305,二 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON120015.01,会计学,3.0,孙琳,副教授,70,H6305,四 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON120015.02,会计学,3.0,徐筱凤,副教授,70,H6304,二 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON120015.02,会计学,3.0,徐筱凤,副教授,70,H6304,四 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON120015.03,会计学,3.0,徐晔,高级讲师,70,H6307,二 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON120015.03,会计学,3.0,徐晔,高级讲师,70,H6307,四 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON120015.04,会计学,3.0,余显财,副教授,70,H6106,二 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON120015.04,会计学,3.0,余显财,副教授,70,H6106,四 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
ECON130001.01,概率论与数理统计,3.0,汪思海,讲师,30,H6201,一 8-9 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 经济学(数理经济方向)\r\n\
ECON130001.01,概率论与数理统计,3.0,汪思海,讲师,30,H6201,四 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",14 经济学(数理经济方向)\r\n\
ECON130003.01,国际金融,3.0,丁纯,教授,65,H6107,一 6-8 ,"第三阶段仍不开放限制\r\n\
复旦-港中大-早稻田项目","考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:30",13 保险学\r\n\
ECON130003.02,国际金融,3.0,殷醒民,教授,65,H6106,一 6-8 ,"第三阶段仍不开放限制\r\n\
复旦-港中大-早稻田项目","考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:30",13 财政学\r\n\
ECON130003.03,国际金融,3.0,樊潇彦,讲师,65,H6107,二 3-5 ,第三阶段仍不开放限制,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 经济学\r\n\
ECON130003.04,国际金融,3.0,葛劲峰,讲师,65,H6104,二 3-5 ,第三阶段仍不开放限制,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 经济学\r\n\
ECON130003.05,国际金融,3.0,郑辉,副教授,65,H6304,二 1-3 ,第三阶段仍不开放限制,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 国际经济与贸易\r\n\
ECON130004.01,国际贸易,3.0,罗长远,副教授,30,H6202,二 1-3 ,第三阶段仍不开放限制,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 经济学(数理经济方向)\r\n\
ECON130004.02,国际贸易,3.0,唐东波,讲师,71,H6304,一 1-3 ,第三阶段仍不开放限制,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 金融学\r\n\
ECON130005.01,财政学,3.0,唐朱昌,教授,100,H6501,四 1-3 ,"校级精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","13 金融学\r\n\
13 国际经济与贸易"\r\n\
ECON130005.02,财政学,3.0,杭行,副教授,85,H6104,一 6-8 ,"校级精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","13 经济学\r\n\
13 保险"\r\n\
ECON130006.01,计量经济学,3.0,陈诗一,教授,65,H6106,三 6-8 ,"上海市精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 经济学\r\n\
ECON130006.02,计量经济学,3.0,李怀露,讲师,65,H6108,三 6-8 ,"上海市精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 经济学\r\n\
ECON130006.03,计量经济学,3.0,王之,讲师,35,H6306,三 6-8 ,"上海市精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 保险学\r\n\
ECON130006.04,计量经济学,3.0,谢识予,教授,65,H6308,三 6-8 ,"上海市精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 国际经济与贸易\r\n\
ECON130006.05,计量经济学,3.0,谢为安,副教授,35,H6205,三 6-8 ,"上海市精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 财政学\r\n\
ECON130006.06,计量经济学,3.0,张卫平,副教授,70,H6404,三 6-8 ,"上海市精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 金融学\r\n\
ECON130006.07,计量经济学,3.0,朱宏飞,讲师,70,H6309,三 6-8 ,"上海市精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 金融学\r\n\
ECON130007.01,货币银行学,3.0,李天栋,副教授,80,H6304,四 1-3 ,"校级精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","12 国际经济与贸易\r\n\
13 保险学"\r\n\
ECON130007.02,货币银行学,3.0,何光辉,教授,65,HGX309,四 6-8 ,"校级精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 金融学\r\n\
ECON130007.03,货币银行学,3.0,徐明东,副教授,65,HGX310,四 6-8 ,"校级精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 金融学\r\n\
ECON130007.04,货币银行学,3.0,张涛,副教授,65,HGX409,四 6-8 ,"校级精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 经济学\r\n\
ECON130007.05,货币银行学,3.0,孙立坚,教授,30,HGX301,一 3-5 ,"校级精品课程团队\r\n\
第三阶段仍不开放限制","考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 经济学(数理经济方向)\r\n\
ECON130008.01,中国经济史学,3.0,孙大权,副教授,95,H6101,四 8-10 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","14 经济学\r\n\
14 经济学(数理经济方向)"\r\n\
ECON130011.01,产业经济学,3.0,寇宗来,教授,30,H6302,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",12 经济学(数理经济方向)\r\n\
ECON130012.01,发展经济学,3.0,尹翔硕,教授,40,H6307,三 1-3 ,"复旦大学教学名师 \r\n\
上海市精品课程团队 \r\n\
全英语课程 \r\n\
复旦-UC课程","考试日期：2015-12-23\r\n\
\r\n\
考试时间：08:00-10:00",复旦加州项目\r\n\
ECON130012.02,发展经济学,3.0,"吴力波\r\n\
袁堂军","教授\r\n\
副研究员",80,H6306,二 3-5 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",12 国际经济与贸易\r\n\
ECON130012.03,发展经济学,3.0,尹晨,副教授,130,H6312,五 3-5 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00","14 新闻学院\r\n\
13 经济学(数理经济方向)\r\n\
12 经济学"\r\n\
ECON130018.01,外国经济史,3.0,陆寒寅,副教授,65,H6107,四 1-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 国际经济与贸易\r\n\
ECON130021.01,比较经济学,3.0,李维森,教授,65,H6107,一 1-3 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 国际经济与贸易\r\n\
ECON130029.01,商业银行业务与管理,3.0,聂叶,副教授,70,H6305,四 1-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 金融学\r\n\
ECON130029.02,商业银行业务与管理,3.0,徐明东,副教授,70,H6307,四 1-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 金融学\r\n\
ECON130030.01,金融市场学,3.0,卢华,讲师,65,H6305,一 1-3 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 金融学\r\n\
ECON130030.02,金融市场学,3.0,攀登,副教授,65,H6307,一 1-3 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 金融学\r\n\
ECON130031.01,投资学原理,3.0,郑辉,副教授,80,H6306,四 6-8 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","12 国际经济与贸易\r\n\
12 保险"\r\n\
ECON130035.01,保险学原理,3.0,陈冬梅,副教授,30,H6205,四 6-8 ,,,14 保险学\r\n\
ECON130042.01,税收学,3.0,余显财,副教授,30,H6206,四 6-8 ,,,14 财政学\r\n\
ECON130056.01,区域经济学,2.0,吴建峰,讲师,30,H5109,二 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",12 经济学(数理经济方向)\r\n\
ECON130056.02,区域经济学,2.0,范剑勇,教授,65,H6407,四 6-8 ,,"考试日期：2015-12-031\r\n\
考试时间：08:30-10:30",12 经济学\r\n\
ECON130057.01,农村和农业经济学,2.0,高帆,副教授,65,H6306,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 经济学\r\n\
ECON130059.01,城市经济学,3.0,周伟林,副教授,70,H6305,一 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",12 经济学\r\n\
ECON130060.01,国际政治经济学,3.0,王健,副教授,80,H6304,一 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",12 国际经济与贸易\r\n\
ECON130061.01,国别和地区经济,3.0,袁堂军,副研究员,65,H6307,一 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 国际经济与贸易\r\n\
ECON130062.01,国际贸易实务,3.0,蔡晓月,副教授,95,H6301,五 3-5 ,复旦-港中大-早稻田项目,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：13:30-15:30",13 国际经济与贸易\r\n\
ECON130063.01,国际营销学,3.0,何喜有,副教授,65,H6309,三 3-5 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 国际经济与贸易\r\n\
ECON130063.02,国际营销学,3.0,孟俭,讲师,80,H6305,三 3-5 ,全英语课程,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 国际经济与贸易\r\n\
ECON130064.01,博弈论,3.0,朱弘鑫,副教授,80,H6104,五 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 国际经济与贸易\r\n\
ECON130074.01,欧美金融史,2.0,何光辉,教授,70,H6304,五 6-7 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 金融学\r\n\
ECON130080.01,投资银行理论与实务,3.0,罗忠洲,副研究员,70,H6305,二 1-3 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 金融学\r\n\
ECON130083.01,时间序列分析的方法,3.0,姚京,副教授,30,H6204,四 1-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 经济学(数理经济方向)\r\n\
ECON130091.01,海上保险,2.0,沈婷,讲师,30,H6205,四 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 保险学\r\n\
ECON130092.01,再保险,2.0,林琳,讲师,30,H6205,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 保险\r\n\
ECON130098.01,责任保险,2.0,林琳,讲师,35,H6205,二 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 保险学\r\n\
ECON130103.01,保险企业经营管理,2.0,冯智坚,讲师,30,H6204,五 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",14 保险学\r\n\
ECON130117.01,税收筹划,2.0,余显财,副教授,40,H6207,五 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",12 财政学\r\n\
ECON130119.01,比较财政学,2.0,张晏,副教授,70,H6309,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","12 财政学\r\n\
13 财政学"\r\n\
ECON130123.01,随机过程,3.0,陆立强,副教授,30,HGX305,三 1-3 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 经济学(数理经济方向)\r\n\
ECON130128.01,制度经济学,3.0,汪立鑫,教授,35,H6204,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 财政学\r\n\
ECON130132.01,环境经济学,3.0,李志青,讲师,70,H6307,二 1-3 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",12 经济学\r\n\
ECON130138.01,随机过程与随机分析初步,3.0,刘庆富,副研究员,70,H6404,一 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 金融学\r\n\
ECON130140.01,中国金融史,2.0,张徐乐,副研究员,65,H6108,五 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",14 金融学\r\n\
ECON130141.01,信息经济学,2.0,陈钊,教授,95,H6312,三 4-5 ,复旦大学教学名师,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","13 经济学\r\n\
13 经济学(数理经济方向)"\r\n\
ECON130143.01,公司治理,2.0,常中阳,讲师,70,H6304,三 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 金融学\r\n\
ECON130146.01,中国货币政策,2.0,陆前进,副教授,70,H6101,五 1-2 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00",13 金融学\r\n\
ECON130148.01,当代中国金融前沿专题研究,2.0,刘红忠,教授,70,H6108,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 金融学\r\n\
ECON130149.01,公共管理学,3.0,孙琳,副教授,30,H6209,四 1-3 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 财政学\r\n\
ECON130155.01,宏观财政政策分析,2.0,王殿志,讲师,40,H经济学院机房102,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",12 财政学\r\n\
ECON130157.01,人力资源管理,2.0,王晓灵,副教授,40,H6202,"五 6-8\r\n\
(1-11周)",,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 财政学\r\n\
ECON130159.01,金融经济学原理,3.0,姚京,副教授,30,H6202,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 经济学(数理经济方向)\r\n\
ECON130160.01,中国经济思想史,2.0,孙大权,副教授,70,H6307,五 7-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 经济学\r\n\
ECON130166.01,社会保障,3.0,丁纯,教授,35,H6204,二 3-5 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：8:30-10:30",13 财政学\r\n\
ECON130167.01,保险公司财务管理,2.0,冯智坚,讲师,35,H6204,四 4-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",13 保险学\r\n\
ECON130168.01,国际商务谈判,2.0,潘宁,副教授,50,H经济学院机房102,二 6-7 ,全英语课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:00-15:00",12 国际经济与贸易\r\n\
ECON130170.01,动态优化,3.0,康明怡,讲师,30,H6204,五 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",13 经济学(数理经济方向)\r\n\
ECON130171.01,经济学论文写作,2.0,罗汉,副教授,65,H6308,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 国际经济与贸易\r\n\
ECON130175.01,金融时间序列分析及软件应用,3.0,刘庆富,副研究员,70,H6305,五 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",12 金融学\r\n\
ECON130176.01,国际金融管理,2.0,朱叶,教授,70,H6501,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：8:30-10:30",12 金融学\r\n\
ECON130177.01,供应链金融,2.0,牛晓健,教授,70,H5104,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 金融学\r\n\
ECON130180.01,精算学原理,3.0,张仕英,讲师,35,H6209,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 保险学\r\n\
ECON130184.01,兼并与收购,3.0,杨青,教授,70,H6404,三 1-3 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 金融学\r\n\
ECON130186.01,能源与气候变化经济学,3.0,李志青,讲师,65,H6107,三 3-5 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 经济学\r\n\
MATH120044.01,线性代数,3.0,蔡志杰,教授,30,HGX405,一 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学(数理经济方向)\r\n\
MATH120044.01,线性代数,3.0,蔡志杰,教授,30,HGX405,三 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学(数理经济方向)\r\n\
MATH120044.02,线性代数,3.0,罗杰,师资博士后,85,H6105,三 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
MATH120044.02,线性代数,3.0,罗杰,,85,H6105,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
MATH120044.03,线性代数,3.0,汪思海,讲师,85,H6201,三 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
MATH120044.03,线性代数,3.0,汪思海,讲师,85,H6201,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
MATH120044.04,线性代数,3.0,朱弘鑫,副教授,85,H6108,三 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
MATH120044.04,线性代数,3.0,朱弘鑫,副教授,85,H6108,五 1-2 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",14 经济学院\r\n\
SOSC120007.01,经济学原理,3.0,"陈钊\r\n\
袁志刚","教授\r\n\
教授",150,H6312,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","15 经济学院\r\n\
15 社会科学试验班\r\n\
15 法学院"\r\n\
SOSC120007.02,经济学原理,3.0,冯剑亮,讲师,150,H6412,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","15 法学院\r\n\
15 社会科学试验班\r\n\
15 经济学院"\r\n\
SOSC120008.01,政治经济学,3.0,"汪立鑫\r\n\
李慧中","教授\r\n\
教授",70,H6305,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 经济学院\r\n\
15 新闻学院\r\n\
15 旅游管理\r\n\
15 艺术管理\r\n\
15 历史学类"\r\n\
SOSC120008.02,政治经济学,3.0,高帆,副教授,70,H6507,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 新闻学院\r\n\
15 艺术管理\r\n\
15 旅游管理\r\n\
15 经济学院\r\n\
15 历史学类"\r\n\
SOSC120008.03,政治经济学,3.0,严法善,教授,70,H6304,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 旅游管理\r\n\
15 艺术管理\r\n\
15 新闻学院\r\n\
15 经济学院\r\n\
15 历史学类"\r\n\
SOSC120008.04,政治经济学,3.0,张晖明,教授,70,H6307,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 旅游管理\r\n\
15 艺术管理\r\n\
15 新闻学院\r\n\
15 经济学院\r\n\
15 历史学类"\r\n\
SOSC120008.05,政治经济学,3.0,周伟林,副教授,70,H6508,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 历史学类\r\n\
15 艺术管理\r\n\
15 经济学院\r\n\
15 新闻学院\r\n\
15 旅游管理"\r\n\
SOSC120008.06,政治经济学,3.0,周翼,副教授,70,H6404,四 6-8 ,上海市精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","15 旅游管理\r\n\
15 经济学院\r\n\
15 新闻学院\r\n\
15 艺术管理\r\n\
15 历史学类"\r\n\
ECON120003.07,宏观经济学A,3.0,曹雯,讲师,40,H6106,四 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:30-17:30","14 管理学院\r\n\
14 公共事业管理\r\n\
12 环境科学(环境管理方向)"\r\n\
ECON120003.08,宏观经济学A,3.0,张洁,副教授,40,H5106,四 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:30-17:30","12 环境科学(环境管理方向)\r\n\
14 公共事业管理\r\n\
14 管理学院"\r\n\
ECON120003.09,宏观经济学A,3.0,罗云辉,副教授,40,H5110,四 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:30-17:30","12 环境科学(环境管理方向)\r\n\
14 公共事业管理\r\n\
14 管理学院"\r\n\
ECON120003.10,宏观经济学A,3.0,白让让,副教授,40,H5114,四 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:30-17:30","12 环境科学(环境管理方向)\r\n\
14 公共事业管理\r\n\
14 管理学院"\r\n\
ECON120003.11,宏观经济学A,3.0,李玲芳,副教授,40,H5116,四 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:30-17:30","14 管理学院\r\n\
14 公共事业管理\r\n\
12 环境科学(环境管理方向)"\r\n\
ICES110003.04,留学生专业汉语I,4.0,袁斌,讲师,5,H院系自主,二 11-12 ,管理学院李达三楼105室,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",13 管理学院\r\n\
ICES110003.04,留学生专业汉语I,4.0,袁斌,讲师,5,H院系自主,四 11-12 ,管理学院李达三楼105室,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",13 管理学院\r\n\
ICES110003.05,留学生专业汉语I,4.0,许静,讲师,5,H院系自主,二 11-12 ,管理学院史带楼503室,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",13 管理学院\r\n\
ICES110003.05,留学生专业汉语I,4.0,许静,讲师,5,H院系自主,四 11-12 ,管理学院史带楼503室,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：18:30-20:30",13 管理学院\r\n\
MANA116005.01,项目评估,3.0,Adriana Ramirez Roch,,80,H3406,三 1-3 ,"全英语课程\r\n\
复旦—蒙特雷课程\r\n\
每次课增加15分钟","考试日期：2015-12-16\r\n\
\r\n\
考试时间：08:00-10:40",\r\n\
MANA116015.01,外国商务投资,3.0,Cristancho Ramirez Andrea Karin,,100,HGX308,三 3-5 ,"全英语课程\r\n\
复旦—蒙特雷课程\r\n\
每次课增加15分钟","考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-12:30",\r\n\
MANA116018.01,企业发展,3.0,Michel Trejo Marcos Alejandro,,100,HGX207,二 3-5 ,"全英语课程\r\n\
复旦—蒙特雷课程\r\n\
每次课增加15分钟","考试日期：2015-12-15\r\n\
\r\n\
考试时间：09:55-12:30",\r\n\
MANA116019.01,国际市场研究,3.0,Jacquelyn Wu,,65,HGX409,一 11-13 ,"全英语课程\r\n\
复旦—蒙特雷课程\r\n\
每次课增加15分钟","考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-21:05",\r\n\
MANA116021.01,商务研究方法,3.0,Cristobal Collignon De Alba,,100,HGX207,五 6-8 ,"全英语课程\r\n\
复旦—蒙特雷课程\r\n\
每次课增加15分钟","考试日期：2015-12-18\r\n\
\r\n\
考试时间：13:30-16:10",\r\n\
MANA116022.01,公司物流,3.0,,,60,HGX310,一 3-5 ,"全英语课程\r\n\
复旦—蒙特雷课程\r\n\
每次课增加15分钟","考试日期：2015-12-14\r\n\
\r\n\
考试时间：09:55-12:30",\r\n\
MANA116027.01,个人与商业财务,3.0,Francisco Lopez Medina,,100,H4105,五 3-5 ,全英语课程，复旦—蒙特雷课程，每次课增加15分钟,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：09:55-12:30",\r\n\
MANA120008.01,市场营销导论,2.0,刘刚,副教授,70,H6101,五 6-7 ,经管III类,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：13:30-15:30",15 艺术管理\r\n\
MANA120008.02,市场营销导论,2.0,张_,副教授,40,H6301,四 6-8(1-12周),经管III类,"考试日期：2015-11-26\r\n\
\r\n\
考试时间：13:30-15:30",\r\n\
MANA120008.03,市场营销导论,2.0,伍华佳,副教授,80,H6306,五 6-7 ,经管III类,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
MANA120009.01,现代投资学,2.0,方曙红,副教授,80,H6112,四 6-7 ,经管III类,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
MANA120010.01,现代物流管理,2.0,李旭,教授,90,H6112,一 11-12 ,经管III类,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
MANA120011.01,信息技术管理,2.0,傅烨,副教授,30,H6204,一 11-12 ,经管III类,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
MANA120019.01,国际财务,2.0,徐剑刚,教授,80,H6101,一 6-7 ,经管III类,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
MANA120022.01,产业经济学概论,2.0,白让让,副教授,50,H5114,三 6-7 ,经管III类,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:30",\r\n\
MANA120022.02,产业经济学概论,2.0,伍华佳,副教授,130,JB201,五 3-4 ,经管III类,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
MANA130001.01,概率论与数理统计,4.0,朱仲义,教授,60,H5104,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130001.01,概率论与数理统计,4.0,朱仲义,教授,60,H5104,三 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130001.02,概率论与数理统计,4.0,徐勤丰,副教授,60,H5106,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","14 管理学院\r\n\
14 公共事业管理"\r\n\
MANA130001.02,概率论与数理统计,4.0,徐勤丰,副教授,60,H5106,三 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","14 管理学院\r\n\
14 公共事业管理"\r\n\
MANA130001.03,概率论与数理统计,4.0,金曙松,讲师,60,H5110,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","14 管理学院\r\n\
14 公共事业管理"\r\n\
MANA130001.03,概率论与数理统计,4.0,金曙松,讲师,60,H5110,三 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","14 管理学院\r\n\
14 公共事业管理"\r\n\
MANA130005.01,运筹学,4.0,戴锡,副教授,50,H6208,三 1-2 ,校级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130005.01,运筹学,4.0,戴锡,副教授,50,H6208,五 3-5 ,校级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130005.02,运筹学,4.0,翟丽,副教授,50,H6205,三 1-2 ,校级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130005.02,运筹学,4.0,翟丽,副教授,50,H6205,五 3-5 ,校级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130005.03,运筹学,4.0,周蓉,副教授,50,H6206,三 1-2 ,校级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130005.03,运筹学,4.0,周蓉,副教授,50,H6206,五 3-5 ,校级精品课程团队,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130007.01,管理信息系统,3.0,黄丽华,教授,40,H6105,二 3-5 ,国家级精品课程团队 上海市教学名师,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","13 保密管理\r\n\
13 管理学院"\r\n\
MANA130007.02,管理信息系统,3.0,卫学启,副教授,40,H6108,二 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","13 保密管理\r\n\
13 管理学院"\r\n\
MANA130007.03,管理信息系统,3.0,傅烨,副教授,40,H6206,二 3-5 ,国家级精品课程团队,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","13 管理学院\r\n\
13 保密管理"\r\n\
MANA130007.04,管理信息系统,3.0,屈锗,副教授,40,H6209,二 3-5 ,全英文课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","13 保密管理\r\n\
13 管理学院"\r\n\
MANA130008.01,运营管理,3.0,李旭,教授,50,H6105,一 3-5 ,复旦-港中大-早稻田项目,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:55","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130013.01,物流管理,3.0,陈祥锋,教授,30,H6205,三 3-5 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 管理科学\r\n\
MANA130021.01,回归分析,3.0,沈家,副教授,40,H6207,一 3-5 ,学术兴趣班,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130024.01,随机过程,3.0,肖悦文,讲师,40,H6305,五 3-5 ,学术兴趣班,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",12 管理学院\r\n\
MANA130036.01,成本管理会计,3.0,徐浩萍,副教授,50,HGX208,四 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",12 会计学\r\n\
MANA130036.01,成本管理会计,3.0,徐浩萍,副教授,50,HGX208,"五 6-7\r\n\
(1-16周单周)",,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",12 会计学\r\n\
MANA130037.01,税法,3.0,娄贺统,高级讲师,50,H5104,一 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130038.01,审计学,3.0,朱振梅,讲师,50,HGX208,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 会计学\r\n\
MANA130038.01,审计学,3.0,朱振梅,讲师,50,HGX208,"三 9-10\r\n\
(2-16周双周)",,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 会计学\r\n\
MANA130039.01,高级财务会计,3.0,曹利,讲师,50,H6405,"三 3-5\r\n\
(2-16周双周)",,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 会计学\r\n\
MANA130039.01,高级财务会计,3.0,曹利,讲师,50,H6405,"三 3-5\r\n\
(1-16周单周)",,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 会计学\r\n\
MANA130039.01,高级财务会计,3.0,曹利,讲师,50,H6405,"五 6-7\r\n\
(2-16周双周)",,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 会计学\r\n\
MANA130041.01,国际会计,3.0,朱振梅,讲师,50,H5106,二 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",12 管理学院\r\n\
MANA130042.01,国际商务管理,2.0,李元旭,教授,40,H6104,三 1-2 ,复旦-港中大-早稻田项目,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 管理学院\r\n\
MANA130042.02,国际商务管理,2.0,吴哲颖,讲师,40,H6106,三 1-2 ,"全英文课程\r\n\
复旦-港中大-早稻田项目","考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 管理学院\r\n\
MANA130042.03,国际商务管理,2.0,薛求知,教授,40,H6105,三 3-4 ,复旦-港中大-早稻田项目,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 管理学院\r\n\
MANA130057.01,营销战略,2.0,褚荣伟,讲师,30,H6207,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
12 管理学院"\r\n\
MANA130058.01,新产品开发管理,2.0,张_,副教授,42,H5104,"四 3-5\r\n\
(1-12周)",新国大项目选修,"考试日期：2015-11-26\r\n\
\r\n\
考试时间：09:55-11:55","13 管理学院\r\n\
12 管理学院"\r\n\
MANA130059.01,营销渠道管理,2.0,褚荣伟,讲师,25,H6207,五 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 市场营销\r\n\
MANA130062.01,服务营销,2.0,"裘理瑾\r\n\
范秀成","讲师\r\n\
教授",20,H院系自主,"一 3-5\r\n\
(1-12周)","上海市精品课程团队\r\n\
全英文课程\r\n\
管理学院思源楼624","考试日期：2015-11-23\r\n\
\r\n\
考试时间：09:55-11:55",12 市场营销\r\n\
MANA130073.01,供应链管理,3.0,陈祥锋,教授,50,H6206,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","13 管理学院\r\n\
12 管理学院"\r\n\
MANA130076.01,统计软件,3.0,金曙松,讲师,30,H院系自主,"一 1-2\r\n\
(2-16周双周)",周一上机在管院机房,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 统计学\r\n\
MANA130076.01,统计软件,3.0,金曙松,讲师,30,H6208,三 3-5 ,周一上机在管院机房,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",12 统计学\r\n\
MANA130097.01,属性数据分析,3.0,黎德元,教授,30,H6208,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 统计学\r\n\
MANA130114.01,中国金融市场,3.0,徐莉,副教授,80,H5106,一 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130114.02,中国金融市场,3.0,朱祁,讲师,50,H6505,四 6-8 ,"全英文课程\r\n\
复旦-港中大-早稻田项目","考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:30",\r\n\
MANA130121.01,计量经济学,3.0,肖志国,副教授,20,H6106,五 6-8 ,学术兴趣班(与硕博合上）,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：13:00-15:00","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130129.01,会计专题研究,2.0,周易,讲师,50,H6207,三 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130152.01,国别经营环境,3.0,薛求知,教授,20,H5115,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 工商管理\r\n\
MANA130181.01,Internet营销,2.0,肖莉,讲师,25,H6207,三 3-4 ,全英文课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 市场营销\r\n\
15 管理学院"\r\n\
MANA130272.01,中国市场营销,3.0,卢晓,讲师,50,H6208,三 6-8 ,"全英文课程\r\n\
复旦-港中大-早稻田项目","考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:30",\r\n\
MANA130283.01,战略管理,2.0,唐跃军,副教授,40,H6304,五 3-4 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",13 管理学院\r\n\
MANA130283.02,战略管理,2.0,卫田,副教授,40,H6107,五 3-4 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",13 管理学院\r\n\
MANA130283.03,战略管理,2.0,张青,教授,40,H6105,五 3-4 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",13 管理学院\r\n\
MANA130306.01,东方管理,2.0,彭贺,副教授,20,H5115,五 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 工商管理\r\n\
MANA130310.01,抽样调查,3.0,徐勤丰,副教授,30,H6208,一 6-8 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30",12 统计学\r\n\
MANA130311.01,最优化方法及应用,3.0,郁培文,讲师,30,H6205,五 6-8 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：13:00-15:00",12 管理科学\r\n\
MANA130312.01,金融工程导论,3.0,戴锡,副教授,30,H5105,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",12 管理科学\r\n\
MANA130313.01,衍生证券,3.0,田澍,副教授,90,H6312,四 6-8 ,全英文课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 财务管理\r\n\
MANA130314.01,公司财务理论与实务,3.0,王克敏,教授,90,H6312,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",12 财务管理\r\n\
MANA130315.01,公司治理,3.0,唐跃军,副教授,20,H5113,五 8-10 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：15:30-17:30",12 工商管理\r\n\
MANA130316.01,IT运营与服务管理,3.0,张成洪,教授,10,H6310,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 信息管理与信息系统\r\n\
MANA130317.01,商业智能,3.0,王有为,副教授,10,H6310,五 6-8 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：13:00-15:00",12 信息管理与信息系统\r\n\
MANA130318.01,现代信息技术与应用,3.0,许博,副教授,10,H6310,四 6-8 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:00-15:00",12 信息管理与信息系统\r\n\
MANA130320.01,商业伦理学,2.0,吴泳臻,讲师,75,H6101,二 3-4 ,全英文课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130320.02,商业伦理学,2.0,吴哲颖,讲师,75,H6201,二 3-4 ,全英文课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 管理学院\r\n\
MANA130323.01,法律、商业与社会,2.0,马忠法,教授,150,H6112,四 3-4 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：08:30-10:30",13 管理学院\r\n\
MANA130327.01,金融市场与金融机构,3.0,胡畏,副教授,90,H6312,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",12 财务管理\r\n\
MANA130328.01,高级微观经济学,3.0,李玲芳,副教授,20,H6106,三 3-5 ,学术兴趣班(与硕博合上）,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130330.01,程序设计基础,3.0,窦一凡,讲师,55,H6108,一 8-10 ,"第3、6、9、12、15周在史代楼809上课\r\n\
学术兴趣班","考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00","13 管理学院\r\n\
12 管理学院"\r\n\
MANA130334.01,商业银行管理,3.0,田澍,副教授,70,H6201,三 6-8 ,全英文课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130340.01,知识管理系统,2.0,徐云杰,教授,30,H6204,一 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","13 管理学院\r\n\
12 管理学院"\r\n\
MANA130344.01,产业经济学,3.0,"龚冰琳\r\n\
曹雯","讲师\r\n\
讲师",50,H5108,一 6-8 ,全英文课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","13 管理学院\r\n\
12 管理学院"\r\n\
MANA130347.01,会计学,3.0,洪剑峭,教授,45,H6108,一 6-7 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130347.01,会计学,3.0,洪剑峭,教授,45,H6108,四 3-4 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130347.02,会计学,3.0,李远鹏,副教授,45,H6306,一 6-7 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 管理学院\r\n\
14 公共事业管理"\r\n\
MANA130347.02,会计学,3.0,李远鹏,副教授,45,H6306,四 3-4 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 管理学院\r\n\
14 公共事业管理"\r\n\
MANA130347.03,会计学,3.0,方军雄,教授,45,H6308,一 6-7 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130347.03,会计学,3.0,方军雄,教授,45,H6308,四 3-4 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130347.04,会计学,3.0,施海娜,副教授,45,H6309,一 6-7 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 艺术管理\r\n\
14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130347.04,会计学,3.0,施海娜,副教授,45,H6309,四 1-2 ,校级精品课程团队,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","14 艺术管理\r\n\
14 公共事业管理\r\n\
14 管理学院"\r\n\
MANA130349.01,基金管理,3.0,战功,讲师,80,H6307,五 3-5 ,全英文课程,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130351.01,研究方法I,3.0,张新,讲师,15,H院系自主,三 6-8 ,"学术兴趣班(与硕博合上）\r\n\
管理学院史带楼809","考试日期：论文\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
12 管理学院"\r\n\
MANA130351.02,研究方法I,3.0,卫田,副教授,15,H院系自主,一 2-4 ,"学术兴趣班(与硕博合上）\r\n\
管理学院史带楼501","考试日期：论文\r\n\
\r\n\
考试时间：-","12 管理学院\r\n\
13 管理学院"\r\n\
MANA130353.01,统计推断,3.0,沈娟,讲师,30,H6208,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 统计学\r\n\
MANA130359.01,社会调查,1.0,凌鸿,教授,20,H院系自主,六 3-3 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 管理学院\r\n\
13 管理学院"\r\n\
MANA130359.02,社会调查,1.0,徐云杰,教授,20,H院系自主,六 4-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
14 管理学院"\r\n\
MANA130359.03,社会调查,1.0,张成洪,教授,20,H院系自主,六 5-5 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
14 管理学院"\r\n\
MANA130359.04,社会调查,1.0,吕长江,教授,20,H院系自主,六 6-6 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
14 管理学院"\r\n\
MANA130359.05,社会调查,1.0,洪剑峭,教授,20,H院系自主,六 7-7 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
14 管理学院"\r\n\
MANA130359.06,社会调查,1.0,娄贺统,高级讲师,20,H院系自主,六 8-8 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 管理学院\r\n\
13 管理学院"\r\n\
MANA130359.07,社会调查,1.0,李远鹏,副教授,20,H院系自主,六 9-9 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 管理学院\r\n\
13 管理学院"\r\n\
MANA130359.08,社会调查,1.0,张新生,教授,20,H院系自主,六 10-10 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
14 管理学院"\r\n\
MANA130359.09,社会调查,1.0,朱仲义,教授,20,H院系自主,六 11-11 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
14 管理学院"\r\n\
MANA130359.10,社会调查,1.0,骆品亮,教授,20,H院系自主,六 12-12 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 管理学院\r\n\
13 管理学院"\r\n\
MANA130359.11,社会调查,1.0,陈祥锋,教授,20,H院系自主,六 13-13 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 管理学院\r\n\
14 管理学院"\r\n\
MANA130359.12,社会调查,1.0,戴锡,副教授,20,H院系自主,六 14-14 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 管理学院\r\n\
13 管理学院"\r\n\
MANA130359.13,社会调查,1.0,李元旭,教授,20,H院系自主,六 2-2 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","14 管理学院\r\n\
13 管理学院"\r\n\
MATH120016.06,数学分析BI,5.0,张永跃,讲师,110,H6412,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 管理学院\r\n\
15 公共事业管理"\r\n\
MATH120016.06,数学分析BI,5.0,张永跃,讲师,110,H6412,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 管理学院\r\n\
15 公共事业管理"\r\n\
MATH120016.06,数学分析BI,5.0,张永跃,讲师,110,H6412,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 管理学院\r\n\
15 公共事业管理"\r\n\
MATH120016.07,数学分析BI,5.0,严金海,副教授,110,H6401,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 管理学院"\r\n\
MATH120016.07,数学分析BI,5.0,严金海,副教授,110,H6401,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 管理学院"\r\n\
MATH120016.07,数学分析BI,5.0,严金海,副教授,110,H6401,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","15 公共事业管理\r\n\
15 管理学院"\r\n\
SOSC120014.01,管理学导论,3.0,李元旭,教授,69,H6401,三 6-8 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","15 艺术管理\r\n\
15 公共事业管理\r\n\
13 信息安全(保密方向)\r\n\
13 保密管理\r\n\
15 管理学院\r\n\
12 保密管理\r\n\
15 经济学院\r\n\
15 历史学类\r\n\
15 旅游管理\r\n\
15 法学院\r\n\
12 信息安全(保密方向)"\r\n\
SOSC120014.02,管理学导论,3.0,唐跃军,副教授,69,H6409,三 6-8 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","13 保密管理\r\n\
15 法学院\r\n\
15 管理学院\r\n\
15 经济学院\r\n\
15 艺术管理\r\n\
13 信息安全(保密方向)\r\n\
15 历史学类\r\n\
15 公共事业管理\r\n\
15 旅游管理\r\n\
12 保密管理\r\n\
12 信息安全(保密方向)"\r\n\
SOSC120014.03,管理学导论,3.0,余光胜,副教授,69,H6405,三 6-8 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","13 信息安全(保密方向)\r\n\
12 信息安全(保密方向)\r\n\
13 保密管理\r\n\
15 艺术管理\r\n\
15 法学院\r\n\
15 旅游管理\r\n\
15 经济学院\r\n\
15 公共事业管理\r\n\
15 管理学院\r\n\
12 保密管理\r\n\
15 历史学类"\r\n\
SOSC120014.04,管理学导论,3.0,徐笑君,副教授,69,H6408,三 6-8 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","13 保密管理\r\n\
15 历史学类\r\n\
13 信息安全(保密方向)\r\n\
15 公共事业管理\r\n\
15 经济学院\r\n\
15 艺术管理\r\n\
15 法学院\r\n\
12 信息安全(保密方向)\r\n\
15 管理学院\r\n\
12 保密管理\r\n\
15 旅游管理"\r\n\
SOSC120014.05,管理学导论,3.0,姚凯,教授,69,H6406,三 6-8 ,上海市精品课程团队,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","12 信息安全(保密方向)\r\n\
15 公共事业管理\r\n\
13 保密管理\r\n\
15 旅游管理\r\n\
15 艺术管理\r\n\
12 保密管理\r\n\
13 信息安全(保密方向)\r\n\
15 管理学院\r\n\
15 经济学院\r\n\
15 法学院\r\n\
15 历史学类"\r\n\
ICES110001.05,留学生高级汉语I,4.0,赵立行,教授,60,H5312,三 1-2 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",15 法学\r\n\
ICES110001.05,留学生高级汉语I,4.0,赵立行,教授,60,H3204,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",15 法学\r\n\
ICES110003.03,留学生专业汉语I,4.0,韩涛,副教授,30,JB307,三 8-9 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",14 留学生 法学\r\n\
ICES110003.03,留学生专业汉语I,4.0,韩涛,副教授,30,JB307,四 3-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",14 留学生 法学\r\n\
LAWS120002.01,国际法,3.0,朱丹,讲师,70,JB307,三 2-4 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：09:00-11:00",14 法学\r\n\
LAWS120002.02,国际法,3.0,陆志安,副教授,70,JB105,三 2-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:00-11:00",14 法学\r\n\
LAWS120002.03,国际法,3.0,马忠法,教授,40,JB103,三 2-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：09:00-11:00",14 法学\r\n\
LAWS130004.01,中国法制史,3.0,郭建,教授,75,JB102,一 2-4 ,上海市精品课程复旦大学教学名师,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:30",14 法学\r\n\
LAWS130004.02,中国法制史,3.0,王志强,教授,75,JB202,一 2-4 ,上海市精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:30",14 法学\r\n\
LAWS130005.01,行政诉讼法,2.0,杜仪方,副教授,150,JB101,一 6-7 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：09:00-11:00",14 法学\r\n\
LAWS130008.01,民法II,4.0,李世刚,副教授,150,JB101,五 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 法学\r\n\
LAWS130008.01,民法II,4.0,李世刚,副教授,150,JB101,五 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:30",14 法学\r\n\
LAWS130012.01,商法,3.0,白江,副教授,150,JB101,二 2-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：09:00-11:00",13 法学\r\n\
LAWS130013.01,专业英语I(法律),2.0,高凌云,副教授,130,JB101,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:00-11:00",13 法学\r\n\
LAWS130014.01,国际经济法导论,3.0,张乃根,教授,75,JB303,三 6-8 ,"上海市精品课程\r\n\
上海市教学名师","考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:30-15:30",13 法学\r\n\
LAWS130014.02,国际经济法导论,3.0,梁咏,副教授,75,JB202,三 6-8 ,上海市精品课程,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:30-15:30",13 法学\r\n\
LAWS130017.01,专业英语III(法律),3.0,朱丹,讲师,110,JB305,四 2-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00",\r\n\
LAWS130018.01,法理学,2.0,杨晓畅,讲师,30,JB303,三 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：09:00-11:00",\r\n\
LAWS130018.02,法理学,2.0,孙笑侠,教授,90,JB102,三 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：09:00-11:00",12 法学\r\n\
LAWS130019.01,法律实务,3.0,"章武生\r\n\
段厚省","教授\r\n\
教授",140,JB101,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：09:00-11:00",12 法学\r\n\
LAWS130027.01,婚姻家庭法,3.0,孙晓屏,副教授,90,JB202,四 6-8 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:30",13 法学\r\n\
LAWS130029.01,国际金融法,3.0,王伟,教授,30,JB202,四 2-4 ,全英文,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 法学\r\n\
LAWS130030.01,国际贸易法,3.0,陈梁,教授,60,JB102,一 6-8 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:30",13 法学\r\n\
LAWS130031.01,侵权行为法,2.0,段匡,教授,42,JB302,三 3-4 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35","13 法学\r\n\
12 旅游管理"\r\n\
LAWS130032.01,证券法,2.0,许凌艳,副教授,30,JB202,"五 4-5\r\n\
(8-16周)",因老师出国,课程安排在第8周周周五/2-5,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：10:50-12:30",13 法学\r\n\
LAWS130033.01,票据法,2.0,白国栋,副教授,60,JB303,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:10",13 法学\r\n\
LAWS130034.01,证据学,2.0,马贵翔,教授,30,JB102,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",13 法学\r\n\
LAWS130040.01,法律诊所教育,3.0,"章武生\r\n\
季立刚","教授\r\n\
教授",20,JB302,四 2-4 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：08:55-10:55",13 法学\r\n\
LAWS130044.01,中国法律思想史,2.0,韩涛,副教授,30,JB102,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",12 法学\r\n\
LAWS130045.01,西方法律思想史,2.0,杨晓畅,讲师,30,JB303,一 3-4 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35",12 法学\r\n\
LAWS130046.01,外国刑事诉讼法,2.0,徐美君,教授,30,JB303,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 法学\r\n\
LAWS130047.01,外国行政法,2.0,朱淑娣,教授,60,JB303,二 2-3 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:00-11:00",\r\n\
LAWS130050.01,刑法II,3.0,陈浩然,教授,150,JB201,二 2-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:30-15:30",14 法学\r\n\
LAWS130051.01,外国民事诉讼法,2.0,杨严炎,副教授,30,JB202,"五 2-3\r\n\
(1-7周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
LAWS160001.01,宪法学,3.0,涂云新,讲师,150,,,因涂云新出国,9月上《民法总论》,"考试日期：\r\n\
\r\n\
考试时间：-",15 法学\r\n\
LAWS160002.01,民法总论,3.0,班天可,讲师,150,,,因涂云新出国,10月上《宪法》,"考试日期：\r\n\
\r\n\
考试时间：-",15 法学\r\n\
LAWS160003.01,刑法,3.0,杜宇,教授,150,,,,"考试日期：\r\n\
\r\n\
考试时间：-",15 法学\r\n\
LAWS160005.01,商法,3.0,李世刚,副教授,110,,,,"考试日期：\r\n\
\r\n\
考试时间：-",14 法学\r\n\
LAWS160007.01,知识产权法,3.0,王俊,讲师,110,,,,"考试日期：\r\n\
\r\n\
考试时间：-",14 法学\r\n\
SOSC120003.01,法理学导论,3.0,杨晓畅,讲师,160,H3308,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30","15 法学\r\n\
15 社会科学试验班\r\n\
15 管理学院"\r\n\
SOSC120003.02,法理学导论,3.0,侯健,教授,140,H3406,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",15 法学\r\n\
SOSC120015.01,宪法,3.0,王蔚,副教授,105,H6401,二 2-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：8:30-10:30","15 新闻学院\r\n\
15 法学"\r\n\
SOSC120015.02,宪法,3.0,潘伟杰,教授,105,H3308,二 2-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：8:30-10:30","15 新闻学院\r\n\
15 法学"\r\n\
SOCI130008.01,经济社会学,2.0,桂勇,教授,70,H5114,一 6-7 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30",13 社会学\r\n\
SOCI130014.01,学年论文,1.0,李晓煦,讲师,30,H院系自主,日 1-1 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 心理学\r\n\
SOCI130014.02,学年论文,1.0,沈奕斐,副教授,85,,日 1-1 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 社会学\r\n\
SOCI130017.01,个案工作,3.0,高建秀,副研究馆员,35,H社工实验室,四 2-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 社会工作\r\n\
SOCI130020.01,社会工作行政,3.0,王川兰,讲师,30,H5109,三 7-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 社会工作\r\n\
SOCI130021.01,人类行为与社会环境,3.0,朱晨海,讲师,108,H3306,四 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","13 社会学\r\n\
14 社会工作"\r\n\
SOCI130023.01,社会工作伦理,3.0,赵芳,副教授,35,H6110,一 3-5 ,校级精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 社会工作\r\n\
SOCI130024.01,社会工作实习(一),4.0,刘勇,工程师,30,,日 2-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 社会工作\r\n\
SOCI130025.01,社会工作实习(二),4.0,刘勇,工程师,5,H院系自主,日 3-3 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 社会工作\r\n\
SOCI130030.01,生理心理学,3.0,张玉秋,教授,30,H5106,五 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",13 心理学\r\n\
SOCI130036.01,社会心理学,3.0,陈斌斌,讲师,160,H4301,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","13 社会学\r\n\
13 保密管理\r\n\
13 信息安全(保密方向)\r\n\
14 新闻传播学类\r\n\
12 信息安全(保密方向)"\r\n\
SOCI130036.02,社会心理学,3.0,孙时进,教授,42,H5306,一 2-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","13 心理学\r\n\
14 心理学"\r\n\
SOCI130039.01,中国的政治经济状况,2.0,张力,教授,15,H5104,三 3-4 ,全英语课程,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：09:55-11:35",12 社会学\r\n\
SOCI130065.01,发展研究,2.0,胡安宁,副教授,0,H6208,"二 11-13\r\n\
(1-13周)","全英语课程\r\n\
手动添加选课","考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
SOCI130068.01,社会性别研究,2.0,沈奕斐,副教授,60,H5110,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 社会学\r\n\
13 社会学"\r\n\
SOCI130077.01,法律与社会工作,2.0,韩央迪,副教授,30,H6205,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 社会工作\r\n\
SOCI130081.01,家庭治疗,2.0,高建秀,副研究馆员,30,H社工实验室,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 社会工作\r\n\
SOCI130083.01,心理测验与应用,2.0,王燕,副教授,56,H5106,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","12 社会工作\r\n\
12 心理学"\r\n\
SOCI130085.01,中国文化与商业实践,2.0,"潘天舒\r\n\
朱剑峰","教授\r\n\
副教授",10,H5211,"三 6-8\r\n\
(1-13周)","全英语课程\r\n\
上海市留学生英语授课示范性课程","考试日期：论文\r\n\
\r\n\
考试时间：-",13 社会学\r\n\
SOCI130096.01,古典社会学理论,3.0,"刘欣\r\n\
俞志元","教授\r\n\
讲师",60,H6110,三 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00",14 社会学\r\n\
SOCI130098.01,社会调查方法,2.0,沈洁,讲师,90,HGX408,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 新闻学院\r\n\
12 社会工作"\r\n\
SOCI130098.02,社会调查方法,2.0,"刘欣\r\n\
俞志元","教授\r\n\
讲师",98,H6506,五 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 社会学\r\n\
13 心理学"\r\n\
SOCI130099.01,西方社会思想史,2.0,"于海\r\n\
徐珂","教授\r\n\
副教授",70,HGX307,四 8-9 ,上海市精品课程团队,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",14 社会学\r\n\
SOCI130103.01,文化社会学,2.0,周怡,教授,70,H5114,二 3-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35",13 社会学\r\n\
SOCI130108.01,社会福利理论与制度,3.0,韩央迪,副教授,30,H6207,一 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 社会工作\r\n\
SOCI130118.01,职业心理学,2.0,高山川,讲师,30,H6207,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 心理学\r\n\
SOCI130129.01,社会统计学,4.0,陆康强,教授,30,H6206,一 6-8 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 社会工作\r\n\
SOCI130129.01,社会统计学,4.0,陆康强,教授,30,,二 11-12 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",13 社会工作\r\n\
SOCI130129.02,社会统计学,4.0,陆康强,教授,60,,一 11-12 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 社会学\r\n\
SOCI130129.02,社会统计学,4.0,陆康强,教授,60,H5116,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 社会学\r\n\
SOCI130133.01,组织社会学,3.0,徐建牛,副教授,75,H5104,五 8-10 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 社会学\r\n\
SOCI130134.01,全球化争议,2.0,Gail Hershatter,,30,HGX305,二 6-8,,,复旦加州项目\r\n\
SOCI130135.01,上海：城市研究,2.0,于海,教授,10,HGX405,"三 8-10\r\n\
(1-13周)",全英语课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 社会学\r\n\
SOCI130136.01,中国社会与宗教,2.0,胡安宁,副教授,10,H5307,"三 3-5\r\n\
(1-13周)",全英语课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",社会学\r\n\
SOCI130137.01,全球化下的中国文化与社会,2.0,"于海\r\n\
胡安宁","教授\r\n\
副教授",45,HGX206,"四 3-5\r\n\
(1-13周)","上海市教学名师 \r\n\
全英语课程 \r\n\
复旦-UC课程 \r\n\
上海市留学生英语授课示范性课程","考试日期：论文\r\n\
\r\n\
考试时间：-","复旦加州项目\r\n\
13 社会学"\r\n\
SOCI130140.01,语言心理学,2.0,张学新,教授,40,H5308,一 8-9 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00","14 心理学\r\n\
13 心理学\r\n\
12 心理学"\r\n\
SOCI130144.01,贫穷与社会发展,2.0,陈岩燕,讲师,30,H5107,四 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 社会工作\r\n\
SOCI130149.01,社会调查实践（一）,2.0,胡安宁,副教授,75,,六 4-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 社会学\r\n\
SOCI130153.01,论文写作,2.0,陈斌斌,讲师,20,H文科楼931,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 社会发展与公共政策学院\r\n\
SOCI130156.01,社会工作技巧实验,2.0,徐文艳,讲师,30,H社工实验室,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 社会工作\r\n\
SOCI130159.01,心理统计学（二）,2.0,李晓煦,讲师,25,H文科楼931,二 8-9 ,,"考试日期：\r\n\
\r\n\
考试时间：-","12 心理学\r\n\
13 心理学"\r\n\
SOCI130160.01,专业实践（一）,2.0,高山川,讲师,26,H院系自主,日 5-5 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 心理学\r\n\
SOCI130174.01,灾难社会工作,2.0,付芳,讲师,30,H5112,二 3-4 ,,"考试日期：\r\n\
\r\n\
考试时间：-","13 社会工作\r\n\
12 社会工作"\r\n\
SOCI130175.01,社会服务项目开发与管理,2.0,王川兰,讲师,20,H6410,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 社会工作\r\n\
14 社会工作\r\n\
13 社会工作"\r\n\
SOCI130176.01,心理统计学（一）,5.0,李晓煦,讲师,20,H文科楼931,三 4-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：15:30-17:30",14 心理学\r\n\
SOCI130176.01,心理统计学（一）,5.0,李晓煦,讲师,20,,三 8-10 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：15:30-17:30",14 心理学\r\n\
SOCI130179.01,变态心理学,3.0,李晓茹,副教授,30,H5415,四 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 心理学\r\n\
SOSC120002.01,社会学导论,3.0,王威海,教授,169,H6312,二 3-5 ,"校级精品课程\r\n\
同934.023.1课程王威海","考试日期：2015-12-30\r\n\
\r\n\
考试时间：18:30-20:30","15 新闻学院\r\n\
15 管理学院\r\n\
13 环境科学(环境管理方向)\r\n\
15 社会科学试验班"\r\n\
SOSC120002.02,社会学导论,3.0,徐建牛,副教授,178,H3309,五 3-5 ,校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：18:30-20:30","15 管理学院\r\n\
15 社会科学试验班\r\n\
15 护理学(四年制)\r\n\
15 新闻学院\r\n\
13 环境科学(环境管理方向)"\r\n\
SOSC120009.01,社会研究方法A,3.0,魏星,讲师,80,H6106,一 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：15:30-17:30",\r\n\
SOSC120009.02,社会研究方法A,3.0,张伊娜,副教授,80,H5110,四 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：15:30-17:30",15 社会科学试验班\r\n\
SOSC120012.01,社会工作导论,3.0,陈岩燕,讲师,80,H5116,四 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",15 社会科学试验班\r\n\
SOSC120012.02,社会工作导论,3.0,顾东辉,教授,80,H5116,二 3-5 ,校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",15 社会科学试验班\r\n\
SOSC120013.01,心理学导论,3.0,田芊,讲师,125,H6312,五 6-8 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：18:30-20:30","15 社会科学试验班\r\n\
15 新闻学院"\r\n\
SOSC120013.02,心理学导论,3.0,吴国宏,副教授,120,H3406,四 3-5 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：18:30-20:30","15 自然科学试验班\r\n\
15 法学\r\n\
15 社会科学试验班"\r\n\
SOSC120013.03,心理学导论,3.0,高隽,讲师,80,HGX507,四 6-8 ,全英文课程,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：18:30-20:30",15\r\n\
SOSC120013.04,心理学导论,3.0,高隽,讲师,125,H2220,五 3-5 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：18:30-20:30","15 社会科学试验班\r\n\
15 新闻学院"\r\n\
ZDSY118002.01,书信里的中国人,2.0,张乐天,教授,20,H5307,"二 3-4\r\n\
(2-16周)",,"考试日期：论文\r\n\
\r\n\
考试时间：-",15\r\n\
ICES110001.04,留学生高级汉语I,4.0,林涓,助理研究员,30,H6110,三 3-4 ,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：13:30-15:10",15 留学生 国际关系与公共事务学院\r\n\
ICES110001.04,留学生高级汉语I,4.0,林涓,助理研究员,30,H6110,五 6-7 ,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：13:30-15:10",15 留学生 国际关系与公共事务学院\r\n\
ICES110003.02,留学生专业汉语I,4.0,黄以天,讲师,30,H6209,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 国际关系与公共事务学院\r\n\
ICES110003.02,留学生专业汉语I,4.0,黄以天,讲师,30,H6209,五 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 国际关系与公共事务学院\r\n\
POLI130001.01,中国政治思想,3.0,臧志军,教授,61,H5113,一 3-5 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 新闻学院\r\n\
14 政治学与行政学"\r\n\
POLI130003.01,西方政治学说史,3.0,任军锋,教授,119,H6112,二 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","14 国际关系与公共事务学院\r\n\
14 新闻学院"\r\n\
POLI130004.01,西方经济学基础,3.0,周志成,研究员,95,H6101,一 3-5 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",14 国际政治\r\n\
POLI130004.02,西方经济学基础,3.0,周志成,研究员,100,H6101,一 8-10 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:30-17:30","14 政治学与行政学\r\n\
14 行政管理"\r\n\
POLI130005.01,比较政治制度,3.0,陈云,教授,95,H6101,四 3-5 ,校级精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 国际政治\r\n\
POLI130005.02,比较政治制度,3.0,包刚升,讲师,55,H6204,三 3-5 ,校级精品课程,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 政治学与行政学\r\n\
POLI130007.01,中国历代政治与行政,3.0,林涓,助理研究员,35,H6102,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 政治学与行政学\r\n\
POLI130008.01,西方政治史,2.0,任军锋,教授,44,H6102,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","14 政治学与行政学\r\n\
14 新闻学院"\r\n\
POLI130013.01,公共政策概论,3.0,朱春奎,教授,148,H3408,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","13 政治学与行政学\r\n\
14 新闻学院\r\n\
14 行政管理"\r\n\
POLI130015.01,中国社会政治分析,3.0,郑长忠,副教授,55,H6110,一 6-8 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 政治学与行政学\r\n\
POLI130022.01,近现代中国对外关系,3.0,俞沂暄,讲师,107,H4103,三 6-8 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00","12 信息安全(保密方向)\r\n\
14 国际政治"\r\n\
POLI130023.01,近现代国际关系,3.0,张建新,教授,113,H6112,三 3-5 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30","14 国际政治\r\n\
14 新闻学院"\r\n\
POLI130025.01,外交学,2.0,"张骥\r\n\
陈志敏","助理研究员\r\n\
教授",110,H6301,四 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 新闻学院\r\n\
13 国际政治"\r\n\
POLI130029.01,全球事务与全球治理,2.0,陈玉聃,讲师,55,H6110,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 国际关系与公共事务学院\r\n\
POLI130030.01,美国政治与对外关系,2.0,徐以骅,教授,100,H6112,五 9-10 ,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：16:20-18:00",13 国际政治系\r\n\
POLI130031.01,俄罗斯政治与对外关系,2.0,马斌,助理研究员,90,H6201,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 国际政治\r\n\
POLI130048.01,组织行为学,2.0,李春成,教授,70,H6304,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 行政管理\r\n\
POLI130049.01,管理学概论,3.0,陈晓原,教授,70,H5110,二 3-5 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 行政管理\r\n\
POLI130056.01,公务员制度,2.0,扶松茂,副教授,117,H3408,一 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30","14 新闻学院\r\n\
14 行政管理\r\n\
13 保密管理"\r\n\
POLI130063.01,国际组织,2.0,薄燕,教授,100,H6201,一 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",12 国际政治\r\n\
POLI130065.01,行政文书写作,2.0,姚为群,研究员,70,H6105,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 国际关系与公共事务学院\r\n\
POLI130077.01,英语听说(中高级)(上),2.0,陈晓原,教授,35,H5209,二 8-9 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：15:25-17:05",13 国际关系与公共事务学院\r\n\
POLI130079.01,日语(国政系)(上),2.0,包霞琴,教授,30,H6102,五 6-7 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：13:30-15:10",13 国际关系与公共事务学院\r\n\
POLI130083.01,当代中国公共政策,2.0,陈云,教授,35,H5308,四 1-2 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：08:00-09:40",13 国际关系与公共事务学院\r\n\
POLI130083.02,当代中国公共政策,2.0,唐贤兴,教授,35,H5308,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 国际关系与公共事务学院\r\n\
POLI130085.01,比较公共行政,2.0,唐亚林,教授,55,H5312,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 国际关系与公共事务学院\r\n\
POLI130090.01,宗教与国际关系,2.0,秦倩,讲师,45,H5112,四 8-9 ,校级精品课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 国际关系与公共事务学院\r\n\
POLI130096.01,国际谈判,2.0,沈逸,副教授,85,H2101,一 11-12 ,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",13 国际关系与公共事务学院\r\n\
POLI130107.01,主权理论研究,2.0,肖佳灵,副教授,20,H5215,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 国际关系与公共事务学院\r\n\
POLI130121.01,中美关系与亚洲的崛起,2.0,刘永涛,研究员,15,H5213,五 3-5(1-12周),"全英语课程 \r\n\
复旦-UC课程","考试日期：论文\r\n\
\r\n\
考试时间：-",复旦加州项目\r\n\
POLI130124.01,当代中国公共行政,3.0,唐亚林,教授,93,H3101,三 6-8 ,校级精品课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 行政管理\r\n\
14 新闻学院"\r\n\
POLI130129.01,国际政治学研究方法,2.0,朱杰进,副教授,95,H4204,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 国际政治\r\n\
POLI130134.01,公共财政管理,2.0,苟燕楠,教授,90,H4303,二 11-12 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：18:30-20:30",13 行政管理\r\n\
POLI130136.01,西方国际评论精选,2.0,袁建华,副教授,50,H6509,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",13 国际政治\r\n\
POLI130136.02,西方国际评论精选,2.0,袁建华,副教授,50,H6509,四 8-9 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:30-17:30",13 国际政治\r\n\
POLI130138.01,跨文化与国际交流,2.0,何佩群,副教授,45,H5112,三 6-7 ,全英语课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 国际政治\r\n\
POLI130138.02,跨文化与国际交流,2.0,何佩群,副教授,45,H5112,三 8-9 ,全英语课程,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 国际政治\r\n\
POLI130139.01,英文常用文写作,2.0,郑宇,教授,90,H6306,一 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 国际政治\r\n\
POLI130140.01,公共危机管理,2.0,李瑞昌,副教授,130,H6412,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 行政管理\r\n\
13 行政管理"\r\n\
POLI130142.01,非政府组织,2.0,扶松茂,副教授,65,H6405,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",12 行政管理\r\n\
POLI130144.01,贸易与国际关系,2.0,贺平,副研究员,60,H6404,五 3-4 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：09:55-11:35",13 国际关系与公共事务学院\r\n\
POLI130145.01,跨国公司与国际关系,2.0,黄河,副教授,65,H6104,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 国际关系与公共事务学院\r\n\
POLI130148.01,公共管理创新与移动政务,2.0,刘淑华,副教授,75,H5104,五 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 行政管理\r\n\
POLI130152.01,外交实务,2.0,张骥,助理研究员,50,H4304,四 11-12 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 国际关系与公共事务学院\r\n\
POLI130155.01,集体行动（上）,2.0,郦菁,讲师,55,H6501,四 6-7 ,全英语课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",13 政治学与行政学\r\n\
POLI130156.01,集体行动（下）,2.0,胡鹏,,65,H6108,一 3-4 ,全英语课程,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：8:30-10:30",12 政治学与行政学\r\n\
POLI130173.01,定量研究方法,2.0,李辉,副教授,95,H4203,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",14 国际政治\r\n\
POLI130173.02,定量研究方法,2.0,李辉,副教授,100,H4104,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 政治学与行政学\r\n\
14 行政管理"\r\n\
POLI130179.01,中国与全球治理,2.0,朱杰进,副教授,65,H6107,三 11-12 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：18:30-20:10",14 国际关系与公共事务学院\r\n\
SOSC120001.01,政治学原理,3.0,郑长忠,副教授,150,HGX103,一 1-3 ,上海市精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：15:30-17:30","15 法学\r\n\
15 社会科学试验班"\r\n\
SOSC120001.02,政治学原理,3.0,李辉,副教授,150,H6412,二 3-5 ,上海市精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：15:30-17:30","15 新闻学院\r\n\
15 社会科学试验班\r\n\
15 管理学院"\r\n\
SOSC120001.03,政治学原理,3.0,陈周旺,教授,150,HGX104,五 3-5 ,上海市精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：15:30-17:30","15 新闻学院\r\n\
15 社会科学试验班"\r\n\
SOSC120001.04,政治学原理,3.0,熊易寒,副教授,150,H2101,一 3-5 ,上海市精品课程,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：15:30-17:30","15 新闻学院\r\n\
15 社会科学试验班"\r\n\
SOSC120011.01,国际关系导论,3.0,蒋昌建,副教授,120,H6112,一 6-8 ,校级精品课程,"考试日期：论文\r\n\
\r\n\
考试时间：-","15 新闻学院\r\n\
15 社会科学试验班"\r\n\
SOSC120011.02,国际关系导论,3.0,苏长和,教授,120,H3208,二 3-5 ,校级精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30","15 社会科学试验班\r\n\
15 新闻学院"\r\n\
SOSC120018.01,公共行政学,3.0,陈水生,副教授,85,H6309,二 3-5 ,上海市精品课程,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",15 社会科学试验班\r\n\
SOSC120018.02,公共行政学,3.0,李瑞昌,副教授,85,H6201,四 1-3 ,"上海市精品课程\r\n\
研讨型课程","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻学院\r\n\
15 社会科学试验班"\r\n\
SOSC120018.03,公共行政学,3.0,顾丽梅,教授,85,H6406,四 1-3 ,上海市精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30","15 新闻学院\r\n\
15 社会科学试验班"\r\n\
SOSC120019.01,当代中国政治制度,3.0,扶松茂,副教授,150,H3309,四 3-5 ,国家级精品课程,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",15 社会科学试验班\r\n\
ICES110001.02,留学生高级汉语I,4.0,顾昕,副教授,20,HQ302,二 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
ICES110001.02,留学生高级汉语I,4.0,顾昕,副教授,20,HQ302,四 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
ICES110008.01,留学生专业汉语(上),2.0,郭虹,副教授,30,HQ302,五 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:00-15:00",\r\n\
JOUR120001.01,马克思主义新闻思想,2.0,童兵,教授,70,H3101,二 3-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：09:55-11:35",\r\n\
JOUR120001.02,马克思主义新闻思想,2.0,马凌,副教授,70,H4206,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",\r\n\
JOUR120001.03,马克思主义新闻思想,2.0,陈建云,教授,70,H4206,三 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",\r\n\
JOUR120001.04,马克思主义新闻思想,2.0,张涛甫,教授,70,H5104,二 3-4 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：9:55-11:35",\r\n\
JOUR120008.01,新闻学概论,2.0,周海晏,讲师,80,HQ502,五 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
JOUR120008.02,新闻学概论,2.0,葛星,助教,80,HQ502,三 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
JOUR120009.01,传播学概论,2.0,廖圣清,教授,80,HQ502,一 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：15:30-17:30",\r\n\
JOUR120009.02,传播学概论,2.0,沈国麟,副教授,80,HQ502,三 8-9 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：15:30-17:30",\r\n\
JOUR130004.01,新闻编辑与评论,3.0,黄芝晓,教授,50,HQ203,二 1-3 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：8:30-10:30",13 新闻学\r\n\
JOUR130010.01,媒介经营管理,2.0,黄芝晓,教授,50,HQ203,三 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30",13 新闻学\r\n\
JOUR130015.01,广播电视新闻,2.0,陆柳,讲师,57,HQ201,五 3-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 广播电视学\r\n\
13 广播电视新闻学"\r\n\
JOUR130017.01,教学大实习,4.0,陈建云,教授,77,HQ院系自主,六 1-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","12 新闻学(武警班)\r\n\
12 新闻学"\r\n\
JOUR130017.02,教学大实习,4.0,章平,副教授,29,HQ院系自主,六 1-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 广播电视新闻学\r\n\
JOUR130017.03,教学大实习,4.0,廖圣清,教授,35,HQ院系自主,六 1-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 传播学\r\n\
JOUR130017.04,教学大实习,4.0,顾铮,教授,46,HQ院系自主,六 1-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",12 广告学\r\n\
JOUR130019.01,新闻采访与写作,3.0,黄小雄,主任记者,20,HQ203,一 3-5 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 新闻学院\r\n\
JOUR130019.02,新闻采访与写作,3.0,黄小雄,主任记者,20,HQ203,一 11-13 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 新闻学院\r\n\
JOUR130020.01,广播电视概论,2.0,赵民,副教授,57,HQ201,二 1-2 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30","13 广播电视学\r\n\
13 广播电视新闻学"\r\n\
JOUR130022.01,电视摄像,2.0,杨敏,高级工程师,57,HQ201,五 8-9 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：15:30-17:30","13 广播电视学\r\n\
13 广播电视新闻学"\r\n\
JOUR130030.01,广播电视技术,2.0,杨敏,高级工程师,57,HQ201,五 6-7 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:00-15:00","13 广播电视学\r\n\
13 广播电视新闻学"\r\n\
JOUR130031.01,新闻传播前沿讲座,2.0,黄瑚,教授,180,HQ蔡冠深报告厅,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 新闻学院\r\n\
JOUR130039.01,网络新闻传播原理与应用,3.0,邓建国,副教授,33,HQ303,四 3-5 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 传播学\r\n\
JOUR130040.01,传播学研究方法,2.0,刘景芳,讲师,33,HQ303,一 3-4 ,,"考试日期：\r\n\
\r\n\
考试时间：-",13 传播学\r\n\
JOUR130041.01,公共关系学,2.0,王迪,讲师,55,HQ301,五 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 广告学\r\n\
JOUR130042.01,人际传播学,2.0,胡春阳,副教授,33,HQ303,二 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 传播学\r\n\
JOUR130043.01,组织传播学,2.0,谢静,教授,33,HQ303,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 传播学\r\n\
JOUR130046.01,世界传播业概况,2.0,杨鹏,副教授,33,HQ303,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 传播学\r\n\
JOUR130048.01,媒介形态学,2.0,谢静,教授,55,HQ301,二 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 广告学\r\n\
JOUR130050.01,广告学概论,3.0,唐乐,讲师,55,HQ301,四 3-5 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 广告学\r\n\
JOUR130052.01,广告文案写作,2.0,张殿元,教授,55,HQ301,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 广告学\r\n\
JOUR130059.01,广告摄影,2.0,李华强,讲师,55,HQ301,三 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 广告学\r\n\
JOUR130063.01,大众传媒与文化,2.0,张大伟,副教授,50,HQ203,五 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 新闻学\r\n\
JOUR130064.01,体育和娱乐报道,2.0,"洪兵\r\n\
赵民","副教授\r\n\
副教授",50,HQ203,二 4-5 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 新闻学\r\n\
JOUR130072.01,精确新闻报道,2.0,廖圣清,教授,30,HQ303,一 6-7 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 新闻学院\r\n\
12 新闻学院"\r\n\
JOUR130077.01,视觉传播,2.0,孟建,教授,57,HQ201,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:30","13 广播电视学\r\n\
13 广播电视新闻学"\r\n\
JOUR130088.01,广播电视事业管理,2.0,周笑,副教授,57,HQ201,一 3-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 广播电视新闻学\r\n\
13 广播电视学"\r\n\
JOUR130101.01,媒介融合概论,2.0,"李华强\r\n\
陆柳\r\n\
邓建国","讲师\r\n\
讲师\r\n\
副教授",40,HQ图书馆机房,三 3-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","12 新闻学院\r\n\
13 新闻学院"\r\n\
JOUR130107.01,视听语言,2.0,杨击,副教授,57,HQ201,三 1-2 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 广播电视新闻学\r\n\
13 广播电视学"\r\n\
JOUR130125.01,广告文化,2.0,张殿元,教授,55,HQ301,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 广告学\r\n\
JOUR130140.01,纪实摄影工作室,2.0,顾铮,教授,57,HQ201,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 广播电视新闻学\r\n\
13 广播电视学"\r\n\
JOUR130147.01,中外广告事业,2.0,王迪,讲师,55,HQ301,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 广告学\r\n\
JOUR130166.01,深度报道,3.0,周笑,副教授,50,HQ203,一 6-8 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 新闻学\r\n\
12 新闻学院\r\n\
13 新闻学院"\r\n\
JOUR130167.01,电视编辑,3.0,陆晔,教授,57,HQ201,三 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:00-15:00","13 广播电视学\r\n\
13 广播电视新闻学"\r\n\
JOUR130176.01,国际传播,2.0,徐佳,讲师,55,HQ201,一 1-2 ,,,13 传播学\r\n\
JOUR130178.01,说服与传播运动设计,2.0,"王迪\r\n\
邓建国","讲师\r\n\
副教授",33,HQ303,三 6-7 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-","13 新闻学院\r\n\
13 传播学\r\n\
12 新闻学院"\r\n\
JOUR130186.01,新闻摄影,2.0,颜志刚,教授,50,HQ203,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",13 新闻学\r\n\
JOUR130187.01,广告美术设计,2.0,李华强,讲师,51,HQ304,二 3-4 ,,"考试日期：其他\r\n\
\r\n\
考试时间：-",13 广告学\r\n\
HIST120001.01,史学原典导读,2.0,邹振环,教授,80,HGX105,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：18:30-20:30",15 历史学类\r\n\
HIST120003.01,国史概要,2.0,冯贤亮,教授,120,HGX103,二 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：18:30-20:30",\r\n\
HIST120010.01,近代的世界,2.0,"陆启宏\r\n\
张智","副教授\r\n\
讲师",80,HGX105,四 6-7 ,校级精品课程,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：18:30-20:30",15 新闻学院\r\n\
HIST120012.01,中国古代文明,3.0,余蔚,教授,80,HGX210,一 6-9 ,单周上课，双周上课加讨论,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：18:30-20:30",15 历史学类\r\n\
HIST120012.02,中国古代文明,3.0,仇鹿鸣,副研究员,80,HGX209,一 6-9 ,单周上课，双周上课加讨论,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：18:30-20:30",15 历史学类\r\n\
HIST120012.03,中国古代文明,3.0,温海清,副教授,80,HGX310,一 6-9 ,单周上课，双周上课加讨论,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：18:30-20:30",15 历史学类\r\n\
HIST120012.04,中国古代文明,3.0,邱轶皓,讲师,80,HGX309,一 6-9 ,单周上课，双周上课加讨论,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：18:30-20:30",15 历史学类\r\n\
HIST130001.01,史学导论,3.0,章清,教授,80,HGX209,三 6-8 ,上海市教学名师,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 历史学\r\n\
HIST130003.01,社科文献学,2.0,"李春博\r\n\
于翠艳","馆员\r\n\
馆员",80,HGX105,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",13 历史学\r\n\
HIST130009.01,20世纪世界史,2.0,顾云深,教授,80,HGX106,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 历史学\r\n\
HIST130010.01,专业英语(历史学),2.0,司佳,副教授,80,HGX105,四 8-9 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:30-17:30","13 历史学\r\n\
13 旅游管理"\r\n\
HIST130027.01,中国历史地理概论,2.0,张伟然,教授,50,HGX306,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 历史学\r\n\
12 历史学\r\n\
14 历史学"\r\n\
HIST130029.01,中国近代经济史,2.0,皇甫秋实,讲师,40,HGX201,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","12 历史学\r\n\
14 历史学\r\n\
13 历史学"\r\n\
HIST130031.01,中国近代思想史,2.0,曹南屏,讲师,50,HGX301,一 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 历史学\r\n\
13 历史学\r\n\
12 历史学"\r\n\
HIST130035.01,中英关系史,2.0,王立诚,教授,30,HGX205,五 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","14 历史学\r\n\
13 历史学"\r\n\
HIST130036.01,近现代中韩关系史,2.0,孙科志,教授,40,HGX201,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130037.01,中美关系史,2.0,马建标,副教授,20,HGX502,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130041.01,美国史,2.0,谈丽,讲师,30,HGX301,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130048.01,中国古代经济史,2.0,黄敬斌,副教授,50,HGX302,一 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 历史学\r\n\
12 历史学"\r\n\
HIST130049.01,内陆亚洲的历史与文化,2.0,温海清,副教授,40,HGX201,四 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130054.01,中国近现代史文献,2.0,王维江,研究员,40,HGX502,三 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130055.01,中国金融史,2.0,赵兰亮,副教授,40,HGX302,四 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130097.01,海外中国近代史研究,2.0,章可,助理研究员,20,HGX401,一 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 历史学\r\n\
12 历史学"\r\n\
HIST130112.01,西方基督教史,2.0,夏洞奇,副教授,40,HGX302,一 6-7 ,第三阶段仍不开放限制,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",历史学\r\n\
HIST130122.01,中华人民共和国经济史,2.0,朱荫贵,教授,40,HGX401,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",历史学\r\n\
HIST130129.01,晚清史,2.0,戴鞍钢,教授,40,HGX302,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",历史学\r\n\
HIST130131.01,留学生与近代中国,2.0,汪乾明,讲师,60,HGX401,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130146.01,欧美汉学,2.0,赵兰亮,副教授,40,HGX501,五 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130149.01,蒙元史,2.0,温海清,副教授,40,HGX106,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130152.01,中国当代史,2.0,金光耀,教授,80,HGX207,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",13 历史学\r\n\
HIST130156.01,中国现代经济思想史,2.0,何爱国,讲师,50,HGX501,一 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130163.01,科学的历史背景,2.0,郑方磊,讲师,20,HGX502,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",历史学\r\n\
HIST130169.01,近代中国人物研究,2.0,吴景平,教授,40,HGX406,三 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130174.01,历史社会学,2.0,孙沛东,副教授,80,HGX105,四 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130176.01,简帛文献学概论,2.0,林志鹏,副教授,30,HGX301,四 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130179.01,中国历史文选,3.0,邓志峰,教授,80,HGX106,四 6-8 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",14 历史学\r\n\
HIST130180.01,中国古代史（上）,4.0,马孟龙,讲师,100,H4205,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 历史学类\r\n\
HIST130180.01,中国古代史（上）,4.0,马孟龙,讲师,100,H4205,四 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",15 历史学类\r\n\
HIST130182.01,中国近现代史（上）,2.0,孙青,副教授,80,HGX209,五 3-4 ,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：08:30-10:30",14 历史学\r\n\
HIST130186.01,近代的世界,3.0,"陆启宏\r\n\
张智","副教授\r\n\
讲师",80,HGX106,四 3-5 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",14 历史学\r\n\
HIST130190.01,俄罗斯史,2.0,Rostislav Berezkin,副研究员,60,HGX205,一 3-4 ,"全英文课程\r\n\
2015年12月21日随堂提交论文","考试日期：论文,2015-12-21\r\n\
\r\n\
考试时间：09:55-11:35","13 历史学\r\n\
14 历史学"\r\n\
HIST130191.01,中国古史传说研究导论,2.0,林志鹏,副教授,30,HGX301,四 1-2 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130196.01,西欧近现代帝国史,2.0,朱联璧,讲师,45,HGX205,三 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-","13 历史学\r\n\
12 历史学"\r\n\
HIST130210.01,古希腊史学原著研读,2.0,吴晓群,教授,20,H3405,三 8-9 ,望道,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
HIST130225.01,美国政治史,2.0,李剑鸣,教授,20,HGX305,三 8-9 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 历史学\r\n\
HIST130231.01,楔形文字入门,2.0,欧阳晓莉,副研究员,50,HGX206,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",历史学\r\n\
HIST130233.01,上海史,3.0,孙青,副教授,20,H2105B,五 6-8 ,"全英文课程\r\n\
2015年12月18日随堂提交论文","考试日期：论文,2015-12-18\r\n\
\r\n\
考试时间：13:30-16:10","14 旅游管理\r\n\
14 历史学"\r\n\
HIST130234.01,中国思想文化专题研究,2.0,何爱国,讲师,80,HGX309,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学\r\n\
MATH120044.05,线性代数,3.0,杭国明,高级讲师,60,H6407,一 6-7,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 旅游管理\r\n\
MATH120044.05,线性代数,3.0,杭国明,高级讲师,60,H6407,四 3-4,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 旅游管理\r\n\
ECON120014.01,宏观经济学B,3.0,郭_,副教授,80,HGX509,三 6-8,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:00-15:00",14 旅游管理\r\n\
MANA130347.05,会计学,3.0,孙云龙,副教授,80,HGX409,一 9-9,周一9为习题课，助教上,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：15:30-17:30",14 旅游管理\r\n\
MANA130347.05,会计学,3.0,孙云龙,副教授,80,HGX409,五 3-5,周一9为习题课，助教上,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：15:30-17:30",14 旅游管理\r\n\
TOUR110001.01,旅游与经济管理,2.0,王永刚,副教授,80,JB303,三 11-12,江湾校区,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",\r\n\
TOUR110003.01,中国旅游名胜,2.0,巴兆祥,教授,80,HGX310,一 11-12,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:10",\r\n\
TOUR130004.01,旅游学原理,3.0,黄洁,副教授,80,HGX209,一 3-5,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",14 旅游管理\r\n\
TOUR130006.01,经济法,3.0,后智钢,副教授,80,HGX310,二 1-3,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",14 旅游管理\r\n\
TOUR130007.01,旅游营销管理,3.0,郭英之,教授,80,HGX410,一 6-8,"全英文课程\r\n\
研讨性课程\r\n\
第二周开始上课","考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:00-15:00",13 旅游管理\r\n\
TOUR130008.01,旅游文化学,2.0,沈祖祥,副教授,80,HGX310,二 4-5,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:30-10:30",13 旅游管理\r\n\
TOUR130014.01,旅游经济学,2.0,翁瑾,副教授,80,HGX106,五 6-7,,"考试日期：2016-01-08\r\n\
\r\n\
考试时间：13:00-15:00",13 旅游管理\r\n\
TOUR130019.01,旅行社经营管理,2.0,张歆梅,讲师,80,HGX209,三 3-4,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",14 旅游管理\r\n\
TOUR130030.01,旅游管理专题,2.0,沈涵,副教授,80,HGX309,一 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 旅游管理\r\n\
TOUR130058.01,旅游消费者行为,2.0,沈涵,副教授,80,HGX210,五 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",13 旅游管理\r\n\
TOUR130066.01,旅游英语（下）,3.0,沈莺,讲师,80,HGX410,二 1-3,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:30-10:30",13 旅游管理\r\n\
TOUR130075.01,商务旅行管理,2.0,王永刚,副教授,80,HGX209,四 6-7,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00","13 旅游管理\r\n\
14 旅游管理\r\n\
12 旅游管理"\r\n\
ICES110001.03,留学生高级汉语I,4.0,姚萱,副教授,30,HGD411,二 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",外国交流学生\r\n\
ICES110001.03,留学生高级汉语I,4.0,姚萱,副教授,30,HGD411,四 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",外国交流学生\r\n\
ICES110010.01,初级汉语,4.0,毛金燕,讲师,30,HGD412,二 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",外国交流学生\r\n\
ICES110010.01,初级汉语,4.0,毛金燕,讲师,30,HGD412,四 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",外国交流学生\r\n\
ICES110010.02,初级汉语,4.0,姚燕瑾,副教授,30,H5107,一 9-10 ,只对蒙特雷学生开放,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",复旦蒙特雷项目\r\n\
ICES110010.02,初级汉语,4.0,姚燕瑾,副教授,30,H5107,四 6-7 ,只对蒙特雷学生开放,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",复旦蒙特雷项目\r\n\
ICES110010.03,初级汉语,4.0,李晓映,助理研究员,30,H6210,一 9-10 ,只对蒙特雷学生开放,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",复旦蒙特雷项目\r\n\
ICES110010.03,初级汉语,4.0,李晓映,助理研究员,30,H6210,四 6-7 ,只对蒙特雷学生开放,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",复旦蒙特雷项目\r\n\
ICES110011.01,中级汉语,4.0,耿直,讲师,30,HGD413,二 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",外国交流学生\r\n\
ICES110011.01,中级汉语,4.0,耿直,讲师,30,HGD413,四 11-12 ,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:00",外国交流学生\r\n\
ICES110011.02,中级汉语,4.0,姚燕瑾,副教授,30,H5107,三 9-10 ,只对蒙特雷学生开放,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：16:20-18:00",复旦蒙特雷项目\r\n\
ICES110011.02,中级汉语,4.0,姚燕瑾,副教授,30,H5107,四 9-10 ,只对蒙特雷学生开放,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：16:20-18:00",复旦蒙特雷项目\r\n\
ICES110012.01,中国概况（上）,2.0,许静,讲师,30,HGD405,四 8-9 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：15:25-16:55",15 临床医学(六年制)\r\n\
ICES110012.02,中国概况（上）,2.0,赵雪倩,高级讲师,40,HGD414,一 11-12 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：18:30-20:00",15 留学生\r\n\
ICES110012.03,中国概况（上）,2.0,许金生,副教授,40,HGD414,二 11-12 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：18:30-20:00",15 留学生\r\n\
ICES110012.04,中国概况（上）,2.0,赵雪倩,高级讲师,40,HGD414,三 11-12 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：18:30-20:00",15 留学生\r\n\
ICES110012.05,中国概况（上）,2.0,许金生,副教授,40,HGD414,四 11-12 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：18:30-20:00",15 留学生\r\n\
ICES110014.01,汉语I,4.0,徐婷婷,讲师,30,HGD405,一 8-9 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:30-15:00",15 临床医学(六年制)\r\n\
ICES110014.01,汉语I,4.0,徐婷婷,讲师,30,HGD405,四 6-7 ,,"考试日期：2016-01-07\r\n\
\r\n\
考试时间：13:30-15:00",15 临床医学(六年制)\r\n\
ICES110018.01,留学生英语Ⅰ,2.0,沈国华,翻译,40,HGD508,二 6-7 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES110018.01,留学生英语Ⅰ,2.0,沈国华,翻译,40,HGD508,四 8-9 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES110020.01,留学生英语Ⅲ,2.0,沈国华,翻译,40,HGD508,二 8-9 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:00",国际文化交流学院\r\n\
ICES110020.01,留学生英语Ⅲ,2.0,沈国华,翻译,40,HGD508,四 6-7 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：08:30-10:00",国际文化交流学院\r\n\
ICES110022.01,中文计算机基础,2.0,张向东,讲师,40,HGD501,五 6-8 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES110023.01,上海话,2.0,盛青,讲师,30,HGD411,一 11-12 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:00",留学生\r\n\
ICES120001.01,中国哲学,2.0,杨蓉蓉,副教授,30,HGD509,四 8-9 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:20-16:50",留学生\r\n\
ICES120002.01,中国绘画,2.0,洪伟民,,30,HGD510,三 8-9 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：15:20-16:50",留学生\r\n\
ICES120004.01,文物鉴赏,2.0,沈振辉,副教授,30,HGD510,二 8-9 ,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：15:20-16:50",留学生\r\n\
ICES120005.01,中国印,2.0,王景丹,副教授,30,HGD507,一 6-7 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:00",留学生\r\n\
ICES120006.01,中国神话传说,2.0,徐来,高级讲师,30,HGD509,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:00",留学生\r\n\
ICES120011.01,中国传统建筑文化,2.0,吴金利,讲师,30,HGD509,三 8-9 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：15:20-16:50",留学生\r\n\
ICES120013.01,中国历史名人,2.0,沈振辉,副教授,30,HGD508,一 8-9 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:00",留学生\r\n\
ICES120015.01,汉语与中国文化,2.0,王小曼,高级讲师,30,HGD506,一 8-9 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:20-16:50",留学生\r\n\
ICES130019.01,高级汉语阅读（上）,4.0,沈振辉,副教授,30,HGD510,二 6-7 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130019.01,高级汉语阅读（上）,4.0,沈振辉,副教授,30,HGD510,五 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130021.01,高级汉语阅读（下）,4.0,要英,副教授,30,HGD509,一 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130021.01,高级汉语阅读（下）,4.0,要英,副教授,30,HGD509,三 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130022.01,高级汉语听说（上）,4.0,郑文晖,高级讲师,30,HGD510,一 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
ICES130022.01,高级汉语听说（上）,4.0,郑文晖,高级讲师,30,HGD504,五 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
ICES130024.01,高级汉语听说（下）,4.0,郑文晖,高级讲师,30,HGD509,一 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130024.01,高级汉语听说（下）,4.0,郑文晖,高级讲师,30,HGD509,五 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130025.01,高级汉语写作（上）,2.0,要英,副教授,30,HGD509,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",国际文化交流学院\r\n\
ICES130027.01,现代汉语通论,2.0,陶炼,副教授,30,HGD510,三 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130028.01,古代汉语基础（上）,2.0,施国锋,讲师,30,HGD510,二 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130031.01,当代中国,2.0,许金生,副教授,30,HGD510,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130032.01,中国现当代名作选,2.0,郑文晖,高级讲师,30,HGD509,一 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130033.01,中国近现代历史,2.0,许金生,副教授,30,HGD510,二 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130035.01,中国现当代文学（上）,2.0,杨蓉蓉,副教授,30,HGD510,三 1-2 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130037.01,中国古代文学(上）,2.0,施国锋,讲师,30,HGD509,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
ICES130039.01,中国古代历史,2.0,许金生,副教授,30,HGD509,三 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130042.01,新词语,2.0,张志云,讲师,30,HGD507,四 6-7 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130043.01,《论语》导读,2.0,施国锋,讲师,30,HGD507,五 8-9 ,,"考试日期：2015-12-25\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
ICES130047.01,成语与中国文化,2.0,王景丹,副教授,30,HGD507,一 8-9 ,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
ICES130049.01,经济文献阅读（上）,4.0,要英,副教授,30,HGD504,一 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130049.01,经济文献阅读（上）,4.0,要英,副教授,30,HGD504,四 1-2 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130051.01,经济文献阅读（下）,4.0,要英,副教授,30,HGD504,一 6-7 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130051.01,经济文献阅读（下）,4.0,要英,副教授,30,HGD505,三 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130052.01,经贸口语（上）,4.0,杨蓉蓉,副教授,30,HGD504,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130052.01,经贸口语（上）,4.0,杨蓉蓉,副教授,30,HGD504,五 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130054.01,经贸口语（下）,4.0,路广,副教授,30,HGD510,一 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130054.01,经贸口语（下）,4.0,路广,副教授,30,HGD510,四 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130055.01,经济应用文写作（上）,2.0,刘永生,讲师,30,HGD504,四 6-7 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130057.01,经济应用文写作（下）,2.0,郑文晖,高级讲师,30,HGD504,三 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130058.01,孙子兵法与商贸战略,2.0,施国锋,讲师,30,HGD504,四 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130059.01,涉外经济法规,2.0,刘永生,讲师,30,HGD504,二 3-4 ,,"考试日期：2016-01-06\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130061.01,中国区域经济（上）,2.0,杨蓉蓉,副教授,30,HGD504,三 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:00-09:30",国际文化交流学院\r\n\
ICES130065.01,国际贸易理论与实务（上）,2.0,汪达明,,30,HGD504,五 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：10:00-11:30",国际文化交流学院\r\n\
ICES130069.01,商务案例分析,2.0,汪达明,,30,HGD510,四 8-9 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
ICES130071.01,跨国公司与中国市场,2.0,刘永生,讲师,30,HGD507,四 8-9 ,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：15:20-16:50",国际文化交流学院\r\n\
ICES130083.01,中国人文地理知识文选,2.0,王小曼,高级讲师,40,HGD508,二 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130084.01,历史知识文选,2.0,许金生,副教授,40,HGD508,三 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130085.01,中级汉语视听说（上）,2.0,王小曼,高级讲师,40,HGD508,一 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：14:45-15:45",国际文化交流学院\r\n\
ICES130091.01,汉语基础语法,2.0,张志云,讲师,30,HGD510,三 6-7 ,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130092.01,初级商务口语（上）,6.0,吴金利,讲师,30,HGD507,二 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-09:30",国际文化交流学院\r\n\
ICES130092.01,初级商务口语（上）,6.0,吴金利,讲师,30,HGD507,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-09:30",国际文化交流学院\r\n\
ICES130092.01,初级商务口语（上）,6.0,吴金利,讲师,30,HGD507,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-09:30",国际文化交流学院\r\n\
ICES130094.01,初级商务听力（上）,2.0,路广,副教授,30,HGD506,一 6-7 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：08:00-09:00",国际文化交流学院\r\n\
ICES130096.01,中级商务听力,2.0,刘永生,讲师,30,HGD507,三 6-7 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：09:15-10:15",国际文化交流学院\r\n\
ICES130097.01,经济报刊阅读（上）,2.0,刘永生,讲师,30,HGD507,四 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：13:30-15:00",国际文化交流学院\r\n\
ICES130099.01,中级商务口语（上）,3.0,陶炼,副教授,30,HGD508,三 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:45-10:45",国际文化交流学院\r\n\
ICES130099.01,中级商务口语（上）,3.0,陶炼,副教授,30,HGD506,五 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：09:45-10:45",国际文化交流学院\r\n\
ICES130101.01,中级商务写作（上）,2.0,路广,副教授,30,HGD508,一 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:00",国际文化交流学院\r\n\
ICES130113.01,汉语精读I,6.0,袁斌,讲师,40,HGD508,一 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES130113.01,汉语精读I,6.0,袁斌,讲师,40,HGD507,二 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES130113.01,汉语精读I,6.0,袁斌,讲师,40,HGD508,四 1-2 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES130114.01,汉语泛读I,2.0,路广,副教授,40,HGD508,四 3-4 ,,"考试日期：2016-01-05\r\n\
\r\n\
考试时间：10:30-12:00",国际文化交流学院\r\n\
ICES130115.01,汉语写作I,2.0,吴金利,讲师,30,HGD506,五 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES130115.02,汉语写作I,2.0,吴金利,讲师,30,HGD507,三 3-4 ,,"考试日期：2015-12-29\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES130116.01,汉语口语I,6.0,王小曼,高级讲师,30,HGD506,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-14:30",国际文化交流学院\r\n\
ICES130116.01,汉语口语I,6.0,王小曼,高级讲师,30,HGD504,二 1-2 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-14:30",国际文化交流学院\r\n\
ICES130116.01,汉语口语I,6.0,王小曼,高级讲师,30,HGD506,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：13:30-14:30",国际文化交流学院\r\n\
ICES130117.01,汉语听力I,2.0,徐来,高级讲师,30,HGD506,三 1-2 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:00",国际文化交流学院\r\n\
ICES130123.01,汉语精读III,3.0,陶炼,副教授,40,HGD507,四 1-2 ,,,国际文化交流学院\r\n\
ICES130123.01,汉语精读III,3.0,陶炼,副教授,40,HGD507,五 3-4 ,,,国际文化交流学院\r\n\
ICES130124.01,汉语口语III,3.0,顾颖,讲师,30,HGD507,一 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：11:00-12:00",国际文化交流学院\r\n\
ICES130124.01,汉语口语III,3.0,顾颖,讲师,30,HGD506,三 6-7 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：11:00-12:00",国际文化交流学院\r\n\
ICES130125.01,汉语听力III,2.0,顾颖,讲师,30,HGD507,五 6-7 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：10:15-11:45",国际文化交流学院\r\n\
ICES130126.01,汉语泛读III,2.0,张志云,讲师,40,HGD508,二 1-2 ,,,国际文化交流学院\r\n\
ICES130127.01,汉语写作III,2.0,袁斌,讲师,40,HGD506,四 3-4 ,,"考试日期：2015-12-28\r\n\
\r\n\
考试时间：08:30-10:00",国际文化交流学院\r\n\
MUSE120002.01,中国古代工艺美术,2.0,赵琳,讲师,100,H4403,一 8-9 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：15:30-17:30",\r\n\
MUSE120004.01,中国文字源流,2.0,朱顺龙,教授,80,H5114,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",\r\n\
MUSE130003.01,博物馆学概论,2.0,郑奕,副教授,75,H5104,四 8-9 ,"不开放给外系\r\n\
第三阶段仍不开放限制","考试日期：论文\r\n\
\r\n\
考试时间：-",文物与博物馆学系\r\n\
MUSE130016.01,世界博物馆概论,2.0,姚一青,讲师,40,H2111,一 6-7 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",文物与博物馆学系\r\n\
MUSE130018.01,田野考古学,2.0,潘碧华,讲师,40,H2111,四 3-4 ,"不开放给外系\r\n\
第三阶段仍不开放限制","考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",文物与博物馆学系\r\n\
MUSE130027.01,中国陶瓷史,2.0,刘朝晖,教授,40,H6206,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",文物与博物馆学系\r\n\
MUSE130028.01,中国古代建筑史,2.0,石鼎,讲师,40,H3305,四 3-4 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：08:30-10:30",文物与博物馆学系\r\n\
MUSE130043.01,文化遗产导论,2.0,杜晓帆,研究员,30,H院系自主,三 11-12 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：18:30-20:30",文物与博物馆学系\r\n\
MUSE130045.01,展览形式设计,2.0,陈红京,教授,35,H2218,四 6-7 ,"不开放给外系\r\n\
第三阶段仍不开放限制","考试日期：论文\r\n\
\r\n\
考试时间：-",文物与博物馆学系\r\n\
MUSE130047.01,文物分析技术,2.0,陈刚,教授,35,H6209,三 3-4 ,,"考试日期：2015-12-30\r\n\
\r\n\
考试时间：08:30-10:30",文物与博物馆学系\r\n\
MUSE130049.01,中国美术考古,2.0,李星明,研究员,40,H2112A,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",文物与博物馆学系\r\n\
MUSE130050.01,科技考古导论,2.0,王荣,副教授,35,H2209,一 3-4 ,,"考试日期：2016-01-04\r\n\
\r\n\
考试时间：08:30-10:30",文物与博物馆学系\r\n\
MUSE130056.01,博物馆教育,2.0,郑奕,副教授,35,H2218,二 3-4 ,,"考试日期：论文\r\n\
\r\n\
考试时间：-",文物与博物馆学系\r\n\
MUSE130067.01,环境考古学,2.0,潘艳,讲师,25,HGX405,四 6-7 ,,"考试日期：2015-12-31\r\n\
\r\n\
考试时间：13:00-15:00",文物与博物馆学系'

COURSE_DATA['文科专业课'] = new CSV(temp_data, {
    header: true
}).parse();

temp_data = '模块名称,选课序号,课程名称,性质,学分,教师,职称,人数,教室,时间,备注,考试时间,开课系,\r\n\
文史经典与文化传承,CHIN119001.01,古典诗词导读,1,2.0,唐雯,副研究员,100,H6301,一 3-4,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：09:55-11:35",中国语言文学系,\r\n\
,CHIN119005.01,中国现代文学名著选讲,1,2.0,段怀清,副教授,120,H3409,二 3-4,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：09:55-11:35",中国语言文学系 ,\r\n\
,CHIN119008.01,中国当代小说选读,1,2.0,王东明,副教授,120,HGX104,三 11-12,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",中国语言文学系,\r\n\
,CHIN119008.02,中国当代小说选读,1,2.0,金理,副教授,120,H2220,三 11-12,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",中国语言文学系 ,\r\n\
,CHIN119011.01,鲁迅与中国现代文化,1,2.0,倪伟,副教授,100,H3308,三 3-4,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",中国语言文学系,\r\n\
,CHIN119012.01,《史记》导读,1,2.0,李祥年,副教授,100,HGX308,四 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",中国语言文学系 ,\r\n\
,CHIN119013.01,宋词导读,1,2.0,聂安福,副教授,100,H6501,一 3-4,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：09:55-11:35",中国语言文学系,\r\n\
,CHIN119016.01,《红楼梦》与人生,1,2.0,罗书华,教授,60,HGX503,四 3-4,,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：09:55-11:35",中国语言文学系 ,\r\n\
,CHIN119019.01,中国现代散文导读,1,2.0,周双全,讲师,100,HGX408,四 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",中国语言文学系,\r\n\
,FORE119001.01,英语文学赏读,1,2.0,卢丽安,教授,100,H6101,二 1-2,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：8:00-9:45",外国语言文学学院 ,\r\n\
,PHIL119008.01,《荀子》导读,1,2.0,林宏星,教授,60,HGX203,三 11-12,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",哲学学院 ,\r\n\
哲学智慧与批判性思维,CHIN119020.01,《艺术即经验》导读,1,2.0,张宝贵,教授,60,HGX503,一 6-7,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：13:30-15:10",中国语言文学系 ,\r\n\
,PHIL119011.01,西学经典·论美国的民主,1,2.0,任军锋,教授,150,H6112,一 3-4,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：09:55-11:35",国际关系与公共事务学院,\r\n\
,PHIL119023.01,佛学经典·维摩经,1,2.0,程群,副教授,100,HGX207,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",哲学学院 ,\r\n\
,PHIL119036.01,《第一哲学沉思集》导读,1,2.0,莫伟民,教授,100,HGX408,四 11-12,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",哲学学院,\r\n\
,PHIL119038.01,《新教伦理与资本主义精神》导读,1,2.0,郁_隽,副教授,90,HGX407,三 3-4,慕课+翻转课堂,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-11:35",哲学学院 ,\r\n\
,PHIL119043.01,艺术哲学与审美问题*,1,3.0,"陈佳\r\n\
袁新","讲师\r\n\
副教授",60,H2205,二 11-12,周二晚上隔周小班讨论       ,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",哲学学院,\r\n\
,,,,,,,60,H2207,二 11-12(1-15周),,,,\r\n\
,,,,,,,60,HGX205,四 6-7,,,,\r\n\
,PHIL119044.01,科学哲学与认知问题*,1,2.0,黄翔,教授,100,H4101,四 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",哲学学院 ,\r\n\
文明对话与世界视野,HIST119003.01,文艺复兴史,1,2.0,赵立行,教授,120,H3106,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",法学院,\r\n\
,HIST119005.01,古希腊文明研究,1,2.0,黄洋,教授,100,HGX207,四 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学系 ,\r\n\
,HIST119009.01,《荷马史诗》导读,1,2.0,张巍,教授,85,HGX106,一 6-7,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：13:30-15:10",历史学系,\r\n\
,HIST119016.01,中国地图史,1,2.0,韩昭庆,研究员,60,HGX209,四 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学系 ,\r\n\
,HIST119017.01,基督教文明史,1,2.0,夏洞奇,副教授,60,HGX205,二 11-12,,"考试日期：2015-12-22\r\n\
\r\n\
考试时间：18:30-20:10",历史学系,\r\n\
,HIST119019.01,欧洲文明的现代历程,1,2.0,李宏图,教授,60,HGX405,三 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学系 ,\r\n\
,HIST119025.01,日本文明的历史变迁,1,2.0,冯玮,教授,150,H6212,二 3-4,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学系,\r\n\
,HIST119029.01,中国和欧洲历史视野下的1968年*,1,2.0,"金光耀\r\n\
Fred E. Schrader","教授\r\n\
教授",60,HGX403,二 11-12,,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学系 ,\r\n\
,PHIL119001.01,《圣经》与西方宗教传统,1,2.0,王新生,教授,120,H3108,二 3-4,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：09:55-11:35",哲学学院,\r\n\
,PHIL119020.01,《古兰经》与伊斯兰文明,1,2.0,王新生,教授,120,HGX103,二 11-12,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:10",哲学学院,\r\n\
社会研究与当代中国,ECON119001.01,用经济学智慧解读中国,1,2.0,石磊,教授,120,H6212,五 3-4,上海市教学名师,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：9:55-11:55",经济学院,\r\n\
,ECON119002.01,博弈论与中国智慧,1,2.0,钱勇,讲师,120,H3306,二 11-12,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",经济学院 ,\r\n\
,LAWS119002.01,人权与法,1,2.0,侯健,教授,90,H6506,四 3-4,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：09:55-11:35",法学院,\r\n\
,LAWS119003.01,宪政文明史,1,2.0,王蔚,副教授,90,HGX307,四 11-12,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",法学院,\r\n\
,LAWS119004.01,法治理念与实践,1,2.0,张光杰,副教授,60,HGX305,三 11-12,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",法学院,\r\n\
,LAWS119007.01,法律与科技文明,1,2.0,马忠法,教授,60,HGX210,四 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",法学院 ,\r\n\
,LAWS119008.01,全球化时代的法律冲突与对话,1,2.0,梁咏,副教授,60,HGX410,四 6-7,校级精品课程团队,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",法学院,\r\n\
,LAWS119010.01,法律与社会*,1,2.0,梁咏,副教授,60,HGX410,四 8-9,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",法学院,\r\n\
,POLI119001.01,比较西方政治制度,1,2.0,陈云,教授,100,H6101,四 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",国际关系与公共事务学院 ,\r\n\
科学探索与技术创新,PHIL119009.01,科学、技术及其思想发展,1,2.0,袁闯,副教授,80,H2115,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",哲学学院,\r\n\
,CHEM119003.01,诺贝尔与自然科学,1,2.0,"涂涛\r\n\
郭浩","教授\r\n\
副研究员",120,H4401,四 11-12,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",化学系 ,\r\n\
,CHEM119005.01,纳米科技与生活,1,2.0,陈萌,副教授,60,H3305,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",化学系,\r\n\
,CHEM119006.01,生命中的化学元素,1,2.0,熊焕明,教授,60,H3204,四 3-4,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：09:55-11:35",化学系 ,\r\n\
,CHEM119006.02,生命中的化学元素,1,2.0,方彩云,副教授,60,H4105,二 3-4,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：09:55-11:35",化学系,\r\n\
,CHEM119006.03,生命中的化学元素,1,2.0,高明霞,副教授,60,H4203,四 8-9,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",化学系 ,\r\n\
,CHEM119009.01,化学与中国文明,1,2.0,孙兴文,副教授,60,H4104,四 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",化学系,\r\n\
,CHEM119010.01,元素发现史,1,2.0,"郭娟\r\n\
王华冬","讲师\r\n\
研究员",60,H4103,一 6-7,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：13:30-15:10",化学系 ,\r\n\
,COMP119001.01,科学计算之美与鉴赏,1,2.0,沈一帆,教授,40,HGX209,五 8-9,,"考试日期：论文\r\n\
\r\n\
考试时间：-",计算机科学技术学院 ,\r\n\
,COMP119004.01,计算思维*,1,2.0,"汪卫\r\n\
黄萱菁","教授\r\n\
教授",50,H3104,五 3-4,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：09:55-11:35",计算机科学技术学院,\r\n\
,INFO119001.01,微电子技术,1,2.0,李宁,高级工程师,70,HGX209,四 8-9,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",信息科学与工程学院,\r\n\
,INFO119002.01,诺贝尔奖与光学,1,2.0,吴翔,研究员,70,HGX105,三 8-9,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",信息科学与工程学院 ,\r\n\
科学探索与技术创新,INFO119003.01,光学与现代生活,1,2.0,张荣君,研究员,70,HGX106,一 11-12,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",信息科学与工程学院,\r\n\
,INFO119004.01,感知社会的信号与图像,1,2.0,"吴晓峰\r\n\
汪源源","副教授\r\n\
教授",80,HGX209,一 11-12,,,信息科学与工程学院 ,\r\n\
,MACR119001.01,高分子世界,1,2.0,"邱枫\r\n\
唐萍","教授\r\n\
教授",60,H4406,三 11-12,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",高分子科学系 ,\r\n\
,MACR119002.01,大分子与生命,1,2.0,陈新,教授,90,H4304,一 6-7,,"考试日期：论文\r\n\
\r\n\
考试时间：-",高分子科学系,\r\n\
,MATE119001.01,材料科学与社会,1,2.0,张群,教授,80,H3108,一 6-7,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：13:30-15:10",材料科学系,\r\n\
,MATE119001.02,材料科学与社会,1,2.0,"吕银祥\r\n\
蒋益明","教授\r\n\
教授",100,H4101,一 6-7,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：13:30-15:10",材料科学系 ,\r\n\
,MATH119002.01,数学漫谈,1,2.0,"楼红卫\r\n\
应坚刚\r\n\
张毅\r\n\
杨翎","教授\r\n\
教授\r\n\
教授\r\n\
副教授",100,HGX207,二 8-9,,"考试日期：论文\r\n\
\r\n\
考试时间：-",数学科学学院,\r\n\
,MATH119003.01,数据的背后,1,2.0,陆立强,副教授,100,H3409,三 11-12,,"考试日期：2015-12-23\r\n\
\r\n\
考试时间：18:30-20:10",数学科学学院,\r\n\
,MATH119004.01,数学的魅力,1,2.0,朱松,副教授,50,HGX403,一 11-12,,"考试日期：其他\r\n\
\r\n\
考试时间：-",数学科学学院 ,\r\n\
,MECH119001.01,力学世界,1,2.0,崔升,副教授,100,HGX207,一 11-12,,"考试日期：论文\r\n\
\r\n\
考试时间：",力学与工程科学系,\r\n\
,MECH119002.01,航空与航天,1,2.0,艾剑良,教授,130,HGX103,五 6-7,,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：13:30-15:10",力学与工程科学系 ,\r\n\
,MECH119006.01,力学思维与现代工程,1,2.0,王盛章,副教授,130,HGX104,五 11-12,,"考试日期：2015-12-18\r\n\
考试时间：18:30-20:10",力学与工程科学系,\r\n\
,MED119005.01,信息素养与科学发现,1,2.0,王宇芳,副研究馆员,50,H计算中心3楼2号机房,一 6-7,,"考试日期：\r\n\
\r\n\
考试时间：-",基础医学院,\r\n\
,PHYS119001.01,物理与文化,1,2.0,孔青,副教授,80,H2201,四 6-7,国家级精品课程团队,"考试日期：2015-12-24\r\n\
\r\n\
考试时间：13:30-15:30",物理学系,\r\n\
,PHYS119004.01,天体物理与宇宙论的演化,1,2.0,徐建军,副教授,120,H4101,三 11-12,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:30",物理学系 ,\r\n\
,SOFT119001.01,移动互联网与科技进步,1,2.0,李景涛,讲师,60,H3404,四 11-12,,"考试日期：论文\r\n\
\r\n\
考试时间：-",软件学院 ,\r\n\
,TCPH119001.01,人类与核科技发展,1,2.0,袁竹书,研究员,110,H3106,五 6-7,,"考试日期：论文\r\n\
\r\n\
考试时间：-",核科学与技术系,\r\n\
生态环境与生命关怀,BIOL119002.01,营养与健康,1,2.0,"江松敏\r\n\
曹立环","副教授\r\n\
副教授",60,H3404,一 11-12,,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:10",生命科学学院 ,\r\n\
,BIOL119002.02,营养与健康,1,2.0,"江松敏\r\n\
曹立环","副教授\r\n\
副教授",60,H3305,二 11-12,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:10",生命科学学院,\r\n\
,BIOL119002.03,营养与健康,1,2.0,孙建琴,教授,100,H4104,三 11-12,,"考试日期：\r\n\
\r\n\
考试时间：-",临床医学院 ,\r\n\
生态环境与生命关怀,BIOL119003.01,人类医学遗传学,1,2.0,"窦同海\r\n\
顾少华","助理研究员\r\n\
副教授",60,H3101,四 6-7,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",生命科学学院 ,\r\n\
,BIOL119003.02,人类医学遗传学,1,2.0,"窦同海\r\n\
顾少华","助理研究员\r\n\
副教授",60,H3404,二 11-12,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:10",生命科学学院,\r\n\
,BIOL119004.01,人类进化,1,2.0,"谭婧泽\r\n\
金力\r\n\
李士林\r\n\
李辉","副教授\r\n\
教授\r\n\
副教授\r\n\
教授",60,H3304,四 3-4,校级精品课程团队,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院 ,\r\n\
,BIOL119004.02,人类进化,1,2.0,"谭婧泽\r\n\
金力\r\n\
李士林\r\n\
李辉","副教授\r\n\
教授\r\n\
副教授\r\n\
教授",60,H3201,四 6-7,校级精品课程团队,,生命科学学院,\r\n\
,BIOL119008.01,微生物与人类健康,1,2.0,徐颖,副教授,50,H3104,一 8-9,,"考试日期：论文\r\n\
\r\n\
考试时间：-",生命科学学院 ,\r\n\
,BIOL119008.02,微生物与人类健康,1,2.0,张雪莲,副教授,50,H3304,三 6-7,,,生命科学学院,\r\n\
,BIOL119008.03,微生物与人类健康,1,2.0,李瑞,讲师,50,H3304,四 11-12,,,生命科学学院 ,\r\n\
,BIOL119009.01,身边的基因科学,1,2.0,"皮妍\r\n\
王磊\r\n\
卢大儒","讲师\r\n\
副研究员\r\n\
教授",60,H3405,二 11-12,上海市教学名师,,生命科学学院,\r\n\
,BIOL119009.02,身边的基因科学,1,2.0,"胡小华\r\n\
吴小萍\r\n\
卢大儒","副教授\r\n\
助理研究员\r\n\
教授",60,H3304,三 11-12,上海市教学名师,,生命科学学院 ,\r\n\
,ENVI119001.01,可持续发展,1,2.0,"雷一东\r\n\
董骁\r\n\
张真","副教授\r\n\
讲师\r\n\
副教授",100,HGX207,四 10-11,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：18:30-20:30",环境科学与工程系,\r\n\
,ENVI119002.01,环境与人类,1,2.0,"王祥荣\r\n\
杨新\r\n\
郑正\r\n\
戴星翼\r\n\
董文博","教授\r\n\
教授\r\n\
教授\r\n\
教授\r\n\
教授",200,H3309,一 11-12,复旦大学教学名师,"考试日期：2015-12-14\r\n\
\r\n\
考试时间：18:30-20:30",环境科学与工程系 ,\r\n\
,ENVI119004.01,材料与环境,1,2.0,董维阳,高级工程师,100,HGX307,三 11-12,,"考试日期：论文\r\n\
\r\n\
考试时间：-",环境科学与工程系,\r\n\
,ENVI119005.01,全球化时代的环境问题,1,2.0,"黄文芳\r\n\
马涛","副教授\r\n\
副教授",100,HGX207,四 6-7,,"考试日期：论文\r\n\
\r\n\
考试时间：-",环境科学与工程系 ,\r\n\
,ENVI119006.01,环境灾害与启示,1,2.0,"叶兴南\r\n\
陈建民","副教授\r\n\
教授",100,HGX207,一 6-7,复旦大学教学名师,"考试日期：论文\r\n\
\r\n\
考试时间：-",环境科学与工程系,\r\n\
,LAWS119009.01,生态文明的伦理与法理,1,2.0,李传轩,副教授,90,H4103,二 11-12,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：18:30-20:30",法学院 ,\r\n\
生态环境与生命关怀,MED119008.01,中西医学大师与人文素养,1,2.0,田占庄,副教授,40,H3209,三 3-4,,"考试日期：\r\n\
\r\n\
考试时间：-",基础医学院 ,\r\n\
,MED119010.01,人类与社会多元文化,1,2.0,李为民,教授,100,H4201,三 6-7,限2015级学生选课,"考试日期：\r\n\
\r\n\
考试时间：-",基础医学院,\r\n\
,MED119011.01,生物力学与人类健康,1,2.0,李为民,教授,100,H4204,三 11-12,限2015级学生选课,"考试日期：\r\n\
\r\n\
考试时间：-",基础医学院 ,\r\n\
,PHAR119001.01,医药伦理,1,2.0,"叶桦\r\n\
贡庆\r\n\
洪兰","副教授\r\n\
讲师\r\n\
讲师",80,H2115,四 6-7,,"考试日期：\r\n\
\r\n\
考试时间：-",药学院 ,\r\n\
,PHAR119002.01,药膳与中国饮食文化,1,2.0,"康云\r\n\
谢晖","讲师\r\n\
讲师",80,H3101,五 6-7,,"考试日期：\r\n\
\r\n\
考试时间：-",药学院,\r\n\
,PHAR119003.01,药物·生命·社会,1,2.0,程能能,教授,80,H3109,四 6-7,,"考试日期：\r\n\
\r\n\
考试时间：-",药学院 ,\r\n\
,PHAR119004.01,诺贝尔奖与药物,1,2.0,章蕴毅,副教授,80,H3306,一 8-9,,"考试日期：\r\n\
\r\n\
考试时间：-",药学院,\r\n\
,PHAR119005.01,走进中药：传承与发展,1,2.0,"侯爱君\r\n\
黄建明\r\n\
康云\r\n\
雷春","教授\r\n\
副教授\r\n\
讲师\r\n\
副教授",70,H4306,三 11-12,,"考试日期：\r\n\
\r\n\
考试时间：-",药学院 ,\r\n\
,PHPM119001.01,环境与人群健康,1,2.0,戴俊明,副教授,60,H4205,四 11-12,,"考试日期：\r\n\
\r\n\
考试时间：-",公共卫生学院 ,\r\n\
,PHPM119003.01,社会发展与健康,1,2.0,余金明,教授,30,H2218,一 11-12,,"考试日期：\r\n\
\r\n\
考试时间：-",公共卫生学院,\r\n\
,PHPM119004.01,改变世界的流行病,1,2.0,赵根明,教授,80,H4203,一 11-12,,"考试日期：\r\n\
\r\n\
考试时间：-",公共卫生学院 ,\r\n\
,PTSS119002.01,生命科学史,1,2.0,刘学礼,正高级讲师,90,H5301,三 3-5,含讨论课,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：09:55-12:30",马克思主义学院 ,\r\n\
艺术创作与审美体验,FINE119003.01,视觉艺术与设计,1,2.0,周进,高级讲师,50,H6205,一 8-9,校级精品课程团队,"考试日期：论文,2015-12-14\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
,FINE119003.02,视觉艺术与设计,1,2.0,宋颖,讲师,50,H6206,四 11-12,,"考试日期：论文,2015-12-17\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
,FINE119005.01,音乐理论与实践,1,2.0,"陈瑜\r\n\
花白","讲师\r\n\
讲师",24,H艺术教育馆2F钢琴教室,三 6-7,,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：13:30-15:10",艺术教育中心 ,\r\n\
,FINE119007.01,音乐剧赏析与表演,1,2.0,王作欣,教授,15,H艺术教育馆2F排练厅二,四 6-7(5-15周),,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",艺术教育中心,\r\n\
,FINE119007.01,音乐剧赏析与表演,1,2.0,王作欣,教授,15,H2205,四 6-7(1-4周),,"考试日期：其他,2015-12-17\r\n\
\r\n\
考试时间：13:30-15:10",艺术教育中心,\r\n\
,FINE119008.01,中国戏曲·京剧*,1,2.0,章伟国,副教授,90,H6212,四 8-9,,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,\r\n\
,FINE119010.01,陶艺与雕塑*,1,2.0,包春雷,副教授,20,H艺术设计系陶艺工作室,三 8-9,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
,FINE119010.02,陶艺与雕塑*,1,2.0,包春雷,副教授,20,H艺术设计系陶艺工作室,三 11-12,,"考试日期：其他,2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
艺术创作与审美体验,FINE119011.01,戏剧经典与表达·西方戏剧*,1,2.0,刘明厚,教授,50,HGX210,三 11-12(15周),授课教师工作单位：上海戏剧学院           ,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心,\r\n\
,,,,,,,,H东区艺术教育馆,三 11-12(13-14周),,,,\r\n\
,,,,,,,,HGX210,三 11-12(6-12周),,,,\r\n\
,,,,,,,,H东区艺术教育馆,三 11-12(4-5周),,,,\r\n\
,,,,,,,,HGX210,三 11-12(1-3周),,,,\r\n\
,MUSE119001.01,文物赏析与体验,1,2.0,赵琳,讲师,100,H4401,二 3-4,,"考试日期：2015-12-15\r\n\
\r\n\
考试时间：09:55-11:35",文物与博物馆学系 ,\r\n\
,MUSE119003.01,考古与人类,1,2.0,"高蒙河\r\n\
潘碧华","教授\r\n\
讲师",100,H3206,四 6-7,校级精品课程团队,"考试日期：论文\r\n\
\r\n\
考试时间：-",文物与博物馆学系,\r\n\
,PTSS119005.01,英美电影思想解读,1,2.0,邵晓莹,副教授,50,H3406,三 11-13,校级精品课程团队,"考试日期：2015-12-16\r\n\
\r\n\
考试时间：18:30-20:10",艺术教育中心 ,\r\n\
III,HIST119025.02,日本文明的历史变迁,1,2.0,冯玮,教授,100,JB301,二 3-4,视频教学,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学系 ,\r\n\
IV,ECON119001.02,用经济学智慧解读中国,1,2.0,石磊,教授,100,JB301,五 3-4,视频教学,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：9:55-11:55",经济学院 ,\r\n\
V,MATH119002.02,数学漫谈,1,2.0,杭国明,高级讲师,50,JB302,一 11-12,,"考试日期：2015-12-21\r\n\
\r\n\
考试时间：18:30-20:30",数学科学学院 ,\r\n\
VII,FINE119008.02,中国戏曲·京剧,1,2.0,章伟国,副教授,100,JB301,四 8-9,视频教学,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心,\r\n\
III,HIST119025.03,日本文明的历史变迁,1,2.0,冯玮,教授,100,Z2306,二 3-4,视频教学,"考试日期：论文\r\n\
\r\n\
考试时间：-",历史学系,\r\n\
IV,ECON119001.03,用经济学智慧解读中国,1,2.0,石磊,教授,100,Z2306,五 3-4,视频教学,"考试日期：2015-12-18\r\n\
\r\n\
考试时间：9:55-11:55",经济学院,\r\n\
VII,FINE119008.03,中国戏曲·京剧,1,2.0,章伟国,副教授,100,Z2306,四 8-9,视频教学,"考试日期：2015-12-17\r\n\
\r\n\
考试时间：15:25-17:05",艺术教育中心 ,'

COURSE_DATA['模块课程'] = new CSV(temp_data, {
    header: true
}).parse();



//去重操作
for (category in COURSE_DATA) {
    var arr = COURSE_DATA[category];
    var idArr = [];
    var newArr = [];
    arr.forEach(function(course) {
        idArr.push(course['选课序号']);
    });
    for (var i = 0; i < arr.length; i++) {
        var first = idArr.indexOf(arr[i]['选课序号'])
        if (first != i) {
            arr[first]['时间'] += '{time}' + arr[i]['时间'];
        }else{
            arr[i].isFirst = true;
        }
    }
    arr.forEach(function(course) {
        if(course.isFirst){
            newArr.push(course);
        }
    });
    COURSE_DATA[category] = newArr;
}

/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Support: IE9
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: Date.now,

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {
	var input = document.createElement("input"),
		fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Finish early in limited environments
	if ( !input.type ) {
		return support;
	}

	input.type = "checkbox";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Will be defined later
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;
	support.pixelPosition = false;

	// Make sure checked status is properly cloned
	// Support: IE9, IE10
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment.appendChild( input );

	// Support: Safari 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: Firefox, Chrome, Safari
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	support.focusinBubbles = "onfocusin" in window;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			body = document.getElementsByTagName("body")[ 0 ];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		// Check box-sizing and margin behavior.
		body.appendChild( container ).appendChild( div );
		div.innerHTML = "";
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		body.removeChild( container );
	});

	return support;
})( {} );

/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;

Data.accepts = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType ?
		owner.nodeType === 1 || owner.nodeType === 9 : true;
};

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( core_rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};

// These may be used throughout the jQuery core codebase
data_user = new Data();
data_priv = new Data();


jQuery.extend({
	acceptData: Data.accepts,

	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[ 0 ],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return jQuery.access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
		var fn = jQuery.expr.attrHandle[ name ],
			ret = isXML ?
				undefined :
				/* jshint eqeqeq: false */
				// Temporarily disable this handler to check existence
				(jQuery.expr.attrHandle[ name ] = undefined) !=
					getter( elem, name, isXML ) ?

					name.toLowerCase() :
					null;

		// Restore handler
		jQuery.expr.attrHandle[ name ] = fn;

		return ret;
	};
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return core_indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because core_push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because core_push.apply(_, arraylike) throws
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			i = 0,
			l = elems.length,
			fragment = context.createDocumentFragment(),
			nodes = [];

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( Data.accepts( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var l = elems.length,
		i = 0;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}


function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var curCSS, iframe,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ) {
	return window.getComputedStyle( elem, null );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

curCSS = function( elem, name, _computed ) {
	var width, minWidth, maxWidth,
		computed = _computed || getStyles( elem ),

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
		style = elem.style;

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: Safari 5.1
		// A tribute to the "awesome hack by Dean Edwards"
		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret;
};


function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	// Support: Android 2.3
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// Support: Android 2.3
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrSupported = jQuery.ajaxSettings.xhr(),
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	// Support: IE9
	// We need to keep track of outbound xhr and abort them manually
	// because IE is not smart enough to do it all by itself
	xhrId = 0,
	xhrCallbacks = {};

if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
		xhrCallbacks = undefined;
	});
}

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i, id,
					xhr = options.xhr();
				xhr.open( options.type, options.url, options.async, options.username, options.password );
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file protocol always yields status 0, assume 404
									xhr.status || 404,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// #11426: When requesting binary data, IE9 will throw an exception
									// on any attempt to access responseText
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");
				// Create the abort callback
				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		elem = this[ 0 ],
		box = { top: 0, left: 0 },
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top + win.pageYOffset - docElem.clientTop,
		left: box.left + win.pageXOffset - docElem.clientLeft
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.jQuery = window.$ = jQuery;
}

})( window );
(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;jQuery(a).appendTo(this)})}})(jQuery);

/*
 AngularJS v1.4.5
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(N,W,u){'use strict';function G(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.4.5/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Da(b){if(null==b||Ya(b))return!1;var a="length"in Object(b)&&b.length;
return b.nodeType===pa&&a?!0:H(b)||K(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function n(b,a,c){var d,e;if(b)if(B(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(K(b)||Da(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==n)b.forEach(a,c,b);else if(lc(b))for(d in b)a.call(c,b[d],d,b);else if("function"===typeof b.hasOwnProperty)for(d in b)b.hasOwnProperty(d)&&
a.call(c,b[d],d,b);else for(d in b)Na.call(b,d)&&a.call(c,b[d],d,b);return b}function mc(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function nc(b){return function(a,c){b(c,a)}}function Ud(){return++mb}function oc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function Mb(b,a,c){for(var d=b.$$hashKey,e=0,f=a.length;e<f;++e){var g=a[e];if(D(g)||B(g))for(var h=Object.keys(g),l=0,k=h.length;l<k;l++){var m=h[l],q=g[m];c&&D(q)?ca(q)?b[m]=new Date(q.valueOf()):Oa(q)?
b[m]=new RegExp(q):(D(b[m])||(b[m]=K(q)?[]:{}),Mb(b[m],[q],!0)):b[m]=q}}oc(b,d);return b}function Q(b){return Mb(b,xa.call(arguments,1),!1)}function Vd(b){return Mb(b,xa.call(arguments,1),!0)}function Y(b){return parseInt(b,10)}function Nb(b,a){return Q(Object.create(b),a)}function v(){}function Za(b){return b}function qa(b){return function(){return b}}function pc(b){return B(b.toString)&&b.toString!==Object.prototype.toString}function y(b){return"undefined"===typeof b}function x(b){return"undefined"!==
typeof b}function D(b){return null!==b&&"object"===typeof b}function lc(b){return null!==b&&"object"===typeof b&&!qc(b)}function H(b){return"string"===typeof b}function X(b){return"number"===typeof b}function ca(b){return"[object Date]"===sa.call(b)}function B(b){return"function"===typeof b}function Oa(b){return"[object RegExp]"===sa.call(b)}function Ya(b){return b&&b.window===b}function $a(b){return b&&b.$evalAsync&&b.$watch}function ab(b){return"boolean"===typeof b}function rc(b){return!(!b||!(b.nodeName||
b.prop&&b.attr&&b.find))}function Wd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ta(b){return I(b.nodeName||b[0]&&b[0].nodeName)}function bb(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return c}function fa(b,a,c,d){if(Ya(b)||$a(b))throw Ea("cpws");if(sc.test(sa.call(a)))throw Ea("cpta");if(a){if(b===a)throw Ea("cpi");c=c||[];d=d||[];D(b)&&(c.push(b),d.push(a));var e;if(K(b))for(e=a.length=0;e<b.length;e++)a.push(fa(b[e],null,c,d));else{var f=a.$$hashKey;K(a)?
a.length=0:n(a,function(b,c){delete a[c]});if(lc(b))for(e in b)a[e]=fa(b[e],null,c,d);else if(b&&"function"===typeof b.hasOwnProperty)for(e in b)b.hasOwnProperty(e)&&(a[e]=fa(b[e],null,c,d));else for(e in b)Na.call(b,e)&&(a[e]=fa(b[e],null,c,d));oc(a,f)}}else if(a=b,D(b)){if(c&&-1!==(f=c.indexOf(b)))return d[f];if(K(b))return fa(b,[],c,d);if(sc.test(sa.call(b)))a=new b.constructor(b);else if(ca(b))a=new Date(b.getTime());else if(Oa(b))a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=
b.lastIndex;else return e=Object.create(qc(b)),fa(b,e,c,d);d&&(c.push(b),d.push(a))}return a}function ia(b,a){if(K(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(D(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function ka(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(K(b)){if(!K(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ka(b[d],a[d]))return!1;return!0}}else{if(ca(b))return ca(a)?
ka(b.getTime(),a.getTime()):!1;if(Oa(b))return Oa(a)?b.toString()==a.toString():!1;if($a(b)||$a(a)||Ya(b)||Ya(a)||K(a)||ca(a)||Oa(a))return!1;c=ga();for(d in b)if("$"!==d.charAt(0)&&!B(b[d])){if(!ka(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!(d in c||"$"===d.charAt(0)||a[d]===u||B(a[d])))return!1;return!0}return!1}function cb(b,a,c){return b.concat(xa.call(a,c))}function tc(b,a){var c=2<arguments.length?xa.call(arguments,2):[];return!B(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?
a.apply(b,cb(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Xd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=u:Ya(a)?c="$WINDOW":a&&W===a?c="$DOCUMENT":$a(a)&&(c="$SCOPE");return c}function db(b,a){if("undefined"===typeof b)return u;X(a)||(a=a?2:null);return JSON.stringify(b,Xd,a)}function uc(b){return H(b)?JSON.parse(b):b}function vc(b,a){var c=Date.parse("Jan 01, 1970 00:00:00 "+b)/6E4;return isNaN(c)?a:c}function Ob(b,
a,c){c=c?-1:1;var d=vc(a,b.getTimezoneOffset());a=b;b=c*(d-b.getTimezoneOffset());a=new Date(a.getTime());a.setMinutes(a.getMinutes()+b);return a}function ua(b){b=z(b).clone();try{b.empty()}catch(a){}var c=z("<div>").append(b).html();try{return b[0].nodeType===Pa?I(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+I(b)})}catch(d){return I(c)}}function wc(b){try{return decodeURIComponent(b)}catch(a){}}function xc(b){var a={};n((b||"").split("&"),function(b){var d,e,f;b&&(e=
b=b.replace(/\+/g,"%20"),d=b.indexOf("="),-1!==d&&(e=b.substring(0,d),f=b.substring(d+1)),e=wc(e),x(e)&&(f=x(f)?wc(f):!0,Na.call(a,e)?K(a[e])?a[e].push(f):a[e]=[a[e],f]:a[e]=f))});return a}function Pb(b){var a=[];n(b,function(b,d){K(b)?n(b,function(b){a.push(ma(d,!0)+(!0===b?"":"="+ma(b,!0)))}):a.push(ma(d,!0)+(!0===b?"":"="+ma(b,!0)))});return a.length?a.join("&"):""}function nb(b){return ma(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ma(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Yd(b,a){var c,d,e=Qa.length;for(d=0;d<e;++d)if(c=Qa[d]+a,H(c=b.getAttribute(c)))return c;return null}function Zd(b,a){var c,d,e={};n(Qa,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});n(Qa,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Yd(c,"strict-di"),
a(c,d?[d]:[],e))}function yc(b,a,c){D(c)||(c={});c=Q({strictDi:!1},c);var d=function(){b=z(b);if(b.injector()){var d=b[0]===W?"document":ua(b);throw Ea("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=eb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",
d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;N&&e.test(N.name)&&(c.debugInfoEnabled=!0,N.name=N.name.replace(e,""));if(N&&!f.test(N.name))return d();N.name=N.name.replace(f,"");aa.resumeBootstrap=function(b){n(b,function(b){a.push(b)});return d()};B(aa.resumeDeferredBootstrap)&&aa.resumeDeferredBootstrap()}function $d(){N.name="NG_ENABLE_DEBUG_INFO!"+N.name;N.location.reload()}function ae(b){b=aa.element(b).injector();if(!b)throw Ea("test");return b.get("$$testability")}
function zc(b,a){a=a||"_";return b.replace(be,function(b,d){return(d?a:"")+b.toLowerCase()})}function ce(){var b;if(!Ac){var a=ob();la=N.jQuery;x(a)&&(la=null===a?u:N[a]);la&&la.fn.on?(z=la,Q(la.fn,{scope:Ra.scope,isolateScope:Ra.isolateScope,controller:Ra.controller,injector:Ra.injector,inheritedData:Ra.inheritedData}),b=la.cleanData,la.cleanData=function(a){var d;if(Qb)Qb=!1;else for(var e=0,f;null!=(f=a[e]);e++)(d=la._data(f,"events"))&&d.$destroy&&la(f).triggerHandler("$destroy");b(a)}):z=R;aa.element=
z;Ac=!0}}function pb(b,a,c){if(!b)throw Ea("areq",a||"?",c||"required");return b}function Sa(b,a,c){c&&K(b)&&(b=b[b.length-1]);pb(B(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ta(b,a){if("hasOwnProperty"===b)throw Ea("badname",a);}function Bc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&B(b)?tc(e,b):b}function qb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;
if(!a)break;c.push(a)}while(a!==b);return z(c)}function ga(){return Object.create(null)}function de(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=G("$injector"),d=G("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||G;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(b,c,e,f){f||(f=d);return function(){f[e||"push"]([b,c,arguments]);return E}}function b(a,c){return function(b,
e){e&&B(e)&&(e.$$moduleName=f);d.push([a,c,arguments]);return E}}if(!g)throw c("nomod",f);var d=[],e=[],s=[],t=a("$injector","invoke","push",e),E={_invokeQueue:d,_configBlocks:e,_runBlocks:s,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider",
"register"),directive:b("$compileProvider","directive"),config:t,run:function(a){s.push(a);return this}};h&&t(h);return E})}})}function ee(b){Q(b,{bootstrap:yc,copy:fa,extend:Q,merge:Vd,equals:ka,element:z,forEach:n,injector:eb,noop:v,bind:tc,toJson:db,fromJson:uc,identity:Za,isUndefined:y,isDefined:x,isString:H,isFunction:B,isObject:D,isNumber:X,isElement:rc,isArray:K,version:fe,isDate:ca,lowercase:I,uppercase:rb,callbacks:{counter:0},getTestability:ae,$$minErr:G,$$csp:Fa,reloadWithDebugInfo:$d});
Rb=de(N);Rb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:ge});a.provider("$compile",Cc).directive({a:he,input:Dc,textarea:Dc,form:ie,script:je,select:ke,style:le,option:me,ngBind:ne,ngBindHtml:oe,ngBindTemplate:pe,ngClass:qe,ngClassEven:re,ngClassOdd:se,ngCloak:te,ngController:ue,ngForm:ve,ngHide:we,ngIf:xe,ngInclude:ye,ngInit:ze,ngNonBindable:Ae,ngPluralize:Be,ngRepeat:Ce,ngShow:De,ngStyle:Ee,ngSwitch:Fe,ngSwitchWhen:Ge,ngSwitchDefault:He,ngOptions:Ie,ngTransclude:Je,ngModel:Ke,
ngList:Le,ngChange:Me,pattern:Ec,ngPattern:Ec,required:Fc,ngRequired:Fc,minlength:Gc,ngMinlength:Gc,maxlength:Hc,ngMaxlength:Hc,ngValue:Ne,ngModelOptions:Oe}).directive({ngInclude:Pe}).directive(sb).directive(Ic);a.provider({$anchorScroll:Qe,$animate:Re,$animateCss:Se,$$animateQueue:Te,$$AnimateRunner:Ue,$browser:Ve,$cacheFactory:We,$controller:Xe,$document:Ye,$exceptionHandler:Ze,$filter:Jc,$$forceReflow:$e,$interpolate:af,$interval:bf,$http:cf,$httpParamSerializer:df,$httpParamSerializerJQLike:ef,
$httpBackend:ff,$location:gf,$log:hf,$parse:jf,$rootScope:kf,$q:lf,$$q:mf,$sce:nf,$sceDelegate:of,$sniffer:pf,$templateCache:qf,$templateRequest:rf,$$testability:sf,$timeout:tf,$window:uf,$$rAF:vf,$$jqLite:wf,$$HashMap:xf,$$cookieReader:yf})}])}function fb(b){return b.replace(zf,function(a,b,d,e){return e?d.toUpperCase():d}).replace(Af,"Moz$1")}function Kc(b){b=b.nodeType;return b===pa||!b||9===b}function Lc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Sb.test(b)){c=c||e.appendChild(a.createElement("div"));
d=(Bf.exec(b)||["",""])[1].toLowerCase();d=na[d]||na._default;c.innerHTML=d[1]+b.replace(Cf,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=cb(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";n(f,function(a){e.appendChild(a)});return e}function R(b){if(b instanceof R)return b;var a;H(b)&&(b=T(b),a=!0);if(!(this instanceof R)){if(a&&"<"!=b.charAt(0))throw Tb("nosel");return new R(b)}if(a){a=W;var c;b=(c=Df.exec(b))?[a.createElement(c[1])]:
(c=Lc(b,a))?c.childNodes:[]}Mc(this,b)}function Ub(b){return b.cloneNode(!0)}function tb(b,a){a||ub(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)ub(c[d])}function Nc(b,a,c,d){if(x(d))throw Tb("offargs");var e=(d=vb(b))&&d.events,f=d&&d.handle;if(f)if(a)n(a.split(" "),function(a){if(x(c)){var d=e[a];bb(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function ub(b,
a){var c=b.ng339,d=c&&gb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Nc(b)),delete gb[c],b.ng339=u))}function vb(b,a){var c=b.ng339,c=c&&gb[c];a&&!c&&(b.ng339=c=++Ef,c=gb[c]={events:{},data:{},handle:u});return c}function Vb(b,a,c){if(Kc(b)){var d=x(c),e=!d&&a&&!D(a),f=!a;b=(b=vb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];Q(b,a)}}}function wb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+
a+" "):!1}function xb(b,a){a&&b.setAttribute&&n(a.split(" "),function(a){b.setAttribute("class",T((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+T(a)+" "," ")))})}function yb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");n(a.split(" "),function(a){a=T(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",T(c))}}function Mc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==
a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Oc(b,a){return zb(b,"$"+(a||"ngController")+"Controller")}function zb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=K(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=z.data(b,a[d]))!==u)return c;b=b.parentNode||11===b.nodeType&&b.host}}function Pc(b){for(tb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Wb(b,a){a||tb(b);var c=b.parentNode;c&&c.removeChild(b)}function Ff(b,a){a=a||N;if("complete"===a.document.readyState)a.setTimeout(b);
else z(a).on("load",b)}function Qc(b,a){var c=Ab[a.toLowerCase()];return c&&Rc[ta(b)]&&c}function Gf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Sc[a]}function Hf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:0;if(g){if(y(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=
function(){return!0===c.immediatePropagationStopped};1<g&&(f=ia(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function wf(){this.$get=function(){return Q(R,{hasClass:function(b,a){b.attr&&(b=b[0]);return wb(b,a)},addClass:function(b,a){b.attr&&(b=b[0]);return yb(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return xb(b,a)}})}}function Ga(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==
c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Ud)():c+":"+b}function Ua(b,a){if(a){var c=0;this.nextUid=function(){return++c}}n(b,this.put,this)}function If(b){return(b=b.toString().replace(Tc,"").match(Uc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function eb(b,a){function c(a){return function(b,c){if(D(b))n(b,nc(a));else return a(b,c)}}function d(a,b){Ta(a,"service");if(B(b)||K(b))b=s.instantiate(b);if(!b.$get)throw Ha("pget",a);return q[a+"Provider"]=b}function e(a,b){return function(){var c=
E.invoke(b,this);if(y(c))throw Ha("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){pb(y(a)||K(a),"modulesToLoad","not an array");var b=[],c;n(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=s.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{H(a)?(c=Rb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):B(a)?b.push(s.invoke(a)):K(a)?b.push(s.invoke(a)):Sa(a,"module")}catch(e){throw K(a)&&
(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ha("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Ha("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[],k=eb.$$annotate(b,a,g),l,s,m;s=0;for(l=k.length;s<l;s++){m=k[s];if("string"!==
typeof m)throw Ha("itkn",m);h.push(f&&f.hasOwnProperty(m)?f[m]:d(m,g))}K(b)&&(b=b[l]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((K(a)?a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return D(a)||B(a)?a:d},get:d,annotate:eb.$$annotate,has:function(a){return q.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],m=new Ua([],!0),q={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),
value:c(function(a,b){return f(a,qa(b),!1)}),constant:c(function(a,b){Ta(a,"constant");q[a]=b;t[a]=b}),decorator:function(a,b){var c=s.get(a+"Provider"),d=c.$get;c.$get=function(){var a=E.invoke(d,c);return E.invoke(b,null,{$delegate:a})}}}},s=q.$injector=h(q,function(a,b){aa.isString(b)&&k.push(b);throw Ha("unpr",k.join(" <- "));}),t={},E=t.$injector=h(t,function(a,b){var c=s.get(a+"Provider",b);return E.invoke(c.$get,c,u,a)});n(g(b),function(a){a&&E.invoke(a)});return E}function Qe(){var b=!0;this.disableAutoScrolling=
function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ta(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;B(c)?c=c():rc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):X(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(a){a=H(a)?a:c.hash();var b;a?(b=h.getElementById(a))?f(b):
(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||Ff(function(){d.$evalAsync(g)})});return g}]}function hb(b,a){if(!b&&!a)return"";if(!b)return a;if(!a)return b;K(b)&&(b=b.join(" "));K(a)&&(a=a.join(" "));return b+" "+a}function Jf(b){H(b)&&(b=b.split(" "));var a=ga();n(b,function(b){b.length&&(a[b]=!0)});return a}function Ia(b){return D(b)?b:{}}function Kf(b,a,c,d){function e(a){try{a.apply(null,xa.call(arguments,
1))}finally{if(E--,0===E)for(;L.length;)try{L.pop()()}catch(b){c.error(b)}}}function f(){g();h()}function g(){a:{try{w=m.state;break a}catch(a){}w=void 0}w=y(w)?null:w;ka(w,F)&&(w=F);F=w}function h(){if(A!==l.url()||p!==w)A=l.url(),p=w,n(O,function(a){a(l.url(),w)})}var l=this,k=b.location,m=b.history,q=b.setTimeout,s=b.clearTimeout,t={};l.isMock=!1;var E=0,L=[];l.$$completeOutstandingRequest=e;l.$$incOutstandingRequestCount=function(){E++};l.notifyWhenNoOutstandingRequests=function(a){0===E?a():
L.push(a)};var w,p,A=k.href,r=a.find("base"),M=null;g();p=w;l.url=function(a,c,e){y(e)&&(e=null);k!==b.location&&(k=b.location);m!==b.history&&(m=b.history);if(a){var f=p===e;if(A===a&&(!d.history||f))return l;var h=A&&Ja(A)===Ja(a);A=a;p=e;if(!d.history||h&&f){if(!h||M)M=a;c?k.replace(a):h?(c=k,e=a.indexOf("#"),a=-1===e?"":a.substr(e),c.hash=a):k.href=a}else m[c?"replaceState":"pushState"](e,"",a),g(),p=w;return l}return M||k.href.replace(/%27/g,"'")};l.state=function(){return w};var O=[],J=!1,F=
null;l.onUrlChange=function(a){if(!J){if(d.history)z(b).on("popstate",f);z(b).on("hashchange",f);J=!0}O.push(a);return a};l.$$applicationDestroyed=function(){z(b).off("hashchange popstate",f)};l.$$checkUrlChange=h;l.baseHref=function(){var a=r.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};l.defer=function(a,b){var c;E++;c=q(function(){delete t[c];e(a)},b||0);t[c]=!0;return c};l.defer.cancel=function(a){return t[a]?(delete t[a],s(a),e(v),!0):!1}}function Ve(){this.$get=["$window",
"$log","$sniffer","$document",function(b,a,c,d){return new Kf(b,d,a,c)}]}function We(){this.$get=function(){function b(b,d){function e(a){a!=q&&(s?s==a&&(s=a.n):s=a,f(a.n,a.p),f(a,q),q=a,q.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw G("$cacheFactory")("iid",b);var g=0,h=Q({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,m={},q=null,s=null;return a[b]={put:function(a,b){if(!y(b)){if(k<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in l||g++;l[a]=b;g>k&&this.remove(s.key);
return b}},get:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;b==q&&(q=b.p);b==s&&(s=b.n);f(b.n,b.p);delete m[a]}delete l[a];g--},removeAll:function(){l={};g=0;m={};q=s=null},destroy:function(){m=h=l=null;delete a[b]},info:function(){return Q({},h,{size:g})}}}var a={};b.info=function(){var b={};n(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function qf(){this.$get=
["$cacheFactory",function(b){return b("templates")}]}function Cc(b,a){function c(a,b,c){var d=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,e={};n(a,function(a,f){var g=a.match(d);if(!g)throw ea("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f}});return e}function d(a){var b=a.charAt(0);if(!b||b!==I(b))throw ea("baddir",a);if(a!==a.trim())throw ea("baddir",a);}var e={},f=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
g=/(([\w\-]+)(?:\:([^;]+))?;?)/,h=Wd("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,k=/^(on[a-z]+|formaction)$/;this.directive=function s(a,f){Ta(a,"directive");H(a)?(d(a),pb(f,"directiveFactory"),e.hasOwnProperty(a)||(e[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,d){var f=[];n(e[a],function(e,g){try{var h=b.invoke(e);B(h)?h={compile:qa(h)}:!h.compile&&h.link&&(h.compile=qa(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||
h.controller&&h.name;h.restrict=h.restrict||"EA";var l=h,k=h,s=h.name,m={isolateScope:null,bindToController:null};D(k.scope)&&(!0===k.bindToController?(m.bindToController=c(k.scope,s,!0),m.isolateScope={}):m.isolateScope=c(k.scope,s,!1));D(k.bindToController)&&(m.bindToController=c(k.bindToController,s,!0));if(D(m.bindToController)){var S=k.controller,E=k.controllerAs;if(!S)throw ea("noctrl",s);var ha;a:if(E&&H(E))ha=E;else{if(H(S)){var n=Vc.exec(S);if(n){ha=n[3];break a}}ha=void 0}if(!ha)throw ea("noident",
s);}var r=l.$$bindings=m;D(r.isolateScope)&&(h.$$isolateBindings=r.isolateScope);h.$$moduleName=e.$$moduleName;f.push(h)}catch(u){d(u)}});return f}])),e[a].push(f)):n(a,nc(s));return this};this.aHrefSanitizationWhitelist=function(b){return x(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return x(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var m=!0;this.debugInfoEnabled=function(a){return x(a)?
(m=a,this):m};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,d,w,p,A,r,M,O,J){function F(a,b){try{a.addClass(b)}catch(c){}}function V(a,b,c,d,e){a instanceof z||(a=z(a));n(a,function(b,c){b.nodeType==Pa&&b.nodeValue.match(/\S+/)&&(a[c]=z(b).wrap("<span></span>").parent()[0])});var f=S(a,b,a,c,d,e);V.$$addScopeClass(a);var g=null;return function(b,c,d){pb(b,"scope");d=d||{};
var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ta(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?z(Xb(g,z("<div>").append(a).html())):c?Ra.clone.call(a):a;if(h)for(var k in h)d.data("$"+k+"Controller",h[k].instance);V.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function S(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,s,t,O;if(p)for(O=Array(c.length),m=0;m<
h.length;m+=3)f=h[m],O[f]=c[f];else O=c;m=0;for(s=h.length;m<s;)if(k=O[h[m++]],c=h[m++],f=h[m++],c){if(c.scope){if(l=a.$new(),V.$$addScopeInfo(z(k),l),t=c.$$destroyBindings)c.$$destroyBindings=null,l.$on("$destroyed",t)}else l=a;t=c.transcludeOnThisElement?P(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?P(a,b):null;c(f,l,k,d,t,c)}else f&&f(a,k.childNodes,u,e)}for(var h=[],k,l,m,s,p,t=0;t<a.length;t++){k=new aa;l=ha(a[t],[],k,0===t?d:u,e);(f=l.length?C(l,a[t],k,b,c,null,[],[],f):null)&&f.scope&&
V.$$addScopeClass(k.$$element);k=f&&f.terminal||!(m=a[t].childNodes)||!m.length?null:S(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(t,f,k),s=!0,p=p||f;f=null}return s?g:null}function P(a,b,c){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function ha(a,b,c,d,e){var h=c.$attr,k;switch(a.nodeType){case pa:x(b,va(ta(a)),"E",d,e);for(var l,m,s,p=a.attributes,
t=0,O=p&&p.length;t<O;t++){var L=!1,J=!1;l=p[t];k=l.name;m=T(l.value);l=va(k);if(s=ia.test(l))k=k.replace(Xc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var S=l.replace(/(Start|End)$/,"");G(S)&&l===S+"Start"&&(L=k,J=k.substr(0,k.length-5)+"end",k=k.substr(0,k.length-6));l=va(k.toLowerCase());h[l]=k;if(s||!c.hasOwnProperty(l))c[l]=m,Qc(a,l)&&(c[l]=!0);X(a,b,m,l,s);x(b,l,"A",d,e,L,J)}a=a.className;D(a)&&(a=a.animVal);if(H(a)&&""!==a)for(;k=g.exec(a);)l=va(k[2]),x(b,l,"C",d,
e)&&(c[l]=T(k[3])),a=a.substr(k.index+k[0].length);break;case Pa:if(11===Va)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===Pa;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);wa(b,a.nodeValue);break;case 8:try{if(k=f.exec(a.nodeValue))l=va(k[1]),x(b,l,"M",d,e)&&(c[l]=T(k[2]))}catch(E){}}b.sort(za);return b}function ya(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ea("uterdir",b,c);a.nodeType==pa&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&
e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return z(d)}function Wc(a,b,c){return function(d,e,f,g,h){e=ya(e[0],b,c);return a(d,e,f,g,h)}}function C(a,b,d,e,f,g,h,k,m){function s(a,b,c,d){if(a){c&&(a=Wc(a,c,d));a.require=C.require;a.directiveName=x;if(P===C||C.$$isolateScope)a=Z(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=Wc(b,c,d));b.require=C.require;b.directiveName=x;if(P===C||C.$$isolateScope)b=Z(b,{isolateScope:!0});k.push(b)}}function t(a,b,c,d){var e;if(H(b)){var f=b.match(l);b=
b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;e||(d="$"+b+"Controller",e=g?c.inheritedData(d):c.data(d));if(!e&&!f)throw ea("ctreq",b,a);}else if(K(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=t(a,b[g],c,d);return e||null}function O(a,b,c,d,e,f){var g=ga(),h;for(h in d){var k=d[h],l={$scope:k===P||k.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},m=k.controller;"@"==m&&(m=b[k.name]);l=p(m,l,!0,k.controllerAs);g[k.name]=l;r||a.data("$"+k.name+
"Controller",l.instance)}return g}function L(a,c,e,f,g,l){function m(a,b,c){var d;$a(a)||(c=b,b=a,a=u);r&&(d=A);c||(c=r?ja.parent():ja);return g(a,b,d,c,ya)}var s,p,J,E,A,ha,ja;b===e?(f=d,ja=d.$$element):(ja=z(e),f=new aa(ja,d));P&&(E=c.$new(!0));g&&(ha=m,ha.$$boundTransclude=g);w&&(A=O(ja,f,ha,w,E,c));P&&(V.$$addScopeInfo(ja,E,!0,!(F&&(F===P||F===P.$$originalDirective))),V.$$addScopeClass(ja,!0),E.$$isolateBindings=P.$$isolateBindings,Y(c,f,E,E.$$isolateBindings,P,E));if(A){var n=P||S,M;n&&A[n.name]&&
(p=n.$$bindings.bindToController,(J=A[n.name])&&J.identifier&&p&&(M=J,l.$$destroyBindings=Y(c,f,J.instance,p,n)));for(s in A){J=A[s];var C=J();C!==J.instance&&(J.instance=C,ja.data("$"+s+"Controller",C),J===M&&(l.$$destroyBindings(),l.$$destroyBindings=Y(c,f,C,p,n)))}}s=0;for(l=h.length;s<l;s++)p=h[s],$(p,p.isolateScope?E:c,ja,f,p.require&&t(p.directiveName,p.require,ja,A),ha);var ya=c;P&&(P.template||null===P.templateUrl)&&(ya=E);a&&a(ya,e.childNodes,u,g);for(s=k.length-1;0<=s;s--)p=k[s],$(p,p.isolateScope?
E:c,ja,f,p.require&&t(p.directiveName,p.require,ja,A),ha)}m=m||{};for(var J=-Number.MAX_VALUE,S=m.newScopeDirective,w=m.controllerDirectives,P=m.newIsolateScopeDirective,F=m.templateDirective,A=m.nonTlbTranscludeDirective,n=!1,M=!1,r=m.hasElementTranscludeDirective,ba=d.$$element=z(b),C,x,v,y=e,za,wa=0,G=a.length;wa<G;wa++){C=a[wa];var Bb=C.$$start,I=C.$$end;Bb&&(ba=ya(b,Bb,I));v=u;if(J>C.priority)break;if(v=C.scope)C.templateUrl||(D(v)?(N("new/isolated scope",P||S,C,ba),P=C):N("new/isolated scope",
P,C,ba)),S=S||C;x=C.name;!C.templateUrl&&C.controller&&(v=C.controller,w=w||ga(),N("'"+x+"' controller",w[x],C,ba),w[x]=C);if(v=C.transclude)n=!0,C.$$tlb||(N("transclusion",A,C,ba),A=C),"element"==v?(r=!0,J=C.priority,v=ba,ba=d.$$element=z(W.createComment(" "+x+": "+d[x]+" ")),b=ba[0],U(f,xa.call(v,0),b),y=V(v,e,J,g&&g.name,{nonTlbTranscludeDirective:A})):(v=z(Ub(b)).contents(),ba.empty(),y=V(v,e));if(C.template)if(M=!0,N("template",F,C,ba),F=C,v=B(C.template)?C.template(ba,d):C.template,v=fa(v),
C.replace){g=C;v=Sb.test(v)?Yc(Xb(C.templateNamespace,T(v))):[];b=v[0];if(1!=v.length||b.nodeType!==pa)throw ea("tplrt",x,"");U(f,ba,b);G={$attr:{}};v=ha(b,[],G);var Q=a.splice(wa+1,a.length-(wa+1));P&&Zc(v);a=a.concat(v).concat(Q);$c(d,G);G=a.length}else ba.html(v);if(C.templateUrl)M=!0,N("template",F,C,ba),F=C,C.replace&&(g=C),L=Lf(a.splice(wa,a.length-wa),ba,d,f,n&&y,h,k,{controllerDirectives:w,newScopeDirective:S!==C&&S,newIsolateScopeDirective:P,templateDirective:F,nonTlbTranscludeDirective:A}),
G=a.length;else if(C.compile)try{za=C.compile(ba,d,y),B(za)?s(null,za,Bb,I):za&&s(za.pre,za.post,Bb,I)}catch(R){c(R,ua(ba))}C.terminal&&(L.terminal=!0,J=Math.max(J,C.priority))}L.scope=S&&!0===S.scope;L.transcludeOnThisElement=n;L.templateOnThisElement=M;L.transclude=y;m.hasElementTranscludeDirective=r;return L}function Zc(a){for(var b=0,c=a.length;b<c;b++)a[b]=Nb(a[b],{$$isolateScope:!0})}function x(b,d,f,g,h,k,l){if(d===h)return null;h=null;if(e.hasOwnProperty(d)){var m;d=a.get(d+"Directive");for(var p=
0,t=d.length;p<t;p++)try{m=d[p],(g===u||g>m.priority)&&-1!=m.restrict.indexOf(f)&&(k&&(m=Nb(m,{$$start:k,$$end:l})),b.push(m),h=m)}catch(J){c(J)}}return h}function G(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=c[d],b.multiElement)return!0;return!1}function $c(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;n(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});n(b,function(b,f){"class"==f?(F(e,b),a["class"]=(a["class"]?
a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function Lf(a,b,c,e,f,g,h,k){var l=[],m,s,p=b[0],t=a.shift(),J=Nb(t,{templateUrl:null,transclude:null,replace:null,$$originalDirective:t}),O=B(t.templateUrl)?t.templateUrl(b,c):t.templateUrl,E=t.templateNamespace;b.empty();d(O).then(function(d){var L,w;d=fa(d);if(t.replace){d=Sb.test(d)?Yc(Xb(E,T(d))):[];L=d[0];if(1!=d.length||L.nodeType!==
pa)throw ea("tplrt",t.name,O);d={$attr:{}};U(e,b,L);var A=ha(L,[],d);D(t.scope)&&Zc(A);a=A.concat(a);$c(c,d)}else L=p,b.html(d);a.unshift(J);m=C(a,L,c,f,b,t,g,h,k);n(e,function(a,c){a==L&&(e[c]=b[0])});for(s=S(b[0].childNodes,f);l.length;){d=l.shift();w=l.shift();var M=l.shift(),V=l.shift(),A=b[0];if(!d.$$destroyed){if(w!==p){var ya=w.className;k.hasElementTranscludeDirective&&t.replace||(A=Ub(L));U(M,z(w),A);F(z(A),ya)}w=m.transcludeOnThisElement?P(d,m.transclude,V):V;m(s,d,A,e,w,m)}}l=null});return function(a,
b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(m.transcludeOnThisElement&&(a=P(b,m.transclude,e)),m(s,b,c,d,a,m)))}}function za(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function N(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw ea("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,ua(d));}function wa(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&V.$$addBindingClass(a);
return function(a,c){var e=c.parent();b||V.$$addBindingClass(e);V.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Xb(a,b){a=I(a||"html");switch(a){case "svg":case "math":var c=W.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function R(a,b){if("srcdoc"==b)return M.HTML;var c=ta(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return M.RESOURCE_URL}function X(a,c,d,e,
f){var g=R(a,e);f=h[e]||f;var l=b(d,!0,g,f);if(l){if("multiple"===e&&"select"===ta(a))throw ea("selmulti",ua(a));c.push({priority:100,compile:function(){return{pre:function(a,c,h){c=h.$$observers||(h.$$observers={});if(k.test(e))throw ea("nodomevents");var m=h[e];m!==d&&(l=m&&b(m,!0,g,f),d=m);l&&(h[e]=l(a),(c[e]||(c[e]=[])).$$inter=!0,(h.$$observers&&h.$$observers[e].$$scope||a).$watch(l,function(a,b){"class"===e&&a!=b?h.$updateClass(a,b):h.$set(e,a)}))}}}})}}function U(a,b,c){var d=b[0],e=b.length,
f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=W.createDocumentFragment();a.appendChild(d);z.hasData(d)&&(z(c).data(z(d).data()),la?(Qb=!0,la.cleanData([d])):delete z.cache[d[z.expando]]);d=1;for(e=b.length;d<e;d++)f=b[d],z(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Z(a,b){return Q(function(){return a.apply(null,
arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ua(d))}}function Y(a,c,d,e,f,g){var h;n(e,function(e,g){var k=e.attrName,l=e.optional,m,s,p,L;switch(e.mode){case "@":l||Na.call(c,k)||(d[g]=c[k]=void 0);c.$observe(k,function(a){H(a)&&(d[g]=a)});c.$$observers[k].$$scope=a;H(c[k])&&(d[g]=b(c[k])(a));break;case "=":if(!Na.call(c,k)){if(l)break;c[k]=void 0}if(l&&!c[k])break;s=w(c[k]);L=s.literal?ka:function(a,b){return a===b||a!==a&&b!==b};p=s.assign||function(){m=d[g]=s(a);throw ea("nonassign",
c[k],f.name);};m=d[g]=s(a);l=function(b){L(b,d[g])||(L(b,m)?p(a,b=d[g]):d[g]=b);return m=b};l.$stateful=!0;l=e.collection?a.$watchCollection(c[k],l):a.$watch(w(c[k],l),null,s.literal);h=h||[];h.push(l);break;case "&":s=c.hasOwnProperty(k)?w(c[k]):v;if(s===v&&l)break;d[g]=function(b){return s(a,b)}}});e=h?function(){for(var a=0,b=h.length;a<b;++a)h[a]()}:v;return g&&e!==v?(g.$on("$destroy",e),v):e}var aa=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr=
{};this.$$element=a};aa.prototype={$normalize:va,$addClass:function(a){a&&0<a.length&&O.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&O.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=ad(a,b);c&&c.length&&O.addClass(this.$$element,c);(c=ad(b,a))&&c.length&&O.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Qc(f,a),h=Gf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=
e=zc(a,"-"));g=ta(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=J(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=T(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var m=2*l,g=g+J(T(h[m]),!0),g=g+(" "+T(h[m+1]));h=T(h[2*l]).split(/\s/);g+=J(T(h[0]),!0);2===h.length&&(g+=" "+T(h[1]));this[a]=b=g}!1!==d&&(null===b||b===u?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&
n(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ga()),e=d[a]||(d[a]=[]);e.push(b);A.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||y(c[a])||b(c[a])});return function(){bb(e,b)}}};var ca=b.startSymbol(),da=b.endSymbol(),fa="{{"==ca||"}}"==da?Za:function(a){return a.replace(/\{\{/g,ca).replace(/}}/g,da)},ia=/^ngAttr[A-Z]/;V.$$addBindingInfo=m?function(a,b){var c=a.data("$binding")||[];K(b)?c=c.concat(b):c.push(b);a.data("$binding",
c)}:v;V.$$addBindingClass=m?function(a){F(a,"ng-binding")}:v;V.$$addScopeInfo=m?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:v;V.$$addScopeClass=m?function(a,b){F(a,b?"ng-isolate-scope":"ng-scope")}:v;return V}]}function va(b){return fb(b.replace(Xc,""))}function ad(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Yc(b){b=z(b);var a=b.length;
if(1>=a)return b;for(;a--;)8===b[a].nodeType&&Mf.call(b,a,1);return b}function Xe(){var b={},a=!1;this.register=function(a,d){Ta(a,"controller");D(a)?Q(b,a):b[a]=d};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(c,d){function e(a,b,c,d){if(!a||!D(a.$scope))throw G("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,g,h,l){var k,m,q;h=!0===h;l&&H(l)&&(q=l);if(H(f)){l=f.match(Vc);if(!l)throw Nf("ctrlfmt",f);m=l[1];q=q||l[3];f=b.hasOwnProperty(m)?b[m]:Bc(g.$scope,
m,!0)||(a?Bc(d,m,!0):u);Sa(f,m,!0)}if(h)return h=(K(f)?f[f.length-1]:f).prototype,k=Object.create(h||null),q&&e(g,q,k,m||f.name),Q(function(){var a=c.invoke(f,k,g,m);a!==k&&(D(a)||B(a))&&(k=a,q&&e(g,q,k,m||f.name));return k},{instance:k,identifier:q});k=c.instantiate(f,g,m);q&&e(g,q,k,m||f.name);return k}}]}function Ye(){this.$get=["$window",function(b){return z(b.document)}]}function Ze(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Yb(b){return D(b)?
ca(b)?b.toISOString():db(b):b}function df(){this.$get=function(){return function(b){if(!b)return"";var a=[];mc(b,function(b,d){null===b||y(b)||(K(b)?n(b,function(b,c){a.push(ma(d)+"="+ma(Yb(b)))}):a.push(ma(d)+"="+ma(Yb(b))))});return a.join("&")}}}function ef(){this.$get=function(){return function(b){function a(b,e,f){null===b||y(b)||(K(b)?n(b,function(b,c){a(b,e+"["+(D(b)?c:"")+"]")}):D(b)&&!ca(b)?mc(b,function(b,c){a(b,e+(f?"":"[")+c+(f?"":"]"))}):c.push(ma(e)+"="+ma(Yb(b))))}if(!b)return"";var c=
[];a(b,"",!0);return c.join("&")}}}function Zb(b,a){if(H(b)){var c=b.replace(Of,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(bd))||(d=(d=c.match(Pf))&&Qf[d[0]].test(c));d&&(b=uc(c))}}return b}function cd(b){var a=ga(),c;H(b)?n(b.split("\n"),function(b){c=b.indexOf(":");var e=I(T(b.substr(0,c)));b=T(b.substr(c+1));e&&(a[e]=a[e]?a[e]+", "+b:b)}):D(b)&&n(b,function(b,c){var f=I(c),g=T(b);f&&(a[f]=a[f]?a[f]+", "+g:g)});return a}function dd(b){var a;return function(c){a||(a=cd(b));return c?
(c=a[I(c)],void 0===c&&(c=null),c):a}}function ed(b,a,c,d){if(B(d))return d(b,a,c);n(d,function(d){b=d(b,a,c)});return b}function cf(){var b=this.defaults={transformResponse:[Zb],transformRequest:[function(a){return D(a)&&"[object File]"!==sa.call(a)&&"[object Blob]"!==sa.call(a)&&"[object FormData]"!==sa.call(a)?db(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ia($b),put:ia($b),patch:ia($b)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},
a=!1;this.useApplyAsync=function(b){return x(b)?(a=!!b,this):a};var c=!0;this.useLegacyPromiseExtensions=function(a){return x(a)?(c=!!a,this):c};var d=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(e,f,g,h,l,k){function m(a){function d(a){var b=Q({},a);b.data=a.data?ed(a.data,a.headers,a.status,f.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:l.reject(b)}function e(a,b){var c,d={};n(a,function(a,e){B(a)?(c=a(b),null!=
c&&(d[e]=c)):d[e]=a});return d}if(!aa.isObject(a))throw G("$http")("badreq",a);var f=Q({method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse,paramSerializer:b.paramSerializer},a);f.headers=function(a){var c=b.headers,d=Q({},a.headers),f,g,h,c=Q({},c.common,c[I(a.method)]);a:for(f in c){g=I(f);for(h in d)if(I(h)===g)continue a;d[f]=c[f]}return e(d,ia(a))}(a);f.method=rb(f.method);f.paramSerializer=H(f.paramSerializer)?k.get(f.paramSerializer):f.paramSerializer;var g=
[function(a){var c=a.headers,e=ed(a.data,dd(c),u,a.transformRequest);y(e)&&n(c,function(a,b){"content-type"===I(b)&&delete c[b]});y(a.withCredentials)&&!y(b.withCredentials)&&(a.withCredentials=b.withCredentials);return q(a,e).then(d,d)},u],h=l.when(f);for(n(E,function(a){(a.request||a.requestError)&&g.unshift(a.request,a.requestError);(a.response||a.responseError)&&g.push(a.response,a.responseError)});g.length;){a=g.shift();var m=g.shift(),h=h.then(a,m)}c?(h.success=function(a){Sa(a,"fn");h.then(function(b){a(b.data,
b.status,b.headers,f)});return h},h.error=function(a){Sa(a,"fn");h.then(null,function(b){a(b.data,b.status,b.headers,f)});return h}):(h.success=fd("success"),h.error=fd("error"));return h}function q(c,d){function g(b,c,d,e){function f(){k(c,b,d,e)}F&&(200<=b&&300>b?F.put(P,[b,c,cd(d),e]):F.remove(P));a?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}function k(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?O.resolve:O.reject)({data:a,status:b,headers:dd(d),config:c,statusText:e})}function q(a){k(a.data,a.status,
ia(a.headers()),a.statusText)}function E(){var a=m.pendingRequests.indexOf(c);-1!==a&&m.pendingRequests.splice(a,1)}var O=l.defer(),J=O.promise,F,n,S=c.headers,P=s(c.url,c.paramSerializer(c.params));m.pendingRequests.push(c);J.then(E,E);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(F=D(c.cache)?c.cache:D(b.cache)?b.cache:t);F&&(n=F.get(P),x(n)?n&&B(n.then)?n.then(q,q):K(n)?k(n[1],n[0],ia(n[2]),n[3]):k(n,200,{},"OK"):F.put(P,J));y(n)&&((n=gd(c.url)?f()[c.xsrfCookieName||
b.xsrfCookieName]:u)&&(S[c.xsrfHeaderName||b.xsrfHeaderName]=n),e(c.method,P,d,g,S,c.timeout,c.withCredentials,c.responseType));return J}function s(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);return a}var t=g("$http");b.paramSerializer=H(b.paramSerializer)?k.get(b.paramSerializer):b.paramSerializer;var E=[];n(d,function(a){E.unshift(H(a)?k.get(a):k.invoke(a))});m.pendingRequests=[];(function(a){n(arguments,function(a){m[a]=function(b,c){return m(Q({},c||{},{method:a,url:b}))}})})("get","delete",
"head","jsonp");(function(a){n(arguments,function(a){m[a]=function(b,c,d){return m(Q({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");m.defaults=b;return m}]}function Rf(){return new N.XMLHttpRequest}function ff(){this.$get=["$browser","$window","$document",function(b,a,c){return Sf(b,Rf,b.defer,a.angular.callbacks,c[0])}]}function Sf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",
m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,t="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),t=a.type,g="error"===a.type?404:200);c&&c(g,t)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,l,k,m,q,s,t){function E(){p&&p();A&&A.abort()}function L(a,d,e,f,g){M!==u&&c.cancel(M);p=A=null;a(d,e,f,g);b.$$completeOutstandingRequest(v)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==
I(e)){var w="_"+(d.counter++).toString(36);d[w]=function(a){d[w].data=a;d[w].called=!0};var p=f(h.replace("JSON_CALLBACK","angular.callbacks."+w),w,function(a,b){L(k,a,d[w].data,"",b);d[w]=v})}else{var A=a();A.open(e,h,!0);n(m,function(a,b){x(a)&&A.setRequestHeader(b,a)});A.onload=function(){var a=A.statusText||"",b="response"in A?A.response:A.responseText,c=1223===A.status?204:A.status;0===c&&(c=b?200:"file"==Aa(h).protocol?404:0);L(k,c,b,A.getAllResponseHeaders(),a)};e=function(){L(k,-1,null,null,
"")};A.onerror=e;A.onabort=e;s&&(A.withCredentials=!0);if(t)try{A.responseType=t}catch(r){if("json"!==t)throw r;}A.send(l)}if(0<q)var M=c(E,q);else q&&B(q.then)&&q.then(E)}}function af(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(m,b).replace(q,a)}function h(f,h,m,q){function w(a){try{var b=a;a=m?e.getTrusted(m,
b):e.valueOf(b);var c;if(q&&!x(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=db(a)}c=a}return c}catch(g){d(Ka.interr(f,g))}}q=!!q;for(var p,n,r=0,M=[],O=[],J=f.length,F=[],V=[];r<J;)if(-1!=(p=f.indexOf(b,r))&&-1!=(n=f.indexOf(a,p+l)))r!==p&&F.push(g(f.substring(r,p))),r=f.substring(p+l,n),M.push(r),O.push(c(r,w)),r=n+k,V.push(F.length),F.push("");else{r!==J&&F.push(g(f.substring(r)));break}m&&1<F.length&&Ka.throwNoconcat(f);if(!h||M.length){var S=
function(a){for(var b=0,c=M.length;b<c;b++){if(q&&y(a[b]))return;F[V[b]]=a[b]}return F.join("")};return Q(function(a){var b=0,c=M.length,e=Array(c);try{for(;b<c;b++)e[b]=O[b](a);return S(e)}catch(g){d(Ka.interr(f,g))}},{exp:f,expressions:M,$$watchDelegate:function(a,b){var c;return a.$watchGroup(O,function(d,e){var f=S(d);B(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=b.length,k=a.length,m=new RegExp(b.replace(/./g,f),"g"),q=new RegExp(a.replace(/./g,f),"g");h.startSymbol=function(){return b};h.endSymbol=
function(){return a};return h}]}function bf(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var m=4<arguments.length,q=m?xa.call(arguments,4):[],s=a.setInterval,t=a.clearInterval,E=0,L=x(k)&&!k,w=(L?d:c).defer(),p=w.promise;l=x(l)?l:0;p.then(null,null,m?function(){e.apply(null,q)}:e);p.$$intervalId=s(function(){w.notify(E++);0<l&&E>=l&&(w.resolve(E),t(p.$$intervalId),delete f[p.$$intervalId]);L||b.$apply()},h);f[p.$$intervalId]=w;return p}var f={};e.cancel=function(b){return b&&
b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=nb(b[a]);return b.join("/")}function hd(b,a){var c=Aa(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=Y(c.port)||Tf[c.protocol]||null}function id(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Aa(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=
xc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function ra(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ja(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Cb(b){return b.replace(/(#.+)|#$/,"$1")}function bc(b,a,c){this.$$html5=!0;c=c||"";hd(b,this);this.$$parse=function(b){var c=ra(a,b);if(!H(c))throw Db("ipthprfx",b,a);id(c,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var b=
Pb(this.$$search),c=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(b?"?"+b:"")+c;this.$$absUrl=a+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=ra(b,d))!==u?(g=f,g=(f=ra(c,f))!==u?a+(ra("/",f)||f):b+g):(f=ra(a,d))!==u?g=a+f:a==d+"/"&&(g=a);g&&this.$$parse(g);return!!g}}function cc(b,a,c){hd(b,this);this.$$parse=function(d){var e=ra(b,d)||ra(a,d),f;y(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",y(e)&&(b=d,this.replace())):
(f=ra(c,e),y(f)&&(f=e));id(f,this);d=this.$$path;var e=b,g=/^\/[A-Z]:(\/.*)/;0===f.indexOf(e)&&(f=f.replace(e,""));g.exec(f)||(d=(f=g.exec(d))?f[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var a=Pb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+e;this.$$absUrl=b+(this.$$url?c+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ja(b)==Ja(a)?(this.$$parse(a),!0):!1}}function jd(b,a,c){this.$$html5=!0;cc.apply(this,arguments);this.$$parseLinkUrl=
function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ja(d)?f=d:(g=ra(a,d))?f=b+c+g:a===d+"/"&&(f=a);f&&this.$$parse(f);return!!f};this.$$compose=function(){var a=Pb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+e;this.$$absUrl=b+c+this.$$url}}function Eb(b){return function(){return this[b]}}function kd(b,a){return function(c){if(y(c))return this[b];this[b]=a(c);this.$$compose();return this}}function gf(){var b="",a={enabled:!1,requireBase:!0,
rewriteLinks:!0};this.hashPrefix=function(a){return x(a)?(b=a,this):b};this.html5Mode=function(b){return ab(b)?(a.enabled=b,this):D(b)?(ab(b.enabled)&&(a.enabled=b.enabled),ab(b.requireBase)&&(a.requireBase=b.requireBase),ab(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,
b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,m;m=d.baseHref();var q=d.url(),s;if(a.enabled){if(!m&&a.requireBase)throw Db("nobase");s=q.substring(0,q.indexOf("/",q.indexOf("//")+2))+(m||"/");m=e.history?bc:jd}else s=Ja(q),m=cc;var t=s.substr(0,Ja(s).lastIndexOf("/")+1);k=new m(s,t,"#"+b);k.$$parseLinkUrl(q,q);k.$$state=d.state();var E=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&!b.shiftKey&&2!=b.which&&2!=b.button){for(var e=
z(b.target);"a"!==ta(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");D(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Aa(h.animVal).href);E.test(h)||!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});Cb(k.absUrl())!=Cb(q)&&d.url(k.absUrl(),!0);var L=!0;d.onUrlChange(function(a,b){y(ra(t,a))?g.location.href=a:(c.$evalAsync(function(){var d=
k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(L=!1,l(d,e)))}),c.$$phase||c.$digest())});c.$watch(function(){var a=Cb(d.url()),b=Cb(k.absUrl()),f=d.state(),g=k.$$replace,m=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(L||m)L=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=
f):(m&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function hf(){var b=!0,a=this;this.debugEnabled=function(a){return x(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||v;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=
[];n(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function Wa(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw da("isecfld",a);return b}function Ba(b,a){if(b){if(b.constructor===b)throw da("isecfn",a);if(b.window===b)throw da("isecwindow",
a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw da("isecdom",a);if(b===Object)throw da("isecobj",a);}return b}function ld(b,a){if(b){if(b.constructor===b)throw da("isecfn",a);if(b===Uf||b===Vf||b===Wf)throw da("isecff",a);}}function Xf(b,a){return"undefined"!==typeof b?b:a}function md(b,a){return"undefined"===typeof b?a:"undefined"===typeof a?b:b+a}function U(b,a){var c,d;switch(b.type){case r.Program:c=!0;n(b.body,function(b){U(b.expression,a);c=c&&b.expression.constant});b.constant=
c;break;case r.Literal:b.constant=!0;b.toWatch=[];break;case r.UnaryExpression:U(b.argument,a);b.constant=b.argument.constant;b.toWatch=b.argument.toWatch;break;case r.BinaryExpression:U(b.left,a);U(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=b.left.toWatch.concat(b.right.toWatch);break;case r.LogicalExpression:U(b.left,a);U(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=b.constant?[]:[b];break;case r.ConditionalExpression:U(b.test,a);U(b.alternate,a);U(b.consequent,
a);b.constant=b.test.constant&&b.alternate.constant&&b.consequent.constant;b.toWatch=b.constant?[]:[b];break;case r.Identifier:b.constant=!1;b.toWatch=[b];break;case r.MemberExpression:U(b.object,a);b.computed&&U(b.property,a);b.constant=b.object.constant&&(!b.computed||b.property.constant);b.toWatch=[b];break;case r.CallExpression:c=b.filter?!a(b.callee.name).$stateful:!1;d=[];n(b.arguments,function(b){U(b,a);c=c&&b.constant;b.constant||d.push.apply(d,b.toWatch)});b.constant=c;b.toWatch=b.filter&&
!a(b.callee.name).$stateful?d:[b];break;case r.AssignmentExpression:U(b.left,a);U(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=[b];break;case r.ArrayExpression:c=!0;d=[];n(b.elements,function(b){U(b,a);c=c&&b.constant;b.constant||d.push.apply(d,b.toWatch)});b.constant=c;b.toWatch=d;break;case r.ObjectExpression:c=!0;d=[];n(b.properties,function(b){U(b.value,a);c=c&&b.value.constant;b.value.constant||d.push.apply(d,b.value.toWatch)});b.constant=c;b.toWatch=d;break;case r.ThisExpression:b.constant=
!1,b.toWatch=[]}}function nd(b){if(1==b.length){b=b[0].expression;var a=b.toWatch;return 1!==a.length?a:a[0]!==b?a:u}}function od(b){return b.type===r.Identifier||b.type===r.MemberExpression}function pd(b){if(1===b.body.length&&od(b.body[0].expression))return{type:r.AssignmentExpression,left:b.body[0].expression,right:{type:r.NGValueParameter},operator:"="}}function qd(b){return 0===b.body.length||1===b.body.length&&(b.body[0].expression.type===r.Literal||b.body[0].expression.type===r.ArrayExpression||
b.body[0].expression.type===r.ObjectExpression)}function rd(b,a){this.astBuilder=b;this.$filter=a}function sd(b,a){this.astBuilder=b;this.$filter=a}function Fb(b){return"constructor"==b}function dc(b){return B(b.valueOf)?b.valueOf():Yf.call(b)}function jf(){var b=ga(),a=ga();this.$get=["$filter",function(c){function d(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=dc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function e(a,b,c,e,f){var g=e.inputs,h;if(1===g.length){var k=d,g=g[0];return a.$watch(function(a){var b=
g(a);d(b,k)||(h=e(a,u,u,[b]),k=b&&dc(b));return h},b,c,f)}for(var l=[],m=[],q=0,n=g.length;q<n;q++)l[q]=d,m[q]=null;return a.$watch(function(a){for(var b=!1,c=0,f=g.length;c<f;c++){var k=g[c](a);if(b||(b=!d(k,l[c])))m[c]=k,l[c]=k&&dc(k)}b&&(h=e(a,u,u,m));return h},b,c,f)}function f(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;B(b)&&b.apply(this,arguments);x(a)&&d.$$postDigest(function(){x(f)&&e()})},c)}function g(a,b,c,d){function e(a){var b=!0;n(a,function(a){x(a)||
(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;B(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function h(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){B(b)&&b.apply(this,arguments);e()},c)}function l(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==g&&c!==f?function(c,d,e,f){e=a(c,d,e,f);return b(e,c,d)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return x(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==
e?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=e,c.inputs=a.inputs?a.inputs:[a]);return c}var k=Fa().noUnsafeEval,m={csp:k,expensiveChecks:!1},q={csp:k,expensiveChecks:!0};return function(d,k,E){var n,w,p;switch(typeof d){case "string":p=d=d.trim();var r=E?a:b;n=r[p];n||(":"===d.charAt(0)&&":"===d.charAt(1)&&(w=!0,d=d.substring(2)),E=E?q:m,n=new ec(E),n=(new fc(n,c,E)).parse(d),n.constant?n.$$watchDelegate=h:w?n.$$watchDelegate=n.literal?g:f:n.inputs&&(n.$$watchDelegate=e),
r[p]=n);return l(n,k);case "function":return l(d,k);default:return v}}}]}function lf(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return td(function(a){b.$evalAsync(a)},a)}]}function mf(){this.$get=["$browser","$exceptionHandler",function(b,a){return td(function(a){b.defer(a)},a)}]}function td(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}
function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=u;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{B(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=G("$q",TypeError);Q(d.prototype,{then:function(a,b,c){if(y(a)&&
y(b)&&y(c))return this;var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}});Q(g.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,
this.$$reject);try{if(D(b)||B(b))d=b&&b.then;B(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,
e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(B(b)?b(c):c)}catch(h){a(h)}}})}});var l=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{B(c)&&(d=c())}catch(e){return l(e,!1)}return d&&B(d.then)?d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},q=function t(a){if(!B(a))throw h("norslvr",a);if(!(this instanceof t))return new t(a);var b=new g;
a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};q.defer=function(){return new g};q.reject=function(a){var b=new g;b.reject(a);return b.promise};q.when=m;q.resolve=m;q.all=function(a){var b=new g,c=0,d=K(a)?[]:{};n(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return q}function vf(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||
b.webkitRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function kf(){function b(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++mb;this.$$ChildScope=null}b.prototype=a;
return b}var a=10,c=G("$rootScope"),d=null,e=null;this.digestTtl=function(b){arguments.length&&(a=b);return a};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(f,g,h,l){function k(a){a.currentScope.$$destroyed=!0}function m(){this.$id=++mb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=
null}function q(a){if(p.$$phase)throw c("inprog",p.$$phase);p.$$phase=a}function s(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function t(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function r(){}function L(){for(;M.length;)try{M.shift()()}catch(a){g(a)}e=null}function w(){null===e&&(e=l.defer(function(){p.$apply(L)}))}m.prototype={constructor:m,$new:function(a,c){var d;c=c||this;a?(d=new m,d.$root=this.$root):(this.$$ChildScope||
(this.$$ChildScope=b(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(a||c!=this)&&d.$on("$destroy",k);return d},$watch:function(a,b,c,e){var f=h(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,c,f,a);var g=this,k=g.$$watchers,l={fn:b,last:r,get:f,exp:e||a,eq:!!c};d=null;B(b)||(l.fn=v);k||(k=g.$$watchers=[]);k.unshift(l);s(this,1);return function(){0<=bb(k,l)&&s(g,-1);d=null}},
$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});n(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=
a;var b,d,g,h;if(!y(e)){if(D(e))if(Da(e))for(f!==q&&(f=q,t=f.length=0,l++),a=e.length,t!==a&&(l++,f.length=t=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==s&&(f=s={},t=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(t++,f[b]=g,l++));if(t>a)for(b in l++,f)e.hasOwnProperty(b)||(t--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,g,k=1<b.length,l=0,m=h(a,c),q=[],s={},p=!0,t=0;return this.$watch(m,
function(){p?(p=!1,b(e,e,d)):b(e,g,d);if(k)if(D(e))if(Da(e)){g=Array(e.length);for(var a=0;a<e.length;a++)g[a]=e[a]}else for(a in g={},e)Na.call(e,a)&&(g[a]=e[a]);else g=e})},$digest:function(){var b,f,h,k,m,s,t=a,n,w=[],C,M;q("$digest");l.$$checkUrlChange();this===p&&null!==e&&(l.defer.cancel(e),L());d=null;do{s=!1;for(n=this;u.length;){try{M=u.shift(),M.scope.$eval(M.expression,M.locals)}catch(v){g(v)}d=null}a:do{if(k=n.$$watchers)for(m=k.length;m--;)try{if(b=k[m])if((f=b.get(n))!==(h=b.last)&&
!(b.eq?ka(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))s=!0,d=b,b.last=b.eq?fa(f,null):f,b.fn(f,h===r?f:h,n),5>t&&(C=4-t,w[C]||(w[C]=[]),w[C].push({msg:B(b.exp)?"fn: "+(b.exp.name||b.exp.toString()):b.exp,newVal:f,oldVal:h}));else if(b===d){s=!1;break a}}catch(y){g(y)}if(!(k=n.$$watchersCount&&n.$$childHead||n!==this&&n.$$nextSibling))for(;n!==this&&!(k=n.$$nextSibling);)n=n.$parent}while(n=k);if((s||u.length)&&!t--)throw p.$$phase=null,c("infdig",a,w);}while(s||u.length);for(p.$$phase=
null;x.length;)try{x.shift()()}catch(z){g(z)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===p&&l.$$applicationDestroyed();s(this,-this.$$watchersCount);for(var b in this.$$listenerCount)t(this,this.$$listenerCount[b],b);a&&a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&
(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=v;this.$on=this.$watch=this.$watchGroup=function(){return v};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}},$eval:function(a,b){return h(a)(this,b)},$evalAsync:function(a,b){p.$$phase||u.length||l.defer(function(){u.length&&p.$digest()});u.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){x.push(a)},
$apply:function(a){try{q("$apply");try{return this.$eval(a)}finally{p.$$phase=null}}catch(b){g(b)}finally{try{p.$digest()}catch(c){throw g(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&M.push(b);w()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,t(e,1,a))}},$emit:function(a,
b){var c=[],d,e=this,f=!1,h={name:a,targetScope:e,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=cb([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(q){g(q)}else d.splice(l,1),l--,m--;if(f)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=
!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var f=cb([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(l){g(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var p=new m,u=p.$$asyncQueue=[],x=p.$$postDigestQueue=[],M=p.$$applyAsyncQueue=[];return p}]}function ge(){var b=
/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return x(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return x(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Aa(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function Zf(b){if("self"===b)return b;if(H(b)){if(-1<b.indexOf("***"))throw Ca("iwcard",b);b=ud(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+
b+"$")}if(Oa(b))return new RegExp("^"+b.source+"$");throw Ca("imatcher");}function vd(b){var a=[];x(b)&&n(b,function(b){a.push(Zf(b))});return a}function of(){this.SCE_CONTEXTS=oa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=vd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=vd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?gd(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=
function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ca("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[oa.HTML]=e(g);h[oa.CSS]=e(g);h[oa.URL]=e(g);h[oa.JS]=e(g);h[oa.RESOURCE_URL]=e(h[oa.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ca("icontext",a,b);if(null===b||b===
u||""===b)return b;if("string"!==typeof b)throw Ca("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===u||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===oa.RESOURCE_URL){var g=Aa(e.toString()),q,s,t=!1;q=0;for(s=b.length;q<s;q++)if(d(b[q],g)){t=!0;break}if(t)for(q=0,s=a.length;q<s;q++)if(d(a[q],g)){t=!1;break}if(t)return e;throw Ca("insecurl",e.toString());}if(c===oa.HTML)return f(e);throw Ca("unsafe");},valueOf:function(a){return a instanceof
g?a.$$unwrapTrustedValue():a}}}]}function nf(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Va)throw Ca("iequirks");var d=ia(oa);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=Za);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,
f=d.getTrusted,g=d.trustAs;n(oa,function(a,b){var c=I(b);d[fb("parse_as_"+c)]=function(b){return e(a,b)};d[fb("get_trusted_"+c)]=function(b){return f(a,b)};d[fb("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function pf(){this.$get=["$window","$document",function(b,a){var c={},d=Y((/android (\d+)/.exec(I((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,m=!1;if(l){for(var q in l)if(k=
h.exec(q)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");k=!!("transition"in l||g+"Transition"in l);m=!!("animation"in l||g+"Animation"in l);!d||k&&m||(k=H(l.webkitTransition),m=H(l.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===a&&11>=Va)return!1;if(y(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:Fa(),vendorPrefix:g,transitions:k,animations:m,android:d}}]}function rf(){this.$get=
["$templateCache","$http","$q","$sce",function(b,a,c,d){function e(f,g){e.totalPendingRequests++;H(f)&&b.get(f)||(f=d.getTrustedResourceUrl(f));var h=a.defaults&&a.defaults.transformResponse;K(h)?h=h.filter(function(a){return a!==Zb}):h===Zb&&(h=null);return a.get(f,{cache:b,transformResponse:h})["finally"](function(){e.totalPendingRequests--}).then(function(a){b.put(f,a.data);return a.data},function(a){if(!g)throw ea("tpload",f,a.status,a.statusText);return c.reject(a)})}e.totalPendingRequests=0;
return e}]}function sf(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];n(a,function(a){var d=aa.element(a).data("$binding");d&&n(d,function(d){c?(new RegExp("(^|\\s)"+ud(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');
if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function tf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,l,k){B(f)||(k=l,l=f,f=v);var m=xa.call(arguments,3),q=x(k)&&!k,s=(q?d:c).defer(),t=s.promise,n;n=a.defer(function(){try{s.resolve(f.apply(null,m))}catch(a){s.reject(a),e(a)}finally{delete g[t.$$timeoutId]}q||
b.$apply()},l);t.$$timeoutId=n;g[n]=s;return t}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Aa(b){Va&&(Z.setAttribute("href",b),b=Z.href);Z.setAttribute("href",b);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===
Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function gd(b){b=H(b)?Aa(b):b;return b.protocol===wd.protocol&&b.host===wd.host}function uf(){this.$get=qa(N)}function xd(b){function a(a){try{return decodeURIComponent(a)}catch(b){return a}}var c=b[0]||{},d={},e="";return function(){var b,g,h,l,k;b=c.cookie||"";if(b!==e)for(e=b,b=e.split("; "),d={},h=0;h<b.length;h++)g=b[h],l=g.indexOf("="),0<l&&(k=a(g.substring(0,l)),d[k]===u&&(d[k]=a(g.substring(l+1))));return d}}function yf(){this.$get=xd}function Jc(b){function a(c,
d){if(D(c)){var e={};n(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",yd);a("date",zd);a("filter",$f);a("json",ag);a("limitTo",bg);a("lowercase",cg);a("number",Ad);a("orderBy",Bd);a("uppercase",dg)}function $f(){return function(b,a,c){if(!Da(b)){if(null==b)return b;throw G("filter")("notarray",b);}var d;switch(gc(a)){case "function":break;case "boolean":case "null":case "number":case "string":d=
!0;case "object":a=eg(a,c,d);break;default:return b}return Array.prototype.filter.call(b,a)}}function eg(b,a,c){var d=D(b)&&"$"in b;!0===a?a=ka:B(a)||(a=function(a,b){if(y(a))return!1;if(null===a||null===b)return a===b;if(D(b)||D(a)&&!pc(a))return!1;a=I(""+a);b=I(""+b);return-1!==a.indexOf(b)});return function(e){return d&&!D(e)?La(e,b.$,a,!1):La(e,b,a,c)}}function La(b,a,c,d,e){var f=gc(b),g=gc(a);if("string"===g&&"!"===a.charAt(0))return!La(b,a.substring(1),c,d);if(K(b))return b.some(function(b){return La(b,
a,c,d)});switch(f){case "object":var h;if(d){for(h in b)if("$"!==h.charAt(0)&&La(b[h],a,c,!0))return!0;return e?!1:La(b,a,c,!1)}if("object"===g){for(h in a)if(e=a[h],!B(e)&&!y(e)&&(f="$"===h,!La(f?b:b[h],e,c,f,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,a)}}function gc(b){return null===b?"null":typeof b}function yd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){y(d)&&(d=a.CURRENCY_SYM);y(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:Cd(b,a.PATTERNS[1],a.GROUP_SEP,
a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function Ad(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:Cd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Cd(b,a,c,d,e){if(D(b))return"";var f=0>b;b=Math.abs(b);var g=Infinity===b;if(!g&&!isFinite(b))return"";var h=b+"",l="",k=!1,m=[];g&&(l="\u221e");if(!g&&-1!==h.indexOf("e")){var q=h.match(/([\d\.]+)e(-?)(\d+)/);q&&"-"==q[2]&&q[3]>e+1?b=0:(l=h,k=!0)}if(g||k)0<e&&1>b&&(l=b.toFixed(e),b=parseFloat(l));else{g=(h.split(Dd)[1]||"").length;
y(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(Dd),h=g[0],g=g[1]||"",q=0,s=a.lgSize,t=a.gSize;if(h.length>=s+t)for(q=h.length-s,k=0;k<q;k++)0===(q-k)%t&&0!==k&&(l+=c),l+=h.charAt(k);for(k=q;k<h.length;k++)0===(h.length-k)%s&&0!==k&&(l+=c),l+=h.charAt(k);for(;g.length<e;)g+="0";e&&"0"!==e&&(l+=d+g.substr(0,e))}0===b&&(f=!1);m.push(f?a.negPre:a.posPre,l,f?a.negSuf:a.posSuf);return m.join("")}function Gb(b,a,c){var d="";
0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Gb(e,a,d)}}function Hb(b,a){return function(c,d){var e=c["get"+b](),f=rb(a?"SHORT"+b:b);return d[f][e]}}function Ed(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function Fd(b){return function(a){var c=Ed(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-
+c;a=1+Math.round(a/6048E5);return Gb(a,b)}}function hc(b,a){return 0>=b.getFullYear()?a.ERAS[0]:a.ERAS[1]}function zd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Y(b[9]+b[10]),g=Y(b[9]+b[11]));h.call(a,Y(b[1]),Y(b[2])-1,Y(b[3]));f=Y(b[4]||0)-f;g=Y(b[5]||0)-g;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,e,f){var g="",h=[],l,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;H(c)&&(c=fg.test(c)?Y(c):a(c));X(c)&&(c=new Date(c));if(!ca(c)||!isFinite(c.getTime()))return c;for(;e;)(k=gg.exec(e))?(h=cb(h,k,1),e=h.pop()):(h.push(e),e=null);var m=c.getTimezoneOffset();f&&(m=vc(f,c.getTimezoneOffset()),c=Ob(c,f,!0));n(h,function(a){l=hg[a];g+=l?l(c,b.DATETIME_FORMATS,m):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function ag(){return function(b,a){y(a)&&(a=2);return db(b,a)}}function bg(){return function(b,
a,c){a=Infinity===Math.abs(Number(a))?Number(a):Y(a);if(isNaN(a))return b;X(b)&&(b=b.toString());if(!K(b)&&!H(b))return b;c=!c||isNaN(c)?0:Y(c);c=0>c&&c>=-b.length?b.length+c:c;return 0<=a?b.slice(c,c+a):0===c?b.slice(a,b.length):b.slice(Math.max(0,c+a),c)}}function Bd(b){function a(a,c){c=c?-1:1;return a.map(function(a){var d=1,h=Za;if(B(a))h=a;else if(H(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))d="-"==a.charAt(0)?-1:1,a=a.substring(1);if(""!==a&&(h=b(a),h.constant))var l=h(),h=function(a){return a[l]}}return{get:h,
descending:d*c}})}function c(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}return function(b,e,f){if(!Da(b))return b;K(e)||(e=[e]);0===e.length&&(e=["+"]);var g=a(e,f);g.push({get:function(){return{}},descending:f?-1:1});b=Array.prototype.map.call(b,function(a,b){return{value:a,predicateValues:g.map(function(d){var e=d.get(a);d=typeof e;if(null===e)d="string",e="null";else if("string"===d)e=e.toLowerCase();else if("object"===d)a:{if("function"===typeof e.valueOf&&
(e=e.valueOf(),c(e)))break a;if(pc(e)&&(e=e.toString(),c(e)))break a;e=b}return{value:e,type:d}})}});b.sort(function(a,b){for(var c=0,d=0,e=g.length;d<e;++d){var c=a.predicateValues[d],f=b.predicateValues[d],t=0;c.type===f.type?c.value!==f.value&&(t=c.value<f.value?-1:1):t=c.type<f.type?-1:1;if(c=t*g[d].descending)break}return c});return b=b.map(function(a){return a.value})}}function Ma(b){B(b)&&(b={link:b});b.restrict=b.restrict||"AC";return qa(b)}function Gd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=
b.parent().controller("form")||Ib;f.$error={};f.$$success={};f.$pending=u;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){n(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){n(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ta(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=
b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];n(f.$pending,function(b,c){f.$setValidity(c,null,a)});n(f.$error,function(b,c){f.$setValidity(c,null,a)});n(f.$$success,function(b,c){f.$setValidity(c,null,a)});bb(g,a)};Hd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(bb(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Xa);d.addClass(b,Jb);
f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Xa,Jb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;n(g,function(a){a.$setPristine()})};f.$setUntouched=function(){n(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function ic(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function ib(b,a,c,d,e,f){var g=I(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",
function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=T(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",l);else{var k,m=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",
m)}a.on("change",l);d.$render=function(){var b=d.$isEmpty(d.$viewValue)?"":d.$viewValue;a.val()!==b&&a.val(b)}}function Kb(b,a){return function(c,d){var e,f;if(ca(c))return c;if(H(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(ig.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,
mm:0,ss:0,sss:0},n(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function jb(b,a,c,d){return function(e,f,g,h,l,k,m){function q(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function s(a){return x(a)?ca(a)?a:c(a):u}Id(e,f,g,h);ib(e,f,g,h,l,k);var t=h&&h.$options&&h.$options.timezone,n;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,n),t&&(b=Ob(b,t)),b):u});h.$formatters.push(function(a){if(a&&
!ca(a))throw kb("datefmt",a);if(q(a))return(n=a)&&t&&(n=Ob(n,t,!0)),m("date")(a,d,t);n=null;return""});if(x(g.min)||g.ngMin){var r;h.$validators.min=function(a){return!q(a)||y(r)||c(a)>=r};g.$observe("min",function(a){r=s(a);h.$validate()})}if(x(g.max)||g.ngMax){var w;h.$validators.max=function(a){return!q(a)||y(w)||c(a)<=w};g.$observe("max",function(a){w=s(a);h.$validate()})}}}function Id(b,a,c,d){(d.$$hasNativeValidators=D(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};
return c.badInput&&!c.typeMismatch?u:b})}function Jd(b,a,c,d,e){if(x(d)){b=b(d);if(!b.constant)throw kb("constexpr",c,d);return b(a)}return e}function jc(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){var b=[];return K(a)?(n(a,function(a){b=b.concat(e(a))}),b):H(a)?a.split(" "):D(a)?(n(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",
link:function(f,g,h){function l(a,b){var c=g.data("$classCounts")||ga(),d=[];n(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||f.$index%2===a){var k=e(b||[]);if(!m){var n=l(k,1);h.$addClass(n)}else if(!ka(b,m)){var r=e(m),n=d(k,r),k=d(r,k),n=l(n,1),k=l(k,-1);n&&n.length&&c.addClass(g,n);k&&k.length&&c.removeClass(g,k)}}m=ia(b)}var m;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==
b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}function Hd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+zc(b,"-"):"";a(lb+b,!0===c);a(Kd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[Kd]=!(f[lb]=e.hasClass(lb));d.$setValidity=function(b,e,f){e===u?(d.$pending||(d.$pending={}),g(d.$pending,
b,f)):(d.$pending&&h(d.$pending,b,f),Ld(d.$pending)&&(d.$pending=u));ab(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(Md,!0),d.$valid=d.$invalid=u,c("",null)):(a(Md,!1),d.$valid=Ld(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?u:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function Ld(b){if(b)for(var a in b)if(b.hasOwnProperty(a))return!1;return!0}var jg=/^\/(.+)\/([a-z]*)$/,
I=function(b){return H(b)?b.toLowerCase():b},Na=Object.prototype.hasOwnProperty,rb=function(b){return H(b)?b.toUpperCase():b},Va,z,la,xa=[].slice,Mf=[].splice,kg=[].push,sa=Object.prototype.toString,qc=Object.getPrototypeOf,Ea=G("ng"),aa=N.angular||(N.angular={}),Rb,mb=0;Va=W.documentMode;v.$inject=[];Za.$inject=[];var K=Array.isArray,sc=/^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/,T=function(b){return H(b)?b.trim():b},ud=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,
"\\$1").replace(/\x08/g,"\\x08")},Fa=function(){if(!x(Fa.rules)){var b=W.querySelector("[ng-csp]")||W.querySelector("[data-ng-csp]");if(b){var a=b.getAttribute("ng-csp")||b.getAttribute("data-ng-csp");Fa.rules={noUnsafeEval:!a||-1!==a.indexOf("no-unsafe-eval"),noInlineStyle:!a||-1!==a.indexOf("no-inline-style")}}else{b=Fa;try{new Function(""),a=!1}catch(c){a=!0}b.rules={noUnsafeEval:a,noInlineStyle:!1}}}return Fa.rules},ob=function(){if(x(ob.name_))return ob.name_;var b,a,c=Qa.length,d,e;for(a=0;a<
c;++a)if(d=Qa[a],b=W.querySelector("["+d.replace(":","\\:")+"jq]")){e=b.getAttribute(d+"jq");break}return ob.name_=e},Qa=["ng-","data-ng-","ng:","x-ng-"],be=/[A-Z]/g,Ac=!1,Qb,pa=1,Pa=3,fe={full:"1.4.5",major:1,minor:4,dot:5,codeName:"permanent-internship"};R.expando="ng339";var gb=R.cache={},Ef=1;R._data=function(b){return this.cache[b[this.expando]]||{}};var zf=/([\:\-\_]+(.))/g,Af=/^moz([A-Z])/,lg={mouseleave:"mouseout",mouseenter:"mouseover"},Tb=G("jqLite"),Df=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Sb=/<|&#?\w+;/,
Bf=/<([\w:]+)/,Cf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,na={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};na.optgroup=na.option;na.tbody=na.tfoot=na.colgroup=na.caption=na.thead;na.th=na.td;var Ra=R.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=
!1;"complete"===W.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),R(N).on("load",a))},toString:function(){var b=[];n(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?z(this[b]):z(this[this.length+b])},length:0,push:kg,sort:[].sort,splice:[].splice},Ab={};n("multiple selected checked disabled readOnly required open".split(" "),function(b){Ab[I(b)]=b});var Rc={};n("input select option textarea button form details".split(" "),function(b){Rc[b]=!0});var Sc=
{ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};n({data:Vb,removeData:ub,hasData:function(b){for(var a in gb[b.ng339])return!0;return!1}},function(b,a){R[a]=b});n({data:Vb,inheritedData:zb,scope:function(b){return z.data(b,"$scope")||zb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return z.data(b,"$isolateScope")||z.data(b,"$isolateScopeNoTemplate")},controller:Oc,injector:function(b){return zb(b,"$injector")},removeAttr:function(b,
a){b.removeAttribute(a)},hasClass:wb,css:function(b,a,c){a=fb(a);if(x(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=b.nodeType;if(d!==Pa&&2!==d&&8!==d)if(d=I(a),Ab[d])if(x(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||v).specified?d:u;else if(x(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?u:b},prop:function(b,a,c){if(x(c))b[a]=c;else return b[a]},text:function(){function b(a,
b){if(y(b)){var d=a.nodeType;return d===pa||d===Pa?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(y(a)){if(b.multiple&&"select"===ta(b)){var c=[];n(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(y(a))return b.innerHTML;tb(b,!0);b.innerHTML=a},empty:Pc},function(b,a){R.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Pc&&(2==b.length&&b!==wb&&b!==Oc?a:d)===u){if(D(a)){for(e=0;e<
g;e++)if(b===Vb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===u?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});n({removeData:ub,on:function a(c,d,e,f){if(x(f))throw Tb("onargs");if(Kc(c)){var g=vb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=Hf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,lg[d],function(a){var c=
a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Nc,one:function(a,c,d){a=z(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;tb(a);n(new R(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];n(a.childNodes,function(a){a.nodeType===pa&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||
[]},append:function(a,c){var d=a.nodeType;if(d===pa||11===d){c=new R(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===pa){var d=a.firstChild;n(new R(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=z(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Wb,detach:function(a){Wb(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new R(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);
d=h}},addClass:yb,removeClass:xb,toggleClass:function(a,c,d){c&&n(c.split(" "),function(c){var f=d;y(f)&&(f=!wb(a,c));(f?yb:xb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Ub,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=vb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===
this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:v,type:g,target:a},c.type&&(e=Q(e,c)),c=ia(h),f=d?[e].concat(d):[e],n(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){R.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)y(g)?(g=a(this[h],c,e,f),x(g)&&(g=z(g))):Mc(g,a(this[h],c,e,f));return x(g)?g:this};R.prototype.bind=
R.prototype.on;R.prototype.unbind=R.prototype.off});Ua.prototype={put:function(a,c){this[Ga(a,this.nextUid)]=c},get:function(a){return this[Ga(a,this.nextUid)]},remove:function(a){var c=this[a=Ga(a,this.nextUid)];delete this[a];return c}};var xf=[function(){this.$get=[function(){return Ua}]}],Uc=/^[^\(]*\(\s*([^\)]*)\)/m,mg=/,/,ng=/^\s*(_?)(\S+?)\1\s*$/,Tc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ha=G("$injector");eb.$$annotate=function(a,c,d){var e;if("function"===typeof a){if(!(e=a.$inject)){e=[];if(a.length){if(c)throw H(d)&&
d||(d=a.name||If(a)),Ha("strictdi",d);c=a.toString().replace(Tc,"");c=c.match(Uc);n(c[1].split(mg),function(a){a.replace(ng,function(a,c,d){e.push(d)})})}a.$inject=e}}else K(a)?(c=a.length-1,Sa(a[c],"fn"),e=a.slice(0,c)):Sa(a,"fn",!0);return e};var Nd=G("$animate"),Ue=function(){this.$get=["$q","$$rAF",function(a,c){function d(){}d.all=v;d.chain=v;d.prototype={end:v,cancel:v,resume:v,pause:v,complete:v,then:function(d,f){return a(function(a){c(function(){a()})}).then(d,f)}};return d}]},Te=function(){var a=
new Ua,c=[];this.$get=["$$AnimateRunner","$rootScope",function(d,e){function f(d,f,l){var k=a.get(d);k||(a.put(d,k={}),c.push(d));d=function(a,c){var d=!1;a&&(a=H(a)?a.split(" "):K(a)?a:[],n(a,function(a){a&&(d=!0,k[a]=c)}));return d};f=d(f,!0);l=d(l,!1);!f&&!l||1<c.length||e.$$postDigest(function(){n(c,function(c){var d=a.get(c);if(d){var e=Jf(c.attr("class")),f="",g="";n(d,function(a,c){a!==!!e[c]&&(a?f+=(f.length?" ":"")+c:g+=(g.length?" ":"")+c)});n(c,function(a){f&&yb(a,f);g&&xb(a,g)});a.remove(c)}});
c.length=0})}return{enabled:v,on:v,off:v,pin:v,push:function(a,c,e,k){k&&k();e=e||{};e.from&&a.css(e.from);e.to&&a.css(e.to);(e.addClass||e.removeClass)&&f(a,e.addClass,e.removeClass);return new d}}}]},Re=["$provide",function(a){var c=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,e){if(d&&"."!==d.charAt(0))throw Nd("notcsel",d);var f=d+"-animation";c.$$registeredAnimations[d.substr(1)]=f;a.factory(f,e)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=
a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Nd("nongcls","ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",function(a){function c(a,d,e){if(e){var l;a:{for(l=0;l<e.length;l++){var k=e[l];if(1===k.nodeType){l=k;break a}}l=void 0}!l||l.parentNode||l.previousElementSibling||(e=null)}e?e.after(a):d.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(f,g,h,l){g=
g&&z(g);h=h&&z(h);g=g||h.parent();c(f,g,h);return a.push(f,"enter",Ia(l))},move:function(f,g,h,l){g=g&&z(g);h=h&&z(h);g=g||h.parent();c(f,g,h);return a.push(f,"move",Ia(l))},leave:function(c,e){return a.push(c,"leave",Ia(e),function(){c.remove()})},addClass:function(c,e,h){h=Ia(h);h.addClass=hb(h.addclass,e);return a.push(c,"addClass",h)},removeClass:function(c,e,h){h=Ia(h);h.removeClass=hb(h.removeClass,e);return a.push(c,"removeClass",h)},setClass:function(c,e,h,l){l=Ia(l);l.addClass=hb(l.addClass,
e);l.removeClass=hb(l.removeClass,h);return a.push(c,"setClass",l)},animate:function(c,e,h,l,k){k=Ia(k);k.from=k.from?Q(k.from,e):e;k.to=k.to?Q(k.to,h):h;k.tempClasses=hb(k.tempClasses,l||"ng-inline-animate");return a.push(c,"animate",k)}}}]}],Se=function(){this.$get=["$$rAF","$q",function(a,c){var d=function(){};d.prototype={done:function(a){this.defer&&this.defer[!0===a?"reject":"resolve"]()},end:function(){this.done()},cancel:function(){this.done(!0)},getPromise:function(){this.defer||(this.defer=
c.defer());return this.defer.promise},then:function(a,c){return this.getPromise().then(a,c)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)}};return function(c,f){function g(){a(function(){f.addClass&&(c.addClass(f.addClass),f.addClass=null);f.removeClass&&(c.removeClass(f.removeClass),f.removeClass=null);f.to&&(c.css(f.to),f.to=null);h||l.done();h=!0});return l}f.from&&(c.css(f.from),f.from=null);var h,l=new d;return{start:g,
end:g}}}]},ea=G("$compile");Cc.$inject=["$provide","$$sanitizeUriProvider"];var Xc=/^((?:x|data)[\:\-_])/i,Nf=G("$controller"),Vc=/^(\S+)(\s+as\s+(\w+))?$/,$e=function(){this.$get=["$document",function(a){return function(c){c?!c.nodeType&&c instanceof z&&(c=c[0]):c=a[0].body;return c.offsetWidth+1}}]},bd="application/json",$b={"Content-Type":bd+";charset=utf-8"},Pf=/^\[|^\{(?!\{)/,Qf={"[":/]$/,"{":/}$/},Of=/^\)\]\}',?\n/,og=G("$http"),fd=function(a){return function(){throw og("legacy",a);}},Ka=aa.$interpolateMinErr=
G("$interpolate");Ka.throwNoconcat=function(a){throw Ka("noconcat",a);};Ka.interr=function(a,c){return Ka("interr",a,c.toString())};var pg=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,Tf={http:80,https:443,ftp:21},Db=G("$location"),qg={$$html5:!1,$$replace:!1,absUrl:Eb("$$absUrl"),url:function(a){if(y(a))return this.$$url;var c=pg.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Eb("$$protocol"),host:Eb("$$host"),
port:Eb("$$port"),path:kd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(H(a)||X(a))a=a.toString(),this.$$search=xc(a);else if(D(a))a=fa(a,{}),n(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Db("isrcharg");break;default:y(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:kd("$$hash",function(a){return null!==a?a.toString():
""}),replace:function(){this.$$replace=!0;return this}};n([jd,cc,bc],function(a){a.prototype=Object.create(qg);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==bc||!this.$$html5)throw Db("nostate");this.$$state=y(c)?null:c;return this}});var da=G("$parse"),Uf=Function.prototype.call,Vf=Function.prototype.apply,Wf=Function.prototype.bind,Lb=ga();n("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Lb[a]=!0});var rg={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v",
"'":"'",'"':'"'},ec=function(a){this.options=a};ec.prototype={constructor:ec,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+
this.peek(),d=c+this.peek(2),e=Lb[c],f=Lb[d];Lb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===
a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=x(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw da("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=I(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&
this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,
text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=rg[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,
value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var r=function(a,c){this.lexer=a;this.options=c};r.Program="Program";r.ExpressionStatement="ExpressionStatement";r.AssignmentExpression="AssignmentExpression";r.ConditionalExpression="ConditionalExpression";r.LogicalExpression="LogicalExpression";r.BinaryExpression="BinaryExpression";r.UnaryExpression="UnaryExpression";r.CallExpression="CallExpression";r.MemberExpression="MemberExpression";r.Identifier="Identifier";r.Literal=
"Literal";r.ArrayExpression="ArrayExpression";r.Property="Property";r.ObjectExpression="ObjectExpression";r.ThisExpression="ThisExpression";r.NGValueParameter="NGValueParameter";r.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:r.Program,
body:a}},expressionStatement:function(){return{type:r.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();this.expect("=")&&(a={type:r.AssignmentExpression,left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),c,d;return this.expect("?")&&(c=this.expression(),this.consume(":"))?
(d=this.expression(),{type:r.ConditionalExpression,test:a,alternate:c,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:r.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:r.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a={type:r.BinaryExpression,
operator:c.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a={type:r.BinaryExpression,operator:c.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a={type:r.BinaryExpression,operator:c.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a={type:r.BinaryExpression,operator:c.text,
left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:r.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.constants.hasOwnProperty(this.peek().text)?a=fa(this.constants[this.consume().text]):this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():
this.throwError("not a primary expression",this.peek());for(var c;c=this.expect("(","[",".");)"("===c.text?(a={type:r.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===c.text?(a={type:r.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===c.text?a={type:r.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var c={type:r.CallExpression,callee:this.identifier(),
arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return c},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.expression());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:r.Identifier,name:a.text}},constant:function(){return{type:r.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:r.ArrayExpression,elements:a}},object:function(){var a=[],c;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;c={type:r.Property,kind:"init"};this.peek().constant?c.key=this.constant():this.peek().identifier?c.key=this.identifier():this.throwError("invalid key",this.peek());this.consume(":");c.value=this.expression();a.push(c)}while(this.expect(","))}this.consume("}");return{type:r.ObjectExpression,properties:a}},
throwError:function(a,c){throw da("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},consume:function(a){if(0===this.tokens.length)throw da("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},peekToken:function(){if(0===this.tokens.length)throw da("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];
var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},constants:{"true":{type:r.Literal,value:!0},"false":{type:r.Literal,value:!1},"null":{type:r.Literal,value:null},undefined:{type:r.Literal,value:u},"this":{type:r.ThisExpression}}};rd.prototype={compile:function(a,c){var d=this,e=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:c,fn:{vars:[],body:[],own:{}},assign:{vars:[],
body:[],own:{}},inputs:[]};U(e,d.$filter);var f="",g;this.stage="assign";if(g=pd(e))this.state.computing="assign",f=this.nextId(),this.recurse(g,f),f="fn.assign="+this.generateFunction("assign","s,v,l");g=nd(e.body);d.stage="inputs";n(g,function(a,c){var e="fn"+c;d.state[e]={vars:[],body:[],own:{}};d.state.computing=e;var f=d.nextId();d.recurse(a,f);d.return_(f);d.state.inputs.push(e);a.watchId=c});this.state.computing="fn";this.stage="main";this.recurse(e);f='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+
"var fn="+this.generateFunction("fn","s,l,a,i")+f+this.watchFns()+"return fn;";f=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","ifDefined","plus","text",f))(this.$filter,Wa,Ba,ld,Xf,md,a);this.state=this.stage=u;f.literal=qd(e);f.constant=e.constant;return f},USE:"use",STRICT:"strict",watchFns:function(){var a=[],c=this.state.inputs,d=this;n(c,function(c){a.push("var "+c+"="+d.generateFunction(c,"s"))});c.length&&a.push("fn.inputs=["+c.join(",")+"];");return a.join("")},
generateFunction:function(a,c){return"function("+c+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],c=this;n(this.state.filters,function(d,e){a.push(d+"=$filter("+c.escape(e)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,c,d,e,f,g){var h,l,k=this,m,q;e=e||v;if(!g&&x(a.watchId))c=c||this.nextId(),this.if_("i",
this.lazyAssign(c,this.computedMember("i",a.watchId)),this.lazyRecurse(a,c,d,e,f,!0));else switch(a.type){case r.Program:n(a.body,function(c,d){k.recurse(c.expression,u,u,function(a){l=a});d!==a.body.length-1?k.current().body.push(l,";"):k.return_(l)});break;case r.Literal:q=this.escape(a.value);this.assign(c,q);e(q);break;case r.UnaryExpression:this.recurse(a.argument,u,u,function(a){l=a});q=a.operator+"("+this.ifDefined(l,0)+")";this.assign(c,q);e(q);break;case r.BinaryExpression:this.recurse(a.left,
u,u,function(a){h=a});this.recurse(a.right,u,u,function(a){l=a});q="+"===a.operator?this.plus(h,l):"-"===a.operator?this.ifDefined(h,0)+a.operator+this.ifDefined(l,0):"("+h+")"+a.operator+"("+l+")";this.assign(c,q);e(q);break;case r.LogicalExpression:c=c||this.nextId();k.recurse(a.left,c);k.if_("&&"===a.operator?c:k.not(c),k.lazyRecurse(a.right,c));e(c);break;case r.ConditionalExpression:c=c||this.nextId();k.recurse(a.test,c);k.if_(c,k.lazyRecurse(a.alternate,c),k.lazyRecurse(a.consequent,c));e(c);
break;case r.Identifier:c=c||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Wa(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||"s",function(){f&&1!==f&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(c,k.nonComputedMember("s",a.name))})},c&&k.lazyAssign(c,k.nonComputedMember("l",
a.name)));(k.state.expensiveChecks||Fb(a.name))&&k.addEnsureSafeObject(c);e(c);break;case r.MemberExpression:h=d&&(d.context=this.nextId())||this.nextId();c=c||this.nextId();k.recurse(a.object,h,u,function(){k.if_(k.notNull(h),function(){if(a.computed)l=k.nextId(),k.recurse(a.property,l),k.addEnsureSafeMemberName(l),f&&1!==f&&k.if_(k.not(k.computedMember(h,l)),k.lazyAssign(k.computedMember(h,l),"{}")),q=k.ensureSafeObject(k.computedMember(h,l)),k.assign(c,q),d&&(d.computed=!0,d.name=l);else{Wa(a.property.name);
f&&1!==f&&k.if_(k.not(k.nonComputedMember(h,a.property.name)),k.lazyAssign(k.nonComputedMember(h,a.property.name),"{}"));q=k.nonComputedMember(h,a.property.name);if(k.state.expensiveChecks||Fb(a.property.name))q=k.ensureSafeObject(q);k.assign(c,q);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(c,"undefined")});e(c)},!!f);break;case r.CallExpression:c=c||this.nextId();a.filter?(l=k.filter(a.callee.name),m=[],n(a.arguments,function(a){var c=k.nextId();k.recurse(a,c);m.push(c)}),q=l+
"("+m.join(",")+")",k.assign(c,q),e(c)):(l=k.nextId(),h={},m=[],k.recurse(a.callee,l,h,function(){k.if_(k.notNull(l),function(){k.addEnsureSafeFunction(l);n(a.arguments,function(a){k.recurse(a,k.nextId(),u,function(a){m.push(k.ensureSafeObject(a))})});h.name?(k.state.expensiveChecks||k.addEnsureSafeObject(h.context),q=k.member(h.context,h.name,h.computed)+"("+m.join(",")+")"):q=l+"("+m.join(",")+")";q=k.ensureSafeObject(q);k.assign(c,q)},function(){k.assign(c,"undefined")});e(c)}));break;case r.AssignmentExpression:l=
this.nextId();h={};if(!od(a.left))throw da("lval");this.recurse(a.left,u,h,function(){k.if_(k.notNull(h.context),function(){k.recurse(a.right,l);k.addEnsureSafeObject(k.member(h.context,h.name,h.computed));q=k.member(h.context,h.name,h.computed)+a.operator+l;k.assign(c,q);e(c||q)})},1);break;case r.ArrayExpression:m=[];n(a.elements,function(a){k.recurse(a,k.nextId(),u,function(a){m.push(a)})});q="["+m.join(",")+"]";this.assign(c,q);e(q);break;case r.ObjectExpression:m=[];n(a.properties,function(a){k.recurse(a.value,
k.nextId(),u,function(c){m.push(k.escape(a.key.type===r.Identifier?a.key.name:""+a.key.value)+":"+c)})});q="{"+m.join(",")+"}";this.assign(c,q);e(q);break;case r.ThisExpression:this.assign(c,"s");e("s");break;case r.NGValueParameter:this.assign(c,"v"),e("v")}},getHasOwnProperty:function(a,c){var d=a+"."+c,e=this.current().own;e.hasOwnProperty(d)||(e[d]=this.nextId(!1,a+"&&("+this.escape(c)+" in "+a+")"));return e[d]},assign:function(a,c){if(a)return this.current().body.push(a,"=",c,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||
(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,c){return"ifDefined("+a+","+this.escape(c)+")"},plus:function(a,c){return"plus("+a+","+c+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,c,d){if(!0===a)c();else{var e=this.current().body;e.push("if(",a,"){");c();e.push("}");d&&(e.push("else{"),d(),e.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,c){return a+
"."+c},computedMember:function(a,c){return a+"["+c+"]"},member:function(a,c,d){return d?this.computedMember(a,c):this.nonComputedMember(a,c)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+
a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},lazyRecurse:function(a,c,d,e,f,g){var h=this;return function(){h.recurse(a,c,d,e,f,g)}},lazyAssign:function(a,c){var d=this;return function(){d.assign(a,c)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(H(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(X(a))return a.toString();if(!0===a)return"true";
if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw da("esc");},nextId:function(a,c){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(c?"="+c:""));return d},current:function(){return this.state[this.state.computing]}};sd.prototype={compile:function(a,c){var d=this,e=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=c;U(e,d.$filter);var f,g;if(f=pd(e))g=this.recurse(f);f=nd(e.body);var h;f&&(h=[],n(f,function(a,c){var e=d.recurse(a);
a.input=e;h.push(e);a.watchId=c}));var l=[];n(e.body,function(a){l.push(d.recurse(a.expression))});f=0===e.body.length?function(){}:1===e.body.length?l[0]:function(a,c){var d;n(l,function(e){d=e(a,c)});return d};g&&(f.assign=function(a,c,d){return g(a,d,c)});h&&(f.inputs=h);f.literal=qd(e);f.constant=e.constant;return f},recurse:function(a,c,d){var e,f,g=this,h;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case r.Literal:return this.value(a.value,c);case r.UnaryExpression:return f=
this.recurse(a.argument),this["unary"+a.operator](f,c);case r.BinaryExpression:return e=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](e,f,c);case r.LogicalExpression:return e=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](e,f,c);case r.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),c);case r.Identifier:return Wa(a.name,g.expression),g.identifier(a.name,g.expensiveChecks||Fb(a.name),
c,d,g.expression);case r.MemberExpression:return e=this.recurse(a.object,!1,!!d),a.computed||(Wa(a.property.name,g.expression),f=a.property.name),a.computed&&(f=this.recurse(a.property)),a.computed?this.computedMember(e,f,c,d,g.expression):this.nonComputedMember(e,f,g.expensiveChecks,c,d,g.expression);case r.CallExpression:return h=[],n(a.arguments,function(a){h.push(g.recurse(a))}),a.filter&&(f=this.$filter(a.callee.name)),a.filter||(f=this.recurse(a.callee,!0)),a.filter?function(a,d,e,g){for(var n=
[],t=0;t<h.length;++t)n.push(h[t](a,d,e,g));a=f.apply(u,n,g);return c?{context:u,name:u,value:a}:a}:function(a,d,e,q){var n=f(a,d,e,q),t;if(null!=n.value){Ba(n.context,g.expression);ld(n.value,g.expression);t=[];for(var r=0;r<h.length;++r)t.push(Ba(h[r](a,d,e,q),g.expression));t=Ba(n.value.apply(n.context,t),g.expression)}return c?{value:t}:t};case r.AssignmentExpression:return e=this.recurse(a.left,!0,1),f=this.recurse(a.right),function(a,d,h,q){var n=e(a,d,h,q);a=f(a,d,h,q);Ba(n.value,g.expression);
n.context[n.name]=a;return c?{value:a}:a};case r.ArrayExpression:return h=[],n(a.elements,function(a){h.push(g.recurse(a))}),function(a,d,e,f){for(var g=[],n=0;n<h.length;++n)g.push(h[n](a,d,e,f));return c?{value:g}:g};case r.ObjectExpression:return h=[],n(a.properties,function(a){h.push({key:a.key.type===r.Identifier?a.key.name:""+a.key.value,value:g.recurse(a.value)})}),function(a,d,e,f){for(var g={},n=0;n<h.length;++n)g[h[n].key]=h[n].value(a,d,e,f);return c?{value:g}:g};case r.ThisExpression:return function(a){return c?
{value:a}:a};case r.NGValueParameter:return function(a,d,e,f){return c?{value:e}:e}}},"unary+":function(a,c){return function(d,e,f,g){d=a(d,e,f,g);d=x(d)?+d:0;return c?{value:d}:d}},"unary-":function(a,c){return function(d,e,f,g){d=a(d,e,f,g);d=x(d)?-d:0;return c?{value:d}:d}},"unary!":function(a,c){return function(d,e,f,g){d=!a(d,e,f,g);return c?{value:d}:d}},"binary+":function(a,c,d){return function(e,f,g,h){var l=a(e,f,g,h);e=c(e,f,g,h);l=md(l,e);return d?{value:l}:l}},"binary-":function(a,c,d){return function(e,
f,g,h){var l=a(e,f,g,h);e=c(e,f,g,h);l=(x(l)?l:0)-(x(e)?e:0);return d?{value:l}:l}},"binary*":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)*c(e,f,g,h);return d?{value:e}:e}},"binary/":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)/c(e,f,g,h);return d?{value:e}:e}},"binary%":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)%c(e,f,g,h);return d?{value:e}:e}},"binary===":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)===c(e,f,g,h);return d?{value:e}:e}},"binary!==":function(a,
c,d){return function(e,f,g,h){e=a(e,f,g,h)!==c(e,f,g,h);return d?{value:e}:e}},"binary==":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)==c(e,f,g,h);return d?{value:e}:e}},"binary!=":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)!=c(e,f,g,h);return d?{value:e}:e}},"binary<":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)<c(e,f,g,h);return d?{value:e}:e}},"binary>":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)>c(e,f,g,h);return d?{value:e}:e}},"binary<=":function(a,c,d){return function(e,
f,g,h){e=a(e,f,g,h)<=c(e,f,g,h);return d?{value:e}:e}},"binary>=":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)>=c(e,f,g,h);return d?{value:e}:e}},"binary&&":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)&&c(e,f,g,h);return d?{value:e}:e}},"binary||":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)||c(e,f,g,h);return d?{value:e}:e}},"ternary?:":function(a,c,d,e){return function(f,g,h,l){f=a(f,g,h,l)?c(f,g,h,l):d(f,g,h,l);return e?{value:f}:f}},value:function(a,c){return function(){return c?
{context:u,name:u,value:a}:a}},identifier:function(a,c,d,e,f){return function(g,h,l,k){g=h&&a in h?h:g;e&&1!==e&&g&&!g[a]&&(g[a]={});h=g?g[a]:u;c&&Ba(h,f);return d?{context:g,name:a,value:h}:h}},computedMember:function(a,c,d,e,f){return function(g,h,l,k){var m=a(g,h,l,k),q,n;null!=m&&(q=c(g,h,l,k),Wa(q,f),e&&1!==e&&m&&!m[q]&&(m[q]={}),n=m[q],Ba(n,f));return d?{context:m,name:q,value:n}:n}},nonComputedMember:function(a,c,d,e,f,g){return function(h,l,k,m){h=a(h,l,k,m);f&&1!==f&&h&&!h[c]&&(h[c]={});
l=null!=h?h[c]:u;(d||Fb(c))&&Ba(l,g);return e?{context:h,name:c,value:l}:l}},inputs:function(a,c){return function(d,e,f,g){return g?g[c]:a(d,e,f)}}};var fc=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d;this.ast=new r(this.lexer);this.astCompiler=d.csp?new sd(this.ast,c):new rd(this.ast,c)};fc.prototype={constructor:fc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};ga();ga();var Yf=Object.prototype.valueOf,Ca=G("$sce"),oa={HTML:"html",CSS:"css",URL:"url",
RESOURCE_URL:"resourceUrl",JS:"js"},ea=G("$compile"),Z=W.createElement("a"),wd=Aa(N.location.href);xd.$inject=["$document"];Jc.$inject=["$provide"];yd.$inject=["$locale"];Ad.$inject=["$locale"];var Dd=".",hg={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:Hb("Month"),MMM:Hb("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",
1),sss:$("Milliseconds",3),EEEE:Hb("Day"),EEE:Hb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a,c,d){a=-1*d;return a=(0<=a?"+":"")+(Gb(Math[0<a?"floor":"ceil"](a/60),2)+Gb(Math.abs(a%60),2))},ww:Fd(2),w:Fd(1),G:hc,GG:hc,GGG:hc,GGGG:function(a,c){return 0>=a.getFullYear()?c.ERANAMES[0]:c.ERANAMES[1]}},gg=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,fg=/^\-?\d+$/;zd.$inject=["$locale"];var cg=qa(I),dg=qa(rb);Bd.$inject=
["$parse"];var he=qa({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref)return function(a,c){if("a"===c[0].nodeName.toLowerCase()){var f="[object SVGAnimatedString]"===sa.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}}),sb={};n(Ab,function(a,c){function d(a,d,f){a.$watch(f[e],function(a){f.$set(c,!!a)})}if("multiple"!=a){var e=va("ng-"+c),f=d;"checked"===a&&(f=function(a,c,f){f.ngModel!==f[e]&&d(a,c,f)});sb[e]=function(){return{restrict:"A",
priority:100,link:f}}}});n(Sc,function(a,c){sb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(jg))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});n(["src","srcset","href"],function(a){var c=va("ng-"+a);sb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===sa.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",
g=null);f.$observe(c,function(c){c?(f.$set(h,c),Va&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Ib={$addControl:v,$$renameControl:function(a,c){a.$name=c},$removeControl:v,$setValidity:v,$setDirty:v,$setPristine:v,$setSubmitted:v};Gd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Od=function(a){return["$timeout","$parse",function(c,d){function e(a){return""===a?d('this[""]').assign:d(a).assign||v}return{name:"form",restrict:a?"EAC":"E",controller:Gd,compile:function(d,
g){d.addClass(Xa).addClass(lb);var h=g.name?"name":a&&g.ngForm?"ngForm":!1;return{pre:function(a,d,f,g){if(!("action"in f)){var n=function(c){a.$apply(function(){g.$commitViewValue();g.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",n,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",n,!1)},0,!1)})}var t=g.$$parentForm,r=h?e(g.$name):v;h&&(r(a,g),f.$observe(h,function(c){g.$name!==c&&(r(a,u),t.$$renameControl(g,c),r=e(g.$name),r(a,g))}));d.on("$destroy",
function(){t.$removeControl(g);r(a,u);Q(g,Ib)})}}}}}]},ie=Od(),ve=Od(!0),ig=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,sg=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,tg=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,ug=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Pd=/^(\d{4})-(\d{2})-(\d{2})$/,Qd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,kc=/^(\d{4})-W(\d\d)$/,
Rd=/^(\d{4})-(\d\d)$/,Sd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Td={text:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);ic(e)},date:jb("date",Pd,Kb(Pd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":jb("datetimelocal",Qd,Kb(Qd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:jb("time",Sd,Kb(Sd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:jb("week",kc,function(a,c){if(ca(a))return a;if(H(a)){kc.lastIndex=0;var d=kc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=Ed(e),f=7*(f-1);
c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:jb("month",Rd,Kb(Rd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){Id(a,c,d,e);ib(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:ug.test(a)?parseFloat(a):u});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!X(a))throw kb("numfmt",a);a=a.toString()}return a});if(x(d.min)||d.ngMin){var h;e.$validators.min=
function(a){return e.$isEmpty(a)||y(h)||a>=h};d.$observe("min",function(a){x(a)&&!X(a)&&(a=parseFloat(a,10));h=X(a)&&!isNaN(a)?a:u;e.$validate()})}if(x(d.max)||d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||y(l)||a<=l};d.$observe("max",function(a){x(a)&&!X(a)&&(a=parseFloat(a,10));l=X(a)&&!isNaN(a)?a:u;e.$validate()})}},url:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);ic(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||sg.test(d)}},email:function(a,
c,d,e,f,g){ib(a,c,d,e,f,g);ic(e);e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||tg.test(d)}},radio:function(a,c,d,e){y(d.name)&&c.attr("name",++mb);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=Jd(l,a,"ngTrueValue",d.ngTrueValue,!0),m=Jd(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,
a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return ka(a,k)});e.$parsers.push(function(a){return a?k:m})},hidden:v,button:v,submit:v,reset:v,file:v},Dc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Td[I(h.type)]||Td.text)(f,g,h,l[0],c,a,d,e)}}}}],vg=/^(true|false|\d+)$/,Ne=function(){return{restrict:"A",priority:100,compile:function(a,
c){return vg.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},ne=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===u?"":a})}}}}],pe=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));
c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===u?"":a})}}}}],oe=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],Me=qa({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
qe=jc("",!0),se=jc("Odd",0),re=jc("Even",1),te=Ma({compile:function(a,c){c.$set("ngCloak",u);a.removeClass("ng-cloak")}}),ue=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Ic={},wg={blur:!0,focus:!0};n("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=va("ng-"+a);Ic[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=
d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};wg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var xe=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=W.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=
qb(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],ye=["$templateRequest","$anchorScroll","$animate",function(a,c,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:aa.noop,compile:function(e,f){var g=f.ngInclude||f.src,h=f.onload||"",l=f.autoscroll;return function(e,f,n,s,r){var u=0,v,w,p,A=function(){w&&(w.remove(),w=null);v&&(v.$destroy(),v=null);p&&(d.leave(p).then(function(){w=null}),w=p,p=null)};e.$watch(g,function(g){var n=function(){!x(l)||l&&!e.$eval(l)||
c()},q=++u;g?(a(g,!0).then(function(a){if(q===u){var c=e.$new();s.template=a;a=r(c,function(a){A();d.enter(a,null,f).then(n)});v=c;p=a;v.$emit("$includeContentLoaded",g);e.$eval(h)}},function(){q===u&&(A(),e.$emit("$includeContentError",g))}),e.$emit("$includeContentRequested",g)):(A(),s.template=null)})}}}}],Pe=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Lc(f.template,W).childNodes)(c,function(a){d.append(a)},
{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ze=Ma({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),Le=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?T(f):f;e.$parsers.push(function(a){if(!y(a)){var c=[];a&&n(a.split(h),function(a){a&&c.push(g?T(a):a)});return c}});e.$formatters.push(function(a){return K(a)?a.join(f):u});e.$isEmpty=function(a){return!a||
!a.length}}}},lb="ng-valid",Kd="ng-invalid",Xa="ng-pristine",Jb="ng-dirty",Md="ng-pending",kb=G("ngModel"),xg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,m){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=u;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;
this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=u;this.$name=m(d.name||"",!1)(a);var q=f(d.ngModel),s=q.assign,r=q,E=s,L=null,w,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");r=function(a){var d=q(a);B(d)&&(d=c(a));return d};E=function(a,c){B(q(a))?g(a,{$$$p:p.$modelValue}):s(a,p.$modelValue)}}else if(!q.assign)throw kb("nonassign",d.ngModel,ua(e));};this.$render=v;this.$isEmpty=function(a){return y(a)||
""===a||null===a||a!==a};var A=e.inheritedData("$formController")||Ib,z=0;Hd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:A,$animate:g});this.$setPristine=function(){p.$dirty=!1;p.$pristine=!0;g.removeClass(e,Jb);g.addClass(e,Xa)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;g.removeClass(e,Xa);g.addClass(e,Jb);A.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=
function(){p.$touched=!0;p.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(L);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!X(p.$modelValue)||!isNaN(p.$modelValue)){var a=p.$$rawModelValue,c=p.$valid,d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$runValidators(a,p.$$lastCommittedViewValue,function(f){e||c===f||(p.$modelValue=f?a:u,p.$modelValue!==d&&p.$$writeModelToScope())})}};this.$$runValidators=
function(a,c,d){function e(){var d=!0;n(p.$validators,function(e,f){var h=e(a,c);d=d&&h;g(f,h)});return d?!0:(n(p.$asyncValidators,function(a,c){g(c,null)}),!1)}function f(){var d=[],e=!0;n(p.$asyncValidators,function(f,h){var k=f(a,c);if(!k||!B(k.then))throw kb("$asyncValidators",k);g(h,u);d.push(k.then(function(){g(h,!0)},function(a){e=!1;g(h,!1)}))});d.length?k.all(d).then(function(){h(e)},v):h(!0)}function g(a,c){l===z&&p.$setValidity(a,c)}function h(a){l===z&&d(a)}z++;var l=z;(function(){var a=
p.$$parserName||"parse";if(w===u)g(a,null);else return w||(n(p.$validators,function(a,c){g(c,null)}),n(p.$asyncValidators,function(a,c){g(c,null)})),g(a,w),w;return!0})()?e()?f():h(!1):h(!1)};this.$commitViewValue=function(){var a=p.$viewValue;h.cancel(L);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=p.$$lastCommittedViewValue;if(w=y(c)?u:!0)for(var d=
0;d<p.$parsers.length;d++)if(c=p.$parsers[d](c),y(c)){w=!1;break}X(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=r(a));var e=p.$modelValue,f=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=c;f&&(p.$modelValue=c,p.$modelValue!==e&&p.$$writeModelToScope());p.$$runValidators(c,p.$$lastCommittedViewValue,function(a){f||(p.$modelValue=a?c:u,p.$modelValue!==e&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){E(a,p.$modelValue);n(p.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};
this.$setViewValue=function(a,c){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=p.$options;e&&x(e.debounce)&&(e=e.debounce,X(e)?d=e:X(e[c])?d=e[c]:X(e["default"])&&(d=e["default"]));h.cancel(L);d?L=h(function(){p.$commitViewValue()},d):l.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var c=r(a);if(c!==p.$modelValue&&(p.$modelValue===p.$modelValue||c===c)){p.$modelValue=
p.$$rawModelValue=c;w=u;for(var d=p.$formatters,e=d.length,f=c;e--;)f=d[e](f);p.$viewValue!==f&&(p.$viewValue=p.$$lastCommittedViewValue=f,p.$render(),p.$$runValidators(c,f,v))}return c})}],Ke=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:xg,priority:1,compile:function(c){c.addClass(Xa).addClass("ng-untouched").addClass(lb);return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Ib;h.$$setOptions(g[2]&&g[2].$options);l.$addControl(h);f.$observe("name",
function(a){h.$name!==a&&l.$$renameControl(h,a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],yg=/(\s+|^)default(\s+|$)/,Oe=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=fa(a.$eval(c.ngModelOptions));
this.$options.updateOn!==u?(this.$options.updateOnDefault=!1,this.$options.updateOn=T(this.$options.updateOn.replace(yg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Ae=Ma({terminal:!0,priority:1E3}),zg=G("ngOptions"),Ag=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
Ie=["$compile","$parse",function(a,c){function d(a,d,e){function f(a,c,d,e,g){this.selectValue=a;this.viewValue=c;this.label=d;this.group=e;this.disabled=g}function m(a){var c;if(!r&&Da(a))c=a;else{c=[];for(var d in a)a.hasOwnProperty(d)&&"$"!==d.charAt(0)&&c.push(d)}return c}var n=a.match(Ag);if(!n)throw zg("iexp",a,ua(d));var s=n[5]||n[7],r=n[6];a=/ as /.test(n[0])&&n[1];var u=n[9];d=c(n[2]?n[1]:s);var v=a&&c(a)||d,w=u&&c(u),p=u?function(a,c){return w(e,c)}:function(a){return Ga(a)},A=function(a,
c){return p(a,B(a,c))},x=c(n[2]||n[1]),z=c(n[3]||""),y=c(n[4]||""),J=c(n[8]),F={},B=r?function(a,c){F[r]=c;F[s]=a;return F}:function(a){F[s]=a;return F};return{trackBy:u,getTrackByValue:A,getWatchables:c(J,function(a){var c=[];a=a||[];for(var d=m(a),f=d.length,g=0;g<f;g++){var h=a===d?g:d[g],k=B(a[h],h),h=p(a[h],k);c.push(h);if(n[2]||n[1])h=x(e,k),c.push(h);n[4]&&(k=y(e,k),c.push(k))}return c}),getOptions:function(){for(var a=[],c={},d=J(e)||[],g=m(d),h=g.length,n=0;n<h;n++){var q=d===g?n:g[n],s=
B(d[q],q),r=v(e,s),q=p(r,s),t=x(e,s),w=z(e,s),s=y(e,s),r=new f(q,r,t,w,s);a.push(r);c[q]=r}return{items:a,selectValueMap:c,getOptionFromViewValue:function(a){return c[A(a)]},getViewValueFromOption:function(a){return u?aa.copy(a.viewValue):a.viewValue}}}}}var e=W.createElement("option"),f=W.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","?ngModel"],link:function(c,h,l,k){function m(a,c){a.element=c;c.disabled=a.disabled;a.value!==c.value&&(c.value=a.selectValue);a.label!==
c.label&&(c.label=a.label,c.textContent=a.label)}function q(a,c,d,e){c&&I(c.nodeName)===d?d=c:(d=e.cloneNode(!1),c?a.insertBefore(d,c):a.appendChild(d));return d}function s(a){for(var c;a;)c=a.nextSibling,Wb(a),a=c}function r(a){var c=p&&p[0],d=J&&J[0];if(c||d)for(;a&&(a===c||a===d);)a=a.nextSibling;return a}function u(){var a=F&&w.readValue();F=D.getOptions();var c={},d=h[0].firstChild;O&&h.prepend(p);d=r(d);F.items.forEach(function(a){var g,k;a.group?(g=c[a.group],g||(g=q(h[0],d,"optgroup",f),d=
g.nextSibling,g.label=a.group,g=c[a.group]={groupElement:g,currentOptionElement:g.firstChild}),k=q(g.groupElement,g.currentOptionElement,"option",e),m(a,k),g.currentOptionElement=k.nextSibling):(k=q(h[0],d,"option",e),m(a,k),d=k.nextSibling)});Object.keys(c).forEach(function(a){s(c[a].currentOptionElement)});s(d);v.$render();if(!v.$isEmpty(a)){var g=w.readValue();(D.trackBy?ka(a,g):a===g)||(v.$setViewValue(g),v.$render())}}var v=k[1];if(v){var w=k[0];k=l.multiple;for(var p,x=0,y=h.children(),B=y.length;x<
B;x++)if(""===y[x].value){p=y.eq(x);break}var O=!!p,J=z(e.cloneNode(!1));J.val("?");var F,D=d(l.ngOptions,h,c);k?(v.$isEmpty=function(a){return!a||0===a.length},w.writeValue=function(a){F.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){(a=F.getOptionFromViewValue(a))&&!a.disabled&&(a.element.selected=!0)})},w.readValue=function(){var a=h.val()||[],c=[];n(a,function(a){(a=F.selectValueMap[a])&&!a.disabled&&c.push(F.getViewValueFromOption(a))});return c},D.trackBy&&c.$watchCollection(function(){if(K(v.$viewValue))return v.$viewValue.map(function(a){return D.getTrackByValue(a)})},
function(){v.$render()})):(w.writeValue=function(a){var c=F.getOptionFromViewValue(a);c&&!c.disabled?h[0].value!==c.selectValue&&(J.remove(),O||p.remove(),h[0].value=c.selectValue,c.element.selected=!0,c.element.setAttribute("selected","selected")):null===a||O?(J.remove(),O||h.prepend(p),h.val(""),p.prop("selected",!0),p.attr("selected",!0)):(O||p.remove(),h.prepend(J),h.val("?"),J.prop("selected",!0),J.attr("selected",!0))},w.readValue=function(){var a=F.selectValueMap[h.val()];return a&&!a.disabled?
(O||p.remove(),J.remove(),F.getViewValueFromOption(a)):null},D.trackBy&&c.$watch(function(){return D.getTrackByValue(v.$viewValue)},function(){v.$render()}));O?(p.remove(),a(p)(c),p.removeClass("ng-scope")):p=z(e.cloneNode(!1));u();c.$watchCollection(D.getWatchables,u)}}}}],Be=["$locale","$interpolate","$log",function(a,c,d){var e=/{}/g,f=/^when(Minus)?(.+)$/;return{link:function(g,h,l){function k(a){h.text(a||"")}var m=l.count,q=l.$attr.when&&h.attr(l.$attr.when),s=l.offset||0,r=g.$eval(q)||{},u=
{},x=c.startSymbol(),w=c.endSymbol(),p=x+m+"-"+s+w,A=aa.noop,z;n(l,function(a,c){var d=f.exec(c);d&&(d=(d[1]?"-":"")+I(d[2]),r[d]=h.attr(l.$attr[c]))});n(r,function(a,d){u[d]=c(a.replace(e,p))});g.$watch(m,function(c){var e=parseFloat(c),f=isNaN(e);f||e in r||(e=a.pluralCat(e-s));e===z||f&&X(z)&&isNaN(z)||(A(),f=u[e],y(f)?(null!=c&&d.debug("ngPluralize: no rule defined for '"+e+"' in "+q),A=v,k()):A=g.$watch(f,k),z=e)})}}}],Ce=["$parse","$animate",function(a,c){var d=G("ngRepeat"),e=function(a,c,
d,e,k,m,n){a[d]=e;k&&(a[k]=m);a.$index=c;a.$first=0===c;a.$last=c===n-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=W.createComment(" end ngRepeat: "+h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",h);var m=k[1],q=k[2],r=k[3],t=k[4],k=m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
if(!k)throw d("iidexp",m);var v=k[3]||k[1],x=k[2];if(r&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(r)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(r)))throw d("badident",r);var w,p,A,y,B={$id:Ga};t?w=a(t):(A=function(a,c){return Ga(c)},y=function(a){return a});return function(a,f,g,k,m){w&&(p=function(c,d,e){x&&(B[x]=c);B[v]=d;B.$index=e;return w(a,B)});var t=ga();a.$watchCollection(q,function(g){var k,q,w=f[0],B,D=ga(),F,H,K,G,M,I,N;r&&(a[r]=g);if(Da(g))M=
g,q=p||A;else for(N in q=p||y,M=[],g)g.hasOwnProperty(N)&&"$"!==N.charAt(0)&&M.push(N);F=M.length;N=Array(F);for(k=0;k<F;k++)if(H=g===M?k:M[k],K=g[H],G=q(H,K,k),t[G])I=t[G],delete t[G],D[G]=I,N[k]=I;else{if(D[G])throw n(N,function(a){a&&a.scope&&(t[a.id]=a)}),d("dupes",h,G,K);N[k]={id:G,scope:u,clone:u};D[G]=!0}for(B in t){I=t[B];G=qb(I.clone);c.leave(G);if(G[0].parentNode)for(k=0,q=G.length;k<q;k++)G[k].$$NG_REMOVED=!0;I.scope.$destroy()}for(k=0;k<F;k++)if(H=g===M?k:M[k],K=g[H],I=N[k],I.scope){B=
w;do B=B.nextSibling;while(B&&B.$$NG_REMOVED);I.clone[0]!=B&&c.move(qb(I.clone),null,z(w));w=I.clone[I.clone.length-1];e(I.scope,k,v,K,x,H,F)}else m(function(a,d){I.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,null,z(w));w=f;I.clone=a;D[I.id]=I;e(I.scope,k,v,K,x,H,F)});t=D})}}}}],De=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],we=["$animate",
function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Ee=Ma(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&n(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Fe=["$animate",function(a){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],m=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||
e.on,function(c){var d,e;d=0;for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var r=qb(h[d].clone);k[d].$destroy();(l[d]=a.leave(r)).then(m(l,d))}h.length=0;k.length=0;(g=f.cases["!"+c]||f.cases["?"])&&n(g,function(c){c.transclude(function(d,e){k.push(e);var f=c.element;d[d.length++]=W.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],Ge=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,
f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),He=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),Je=Ma({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw G("ngTransclude")("orphan",ua(c));f(function(a){c.empty();c.append(a)})}}),je=["$templateCache",function(a){return{restrict:"E",terminal:!0,
compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Bg={$setViewValue:v,$render:v},Cg=["$element","$scope","$attrs",function(a,c,d){var e=this,f=new Ua;e.ngModelCtrl=Bg;e.unknownOption=z(W.createElement("option"));e.renderUnknownOption=function(c){c="? "+Ga(c)+" ?";e.unknownOption.val(c);a.prepend(e.unknownOption);a.val(c)};c.$on("$destroy",function(){e.renderUnknownOption=v});e.removeUnknownOption=function(){e.unknownOption.parent()&&e.unknownOption.remove()};e.readValue=
function(){e.removeUnknownOption();return a.val()};e.writeValue=function(c){e.hasOption(c)?(e.removeUnknownOption(),a.val(c),""===c&&e.emptyOption.prop("selected",!0)):null==c&&e.emptyOption?(e.removeUnknownOption(),a.val("")):e.renderUnknownOption(c)};e.addOption=function(a,c){Ta(a,'"option value"');""===a&&(e.emptyOption=c);var d=f.get(a)||0;f.put(a,d+1)};e.removeOption=function(a){var c=f.get(a);c&&(1===c?(f.remove(a),""===a&&(e.emptyOption=u)):f.put(a,c-1))};e.hasOption=function(a){return!!f.get(a)}}],
ke=function(){return{restrict:"E",require:["select","?ngModel"],controller:Cg,link:function(a,c,d,e){var f=e[1];if(f){var g=e[0];g.ngModelCtrl=f;f.$render=function(){g.writeValue(f.$viewValue)};c.on("change",function(){a.$apply(function(){f.$setViewValue(g.readValue())})});if(d.multiple){g.readValue=function(){var a=[];n(c.find("option"),function(c){c.selected&&a.push(c.value)});return a};g.writeValue=function(a){var d=new Ua(a);n(c.find("option"),function(a){a.selected=x(d.get(a.value))})};var h,
l=NaN;a.$watch(function(){l!==f.$viewValue||ka(h,f.$viewValue)||(h=ia(f.$viewValue),f.$render());l=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}}}},me=["$interpolate",function(a){function c(a){a[0].hasAttribute("selected")&&(a[0].selected=!0)}return{restrict:"E",priority:100,compile:function(d,e){if(y(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.ngModelCtrl&&
(f?a.$watch(f,function(a,f){e.$set("value",a);f!==a&&m.removeOption(f);m.addOption(a,d);m.ngModelCtrl.$render();c(d)}):(m.addOption(e.value,d),m.ngModelCtrl.$render(),c(d)),d.on("$destroy",function(){m.removeOption(e.value);m.ngModelCtrl.$render()}))}}}}],le=qa({restrict:"E",terminal:!1}),Fc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},
Ec=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){H(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw G("ngPattern")("noregexp",g,a,ua(c));f=a||u;e.$validate()});e.$validators.pattern=function(a,c){return e.$isEmpty(c)||y(f)||f.test(c)}}}}},Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=Y(a);f=isNaN(a)?-1:a;e.$validate()});
e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(c)||c.length<=f}}}}},Gc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=Y(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}};N.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(ce(),ee(aa),aa.module("ngLocale",[],["$provide",function(a){function c(a){a+="";var c=a.indexOf(".");return-1==
c?0:a.length-c-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",
medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",pluralCat:function(a,e){var f=a|0,g=e;u===g&&(g=Math.min(c(a),3));Math.pow(10,g);return 1==
f&&0==g?"one":"other"}})}]),z(W).ready(function(){Zd(W,yc)}))})(window,document);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map
/*
 AngularJS v1.2.13
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(h,e,A){'use strict';function u(w,q,k){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,n){function y(){l&&(l.$destroy(),l=null);g&&(k.leave(g),g=null)}function v(){var b=w.current&&w.current.locals;if(e.isDefined(b&&b.$template)){var b=a.$new(),f=w.current;g=n(b,function(d){k.enter(d,null,g||c,function(){!e.isDefined(t)||t&&!a.$eval(t)||q()});y()});l=f.scope=b;l.$emit("$viewContentLoaded");l.$eval(h)}else y()}var l,g,t=b.autoscroll,h=b.onload||"";
a.$on("$routeChangeSuccess",v);v()}}}function z(e,h,k){return{restrict:"ECA",priority:-400,link:function(a,c){var b=k.current,f=b.locals;c.html(f.$template);var n=e(c.contents());b.controller&&(f.$scope=a,f=h(b.controller,f),b.controllerAs&&(a[b.controllerAs]=f),c.data("$ngControllerController",f),c.children().data("$ngControllerController",f));n(a)}}}h=e.module("ngRoute",["ng"]).provider("$route",function(){function h(a,c){return e.extend(new (e.extend(function(){},{prototype:a})),c)}function q(a,
e){var b=e.caseInsensitiveMatch,f={originalPath:a,regexp:a},h=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,e,b,c){a="?"===c?c:null;c="*"===c?c:null;h.push({name:b,optional:!!a});e=e||"";return""+(a?"":e)+"(?:"+(a?e:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=RegExp("^"+a+"$",b?"i":"");return f}var k={};this.when=function(a,c){k[a]=e.extend({reloadOnSearch:!0},c,a&&q(a,c));if(a){var b="/"==a[a.length-1]?a.substr(0,a.length-
1):a+"/";k[b]=e.extend({redirectTo:a},q(b,c))}return this};this.otherwise=function(a){this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(a,c,b,f,n,q,v,l){function g(){var d=t(),m=r.current;if(d&&m&&d.$$route===m.$$route&&e.equals(d.pathParams,m.pathParams)&&!d.reloadOnSearch&&!x)m.params=d.params,e.copy(m.params,b),a.$broadcast("$routeUpdate",m);else if(d||m)x=!1,a.$broadcast("$routeChangeStart",d,m),(r.current=
d)&&d.redirectTo&&(e.isString(d.redirectTo)?c.path(u(d.redirectTo,d.params)).search(d.params).replace():c.url(d.redirectTo(d.pathParams,c.path(),c.search())).replace()),f.when(d).then(function(){if(d){var a=e.extend({},d.resolve),c,b;e.forEach(a,function(d,c){a[c]=e.isString(d)?n.get(d):n.invoke(d)});e.isDefined(c=d.template)?e.isFunction(c)&&(c=c(d.params)):e.isDefined(b=d.templateUrl)&&(e.isFunction(b)&&(b=b(d.params)),b=l.getTrustedResourceUrl(b),e.isDefined(b)&&(d.loadedTemplateUrl=b,c=q.get(b,
{cache:v}).then(function(a){return a.data})));e.isDefined(c)&&(a.$template=c);return f.all(a)}}).then(function(c){d==r.current&&(d&&(d.locals=c,e.copy(d.params,b)),a.$broadcast("$routeChangeSuccess",d,m))},function(c){d==r.current&&a.$broadcast("$routeChangeError",d,m,c)})}function t(){var a,b;e.forEach(k,function(f,k){var p;if(p=!b){var s=c.path();p=f.keys;var l={};if(f.regexp)if(s=f.regexp.exec(s)){for(var g=1,q=s.length;g<q;++g){var n=p[g-1],r="string"==typeof s[g]?decodeURIComponent(s[g]):s[g];
n&&r&&(l[n.name]=r)}p=l}else p=null;else p=null;p=a=p}p&&(b=h(f,{params:e.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||k[null]&&h(k[null],{params:{},pathParams:{}})}function u(a,c){var b=[];e.forEach((a||"").split(":"),function(a,d){if(0===d)b.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];b.push(c[f]);b.push(e[2]||"");delete c[f]}});return b.join("")}var x=!1,r={routes:k,reload:function(){x=!0;a.$evalAsync(g)}};a.$on("$locationChangeSuccess",g);return r}]});h.provider("$routeParams",
function(){this.$get=function(){return{}}});h.directive("ngView",u);h.directive("ngView",z);u.$inject=["$route","$anchorScroll","$animate"];z.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map
/**
 * Created by Zack Boman on 1/31/14.
 * http://www.zackboman.com or tennisgent@gmail.com
 */

(function(){
'use strict';

    angular.module('routeStyles', ['ngRoute'])
    
        .directive('head', ['$rootScope','$compile','$interpolate',
            function($rootScope, $compile, $interpolate){
                // this allows for support of custom interpolation symbols
                var startSym = $interpolate.startSymbol(),
                    endSym = $interpolate.endSymbol(),
                    html = ['<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="',startSym,'cssUrl',endSym,'">'].join('');
                return {
                    restrict: 'E',
                    link: function(scope, elem){
                        elem.append($compile(html)(scope));
                        scope.routeStyles = {};
                        $rootScope.$on('$routeChangeStart', function (e, next) {
                            if(next && next.$$route && next.$$route.css){
                                if(!angular.isArray(next.$$route.css)){
                                    next.$$route.css = [next.$$route.css];
                                }
                                angular.forEach(next.$$route.css, function(sheet){
                                    scope.routeStyles[sheet] = sheet;
                                });
                            }
                        });
                        $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
                            if (previous && previous.$$route && previous.$$route.css) {
                                if (!angular.isArray(previous.$$route.css)) {
                                    previous.$$route.css = [previous.$$route.css];
                                }
                                angular.forEach(previous.$$route.css, function (sheet) {
                                    scope.routeStyles[sheet] = undefined;
                                });
                            }
                        });
                    }
                };
            }
        ]);

})();
/*
 AngularJS v1.4.3
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(F,t,W){'use strict';function ua(a,b,c){if(!a)throw ngMinErr("areq",b||"?",c||"required");return a}function va(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;X(a)&&(a=a.join(" "));X(b)&&(b=b.join(" "));return a+" "+b}function Ea(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function ba(a,b,c){var d="";a=X(a)?a:a&&U(a)&&a.length?a.split(/\s+/):[];u(a,function(a,s){a&&0<a.length&&(d+=0<s?" ":"",d+=c?b+a:a+b)});return d}function Fa(a){if(a instanceof G)switch(a.length){case 0:return[];
case 1:if(1===a[0].nodeType)return a;break;default:return G(ka(a))}if(1===a.nodeType)return G(a)}function ka(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Ga(a,b,c){u(b,function(b){a.addClass(b,c)})}function Ha(a,b,c){u(b,function(b){a.removeClass(b,c)})}function ha(a){return function(b,c){c.addClass&&(Ga(a,b,c.addClass),c.addClass=null);c.removeClass&&(Ha(a,b,c.removeClass),c.removeClass=null)}}function ia(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
H;a.domOperation=function(){a.$$domOperationFired=!0;b();b=H};a.$$prepared=!0}return a}function ca(a,b){wa(a,b);xa(a,b)}function wa(a,b){b.from&&(a.css(b.from),b.from=null)}function xa(a,b){b.to&&(a.css(b.to),b.to=null)}function R(a,b,c){var d=(b.addClass||"")+" "+(c.addClass||""),e=(b.removeClass||"")+" "+(c.removeClass||"");a=Ia(a.attr("class"),d,e);ya(b,c);b.addClass=a.addClass?a.addClass:null;b.removeClass=a.removeClass?a.removeClass:null;return b}function Ia(a,b,c){function d(a){U(a)&&(a=a.split(" "));
var b={};u(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);u(b,function(a,b){e[b]=1});c=d(c);u(c,function(a,b){e[b]=1===e[b]?null:-1});var s={addClass:"",removeClass:""};u(e,function(b,c){var d,e;1===b?(d="addClass",e=!a[c]):-1===b&&(d="removeClass",e=a[c]);e&&(s[d].length&&(s[d]+=" "),s[d]+=c)});return s}function z(a){return a instanceof t.element?a[0]:a}function za(a,b,c){var d=Object.create(null),e=a.getComputedStyle(b)||{};u(c,function(a,b){var c=e[a];if(c){var k=c.charAt(0);
if("-"===k||"+"===k||0<=k)c=Ja(c);0===c&&(c=null);d[b]=c}});return d}function Ja(a){var b=0;a=a.split(/\s*,\s*/);u(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function la(a){return 0===a||null!=a}function Aa(a,b){var c=O,d=a+"s";b?c+="Duration":d+=" linear all";return[c,d]}function ja(a,b){var c=b?"-"+b+"s":"";da(a,[ea,c]);return[ea,c]}function ma(a,b){var c=b?"paused":"",d=V+"PlayState";da(a,[d,c]);return[d,c]}function da(a,
b){a.style[b[0]]=b[1]}function Ba(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}var H=t.noop,ya=t.extend,G=t.element,u=t.forEach,X=t.isArray,U=t.isString,na=t.isObject,Ka=t.isUndefined,La=t.isDefined,Ca=t.isFunction,oa=t.isElement,O,pa,V,qa;F.ontransitionend===W&&F.onwebkittransitionend!==W?(O="WebkitTransition",pa="webkitTransitionEnd transitionend"):
(O="transition",pa="transitionend");F.onanimationend===W&&F.onwebkitanimationend!==W?(V="WebkitAnimation",qa="webkitAnimationEnd animationend"):(V="animation",qa="animationend");var ra=V+"Delay",sa=V+"Duration",ea=O+"Delay";F=O+"Duration";var Ma={transitionDuration:F,transitionDelay:ea,transitionProperty:O+"Property",animationDuration:sa,animationDelay:ra,animationIterationCount:V+"IterationCount"},Na={transitionDuration:F,transitionDelay:ea,animationDuration:sa,animationDelay:ra};t.module("ngAnimate",
[]).directive("ngAnimateChildren",[function(){return function(a,b,c){a=c.ngAnimateChildren;t.isString(a)&&0===a.length?b.data("$$ngAnimateChildren",!0):c.$observe("ngAnimateChildren",function(a){b.data("$$ngAnimateChildren","on"===a||"true"===a)})}}]).factory("$$rAFMutex",["$$rAF",function(a){return function(){var b=!1;a(function(){b=!0});return function(c){b?c():a(c)}}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d.push([].concat(a));c()}function c(){if(d.length){for(var b=[],n=
0;n<d.length;n++){var h=d[n];h.shift()();h.length&&b.push(h)}d=b;e||a(function(){e||c()})}}var d=[],e;b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).factory("$$AnimateRunner",["$q","$$rAFMutex",function(a,b){function c(a){this.setHost(a);this._doneCallbacks=[];this._runInAnimationFrame=b();this._state=0}c.chain=function(a,b){function c(){if(n===a.length)b(!0);else a[n](function(a){!1===a?b(!1):(n++,c())})}var n=0;c()};c.all=function(a,b){function c(s){h=h&&s;++n===
a.length&&b(h)}var n=0,h=!0;u(a,function(a){a.done(c)})};c.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:H,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&
this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._runInAnimationFrame(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(u(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return c}]).provider("$$animateQueue",["$animateProvider",
function(a){function b(a,b,c,h){return d[a].some(function(a){return a(b,c,h)})}function c(a,b){a=a||{};var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var d=this.rules={skip:[],cancel:[],join:[]};d.join.push(function(a,b,d){return!b.structural&&c(b.options)});d.skip.push(function(a,b,d){return!b.structural&&!c(b.options)});d.skip.push(function(a,b,c){return"leave"==c.event&&b.structural});d.skip.push(function(a,b,c){return c.structural&&!b.structural});d.cancel.push(function(a,
b,c){return c.structural&&b.structural});d.cancel.push(function(a,b,c){return 2===c.state&&b.structural});d.cancel.push(function(a,b,c){a=b.options;c=c.options;return a.addClass&&a.addClass===c.removeClass||a.removeClass&&a.removeClass===c.addClass});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite",function(d,s,n,h,k,D,A,Z,I){function w(a,b){var c=z(a),f=[],m=l[b];m&&u(m,function(a){a.node.contains(c)&&f.push(a.callback)});
return f}function B(a,b,c,f){d(function(){u(w(b,a),function(a){a(b,c,f)})})}function r(a,S,p){function d(b,c,f,p){B(c,a,f,p);b.progress(c,f,p)}function g(b){Da(a,p);ca(a,p);p.domOperation();l.complete(!b)}var P,E;if(a=Fa(a))P=z(a),E=a.parent();p=ia(p);var l=new A;if(!P)return g(),l;X(p.addClass)&&(p.addClass=p.addClass.join(" "));X(p.removeClass)&&(p.removeClass=p.removeClass.join(" "));p.from&&!na(p.from)&&(p.from=null);p.to&&!na(p.to)&&(p.to=null);var e=[P.className,p.addClass,p.removeClass].join(" ");
if(!v(e))return g(),l;var M=0<=["enter","move","leave"].indexOf(S),h=!x||L.get(P),e=!h&&m.get(P)||{},k=!!e.state;h||k&&1==e.state||(h=!ta(a,E,S));if(h)return g(),l;M&&K(a);h={structural:M,element:a,event:S,close:g,options:p,runner:l};if(k){if(b("skip",a,h,e)){if(2===e.state)return g(),l;R(a,e.options,p);return e.runner}if(b("cancel",a,h,e))2===e.state?e.runner.end():e.structural?e.close():R(a,h.options,e.options);else if(b("join",a,h,e))if(2===e.state)R(a,p,{});else return S=h.event=e.event,p=R(a,
e.options,h.options),l}else R(a,p,{});(k=h.structural)||(k="animate"===h.event&&0<Object.keys(h.options.to||{}).length||c(h.options));if(!k)return g(),C(a),l;M&&f(E);var r=(e.counter||0)+1;h.counter=r;ga(a,1,h);s.$$postDigest(function(){var b=m.get(P),v=!b,b=b||{},e=a.parent()||[],E=0<e.length&&("animate"===b.event||b.structural||c(b.options));if(v||b.counter!==r||!E){v&&(Da(a,p),ca(a,p));if(v||M&&b.event!==S)p.domOperation(),l.end();E||C(a)}else S=!b.structural&&c(b.options,!0)?"setClass":b.event,
b.structural&&f(e),ga(a,2),b=D(a,S,b.options),b.done(function(b){g(!b);(b=m.get(P))&&b.counter===r&&C(z(a));d(l,S,"close",{})}),l.setHost(b),d(l,S,"start",{})});return l}function K(a){a=z(a).querySelectorAll("[data-ng-animate]");u(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=m.get(a);switch(b){case 2:c.runner.end();case 1:c&&m.remove(a)}})}function C(a){a=z(a);a.removeAttribute("data-ng-animate");m.remove(a)}function E(a,b){return z(a)===z(b)}function f(a){a=z(a);do{if(!a||1!==
a.nodeType)break;var b=m.get(a);if(b){var f=a;!b.structural&&c(b.options)&&(2===b.state&&b.runner.end(),C(f))}a=a.parentNode}while(1)}function ta(a,b,c){var f=c=!1,d=!1,v;for((a=a.data("$ngAnimatePin"))&&(b=a);b&&b.length;){f||(f=E(b,n));a=b[0];if(1!==a.nodeType)break;var e=m.get(a)||{};d||(d=e.structural||L.get(a));if(Ka(v)||!0===v)a=b.data("$$ngAnimateChildren"),La(a)&&(v=a);if(d&&!1===v)break;f||(f=E(b,n),f||(a=b.data("$ngAnimatePin"))&&(b=a));c||(c=E(b,g));b=b.parent()}return(!d||v)&&f&&c}function ga(a,
b,c){c=c||{};c.state=b;a=z(a);a.setAttribute("data-ng-animate",b);c=(b=m.get(a))?ya(b,c):c;m.put(a,c)}var m=new k,L=new k,x=null,M=s.$watch(function(){return 0===Z.totalPendingRequests},function(a){a&&(M(),s.$$postDigest(function(){s.$$postDigest(function(){null===x&&(x=!0)})}))}),g=G(h[0].body),l={},P=a.classNameFilter(),v=P?function(a){return P.test(a)}:function(){return!0},Da=ha(I);return{on:function(a,b,c){b=ka(b);l[a]=l[a]||[];l[a].push({node:b,callback:c})},off:function(a,b,c){function f(a,
b,c){var d=ka(b);return a.filter(function(a){return!(a.node===d&&(!c||a.callback===c))})}var d=l[a];d&&(l[a]=1===arguments.length?null:f(d,b,c))},pin:function(a,b){ua(oa(a),"element","not an element");ua(oa(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,f){c=c||{};c.domOperation=f;return r(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!x;else if(oa(a)){var f=z(a),d=L.get(f);1===c?b=!d:(b=!!b)?d&&L.remove(f):L.put(f,!0)}else b=x=!!a;return b}}}]}]).provider("$$animation",
["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$rAFScheduler",function(a,e,s,n,h){var k=[],D=ha(a),A=0,Z=0,I=[];return function(w,B,r){function K(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];u(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function C(a){var b=[],c={};u(a,function(a,f){var d=z(a.element),
m=0<=["enter","move"].indexOf(a.event),d=a.structural?K(d):[];if(d.length){var g=m?"to":"from";u(d,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][g]={animationID:f,element:G(a)}})}else b.push(a)});var f={},d={};u(c,function(c,m){var g=c.from,e=c.to;if(g&&e){var l=a[g.animationID],h=a[e.animationID],x=g.animationID.toString();if(!d[x]){var B=d[x]={structural:!0,beforeStart:function(){l.beforeStart();h.beforeStart()},close:function(){l.close();h.close()},classes:E(l.classes,h.classes),
from:l,to:h,anchors:[]};B.classes.length?b.push(B):(b.push(l),b.push(h))}d[x].anchors.push({out:g.element,"in":e.element})}else g=g?g.animationID:e.animationID,e=g.toString(),f[e]||(f[e]=!0,b.push(a[g]))});return b}function E(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],f=0;f<a.length;f++){var d=a[f];if("ng-"!==d.substring(0,3))for(var g=0;g<b.length;g++)if(d===b[g]){c.push(d);break}}return c.join(" ")}function f(a){for(var b=c.length-1;0<=b;b--){var f=c[b];if(s.has(f)&&(f=s.get(f)(a)))return f}}
function ta(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function ga(){var a=b(w);!a||"leave"===B&&r.$$domOperationFired||a.end()}function m(b){w.off("$destroy",ga);w.removeData("$$animationRunner");D(w,r);ca(w,r);r.domOperation();g&&a.removeClass(w,g);w.removeClass("ng-animate");x.complete(!b)}r=ia(r);var L=0<=["enter","move","leave"].indexOf(B),x=new n({end:function(){m()},cancel:function(){m(!0)}});if(!c.length)return m(),x;w.data("$$animationRunner",
x);var M=va(w.attr("class"),va(r.addClass,r.removeClass)),g=r.tempClasses;g&&(M+=" "+g,r.tempClasses=null);var l;L||(l=A,A+=1);k.push({element:w,classes:M,event:B,classBasedIndex:l,structural:L,options:r,beforeStart:function(){w.addClass("ng-animate");g&&a.addClass(w,g)},close:m});w.on("$destroy",ga);if(1<k.length)return x;e.$$postDigest(function(){Z=A;A=0;I.length=0;var a=[];u(k,function(c){b(c.element)&&a.push(c)});k.length=0;u(C(a),function(a){function c(){a.beforeStart();var d,g=a.close,e=a.anchors?
a.from.element||a.to.element:a.element;b(e)&&z(e).parentNode&&(e=f(a))&&(d=e.start);d?(d=d(),d.done(function(a){g(!a)}),ta(a,d)):g()}a.structural?c():(I.push({node:z(a.element),fn:c}),a.classBasedIndex===Z-1&&(I=I.sort(function(a,b){return b.node.contains(a.node)}).map(function(a){return a.fn}),h(I)))})});return x}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Ba(),c=Ba();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$document","$sniffer","$$rAFScheduler",function(a,
e,s,n,h,k,D){function A(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++r))+"-"+a.getAttribute("class")+"-"+b}function Z(h,f,B,k){var m;0<b.count(B)&&(m=c.get(B),m||(f=ba(f,"-stagger"),e.addClass(h,f),m=za(a,h,k),m.animationDuration=Math.max(m.animationDuration,0),m.transitionDuration=Math.max(m.transitionDuration,0),e.removeClass(h,f),c.put(B,m)));return m||{}}function I(a){C.push(a);D.waitUntilQuiet(function(){b.flush();c.flush();for(var a=K.offsetWidth+1,d=0;d<
C.length;d++)C[d](a);C.length=0})}function w(c,f,e){f=b.get(e);f||(f=za(a,c,Ma),"infinite"===f.animationIterationCount&&(f.animationIterationCount=1));b.put(e,f);c=f;e=c.animationDelay;f=c.transitionDelay;c.maxDelay=e&&f?Math.max(e,f):e||f;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);return c}var B=ha(e),r=0,K=z(h).body,C=[];return function(a,c){function d(){m()}function h(){m(!0)}function m(b){if(!(K||C&&D)){K=!0;D=!1;e.removeClass(a,Y);e.removeClass(a,
W);ma(g,!1);ja(g,!1);u(l,function(a){g.style[a[0]]=""});B(a,c);ca(a,c);if(c.onDone)c.onDone();p&&p.complete(!b)}}function L(a){q.blockTransition&&ja(g,a);q.blockKeyframeAnimation&&ma(g,!!a)}function x(){p=new s({end:d,cancel:h});m();return{$$willAnimate:!1,start:function(){return p},end:d}}function M(){function b(){if(!K){L(!1);u(l,function(a){g.style[a[0]]=a[1]});B(a,c);e.addClass(a,W);if(q.recalculateTimingStyles){fa=g.className+" "+Y;$=A(g,fa);y=w(g,fa,$);Q=y.maxDelay;H=Math.max(Q,0);J=y.maxDuration;
if(0===J){m();return}q.hasTransitions=0<y.transitionDuration;q.hasAnimations=0<y.animationDuration}if(q.applyTransitionDelay||q.applyAnimationDelay){Q="boolean"!==typeof c.delay&&la(c.delay)?parseFloat(c.delay):Q;H=Math.max(Q,0);var k;q.applyTransitionDelay&&(y.transitionDelay=Q,k=[ea,Q+"s"],l.push(k),g.style[k[0]]=k[1]);q.applyAnimationDelay&&(y.animationDelay=Q,k=[ra,Q+"s"],l.push(k),g.style[k[0]]=k[1])}F=1E3*H;G=1E3*J;if(c.easing){var r=c.easing;q.hasTransitions&&(k=O+"TimingFunction",l.push([k,
r]),g.style[k]=r);q.hasAnimations&&(k=V+"TimingFunction",l.push([k,r]),g.style[k]=r)}y.transitionDuration&&p.push(pa);y.animationDuration&&p.push(qa);x=Date.now();a.on(p.join(" "),h);n(d,F+1.5*G);xa(a,c)}}function d(){m()}function h(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-x,0)>=F&&b>=J&&(C=!0,m())}if(!K)if(g.parentNode){var x,p=[],k=function(a){if(C)D&&a&&(D=!1,m());else if(D=!a,y.animationDuration)if(a=
ma(g,D),D)l.push(a);else{var b=l,c=b.indexOf(a);0<=a&&b.splice(c,1)}},r=0<U&&(y.transitionDuration&&0===T.transitionDuration||y.animationDuration&&0===T.animationDuration)&&Math.max(T.animationDelay,T.transitionDelay);r?n(b,Math.floor(r*U*1E3),!1):b();t.resume=function(){k(!0)};t.pause=function(){k(!1)}}else m()}var g=z(a);if(!g||!g.parentNode)return x();c=ia(c);var l=[],r=a.attr("class"),v=Ea(c),K,D,C,p,t,H,F,J,G;if(0===c.duration||!k.animations&&!k.transitions)return x();var aa=c.event&&X(c.event)?
c.event.join(" "):c.event,R="",N="";aa&&c.structural?R=ba(aa,"ng-",!0):aa&&(R=aa);c.addClass&&(N+=ba(c.addClass,"-add"));c.removeClass&&(N.length&&(N+=" "),N+=ba(c.removeClass,"-remove"));c.applyClassesEarly&&N.length&&(B(a,c),N="");var Y=[R,N].join(" ").trim(),fa=r+" "+Y,W=ba(Y,"-active"),r=v.to&&0<Object.keys(v.to).length;if(!(0<(c.keyframeStyle||"").length||r||Y))return x();var $,T;0<c.stagger?(v=parseFloat(c.stagger),T={transitionDelay:v,animationDelay:v,transitionDuration:0,animationDuration:0}):
($=A(g,fa),T=Z(g,Y,$,Na));e.addClass(a,Y);c.transitionStyle&&(v=[O,c.transitionStyle],da(g,v),l.push(v));0<=c.duration&&(v=0<g.style[O].length,v=Aa(c.duration,v),da(g,v),l.push(v));c.keyframeStyle&&(v=[V,c.keyframeStyle],da(g,v),l.push(v));var U=T?0<=c.staggerIndex?c.staggerIndex:b.count($):0;(aa=0===U)&&ja(g,9999);var y=w(g,fa,$),Q=y.maxDelay;H=Math.max(Q,0);J=y.maxDuration;var q={};q.hasTransitions=0<y.transitionDuration;q.hasAnimations=0<y.animationDuration;q.hasTransitionAll=q.hasTransitions&&
"all"==y.transitionProperty;q.applyTransitionDuration=r&&(q.hasTransitions&&!q.hasTransitionAll||q.hasAnimations&&!q.hasTransitions);q.applyAnimationDuration=c.duration&&q.hasAnimations;q.applyTransitionDelay=la(c.delay)&&(q.applyTransitionDuration||q.hasTransitions);q.applyAnimationDelay=la(c.delay)&&q.hasAnimations;q.recalculateTimingStyles=0<N.length;if(q.applyTransitionDuration||q.applyAnimationDuration)J=c.duration?parseFloat(c.duration):J,q.applyTransitionDuration&&(q.hasTransitions=!0,y.transitionDuration=
J,v=0<g.style[O+"Property"].length,l.push(Aa(J,v))),q.applyAnimationDuration&&(q.hasAnimations=!0,y.animationDuration=J,l.push([sa,J+"s"]));if(0===J&&!q.recalculateTimingStyles)return x();null==c.duration&&0<y.transitionDuration&&(q.recalculateTimingStyles=q.recalculateTimingStyles||aa);F=1E3*H;G=1E3*J;c.skipBlocking||(q.blockTransition=0<y.transitionDuration,q.blockKeyframeAnimation=0<y.animationDuration&&0<T.animationDelay&&0===T.animationDuration);wa(a,c);q.blockTransition||ja(g,!1);L(J);return{$$willAnimate:!0,
end:d,start:function(){if(!K)return t={end:d,cancel:h,resume:null,pause:null},p=new s(t),I(M),p}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$document","$sniffer",function(a,c,d,e,s,n){function h(a){return a.replace(/\bng-\S+\b/g,"")}function k(a,b){U(a)&&(a=a.split(" "));U(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function D(c,
e,A){function D(a){var b={},c=z(a).getBoundingClientRect();u(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=I.scrollTop;break;case "left":d+=I.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function s(){var c=h(A.attr("class")||""),d=k(c,t),c=k(t,c),d=a(n,{to:D(A),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function f(){n.remove();e.removeClass("ng-animate-shim");A.removeClass("ng-animate-shim")}var n=G(z(e).cloneNode(!0)),
t=h(n.attr("class")||"");e.addClass("ng-animate-shim");A.addClass("ng-animate-shim");n.addClass("ng-anchor");w.append(n);var m;c=function(){var c=a(n,{addClass:"ng-anchor-out",delay:!0,from:D(e)});return c.$$willAnimate?c:null}();if(!c&&(m=s(),!m))return f();var L=c||m;return{start:function(){function a(){c&&c.end()}var b,c=L.start();c.done(function(){c=null;if(!m&&(m=s()))return c=m.start(),c.done(function(){c=null;f();b.complete()}),c;f();b.complete()});return b=new d({end:a,cancel:a})}}}function A(a,
b,c,e){var h=t(a),f=t(b),k=[];u(e,function(a){(a=D(c,a.out,a["in"]))&&k.push(a)});if(h||f||0!==k.length)return{start:function(){function a(){u(b,function(a){a.end()})}var b=[];h&&b.push(h.start());f&&b.push(f.start());u(k,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function t(c){var d=c.element,e=c.options||{};c.structural?(e.structural=e.applyClassesEarly=!0,e.event=c.event,"leave"===e.event&&(e.onDone=e.domOperation)):e.event=null;
c=a(d,e);return c.$$willAnimate?c:null}if(!n.animations&&!n.transitions)return H;var I=z(s).body;c=z(e);var w=G(I.parentNode===c?I:c);return function(a){return a.from&&a.to?A(a.from,a.to,a.classes,a.anchors):t(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$rAFMutex","$$jqLite",function(b,c,d,e){function s(c){c=X(c)?c:c.split(" ");for(var d=[],e={},A=0;A<c.length;A++){var n=c[A],s=a.$$registeredAnimations[n];s&&!e[n]&&(d.push(b.get(s)),e[n]=
!0)}return d}var n=ha(e);return function(a,b,d,e){function t(){e.domOperation();n(a,e)}function z(a,b,d,e,g){switch(d){case "animate":b=[b,e.from,e.to,g];break;case "setClass":b=[b,r,K,g];break;case "addClass":b=[b,r,g];break;case "removeClass":b=[b,K,g];break;default:b=[b,g]}b.push(e);if(a=a.apply(a,b))if(Ca(a.start)&&(a=a.start()),a instanceof c)a.done(g);else if(Ca(a))return a;return H}function w(a,b,d,e,g){var f=[];u(e,function(e){var h=e[g];h&&f.push(function(){var e,g,f=!1,l=function(a){f||
(f=!0,(g||H)(a),e.complete(!a))};e=new c({end:function(){l()},cancel:function(){l(!0)}});g=z(h,a,b,d,function(a){l(!1===a)});return e})});return f}function B(a,b,d,e,g){var f=w(a,b,d,e,g);if(0===f.length){var h,k;"beforeSetClass"===g?(h=w(a,"removeClass",d,e,"beforeRemoveClass"),k=w(a,"addClass",d,e,"beforeAddClass")):"setClass"===g&&(h=w(a,"removeClass",d,e,"removeClass"),k=w(a,"addClass",d,e,"addClass"));h&&(f=f.concat(h));k&&(f=f.concat(k))}if(0!==f.length)return function(a){var b=[];f.length&&
u(f,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){u(b,function(b){a?b.cancel():b.end()})}}}3===arguments.length&&na(d)&&(e=d,d=null);e=ia(e);d||(d=a.attr("class")||"",e.addClass&&(d+=" "+e.addClass),e.removeClass&&(d+=" "+e.removeClass));var r=e.addClass,K=e.removeClass,C=s(d),E,f;if(C.length){var F,G;"leave"==b?(G="leave",F="afterLeave"):(G="before"+b.charAt(0).toUpperCase()+b.substr(1),F=b);"enter"!==b&&"move"!==b&&(E=B(a,b,e,C,G));f=B(a,b,e,C,F)}if(E||f)return{start:function(){function b(c){n=
!0;t();ca(a,e);g.complete(c)}var d,k=[];E&&k.push(function(a){d=E(a)});k.length?k.push(function(a){t();a(!0)}):t();f&&k.push(function(a){d=f(a)});var n=!1,g=new c({end:function(){n||((d||H)(void 0),b(void 0))},cancel:function(){n||((d||H)(!0),b(!0))}});c.chain(k,b);return g}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}
return function(a){if(a.from&&a.to){var b=d(a.from),n=d(a.to);if(b||n)return{start:function(){function a(){return function(){u(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());n&&d.push(n.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map