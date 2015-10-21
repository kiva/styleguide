define("Styleguide", ["jquery"], function(__WEBPACK_EXTERNAL_MODULE_2__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var header = __webpack_require__(14);
	var accordion = __webpack_require__(15);
	var $ = __webpack_require__(2);

	$(document).foundation();

	header();
	accordion();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
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


		if (true) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	(function() {

	/*!
	 * Modernizr v2.8.3
	 * www.modernizr.com
	 *
	 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
	 * Available under the BSD and MIT licenses: www.modernizr.com/license/
	 */

	/*
	 * Modernizr tests which native CSS3 and HTML5 features are available in
	 * the current UA and makes the results available to you in two ways:
	 * as properties on a global Modernizr object, and as classes on the
	 * <html> element. This information allows you to progressively enhance
	 * your pages with a granular level of control over the experience.
	 *
	 * Modernizr has an optional (not included) conditional resource loader
	 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
	 * To get a build that includes Modernizr.load(), as well as choosing
	 * which tests to include, go to www.modernizr.com/download/
	 *
	 * Authors        Faruk Ates, Paul Irish, Alex Sexton
	 * Contributors   Ryan Seddon, Ben Alman
	 */

	window.Modernizr = (function( window, document, undefined ) {

	    var version = '2.8.3',

	    Modernizr = {},

	    /*>>cssclasses*/
	    // option for enabling the HTML classes to be added
	    enableClasses = true,
	    /*>>cssclasses*/

	    docElement = document.documentElement,

	    /**
	     * Create our "modernizr" element that we do most feature tests on.
	     */
	    mod = 'modernizr',
	    modElem = document.createElement(mod),
	    mStyle = modElem.style,

	    /**
	     * Create the input element for various Web Forms feature tests.
	     */
	    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

	    /*>>smile*/
	    smile = ':)',
	    /*>>smile*/

	    toString = {}.toString,

	    // TODO :: make the prefixes more granular
	    /*>>prefixes*/
	    // List of property values to set for css tests. See ticket #21
	    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
	    /*>>prefixes*/

	    /*>>domprefixes*/
	    // Following spec is to expose vendor-specific style properties as:
	    //   elem.style.WebkitBorderRadius
	    // and the following would be incorrect:
	    //   elem.style.webkitBorderRadius

	    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
	    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
	    //   erik.eae.net/archives/2008/03/10/21.48.10/

	    // More here: github.com/Modernizr/Modernizr/issues/issue/21
	    omPrefixes = 'Webkit Moz O ms',

	    cssomPrefixes = omPrefixes.split(' '),

	    domPrefixes = omPrefixes.toLowerCase().split(' '),
	    /*>>domprefixes*/

	    /*>>ns*/
	    ns = {'svg': 'http://www.w3.org/2000/svg'},
	    /*>>ns*/

	    tests = {},
	    inputs = {},
	    attrs = {},

	    classes = [],

	    slice = classes.slice,

	    featureName, // used in testing loop


	    /*>>teststyles*/
	    // Inject element with style element and some CSS rules
	    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

	      var style, ret, node, docOverflow,
	          div = document.createElement('div'),
	          // After page load injecting a fake body doesn't work so check if body exists
	          body = document.body,
	          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
	          fakeBody = body || document.createElement('body');

	      if ( parseInt(nodes, 10) ) {
	          // In order not to give false positives we create a node for each test
	          // This also allows the method to scale for unspecified uses
	          while ( nodes-- ) {
	              node = document.createElement('div');
	              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
	              div.appendChild(node);
	          }
	      }

	      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
	      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
	      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
	      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
	      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
	      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
	      div.id = mod;
	      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
	      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
	      (body ? div : fakeBody).innerHTML += style;
	      fakeBody.appendChild(div);
	      if ( !body ) {
	          //avoid crashing IE8, if background image is used
	          fakeBody.style.background = '';
	          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
	          fakeBody.style.overflow = 'hidden';
	          docOverflow = docElement.style.overflow;
	          docElement.style.overflow = 'hidden';
	          docElement.appendChild(fakeBody);
	      }

	      ret = callback(div, rule);
	      // If this is done after page load we don't want to remove the body so check if body exists
	      if ( !body ) {
	          fakeBody.parentNode.removeChild(fakeBody);
	          docElement.style.overflow = docOverflow;
	      } else {
	          div.parentNode.removeChild(div);
	      }

	      return !!ret;

	    },
	    /*>>teststyles*/

	    /*>>mq*/
	    // adapted from matchMedia polyfill
	    // by Scott Jehl and Paul Irish
	    // gist.github.com/786768
	    testMediaQuery = function( mq ) {

	      var matchMedia = window.matchMedia || window.msMatchMedia;
	      if ( matchMedia ) {
	        return matchMedia(mq) && matchMedia(mq).matches || false;
	      }

	      var bool;

	      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
	        bool = (window.getComputedStyle ?
	                  getComputedStyle(node, null) :
	                  node.currentStyle)['position'] == 'absolute';
	      });

	      return bool;

	     },
	     /*>>mq*/


	    /*>>hasevent*/
	    //
	    // isEventSupported determines if a given element supports the given event
	    // kangax.github.com/iseventsupported/
	    //
	    // The following results are known incorrects:
	    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
	    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
	    //   ...
	    isEventSupported = (function() {

	      var TAGNAMES = {
	        'select': 'input', 'change': 'input',
	        'submit': 'form', 'reset': 'form',
	        'error': 'img', 'load': 'img', 'abort': 'img'
	      };

	      function isEventSupported( eventName, element ) {

	        element = element || document.createElement(TAGNAMES[eventName] || 'div');
	        eventName = 'on' + eventName;

	        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
	        var isSupported = eventName in element;

	        if ( !isSupported ) {
	          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
	          if ( !element.setAttribute ) {
	            element = document.createElement('div');
	          }
	          if ( element.setAttribute && element.removeAttribute ) {
	            element.setAttribute(eventName, '');
	            isSupported = is(element[eventName], 'function');

	            // If property was created, "remove it" (by setting value to `undefined`)
	            if ( !is(element[eventName], 'undefined') ) {
	              element[eventName] = undefined;
	            }
	            element.removeAttribute(eventName);
	          }
	        }

	        element = null;
	        return isSupported;
	      }
	      return isEventSupported;
	    })(),
	    /*>>hasevent*/

	    // TODO :: Add flag for hasownprop ? didn't last time

	    // hasOwnProperty shim by kangax needed for Safari 2.0 support
	    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

	    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
	      hasOwnProp = function (object, property) {
	        return _hasOwnProperty.call(object, property);
	      };
	    }
	    else {
	      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
	        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
	      };
	    }

	    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
	    // es5.github.com/#x15.3.4.5

	    if (!Function.prototype.bind) {
	      Function.prototype.bind = function bind(that) {

	        var target = this;

	        if (typeof target != "function") {
	            throw new TypeError();
	        }

	        var args = slice.call(arguments, 1),
	            bound = function () {

	            if (this instanceof bound) {

	              var F = function(){};
	              F.prototype = target.prototype;
	              var self = new F();

	              var result = target.apply(
	                  self,
	                  args.concat(slice.call(arguments))
	              );
	              if (Object(result) === result) {
	                  return result;
	              }
	              return self;

	            } else {

	              return target.apply(
	                  that,
	                  args.concat(slice.call(arguments))
	              );

	            }

	        };

	        return bound;
	      };
	    }

	    /**
	     * setCss applies given styles to the Modernizr DOM node.
	     */
	    function setCss( str ) {
	        mStyle.cssText = str;
	    }

	    /**
	     * setCssAll extrapolates all vendor-specific css strings.
	     */
	    function setCssAll( str1, str2 ) {
	        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
	    }

	    /**
	     * is returns a boolean for if typeof obj is exactly type.
	     */
	    function is( obj, type ) {
	        return typeof obj === type;
	    }

	    /**
	     * contains returns a boolean for if substr is found within str.
	     */
	    function contains( str, substr ) {
	        return !!~('' + str).indexOf(substr);
	    }

	    /*>>testprop*/

	    // testProps is a generic CSS / DOM property test.

	    // In testing support for a given CSS property, it's legit to test:
	    //    `elem.style[styleName] !== undefined`
	    // If the property is supported it will return an empty string,
	    // if unsupported it will return undefined.

	    // We'll take advantage of this quick test and skip setting a style
	    // on our modernizr element, but instead just testing undefined vs
	    // empty string.

	    // Because the testing of the CSS property names (with "-", as
	    // opposed to the camelCase DOM properties) is non-portable and
	    // non-standard but works in WebKit and IE (but not Gecko or Opera),
	    // we explicitly reject properties with dashes so that authors
	    // developing in WebKit or IE first don't end up with
	    // browser-specific content by accident.

	    function testProps( props, prefixed ) {
	        for ( var i in props ) {
	            var prop = props[i];
	            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
	                return prefixed == 'pfx' ? prop : true;
	            }
	        }
	        return false;
	    }
	    /*>>testprop*/

	    // TODO :: add testDOMProps
	    /**
	     * testDOMProps is a generic DOM property test; if a browser supports
	     *   a certain property, it won't return undefined for it.
	     */
	    function testDOMProps( props, obj, elem ) {
	        for ( var i in props ) {
	            var item = obj[props[i]];
	            if ( item !== undefined) {

	                // return the property name as a string
	                if (elem === false) return props[i];

	                // let's bind a function
	                if (is(item, 'function')){
	                  // default to autobind unless override
	                  return item.bind(elem || obj);
	                }

	                // return the unbound function or obj or value
	                return item;
	            }
	        }
	        return false;
	    }

	    /*>>testallprops*/
	    /**
	     * testPropsAll tests a list of DOM properties we want to check against.
	     *   We specify literally ALL possible (known and/or likely) properties on
	     *   the element including the non-vendor prefixed one, for forward-
	     *   compatibility.
	     */
	    function testPropsAll( prop, prefixed, elem ) {

	        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
	            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

	        // did they call .prefixed('boxSizing') or are we just testing a prop?
	        if(is(prefixed, "string") || is(prefixed, "undefined")) {
	          return testProps(props, prefixed);

	        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
	        } else {
	          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
	          return testDOMProps(props, prefixed, elem);
	        }
	    }
	    /*>>testallprops*/


	    /**
	     * Tests
	     * -----
	     */

	    // The *new* flexbox
	    // dev.w3.org/csswg/css3-flexbox

	    tests['flexbox'] = function() {
	      return testPropsAll('flexWrap');
	    };

	    // The *old* flexbox
	    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

	    tests['flexboxlegacy'] = function() {
	        return testPropsAll('boxDirection');
	    };

	    // On the S60 and BB Storm, getContext exists, but always returns undefined
	    // so we actually have to call getContext() to verify
	    // github.com/Modernizr/Modernizr/issues/issue/97/

	    tests['canvas'] = function() {
	        var elem = document.createElement('canvas');
	        return !!(elem.getContext && elem.getContext('2d'));
	    };

	    tests['canvastext'] = function() {
	        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
	    };

	    // webk.it/70117 is tracking a legit WebGL feature detect proposal

	    // We do a soft detect which may false positive in order to avoid
	    // an expensive context creation: bugzil.la/732441

	    tests['webgl'] = function() {
	        return !!window.WebGLRenderingContext;
	    };

	    /*
	     * The Modernizr.touch test only indicates if the browser supports
	     *    touch events, which does not necessarily reflect a touchscreen
	     *    device, as evidenced by tablets running Windows 7 or, alas,
	     *    the Palm Pre / WebOS (touch) phones.
	     *
	     * Additionally, Chrome (desktop) used to lie about its support on this,
	     *    but that has since been rectified: crbug.com/36415
	     *
	     * We also test for Firefox 4 Multitouch Support.
	     *
	     * For more info, see: modernizr.github.com/Modernizr/touch.html
	     */

	    tests['touch'] = function() {
	        var bool;

	        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	          bool = true;
	        } else {
	          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
	            bool = node.offsetTop === 9;
	          });
	        }

	        return bool;
	    };


	    // geolocation is often considered a trivial feature detect...
	    // Turns out, it's quite tricky to get right:
	    //
	    // Using !!navigator.geolocation does two things we don't want. It:
	    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
	    //   2. Disables page caching in WebKit: webk.it/43956
	    //
	    // Meanwhile, in Firefox < 8, an about:config setting could expose
	    // a false positive that would throw an exception: bugzil.la/688158

	    tests['geolocation'] = function() {
	        return 'geolocation' in navigator;
	    };


	    tests['postmessage'] = function() {
	      return !!window.postMessage;
	    };


	    // Chrome incognito mode used to throw an exception when using openDatabase
	    // It doesn't anymore.
	    tests['websqldatabase'] = function() {
	      return !!window.openDatabase;
	    };

	    // Vendors had inconsistent prefixing with the experimental Indexed DB:
	    // - Webkit's implementation is accessible through webkitIndexedDB
	    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
	    // For speed, we don't test the legacy (and beta-only) indexedDB
	    tests['indexedDB'] = function() {
	      return !!testPropsAll("indexedDB", window);
	    };

	    // documentMode logic from YUI to filter out IE8 Compat Mode
	    //   which false positives.
	    tests['hashchange'] = function() {
	      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
	    };

	    // Per 1.6:
	    // This used to be Modernizr.historymanagement but the longer
	    // name has been deprecated in favor of a shorter and property-matching one.
	    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
	    // and in the first release thereafter disappear entirely.
	    tests['history'] = function() {
	      return !!(window.history && history.pushState);
	    };

	    tests['draganddrop'] = function() {
	        var div = document.createElement('div');
	        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
	    };

	    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
	    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
	    // FF10 still uses prefixes, so check for it until then.
	    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
	    tests['websockets'] = function() {
	        return 'WebSocket' in window || 'MozWebSocket' in window;
	    };


	    // css-tricks.com/rgba-browser-support/
	    tests['rgba'] = function() {
	        // Set an rgba() color and check the returned value

	        setCss('background-color:rgba(150,255,150,.5)');

	        return contains(mStyle.backgroundColor, 'rgba');
	    };

	    tests['hsla'] = function() {
	        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
	        //   except IE9 who retains it as hsla

	        setCss('background-color:hsla(120,40%,100%,.5)');

	        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
	    };

	    tests['multiplebgs'] = function() {
	        // Setting multiple images AND a color on the background shorthand property
	        //  and then querying the style.background property value for the number of
	        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

	        setCss('background:url(https://),url(https://),red url(https://)');

	        // If the UA supports multiple backgrounds, there should be three occurrences
	        //   of the string "url(" in the return value for elemStyle.background

	        return (/(url\s*\(.*?){3}/).test(mStyle.background);
	    };



	    // this will false positive in Opera Mini
	    //   github.com/Modernizr/Modernizr/issues/396

	    tests['backgroundsize'] = function() {
	        return testPropsAll('backgroundSize');
	    };

	    tests['borderimage'] = function() {
	        return testPropsAll('borderImage');
	    };


	    // Super comprehensive table about all the unique implementations of
	    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

	    tests['borderradius'] = function() {
	        return testPropsAll('borderRadius');
	    };

	    // WebOS unfortunately false positives on this test.
	    tests['boxshadow'] = function() {
	        return testPropsAll('boxShadow');
	    };

	    // FF3.0 will false positive on this test
	    tests['textshadow'] = function() {
	        return document.createElement('div').style.textShadow === '';
	    };


	    tests['opacity'] = function() {
	        // Browsers that actually have CSS Opacity implemented have done so
	        //  according to spec, which means their return values are within the
	        //  range of [0.0,1.0] - including the leading zero.

	        setCssAll('opacity:.55');

	        // The non-literal . in this regex is intentional:
	        //   German Chrome returns this value as 0,55
	        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
	        return (/^0.55$/).test(mStyle.opacity);
	    };


	    // Note, Android < 4 will pass this test, but can only animate
	    //   a single property at a time
	    //   goo.gl/v3V4Gp
	    tests['cssanimations'] = function() {
	        return testPropsAll('animationName');
	    };


	    tests['csscolumns'] = function() {
	        return testPropsAll('columnCount');
	    };


	    tests['cssgradients'] = function() {
	        /**
	         * For CSS Gradients syntax, please see:
	         * webkit.org/blog/175/introducing-css-gradients/
	         * developer.mozilla.org/en/CSS/-moz-linear-gradient
	         * developer.mozilla.org/en/CSS/-moz-radial-gradient
	         * dev.w3.org/csswg/css3-images/#gradients-
	         */

	        var str1 = 'background-image:',
	            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
	            str3 = 'linear-gradient(left top,#9f9, white);';

	        setCss(
	             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
	              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
	             // standard syntax             // trailing 'background-image:'
	              prefixes.join(str3 + str1)).slice(0, -str1.length)
	        );

	        return contains(mStyle.backgroundImage, 'gradient');
	    };


	    tests['cssreflections'] = function() {
	        return testPropsAll('boxReflect');
	    };


	    tests['csstransforms'] = function() {
	        return !!testPropsAll('transform');
	    };


	    tests['csstransforms3d'] = function() {

	        var ret = !!testPropsAll('perspective');

	        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
	        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
	        //   some conditions. As a result, Webkit typically recognizes the syntax but
	        //   will sometimes throw a false positive, thus we must do a more thorough check:
	        if ( ret && 'webkitPerspective' in docElement.style ) {

	          // Webkit allows this media query to succeed only if the feature is enabled.
	          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
	          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
	            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
	          });
	        }
	        return ret;
	    };


	    tests['csstransitions'] = function() {
	        return testPropsAll('transition');
	    };


	    /*>>fontface*/
	    // @font-face detection routine by Diego Perini
	    // javascript.nwbox.com/CSSSupport/

	    // false positives:
	    //   WebOS github.com/Modernizr/Modernizr/issues/342
	    //   WP7   github.com/Modernizr/Modernizr/issues/538
	    tests['fontface'] = function() {
	        var bool;

	        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
	          var style = document.getElementById('smodernizr'),
	              sheet = style.sheet || style.styleSheet,
	              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

	          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
	        });

	        return bool;
	    };
	    /*>>fontface*/

	    // CSS generated content detection
	    tests['generatedcontent'] = function() {
	        var bool;

	        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
	          bool = node.offsetHeight >= 3;
	        });

	        return bool;
	    };



	    // These tests evaluate support of the video/audio elements, as well as
	    // testing what types of content they support.
	    //
	    // We're using the Boolean constructor here, so that we can extend the value
	    // e.g.  Modernizr.video     // true
	    //       Modernizr.video.ogg // 'probably'
	    //
	    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
	    //                     thx to NielsLeenheer and zcorpan

	    // Note: in some older browsers, "no" was a return value instead of empty string.
	    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
	    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

	    tests['video'] = function() {
	        var elem = document.createElement('video'),
	            bool = false;

	        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
	        try {
	            if ( bool = !!elem.canPlayType ) {
	                bool      = new Boolean(bool);
	                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

	                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
	                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

	                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
	            }

	        } catch(e) { }

	        return bool;
	    };

	    tests['audio'] = function() {
	        var elem = document.createElement('audio'),
	            bool = false;

	        try {
	            if ( bool = !!elem.canPlayType ) {
	                bool      = new Boolean(bool);
	                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
	                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

	                // Mimetypes accepted:
	                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
	                //   bit.ly/iphoneoscodecs
	                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
	                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
	                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
	            }
	        } catch(e) { }

	        return bool;
	    };


	    // In FF4, if disabled, window.localStorage should === null.

	    // Normally, we could not test that directly and need to do a
	    //   `('localStorage' in window) && ` test first because otherwise Firefox will
	    //   throw bugzil.la/365772 if cookies are disabled

	    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
	    // will throw the exception:
	    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
	    // Peculiarly, getItem and removeItem calls do not throw.

	    // Because we are forced to try/catch this, we'll go aggressive.

	    // Just FWIW: IE8 Compat mode supports these features completely:
	    //   www.quirksmode.org/dom/html5.html
	    // But IE8 doesn't support either with local files

	    tests['localstorage'] = function() {
	        try {
	            localStorage.setItem(mod, mod);
	            localStorage.removeItem(mod);
	            return true;
	        } catch(e) {
	            return false;
	        }
	    };

	    tests['sessionstorage'] = function() {
	        try {
	            sessionStorage.setItem(mod, mod);
	            sessionStorage.removeItem(mod);
	            return true;
	        } catch(e) {
	            return false;
	        }
	    };


	    tests['webworkers'] = function() {
	        return !!window.Worker;
	    };


	    tests['applicationcache'] = function() {
	        return !!window.applicationCache;
	    };


	    // Thanks to Erik Dahlstrom
	    tests['svg'] = function() {
	        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
	    };

	    // specifically for SVG inline in HTML, not within XHTML
	    // test page: paulirish.com/demo/inline-svg
	    tests['inlinesvg'] = function() {
	      var div = document.createElement('div');
	      div.innerHTML = '<svg/>';
	      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
	    };

	    // SVG SMIL animation
	    tests['smil'] = function() {
	        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
	    };

	    // This test is only for clip paths in SVG proper, not clip paths on HTML content
	    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

	    // However read the comments to dig into applying SVG clippaths to HTML content here:
	    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
	    tests['svgclippaths'] = function() {
	        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
	    };

	    /*>>webforms*/
	    // input features and input types go directly onto the ret object, bypassing the tests loop.
	    // Hold this guy to execute in a moment.
	    function webforms() {
	        /*>>input*/
	        // Run through HTML5's new input attributes to see if the UA understands any.
	        // We're using f which is the <input> element created early on
	        // Mike Taylr has created a comprehensive resource for testing these attributes
	        //   when applied to all input types:
	        //   miketaylr.com/code/input-type-attr.html
	        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

	        // Only input placeholder is tested while textarea's placeholder is not.
	        // Currently Safari 4 and Opera 11 have support only for the input placeholder
	        // Both tests are available in feature-detects/forms-placeholder.js
	        Modernizr['input'] = (function( props ) {
	            for ( var i = 0, len = props.length; i < len; i++ ) {
	                attrs[ props[i] ] = !!(props[i] in inputElem);
	            }
	            if (attrs.list){
	              // safari false positive's on datalist: webk.it/74252
	              // see also github.com/Modernizr/Modernizr/issues/146
	              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
	            }
	            return attrs;
	        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
	        /*>>input*/

	        /*>>inputtypes*/
	        // Run through HTML5's new input types to see if the UA understands any.
	        //   This is put behind the tests runloop because it doesn't return a
	        //   true/false like all the other tests; instead, it returns an object
	        //   containing each input type with its corresponding true/false value

	        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
	        Modernizr['inputtypes'] = (function(props) {

	            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

	                inputElem.setAttribute('type', inputElemType = props[i]);
	                bool = inputElem.type !== 'text';

	                // We first check to see if the type we give it sticks..
	                // If the type does, we feed it a textual value, which shouldn't be valid.
	                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
	                if ( bool ) {

	                    inputElem.value         = smile;
	                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

	                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

	                      docElement.appendChild(inputElem);
	                      defaultView = document.defaultView;

	                      // Safari 2-4 allows the smiley as a value, despite making a slider
	                      bool =  defaultView.getComputedStyle &&
	                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
	                              // Mobile android web browser has false positive, so must
	                              // check the height to see if the widget is actually there.
	                              (inputElem.offsetHeight !== 0);

	                      docElement.removeChild(inputElem);

	                    } else if ( /^(search|tel)$/.test(inputElemType) ){
	                      // Spec doesn't define any special parsing or detectable UI
	                      //   behaviors so we pass these through as true

	                      // Interestingly, opera fails the earlier test, so it doesn't
	                      //  even make it here.

	                    } else if ( /^(url|email)$/.test(inputElemType) ) {
	                      // Real url and email support comes with prebaked validation.
	                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

	                    } else {
	                      // If the upgraded input compontent rejects the :) text, we got a winner
	                      bool = inputElem.value != smile;
	                    }
	                }

	                inputs[ props[i] ] = !!bool;
	            }
	            return inputs;
	        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
	        /*>>inputtypes*/
	    }
	    /*>>webforms*/


	    // End of test definitions
	    // -----------------------



	    // Run through all tests and detect their support in the current UA.
	    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
	    for ( var feature in tests ) {
	        if ( hasOwnProp(tests, feature) ) {
	            // run the test, throw the return value into the Modernizr,
	            //   then based on that boolean, define an appropriate className
	            //   and push it into an array of classes we'll join later.
	            featureName  = feature.toLowerCase();
	            Modernizr[featureName] = tests[feature]();

	            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
	        }
	    }

	    /*>>webforms*/
	    // input tests need to run.
	    Modernizr.input || webforms();
	    /*>>webforms*/


	    /**
	     * addTest allows the user to define their own feature tests
	     * the result will be added onto the Modernizr object,
	     * as well as an appropriate className set on the html element
	     *
	     * @param feature - String naming the feature
	     * @param test - Function returning true if feature is supported, false if not
	     */
	     Modernizr.addTest = function ( feature, test ) {
	       if ( typeof feature == 'object' ) {
	         for ( var key in feature ) {
	           if ( hasOwnProp( feature, key ) ) {
	             Modernizr.addTest( key, feature[ key ] );
	           }
	         }
	       } else {

	         feature = feature.toLowerCase();

	         if ( Modernizr[feature] !== undefined ) {
	           // we're going to quit if you're trying to overwrite an existing test
	           // if we were to allow it, we'd do this:
	           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
	           //   docElement.className = docElement.className.replace( re, '' );
	           // but, no rly, stuff 'em.
	           return Modernizr;
	         }

	         test = typeof test == 'function' ? test() : test;

	         if (typeof enableClasses !== "undefined" && enableClasses) {
	           docElement.className += ' ' + (test ? '' : 'no-') + feature;
	         }
	         Modernizr[feature] = test;

	       }

	       return Modernizr; // allow chaining.
	     };


	    // Reset modElem.cssText to nothing to reduce memory footprint.
	    setCss('');
	    modElem = inputElem = null;

	    /*>>shiv*/
	    /**
	     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
	     */
	    ;(function(window, document) {
	        /*jshint evil:true */
	        /** version */
	        var version = '3.7.0';

	        /** Preset options */
	        var options = window.html5 || {};

	        /** Used to skip problem elements */
	        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

	        /** Not all elements can be cloned in IE **/
	        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

	        /** Detect whether the browser supports default html5 styles */
	        var supportsHtml5Styles;

	        /** Name of the expando, to work with multiple documents or to re-shiv one document */
	        var expando = '_html5shiv';

	        /** The id for the the documents expando */
	        var expanID = 0;

	        /** Cached data for each document */
	        var expandoData = {};

	        /** Detect whether the browser supports unknown elements */
	        var supportsUnknownElements;

	        (function() {
	          try {
	            var a = document.createElement('a');
	            a.innerHTML = '<xyz></xyz>';
	            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
	            supportsHtml5Styles = ('hidden' in a);

	            supportsUnknownElements = a.childNodes.length == 1 || (function() {
	              // assign a false positive if unable to shiv
	              (document.createElement)('a');
	              var frag = document.createDocumentFragment();
	              return (
	                typeof frag.cloneNode == 'undefined' ||
	                typeof frag.createDocumentFragment == 'undefined' ||
	                typeof frag.createElement == 'undefined'
	              );
	            }());
	          } catch(e) {
	            // assign a false positive if detection fails => unable to shiv
	            supportsHtml5Styles = true;
	            supportsUnknownElements = true;
	          }

	        }());

	        /*--------------------------------------------------------------------------*/

	        /**
	         * Creates a style sheet with the given CSS text and adds it to the document.
	         * @private
	         * @param {Document} ownerDocument The document.
	         * @param {String} cssText The CSS text.
	         * @returns {StyleSheet} The style element.
	         */
	        function addStyleSheet(ownerDocument, cssText) {
	          var p = ownerDocument.createElement('p'),
	          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

	          p.innerHTML = 'x<style>' + cssText + '</style>';
	          return parent.insertBefore(p.lastChild, parent.firstChild);
	        }

	        /**
	         * Returns the value of `html5.elements` as an array.
	         * @private
	         * @returns {Array} An array of shived element node names.
	         */
	        function getElements() {
	          var elements = html5.elements;
	          return typeof elements == 'string' ? elements.split(' ') : elements;
	        }

	        /**
	         * Returns the data associated to the given document
	         * @private
	         * @param {Document} ownerDocument The document.
	         * @returns {Object} An object of data.
	         */
	        function getExpandoData(ownerDocument) {
	          var data = expandoData[ownerDocument[expando]];
	          if (!data) {
	            data = {};
	            expanID++;
	            ownerDocument[expando] = expanID;
	            expandoData[expanID] = data;
	          }
	          return data;
	        }

	        /**
	         * returns a shived element for the given nodeName and document
	         * @memberOf html5
	         * @param {String} nodeName name of the element
	         * @param {Document} ownerDocument The context document.
	         * @returns {Object} The shived element.
	         */
	        function createElement(nodeName, ownerDocument, data){
	          if (!ownerDocument) {
	            ownerDocument = document;
	          }
	          if(supportsUnknownElements){
	            return ownerDocument.createElement(nodeName);
	          }
	          if (!data) {
	            data = getExpandoData(ownerDocument);
	          }
	          var node;

	          if (data.cache[nodeName]) {
	            node = data.cache[nodeName].cloneNode();
	          } else if (saveClones.test(nodeName)) {
	            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
	          } else {
	            node = data.createElem(nodeName);
	          }

	          // Avoid adding some elements to fragments in IE < 9 because
	          // * Attributes like `name` or `type` cannot be set/changed once an element
	          //   is inserted into a document/fragment
	          // * Link elements with `src` attributes that are inaccessible, as with
	          //   a 403 response, will cause the tab/window to crash
	          // * Script elements appended to fragments will execute when their `src`
	          //   or `text` property is set
	          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
	        }

	        /**
	         * returns a shived DocumentFragment for the given document
	         * @memberOf html5
	         * @param {Document} ownerDocument The context document.
	         * @returns {Object} The shived DocumentFragment.
	         */
	        function createDocumentFragment(ownerDocument, data){
	          if (!ownerDocument) {
	            ownerDocument = document;
	          }
	          if(supportsUnknownElements){
	            return ownerDocument.createDocumentFragment();
	          }
	          data = data || getExpandoData(ownerDocument);
	          var clone = data.frag.cloneNode(),
	          i = 0,
	          elems = getElements(),
	          l = elems.length;
	          for(;i<l;i++){
	            clone.createElement(elems[i]);
	          }
	          return clone;
	        }

	        /**
	         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
	         * @private
	         * @param {Document|DocumentFragment} ownerDocument The document.
	         * @param {Object} data of the document.
	         */
	        function shivMethods(ownerDocument, data) {
	          if (!data.cache) {
	            data.cache = {};
	            data.createElem = ownerDocument.createElement;
	            data.createFrag = ownerDocument.createDocumentFragment;
	            data.frag = data.createFrag();
	          }


	          ownerDocument.createElement = function(nodeName) {
	            //abort shiv
	            if (!html5.shivMethods) {
	              return data.createElem(nodeName);
	            }
	            return createElement(nodeName, ownerDocument, data);
	          };

	          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
	                                                          'var n=f.cloneNode(),c=n.createElement;' +
	                                                          'h.shivMethods&&(' +
	                                                          // unroll the `createElement` calls
	                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
	            data.createElem(nodeName);
	            data.frag.createElement(nodeName);
	            return 'c("' + nodeName + '")';
	          }) +
	            ');return n}'
	                                                         )(html5, data.frag);
	        }

	        /*--------------------------------------------------------------------------*/

	        /**
	         * Shivs the given document.
	         * @memberOf html5
	         * @param {Document} ownerDocument The document to shiv.
	         * @returns {Document} The shived document.
	         */
	        function shivDocument(ownerDocument) {
	          if (!ownerDocument) {
	            ownerDocument = document;
	          }
	          var data = getExpandoData(ownerDocument);

	          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
	            data.hasCSS = !!addStyleSheet(ownerDocument,
	                                          // corrects block display not defined in IE6/7/8/9
	                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
	                                            // adds styling not present in IE6/7/8/9
	                                            'mark{background:#FF0;color:#000}' +
	                                            // hides non-rendered elements
	                                            'template{display:none}'
	                                         );
	          }
	          if (!supportsUnknownElements) {
	            shivMethods(ownerDocument, data);
	          }
	          return ownerDocument;
	        }

	        /*--------------------------------------------------------------------------*/

	        /**
	         * The `html5` object is exposed so that more elements can be shived and
	         * existing shiving can be detected on iframes.
	         * @type Object
	         * @example
	         *
	         * // options can be changed before the script is included
	         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
	         */
	        var html5 = {

	          /**
	           * An array or space separated string of node names of the elements to shiv.
	           * @memberOf html5
	           * @type Array|String
	           */
	          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

	          /**
	           * current version of html5shiv
	           */
	          'version': version,

	          /**
	           * A flag to indicate that the HTML5 style sheet should be inserted.
	           * @memberOf html5
	           * @type Boolean
	           */
	          'shivCSS': (options.shivCSS !== false),

	          /**
	           * Is equal to true if a browser supports creating unknown/HTML5 elements
	           * @memberOf html5
	           * @type boolean
	           */
	          'supportsUnknownElements': supportsUnknownElements,

	          /**
	           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
	           * methods should be overwritten.
	           * @memberOf html5
	           * @type Boolean
	           */
	          'shivMethods': (options.shivMethods !== false),

	          /**
	           * A string to describe the type of `html5` object ("default" or "default print").
	           * @memberOf html5
	           * @type String
	           */
	          'type': 'default',

	          // shivs the document according to the specified `html5` object options
	          'shivDocument': shivDocument,

	          //creates a shived element
	          createElement: createElement,

	          //creates a shived documentFragment
	          createDocumentFragment: createDocumentFragment
	        };

	        /*--------------------------------------------------------------------------*/

	        // expose html5
	        window.html5 = html5;

	        // shiv the document
	        shivDocument(document);

	    }(this, document));
	    /*>>shiv*/

	    // Assign private properties to the return object with prefix
	    Modernizr._version      = version;

	    // expose these for the plugin API. Look in the source for how to join() them against your input
	    /*>>prefixes*/
	    Modernizr._prefixes     = prefixes;
	    /*>>prefixes*/
	    /*>>domprefixes*/
	    Modernizr._domPrefixes  = domPrefixes;
	    Modernizr._cssomPrefixes  = cssomPrefixes;
	    /*>>domprefixes*/

	    /*>>mq*/
	    // Modernizr.mq tests a given media query, live against the current state of the window
	    // A few important notes:
	    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
	    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
	    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
	    //       Modernizr.mq('(min-width:0)')
	    // usage:
	    // Modernizr.mq('only screen and (max-width:768)')
	    Modernizr.mq            = testMediaQuery;
	    /*>>mq*/

	    /*>>hasevent*/
	    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
	    // Modernizr.hasEvent('gesturestart', elem)
	    Modernizr.hasEvent      = isEventSupported;
	    /*>>hasevent*/

	    /*>>testprop*/
	    // Modernizr.testProp() investigates whether a given style property is recognized
	    // Note that the property names must be provided in the camelCase variant.
	    // Modernizr.testProp('pointerEvents')
	    Modernizr.testProp      = function(prop){
	        return testProps([prop]);
	    };
	    /*>>testprop*/

	    /*>>testallprops*/
	    // Modernizr.testAllProps() investigates whether a given style property,
	    //   or any of its vendor-prefixed variants, is recognized
	    // Note that the property names must be provided in the camelCase variant.
	    // Modernizr.testAllProps('boxSizing')
	    Modernizr.testAllProps  = testPropsAll;
	    /*>>testallprops*/


	    /*>>teststyles*/
	    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
	    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
	    Modernizr.testStyles    = injectElementWithStyles;
	    /*>>teststyles*/


	    /*>>prefixed*/
	    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
	    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

	    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
	    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
	    //
	    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

	    // If you're trying to ascertain which transition end event to bind to, you might do something like...
	    //
	    //     var transEndEventNames = {
	    //       'WebkitTransition' : 'webkitTransitionEnd',
	    //       'MozTransition'    : 'transitionend',
	    //       'OTransition'      : 'oTransitionEnd',
	    //       'msTransition'     : 'MSTransitionEnd',
	    //       'transition'       : 'transitionend'
	    //     },
	    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

	    Modernizr.prefixed      = function(prop, obj, elem){
	      if(!obj) {
	        return testPropsAll(prop, 'pfx');
	      } else {
	        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
	        return testPropsAll(prop, obj, elem);
	      }
	    };
	    /*>>prefixed*/


	    /*>>cssclasses*/
	    // Remove "no-js" class from <html> element, if it exists:
	    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

	                            // Add the new classes to the <html> element.
	                            (enableClasses ? ' js ' + classes.join(' ') : '');
	    /*>>cssclasses*/

	    return Modernizr;

	})(this, this.document);


	/*** EXPORTS FROM exports-loader ***/
	module.exports = window.Modernizr}.call(window));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 * Foundation Responsive Library
	 * http://foundation.zurb.com
	 * Copyright 2014, ZURB
	 * Free to use under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	*/

	(function ($, window, document, undefined) {
	  'use strict';

	  var header_helpers = function (class_array) {
	    var i = class_array.length;
	    var head = $('head');

	    while (i--) {
	      if (head.has('.' + class_array[i]).length === 0) {
	        head.append('<meta class="' + class_array[i] + '" />');
	      }
	    }
	  };

	  header_helpers([
	    'foundation-mq-small',
	    'foundation-mq-small-only',
	    'foundation-mq-medium',
	    'foundation-mq-medium-only',
	    'foundation-mq-large',
	    'foundation-mq-large-only',
	    'foundation-mq-xlarge',
	    'foundation-mq-xlarge-only',
	    'foundation-mq-xxlarge',
	    'foundation-data-attribute-namespace']);

	  // Enable FastClick if present

	  $(function () {
	    if (typeof FastClick !== 'undefined') {
	      // Don't attach to body if undefined
	      if (typeof document.body !== 'undefined') {
	        FastClick.attach(document.body);
	      }
	    }
	  });

	  // private Fast Selector wrapper,
	  // returns jQuery object. Only use where
	  // getElementById is not available.
	  var S = function (selector, context) {
	    if (typeof selector === 'string') {
	      if (context) {
	        var cont;
	        if (context.jquery) {
	          cont = context[0];
	          if (!cont) {
	            return context;
	          }
	        } else {
	          cont = context;
	        }
	        return $(cont.querySelectorAll(selector));
	      }

	      return $(document.querySelectorAll(selector));
	    }

	    return $(selector, context);
	  };

	  // Namespace functions.

	  var attr_name = function (init) {
	    var arr = [];
	    if (!init) {
	      arr.push('data');
	    }
	    if (this.namespace.length > 0) {
	      arr.push(this.namespace);
	    }
	    arr.push(this.name);

	    return arr.join('-');
	  };

	  var add_namespace = function (str) {
	    var parts = str.split('-'),
	        i = parts.length,
	        arr = [];

	    while (i--) {
	      if (i !== 0) {
	        arr.push(parts[i]);
	      } else {
	        if (this.namespace.length > 0) {
	          arr.push(this.namespace, parts[i]);
	        } else {
	          arr.push(parts[i]);
	        }
	      }
	    }

	    return arr.reverse().join('-');
	  };

	  // Event binding and data-options updating.

	  var bindings = function (method, options) {
	    var self = this,
	        bind = function(){
	          var $this = S(this),
	              should_bind_events = !$this.data(self.attr_name(true) + '-init');
	          $this.data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options($this)));

	          if (should_bind_events) {
	            self.events(this);
	          }
	        };

	    if (S(this.scope).is('[' + this.attr_name() +']')) {
	      bind.call(this.scope);
	    } else {
	      S('[' + this.attr_name() +']', this.scope).each(bind);
	    }
	    // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
	    if (typeof method === 'string') {
	      return this[method].call(this, options);
	    }

	  };

	  var single_image_loaded = function (image, callback) {
	    function loaded () {
	      callback(image[0]);
	    }

	    function bindLoad () {
	      this.one('load', loaded);

	      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
	        var src = this.attr( 'src' ),
	            param = src.match( /\?/ ) ? '&' : '?';

	        param += 'random=' + (new Date()).getTime();
	        this.attr('src', src + param);
	      }
	    }

	    if (!image.attr('src')) {
	      loaded();
	      return;
	    }

	    if (image[0].complete || image[0].readyState === 4) {
	      loaded();
	    } else {
	      bindLoad.call(image);
	    }
	  };

	  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

	  window.matchMedia || (window.matchMedia = function() {
	      "use strict";

	      // For browsers that support matchMedium api such as IE 9 and webkit
	      var styleMedia = (window.styleMedia || window.media);

	      // For those that don't support matchMedium
	      if (!styleMedia) {
	          var style       = document.createElement('style'),
	              script      = document.getElementsByTagName('script')[0],
	              info        = null;

	          style.type  = 'text/css';
	          style.id    = 'matchmediajs-test';

	          script.parentNode.insertBefore(style, script);

	          // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
	          info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

	          styleMedia = {
	              matchMedium: function(media) {
	                  var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

	                  // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
	                  if (style.styleSheet) {
	                      style.styleSheet.cssText = text;
	                  } else {
	                      style.textContent = text;
	                  }

	                  // Test if media query is true or false
	                  return info.width === '1px';
	              }
	          };
	      }

	      return function(media) {
	          return {
	              matches: styleMedia.matchMedium(media || 'all'),
	              media: media || 'all'
	          };
	      };
	  }());

	  /*
	   * jquery.requestAnimationFrame
	   * https://github.com/gnarf37/jquery-requestAnimationFrame
	   * Requires jQuery 1.8+
	   *
	   * Copyright (c) 2012 Corey Frang
	   * Licensed under the MIT license.
	   */

	  (function(jQuery) {


	  // requestAnimationFrame polyfill adapted from Erik Möller
	  // fixes from Paul Irish and Tino Zijdel
	  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	  var animating,
	      lastTime = 0,
	      vendors = ['webkit', 'moz'],
	      requestAnimationFrame = window.requestAnimationFrame,
	      cancelAnimationFrame = window.cancelAnimationFrame,
	      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

	  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
	    requestAnimationFrame = window[ vendors[lastTime] + 'RequestAnimationFrame' ];
	    cancelAnimationFrame = cancelAnimationFrame ||
	      window[ vendors[lastTime] + 'CancelAnimationFrame' ] ||
	      window[ vendors[lastTime] + 'CancelRequestAnimationFrame' ];
	  }

	  function raf() {
	    if (animating) {
	      requestAnimationFrame(raf);

	      if (jqueryFxAvailable) {
	        jQuery.fx.tick();
	      }
	    }
	  }

	  if (requestAnimationFrame) {
	    // use rAF
	    window.requestAnimationFrame = requestAnimationFrame;
	    window.cancelAnimationFrame = cancelAnimationFrame;

	    if (jqueryFxAvailable) {
	      jQuery.fx.timer = function (timer) {
	        if (timer() && jQuery.timers.push(timer) && !animating) {
	          animating = true;
	          raf();
	        }
	      };

	      jQuery.fx.stop = function () {
	        animating = false;
	      };
	    }
	  } else {
	    // polyfill
	    window.requestAnimationFrame = function (callback) {
	      var currTime = new Date().getTime(),
	        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
	        id = window.setTimeout(function () {
	          callback(currTime + timeToCall);
	        }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };

	    window.cancelAnimationFrame = function (id) {
	      clearTimeout(id);
	    };

	  }

	  }( $ ));

	  function removeQuotes (string) {
	    if (typeof string === 'string' || string instanceof String) {
	      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
	    }

	    return string;
	  }

	  window.Foundation = {
	    name : 'Foundation',

	    version : '5.5.2',

	    media_queries : {
	      'small'       : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'small-only'  : S('.foundation-mq-small-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'medium'      : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'medium-only' : S('.foundation-mq-medium-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'large'       : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'large-only'  : S('.foundation-mq-large-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'xlarge'      : S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'xlarge-only' : S('.foundation-mq-xlarge-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
	      'xxlarge'     : S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
	    },

	    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

	    global : {
	      namespace : undefined
	    },

	    init : function (scope, libraries, method, options, response) {
	      var args = [scope, method, options, response],
	          responses = [];

	      // check RTL
	      this.rtl = /rtl/i.test(S('html').attr('dir'));

	      // set foundation global scope
	      this.scope = scope || this.scope;

	      this.set_namespace();

	      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
	        if (this.libs.hasOwnProperty(libraries)) {
	          responses.push(this.init_lib(libraries, args));
	        }
	      } else {
	        for (var lib in this.libs) {
	          responses.push(this.init_lib(lib, libraries));
	        }
	      }

	      S(window).load(function () {
	        S(window)
	          .trigger('resize.fndtn.clearing')
	          .trigger('resize.fndtn.dropdown')
	          .trigger('resize.fndtn.equalizer')
	          .trigger('resize.fndtn.interchange')
	          .trigger('resize.fndtn.joyride')
	          .trigger('resize.fndtn.magellan')
	          .trigger('resize.fndtn.topbar')
	          .trigger('resize.fndtn.slider');
	      });

	      return scope;
	    },

	    init_lib : function (lib, args) {
	      if (this.libs.hasOwnProperty(lib)) {
	        this.patch(this.libs[lib]);

	        if (args && args.hasOwnProperty(lib)) {
	            if (typeof this.libs[lib].settings !== 'undefined') {
	              $.extend(true, this.libs[lib].settings, args[lib]);
	            } else if (typeof this.libs[lib].defaults !== 'undefined') {
	              $.extend(true, this.libs[lib].defaults, args[lib]);
	            }
	          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
	        }

	        args = args instanceof Array ? args : new Array(args);
	        return this.libs[lib].init.apply(this.libs[lib], args);
	      }

	      return function () {};
	    },

	    patch : function (lib) {
	      lib.scope = this.scope;
	      lib.namespace = this.global.namespace;
	      lib.rtl = this.rtl;
	      lib['data_options'] = this.utils.data_options;
	      lib['attr_name'] = attr_name;
	      lib['add_namespace'] = add_namespace;
	      lib['bindings'] = bindings;
	      lib['S'] = this.utils.S;
	    },

	    inherit : function (scope, methods) {
	      var methods_arr = methods.split(' '),
	          i = methods_arr.length;

	      while (i--) {
	        if (this.utils.hasOwnProperty(methods_arr[i])) {
	          scope[methods_arr[i]] = this.utils[methods_arr[i]];
	        }
	      }
	    },

	    set_namespace : function () {

	      // Description:
	      //    Don't bother reading the namespace out of the meta tag
	      //    if the namespace has been set globally in javascript
	      //
	      // Example:
	      //    Foundation.global.namespace = 'my-namespace';
	      // or make it an empty string:
	      //    Foundation.global.namespace = '';
	      //
	      //

	      // If the namespace has not been set (is undefined), try to read it out of the meta element.
	      // Otherwise use the globally defined namespace, even if it's empty ('')
	      var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

	      // Finally, if the namsepace is either undefined or false, set it to an empty string.
	      // Otherwise use the namespace value.
	      this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
	    },

	    libs : {},

	    // methods that can be inherited in libraries
	    utils : {

	      // Description:
	      //    Fast Selector wrapper returns jQuery object. Only use where getElementById
	      //    is not available.
	      //
	      // Arguments:
	      //    Selector (String): CSS selector describing the element(s) to be
	      //    returned as a jQuery object.
	      //
	      //    Scope (String): CSS selector describing the area to be searched. Default
	      //    is document.
	      //
	      // Returns:
	      //    Element (jQuery Object): jQuery object containing elements matching the
	      //    selector within the scope.
	      S : S,

	      // Description:
	      //    Executes a function a max of once every n milliseconds
	      //
	      // Arguments:
	      //    Func (Function): Function to be throttled.
	      //
	      //    Delay (Integer): Function execution threshold in milliseconds.
	      //
	      // Returns:
	      //    Lazy_function (Function): Function with throttling applied.
	      throttle : function (func, delay) {
	        var timer = null;

	        return function () {
	          var context = this, args = arguments;

	          if (timer == null) {
	            timer = setTimeout(function () {
	              func.apply(context, args);
	              timer = null;
	            }, delay);
	          }
	        };
	      },

	      // Description:
	      //    Executes a function when it stops being invoked for n seconds
	      //    Modified version of _.debounce() http://underscorejs.org
	      //
	      // Arguments:
	      //    Func (Function): Function to be debounced.
	      //
	      //    Delay (Integer): Function execution threshold in milliseconds.
	      //
	      //    Immediate (Bool): Whether the function should be called at the beginning
	      //    of the delay instead of the end. Default is false.
	      //
	      // Returns:
	      //    Lazy_function (Function): Function with debouncing applied.
	      debounce : function (func, delay, immediate) {
	        var timeout, result;
	        return function () {
	          var context = this, args = arguments;
	          var later = function () {
	            timeout = null;
	            if (!immediate) {
	              result = func.apply(context, args);
	            }
	          };
	          var callNow = immediate && !timeout;
	          clearTimeout(timeout);
	          timeout = setTimeout(later, delay);
	          if (callNow) {
	            result = func.apply(context, args);
	          }
	          return result;
	        };
	      },

	      // Description:
	      //    Parses data-options attribute
	      //
	      // Arguments:
	      //    El (jQuery Object): Element to be parsed.
	      //
	      // Returns:
	      //    Options (Javascript Object): Contents of the element's data-options
	      //    attribute.
	      data_options : function (el, data_attr_name) {
	        data_attr_name = data_attr_name || 'options';
	        var opts = {}, ii, p, opts_arr,
	            data_options = function (el) {
	              var namespace = Foundation.global.namespace;

	              if (namespace.length > 0) {
	                return el.data(namespace + '-' + data_attr_name);
	              }

	              return el.data(data_attr_name);
	            };

	        var cached_options = data_options(el);

	        if (typeof cached_options === 'object') {
	          return cached_options;
	        }

	        opts_arr = (cached_options || ':').split(';');
	        ii = opts_arr.length;

	        function isNumber (o) {
	          return !isNaN (o - 0) && o !== null && o !== '' && o !== false && o !== true;
	        }

	        function trim (str) {
	          if (typeof str === 'string') {
	            return $.trim(str);
	          }
	          return str;
	        }

	        while (ii--) {
	          p = opts_arr[ii].split(':');
	          p = [p[0], p.slice(1).join(':')];

	          if (/true/i.test(p[1])) {
	            p[1] = true;
	          }
	          if (/false/i.test(p[1])) {
	            p[1] = false;
	          }
	          if (isNumber(p[1])) {
	            if (p[1].indexOf('.') === -1) {
	              p[1] = parseInt(p[1], 10);
	            } else {
	              p[1] = parseFloat(p[1]);
	            }
	          }

	          if (p.length === 2 && p[0].length > 0) {
	            opts[trim(p[0])] = trim(p[1]);
	          }
	        }

	        return opts;
	      },

	      // Description:
	      //    Adds JS-recognizable media queries
	      //
	      // Arguments:
	      //    Media (String): Key string for the media query to be stored as in
	      //    Foundation.media_queries
	      //
	      //    Class (String): Class name for the generated <meta> tag
	      register_media : function (media, media_class) {
	        if (Foundation.media_queries[media] === undefined) {
	          $('head').append('<meta class="' + media_class + '"/>');
	          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
	        }
	      },

	      // Description:
	      //    Add custom CSS within a JS-defined media query
	      //
	      // Arguments:
	      //    Rule (String): CSS rule to be appended to the document.
	      //
	      //    Media (String): Optional media query string for the CSS rule to be
	      //    nested under.
	      add_custom_rule : function (rule, media) {
	        if (media === undefined && Foundation.stylesheet) {
	          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
	        } else {
	          var query = Foundation.media_queries[media];

	          if (query !== undefined) {
	            Foundation.stylesheet.insertRule('@media ' +
	              Foundation.media_queries[media] + '{ ' + rule + ' }', Foundation.stylesheet.cssRules.length);
	          }
	        }
	      },

	      // Description:
	      //    Performs a callback function when an image is fully loaded
	      //
	      // Arguments:
	      //    Image (jQuery Object): Image(s) to check if loaded.
	      //
	      //    Callback (Function): Function to execute when image is fully loaded.
	      image_loaded : function (images, callback) {
	        var self = this,
	            unloaded = images.length;

	        function pictures_has_height(images) {
	          var pictures_number = images.length;

	          for (var i = pictures_number - 1; i >= 0; i--) {
	            if(images.attr('height') === undefined) {
	              return false;
	            };
	          };

	          return true;
	        }

	        if (unloaded === 0 || pictures_has_height(images)) {
	          callback(images);
	        }

	        images.each(function () {
	          single_image_loaded(self.S(this), function () {
	            unloaded -= 1;
	            if (unloaded === 0) {
	              callback(images);
	            }
	          });
	        });
	      },

	      // Description:
	      //    Returns a random, alphanumeric string
	      //
	      // Arguments:
	      //    Length (Integer): Length of string to be generated. Defaults to random
	      //    integer.
	      //
	      // Returns:
	      //    Rand (String): Pseudo-random, alphanumeric string.
	      random_str : function () {
	        if (!this.fidx) {
	          this.fidx = 0;
	        }
	        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

	        return this.prefix + (this.fidx++).toString(36);
	      },

	      // Description:
	      //    Helper for window.matchMedia
	      //
	      // Arguments:
	      //    mq (String): Media query
	      //
	      // Returns:
	      //    (Boolean): Whether the media query passes or not
	      match : function (mq) {
	        return window.matchMedia(mq).matches;
	      },

	      // Description:
	      //    Helpers for checking Foundation default media queries with JS
	      //
	      // Returns:
	      //    (Boolean): Whether the media query passes or not

	      is_small_up : function () {
	        return this.match(Foundation.media_queries.small);
	      },

	      is_medium_up : function () {
	        return this.match(Foundation.media_queries.medium);
	      },

	      is_large_up : function () {
	        return this.match(Foundation.media_queries.large);
	      },

	      is_xlarge_up : function () {
	        return this.match(Foundation.media_queries.xlarge);
	      },

	      is_xxlarge_up : function () {
	        return this.match(Foundation.media_queries.xxlarge);
	      },

	      is_small_only : function () {
	        return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
	      },

	      is_medium_only : function () {
	        return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
	      },

	      is_large_only : function () {
	        return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
	      },

	      is_xlarge_only : function () {
	        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
	      },

	      is_xxlarge_only : function () {
	        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
	      }
	    }
	  };

	  $.fn.foundation = function () {
	    var args = Array.prototype.slice.call(arguments, 0);

	    return this.each(function () {
	      Foundation.init.apply(Foundation, [this].concat(args));
	      return this;
	    });
	  };

	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.abide = {
	    name : 'abide',

	    version : '5.5.2',

	    settings : {
	      live_validate : true,
	      validate_on_blur : true,
	      // validate_on: 'tab', // tab (when user tabs between fields), change (input changes), manual (call custom events) 
	      focus_on_invalid : true,
	      error_labels : true, // labels with a for="inputId" will recieve an `error` class
	      error_class : 'error',
	      timeout : 1000,
	      patterns : {
	        alpha : /^[a-zA-Z]+$/,
	        alpha_numeric : /^[a-zA-Z0-9]+$/,
	        integer : /^[-+]?\d+$/,
	        number : /^[-+]?\d*(?:[\.\,]\d+)?$/,

	        // amex, visa, diners
	        card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
	        cvv : /^([0-9]){3,4}$/,

	        // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
	        email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

	        // http://blogs.lse.ac.uk/lti/2008/04/23/a-regular-expression-to-match-any-url/
	        url: /^(https?|ftp|file|ssh):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/,
	        // abc.de
	        domain : /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,

	        datetime : /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
	        // YYYY-MM-DD
	        date : /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
	        // HH:MM:SS
	        time : /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
	        dateISO : /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
	        // MM/DD/YYYY
	        month_day_year : /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
	        // DD/MM/YYYY
	        day_month_year : /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,

	        // #FFF or #FFFFFF
	        color : /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
	      },
	      validators : {
	        equalTo : function (el, required, parent) {
	          var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
	              to    = el.value,
	              valid = (from === to);

	          return valid;
	        }
	      }
	    },

	    timer : null,

	    init : function (scope, method, options) {
	      this.bindings(method, options);
	    },

	    events : function (scope) {
	      var self = this,
	          form = self.S(scope).attr('novalidate', 'novalidate'),
	          settings = form.data(this.attr_name(true) + '-init') || {};

	      this.invalid_attr = this.add_namespace('data-invalid');

	      function validate(originalSelf, e) {
	        clearTimeout(self.timer);
	        self.timer = setTimeout(function () {
	          self.validate([originalSelf], e);
	        }.bind(originalSelf), settings.timeout);
	      }


	      form
	        .off('.abide')
	        .on('submit.fndtn.abide', function (e) {
	          var is_ajax = /ajax/i.test(self.S(this).attr(self.attr_name()));
	          return self.validate(self.S(this).find('input, textarea, select').not(":hidden, [data-abide-ignore]").get(), e, is_ajax);
	        })
	        .on('validate.fndtn.abide', function (e) {
	          if (settings.validate_on === 'manual') {
	            self.validate([e.target], e);
	          }
	        })
	        .on('reset', function (e) {
	          return self.reset($(this), e);          
	        })
	        .find('input, textarea, select').not(":hidden, [data-abide-ignore]")
	          .off('.abide')
	          .on('blur.fndtn.abide change.fndtn.abide', function (e) {
	            // old settings fallback
	            // will be deprecated with F6 release
	            if (settings.validate_on_blur && settings.validate_on_blur === true) {
	              validate(this, e);
	            }
	            // new settings combining validate options into one setting
	            if (settings.validate_on === 'change') {
	              validate(this, e);
	            }
	          })
	          .on('keydown.fndtn.abide', function (e) {
	            // old settings fallback
	            // will be deprecated with F6 release
	            if (settings.live_validate && settings.live_validate === true && e.which != 9) {
	              validate(this, e);
	            }
	            // new settings combining validate options into one setting
	            if (settings.validate_on === 'tab' && e.which === 9) {
	              validate(this, e);
	            }
	            else if (settings.validate_on === 'change') {
	              validate(this, e);
	            }
	          })
	          .on('focus', function (e) {
	            if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)) {
	              $('html, body').animate({
	                  scrollTop: $(e.target).offset().top
	              }, 100);
	            } 
	          });
	    },

	    reset : function (form, e) {
	      var self = this;
	      form.removeAttr(self.invalid_attr);

	      $('[' + self.invalid_attr + ']', form).removeAttr(self.invalid_attr);
	      $('.' + self.settings.error_class, form).not('small').removeClass(self.settings.error_class);
	      $(':input', form).not(':button, :submit, :reset, :hidden, [data-abide-ignore]').val('').removeAttr(self.invalid_attr);
	    },

	    validate : function (els, e, is_ajax) {
	      var validations = this.parse_patterns(els),
	          validation_count = validations.length,
	          form = this.S(els[0]).closest('form'),
	          submit_event = /submit/.test(e.type);

	      // Has to count up to make sure the focus gets applied to the top error
	      for (var i = 0; i < validation_count; i++) {
	        if (!validations[i] && (submit_event || is_ajax)) {
	          if (this.settings.focus_on_invalid) {
	            els[i].focus();
	          }
	          form.trigger('invalid.fndtn.abide');
	          this.S(els[i]).closest('form').attr(this.invalid_attr, '');
	          return false;
	        }
	      }

	      if (submit_event || is_ajax) {
	        form.trigger('valid.fndtn.abide');
	      }

	      form.removeAttr(this.invalid_attr);

	      if (is_ajax) {
	        return false;
	      }

	      return true;
	    },

	    parse_patterns : function (els) {
	      var i = els.length,
	          el_patterns = [];

	      while (i--) {
	        el_patterns.push(this.pattern(els[i]));
	      }

	      return this.check_validation_and_apply_styles(el_patterns);
	    },

	    pattern : function (el) {
	      var type = el.getAttribute('type'),
	          required = typeof el.getAttribute('required') === 'string';

	      var pattern = el.getAttribute('pattern') || '';

	      if (this.settings.patterns.hasOwnProperty(pattern) && pattern.length > 0) {
	        return [el, this.settings.patterns[pattern], required];
	      } else if (pattern.length > 0) {
	        return [el, new RegExp(pattern), required];
	      }

	      if (this.settings.patterns.hasOwnProperty(type)) {
	        return [el, this.settings.patterns[type], required];
	      }

	      pattern = /.*/;

	      return [el, pattern, required];
	    },

	    // TODO: Break this up into smaller methods, getting hard to read.
	    check_validation_and_apply_styles : function (el_patterns) {
	      var i = el_patterns.length,
	          validations = [],
	          form = this.S(el_patterns[0][0]).closest('[data-' + this.attr_name(true) + ']'),
	          settings = form.data(this.attr_name(true) + '-init') || {};
	      while (i--) {
	        var el = el_patterns[i][0],
	            required = el_patterns[i][2],
	            value = el.value.trim(),
	            direct_parent = this.S(el).parent(),
	            validator = el.getAttribute(this.add_namespace('data-abide-validator')),
	            is_radio = el.type === 'radio',
	            is_checkbox = el.type === 'checkbox',
	            label = this.S('label[for="' + el.getAttribute('id') + '"]'),
	            valid_length = (required) ? (el.value.length > 0) : true,
	            el_validations = [];

	        var parent, valid;

	        // support old way to do equalTo validations
	        if (el.getAttribute(this.add_namespace('data-equalto'))) { validator = 'equalTo' }

	        if (!direct_parent.is('label')) {
	          parent = direct_parent;
	        } else {
	          parent = direct_parent.parent();
	        }

	        if (is_radio && required) {
	          el_validations.push(this.valid_radio(el, required));
	        } else if (is_checkbox && required) {
	          el_validations.push(this.valid_checkbox(el, required));

	        } else if (validator) {
	          // Validate using each of the specified (space-delimited) validators.
	          var validators = validator.split(' ');
	          var last_valid = true, all_valid = true;
	          for (var iv = 0; iv < validators.length; iv++) {
	              valid = this.settings.validators[validators[iv]].apply(this, [el, required, parent])
	              el_validations.push(valid);
	              all_valid = valid && last_valid;
	              last_valid = valid;
	          }
	          if (all_valid) {
	              this.S(el).removeAttr(this.invalid_attr);
	              parent.removeClass('error');
	              if (label.length > 0 && this.settings.error_labels) {
	                label.removeClass(this.settings.error_class).removeAttr('role');
	              }
	              $(el).triggerHandler('valid');
	          } else {
	              this.S(el).attr(this.invalid_attr, '');
	              parent.addClass('error');
	              if (label.length > 0 && this.settings.error_labels) {
	                label.addClass(this.settings.error_class).attr('role', 'alert');
	              }
	              $(el).triggerHandler('invalid');
	          }
	        } else {

	          if (el_patterns[i][1].test(value) && valid_length ||
	            !required && el.value.length < 1 || $(el).attr('disabled')) {
	            el_validations.push(true);
	          } else {
	            el_validations.push(false);
	          }

	          el_validations = [el_validations.every(function (valid) {return valid;})];
	          if (el_validations[0]) {
	            this.S(el).removeAttr(this.invalid_attr);
	            el.setAttribute('aria-invalid', 'false');
	            el.removeAttribute('aria-describedby');
	            parent.removeClass(this.settings.error_class);
	            if (label.length > 0 && this.settings.error_labels) {
	              label.removeClass(this.settings.error_class).removeAttr('role');
	            }
	            $(el).triggerHandler('valid');
	          } else {
	            this.S(el).attr(this.invalid_attr, '');
	            el.setAttribute('aria-invalid', 'true');

	            // Try to find the error associated with the input
	            var errorElem = parent.find('small.' + this.settings.error_class, 'span.' + this.settings.error_class);
	            var errorID = errorElem.length > 0 ? errorElem[0].id : '';
	            if (errorID.length > 0) {
	              el.setAttribute('aria-describedby', errorID);
	            }

	            // el.setAttribute('aria-describedby', $(el).find('.error')[0].id);
	            parent.addClass(this.settings.error_class);
	            if (label.length > 0 && this.settings.error_labels) {
	              label.addClass(this.settings.error_class).attr('role', 'alert');
	            }
	            $(el).triggerHandler('invalid');
	          }
	        }
	        validations = validations.concat(el_validations);
	      }
	      return validations;
	    },

	    valid_checkbox : function (el, required) {
	      var el = this.S(el),
	          valid = (el.is(':checked') || !required || el.get(0).getAttribute('disabled'));

	      if (valid) {
	        el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
	        $(el).triggerHandler('valid');
	      } else {
	        el.attr(this.invalid_attr, '').parent().addClass(this.settings.error_class);
	        $(el).triggerHandler('invalid');
	      }

	      return valid;
	    },

	    valid_radio : function (el, required) {
	      var name = el.getAttribute('name'),
	          group = this.S(el).closest('[data-' + this.attr_name(true) + ']').find("[name='" + name + "']"),
	          count = group.length,
	          valid = false,
	          disabled = false;

	      // Has to count up to make sure the focus gets applied to the top error
	        for (var i=0; i < count; i++) {
	            if( group[i].getAttribute('disabled') ){
	                disabled=true;
	                valid=true;
	            } else {
	                if (group[i].checked){
	                    valid = true;
	                } else {
	                    if( disabled ){
	                        valid = false;
	                    }
	                }
	            }
	        }

	      // Has to count up to make sure the focus gets applied to the top error
	      for (var i = 0; i < count; i++) {
	        if (valid) {
	          this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
	          $(group[i]).triggerHandler('valid');
	        } else {
	          this.S(group[i]).attr(this.invalid_attr, '').parent().addClass(this.settings.error_class);
	          $(group[i]).triggerHandler('invalid');
	        }
	      }

	      return valid;
	    },

	    valid_equal : function (el, required, parent) {
	      var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
	          to    = el.value,
	          valid = (from === to);

	      if (valid) {
	        this.S(el).removeAttr(this.invalid_attr);
	        parent.removeClass(this.settings.error_class);
	        if (label.length > 0 && settings.error_labels) {
	          label.removeClass(this.settings.error_class);
	        }
	      } else {
	        this.S(el).attr(this.invalid_attr, '');
	        parent.addClass(this.settings.error_class);
	        if (label.length > 0 && settings.error_labels) {
	          label.addClass(this.settings.error_class);
	        }
	      }

	      return valid;
	    },

	    valid_oneof : function (el, required, parent, doNotValidateOthers) {
	      var el = this.S(el),
	        others = this.S('[' + this.add_namespace('data-oneof') + ']'),
	        valid = others.filter(':checked').length > 0;

	      if (valid) {
	        el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);
	      } else {
	        el.attr(this.invalid_attr, '').parent().addClass(this.settings.error_class);
	      }

	      if (!doNotValidateOthers) {
	        var _this = this;
	        others.each(function () {
	          _this.valid_oneof.call(_this, this, null, null, true);
	        });
	      }

	      return valid;
	    },

	    reflow : function(scope, options) {
	      var self = this,
	          form = self.S('[' + this.attr_name() + ']').attr('novalidate', 'novalidate');
	          self.S(form).each(function (idx, el) {
	            self.events(el);
	          });
	    }
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.accordion = {
	    name : 'accordion',

	    version : '5.5.2',

	    settings : {
	      content_class : 'content',
	      active_class : 'active',
	      multi_expand : false,
	      toggleable : true,
	      callback : function () {}
	    },

	    init : function (scope, method, options) {
	      this.bindings(method, options);
	    },

	    events : function (instance) {
	      var self = this;
	      var S = this.S;
	      self.create(this.S(instance));

	      S(this.scope)
	      .off('.fndtn.accordion')
	      .on('click.fndtn.accordion', '[' + this.attr_name() + '] > dd > a, [' + this.attr_name() + '] > li > a', function (e) {
	        var accordion = S(this).closest('[' + self.attr_name() + ']'),
	            groupSelector = self.attr_name() + '=' + accordion.attr(self.attr_name()),
	            settings = accordion.data(self.attr_name(true) + '-init') || self.settings,
	            target = S('#' + this.href.split('#')[1]),
	            aunts = $('> dd, > li', accordion),
	            siblings = aunts.children('.' + settings.content_class),
	            active_content = siblings.filter('.' + settings.active_class);

	        e.preventDefault();

	        if (accordion.attr(self.attr_name())) {
	          siblings = siblings.add('[' + groupSelector + '] dd > ' + '.' + settings.content_class + ', [' + groupSelector + '] li > ' + '.' + settings.content_class);
	          aunts = aunts.add('[' + groupSelector + '] dd, [' + groupSelector + '] li');
	        }

	        if (settings.toggleable && target.is(active_content)) {
	          target.parent('dd, li').toggleClass(settings.active_class, false);
	          target.toggleClass(settings.active_class, false);
	          S(this).attr('aria-expanded', function(i, attr){
	              return attr === 'true' ? 'false' : 'true';
	          });
	          settings.callback(target);
	          target.triggerHandler('toggled', [accordion]);
	          accordion.triggerHandler('toggled', [target]);
	          return;
	        }

	        if (!settings.multi_expand) {
	          siblings.removeClass(settings.active_class);
	          aunts.removeClass(settings.active_class);
	          aunts.children('a').attr('aria-expanded','false');
	        }

	        target.addClass(settings.active_class).parent().addClass(settings.active_class);
	        settings.callback(target);
	        target.triggerHandler('toggled', [accordion]);
	        accordion.triggerHandler('toggled', [target]);
	        S(this).attr('aria-expanded','true');
	      });
	    },

	    create: function($instance) {
	      var self = this,
	          accordion = $instance,
	          aunts = $('> .accordion-navigation', accordion),
	          settings = accordion.data(self.attr_name(true) + '-init') || self.settings;

	      aunts.children('a').attr('aria-expanded','false');
	      aunts.has('.' + settings.content_class + '.' + settings.active_class).children('a').attr('aria-expanded','true');

	      if (settings.multi_expand) {
	        $instance.attr('aria-multiselectable','true');
	      }
	    },

	    off : function () {},

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.alert = {
	    name : 'alert',

	    version : '5.5.2',

	    settings : {
	      callback : function () {}
	    },

	    init : function (scope, method, options) {
	      this.bindings(method, options);
	    },

	    events : function () {
	      var self = this,
	          S = this.S;

	      $(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] .close', function (e) {
	        var alertBox = S(this).closest('[' + self.attr_name() + ']'),
	            settings = alertBox.data(self.attr_name(true) + '-init') || self.settings;

	        e.preventDefault();
	        if (Modernizr.csstransitions) {
	          alertBox.addClass('alert-close');
	          alertBox.on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
	            S(this).trigger('close.fndtn.alert').remove();
	            settings.callback();
	          });
	        } else {
	          alertBox.fadeOut(300, function () {
	            S(this).trigger('close.fndtn.alert').remove();
	            settings.callback();
	          });
	        }
	      });
	    },

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.clearing = {
	    name : 'clearing',

	    version : '5.5.2',

	    settings : {
	      templates : {
	        viewing : '<a href="#" class="clearing-close">&times;</a>' +
	          '<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' +
	          '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' +
	          '<a href="#" class="clearing-main-next"><span></span></a></div>' +
	          '<img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' +
	          '<img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'
	      },

	      // comma delimited list of selectors that, on click, will close clearing,
	      // add 'div.clearing-blackout, div.visible-img' to close on background click
	      close_selectors : '.clearing-close, div.clearing-blackout',

	      // Default to the entire li element.
	      open_selectors : '',

	      // Image will be skipped in carousel.
	      skip_selector : '',

	      touch_label : '',

	      // event initializers and locks
	      init : false,
	      locked : false
	    },

	    init : function (scope, method, options) {
	      var self = this;
	      Foundation.inherit(this, 'throttle image_loaded');

	      this.bindings(method, options);

	      if (self.S(this.scope).is('[' + this.attr_name() + ']')) {
	        this.assemble(self.S('li', this.scope));
	      } else {
	        self.S('[' + this.attr_name() + ']', this.scope).each(function () {
	          self.assemble(self.S('li', this));
	        });
	      }
	    },

	    events : function (scope) {
	      var self = this,
	          S = self.S,
	          $scroll_container = $('.scroll-container');

	      if ($scroll_container.length > 0) {
	        this.scope = $scroll_container;
	      }

	      S(this.scope)
	        .off('.clearing')
	        .on('click.fndtn.clearing', 'ul[' + this.attr_name() + '] li ' + this.settings.open_selectors,
	          function (e, current, target) {
	            var current = current || S(this),
	                target = target || current,
	                next = current.next('li'),
	                settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init'),
	                image = S(e.target);

	            e.preventDefault();

	            if (!settings) {
	              self.init();
	              settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
	            }

	            // if clearing is open and the current image is
	            // clicked, go to the next image in sequence
	            if (target.hasClass('visible') &&
	              current[0] === target[0] &&
	              next.length > 0 && self.is_open(current)) {
	              target = next;
	              image = S('img', target);
	            }

	            // set current and target to the clicked li if not otherwise defined.
	            self.open(image, current, target);
	            self.update_paddles(target);
	          })

	        .on('click.fndtn.clearing', '.clearing-main-next',
	          function (e) { self.nav(e, 'next') })
	        .on('click.fndtn.clearing', '.clearing-main-prev',
	          function (e) { self.nav(e, 'prev') })
	        .on('click.fndtn.clearing', this.settings.close_selectors,
	          function (e) { Foundation.libs.clearing.close(e, this) });

	      $(document).on('keydown.fndtn.clearing',
	          function (e) { self.keydown(e) });

	      S(window).off('.clearing').on('resize.fndtn.clearing',
	        function () { self.resize() });

	      this.swipe_events(scope);
	    },

	    swipe_events : function (scope) {
	      var self = this,
	      S = self.S;

	      S(this.scope)
	        .on('touchstart.fndtn.clearing', '.visible-img', function (e) {
	          if (!e.touches) { e = e.originalEvent; }
	          var data = {
	                start_page_x : e.touches[0].pageX,
	                start_page_y : e.touches[0].pageY,
	                start_time : (new Date()).getTime(),
	                delta_x : 0,
	                is_scrolling : undefined
	              };

	          S(this).data('swipe-transition', data);
	          e.stopPropagation();
	        })
	        .on('touchmove.fndtn.clearing', '.visible-img', function (e) {
	          if (!e.touches) {
	            e = e.originalEvent;
	          }
	          // Ignore pinch/zoom events
	          if (e.touches.length > 1 || e.scale && e.scale !== 1) {
	            return;
	          }

	          var data = S(this).data('swipe-transition');

	          if (typeof data === 'undefined') {
	            data = {};
	          }

	          data.delta_x = e.touches[0].pageX - data.start_page_x;

	          if (Foundation.rtl) {
	            data.delta_x = -data.delta_x;
	          }

	          if (typeof data.is_scrolling === 'undefined') {
	            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
	          }

	          if (!data.is_scrolling && !data.active) {
	            e.preventDefault();
	            var direction = (data.delta_x < 0) ? 'next' : 'prev';
	            data.active = true;
	            self.nav(e, direction);
	          }
	        })
	        .on('touchend.fndtn.clearing', '.visible-img', function (e) {
	          S(this).data('swipe-transition', {});
	          e.stopPropagation();
	        });
	    },

	    assemble : function ($li) {
	      var $el = $li.parent();

	      if ($el.parent().hasClass('carousel')) {
	        return;
	      }

	      $el.after('<div id="foundationClearingHolder"></div>');

	      var grid = $el.detach(),
	          grid_outerHTML = '';

	      if (grid[0] == null) {
	        return;
	      } else {
	        grid_outerHTML = grid[0].outerHTML;
	      }

	      var holder = this.S('#foundationClearingHolder'),
	          settings = $el.data(this.attr_name(true) + '-init'),
	          data = {
	            grid : '<div class="carousel">' + grid_outerHTML + '</div>',
	            viewing : settings.templates.viewing
	          },
	          wrapper = '<div class="clearing-assembled"><div>' + data.viewing +
	            data.grid + '</div></div>',
	          touch_label = this.settings.touch_label;

	      if (Modernizr.touch) {
	        wrapper = $(wrapper).find('.clearing-touch-label').html(touch_label).end();
	      }

	      holder.after(wrapper).remove();
	    },

	    open : function ($image, current, target) {
	      var self = this,
	          body = $(document.body),
	          root = target.closest('.clearing-assembled'),
	          container = self.S('div', root).first(),
	          visible_image = self.S('.visible-img', container),
	          image = self.S('img', visible_image).not($image),
	          label = self.S('.clearing-touch-label', container),
	          error = false,
	          loaded = {};

	      // Event to disable scrolling on touch devices when Clearing is activated
	      $('body').on('touchmove', function (e) {
	        e.preventDefault();
	      });

	      image.error(function () {
	        error = true;
	      });

	      function startLoad() {
	        setTimeout(function () {
	          this.image_loaded(image, function () {
	            if (image.outerWidth() === 1 && !error) {
	              startLoad.call(this);
	            } else {
	              cb.call(this, image);
	            }
	          }.bind(this));
	        }.bind(this), 100);
	      }

	      function cb (image) {
	        var $image = $(image);
	        $image.css('visibility', 'visible');
	        $image.trigger('imageVisible');
	        // toggle the gallery
	        body.css('overflow', 'hidden');
	        root.addClass('clearing-blackout');
	        container.addClass('clearing-container');
	        visible_image.show();
	        this.fix_height(target)
	          .caption(self.S('.clearing-caption', visible_image), self.S('img', target))
	          .center_and_label(image, label)
	          .shift(current, target, function () {
	            target.closest('li').siblings().removeClass('visible');
	            target.closest('li').addClass('visible');
	          });
	        visible_image.trigger('opened.fndtn.clearing')
	      }

	      if (!this.locked()) {
	        visible_image.trigger('open.fndtn.clearing');
	        // set the image to the selected thumbnail
	        loaded = this.load($image);
	        if (loaded.interchange) {
	          image
	            .attr('data-interchange', loaded.interchange)
	            .foundation('interchange', 'reflow');
	        } else {
	          image
	            .attr('src', loaded.src)
	            .attr('data-interchange', '');
	        }
	        image.css('visibility', 'hidden');

	        startLoad.call(this);
	      }
	    },

	    close : function (e, el) {
	      e.preventDefault();

	      var root = (function (target) {
	            if (/blackout/.test(target.selector)) {
	              return target;
	            } else {
	              return target.closest('.clearing-blackout');
	            }
	          }($(el))),
	          body = $(document.body), container, visible_image;

	      if (el === e.target && root) {
	        body.css('overflow', '');
	        container = $('div', root).first();
	        visible_image = $('.visible-img', container);
	        visible_image.trigger('close.fndtn.clearing');
	        this.settings.prev_index = 0;
	        $('ul[' + this.attr_name() + ']', root)
	          .attr('style', '').closest('.clearing-blackout')
	          .removeClass('clearing-blackout');
	        container.removeClass('clearing-container');
	        visible_image.hide();
	        visible_image.trigger('closed.fndtn.clearing');
	      }

	      // Event to re-enable scrolling on touch devices
	      $('body').off('touchmove');

	      return false;
	    },

	    is_open : function (current) {
	      return current.parent().prop('style').length > 0;
	    },

	    keydown : function (e) {
	      var clearing = $('.clearing-blackout ul[' + this.attr_name() + ']'),
	          NEXT_KEY = this.rtl ? 37 : 39,
	          PREV_KEY = this.rtl ? 39 : 37,
	          ESC_KEY = 27;

	      if (e.which === NEXT_KEY) {
	        this.go(clearing, 'next');
	      }
	      if (e.which === PREV_KEY) {
	        this.go(clearing, 'prev');
	      }
	      if (e.which === ESC_KEY) {
	        this.S('a.clearing-close').trigger('click.fndtn.clearing');
	      }
	    },

	    nav : function (e, direction) {
	      var clearing = $('ul[' + this.attr_name() + ']', '.clearing-blackout');

	      e.preventDefault();
	      this.go(clearing, direction);
	    },

	    resize : function () {
	      var image = $('img', '.clearing-blackout .visible-img'),
	          label = $('.clearing-touch-label', '.clearing-blackout');

	      if (image.length) {
	        this.center_and_label(image, label);
	        image.trigger('resized.fndtn.clearing')
	      }
	    },

	    // visual adjustments
	    fix_height : function (target) {
	      var lis = target.parent().children(),
	          self = this;

	      lis.each(function () {
	        var li = self.S(this),
	            image = li.find('img');

	        if (li.height() > image.outerHeight()) {
	          li.addClass('fix-height');
	        }
	      })
	      .closest('ul')
	      .width(lis.length * 100 + '%');

	      return this;
	    },

	    update_paddles : function (target) {
	      target = target.closest('li');
	      var visible_image = target
	        .closest('.carousel')
	        .siblings('.visible-img');

	      if (target.next().length > 0) {
	        this.S('.clearing-main-next', visible_image).removeClass('disabled');
	      } else {
	        this.S('.clearing-main-next', visible_image).addClass('disabled');
	      }

	      if (target.prev().length > 0) {
	        this.S('.clearing-main-prev', visible_image).removeClass('disabled');
	      } else {
	        this.S('.clearing-main-prev', visible_image).addClass('disabled');
	      }
	    },

	    center_and_label : function (target, label) {
	      if (!this.rtl && label.length > 0) {
	        label.css({
	          marginLeft : -(label.outerWidth() / 2),
	          marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10
	        });
	      } else {
	        label.css({
	          marginRight : -(label.outerWidth() / 2),
	          marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10,
	          left: 'auto',
	          right: '50%'
	        });
	      }
	      return this;
	    },

	    // image loading and preloading

	    load : function ($image) {
	      var href,
	          interchange,
	          closest_a;

	      if ($image[0].nodeName === 'A') {
	        href = $image.attr('href');
	        interchange = $image.data('clearing-interchange');
	      } else {
	        closest_a = $image.closest('a');
	        href = closest_a.attr('href');
	        interchange = closest_a.data('clearing-interchange');
	      }

	      this.preload($image);

	      return {
	        'src': href ? href : $image.attr('src'),
	        'interchange': href ? interchange : $image.data('clearing-interchange')
	      }
	    },

	    preload : function ($image) {
	      this
	        .img($image.closest('li').next(), 'next')
	        .img($image.closest('li').prev(), 'prev');
	    },

	    img : function (img, sibling_type) {
	      if (img.length) {
	        var preload_img = $('.clearing-preload-' + sibling_type),
	            new_a = this.S('a', img),
	            src,
	            interchange,
	            image;

	        if (new_a.length) {
	          src = new_a.attr('href');
	          interchange = new_a.data('clearing-interchange');
	        } else {
	          image = this.S('img', img);
	          src = image.attr('src');
	          interchange = image.data('clearing-interchange');
	        }

	        if (interchange) {
	          preload_img.attr('data-interchange', interchange);
	        } else {
	          preload_img.attr('src', src);
	          preload_img.attr('data-interchange', '');
	        }
	      }
	      return this;
	    },

	    // image caption

	    caption : function (container, $image) {
	      var caption = $image.attr('data-caption');

	      if (caption) {
	        container
	          .html(caption)
	          .show();
	      } else {
	        container
	          .text('')
	          .hide();
	      }
	      return this;
	    },

	    // directional methods

	    go : function ($ul, direction) {
	      var current = this.S('.visible', $ul),
	          target = current[direction]();

	      // Check for skip selector.
	      if (this.settings.skip_selector && target.find(this.settings.skip_selector).length != 0) {
	        target = target[direction]();
	      }

	      if (target.length) {
	        this.S('img', target)
	          .trigger('click.fndtn.clearing', [current, target])
	          .trigger('change.fndtn.clearing');
	      }
	    },

	    shift : function (current, target, callback) {
	      var clearing = target.parent(),
	          old_index = this.settings.prev_index || target.index(),
	          direction = this.direction(clearing, current, target),
	          dir = this.rtl ? 'right' : 'left',
	          left = parseInt(clearing.css('left'), 10),
	          width = target.outerWidth(),
	          skip_shift;

	      var dir_obj = {};

	      // we use jQuery animate instead of CSS transitions because we
	      // need a callback to unlock the next animation
	      // needs support for RTL **
	      if (target.index() !== old_index && !/skip/.test(direction)) {
	        if (/left/.test(direction)) {
	          this.lock();
	          dir_obj[dir] = left + width;
	          clearing.animate(dir_obj, 300, this.unlock());
	        } else if (/right/.test(direction)) {
	          this.lock();
	          dir_obj[dir] = left - width;
	          clearing.animate(dir_obj, 300, this.unlock());
	        }
	      } else if (/skip/.test(direction)) {
	        // the target image is not adjacent to the current image, so
	        // do we scroll right or not
	        skip_shift = target.index() - this.settings.up_count;
	        this.lock();

	        if (skip_shift > 0) {
	          dir_obj[dir] = -(skip_shift * width);
	          clearing.animate(dir_obj, 300, this.unlock());
	        } else {
	          dir_obj[dir] = 0;
	          clearing.animate(dir_obj, 300, this.unlock());
	        }
	      }

	      callback();
	    },

	    direction : function ($el, current, target) {
	      var lis = this.S('li', $el),
	          li_width = lis.outerWidth() + (lis.outerWidth() / 4),
	          up_count = Math.floor(this.S('.clearing-container').outerWidth() / li_width) - 1,
	          target_index = lis.index(target),
	          response;

	      this.settings.up_count = up_count;

	      if (this.adjacent(this.settings.prev_index, target_index)) {
	        if ((target_index > up_count) && target_index > this.settings.prev_index) {
	          response = 'right';
	        } else if ((target_index > up_count - 1) && target_index <= this.settings.prev_index) {
	          response = 'left';
	        } else {
	          response = false;
	        }
	      } else {
	        response = 'skip';
	      }

	      this.settings.prev_index = target_index;

	      return response;
	    },

	    adjacent : function (current_index, target_index) {
	      for (var i = target_index + 1; i >= target_index - 1; i--) {
	        if (i === current_index) {
	          return true;
	        }
	      }
	      return false;
	    },

	    // lock management

	    lock : function () {
	      this.settings.locked = true;
	    },

	    unlock : function () {
	      this.settings.locked = false;
	    },

	    locked : function () {
	      return this.settings.locked;
	    },

	    off : function () {
	      this.S(this.scope).off('.fndtn.clearing');
	      this.S(window).off('.fndtn.clearing');
	    },

	    reflow : function () {
	      this.init();
	    }
	  };

	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.dropdown = {
	    name : 'dropdown',

	    version : '5.5.2',

	    settings : {
	      active_class : 'open',
	      disabled_class : 'disabled',
	      mega_class : 'mega',
	      align : 'bottom',
	      is_hover : false,
	      hover_timeout : 150,
	      opened : function () {},
	      closed : function () {}
	    },

	    init : function (scope, method, options) {
	      Foundation.inherit(this, 'throttle');

	      $.extend(true, this.settings, method, options);
	      this.bindings(method, options);
	    },

	    events : function (scope) {
	      var self = this,
	          S = self.S;

	      S(this.scope)
	        .off('.dropdown')
	        .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
	          var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
	          if (!settings.is_hover || Modernizr.touch) {
	            e.preventDefault();
	            if (S(this).parent('[data-reveal-id]').length) {
	              e.stopPropagation();
	            }
	            self.toggle($(this));
	          }
	        })
	        .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
	          var $this = S(this),
	              dropdown,
	              target;

	          clearTimeout(self.timeout);

	          if ($this.data(self.data_attr())) {
	            dropdown = S('#' + $this.data(self.data_attr()));
	            target = $this;
	          } else {
	            dropdown = $this;
	            target = S('[' + self.attr_name() + '="' + dropdown.attr('id') + '"]');
	          }

	          var settings = target.data(self.attr_name(true) + '-init') || self.settings;

	          if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) {
	            self.closeall.call(self);
	          }

	          if (settings.is_hover) {
	            self.open.apply(self, [dropdown, target]);
	          }
	        })
	        .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
	          var $this = S(this);
	          var settings;

	          if ($this.data(self.data_attr())) {
	              settings = $this.data(self.data_attr(true) + '-init') || self.settings;
	          } else {
	              var target   = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
	                  settings = target.data(self.attr_name(true) + '-init') || self.settings;
	          }

	          self.timeout = setTimeout(function () {
	            if ($this.data(self.data_attr())) {
	              if (settings.is_hover) {
	                self.close.call(self, S('#' + $this.data(self.data_attr())));
	              }
	            } else {
	              if (settings.is_hover) {
	                self.close.call(self, $this);
	              }
	            }
	          }.bind(this), settings.hover_timeout);
	        })
	        .on('click.fndtn.dropdown', function (e) {
	          var parent = S(e.target).closest('[' + self.attr_name() + '-content]');
	          var links  = parent.find('a');

	          if (links.length > 0 && parent.attr('aria-autoclose') !== 'false') {
	              self.close.call(self, S('[' + self.attr_name() + '-content]'));
	          }

	          if (e.target !== document && !$.contains(document.documentElement, e.target)) {
	            return;
	          }

	          if (S(e.target).closest('[' + self.attr_name() + ']').length > 0) {
	            return;
	          }

	          if (!(S(e.target).data('revealId')) &&
	            (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') ||
	              $.contains(parent.first()[0], e.target)))) {
	            e.stopPropagation();
	            return;
	          }

	          self.close.call(self, S('[' + self.attr_name() + '-content]'));
	        })
	        .on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
	          self.settings.opened.call(this);
	        })
	        .on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
	          self.settings.closed.call(this);
	        });

	      S(window)
	        .off('.dropdown')
	        .on('resize.fndtn.dropdown', self.throttle(function () {
	          self.resize.call(self);
	        }, 50));

	      this.resize();
	    },

	    close : function (dropdown) {
	      var self = this;
	      dropdown.each(function (idx) {
	        var original_target = $('[' + self.attr_name() + '=' + dropdown[idx].id + ']') || $('aria-controls=' + dropdown[idx].id + ']');
	        original_target.attr('aria-expanded', 'false');
	        if (self.S(this).hasClass(self.settings.active_class)) {
	          self.S(this)
	            .css(Foundation.rtl ? 'right' : 'left', '-99999px')
	            .attr('aria-hidden', 'true')
	            .removeClass(self.settings.active_class)
	            .prev('[' + self.attr_name() + ']')
	            .removeClass(self.settings.active_class)
	            .removeData('target');

	          self.S(this).trigger('closed.fndtn.dropdown', [dropdown]);
	        }
	      });
	      dropdown.removeClass('f-open-' + this.attr_name(true));
	    },

	    closeall : function () {
	      var self = this;
	      $.each(self.S('.f-open-' + this.attr_name(true)), function () {
	        self.close.call(self, self.S(this));
	      });
	    },

	    open : function (dropdown, target) {
	      this
	        .css(dropdown
	        .addClass(this.settings.active_class), target);
	      dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
	      dropdown.data('target', target.get(0)).trigger('opened.fndtn.dropdown', [dropdown, target]);
	      dropdown.attr('aria-hidden', 'false');
	      target.attr('aria-expanded', 'true');
	      dropdown.focus();
	      dropdown.addClass('f-open-' + this.attr_name(true));
	    },

	    data_attr : function () {
	      if (this.namespace.length > 0) {
	        return this.namespace + '-' + this.name;
	      }

	      return this.name;
	    },

	    toggle : function (target) {
	      if (target.hasClass(this.settings.disabled_class)) {
	        return;
	      }
	      var dropdown = this.S('#' + target.data(this.data_attr()));
	      if (dropdown.length === 0) {
	        // No dropdown found, not continuing
	        return;
	      }

	      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

	      if (dropdown.hasClass(this.settings.active_class)) {
	        this.close.call(this, dropdown);
	        if (dropdown.data('target') !== target.get(0)) {
	          this.open.call(this, dropdown, target);
	        }
	      } else {
	        this.open.call(this, dropdown, target);
	      }
	    },

	    resize : function () {
	      var dropdown = this.S('[' + this.attr_name() + '-content].open');
	      var target = $(dropdown.data("target"));

	      if (dropdown.length && target.length) {
	        this.css(dropdown, target);
	      }
	    },

	    css : function (dropdown, target) {
	      var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8),
	          settings = target.data(this.attr_name(true) + '-init') || this.settings,
	          parentOverflow = dropdown.parent().css('overflow-y') || dropdown.parent().css('overflow');

	      this.clear_idx();



	      if (this.small()) {
	        var p = this.dirs.bottom.call(dropdown, target, settings);

	        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
	          position : 'absolute',
	          width : '95%',
	          'max-width' : 'none',
	          top : p.top
	        });

	        dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
	      }
	      // detect if dropdown is in an overflow container
	      else if (parentOverflow !== 'visible') {
	        var offset = target[0].offsetTop + target[0].offsetHeight;

	        dropdown.attr('style', '').css({
	          position : 'absolute',
	          top : offset
	        });

	        dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
	      }
	      else {

	        this.style(dropdown, target, settings);
	      }

	      return dropdown;
	    },

	    style : function (dropdown, target, settings) {
	      var css = $.extend({position : 'absolute'},
	        this.dirs[settings.align].call(dropdown, target, settings));

	      dropdown.attr('style', '').css(css);
	    },

	    // return CSS property object
	    // `this` is the dropdown
	    dirs : {
	      // Calculate target offset
	      _base : function (t) {
	        var o_p = this.offsetParent(),
	            o = o_p.offset(),
	            p = t.offset();

	        p.top -= o.top;
	        p.left -= o.left;

	        //set some flags on the p object to pass along
	        p.missRight = false;
	        p.missTop = false;
	        p.missLeft = false;
	        p.leftRightFlag = false;

	        //lets see if the panel will be off the screen
	        //get the actual width of the page and store it
	        var actualBodyWidth;
	        if (document.getElementsByClassName('row')[0]) {
	          actualBodyWidth = document.getElementsByClassName('row')[0].clientWidth;
	        } else {
	          actualBodyWidth = window.innerWidth;
	        }

	        var actualMarginWidth = (window.innerWidth - actualBodyWidth) / 2;
	        var actualBoundary = actualBodyWidth;

	        if (!this.hasClass('mega')) {
	          //miss top
	          if (t.offset().top <= this.outerHeight()) {
	            p.missTop = true;
	            actualBoundary = window.innerWidth - actualMarginWidth;
	            p.leftRightFlag = true;
	          }

	          //miss right
	          if (t.offset().left + this.outerWidth() > t.offset().left + actualMarginWidth && t.offset().left - actualMarginWidth > this.outerWidth()) {
	            p.missRight = true;
	            p.missLeft = false;
	          }

	          //miss left
	          if (t.offset().left - this.outerWidth() <= 0) {
	            p.missLeft = true;
	            p.missRight = false;
	          }
	        }

	        return p;
	      },

	      top : function (t, s) {
	        var self = Foundation.libs.dropdown,
	            p = self.dirs._base.call(this, t);

	        this.addClass('drop-top');

	        if (p.missTop == true) {
	          p.top = p.top + t.outerHeight() + this.outerHeight();
	          this.removeClass('drop-top');
	        }

	        if (p.missRight == true) {
	          p.left = p.left - this.outerWidth() + t.outerWidth();
	        }

	        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
	          self.adjust_pip(this, t, s, p);
	        }

	        if (Foundation.rtl) {
	          return {left : p.left - this.outerWidth() + t.outerWidth(),
	            top : p.top - this.outerHeight()};
	        }

	        return {left : p.left, top : p.top - this.outerHeight()};
	      },

	      bottom : function (t, s) {
	        var self = Foundation.libs.dropdown,
	            p = self.dirs._base.call(this, t);

	        if (p.missRight == true) {
	          p.left = p.left - this.outerWidth() + t.outerWidth();
	        }

	        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
	          self.adjust_pip(this, t, s, p);
	        }

	        if (self.rtl) {
	          return {left : p.left - this.outerWidth() + t.outerWidth(), top : p.top + t.outerHeight()};
	        }

	        return {left : p.left, top : p.top + t.outerHeight()};
	      },

	      left : function (t, s) {
	        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

	        this.addClass('drop-left');

	        if (p.missLeft == true) {
	          p.left =  p.left + this.outerWidth();
	          p.top = p.top + t.outerHeight();
	          this.removeClass('drop-left');
	        }

	        return {left : p.left - this.outerWidth(), top : p.top};
	      },

	      right : function (t, s) {
	        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

	        this.addClass('drop-right');

	        if (p.missRight == true) {
	          p.left = p.left - this.outerWidth();
	          p.top = p.top + t.outerHeight();
	          this.removeClass('drop-right');
	        } else {
	          p.triggeredRight = true;
	        }

	        var self = Foundation.libs.dropdown;

	        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
	          self.adjust_pip(this, t, s, p);
	        }

	        return {left : p.left + t.outerWidth(), top : p.top};
	      }
	    },

	    // Insert rule to style psuedo elements
	    adjust_pip : function (dropdown, target, settings, position) {
	      var sheet = Foundation.stylesheet,
	          pip_offset_base = 8;

	      if (dropdown.hasClass(settings.mega_class)) {
	        pip_offset_base = position.left + (target.outerWidth() / 2) - 8;
	      } else if (this.small()) {
	        pip_offset_base += position.left - 8;
	      }

	      this.rule_idx = sheet.cssRules.length;

	      //default
	      var sel_before = '.f-dropdown.open:before',
	          sel_after  = '.f-dropdown.open:after',
	          css_before = 'left: ' + pip_offset_base + 'px;',
	          css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';

	      if (position.missRight == true) {
	        pip_offset_base = dropdown.outerWidth() - 23;
	        sel_before = '.f-dropdown.open:before',
	        sel_after  = '.f-dropdown.open:after',
	        css_before = 'left: ' + pip_offset_base + 'px;',
	        css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';
	      }

	      //just a case where right is fired, but its not missing right
	      if (position.triggeredRight == true) {
	        sel_before = '.f-dropdown.open:before',
	        sel_after  = '.f-dropdown.open:after',
	        css_before = 'left:-12px;',
	        css_after  = 'left:-14px;';
	      }

	      if (sheet.insertRule) {
	        sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
	        sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
	      } else {
	        sheet.addRule(sel_before, css_before, this.rule_idx);
	        sheet.addRule(sel_after, css_after, this.rule_idx + 1);
	      }
	    },

	    // Remove old dropdown rule index
	    clear_idx : function () {
	      var sheet = Foundation.stylesheet;

	      if (typeof this.rule_idx !== 'undefined') {
	        sheet.deleteRule(this.rule_idx);
	        sheet.deleteRule(this.rule_idx);
	        delete this.rule_idx;
	      }
	    },

	    small : function () {
	      return matchMedia(Foundation.media_queries.small).matches &&
	        !matchMedia(Foundation.media_queries.medium).matches;
	    },

	    off : function () {
	      this.S(this.scope).off('.fndtn.dropdown');
	      this.S('html, body').off('.fndtn.dropdown');
	      this.S(window).off('.fndtn.dropdown');
	      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
	    },

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.equalizer = {
	    name : 'equalizer',

	    version : '5.5.2',

	    settings : {
	      use_tallest : true,
	      before_height_change : $.noop,
	      after_height_change : $.noop,
	      equalize_on_stack : false,
	      act_on_hidden_el: false
	    },

	    init : function (scope, method, options) {
	      Foundation.inherit(this, 'image_loaded');
	      this.bindings(method, options);
	      this.reflow();
	    },

	    events : function () {
	      this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function (e) {
	        this.reflow();
	      }.bind(this));
	    },

	    equalize : function (equalizer) {
	      var isStacked = false,
	          group = equalizer.data('equalizer'),
	          settings = equalizer.data(this.attr_name(true)+'-init') || this.settings,
	          vals,
	          firstTopOffset;

	      if (settings.act_on_hidden_el) {
	        vals = group ? equalizer.find('['+this.attr_name()+'-watch="'+group+'"]') : equalizer.find('['+this.attr_name()+'-watch]');
	      }
	      else {
	        vals = group ? equalizer.find('['+this.attr_name()+'-watch="'+group+'"]:visible') : equalizer.find('['+this.attr_name()+'-watch]:visible');
	      }
	      
	      if (vals.length === 0) {
	        return;
	      }

	      settings.before_height_change();
	      equalizer.trigger('before-height-change.fndth.equalizer');
	      vals.height('inherit');

	      if (settings.equalize_on_stack === false) {
	        firstTopOffset = vals.first().offset().top;
	        vals.each(function () {
	          if ($(this).offset().top !== firstTopOffset) {
	            isStacked = true;
	            return false;
	          }
	        });
	        if (isStacked) {
	          return;
	        }
	      }

	      var heights = vals.map(function () { return $(this).outerHeight(false) }).get();

	      if (settings.use_tallest) {
	        var max = Math.max.apply(null, heights);
	        vals.css('height', max);
	      } else {
	        var min = Math.min.apply(null, heights);
	        vals.css('height', min);
	      }

	      settings.after_height_change();
	      equalizer.trigger('after-height-change.fndtn.equalizer');
	    },

	    reflow : function () {
	      var self = this;

	      this.S('[' + this.attr_name() + ']', this.scope).each(function () {
	        var $eq_target = $(this),
	            media_query = $eq_target.data('equalizer-mq'),
	            ignore_media_query = true;

	        if (media_query) {
	          media_query = 'is_' + media_query.replace(/-/g, '_');
	          if (Foundation.utils.hasOwnProperty(media_query)) {
	            ignore_media_query = false;
	          }
	        }

	        self.image_loaded(self.S('img', this), function () {
	          if (ignore_media_query || Foundation.utils[media_query]()) {
	            self.equalize($eq_target)
	          } else {
	            var vals = $eq_target.find('[' + self.attr_name() + '-watch]:visible');
	            vals.css('height', 'auto');
	          }
	        });
	      });
	    }
	  };
	})(jQuery, window, window.document);

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.interchange = {
	    name : 'interchange',

	    version : '5.5.2',

	    cache : {},

	    images_loaded : false,
	    nodes_loaded : false,

	    settings : {
	      load_attr : 'interchange',

	      named_queries : {
	        'default'     : 'only screen',
	        'small'       : Foundation.media_queries['small'],
	        'small-only'  : Foundation.media_queries['small-only'],
	        'medium'      : Foundation.media_queries['medium'],
	        'medium-only' : Foundation.media_queries['medium-only'],
	        'large'       : Foundation.media_queries['large'],
	        'large-only'  : Foundation.media_queries['large-only'],
	        'xlarge'      : Foundation.media_queries['xlarge'],
	        'xlarge-only' : Foundation.media_queries['xlarge-only'],
	        'xxlarge'     : Foundation.media_queries['xxlarge'],
	        'landscape'   : 'only screen and (orientation: landscape)',
	        'portrait'    : 'only screen and (orientation: portrait)',
	        'retina'      : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
	          'only screen and (min--moz-device-pixel-ratio: 2),' +
	          'only screen and (-o-min-device-pixel-ratio: 2/1),' +
	          'only screen and (min-device-pixel-ratio: 2),' +
	          'only screen and (min-resolution: 192dpi),' +
	          'only screen and (min-resolution: 2dppx)'
	      },

	      directives : {
	        replace : function (el, path, trigger) {
	          // The trigger argument, if called within the directive, fires
	          // an event named after the directive on the element, passing
	          // any parameters along to the event that you pass to trigger.
	          //
	          // ex. trigger(), trigger([a, b, c]), or trigger(a, b, c)
	          //
	          // This allows you to bind a callback like so:
	          // $('#interchangeContainer').on('replace', function (e, a, b, c) {
	          //   console.log($(this).html(), a, b, c);
	          // });

	          if (el !== null && /IMG/.test(el[0].nodeName)) {
	            var orig_path = el[0].src;

	            if (new RegExp(path, 'i').test(orig_path)) {
	              return;
	            }

	            el.attr("src", path);

	            return trigger(el[0].src);
	          }
	          var last_path = el.data(this.data_attr + '-last-path'),
	              self = this;

	          if (last_path == path) {
	            return;
	          }

	          if (/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(path)) {
	            $(el).css('background-image', 'url(' + path + ')');
	            el.data('interchange-last-path', path);
	            return trigger(path);
	          }

	          return $.get(path, function (response) {
	            el.html(response);
	            el.data(self.data_attr + '-last-path', path);
	            trigger();
	          });

	        }
	      }
	    },

	    init : function (scope, method, options) {
	      Foundation.inherit(this, 'throttle random_str');

	      this.data_attr = this.set_data_attr();
	      $.extend(true, this.settings, method, options);
	      this.bindings(method, options);
	      this.reflow();
	    },

	    get_media_hash : function () {
	        var mediaHash = '';
	        for (var queryName in this.settings.named_queries ) {
	            mediaHash += matchMedia(this.settings.named_queries[queryName]).matches.toString();
	        }
	        return mediaHash;
	    },

	    events : function () {
	      var self = this, prevMediaHash;

	      $(window)
	        .off('.interchange')
	        .on('resize.fndtn.interchange', self.throttle(function () {
	            var currMediaHash = self.get_media_hash();
	            if (currMediaHash !== prevMediaHash) {
	                self.resize();
	            }
	            prevMediaHash = currMediaHash;
	        }, 50));

	      return this;
	    },

	    resize : function () {
	      var cache = this.cache;

	      if (!this.images_loaded || !this.nodes_loaded) {
	        setTimeout($.proxy(this.resize, this), 50);
	        return;
	      }

	      for (var uuid in cache) {
	        if (cache.hasOwnProperty(uuid)) {
	          var passed = this.results(uuid, cache[uuid]);
	          if (passed) {
	            this.settings.directives[passed
	              .scenario[1]].call(this, passed.el, passed.scenario[0], (function (passed) {
	                if (arguments[0] instanceof Array) {
	                  var args = arguments[0];
	                } else {
	                  var args = Array.prototype.slice.call(arguments, 0);
	                }

	                return function() {
	                  passed.el.trigger(passed.scenario[1], args);
	                }
	              }(passed)));
	          }
	        }
	      }

	    },

	    results : function (uuid, scenarios) {
	      var count = scenarios.length;

	      if (count > 0) {
	        var el = this.S('[' + this.add_namespace('data-uuid') + '="' + uuid + '"]');

	        while (count--) {
	          var mq, rule = scenarios[count][2];
	          if (this.settings.named_queries.hasOwnProperty(rule)) {
	            mq = matchMedia(this.settings.named_queries[rule]);
	          } else {
	            mq = matchMedia(rule);
	          }
	          if (mq.matches) {
	            return {el : el, scenario : scenarios[count]};
	          }
	        }
	      }

	      return false;
	    },

	    load : function (type, force_update) {
	      if (typeof this['cached_' + type] === 'undefined' || force_update) {
	        this['update_' + type]();
	      }

	      return this['cached_' + type];
	    },

	    update_images : function () {
	      var images = this.S('img[' + this.data_attr + ']'),
	          count = images.length,
	          i = count,
	          loaded_count = 0,
	          data_attr = this.data_attr;

	      this.cache = {};
	      this.cached_images = [];
	      this.images_loaded = (count === 0);

	      while (i--) {
	        loaded_count++;
	        if (images[i]) {
	          var str = images[i].getAttribute(data_attr) || '';

	          if (str.length > 0) {
	            this.cached_images.push(images[i]);
	          }
	        }

	        if (loaded_count === count) {
	          this.images_loaded = true;
	          this.enhance('images');
	        }
	      }

	      return this;
	    },

	    update_nodes : function () {
	      var nodes = this.S('[' + this.data_attr + ']').not('img'),
	          count = nodes.length,
	          i = count,
	          loaded_count = 0,
	          data_attr = this.data_attr;

	      this.cached_nodes = [];
	      this.nodes_loaded = (count === 0);

	      while (i--) {
	        loaded_count++;
	        var str = nodes[i].getAttribute(data_attr) || '';

	        if (str.length > 0) {
	          this.cached_nodes.push(nodes[i]);
	        }

	        if (loaded_count === count) {
	          this.nodes_loaded = true;
	          this.enhance('nodes');
	        }
	      }

	      return this;
	    },

	    enhance : function (type) {
	      var i = this['cached_' + type].length;

	      while (i--) {
	        this.object($(this['cached_' + type][i]));
	      }

	      return $(window).trigger('resize.fndtn.interchange');
	    },

	    convert_directive : function (directive) {

	      var trimmed = this.trim(directive);

	      if (trimmed.length > 0) {
	        return trimmed;
	      }

	      return 'replace';
	    },

	    parse_scenario : function (scenario) {
	      // This logic had to be made more complex since some users were using commas in the url path
	      // So we cannot simply just split on a comma

	      var directive_match = scenario[0].match(/(.+),\s*(\w+)\s*$/),
	      // getting the mq has gotten a bit complicated since we started accounting for several use cases
	      // of URLs. For now we'll continue to match these scenarios, but we may consider having these scenarios
	      // as nested objects or arrays in F6.
	      // regex: match everything before close parenthesis for mq
	      media_query         = scenario[1].match(/(.*)\)/);

	      if (directive_match) {
	        var path  = directive_match[1],
	        directive = directive_match[2];

	      } else {
	        var cached_split = scenario[0].split(/,\s*$/),
	        path             = cached_split[0],
	        directive        = '';
	      }

	      return [this.trim(path), this.convert_directive(directive), this.trim(media_query[1])];
	    },

	    object : function (el) {
	      var raw_arr = this.parse_data_attr(el),
	          scenarios = [],
	          i = raw_arr.length;

	      if (i > 0) {
	        while (i--) {
	          // split array between comma delimited content and mq
	          // regex: comma, optional space, open parenthesis
	          var scenario = raw_arr[i].split(/,\s?\(/);

	          if (scenario.length > 1) {
	            var params = this.parse_scenario(scenario);
	            scenarios.push(params);
	          }
	        }
	      }

	      return this.store(el, scenarios);
	    },

	    store : function (el, scenarios) {
	      var uuid = this.random_str(),
	          current_uuid = el.data(this.add_namespace('uuid', true));

	      if (this.cache[current_uuid]) {
	        return this.cache[current_uuid];
	      }

	      el.attr(this.add_namespace('data-uuid'), uuid);
	      return this.cache[uuid] = scenarios;
	    },

	    trim : function (str) {

	      if (typeof str === 'string') {
	        return $.trim(str);
	      }

	      return str;
	    },

	    set_data_attr : function (init) {
	      if (init) {
	        if (this.namespace.length > 0) {
	          return this.namespace + '-' + this.settings.load_attr;
	        }

	        return this.settings.load_attr;
	      }

	      if (this.namespace.length > 0) {
	        return 'data-' + this.namespace + '-' + this.settings.load_attr;
	      }

	      return 'data-' + this.settings.load_attr;
	    },

	    parse_data_attr : function (el) {
	      var raw = el.attr(this.attr_name()).split(/\[(.*?)\]/),
	          i = raw.length,
	          output = [];

	      while (i--) {
	        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
	          output.push(raw[i]);
	        }
	      }

	      return output;
	    },

	    reflow : function () {
	      this.load('images', true);
	      this.load('nodes', true);
	    }

	  };

	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  var Modernizr = Modernizr || false;

	  Foundation.libs.joyride = {
	    name : 'joyride',

	    version : '5.5.2',

	    defaults : {
	      expose                   : false,     // turn on or off the expose feature
	      modal                    : true,      // Whether to cover page with modal during the tour
	      keyboard                 : true,      // enable left, right and esc keystrokes
	      tip_location             : 'bottom',  // 'top' or 'bottom' in relation to parent
	      nub_position             : 'auto',    // override on a per tooltip bases
	      scroll_speed             : 1500,      // Page scrolling speed in milliseconds, 0 = no scroll animation
	      scroll_animation         : 'linear',  // supports 'swing' and 'linear', extend with jQuery UI.
	      timer                    : 0,         // 0 = no timer , all other numbers = timer in milliseconds
	      start_timer_on_click     : true,      // true or false - true requires clicking the first button start the timer
	      start_offset             : 0,         // the index of the tooltip you want to start on (index of the li)
	      next_button              : true,      // true or false to control whether a next button is used
	      prev_button              : true,      // true or false to control whether a prev button is used
	      tip_animation            : 'fade',    // 'pop' or 'fade' in each tip
	      pause_after              : [],        // array of indexes where to pause the tour after
	      exposed                  : [],        // array of expose elements
	      tip_animation_fade_speed : 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
	      cookie_monster           : false,     // true or false to control whether cookies are used
	      cookie_name              : 'joyride', // Name the cookie you'll use
	      cookie_domain            : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
	      cookie_expires           : 365,       // set when you would like the cookie to expire.
	      tip_container            : 'body',    // Where will the tip be attached
	      abort_on_close           : true,      // When true, the close event will not fire any callback
	      tip_location_patterns    : {
	        top : ['bottom'],
	        bottom : [], // bottom should not need to be repositioned
	        left : ['right', 'top', 'bottom'],
	        right : ['left', 'top', 'bottom']
	      },
	      post_ride_callback     : function () {},    // A method to call once the tour closes (canceled or complete)
	      post_step_callback     : function () {},    // A method to call after each step
	      pre_step_callback      : function () {},    // A method to call before each step
	      pre_ride_callback      : function () {},    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
	      post_expose_callback   : function () {},    // A method to call after an element has been exposed
	      template : { // HTML segments for tip layout
	        link          : '<a href="#close" class="joyride-close-tip">&times;</a>',
	        timer         : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
	        tip           : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
	        wrapper       : '<div class="joyride-content-wrapper"></div>',
	        button        : '<a href="#" class="small button joyride-next-tip"></a>',
	        prev_button   : '<a href="#" class="small button joyride-prev-tip"></a>',
	        modal         : '<div class="joyride-modal-bg"></div>',
	        expose        : '<div class="joyride-expose-wrapper"></div>',
	        expose_cover  : '<div class="joyride-expose-cover"></div>'
	      },
	      expose_add_class : '' // One or more space-separated class names to be added to exposed element
	    },

	    init : function (scope, method, options) {
	      Foundation.inherit(this, 'throttle random_str');

	      this.settings = this.settings || $.extend({}, this.defaults, (options || method));

	      this.bindings(method, options)
	    },

	    go_next : function () {
	      if (this.settings.$li.next().length < 1) {
	        this.end();
	      } else if (this.settings.timer > 0) {
	        clearTimeout(this.settings.automate);
	        this.hide();
	        this.show();
	        this.startTimer();
	      } else {
	        this.hide();
	        this.show();
	      }
	    },

	    go_prev : function () {
	      if (this.settings.$li.prev().length < 1) {
	        // Do nothing if there are no prev element
	      } else if (this.settings.timer > 0) {
	        clearTimeout(this.settings.automate);
	        this.hide();
	        this.show(null, true);
	        this.startTimer();
	      } else {
	        this.hide();
	        this.show(null, true);
	      }
	    },

	    events : function () {
	      var self = this;

	      $(this.scope)
	        .off('.joyride')
	        .on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
	          e.preventDefault();
	          this.go_next()
	        }.bind(this))
	        .on('click.fndtn.joyride', '.joyride-prev-tip', function (e) {
	          e.preventDefault();
	          this.go_prev();
	        }.bind(this))

	        .on('click.fndtn.joyride', '.joyride-close-tip', function (e) {
	          e.preventDefault();
	          this.end(this.settings.abort_on_close);
	        }.bind(this))

	        .on('keyup.fndtn.joyride', function (e) {
	          // Don't do anything if keystrokes are disabled
	          // or if the joyride is not being shown
	          if (!this.settings.keyboard || !this.settings.riding) {
	            return;
	          }

	          switch (e.which) {
	            case 39: // right arrow
	              e.preventDefault();
	              this.go_next();
	              break;
	            case 37: // left arrow
	              e.preventDefault();
	              this.go_prev();
	              break;
	            case 27: // escape
	              e.preventDefault();
	              this.end(this.settings.abort_on_close);
	          }
	        }.bind(this));

	      $(window)
	        .off('.joyride')
	        .on('resize.fndtn.joyride', self.throttle(function () {
	          if ($('[' + self.attr_name() + ']').length > 0 && self.settings.$next_tip && self.settings.riding) {
	            if (self.settings.exposed.length > 0) {
	              var $els = $(self.settings.exposed);

	              $els.each(function () {
	                var $this = $(this);
	                self.un_expose($this);
	                self.expose($this);
	              });
	            }

	            if (self.is_phone()) {
	              self.pos_phone();
	            } else {
	              self.pos_default(false);
	            }
	          }
	        }, 100));
	    },

	    start : function () {
	      var self = this,
	          $this = $('[' + this.attr_name() + ']', this.scope),
	          integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
	          int_settings_count = integer_settings.length;

	      if (!$this.length > 0) {
	        return;
	      }

	      if (!this.settings.init) {
	        this.events();
	      }

	      this.settings = $this.data(this.attr_name(true) + '-init');

	      // non configureable settings
	      this.settings.$content_el = $this;
	      this.settings.$body = $(this.settings.tip_container);
	      this.settings.body_offset = $(this.settings.tip_container).position();
	      this.settings.$tip_content = this.settings.$content_el.find('> li');
	      this.settings.paused = false;
	      this.settings.attempts = 0;
	      this.settings.riding = true;

	      // can we create cookies?
	      if (typeof $.cookie !== 'function') {
	        this.settings.cookie_monster = false;
	      }

	      // generate the tips and insert into dom.
	      if (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) {
	        this.settings.$tip_content.each(function (index) {
	          var $this = $(this);
	          this.settings = $.extend({}, self.defaults, self.data_options($this));

	          // Make sure that settings parsed from data_options are integers where necessary
	          var i = int_settings_count;
	          while (i--) {
	            self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
	          }
	          self.create({$li : $this, index : index});
	        });

	        // show first tip
	        if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
	          this.show('init');
	          this.startTimer();
	        } else {
	          this.show('init');
	        }

	      }
	    },

	    resume : function () {
	      this.set_li();
	      this.show();
	    },

	    tip_template : function (opts) {
	      var $blank, content;

	      opts.tip_class = opts.tip_class || '';

	      $blank = $(this.settings.template.tip).addClass(opts.tip_class);
	      content = $.trim($(opts.li).html()) +
	        this.prev_button_text(opts.prev_button_text, opts.index) +
	        this.button_text(opts.button_text) +
	        this.settings.template.link +
	        this.timer_instance(opts.index);

	      $blank.append($(this.settings.template.wrapper));
	      $blank.first().attr(this.add_namespace('data-index'), opts.index);
	      $('.joyride-content-wrapper', $blank).append(content);

	      return $blank[0];
	    },

	    timer_instance : function (index) {
	      var txt;

	      if ((index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0) || this.settings.timer === 0) {
	        txt = '';
	      } else {
	        txt = $(this.settings.template.timer)[0].outerHTML;
	      }
	      return txt;
	    },

	    button_text : function (txt) {
	      if (this.settings.tip_settings.next_button) {
	        txt = $.trim(txt) || 'Next';
	        txt = $(this.settings.template.button).append(txt)[0].outerHTML;
	      } else {
	        txt = '';
	      }
	      return txt;
	    },

	    prev_button_text : function (txt, idx) {
	      if (this.settings.tip_settings.prev_button) {
	        txt = $.trim(txt) || 'Previous';

	        // Add the disabled class to the button if it's the first element
	        if (idx == 0) {
	          txt = $(this.settings.template.prev_button).append(txt).addClass('disabled')[0].outerHTML;
	        } else {
	          txt = $(this.settings.template.prev_button).append(txt)[0].outerHTML;
	        }
	      } else {
	        txt = '';
	      }
	      return txt;
	    },

	    create : function (opts) {
	      this.settings.tip_settings = $.extend({}, this.settings, this.data_options(opts.$li));
	      var buttonText = opts.$li.attr(this.add_namespace('data-button')) || opts.$li.attr(this.add_namespace('data-text')),
	          prevButtonText = opts.$li.attr(this.add_namespace('data-button-prev')) || opts.$li.attr(this.add_namespace('data-prev-text')),
	        tipClass = opts.$li.attr('class'),
	        $tip_content = $(this.tip_template({
	          tip_class : tipClass,
	          index : opts.index,
	          button_text : buttonText,
	          prev_button_text : prevButtonText,
	          li : opts.$li
	        }));

	      $(this.settings.tip_container).append($tip_content);
	    },

	    show : function (init, is_prev) {
	      var $timer = null;

	      // are we paused?
	      if (this.settings.$li === undefined || ($.inArray(this.settings.$li.index(), this.settings.pause_after) === -1)) {

	        // don't go to the next li if the tour was paused
	        if (this.settings.paused) {
	          this.settings.paused = false;
	        } else {
	          this.set_li(init, is_prev);
	        }

	        this.settings.attempts = 0;

	        if (this.settings.$li.length && this.settings.$target.length > 0) {
	          if (init) { //run when we first start
	            this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);
	            if (this.settings.modal) {
	              this.show_modal();
	            }
	          }

	          this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);

	          if (this.settings.modal && this.settings.expose) {
	            this.expose();
	          }

	          this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li));

	          this.settings.timer = parseInt(this.settings.timer, 10);

	          this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];

	          // scroll and hide bg if not modal
	          if (!/body/i.test(this.settings.$target.selector)) {
	            var joyridemodalbg = $('.joyride-modal-bg');
	            if (/pop/i.test(this.settings.tipAnimation)) {
	                joyridemodalbg.hide();
	            } else {
	                joyridemodalbg.fadeOut(this.settings.tipAnimationFadeSpeed);
	            }
	            this.scroll_to();
	          }

	          if (this.is_phone()) {
	            this.pos_phone(true);
	          } else {
	            this.pos_default(true);
	          }

	          $timer = this.settings.$next_tip.find('.joyride-timer-indicator');

	          if (/pop/i.test(this.settings.tip_animation)) {

	            $timer.width(0);

	            if (this.settings.timer > 0) {

	              this.settings.$next_tip.show();

	              setTimeout(function () {
	                $timer.animate({
	                  width : $timer.parent().width()
	                }, this.settings.timer, 'linear');
	              }.bind(this), this.settings.tip_animation_fade_speed);

	            } else {
	              this.settings.$next_tip.show();

	            }

	          } else if (/fade/i.test(this.settings.tip_animation)) {

	            $timer.width(0);

	            if (this.settings.timer > 0) {

	              this.settings.$next_tip
	                .fadeIn(this.settings.tip_animation_fade_speed)
	                .show();

	              setTimeout(function () {
	                $timer.animate({
	                  width : $timer.parent().width()
	                }, this.settings.timer, 'linear');
	              }.bind(this), this.settings.tip_animation_fade_speed);

	            } else {
	              this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);
	            }
	          }

	          this.settings.$current_tip = this.settings.$next_tip;

	        // skip non-existant targets
	        } else if (this.settings.$li && this.settings.$target.length < 1) {

	          this.show(init, is_prev);

	        } else {

	          this.end();

	        }
	      } else {

	        this.settings.paused = true;

	      }

	    },

	    is_phone : function () {
	      return matchMedia(Foundation.media_queries.small).matches &&
	        !matchMedia(Foundation.media_queries.medium).matches;
	    },

	    hide : function () {
	      if (this.settings.modal && this.settings.expose) {
	        this.un_expose();
	      }

	      if (!this.settings.modal) {
	        $('.joyride-modal-bg').hide();
	      }

	      // Prevent scroll bouncing...wait to remove from layout
	      this.settings.$current_tip.css('visibility', 'hidden');
	      setTimeout($.proxy(function () {
	        this.hide();
	        this.css('visibility', 'visible');
	      }, this.settings.$current_tip), 0);
	      this.settings.post_step_callback(this.settings.$li.index(),
	        this.settings.$current_tip);
	    },

	    set_li : function (init, is_prev) {
	      if (init) {
	        this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
	        this.set_next_tip();
	        this.settings.$current_tip = this.settings.$next_tip;
	      } else {
	        if (is_prev) {
	          this.settings.$li = this.settings.$li.prev();
	        } else {
	          this.settings.$li = this.settings.$li.next();
	        }
	        this.set_next_tip();
	      }

	      this.set_target();
	    },

	    set_next_tip : function () {
	      this.settings.$next_tip = $('.joyride-tip-guide').eq(this.settings.$li.index());
	      this.settings.$next_tip.data('closed', '');
	    },

	    set_target : function () {
	      var cl = this.settings.$li.attr(this.add_namespace('data-class')),
	          id = this.settings.$li.attr(this.add_namespace('data-id')),
	          $sel = function () {
	            if (id) {
	              return $(document.getElementById(id));
	            } else if (cl) {
	              return $('.' + cl).first();
	            } else {
	              return $('body');
	            }
	          };

	      this.settings.$target = $sel();
	    },

	    scroll_to : function () {
	      var window_half, tipOffset;

	      window_half = $(window).height() / 2;
	      tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight());

	      if (tipOffset != 0) {
	        $('html, body').stop().animate({
	          scrollTop : tipOffset
	        }, this.settings.scroll_speed, 'swing');
	      }
	    },

	    paused : function () {
	      return ($.inArray((this.settings.$li.index() + 1), this.settings.pause_after) === -1);
	    },

	    restart : function () {
	      this.hide();
	      this.settings.$li = undefined;
	      this.show('init');
	    },

	    pos_default : function (init) {
	      var $nub = this.settings.$next_tip.find('.joyride-nub'),
	          nub_width = Math.ceil($nub.outerWidth() / 2),
	          nub_height = Math.ceil($nub.outerHeight() / 2),
	          toggle = init || false;

	      // tip must not be "display: none" to calculate position
	      if (toggle) {
	        this.settings.$next_tip.css('visibility', 'hidden');
	        this.settings.$next_tip.show();
	      }

	      if (!/body/i.test(this.settings.$target.selector)) {
	          var topAdjustment = this.settings.tip_settings.tipAdjustmentY ? parseInt(this.settings.tip_settings.tipAdjustmentY) : 0,
	              leftAdjustment = this.settings.tip_settings.tipAdjustmentX ? parseInt(this.settings.tip_settings.tipAdjustmentX) : 0;

	          if (this.bottom()) {
	            if (this.rtl) {
	              this.settings.$next_tip.css({
	                top : (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment),
	                left : this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth() + leftAdjustment});
	            } else {
	              this.settings.$next_tip.css({
	                top : (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment),
	                left : this.settings.$target.offset().left + leftAdjustment});
	            }

	            this.nub_position($nub, this.settings.tip_settings.nub_position, 'top');

	          } else if (this.top()) {
	            if (this.rtl) {
	              this.settings.$next_tip.css({
	                top : (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment),
	                left : this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()});
	            } else {
	              this.settings.$next_tip.css({
	                top : (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment),
	                left : this.settings.$target.offset().left + leftAdjustment});
	            }

	            this.nub_position($nub, this.settings.tip_settings.nub_position, 'bottom');

	          } else if (this.right()) {

	            this.settings.$next_tip.css({
	              top : this.settings.$target.offset().top + topAdjustment,
	              left : (this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width + leftAdjustment)});

	            this.nub_position($nub, this.settings.tip_settings.nub_position, 'left');

	          } else if (this.left()) {

	            this.settings.$next_tip.css({
	              top : this.settings.$target.offset().top + topAdjustment,
	              left : (this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width + leftAdjustment)});

	            this.nub_position($nub, this.settings.tip_settings.nub_position, 'right');

	          }

	          if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {

	            $nub.removeClass('bottom')
	              .removeClass('top')
	              .removeClass('right')
	              .removeClass('left');

	            this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];

	            this.settings.attempts++;

	            this.pos_default();

	          }

	      } else if (this.settings.$li.length) {

	        this.pos_modal($nub);

	      }

	      if (toggle) {
	        this.settings.$next_tip.hide();
	        this.settings.$next_tip.css('visibility', 'visible');
	      }

	    },

	    pos_phone : function (init) {
	      var tip_height = this.settings.$next_tip.outerHeight(),
	          tip_offset = this.settings.$next_tip.offset(),
	          target_height = this.settings.$target.outerHeight(),
	          $nub = $('.joyride-nub', this.settings.$next_tip),
	          nub_height = Math.ceil($nub.outerHeight() / 2),
	          toggle = init || false;

	      $nub.removeClass('bottom')
	        .removeClass('top')
	        .removeClass('right')
	        .removeClass('left');

	      if (toggle) {
	        this.settings.$next_tip.css('visibility', 'hidden');
	        this.settings.$next_tip.show();
	      }

	      if (!/body/i.test(this.settings.$target.selector)) {

	        if (this.top()) {

	            this.settings.$next_tip.offset({top : this.settings.$target.offset().top - tip_height - nub_height});
	            $nub.addClass('bottom');

	        } else {

	          this.settings.$next_tip.offset({top : this.settings.$target.offset().top + target_height + nub_height});
	          $nub.addClass('top');

	        }

	      } else if (this.settings.$li.length) {
	        this.pos_modal($nub);
	      }

	      if (toggle) {
	        this.settings.$next_tip.hide();
	        this.settings.$next_tip.css('visibility', 'visible');
	      }
	    },

	    pos_modal : function ($nub) {
	      this.center();
	      $nub.hide();

	      this.show_modal();
	    },

	    show_modal : function () {
	      if (!this.settings.$next_tip.data('closed')) {
	        var joyridemodalbg =  $('.joyride-modal-bg');
	        if (joyridemodalbg.length < 1) {
	          var joyridemodalbg = $(this.settings.template.modal);
	          joyridemodalbg.appendTo('body');
	        }

	        if (/pop/i.test(this.settings.tip_animation)) {
	            joyridemodalbg.show();
	        } else {
	            joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);
	        }
	      }
	    },

	    expose : function () {
	      var expose,
	          exposeCover,
	          el,
	          origCSS,
	          origClasses,
	          randId = 'expose-' + this.random_str(6);

	      if (arguments.length > 0 && arguments[0] instanceof $) {
	        el = arguments[0];
	      } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
	        el = this.settings.$target;
	      } else {
	        return false;
	      }

	      if (el.length < 1) {
	        if (window.console) {
	          console.error('element not valid', el);
	        }
	        return false;
	      }

	      expose = $(this.settings.template.expose);
	      this.settings.$body.append(expose);
	      expose.css({
	        top : el.offset().top,
	        left : el.offset().left,
	        width : el.outerWidth(true),
	        height : el.outerHeight(true)
	      });

	      exposeCover = $(this.settings.template.expose_cover);

	      origCSS = {
	        zIndex : el.css('z-index'),
	        position : el.css('position')
	      };

	      origClasses = el.attr('class') == null ? '' : el.attr('class');

	      el.css('z-index', parseInt(expose.css('z-index')) + 1);

	      if (origCSS.position == 'static') {
	        el.css('position', 'relative');
	      }

	      el.data('expose-css', origCSS);
	      el.data('orig-class', origClasses);
	      el.attr('class', origClasses + ' ' + this.settings.expose_add_class);

	      exposeCover.css({
	        top : el.offset().top,
	        left : el.offset().left,
	        width : el.outerWidth(true),
	        height : el.outerHeight(true)
	      });

	      if (this.settings.modal) {
	        this.show_modal();
	      }

	      this.settings.$body.append(exposeCover);
	      expose.addClass(randId);
	      exposeCover.addClass(randId);
	      el.data('expose', randId);
	      this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el);
	      this.add_exposed(el);
	    },

	    un_expose : function () {
	      var exposeId,
	          el,
	          expose,
	          origCSS,
	          origClasses,
	          clearAll = false;

	      if (arguments.length > 0 && arguments[0] instanceof $) {
	        el = arguments[0];
	      } else if (this.settings.$target && !/body/i.test(this.settings.$target.selector)) {
	        el = this.settings.$target;
	      } else {
	        return false;
	      }

	      if (el.length < 1) {
	        if (window.console) {
	          console.error('element not valid', el);
	        }
	        return false;
	      }

	      exposeId = el.data('expose');
	      expose = $('.' + exposeId);

	      if (arguments.length > 1) {
	        clearAll = arguments[1];
	      }

	      if (clearAll === true) {
	        $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
	      } else {
	        expose.remove();
	      }

	      origCSS = el.data('expose-css');

	      if (origCSS.zIndex == 'auto') {
	        el.css('z-index', '');
	      } else {
	        el.css('z-index', origCSS.zIndex);
	      }

	      if (origCSS.position != el.css('position')) {
	        if (origCSS.position == 'static') {// this is default, no need to set it.
	          el.css('position', '');
	        } else {
	          el.css('position', origCSS.position);
	        }
	      }

	      origClasses = el.data('orig-class');
	      el.attr('class', origClasses);
	      el.removeData('orig-classes');

	      el.removeData('expose');
	      el.removeData('expose-z-index');
	      this.remove_exposed(el);
	    },

	    add_exposed : function (el) {
	      this.settings.exposed = this.settings.exposed || [];
	      if (el instanceof $ || typeof el === 'object') {
	        this.settings.exposed.push(el[0]);
	      } else if (typeof el == 'string') {
	        this.settings.exposed.push(el);
	      }
	    },

	    remove_exposed : function (el) {
	      var search, i;
	      if (el instanceof $) {
	        search = el[0]
	      } else if (typeof el == 'string') {
	        search = el;
	      }

	      this.settings.exposed = this.settings.exposed || [];
	      i = this.settings.exposed.length;

	      while (i--) {
	        if (this.settings.exposed[i] == search) {
	          this.settings.exposed.splice(i, 1);
	          return;
	        }
	      }
	    },

	    center : function () {
	      var $w = $(window);

	      this.settings.$next_tip.css({
	        top : ((($w.height() - this.settings.$next_tip.outerHeight()) / 2) + $w.scrollTop()),
	        left : ((($w.width() - this.settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft())
	      });

	      return true;
	    },

	    bottom : function () {
	      return /bottom/i.test(this.settings.tip_settings.tip_location);
	    },

	    top : function () {
	      return /top/i.test(this.settings.tip_settings.tip_location);
	    },

	    right : function () {
	      return /right/i.test(this.settings.tip_settings.tip_location);
	    },

	    left : function () {
	      return /left/i.test(this.settings.tip_settings.tip_location);
	    },

	    corners : function (el) {
	      var w = $(window),
	          window_half = w.height() / 2,
	          //using this to calculate since scroll may not have finished yet.
	          tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()),
	          right = w.width() + w.scrollLeft(),
	          offsetBottom =  w.height() + tipOffset,
	          bottom = w.height() + w.scrollTop(),
	          top = w.scrollTop();

	      if (tipOffset < top) {
	        if (tipOffset < 0) {
	          top = 0;
	        } else {
	          top = tipOffset;
	        }
	      }

	      if (offsetBottom > bottom) {
	        bottom = offsetBottom;
	      }

	      return [
	        el.offset().top < top,
	        right < el.offset().left + el.outerWidth(),
	        bottom < el.offset().top + el.outerHeight(),
	        w.scrollLeft() > el.offset().left
	      ];
	    },

	    visible : function (hidden_corners) {
	      var i = hidden_corners.length;

	      while (i--) {
	        if (hidden_corners[i]) {
	          return false;
	        }
	      }

	      return true;
	    },

	    nub_position : function (nub, pos, def) {
	      if (pos === 'auto') {
	        nub.addClass(def);
	      } else {
	        nub.addClass(pos);
	      }
	    },

	    startTimer : function () {
	      if (this.settings.$li.length) {
	        this.settings.automate = setTimeout(function () {
	          this.hide();
	          this.show();
	          this.startTimer();
	        }.bind(this), this.settings.timer);
	      } else {
	        clearTimeout(this.settings.automate);
	      }
	    },

	    end : function (abort) {
	      if (this.settings.cookie_monster) {
	        $.cookie(this.settings.cookie_name, 'ridden', {expires : this.settings.cookie_expires, domain : this.settings.cookie_domain});
	      }

	      if (this.settings.timer > 0) {
	        clearTimeout(this.settings.automate);
	      }

	      if (this.settings.modal && this.settings.expose) {
	        this.un_expose();
	      }

	      // Unplug keystrokes listener
	      $(this.scope).off('keyup.joyride')

	      this.settings.$next_tip.data('closed', true);
	      this.settings.riding = false;

	      $('.joyride-modal-bg').hide();
	      this.settings.$current_tip.hide();

	      if (typeof abort === 'undefined' || abort === false) {
	        this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
	        this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip);
	      }

	      $('.joyride-tip-guide').remove();
	    },

	    off : function () {
	      $(this.scope).off('.joyride');
	      $(window).off('.joyride');
	      $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
	      $('.joyride-tip-guide, .joyride-modal-bg').remove();
	      clearTimeout(this.settings.automate);
	      this.settings = {};
	    },

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs['magellan-expedition'] = {
	    name : 'magellan-expedition',

	    version : '5.5.2',

	    settings : {
	      active_class : 'active',
	      threshold : 0, // pixels from the top of the expedition for it to become fixes
	      destination_threshold : 20, // pixels from the top of destination for it to be considered active
	      throttle_delay : 30, // calculation throttling to increase framerate
	      fixed_top : 0, // top distance in pixels assigend to the fixed element on scroll
	      offset_by_height : true,  // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
	      duration : 700, // animation duration time
	      easing : 'swing' // animation easing
	    },

	    init : function (scope, method, options) {
	      Foundation.inherit(this, 'throttle');
	      this.bindings(method, options);
	    },

	    events : function () {
	      var self = this,
	          S = self.S,
	          settings = self.settings;

	      // initialize expedition offset
	      self.set_expedition_position();

	      S(self.scope)
	        .off('.magellan')
	        .on('click.fndtn.magellan', '[' + self.add_namespace('data-magellan-arrival') + '] a[href*=#]', function (e) {
	          var sameHost = ((this.hostname === location.hostname) || !this.hostname),
	              samePath = self.filterPathname(location.pathname) === self.filterPathname(this.pathname),
	              testHash = this.hash.replace(/(:|\.|\/)/g, '\\$1'),
	              anchor = this;

	          if (sameHost && samePath && testHash) {
	            e.preventDefault();
	            var expedition = $(this).closest('[' + self.attr_name() + ']'),
	                settings = expedition.data('magellan-expedition-init'),
	                hash = this.hash.split('#').join(''),
	                target = $('a[name="' + hash + '"]');

	            if (target.length === 0) {
	              target = $('#' + hash);

	            }

	            // Account for expedition height if fixed position
	            var scroll_top = target.offset().top - settings.destination_threshold + 1;
	            if (settings.offset_by_height) {
	              scroll_top = scroll_top - expedition.outerHeight();
	            }
	            $('html, body').stop().animate({
	              'scrollTop' : scroll_top
	            }, settings.duration, settings.easing, function () {
	              if (history.pushState) {
	                        history.pushState(null, null, anchor.pathname + '#' + hash);
	              }
	                    else {
	                        location.hash = anchor.pathname + '#' + hash;
	                    }
	            });
	          }
	        })
	        .on('scroll.fndtn.magellan', self.throttle(this.check_for_arrivals.bind(this), settings.throttle_delay));
	    },

	    check_for_arrivals : function () {
	      var self = this;
	      self.update_arrivals();
	      self.update_expedition_positions();
	    },

	    set_expedition_position : function () {
	      var self = this;
	      $('[' + this.attr_name() + '=fixed]', self.scope).each(function (idx, el) {
	        var expedition = $(this),
	            settings = expedition.data('magellan-expedition-init'),
	            styles = expedition.attr('styles'), // save styles
	            top_offset, fixed_top;

	        expedition.attr('style', '');
	        top_offset = expedition.offset().top + settings.threshold;

	        //set fixed-top by attribute
	        fixed_top = parseInt(expedition.data('magellan-fixed-top'));
	        if (!isNaN(fixed_top)) {
	          self.settings.fixed_top = fixed_top;
	        }

	        expedition.data(self.data_attr('magellan-top-offset'), top_offset);
	        expedition.attr('style', styles);
	      });
	    },

	    update_expedition_positions : function () {
	      var self = this,
	          window_top_offset = $(window).scrollTop();

	      $('[' + this.attr_name() + '=fixed]', self.scope).each(function () {
	        var expedition = $(this),
	            settings = expedition.data('magellan-expedition-init'),
	            styles = expedition.attr('style'), // save styles
	            top_offset = expedition.data('magellan-top-offset');

	        //scroll to the top distance
	        if (window_top_offset + self.settings.fixed_top >= top_offset) {
	          // Placeholder allows height calculations to be consistent even when
	          // appearing to switch between fixed/non-fixed placement
	          var placeholder = expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']');
	          if (placeholder.length === 0) {
	            placeholder = expedition.clone();
	            placeholder.removeAttr(self.attr_name());
	            placeholder.attr(self.add_namespace('data-magellan-expedition-clone'), '');
	            expedition.before(placeholder);
	          }
	          expedition.css({position :'fixed', top : settings.fixed_top}).addClass('fixed');
	        } else {
	          expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']').remove();
	          expedition.attr('style', styles).css('position', '').css('top', '').removeClass('fixed');
	        }
	      });
	    },

	    update_arrivals : function () {
	      var self = this,
	          window_top_offset = $(window).scrollTop();

	      $('[' + this.attr_name() + ']', self.scope).each(function () {
	        var expedition = $(this),
	            settings = expedition.data(self.attr_name(true) + '-init'),
	            offsets = self.offsets(expedition, window_top_offset),
	            arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']'),
	            active_item = false;
	        offsets.each(function (idx, item) {
	          if (item.viewport_offset >= item.top_offset) {
	            var arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']');
	            arrivals.not(item.arrival).removeClass(settings.active_class);
	            item.arrival.addClass(settings.active_class);
	            active_item = true;
	            return true;
	          }
	        });

	        if (!active_item) {
	          arrivals.removeClass(settings.active_class);
	        }
	      });
	    },

	    offsets : function (expedition, window_offset) {
	      var self = this,
	          settings = expedition.data(self.attr_name(true) + '-init'),
	          viewport_offset = window_offset;

	      return expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']').map(function (idx, el) {
	        var name = $(this).data(self.data_attr('magellan-arrival')),
	            dest = $('[' + self.add_namespace('data-magellan-destination') + '=' + name + ']');
	        if (dest.length > 0) {
	          var top_offset = dest.offset().top - settings.destination_threshold;
	          if (settings.offset_by_height) {
	            top_offset = top_offset - expedition.outerHeight();
	          }
	          top_offset = Math.floor(top_offset);
	          return {
	            destination : dest,
	            arrival : $(this),
	            top_offset : top_offset,
	            viewport_offset : viewport_offset
	          }
	        }
	      }).sort(function (a, b) {
	        if (a.top_offset < b.top_offset) {
	          return -1;
	        }
	        if (a.top_offset > b.top_offset) {
	          return 1;
	        }
	        return 0;
	      });
	    },

	    data_attr : function (str) {
	      if (this.namespace.length > 0) {
	        return this.namespace + '-' + str;
	      }

	      return str;
	    },

	    off : function () {
	      this.S(this.scope).off('.magellan');
	      this.S(window).off('.magellan');
	    },

	    filterPathname : function (pathname) {
	      pathname = pathname || '';
	      return pathname
	          .replace(/^\//,'')
	          .replace(/(?:index|default).[a-zA-Z]{3,4}$/,'')
	          .replace(/\/$/,'');
	    },

	    reflow : function () {
	      var self = this;
	      // remove placeholder expeditions used for height calculation purposes
	      $('[' + self.add_namespace('data-magellan-expedition-clone') + ']', self.scope).remove();
	    }
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.offcanvas = {
	    name : 'offcanvas',

	    version : '5.5.2',

	    settings : {
	      open_method : 'move',
	      close_on_click : false
	    },

	    init : function (scope, method, options) {
	      this.bindings(method, options);
	    },

	    events : function () {
	      var self = this,
	          S = self.S,
	          move_class = '',
	          right_postfix = '',
	          left_postfix = '';

	      if (this.settings.open_method === 'move') {
	        move_class = 'move-';
	        right_postfix = 'right';
	        left_postfix = 'left';
	      } else if (this.settings.open_method === 'overlap_single') {
	        move_class = 'offcanvas-overlap-';
	        right_postfix = 'right';
	        left_postfix = 'left';
	      } else if (this.settings.open_method === 'overlap') {
	        move_class = 'offcanvas-overlap';
	      }

	      S(this.scope).off('.offcanvas')
	        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
	          self.click_toggle_class(e, move_class + right_postfix);
	          if (self.settings.open_method !== 'overlap') {
	            S('.left-submenu').removeClass(move_class + right_postfix);
	          }
	          $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
	        })
	        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
	          var settings = self.get_settings(e);
	          var parent = S(this).parent();

	          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
	            self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
	            parent.parent().removeClass(move_class + right_postfix);
	          } else if (S(this).parent().hasClass('has-submenu')) {
	            e.preventDefault();
	            S(this).siblings('.left-submenu').toggleClass(move_class + right_postfix);
	          } else if (parent.hasClass('back')) {
	            e.preventDefault();
	            parent.parent().removeClass(move_class + right_postfix);
	          }
	          $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
	        })
	        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
	          self.click_toggle_class(e, move_class + left_postfix);
	          if (self.settings.open_method !== 'overlap') {
	            S('.right-submenu').removeClass(move_class + left_postfix);
	          }
	          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
	        })
	        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
	          var settings = self.get_settings(e);
	          var parent = S(this).parent();

	          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
	            self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
	            parent.parent().removeClass(move_class + left_postfix);
	          } else if (S(this).parent().hasClass('has-submenu')) {
	            e.preventDefault();
	            S(this).siblings('.right-submenu').toggleClass(move_class + left_postfix);
	          } else if (parent.hasClass('back')) {
	            e.preventDefault();
	            parent.parent().removeClass(move_class + left_postfix);
	          }
	          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
	        })
	        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
	          self.click_remove_class(e, move_class + left_postfix);
	          S('.right-submenu').removeClass(move_class + left_postfix);
	          if (right_postfix) {
	            self.click_remove_class(e, move_class + right_postfix);
	            S('.left-submenu').removeClass(move_class + left_postfix);
	          }
	          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
	        })
	        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
	          self.click_remove_class(e, move_class + left_postfix);
	          $('.left-off-canvas-toggle').attr('aria-expanded', 'false');
	          if (right_postfix) {
	            self.click_remove_class(e, move_class + right_postfix);
	            $('.right-off-canvas-toggle').attr('aria-expanded', 'false');
	          }
	        });
	    },

	    toggle : function (class_name, $off_canvas) {
	      $off_canvas = $off_canvas || this.get_wrapper();
	      if ($off_canvas.is('.' + class_name)) {
	        this.hide(class_name, $off_canvas);
	      } else {
	        this.show(class_name, $off_canvas);
	      }
	    },

	    show : function (class_name, $off_canvas) {
	      $off_canvas = $off_canvas || this.get_wrapper();
	      $off_canvas.trigger('open.fndtn.offcanvas');
	      $off_canvas.addClass(class_name);
	    },

	    hide : function (class_name, $off_canvas) {
	      $off_canvas = $off_canvas || this.get_wrapper();
	      $off_canvas.trigger('close.fndtn.offcanvas');
	      $off_canvas.removeClass(class_name);
	    },

	    click_toggle_class : function (e, class_name) {
	      e.preventDefault();
	      var $off_canvas = this.get_wrapper(e);
	      this.toggle(class_name, $off_canvas);
	    },

	    click_remove_class : function (e, class_name) {
	      e.preventDefault();
	      var $off_canvas = this.get_wrapper(e);
	      this.hide(class_name, $off_canvas);
	    },

	    get_settings : function (e) {
	      var offcanvas  = this.S(e.target).closest('[' + this.attr_name() + ']');
	      return offcanvas.data(this.attr_name(true) + '-init') || this.settings;
	    },

	    get_wrapper : function (e) {
	      var $off_canvas = this.S(e ? e.target : this.scope).closest('.off-canvas-wrap');

	      if ($off_canvas.length === 0) {
	        $off_canvas = this.S('.off-canvas-wrap');
	      }
	      return $off_canvas;
	    },

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  var noop = function () {};

	  var Orbit = function (el, settings) {
	    // Don't reinitialize plugin
	    if (el.hasClass(settings.slides_container_class)) {
	      return this;
	    }

	    var self = this,
	        container,
	        slides_container = el,
	        number_container,
	        bullets_container,
	        timer_container,
	        idx = 0,
	        animate,
	        timer,
	        locked = false,
	        adjust_height_after = false;

	    self.slides = function () {
	      return slides_container.children(settings.slide_selector);
	    };

	    self.slides().first().addClass(settings.active_slide_class);

	    self.update_slide_number = function (index) {
	      if (settings.slide_number) {
	        number_container.find('span:first').text(parseInt(index) + 1);
	        number_container.find('span:last').text(self.slides().length);
	      }
	      if (settings.bullets) {
	        bullets_container.children().removeClass(settings.bullets_active_class);
	        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
	      }
	    };

	    self.update_active_link = function (index) {
	      var link = $('[data-orbit-link="' + self.slides().eq(index).attr('data-orbit-slide') + '"]');
	      link.siblings().removeClass(settings.bullets_active_class);
	      link.addClass(settings.bullets_active_class);
	    };

	    self.build_markup = function () {
	      slides_container.wrap('<div class="' + settings.container_class + '"></div>');
	      container = slides_container.parent();
	      slides_container.addClass(settings.slides_container_class);

	      if (settings.stack_on_small) {
	        container.addClass(settings.stack_on_small_class);
	      }

	      if (settings.navigation_arrows) {
	        container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
	        container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
	      }

	      if (settings.timer) {
	        timer_container = $('<div>').addClass(settings.timer_container_class);
	        timer_container.append('<span>');
	        timer_container.append($('<div>').addClass(settings.timer_progress_class));
	        timer_container.addClass(settings.timer_paused_class);
	        container.append(timer_container);
	      }

	      if (settings.slide_number) {
	        number_container = $('<div>').addClass(settings.slide_number_class);
	        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>');
	        container.append(number_container);
	      }

	      if (settings.bullets) {
	        bullets_container = $('<ol>').addClass(settings.bullets_container_class);
	        container.append(bullets_container);
	        bullets_container.wrap('<div class="orbit-bullets-container"></div>');
	        self.slides().each(function (idx, el) {
	          var bullet = $('<li>').attr('data-orbit-slide', idx).on('click', self.link_bullet);;
	          bullets_container.append(bullet);
	        });
	      }

	    };

	    self._goto = function (next_idx, start_timer) {
	      // if (locked) {return false;}
	      if (next_idx === idx) {return false;}
	      if (typeof timer === 'object') {timer.restart();}
	      var slides = self.slides();

	      var dir = 'next';
	      locked = true;
	      if (next_idx < idx) {dir = 'prev';}
	      if (next_idx >= slides.length) {
	        if (!settings.circular) {
	          return false;
	        }
	        next_idx = 0;
	      } else if (next_idx < 0) {
	        if (!settings.circular) {
	          return false;
	        }
	        next_idx = slides.length - 1;
	      }

	      var current = $(slides.get(idx));
	      var next = $(slides.get(next_idx));

	      current.css('zIndex', 2);
	      current.removeClass(settings.active_slide_class);
	      next.css('zIndex', 4).addClass(settings.active_slide_class);

	      slides_container.trigger('before-slide-change.fndtn.orbit');
	      settings.before_slide_change();
	      self.update_active_link(next_idx);

	      var callback = function () {
	        var unlock = function () {
	          idx = next_idx;
	          locked = false;
	          if (start_timer === true) {timer = self.create_timer(); timer.start();}
	          self.update_slide_number(idx);
	          slides_container.trigger('after-slide-change.fndtn.orbit', [{slide_number : idx, total_slides : slides.length}]);
	          settings.after_slide_change(idx, slides.length);
	        };
	        if (slides_container.outerHeight() != next.outerHeight() && settings.variable_height) {
	          slides_container.animate({'height': next.outerHeight()}, 250, 'linear', unlock);
	        } else {
	          unlock();
	        }
	      };

	      if (slides.length === 1) {callback(); return false;}

	      var start_animation = function () {
	        if (dir === 'next') {animate.next(current, next, callback);}
	        if (dir === 'prev') {animate.prev(current, next, callback);}
	      };

	      if (next.outerHeight() > slides_container.outerHeight() && settings.variable_height) {
	        slides_container.animate({'height': next.outerHeight()}, 250, 'linear', start_animation);
	      } else {
	        start_animation();
	      }
	    };

	    self.next = function (e) {
	      e.stopImmediatePropagation();
	      e.preventDefault();
	      self._goto(idx + 1);
	    };

	    self.prev = function (e) {
	      e.stopImmediatePropagation();
	      e.preventDefault();
	      self._goto(idx - 1);
	    };

	    self.link_custom = function (e) {
	      e.preventDefault();
	      var link = $(this).attr('data-orbit-link');
	      if ((typeof link === 'string') && (link = $.trim(link)) != '') {
	        var slide = container.find('[data-orbit-slide=' + link + ']');
	        if (slide.index() != -1) {self._goto(slide.index());}
	      }
	    };

	    self.link_bullet = function (e) {
	      var index = $(this).attr('data-orbit-slide');
	      if ((typeof index === 'string') && (index = $.trim(index)) != '') {
	        if (isNaN(parseInt(index))) {
	          var slide = container.find('[data-orbit-slide=' + index + ']');
	          if (slide.index() != -1) {self._goto(slide.index() + 1);}
	        } else {
	          self._goto(parseInt(index));
	        }
	      }

	    }

	    self.timer_callback = function () {
	      self._goto(idx + 1, true);
	    }

	    self.compute_dimensions = function () {
	      var current = $(self.slides().get(idx));
	      var h = current.outerHeight();
	      if (!settings.variable_height) {
	        self.slides().each(function(){
	          if ($(this).outerHeight() > h) { h = $(this).outerHeight(); }
	        });
	      }
	      slides_container.height(h);
	    };

	    self.create_timer = function () {
	      var t = new Timer(
	        container.find('.' + settings.timer_container_class),
	        settings,
	        self.timer_callback
	      );
	      return t;
	    };

	    self.stop_timer = function () {
	      if (typeof timer === 'object') {
	        timer.stop();
	      }
	    };

	    self.toggle_timer = function () {
	      var t = container.find('.' + settings.timer_container_class);
	      if (t.hasClass(settings.timer_paused_class)) {
	        if (typeof timer === 'undefined') {timer = self.create_timer();}
	        timer.start();
	      } else {
	        if (typeof timer === 'object') {timer.stop();}
	      }
	    };

	    self.init = function () {
	      self.build_markup();
	      if (settings.timer) {
	        timer = self.create_timer();
	        Foundation.utils.image_loaded(this.slides().children('img'), timer.start);
	      }
	      animate = new FadeAnimation(settings, slides_container);
	      if (settings.animation === 'slide') {
	        animate = new SlideAnimation(settings, slides_container);
	      }

	      container.on('click', '.' + settings.next_class, self.next);
	      container.on('click', '.' + settings.prev_class, self.prev);

	      if (settings.next_on_click) {
	        container.on('click', '.' + settings.slides_container_class + ' [data-orbit-slide]', self.link_bullet);
	      }

	      container.on('click', self.toggle_timer);
	      if (settings.swipe) {
	        container.on('touchstart.fndtn.orbit', function (e) {
	          if (!e.touches) {e = e.originalEvent;}
	          var data = {
	            start_page_x : e.touches[0].pageX,
	            start_page_y : e.touches[0].pageY,
	            start_time : (new Date()).getTime(),
	            delta_x : 0,
	            is_scrolling : undefined
	          };
	          container.data('swipe-transition', data);
	          e.stopPropagation();
	        })
	        .on('touchmove.fndtn.orbit', function (e) {
	          if (!e.touches) {
	            e = e.originalEvent;
	          }
	          // Ignore pinch/zoom events
	          if (e.touches.length > 1 || e.scale && e.scale !== 1) {
	            return;
	          }

	          var data = container.data('swipe-transition');
	          if (typeof data === 'undefined') {data = {};}

	          data.delta_x = e.touches[0].pageX - data.start_page_x;

	          if ( typeof data.is_scrolling === 'undefined') {
	            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
	          }

	          if (!data.is_scrolling && !data.active) {
	            e.preventDefault();
	            var direction = (data.delta_x < 0) ? (idx + 1) : (idx - 1);
	            data.active = true;
	            self._goto(direction);
	          }
	        })
	        .on('touchend.fndtn.orbit', function (e) {
	          container.data('swipe-transition', {});
	          e.stopPropagation();
	        })
	      }
	      container.on('mouseenter.fndtn.orbit', function (e) {
	        if (settings.timer && settings.pause_on_hover) {
	          self.stop_timer();
	        }
	      })
	      .on('mouseleave.fndtn.orbit', function (e) {
	        if (settings.timer && settings.resume_on_mouseout) {
	          timer.start();
	        }
	      });

	      $(document).on('click', '[data-orbit-link]', self.link_custom);
	      $(window).on('load resize', self.compute_dimensions);
	      Foundation.utils.image_loaded(this.slides().children('img'), self.compute_dimensions);
	      Foundation.utils.image_loaded(this.slides().children('img'), function () {
	        container.prev('.' + settings.preloader_class).css('display', 'none');
	        self.update_slide_number(0);
	        self.update_active_link(0);
	        slides_container.trigger('ready.fndtn.orbit');
	      });
	    };

	    self.init();
	  };

	  var Timer = function (el, settings, callback) {
	    var self = this,
	        duration = settings.timer_speed,
	        progress = el.find('.' + settings.timer_progress_class),
	        start,
	        timeout,
	        left = -1;

	    this.update_progress = function (w) {
	      var new_progress = progress.clone();
	      new_progress.attr('style', '');
	      new_progress.css('width', w + '%');
	      progress.replaceWith(new_progress);
	      progress = new_progress;
	    };

	    this.restart = function () {
	      clearTimeout(timeout);
	      el.addClass(settings.timer_paused_class);
	      left = -1;
	      self.update_progress(0);
	    };

	    this.start = function () {
	      if (!el.hasClass(settings.timer_paused_class)) {return true;}
	      left = (left === -1) ? duration : left;
	      el.removeClass(settings.timer_paused_class);
	      start = new Date().getTime();
	      progress.animate({'width' : '100%'}, left, 'linear');
	      timeout = setTimeout(function () {
	        self.restart();
	        callback();
	      }, left);
	      el.trigger('timer-started.fndtn.orbit')
	    };

	    this.stop = function () {
	      if (el.hasClass(settings.timer_paused_class)) {return true;}
	      clearTimeout(timeout);
	      el.addClass(settings.timer_paused_class);
	      var end = new Date().getTime();
	      left = left - (end - start);
	      var w = 100 - ((left / duration) * 100);
	      self.update_progress(w);
	      el.trigger('timer-stopped.fndtn.orbit');
	    };
	  };

	  var SlideAnimation = function (settings, container) {
	    var duration = settings.animation_speed;
	    var is_rtl = ($('html[dir=rtl]').length === 1);
	    var margin = is_rtl ? 'marginRight' : 'marginLeft';
	    var animMargin = {};
	    animMargin[margin] = '0%';

	    this.next = function (current, next, callback) {
	      current.animate({marginLeft : '-100%'}, duration);
	      next.animate(animMargin, duration, function () {
	        current.css(margin, '100%');
	        callback();
	      });
	    };

	    this.prev = function (current, prev, callback) {
	      current.animate({marginLeft : '100%'}, duration);
	      prev.css(margin, '-100%');
	      prev.animate(animMargin, duration, function () {
	        current.css(margin, '100%');
	        callback();
	      });
	    };
	  };

	  var FadeAnimation = function (settings, container) {
	    var duration = settings.animation_speed;
	    var is_rtl = ($('html[dir=rtl]').length === 1);
	    var margin = is_rtl ? 'marginRight' : 'marginLeft';

	    this.next = function (current, next, callback) {
	      next.css({'margin' : '0%', 'opacity' : '0.01'});
	      next.animate({'opacity' :'1'}, duration, 'linear', function () {
	        current.css('margin', '100%');
	        callback();
	      });
	    };

	    this.prev = function (current, prev, callback) {
	      prev.css({'margin' : '0%', 'opacity' : '0.01'});
	      prev.animate({'opacity' : '1'}, duration, 'linear', function () {
	        current.css('margin', '100%');
	        callback();
	      });
	    };
	  };

	  Foundation.libs = Foundation.libs || {};

	  Foundation.libs.orbit = {
	    name : 'orbit',

	    version : '5.5.2',

	    settings : {
	      animation : 'slide',
	      timer_speed : 10000,
	      pause_on_hover : true,
	      resume_on_mouseout : false,
	      next_on_click : true,
	      animation_speed : 500,
	      stack_on_small : false,
	      navigation_arrows : true,
	      slide_number : true,
	      slide_number_text : 'of',
	      container_class : 'orbit-container',
	      stack_on_small_class : 'orbit-stack-on-small',
	      next_class : 'orbit-next',
	      prev_class : 'orbit-prev',
	      timer_container_class : 'orbit-timer',
	      timer_paused_class : 'paused',
	      timer_progress_class : 'orbit-progress',
	      slides_container_class : 'orbit-slides-container',
	      preloader_class : 'preloader',
	      slide_selector : '*',
	      bullets_container_class : 'orbit-bullets',
	      bullets_active_class : 'active',
	      slide_number_class : 'orbit-slide-number',
	      caption_class : 'orbit-caption',
	      active_slide_class : 'active',
	      orbit_transition_class : 'orbit-transitioning',
	      bullets : true,
	      circular : true,
	      timer : true,
	      variable_height : false,
	      swipe : true,
	      before_slide_change : noop,
	      after_slide_change : noop
	    },

	    init : function (scope, method, options) {
	      var self = this;
	      this.bindings(method, options);
	    },

	    events : function (instance) {
	      var orbit_instance = new Orbit(this.S(instance), this.S(instance).data('orbit-init'));
	      this.S(instance).data(this.name + '-instance', orbit_instance);
	    },

	    reflow : function () {
	      var self = this;

	      if (self.S(self.scope).is('[data-orbit]')) {
	        var $el = self.S(self.scope);
	        var instance = $el.data(self.name + '-instance');
	        instance.compute_dimensions();
	      } else {
	        self.S('[data-orbit]', self.scope).each(function (idx, el) {
	          var $el = self.S(el);
	          var opts = self.data_options($el);
	          var instance = $el.data(self.name + '-instance');
	          instance.compute_dimensions();
	        });
	      }
	    }
	  };

	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.reveal = {
	    name : 'reveal',

	    version : '5.5.2',

	    locked : false,

	    settings : {
	      animation : 'fadeAndPop',
	      animation_speed : 250,
	      close_on_background_click : true,
	      close_on_esc : true,
	      dismiss_modal_class : 'close-reveal-modal',
	      multiple_opened : false,
	      bg_class : 'reveal-modal-bg',
	      root_element : 'body',
	      open : function(){},
	      opened : function(){},
	      close : function(){},
	      closed : function(){},
	      on_ajax_error: $.noop,
	      bg : $('.reveal-modal-bg'),
	      css : {
	        open : {
	          'opacity' : 0,
	          'visibility' : 'visible',
	          'display' : 'block'
	        },
	        close : {
	          'opacity' : 1,
	          'visibility' : 'hidden',
	          'display' : 'none'
	        }
	      }
	    },

	    init : function (scope, method, options) {
	      $.extend(true, this.settings, method, options);
	      this.bindings(method, options);
	    },

	    events : function (scope) {
	      var self = this,
	          S = self.S;

	      S(this.scope)
	        .off('.reveal')
	        .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function (e) {
	          e.preventDefault();

	          if (!self.locked) {
	            var element = S(this),
	                ajax = element.data(self.data_attr('reveal-ajax')),
	                replaceContentSel = element.data(self.data_attr('reveal-replace-content'));

	            self.locked = true;

	            if (typeof ajax === 'undefined') {
	              self.open.call(self, element);
	            } else {
	              var url = ajax === true ? element.attr('href') : ajax;
	              self.open.call(self, element, {url : url}, { replaceContentSel : replaceContentSel });
	            }
	          }
	        });

	      S(document)
	        .on('click.fndtn.reveal', this.close_targets(), function (e) {
	          e.preventDefault();
	          if (!self.locked) {
	            var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init') || self.settings,
	                bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

	            if (bg_clicked) {
	              if (settings.close_on_background_click) {
	                e.stopPropagation();
	              } else {
	                return;
	              }
	            }

	            self.locked = true;
	            self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open:not(.toback)') : S(this).closest('[' + self.attr_name() + ']'));
	          }
	        });

	      if (S('[' + self.attr_name() + ']', this.scope).length > 0) {
	        S(this.scope)
	          // .off('.reveal')
	          .on('open.fndtn.reveal', this.settings.open)
	          .on('opened.fndtn.reveal', this.settings.opened)
	          .on('opened.fndtn.reveal', this.open_video)
	          .on('close.fndtn.reveal', this.settings.close)
	          .on('closed.fndtn.reveal', this.settings.closed)
	          .on('closed.fndtn.reveal', this.close_video);
	      } else {
	        S(this.scope)
	          // .off('.reveal')
	          .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
	          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
	          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
	          .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
	          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
	          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
	      }

	      return true;
	    },

	    // PATCH #3: turning on key up capture only when a reveal window is open
	    key_up_on : function (scope) {
	      var self = this;

	      // PATCH #1: fixing multiple keyup event trigger from single key press
	      self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function ( event ) {
	        var open_modal = self.S('[' + self.attr_name() + '].open'),
	            settings = open_modal.data(self.attr_name(true) + '-init') || self.settings ;
	        // PATCH #2: making sure that the close event can be called only while unlocked,
	        //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
	        if ( settings && event.which === 27  && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
	          self.close.call(self, open_modal);
	        }
	      });

	      return true;
	    },

	    // PATCH #3: turning on key up capture only when a reveal window is open
	    key_up_off : function (scope) {
	      this.S('body').off('keyup.fndtn.reveal');
	      return true;
	    },

	    open : function (target, ajax_settings) {
	      var self = this,
	          modal;

	      if (target) {
	        if (typeof target.selector !== 'undefined') {
	          // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
	          modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
	        } else {
	          modal = self.S(this.scope);

	          ajax_settings = target;
	        }
	      } else {
	        modal = self.S(this.scope);
	      }

	      var settings = modal.data(self.attr_name(true) + '-init');
	      settings = settings || this.settings;


	      if (modal.hasClass('open') && target.attr('data-reveal-id') == modal.attr('id')) {
	        return self.close(modal);
	      }

	      if (!modal.hasClass('open')) {
	        var open_modal = self.S('[' + self.attr_name() + '].open');

	        if (typeof modal.data('css-top') === 'undefined') {
	          modal.data('css-top', parseInt(modal.css('top'), 10))
	            .data('offset', this.cache_offset(modal));
	        }

	        modal.attr('tabindex','0').attr('aria-hidden','false');

	        this.key_up_on(modal);    // PATCH #3: turning on key up capture only when a reveal window is open

	        // Prevent namespace event from triggering twice
	        modal.on('open.fndtn.reveal', function(e) {
	          if (e.namespace !== 'fndtn.reveal') return;
	        });

	        modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');

	        if (open_modal.length < 1) {
	          this.toggle_bg(modal, true);
	        }

	        if (typeof ajax_settings === 'string') {
	          ajax_settings = {
	            url : ajax_settings
	          };
	        }

	        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
	          if (open_modal.length > 0) {
	            if (settings.multiple_opened) {
	              self.to_back(open_modal);
	            } else {
	              self.hide(open_modal, settings.css.close);
	            }
	          }

	          this.show(modal, settings.css.open);
	        } else {
	          var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;
	          $.extend(ajax_settings, {
	            success : function (data, textStatus, jqXHR) {
	              if ( $.isFunction(old_success) ) {
	                var result = old_success(data, textStatus, jqXHR);
	                if (typeof result == 'string') {
	                  data = result;
	                }
	              }

	              if (typeof options !== 'undefined' && typeof options.replaceContentSel !== 'undefined') {
	                modal.find(options.replaceContentSel).html(data);
	              } else {
	                modal.html(data);
	              }

	              self.S(modal).foundation('section', 'reflow');
	              self.S(modal).children().foundation();

	              if (open_modal.length > 0) {
	                if (settings.multiple_opened) {
	                  self.to_back(open_modal);
	                } else {
	                  self.hide(open_modal, settings.css.close);
	                }
	              }
	              self.show(modal, settings.css.open);
	            }
	          });

	          // check for if user initalized with error callback
	          if (settings.on_ajax_error !== $.noop) {
	            $.extend(ajax_settings, {
	              error : settings.on_ajax_error
	            });
	          }

	          $.ajax(ajax_settings);
	        }
	      }
	      self.S(window).trigger('resize');
	    },

	    close : function (modal) {
	      var modal = modal && modal.length ? modal : this.S(this.scope),
	          open_modals = this.S('[' + this.attr_name() + '].open'),
	          settings = modal.data(this.attr_name(true) + '-init') || this.settings,
	          self = this;

	      if (open_modals.length > 0) {

	        modal.removeAttr('tabindex','0').attr('aria-hidden','true');

	        this.locked = true;
	        this.key_up_off(modal);   // PATCH #3: turning on key up capture only when a reveal window is open

	        modal.trigger('close.fndtn.reveal');

	        if ((settings.multiple_opened && open_modals.length === 1) || !settings.multiple_opened || modal.length > 1) {
	          self.toggle_bg(modal, false);
	          self.to_front(modal);
	        }

	        if (settings.multiple_opened) {
	          self.hide(modal, settings.css.close, settings);
	          self.to_front($($.makeArray(open_modals).reverse()[1]));
	        } else {
	          self.hide(open_modals, settings.css.close, settings);
	        }
	      }
	    },

	    close_targets : function () {
	      var base = '.' + this.settings.dismiss_modal_class;

	      if (this.settings.close_on_background_click) {
	        return base + ', .' + this.settings.bg_class;
	      }

	      return base;
	    },

	    toggle_bg : function (modal, state) {
	      if (this.S('.' + this.settings.bg_class).length === 0) {
	        this.settings.bg = $('<div />', {'class': this.settings.bg_class})
	          .appendTo('body').hide();
	      }

	      var visible = this.settings.bg.filter(':visible').length > 0;
	      if ( state != visible ) {
	        if ( state == undefined ? visible : !state ) {
	          this.hide(this.settings.bg);
	        } else {
	          this.show(this.settings.bg);
	        }
	      }
	    },

	    show : function (el, css) {
	      // is modal
	      if (css) {
	        var settings = el.data(this.attr_name(true) + '-init') || this.settings,
	            root_element = settings.root_element,
	            context = this;

	        if (el.parent(root_element).length === 0) {
	          var placeholder = el.wrap('<div style="display: none;" />').parent();

	          el.on('closed.fndtn.reveal.wrapped', function () {
	            el.detach().appendTo(placeholder);
	            el.unwrap().unbind('closed.fndtn.reveal.wrapped');
	          });

	          el.detach().appendTo(root_element);
	        }

	        var animData = getAnimationData(settings.animation);
	        if (!animData.animate) {
	          this.locked = false;
	        }
	        if (animData.pop) {
	          css.top = $(window).scrollTop() - el.data('offset') + 'px';
	          var end_css = {
	            top: $(window).scrollTop() + el.data('css-top') + 'px',
	            opacity: 1
	          };

	          return setTimeout(function () {
	            return el
	              .css(css)
	              .animate(end_css, settings.animation_speed, 'linear', function () {
	                context.locked = false;
	                el.trigger('opened.fndtn.reveal');
	              })
	              .addClass('open');
	          }, settings.animation_speed / 2);
	        }

	        if (animData.fade) {
	          css.top = $(window).scrollTop() + el.data('css-top') + 'px';
	          var end_css = {opacity: 1};

	          return setTimeout(function () {
	            return el
	              .css(css)
	              .animate(end_css, settings.animation_speed, 'linear', function () {
	                context.locked = false;
	                el.trigger('opened.fndtn.reveal');
	              })
	              .addClass('open');
	          }, settings.animation_speed / 2);
	        }

	        return el.css(css).show().css({opacity : 1}).addClass('open').trigger('opened.fndtn.reveal');
	      }

	      var settings = this.settings;

	      // should we animate the background?
	      if (getAnimationData(settings.animation).fade) {
	        return el.fadeIn(settings.animation_speed / 2);
	      }

	      this.locked = false;

	      return el.show();
	    },

	    to_back : function(el) {
	      el.addClass('toback');
	    },

	    to_front : function(el) {
	      el.removeClass('toback');
	    },

	    hide : function (el, css) {
	      // is modal
	      if (css) {
	        var settings = el.data(this.attr_name(true) + '-init'),
	            context = this;
	        settings = settings || this.settings;

	        var animData = getAnimationData(settings.animation);
	        if (!animData.animate) {
	          this.locked = false;
	        }
	        if (animData.pop) {
	          var end_css = {
	            top: - $(window).scrollTop() - el.data('offset') + 'px',
	            opacity: 0
	          };

	          return setTimeout(function () {
	            return el
	              .animate(end_css, settings.animation_speed, 'linear', function () {
	                context.locked = false;
	                el.css(css).trigger('closed.fndtn.reveal');
	              })
	              .removeClass('open');
	          }, settings.animation_speed / 2);
	        }

	        if (animData.fade) {
	          var end_css = {opacity : 0};

	          return setTimeout(function () {
	            return el
	              .animate(end_css, settings.animation_speed, 'linear', function () {
	                context.locked = false;
	                el.css(css).trigger('closed.fndtn.reveal');
	              })
	              .removeClass('open');
	          }, settings.animation_speed / 2);
	        }

	        return el.hide().css(css).removeClass('open').trigger('closed.fndtn.reveal');
	      }

	      var settings = this.settings;

	      // should we animate the background?
	      if (getAnimationData(settings.animation).fade) {
	        return el.fadeOut(settings.animation_speed / 2);
	      }

	      return el.hide();
	    },

	    close_video : function (e) {
	      var video = $('.flex-video', e.target),
	          iframe = $('iframe', video);

	      if (iframe.length > 0) {
	        iframe.attr('data-src', iframe[0].src);
	        iframe.attr('src', iframe.attr('src'));
	        video.hide();
	      }
	    },

	    open_video : function (e) {
	      var video = $('.flex-video', e.target),
	          iframe = video.find('iframe');

	      if (iframe.length > 0) {
	        var data_src = iframe.attr('data-src');
	        if (typeof data_src === 'string') {
	          iframe[0].src = iframe.attr('data-src');
	        } else {
	          var src = iframe[0].src;
	          iframe[0].src = undefined;
	          iframe[0].src = src;
	        }
	        video.show();
	      }
	    },

	    data_attr : function (str) {
	      if (this.namespace.length > 0) {
	        return this.namespace + '-' + str;
	      }

	      return str;
	    },

	    cache_offset : function (modal) {
	      var offset = modal.show().height() + parseInt(modal.css('top'), 10) + modal.scrollY;

	      modal.hide();

	      return offset;
	    },

	    off : function () {
	      $(this.scope).off('.fndtn.reveal');
	    },

	    reflow : function () {}
	  };

	  /*
	   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
	   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
	   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
	   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
	   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
	   */
	  function getAnimationData(str) {
	    var fade = /fade/i.test(str);
	    var pop = /pop/i.test(str);
	    return {
	      animate : fade || pop,
	      pop : pop,
	      fade : fade
	    };
	  }
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.slider = {
	    name : 'slider',

	    version : '5.5.2',

	    settings : {
	      start : 0,
	      end : 100,
	      step : 1,
	      precision : null,
	      initial : null,
	      display_selector : '',
	      vertical : false,
	      trigger_input_change : false,
	      on_change : function () {}
	    },

	    cache : {},

	    init : function (scope, method, options) {
	      Foundation.inherit(this, 'throttle');
	      this.bindings(method, options);
	      this.reflow();
	    },

	    events : function () {
	      var self = this;

	      $(this.scope)
	        .off('.slider')
	        .on('mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider',
	        '[' + self.attr_name() + ']:not(.disabled, [disabled]) .range-slider-handle', function (e) {
	          if (!self.cache.active) {
	            e.preventDefault();
	            self.set_active_slider($(e.target));
	          }
	        })
	        .on('mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider', function (e) {
	          if (!!self.cache.active) {
	            e.preventDefault();
	            if ($.data(self.cache.active[0], 'settings').vertical) {
	              var scroll_offset = 0;
	              if (!e.pageY) {
	                scroll_offset = window.scrollY;
	              }
	              self.calculate_position(self.cache.active, self.get_cursor_position(e, 'y') + scroll_offset);
	            } else {
	              self.calculate_position(self.cache.active, self.get_cursor_position(e, 'x'));
	            }
	          }
	        })
	        .on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider', function (e) {
	          self.remove_active_slider();
	        })
	        .on('change.fndtn.slider', function (e) {
	          self.settings.on_change();
	        });

	      self.S(window)
	        .on('resize.fndtn.slider', self.throttle(function (e) {
	          self.reflow();
	        }, 300));

	      // update slider value as users change input value
	      this.S('[' + this.attr_name() + ']').each(function () {
	        var slider = $(this),
	            handle = slider.children('.range-slider-handle')[0],
	            settings = self.initialize_settings(handle);

	        if (settings.display_selector != '') {
	          $(settings.display_selector).each(function(){
	            if (this.hasOwnProperty('value')) {
	              $(this).change(function(){
	                // is there a better way to do this?
	                slider.foundation("slider", "set_value", $(this).val());
	              });
	            }
	          });
	        }
	      });
	    },

	    get_cursor_position : function (e, xy) {
	      var pageXY = 'page' + xy.toUpperCase(),
	          clientXY = 'client' + xy.toUpperCase(),
	          position;

	      if (typeof e[pageXY] !== 'undefined') {
	        position = e[pageXY];
	      } else if (typeof e.originalEvent[clientXY] !== 'undefined') {
	        position = e.originalEvent[clientXY];
	      } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0][clientXY] !== 'undefined') {
	        position = e.originalEvent.touches[0][clientXY];
	      } else if (e.currentPoint && typeof e.currentPoint[xy] !== 'undefined') {
	        position = e.currentPoint[xy];
	      }

	      return position;
	    },

	    set_active_slider : function ($handle) {
	      this.cache.active = $handle;
	    },

	    remove_active_slider : function () {
	      this.cache.active = null;
	    },

	    calculate_position : function ($handle, cursor_x) {
	      var self = this,
	          settings = $.data($handle[0], 'settings'),
	          handle_l = $.data($handle[0], 'handle_l'),
	          handle_o = $.data($handle[0], 'handle_o'),
	          bar_l = $.data($handle[0], 'bar_l'),
	          bar_o = $.data($handle[0], 'bar_o');

	      requestAnimationFrame(function () {
	        var pct;

	        if (Foundation.rtl && !settings.vertical) {
	          pct = self.limit_to(((bar_o + bar_l - cursor_x) / bar_l), 0, 1);
	        } else {
	          pct = self.limit_to(((cursor_x - bar_o) / bar_l), 0, 1);
	        }

	        pct = settings.vertical ? 1 - pct : pct;

	        var norm = self.normalized_value(pct, settings.start, settings.end, settings.step, settings.precision);

	        self.set_ui($handle, norm);
	      });
	    },

	    set_ui : function ($handle, value) {
	      var settings = $.data($handle[0], 'settings'),
	          handle_l = $.data($handle[0], 'handle_l'),
	          bar_l = $.data($handle[0], 'bar_l'),
	          norm_pct = this.normalized_percentage(value, settings.start, settings.end),
	          handle_offset = norm_pct * (bar_l - handle_l) - 1,
	          progress_bar_length = norm_pct * 100,
	          $handle_parent = $handle.parent(),
	          $hidden_inputs = $handle.parent().children('input[type=hidden]');

	      if (Foundation.rtl && !settings.vertical) {
	        handle_offset = -handle_offset;
	      }

	      handle_offset = settings.vertical ? -handle_offset + bar_l - handle_l + 1 : handle_offset;
	      this.set_translate($handle, handle_offset, settings.vertical);

	      if (settings.vertical) {
	        $handle.siblings('.range-slider-active-segment').css('height', progress_bar_length + '%');
	      } else {
	        $handle.siblings('.range-slider-active-segment').css('width', progress_bar_length + '%');
	      }

	      $handle_parent.attr(this.attr_name(), value).trigger('change.fndtn.slider');

	      $hidden_inputs.val(value);
	      if (settings.trigger_input_change) {
	          $hidden_inputs.trigger('change.fndtn.slider');
	      }

	      if (!$handle[0].hasAttribute('aria-valuemin')) {
	        $handle.attr({
	          'aria-valuemin' : settings.start,
	          'aria-valuemax' : settings.end
	        });
	      }
	      $handle.attr('aria-valuenow', value);

	      if (settings.display_selector != '') {
	        $(settings.display_selector).each(function () {
	          if (this.hasAttribute('value')) {
	            $(this).val(value);
	          } else {
	            $(this).text(value);
	          }
	        });
	      }

	    },

	    normalized_percentage : function (val, start, end) {
	      return Math.min(1, (val - start) / (end - start));
	    },

	    normalized_value : function (val, start, end, step, precision) {
	      var range = end - start,
	          point = val * range,
	          mod = (point - (point % step)) / step,
	          rem = point % step,
	          round = ( rem >= step * 0.5 ? step : 0);
	      return ((mod * step + round) + start).toFixed(precision);
	    },

	    set_translate : function (ele, offset, vertical) {
	      if (vertical) {
	        $(ele)
	          .css('-webkit-transform', 'translateY(' + offset + 'px)')
	          .css('-moz-transform', 'translateY(' + offset + 'px)')
	          .css('-ms-transform', 'translateY(' + offset + 'px)')
	          .css('-o-transform', 'translateY(' + offset + 'px)')
	          .css('transform', 'translateY(' + offset + 'px)');
	      } else {
	        $(ele)
	          .css('-webkit-transform', 'translateX(' + offset + 'px)')
	          .css('-moz-transform', 'translateX(' + offset + 'px)')
	          .css('-ms-transform', 'translateX(' + offset + 'px)')
	          .css('-o-transform', 'translateX(' + offset + 'px)')
	          .css('transform', 'translateX(' + offset + 'px)');
	      }
	    },

	    limit_to : function (val, min, max) {
	      return Math.min(Math.max(val, min), max);
	    },

	    initialize_settings : function (handle) {
	      var settings = $.extend({}, this.settings, this.data_options($(handle).parent())),
	          decimal_places_match_result;

	      if (settings.precision === null) {
	        decimal_places_match_result = ('' + settings.step).match(/\.([\d]*)/);
	        settings.precision = decimal_places_match_result && decimal_places_match_result[1] ? decimal_places_match_result[1].length : 0;
	      }

	      if (settings.vertical) {
	        $.data(handle, 'bar_o', $(handle).parent().offset().top);
	        $.data(handle, 'bar_l', $(handle).parent().outerHeight());
	        $.data(handle, 'handle_o', $(handle).offset().top);
	        $.data(handle, 'handle_l', $(handle).outerHeight());
	      } else {
	        $.data(handle, 'bar_o', $(handle).parent().offset().left);
	        $.data(handle, 'bar_l', $(handle).parent().outerWidth());
	        $.data(handle, 'handle_o', $(handle).offset().left);
	        $.data(handle, 'handle_l', $(handle).outerWidth());
	      }

	      $.data(handle, 'bar', $(handle).parent());
	      return $.data(handle, 'settings', settings);
	    },

	    set_initial_position : function ($ele) {
	      var settings = $.data($ele.children('.range-slider-handle')[0], 'settings'),
	          initial = ((typeof settings.initial == 'number' && !isNaN(settings.initial)) ? settings.initial : Math.floor((settings.end - settings.start) * 0.5 / settings.step) * settings.step + settings.start),
	          $handle = $ele.children('.range-slider-handle');
	      this.set_ui($handle, initial);
	    },

	    set_value : function (value) {
	      var self = this;
	      $('[' + self.attr_name() + ']', this.scope).each(function () {
	        $(this).attr(self.attr_name(), value);
	      });
	      if (!!$(this.scope).attr(self.attr_name())) {
	        $(this.scope).attr(self.attr_name(), value);
	      }
	      self.reflow();
	    },

	    reflow : function () {
	      var self = this;
	      self.S('[' + this.attr_name() + ']').each(function () {
	        var handle = $(this).children('.range-slider-handle')[0],
	            val = $(this).attr(self.attr_name());
	        self.initialize_settings(handle);

	        if (val) {
	          self.set_ui($(handle), parseFloat(val));
	        } else {
	          self.set_initial_position($(this));
	        }
	      });
	    }
	  };

	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.tab = {
	    name : 'tab',

	    version : '5.5.2',

	    settings : {
	      active_class : 'active',
	      callback : function () {},
	      deep_linking : false,
	      scroll_to_content : true,
	      is_hover : false
	    },

	    default_tab_hashes : [],

	    init : function (scope, method, options) {
	      var self = this,
	          S = this.S;

		  // Store the default active tabs which will be referenced when the
		  // location hash is absent, as in the case of navigating the tabs and
		  // returning to the first viewing via the browser Back button.
		  S('[' + this.attr_name() + '] > .active > a', this.scope).each(function () {
		    self.default_tab_hashes.push(this.hash);
		  });

	      // store the initial href, which is used to allow correct behaviour of the
	      // browser back button when deep linking is turned on.
	      self.entry_location = window.location.href;

	      this.bindings(method, options);
	      this.handle_location_hash_change();
	    },

	    events : function () {
	      var self = this,
	          S = this.S;

	      var usual_tab_behavior =  function (e, target) {
	          var settings = S(target).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
	          if (!settings.is_hover || Modernizr.touch) {
	            e.preventDefault();
	            e.stopPropagation();
	            self.toggle_active_tab(S(target).parent());
	          }
	        };

	      S(this.scope)
	        .off('.tab')
	        // Key event: focus/tab key
	        .on('keydown.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
	          var el = this;
	          var keyCode = e.keyCode || e.which;
	            // if user pressed tab key
	            if (keyCode == 9) { 
	              e.preventDefault();
	              // TODO: Change usual_tab_behavior into accessibility function?
	              usual_tab_behavior(e, el);
	            } 
	        })
	        // Click event: tab title
	        .on('click.fndtn.tab', '[' + this.attr_name() + '] > * > a', function(e) {
	          var el = this;
	          usual_tab_behavior(e, el);
	        })
	        // Hover event: tab title
	        .on('mouseenter.fndtn.tab', '[' + this.attr_name() + '] > * > a', function (e) {
	          var settings = S(this).closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
	          if (settings.is_hover) {
	            self.toggle_active_tab(S(this).parent());
	          }
	        });

	      // Location hash change event
	      S(window).on('hashchange.fndtn.tab', function (e) {
	        e.preventDefault();
	        self.handle_location_hash_change();
	      });
	    },

	    handle_location_hash_change : function () {

	      var self = this,
	          S = this.S;

	      S('[' + this.attr_name() + ']', this.scope).each(function () {
	        var settings = S(this).data(self.attr_name(true) + '-init');
	        if (settings.deep_linking) {
	          // Match the location hash to a label
	          var hash;
	          if (settings.scroll_to_content) {
	            hash = self.scope.location.hash;
	          } else {
	            // prefix the hash to prevent anchor scrolling
	            hash = self.scope.location.hash.replace('fndtn-', '');
	          }
	          if (hash != '') {
	            // Check whether the location hash references a tab content div or
	            // another element on the page (inside or outside the tab content div)
	            var hash_element = S(hash);
	            if (hash_element.hasClass('content') && hash_element.parent().hasClass('tabs-content')) {
	              // Tab content div
	              self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + hash + ']').parent());
	            } else {
	              // Not the tab content div. If inside the tab content, find the
	              // containing tab and toggle it as active.
	              var hash_tab_container_id = hash_element.closest('.content').attr('id');
	              if (hash_tab_container_id != undefined) {
	                self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=#' + hash_tab_container_id + ']').parent(), hash);
	              }
	            }
	          } else {
	            // Reference the default tab hashes which were initialized in the init function
	            for (var ind = 0; ind < self.default_tab_hashes.length; ind++) {
	              self.toggle_active_tab($('[' + self.attr_name() + '] > * > a[href=' + self.default_tab_hashes[ind] + ']').parent());
	            }
	          }
	        }
	       });
	     },

	    toggle_active_tab : function (tab, location_hash) {
	      var self = this,
	          S = self.S,
	          tabs = tab.closest('[' + this.attr_name() + ']'),
	          tab_link = tab.find('a'),
	          anchor = tab.children('a').first(),
	          target_hash = '#' + anchor.attr('href').split('#')[1],
	          target = S(target_hash),
	          siblings = tab.siblings(),
	          settings = tabs.data(this.attr_name(true) + '-init'),
	          interpret_keyup_action = function (e) {
	            // Light modification of Heydon Pickering's Practical ARIA Examples: http://heydonworks.com/practical_aria_examples/js/a11y.js

	            // define current, previous and next (possible) tabs

	            var $original = $(this);
	            var $prev = $(this).parents('li').prev().children('[role="tab"]');
	            var $next = $(this).parents('li').next().children('[role="tab"]');
	            var $target;

	            // find the direction (prev or next)

	            switch (e.keyCode) {
	              case 37:
	                $target = $prev;
	                break;
	              case 39:
	                $target = $next;
	                break;
	              default:
	                $target = false
	                  break;
	            }

	            if ($target.length) {
	              $original.attr({
	                'tabindex' : '-1',
	                'aria-selected' : null
	              });
	              $target.attr({
	                'tabindex' : '0',
	                'aria-selected' : true
	              }).focus();
	            }

	            // Hide panels

	            $('[role="tabpanel"]')
	              .attr('aria-hidden', 'true');

	            // Show panel which corresponds to target

	            $('#' + $(document.activeElement).attr('href').substring(1))
	              .attr('aria-hidden', null);

	          },
	          go_to_hash = function(hash) {
	            // This function allows correct behaviour of the browser's back button when deep linking is enabled. Without it
	            // the user would get continually redirected to the default hash.
	            var is_entry_location = window.location.href === self.entry_location,
	                default_hash = settings.scroll_to_content ? self.default_tab_hashes[0] : is_entry_location ? window.location.hash :'fndtn-' + self.default_tab_hashes[0].replace('#', '')

	            if (!(is_entry_location && hash === default_hash)) {
	              window.location.hash = hash;
	            }
	          };

	      // allow usage of data-tab-content attribute instead of href
	      if (anchor.data('tab-content')) {
	        target_hash = '#' + anchor.data('tab-content').split('#')[1];
	        target = S(target_hash);
	      }

	      if (settings.deep_linking) {

	        if (settings.scroll_to_content) {

	          // retain current hash to scroll to content
	          go_to_hash(location_hash || target_hash);

	          if (location_hash == undefined || location_hash == target_hash) {
	            tab.parent()[0].scrollIntoView();
	          } else {
	            S(target_hash)[0].scrollIntoView();
	          }
	        } else {
	          // prefix the hashes so that the browser doesn't scroll down
	          if (location_hash != undefined) {
	            go_to_hash('fndtn-' + location_hash.replace('#', ''));
	          } else {
	            go_to_hash('fndtn-' + target_hash.replace('#', ''));
	          }
	        }
	      }

	      // WARNING: The activation and deactivation of the tab content must
	      // occur after the deep linking in order to properly refresh the browser
	      // window (notably in Chrome).
	      // Clean up multiple attr instances to done once
	      tab.addClass(settings.active_class).triggerHandler('opened');
	      tab_link.attr({'aria-selected' : 'true',  tabindex : 0});
	      siblings.removeClass(settings.active_class)
	      siblings.find('a').attr({'aria-selected' : 'false',  tabindex : -1});
	      target.siblings().removeClass(settings.active_class).attr({'aria-hidden' : 'true',  tabindex : -1});
	      target.addClass(settings.active_class).attr('aria-hidden', 'false').removeAttr('tabindex');
	      settings.callback(tab);
	      target.triggerHandler('toggled', [target]);
	      tabs.triggerHandler('toggled', [tab]);

	      tab_link.off('keydown').on('keydown', interpret_keyup_action );
	    },

	    data_attr : function (str) {
	      if (this.namespace.length > 0) {
	        return this.namespace + '-' + str;
	      }

	      return str;
	    },

	    off : function () {},

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.tooltip = {
	    name : 'tooltip',

	    version : '5.5.2',

	    settings : {
	      additional_inheritable_classes : [],
	      tooltip_class : '.tooltip',
	      append_to : 'body',
	      touch_close_text : 'Tap To Close',
	      disable_for_touch : false,
	      hover_delay : 200,
	      show_on : 'all',
	      tip_template : function (selector, content) {
	        return '<span data-selector="' + selector + '" id="' + selector + '" class="'
	          + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
	          + '" role="tooltip">' + content + '<span class="nub"></span></span>';
	      }
	    },

	    cache : {},

	    init : function (scope, method, options) {
	      Foundation.inherit(this, 'random_str');
	      this.bindings(method, options);
	    },

	    should_show : function (target, tip) {
	      var settings = $.extend({}, this.settings, this.data_options(target));

	      if (settings.show_on === 'all') {
	        return true;
	      } else if (this.small() && settings.show_on === 'small') {
	        return true;
	      } else if (this.medium() && settings.show_on === 'medium') {
	        return true;
	      } else if (this.large() && settings.show_on === 'large') {
	        return true;
	      }
	      return false;
	    },

	    medium : function () {
	      return matchMedia(Foundation.media_queries['medium']).matches;
	    },

	    large : function () {
	      return matchMedia(Foundation.media_queries['large']).matches;
	    },

	    events : function (instance) {
	      var self = this,
	          S = self.S;

	      self.create(this.S(instance));

	      function _startShow(elt, $this, immediate) {
	        if (elt.timer) {
	          return;
	        }

	        if (immediate) {
	          elt.timer = null;
	          self.showTip($this);
	        } else {
	          elt.timer = setTimeout(function () {
	            elt.timer = null;
	            self.showTip($this);
	          }.bind(elt), self.settings.hover_delay);
	        }
	      }

	      function _startHide(elt, $this) {
	        if (elt.timer) {
	          clearTimeout(elt.timer);
	          elt.timer = null;
	        }

	        self.hide($this);
	      }

	      $(this.scope)
	        .off('.tooltip')
	        .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip',
	          '[' + this.attr_name() + ']', function (e) {
	          var $this = S(this),
	              settings = $.extend({}, self.settings, self.data_options($this)),
	              is_touch = false;

	          if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && S(e.target).is('a')) {
	            return false;
	          }

	          if (/mouse/i.test(e.type) && self.ie_touch(e)) {
	            return false;
	          }
	          
	          if ($this.hasClass('open')) {
	            if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
	              e.preventDefault();
	            }
	            self.hide($this);
	          } else {
	            if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
	              return;
	            } else if (!settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
	              e.preventDefault();
	              S(settings.tooltip_class + '.open').hide();
	              is_touch = true;
	              // close other open tooltips on touch
	              if ($('.open[' + self.attr_name() + ']').length > 0) {
	               var prevOpen = S($('.open[' + self.attr_name() + ']')[0]);
	               self.hide(prevOpen);
	              }
	            }

	            if (/enter|over/i.test(e.type)) {
	              _startShow(this, $this);

	            } else if (e.type === 'mouseout' || e.type === 'mouseleave') {
	              _startHide(this, $this);
	            } else {
	              _startShow(this, $this, true);
	            }
	          }
	        })
	        .on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + '].open', function (e) {
	          if (/mouse/i.test(e.type) && self.ie_touch(e)) {
	            return false;
	          }

	          if ($(this).data('tooltip-open-event-type') == 'touch' && e.type == 'mouseleave') {
	            return;
	          } else if ($(this).data('tooltip-open-event-type') == 'mouse' && /MSPointerDown|touchstart/i.test(e.type)) {
	            self.convert_to_touch($(this));
	          } else {
	            _startHide(this, $(this));
	          }
	        })
	        .on('DOMNodeRemoved DOMAttrModified', '[' + this.attr_name() + ']:not(a)', function (e) {
	          _startHide(this, S(this));
	        });
	    },

	    ie_touch : function (e) {
	      // How do I distinguish between IE11 and Windows Phone 8?????
	      return false;
	    },

	    showTip : function ($target) {
	      var $tip = this.getTip($target);
	      if (this.should_show($target, $tip)) {
	        return this.show($target);
	      }
	      return;
	    },

	    getTip : function ($target) {
	      var selector = this.selector($target),
	          settings = $.extend({}, this.settings, this.data_options($target)),
	          tip = null;

	      if (selector) {
	        tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class);
	      }

	      return (typeof tip === 'object') ? tip : false;
	    },

	    selector : function ($target) {
	      var dataSelector = $target.attr(this.attr_name()) || $target.attr('data-selector');

	      if (typeof dataSelector != 'string') {
	        dataSelector = this.random_str(6);
	        $target
	          .attr('data-selector', dataSelector)
	          .attr('aria-describedby', dataSelector);
	      }

	      return dataSelector;
	    },

	    create : function ($target) {
	      var self = this,
	          settings = $.extend({}, this.settings, this.data_options($target)),
	          tip_template = this.settings.tip_template;

	      if (typeof settings.tip_template === 'string' && window.hasOwnProperty(settings.tip_template)) {
	        tip_template = window[settings.tip_template];
	      }

	      var $tip = $(tip_template(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
	          classes = this.inheritable_classes($target);

	      $tip.addClass(classes).appendTo(settings.append_to);

	      if (Modernizr.touch) {
	        $tip.append('<span class="tap-to-close">' + settings.touch_close_text + '</span>');
	        $tip.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', function (e) {
	          self.hide($target);
	        });
	      }

	      $target.removeAttr('title').attr('title', '');
	    },

	    reposition : function (target, tip, classes) {
	      var width, nub, nubHeight, nubWidth, column, objPos;

	      tip.css('visibility', 'hidden').show();

	      width = target.data('width');
	      nub = tip.children('.nub');
	      nubHeight = nub.outerHeight();
	      nubWidth = nub.outerHeight();

	      if (this.small()) {
	        tip.css({'width' : '100%'});
	      } else {
	        tip.css({'width' : (width) ? width : 'auto'});
	      }

	      objPos = function (obj, top, right, bottom, left, width) {
	        return obj.css({
	          'top' : (top) ? top : 'auto',
	          'bottom' : (bottom) ? bottom : 'auto',
	          'left' : (left) ? left : 'auto',
	          'right' : (right) ? right : 'auto'
	        }).end();
	      };

	      objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', target.offset().left);

	      if (this.small()) {
	        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', 12.5, $(this.scope).width());
	        tip.addClass('tip-override');
	        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
	      } else {
	        var left = target.offset().left;
	        if (Foundation.rtl) {
	          nub.addClass('rtl');
	          left = target.offset().left + target.outerWidth() - tip.outerWidth();
	        }

	        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', left);
	        // reset nub from small styles, if they've been applied
	        if (nub.attr('style')) {
	          nub.removeAttr('style');
	        }
	        
	        tip.removeClass('tip-override');
	        if (classes && classes.indexOf('tip-top') > -1) {
	          if (Foundation.rtl) {
	            nub.addClass('rtl');
	          }
	          objPos(tip, (target.offset().top - tip.outerHeight()), 'auto', 'auto', left)
	            .removeClass('tip-override');
	        } else if (classes && classes.indexOf('tip-left') > -1) {
	          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left - tip.outerWidth() - nubHeight))
	            .removeClass('tip-override');
	          nub.removeClass('rtl');
	        } else if (classes && classes.indexOf('tip-right') > -1) {
	          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left + target.outerWidth() + nubHeight))
	            .removeClass('tip-override');
	          nub.removeClass('rtl');
	        }
	      }

	      tip.css('visibility', 'visible').hide();
	    },

	    small : function () {
	      return matchMedia(Foundation.media_queries.small).matches &&
	        !matchMedia(Foundation.media_queries.medium).matches;
	    },

	    inheritable_classes : function ($target) {
	      var settings = $.extend({}, this.settings, this.data_options($target)),
	          inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'radius', 'round'].concat(settings.additional_inheritable_classes),
	          classes = $target.attr('class'),
	          filtered = classes ? $.map(classes.split(' '), function (el, i) {
	            if ($.inArray(el, inheritables) !== -1) {
	              return el;
	            }
	          }).join(' ') : '';

	      return $.trim(filtered);
	    },

	    convert_to_touch : function ($target) {
	      var self = this,
	          $tip = self.getTip($target),
	          settings = $.extend({}, self.settings, self.data_options($target));

	      if ($tip.find('.tap-to-close').length === 0) {
	        $tip.append('<span class="tap-to-close">' + settings.touch_close_text + '</span>');
	        $tip.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose', function (e) {
	          self.hide($target);
	        });
	      }

	      $target.data('tooltip-open-event-type', 'touch');
	    },

	    show : function ($target) {
	      var $tip = this.getTip($target);

	      if ($target.data('tooltip-open-event-type') == 'touch') {
	        this.convert_to_touch($target);
	      }

	      this.reposition($target, $tip, $target.attr('class'));
	      $target.addClass('open');
	      $tip.fadeIn(150);
	    },

	    hide : function ($target) {
	      var $tip = this.getTip($target);
	      $tip.fadeOut(150, function () {
	        $tip.find('.tap-to-close').remove();
	        $tip.off('click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose');
	        $target.removeClass('open');
	      });
	    },

	    off : function () {
	      var self = this;
	      this.S(this.scope).off('.fndtn.tooltip');
	      this.S(this.settings.tooltip_class).each(function (i) {
	        $('[' + self.attr_name() + ']').eq(i).attr('title', $(this).text());
	      }).remove();
	    },

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));

	;(function ($, window, document, undefined) {
	  'use strict';

	  Foundation.libs.topbar = {
	    name : 'topbar',

	    version : '5.5.2',

	    settings : {
	      index : 0,
	      start_offset : 0,
	      sticky_class : 'sticky',
	      custom_back_text : true,
	      back_text : 'Back',
	      mobile_show_parent_link : true,
	      is_hover : true,
	      scrolltop : true, // jump to top when sticky nav menu toggle is clicked
	      sticky_on : 'all',
	      dropdown_autoclose: true
	    },

	    init : function (section, method, options) {
	      Foundation.inherit(this, 'add_custom_rule register_media throttle');
	      var self = this;

	      self.register_media('topbar', 'foundation-mq-topbar');

	      this.bindings(method, options);

	      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
	        var topbar = $(this),
	            settings = topbar.data(self.attr_name(true) + '-init'),
	            section = self.S('section, .top-bar-section', this);
	        topbar.data('index', 0);
	        var topbarContainer = topbar.parent();
	        if (topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings) ) {
	          self.settings.sticky_class = settings.sticky_class;
	          self.settings.sticky_topbar = topbar;
	          topbar.data('height', topbarContainer.outerHeight());
	          topbar.data('stickyoffset', topbarContainer.offset().top);
	        } else {
	          topbar.data('height', topbar.outerHeight());
	        }

	        if (!settings.assembled) {
	          self.assemble(topbar);
	        }

	        if (settings.is_hover) {
	          self.S('.has-dropdown', topbar).addClass('not-click');
	        } else {
	          self.S('.has-dropdown', topbar).removeClass('not-click');
	        }

	        // Pad body when sticky (scrolled) or fixed.
	        self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');

	        if (topbarContainer.hasClass('fixed')) {
	          self.S('body').addClass('f-topbar-fixed');
	        }
	      });

	    },

	    is_sticky : function (topbar, topbarContainer, settings) {
	      var sticky     = topbarContainer.hasClass(settings.sticky_class);
	      var smallMatch = matchMedia(Foundation.media_queries.small).matches;
	      var medMatch   = matchMedia(Foundation.media_queries.medium).matches;
	      var lrgMatch   = matchMedia(Foundation.media_queries.large).matches;

	      if (sticky && settings.sticky_on === 'all') {
	        return true;
	      }
	      if (sticky && this.small() && settings.sticky_on.indexOf('small') !== -1) {
	        if (smallMatch && !medMatch && !lrgMatch) { return true; }
	      }
	      if (sticky && this.medium() && settings.sticky_on.indexOf('medium') !== -1) {
	        if (smallMatch && medMatch && !lrgMatch) { return true; }
	      }
	      if (sticky && this.large() && settings.sticky_on.indexOf('large') !== -1) {
	        if (smallMatch && medMatch && lrgMatch) { return true; }
	      }

	       return false;
	    },

	    toggle : function (toggleEl) {
	      var self = this,
	          topbar;

	      if (toggleEl) {
	        topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
	      } else {
	        topbar = self.S('[' + this.attr_name() + ']');
	      }

	      var settings = topbar.data(this.attr_name(true) + '-init');

	      var section = self.S('section, .top-bar-section', topbar);

	      if (self.breakpoint()) {
	        if (!self.rtl) {
	          section.css({left : '0%'});
	          $('>.name', section).css({left : '100%'});
	        } else {
	          section.css({right : '0%'});
	          $('>.name', section).css({right : '100%'});
	        }

	        self.S('li.moved', section).removeClass('moved');
	        topbar.data('index', 0);

	        topbar
	          .toggleClass('expanded')
	          .css('height', '');
	      }

	      if (settings.scrolltop) {
	        if (!topbar.hasClass('expanded')) {
	          if (topbar.hasClass('fixed')) {
	            topbar.parent().addClass('fixed');
	            topbar.removeClass('fixed');
	            self.S('body').addClass('f-topbar-fixed');
	          }
	        } else if (topbar.parent().hasClass('fixed')) {
	          if (settings.scrolltop) {
	            topbar.parent().removeClass('fixed');
	            topbar.addClass('fixed');
	            self.S('body').removeClass('f-topbar-fixed');

	            window.scrollTo(0, 0);
	          } else {
	            topbar.parent().removeClass('expanded');
	          }
	        }
	      } else {
	        if (self.is_sticky(topbar, topbar.parent(), settings)) {
	          topbar.parent().addClass('fixed');
	        }

	        if (topbar.parent().hasClass('fixed')) {
	          if (!topbar.hasClass('expanded')) {
	            topbar.removeClass('fixed');
	            topbar.parent().removeClass('expanded');
	            self.update_sticky_positioning();
	          } else {
	            topbar.addClass('fixed');
	            topbar.parent().addClass('expanded');
	            self.S('body').addClass('f-topbar-fixed');
	          }
	        }
	      }
	    },

	    timer : null,

	    events : function (bar) {
	      var self = this,
	          S = this.S;

	      S(this.scope)
	        .off('.topbar')
	        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
	          e.preventDefault();
	          self.toggle(this);
	        })
	        .on('click.fndtn.topbar contextmenu.fndtn.topbar', '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function (e) {
	            var li = $(this).closest('li'),
	                topbar = li.closest('[' + self.attr_name() + ']'),
	                settings = topbar.data(self.attr_name(true) + '-init');

	            if (settings.dropdown_autoclose && settings.is_hover) {
	              var hoverLi = $(this).closest('.hover');
	              hoverLi.removeClass('hover');
	            }
	            if (self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown')) {
	              self.toggle();
	            }

	        })
	        .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
	          var li = S(this),
	              target = S(e.target),
	              topbar = li.closest('[' + self.attr_name() + ']'),
	              settings = topbar.data(self.attr_name(true) + '-init');

	          if (target.data('revealId')) {
	            self.toggle();
	            return;
	          }

	          if (self.breakpoint()) {
	            return;
	          }

	          if (settings.is_hover && !Modernizr.touch) {
	            return;
	          }

	          e.stopImmediatePropagation();

	          if (li.hasClass('hover')) {
	            li
	              .removeClass('hover')
	              .find('li')
	              .removeClass('hover');

	            li.parents('li.hover')
	              .removeClass('hover');
	          } else {
	            li.addClass('hover');

	            $(li).siblings().removeClass('hover');

	            if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
	              e.preventDefault();
	            }
	          }
	        })
	        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {
	          if (self.breakpoint()) {

	            e.preventDefault();

	            var $this = S(this),
	                topbar = $this.closest('[' + self.attr_name() + ']'),
	                section = topbar.find('section, .top-bar-section'),
	                dropdownHeight = $this.next('.dropdown').outerHeight(),
	                $selectedLi = $this.closest('li');

	            topbar.data('index', topbar.data('index') + 1);
	            $selectedLi.addClass('moved');

	            if (!self.rtl) {
	              section.css({left : -(100 * topbar.data('index')) + '%'});
	              section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
	            } else {
	              section.css({right : -(100 * topbar.data('index')) + '%'});
	              section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
	            }

	            topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
	          }
	        });

	      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
	          self.resize.call(self);
	      }, 50)).trigger('resize.fndtn.topbar').load(function () {
	          // Ensure that the offset is calculated after all of the pages resources have loaded
	          S(this).trigger('resize.fndtn.topbar');
	      });

	      S('body').off('.topbar').on('click.fndtn.topbar', function (e) {
	        var parent = S(e.target).closest('li').closest('li.hover');

	        if (parent.length > 0) {
	          return;
	        }

	        S('[' + self.attr_name() + '] li.hover').removeClass('hover');
	      });

	      // Go up a level on Click
	      S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
	        e.preventDefault();

	        var $this = S(this),
	            topbar = $this.closest('[' + self.attr_name() + ']'),
	            section = topbar.find('section, .top-bar-section'),
	            settings = topbar.data(self.attr_name(true) + '-init'),
	            $movedLi = $this.closest('li.moved'),
	            $previousLevelUl = $movedLi.parent();

	        topbar.data('index', topbar.data('index') - 1);

	        if (!self.rtl) {
	          section.css({left : -(100 * topbar.data('index')) + '%'});
	          section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
	        } else {
	          section.css({right : -(100 * topbar.data('index')) + '%'});
	          section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
	        }

	        if (topbar.data('index') === 0) {
	          topbar.css('height', '');
	        } else {
	          topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
	        }

	        setTimeout(function () {
	          $movedLi.removeClass('moved');
	        }, 300);
	      });

	      // Show dropdown menus when their items are focused
	      S(this.scope).find('.dropdown a')
	        .focus(function () {
	          $(this).parents('.has-dropdown').addClass('hover');
	        })
	        .blur(function () {
	          $(this).parents('.has-dropdown').removeClass('hover');
	        });
	    },

	    resize : function () {
	      var self = this;
	      self.S('[' + this.attr_name() + ']').each(function () {
	        var topbar = self.S(this),
	            settings = topbar.data(self.attr_name(true) + '-init');

	        var stickyContainer = topbar.parent('.' + self.settings.sticky_class);
	        var stickyOffset;

	        if (!self.breakpoint()) {
	          var doToggle = topbar.hasClass('expanded');
	          topbar
	            .css('height', '')
	            .removeClass('expanded')
	            .find('li')
	            .removeClass('hover');

	            if (doToggle) {
	              self.toggle(topbar);
	            }
	        }

	        if (self.is_sticky(topbar, stickyContainer, settings)) {
	          if (stickyContainer.hasClass('fixed')) {
	            // Remove the fixed to allow for correct calculation of the offset.
	            stickyContainer.removeClass('fixed');

	            stickyOffset = stickyContainer.offset().top;
	            if (self.S(document.body).hasClass('f-topbar-fixed')) {
	              stickyOffset -= topbar.data('height');
	            }

	            topbar.data('stickyoffset', stickyOffset);
	            stickyContainer.addClass('fixed');
	          } else {
	            stickyOffset = stickyContainer.offset().top;
	            topbar.data('stickyoffset', stickyOffset);
	          }
	        }

	      });
	    },

	    breakpoint : function () {
	      return !matchMedia(Foundation.media_queries['topbar']).matches;
	    },

	    small : function () {
	      return matchMedia(Foundation.media_queries['small']).matches;
	    },

	    medium : function () {
	      return matchMedia(Foundation.media_queries['medium']).matches;
	    },

	    large : function () {
	      return matchMedia(Foundation.media_queries['large']).matches;
	    },

	    assemble : function (topbar) {
	      var self = this,
	          settings = topbar.data(this.attr_name(true) + '-init'),
	          section = self.S('section, .top-bar-section', topbar);

	      // Pull element out of the DOM for manipulation
	      section.detach();

	      self.S('.has-dropdown>a', section).each(function () {
	        var $link = self.S(this),
	            $dropdown = $link.siblings('.dropdown'),
	            url = $link.attr('href'),
	            $titleLi;

	        if (!$dropdown.find('.title.back').length) {

	          if (settings.mobile_show_parent_link == true && url) {
	            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="' + url + '">' + $link.html() +'</a></li>');
	          } else {
	            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');
	          }

	          // Copy link to subnav
	          if (settings.custom_back_text == true) {
	            $('h5>a', $titleLi).html(settings.back_text);
	          } else {
	            $('h5>a', $titleLi).html('&laquo; ' + $link.html());
	          }
	          $dropdown.prepend($titleLi);
	        }
	      });

	      // Put element back in the DOM
	      section.appendTo(topbar);

	      // check for sticky
	      this.sticky();

	      this.assembled(topbar);
	    },

	    assembled : function (topbar) {
	      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {assembled : true}));
	    },

	    height : function (ul) {
	      var total = 0,
	          self = this;

	      $('> li', ul).each(function () {
	        total += self.S(this).outerHeight(true);
	      });

	      return total;
	    },

	    sticky : function () {
	      var self = this;

	      this.S(window).on('scroll', function () {
	        self.update_sticky_positioning();
	      });
	    },

	    update_sticky_positioning : function () {
	      var klass = '.' + this.settings.sticky_class,
	          $window = this.S(window),
	          self = this;

	      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(), this.settings)) {
	        var distance = this.settings.sticky_topbar.data('stickyoffset') + this.settings.start_offset;
	        if (!self.S(klass).hasClass('expanded')) {
	          if ($window.scrollTop() > (distance)) {
	            if (!self.S(klass).hasClass('fixed')) {
	              self.S(klass).addClass('fixed');
	              self.S('body').addClass('f-topbar-fixed');
	            }
	          } else if ($window.scrollTop() <= distance) {
	            if (self.S(klass).hasClass('fixed')) {
	              self.S(klass).removeClass('fixed');
	              self.S('body').removeClass('f-topbar-fixed');
	            }
	          }
	        }
	      }
	    },

	    off : function () {
	      this.S(this.scope).off('.fndtn.topbar');
	      this.S(window).off('.fndtn.topbar');
	    },

	    reflow : function () {}
	  };
	}(jQuery, window, window.document));


	/*** EXPORTS FROM exports-loader ***/
	module.exports = window.Foundation
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*! noUiSlider - 7.0.10 - 2014-12-27 14:50:46 */

	(function(){

		'use strict';

	var
	/** @const */ FormatOptions = [
		'decimals',
		'thousand',
		'mark',
		'prefix',
		'postfix',
		'encoder',
		'decoder',
		'negativeBefore',
		'negative',
		'edit',
		'undo'
	];

	// General

		// Reverse a string
		function strReverse ( a ) {
			return a.split('').reverse().join('');
		}

		// Check if a string starts with a specified prefix.
		function strStartsWith ( input, match ) {
			return input.substring(0, match.length) === match;
		}

		// Check is a string ends in a specified postfix.
		function strEndsWith ( input, match ) {
			return input.slice(-1 * match.length) === match;
		}

		// Throw an error if formatting options are incompatible.
		function throwEqualError( F, a, b ) {
			if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
				throw new Error(a);
			}
		}

		// Check if a number is finite and not NaN
		function isValidNumber ( input ) {
			return typeof input === 'number' && isFinite( input );
		}

		// Provide rounding-accurate toFixed method.
		function toFixed ( value, decimals ) {
			var scale = Math.pow(10, decimals);
			return ( Math.round(value * scale) / scale).toFixed( decimals );
		}


	// Formatting

		// Accept a number as input, output formatted string.
		function formatTo ( decimals, thousand, mark, prefix, postfix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

			var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';

			// Apply user encoder to the input.
			// Expected outcome: number.
			if ( encoder ) {
				input = encoder(input);
			}

			// Stop if no valid number was provided, the number is infinite or NaN.
			if ( !isValidNumber(input) ) {
				return false;
			}

			// Rounding away decimals might cause a value of -0
			// when using very small ranges. Remove those cases.
			if ( decimals !== false && parseFloat(input.toFixed(decimals)) === 0 ) {
				input = 0;
			}

			// Formatting is done on absolute numbers,
			// decorated by an optional negative symbol.
			if ( input < 0 ) {
				inputIsNegative = true;
				input = Math.abs(input);
			}

			// Reduce the number of decimals to the specified option.
			if ( decimals !== false ) {
				input = toFixed( input, decimals );
			}

			// Transform the number into a string, so it can be split.
			input = input.toString();

			// Break the number on the decimal separator.
			if ( input.indexOf('.') !== -1 ) {
				inputPieces = input.split('.');

				inputBase = inputPieces[0];

				if ( mark ) {
					inputDecimals = mark + inputPieces[1];
				}

			} else {

			// If it isn't split, the entire number will do.
				inputBase = input;
			}

			// Group numbers in sets of three.
			if ( thousand ) {
				inputBase = strReverse(inputBase).match(/.{1,3}/g);
				inputBase = strReverse(inputBase.join( strReverse( thousand ) ));
			}

			// If the number is negative, prefix with negation symbol.
			if ( inputIsNegative && negativeBefore ) {
				output += negativeBefore;
			}

			// Prefix the number
			if ( prefix ) {
				output += prefix;
			}

			// Normal negative option comes after the prefix. Defaults to '-'.
			if ( inputIsNegative && negative ) {
				output += negative;
			}

			// Append the actual number.
			output += inputBase;
			output += inputDecimals;

			// Apply the postfix.
			if ( postfix ) {
				output += postfix;
			}

			// Run the output through a user-specified post-formatter.
			if ( edit ) {
				output = edit ( output, originalInput );
			}

			// All done.
			return output;
		}

		// Accept a sting as input, output decoded number.
		function formatFrom ( decimals, thousand, mark, prefix, postfix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

			var originalInput = input, inputIsNegative, output = '';

			// User defined pre-decoder. Result must be a non empty string.
			if ( undo ) {
				input = undo(input);
			}

			// Test the input. Can't be empty.
			if ( !input || typeof input !== 'string' ) {
				return false;
			}

			// If the string starts with the negativeBefore value: remove it.
			// Remember is was there, the number is negative.
			if ( negativeBefore && strStartsWith(input, negativeBefore) ) {
				input = input.replace(negativeBefore, '');
				inputIsNegative = true;
			}

			// Repeat the same procedure for the prefix.
			if ( prefix && strStartsWith(input, prefix) ) {
				input = input.replace(prefix, '');
			}

			// And again for negative.
			if ( negative && strStartsWith(input, negative) ) {
				input = input.replace(negative, '');
				inputIsNegative = true;
			}

			// Remove the postfix.
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
			if ( postfix && strEndsWith(input, postfix) ) {
				input = input.slice(0, -1 * postfix.length);
			}

			// Remove the thousand grouping.
			if ( thousand ) {
				input = input.split(thousand).join('');
			}

			// Set the decimal separator back to period.
			if ( mark ) {
				input = input.replace(mark, '.');
			}

			// Prepend the negative symbol.
			if ( inputIsNegative ) {
				output += '-';
			}

			// Add the number
			output += input;

			// Trim all non-numeric characters (allow '.' and '-');
			output = output.replace(/[^0-9\.\-.]/g, '');

			// The value contains no parse-able number.
			if ( output === '' ) {
				return false;
			}

			// Covert to number.
			output = Number(output);

			// Run the user-specified post-decoder.
			if ( decoder ) {
				output = decoder(output);
			}

			// Check is the output is valid, otherwise: return false.
			if ( !isValidNumber(output) ) {
				return false;
			}

			return output;
		}


	// Framework

		// Validate formatting options
		function validate ( inputOptions ) {

			var i, optionName, optionValue,
				filteredOptions = {};

			for ( i = 0; i < FormatOptions.length; i+=1 ) {

				optionName = FormatOptions[i];
				optionValue = inputOptions[optionName];

				if ( optionValue === undefined ) {

					// Only default if negativeBefore isn't set.
					if ( optionName === 'negative' && !filteredOptions.negativeBefore ) {
						filteredOptions[optionName] = '-';
					// Don't set a default for mark when 'thousand' is set.
					} else if ( optionName === 'mark' && filteredOptions.thousand !== '.' ) {
						filteredOptions[optionName] = '.';
					} else {
						filteredOptions[optionName] = false;
					}

				// Floating points in JS are stable up to 7 decimals.
				} else if ( optionName === 'decimals' ) {
					if ( optionValue >= 0 && optionValue < 8 ) {
						filteredOptions[optionName] = optionValue;
					} else {
						throw new Error(optionName);
					}

				// These options, when provided, must be functions.
				} else if ( optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo' ) {
					if ( typeof optionValue === 'function' ) {
						filteredOptions[optionName] = optionValue;
					} else {
						throw new Error(optionName);
					}

				// Other options are strings.
				} else {

					if ( typeof optionValue === 'string' ) {
						filteredOptions[optionName] = optionValue;
					} else {
						throw new Error(optionName);
					}
				}
			}

			// Some values can't be extracted from a
			// string if certain combinations are present.
			throwEqualError(filteredOptions, 'mark', 'thousand');
			throwEqualError(filteredOptions, 'prefix', 'negative');
			throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

			return filteredOptions;
		}

		// Pass all options as function arguments
		function passAll ( options, method, input ) {
			var i, args = [];

			// Add all options in order of FormatOptions
			for ( i = 0; i < FormatOptions.length; i+=1 ) {
				args.push(options[FormatOptions[i]]);
			}

			// Append the input, then call the method, presenting all
			// options as arguments.
			args.push(input);
			return method.apply('', args);
		}

		/** @constructor */
		function wNumb ( options ) {

			if ( !(this instanceof wNumb) ) {
				return new wNumb ( options );
			}

			if ( typeof options !== "object" ) {
				return;
			}

			options = validate(options);

			// Call 'formatTo' with proper arguments.
			this.to = function ( input ) {
				return passAll(options, formatTo, input);
			};

			// Call 'formatFrom' with proper arguments.
			this.from = function ( input ) {
				return passAll(options, formatFrom, input);
			};
		}

		/** @export */
		window.wNumb = wNumb;

	}());

	/*jslint browser: true */
	/*jslint white: true */

	(function( $ ){

		'use strict';

	// Helpers

		// Test in an object is an instance of jQuery or Zepto.
		function isInstance ( a ) {
			return a instanceof $ || ( $.zepto && $.zepto.isZ(a) );
		}


	// Link types

		function fromPrefix ( target, method ) {

			// If target is a string, a new hidden input will be created.
			if ( typeof target === 'string' && target.indexOf('-inline-') === 0 ) {

				// By default, use the 'html' method.
				this.method = method || 'html';

				// Use jQuery to create the element
				this.target = this.el = $( target.replace('-inline-', '') || '<div/>' );

				return true;
			}
		}

		function fromString ( target ) {

			// If the string doesn't begin with '-', which is reserved, add a new hidden input.
			if ( typeof target === 'string' && target.indexOf('-') !== 0 ) {

				this.method = 'val';

				var element = document.createElement('input');
					element.name = target;
					element.type = 'hidden';
				this.target = this.el = $(element);

				return true;
			}
		}

		function fromFunction ( target ) {

			// The target can also be a function, which will be called.
			if ( typeof target === 'function' ) {
				this.target = false;
				this.method = target;

				return true;
			}
		}

		function fromInstance ( target, method ) {

			if ( isInstance( target ) && !method ) {

			// If a jQuery/Zepto input element is provided, but no method is set,
			// the element can assume it needs to respond to 'change'...
				if ( target.is('input, select, textarea') ) {

					// Default to .val if this is an input element.
					this.method = 'val';

					// Fire the API changehandler when the target changes.
					this.target = target.on('change.liblink', this.changeHandler);

				} else {

					this.target = target;

					// If no method is set, and we are not auto-binding an input, default to 'html'.
					this.method = 'html';
				}

				return true;
			}
		}

		function fromInstanceMethod ( target, method ) {

			// The method must exist on the element.
			if ( isInstance( target ) &&
				(typeof method === 'function' ||
					(typeof method === 'string' && target[method]))
			) {
				this.method = method;
				this.target = target;

				return true;
			}
		}

	var
	/** @const */
		creationFunctions = [fromPrefix, fromString, fromFunction, fromInstance, fromInstanceMethod];


	// Link Instance

	/** @constructor */
		function Link ( target, method, format ) {

			var that = this, valid = false;

			// Forward calls within scope.
			this.changeHandler = function ( changeEvent ) {
				var decodedValue = that.formatInstance.from( $(this).val() );

				// If the value is invalid, stop this event, as well as it's propagation.
				if ( decodedValue === false || isNaN(decodedValue) ) {

					// Reset the value.
					$(this).val(that.lastSetValue);
					return false;
				}

				that.changeHandlerMethod.call( '', changeEvent, decodedValue );
			};

			// See if this Link needs individual targets based on its usage.
			// If so, return the element that needs to be copied by the
			// implementing interface.
			// Default the element to false.
			this.el = false;

			// Store the formatter, or use the default.
			this.formatInstance = format;

			// Try all Link types.
			/*jslint unparam: true*/
			$.each(creationFunctions, function(i, fn){
				valid = fn.call(that, target, method);
				return !valid;
			});
			/*jslint unparam: false*/

			// Nothing matched, throw error.
			if ( !valid ) {
				throw new RangeError("(Link) Invalid Link.");
			}
		}

		// Provides external items with the object value.
		Link.prototype.set = function ( value ) {

			// Ignore the value, so only the passed-on arguments remain.
			var args = Array.prototype.slice.call( arguments ),
				additionalArgs = args.slice(1);

			// Store some values. The actual, numerical value,
			// the formatted value and the parameters for use in 'resetValue'.
			// Slice additionalArgs to break the relation.
			this.lastSetValue = this.formatInstance.to( value );

			// Prepend the value to the function arguments.
			additionalArgs.unshift(
				this.lastSetValue
			);

			// When target is undefined, the target was a function.
			// In that case, provided the object as the calling scope.
			// Branch between writing to a function or an object.
			( typeof this.method === 'function' ?
				this.method :
				this.target[ this.method ] ).apply( this.target, additionalArgs );
		};


	// Developer API

	/** @constructor */
		function LinkAPI ( origin ) {
			this.items = [];
			this.elements = [];
			this.origin = origin;
		}

		LinkAPI.prototype.push = function( item, element ) {
			this.items.push(item);

			// Prevent 'false' elements
			if ( element ) {
				this.elements.push(element);
			}
		};

		LinkAPI.prototype.reconfirm = function ( flag ) {
			var i;
			for ( i = 0; i < this.elements.length; i += 1 ) {
				this.origin.LinkConfirm(flag, this.elements[i]);
			}
		};

		LinkAPI.prototype.remove = function ( flag ) {
			var i;
			for ( i = 0; i < this.items.length; i += 1 ) {
				this.items[i].target.off('.liblink');
			}
			for ( i = 0; i < this.elements.length; i += 1 ) {
				this.elements[i].remove();
			}
		};

		LinkAPI.prototype.change = function ( value ) {

			if ( this.origin.LinkIsEmitting ) {
				return false;
			}

			this.origin.LinkIsEmitting = true;

			var args = Array.prototype.slice.call( arguments, 1 ), i;
			args.unshift( value );

			// Write values to serialization Links.
			// Convert the value to the correct relative representation.
			for ( i = 0; i < this.items.length; i += 1 ) {
				this.items[i].set.apply(this.items[i], args);
			}

			this.origin.LinkIsEmitting = false;
		};


	// jQuery plugin

		function binder ( flag, target, method, format ){

			if ( flag === 0 ) {
				flag = this.LinkDefaultFlag;
			}

			// Create a list of API's (if it didn't exist yet);
			if ( !this.linkAPI ) {
				this.linkAPI = {};
			}

			// Add an API point.
			if ( !this.linkAPI[flag] ) {
				this.linkAPI[flag] = new LinkAPI(this);
			}

			var linkInstance = new Link ( target, method, format || this.LinkDefaultFormatter );

			// Default the calling scope to the linked object.
			if ( !linkInstance.target ) {
				linkInstance.target = $(this);
			}

			// If the Link requires creation of a new element,
			// Pass the element and request confirmation to get the changehandler.
			// Set the method to be called when a Link changes.
			linkInstance.changeHandlerMethod = this.LinkConfirm( flag, linkInstance.el );

			// Store the linkInstance in the flagged list.
			this.linkAPI[flag].push( linkInstance, linkInstance.el );

			// Now that Link have been connected, request an update.
			this.LinkUpdate( flag );
		}

		/** @export */
		$.fn.Link = function( flag ){

			var that = this;

			// Delete all linkAPI
			if ( flag === false ) {

				return that.each(function(){

					// .Link(false) can be called on elements without Links.
					// When that happens, the objects can't be looped.
					if ( !this.linkAPI ) {
						return;
					}

					$.map(this.linkAPI, function(api){
						api.remove();
					});

					delete this.linkAPI;
				});
			}

			if ( flag === undefined ) {

				flag = 0;

			} else if ( typeof flag !== 'string') {

				throw new Error("Flag must be string.");
			}

			return {
				to: function( a, b, c ){
					return that.each(function(){
						binder.call(this, flag, a, b, c);
					});
				}
			};
		};

	}( __webpack_provided_window_dot_jQuery || window.Zepto ));

	/*jslint browser: true */
	/*jslint white: true */

	(function( $ ){

		'use strict';


		// Removes duplicates from an array.
		function unique(array) {
			return $.grep(array, function(el, index) {
				return index === $.inArray(el, array);
			});
		}

		// Round a value to the closest 'to'.
		function closest ( value, to ) {
			return Math.round(value / to) * to;
		}

		// Checks whether a value is numerical.
		function isNumeric ( a ) {
			return typeof a === 'number' && !isNaN( a ) && isFinite( a );
		}

		// Rounds a number to 7 supported decimals.
		function accurateNumber( number ) {
			var p = Math.pow(10, 7);
			return Number((Math.round(number*p)/p).toFixed(7));
		}

		// Sets a class and removes it after [duration] ms.
		function addClassFor ( element, className, duration ) {
			element.addClass(className);
			setTimeout(function(){
				element.removeClass(className);
			}, duration);
		}

		// Limits a value to 0 - 100
		function limit ( a ) {
			return Math.max(Math.min(a, 100), 0);
		}

		// Wraps a variable as an array, if it isn't one yet.
		function asArray ( a ) {
			return $.isArray(a) ? a : [a];
		}

		// Counts decimals
		function countDecimals ( numStr ) {
			var pieces = numStr.split(".");
			return pieces.length > 1 ? pieces[1].length : 0;
		}


		var
		// Cache the document selector;
		/** @const */
		doc = $(document),
		// Make a backup of the original jQuery/Zepto .val() method.
		/** @const */
		$val = $.fn.val,
		// Namespace for binding and unbinding slider events;
		/** @const */
		namespace = '.nui',
		// Determine the events to bind. IE11 implements pointerEvents without
		// a prefix, which breaks compatibility with the IE10 implementation.
		/** @const */
		actions = window.navigator.pointerEnabled ? {
			start: 'pointerdown',
			move: 'pointermove',
			end: 'pointerup'
		} : window.navigator.msPointerEnabled ? {
			start: 'MSPointerDown',
			move: 'MSPointerMove',
			end: 'MSPointerUp'
		} : {
			start: 'mousedown touchstart',
			move: 'mousemove touchmove',
			end: 'mouseup touchend'
		},
		// Re-usable list of classes;
		/** @const */
		Classes = [
	/*  0 */  'noUi-target'
	/*  1 */ ,'noUi-base'
	/*  2 */ ,'noUi-origin'
	/*  3 */ ,'noUi-handle'
	/*  4 */ ,'noUi-horizontal'
	/*  5 */ ,'noUi-vertical'
	/*  6 */ ,'noUi-background'
	/*  7 */ ,'noUi-connect'
	/*  8 */ ,'noUi-ltr'
	/*  9 */ ,'noUi-rtl'
	/* 10 */ ,'noUi-dragable'
	/* 11 */ ,''
	/* 12 */ ,'noUi-state-drag'
	/* 13 */ ,''
	/* 14 */ ,'noUi-state-tap'
	/* 15 */ ,'noUi-active'
	/* 16 */ ,''
	/* 17 */ ,'noUi-stacking'
		];


	// Value calculation

		// Determine the size of a sub-range in relation to a full range.
		function subRangeRatio ( pa, pb ) {
			return (100 / (pb - pa));
		}

		// (percentage) How many percent is this value of this range?
		function fromPercentage ( range, value ) {
			return (value * 100) / ( range[1] - range[0] );
		}

		// (percentage) Where is this value on this range?
		function toPercentage ( range, value ) {
			return fromPercentage( range, range[0] < 0 ?
				value + Math.abs(range[0]) :
					value - range[0] );
		}

		// (value) How much is this percentage on this range?
		function isPercentage ( range, value ) {
			return ((value * ( range[1] - range[0] )) / 100) + range[0];
		}


	// Range conversion

		function getJ ( value, arr ) {

			var j = 1;

			while ( value >= arr[j] ){
				j += 1;
			}

			return j;
		}

		// (percentage) Input a value, find where, on a scale of 0-100, it applies.
		function toStepping ( xVal, xPct, value ) {

			if ( value >= xVal.slice(-1)[0] ){
				return 100;
			}

			var j = getJ( value, xVal ), va, vb, pa, pb;

			va = xVal[j-1];
			vb = xVal[j];
			pa = xPct[j-1];
			pb = xPct[j];

			return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
		}

		// (value) Input a percentage, find where it is on the specified range.
		function fromStepping ( xVal, xPct, value ) {

			// There is no range group that fits 100
			if ( value >= 100 ){
				return xVal.slice(-1)[0];
			}

			var j = getJ( value, xPct ), va, vb, pa, pb;

			va = xVal[j-1];
			vb = xVal[j];
			pa = xPct[j-1];
			pb = xPct[j];

			return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
		}

		// (percentage) Get the step that applies at a certain value.
		function getStep ( xPct, xSteps, snap, value ) {

			if ( value === 100 ) {
				return value;
			}

			var j = getJ( value, xPct ), a, b;

			// If 'snap' is set, steps are used as fixed points on the slider.
			if ( snap ) {

				a = xPct[j-1];
				b = xPct[j];

				// Find the closest position, a or b.
				if ((value - a) > ((b-a)/2)){
					return b;
				}

				return a;
			}

			if ( !xSteps[j-1] ){
				return value;
			}

			return xPct[j-1] + closest(
				value - xPct[j-1],
				xSteps[j-1]
			);
		}


	// Entry parsing

		function handleEntryPoint ( index, value, that ) {

			var percentage;

			// Wrap numerical input in an array.
			if ( typeof value === "number" ) {
				value = [value];
			}

			// Reject any invalid input, by testing whether value is an array.
			if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
				throw new Error("noUiSlider: 'range' contains invalid value.");
			}

			// Covert min/max syntax to 0 and 100.
			if ( index === 'min' ) {
				percentage = 0;
			} else if ( index === 'max' ) {
				percentage = 100;
			} else {
				percentage = parseFloat( index );
			}

			// Check for correct input.
			if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
				throw new Error("noUiSlider: 'range' value isn't numeric.");
			}

			// Store values.
			that.xPct.push( percentage );
			that.xVal.push( value[0] );

			// NaN will evaluate to false too, but to keep
			// logging clear, set step explicitly. Make sure
			// not to override the 'step' setting with false.
			if ( !percentage ) {
				if ( !isNaN( value[1] ) ) {
					that.xSteps[0] = value[1];
				}
			} else {
				that.xSteps.push( isNaN(value[1]) ? false : value[1] );
			}
		}

		function handleStepPoint ( i, n, that ) {

			// Ignore 'false' stepping.
			if ( !n ) {
				return true;
			}

			// Factor to range ratio
			that.xSteps[i] = fromPercentage([
				 that.xVal[i]
				,that.xVal[i+1]
			], n) / subRangeRatio (
				that.xPct[i],
				that.xPct[i+1] );
		}


	// Interface

		// The interface to Spectrum handles all direction-based
		// conversions, so the above values are unaware.

		function Spectrum ( entry, snap, direction, singleStep ) {

			this.xPct = [];
			this.xVal = [];
			this.xSteps = [ singleStep || false ];
			this.xNumSteps = [ false ];

			this.snap = snap;
			this.direction = direction;

			var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */ ];

			// Map the object keys to an array.
			for ( index in entry ) {
				if ( entry.hasOwnProperty(index) ) {
					ordered.push([entry[index], index]);
				}
			}

			// Sort all entries by value (numeric sort).
			ordered.sort(function(a, b) { return a[0] - b[0]; });

			// Convert all entries to subranges.
			for ( index = 0; index < ordered.length; index++ ) {
				handleEntryPoint(ordered[index][1], ordered[index][0], this);
			}

			// Store the actual step values.
			// xSteps is sorted in the same order as xPct and xVal.
			this.xNumSteps = this.xSteps.slice(0);

			// Convert all numeric steps to the percentage of the subrange they represent.
			for ( index = 0; index < this.xNumSteps.length; index++ ) {
				handleStepPoint(index, this.xNumSteps[index], this);
			}
		}

		Spectrum.prototype.getMargin = function ( value ) {
			return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
		};

		Spectrum.prototype.toStepping = function ( value ) {

			value = toStepping( this.xVal, this.xPct, value );

			// Invert the value if this is a right-to-left slider.
			if ( this.direction ) {
				value = 100 - value;
			}

			return value;
		};

		Spectrum.prototype.fromStepping = function ( value ) {

			// Invert the value if this is a right-to-left slider.
			if ( this.direction ) {
				value = 100 - value;
			}

			return accurateNumber(fromStepping( this.xVal, this.xPct, value ));
		};

		Spectrum.prototype.getStep = function ( value ) {

			// Find the proper step for rtl sliders by search in inverse direction.
			// Fixes issue #262.
			if ( this.direction ) {
				value = 100 - value;
			}

			value = getStep(this.xPct, this.xSteps, this.snap, value );

			if ( this.direction ) {
				value = 100 - value;
			}

			return value;
		};

		Spectrum.prototype.getApplicableStep = function ( value ) {

			// If the value is 100%, return the negative step twice.
			var j = getJ(value, this.xPct), offset = value === 100 ? 2 : 1;
			return [this.xNumSteps[j-2], this.xVal[j-offset], this.xNumSteps[j-offset]];
		};

		// Outside testing
		Spectrum.prototype.convert = function ( value ) {
			return this.getStep(this.toStepping(value));
		};

	/*	Every input option is tested and parsed. This'll prevent
		endless validation in internal methods. These tests are
		structured with an item for every option available. An
		option can be marked as required by setting the 'r' flag.
		The testing function is provided with three arguments:
			- The provided value for the option;
			- A reference to the options object;
			- The name for the option;

		The testing function returns false when an error is detected,
		or true when everything is OK. It can also modify the option
		object, to make sure all values can be correctly looped elsewhere. */

		/** @const */
		var defaultFormatter = { 'to': function( value ){
			return value.toFixed(2);
		}, 'from': Number };

		function testStep ( parsed, entry ) {

			if ( !isNumeric( entry ) ) {
				throw new Error("noUiSlider: 'step' is not numeric.");
			}

			// The step option can still be used to set stepping
			// for linear sliders. Overwritten if set in 'range'.
			parsed.singleStep = entry;
		}

		function testRange ( parsed, entry ) {

			// Filter incorrect input.
			if ( typeof entry !== 'object' || $.isArray(entry) ) {
				throw new Error("noUiSlider: 'range' is not an object.");
			}

			// Catch missing start or end.
			if ( entry.min === undefined || entry.max === undefined ) {
				throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
			}

			parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
		}

		function testStart ( parsed, entry ) {

			entry = asArray(entry);

			// Validate input. Values aren't tested, as the public .val method
			// will always provide a valid location.
			if ( !$.isArray( entry ) || !entry.length || entry.length > 2 ) {
				throw new Error("noUiSlider: 'start' option is incorrect.");
			}

			// Store the number of handles.
			parsed.handles = entry.length;

			// When the slider is initialized, the .val method will
			// be called with the start options.
			parsed.start = entry;
		}

		function testSnap ( parsed, entry ) {

			// Enforce 100% stepping within subranges.
			parsed.snap = entry;

			if ( typeof entry !== 'boolean' ){
				throw new Error("noUiSlider: 'snap' option must be a boolean.");
			}
		}

		function testAnimate ( parsed, entry ) {

			// Enforce 100% stepping within subranges.
			parsed.animate = entry;

			if ( typeof entry !== 'boolean' ){
				throw new Error("noUiSlider: 'animate' option must be a boolean.");
			}
		}

		function testConnect ( parsed, entry ) {

			if ( entry === 'lower' && parsed.handles === 1 ) {
				parsed.connect = 1;
			} else if ( entry === 'upper' && parsed.handles === 1 ) {
				parsed.connect = 2;
			} else if ( entry === true && parsed.handles === 2 ) {
				parsed.connect = 3;
			} else if ( entry === false ) {
				parsed.connect = 0;
			} else {
				throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
			}
		}

		function testOrientation ( parsed, entry ) {

			// Set orientation to an a numerical value for easy
			// array selection.
			switch ( entry ){
			  case 'horizontal':
				parsed.ort = 0;
				break;
			  case 'vertical':
				parsed.ort = 1;
				break;
			  default:
				throw new Error("noUiSlider: 'orientation' option is invalid.");
			}
		}

		function testMargin ( parsed, entry ) {

			if ( !isNumeric(entry) ){
				throw new Error("noUiSlider: 'margin' option must be numeric.");
			}

			parsed.margin = parsed.spectrum.getMargin(entry);

			if ( !parsed.margin ) {
				throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
			}
		}

		function testLimit ( parsed, entry ) {

			if ( !isNumeric(entry) ){
				throw new Error("noUiSlider: 'limit' option must be numeric.");
			}

			parsed.limit = parsed.spectrum.getMargin(entry);

			if ( !parsed.limit ) {
				throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
			}
		}

		function testDirection ( parsed, entry ) {

			// Set direction as a numerical value for easy parsing.
			// Invert connection for RTL sliders, so that the proper
			// handles get the connect/background classes.
			switch ( entry ) {
			  case 'ltr':
				parsed.dir = 0;
				break;
			  case 'rtl':
				parsed.dir = 1;
				parsed.connect = [0,2,1,3][parsed.connect];
				break;
			  default:
				throw new Error("noUiSlider: 'direction' option was not recognized.");
			}
		}

		function testBehaviour ( parsed, entry ) {

			// Make sure the input is a string.
			if ( typeof entry !== 'string' ) {
				throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
			}

			// Check if the string contains any keywords.
			// None are required.
			var tap = entry.indexOf('tap') >= 0,
				drag = entry.indexOf('drag') >= 0,
				fixed = entry.indexOf('fixed') >= 0,
				snap = entry.indexOf('snap') >= 0;

			parsed.events = {
				tap: tap || snap,
				drag: drag,
				fixed: fixed,
				snap: snap
			};
		}

		function testFormat ( parsed, entry ) {

			parsed.format = entry;

			// Any object with a to and from method is supported.
			if ( typeof entry.to === 'function' && typeof entry.from === 'function' ) {
				return true;
			}

			throw new Error( "noUiSlider: 'format' requires 'to' and 'from' methods.");
		}

		// Test all developer settings and parse to assumption-safe values.
		function testOptions ( options ) {

			var parsed = {
				margin: 0,
				limit: 0,
				animate: true,
				format: defaultFormatter
			}, tests;

			// Tests are executed in the order they are presented here.
			tests = {
				'step': { r: false, t: testStep },
				'start': { r: true, t: testStart },
				'connect': { r: true, t: testConnect },
				'direction': { r: true, t: testDirection },
				'snap': { r: false, t: testSnap },
				'animate': { r: false, t: testAnimate },
				'range': { r: true, t: testRange },
				'orientation': { r: false, t: testOrientation },
				'margin': { r: false, t: testMargin },
				'limit': { r: false, t: testLimit },
				'behaviour': { r: true, t: testBehaviour },
				'format': { r: false, t: testFormat }
			};

			// Set defaults where applicable.
			options = $.extend({
				'connect': false,
				'direction': 'ltr',
				'behaviour': 'tap',
				'orientation': 'horizontal'
			}, options);

			// Run all options through a testing mechanism to ensure correct
			// input. It should be noted that options might get modified to
			// be handled properly. E.g. wrapping integers in arrays.
			$.each( tests, function( name, test ){

				// If the option isn't set, but it is required, throw an error.
				if ( options[name] === undefined ) {

					if ( test.r ) {
						throw new Error("noUiSlider: '" + name + "' is required.");
					}

					return true;
				}

				test.t( parsed, options[name] );
			});

			// Pre-define the styles.
			parsed.style = parsed.ort ? 'top' : 'left';

			return parsed;
		}

	// Class handling

		// Delimit proposed values for handle positions.
		function getPositions ( a, b, delimit ) {

			// Add movement to current position.
			var c = a + b[0], d = a + b[1];

			// Only alter the other position on drag,
			// not on standard sliding.
			if ( delimit ) {
				if ( c < 0 ) {
					d += Math.abs(c);
				}
				if ( d > 100 ) {
					c -= ( d - 100 );
				}

				// Limit values to 0 and 100.
				return [limit(c), limit(d)];
			}

			return [c,d];
		}


	// Event handling

		// Provide a clean event with standardized offset values.
		function fixEvent ( e ) {

			// Prevent scrolling and panning on touch events, while
			// attempting to slide. The tap event also depends on this.
			e.preventDefault();

			// Filter the event to register the type, which can be
			// touch, mouse or pointer. Offset changes need to be
			// made on an event specific basis.
			var  touch = e.type.indexOf('touch') === 0
				,mouse = e.type.indexOf('mouse') === 0
				,pointer = e.type.indexOf('pointer') === 0
				,x,y, event = e;

			// IE10 implemented pointer events with a prefix;
			if ( e.type.indexOf('MSPointer') === 0 ) {
				pointer = true;
			}

			// Get the originalEvent, if the event has been wrapped
			// by jQuery. Zepto doesn't wrap the event.
			if ( e.originalEvent ) {
				e = e.originalEvent;
			}

			if ( touch ) {
				// noUiSlider supports one movement at a time,
				// so we can select the first 'changedTouch'.
				x = e.changedTouches[0].pageX;
				y = e.changedTouches[0].pageY;
			}

			if ( mouse || pointer ) {

				// Polyfill the pageXOffset and pageYOffset
				// variables for IE7 and IE8;
				if( !pointer && window.pageXOffset === undefined ){
					window.pageXOffset = document.documentElement.scrollLeft;
					window.pageYOffset = document.documentElement.scrollTop;
				}

				x = e.clientX + window.pageXOffset;
				y = e.clientY + window.pageYOffset;
			}

			event.points = [x, y];
			event.cursor = mouse;

			return event;
		}


	// DOM additions

		// Append a handle to the base.
		function addHandle ( direction, index ) {

			var handle = $('<div><div/></div>').addClass( Classes[2] ),
				additions = [ '-lower', '-upper' ];

			if ( direction ) {
				additions.reverse();
			}

			handle.children().addClass(
				Classes[3] + " " + Classes[3]+additions[index]
			);

			return handle;
		}

		// Add the proper connection classes.
		function addConnection ( connect, target, handles ) {

			// Apply the required connection classes to the elements
			// that need them. Some classes are made up for several
			// segments listed in the class list, to allow easy
			// renaming and provide a minor compression benefit.
			switch ( connect ) {
				case 1:	target.addClass( Classes[7] );
						handles[0].addClass( Classes[6] );
						break;
				case 3: handles[1].addClass( Classes[6] );
						/* falls through */
				case 2: handles[0].addClass( Classes[7] );
						/* falls through */
				case 0: target.addClass(Classes[6]);
						break;
			}
		}

		// Add handles to the slider base.
		function addHandles ( nrHandles, direction, base ) {

			var index, handles = [];

			// Append handles.
			for ( index = 0; index < nrHandles; index += 1 ) {

				// Keep a list of all added handles.
				handles.push( addHandle( direction, index ).appendTo(base) );
			}

			return handles;
		}

		// Initialize a single slider.
		function addSlider ( direction, orientation, target ) {

			// Apply classes and data to the target.
			target.addClass([
				Classes[0],
				Classes[8 + direction],
				Classes[4 + orientation]
			].join(' '));

			return $('<div/>').appendTo(target).addClass( Classes[1] );
		}

	function closure ( target, options, originalOptions ){

	// Internal variables

		// All variables local to 'closure' are marked $.
		var $Target = $(target),
			$Locations = [-1, -1],
			$Base,
			$Handles,
			$Spectrum = options.spectrum,
			$Values = [],
		// libLink. For rtl sliders, 'lower' and 'upper' should not be inverted
		// for one-handle sliders, so trim 'upper' it that case.
			triggerPos = ['lower', 'upper'].slice(0, options.handles);

		// Invert the libLink connection for rtl sliders.
		if ( options.dir ) {
			triggerPos.reverse();
		}

	// Helpers

		// Shorthand for base dimensions.
		function baseSize ( ) {
			return $Base[['width', 'height'][options.ort]]();
		}

		// External event handling
		function fireEvents ( events ) {

			// Use the external api to get the values.
			// Wrap the values in an array, as .trigger takes
			// only one additional argument.
			var index, values = [ $Target.val() ];

			for ( index = 0; index < events.length; index += 1 ){
				$Target.trigger(events[index], values);
			}
		}

		// Returns the input array, respecting the slider direction configuration.
		function inSliderOrder ( values ) {

			// If only one handle is used, return a single value.
			if ( values.length === 1 ){
				return values[0];
			}

			if ( options.dir ) {
				return values.reverse();
			}

			return values;
		}

	// libLink integration

		// Create a new function which calls .val on input change.
		function createChangeHandler ( trigger ) {
			return function ( ignore, value ){
				// Determine which array position to 'null' based on 'trigger'.
				$Target.val( [ trigger ? null : value, trigger ? value : null ], true );
			};
		}

		// Called by libLink when it wants a set of links updated.
		function linkUpdate ( flag ) {

			var trigger = $.inArray(flag, triggerPos);

			// The API might not have been set yet.
			if ( $Target[0].linkAPI && $Target[0].linkAPI[flag] ) {
				$Target[0].linkAPI[flag].change(
					$Values[trigger],
					$Handles[trigger].children(),
					$Target
				);
			}
		}

		// Called by libLink to append an element to the slider.
		function linkConfirm ( flag, element ) {

			// Find the trigger for the passed flag.
			var trigger = $.inArray(flag, triggerPos);

			// If set, append the element to the handle it belongs to.
			if ( element ) {
				element.appendTo( $Handles[trigger].children() );
			}

			// The public API is reversed for rtl sliders, so the changeHandler
			// should not be aware of the inverted trigger positions.
			// On rtl slider with one handle, 'lower' should be used.
			if ( options.dir && options.handles > 1 ) {
				trigger = trigger === 1 ? 0 : 1;
			}

			return createChangeHandler( trigger );
		}

		// Place elements back on the slider.
		function reAppendLink ( ) {

			var i, flag;

			// The API keeps a list of elements: we can re-append them on rebuild.
			for ( i = 0; i < triggerPos.length; i += 1 ) {
				if ( this.linkAPI && this.linkAPI[(flag = triggerPos[i])] ) {
					this.linkAPI[flag].reconfirm(flag);
				}
			}
		}

		target.LinkUpdate = linkUpdate;
		target.LinkConfirm = linkConfirm;
		target.LinkDefaultFormatter = options.format;
		target.LinkDefaultFlag = 'lower';

		target.reappend = reAppendLink;


		// Handler for attaching events trough a proxy.
		function attach ( events, element, callback, data ) {

			// This function can be used to 'filter' events to the slider.

			// Add the noUiSlider namespace to all events.
			events = events.replace( /\s/g, namespace + ' ' ) + namespace;

			// Bind a closure on the target.
			return element.on( events, function( e ){

				// jQuery and Zepto (1) handle unset attributes differently,
				// but always falsy; #208
				if ( !!$Target.attr('disabled') ) {
					return false;
				}

				// Stop if an active 'tap' transition is taking place.
				if ( $Target.hasClass( Classes[14] ) ) {
					return false;
				}

				e = fixEvent(e);
				e.calcPoint = e.points[ options.ort ];

				// Call the event handler with the event [ and additional data ].
				callback ( e, data );
			});
		}

		// Handle movement on document for handle and range drag.
		function move ( event, data ) {

			var handles = data.handles || $Handles, positions, state = false,
				proposal = ((event.calcPoint - data.start) * 100) / baseSize(),
				h = handles[0][0] !== $Handles[0][0] ? 1 : 0;

			// Calculate relative positions for the handles.
			positions = getPositions( proposal, data.positions, handles.length > 1);

			state = setHandle ( handles[0], positions[h], handles.length === 1 );

			if ( handles.length > 1 ) {
				state = setHandle ( handles[1], positions[h?0:1], false ) || state;
			}

			// Fire the 'slide' event if any handle moved.
			if ( state ) {
				fireEvents(['slide']);
			}
		}

		// Unbind move events on document, call callbacks.
		function end ( event ) {

			// The handle is no longer active, so remove the class.
			$('.' + Classes[15]).removeClass(Classes[15]);

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				$('body').css('cursor', '').off( namespace );
			}

			// Unbind the move and end events, which are added on 'start'.
			doc.off( namespace );

			// Remove dragging class.
			$Target.removeClass(Classes[12]);

			// Fire the change and set events.
			fireEvents(['set', 'change']);
		}

		// Bind move events on document.
		function start ( event, data ) {

			// Mark the handle as 'active' so it can be styled.
			if( data.handles.length === 1 ) {
				data.handles[0].children().addClass(Classes[15]);
			}

			// A drag should never propagate up to the 'tap' event.
			event.stopPropagation();

			// Attach the move event.
			attach ( actions.move, doc, move, {
				start: event.calcPoint,
				handles: data.handles,
				positions: [
					$Locations[0],
					$Locations[$Handles.length - 1]
				]
			});

			// Unbind all movement when the drag ends.
			attach ( actions.end, doc, end, null );

			// Text selection isn't an issue on touch devices,
			// so adding cursor styles can be skipped.
			if ( event.cursor ) {

				// Prevent the 'I' cursor and extend the range-drag cursor.
				$('body').css('cursor', $(event.target).css('cursor'));

				// Mark the target with a dragging state.
				if ( $Handles.length > 1 ) {
					$Target.addClass(Classes[12]);
				}

				// Prevent text selection when dragging the handles.
				$('body').on('selectstart' + namespace, false);
			}
		}

		// Move closest handle to tapped location.
		function tap ( event ) {

			var location = event.calcPoint, total = 0, to;

			// The tap event shouldn't propagate up and cause 'edge' to run.
			event.stopPropagation();

			// Add up the handle offsets.
			$.each( $Handles, function(){
				total += this.offset()[ options.style ];
			});

			// Find the handle closest to the tapped position.
			total = ( location < total/2 || $Handles.length === 1 ) ? 0 : 1;

			location -= $Base.offset()[ options.style ];

			// Calculate the new position.
			to = ( location * 100 ) / baseSize();

			if ( !options.events.snap ) {
				// Flag the slider as it is now in a transitional state.
				// Transition takes 300 ms, so re-enable the slider afterwards.
				addClassFor( $Target, Classes[14], 300 );
			}

			// Find the closest handle and calculate the tapped point.
			// The set handle to the new position.
			setHandle( $Handles[total], to );

			fireEvents(['slide', 'set', 'change']);

			if ( options.events.snap ) {
				start(event, { handles: [$Handles[total]] });
			}
		}

		// Attach events to several slider parts.
		function events ( behaviour ) {

			var i, drag;

			// Attach the standard drag event to the handles.
			if ( !behaviour.fixed ) {

				for ( i = 0; i < $Handles.length; i += 1 ) {

					// These events are only bound to the visual handle
					// element, not the 'real' origin element.
					attach ( actions.start, $Handles[i].children(), start, {
						handles: [ $Handles[i] ]
					});
				}
			}

			// Attach the tap event to the slider base.
			if ( behaviour.tap ) {

				attach ( actions.start, $Base, tap, {
					handles: $Handles
				});
			}

			// Make the range dragable.
			if ( behaviour.drag ){

				drag = $Base.find( '.' + Classes[7] ).addClass( Classes[10] );

				// When the range is fixed, the entire range can
				// be dragged by the handles. The handle in the first
				// origin will propagate the start event upward,
				// but it needs to be bound manually on the other.
				if ( behaviour.fixed ) {
					drag = drag.add($Base.children().not( drag ).children());
				}

				attach ( actions.start, drag, start, {
					handles: $Handles
				});
			}
		}


		// Test suggested values and apply margin, step.
		function setHandle ( handle, to, noLimitOption ) {

			var trigger = handle[0] !== $Handles[0][0] ? 1 : 0,
				lowerMargin = $Locations[0] + options.margin,
				upperMargin = $Locations[1] - options.margin,
				lowerLimit = $Locations[0] + options.limit,
				upperLimit = $Locations[1] - options.limit;

			// For sliders with multiple handles,
			// limit movement to the other handle.
			// Apply the margin option by adding it to the handle positions.
			if ( $Handles.length > 1 ) {
				to = trigger ? Math.max( to, lowerMargin ) : Math.min( to, upperMargin );
			}

			// The limit option has the opposite effect, limiting handles to a
			// maximum distance from another. Limit must be > 0, as otherwise
			// handles would be unmoveable. 'noLimitOption' is set to 'false'
			// for the .val() method, except for pass 4/4.
			if ( noLimitOption !== false && options.limit && $Handles.length > 1 ) {
				to = trigger ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit );
			}

			// Handle the step option.
			to = $Spectrum.getStep( to );

			// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
			// JavaScript has some issues in its floating point implementation.
			to = limit(parseFloat(to.toFixed(7)));

			// Return false if handle can't move.
			if ( to === $Locations[trigger] ) {
				return false;
			}

			// Set the handle to the new position.
			handle.css( options.style, to + '%' );

			// Force proper handle stacking
			if ( handle.is(':first-child') ) {
				handle.toggleClass(Classes[17], to > 50 );
			}

			// Update locations.
			$Locations[trigger] = to;

			// Convert the value to the slider stepping/range.
			$Values[trigger] = $Spectrum.fromStepping( to );

			linkUpdate(triggerPos[trigger]);

			return true;
		}

		// Loop values from value method and apply them.
		function setValues ( count, values ) {

			var i, trigger, to;

			// With the limit option, we'll need another limiting pass.
			if ( options.limit ) {
				count += 1;
			}

			// If there are multiple handles to be set run the setting
			// mechanism twice for the first handle, to make sure it
			// can be bounced of the second one properly.
			for ( i = 0; i < count; i += 1 ) {

				trigger = i%2;

				// Get the current argument from the array.
				to = values[trigger];

				// Setting with null indicates an 'ignore'.
				// Inputting 'false' is invalid.
				if ( to !== null && to !== false ) {

					// If a formatted number was passed, attemt to decode it.
					if ( typeof to === 'number' ) {
						to = String(to);
					}

					to = options.format.from( to );

					// Request an update for all links if the value was invalid.
					// Do so too if setting the handle fails.
					if ( to === false || isNaN(to) || setHandle( $Handles[trigger], $Spectrum.toStepping( to ), i === (3 - options.dir) ) === false ) {

						linkUpdate(triggerPos[trigger]);
					}
				}
			}
		}

		// Set the slider value.
		function valueSet ( input ) {

			// LibLink: don't accept new values when currently emitting changes.
			if ( $Target[0].LinkIsEmitting ) {
				return this;
			}

			var count, values = asArray( input );

			// The RTL settings is implemented by reversing the front-end,
			// internal mechanisms are the same.
			if ( options.dir && options.handles > 1 ) {
				values.reverse();
			}

			// Animation is optional.
			// Make sure the initial values where set before using animated
			// placement. (no report, unit testing);
			if ( options.animate && $Locations[0] !== -1 ) {
				addClassFor( $Target, Classes[14], 300 );
			}

			// Determine how often to set the handles.
			count = $Handles.length > 1 ? 3 : 1;

			if ( values.length === 1 ) {
				count = 1;
			}

			setValues ( count, values );

			// Fire the 'set' event. As of noUiSlider 7,
			// this is no longer optional.
			fireEvents(['set']);

			return this;
		}

		// Get the slider value.
		function valueGet ( ) {

			var i, retour = [];

			// Get the value from all handles.
			for ( i = 0; i < options.handles; i += 1 ){
				retour[i] = options.format.to( $Values[i] );
			}

			return inSliderOrder( retour );
		}

		// Destroy the slider and unbind all events.
		function destroyTarget ( ) {

			// Unbind events on the slider, remove all classes and child elements.
			$(this).off(namespace)
				.removeClass(Classes.join(' '))
				.empty();

			delete this.LinkUpdate;
			delete this.LinkConfirm;
			delete this.LinkDefaultFormatter;
			delete this.LinkDefaultFlag;
			delete this.reappend;
			delete this.vGet;
			delete this.vSet;
			delete this.getCurrentStep;
			delete this.getInfo;
			delete this.destroy;

			// Return the original options from the closure.
			return originalOptions;
		}

		// Get the current step size for the slider.
		function getCurrentStep ( ) {

			// Check all locations, map them to their stepping point.
			// Get the step point, then find it in the input list.
			var retour = $.map($Locations, function( location, index ){

				var step = $Spectrum.getApplicableStep( location ),

					// As per #391, the comparison for the decrement step can have some rounding issues.
					// Round the value to the precision used in the step.
					stepDecimals = countDecimals(String(step[2])),

					// Get the current numeric value
					value = $Values[index],

					// To move the slider 'one step up', the current step value needs to be added.
					// Use null if we are at the maximum slider value.
					increment = location === 100 ? null : step[2],

					// Going 'one step down' might put the slider in a different sub-range, so we
					// need to switch between the current or the previous step.
					prev = Number((value - step[2]).toFixed(stepDecimals)),

					// If the value fits the step, return the current step value. Otherwise, use the
					// previous step. Return null if the slider is at its minimum value.
					decrement = location === 0 ? null : (prev >= step[1]) ? step[2] : (step[0] || false);

				return [[decrement, increment]];
			});

			// Return values in the proper order.
			return inSliderOrder( retour );
		}

		// Get the original set of options.
		function getOriginalOptions ( ) {
			return originalOptions;
		}


	// Initialize slider

		// Throw an error if the slider was already initialized.
		if ( $Target.hasClass(Classes[0]) ) {
			throw new Error('Slider was already initialized.');
		}

		// Create the base element, initialise HTML and set classes.
		// Add handles and links.
		$Base = addSlider( options.dir, options.ort, $Target );
		$Handles = addHandles( options.handles, options.dir, $Base );

		// Set the connect classes.
		addConnection ( options.connect, $Target, $Handles );

		// Attach user events.
		events( options.events );

	// Methods

		target.vSet = valueSet;
		target.vGet = valueGet;
		target.destroy = destroyTarget;

		target.getCurrentStep = getCurrentStep;
		target.getOriginalOptions = getOriginalOptions;

		target.getInfo = function(){
			return [
				$Spectrum,
				options.style,
				options.ort
			];
		};

		// Use the public value method to set the start values.
		$Target.val( options.start );

	}


		// Run the standard initializer
		function initialize ( originalOptions ) {

			// Test the options once, not for every slider.
			var options = testOptions( originalOptions, this );

			// Loop all items, and provide a new closed-scope environment.
			return this.each(function(){
				closure(this, options, originalOptions);
			});
		}

		// Destroy the slider, then re-enter initialization.
		function rebuild ( options ) {

			return this.each(function(){

				// The rebuild flag can be used if the slider wasn't initialized yet.
				if ( !this.destroy ) {
					$(this).noUiSlider( options );
					return;
				}

				// Get the current values from the slider,
				// including the initialization options.
				var values = $(this).val(), originalOptions = this.destroy(),

					// Extend the previous options with the newly provided ones.
					newOptions = $.extend( {}, originalOptions, options );

				// Run the standard initializer.
				$(this).noUiSlider( newOptions );

				// Place Link elements back.
				this.reappend();

				// If the start option hasn't changed,
				// reset the previous values.
				if ( originalOptions.start === newOptions.start ) {
					$(this).val(values);
				}
			});
		}

		// Access the internal getting and setting methods based on argument count.
		function value ( ) {
			return this[0][ !arguments.length ? 'vGet' : 'vSet' ].apply(this[0], arguments);
		}

		// Override the .val() method. Test every element. Is it a slider? Go to
		// the slider value handling. No? Use the standard method.
		// Note how $.fn.val expects 'this' to be an instance of $. For convenience,
		// the above 'value' function does too.
		$.fn.val = function ( arg ) {

			// this === instanceof $

			function valMethod( a ){
				return a.hasClass(Classes[0]) ? value : $val;
			}

			// If no value is passed, this is 'get'.
			if ( !arguments.length ) {
				var first = $(this[0]);
				return valMethod(first).call(first);
			}

			var isFunction = $.isFunction(arg);

			// Return the set so it remains chainable. Make sure not to break
			// jQuery's .val(function( index, value ){}) signature.
			return this.each(function( i ){

				var val = arg, $t = $(this);

				if ( isFunction ) {
					val = arg.call(this, i, $t.val());
				}

				valMethod($t).call($t, val);
			});
		};

	// Extend jQuery/Zepto with the noUiSlider method.
		$.fn.noUiSlider = function ( options, rebuildFlag ) {

			switch ( options ) {
				case 'step': return this[0].getCurrentStep();
				case 'options': return this[0].getOriginalOptions();
			}

			return ( rebuildFlag ? rebuild : initialize ).call(this, options);
		};

		function getGroup ( $Spectrum, mode, values, stepped ) {

			// Use the range.
			if ( mode === 'range' || mode === 'steps' ) {
				return $Spectrum.xVal;
			}

			if ( mode === 'count' ) {

				// Divide 0 - 100 in 'count' parts.
				var spread = ( 100 / (values-1) ), v, i = 0;
				values = [];

				// List these parts and have them handled as 'positions'.
				while ((v=i++*spread) <= 100 ) {
					values.push(v);
				}

				mode = 'positions';
			}

			if ( mode === 'positions' ) {

				// Map all percentages to on-range values.
				return $.map(values, function( value ){
					return $Spectrum.fromStepping( stepped ? $Spectrum.getStep( value ) : value );
				});
			}

			if ( mode === 'values' ) {

				// If the value must be stepped, it needs to be converted to a percentage first.
				if ( stepped ) {

					return $.map(values, function( value ){

						// Convert to percentage, apply step, return to value.
						return $Spectrum.fromStepping( $Spectrum.getStep( $Spectrum.toStepping( value ) ) );
					});

				}

				// Otherwise, we can simply use the values.
				return values;
			}
		}

		function generateSpread ( $Spectrum, density, mode, group ) {

			var originalSpectrumDirection = $Spectrum.direction,
				indexes = {},
				firstInRange = $Spectrum.xVal[0],
				lastInRange = $Spectrum.xVal[$Spectrum.xVal.length-1],
				ignoreFirst = false,
				ignoreLast = false,
				prevPct = 0;

			// This function loops the spectrum in an ltr linear fashion,
			// while the toStepping method is direction aware. Trick it into
			// believing it is ltr.
			$Spectrum.direction = 0;

			// Create a copy of the group, sort it and filter away all duplicates.
			group = unique(group.slice().sort(function(a, b){ return a - b; }));

			// Make sure the range starts with the first element.
			if ( group[0] !== firstInRange ) {
				group.unshift(firstInRange);
				ignoreFirst = true;
			}

			// Likewise for the last one.
			if ( group[group.length - 1] !== lastInRange ) {
				group.push(lastInRange);
				ignoreLast = true;
			}

			$.each(group, function ( index ) {

				// Get the current step and the lower + upper positions.
				var step, i, q,
					low = group[index],
					high = group[index+1],
					newPct, pctDifference, pctPos, type,
					steps, realSteps, stepsize;

				// When using 'steps' mode, use the provided steps.
				// Otherwise, we'll step on to the next subrange.
				if ( mode === 'steps' ) {
					step = $Spectrum.xNumSteps[ index ];
				}

				// Default to a 'full' step.
				if ( !step ) {
					step = high-low;
				}

				// Low can be 0, so test for false. If high is undefined,
				// we are at the last subrange. Index 0 is already handled.
				if ( low === false || high === undefined ) {
					return;
				}

				// Find all steps in the subrange.
				for ( i = low; i <= high; i += step ) {

					// Get the percentage value for the current step,
					// calculate the size for the subrange.
					newPct = $Spectrum.toStepping( i );
					pctDifference = newPct - prevPct;

					steps = pctDifference / density;
					realSteps = Math.round(steps);

					// This ratio represents the ammount of percentage-space a point indicates.
					// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
					// Round the percentage offset to an even number, then divide by two
					// to spread the offset on both sides of the range.
					stepsize = pctDifference/realSteps;

					// Divide all points evenly, adding the correct number to this subrange.
					// Run up to <= so that 100% gets a point, event if ignoreLast is set.
					for ( q = 1; q <= realSteps; q += 1 ) {

						// The ratio between the rounded value and the actual size might be ~1% off.
						// Correct the percentage offset by the number of points
						// per subrange. density = 1 will result in 100 points on the
						// full range, 2 for 50, 4 for 25, etc.
						pctPos = prevPct + ( q * stepsize );
						indexes[pctPos.toFixed(5)] = ['x', 0];
					}

					// Determine the point type.
					type = ($.inArray(i, group) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

					// Enforce the 'ignoreFirst' option by overwriting the type for 0.
					if ( !index && ignoreFirst ) {
						type = 0;
					}

					if ( !(i === high && ignoreLast)) {
						// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
						indexes[newPct.toFixed(5)] = [i, type];
					}

					// Update the percentage count.
					prevPct = newPct;
				}
			});

			// Reset the spectrum.
			$Spectrum.direction = originalSpectrumDirection;

			return indexes;
		}

		function addMarking ( CSSstyle, orientation, direction, spread, filterFunc, formatter ) {

			var style = ['horizontal', 'vertical'][orientation],
				element = $('<div/>');

			element.addClass('noUi-pips noUi-pips-'+style);

			function getSize( type, value ){
				return [ '-normal', '-large', '-sub' ][type];
			}

			function getTags( offset, source, values ) {
				return 'class="' + source + ' ' +
					source + '-' + style + ' ' +
					source + getSize(values[1], values[0]) +
					'" style="' + CSSstyle + ': ' + offset + '%"';
			}

			function addSpread ( offset, values ){

				if ( direction ) {
					offset = 100 - offset;
				}

				// Apply the filter function, if it is set.
				values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

				// Add a marker for every point
				element.append('<div ' + getTags(offset, 'noUi-marker', values) + '></div>');

				// Values are only appended for points marked '1' or '2'.
				if ( values[1] ) {
					element.append('<div '+getTags(offset, 'noUi-value', values)+'>' + formatter.to(values[0]) + '</div>');
				}
			}

			// Append all points.
			$.each(spread, addSpread);

			return element;
		}

		$.fn.noUiSlider_pips = function ( grid ) {

		var mode = grid.mode,
			density = grid.density || 1,
			filter = grid.filter || false,
			values = grid.values || false,
			format = grid.format || {
				to: Math.round
			},
			stepped = grid.stepped || false;

			return this.each(function(){

			var info = this.getInfo(),
				group = getGroup( info[0], mode, values, stepped ),
				spread = generateSpread( info[0], density, mode, group );

				return $(this).append(addMarking(
					info[1],
					info[2],
					info[0].direction,
					spread,
					filter,
					format
				));
			});
		};

	}( __webpack_provided_window_dot_jQuery || window.Zepto ));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/* WEBPACK VAR INJECTION */(function($) {/*!
	 * Select2 4.0.0
	 * https://select2.github.io
	 *
	 * Released under the MIT license
	 * https://github.com/select2/select2/blob/master/LICENSE.md
	 */
	(function (factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node/CommonJS
	    factory(require('jquery'));
	  } else {
	    // Browser globals
	    factory(jQuery);
	  }
	}(function (jQuery) {
	  // This is needed so we can catch the AMD loader configuration and use it
	  // The inner file should be wrapped (by `banner.start.js`) in a function that
	  // returns the AMD loader references.
	  var S2 =
	(function () {
	  // Restore the Select2 AMD loader so it can be used
	  // Needed mostly in the language files, where the loader is not inserted
	  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
	    var S2 = jQuery.fn.select2.amd;
	  }
	var S2;(function () { if (!S2 || !S2.requirejs) {
	if (!S2) { S2 = {}; } else { require = S2; }
	/**
	 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
	 * Available via the MIT or new BSD license.
	 * see: http://github.com/jrburke/almond for details
	 */
	//Going sloppy to avoid 'use strict' string cost, but strict practices should
	//be followed.
	/*jslint sloppy: true */
	/*global setTimeout: false */

	var requirejs, require, define;
	(function (undef) {
	    var main, req, makeMap, handlers,
	        defined = {},
	        waiting = {},
	        config = {},
	        defining = {},
	        hasOwn = Object.prototype.hasOwnProperty,
	        aps = [].slice,
	        jsSuffixRegExp = /\.js$/;

	    function hasProp(obj, prop) {
	        return hasOwn.call(obj, prop);
	    }

	    /**
	     * Given a relative module name, like ./something, normalize it to
	     * a real name that can be mapped to a path.
	     * @param {String} name the relative name
	     * @param {String} baseName a real name that the name arg is relative
	     * to.
	     * @returns {String} normalized name
	     */
	    function normalize(name, baseName) {
	        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
	            foundI, foundStarMap, starI, i, j, part,
	            baseParts = baseName && baseName.split("/"),
	            map = config.map,
	            starMap = (map && map['*']) || {};

	        //Adjust any relative paths.
	        if (name && name.charAt(0) === ".") {
	            //If have a base name, try to normalize against it,
	            //otherwise, assume it is a top-level require that will
	            //be relative to baseUrl in the end.
	            if (baseName) {
	                //Convert baseName to array, and lop off the last part,
	                //so that . matches that "directory" and not name of the baseName's
	                //module. For instance, baseName of "one/two/three", maps to
	                //"one/two/three.js", but we want the directory, "one/two" for
	                //this normalization.
	                baseParts = baseParts.slice(0, baseParts.length - 1);
	                name = name.split('/');
	                lastIndex = name.length - 1;

	                // Node .js allowance:
	                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
	                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
	                }

	                name = baseParts.concat(name);

	                //start trimDots
	                for (i = 0; i < name.length; i += 1) {
	                    part = name[i];
	                    if (part === ".") {
	                        name.splice(i, 1);
	                        i -= 1;
	                    } else if (part === "..") {
	                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
	                            //End of the line. Keep at least one non-dot
	                            //path segment at the front so it can be mapped
	                            //correctly to disk. Otherwise, there is likely
	                            //no path mapping for a path starting with '..'.
	                            //This can still fail, but catches the most reasonable
	                            //uses of ..
	                            break;
	                        } else if (i > 0) {
	                            name.splice(i - 1, 2);
	                            i -= 2;
	                        }
	                    }
	                }
	                //end trimDots

	                name = name.join("/");
	            } else if (name.indexOf('./') === 0) {
	                // No baseName, so this is ID is resolved relative
	                // to baseUrl, pull off the leading dot.
	                name = name.substring(2);
	            }
	        }

	        //Apply map config if available.
	        if ((baseParts || starMap) && map) {
	            nameParts = name.split('/');

	            for (i = nameParts.length; i > 0; i -= 1) {
	                nameSegment = nameParts.slice(0, i).join("/");

	                if (baseParts) {
	                    //Find the longest baseName segment match in the config.
	                    //So, do joins on the biggest to smallest lengths of baseParts.
	                    for (j = baseParts.length; j > 0; j -= 1) {
	                        mapValue = map[baseParts.slice(0, j).join('/')];

	                        //baseName segment has  config, find if it has one for
	                        //this name.
	                        if (mapValue) {
	                            mapValue = mapValue[nameSegment];
	                            if (mapValue) {
	                                //Match, update name to the new value.
	                                foundMap = mapValue;
	                                foundI = i;
	                                break;
	                            }
	                        }
	                    }
	                }

	                if (foundMap) {
	                    break;
	                }

	                //Check for a star map match, but just hold on to it,
	                //if there is a shorter segment match later in a matching
	                //config, then favor over this star map.
	                if (!foundStarMap && starMap && starMap[nameSegment]) {
	                    foundStarMap = starMap[nameSegment];
	                    starI = i;
	                }
	            }

	            if (!foundMap && foundStarMap) {
	                foundMap = foundStarMap;
	                foundI = starI;
	            }

	            if (foundMap) {
	                nameParts.splice(0, foundI, foundMap);
	                name = nameParts.join('/');
	            }
	        }

	        return name;
	    }

	    function makeRequire(relName, forceSync) {
	        return function () {
	            //A version of a require function that passes a moduleName
	            //value for items that may need to
	            //look up paths relative to the moduleName
	            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
	        };
	    }

	    function makeNormalize(relName) {
	        return function (name) {
	            return normalize(name, relName);
	        };
	    }

	    function makeLoad(depName) {
	        return function (value) {
	            defined[depName] = value;
	        };
	    }

	    function callDep(name) {
	        if (hasProp(waiting, name)) {
	            var args = waiting[name];
	            delete waiting[name];
	            defining[name] = true;
	            main.apply(undef, args);
	        }

	        if (!hasProp(defined, name) && !hasProp(defining, name)) {
	            throw new Error('No ' + name);
	        }
	        return defined[name];
	    }

	    //Turns a plugin!resource to [plugin, resource]
	    //with the plugin being undefined if the name
	    //did not have a plugin prefix.
	    function splitPrefix(name) {
	        var prefix,
	            index = name ? name.indexOf('!') : -1;
	        if (index > -1) {
	            prefix = name.substring(0, index);
	            name = name.substring(index + 1, name.length);
	        }
	        return [prefix, name];
	    }

	    /**
	     * Makes a name map, normalizing the name, and using a plugin
	     * for normalization if necessary. Grabs a ref to plugin
	     * too, as an optimization.
	     */
	    makeMap = function (name, relName) {
	        var plugin,
	            parts = splitPrefix(name),
	            prefix = parts[0];

	        name = parts[1];

	        if (prefix) {
	            prefix = normalize(prefix, relName);
	            plugin = callDep(prefix);
	        }

	        //Normalize according
	        if (prefix) {
	            if (plugin && plugin.normalize) {
	                name = plugin.normalize(name, makeNormalize(relName));
	            } else {
	                name = normalize(name, relName);
	            }
	        } else {
	            name = normalize(name, relName);
	            parts = splitPrefix(name);
	            prefix = parts[0];
	            name = parts[1];
	            if (prefix) {
	                plugin = callDep(prefix);
	            }
	        }

	        //Using ridiculous property names for space reasons
	        return {
	            f: prefix ? prefix + '!' + name : name, //fullName
	            n: name,
	            pr: prefix,
	            p: plugin
	        };
	    };

	    function makeConfig(name) {
	        return function () {
	            return (config && config.config && config.config[name]) || {};
	        };
	    }

	    handlers = {
	        require: function (name) {
	            return makeRequire(name);
	        },
	        exports: function (name) {
	            var e = defined[name];
	            if (typeof e !== 'undefined') {
	                return e;
	            } else {
	                return (defined[name] = {});
	            }
	        },
	        module: function (name) {
	            return {
	                id: name,
	                uri: '',
	                exports: defined[name],
	                config: makeConfig(name)
	            };
	        }
	    };

	    main = function (name, deps, callback, relName) {
	        var cjsModule, depName, ret, map, i,
	            args = [],
	            callbackType = typeof callback,
	            usingExports;

	        //Use name if no relName
	        relName = relName || name;

	        //Call the callback to define the module, if necessary.
	        if (callbackType === 'undefined' || callbackType === 'function') {
	            //Pull out the defined dependencies and pass the ordered
	            //values to the callback.
	            //Default to [require, exports, module] if no deps
	            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
	            for (i = 0; i < deps.length; i += 1) {
	                map = makeMap(deps[i], relName);
	                depName = map.f;

	                //Fast path CommonJS standard dependencies.
	                if (depName === "require") {
	                    args[i] = handlers.require(name);
	                } else if (depName === "exports") {
	                    //CommonJS module spec 1.1
	                    args[i] = handlers.exports(name);
	                    usingExports = true;
	                } else if (depName === "module") {
	                    //CommonJS module spec 1.1
	                    cjsModule = args[i] = handlers.module(name);
	                } else if (hasProp(defined, depName) ||
	                           hasProp(waiting, depName) ||
	                           hasProp(defining, depName)) {
	                    args[i] = callDep(depName);
	                } else if (map.p) {
	                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
	                    args[i] = defined[depName];
	                } else {
	                    throw new Error(name + ' missing ' + depName);
	                }
	            }

	            ret = callback ? callback.apply(defined[name], args) : undefined;

	            if (name) {
	                //If setting exports via "module" is in play,
	                //favor that over return value and exports. After that,
	                //favor a non-undefined return value over exports use.
	                if (cjsModule && cjsModule.exports !== undef &&
	                        cjsModule.exports !== defined[name]) {
	                    defined[name] = cjsModule.exports;
	                } else if (ret !== undef || !usingExports) {
	                    //Use the return value from the function.
	                    defined[name] = ret;
	                }
	            }
	        } else if (name) {
	            //May just be an object definition for the module. Only
	            //worry about defining if have a module name.
	            defined[name] = callback;
	        }
	    };

	    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
	        if (typeof deps === "string") {
	            if (handlers[deps]) {
	                //callback in this case is really relName
	                return handlers[deps](callback);
	            }
	            //Just return the module wanted. In this scenario, the
	            //deps arg is the module name, and second arg (if passed)
	            //is just the relName.
	            //Normalize module name, if it contains . or ..
	            return callDep(makeMap(deps, callback).f);
	        } else if (!deps.splice) {
	            //deps is a config object, not an array.
	            config = deps;
	            if (config.deps) {
	                req(config.deps, config.callback);
	            }
	            if (!callback) {
	                return;
	            }

	            if (callback.splice) {
	                //callback is an array, which means it is a dependency list.
	                //Adjust args if there are dependencies
	                deps = callback;
	                callback = relName;
	                relName = null;
	            } else {
	                deps = undef;
	            }
	        }

	        //Support require(['a'])
	        callback = callback || function () {};

	        //If relName is a function, it is an errback handler,
	        //so remove it.
	        if (typeof relName === 'function') {
	            relName = forceSync;
	            forceSync = alt;
	        }

	        //Simulate async callback;
	        if (forceSync) {
	            main(undef, deps, callback, relName);
	        } else {
	            //Using a non-zero value because of concern for what old browsers
	            //do, and latest browsers "upgrade" to 4 if lower value is used:
	            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
	            //If want a value immediately, use require('id') instead -- something
	            //that works in almond on the global level, but not guaranteed and
	            //unlikely to work in other AMD implementations.
	            setTimeout(function () {
	                main(undef, deps, callback, relName);
	            }, 4);
	        }

	        return req;
	    };

	    /**
	     * Just drops the config on the floor, but returns req in case
	     * the config return value is used.
	     */
	    req.config = function (cfg) {
	        return req(cfg);
	    };

	    /**
	     * Expose module registry for debugging and tooling
	     */
	    requirejs._defined = defined;

	    define = function (name, deps, callback) {

	        //This module may not have dependencies
	        if (!deps.splice) {
	            //deps is not an array, so probably means
	            //an object literal or factory function for
	            //the value. Adjust args.
	            callback = deps;
	            deps = [];
	        }

	        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
	            waiting[name] = [name, deps, callback];
	        }
	    };

	    define.amd = {
	        jQuery: true
	    };
	}());

	S2.requirejs = requirejs;S2.require = require;S2.define = define;
	}
	}());
	S2.define("almond", function(){});

	/* global jQuery:false, $:false */
	S2.define('jquery',[],function () {
	  var _$ = jQuery || $;

	  if (_$ == null && console && console.error) {
	    console.error(
	      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
	      'found. Make sure that you are including jQuery before Select2 on your ' +
	      'web page.'
	    );
	  }

	  return _$;
	});

	S2.define('select2/utils',[
	  'jquery'
	], function ($) {
	  var Utils = {};

	  Utils.Extend = function (ChildClass, SuperClass) {
	    var __hasProp = {}.hasOwnProperty;

	    function BaseConstructor () {
	      this.constructor = ChildClass;
	    }

	    for (var key in SuperClass) {
	      if (__hasProp.call(SuperClass, key)) {
	        ChildClass[key] = SuperClass[key];
	      }
	    }

	    BaseConstructor.prototype = SuperClass.prototype;
	    ChildClass.prototype = new BaseConstructor();
	    ChildClass.__super__ = SuperClass.prototype;

	    return ChildClass;
	  };

	  function getMethods (theClass) {
	    var proto = theClass.prototype;

	    var methods = [];

	    for (var methodName in proto) {
	      var m = proto[methodName];

	      if (typeof m !== 'function') {
	        continue;
	      }

	      if (methodName === 'constructor') {
	        continue;
	      }

	      methods.push(methodName);
	    }

	    return methods;
	  }

	  Utils.Decorate = function (SuperClass, DecoratorClass) {
	    var decoratedMethods = getMethods(DecoratorClass);
	    var superMethods = getMethods(SuperClass);

	    function DecoratedClass () {
	      var unshift = Array.prototype.unshift;

	      var argCount = DecoratorClass.prototype.constructor.length;

	      var calledConstructor = SuperClass.prototype.constructor;

	      if (argCount > 0) {
	        unshift.call(arguments, SuperClass.prototype.constructor);

	        calledConstructor = DecoratorClass.prototype.constructor;
	      }

	      calledConstructor.apply(this, arguments);
	    }

	    DecoratorClass.displayName = SuperClass.displayName;

	    function ctr () {
	      this.constructor = DecoratedClass;
	    }

	    DecoratedClass.prototype = new ctr();

	    for (var m = 0; m < superMethods.length; m++) {
	        var superMethod = superMethods[m];

	        DecoratedClass.prototype[superMethod] =
	          SuperClass.prototype[superMethod];
	    }

	    var calledMethod = function (methodName) {
	      // Stub out the original method if it's not decorating an actual method
	      var originalMethod = function () {};

	      if (methodName in DecoratedClass.prototype) {
	        originalMethod = DecoratedClass.prototype[methodName];
	      }

	      var decoratedMethod = DecoratorClass.prototype[methodName];

	      return function () {
	        var unshift = Array.prototype.unshift;

	        unshift.call(arguments, originalMethod);

	        return decoratedMethod.apply(this, arguments);
	      };
	    };

	    for (var d = 0; d < decoratedMethods.length; d++) {
	      var decoratedMethod = decoratedMethods[d];

	      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
	    }

	    return DecoratedClass;
	  };

	  var Observable = function () {
	    this.listeners = {};
	  };

	  Observable.prototype.on = function (event, callback) {
	    this.listeners = this.listeners || {};

	    if (event in this.listeners) {
	      this.listeners[event].push(callback);
	    } else {
	      this.listeners[event] = [callback];
	    }
	  };

	  Observable.prototype.trigger = function (event) {
	    var slice = Array.prototype.slice;

	    this.listeners = this.listeners || {};

	    if (event in this.listeners) {
	      this.invoke(this.listeners[event], slice.call(arguments, 1));
	    }

	    if ('*' in this.listeners) {
	      this.invoke(this.listeners['*'], arguments);
	    }
	  };

	  Observable.prototype.invoke = function (listeners, params) {
	    for (var i = 0, len = listeners.length; i < len; i++) {
	      listeners[i].apply(this, params);
	    }
	  };

	  Utils.Observable = Observable;

	  Utils.generateChars = function (length) {
	    var chars = '';

	    for (var i = 0; i < length; i++) {
	      var randomChar = Math.floor(Math.random() * 36);
	      chars += randomChar.toString(36);
	    }

	    return chars;
	  };

	  Utils.bind = function (func, context) {
	    return function () {
	      func.apply(context, arguments);
	    };
	  };

	  Utils._convertData = function (data) {
	    for (var originalKey in data) {
	      var keys = originalKey.split('-');

	      var dataLevel = data;

	      if (keys.length === 1) {
	        continue;
	      }

	      for (var k = 0; k < keys.length; k++) {
	        var key = keys[k];

	        // Lowercase the first letter
	        // By default, dash-separated becomes camelCase
	        key = key.substring(0, 1).toLowerCase() + key.substring(1);

	        if (!(key in dataLevel)) {
	          dataLevel[key] = {};
	        }

	        if (k == keys.length - 1) {
	          dataLevel[key] = data[originalKey];
	        }

	        dataLevel = dataLevel[key];
	      }

	      delete data[originalKey];
	    }

	    return data;
	  };

	  Utils.hasScroll = function (index, el) {
	    // Adapted from the function created by @ShadowScripter
	    // and adapted by @BillBarry on the Stack Exchange Code Review website.
	    // The original code can be found at
	    // http://codereview.stackexchange.com/q/13338
	    // and was designed to be used with the Sizzle selector engine.

	    var $el = $(el);
	    var overflowX = el.style.overflowX;
	    var overflowY = el.style.overflowY;

	    //Check both x and y declarations
	    if (overflowX === overflowY &&
	        (overflowY === 'hidden' || overflowY === 'visible')) {
	      return false;
	    }

	    if (overflowX === 'scroll' || overflowY === 'scroll') {
	      return true;
	    }

	    return ($el.innerHeight() < el.scrollHeight ||
	      $el.innerWidth() < el.scrollWidth);
	  };

	  Utils.escapeMarkup = function (markup) {
	    var replaceMap = {
	      '\\': '&#92;',
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      '\'': '&#39;',
	      '/': '&#47;'
	    };

	    // Do not try to escape the markup if it's not a string
	    if (typeof markup !== 'string') {
	      return markup;
	    }

	    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
	      return replaceMap[match];
	    });
	  };

	  // Append an array of jQuery nodes to a given element.
	  Utils.appendMany = function ($element, $nodes) {
	    // jQuery 1.7.x does not support $.fn.append() with an array
	    // Fall back to a jQuery object collection using $.fn.add()
	    if ($.fn.jquery.substr(0, 3) === '1.7') {
	      var $jqNodes = $();

	      $.map($nodes, function (node) {
	        $jqNodes = $jqNodes.add(node);
	      });

	      $nodes = $jqNodes;
	    }

	    $element.append($nodes);
	  };

	  return Utils;
	});

	S2.define('select2/results',[
	  'jquery',
	  './utils'
	], function ($, Utils) {
	  function Results ($element, options, dataAdapter) {
	    this.$element = $element;
	    this.data = dataAdapter;
	    this.options = options;

	    Results.__super__.constructor.call(this);
	  }

	  Utils.Extend(Results, Utils.Observable);

	  Results.prototype.render = function () {
	    var $results = $(
	      '<ul class="select2-results__options" role="tree"></ul>'
	    );

	    if (this.options.get('multiple')) {
	      $results.attr('aria-multiselectable', 'true');
	    }

	    this.$results = $results;

	    return $results;
	  };

	  Results.prototype.clear = function () {
	    this.$results.empty();
	  };

	  Results.prototype.displayMessage = function (params) {
	    var escapeMarkup = this.options.get('escapeMarkup');

	    this.clear();
	    this.hideLoading();

	    var $message = $(
	      '<li role="treeitem" class="select2-results__option"></li>'
	    );

	    var message = this.options.get('translations').get(params.message);

	    $message.append(
	      escapeMarkup(
	        message(params.args)
	      )
	    );

	    this.$results.append($message);
	  };

	  Results.prototype.append = function (data) {
	    this.hideLoading();

	    var $options = [];

	    if (data.results == null || data.results.length === 0) {
	      if (this.$results.children().length === 0) {
	        this.trigger('results:message', {
	          message: 'noResults'
	        });
	      }

	      return;
	    }

	    data.results = this.sort(data.results);

	    for (var d = 0; d < data.results.length; d++) {
	      var item = data.results[d];

	      var $option = this.option(item);

	      $options.push($option);
	    }

	    this.$results.append($options);
	  };

	  Results.prototype.position = function ($results, $dropdown) {
	    var $resultsContainer = $dropdown.find('.select2-results');
	    $resultsContainer.append($results);
	  };

	  Results.prototype.sort = function (data) {
	    var sorter = this.options.get('sorter');

	    return sorter(data);
	  };

	  Results.prototype.setClasses = function () {
	    var self = this;

	    this.data.current(function (selected) {
	      var selectedIds = $.map(selected, function (s) {
	        return s.id.toString();
	      });

	      var $options = self.$results
	        .find('.select2-results__option[aria-selected]');

	      $options.each(function () {
	        var $option = $(this);

	        var item = $.data(this, 'data');

	        // id needs to be converted to a string when comparing
	        var id = '' + item.id;

	        if ((item.element != null && item.element.selected) ||
	            (item.element == null && $.inArray(id, selectedIds) > -1)) {
	          $option.attr('aria-selected', 'true');
	        } else {
	          $option.attr('aria-selected', 'false');
	        }
	      });

	      var $selected = $options.filter('[aria-selected=true]');

	      // Check if there are any selected options
	      if ($selected.length > 0) {
	        // If there are selected options, highlight the first
	        $selected.first().trigger('mouseenter');
	      } else {
	        // If there are no selected options, highlight the first option
	        // in the dropdown
	        $options.first().trigger('mouseenter');
	      }
	    });
	  };

	  Results.prototype.showLoading = function (params) {
	    this.hideLoading();

	    var loadingMore = this.options.get('translations').get('searching');

	    var loading = {
	      disabled: true,
	      loading: true,
	      text: loadingMore(params)
	    };
	    var $loading = this.option(loading);
	    $loading.className += ' loading-results';

	    this.$results.prepend($loading);
	  };

	  Results.prototype.hideLoading = function () {
	    this.$results.find('.loading-results').remove();
	  };

	  Results.prototype.option = function (data) {
	    var option = document.createElement('li');
	    option.className = 'select2-results__option';

	    var attrs = {
	      'role': 'treeitem',
	      'aria-selected': 'false'
	    };

	    if (data.disabled) {
	      delete attrs['aria-selected'];
	      attrs['aria-disabled'] = 'true';
	    }

	    if (data.id == null) {
	      delete attrs['aria-selected'];
	    }

	    if (data._resultId != null) {
	      option.id = data._resultId;
	    }

	    if (data.title) {
	      option.title = data.title;
	    }

	    if (data.children) {
	      attrs.role = 'group';
	      attrs['aria-label'] = data.text;
	      delete attrs['aria-selected'];
	    }

	    for (var attr in attrs) {
	      var val = attrs[attr];

	      option.setAttribute(attr, val);
	    }

	    if (data.children) {
	      var $option = $(option);

	      var label = document.createElement('strong');
	      label.className = 'select2-results__group';

	      var $label = $(label);
	      this.template(data, label);

	      var $children = [];

	      for (var c = 0; c < data.children.length; c++) {
	        var child = data.children[c];

	        var $child = this.option(child);

	        $children.push($child);
	      }

	      var $childrenContainer = $('<ul></ul>', {
	        'class': 'select2-results__options select2-results__options--nested'
	      });

	      $childrenContainer.append($children);

	      $option.append(label);
	      $option.append($childrenContainer);
	    } else {
	      this.template(data, option);
	    }

	    $.data(option, 'data', data);

	    return option;
	  };

	  Results.prototype.bind = function (container, $container) {
	    var self = this;

	    var id = container.id + '-results';

	    this.$results.attr('id', id);

	    container.on('results:all', function (params) {
	      self.clear();
	      self.append(params.data);

	      if (container.isOpen()) {
	        self.setClasses();
	      }
	    });

	    container.on('results:append', function (params) {
	      self.append(params.data);

	      if (container.isOpen()) {
	        self.setClasses();
	      }
	    });

	    container.on('query', function (params) {
	      self.showLoading(params);
	    });

	    container.on('select', function () {
	      if (!container.isOpen()) {
	        return;
	      }

	      self.setClasses();
	    });

	    container.on('unselect', function () {
	      if (!container.isOpen()) {
	        return;
	      }

	      self.setClasses();
	    });

	    container.on('open', function () {
	      // When the dropdown is open, aria-expended="true"
	      self.$results.attr('aria-expanded', 'true');
	      self.$results.attr('aria-hidden', 'false');

	      self.setClasses();
	      self.ensureHighlightVisible();
	    });

	    container.on('close', function () {
	      // When the dropdown is closed, aria-expended="false"
	      self.$results.attr('aria-expanded', 'false');
	      self.$results.attr('aria-hidden', 'true');
	      self.$results.removeAttr('aria-activedescendant');
	    });

	    container.on('results:toggle', function () {
	      var $highlighted = self.getHighlightedResults();

	      if ($highlighted.length === 0) {
	        return;
	      }

	      $highlighted.trigger('mouseup');
	    });

	    container.on('results:select', function () {
	      var $highlighted = self.getHighlightedResults();

	      if ($highlighted.length === 0) {
	        return;
	      }

	      var data = $highlighted.data('data');

	      if ($highlighted.attr('aria-selected') == 'true') {
	        self.trigger('close');
	      } else {
	        self.trigger('select', {
	          data: data
	        });
	      }
	    });

	    container.on('results:previous', function () {
	      var $highlighted = self.getHighlightedResults();

	      var $options = self.$results.find('[aria-selected]');

	      var currentIndex = $options.index($highlighted);

	      // If we are already at te top, don't move further
	      if (currentIndex === 0) {
	        return;
	      }

	      var nextIndex = currentIndex - 1;

	      // If none are highlighted, highlight the first
	      if ($highlighted.length === 0) {
	        nextIndex = 0;
	      }

	      var $next = $options.eq(nextIndex);

	      $next.trigger('mouseenter');

	      var currentOffset = self.$results.offset().top;
	      var nextTop = $next.offset().top;
	      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

	      if (nextIndex === 0) {
	        self.$results.scrollTop(0);
	      } else if (nextTop - currentOffset < 0) {
	        self.$results.scrollTop(nextOffset);
	      }
	    });

	    container.on('results:next', function () {
	      var $highlighted = self.getHighlightedResults();

	      var $options = self.$results.find('[aria-selected]');

	      var currentIndex = $options.index($highlighted);

	      var nextIndex = currentIndex + 1;

	      // If we are at the last option, stay there
	      if (nextIndex >= $options.length) {
	        return;
	      }

	      var $next = $options.eq(nextIndex);

	      $next.trigger('mouseenter');

	      var currentOffset = self.$results.offset().top +
	        self.$results.outerHeight(false);
	      var nextBottom = $next.offset().top + $next.outerHeight(false);
	      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

	      if (nextIndex === 0) {
	        self.$results.scrollTop(0);
	      } else if (nextBottom > currentOffset) {
	        self.$results.scrollTop(nextOffset);
	      }
	    });

	    container.on('results:focus', function (params) {
	      params.element.addClass('select2-results__option--highlighted');
	    });

	    container.on('results:message', function (params) {
	      self.displayMessage(params);
	    });

	    if ($.fn.mousewheel) {
	      this.$results.on('mousewheel', function (e) {
	        var top = self.$results.scrollTop();

	        var bottom = (
	          self.$results.get(0).scrollHeight -
	          self.$results.scrollTop() +
	          e.deltaY
	        );

	        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
	        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

	        if (isAtTop) {
	          self.$results.scrollTop(0);

	          e.preventDefault();
	          e.stopPropagation();
	        } else if (isAtBottom) {
	          self.$results.scrollTop(
	            self.$results.get(0).scrollHeight - self.$results.height()
	          );

	          e.preventDefault();
	          e.stopPropagation();
	        }
	      });
	    }

	    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
	      function (evt) {
	      var $this = $(this);

	      var data = $this.data('data');

	      if ($this.attr('aria-selected') === 'true') {
	        if (self.options.get('multiple')) {
	          self.trigger('unselect', {
	            originalEvent: evt,
	            data: data
	          });
	        } else {
	          self.trigger('close');
	        }

	        return;
	      }

	      self.trigger('select', {
	        originalEvent: evt,
	        data: data
	      });
	    });

	    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
	      function (evt) {
	      var data = $(this).data('data');

	      self.getHighlightedResults()
	          .removeClass('select2-results__option--highlighted');

	      self.trigger('results:focus', {
	        data: data,
	        element: $(this)
	      });
	    });
	  };

	  Results.prototype.getHighlightedResults = function () {
	    var $highlighted = this.$results
	    .find('.select2-results__option--highlighted');

	    return $highlighted;
	  };

	  Results.prototype.destroy = function () {
	    this.$results.remove();
	  };

	  Results.prototype.ensureHighlightVisible = function () {
	    var $highlighted = this.getHighlightedResults();

	    if ($highlighted.length === 0) {
	      return;
	    }

	    var $options = this.$results.find('[aria-selected]');

	    var currentIndex = $options.index($highlighted);

	    var currentOffset = this.$results.offset().top;
	    var nextTop = $highlighted.offset().top;
	    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

	    var offsetDelta = nextTop - currentOffset;
	    nextOffset -= $highlighted.outerHeight(false) * 2;

	    if (currentIndex <= 2) {
	      this.$results.scrollTop(0);
	    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
	      this.$results.scrollTop(nextOffset);
	    }
	  };

	  Results.prototype.template = function (result, container) {
	    var template = this.options.get('templateResult');
	    var escapeMarkup = this.options.get('escapeMarkup');

	    var content = template(result);

	    if (content == null) {
	      container.style.display = 'none';
	    } else if (typeof content === 'string') {
	      container.innerHTML = escapeMarkup(content);
	    } else {
	      $(container).append(content);
	    }
	  };

	  return Results;
	});

	S2.define('select2/keys',[

	], function () {
	  var KEYS = {
	    BACKSPACE: 8,
	    TAB: 9,
	    ENTER: 13,
	    SHIFT: 16,
	    CTRL: 17,
	    ALT: 18,
	    ESC: 27,
	    SPACE: 32,
	    PAGE_UP: 33,
	    PAGE_DOWN: 34,
	    END: 35,
	    HOME: 36,
	    LEFT: 37,
	    UP: 38,
	    RIGHT: 39,
	    DOWN: 40,
	    DELETE: 46
	  };

	  return KEYS;
	});

	S2.define('select2/selection/base',[
	  'jquery',
	  '../utils',
	  '../keys'
	], function ($, Utils, KEYS) {
	  function BaseSelection ($element, options) {
	    this.$element = $element;
	    this.options = options;

	    BaseSelection.__super__.constructor.call(this);
	  }

	  Utils.Extend(BaseSelection, Utils.Observable);

	  BaseSelection.prototype.render = function () {
	    var $selection = $(
	      '<span class="select2-selection" role="combobox" ' +
	      'aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">' +
	      '</span>'
	    );

	    this._tabindex = 0;

	    if (this.$element.data('old-tabindex') != null) {
	      this._tabindex = this.$element.data('old-tabindex');
	    } else if (this.$element.attr('tabindex') != null) {
	      this._tabindex = this.$element.attr('tabindex');
	    }

	    $selection.attr('title', this.$element.attr('title'));
	    $selection.attr('tabindex', this._tabindex);

	    this.$selection = $selection;

	    return $selection;
	  };

	  BaseSelection.prototype.bind = function (container, $container) {
	    var self = this;

	    var id = container.id + '-container';
	    var resultsId = container.id + '-results';

	    this.container = container;

	    this.$selection.on('focus', function (evt) {
	      self.trigger('focus', evt);
	    });

	    this.$selection.on('blur', function (evt) {
	      self.trigger('blur', evt);
	    });

	    this.$selection.on('keydown', function (evt) {
	      self.trigger('keypress', evt);

	      if (evt.which === KEYS.SPACE) {
	        evt.preventDefault();
	      }
	    });

	    container.on('results:focus', function (params) {
	      self.$selection.attr('aria-activedescendant', params.data._resultId);
	    });

	    container.on('selection:update', function (params) {
	      self.update(params.data);
	    });

	    container.on('open', function () {
	      // When the dropdown is open, aria-expanded="true"
	      self.$selection.attr('aria-expanded', 'true');
	      self.$selection.attr('aria-owns', resultsId);

	      self._attachCloseHandler(container);
	    });

	    container.on('close', function () {
	      // When the dropdown is closed, aria-expanded="false"
	      self.$selection.attr('aria-expanded', 'false');
	      self.$selection.removeAttr('aria-activedescendant');
	      self.$selection.removeAttr('aria-owns');

	      self.$selection.focus();

	      self._detachCloseHandler(container);
	    });

	    container.on('enable', function () {
	      self.$selection.attr('tabindex', self._tabindex);
	    });

	    container.on('disable', function () {
	      self.$selection.attr('tabindex', '-1');
	    });
	  };

	  BaseSelection.prototype._attachCloseHandler = function (container) {
	    var self = this;

	    $(document.body).on('mousedown.select2.' + container.id, function (e) {
	      var $target = $(e.target);

	      var $select = $target.closest('.select2');

	      var $all = $('.select2.select2-container--open');

	      $all.each(function () {
	        var $this = $(this);

	        if (this == $select[0]) {
	          return;
	        }

	        var $element = $this.data('element');

	        $element.select2('close');
	      });
	    });
	  };

	  BaseSelection.prototype._detachCloseHandler = function (container) {
	    $(document.body).off('mousedown.select2.' + container.id);
	  };

	  BaseSelection.prototype.position = function ($selection, $container) {
	    var $selectionContainer = $container.find('.selection');
	    $selectionContainer.append($selection);
	  };

	  BaseSelection.prototype.destroy = function () {
	    this._detachCloseHandler(this.container);
	  };

	  BaseSelection.prototype.update = function (data) {
	    throw new Error('The `update` method must be defined in child classes.');
	  };

	  return BaseSelection;
	});

	S2.define('select2/selection/single',[
	  'jquery',
	  './base',
	  '../utils',
	  '../keys'
	], function ($, BaseSelection, Utils, KEYS) {
	  function SingleSelection () {
	    SingleSelection.__super__.constructor.apply(this, arguments);
	  }

	  Utils.Extend(SingleSelection, BaseSelection);

	  SingleSelection.prototype.render = function () {
	    var $selection = SingleSelection.__super__.render.call(this);

	    $selection.addClass('select2-selection--single');

	    $selection.html(
	      '<span class="select2-selection__rendered"></span>' +
	      '<span class="select2-selection__arrow" role="presentation">' +
	        '<b role="presentation"></b>' +
	      '</span>'
	    );

	    return $selection;
	  };

	  SingleSelection.prototype.bind = function (container, $container) {
	    var self = this;

	    SingleSelection.__super__.bind.apply(this, arguments);

	    var id = container.id + '-container';

	    this.$selection.find('.select2-selection__rendered').attr('id', id);
	    this.$selection.attr('aria-labelledby', id);

	    this.$selection.on('mousedown', function (evt) {
	      // Only respond to left clicks
	      if (evt.which !== 1) {
	        return;
	      }

	      self.trigger('toggle', {
	        originalEvent: evt
	      });
	    });

	    this.$selection.on('focus', function (evt) {
	      // User focuses on the container
	    });

	    this.$selection.on('blur', function (evt) {
	      // User exits the container
	    });

	    container.on('selection:update', function (params) {
	      self.update(params.data);
	    });
	  };

	  SingleSelection.prototype.clear = function () {
	    this.$selection.find('.select2-selection__rendered').empty();
	  };

	  SingleSelection.prototype.display = function (data) {
	    var template = this.options.get('templateSelection');
	    var escapeMarkup = this.options.get('escapeMarkup');

	    return escapeMarkup(template(data));
	  };

	  SingleSelection.prototype.selectionContainer = function () {
	    return $('<span></span>');
	  };

	  SingleSelection.prototype.update = function (data) {
	    if (data.length === 0) {
	      this.clear();
	      return;
	    }

	    var selection = data[0];

	    var formatted = this.display(selection);

	    var $rendered = this.$selection.find('.select2-selection__rendered');
	    $rendered.empty().append(formatted);
	    $rendered.prop('title', selection.title || selection.text);
	  };

	  return SingleSelection;
	});

	S2.define('select2/selection/multiple',[
	  'jquery',
	  './base',
	  '../utils'
	], function ($, BaseSelection, Utils) {
	  function MultipleSelection ($element, options) {
	    MultipleSelection.__super__.constructor.apply(this, arguments);
	  }

	  Utils.Extend(MultipleSelection, BaseSelection);

	  MultipleSelection.prototype.render = function () {
	    var $selection = MultipleSelection.__super__.render.call(this);

	    $selection.addClass('select2-selection--multiple');

	    $selection.html(
	      '<ul class="select2-selection__rendered"></ul>'
	    );

	    return $selection;
	  };

	  MultipleSelection.prototype.bind = function (container, $container) {
	    var self = this;

	    MultipleSelection.__super__.bind.apply(this, arguments);

	    this.$selection.on('click', function (evt) {
	      self.trigger('toggle', {
	        originalEvent: evt
	      });
	    });

	    this.$selection.on('click', '.select2-selection__choice__remove',
	      function (evt) {
	      var $remove = $(this);
	      var $selection = $remove.parent();

	      var data = $selection.data('data');

	      self.trigger('unselect', {
	        originalEvent: evt,
	        data: data
	      });
	    });
	  };

	  MultipleSelection.prototype.clear = function () {
	    this.$selection.find('.select2-selection__rendered').empty();
	  };

	  MultipleSelection.prototype.display = function (data) {
	    var template = this.options.get('templateSelection');
	    var escapeMarkup = this.options.get('escapeMarkup');

	    return escapeMarkup(template(data));
	  };

	  MultipleSelection.prototype.selectionContainer = function () {
	    var $container = $(
	      '<li class="select2-selection__choice">' +
	        '<span class="select2-selection__choice__remove" role="presentation">' +
	          '&times;' +
	        '</span>' +
	      '</li>'
	    );

	    return $container;
	  };

	  MultipleSelection.prototype.update = function (data) {
	    this.clear();

	    if (data.length === 0) {
	      return;
	    }

	    var $selections = [];

	    for (var d = 0; d < data.length; d++) {
	      var selection = data[d];

	      var formatted = this.display(selection);
	      var $selection = this.selectionContainer();

	      $selection.append(formatted);
	      $selection.prop('title', selection.title || selection.text);

	      $selection.data('data', selection);

	      $selections.push($selection);
	    }

	    var $rendered = this.$selection.find('.select2-selection__rendered');

	    Utils.appendMany($rendered, $selections);
	  };

	  return MultipleSelection;
	});

	S2.define('select2/selection/placeholder',[
	  '../utils'
	], function (Utils) {
	  function Placeholder (decorated, $element, options) {
	    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

	    decorated.call(this, $element, options);
	  }

	  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
	    if (typeof placeholder === 'string') {
	      placeholder = {
	        id: '',
	        text: placeholder
	      };
	    }

	    return placeholder;
	  };

	  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
	    var $placeholder = this.selectionContainer();

	    $placeholder.html(this.display(placeholder));
	    $placeholder.addClass('select2-selection__placeholder')
	                .removeClass('select2-selection__choice');

	    return $placeholder;
	  };

	  Placeholder.prototype.update = function (decorated, data) {
	    var singlePlaceholder = (
	      data.length == 1 && data[0].id != this.placeholder.id
	    );
	    var multipleSelections = data.length > 1;

	    if (multipleSelections || singlePlaceholder) {
	      return decorated.call(this, data);
	    }

	    this.clear();

	    var $placeholder = this.createPlaceholder(this.placeholder);

	    this.$selection.find('.select2-selection__rendered').append($placeholder);
	  };

	  return Placeholder;
	});

	S2.define('select2/selection/allowClear',[
	  'jquery',
	  '../keys'
	], function ($, KEYS) {
	  function AllowClear () { }

	  AllowClear.prototype.bind = function (decorated, container, $container) {
	    var self = this;

	    decorated.call(this, container, $container);

	    if (this.placeholder == null) {
	      if (this.options.get('debug') && window.console && console.error) {
	        console.error(
	          'Select2: The `allowClear` option should be used in combination ' +
	          'with the `placeholder` option.'
	        );
	      }
	    }

	    this.$selection.on('mousedown', '.select2-selection__clear',
	      function (evt) {
	        self._handleClear(evt);
	    });

	    container.on('keypress', function (evt) {
	      self._handleKeyboardClear(evt, container);
	    });
	  };

	  AllowClear.prototype._handleClear = function (_, evt) {
	    // Ignore the event if it is disabled
	    if (this.options.get('disabled')) {
	      return;
	    }

	    var $clear = this.$selection.find('.select2-selection__clear');

	    // Ignore the event if nothing has been selected
	    if ($clear.length === 0) {
	      return;
	    }

	    evt.stopPropagation();

	    var data = $clear.data('data');

	    for (var d = 0; d < data.length; d++) {
	      var unselectData = {
	        data: data[d]
	      };

	      // Trigger the `unselect` event, so people can prevent it from being
	      // cleared.
	      this.trigger('unselect', unselectData);

	      // If the event was prevented, don't clear it out.
	      if (unselectData.prevented) {
	        return;
	      }
	    }

	    this.$element.val(this.placeholder.id).trigger('change');

	    this.trigger('toggle');
	  };

	  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
	    if (container.isOpen()) {
	      return;
	    }

	    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
	      this._handleClear(evt);
	    }
	  };

	  AllowClear.prototype.update = function (decorated, data) {
	    decorated.call(this, data);

	    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
	        data.length === 0) {
	      return;
	    }

	    var $remove = $(
	      '<span class="select2-selection__clear">' +
	        '&times;' +
	      '</span>'
	    );
	    $remove.data('data', data);

	    this.$selection.find('.select2-selection__rendered').prepend($remove);
	  };

	  return AllowClear;
	});

	S2.define('select2/selection/search',[
	  'jquery',
	  '../utils',
	  '../keys'
	], function ($, Utils, KEYS) {
	  function Search (decorated, $element, options) {
	    decorated.call(this, $element, options);
	  }

	  Search.prototype.render = function (decorated) {
	    var $search = $(
	      '<li class="select2-search select2-search--inline">' +
	        '<input class="select2-search__field" type="search" tabindex="-1"' +
	        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
	        ' spellcheck="false" role="textbox" />' +
	      '</li>'
	    );

	    this.$searchContainer = $search;
	    this.$search = $search.find('input');

	    var $rendered = decorated.call(this);

	    return $rendered;
	  };

	  Search.prototype.bind = function (decorated, container, $container) {
	    var self = this;

	    decorated.call(this, container, $container);

	    container.on('open', function () {
	      self.$search.attr('tabindex', 0);

	      self.$search.focus();
	    });

	    container.on('close', function () {
	      self.$search.attr('tabindex', -1);

	      self.$search.val('');
	      self.$search.focus();
	    });

	    container.on('enable', function () {
	      self.$search.prop('disabled', false);
	    });

	    container.on('disable', function () {
	      self.$search.prop('disabled', true);
	    });

	    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
	      self.trigger('focus', evt);
	    });

	    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
	      self.trigger('blur', evt);
	    });

	    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
	      evt.stopPropagation();

	      self.trigger('keypress', evt);

	      self._keyUpPrevented = evt.isDefaultPrevented();

	      var key = evt.which;

	      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
	        var $previousChoice = self.$searchContainer
	          .prev('.select2-selection__choice');

	        if ($previousChoice.length > 0) {
	          var item = $previousChoice.data('data');

	          self.searchRemoveChoice(item);

	          evt.preventDefault();
	        }
	      }
	    });

	    // Workaround for browsers which do not support the `input` event
	    // This will prevent double-triggering of events for browsers which support
	    // both the `keyup` and `input` events.
	    this.$selection.on('input', '.select2-search--inline', function (evt) {
	      // Unbind the duplicated `keyup` event
	      self.$selection.off('keyup.search');
	    });

	    this.$selection.on('keyup.search input', '.select2-search--inline',
	        function (evt) {
	      self.handleSearch(evt);
	    });
	  };

	  Search.prototype.createPlaceholder = function (decorated, placeholder) {
	    this.$search.attr('placeholder', placeholder.text);
	  };

	  Search.prototype.update = function (decorated, data) {
	    this.$search.attr('placeholder', '');

	    decorated.call(this, data);

	    this.$selection.find('.select2-selection__rendered')
	                   .append(this.$searchContainer);

	    this.resizeSearch();
	  };

	  Search.prototype.handleSearch = function () {
	    this.resizeSearch();

	    if (!this._keyUpPrevented) {
	      var input = this.$search.val();

	      this.trigger('query', {
	        term: input
	      });
	    }

	    this._keyUpPrevented = false;
	  };

	  Search.prototype.searchRemoveChoice = function (decorated, item) {
	    this.trigger('unselect', {
	      data: item
	    });

	    this.trigger('open');

	    this.$search.val(item.text + ' ');
	  };

	  Search.prototype.resizeSearch = function () {
	    this.$search.css('width', '25px');

	    var width = '';

	    if (this.$search.attr('placeholder') !== '') {
	      width = this.$selection.find('.select2-selection__rendered').innerWidth();
	    } else {
	      var minimumWidth = this.$search.val().length + 1;

	      width = (minimumWidth * 0.75) + 'em';
	    }

	    this.$search.css('width', width);
	  };

	  return Search;
	});

	S2.define('select2/selection/eventRelay',[
	  'jquery'
	], function ($) {
	  function EventRelay () { }

	  EventRelay.prototype.bind = function (decorated, container, $container) {
	    var self = this;
	    var relayEvents = [
	      'open', 'opening',
	      'close', 'closing',
	      'select', 'selecting',
	      'unselect', 'unselecting'
	    ];

	    var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

	    decorated.call(this, container, $container);

	    container.on('*', function (name, params) {
	      // Ignore events that should not be relayed
	      if ($.inArray(name, relayEvents) === -1) {
	        return;
	      }

	      // The parameters should always be an object
	      params = params || {};

	      // Generate the jQuery event for the Select2 event
	      var evt = $.Event('select2:' + name, {
	        params: params
	      });

	      self.$element.trigger(evt);

	      // Only handle preventable events if it was one
	      if ($.inArray(name, preventableEvents) === -1) {
	        return;
	      }

	      params.prevented = evt.isDefaultPrevented();
	    });
	  };

	  return EventRelay;
	});

	S2.define('select2/translation',[
	  'jquery',
	  'require'
	], function ($, require) {
	  function Translation (dict) {
	    this.dict = dict || {};
	  }

	  Translation.prototype.all = function () {
	    return this.dict;
	  };

	  Translation.prototype.get = function (key) {
	    return this.dict[key];
	  };

	  Translation.prototype.extend = function (translation) {
	    this.dict = $.extend({}, translation.all(), this.dict);
	  };

	  // Static functions

	  Translation._cache = {};

	  Translation.loadPath = function (path) {
	    if (!(path in Translation._cache)) {
	      var translations = require(path);

	      Translation._cache[path] = translations;
	    }

	    return new Translation(Translation._cache[path]);
	  };

	  return Translation;
	});

	S2.define('select2/diacritics',[

	], function () {
	  var diacritics = {
	    '\u24B6': 'A',
	    '\uFF21': 'A',
	    '\u00C0': 'A',
	    '\u00C1': 'A',
	    '\u00C2': 'A',
	    '\u1EA6': 'A',
	    '\u1EA4': 'A',
	    '\u1EAA': 'A',
	    '\u1EA8': 'A',
	    '\u00C3': 'A',
	    '\u0100': 'A',
	    '\u0102': 'A',
	    '\u1EB0': 'A',
	    '\u1EAE': 'A',
	    '\u1EB4': 'A',
	    '\u1EB2': 'A',
	    '\u0226': 'A',
	    '\u01E0': 'A',
	    '\u00C4': 'A',
	    '\u01DE': 'A',
	    '\u1EA2': 'A',
	    '\u00C5': 'A',
	    '\u01FA': 'A',
	    '\u01CD': 'A',
	    '\u0200': 'A',
	    '\u0202': 'A',
	    '\u1EA0': 'A',
	    '\u1EAC': 'A',
	    '\u1EB6': 'A',
	    '\u1E00': 'A',
	    '\u0104': 'A',
	    '\u023A': 'A',
	    '\u2C6F': 'A',
	    '\uA732': 'AA',
	    '\u00C6': 'AE',
	    '\u01FC': 'AE',
	    '\u01E2': 'AE',
	    '\uA734': 'AO',
	    '\uA736': 'AU',
	    '\uA738': 'AV',
	    '\uA73A': 'AV',
	    '\uA73C': 'AY',
	    '\u24B7': 'B',
	    '\uFF22': 'B',
	    '\u1E02': 'B',
	    '\u1E04': 'B',
	    '\u1E06': 'B',
	    '\u0243': 'B',
	    '\u0182': 'B',
	    '\u0181': 'B',
	    '\u24B8': 'C',
	    '\uFF23': 'C',
	    '\u0106': 'C',
	    '\u0108': 'C',
	    '\u010A': 'C',
	    '\u010C': 'C',
	    '\u00C7': 'C',
	    '\u1E08': 'C',
	    '\u0187': 'C',
	    '\u023B': 'C',
	    '\uA73E': 'C',
	    '\u24B9': 'D',
	    '\uFF24': 'D',
	    '\u1E0A': 'D',
	    '\u010E': 'D',
	    '\u1E0C': 'D',
	    '\u1E10': 'D',
	    '\u1E12': 'D',
	    '\u1E0E': 'D',
	    '\u0110': 'D',
	    '\u018B': 'D',
	    '\u018A': 'D',
	    '\u0189': 'D',
	    '\uA779': 'D',
	    '\u01F1': 'DZ',
	    '\u01C4': 'DZ',
	    '\u01F2': 'Dz',
	    '\u01C5': 'Dz',
	    '\u24BA': 'E',
	    '\uFF25': 'E',
	    '\u00C8': 'E',
	    '\u00C9': 'E',
	    '\u00CA': 'E',
	    '\u1EC0': 'E',
	    '\u1EBE': 'E',
	    '\u1EC4': 'E',
	    '\u1EC2': 'E',
	    '\u1EBC': 'E',
	    '\u0112': 'E',
	    '\u1E14': 'E',
	    '\u1E16': 'E',
	    '\u0114': 'E',
	    '\u0116': 'E',
	    '\u00CB': 'E',
	    '\u1EBA': 'E',
	    '\u011A': 'E',
	    '\u0204': 'E',
	    '\u0206': 'E',
	    '\u1EB8': 'E',
	    '\u1EC6': 'E',
	    '\u0228': 'E',
	    '\u1E1C': 'E',
	    '\u0118': 'E',
	    '\u1E18': 'E',
	    '\u1E1A': 'E',
	    '\u0190': 'E',
	    '\u018E': 'E',
	    '\u24BB': 'F',
	    '\uFF26': 'F',
	    '\u1E1E': 'F',
	    '\u0191': 'F',
	    '\uA77B': 'F',
	    '\u24BC': 'G',
	    '\uFF27': 'G',
	    '\u01F4': 'G',
	    '\u011C': 'G',
	    '\u1E20': 'G',
	    '\u011E': 'G',
	    '\u0120': 'G',
	    '\u01E6': 'G',
	    '\u0122': 'G',
	    '\u01E4': 'G',
	    '\u0193': 'G',
	    '\uA7A0': 'G',
	    '\uA77D': 'G',
	    '\uA77E': 'G',
	    '\u24BD': 'H',
	    '\uFF28': 'H',
	    '\u0124': 'H',
	    '\u1E22': 'H',
	    '\u1E26': 'H',
	    '\u021E': 'H',
	    '\u1E24': 'H',
	    '\u1E28': 'H',
	    '\u1E2A': 'H',
	    '\u0126': 'H',
	    '\u2C67': 'H',
	    '\u2C75': 'H',
	    '\uA78D': 'H',
	    '\u24BE': 'I',
	    '\uFF29': 'I',
	    '\u00CC': 'I',
	    '\u00CD': 'I',
	    '\u00CE': 'I',
	    '\u0128': 'I',
	    '\u012A': 'I',
	    '\u012C': 'I',
	    '\u0130': 'I',
	    '\u00CF': 'I',
	    '\u1E2E': 'I',
	    '\u1EC8': 'I',
	    '\u01CF': 'I',
	    '\u0208': 'I',
	    '\u020A': 'I',
	    '\u1ECA': 'I',
	    '\u012E': 'I',
	    '\u1E2C': 'I',
	    '\u0197': 'I',
	    '\u24BF': 'J',
	    '\uFF2A': 'J',
	    '\u0134': 'J',
	    '\u0248': 'J',
	    '\u24C0': 'K',
	    '\uFF2B': 'K',
	    '\u1E30': 'K',
	    '\u01E8': 'K',
	    '\u1E32': 'K',
	    '\u0136': 'K',
	    '\u1E34': 'K',
	    '\u0198': 'K',
	    '\u2C69': 'K',
	    '\uA740': 'K',
	    '\uA742': 'K',
	    '\uA744': 'K',
	    '\uA7A2': 'K',
	    '\u24C1': 'L',
	    '\uFF2C': 'L',
	    '\u013F': 'L',
	    '\u0139': 'L',
	    '\u013D': 'L',
	    '\u1E36': 'L',
	    '\u1E38': 'L',
	    '\u013B': 'L',
	    '\u1E3C': 'L',
	    '\u1E3A': 'L',
	    '\u0141': 'L',
	    '\u023D': 'L',
	    '\u2C62': 'L',
	    '\u2C60': 'L',
	    '\uA748': 'L',
	    '\uA746': 'L',
	    '\uA780': 'L',
	    '\u01C7': 'LJ',
	    '\u01C8': 'Lj',
	    '\u24C2': 'M',
	    '\uFF2D': 'M',
	    '\u1E3E': 'M',
	    '\u1E40': 'M',
	    '\u1E42': 'M',
	    '\u2C6E': 'M',
	    '\u019C': 'M',
	    '\u24C3': 'N',
	    '\uFF2E': 'N',
	    '\u01F8': 'N',
	    '\u0143': 'N',
	    '\u00D1': 'N',
	    '\u1E44': 'N',
	    '\u0147': 'N',
	    '\u1E46': 'N',
	    '\u0145': 'N',
	    '\u1E4A': 'N',
	    '\u1E48': 'N',
	    '\u0220': 'N',
	    '\u019D': 'N',
	    '\uA790': 'N',
	    '\uA7A4': 'N',
	    '\u01CA': 'NJ',
	    '\u01CB': 'Nj',
	    '\u24C4': 'O',
	    '\uFF2F': 'O',
	    '\u00D2': 'O',
	    '\u00D3': 'O',
	    '\u00D4': 'O',
	    '\u1ED2': 'O',
	    '\u1ED0': 'O',
	    '\u1ED6': 'O',
	    '\u1ED4': 'O',
	    '\u00D5': 'O',
	    '\u1E4C': 'O',
	    '\u022C': 'O',
	    '\u1E4E': 'O',
	    '\u014C': 'O',
	    '\u1E50': 'O',
	    '\u1E52': 'O',
	    '\u014E': 'O',
	    '\u022E': 'O',
	    '\u0230': 'O',
	    '\u00D6': 'O',
	    '\u022A': 'O',
	    '\u1ECE': 'O',
	    '\u0150': 'O',
	    '\u01D1': 'O',
	    '\u020C': 'O',
	    '\u020E': 'O',
	    '\u01A0': 'O',
	    '\u1EDC': 'O',
	    '\u1EDA': 'O',
	    '\u1EE0': 'O',
	    '\u1EDE': 'O',
	    '\u1EE2': 'O',
	    '\u1ECC': 'O',
	    '\u1ED8': 'O',
	    '\u01EA': 'O',
	    '\u01EC': 'O',
	    '\u00D8': 'O',
	    '\u01FE': 'O',
	    '\u0186': 'O',
	    '\u019F': 'O',
	    '\uA74A': 'O',
	    '\uA74C': 'O',
	    '\u01A2': 'OI',
	    '\uA74E': 'OO',
	    '\u0222': 'OU',
	    '\u24C5': 'P',
	    '\uFF30': 'P',
	    '\u1E54': 'P',
	    '\u1E56': 'P',
	    '\u01A4': 'P',
	    '\u2C63': 'P',
	    '\uA750': 'P',
	    '\uA752': 'P',
	    '\uA754': 'P',
	    '\u24C6': 'Q',
	    '\uFF31': 'Q',
	    '\uA756': 'Q',
	    '\uA758': 'Q',
	    '\u024A': 'Q',
	    '\u24C7': 'R',
	    '\uFF32': 'R',
	    '\u0154': 'R',
	    '\u1E58': 'R',
	    '\u0158': 'R',
	    '\u0210': 'R',
	    '\u0212': 'R',
	    '\u1E5A': 'R',
	    '\u1E5C': 'R',
	    '\u0156': 'R',
	    '\u1E5E': 'R',
	    '\u024C': 'R',
	    '\u2C64': 'R',
	    '\uA75A': 'R',
	    '\uA7A6': 'R',
	    '\uA782': 'R',
	    '\u24C8': 'S',
	    '\uFF33': 'S',
	    '\u1E9E': 'S',
	    '\u015A': 'S',
	    '\u1E64': 'S',
	    '\u015C': 'S',
	    '\u1E60': 'S',
	    '\u0160': 'S',
	    '\u1E66': 'S',
	    '\u1E62': 'S',
	    '\u1E68': 'S',
	    '\u0218': 'S',
	    '\u015E': 'S',
	    '\u2C7E': 'S',
	    '\uA7A8': 'S',
	    '\uA784': 'S',
	    '\u24C9': 'T',
	    '\uFF34': 'T',
	    '\u1E6A': 'T',
	    '\u0164': 'T',
	    '\u1E6C': 'T',
	    '\u021A': 'T',
	    '\u0162': 'T',
	    '\u1E70': 'T',
	    '\u1E6E': 'T',
	    '\u0166': 'T',
	    '\u01AC': 'T',
	    '\u01AE': 'T',
	    '\u023E': 'T',
	    '\uA786': 'T',
	    '\uA728': 'TZ',
	    '\u24CA': 'U',
	    '\uFF35': 'U',
	    '\u00D9': 'U',
	    '\u00DA': 'U',
	    '\u00DB': 'U',
	    '\u0168': 'U',
	    '\u1E78': 'U',
	    '\u016A': 'U',
	    '\u1E7A': 'U',
	    '\u016C': 'U',
	    '\u00DC': 'U',
	    '\u01DB': 'U',
	    '\u01D7': 'U',
	    '\u01D5': 'U',
	    '\u01D9': 'U',
	    '\u1EE6': 'U',
	    '\u016E': 'U',
	    '\u0170': 'U',
	    '\u01D3': 'U',
	    '\u0214': 'U',
	    '\u0216': 'U',
	    '\u01AF': 'U',
	    '\u1EEA': 'U',
	    '\u1EE8': 'U',
	    '\u1EEE': 'U',
	    '\u1EEC': 'U',
	    '\u1EF0': 'U',
	    '\u1EE4': 'U',
	    '\u1E72': 'U',
	    '\u0172': 'U',
	    '\u1E76': 'U',
	    '\u1E74': 'U',
	    '\u0244': 'U',
	    '\u24CB': 'V',
	    '\uFF36': 'V',
	    '\u1E7C': 'V',
	    '\u1E7E': 'V',
	    '\u01B2': 'V',
	    '\uA75E': 'V',
	    '\u0245': 'V',
	    '\uA760': 'VY',
	    '\u24CC': 'W',
	    '\uFF37': 'W',
	    '\u1E80': 'W',
	    '\u1E82': 'W',
	    '\u0174': 'W',
	    '\u1E86': 'W',
	    '\u1E84': 'W',
	    '\u1E88': 'W',
	    '\u2C72': 'W',
	    '\u24CD': 'X',
	    '\uFF38': 'X',
	    '\u1E8A': 'X',
	    '\u1E8C': 'X',
	    '\u24CE': 'Y',
	    '\uFF39': 'Y',
	    '\u1EF2': 'Y',
	    '\u00DD': 'Y',
	    '\u0176': 'Y',
	    '\u1EF8': 'Y',
	    '\u0232': 'Y',
	    '\u1E8E': 'Y',
	    '\u0178': 'Y',
	    '\u1EF6': 'Y',
	    '\u1EF4': 'Y',
	    '\u01B3': 'Y',
	    '\u024E': 'Y',
	    '\u1EFE': 'Y',
	    '\u24CF': 'Z',
	    '\uFF3A': 'Z',
	    '\u0179': 'Z',
	    '\u1E90': 'Z',
	    '\u017B': 'Z',
	    '\u017D': 'Z',
	    '\u1E92': 'Z',
	    '\u1E94': 'Z',
	    '\u01B5': 'Z',
	    '\u0224': 'Z',
	    '\u2C7F': 'Z',
	    '\u2C6B': 'Z',
	    '\uA762': 'Z',
	    '\u24D0': 'a',
	    '\uFF41': 'a',
	    '\u1E9A': 'a',
	    '\u00E0': 'a',
	    '\u00E1': 'a',
	    '\u00E2': 'a',
	    '\u1EA7': 'a',
	    '\u1EA5': 'a',
	    '\u1EAB': 'a',
	    '\u1EA9': 'a',
	    '\u00E3': 'a',
	    '\u0101': 'a',
	    '\u0103': 'a',
	    '\u1EB1': 'a',
	    '\u1EAF': 'a',
	    '\u1EB5': 'a',
	    '\u1EB3': 'a',
	    '\u0227': 'a',
	    '\u01E1': 'a',
	    '\u00E4': 'a',
	    '\u01DF': 'a',
	    '\u1EA3': 'a',
	    '\u00E5': 'a',
	    '\u01FB': 'a',
	    '\u01CE': 'a',
	    '\u0201': 'a',
	    '\u0203': 'a',
	    '\u1EA1': 'a',
	    '\u1EAD': 'a',
	    '\u1EB7': 'a',
	    '\u1E01': 'a',
	    '\u0105': 'a',
	    '\u2C65': 'a',
	    '\u0250': 'a',
	    '\uA733': 'aa',
	    '\u00E6': 'ae',
	    '\u01FD': 'ae',
	    '\u01E3': 'ae',
	    '\uA735': 'ao',
	    '\uA737': 'au',
	    '\uA739': 'av',
	    '\uA73B': 'av',
	    '\uA73D': 'ay',
	    '\u24D1': 'b',
	    '\uFF42': 'b',
	    '\u1E03': 'b',
	    '\u1E05': 'b',
	    '\u1E07': 'b',
	    '\u0180': 'b',
	    '\u0183': 'b',
	    '\u0253': 'b',
	    '\u24D2': 'c',
	    '\uFF43': 'c',
	    '\u0107': 'c',
	    '\u0109': 'c',
	    '\u010B': 'c',
	    '\u010D': 'c',
	    '\u00E7': 'c',
	    '\u1E09': 'c',
	    '\u0188': 'c',
	    '\u023C': 'c',
	    '\uA73F': 'c',
	    '\u2184': 'c',
	    '\u24D3': 'd',
	    '\uFF44': 'd',
	    '\u1E0B': 'd',
	    '\u010F': 'd',
	    '\u1E0D': 'd',
	    '\u1E11': 'd',
	    '\u1E13': 'd',
	    '\u1E0F': 'd',
	    '\u0111': 'd',
	    '\u018C': 'd',
	    '\u0256': 'd',
	    '\u0257': 'd',
	    '\uA77A': 'd',
	    '\u01F3': 'dz',
	    '\u01C6': 'dz',
	    '\u24D4': 'e',
	    '\uFF45': 'e',
	    '\u00E8': 'e',
	    '\u00E9': 'e',
	    '\u00EA': 'e',
	    '\u1EC1': 'e',
	    '\u1EBF': 'e',
	    '\u1EC5': 'e',
	    '\u1EC3': 'e',
	    '\u1EBD': 'e',
	    '\u0113': 'e',
	    '\u1E15': 'e',
	    '\u1E17': 'e',
	    '\u0115': 'e',
	    '\u0117': 'e',
	    '\u00EB': 'e',
	    '\u1EBB': 'e',
	    '\u011B': 'e',
	    '\u0205': 'e',
	    '\u0207': 'e',
	    '\u1EB9': 'e',
	    '\u1EC7': 'e',
	    '\u0229': 'e',
	    '\u1E1D': 'e',
	    '\u0119': 'e',
	    '\u1E19': 'e',
	    '\u1E1B': 'e',
	    '\u0247': 'e',
	    '\u025B': 'e',
	    '\u01DD': 'e',
	    '\u24D5': 'f',
	    '\uFF46': 'f',
	    '\u1E1F': 'f',
	    '\u0192': 'f',
	    '\uA77C': 'f',
	    '\u24D6': 'g',
	    '\uFF47': 'g',
	    '\u01F5': 'g',
	    '\u011D': 'g',
	    '\u1E21': 'g',
	    '\u011F': 'g',
	    '\u0121': 'g',
	    '\u01E7': 'g',
	    '\u0123': 'g',
	    '\u01E5': 'g',
	    '\u0260': 'g',
	    '\uA7A1': 'g',
	    '\u1D79': 'g',
	    '\uA77F': 'g',
	    '\u24D7': 'h',
	    '\uFF48': 'h',
	    '\u0125': 'h',
	    '\u1E23': 'h',
	    '\u1E27': 'h',
	    '\u021F': 'h',
	    '\u1E25': 'h',
	    '\u1E29': 'h',
	    '\u1E2B': 'h',
	    '\u1E96': 'h',
	    '\u0127': 'h',
	    '\u2C68': 'h',
	    '\u2C76': 'h',
	    '\u0265': 'h',
	    '\u0195': 'hv',
	    '\u24D8': 'i',
	    '\uFF49': 'i',
	    '\u00EC': 'i',
	    '\u00ED': 'i',
	    '\u00EE': 'i',
	    '\u0129': 'i',
	    '\u012B': 'i',
	    '\u012D': 'i',
	    '\u00EF': 'i',
	    '\u1E2F': 'i',
	    '\u1EC9': 'i',
	    '\u01D0': 'i',
	    '\u0209': 'i',
	    '\u020B': 'i',
	    '\u1ECB': 'i',
	    '\u012F': 'i',
	    '\u1E2D': 'i',
	    '\u0268': 'i',
	    '\u0131': 'i',
	    '\u24D9': 'j',
	    '\uFF4A': 'j',
	    '\u0135': 'j',
	    '\u01F0': 'j',
	    '\u0249': 'j',
	    '\u24DA': 'k',
	    '\uFF4B': 'k',
	    '\u1E31': 'k',
	    '\u01E9': 'k',
	    '\u1E33': 'k',
	    '\u0137': 'k',
	    '\u1E35': 'k',
	    '\u0199': 'k',
	    '\u2C6A': 'k',
	    '\uA741': 'k',
	    '\uA743': 'k',
	    '\uA745': 'k',
	    '\uA7A3': 'k',
	    '\u24DB': 'l',
	    '\uFF4C': 'l',
	    '\u0140': 'l',
	    '\u013A': 'l',
	    '\u013E': 'l',
	    '\u1E37': 'l',
	    '\u1E39': 'l',
	    '\u013C': 'l',
	    '\u1E3D': 'l',
	    '\u1E3B': 'l',
	    '\u017F': 'l',
	    '\u0142': 'l',
	    '\u019A': 'l',
	    '\u026B': 'l',
	    '\u2C61': 'l',
	    '\uA749': 'l',
	    '\uA781': 'l',
	    '\uA747': 'l',
	    '\u01C9': 'lj',
	    '\u24DC': 'm',
	    '\uFF4D': 'm',
	    '\u1E3F': 'm',
	    '\u1E41': 'm',
	    '\u1E43': 'm',
	    '\u0271': 'm',
	    '\u026F': 'm',
	    '\u24DD': 'n',
	    '\uFF4E': 'n',
	    '\u01F9': 'n',
	    '\u0144': 'n',
	    '\u00F1': 'n',
	    '\u1E45': 'n',
	    '\u0148': 'n',
	    '\u1E47': 'n',
	    '\u0146': 'n',
	    '\u1E4B': 'n',
	    '\u1E49': 'n',
	    '\u019E': 'n',
	    '\u0272': 'n',
	    '\u0149': 'n',
	    '\uA791': 'n',
	    '\uA7A5': 'n',
	    '\u01CC': 'nj',
	    '\u24DE': 'o',
	    '\uFF4F': 'o',
	    '\u00F2': 'o',
	    '\u00F3': 'o',
	    '\u00F4': 'o',
	    '\u1ED3': 'o',
	    '\u1ED1': 'o',
	    '\u1ED7': 'o',
	    '\u1ED5': 'o',
	    '\u00F5': 'o',
	    '\u1E4D': 'o',
	    '\u022D': 'o',
	    '\u1E4F': 'o',
	    '\u014D': 'o',
	    '\u1E51': 'o',
	    '\u1E53': 'o',
	    '\u014F': 'o',
	    '\u022F': 'o',
	    '\u0231': 'o',
	    '\u00F6': 'o',
	    '\u022B': 'o',
	    '\u1ECF': 'o',
	    '\u0151': 'o',
	    '\u01D2': 'o',
	    '\u020D': 'o',
	    '\u020F': 'o',
	    '\u01A1': 'o',
	    '\u1EDD': 'o',
	    '\u1EDB': 'o',
	    '\u1EE1': 'o',
	    '\u1EDF': 'o',
	    '\u1EE3': 'o',
	    '\u1ECD': 'o',
	    '\u1ED9': 'o',
	    '\u01EB': 'o',
	    '\u01ED': 'o',
	    '\u00F8': 'o',
	    '\u01FF': 'o',
	    '\u0254': 'o',
	    '\uA74B': 'o',
	    '\uA74D': 'o',
	    '\u0275': 'o',
	    '\u01A3': 'oi',
	    '\u0223': 'ou',
	    '\uA74F': 'oo',
	    '\u24DF': 'p',
	    '\uFF50': 'p',
	    '\u1E55': 'p',
	    '\u1E57': 'p',
	    '\u01A5': 'p',
	    '\u1D7D': 'p',
	    '\uA751': 'p',
	    '\uA753': 'p',
	    '\uA755': 'p',
	    '\u24E0': 'q',
	    '\uFF51': 'q',
	    '\u024B': 'q',
	    '\uA757': 'q',
	    '\uA759': 'q',
	    '\u24E1': 'r',
	    '\uFF52': 'r',
	    '\u0155': 'r',
	    '\u1E59': 'r',
	    '\u0159': 'r',
	    '\u0211': 'r',
	    '\u0213': 'r',
	    '\u1E5B': 'r',
	    '\u1E5D': 'r',
	    '\u0157': 'r',
	    '\u1E5F': 'r',
	    '\u024D': 'r',
	    '\u027D': 'r',
	    '\uA75B': 'r',
	    '\uA7A7': 'r',
	    '\uA783': 'r',
	    '\u24E2': 's',
	    '\uFF53': 's',
	    '\u00DF': 's',
	    '\u015B': 's',
	    '\u1E65': 's',
	    '\u015D': 's',
	    '\u1E61': 's',
	    '\u0161': 's',
	    '\u1E67': 's',
	    '\u1E63': 's',
	    '\u1E69': 's',
	    '\u0219': 's',
	    '\u015F': 's',
	    '\u023F': 's',
	    '\uA7A9': 's',
	    '\uA785': 's',
	    '\u1E9B': 's',
	    '\u24E3': 't',
	    '\uFF54': 't',
	    '\u1E6B': 't',
	    '\u1E97': 't',
	    '\u0165': 't',
	    '\u1E6D': 't',
	    '\u021B': 't',
	    '\u0163': 't',
	    '\u1E71': 't',
	    '\u1E6F': 't',
	    '\u0167': 't',
	    '\u01AD': 't',
	    '\u0288': 't',
	    '\u2C66': 't',
	    '\uA787': 't',
	    '\uA729': 'tz',
	    '\u24E4': 'u',
	    '\uFF55': 'u',
	    '\u00F9': 'u',
	    '\u00FA': 'u',
	    '\u00FB': 'u',
	    '\u0169': 'u',
	    '\u1E79': 'u',
	    '\u016B': 'u',
	    '\u1E7B': 'u',
	    '\u016D': 'u',
	    '\u00FC': 'u',
	    '\u01DC': 'u',
	    '\u01D8': 'u',
	    '\u01D6': 'u',
	    '\u01DA': 'u',
	    '\u1EE7': 'u',
	    '\u016F': 'u',
	    '\u0171': 'u',
	    '\u01D4': 'u',
	    '\u0215': 'u',
	    '\u0217': 'u',
	    '\u01B0': 'u',
	    '\u1EEB': 'u',
	    '\u1EE9': 'u',
	    '\u1EEF': 'u',
	    '\u1EED': 'u',
	    '\u1EF1': 'u',
	    '\u1EE5': 'u',
	    '\u1E73': 'u',
	    '\u0173': 'u',
	    '\u1E77': 'u',
	    '\u1E75': 'u',
	    '\u0289': 'u',
	    '\u24E5': 'v',
	    '\uFF56': 'v',
	    '\u1E7D': 'v',
	    '\u1E7F': 'v',
	    '\u028B': 'v',
	    '\uA75F': 'v',
	    '\u028C': 'v',
	    '\uA761': 'vy',
	    '\u24E6': 'w',
	    '\uFF57': 'w',
	    '\u1E81': 'w',
	    '\u1E83': 'w',
	    '\u0175': 'w',
	    '\u1E87': 'w',
	    '\u1E85': 'w',
	    '\u1E98': 'w',
	    '\u1E89': 'w',
	    '\u2C73': 'w',
	    '\u24E7': 'x',
	    '\uFF58': 'x',
	    '\u1E8B': 'x',
	    '\u1E8D': 'x',
	    '\u24E8': 'y',
	    '\uFF59': 'y',
	    '\u1EF3': 'y',
	    '\u00FD': 'y',
	    '\u0177': 'y',
	    '\u1EF9': 'y',
	    '\u0233': 'y',
	    '\u1E8F': 'y',
	    '\u00FF': 'y',
	    '\u1EF7': 'y',
	    '\u1E99': 'y',
	    '\u1EF5': 'y',
	    '\u01B4': 'y',
	    '\u024F': 'y',
	    '\u1EFF': 'y',
	    '\u24E9': 'z',
	    '\uFF5A': 'z',
	    '\u017A': 'z',
	    '\u1E91': 'z',
	    '\u017C': 'z',
	    '\u017E': 'z',
	    '\u1E93': 'z',
	    '\u1E95': 'z',
	    '\u01B6': 'z',
	    '\u0225': 'z',
	    '\u0240': 'z',
	    '\u2C6C': 'z',
	    '\uA763': 'z',
	    '\u0386': '\u0391',
	    '\u0388': '\u0395',
	    '\u0389': '\u0397',
	    '\u038A': '\u0399',
	    '\u03AA': '\u0399',
	    '\u038C': '\u039F',
	    '\u038E': '\u03A5',
	    '\u03AB': '\u03A5',
	    '\u038F': '\u03A9',
	    '\u03AC': '\u03B1',
	    '\u03AD': '\u03B5',
	    '\u03AE': '\u03B7',
	    '\u03AF': '\u03B9',
	    '\u03CA': '\u03B9',
	    '\u0390': '\u03B9',
	    '\u03CC': '\u03BF',
	    '\u03CD': '\u03C5',
	    '\u03CB': '\u03C5',
	    '\u03B0': '\u03C5',
	    '\u03C9': '\u03C9',
	    '\u03C2': '\u03C3'
	  };

	  return diacritics;
	});

	S2.define('select2/data/base',[
	  '../utils'
	], function (Utils) {
	  function BaseAdapter ($element, options) {
	    BaseAdapter.__super__.constructor.call(this);
	  }

	  Utils.Extend(BaseAdapter, Utils.Observable);

	  BaseAdapter.prototype.current = function (callback) {
	    throw new Error('The `current` method must be defined in child classes.');
	  };

	  BaseAdapter.prototype.query = function (params, callback) {
	    throw new Error('The `query` method must be defined in child classes.');
	  };

	  BaseAdapter.prototype.bind = function (container, $container) {
	    // Can be implemented in subclasses
	  };

	  BaseAdapter.prototype.destroy = function () {
	    // Can be implemented in subclasses
	  };

	  BaseAdapter.prototype.generateResultId = function (container, data) {
	    var id = container.id + '-result-';

	    id += Utils.generateChars(4);

	    if (data.id != null) {
	      id += '-' + data.id.toString();
	    } else {
	      id += '-' + Utils.generateChars(4);
	    }
	    return id;
	  };

	  return BaseAdapter;
	});

	S2.define('select2/data/select',[
	  './base',
	  '../utils',
	  'jquery'
	], function (BaseAdapter, Utils, $) {
	  function SelectAdapter ($element, options) {
	    this.$element = $element;
	    this.options = options;

	    SelectAdapter.__super__.constructor.call(this);
	  }

	  Utils.Extend(SelectAdapter, BaseAdapter);

	  SelectAdapter.prototype.current = function (callback) {
	    var data = [];
	    var self = this;

	    this.$element.find(':selected').each(function () {
	      var $option = $(this);

	      var option = self.item($option);

	      data.push(option);
	    });

	    callback(data);
	  };

	  SelectAdapter.prototype.select = function (data) {
	    var self = this;

	    data.selected = true;

	    // If data.element is a DOM node, use it instead
	    if ($(data.element).is('option')) {
	      data.element.selected = true;

	      this.$element.trigger('change');

	      return;
	    }

	    if (this.$element.prop('multiple')) {
	      this.current(function (currentData) {
	        var val = [];

	        data = [data];
	        data.push.apply(data, currentData);

	        for (var d = 0; d < data.length; d++) {
	          var id = data[d].id;

	          if ($.inArray(id, val) === -1) {
	            val.push(id);
	          }
	        }

	        self.$element.val(val);
	        self.$element.trigger('change');
	      });
	    } else {
	      var val = data.id;

	      this.$element.val(val);
	      this.$element.trigger('change');
	    }
	  };

	  SelectAdapter.prototype.unselect = function (data) {
	    var self = this;

	    if (!this.$element.prop('multiple')) {
	      return;
	    }

	    data.selected = false;

	    if ($(data.element).is('option')) {
	      data.element.selected = false;

	      this.$element.trigger('change');

	      return;
	    }

	    this.current(function (currentData) {
	      var val = [];

	      for (var d = 0; d < currentData.length; d++) {
	        var id = currentData[d].id;

	        if (id !== data.id && $.inArray(id, val) === -1) {
	          val.push(id);
	        }
	      }

	      self.$element.val(val);

	      self.$element.trigger('change');
	    });
	  };

	  SelectAdapter.prototype.bind = function (container, $container) {
	    var self = this;

	    this.container = container;

	    container.on('select', function (params) {
	      self.select(params.data);
	    });

	    container.on('unselect', function (params) {
	      self.unselect(params.data);
	    });
	  };

	  SelectAdapter.prototype.destroy = function () {
	    // Remove anything added to child elements
	    this.$element.find('*').each(function () {
	      // Remove any custom data set by Select2
	      $.removeData(this, 'data');
	    });
	  };

	  SelectAdapter.prototype.query = function (params, callback) {
	    var data = [];
	    var self = this;

	    var $options = this.$element.children();

	    $options.each(function () {
	      var $option = $(this);

	      if (!$option.is('option') && !$option.is('optgroup')) {
	        return;
	      }

	      var option = self.item($option);

	      var matches = self.matches(params, option);

	      if (matches !== null) {
	        data.push(matches);
	      }
	    });

	    callback({
	      results: data
	    });
	  };

	  SelectAdapter.prototype.addOptions = function ($options) {
	    Utils.appendMany(this.$element, $options);
	  };

	  SelectAdapter.prototype.option = function (data) {
	    var option;

	    if (data.children) {
	      option = document.createElement('optgroup');
	      option.label = data.text;
	    } else {
	      option = document.createElement('option');

	      if (option.textContent !== undefined) {
	        option.textContent = data.text;
	      } else {
	        option.innerText = data.text;
	      }
	    }

	    if (data.id) {
	      option.value = data.id;
	    }

	    if (data.disabled) {
	      option.disabled = true;
	    }

	    if (data.selected) {
	      option.selected = true;
	    }

	    if (data.title) {
	      option.title = data.title;
	    }

	    var $option = $(option);

	    var normalizedData = this._normalizeItem(data);
	    normalizedData.element = option;

	    // Override the option's data with the combined data
	    $.data(option, 'data', normalizedData);

	    return $option;
	  };

	  SelectAdapter.prototype.item = function ($option) {
	    var data = {};

	    data = $.data($option[0], 'data');

	    if (data != null) {
	      return data;
	    }

	    if ($option.is('option')) {
	      data = {
	        id: $option.val(),
	        text: $option.text(),
	        disabled: $option.prop('disabled'),
	        selected: $option.prop('selected'),
	        title: $option.prop('title')
	      };
	    } else if ($option.is('optgroup')) {
	      data = {
	        text: $option.prop('label'),
	        children: [],
	        title: $option.prop('title')
	      };

	      var $children = $option.children('option');
	      var children = [];

	      for (var c = 0; c < $children.length; c++) {
	        var $child = $($children[c]);

	        var child = this.item($child);

	        children.push(child);
	      }

	      data.children = children;
	    }

	    data = this._normalizeItem(data);
	    data.element = $option[0];

	    $.data($option[0], 'data', data);

	    return data;
	  };

	  SelectAdapter.prototype._normalizeItem = function (item) {
	    if (!$.isPlainObject(item)) {
	      item = {
	        id: item,
	        text: item
	      };
	    }

	    item = $.extend({}, {
	      text: ''
	    }, item);

	    var defaults = {
	      selected: false,
	      disabled: false
	    };

	    if (item.id != null) {
	      item.id = item.id.toString();
	    }

	    if (item.text != null) {
	      item.text = item.text.toString();
	    }

	    if (item._resultId == null && item.id && this.container != null) {
	      item._resultId = this.generateResultId(this.container, item);
	    }

	    return $.extend({}, defaults, item);
	  };

	  SelectAdapter.prototype.matches = function (params, data) {
	    var matcher = this.options.get('matcher');

	    return matcher(params, data);
	  };

	  return SelectAdapter;
	});

	S2.define('select2/data/array',[
	  './select',
	  '../utils',
	  'jquery'
	], function (SelectAdapter, Utils, $) {
	  function ArrayAdapter ($element, options) {
	    var data = options.get('data') || [];

	    ArrayAdapter.__super__.constructor.call(this, $element, options);

	    this.addOptions(this.convertToOptions(data));
	  }

	  Utils.Extend(ArrayAdapter, SelectAdapter);

	  ArrayAdapter.prototype.select = function (data) {
	    var $option = this.$element.find('option').filter(function (i, elm) {
	      return elm.value == data.id.toString();
	    });

	    if ($option.length === 0) {
	      $option = this.option(data);

	      this.addOptions($option);
	    }

	    ArrayAdapter.__super__.select.call(this, data);
	  };

	  ArrayAdapter.prototype.convertToOptions = function (data) {
	    var self = this;

	    var $existing = this.$element.find('option');
	    var existingIds = $existing.map(function () {
	      return self.item($(this)).id;
	    }).get();

	    var $options = [];

	    // Filter out all items except for the one passed in the argument
	    function onlyItem (item) {
	      return function () {
	        return $(this).val() == item.id;
	      };
	    }

	    for (var d = 0; d < data.length; d++) {
	      var item = this._normalizeItem(data[d]);

	      // Skip items which were pre-loaded, only merge the data
	      if ($.inArray(item.id, existingIds) >= 0) {
	        var $existingOption = $existing.filter(onlyItem(item));

	        var existingData = this.item($existingOption);
	        var newData = $.extend(true, {}, existingData, item);

	        var $newOption = this.option(existingData);

	        $existingOption.replaceWith($newOption);

	        continue;
	      }

	      var $option = this.option(item);

	      if (item.children) {
	        var $children = this.convertToOptions(item.children);

	        Utils.appendMany($option, $children);
	      }

	      $options.push($option);
	    }

	    return $options;
	  };

	  return ArrayAdapter;
	});

	S2.define('select2/data/ajax',[
	  './array',
	  '../utils',
	  'jquery'
	], function (ArrayAdapter, Utils, $) {
	  function AjaxAdapter ($element, options) {
	    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

	    if (this.ajaxOptions.processResults != null) {
	      this.processResults = this.ajaxOptions.processResults;
	    }

	    ArrayAdapter.__super__.constructor.call(this, $element, options);
	  }

	  Utils.Extend(AjaxAdapter, ArrayAdapter);

	  AjaxAdapter.prototype._applyDefaults = function (options) {
	    var defaults = {
	      data: function (params) {
	        return {
	          q: params.term
	        };
	      },
	      transport: function (params, success, failure) {
	        var $request = $.ajax(params);

	        $request.then(success);
	        $request.fail(failure);

	        return $request;
	      }
	    };

	    return $.extend({}, defaults, options, true);
	  };

	  AjaxAdapter.prototype.processResults = function (results) {
	    return results;
	  };

	  AjaxAdapter.prototype.query = function (params, callback) {
	    var matches = [];
	    var self = this;

	    if (this._request != null) {
	      // JSONP requests cannot always be aborted
	      if ($.isFunction(this._request.abort)) {
	        this._request.abort();
	      }

	      this._request = null;
	    }

	    var options = $.extend({
	      type: 'GET'
	    }, this.ajaxOptions);

	    if (typeof options.url === 'function') {
	      options.url = options.url(params);
	    }

	    if (typeof options.data === 'function') {
	      options.data = options.data(params);
	    }

	    function request () {
	      var $request = options.transport(options, function (data) {
	        var results = self.processResults(data, params);

	        if (self.options.get('debug') && window.console && console.error) {
	          // Check to make sure that the response included a `results` key.
	          if (!results || !results.results || !$.isArray(results.results)) {
	            console.error(
	              'Select2: The AJAX results did not return an array in the ' +
	              '`results` key of the response.'
	            );
	          }
	        }

	        callback(results);
	      }, function () {
	        // TODO: Handle AJAX errors
	      });

	      self._request = $request;
	    }

	    if (this.ajaxOptions.delay && params.term !== '') {
	      if (this._queryTimeout) {
	        window.clearTimeout(this._queryTimeout);
	      }

	      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
	    } else {
	      request();
	    }
	  };

	  return AjaxAdapter;
	});

	S2.define('select2/data/tags',[
	  'jquery'
	], function ($) {
	  function Tags (decorated, $element, options) {
	    var tags = options.get('tags');

	    var createTag = options.get('createTag');

	    if (createTag !== undefined) {
	      this.createTag = createTag;
	    }

	    decorated.call(this, $element, options);

	    if ($.isArray(tags)) {
	      for (var t = 0; t < tags.length; t++) {
	        var tag = tags[t];
	        var item = this._normalizeItem(tag);

	        var $option = this.option(item);

	        this.$element.append($option);
	      }
	    }
	  }

	  Tags.prototype.query = function (decorated, params, callback) {
	    var self = this;

	    this._removeOldTags();

	    if (params.term == null || params.page != null) {
	      decorated.call(this, params, callback);
	      return;
	    }

	    function wrapper (obj, child) {
	      var data = obj.results;

	      for (var i = 0; i < data.length; i++) {
	        var option = data[i];

	        var checkChildren = (
	          option.children != null &&
	          !wrapper({
	            results: option.children
	          }, true)
	        );

	        var checkText = option.text === params.term;

	        if (checkText || checkChildren) {
	          if (child) {
	            return false;
	          }

	          obj.data = data;
	          callback(obj);

	          return;
	        }
	      }

	      if (child) {
	        return true;
	      }

	      var tag = self.createTag(params);

	      if (tag != null) {
	        var $option = self.option(tag);
	        $option.attr('data-select2-tag', true);

	        self.addOptions([$option]);

	        self.insertTag(data, tag);
	      }

	      obj.results = data;

	      callback(obj);
	    }

	    decorated.call(this, params, wrapper);
	  };

	  Tags.prototype.createTag = function (decorated, params) {
	    var term = $.trim(params.term);

	    if (term === '') {
	      return null;
	    }

	    return {
	      id: term,
	      text: term
	    };
	  };

	  Tags.prototype.insertTag = function (_, data, tag) {
	    data.unshift(tag);
	  };

	  Tags.prototype._removeOldTags = function (_) {
	    var tag = this._lastTag;

	    var $options = this.$element.find('option[data-select2-tag]');

	    $options.each(function () {
	      if (this.selected) {
	        return;
	      }

	      $(this).remove();
	    });
	  };

	  return Tags;
	});

	S2.define('select2/data/tokenizer',[
	  'jquery'
	], function ($) {
	  function Tokenizer (decorated, $element, options) {
	    var tokenizer = options.get('tokenizer');

	    if (tokenizer !== undefined) {
	      this.tokenizer = tokenizer;
	    }

	    decorated.call(this, $element, options);
	  }

	  Tokenizer.prototype.bind = function (decorated, container, $container) {
	    decorated.call(this, container, $container);

	    this.$search =  container.dropdown.$search || container.selection.$search ||
	      $container.find('.select2-search__field');
	  };

	  Tokenizer.prototype.query = function (decorated, params, callback) {
	    var self = this;

	    function select (data) {
	      self.select(data);
	    }

	    params.term = params.term || '';

	    var tokenData = this.tokenizer(params, this.options, select);

	    if (tokenData.term !== params.term) {
	      // Replace the search term if we have the search box
	      if (this.$search.length) {
	        this.$search.val(tokenData.term);
	        this.$search.focus();
	      }

	      params.term = tokenData.term;
	    }

	    decorated.call(this, params, callback);
	  };

	  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
	    var separators = options.get('tokenSeparators') || [];
	    var term = params.term;
	    var i = 0;

	    var createTag = this.createTag || function (params) {
	      return {
	        id: params.term,
	        text: params.term
	      };
	    };

	    while (i < term.length) {
	      var termChar = term[i];

	      if ($.inArray(termChar, separators) === -1) {
	        i++;

	        continue;
	      }

	      var part = term.substr(0, i);
	      var partParams = $.extend({}, params, {
	        term: part
	      });

	      var data = createTag(partParams);

	      callback(data);

	      // Reset the term to not include the tokenized portion
	      term = term.substr(i + 1) || '';
	      i = 0;
	    }

	    return {
	      term: term
	    };
	  };

	  return Tokenizer;
	});

	S2.define('select2/data/minimumInputLength',[

	], function () {
	  function MinimumInputLength (decorated, $e, options) {
	    this.minimumInputLength = options.get('minimumInputLength');

	    decorated.call(this, $e, options);
	  }

	  MinimumInputLength.prototype.query = function (decorated, params, callback) {
	    params.term = params.term || '';

	    if (params.term.length < this.minimumInputLength) {
	      this.trigger('results:message', {
	        message: 'inputTooShort',
	        args: {
	          minimum: this.minimumInputLength,
	          input: params.term,
	          params: params
	        }
	      });

	      return;
	    }

	    decorated.call(this, params, callback);
	  };

	  return MinimumInputLength;
	});

	S2.define('select2/data/maximumInputLength',[

	], function () {
	  function MaximumInputLength (decorated, $e, options) {
	    this.maximumInputLength = options.get('maximumInputLength');

	    decorated.call(this, $e, options);
	  }

	  MaximumInputLength.prototype.query = function (decorated, params, callback) {
	    params.term = params.term || '';

	    if (this.maximumInputLength > 0 &&
	        params.term.length > this.maximumInputLength) {
	      this.trigger('results:message', {
	        message: 'inputTooLong',
	        args: {
	          maximum: this.maximumInputLength,
	          input: params.term,
	          params: params
	        }
	      });

	      return;
	    }

	    decorated.call(this, params, callback);
	  };

	  return MaximumInputLength;
	});

	S2.define('select2/data/maximumSelectionLength',[

	], function (){
	  function MaximumSelectionLength (decorated, $e, options) {
	    this.maximumSelectionLength = options.get('maximumSelectionLength');

	    decorated.call(this, $e, options);
	  }

	  MaximumSelectionLength.prototype.query =
	    function (decorated, params, callback) {
	      var self = this;

	      this.current(function (currentData) {
	        var count = currentData != null ? currentData.length : 0;
	        if (self.maximumSelectionLength > 0 &&
	          count >= self.maximumSelectionLength) {
	          self.trigger('results:message', {
	            message: 'maximumSelected',
	            args: {
	              maximum: self.maximumSelectionLength
	            }
	          });
	          return;
	        }
	        decorated.call(self, params, callback);
	      });
	  };

	  return MaximumSelectionLength;
	});

	S2.define('select2/dropdown',[
	  'jquery',
	  './utils'
	], function ($, Utils) {
	  function Dropdown ($element, options) {
	    this.$element = $element;
	    this.options = options;

	    Dropdown.__super__.constructor.call(this);
	  }

	  Utils.Extend(Dropdown, Utils.Observable);

	  Dropdown.prototype.render = function () {
	    var $dropdown = $(
	      '<span class="select2-dropdown">' +
	        '<span class="select2-results"></span>' +
	      '</span>'
	    );

	    $dropdown.attr('dir', this.options.get('dir'));

	    this.$dropdown = $dropdown;

	    return $dropdown;
	  };

	  Dropdown.prototype.position = function ($dropdown, $container) {
	    // Should be implmented in subclasses
	  };

	  Dropdown.prototype.destroy = function () {
	    // Remove the dropdown from the DOM
	    this.$dropdown.remove();
	  };

	  return Dropdown;
	});

	S2.define('select2/dropdown/search',[
	  'jquery',
	  '../utils'
	], function ($, Utils) {
	  function Search () { }

	  Search.prototype.render = function (decorated) {
	    var $rendered = decorated.call(this);

	    var $search = $(
	      '<span class="select2-search select2-search--dropdown">' +
	        '<input class="select2-search__field" type="search" tabindex="-1"' +
	        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
	        ' spellcheck="false" role="textbox" />' +
	      '</span>'
	    );

	    this.$searchContainer = $search;
	    this.$search = $search.find('input');

	    $rendered.prepend($search);

	    return $rendered;
	  };

	  Search.prototype.bind = function (decorated, container, $container) {
	    var self = this;

	    decorated.call(this, container, $container);

	    this.$search.on('keydown', function (evt) {
	      self.trigger('keypress', evt);

	      self._keyUpPrevented = evt.isDefaultPrevented();
	    });

	    // Workaround for browsers which do not support the `input` event
	    // This will prevent double-triggering of events for browsers which support
	    // both the `keyup` and `input` events.
	    this.$search.on('input', function (evt) {
	      // Unbind the duplicated `keyup` event
	      $(this).off('keyup');
	    });

	    this.$search.on('keyup input', function (evt) {
	      self.handleSearch(evt);
	    });

	    container.on('open', function () {
	      self.$search.attr('tabindex', 0);

	      self.$search.focus();

	      window.setTimeout(function () {
	        self.$search.focus();
	      }, 0);
	    });

	    container.on('close', function () {
	      self.$search.attr('tabindex', -1);

	      self.$search.val('');
	    });

	    container.on('results:all', function (params) {
	      if (params.query.term == null || params.query.term === '') {
	        var showSearch = self.showSearch(params);

	        if (showSearch) {
	          self.$searchContainer.removeClass('select2-search--hide');
	        } else {
	          self.$searchContainer.addClass('select2-search--hide');
	        }
	      }
	    });
	  };

	  Search.prototype.handleSearch = function (evt) {
	    if (!this._keyUpPrevented) {
	      var input = this.$search.val();

	      this.trigger('query', {
	        term: input
	      });
	    }

	    this._keyUpPrevented = false;
	  };

	  Search.prototype.showSearch = function (_, params) {
	    return true;
	  };

	  return Search;
	});

	S2.define('select2/dropdown/hidePlaceholder',[

	], function () {
	  function HidePlaceholder (decorated, $element, options, dataAdapter) {
	    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

	    decorated.call(this, $element, options, dataAdapter);
	  }

	  HidePlaceholder.prototype.append = function (decorated, data) {
	    data.results = this.removePlaceholder(data.results);

	    decorated.call(this, data);
	  };

	  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
	    if (typeof placeholder === 'string') {
	      placeholder = {
	        id: '',
	        text: placeholder
	      };
	    }

	    return placeholder;
	  };

	  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
	    var modifiedData = data.slice(0);

	    for (var d = data.length - 1; d >= 0; d--) {
	      var item = data[d];

	      if (this.placeholder.id === item.id) {
	        modifiedData.splice(d, 1);
	      }
	    }

	    return modifiedData;
	  };

	  return HidePlaceholder;
	});

	S2.define('select2/dropdown/infiniteScroll',[
	  'jquery'
	], function ($) {
	  function InfiniteScroll (decorated, $element, options, dataAdapter) {
	    this.lastParams = {};

	    decorated.call(this, $element, options, dataAdapter);

	    this.$loadingMore = this.createLoadingMore();
	    this.loading = false;
	  }

	  InfiniteScroll.prototype.append = function (decorated, data) {
	    this.$loadingMore.remove();
	    this.loading = false;

	    decorated.call(this, data);

	    if (this.showLoadingMore(data)) {
	      this.$results.append(this.$loadingMore);
	    }
	  };

	  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
	    var self = this;

	    decorated.call(this, container, $container);

	    container.on('query', function (params) {
	      self.lastParams = params;
	      self.loading = true;
	    });

	    container.on('query:append', function (params) {
	      self.lastParams = params;
	      self.loading = true;
	    });

	    this.$results.on('scroll', function () {
	      var isLoadMoreVisible = $.contains(
	        document.documentElement,
	        self.$loadingMore[0]
	      );

	      if (self.loading || !isLoadMoreVisible) {
	        return;
	      }

	      var currentOffset = self.$results.offset().top +
	        self.$results.outerHeight(false);
	      var loadingMoreOffset = self.$loadingMore.offset().top +
	        self.$loadingMore.outerHeight(false);

	      if (currentOffset + 50 >= loadingMoreOffset) {
	        self.loadMore();
	      }
	    });
	  };

	  InfiniteScroll.prototype.loadMore = function () {
	    this.loading = true;

	    var params = $.extend({}, {page: 1}, this.lastParams);

	    params.page++;

	    this.trigger('query:append', params);
	  };

	  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
	    return data.pagination && data.pagination.more;
	  };

	  InfiniteScroll.prototype.createLoadingMore = function () {
	    var $option = $(
	      '<li class="option load-more" role="treeitem"></li>'
	    );

	    var message = this.options.get('translations').get('loadingMore');

	    $option.html(message(this.lastParams));

	    return $option;
	  };

	  return InfiniteScroll;
	});

	S2.define('select2/dropdown/attachBody',[
	  'jquery',
	  '../utils'
	], function ($, Utils) {
	  function AttachBody (decorated, $element, options) {
	    this.$dropdownParent = options.get('dropdownParent') || document.body;

	    decorated.call(this, $element, options);
	  }

	  AttachBody.prototype.bind = function (decorated, container, $container) {
	    var self = this;

	    var setupResultsEvents = false;

	    decorated.call(this, container, $container);

	    container.on('open', function () {
	      self._showDropdown();
	      self._attachPositioningHandler(container);

	      if (!setupResultsEvents) {
	        setupResultsEvents = true;

	        container.on('results:all', function () {
	          self._positionDropdown();
	          self._resizeDropdown();
	        });

	        container.on('results:append', function () {
	          self._positionDropdown();
	          self._resizeDropdown();
	        });
	      }
	    });

	    container.on('close', function () {
	      self._hideDropdown();
	      self._detachPositioningHandler(container);
	    });

	    this.$dropdownContainer.on('mousedown', function (evt) {
	      evt.stopPropagation();
	    });
	  };

	  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
	    // Clone all of the container classes
	    $dropdown.attr('class', $container.attr('class'));

	    $dropdown.removeClass('select2');
	    $dropdown.addClass('select2-container--open');

	    $dropdown.css({
	      position: 'absolute',
	      top: -999999
	    });

	    this.$container = $container;
	  };

	  AttachBody.prototype.render = function (decorated) {
	    var $container = $('<span></span>');

	    var $dropdown = decorated.call(this);
	    $container.append($dropdown);

	    this.$dropdownContainer = $container;

	    return $container;
	  };

	  AttachBody.prototype._hideDropdown = function (decorated) {
	    this.$dropdownContainer.detach();
	  };

	  AttachBody.prototype._attachPositioningHandler = function (container) {
	    var self = this;

	    var scrollEvent = 'scroll.select2.' + container.id;
	    var resizeEvent = 'resize.select2.' + container.id;
	    var orientationEvent = 'orientationchange.select2.' + container.id;

	    var $watchers = this.$container.parents().filter(Utils.hasScroll);
	    $watchers.each(function () {
	      $(this).data('select2-scroll-position', {
	        x: $(this).scrollLeft(),
	        y: $(this).scrollTop()
	      });
	    });

	    $watchers.on(scrollEvent, function (ev) {
	      var position = $(this).data('select2-scroll-position');
	      $(this).scrollTop(position.y);
	    });

	    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
	      function (e) {
	      self._positionDropdown();
	      self._resizeDropdown();
	    });
	  };

	  AttachBody.prototype._detachPositioningHandler = function (container) {
	    var scrollEvent = 'scroll.select2.' + container.id;
	    var resizeEvent = 'resize.select2.' + container.id;
	    var orientationEvent = 'orientationchange.select2.' + container.id;

	    var $watchers = this.$container.parents().filter(Utils.hasScroll);
	    $watchers.off(scrollEvent);

	    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
	  };

	  AttachBody.prototype._positionDropdown = function () {
	    var $window = $(window);

	    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
	    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

	    var newDirection = null;

	    var position = this.$container.position();
	    var offset = this.$container.offset();

	    offset.bottom = offset.top + this.$container.outerHeight(false);

	    var container = {
	      height: this.$container.outerHeight(false)
	    };

	    container.top = offset.top;
	    container.bottom = offset.top + container.height;

	    var dropdown = {
	      height: this.$dropdown.outerHeight(false)
	    };

	    var viewport = {
	      top: $window.scrollTop(),
	      bottom: $window.scrollTop() + $window.height()
	    };

	    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
	    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

	    var css = {
	      left: offset.left,
	      top: container.bottom
	    };

	    if (!isCurrentlyAbove && !isCurrentlyBelow) {
	      newDirection = 'below';
	    }

	    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
	      newDirection = 'above';
	    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
	      newDirection = 'below';
	    }

	    if (newDirection == 'above' ||
	      (isCurrentlyAbove && newDirection !== 'below')) {
	      css.top = container.top - dropdown.height;
	    }

	    if (newDirection != null) {
	      this.$dropdown
	        .removeClass('select2-dropdown--below select2-dropdown--above')
	        .addClass('select2-dropdown--' + newDirection);
	      this.$container
	        .removeClass('select2-container--below select2-container--above')
	        .addClass('select2-container--' + newDirection);
	    }

	    this.$dropdownContainer.css(css);
	  };

	  AttachBody.prototype._resizeDropdown = function () {
	    this.$dropdownContainer.width();

	    var css = {
	      width: this.$container.outerWidth(false) + 'px'
	    };

	    if (this.options.get('dropdownAutoWidth')) {
	      css.minWidth = css.width;
	      css.width = 'auto';
	    }

	    this.$dropdown.css(css);
	  };

	  AttachBody.prototype._showDropdown = function (decorated) {
	    this.$dropdownContainer.appendTo(this.$dropdownParent);

	    this._positionDropdown();
	    this._resizeDropdown();
	  };

	  return AttachBody;
	});

	S2.define('select2/dropdown/minimumResultsForSearch',[

	], function () {
	  function countResults (data) {
	    var count = 0;

	    for (var d = 0; d < data.length; d++) {
	      var item = data[d];

	      if (item.children) {
	        count += countResults(item.children);
	      } else {
	        count++;
	      }
	    }

	    return count;
	  }

	  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
	    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

	    if (this.minimumResultsForSearch < 0) {
	      this.minimumResultsForSearch = Infinity;
	    }

	    decorated.call(this, $element, options, dataAdapter);
	  }

	  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
	    if (countResults(params.data.results) < this.minimumResultsForSearch) {
	      return false;
	    }

	    return decorated.call(this, params);
	  };

	  return MinimumResultsForSearch;
	});

	S2.define('select2/dropdown/selectOnClose',[

	], function () {
	  function SelectOnClose () { }

	  SelectOnClose.prototype.bind = function (decorated, container, $container) {
	    var self = this;

	    decorated.call(this, container, $container);

	    container.on('close', function () {
	      self._handleSelectOnClose();
	    });
	  };

	  SelectOnClose.prototype._handleSelectOnClose = function () {
	    var $highlightedResults = this.getHighlightedResults();

	    if ($highlightedResults.length < 1) {
	      return;
	    }

	    this.trigger('select', {
	        data: $highlightedResults.data('data')
	    });
	  };

	  return SelectOnClose;
	});

	S2.define('select2/dropdown/closeOnSelect',[

	], function () {
	  function CloseOnSelect () { }

	  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
	    var self = this;

	    decorated.call(this, container, $container);

	    container.on('select', function (evt) {
	      self._selectTriggered(evt);
	    });

	    container.on('unselect', function (evt) {
	      self._selectTriggered(evt);
	    });
	  };

	  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
	    var originalEvent = evt.originalEvent;

	    // Don't close if the control key is being held
	    if (originalEvent && originalEvent.ctrlKey) {
	      return;
	    }

	    this.trigger('close');
	  };

	  return CloseOnSelect;
	});

	S2.define('select2/i18n/en',[],function () {
	  // English
	  return {
	    errorLoading: function () {
	      return 'The results could not be loaded.';
	    },
	    inputTooLong: function (args) {
	      var overChars = args.input.length - args.maximum;

	      var message = 'Please delete ' + overChars + ' character';

	      if (overChars != 1) {
	        message += 's';
	      }

	      return message;
	    },
	    inputTooShort: function (args) {
	      var remainingChars = args.minimum - args.input.length;

	      var message = 'Please enter ' + remainingChars + ' or more characters';

	      return message;
	    },
	    loadingMore: function () {
	      return 'Loading more results…';
	    },
	    maximumSelected: function (args) {
	      var message = 'You can only select ' + args.maximum + ' item';

	      if (args.maximum != 1) {
	        message += 's';
	      }

	      return message;
	    },
	    noResults: function () {
	      return 'No results found';
	    },
	    searching: function () {
	      return 'Searching…';
	    }
	  };
	});

	S2.define('select2/defaults',[
	  'jquery',
	  'require',

	  './results',

	  './selection/single',
	  './selection/multiple',
	  './selection/placeholder',
	  './selection/allowClear',
	  './selection/search',
	  './selection/eventRelay',

	  './utils',
	  './translation',
	  './diacritics',

	  './data/select',
	  './data/array',
	  './data/ajax',
	  './data/tags',
	  './data/tokenizer',
	  './data/minimumInputLength',
	  './data/maximumInputLength',
	  './data/maximumSelectionLength',

	  './dropdown',
	  './dropdown/search',
	  './dropdown/hidePlaceholder',
	  './dropdown/infiniteScroll',
	  './dropdown/attachBody',
	  './dropdown/minimumResultsForSearch',
	  './dropdown/selectOnClose',
	  './dropdown/closeOnSelect',

	  './i18n/en'
	], function ($, require,

	             ResultsList,

	             SingleSelection, MultipleSelection, Placeholder, AllowClear,
	             SelectionSearch, EventRelay,

	             Utils, Translation, DIACRITICS,

	             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
	             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

	             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
	             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

	             EnglishTranslation) {
	  function Defaults () {
	    this.reset();
	  }

	  Defaults.prototype.apply = function (options) {
	    options = $.extend({}, this.defaults, options);

	    if (options.dataAdapter == null) {
	      if (options.ajax != null) {
	        options.dataAdapter = AjaxData;
	      } else if (options.data != null) {
	        options.dataAdapter = ArrayData;
	      } else {
	        options.dataAdapter = SelectData;
	      }

	      if (options.minimumInputLength > 0) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          MinimumInputLength
	        );
	      }

	      if (options.maximumInputLength > 0) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          MaximumInputLength
	        );
	      }

	      if (options.maximumSelectionLength > 0) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          MaximumSelectionLength
	        );
	      }

	      if (options.tags) {
	        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
	      }

	      if (options.tokenSeparators != null || options.tokenizer != null) {
	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          Tokenizer
	        );
	      }

	      if (options.query != null) {
	        var Query = require(options.amdBase + 'compat/query');

	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          Query
	        );
	      }

	      if (options.initSelection != null) {
	        var InitSelection = require(options.amdBase + 'compat/initSelection');

	        options.dataAdapter = Utils.Decorate(
	          options.dataAdapter,
	          InitSelection
	        );
	      }
	    }

	    if (options.resultsAdapter == null) {
	      options.resultsAdapter = ResultsList;

	      if (options.ajax != null) {
	        options.resultsAdapter = Utils.Decorate(
	          options.resultsAdapter,
	          InfiniteScroll
	        );
	      }

	      if (options.placeholder != null) {
	        options.resultsAdapter = Utils.Decorate(
	          options.resultsAdapter,
	          HidePlaceholder
	        );
	      }

	      if (options.selectOnClose) {
	        options.resultsAdapter = Utils.Decorate(
	          options.resultsAdapter,
	          SelectOnClose
	        );
	      }
	    }

	    if (options.dropdownAdapter == null) {
	      if (options.multiple) {
	        options.dropdownAdapter = Dropdown;
	      } else {
	        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

	        options.dropdownAdapter = SearchableDropdown;
	      }

	      if (options.minimumResultsForSearch !== 0) {
	        options.dropdownAdapter = Utils.Decorate(
	          options.dropdownAdapter,
	          MinimumResultsForSearch
	        );
	      }

	      if (options.closeOnSelect) {
	        options.dropdownAdapter = Utils.Decorate(
	          options.dropdownAdapter,
	          CloseOnSelect
	        );
	      }

	      if (
	        options.dropdownCssClass != null ||
	        options.dropdownCss != null ||
	        options.adaptDropdownCssClass != null
	      ) {
	        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

	        options.dropdownAdapter = Utils.Decorate(
	          options.dropdownAdapter,
	          DropdownCSS
	        );
	      }

	      options.dropdownAdapter = Utils.Decorate(
	        options.dropdownAdapter,
	        AttachBody
	      );
	    }

	    if (options.selectionAdapter == null) {
	      if (options.multiple) {
	        options.selectionAdapter = MultipleSelection;
	      } else {
	        options.selectionAdapter = SingleSelection;
	      }

	      // Add the placeholder mixin if a placeholder was specified
	      if (options.placeholder != null) {
	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          Placeholder
	        );
	      }

	      if (options.allowClear) {
	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          AllowClear
	        );
	      }

	      if (options.multiple) {
	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          SelectionSearch
	        );
	      }

	      if (
	        options.containerCssClass != null ||
	        options.containerCss != null ||
	        options.adaptContainerCssClass != null
	      ) {
	        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

	        options.selectionAdapter = Utils.Decorate(
	          options.selectionAdapter,
	          ContainerCSS
	        );
	      }

	      options.selectionAdapter = Utils.Decorate(
	        options.selectionAdapter,
	        EventRelay
	      );
	    }

	    if (typeof options.language === 'string') {
	      // Check if the language is specified with a region
	      if (options.language.indexOf('-') > 0) {
	        // Extract the region information if it is included
	        var languageParts = options.language.split('-');
	        var baseLanguage = languageParts[0];

	        options.language = [options.language, baseLanguage];
	      } else {
	        options.language = [options.language];
	      }
	    }

	    if ($.isArray(options.language)) {
	      var languages = new Translation();
	      options.language.push('en');

	      var languageNames = options.language;

	      for (var l = 0; l < languageNames.length; l++) {
	        var name = languageNames[l];
	        var language = {};

	        try {
	          // Try to load it with the original name
	          language = Translation.loadPath(name);
	        } catch (e) {
	          try {
	            // If we couldn't load it, check if it wasn't the full path
	            name = this.defaults.amdLanguageBase + name;
	            language = Translation.loadPath(name);
	          } catch (ex) {
	            // The translation could not be loaded at all. Sometimes this is
	            // because of a configuration problem, other times this can be
	            // because of how Select2 helps load all possible translation files.
	            if (options.debug && window.console && console.warn) {
	              console.warn(
	                'Select2: The language file for "' + name + '" could not be ' +
	                'automatically loaded. A fallback will be used instead.'
	              );
	            }

	            continue;
	          }
	        }

	        languages.extend(language);
	      }

	      options.translations = languages;
	    } else {
	      var baseTranslation = Translation.loadPath(
	        this.defaults.amdLanguageBase + 'en'
	      );
	      var customTranslation = new Translation(options.language);

	      customTranslation.extend(baseTranslation);

	      options.translations = customTranslation;
	    }

	    return options;
	  };

	  Defaults.prototype.reset = function () {
	    function stripDiacritics (text) {
	      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
	      function match(a) {
	        return DIACRITICS[a] || a;
	      }

	      return text.replace(/[^\u0000-\u007E]/g, match);
	    }

	    function matcher (params, data) {
	      // Always return the object if there is nothing to compare
	      if ($.trim(params.term) === '') {
	        return data;
	      }

	      // Do a recursive check for options with children
	      if (data.children && data.children.length > 0) {
	        // Clone the data object if there are children
	        // This is required as we modify the object to remove any non-matches
	        var match = $.extend(true, {}, data);

	        // Check each child of the option
	        for (var c = data.children.length - 1; c >= 0; c--) {
	          var child = data.children[c];

	          var matches = matcher(params, child);

	          // If there wasn't a match, remove the object in the array
	          if (matches == null) {
	            match.children.splice(c, 1);
	          }
	        }

	        // If any children matched, return the new object
	        if (match.children.length > 0) {
	          return match;
	        }

	        // If there were no matching children, check just the plain object
	        return matcher(params, match);
	      }

	      var original = stripDiacritics(data.text).toUpperCase();
	      var term = stripDiacritics(params.term).toUpperCase();

	      // Check if the text contains the term
	      if (original.indexOf(term) > -1) {
	        return data;
	      }

	      // If it doesn't contain the term, don't return anything
	      return null;
	    }

	    this.defaults = {
	      amdBase: './',
	      amdLanguageBase: './i18n/',
	      closeOnSelect: true,
	      debug: false,
	      dropdownAutoWidth: false,
	      escapeMarkup: Utils.escapeMarkup,
	      language: EnglishTranslation,
	      matcher: matcher,
	      minimumInputLength: 0,
	      maximumInputLength: 0,
	      maximumSelectionLength: 0,
	      minimumResultsForSearch: 0,
	      selectOnClose: false,
	      sorter: function (data) {
	        return data;
	      },
	      templateResult: function (result) {
	        return result.text;
	      },
	      templateSelection: function (selection) {
	        return selection.text;
	      },
	      theme: 'default',
	      width: 'resolve'
	    };
	  };

	  Defaults.prototype.set = function (key, value) {
	    var camelKey = $.camelCase(key);

	    var data = {};
	    data[camelKey] = value;

	    var convertedData = Utils._convertData(data);

	    $.extend(this.defaults, convertedData);
	  };

	  var defaults = new Defaults();

	  return defaults;
	});

	S2.define('select2/options',[
	  'require',
	  'jquery',
	  './defaults',
	  './utils'
	], function (require, $, Defaults, Utils) {
	  function Options (options, $element) {
	    this.options = options;

	    if ($element != null) {
	      this.fromElement($element);
	    }

	    this.options = Defaults.apply(this.options);

	    if ($element && $element.is('input')) {
	      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

	      this.options.dataAdapter = Utils.Decorate(
	        this.options.dataAdapter,
	        InputCompat
	      );
	    }
	  }

	  Options.prototype.fromElement = function ($e) {
	    var excludedData = ['select2'];

	    if (this.options.multiple == null) {
	      this.options.multiple = $e.prop('multiple');
	    }

	    if (this.options.disabled == null) {
	      this.options.disabled = $e.prop('disabled');
	    }

	    if (this.options.language == null) {
	      if ($e.prop('lang')) {
	        this.options.language = $e.prop('lang').toLowerCase();
	      } else if ($e.closest('[lang]').prop('lang')) {
	        this.options.language = $e.closest('[lang]').prop('lang');
	      }
	    }

	    if (this.options.dir == null) {
	      if ($e.prop('dir')) {
	        this.options.dir = $e.prop('dir');
	      } else if ($e.closest('[dir]').prop('dir')) {
	        this.options.dir = $e.closest('[dir]').prop('dir');
	      } else {
	        this.options.dir = 'ltr';
	      }
	    }

	    $e.prop('disabled', this.options.disabled);
	    $e.prop('multiple', this.options.multiple);

	    if ($e.data('select2Tags')) {
	      if (this.options.debug && window.console && console.warn) {
	        console.warn(
	          'Select2: The `data-select2-tags` attribute has been changed to ' +
	          'use the `data-data` and `data-tags="true"` attributes and will be ' +
	          'removed in future versions of Select2.'
	        );
	      }

	      $e.data('data', $e.data('select2Tags'));
	      $e.data('tags', true);
	    }

	    if ($e.data('ajaxUrl')) {
	      if (this.options.debug && window.console && console.warn) {
	        console.warn(
	          'Select2: The `data-ajax-url` attribute has been changed to ' +
	          '`data-ajax--url` and support for the old attribute will be removed' +
	          ' in future versions of Select2.'
	        );
	      }

	      $e.attr('ajax--url', $e.data('ajaxUrl'));
	      $e.data('ajax--url', $e.data('ajaxUrl'));
	    }

	    var dataset = {};

	    // Prefer the element's `dataset` attribute if it exists
	    // jQuery 1.x does not correctly handle data attributes with multiple dashes
	    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
	      dataset = $.extend(true, {}, $e[0].dataset, $e.data());
	    } else {
	      dataset = $e.data();
	    }

	    var data = $.extend(true, {}, dataset);

	    data = Utils._convertData(data);

	    for (var key in data) {
	      if ($.inArray(key, excludedData) > -1) {
	        continue;
	      }

	      if ($.isPlainObject(this.options[key])) {
	        $.extend(this.options[key], data[key]);
	      } else {
	        this.options[key] = data[key];
	      }
	    }

	    return this;
	  };

	  Options.prototype.get = function (key) {
	    return this.options[key];
	  };

	  Options.prototype.set = function (key, val) {
	    this.options[key] = val;
	  };

	  return Options;
	});

	S2.define('select2/core',[
	  'jquery',
	  './options',
	  './utils',
	  './keys'
	], function ($, Options, Utils, KEYS) {
	  var Select2 = function ($element, options) {
	    if ($element.data('select2') != null) {
	      $element.data('select2').destroy();
	    }

	    this.$element = $element;

	    this.id = this._generateId($element);

	    options = options || {};

	    this.options = new Options(options, $element);

	    Select2.__super__.constructor.call(this);

	    // Set up the tabindex

	    var tabindex = $element.attr('tabindex') || 0;
	    $element.data('old-tabindex', tabindex);
	    $element.attr('tabindex', '-1');

	    // Set up containers and adapters

	    var DataAdapter = this.options.get('dataAdapter');
	    this.dataAdapter = new DataAdapter($element, this.options);

	    var $container = this.render();

	    this._placeContainer($container);

	    var SelectionAdapter = this.options.get('selectionAdapter');
	    this.selection = new SelectionAdapter($element, this.options);
	    this.$selection = this.selection.render();

	    this.selection.position(this.$selection, $container);

	    var DropdownAdapter = this.options.get('dropdownAdapter');
	    this.dropdown = new DropdownAdapter($element, this.options);
	    this.$dropdown = this.dropdown.render();

	    this.dropdown.position(this.$dropdown, $container);

	    var ResultsAdapter = this.options.get('resultsAdapter');
	    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
	    this.$results = this.results.render();

	    this.results.position(this.$results, this.$dropdown);

	    // Bind events

	    var self = this;

	    // Bind the container to all of the adapters
	    this._bindAdapters();

	    // Register any DOM event handlers
	    this._registerDomEvents();

	    // Register any internal event handlers
	    this._registerDataEvents();
	    this._registerSelectionEvents();
	    this._registerDropdownEvents();
	    this._registerResultsEvents();
	    this._registerEvents();

	    // Set the initial state
	    this.dataAdapter.current(function (initialData) {
	      self.trigger('selection:update', {
	        data: initialData
	      });
	    });

	    // Hide the original select
	    $element.addClass('select2-hidden-accessible');
		$element.attr('aria-hidden', 'true');
		
	    // Synchronize any monitored attributes
	    this._syncAttributes();

	    $element.data('select2', this);
	  };

	  Utils.Extend(Select2, Utils.Observable);

	  Select2.prototype._generateId = function ($element) {
	    var id = '';

	    if ($element.attr('id') != null) {
	      id = $element.attr('id');
	    } else if ($element.attr('name') != null) {
	      id = $element.attr('name') + '-' + Utils.generateChars(2);
	    } else {
	      id = Utils.generateChars(4);
	    }

	    id = 'select2-' + id;

	    return id;
	  };

	  Select2.prototype._placeContainer = function ($container) {
	    $container.insertAfter(this.$element);

	    var width = this._resolveWidth(this.$element, this.options.get('width'));

	    if (width != null) {
	      $container.css('width', width);
	    }
	  };

	  Select2.prototype._resolveWidth = function ($element, method) {
	    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

	    if (method == 'resolve') {
	      var styleWidth = this._resolveWidth($element, 'style');

	      if (styleWidth != null) {
	        return styleWidth;
	      }

	      return this._resolveWidth($element, 'element');
	    }

	    if (method == 'element') {
	      var elementWidth = $element.outerWidth(false);

	      if (elementWidth <= 0) {
	        return 'auto';
	      }

	      return elementWidth + 'px';
	    }

	    if (method == 'style') {
	      var style = $element.attr('style');

	      if (typeof(style) !== 'string') {
	        return null;
	      }

	      var attrs = style.split(';');

	      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
	        var attr = attrs[i].replace(/\s/g, '');
	        var matches = attr.match(WIDTH);

	        if (matches !== null && matches.length >= 1) {
	          return matches[1];
	        }
	      }

	      return null;
	    }

	    return method;
	  };

	  Select2.prototype._bindAdapters = function () {
	    this.dataAdapter.bind(this, this.$container);
	    this.selection.bind(this, this.$container);

	    this.dropdown.bind(this, this.$container);
	    this.results.bind(this, this.$container);
	  };

	  Select2.prototype._registerDomEvents = function () {
	    var self = this;

	    this.$element.on('change.select2', function () {
	      self.dataAdapter.current(function (data) {
	        self.trigger('selection:update', {
	          data: data
	        });
	      });
	    });

	    this._sync = Utils.bind(this._syncAttributes, this);

	    if (this.$element[0].attachEvent) {
	      this.$element[0].attachEvent('onpropertychange', this._sync);
	    }

	    var observer = window.MutationObserver ||
	      window.WebKitMutationObserver ||
	      window.MozMutationObserver
	    ;

	    if (observer != null) {
	      this._observer = new observer(function (mutations) {
	        $.each(mutations, self._sync);
	      });
	      this._observer.observe(this.$element[0], {
	        attributes: true,
	        subtree: false
	      });
	    } else if (this.$element[0].addEventListener) {
	      this.$element[0].addEventListener('DOMAttrModified', self._sync, false);
	    }
	  };

	  Select2.prototype._registerDataEvents = function () {
	    var self = this;

	    this.dataAdapter.on('*', function (name, params) {
	      self.trigger(name, params);
	    });
	  };

	  Select2.prototype._registerSelectionEvents = function () {
	    var self = this;
	    var nonRelayEvents = ['toggle'];

	    this.selection.on('toggle', function () {
	      self.toggleDropdown();
	    });

	    this.selection.on('*', function (name, params) {
	      if ($.inArray(name, nonRelayEvents) !== -1) {
	        return;
	      }

	      self.trigger(name, params);
	    });
	  };

	  Select2.prototype._registerDropdownEvents = function () {
	    var self = this;

	    this.dropdown.on('*', function (name, params) {
	      self.trigger(name, params);
	    });
	  };

	  Select2.prototype._registerResultsEvents = function () {
	    var self = this;

	    this.results.on('*', function (name, params) {
	      self.trigger(name, params);
	    });
	  };

	  Select2.prototype._registerEvents = function () {
	    var self = this;

	    this.on('open', function () {
	      self.$container.addClass('select2-container--open');
	    });

	    this.on('close', function () {
	      self.$container.removeClass('select2-container--open');
	    });

	    this.on('enable', function () {
	      self.$container.removeClass('select2-container--disabled');
	    });

	    this.on('disable', function () {
	      self.$container.addClass('select2-container--disabled');
	    });

	    this.on('focus', function () {
	      self.$container.addClass('select2-container--focus');
	    });

	    this.on('blur', function () {
	      self.$container.removeClass('select2-container--focus');
	    });

	    this.on('query', function (params) {
	      if (!self.isOpen()) {
	        self.trigger('open');
	      }

	      this.dataAdapter.query(params, function (data) {
	        self.trigger('results:all', {
	          data: data,
	          query: params
	        });
	      });
	    });

	    this.on('query:append', function (params) {
	      this.dataAdapter.query(params, function (data) {
	        self.trigger('results:append', {
	          data: data,
	          query: params
	        });
	      });
	    });

	    this.on('keypress', function (evt) {
	      var key = evt.which;

	      if (self.isOpen()) {
	        if (key === KEYS.ENTER) {
	          self.trigger('results:select');

	          evt.preventDefault();
	        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
	          self.trigger('results:toggle');

	          evt.preventDefault();
	        } else if (key === KEYS.UP) {
	          self.trigger('results:previous');

	          evt.preventDefault();
	        } else if (key === KEYS.DOWN) {
	          self.trigger('results:next');

	          evt.preventDefault();
	        } else if (key === KEYS.ESC || key === KEYS.TAB) {
	          self.close();

	          evt.preventDefault();
	        }
	      } else {
	        if (key === KEYS.ENTER || key === KEYS.SPACE ||
	            ((key === KEYS.DOWN || key === KEYS.UP) && evt.altKey)) {
	          self.open();

	          evt.preventDefault();
	        }
	      }
	    });
	  };

	  Select2.prototype._syncAttributes = function () {
	    this.options.set('disabled', this.$element.prop('disabled'));

	    if (this.options.get('disabled')) {
	      if (this.isOpen()) {
	        this.close();
	      }

	      this.trigger('disable');
	    } else {
	      this.trigger('enable');
	    }
	  };

	  /**
	   * Override the trigger method to automatically trigger pre-events when
	   * there are events that can be prevented.
	   */
	  Select2.prototype.trigger = function (name, args) {
	    var actualTrigger = Select2.__super__.trigger;
	    var preTriggerMap = {
	      'open': 'opening',
	      'close': 'closing',
	      'select': 'selecting',
	      'unselect': 'unselecting'
	    };

	    if (name in preTriggerMap) {
	      var preTriggerName = preTriggerMap[name];
	      var preTriggerArgs = {
	        prevented: false,
	        name: name,
	        args: args
	      };

	      actualTrigger.call(this, preTriggerName, preTriggerArgs);

	      if (preTriggerArgs.prevented) {
	        args.prevented = true;

	        return;
	      }
	    }

	    actualTrigger.call(this, name, args);
	  };

	  Select2.prototype.toggleDropdown = function () {
	    if (this.options.get('disabled')) {
	      return;
	    }

	    if (this.isOpen()) {
	      this.close();
	    } else {
	      this.open();
	    }
	  };

	  Select2.prototype.open = function () {
	    if (this.isOpen()) {
	      return;
	    }

	    this.trigger('query', {});

	    this.trigger('open');
	  };

	  Select2.prototype.close = function () {
	    if (!this.isOpen()) {
	      return;
	    }

	    this.trigger('close');
	  };

	  Select2.prototype.isOpen = function () {
	    return this.$container.hasClass('select2-container--open');
	  };

	  Select2.prototype.enable = function (args) {
	    if (this.options.get('debug') && window.console && console.warn) {
	      console.warn(
	        'Select2: The `select2("enable")` method has been deprecated and will' +
	        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
	        ' instead.'
	      );
	    }

	    if (args == null || args.length === 0) {
	      args = [true];
	    }

	    var disabled = !args[0];

	    this.$element.prop('disabled', disabled);
	  };

	  Select2.prototype.data = function () {
	    if (this.options.get('debug') &&
	        arguments.length > 0 && window.console && console.warn) {
	      console.warn(
	        'Select2: Data can no longer be set using `select2("data")`. You ' +
	        'should consider setting the value instead using `$element.val()`.'
	      );
	    }

	    var data = [];

	    this.dataAdapter.current(function (currentData) {
	      data = currentData;
	    });

	    return data;
	  };

	  Select2.prototype.val = function (args) {
	    if (this.options.get('debug') && window.console && console.warn) {
	      console.warn(
	        'Select2: The `select2("val")` method has been deprecated and will be' +
	        ' removed in later Select2 versions. Use $element.val() instead.'
	      );
	    }

	    if (args == null || args.length === 0) {
	      return this.$element.val();
	    }

	    var newVal = args[0];

	    if ($.isArray(newVal)) {
	      newVal = $.map(newVal, function (obj) {
	        return obj.toString();
	      });
	    }

	    this.$element.val(newVal).trigger('change');
	  };

	  Select2.prototype.destroy = function () {
	    this.$container.remove();

	    if (this.$element[0].detachEvent) {
	      this.$element[0].detachEvent('onpropertychange', this._sync);
	    }

	    if (this._observer != null) {
	      this._observer.disconnect();
	      this._observer = null;
	    } else if (this.$element[0].removeEventListener) {
	      this.$element[0]
	        .removeEventListener('DOMAttrModified', this._sync, false);
	    }

	    this._sync = null;

	    this.$element.off('.select2');
	    this.$element.attr('tabindex', this.$element.data('old-tabindex'));

	    this.$element.removeClass('select2-hidden-accessible');
		this.$element.attr('aria-hidden', 'false');
	    this.$element.removeData('select2');

	    this.dataAdapter.destroy();
	    this.selection.destroy();
	    this.dropdown.destroy();
	    this.results.destroy();

	    this.dataAdapter = null;
	    this.selection = null;
	    this.dropdown = null;
	    this.results = null;
	  };

	  Select2.prototype.render = function () {
	    var $container = $(
	      '<span class="select2 select2-container">' +
	        '<span class="selection"></span>' +
	        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
	      '</span>'
	    );

	    $container.attr('dir', this.options.get('dir'));

	    this.$container = $container;

	    this.$container.addClass('select2-container--' + this.options.get('theme'));

	    $container.data('element', this.$element);

	    return $container;
	  };

	  return Select2;
	});

	S2.define('select2/compat/utils',[
	  'jquery'
	], function ($) {
	  function syncCssClasses ($dest, $src, adapter) {
	    var classes, replacements = [], adapted;

	    classes = $.trim($dest.attr('class'));

	    if (classes) {
	      classes = '' + classes; // for IE which returns object

	      $(classes.split(/\s+/)).each(function () {
	        // Save all Select2 classes
	        if (this.indexOf('select2-') === 0) {
	          replacements.push(this);
	        }
	      });
	    }

	    classes = $.trim($src.attr('class'));

	    if (classes) {
	      classes = '' + classes; // for IE which returns object

	      $(classes.split(/\s+/)).each(function () {
	        // Only adapt non-Select2 classes
	        if (this.indexOf('select2-') !== 0) {
	          adapted = adapter(this);

	          if (adapted != null) {
	            replacements.push(adapted);
	          }
	        }
	      });
	    }

	    $dest.attr('class', replacements.join(' '));
	  }

	  return {
	    syncCssClasses: syncCssClasses
	  };
	});

	S2.define('select2/compat/containerCss',[
	  'jquery',
	  './utils'
	], function ($, CompatUtils) {
	  // No-op CSS adapter that discards all classes by default
	  function _containerAdapter (clazz) {
	    return null;
	  }

	  function ContainerCSS () { }

	  ContainerCSS.prototype.render = function (decorated) {
	    var $container = decorated.call(this);

	    var containerCssClass = this.options.get('containerCssClass') || '';

	    if ($.isFunction(containerCssClass)) {
	      containerCssClass = containerCssClass(this.$element);
	    }

	    var containerCssAdapter = this.options.get('adaptContainerCssClass');
	    containerCssAdapter = containerCssAdapter || _containerAdapter;

	    if (containerCssClass.indexOf(':all:') !== -1) {
	      containerCssClass = containerCssClass.replace(':all', '');

	      var _cssAdapter = containerCssAdapter;

	      containerCssAdapter = function (clazz) {
	        var adapted = _cssAdapter(clazz);

	        if (adapted != null) {
	          // Append the old one along with the adapted one
	          return adapted + ' ' + clazz;
	        }

	        return clazz;
	      };
	    }

	    var containerCss = this.options.get('containerCss') || {};

	    if ($.isFunction(containerCss)) {
	      containerCss = containerCss(this.$element);
	    }

	    CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

	    $container.css(containerCss);
	    $container.addClass(containerCssClass);

	    return $container;
	  };

	  return ContainerCSS;
	});

	S2.define('select2/compat/dropdownCss',[
	  'jquery',
	  './utils'
	], function ($, CompatUtils) {
	  // No-op CSS adapter that discards all classes by default
	  function _dropdownAdapter (clazz) {
	    return null;
	  }

	  function DropdownCSS () { }

	  DropdownCSS.prototype.render = function (decorated) {
	    var $dropdown = decorated.call(this);

	    var dropdownCssClass = this.options.get('dropdownCssClass') || '';

	    if ($.isFunction(dropdownCssClass)) {
	      dropdownCssClass = dropdownCssClass(this.$element);
	    }

	    var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
	    dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

	    if (dropdownCssClass.indexOf(':all:') !== -1) {
	      dropdownCssClass = dropdownCssClass.replace(':all', '');

	      var _cssAdapter = dropdownCssAdapter;

	      dropdownCssAdapter = function (clazz) {
	        var adapted = _cssAdapter(clazz);

	        if (adapted != null) {
	          // Append the old one along with the adapted one
	          return adapted + ' ' + clazz;
	        }

	        return clazz;
	      };
	    }

	    var dropdownCss = this.options.get('dropdownCss') || {};

	    if ($.isFunction(dropdownCss)) {
	      dropdownCss = dropdownCss(this.$element);
	    }

	    CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

	    $dropdown.css(dropdownCss);
	    $dropdown.addClass(dropdownCssClass);

	    return $dropdown;
	  };

	  return DropdownCSS;
	});

	S2.define('select2/compat/initSelection',[
	  'jquery'
	], function ($) {
	  function InitSelection (decorated, $element, options) {
	    if (options.get('debug') && window.console && console.warn) {
	      console.warn(
	        'Select2: The `initSelection` option has been deprecated in favor' +
	        ' of a custom data adapter that overrides the `current` method. ' +
	        'This method is now called multiple times instead of a single ' +
	        'time when the instance is initialized. Support will be removed ' +
	        'for the `initSelection` option in future versions of Select2'
	      );
	    }

	    this.initSelection = options.get('initSelection');
	    this._isInitialized = false;

	    decorated.call(this, $element, options);
	  }

	  InitSelection.prototype.current = function (decorated, callback) {
	    var self = this;

	    if (this._isInitialized) {
	      decorated.call(this, callback);

	      return;
	    }

	    this.initSelection.call(null, this.$element, function (data) {
	      self._isInitialized = true;

	      if (!$.isArray(data)) {
	        data = [data];
	      }

	      callback(data);
	    });
	  };

	  return InitSelection;
	});

	S2.define('select2/compat/inputData',[
	  'jquery'
	], function ($) {
	  function InputData (decorated, $element, options) {
	    this._currentData = [];
	    this._valueSeparator = options.get('valueSeparator') || ',';

	    if ($element.prop('type') === 'hidden') {
	      if (options.get('debug') && console && console.warn) {
	        console.warn(
	          'Select2: Using a hidden input with Select2 is no longer ' +
	          'supported and may stop working in the future. It is recommended ' +
	          'to use a `<select>` element instead.'
	        );
	      }
	    }

	    decorated.call(this, $element, options);
	  }

	  InputData.prototype.current = function (_, callback) {
	    function getSelected (data, selectedIds) {
	      var selected = [];

	      if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
	        data.selected = true;
	        selected.push(data);
	      } else {
	        data.selected = false;
	      }

	      if (data.children) {
	        selected.push.apply(selected, getSelected(data.children, selectedIds));
	      }

	      return selected;
	    }

	    var selected = [];

	    for (var d = 0; d < this._currentData.length; d++) {
	      var data = this._currentData[d];

	      selected.push.apply(
	        selected,
	        getSelected(
	          data,
	          this.$element.val().split(
	            this._valueSeparator
	          )
	        )
	      );
	    }

	    callback(selected);
	  };

	  InputData.prototype.select = function (_, data) {
	    if (!this.options.get('multiple')) {
	      this.current(function (allData) {
	        $.map(allData, function (data) {
	          data.selected = false;
	        });
	      });

	      this.$element.val(data.id);
	      this.$element.trigger('change');
	    } else {
	      var value = this.$element.val();
	      value += this._valueSeparator + data.id;

	      this.$element.val(value);
	      this.$element.trigger('change');
	    }
	  };

	  InputData.prototype.unselect = function (_, data) {
	    var self = this;

	    data.selected = false;

	    this.current(function (allData) {
	      var values = [];

	      for (var d = 0; d < allData.length; d++) {
	        var item = allData[d];

	        if (data.id == item.id) {
	          continue;
	        }

	        values.push(item.id);
	      }

	      self.$element.val(values.join(self._valueSeparator));
	      self.$element.trigger('change');
	    });
	  };

	  InputData.prototype.query = function (_, params, callback) {
	    var results = [];

	    for (var d = 0; d < this._currentData.length; d++) {
	      var data = this._currentData[d];

	      var matches = this.matches(params, data);

	      if (matches !== null) {
	        results.push(matches);
	      }
	    }

	    callback({
	      results: results
	    });
	  };

	  InputData.prototype.addOptions = function (_, $options) {
	    var options = $.map($options, function ($option) {
	      return $.data($option[0], 'data');
	    });

	    this._currentData.push.apply(this._currentData, options);
	  };

	  return InputData;
	});

	S2.define('select2/compat/matcher',[
	  'jquery'
	], function ($) {
	  function oldMatcher (matcher) {
	    function wrappedMatcher (params, data) {
	      var match = $.extend(true, {}, data);

	      if (params.term == null || $.trim(params.term) === '') {
	        return match;
	      }

	      if (data.children) {
	        for (var c = data.children.length - 1; c >= 0; c--) {
	          var child = data.children[c];

	          // Check if the child object matches
	          // The old matcher returned a boolean true or false
	          var doesMatch = matcher(params.term, child.text, child);

	          // If the child didn't match, pop it off
	          if (!doesMatch) {
	            match.children.splice(c, 1);
	          }
	        }

	        if (match.children.length > 0) {
	          return match;
	        }
	      }

	      if (matcher(params.term, data.text, data)) {
	        return match;
	      }

	      return null;
	    }

	    return wrappedMatcher;
	  }

	  return oldMatcher;
	});

	S2.define('select2/compat/query',[

	], function () {
	  function Query (decorated, $element, options) {
	    if (options.get('debug') && window.console && console.warn) {
	      console.warn(
	        'Select2: The `query` option has been deprecated in favor of a ' +
	        'custom data adapter that overrides the `query` method. Support ' +
	        'will be removed for the `query` option in future versions of ' +
	        'Select2.'
	      );
	    }

	    decorated.call(this, $element, options);
	  }

	  Query.prototype.query = function (_, params, callback) {
	    params.callback = callback;

	    var query = this.options.get('query');

	    query.call(null, params);
	  };

	  return Query;
	});

	S2.define('select2/dropdown/attachContainer',[

	], function () {
	  function AttachContainer (decorated, $element, options) {
	    decorated.call(this, $element, options);
	  }

	  AttachContainer.prototype.position =
	    function (decorated, $dropdown, $container) {
	    var $dropdownContainer = $container.find('.dropdown-wrapper');
	    $dropdownContainer.append($dropdown);

	    $dropdown.addClass('select2-dropdown--below');
	    $container.addClass('select2-container--below');
	  };

	  return AttachContainer;
	});

	S2.define('select2/dropdown/stopPropagation',[

	], function () {
	  function StopPropagation () { }

	  StopPropagation.prototype.bind = function (decorated, container, $container) {
	    decorated.call(this, container, $container);

	    var stoppedEvents = [
	    'blur',
	    'change',
	    'click',
	    'dblclick',
	    'focus',
	    'focusin',
	    'focusout',
	    'input',
	    'keydown',
	    'keyup',
	    'keypress',
	    'mousedown',
	    'mouseenter',
	    'mouseleave',
	    'mousemove',
	    'mouseover',
	    'mouseup',
	    'search',
	    'touchend',
	    'touchstart'
	    ];

	    this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
	      evt.stopPropagation();
	    });
	  };

	  return StopPropagation;
	});

	S2.define('select2/selection/stopPropagation',[

	], function () {
	  function StopPropagation () { }

	  StopPropagation.prototype.bind = function (decorated, container, $container) {
	    decorated.call(this, container, $container);

	    var stoppedEvents = [
	      'blur',
	      'change',
	      'click',
	      'dblclick',
	      'focus',
	      'focusin',
	      'focusout',
	      'input',
	      'keydown',
	      'keyup',
	      'keypress',
	      'mousedown',
	      'mouseenter',
	      'mouseleave',
	      'mousemove',
	      'mouseover',
	      'mouseup',
	      'search',
	      'touchend',
	      'touchstart'
	    ];

	    this.$selection.on(stoppedEvents.join(' '), function (evt) {
	      evt.stopPropagation();
	    });
	  };

	  return StopPropagation;
	});

	S2.define('jquery.select2',[
	  'jquery',
	  'require',

	  './select2/core',
	  './select2/defaults'
	], function ($, require, Select2, Defaults) {
	  // Force jQuery.mousewheel to be loaded if it hasn't already
	  require('jquery.mousewheel');

	  if ($.fn.select2 == null) {
	    // All methods that should return the element
	    var thisMethods = ['open', 'close', 'destroy'];

	    $.fn.select2 = function (options) {
	      options = options || {};

	      if (typeof options === 'object') {
	        this.each(function () {
	          var instanceOptions = $.extend({}, options, true);

	          var instance = new Select2($(this), instanceOptions);
	        });

	        return this;
	      } else if (typeof options === 'string') {
	        var instance = this.data('select2');

	        if (instance == null && window.console && console.error) {
	          console.error(
	            'The select2(\'' + options + '\') method was called on an ' +
	            'element that is not using Select2.'
	          );
	        }

	        var args = Array.prototype.slice.call(arguments, 1);

	        var ret = instance[options](args);

	        // Check if we should be returning `this`
	        if ($.inArray(options, thisMethods) > -1) {
	          return this;
	        }

	        return ret;
	      } else {
	        throw new Error('Invalid arguments for Select2: ' + options);
	      }
	    };
	  }

	  if ($.fn.select2.defaults == null) {
	    $.fn.select2.defaults = Defaults;
	  }

	  return Select2;
	});

	/*!
	 * jQuery Mousewheel 3.1.12
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

	(function (factory) {
	    if ( typeof S2.define === 'function' && S2.define.amd ) {
	        // AMD. Register as an anonymous module.
	        S2.define('jquery.mousewheel',['jquery'], factory);
	    } else if (true) {
	        // Node/CommonJS style for Browserify
	        module.exports = factory;
	    } else {
	        // Browser globals
	        factory(jQuery);
	    }
	}(function ($) {

	    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
	        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
	                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
	        slice  = Array.prototype.slice,
	        nullLowestDeltaTimeout, lowestDelta;

	    if ( $.event.fixHooks ) {
	        for ( var i = toFix.length; i; ) {
	            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
	        }
	    }

	    var special = $.event.special.mousewheel = {
	        version: '3.1.12',

	        setup: function() {
	            if ( this.addEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.addEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = handler;
	            }
	            // Store the line height and page height for this particular element
	            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
	            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
	        },

	        teardown: function() {
	            if ( this.removeEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.removeEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = null;
	            }
	            // Clean up the data we added to the element
	            $.removeData(this, 'mousewheel-line-height');
	            $.removeData(this, 'mousewheel-page-height');
	        },

	        getLineHeight: function(elem) {
	            var $elem = $(elem),
	                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
	            if (!$parent.length) {
	                $parent = $('body');
	            }
	            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
	        },

	        getPageHeight: function(elem) {
	            return $(elem).height();
	        },

	        settings: {
	            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
	            normalizeOffset: true  // calls getBoundingClientRect for each event
	        }
	    };

	    $.fn.extend({
	        mousewheel: function(fn) {
	            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
	        },

	        unmousewheel: function(fn) {
	            return this.unbind('mousewheel', fn);
	        }
	    });


	    function handler(event) {
	        var orgEvent   = event || window.event,
	            args       = slice.call(arguments, 1),
	            delta      = 0,
	            deltaX     = 0,
	            deltaY     = 0,
	            absDelta   = 0,
	            offsetX    = 0,
	            offsetY    = 0;
	        event = $.event.fix(orgEvent);
	        event.type = 'mousewheel';

	        // Old school scrollwheel delta
	        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
	        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
	        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
	        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

	        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
	            deltaX = deltaY * -1;
	            deltaY = 0;
	        }

	        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
	        delta = deltaY === 0 ? deltaX : deltaY;

	        // New school wheel delta (wheel event)
	        if ( 'deltaY' in orgEvent ) {
	            deltaY = orgEvent.deltaY * -1;
	            delta  = deltaY;
	        }
	        if ( 'deltaX' in orgEvent ) {
	            deltaX = orgEvent.deltaX;
	            if ( deltaY === 0 ) { delta  = deltaX * -1; }
	        }

	        // No change actually happened, no reason to go any further
	        if ( deltaY === 0 && deltaX === 0 ) { return; }

	        // Need to convert lines and pages to pixels if we aren't already in pixels
	        // There are three delta modes:
	        //   * deltaMode 0 is by pixels, nothing to do
	        //   * deltaMode 1 is by lines
	        //   * deltaMode 2 is by pages
	        if ( orgEvent.deltaMode === 1 ) {
	            var lineHeight = $.data(this, 'mousewheel-line-height');
	            delta  *= lineHeight;
	            deltaY *= lineHeight;
	            deltaX *= lineHeight;
	        } else if ( orgEvent.deltaMode === 2 ) {
	            var pageHeight = $.data(this, 'mousewheel-page-height');
	            delta  *= pageHeight;
	            deltaY *= pageHeight;
	            deltaX *= pageHeight;
	        }

	        // Store lowest absolute delta to normalize the delta values
	        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

	        if ( !lowestDelta || absDelta < lowestDelta ) {
	            lowestDelta = absDelta;

	            // Adjust older deltas if necessary
	            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	                lowestDelta /= 40;
	            }
	        }

	        // Adjust older deltas if necessary
	        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	            // Divide all the things by 40!
	            delta  /= 40;
	            deltaX /= 40;
	            deltaY /= 40;
	        }

	        // Get a whole, normalized value for the deltas
	        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
	        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
	        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

	        // Normalise offsetX and offsetY properties
	        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
	            var boundingRect = this.getBoundingClientRect();
	            offsetX = event.clientX - boundingRect.left;
	            offsetY = event.clientY - boundingRect.top;
	        }

	        // Add information to the event object
	        event.deltaX = deltaX;
	        event.deltaY = deltaY;
	        event.deltaFactor = lowestDelta;
	        event.offsetX = offsetX;
	        event.offsetY = offsetY;
	        // Go ahead and set deltaMode to 0 since we converted to pixels
	        // Although this is a little odd since we overwrite the deltaX/Y
	        // properties with normalized deltas.
	        event.deltaMode = 0;

	        // Add event and delta to the front of the arguments
	        args.unshift(event, delta, deltaX, deltaY);

	        // Clearout lowestDelta after sometime to better
	        // handle multiple device types that give different
	        // a different lowestDelta
	        // Ex: trackpad = 3 and mouse wheel = 120
	        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
	        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

	        return ($.event.dispatch || $.event.handle).apply(this, args);
	    }

	    function nullLowestDelta() {
	        lowestDelta = null;
	    }

	    function shouldAdjustOldDeltas(orgEvent, absDelta) {
	        // If this is an older event and the delta is divisable by 120,
	        // then we are assuming that the browser is treating this as an
	        // older mouse wheel event and that we should divide the deltas
	        // by 40 to try and get a more usable deltaFactor.
	        // Side note, this actually impacts the reported scroll distance
	        // in older browsers and can cause scrolling to be slower than native.
	        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
	        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	    }

	}));

	  // Return the AMD loader configuration so it can be used outside of this file
	  return {
	    define: S2.define,
	    require: S2.require
	  };
	}());

	  // Autoload the jQuery bindings
	  // We know that all of the modules exist above this, so we're safe
	  var select2 = S2.require('jquery.select2');

	  // Hold the AMD module references on the jQuery function that was just loaded
	  // This allows Select2 to use the internal loader outside of this file, such
	  // as in the language files.
	  jQuery.fn.select2.amd = S2;

	  // Return the Select2 instance for anyone who is importing it.
	  return select2;
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(setImmediate) {/*!
	 * typeahead.js 0.11.1
	 * https://github.com/twitter/typeahead.js
	 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
	 */

	(function(root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(2) ], __WEBPACK_AMD_DEFINE_RESULT__ = function(a0) {
	            return factory(a0);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === "object") {
	        module.exports = factory(require("jquery"));
	    } else {
	        factory(jQuery);
	    }
	})(this, function($) {
	    var _ = function() {
	        "use strict";
	        return {
	            isMsie: function() {
	                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
	            },
	            isBlankString: function(str) {
	                return !str || /^\s*$/.test(str);
	            },
	            escapeRegExChars: function(str) {
	                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	            },
	            isString: function(obj) {
	                return typeof obj === "string";
	            },
	            isNumber: function(obj) {
	                return typeof obj === "number";
	            },
	            isArray: $.isArray,
	            isFunction: $.isFunction,
	            isObject: $.isPlainObject,
	            isUndefined: function(obj) {
	                return typeof obj === "undefined";
	            },
	            isElement: function(obj) {
	                return !!(obj && obj.nodeType === 1);
	            },
	            isJQuery: function(obj) {
	                return obj instanceof $;
	            },
	            toStr: function toStr(s) {
	                return _.isUndefined(s) || s === null ? "" : s + "";
	            },
	            bind: $.proxy,
	            each: function(collection, cb) {
	                $.each(collection, reverseArgs);
	                function reverseArgs(index, value) {
	                    return cb(value, index);
	                }
	            },
	            map: $.map,
	            filter: $.grep,
	            every: function(obj, test) {
	                var result = true;
	                if (!obj) {
	                    return result;
	                }
	                $.each(obj, function(key, val) {
	                    if (!(result = test.call(null, val, key, obj))) {
	                        return false;
	                    }
	                });
	                return !!result;
	            },
	            some: function(obj, test) {
	                var result = false;
	                if (!obj) {
	                    return result;
	                }
	                $.each(obj, function(key, val) {
	                    if (result = test.call(null, val, key, obj)) {
	                        return false;
	                    }
	                });
	                return !!result;
	            },
	            mixin: $.extend,
	            identity: function(x) {
	                return x;
	            },
	            clone: function(obj) {
	                return $.extend(true, {}, obj);
	            },
	            getIdGenerator: function() {
	                var counter = 0;
	                return function() {
	                    return counter++;
	                };
	            },
	            templatify: function templatify(obj) {
	                return $.isFunction(obj) ? obj : template;
	                function template() {
	                    return String(obj);
	                }
	            },
	            defer: function(fn) {
	                setTimeout(fn, 0);
	            },
	            debounce: function(func, wait, immediate) {
	                var timeout, result;
	                return function() {
	                    var context = this, args = arguments, later, callNow;
	                    later = function() {
	                        timeout = null;
	                        if (!immediate) {
	                            result = func.apply(context, args);
	                        }
	                    };
	                    callNow = immediate && !timeout;
	                    clearTimeout(timeout);
	                    timeout = setTimeout(later, wait);
	                    if (callNow) {
	                        result = func.apply(context, args);
	                    }
	                    return result;
	                };
	            },
	            throttle: function(func, wait) {
	                var context, args, timeout, result, previous, later;
	                previous = 0;
	                later = function() {
	                    previous = new Date();
	                    timeout = null;
	                    result = func.apply(context, args);
	                };
	                return function() {
	                    var now = new Date(), remaining = wait - (now - previous);
	                    context = this;
	                    args = arguments;
	                    if (remaining <= 0) {
	                        clearTimeout(timeout);
	                        timeout = null;
	                        previous = now;
	                        result = func.apply(context, args);
	                    } else if (!timeout) {
	                        timeout = setTimeout(later, remaining);
	                    }
	                    return result;
	                };
	            },
	            stringify: function(val) {
	                return _.isString(val) ? val : JSON.stringify(val);
	            },
	            noop: function() {}
	        };
	    }();
	    var WWW = function() {
	        "use strict";
	        var defaultClassNames = {
	            wrapper: "twitter-typeahead",
	            input: "tt-input",
	            hint: "tt-hint",
	            menu: "tt-menu",
	            dataset: "tt-dataset",
	            suggestion: "tt-suggestion",
	            selectable: "tt-selectable",
	            empty: "tt-empty",
	            open: "tt-open",
	            cursor: "tt-cursor",
	            highlight: "tt-highlight"
	        };
	        return build;
	        function build(o) {
	            var www, classes;
	            classes = _.mixin({}, defaultClassNames, o);
	            www = {
	                css: buildCss(),
	                classes: classes,
	                html: buildHtml(classes),
	                selectors: buildSelectors(classes)
	            };
	            return {
	                css: www.css,
	                html: www.html,
	                classes: www.classes,
	                selectors: www.selectors,
	                mixin: function(o) {
	                    _.mixin(o, www);
	                }
	            };
	        }
	        function buildHtml(c) {
	            return {
	                wrapper: '<span class="' + c.wrapper + '"></span>',
	                menu: '<div class="' + c.menu + '"></div>'
	            };
	        }
	        function buildSelectors(classes) {
	            var selectors = {};
	            _.each(classes, function(v, k) {
	                selectors[k] = "." + v;
	            });
	            return selectors;
	        }
	        function buildCss() {
	            var css = {
	                wrapper: {
	                    position: "relative",
	                    display: "inline-block"
	                },
	                hint: {
	                    position: "absolute",
	                    top: "0",
	                    left: "0",
	                    borderColor: "transparent",
	                    boxShadow: "none",
	                    opacity: "1"
	                },
	                input: {
	                    position: "relative",
	                    verticalAlign: "top",
	                    backgroundColor: "transparent"
	                },
	                inputWithNoHint: {
	                    position: "relative",
	                    verticalAlign: "top"
	                },
	                menu: {
	                    position: "absolute",
	                    top: "100%",
	                    left: "0",
	                    zIndex: "100",
	                    display: "none"
	                },
	                ltr: {
	                    left: "0",
	                    right: "auto"
	                },
	                rtl: {
	                    left: "auto",
	                    right: " 0"
	                }
	            };
	            if (_.isMsie()) {
	                _.mixin(css.input, {
	                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
	                });
	            }
	            return css;
	        }
	    }();
	    var EventBus = function() {
	        "use strict";
	        var namespace, deprecationMap;
	        namespace = "typeahead:";
	        deprecationMap = {
	            render: "rendered",
	            cursorchange: "cursorchanged",
	            select: "selected",
	            autocomplete: "autocompleted"
	        };
	        function EventBus(o) {
	            if (!o || !o.el) {
	                $.error("EventBus initialized without el");
	            }
	            this.$el = $(o.el);
	        }
	        _.mixin(EventBus.prototype, {
	            _trigger: function(type, args) {
	                var $e;
	                $e = $.Event(namespace + type);
	                (args = args || []).unshift($e);
	                this.$el.trigger.apply(this.$el, args);
	                return $e;
	            },
	            before: function(type) {
	                var args, $e;
	                args = [].slice.call(arguments, 1);
	                $e = this._trigger("before" + type, args);
	                return $e.isDefaultPrevented();
	            },
	            trigger: function(type) {
	                var deprecatedType;
	                this._trigger(type, [].slice.call(arguments, 1));
	                if (deprecatedType = deprecationMap[type]) {
	                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
	                }
	            }
	        });
	        return EventBus;
	    }();
	    var EventEmitter = function() {
	        "use strict";
	        var splitter = /\s+/, nextTick = getNextTick();
	        return {
	            onSync: onSync,
	            onAsync: onAsync,
	            off: off,
	            trigger: trigger
	        };
	        function on(method, types, cb, context) {
	            var type;
	            if (!cb) {
	                return this;
	            }
	            types = types.split(splitter);
	            cb = context ? bindContext(cb, context) : cb;
	            this._callbacks = this._callbacks || {};
	            while (type = types.shift()) {
	                this._callbacks[type] = this._callbacks[type] || {
	                    sync: [],
	                    async: []
	                };
	                this._callbacks[type][method].push(cb);
	            }
	            return this;
	        }
	        function onAsync(types, cb, context) {
	            return on.call(this, "async", types, cb, context);
	        }
	        function onSync(types, cb, context) {
	            return on.call(this, "sync", types, cb, context);
	        }
	        function off(types) {
	            var type;
	            if (!this._callbacks) {
	                return this;
	            }
	            types = types.split(splitter);
	            while (type = types.shift()) {
	                delete this._callbacks[type];
	            }
	            return this;
	        }
	        function trigger(types) {
	            var type, callbacks, args, syncFlush, asyncFlush;
	            if (!this._callbacks) {
	                return this;
	            }
	            types = types.split(splitter);
	            args = [].slice.call(arguments, 1);
	            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
	                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
	                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
	                syncFlush() && nextTick(asyncFlush);
	            }
	            return this;
	        }
	        function getFlush(callbacks, context, args) {
	            return flush;
	            function flush() {
	                var cancelled;
	                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
	                    cancelled = callbacks[i].apply(context, args) === false;
	                }
	                return !cancelled;
	            }
	        }
	        function getNextTick() {
	            var nextTickFn;
	            if (window.setImmediate) {
	                nextTickFn = function nextTickSetImmediate(fn) {
	                    setImmediate(function() {
	                        fn();
	                    });
	                };
	            } else {
	                nextTickFn = function nextTickSetTimeout(fn) {
	                    setTimeout(function() {
	                        fn();
	                    }, 0);
	                };
	            }
	            return nextTickFn;
	        }
	        function bindContext(fn, context) {
	            return fn.bind ? fn.bind(context) : function() {
	                fn.apply(context, [].slice.call(arguments, 0));
	            };
	        }
	    }();
	    var highlight = function(doc) {
	        "use strict";
	        var defaults = {
	            node: null,
	            pattern: null,
	            tagName: "strong",
	            className: null,
	            wordsOnly: false,
	            caseSensitive: false
	        };
	        return function hightlight(o) {
	            var regex;
	            o = _.mixin({}, defaults, o);
	            if (!o.node || !o.pattern) {
	                return;
	            }
	            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
	            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
	            traverse(o.node, hightlightTextNode);
	            function hightlightTextNode(textNode) {
	                var match, patternNode, wrapperNode;
	                if (match = regex.exec(textNode.data)) {
	                    wrapperNode = doc.createElement(o.tagName);
	                    o.className && (wrapperNode.className = o.className);
	                    patternNode = textNode.splitText(match.index);
	                    patternNode.splitText(match[0].length);
	                    wrapperNode.appendChild(patternNode.cloneNode(true));
	                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
	                }
	                return !!match;
	            }
	            function traverse(el, hightlightTextNode) {
	                var childNode, TEXT_NODE_TYPE = 3;
	                for (var i = 0; i < el.childNodes.length; i++) {
	                    childNode = el.childNodes[i];
	                    if (childNode.nodeType === TEXT_NODE_TYPE) {
	                        i += hightlightTextNode(childNode) ? 1 : 0;
	                    } else {
	                        traverse(childNode, hightlightTextNode);
	                    }
	                }
	            }
	        };
	        function getRegex(patterns, caseSensitive, wordsOnly) {
	            var escapedPatterns = [], regexStr;
	            for (var i = 0, len = patterns.length; i < len; i++) {
	                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
	            }
	            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
	            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
	        }
	    }(window.document);
	    var Input = function() {
	        "use strict";
	        var specialKeyCodeMap;
	        specialKeyCodeMap = {
	            9: "tab",
	            27: "esc",
	            37: "left",
	            39: "right",
	            13: "enter",
	            38: "up",
	            40: "down"
	        };
	        function Input(o, www) {
	            o = o || {};
	            if (!o.input) {
	                $.error("input is missing");
	            }
	            www.mixin(this);
	            this.$hint = $(o.hint);
	            this.$input = $(o.input);
	            this.query = this.$input.val();
	            this.queryWhenFocused = this.hasFocus() ? this.query : null;
	            this.$overflowHelper = buildOverflowHelper(this.$input);
	            this._checkLanguageDirection();
	            if (this.$hint.length === 0) {
	                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
	            }
	        }
	        Input.normalizeQuery = function(str) {
	            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
	        };
	        _.mixin(Input.prototype, EventEmitter, {
	            _onBlur: function onBlur() {
	                this.resetInputValue();
	                this.trigger("blurred");
	            },
	            _onFocus: function onFocus() {
	                this.queryWhenFocused = this.query;
	                this.trigger("focused");
	            },
	            _onKeydown: function onKeydown($e) {
	                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
	                this._managePreventDefault(keyName, $e);
	                if (keyName && this._shouldTrigger(keyName, $e)) {
	                    this.trigger(keyName + "Keyed", $e);
	                }
	            },
	            _onInput: function onInput() {
	                this._setQuery(this.getInputValue());
	                this.clearHintIfInvalid();
	                this._checkLanguageDirection();
	            },
	            _managePreventDefault: function managePreventDefault(keyName, $e) {
	                var preventDefault;
	                switch (keyName) {
	                  case "up":
	                  case "down":
	                    preventDefault = !withModifier($e);
	                    break;

	                  default:
	                    preventDefault = false;
	                }
	                preventDefault && $e.preventDefault();
	            },
	            _shouldTrigger: function shouldTrigger(keyName, $e) {
	                var trigger;
	                switch (keyName) {
	                  case "tab":
	                    trigger = !withModifier($e);
	                    break;

	                  default:
	                    trigger = true;
	                }
	                return trigger;
	            },
	            _checkLanguageDirection: function checkLanguageDirection() {
	                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
	                if (this.dir !== dir) {
	                    this.dir = dir;
	                    this.$hint.attr("dir", dir);
	                    this.trigger("langDirChanged", dir);
	                }
	            },
	            _setQuery: function setQuery(val, silent) {
	                var areEquivalent, hasDifferentWhitespace;
	                areEquivalent = areQueriesEquivalent(val, this.query);
	                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
	                this.query = val;
	                if (!silent && !areEquivalent) {
	                    this.trigger("queryChanged", this.query);
	                } else if (!silent && hasDifferentWhitespace) {
	                    this.trigger("whitespaceChanged", this.query);
	                }
	            },
	            bind: function() {
	                var that = this, onBlur, onFocus, onKeydown, onInput;
	                onBlur = _.bind(this._onBlur, this);
	                onFocus = _.bind(this._onFocus, this);
	                onKeydown = _.bind(this._onKeydown, this);
	                onInput = _.bind(this._onInput, this);
	                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
	                if (!_.isMsie() || _.isMsie() > 9) {
	                    this.$input.on("input.tt", onInput);
	                } else {
	                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
	                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
	                            return;
	                        }
	                        _.defer(_.bind(that._onInput, that, $e));
	                    });
	                }
	                return this;
	            },
	            focus: function focus() {
	                this.$input.focus();
	            },
	            blur: function blur() {
	                this.$input.blur();
	            },
	            getLangDir: function getLangDir() {
	                return this.dir;
	            },
	            getQuery: function getQuery() {
	                return this.query || "";
	            },
	            setQuery: function setQuery(val, silent) {
	                this.setInputValue(val);
	                this._setQuery(val, silent);
	            },
	            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
	                return this.query !== this.queryWhenFocused;
	            },
	            getInputValue: function getInputValue() {
	                return this.$input.val();
	            },
	            setInputValue: function setInputValue(value) {
	                this.$input.val(value);
	                this.clearHintIfInvalid();
	                this._checkLanguageDirection();
	            },
	            resetInputValue: function resetInputValue() {
	                this.setInputValue(this.query);
	            },
	            getHint: function getHint() {
	                return this.$hint.val();
	            },
	            setHint: function setHint(value) {
	                this.$hint.val(value);
	            },
	            clearHint: function clearHint() {
	                this.setHint("");
	            },
	            clearHintIfInvalid: function clearHintIfInvalid() {
	                var val, hint, valIsPrefixOfHint, isValid;
	                val = this.getInputValue();
	                hint = this.getHint();
	                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
	                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
	                !isValid && this.clearHint();
	            },
	            hasFocus: function hasFocus() {
	                return this.$input.is(":focus");
	            },
	            hasOverflow: function hasOverflow() {
	                var constraint = this.$input.width() - 2;
	                this.$overflowHelper.text(this.getInputValue());
	                return this.$overflowHelper.width() >= constraint;
	            },
	            isCursorAtEnd: function() {
	                var valueLength, selectionStart, range;
	                valueLength = this.$input.val().length;
	                selectionStart = this.$input[0].selectionStart;
	                if (_.isNumber(selectionStart)) {
	                    return selectionStart === valueLength;
	                } else if (document.selection) {
	                    range = document.selection.createRange();
	                    range.moveStart("character", -valueLength);
	                    return valueLength === range.text.length;
	                }
	                return true;
	            },
	            destroy: function destroy() {
	                this.$hint.off(".tt");
	                this.$input.off(".tt");
	                this.$overflowHelper.remove();
	                this.$hint = this.$input = this.$overflowHelper = $("<div>");
	            }
	        });
	        return Input;
	        function buildOverflowHelper($input) {
	            return $('<pre aria-hidden="true"></pre>').css({
	                position: "absolute",
	                visibility: "hidden",
	                whiteSpace: "pre",
	                fontFamily: $input.css("font-family"),
	                fontSize: $input.css("font-size"),
	                fontStyle: $input.css("font-style"),
	                fontVariant: $input.css("font-variant"),
	                fontWeight: $input.css("font-weight"),
	                wordSpacing: $input.css("word-spacing"),
	                letterSpacing: $input.css("letter-spacing"),
	                textIndent: $input.css("text-indent"),
	                textRendering: $input.css("text-rendering"),
	                textTransform: $input.css("text-transform")
	            }).insertAfter($input);
	        }
	        function areQueriesEquivalent(a, b) {
	            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
	        }
	        function withModifier($e) {
	            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
	        }
	    }();
	    var Dataset = function() {
	        "use strict";
	        var keys, nameGenerator;
	        keys = {
	            val: "tt-selectable-display",
	            obj: "tt-selectable-object"
	        };
	        nameGenerator = _.getIdGenerator();
	        function Dataset(o, www) {
	            o = o || {};
	            o.templates = o.templates || {};
	            o.templates.notFound = o.templates.notFound || o.templates.empty;
	            if (!o.source) {
	                $.error("missing source");
	            }
	            if (!o.node) {
	                $.error("missing node");
	            }
	            if (o.name && !isValidName(o.name)) {
	                $.error("invalid dataset name: " + o.name);
	            }
	            www.mixin(this);
	            this.highlight = !!o.highlight;
	            this.name = o.name || nameGenerator();
	            this.limit = o.limit || 5;
	            this.displayFn = getDisplayFn(o.display || o.displayKey);
	            this.templates = getTemplates(o.templates, this.displayFn);
	            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
	            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
	            this._resetLastSuggestion();
	            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
	        }
	        Dataset.extractData = function extractData(el) {
	            var $el = $(el);
	            if ($el.data(keys.obj)) {
	                return {
	                    val: $el.data(keys.val) || "",
	                    obj: $el.data(keys.obj) || null
	                };
	            }
	            return null;
	        };
	        _.mixin(Dataset.prototype, EventEmitter, {
	            _overwrite: function overwrite(query, suggestions) {
	                suggestions = suggestions || [];
	                if (suggestions.length) {
	                    this._renderSuggestions(query, suggestions);
	                } else if (this.async && this.templates.pending) {
	                    this._renderPending(query);
	                } else if (!this.async && this.templates.notFound) {
	                    this._renderNotFound(query);
	                } else {
	                    this._empty();
	                }
	                this.trigger("rendered", this.name, suggestions, false);
	            },
	            _append: function append(query, suggestions) {
	                suggestions = suggestions || [];
	                if (suggestions.length && this.$lastSuggestion.length) {
	                    this._appendSuggestions(query, suggestions);
	                } else if (suggestions.length) {
	                    this._renderSuggestions(query, suggestions);
	                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
	                    this._renderNotFound(query);
	                }
	                this.trigger("rendered", this.name, suggestions, true);
	            },
	            _renderSuggestions: function renderSuggestions(query, suggestions) {
	                var $fragment;
	                $fragment = this._getSuggestionsFragment(query, suggestions);
	                this.$lastSuggestion = $fragment.children().last();
	                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
	            },
	            _appendSuggestions: function appendSuggestions(query, suggestions) {
	                var $fragment, $lastSuggestion;
	                $fragment = this._getSuggestionsFragment(query, suggestions);
	                $lastSuggestion = $fragment.children().last();
	                this.$lastSuggestion.after($fragment);
	                this.$lastSuggestion = $lastSuggestion;
	            },
	            _renderPending: function renderPending(query) {
	                var template = this.templates.pending;
	                this._resetLastSuggestion();
	                template && this.$el.html(template({
	                    query: query,
	                    dataset: this.name
	                }));
	            },
	            _renderNotFound: function renderNotFound(query) {
	                var template = this.templates.notFound;
	                this._resetLastSuggestion();
	                template && this.$el.html(template({
	                    query: query,
	                    dataset: this.name
	                }));
	            },
	            _empty: function empty() {
	                this.$el.empty();
	                this._resetLastSuggestion();
	            },
	            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
	                var that = this, fragment;
	                fragment = document.createDocumentFragment();
	                _.each(suggestions, function getSuggestionNode(suggestion) {
	                    var $el, context;
	                    context = that._injectQuery(query, suggestion);
	                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
	                    fragment.appendChild($el[0]);
	                });
	                this.highlight && highlight({
	                    className: this.classes.highlight,
	                    node: fragment,
	                    pattern: query
	                });
	                return $(fragment);
	            },
	            _getFooter: function getFooter(query, suggestions) {
	                return this.templates.footer ? this.templates.footer({
	                    query: query,
	                    suggestions: suggestions,
	                    dataset: this.name
	                }) : null;
	            },
	            _getHeader: function getHeader(query, suggestions) {
	                return this.templates.header ? this.templates.header({
	                    query: query,
	                    suggestions: suggestions,
	                    dataset: this.name
	                }) : null;
	            },
	            _resetLastSuggestion: function resetLastSuggestion() {
	                this.$lastSuggestion = $();
	            },
	            _injectQuery: function injectQuery(query, obj) {
	                return _.isObject(obj) ? _.mixin({
	                    _query: query
	                }, obj) : obj;
	            },
	            update: function update(query) {
	                var that = this, canceled = false, syncCalled = false, rendered = 0;
	                this.cancel();
	                this.cancel = function cancel() {
	                    canceled = true;
	                    that.cancel = $.noop;
	                    that.async && that.trigger("asyncCanceled", query);
	                };
	                this.source(query, sync, async);
	                !syncCalled && sync([]);
	                function sync(suggestions) {
	                    if (syncCalled) {
	                        return;
	                    }
	                    syncCalled = true;
	                    suggestions = (suggestions || []).slice(0, that.limit);
	                    rendered = suggestions.length;
	                    that._overwrite(query, suggestions);
	                    if (rendered < that.limit && that.async) {
	                        that.trigger("asyncRequested", query);
	                    }
	                }
	                function async(suggestions) {
	                    suggestions = suggestions || [];
	                    if (!canceled && rendered < that.limit) {
	                        that.cancel = $.noop;
	                        rendered += suggestions.length;
	                        that._append(query, suggestions.slice(0, that.limit - rendered));
	                        that.async && that.trigger("asyncReceived", query);
	                    }
	                }
	            },
	            cancel: $.noop,
	            clear: function clear() {
	                this._empty();
	                this.cancel();
	                this.trigger("cleared");
	            },
	            isEmpty: function isEmpty() {
	                return this.$el.is(":empty");
	            },
	            destroy: function destroy() {
	                this.$el = $("<div>");
	            }
	        });
	        return Dataset;
	        function getDisplayFn(display) {
	            display = display || _.stringify;
	            return _.isFunction(display) ? display : displayFn;
	            function displayFn(obj) {
	                return obj[display];
	            }
	        }
	        function getTemplates(templates, displayFn) {
	            return {
	                notFound: templates.notFound && _.templatify(templates.notFound),
	                pending: templates.pending && _.templatify(templates.pending),
	                header: templates.header && _.templatify(templates.header),
	                footer: templates.footer && _.templatify(templates.footer),
	                suggestion: templates.suggestion || suggestionTemplate
	            };
	            function suggestionTemplate(context) {
	                return $("<div>").text(displayFn(context));
	            }
	        }
	        function isValidName(str) {
	            return /^[_a-zA-Z0-9-]+$/.test(str);
	        }
	    }();
	    var Menu = function() {
	        "use strict";
	        function Menu(o, www) {
	            var that = this;
	            o = o || {};
	            if (!o.node) {
	                $.error("node is required");
	            }
	            www.mixin(this);
	            this.$node = $(o.node);
	            this.query = null;
	            this.datasets = _.map(o.datasets, initializeDataset);
	            function initializeDataset(oDataset) {
	                var node = that.$node.find(oDataset.node).first();
	                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
	                return new Dataset(oDataset, www);
	            }
	        }
	        _.mixin(Menu.prototype, EventEmitter, {
	            _onSelectableClick: function onSelectableClick($e) {
	                this.trigger("selectableClicked", $($e.currentTarget));
	            },
	            _onRendered: function onRendered(type, dataset, suggestions, async) {
	                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
	                this.trigger("datasetRendered", dataset, suggestions, async);
	            },
	            _onCleared: function onCleared() {
	                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
	                this.trigger("datasetCleared");
	            },
	            _propagate: function propagate() {
	                this.trigger.apply(this, arguments);
	            },
	            _allDatasetsEmpty: function allDatasetsEmpty() {
	                return _.every(this.datasets, isDatasetEmpty);
	                function isDatasetEmpty(dataset) {
	                    return dataset.isEmpty();
	                }
	            },
	            _getSelectables: function getSelectables() {
	                return this.$node.find(this.selectors.selectable);
	            },
	            _removeCursor: function _removeCursor() {
	                var $selectable = this.getActiveSelectable();
	                $selectable && $selectable.removeClass(this.classes.cursor);
	            },
	            _ensureVisible: function ensureVisible($el) {
	                var elTop, elBottom, nodeScrollTop, nodeHeight;
	                elTop = $el.position().top;
	                elBottom = elTop + $el.outerHeight(true);
	                nodeScrollTop = this.$node.scrollTop();
	                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
	                if (elTop < 0) {
	                    this.$node.scrollTop(nodeScrollTop + elTop);
	                } else if (nodeHeight < elBottom) {
	                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
	                }
	            },
	            bind: function() {
	                var that = this, onSelectableClick;
	                onSelectableClick = _.bind(this._onSelectableClick, this);
	                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
	                _.each(this.datasets, function(dataset) {
	                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
	                });
	                return this;
	            },
	            isOpen: function isOpen() {
	                return this.$node.hasClass(this.classes.open);
	            },
	            open: function open() {
	                this.$node.addClass(this.classes.open);
	            },
	            close: function close() {
	                this.$node.removeClass(this.classes.open);
	                this._removeCursor();
	            },
	            setLanguageDirection: function setLanguageDirection(dir) {
	                this.$node.attr("dir", dir);
	            },
	            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
	                var $selectables, $oldCursor, oldIndex, newIndex;
	                $oldCursor = this.getActiveSelectable();
	                $selectables = this._getSelectables();
	                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
	                newIndex = oldIndex + delta;
	                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
	                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
	                return newIndex === -1 ? null : $selectables.eq(newIndex);
	            },
	            setCursor: function setCursor($selectable) {
	                this._removeCursor();
	                if ($selectable = $selectable && $selectable.first()) {
	                    $selectable.addClass(this.classes.cursor);
	                    this._ensureVisible($selectable);
	                }
	            },
	            getSelectableData: function getSelectableData($el) {
	                return $el && $el.length ? Dataset.extractData($el) : null;
	            },
	            getActiveSelectable: function getActiveSelectable() {
	                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
	                return $selectable.length ? $selectable : null;
	            },
	            getTopSelectable: function getTopSelectable() {
	                var $selectable = this._getSelectables().first();
	                return $selectable.length ? $selectable : null;
	            },
	            update: function update(query) {
	                var isValidUpdate = query !== this.query;
	                if (isValidUpdate) {
	                    this.query = query;
	                    _.each(this.datasets, updateDataset);
	                }
	                return isValidUpdate;
	                function updateDataset(dataset) {
	                    dataset.update(query);
	                }
	            },
	            empty: function empty() {
	                _.each(this.datasets, clearDataset);
	                this.query = null;
	                this.$node.addClass(this.classes.empty);
	                function clearDataset(dataset) {
	                    dataset.clear();
	                }
	            },
	            destroy: function destroy() {
	                this.$node.off(".tt");
	                this.$node = $("<div>");
	                _.each(this.datasets, destroyDataset);
	                function destroyDataset(dataset) {
	                    dataset.destroy();
	                }
	            }
	        });
	        return Menu;
	    }();
	    var DefaultMenu = function() {
	        "use strict";
	        var s = Menu.prototype;
	        function DefaultMenu() {
	            Menu.apply(this, [].slice.call(arguments, 0));
	        }
	        _.mixin(DefaultMenu.prototype, Menu.prototype, {
	            open: function open() {
	                !this._allDatasetsEmpty() && this._show();
	                return s.open.apply(this, [].slice.call(arguments, 0));
	            },
	            close: function close() {
	                this._hide();
	                return s.close.apply(this, [].slice.call(arguments, 0));
	            },
	            _onRendered: function onRendered() {
	                if (this._allDatasetsEmpty()) {
	                    this._hide();
	                } else {
	                    this.isOpen() && this._show();
	                }
	                return s._onRendered.apply(this, [].slice.call(arguments, 0));
	            },
	            _onCleared: function onCleared() {
	                if (this._allDatasetsEmpty()) {
	                    this._hide();
	                } else {
	                    this.isOpen() && this._show();
	                }
	                return s._onCleared.apply(this, [].slice.call(arguments, 0));
	            },
	            setLanguageDirection: function setLanguageDirection(dir) {
	                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
	                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
	            },
	            _hide: function hide() {
	                this.$node.hide();
	            },
	            _show: function show() {
	                this.$node.css("display", "block");
	            }
	        });
	        return DefaultMenu;
	    }();
	    var Typeahead = function() {
	        "use strict";
	        function Typeahead(o, www) {
	            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
	            o = o || {};
	            if (!o.input) {
	                $.error("missing input");
	            }
	            if (!o.menu) {
	                $.error("missing menu");
	            }
	            if (!o.eventBus) {
	                $.error("missing event bus");
	            }
	            www.mixin(this);
	            this.eventBus = o.eventBus;
	            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
	            this.input = o.input;
	            this.menu = o.menu;
	            this.enabled = true;
	            this.active = false;
	            this.input.hasFocus() && this.activate();
	            this.dir = this.input.getLangDir();
	            this._hacks();
	            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
	            onFocused = c(this, "activate", "open", "_onFocused");
	            onBlurred = c(this, "deactivate", "_onBlurred");
	            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
	            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
	            onEscKeyed = c(this, "isActive", "_onEscKeyed");
	            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
	            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
	            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
	            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
	            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
	            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
	            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
	        }
	        _.mixin(Typeahead.prototype, {
	            _hacks: function hacks() {
	                var $input, $menu;
	                $input = this.input.$input || $("<div>");
	                $menu = this.menu.$node || $("<div>");
	                $input.on("blur.tt", function($e) {
	                    var active, isActive, hasActive;
	                    active = document.activeElement;
	                    isActive = $menu.is(active);
	                    hasActive = $menu.has(active).length > 0;
	                    if (_.isMsie() && (isActive || hasActive)) {
	                        $e.preventDefault();
	                        $e.stopImmediatePropagation();
	                        _.defer(function() {
	                            $input.focus();
	                        });
	                    }
	                });
	                $menu.on("mousedown.tt", function($e) {
	                    $e.preventDefault();
	                });
	            },
	            _onSelectableClicked: function onSelectableClicked(type, $el) {
	                this.select($el);
	            },
	            _onDatasetCleared: function onDatasetCleared() {
	                this._updateHint();
	            },
	            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
	                this._updateHint();
	                this.eventBus.trigger("render", suggestions, async, dataset);
	            },
	            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
	                this.eventBus.trigger("asyncrequest", query, dataset);
	            },
	            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
	                this.eventBus.trigger("asynccancel", query, dataset);
	            },
	            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
	                this.eventBus.trigger("asyncreceive", query, dataset);
	            },
	            _onFocused: function onFocused() {
	                this._minLengthMet() && this.menu.update(this.input.getQuery());
	            },
	            _onBlurred: function onBlurred() {
	                if (this.input.hasQueryChangedSinceLastFocus()) {
	                    this.eventBus.trigger("change", this.input.getQuery());
	                }
	            },
	            _onEnterKeyed: function onEnterKeyed(type, $e) {
	                var $selectable;
	                if ($selectable = this.menu.getActiveSelectable()) {
	                    this.select($selectable) && $e.preventDefault();
	                }
	            },
	            _onTabKeyed: function onTabKeyed(type, $e) {
	                var $selectable;
	                if ($selectable = this.menu.getActiveSelectable()) {
	                    this.select($selectable) && $e.preventDefault();
	                } else if ($selectable = this.menu.getTopSelectable()) {
	                    this.autocomplete($selectable) && $e.preventDefault();
	                }
	            },
	            _onEscKeyed: function onEscKeyed() {
	                this.close();
	            },
	            _onUpKeyed: function onUpKeyed() {
	                this.moveCursor(-1);
	            },
	            _onDownKeyed: function onDownKeyed() {
	                this.moveCursor(+1);
	            },
	            _onLeftKeyed: function onLeftKeyed() {
	                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
	                    this.autocomplete(this.menu.getTopSelectable());
	                }
	            },
	            _onRightKeyed: function onRightKeyed() {
	                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
	                    this.autocomplete(this.menu.getTopSelectable());
	                }
	            },
	            _onQueryChanged: function onQueryChanged(e, query) {
	                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
	            },
	            _onWhitespaceChanged: function onWhitespaceChanged() {
	                this._updateHint();
	            },
	            _onLangDirChanged: function onLangDirChanged(e, dir) {
	                if (this.dir !== dir) {
	                    this.dir = dir;
	                    this.menu.setLanguageDirection(dir);
	                }
	            },
	            _openIfActive: function openIfActive() {
	                this.isActive() && this.open();
	            },
	            _minLengthMet: function minLengthMet(query) {
	                query = _.isString(query) ? query : this.input.getQuery() || "";
	                return query.length >= this.minLength;
	            },
	            _updateHint: function updateHint() {
	                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
	                $selectable = this.menu.getTopSelectable();
	                data = this.menu.getSelectableData($selectable);
	                val = this.input.getInputValue();
	                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
	                    query = Input.normalizeQuery(val);
	                    escapedQuery = _.escapeRegExChars(query);
	                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
	                    match = frontMatchRegEx.exec(data.val);
	                    match && this.input.setHint(val + match[1]);
	                } else {
	                    this.input.clearHint();
	                }
	            },
	            isEnabled: function isEnabled() {
	                return this.enabled;
	            },
	            enable: function enable() {
	                this.enabled = true;
	            },
	            disable: function disable() {
	                this.enabled = false;
	            },
	            isActive: function isActive() {
	                return this.active;
	            },
	            activate: function activate() {
	                if (this.isActive()) {
	                    return true;
	                } else if (!this.isEnabled() || this.eventBus.before("active")) {
	                    return false;
	                } else {
	                    this.active = true;
	                    this.eventBus.trigger("active");
	                    return true;
	                }
	            },
	            deactivate: function deactivate() {
	                if (!this.isActive()) {
	                    return true;
	                } else if (this.eventBus.before("idle")) {
	                    return false;
	                } else {
	                    this.active = false;
	                    this.close();
	                    this.eventBus.trigger("idle");
	                    return true;
	                }
	            },
	            isOpen: function isOpen() {
	                return this.menu.isOpen();
	            },
	            open: function open() {
	                if (!this.isOpen() && !this.eventBus.before("open")) {
	                    this.menu.open();
	                    this._updateHint();
	                    this.eventBus.trigger("open");
	                }
	                return this.isOpen();
	            },
	            close: function close() {
	                if (this.isOpen() && !this.eventBus.before("close")) {
	                    this.menu.close();
	                    this.input.clearHint();
	                    this.input.resetInputValue();
	                    this.eventBus.trigger("close");
	                }
	                return !this.isOpen();
	            },
	            setVal: function setVal(val) {
	                this.input.setQuery(_.toStr(val));
	            },
	            getVal: function getVal() {
	                return this.input.getQuery();
	            },
	            select: function select($selectable) {
	                var data = this.menu.getSelectableData($selectable);
	                if (data && !this.eventBus.before("select", data.obj)) {
	                    this.input.setQuery(data.val, true);
	                    this.eventBus.trigger("select", data.obj);
	                    this.close();
	                    return true;
	                }
	                return false;
	            },
	            autocomplete: function autocomplete($selectable) {
	                var query, data, isValid;
	                query = this.input.getQuery();
	                data = this.menu.getSelectableData($selectable);
	                isValid = data && query !== data.val;
	                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
	                    this.input.setQuery(data.val);
	                    this.eventBus.trigger("autocomplete", data.obj);
	                    return true;
	                }
	                return false;
	            },
	            moveCursor: function moveCursor(delta) {
	                var query, $candidate, data, payload, cancelMove;
	                query = this.input.getQuery();
	                $candidate = this.menu.selectableRelativeToCursor(delta);
	                data = this.menu.getSelectableData($candidate);
	                payload = data ? data.obj : null;
	                cancelMove = this._minLengthMet() && this.menu.update(query);
	                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
	                    this.menu.setCursor($candidate);
	                    if (data) {
	                        this.input.setInputValue(data.val);
	                    } else {
	                        this.input.resetInputValue();
	                        this._updateHint();
	                    }
	                    this.eventBus.trigger("cursorchange", payload);
	                    return true;
	                }
	                return false;
	            },
	            destroy: function destroy() {
	                this.input.destroy();
	                this.menu.destroy();
	            }
	        });
	        return Typeahead;
	        function c(ctx) {
	            var methods = [].slice.call(arguments, 1);
	            return function() {
	                var args = [].slice.call(arguments);
	                _.each(methods, function(method) {
	                    return ctx[method].apply(ctx, args);
	                });
	            };
	        }
	    }();
	    (function() {
	        "use strict";
	        var old, keys, methods;
	        old = $.fn.typeahead;
	        keys = {
	            www: "tt-www",
	            attrs: "tt-attrs",
	            typeahead: "tt-typeahead"
	        };
	        methods = {
	            initialize: function initialize(o, datasets) {
	                var www;
	                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
	                o = o || {};
	                www = WWW(o.classNames);
	                return this.each(attach);
	                function attach() {
	                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
	                    _.each(datasets, function(d) {
	                        d.highlight = !!o.highlight;
	                    });
	                    $input = $(this);
	                    $wrapper = $(www.html.wrapper);
	                    $hint = $elOrNull(o.hint);
	                    $menu = $elOrNull(o.menu);
	                    defaultHint = o.hint !== false && !$hint;
	                    defaultMenu = o.menu !== false && !$menu;
	                    defaultHint && ($hint = buildHintFromInput($input, www));
	                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
	                    $hint && $hint.val("");
	                    $input = prepInput($input, www);
	                    if (defaultHint || defaultMenu) {
	                        $wrapper.css(www.css.wrapper);
	                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
	                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
	                    }
	                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
	                    eventBus = new EventBus({
	                        el: $input
	                    });
	                    input = new Input({
	                        hint: $hint,
	                        input: $input
	                    }, www);
	                    menu = new MenuConstructor({
	                        node: $menu,
	                        datasets: datasets
	                    }, www);
	                    typeahead = new Typeahead({
	                        input: input,
	                        menu: menu,
	                        eventBus: eventBus,
	                        minLength: o.minLength
	                    }, www);
	                    $input.data(keys.www, www);
	                    $input.data(keys.typeahead, typeahead);
	                }
	            },
	            isEnabled: function isEnabled() {
	                var enabled;
	                ttEach(this.first(), function(t) {
	                    enabled = t.isEnabled();
	                });
	                return enabled;
	            },
	            enable: function enable() {
	                ttEach(this, function(t) {
	                    t.enable();
	                });
	                return this;
	            },
	            disable: function disable() {
	                ttEach(this, function(t) {
	                    t.disable();
	                });
	                return this;
	            },
	            isActive: function isActive() {
	                var active;
	                ttEach(this.first(), function(t) {
	                    active = t.isActive();
	                });
	                return active;
	            },
	            activate: function activate() {
	                ttEach(this, function(t) {
	                    t.activate();
	                });
	                return this;
	            },
	            deactivate: function deactivate() {
	                ttEach(this, function(t) {
	                    t.deactivate();
	                });
	                return this;
	            },
	            isOpen: function isOpen() {
	                var open;
	                ttEach(this.first(), function(t) {
	                    open = t.isOpen();
	                });
	                return open;
	            },
	            open: function open() {
	                ttEach(this, function(t) {
	                    t.open();
	                });
	                return this;
	            },
	            close: function close() {
	                ttEach(this, function(t) {
	                    t.close();
	                });
	                return this;
	            },
	            select: function select(el) {
	                var success = false, $el = $(el);
	                ttEach(this.first(), function(t) {
	                    success = t.select($el);
	                });
	                return success;
	            },
	            autocomplete: function autocomplete(el) {
	                var success = false, $el = $(el);
	                ttEach(this.first(), function(t) {
	                    success = t.autocomplete($el);
	                });
	                return success;
	            },
	            moveCursor: function moveCursoe(delta) {
	                var success = false;
	                ttEach(this.first(), function(t) {
	                    success = t.moveCursor(delta);
	                });
	                return success;
	            },
	            val: function val(newVal) {
	                var query;
	                if (!arguments.length) {
	                    ttEach(this.first(), function(t) {
	                        query = t.getVal();
	                    });
	                    return query;
	                } else {
	                    ttEach(this, function(t) {
	                        t.setVal(newVal);
	                    });
	                    return this;
	                }
	            },
	            destroy: function destroy() {
	                ttEach(this, function(typeahead, $input) {
	                    revert($input);
	                    typeahead.destroy();
	                });
	                return this;
	            }
	        };
	        $.fn.typeahead = function(method) {
	            if (methods[method]) {
	                return methods[method].apply(this, [].slice.call(arguments, 1));
	            } else {
	                return methods.initialize.apply(this, arguments);
	            }
	        };
	        $.fn.typeahead.noConflict = function noConflict() {
	            $.fn.typeahead = old;
	            return this;
	        };
	        function ttEach($els, fn) {
	            $els.each(function() {
	                var $input = $(this), typeahead;
	                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
	            });
	        }
	        function buildHintFromInput($input, www) {
	            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
	                autocomplete: "off",
	                spellcheck: "false",
	                tabindex: -1
	            });
	        }
	        function prepInput($input, www) {
	            $input.data(keys.attrs, {
	                dir: $input.attr("dir"),
	                autocomplete: $input.attr("autocomplete"),
	                spellcheck: $input.attr("spellcheck"),
	                style: $input.attr("style")
	            });
	            $input.addClass(www.classes.input).attr({
	                autocomplete: "off",
	                spellcheck: false
	            });
	            try {
	                !$input.attr("dir") && $input.attr("dir", "auto");
	            } catch (e) {}
	            return $input;
	        }
	        function getBackgroundStyles($el) {
	            return {
	                backgroundAttachment: $el.css("background-attachment"),
	                backgroundClip: $el.css("background-clip"),
	                backgroundColor: $el.css("background-color"),
	                backgroundImage: $el.css("background-image"),
	                backgroundOrigin: $el.css("background-origin"),
	                backgroundPosition: $el.css("background-position"),
	                backgroundRepeat: $el.css("background-repeat"),
	                backgroundSize: $el.css("background-size")
	            };
	        }
	        function revert($input) {
	            var www, $wrapper;
	            www = $input.data(keys.www);
	            $wrapper = $input.parent().filter(www.selectors.wrapper);
	            _.each($input.data(keys.attrs), function(val, key) {
	                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
	            });
	            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
	            if ($wrapper.length) {
	                $input.detach().insertAfter($wrapper);
	                $wrapper.remove();
	            }
	        }
	        function $elOrNull(obj) {
	            var isValid, $el;
	            isValid = _.isJQuery(obj) || _.isElement(obj);
	            $el = isValid ? $(obj).first() : [];
	            return $el.length ? $el : null;
	        }
	    })();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).setImmediate))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(10).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).setImmediate, __webpack_require__(9).clearImmediate))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/
	(function() {

	/*!
	 * typeahead.js 0.11.1
	 * https://github.com/twitter/typeahead.js
	 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
	 */

	(function(root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(2) ], __WEBPACK_AMD_DEFINE_RESULT__ = function(a0) {
	            return root["Bloodhound"] = factory(a0);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === "object") {
	        module.exports = factory(require("jquery"));
	    } else {
	        root["Bloodhound"] = factory(jQuery);
	    }
	})(this, function($) {
	    var _ = function() {
	        "use strict";
	        return {
	            isMsie: function() {
	                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
	            },
	            isBlankString: function(str) {
	                return !str || /^\s*$/.test(str);
	            },
	            escapeRegExChars: function(str) {
	                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	            },
	            isString: function(obj) {
	                return typeof obj === "string";
	            },
	            isNumber: function(obj) {
	                return typeof obj === "number";
	            },
	            isArray: $.isArray,
	            isFunction: $.isFunction,
	            isObject: $.isPlainObject,
	            isUndefined: function(obj) {
	                return typeof obj === "undefined";
	            },
	            isElement: function(obj) {
	                return !!(obj && obj.nodeType === 1);
	            },
	            isJQuery: function(obj) {
	                return obj instanceof $;
	            },
	            toStr: function toStr(s) {
	                return _.isUndefined(s) || s === null ? "" : s + "";
	            },
	            bind: $.proxy,
	            each: function(collection, cb) {
	                $.each(collection, reverseArgs);
	                function reverseArgs(index, value) {
	                    return cb(value, index);
	                }
	            },
	            map: $.map,
	            filter: $.grep,
	            every: function(obj, test) {
	                var result = true;
	                if (!obj) {
	                    return result;
	                }
	                $.each(obj, function(key, val) {
	                    if (!(result = test.call(null, val, key, obj))) {
	                        return false;
	                    }
	                });
	                return !!result;
	            },
	            some: function(obj, test) {
	                var result = false;
	                if (!obj) {
	                    return result;
	                }
	                $.each(obj, function(key, val) {
	                    if (result = test.call(null, val, key, obj)) {
	                        return false;
	                    }
	                });
	                return !!result;
	            },
	            mixin: $.extend,
	            identity: function(x) {
	                return x;
	            },
	            clone: function(obj) {
	                return $.extend(true, {}, obj);
	            },
	            getIdGenerator: function() {
	                var counter = 0;
	                return function() {
	                    return counter++;
	                };
	            },
	            templatify: function templatify(obj) {
	                return $.isFunction(obj) ? obj : template;
	                function template() {
	                    return String(obj);
	                }
	            },
	            defer: function(fn) {
	                setTimeout(fn, 0);
	            },
	            debounce: function(func, wait, immediate) {
	                var timeout, result;
	                return function() {
	                    var context = this, args = arguments, later, callNow;
	                    later = function() {
	                        timeout = null;
	                        if (!immediate) {
	                            result = func.apply(context, args);
	                        }
	                    };
	                    callNow = immediate && !timeout;
	                    clearTimeout(timeout);
	                    timeout = setTimeout(later, wait);
	                    if (callNow) {
	                        result = func.apply(context, args);
	                    }
	                    return result;
	                };
	            },
	            throttle: function(func, wait) {
	                var context, args, timeout, result, previous, later;
	                previous = 0;
	                later = function() {
	                    previous = new Date();
	                    timeout = null;
	                    result = func.apply(context, args);
	                };
	                return function() {
	                    var now = new Date(), remaining = wait - (now - previous);
	                    context = this;
	                    args = arguments;
	                    if (remaining <= 0) {
	                        clearTimeout(timeout);
	                        timeout = null;
	                        previous = now;
	                        result = func.apply(context, args);
	                    } else if (!timeout) {
	                        timeout = setTimeout(later, remaining);
	                    }
	                    return result;
	                };
	            },
	            stringify: function(val) {
	                return _.isString(val) ? val : JSON.stringify(val);
	            },
	            noop: function() {}
	        };
	    }();
	    var VERSION = "0.11.1";
	    var tokenizers = function() {
	        "use strict";
	        return {
	            nonword: nonword,
	            whitespace: whitespace,
	            obj: {
	                nonword: getObjTokenizer(nonword),
	                whitespace: getObjTokenizer(whitespace)
	            }
	        };
	        function whitespace(str) {
	            str = _.toStr(str);
	            return str ? str.split(/\s+/) : [];
	        }
	        function nonword(str) {
	            str = _.toStr(str);
	            return str ? str.split(/\W+/) : [];
	        }
	        function getObjTokenizer(tokenizer) {
	            return function setKey(keys) {
	                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
	                return function tokenize(o) {
	                    var tokens = [];
	                    _.each(keys, function(k) {
	                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
	                    });
	                    return tokens;
	                };
	            };
	        }
	    }();
	    var LruCache = function() {
	        "use strict";
	        function LruCache(maxSize) {
	            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
	            this.reset();
	            if (this.maxSize <= 0) {
	                this.set = this.get = $.noop;
	            }
	        }
	        _.mixin(LruCache.prototype, {
	            set: function set(key, val) {
	                var tailItem = this.list.tail, node;
	                if (this.size >= this.maxSize) {
	                    this.list.remove(tailItem);
	                    delete this.hash[tailItem.key];
	                    this.size--;
	                }
	                if (node = this.hash[key]) {
	                    node.val = val;
	                    this.list.moveToFront(node);
	                } else {
	                    node = new Node(key, val);
	                    this.list.add(node);
	                    this.hash[key] = node;
	                    this.size++;
	                }
	            },
	            get: function get(key) {
	                var node = this.hash[key];
	                if (node) {
	                    this.list.moveToFront(node);
	                    return node.val;
	                }
	            },
	            reset: function reset() {
	                this.size = 0;
	                this.hash = {};
	                this.list = new List();
	            }
	        });
	        function List() {
	            this.head = this.tail = null;
	        }
	        _.mixin(List.prototype, {
	            add: function add(node) {
	                if (this.head) {
	                    node.next = this.head;
	                    this.head.prev = node;
	                }
	                this.head = node;
	                this.tail = this.tail || node;
	            },
	            remove: function remove(node) {
	                node.prev ? node.prev.next = node.next : this.head = node.next;
	                node.next ? node.next.prev = node.prev : this.tail = node.prev;
	            },
	            moveToFront: function(node) {
	                this.remove(node);
	                this.add(node);
	            }
	        });
	        function Node(key, val) {
	            this.key = key;
	            this.val = val;
	            this.prev = this.next = null;
	        }
	        return LruCache;
	    }();
	    var PersistentStorage = function() {
	        "use strict";
	        var LOCAL_STORAGE;
	        try {
	            LOCAL_STORAGE = window.localStorage;
	            LOCAL_STORAGE.setItem("~~~", "!");
	            LOCAL_STORAGE.removeItem("~~~");
	        } catch (err) {
	            LOCAL_STORAGE = null;
	        }
	        function PersistentStorage(namespace, override) {
	            this.prefix = [ "__", namespace, "__" ].join("");
	            this.ttlKey = "__ttl__";
	            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
	            this.ls = override || LOCAL_STORAGE;
	            !this.ls && this._noop();
	        }
	        _.mixin(PersistentStorage.prototype, {
	            _prefix: function(key) {
	                return this.prefix + key;
	            },
	            _ttlKey: function(key) {
	                return this._prefix(key) + this.ttlKey;
	            },
	            _noop: function() {
	                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
	            },
	            _safeSet: function(key, val) {
	                try {
	                    this.ls.setItem(key, val);
	                } catch (err) {
	                    if (err.name === "QuotaExceededError") {
	                        this.clear();
	                        this._noop();
	                    }
	                }
	            },
	            get: function(key) {
	                if (this.isExpired(key)) {
	                    this.remove(key);
	                }
	                return decode(this.ls.getItem(this._prefix(key)));
	            },
	            set: function(key, val, ttl) {
	                if (_.isNumber(ttl)) {
	                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
	                } else {
	                    this.ls.removeItem(this._ttlKey(key));
	                }
	                return this._safeSet(this._prefix(key), encode(val));
	            },
	            remove: function(key) {
	                this.ls.removeItem(this._ttlKey(key));
	                this.ls.removeItem(this._prefix(key));
	                return this;
	            },
	            clear: function() {
	                var i, keys = gatherMatchingKeys(this.keyMatcher);
	                for (i = keys.length; i--; ) {
	                    this.remove(keys[i]);
	                }
	                return this;
	            },
	            isExpired: function(key) {
	                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
	                return _.isNumber(ttl) && now() > ttl ? true : false;
	            }
	        });
	        return PersistentStorage;
	        function now() {
	            return new Date().getTime();
	        }
	        function encode(val) {
	            return JSON.stringify(_.isUndefined(val) ? null : val);
	        }
	        function decode(val) {
	            return $.parseJSON(val);
	        }
	        function gatherMatchingKeys(keyMatcher) {
	            var i, key, keys = [], len = LOCAL_STORAGE.length;
	            for (i = 0; i < len; i++) {
	                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
	                    keys.push(key.replace(keyMatcher, ""));
	                }
	            }
	            return keys;
	        }
	    }();
	    var Transport = function() {
	        "use strict";
	        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
	        function Transport(o) {
	            o = o || {};
	            this.cancelled = false;
	            this.lastReq = null;
	            this._send = o.transport;
	            this._get = o.limiter ? o.limiter(this._get) : this._get;
	            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
	        }
	        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
	            maxPendingRequests = num;
	        };
	        Transport.resetCache = function resetCache() {
	            sharedCache.reset();
	        };
	        _.mixin(Transport.prototype, {
	            _fingerprint: function fingerprint(o) {
	                o = o || {};
	                return o.url + o.type + $.param(o.data || {});
	            },
	            _get: function(o, cb) {
	                var that = this, fingerprint, jqXhr;
	                fingerprint = this._fingerprint(o);
	                if (this.cancelled || fingerprint !== this.lastReq) {
	                    return;
	                }
	                if (jqXhr = pendingRequests[fingerprint]) {
	                    jqXhr.done(done).fail(fail);
	                } else if (pendingRequestsCount < maxPendingRequests) {
	                    pendingRequestsCount++;
	                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
	                } else {
	                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
	                }
	                function done(resp) {
	                    cb(null, resp);
	                    that._cache.set(fingerprint, resp);
	                }
	                function fail() {
	                    cb(true);
	                }
	                function always() {
	                    pendingRequestsCount--;
	                    delete pendingRequests[fingerprint];
	                    if (that.onDeckRequestArgs) {
	                        that._get.apply(that, that.onDeckRequestArgs);
	                        that.onDeckRequestArgs = null;
	                    }
	                }
	            },
	            get: function(o, cb) {
	                var resp, fingerprint;
	                cb = cb || $.noop;
	                o = _.isString(o) ? {
	                    url: o
	                } : o || {};
	                fingerprint = this._fingerprint(o);
	                this.cancelled = false;
	                this.lastReq = fingerprint;
	                if (resp = this._cache.get(fingerprint)) {
	                    cb(null, resp);
	                } else {
	                    this._get(o, cb);
	                }
	            },
	            cancel: function() {
	                this.cancelled = true;
	            }
	        });
	        return Transport;
	    }();
	    var SearchIndex = window.SearchIndex = function() {
	        "use strict";
	        var CHILDREN = "c", IDS = "i";
	        function SearchIndex(o) {
	            o = o || {};
	            if (!o.datumTokenizer || !o.queryTokenizer) {
	                $.error("datumTokenizer and queryTokenizer are both required");
	            }
	            this.identify = o.identify || _.stringify;
	            this.datumTokenizer = o.datumTokenizer;
	            this.queryTokenizer = o.queryTokenizer;
	            this.reset();
	        }
	        _.mixin(SearchIndex.prototype, {
	            bootstrap: function bootstrap(o) {
	                this.datums = o.datums;
	                this.trie = o.trie;
	            },
	            add: function(data) {
	                var that = this;
	                data = _.isArray(data) ? data : [ data ];
	                _.each(data, function(datum) {
	                    var id, tokens;
	                    that.datums[id = that.identify(datum)] = datum;
	                    tokens = normalizeTokens(that.datumTokenizer(datum));
	                    _.each(tokens, function(token) {
	                        var node, chars, ch;
	                        node = that.trie;
	                        chars = token.split("");
	                        while (ch = chars.shift()) {
	                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
	                            node[IDS].push(id);
	                        }
	                    });
	                });
	            },
	            get: function get(ids) {
	                var that = this;
	                return _.map(ids, function(id) {
	                    return that.datums[id];
	                });
	            },
	            search: function search(query) {
	                var that = this, tokens, matches;
	                tokens = normalizeTokens(this.queryTokenizer(query));
	                _.each(tokens, function(token) {
	                    var node, chars, ch, ids;
	                    if (matches && matches.length === 0) {
	                        return false;
	                    }
	                    node = that.trie;
	                    chars = token.split("");
	                    while (node && (ch = chars.shift())) {
	                        node = node[CHILDREN][ch];
	                    }
	                    if (node && chars.length === 0) {
	                        ids = node[IDS].slice(0);
	                        matches = matches ? getIntersection(matches, ids) : ids;
	                    } else {
	                        matches = [];
	                        return false;
	                    }
	                });
	                return matches ? _.map(unique(matches), function(id) {
	                    return that.datums[id];
	                }) : [];
	            },
	            all: function all() {
	                var values = [];
	                for (var key in this.datums) {
	                    values.push(this.datums[key]);
	                }
	                return values;
	            },
	            reset: function reset() {
	                this.datums = {};
	                this.trie = newNode();
	            },
	            serialize: function serialize() {
	                return {
	                    datums: this.datums,
	                    trie: this.trie
	                };
	            }
	        });
	        return SearchIndex;
	        function normalizeTokens(tokens) {
	            tokens = _.filter(tokens, function(token) {
	                return !!token;
	            });
	            tokens = _.map(tokens, function(token) {
	                return token.toLowerCase();
	            });
	            return tokens;
	        }
	        function newNode() {
	            var node = {};
	            node[IDS] = [];
	            node[CHILDREN] = {};
	            return node;
	        }
	        function unique(array) {
	            var seen = {}, uniques = [];
	            for (var i = 0, len = array.length; i < len; i++) {
	                if (!seen[array[i]]) {
	                    seen[array[i]] = true;
	                    uniques.push(array[i]);
	                }
	            }
	            return uniques;
	        }
	        function getIntersection(arrayA, arrayB) {
	            var ai = 0, bi = 0, intersection = [];
	            arrayA = arrayA.sort();
	            arrayB = arrayB.sort();
	            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
	            while (ai < lenArrayA && bi < lenArrayB) {
	                if (arrayA[ai] < arrayB[bi]) {
	                    ai++;
	                } else if (arrayA[ai] > arrayB[bi]) {
	                    bi++;
	                } else {
	                    intersection.push(arrayA[ai]);
	                    ai++;
	                    bi++;
	                }
	            }
	            return intersection;
	        }
	    }();
	    var Prefetch = function() {
	        "use strict";
	        var keys;
	        keys = {
	            data: "data",
	            protocol: "protocol",
	            thumbprint: "thumbprint"
	        };
	        function Prefetch(o) {
	            this.url = o.url;
	            this.ttl = o.ttl;
	            this.cache = o.cache;
	            this.prepare = o.prepare;
	            this.transform = o.transform;
	            this.transport = o.transport;
	            this.thumbprint = o.thumbprint;
	            this.storage = new PersistentStorage(o.cacheKey);
	        }
	        _.mixin(Prefetch.prototype, {
	            _settings: function settings() {
	                return {
	                    url: this.url,
	                    type: "GET",
	                    dataType: "json"
	                };
	            },
	            store: function store(data) {
	                if (!this.cache) {
	                    return;
	                }
	                this.storage.set(keys.data, data, this.ttl);
	                this.storage.set(keys.protocol, location.protocol, this.ttl);
	                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
	            },
	            fromCache: function fromCache() {
	                var stored = {}, isExpired;
	                if (!this.cache) {
	                    return null;
	                }
	                stored.data = this.storage.get(keys.data);
	                stored.protocol = this.storage.get(keys.protocol);
	                stored.thumbprint = this.storage.get(keys.thumbprint);
	                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
	                return stored.data && !isExpired ? stored.data : null;
	            },
	            fromNetwork: function(cb) {
	                var that = this, settings;
	                if (!cb) {
	                    return;
	                }
	                settings = this.prepare(this._settings());
	                this.transport(settings).fail(onError).done(onResponse);
	                function onError() {
	                    cb(true);
	                }
	                function onResponse(resp) {
	                    cb(null, that.transform(resp));
	                }
	            },
	            clear: function clear() {
	                this.storage.clear();
	                return this;
	            }
	        });
	        return Prefetch;
	    }();
	    var Remote = function() {
	        "use strict";
	        function Remote(o) {
	            this.url = o.url;
	            this.prepare = o.prepare;
	            this.transform = o.transform;
	            this.transport = new Transport({
	                cache: o.cache,
	                limiter: o.limiter,
	                transport: o.transport
	            });
	        }
	        _.mixin(Remote.prototype, {
	            _settings: function settings() {
	                return {
	                    url: this.url,
	                    type: "GET",
	                    dataType: "json"
	                };
	            },
	            get: function get(query, cb) {
	                var that = this, settings;
	                if (!cb) {
	                    return;
	                }
	                query = query || "";
	                settings = this.prepare(query, this._settings());
	                return this.transport.get(settings, onResponse);
	                function onResponse(err, resp) {
	                    err ? cb([]) : cb(that.transform(resp));
	                }
	            },
	            cancelLastRequest: function cancelLastRequest() {
	                this.transport.cancel();
	            }
	        });
	        return Remote;
	    }();
	    var oParser = function() {
	        "use strict";
	        return function parse(o) {
	            var defaults, sorter;
	            defaults = {
	                initialize: true,
	                identify: _.stringify,
	                datumTokenizer: null,
	                queryTokenizer: null,
	                sufficient: 5,
	                sorter: null,
	                local: [],
	                prefetch: null,
	                remote: null
	            };
	            o = _.mixin(defaults, o || {});
	            !o.datumTokenizer && $.error("datumTokenizer is required");
	            !o.queryTokenizer && $.error("queryTokenizer is required");
	            sorter = o.sorter;
	            o.sorter = sorter ? function(x) {
	                return x.sort(sorter);
	            } : _.identity;
	            o.local = _.isFunction(o.local) ? o.local() : o.local;
	            o.prefetch = parsePrefetch(o.prefetch);
	            o.remote = parseRemote(o.remote);
	            return o;
	        };
	        function parsePrefetch(o) {
	            var defaults;
	            if (!o) {
	                return null;
	            }
	            defaults = {
	                url: null,
	                ttl: 24 * 60 * 60 * 1e3,
	                cache: true,
	                cacheKey: null,
	                thumbprint: "",
	                prepare: _.identity,
	                transform: _.identity,
	                transport: null
	            };
	            o = _.isString(o) ? {
	                url: o
	            } : o;
	            o = _.mixin(defaults, o);
	            !o.url && $.error("prefetch requires url to be set");
	            o.transform = o.filter || o.transform;
	            o.cacheKey = o.cacheKey || o.url;
	            o.thumbprint = VERSION + o.thumbprint;
	            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
	            return o;
	        }
	        function parseRemote(o) {
	            var defaults;
	            if (!o) {
	                return;
	            }
	            defaults = {
	                url: null,
	                cache: true,
	                prepare: null,
	                replace: null,
	                wildcard: null,
	                limiter: null,
	                rateLimitBy: "debounce",
	                rateLimitWait: 300,
	                transform: _.identity,
	                transport: null
	            };
	            o = _.isString(o) ? {
	                url: o
	            } : o;
	            o = _.mixin(defaults, o);
	            !o.url && $.error("remote requires url to be set");
	            o.transform = o.filter || o.transform;
	            o.prepare = toRemotePrepare(o);
	            o.limiter = toLimiter(o);
	            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
	            delete o.replace;
	            delete o.wildcard;
	            delete o.rateLimitBy;
	            delete o.rateLimitWait;
	            return o;
	        }
	        function toRemotePrepare(o) {
	            var prepare, replace, wildcard;
	            prepare = o.prepare;
	            replace = o.replace;
	            wildcard = o.wildcard;
	            if (prepare) {
	                return prepare;
	            }
	            if (replace) {
	                prepare = prepareByReplace;
	            } else if (o.wildcard) {
	                prepare = prepareByWildcard;
	            } else {
	                prepare = idenityPrepare;
	            }
	            return prepare;
	            function prepareByReplace(query, settings) {
	                settings.url = replace(settings.url, query);
	                return settings;
	            }
	            function prepareByWildcard(query, settings) {
	                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
	                return settings;
	            }
	            function idenityPrepare(query, settings) {
	                return settings;
	            }
	        }
	        function toLimiter(o) {
	            var limiter, method, wait;
	            limiter = o.limiter;
	            method = o.rateLimitBy;
	            wait = o.rateLimitWait;
	            if (!limiter) {
	                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
	            }
	            return limiter;
	            function debounce(wait) {
	                return function debounce(fn) {
	                    return _.debounce(fn, wait);
	                };
	            }
	            function throttle(wait) {
	                return function throttle(fn) {
	                    return _.throttle(fn, wait);
	                };
	            }
	        }
	        function callbackToDeferred(fn) {
	            return function wrapper(o) {
	                var deferred = $.Deferred();
	                fn(o, onSuccess, onError);
	                return deferred;
	                function onSuccess(resp) {
	                    _.defer(function() {
	                        deferred.resolve(resp);
	                    });
	                }
	                function onError(err) {
	                    _.defer(function() {
	                        deferred.reject(err);
	                    });
	                }
	            };
	        }
	    }();
	    var Bloodhound = function() {
	        "use strict";
	        var old;
	        old = window && window.Bloodhound;
	        function Bloodhound(o) {
	            o = oParser(o);
	            this.sorter = o.sorter;
	            this.identify = o.identify;
	            this.sufficient = o.sufficient;
	            this.local = o.local;
	            this.remote = o.remote ? new Remote(o.remote) : null;
	            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
	            this.index = new SearchIndex({
	                identify: this.identify,
	                datumTokenizer: o.datumTokenizer,
	                queryTokenizer: o.queryTokenizer
	            });
	            o.initialize !== false && this.initialize();
	        }
	        Bloodhound.noConflict = function noConflict() {
	            window && (window.Bloodhound = old);
	            return Bloodhound;
	        };
	        Bloodhound.tokenizers = tokenizers;
	        _.mixin(Bloodhound.prototype, {
	            __ttAdapter: function ttAdapter() {
	                var that = this;
	                return this.remote ? withAsync : withoutAsync;
	                function withAsync(query, sync, async) {
	                    return that.search(query, sync, async);
	                }
	                function withoutAsync(query, sync) {
	                    return that.search(query, sync);
	                }
	            },
	            _loadPrefetch: function loadPrefetch() {
	                var that = this, deferred, serialized;
	                deferred = $.Deferred();
	                if (!this.prefetch) {
	                    deferred.resolve();
	                } else if (serialized = this.prefetch.fromCache()) {
	                    this.index.bootstrap(serialized);
	                    deferred.resolve();
	                } else {
	                    this.prefetch.fromNetwork(done);
	                }
	                return deferred.promise();
	                function done(err, data) {
	                    if (err) {
	                        return deferred.reject();
	                    }
	                    that.add(data);
	                    that.prefetch.store(that.index.serialize());
	                    deferred.resolve();
	                }
	            },
	            _initialize: function initialize() {
	                var that = this, deferred;
	                this.clear();
	                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
	                return this.initPromise;
	                function addLocalToIndex() {
	                    that.add(that.local);
	                }
	            },
	            initialize: function initialize(force) {
	                return !this.initPromise || force ? this._initialize() : this.initPromise;
	            },
	            add: function add(data) {
	                this.index.add(data);
	                return this;
	            },
	            get: function get(ids) {
	                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
	                return this.index.get(ids);
	            },
	            search: function search(query, sync, async) {
	                var that = this, local;
	                local = this.sorter(this.index.search(query));
	                sync(this.remote ? local.slice() : local);
	                if (this.remote && local.length < this.sufficient) {
	                    this.remote.get(query, processRemote);
	                } else if (this.remote) {
	                    this.remote.cancelLastRequest();
	                }
	                return this;
	                function processRemote(remote) {
	                    var nonDuplicates = [];
	                    _.each(remote, function(r) {
	                        !_.some(local, function(l) {
	                            return that.identify(r) === that.identify(l);
	                        }) && nonDuplicates.push(r);
	                    });
	                    async && async(nonDuplicates);
	                }
	            },
	            all: function all() {
	                return this.index.all();
	            },
	            clear: function clear() {
	                this.index.reset();
	                return this;
	            },
	            clearPrefetchCache: function clearPrefetchCache() {
	                this.prefetch && this.prefetch.clear();
	                return this;
	            },
	            clearRemoteCache: function clearRemoteCache() {
	                Transport.resetCache();
	                return this;
	            },
	            ttAdapter: function ttAdapter() {
	                return this.__ttAdapter();
	            }
	        });
	        return Bloodhound;
	    }();
	    return Bloodhound;
	});

	/*** EXPORTS FROM exports-loader ***/
	module.exports = window.Bloodhound}.call(window));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	     _ _      _       _
	 ___| (_) ___| | __  (_)___
	/ __| | |/ __| |/ /  | / __|
	\__ \ | | (__|   < _ | \__ \
	|___/_|_|\___|_|\_(_)/ |___/
	                   |__/

	 Version: 1.5.8
	  Author: Ken Wheeler
	 Website: http://kenwheeler.github.io
	    Docs: http://kenwheeler.github.io/slick
	    Repo: http://github.com/kenwheeler/slick
	  Issues: http://github.com/kenwheeler/slick/issues

	 */
	/* global window, document, define, jQuery, setInterval, clearInterval */
	(function(factory) {
	    'use strict';
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== 'undefined') {
	        module.exports = factory(require('jquery'));
	    } else {
	        factory(jQuery);
	    }

	}(function($) {
	    'use strict';
	    var Slick = window.Slick || {};

	    Slick = (function() {

	        var instanceUid = 0;

	        function Slick(element, settings) {

	            var _ = this, dataSettings;

	            _.defaults = {
	                accessibility: true,
	                adaptiveHeight: false,
	                appendArrows: $(element),
	                appendDots: $(element),
	                arrows: true,
	                asNavFor: null,
	                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
	                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
	                autoplay: false,
	                autoplaySpeed: 3000,
	                centerMode: false,
	                centerPadding: '50px',
	                cssEase: 'ease',
	                customPaging: function(slider, i) {
	                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
	                },
	                dots: false,
	                dotsClass: 'slick-dots',
	                draggable: true,
	                easing: 'linear',
	                edgeFriction: 0.35,
	                fade: false,
	                focusOnSelect: false,
	                infinite: true,
	                initialSlide: 0,
	                lazyLoad: 'ondemand',
	                mobileFirst: false,
	                pauseOnHover: true,
	                pauseOnDotsHover: false,
	                respondTo: 'window',
	                responsive: null,
	                rows: 1,
	                rtl: false,
	                slide: '',
	                slidesPerRow: 1,
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                speed: 500,
	                swipe: true,
	                swipeToSlide: false,
	                touchMove: true,
	                touchThreshold: 5,
	                useCSS: true,
	                variableWidth: false,
	                vertical: false,
	                verticalSwiping: false,
	                waitForAnimate: true,
	                zIndex: 1000
	            };

	            _.initials = {
	                animating: false,
	                dragging: false,
	                autoPlayTimer: null,
	                currentDirection: 0,
	                currentLeft: null,
	                currentSlide: 0,
	                direction: 1,
	                $dots: null,
	                listWidth: null,
	                listHeight: null,
	                loadIndex: 0,
	                $nextArrow: null,
	                $prevArrow: null,
	                slideCount: null,
	                slideWidth: null,
	                $slideTrack: null,
	                $slides: null,
	                sliding: false,
	                slideOffset: 0,
	                swipeLeft: null,
	                $list: null,
	                touchObject: {},
	                transformsEnabled: false,
	                unslicked: false
	            };

	            $.extend(_, _.initials);

	            _.activeBreakpoint = null;
	            _.animType = null;
	            _.animProp = null;
	            _.breakpoints = [];
	            _.breakpointSettings = [];
	            _.cssTransitions = false;
	            _.hidden = 'hidden';
	            _.paused = false;
	            _.positionProp = null;
	            _.respondTo = null;
	            _.rowCount = 1;
	            _.shouldClick = true;
	            _.$slider = $(element);
	            _.$slidesCache = null;
	            _.transformType = null;
	            _.transitionType = null;
	            _.visibilityChange = 'visibilitychange';
	            _.windowWidth = 0;
	            _.windowTimer = null;

	            dataSettings = $(element).data('slick') || {};

	            _.options = $.extend({}, _.defaults, dataSettings, settings);

	            _.currentSlide = _.options.initialSlide;

	            _.originalSettings = _.options;

	            if (typeof document.mozHidden !== 'undefined') {
	                _.hidden = 'mozHidden';
	                _.visibilityChange = 'mozvisibilitychange';
	            } else if (typeof document.webkitHidden !== 'undefined') {
	                _.hidden = 'webkitHidden';
	                _.visibilityChange = 'webkitvisibilitychange';
	            }

	            _.autoPlay = $.proxy(_.autoPlay, _);
	            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
	            _.changeSlide = $.proxy(_.changeSlide, _);
	            _.clickHandler = $.proxy(_.clickHandler, _);
	            _.selectHandler = $.proxy(_.selectHandler, _);
	            _.setPosition = $.proxy(_.setPosition, _);
	            _.swipeHandler = $.proxy(_.swipeHandler, _);
	            _.dragHandler = $.proxy(_.dragHandler, _);
	            _.keyHandler = $.proxy(_.keyHandler, _);
	            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);

	            _.instanceUid = instanceUid++;

	            // A simple way to check for HTML strings
	            // Strict HTML recognition (must start with <)
	            // Extracted from jQuery v1.11 source
	            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


	            _.registerBreakpoints();
	            _.init(true);
	            _.checkResponsive(true);

	        }

	        return Slick;

	    }());

	    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

	        var _ = this;

	        if (typeof(index) === 'boolean') {
	            addBefore = index;
	            index = null;
	        } else if (index < 0 || (index >= _.slideCount)) {
	            return false;
	        }

	        _.unload();

	        if (typeof(index) === 'number') {
	            if (index === 0 && _.$slides.length === 0) {
	                $(markup).appendTo(_.$slideTrack);
	            } else if (addBefore) {
	                $(markup).insertBefore(_.$slides.eq(index));
	            } else {
	                $(markup).insertAfter(_.$slides.eq(index));
	            }
	        } else {
	            if (addBefore === true) {
	                $(markup).prependTo(_.$slideTrack);
	            } else {
	                $(markup).appendTo(_.$slideTrack);
	            }
	        }

	        _.$slides = _.$slideTrack.children(this.options.slide);

	        _.$slideTrack.children(this.options.slide).detach();

	        _.$slideTrack.append(_.$slides);

	        _.$slides.each(function(index, element) {
	            $(element).attr('data-slick-index', index);
	        });

	        _.$slidesCache = _.$slides;

	        _.reinit();

	    };

	    Slick.prototype.animateHeight = function() {
	        var _ = this;
	        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
	            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
	            _.$list.animate({
	                height: targetHeight
	            }, _.options.speed);
	        }
	    };

	    Slick.prototype.animateSlide = function(targetLeft, callback) {

	        var animProps = {},
	            _ = this;

	        _.animateHeight();

	        if (_.options.rtl === true && _.options.vertical === false) {
	            targetLeft = -targetLeft;
	        }
	        if (_.transformsEnabled === false) {
	            if (_.options.vertical === false) {
	                _.$slideTrack.animate({
	                    left: targetLeft
	                }, _.options.speed, _.options.easing, callback);
	            } else {
	                _.$slideTrack.animate({
	                    top: targetLeft
	                }, _.options.speed, _.options.easing, callback);
	            }

	        } else {

	            if (_.cssTransitions === false) {
	                if (_.options.rtl === true) {
	                    _.currentLeft = -(_.currentLeft);
	                }
	                $({
	                    animStart: _.currentLeft
	                }).animate({
	                    animStart: targetLeft
	                }, {
	                    duration: _.options.speed,
	                    easing: _.options.easing,
	                    step: function(now) {
	                        now = Math.ceil(now);
	                        if (_.options.vertical === false) {
	                            animProps[_.animType] = 'translate(' +
	                                now + 'px, 0px)';
	                            _.$slideTrack.css(animProps);
	                        } else {
	                            animProps[_.animType] = 'translate(0px,' +
	                                now + 'px)';
	                            _.$slideTrack.css(animProps);
	                        }
	                    },
	                    complete: function() {
	                        if (callback) {
	                            callback.call();
	                        }
	                    }
	                });

	            } else {

	                _.applyTransition();
	                targetLeft = Math.ceil(targetLeft);

	                if (_.options.vertical === false) {
	                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
	                } else {
	                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
	                }
	                _.$slideTrack.css(animProps);

	                if (callback) {
	                    setTimeout(function() {

	                        _.disableTransition();

	                        callback.call();
	                    }, _.options.speed);
	                }

	            }

	        }

	    };

	    Slick.prototype.asNavFor = function(index) {

	        var _ = this,
	            asNavFor = _.options.asNavFor;

	        if ( asNavFor && asNavFor !== null ) {
	            asNavFor = $(asNavFor).not(_.$slider);
	        }

	        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
	            asNavFor.each(function() {
	                var target = $(this).slick('getSlick');
	                if(!target.unslicked) {
	                    target.slideHandler(index, true);
	                }
	            });
	        }

	    };

	    Slick.prototype.applyTransition = function(slide) {

	        var _ = this,
	            transition = {};

	        if (_.options.fade === false) {
	            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
	        } else {
	            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
	        }

	        if (_.options.fade === false) {
	            _.$slideTrack.css(transition);
	        } else {
	            _.$slides.eq(slide).css(transition);
	        }

	    };

	    Slick.prototype.autoPlay = function() {

	        var _ = this;

	        if (_.autoPlayTimer) {
	            clearInterval(_.autoPlayTimer);
	        }

	        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
	            _.autoPlayTimer = setInterval(_.autoPlayIterator,
	                _.options.autoplaySpeed);
	        }

	    };

	    Slick.prototype.autoPlayClear = function() {

	        var _ = this;
	        if (_.autoPlayTimer) {
	            clearInterval(_.autoPlayTimer);
	        }

	    };

	    Slick.prototype.autoPlayIterator = function() {

	        var _ = this;

	        if (_.options.infinite === false) {

	            if (_.direction === 1) {

	                if ((_.currentSlide + 1) === _.slideCount -
	                    1) {
	                    _.direction = 0;
	                }

	                _.slideHandler(_.currentSlide + _.options.slidesToScroll);

	            } else {

	                if ((_.currentSlide - 1 === 0)) {

	                    _.direction = 1;

	                }

	                _.slideHandler(_.currentSlide - _.options.slidesToScroll);

	            }

	        } else {

	            _.slideHandler(_.currentSlide + _.options.slidesToScroll);

	        }

	    };

	    Slick.prototype.buildArrows = function() {

	        var _ = this;

	        if (_.options.arrows === true ) {

	            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
	            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

	            if( _.slideCount > _.options.slidesToShow ) {

	                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
	                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

	                if (_.htmlExpr.test(_.options.prevArrow)) {
	                    _.$prevArrow.prependTo(_.options.appendArrows);
	                }

	                if (_.htmlExpr.test(_.options.nextArrow)) {
	                    _.$nextArrow.appendTo(_.options.appendArrows);
	                }

	                if (_.options.infinite !== true) {
	                    _.$prevArrow
	                        .addClass('slick-disabled')
	                        .attr('aria-disabled', 'true');
	                }

	            } else {

	                _.$prevArrow.add( _.$nextArrow )

	                    .addClass('slick-hidden')
	                    .attr({
	                        'aria-disabled': 'true',
	                        'tabindex': '-1'
	                    });

	            }

	        }

	    };

	    Slick.prototype.buildDots = function() {

	        var _ = this,
	            i, dotString;

	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

	            dotString = '<ul class="' + _.options.dotsClass + '">';

	            for (i = 0; i <= _.getDotCount(); i += 1) {
	                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
	            }

	            dotString += '</ul>';

	            _.$dots = $(dotString).appendTo(
	                _.options.appendDots);

	            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

	        }

	    };

	    Slick.prototype.buildOut = function() {

	        var _ = this;

	        _.$slides =
	            _.$slider
	                .children( _.options.slide + ':not(.slick-cloned)')
	                .addClass('slick-slide');

	        _.slideCount = _.$slides.length;

	        _.$slides.each(function(index, element) {
	            $(element)
	                .attr('data-slick-index', index)
	                .data('originalStyling', $(element).attr('style') || '');
	        });

	        _.$slidesCache = _.$slides;

	        _.$slider.addClass('slick-slider');

	        _.$slideTrack = (_.slideCount === 0) ?
	            $('<div class="slick-track"/>').appendTo(_.$slider) :
	            _.$slides.wrapAll('<div class="slick-track"/>').parent();

	        _.$list = _.$slideTrack.wrap(
	            '<div aria-live="polite" class="slick-list"/>').parent();
	        _.$slideTrack.css('opacity', 0);

	        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
	            _.options.slidesToScroll = 1;
	        }

	        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

	        _.setupInfinite();

	        _.buildArrows();

	        _.buildDots();

	        _.updateDots();


	        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

	        if (_.options.draggable === true) {
	            _.$list.addClass('draggable');
	        }

	    };

	    Slick.prototype.buildRows = function() {

	        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

	        newSlides = document.createDocumentFragment();
	        originalSlides = _.$slider.children();

	        if(_.options.rows > 1) {

	            slidesPerSection = _.options.slidesPerRow * _.options.rows;
	            numOfSlides = Math.ceil(
	                originalSlides.length / slidesPerSection
	            );

	            for(a = 0; a < numOfSlides; a++){
	                var slide = document.createElement('div');
	                for(b = 0; b < _.options.rows; b++) {
	                    var row = document.createElement('div');
	                    for(c = 0; c < _.options.slidesPerRow; c++) {
	                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
	                        if (originalSlides.get(target)) {
	                            row.appendChild(originalSlides.get(target));
	                        }
	                    }
	                    slide.appendChild(row);
	                }
	                newSlides.appendChild(slide);
	            }

	            _.$slider.html(newSlides);
	            _.$slider.children().children().children()
	                .css({
	                    'width':(100 / _.options.slidesPerRow) + '%',
	                    'display': 'inline-block'
	                });

	        }

	    };

	    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

	        var _ = this,
	            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
	        var sliderWidth = _.$slider.width();
	        var windowWidth = window.innerWidth || $(window).width();

	        if (_.respondTo === 'window') {
	            respondToWidth = windowWidth;
	        } else if (_.respondTo === 'slider') {
	            respondToWidth = sliderWidth;
	        } else if (_.respondTo === 'min') {
	            respondToWidth = Math.min(windowWidth, sliderWidth);
	        }

	        if ( _.options.responsive &&
	            _.options.responsive.length &&
	            _.options.responsive !== null) {

	            targetBreakpoint = null;

	            for (breakpoint in _.breakpoints) {
	                if (_.breakpoints.hasOwnProperty(breakpoint)) {
	                    if (_.originalSettings.mobileFirst === false) {
	                        if (respondToWidth < _.breakpoints[breakpoint]) {
	                            targetBreakpoint = _.breakpoints[breakpoint];
	                        }
	                    } else {
	                        if (respondToWidth > _.breakpoints[breakpoint]) {
	                            targetBreakpoint = _.breakpoints[breakpoint];
	                        }
	                    }
	                }
	            }

	            if (targetBreakpoint !== null) {
	                if (_.activeBreakpoint !== null) {
	                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
	                        _.activeBreakpoint =
	                            targetBreakpoint;
	                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
	                            _.unslick(targetBreakpoint);
	                        } else {
	                            _.options = $.extend({}, _.originalSettings,
	                                _.breakpointSettings[
	                                    targetBreakpoint]);
	                            if (initial === true) {
	                                _.currentSlide = _.options.initialSlide;
	                            }
	                            _.refresh(initial);
	                        }
	                        triggerBreakpoint = targetBreakpoint;
	                    }
	                } else {
	                    _.activeBreakpoint = targetBreakpoint;
	                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
	                        _.unslick(targetBreakpoint);
	                    } else {
	                        _.options = $.extend({}, _.originalSettings,
	                            _.breakpointSettings[
	                                targetBreakpoint]);
	                        if (initial === true) {
	                            _.currentSlide = _.options.initialSlide;
	                        }
	                        _.refresh(initial);
	                    }
	                    triggerBreakpoint = targetBreakpoint;
	                }
	            } else {
	                if (_.activeBreakpoint !== null) {
	                    _.activeBreakpoint = null;
	                    _.options = _.originalSettings;
	                    if (initial === true) {
	                        _.currentSlide = _.options.initialSlide;
	                    }
	                    _.refresh(initial);
	                    triggerBreakpoint = targetBreakpoint;
	                }
	            }

	            // only trigger breakpoints during an actual break. not on initialize.
	            if( !initial && triggerBreakpoint !== false ) {
	                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
	            }
	        }

	    };

	    Slick.prototype.changeSlide = function(event, dontAnimate) {

	        var _ = this,
	            $target = $(event.target),
	            indexOffset, slideOffset, unevenOffset;

	        // If target is a link, prevent default action.
	        if($target.is('a')) {
	            event.preventDefault();
	        }

	        // If target is not the <li> element (ie: a child), find the <li>.
	        if(!$target.is('li')) {
	            $target = $target.closest('li');
	        }

	        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
	        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

	        switch (event.data.message) {

	            case 'previous':
	                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
	                if (_.slideCount > _.options.slidesToShow) {
	                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
	                }
	                break;

	            case 'next':
	                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
	                if (_.slideCount > _.options.slidesToShow) {
	                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
	                }
	                break;

	            case 'index':
	                var index = event.data.index === 0 ? 0 :
	                    event.data.index || $target.index() * _.options.slidesToScroll;

	                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
	                $target.children().trigger('focus');
	                break;

	            default:
	                return;
	        }

	    };

	    Slick.prototype.checkNavigable = function(index) {

	        var _ = this,
	            navigables, prevNavigable;

	        navigables = _.getNavigableIndexes();
	        prevNavigable = 0;
	        if (index > navigables[navigables.length - 1]) {
	            index = navigables[navigables.length - 1];
	        } else {
	            for (var n in navigables) {
	                if (index < navigables[n]) {
	                    index = prevNavigable;
	                    break;
	                }
	                prevNavigable = navigables[n];
	            }
	        }

	        return index;
	    };

	    Slick.prototype.cleanUpEvents = function() {

	        var _ = this;

	        if (_.options.dots && _.$dots !== null) {

	            $('li', _.$dots).off('click.slick', _.changeSlide);

	            if (_.options.pauseOnDotsHover === true && _.options.autoplay === true) {

	                $('li', _.$dots)
	                    .off('mouseenter.slick', $.proxy(_.setPaused, _, true))
	                    .off('mouseleave.slick', $.proxy(_.setPaused, _, false));

	            }

	        }

	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
	            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
	            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
	        }

	        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
	        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
	        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
	        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

	        _.$list.off('click.slick', _.clickHandler);

	        $(document).off(_.visibilityChange, _.visibility);

	        _.$list.off('mouseenter.slick', $.proxy(_.setPaused, _, true));
	        _.$list.off('mouseleave.slick', $.proxy(_.setPaused, _, false));

	        if (_.options.accessibility === true) {
	            _.$list.off('keydown.slick', _.keyHandler);
	        }

	        if (_.options.focusOnSelect === true) {
	            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
	        }

	        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

	        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

	        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

	        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
	        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
	    };

	    Slick.prototype.cleanUpRows = function() {

	        var _ = this, originalSlides;

	        if(_.options.rows > 1) {
	            originalSlides = _.$slides.children().children();
	            originalSlides.removeAttr('style');
	            _.$slider.html(originalSlides);
	        }

	    };

	    Slick.prototype.clickHandler = function(event) {

	        var _ = this;

	        if (_.shouldClick === false) {
	            event.stopImmediatePropagation();
	            event.stopPropagation();
	            event.preventDefault();
	        }

	    };

	    Slick.prototype.destroy = function(refresh) {

	        var _ = this;

	        _.autoPlayClear();

	        _.touchObject = {};

	        _.cleanUpEvents();

	        $('.slick-cloned', _.$slider).detach();

	        if (_.$dots) {
	            _.$dots.remove();
	        }


	        if ( _.$prevArrow && _.$prevArrow.length ) {

	            _.$prevArrow
	                .removeClass('slick-disabled slick-arrow slick-hidden')
	                .removeAttr('aria-hidden aria-disabled tabindex')
	                .css("display","");

	            if ( _.htmlExpr.test( _.options.prevArrow )) {
	                _.$prevArrow.remove();
	            }
	        }

	        if ( _.$nextArrow && _.$nextArrow.length ) {

	            _.$nextArrow
	                .removeClass('slick-disabled slick-arrow slick-hidden')
	                .removeAttr('aria-hidden aria-disabled tabindex')
	                .css("display","");

	            if ( _.htmlExpr.test( _.options.nextArrow )) {
	                _.$nextArrow.remove();
	            }

	        }


	        if (_.$slides) {

	            _.$slides
	                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
	                .removeAttr('aria-hidden')
	                .removeAttr('data-slick-index')
	                .each(function(){
	                    $(this).attr('style', $(this).data('originalStyling'));
	                });

	            _.$slideTrack.children(this.options.slide).detach();

	            _.$slideTrack.detach();

	            _.$list.detach();

	            _.$slider.append(_.$slides);
	        }

	        _.cleanUpRows();

	        _.$slider.removeClass('slick-slider');
	        _.$slider.removeClass('slick-initialized');

	        _.unslicked = true;

	        if(!refresh) {
	            _.$slider.trigger('destroy', [_]);
	        }

	    };

	    Slick.prototype.disableTransition = function(slide) {

	        var _ = this,
	            transition = {};

	        transition[_.transitionType] = '';

	        if (_.options.fade === false) {
	            _.$slideTrack.css(transition);
	        } else {
	            _.$slides.eq(slide).css(transition);
	        }

	    };

	    Slick.prototype.fadeSlide = function(slideIndex, callback) {

	        var _ = this;

	        if (_.cssTransitions === false) {

	            _.$slides.eq(slideIndex).css({
	                zIndex: _.options.zIndex
	            });

	            _.$slides.eq(slideIndex).animate({
	                opacity: 1
	            }, _.options.speed, _.options.easing, callback);

	        } else {

	            _.applyTransition(slideIndex);

	            _.$slides.eq(slideIndex).css({
	                opacity: 1,
	                zIndex: _.options.zIndex
	            });

	            if (callback) {
	                setTimeout(function() {

	                    _.disableTransition(slideIndex);

	                    callback.call();
	                }, _.options.speed);
	            }

	        }

	    };

	    Slick.prototype.fadeSlideOut = function(slideIndex) {

	        var _ = this;

	        if (_.cssTransitions === false) {

	            _.$slides.eq(slideIndex).animate({
	                opacity: 0,
	                zIndex: _.options.zIndex - 2
	            }, _.options.speed, _.options.easing);

	        } else {

	            _.applyTransition(slideIndex);

	            _.$slides.eq(slideIndex).css({
	                opacity: 0,
	                zIndex: _.options.zIndex - 2
	            });

	        }

	    };

	    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

	        var _ = this;

	        if (filter !== null) {

	            _.unload();

	            _.$slideTrack.children(this.options.slide).detach();

	            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

	            _.reinit();

	        }

	    };

	    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

	        var _ = this;
	        return _.currentSlide;

	    };

	    Slick.prototype.getDotCount = function() {

	        var _ = this;

	        var breakPoint = 0;
	        var counter = 0;
	        var pagerQty = 0;

	        if (_.options.infinite === true) {
	            while (breakPoint < _.slideCount) {
	                ++pagerQty;
	                breakPoint = counter + _.options.slidesToShow;
	                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
	            }
	        } else if (_.options.centerMode === true) {
	            pagerQty = _.slideCount;
	        } else {
	            while (breakPoint < _.slideCount) {
	                ++pagerQty;
	                breakPoint = counter + _.options.slidesToShow;
	                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
	            }
	        }

	        return pagerQty - 1;

	    };

	    Slick.prototype.getLeft = function(slideIndex) {

	        var _ = this,
	            targetLeft,
	            verticalHeight,
	            verticalOffset = 0,
	            targetSlide;

	        _.slideOffset = 0;
	        verticalHeight = _.$slides.first().outerHeight(true);

	        if (_.options.infinite === true) {
	            if (_.slideCount > _.options.slidesToShow) {
	                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
	                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
	            }
	            if (_.slideCount % _.options.slidesToScroll !== 0) {
	                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
	                    if (slideIndex > _.slideCount) {
	                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
	                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
	                    } else {
	                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
	                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
	                    }
	                }
	            }
	        } else {
	            if (slideIndex + _.options.slidesToShow > _.slideCount) {
	                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
	                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
	            }
	        }

	        if (_.slideCount <= _.options.slidesToShow) {
	            _.slideOffset = 0;
	            verticalOffset = 0;
	        }

	        if (_.options.centerMode === true && _.options.infinite === true) {
	            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
	        } else if (_.options.centerMode === true) {
	            _.slideOffset = 0;
	            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
	        }

	        if (_.options.vertical === false) {
	            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
	        } else {
	            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
	        }

	        if (_.options.variableWidth === true) {

	            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
	                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
	            } else {
	                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
	            }

	            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;

	            if (_.options.centerMode === true) {
	                if (_.options.infinite === false) {
	                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
	                } else {
	                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
	                }
	                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
	                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
	            }
	        }

	        return targetLeft;

	    };

	    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

	        var _ = this;

	        return _.options[option];

	    };

	    Slick.prototype.getNavigableIndexes = function() {

	        var _ = this,
	            breakPoint = 0,
	            counter = 0,
	            indexes = [],
	            max;

	        if (_.options.infinite === false) {
	            max = _.slideCount;
	        } else {
	            breakPoint = _.options.slidesToScroll * -1;
	            counter = _.options.slidesToScroll * -1;
	            max = _.slideCount * 2;
	        }

	        while (breakPoint < max) {
	            indexes.push(breakPoint);
	            breakPoint = counter + _.options.slidesToScroll;
	            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
	        }

	        return indexes;

	    };

	    Slick.prototype.getSlick = function() {

	        return this;

	    };

	    Slick.prototype.getSlideCount = function() {

	        var _ = this,
	            slidesTraversed, swipedSlide, centerOffset;

	        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

	        if (_.options.swipeToSlide === true) {
	            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
	                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
	                    swipedSlide = slide;
	                    return false;
	                }
	            });

	            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

	            return slidesTraversed;

	        } else {
	            return _.options.slidesToScroll;
	        }

	    };

	    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

	        var _ = this;

	        _.changeSlide({
	            data: {
	                message: 'index',
	                index: parseInt(slide)
	            }
	        }, dontAnimate);

	    };

	    Slick.prototype.init = function(creation) {

	        var _ = this;

	        if (!$(_.$slider).hasClass('slick-initialized')) {

	            $(_.$slider).addClass('slick-initialized');

	            _.buildRows();
	            _.buildOut();
	            _.setProps();
	            _.startLoad();
	            _.loadSlider();
	            _.initializeEvents();
	            _.updateArrows();
	            _.updateDots();

	        }

	        if (creation) {
	            _.$slider.trigger('init', [_]);
	        }

	        if (_.options.accessibility === true) {
	            _.initADA();
	        }

	    };

	    Slick.prototype.initArrowEvents = function() {

	        var _ = this;

	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
	            _.$prevArrow.on('click.slick', {
	                message: 'previous'
	            }, _.changeSlide);
	            _.$nextArrow.on('click.slick', {
	                message: 'next'
	            }, _.changeSlide);
	        }

	    };

	    Slick.prototype.initDotEvents = function() {

	        var _ = this;

	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
	            $('li', _.$dots).on('click.slick', {
	                message: 'index'
	            }, _.changeSlide);
	        }

	        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
	            $('li', _.$dots)
	                .on('mouseenter.slick', $.proxy(_.setPaused, _, true))
	                .on('mouseleave.slick', $.proxy(_.setPaused, _, false));
	        }

	    };

	    Slick.prototype.initializeEvents = function() {

	        var _ = this;

	        _.initArrowEvents();

	        _.initDotEvents();

	        _.$list.on('touchstart.slick mousedown.slick', {
	            action: 'start'
	        }, _.swipeHandler);
	        _.$list.on('touchmove.slick mousemove.slick', {
	            action: 'move'
	        }, _.swipeHandler);
	        _.$list.on('touchend.slick mouseup.slick', {
	            action: 'end'
	        }, _.swipeHandler);
	        _.$list.on('touchcancel.slick mouseleave.slick', {
	            action: 'end'
	        }, _.swipeHandler);

	        _.$list.on('click.slick', _.clickHandler);

	        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

	        _.$list.on('mouseenter.slick', $.proxy(_.setPaused, _, true));
	        _.$list.on('mouseleave.slick', $.proxy(_.setPaused, _, false));

	        if (_.options.accessibility === true) {
	            _.$list.on('keydown.slick', _.keyHandler);
	        }

	        if (_.options.focusOnSelect === true) {
	            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
	        }

	        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

	        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

	        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

	        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
	        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

	    };

	    Slick.prototype.initUI = function() {

	        var _ = this;

	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

	            _.$prevArrow.show();
	            _.$nextArrow.show();

	        }

	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

	            _.$dots.show();

	        }

	        if (_.options.autoplay === true) {

	            _.autoPlay();

	        }

	    };

	    Slick.prototype.keyHandler = function(event) {

	        var _ = this;
	         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
	        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
	            if (event.keyCode === 37 && _.options.accessibility === true) {
	                _.changeSlide({
	                    data: {
	                        message: 'previous'
	                    }
	                });
	            } else if (event.keyCode === 39 && _.options.accessibility === true) {
	                _.changeSlide({
	                    data: {
	                        message: 'next'
	                    }
	                });
	            }
	        }

	    };

	    Slick.prototype.lazyLoad = function() {

	        var _ = this,
	            loadRange, cloneRange, rangeStart, rangeEnd;

	        function loadImages(imagesScope) {
	            $('img[data-lazy]', imagesScope).each(function() {

	                var image = $(this),
	                    imageSource = $(this).attr('data-lazy'),
	                    imageToLoad = document.createElement('img');

	                imageToLoad.onload = function() {
	                    image
	                        .animate({ opacity: 0 }, 100, function() {
	                            image
	                                .attr('src', imageSource)
	                                .animate({ opacity: 1 }, 200, function() {
	                                    image
	                                        .removeAttr('data-lazy')
	                                        .removeClass('slick-loading');
	                                });
	                        });
	                };

	                imageToLoad.src = imageSource;

	            });
	        }

	        if (_.options.centerMode === true) {
	            if (_.options.infinite === true) {
	                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
	                rangeEnd = rangeStart + _.options.slidesToShow + 2;
	            } else {
	                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
	                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
	            }
	        } else {
	            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
	            rangeEnd = rangeStart + _.options.slidesToShow;
	            if (_.options.fade === true) {
	                if (rangeStart > 0) rangeStart--;
	                if (rangeEnd <= _.slideCount) rangeEnd++;
	            }
	        }

	        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
	        loadImages(loadRange);

	        if (_.slideCount <= _.options.slidesToShow) {
	            cloneRange = _.$slider.find('.slick-slide');
	            loadImages(cloneRange);
	        } else
	        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
	            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
	            loadImages(cloneRange);
	        } else if (_.currentSlide === 0) {
	            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
	            loadImages(cloneRange);
	        }

	    };

	    Slick.prototype.loadSlider = function() {

	        var _ = this;

	        _.setPosition();

	        _.$slideTrack.css({
	            opacity: 1
	        });

	        _.$slider.removeClass('slick-loading');

	        _.initUI();

	        if (_.options.lazyLoad === 'progressive') {
	            _.progressiveLazyLoad();
	        }

	    };

	    Slick.prototype.next = Slick.prototype.slickNext = function() {

	        var _ = this;

	        _.changeSlide({
	            data: {
	                message: 'next'
	            }
	        });

	    };

	    Slick.prototype.orientationChange = function() {

	        var _ = this;

	        _.checkResponsive();
	        _.setPosition();

	    };

	    Slick.prototype.pause = Slick.prototype.slickPause = function() {

	        var _ = this;

	        _.autoPlayClear();
	        _.paused = true;

	    };

	    Slick.prototype.play = Slick.prototype.slickPlay = function() {

	        var _ = this;

	        _.paused = false;
	        _.autoPlay();

	    };

	    Slick.prototype.postSlide = function(index) {

	        var _ = this;

	        _.$slider.trigger('afterChange', [_, index]);

	        _.animating = false;

	        _.setPosition();

	        _.swipeLeft = null;

	        if (_.options.autoplay === true && _.paused === false) {
	            _.autoPlay();
	        }
	        if (_.options.accessibility === true) {
	            _.initADA();
	        }

	    };

	    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

	        var _ = this;

	        _.changeSlide({
	            data: {
	                message: 'previous'
	            }
	        });

	    };

	    Slick.prototype.preventDefault = function(event) {
	        event.preventDefault();
	    };

	    Slick.prototype.progressiveLazyLoad = function() {

	        var _ = this,
	            imgCount, targetImage;

	        imgCount = $('img[data-lazy]', _.$slider).length;

	        if (imgCount > 0) {
	            targetImage = $('img[data-lazy]', _.$slider).first();
	            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {
	                    targetImage.removeAttr('data-lazy');
	                    _.progressiveLazyLoad();

	                    if (_.options.adaptiveHeight === true) {
	                        _.setPosition();
	                    }
	                })
	                .error(function() {
	                    targetImage.removeAttr('data-lazy');
	                    _.progressiveLazyLoad();
	                });
	        }

	    };

	    Slick.prototype.refresh = function( initializing ) {

	        var _ = this,
	            currentSlide = _.currentSlide;

	        _.destroy(true);

	        $.extend(_, _.initials, { currentSlide: currentSlide });

	        _.init();

	        if( !initializing ) {

	            _.changeSlide({
	                data: {
	                    message: 'index',
	                    index: currentSlide
	                }
	            }, false);

	        }

	    };

	    Slick.prototype.registerBreakpoints = function() {

	        var _ = this, breakpoint, currentBreakpoint, l,
	            responsiveSettings = _.options.responsive || null;

	        if ( $.type(responsiveSettings) === "array" && responsiveSettings.length ) {

	            _.respondTo = _.options.respondTo || 'window';

	            for ( breakpoint in responsiveSettings ) {

	                l = _.breakpoints.length-1;
	                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

	                if (responsiveSettings.hasOwnProperty(breakpoint)) {

	                    // loop through the breakpoints and cut out any existing
	                    // ones with the same breakpoint number, we don't want dupes.
	                    while( l >= 0 ) {
	                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
	                            _.breakpoints.splice(l,1);
	                        }
	                        l--;
	                    }

	                    _.breakpoints.push(currentBreakpoint);
	                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

	                }

	            }

	            _.breakpoints.sort(function(a, b) {
	                return ( _.options.mobileFirst ) ? a-b : b-a;
	            });

	        }

	    };

	    Slick.prototype.reinit = function() {

	        var _ = this;

	        _.$slides =
	            _.$slideTrack
	                .children(_.options.slide)
	                .addClass('slick-slide');

	        _.slideCount = _.$slides.length;

	        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
	            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
	        }

	        if (_.slideCount <= _.options.slidesToShow) {
	            _.currentSlide = 0;
	        }

	        _.registerBreakpoints();

	        _.setProps();
	        _.setupInfinite();
	        _.buildArrows();
	        _.updateArrows();
	        _.initArrowEvents();
	        _.buildDots();
	        _.updateDots();
	        _.initDotEvents();

	        _.checkResponsive(false, true);

	        if (_.options.focusOnSelect === true) {
	            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
	        }

	        _.setSlideClasses(0);

	        _.setPosition();

	        _.$slider.trigger('reInit', [_]);

	        if (_.options.autoplay === true) {
	            _.focusHandler();
	        }

	    };

	    Slick.prototype.resize = function() {

	        var _ = this;

	        if ($(window).width() !== _.windowWidth) {
	            clearTimeout(_.windowDelay);
	            _.windowDelay = window.setTimeout(function() {
	                _.windowWidth = $(window).width();
	                _.checkResponsive();
	                if( !_.unslicked ) { _.setPosition(); }
	            }, 50);
	        }
	    };

	    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

	        var _ = this;

	        if (typeof(index) === 'boolean') {
	            removeBefore = index;
	            index = removeBefore === true ? 0 : _.slideCount - 1;
	        } else {
	            index = removeBefore === true ? --index : index;
	        }

	        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
	            return false;
	        }

	        _.unload();

	        if (removeAll === true) {
	            _.$slideTrack.children().remove();
	        } else {
	            _.$slideTrack.children(this.options.slide).eq(index).remove();
	        }

	        _.$slides = _.$slideTrack.children(this.options.slide);

	        _.$slideTrack.children(this.options.slide).detach();

	        _.$slideTrack.append(_.$slides);

	        _.$slidesCache = _.$slides;

	        _.reinit();

	    };

	    Slick.prototype.setCSS = function(position) {

	        var _ = this,
	            positionProps = {},
	            x, y;

	        if (_.options.rtl === true) {
	            position = -position;
	        }
	        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
	        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

	        positionProps[_.positionProp] = position;

	        if (_.transformsEnabled === false) {
	            _.$slideTrack.css(positionProps);
	        } else {
	            positionProps = {};
	            if (_.cssTransitions === false) {
	                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
	                _.$slideTrack.css(positionProps);
	            } else {
	                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
	                _.$slideTrack.css(positionProps);
	            }
	        }

	    };

	    Slick.prototype.setDimensions = function() {

	        var _ = this;

	        if (_.options.vertical === false) {
	            if (_.options.centerMode === true) {
	                _.$list.css({
	                    padding: ('0px ' + _.options.centerPadding)
	                });
	            }
	        } else {
	            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
	            if (_.options.centerMode === true) {
	                _.$list.css({
	                    padding: (_.options.centerPadding + ' 0px')
	                });
	            }
	        }

	        _.listWidth = _.$list.width();
	        _.listHeight = _.$list.height();


	        if (_.options.vertical === false && _.options.variableWidth === false) {
	            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
	            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

	        } else if (_.options.variableWidth === true) {
	            _.$slideTrack.width(5000 * _.slideCount);
	        } else {
	            _.slideWidth = Math.ceil(_.listWidth);
	            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
	        }

	        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
	        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

	    };

	    Slick.prototype.setFade = function() {

	        var _ = this,
	            targetLeft;

	        _.$slides.each(function(index, element) {
	            targetLeft = (_.slideWidth * index) * -1;
	            if (_.options.rtl === true) {
	                $(element).css({
	                    position: 'relative',
	                    right: targetLeft,
	                    top: 0,
	                    zIndex: _.options.zIndex - 2,
	                    opacity: 0
	                });
	            } else {
	                $(element).css({
	                    position: 'relative',
	                    left: targetLeft,
	                    top: 0,
	                    zIndex: _.options.zIndex - 2,
	                    opacity: 0
	                });
	            }
	        });

	        _.$slides.eq(_.currentSlide).css({
	            zIndex: _.options.zIndex - 1,
	            opacity: 1
	        });

	    };

	    Slick.prototype.setHeight = function() {

	        var _ = this;

	        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
	            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
	            _.$list.css('height', targetHeight);
	        }

	    };

	    Slick.prototype.setOption = Slick.prototype.slickSetOption = function(option, value, refresh) {

	        var _ = this, l, item;

	        if( option === "responsive" && $.type(value) === "array" ) {
	            for ( item in value ) {
	                if( $.type( _.options.responsive ) !== "array" ) {
	                    _.options.responsive = [ value[item] ];
	                } else {
	                    l = _.options.responsive.length-1;
	                    // loop through the responsive object and splice out duplicates.
	                    while( l >= 0 ) {
	                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
	                            _.options.responsive.splice(l,1);
	                        }
	                        l--;
	                    }
	                    _.options.responsive.push( value[item] );
	                }
	            }
	        } else {
	            _.options[option] = value;
	        }

	        if (refresh === true) {
	            _.unload();
	            _.reinit();
	        }

	    };

	    Slick.prototype.setPosition = function() {

	        var _ = this;

	        _.setDimensions();

	        _.setHeight();

	        if (_.options.fade === false) {
	            _.setCSS(_.getLeft(_.currentSlide));
	        } else {
	            _.setFade();
	        }

	        _.$slider.trigger('setPosition', [_]);

	    };

	    Slick.prototype.setProps = function() {

	        var _ = this,
	            bodyStyle = document.body.style;

	        _.positionProp = _.options.vertical === true ? 'top' : 'left';

	        if (_.positionProp === 'top') {
	            _.$slider.addClass('slick-vertical');
	        } else {
	            _.$slider.removeClass('slick-vertical');
	        }

	        if (bodyStyle.WebkitTransition !== undefined ||
	            bodyStyle.MozTransition !== undefined ||
	            bodyStyle.msTransition !== undefined) {
	            if (_.options.useCSS === true) {
	                _.cssTransitions = true;
	            }
	        }

	        if ( _.options.fade ) {
	            if ( typeof _.options.zIndex === 'number' ) {
	                if( _.options.zIndex < 3 ) {
	                    _.options.zIndex = 3;
	                }
	            } else {
	                _.options.zIndex = _.defaults.zIndex;
	            }
	        }

	        if (bodyStyle.OTransform !== undefined) {
	            _.animType = 'OTransform';
	            _.transformType = '-o-transform';
	            _.transitionType = 'OTransition';
	            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
	        }
	        if (bodyStyle.MozTransform !== undefined) {
	            _.animType = 'MozTransform';
	            _.transformType = '-moz-transform';
	            _.transitionType = 'MozTransition';
	            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
	        }
	        if (bodyStyle.webkitTransform !== undefined) {
	            _.animType = 'webkitTransform';
	            _.transformType = '-webkit-transform';
	            _.transitionType = 'webkitTransition';
	            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
	        }
	        if (bodyStyle.msTransform !== undefined) {
	            _.animType = 'msTransform';
	            _.transformType = '-ms-transform';
	            _.transitionType = 'msTransition';
	            if (bodyStyle.msTransform === undefined) _.animType = false;
	        }
	        if (bodyStyle.transform !== undefined && _.animType !== false) {
	            _.animType = 'transform';
	            _.transformType = 'transform';
	            _.transitionType = 'transition';
	        }
	        _.transformsEnabled = (_.animType !== null && _.animType !== false);

	    };


	    Slick.prototype.setSlideClasses = function(index) {

	        var _ = this,
	            centerOffset, allSlides, indexOffset, remainder;

	        allSlides = _.$slider
	            .find('.slick-slide')
	            .removeClass('slick-active slick-center slick-current')
	            .attr('aria-hidden', 'true');

	        _.$slides
	            .eq(index)
	            .addClass('slick-current');

	        if (_.options.centerMode === true) {

	            centerOffset = Math.floor(_.options.slidesToShow / 2);

	            if (_.options.infinite === true) {

	                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

	                    _.$slides
	                        .slice(index - centerOffset, index + centerOffset + 1)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');

	                } else {

	                    indexOffset = _.options.slidesToShow + index;
	                    allSlides
	                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');

	                }

	                if (index === 0) {

	                    allSlides
	                        .eq(allSlides.length - 1 - _.options.slidesToShow)
	                        .addClass('slick-center');

	                } else if (index === _.slideCount - 1) {

	                    allSlides
	                        .eq(_.options.slidesToShow)
	                        .addClass('slick-center');

	                }

	            }

	            _.$slides
	                .eq(index)
	                .addClass('slick-center');

	        } else {

	            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

	                _.$slides
	                    .slice(index, index + _.options.slidesToShow)
	                    .addClass('slick-active')
	                    .attr('aria-hidden', 'false');

	            } else if (allSlides.length <= _.options.slidesToShow) {

	                allSlides
	                    .addClass('slick-active')
	                    .attr('aria-hidden', 'false');

	            } else {

	                remainder = _.slideCount % _.options.slidesToShow;
	                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

	                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

	                    allSlides
	                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');

	                } else {

	                    allSlides
	                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
	                        .addClass('slick-active')
	                        .attr('aria-hidden', 'false');

	                }

	            }

	        }

	        if (_.options.lazyLoad === 'ondemand') {
	            _.lazyLoad();
	        }

	    };

	    Slick.prototype.setupInfinite = function() {

	        var _ = this,
	            i, slideIndex, infiniteCount;

	        if (_.options.fade === true) {
	            _.options.centerMode = false;
	        }

	        if (_.options.infinite === true && _.options.fade === false) {

	            slideIndex = null;

	            if (_.slideCount > _.options.slidesToShow) {

	                if (_.options.centerMode === true) {
	                    infiniteCount = _.options.slidesToShow + 1;
	                } else {
	                    infiniteCount = _.options.slidesToShow;
	                }

	                for (i = _.slideCount; i > (_.slideCount -
	                        infiniteCount); i -= 1) {
	                    slideIndex = i - 1;
	                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
	                        .attr('data-slick-index', slideIndex - _.slideCount)
	                        .prependTo(_.$slideTrack).addClass('slick-cloned');
	                }
	                for (i = 0; i < infiniteCount; i += 1) {
	                    slideIndex = i;
	                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
	                        .attr('data-slick-index', slideIndex + _.slideCount)
	                        .appendTo(_.$slideTrack).addClass('slick-cloned');
	                }
	                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
	                    $(this).attr('id', '');
	                });

	            }

	        }

	    };

	    Slick.prototype.setPaused = function(paused) {

	        var _ = this;

	        if (_.options.autoplay === true && _.options.pauseOnHover === true) {
	            _.paused = paused;
	            if (!paused) {
	                _.autoPlay();
	            } else {
	                _.autoPlayClear();
	            }
	        }
	    };

	    Slick.prototype.selectHandler = function(event) {

	        var _ = this;

	        var targetElement =
	            $(event.target).is('.slick-slide') ?
	                $(event.target) :
	                $(event.target).parents('.slick-slide');

	        var index = parseInt(targetElement.attr('data-slick-index'));

	        if (!index) index = 0;

	        if (_.slideCount <= _.options.slidesToShow) {

	            _.setSlideClasses(index);
	            _.asNavFor(index);
	            return;

	        }

	        _.slideHandler(index);

	    };

	    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

	        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
	            _ = this;

	        sync = sync || false;

	        if (_.animating === true && _.options.waitForAnimate === true) {
	            return;
	        }

	        if (_.options.fade === true && _.currentSlide === index) {
	            return;
	        }

	        if (_.slideCount <= _.options.slidesToShow) {
	            return;
	        }

	        if (sync === false) {
	            _.asNavFor(index);
	        }

	        targetSlide = index;
	        targetLeft = _.getLeft(targetSlide);
	        slideLeft = _.getLeft(_.currentSlide);

	        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

	        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
	            if (_.options.fade === false) {
	                targetSlide = _.currentSlide;
	                if (dontAnimate !== true) {
	                    _.animateSlide(slideLeft, function() {
	                        _.postSlide(targetSlide);
	                    });
	                } else {
	                    _.postSlide(targetSlide);
	                }
	            }
	            return;
	        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
	            if (_.options.fade === false) {
	                targetSlide = _.currentSlide;
	                if (dontAnimate !== true) {
	                    _.animateSlide(slideLeft, function() {
	                        _.postSlide(targetSlide);
	                    });
	                } else {
	                    _.postSlide(targetSlide);
	                }
	            }
	            return;
	        }

	        if (_.options.autoplay === true) {
	            clearInterval(_.autoPlayTimer);
	        }

	        if (targetSlide < 0) {
	            if (_.slideCount % _.options.slidesToScroll !== 0) {
	                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
	            } else {
	                animSlide = _.slideCount + targetSlide;
	            }
	        } else if (targetSlide >= _.slideCount) {
	            if (_.slideCount % _.options.slidesToScroll !== 0) {
	                animSlide = 0;
	            } else {
	                animSlide = targetSlide - _.slideCount;
	            }
	        } else {
	            animSlide = targetSlide;
	        }

	        _.animating = true;

	        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

	        oldSlide = _.currentSlide;
	        _.currentSlide = animSlide;

	        _.setSlideClasses(_.currentSlide);

	        _.updateDots();
	        _.updateArrows();

	        if (_.options.fade === true) {
	            if (dontAnimate !== true) {

	                _.fadeSlideOut(oldSlide);

	                _.fadeSlide(animSlide, function() {
	                    _.postSlide(animSlide);
	                });

	            } else {
	                _.postSlide(animSlide);
	            }
	            _.animateHeight();
	            return;
	        }

	        if (dontAnimate !== true) {
	            _.animateSlide(targetLeft, function() {
	                _.postSlide(animSlide);
	            });
	        } else {
	            _.postSlide(animSlide);
	        }

	    };

	    Slick.prototype.startLoad = function() {

	        var _ = this;

	        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

	            _.$prevArrow.hide();
	            _.$nextArrow.hide();

	        }

	        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

	            _.$dots.hide();

	        }

	        _.$slider.addClass('slick-loading');

	    };

	    Slick.prototype.swipeDirection = function() {

	        var xDist, yDist, r, swipeAngle, _ = this;

	        xDist = _.touchObject.startX - _.touchObject.curX;
	        yDist = _.touchObject.startY - _.touchObject.curY;
	        r = Math.atan2(yDist, xDist);

	        swipeAngle = Math.round(r * 180 / Math.PI);
	        if (swipeAngle < 0) {
	            swipeAngle = 360 - Math.abs(swipeAngle);
	        }

	        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
	            return (_.options.rtl === false ? 'left' : 'right');
	        }
	        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
	            return (_.options.rtl === false ? 'left' : 'right');
	        }
	        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
	            return (_.options.rtl === false ? 'right' : 'left');
	        }
	        if (_.options.verticalSwiping === true) {
	            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
	                return 'left';
	            } else {
	                return 'right';
	            }
	        }

	        return 'vertical';

	    };

	    Slick.prototype.swipeEnd = function(event) {

	        var _ = this,
	            slideCount;

	        _.dragging = false;

	        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;

	        if (_.touchObject.curX === undefined) {
	            return false;
	        }

	        if (_.touchObject.edgeHit === true) {
	            _.$slider.trigger('edge', [_, _.swipeDirection()]);
	        }

	        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

	            switch (_.swipeDirection()) {
	                case 'left':
	                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
	                    _.slideHandler(slideCount);
	                    _.currentDirection = 0;
	                    _.touchObject = {};
	                    _.$slider.trigger('swipe', [_, 'left']);
	                    break;

	                case 'right':
	                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
	                    _.slideHandler(slideCount);
	                    _.currentDirection = 1;
	                    _.touchObject = {};
	                    _.$slider.trigger('swipe', [_, 'right']);
	                    break;
	            }
	        } else {
	            if (_.touchObject.startX !== _.touchObject.curX) {
	                _.slideHandler(_.currentSlide);
	                _.touchObject = {};
	            }
	        }

	    };

	    Slick.prototype.swipeHandler = function(event) {

	        var _ = this;

	        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
	            return;
	        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
	            return;
	        }

	        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
	            event.originalEvent.touches.length : 1;

	        _.touchObject.minSwipe = _.listWidth / _.options
	            .touchThreshold;

	        if (_.options.verticalSwiping === true) {
	            _.touchObject.minSwipe = _.listHeight / _.options
	                .touchThreshold;
	        }

	        switch (event.data.action) {

	            case 'start':
	                _.swipeStart(event);
	                break;

	            case 'move':
	                _.swipeMove(event);
	                break;

	            case 'end':
	                _.swipeEnd(event);
	                break;

	        }

	    };

	    Slick.prototype.swipeMove = function(event) {

	        var _ = this,
	            edgeWasHit = false,
	            curLeft, swipeDirection, swipeLength, positionOffset, touches;

	        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

	        if (!_.dragging || touches && touches.length !== 1) {
	            return false;
	        }

	        curLeft = _.getLeft(_.currentSlide);

	        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
	        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

	        _.touchObject.swipeLength = Math.round(Math.sqrt(
	            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

	        if (_.options.verticalSwiping === true) {
	            _.touchObject.swipeLength = Math.round(Math.sqrt(
	                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
	        }

	        swipeDirection = _.swipeDirection();

	        if (swipeDirection === 'vertical') {
	            return;
	        }

	        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
	            event.preventDefault();
	        }

	        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
	        if (_.options.verticalSwiping === true) {
	            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
	        }


	        swipeLength = _.touchObject.swipeLength;

	        _.touchObject.edgeHit = false;

	        if (_.options.infinite === false) {
	            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
	                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
	                _.touchObject.edgeHit = true;
	            }
	        }

	        if (_.options.vertical === false) {
	            _.swipeLeft = curLeft + swipeLength * positionOffset;
	        } else {
	            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
	        }
	        if (_.options.verticalSwiping === true) {
	            _.swipeLeft = curLeft + swipeLength * positionOffset;
	        }

	        if (_.options.fade === true || _.options.touchMove === false) {
	            return false;
	        }

	        if (_.animating === true) {
	            _.swipeLeft = null;
	            return false;
	        }

	        _.setCSS(_.swipeLeft);

	    };

	    Slick.prototype.swipeStart = function(event) {

	        var _ = this,
	            touches;

	        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
	            _.touchObject = {};
	            return false;
	        }

	        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
	            touches = event.originalEvent.touches[0];
	        }

	        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
	        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

	        _.dragging = true;

	    };

	    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

	        var _ = this;

	        if (_.$slidesCache !== null) {

	            _.unload();

	            _.$slideTrack.children(this.options.slide).detach();

	            _.$slidesCache.appendTo(_.$slideTrack);

	            _.reinit();

	        }

	    };

	    Slick.prototype.unload = function() {

	        var _ = this;

	        $('.slick-cloned', _.$slider).remove();

	        if (_.$dots) {
	            _.$dots.remove();
	        }

	        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
	            _.$prevArrow.remove();
	        }

	        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
	            _.$nextArrow.remove();
	        }

	        _.$slides
	            .removeClass('slick-slide slick-active slick-visible slick-current')
	            .attr('aria-hidden', 'true')
	            .css('width', '');

	    };

	    Slick.prototype.unslick = function(fromBreakpoint) {

	        var _ = this;
	        _.$slider.trigger('unslick', [_, fromBreakpoint]);
	        _.destroy();

	    };

	    Slick.prototype.updateArrows = function() {

	        var _ = this,
	            centerOffset;

	        centerOffset = Math.floor(_.options.slidesToShow / 2);

	        if ( _.options.arrows === true &&
	            _.slideCount > _.options.slidesToShow &&
	            !_.options.infinite ) {

	            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
	            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	            if (_.currentSlide === 0) {

	                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
	                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

	                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
	                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

	                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
	                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

	            }

	        }

	    };

	    Slick.prototype.updateDots = function() {

	        var _ = this;

	        if (_.$dots !== null) {

	            _.$dots
	                .find('li')
	                .removeClass('slick-active')
	                .attr('aria-hidden', 'true');

	            _.$dots
	                .find('li')
	                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
	                .addClass('slick-active')
	                .attr('aria-hidden', 'false');

	        }

	    };

	    Slick.prototype.visibility = function() {

	        var _ = this;

	        if (document[_.hidden]) {
	            _.paused = true;
	            _.autoPlayClear();
	        } else {
	            if (_.options.autoplay === true) {
	                _.paused = false;
	                _.autoPlay();
	            }
	        }

	    };
	    Slick.prototype.initADA = function() {
	        var _ = this;
	        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
	            'aria-hidden': 'true',
	            'tabindex': '-1'
	        }).find('a, input, button, select').attr({
	            'tabindex': '-1'
	        });

	        _.$slideTrack.attr('role', 'listbox');

	        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
	            $(this).attr({
	                'role': 'option',
	                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
	            });
	        });

	        if (_.$dots !== null) {
	            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
	                $(this).attr({
	                    'role': 'presentation',
	                    'aria-selected': 'false',
	                    'aria-controls': 'navigation' + _.instanceUid + i + '',
	                    'id': 'slick-slide' + _.instanceUid + i + ''
	                });
	            })
	                .first().attr('aria-selected', 'true').end()
	                .find('button').attr('role', 'button').end()
	                .closest('div').attr('role', 'toolbar');
	        }
	        _.activateADA();

	    };

	    Slick.prototype.activateADA = function() {
	        var _ = this,
	        _isSlideOnFocus =_.$slider.find('*').is(':focus');
	        // _isSlideOnFocus = _.$slides.is(':focus') || _.$slides.find('*').is(':focus');

	        _.$slideTrack.find('.slick-active').attr({
	            'aria-hidden': 'false',
	            'tabindex': '0'
	        }).find('a, input, button, select').attr({
	            'tabindex': '0'
	        });

	        (_isSlideOnFocus) &&  _.$slideTrack.find('.slick-active').focus();

	    };

	    Slick.prototype.focusHandler = function() {
	        var _ = this;
	        _.$slider.on('focus.slick blur.slick', '*', function(event) {
	            event.stopImmediatePropagation();
	            var sf = $(this);
	            setTimeout(function() {
	                if (_.isPlay) {
	                    if (sf.is(':focus')) {
	                        _.autoPlayClear();
	                        _.paused = true;
	                    } else {
	                        _.paused = false;
	                        _.autoPlay();
	                    }
	                }
	            }, 0);
	        });
	    };

	    $.fn.slick = function() {
	        var _ = this,
	            opt = arguments[0],
	            args = Array.prototype.slice.call(arguments, 1),
	            l = _.length,
	            i = 0,
	            ret;
	        for (i; i < l; i++) {
	            if (typeof opt == 'object' || typeof opt == 'undefined')
	                _[i].slick = new Slick(_[i], opt);
	            else
	                ret = _[i].slick[opt].apply(_[i].slick, args);
	            if (typeof ret != 'undefined') return ret;
	        }
	        return _;
	    };

	}));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*global jQuery */
	/*jshint browser:true */
	/*!
	* FitVids 1.1
	*
	* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
	* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
	* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
	*
	*/

	(function( $ ){

	  "use strict";

	  $.fn.fitVids = function( options ) {
	    var settings = {
	      customSelector: null
	    };

	    if(!document.getElementById('fit-vids-style')) {
	      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
	      var head = document.head || document.getElementsByTagName('head')[0];
	      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
	      var div = document.createElement('div');
	      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
	      head.appendChild(div.childNodes[1]);
	    }

	    if ( options ) {
	      $.extend( settings, options );
	    }

	    return this.each(function(){
	      var selectors = [
	        "iframe[src*='player.vimeo.com']",
	        "iframe[src*='youtube.com']",
	        "iframe[src*='youtube-nocookie.com']",
	        "iframe[src*='kickstarter.com'][src*='video.html']",
	        "object",
	        "embed"
	      ];

	      if (settings.customSelector) {
	        selectors.push(settings.customSelector);
	      }

	      var $allVideos = $(this).find(selectors.join(','));
	      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

	      $allVideos.each(function(){
	        var $this = $(this);
	        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
	        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
	            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
	            aspectRatio = height / width;
	        if(!$this.attr('id')){
	          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
	          $this.attr('id', videoID);
	        }
	        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
	        $this.removeAttr('height').removeAttr('width');
	      });
	    });
	  };
	// Works with either jQuery or Zepto
	})( __webpack_provided_window_dot_jQuery || window.Zepto );

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation = __webpack_require__(5);
	var Bloodhound = __webpack_require__(11);
	var $ = __webpack_require__(2);

	module.exports = function() {
	    'use strict';

		var $search_toggle = $('#search-toggle');
		var $close_search = $('#close-search');
		var $search_form = $('#search-form');
		var $search_box = $('#search-box');

		$search_toggle.click(function(e) {
			e.preventDefault();

			var expanded = $search_toggle.attr('aria-expanded') === 'false';

			$search_toggle.attr('aria-expanded', expanded);
			$close_search.attr('aria-expanded', expanded);
			$search_form
	            .attr('aria-hidden', $search_form.attr('aria-hidden') === 'false')
	            .trigger(expanded ? 'show' : 'hide');
		});

		$close_search.click(function(e) {
			e.preventDefault();

			$search_toggle.attr('aria-expanded', false);
			$close_search.attr('aria-expanded', false);
			$search_form
				.attr('aria-hidden', true)
				.trigger('hide');
		});

		var typeahead_menu_repositioning = function() {
			var offset = $search_box.offset();
			$('.top-nav-search-menu').css({
				top: (offset.top + $search_box.outerHeight()) + 'px',
				left: offset.left + 'px',
				width: $search_box.outerWidth() + 'px'
			});
		};

		$search_box.on('typeahead:open', typeahead_menu_repositioning);


		var close_button_visibility = function() {
			$close_search.attr('aria-hidden', Foundation.utils.is_large_up());
		};

		// Initial call
		close_button_visibility();

		// Throttled resize function
		$(window).on('resize', Foundation.utils.throttle(function() {
			close_button_visibility();
			typeahead_menu_repositioning();
		}, 200));



		// Lend Mega-Menu
		var $category_section = $('.lend-menu-large > div:first-child');
		var $close_section = $('.lend-menu-large .close-section');
		var $tertiary_links = $('.lend-menu-large .tertiary-link');
		var $tertiary_lists = $('.lend-menu-large .tertiary-list');

		$close_section.click(function(e) {
			e.preventDefault();

			$tertiary_links.attr('aria-expanded', false);
			$tertiary_lists.attr('aria-hidden', true);

			$category_section.removeClass('slide-left');
			$close_section.attr('aria-hidden', true);
		});

		$('.lend-menu-large [data-kv-toggle]').click(function(e) {
			e.preventDefault();

			var $this = $(this);

			if($this.attr('aria-expanded') === 'true') {
				$category_section.removeClass('slide-left');
				$close_section.attr('aria-hidden', true);
			}
			else {
				$tertiary_links.attr('aria-expanded', false);
				$tertiary_lists.attr('aria-hidden', true);

				$category_section.addClass('slide-left');
				$close_section.attr('aria-hidden', false);
			}
		});


		// kv-toggle
		$('[data-kv-toggle]').click(function(e) {
			e.preventDefault();

			var $this = $(this);
			var $target = $('#'+$this.attr('aria-controls'));
			var hidden = $target.attr('aria-hidden') === 'false';

			$this.attr('aria-expanded', $this.attr('aria-expanded') === 'false');
			$target
				.attr('aria-hidden', hidden)
				.trigger(hidden ? 'hide' : 'show');
		});


		// close window when normal links clicked
		$('#lend-dropdown a:not([data-kv-toggle],[href="#"])').click(function() {
			Foundation.libs.dropdown.close($('#lend-dropdown'));
		});
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation = __webpack_require__(5);
	var $ = __webpack_require__(2);

	module.exports = function () {
		/* jshint maxstatements: 30 */
		/*jshint maxcomplexity: 15 */

		'use strict';

		var $accordions = $('[data-kv-accordion]');

		var $targets = $($accordions.get().reduce(function(prev, curr, i) {
			return prev + (i===0 ? '' : ', ') + '#' + $(curr).attr('aria-controls');
		}, ''));


		$accordions.click(function() {
			var $this = $(this);
			var $target = $('#'+$this.attr('aria-controls'));
			var is_hidden = $target.attr('aria-hidden') === 'true';

			if(is_hidden) {
				// hide it and measure it
				$target.css({
					visibility: 'hidden'
					, height: 'auto'
				});

				var height = $target.height();

				// show it with no height...
				$target.css({
					visibility: 'visible'
					, height: 0
				});

				// ...and set the height immediately after so it animates
				window.setTimeout(function() {
					$target.css('height', height + 'px');
				}, 0);
			}
			else {
				// if the heihgt hasn't been set yet, measure and set it
				if($target[0].style.height.length === 0 || $target[0].style.height === 'auto') {
					$target.css('height', $target.height() + 'px');
				}

				// set the height to 0 immediately after so it animates
				window.setTimeout(function() {
					$target.css('height', 0);
				}, 0);
			}

			$targets.filter($target.parents()).css('height', 'auto');

			$this.attr('aria-expanded', is_hidden);
			$target.attr('aria-hidden', !is_hidden);
		});

		$(window).on('resize', Foundation.utils.throttle(function() {
			if (Foundation.utils.is_medium_up()){
				$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
			}

			if (Foundation.utils.is_small_only()){
				$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
			}

			// expand all accordions if stepping out of mobile mode
			if (window.matchMedia(Foundation.media_queries.medium).matches || window.matchMedia(Foundation.media_queries.xlarge).matches || window.matchMedia(Foundation.media_queries.xxlarge).matches){
				if ($('#filter-sectors-ul').height() < 1){
					$('#sectors-accordion-selector').trigger('click');
				}

				if ($('#filter-attributes-ul').height() < 1){
					$('#attributes-accordion-selector').trigger('click');
				}

				if ($('#filter-tags-ul').height() < 1){
					$('#tags-accordion-selector').trigger('click');
				}

				if ($('#misc-filters-container').height() < 1){
					$('#misc-accordion-selector').trigger('click');
				}

				if ($('#filter-partners-ul').height() < 1){
					$('#partner-accordion-selector').trigger('click');
				}

				if ($('#filter-slider-container').height() < 1){
					$('#slider-accordion-selector').trigger('click');
				}
			}

			if ($(window).width() < 440){
				if ($('#filter-sectors-ul').height() > 0){
					$('#sectors-accordion-selector').trigger('click');
				}

				if ($('#filter-attributes-ul').height() > 0){
					$('#attributes-accordion-selector').trigger('click');
				}

				if ($('#filter-tags-ul').height() > 0){
					$('#tags-accordion-selector').trigger('click');
				}

				if ($('#misc-filters-container').height() > 0){
					$('#misc-accordion-selector').trigger('click');
				}

				if ($('#filter-partners-ul').height() > 0){
					$('#partner-accordion-selector').trigger('click');
				}

				if ($('#filter-slider-container').height() > 0){
					$('#slider-accordion-selector').trigger('click');
				}
			}

			$targets.each(function() {
				var $this = $(this);
				if($this.height() > 0) {
					$this.css('height', 'auto');
				}
			});
		}, 200));
	};

/***/ }
/******/ ])});;