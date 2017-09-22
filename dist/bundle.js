(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("rxjs"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "rxjs"], factory);
	else if(typeof exports === 'object')
		exports["ReactFormsState"] = factory(require("immutable"), require("react"), require("rxjs"));
	else
		root["ReactFormsState"] = factory(root["immutable"], root["React"], root["Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getJavascriptEntity = getJavascriptEntity;
exports.getImmutableEntity = getImmutableEntity;
exports.getValue = getValue;
exports.setValue = setValue;

var _immutable = __webpack_require__(0);

var _StatePathHelpers = __webpack_require__(11);

function getJavascriptEntity(obj) {
  if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" && obj.toJS) return obj.toJS();else return obj;
}

function getImmutableEntity(obj) {
  if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" && obj.toJS) return obj;else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object") return (0, _immutable.fromJS)(obj);else return obj;
}

function getValue(state, path) {
  if (path == "") return getJavascriptEntity(state);else {
    if ((typeof state === "undefined" ? "undefined" : _typeof(state)) == "object") {
      var valuePath = (0, _StatePathHelpers.getImmutPath)(path);
      return valuePath.reduce(function (red, value, i) {
        if (red !== undefined && red !== null) {
          return red[value];
        } else {
          return red;
        }
      }, state);
    } else return state;
  }
}

function setValue(state, path, value) {
  if (path == "") return value;else {
    var immutState = (0, _immutable.fromJS)(state);
    if (global.process && global.process.env && global.process.env.FORMALIZR_ENV === "DEBUG") console.log(state, path, value, immutState);
    var newState = immutState ? immutState.setIn((0, _StatePathHelpers.getImmutPath)(path), value).toJS() : immutState;
    return newState;
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VALIDATION_FAILED_EVENT_TYPE = exports.SUBMIT_EVENT_TYPE = exports.INITIAL_CHANGE_EVENT_TYPE = exports.VALUE_CHANGE_EVENT_TYPE = undefined;
exports.createValueChangeEvent = createValueChangeEvent;
exports.createInitialChangeEvent = createInitialChangeEvent;
exports.createSubmitChangeEvent = createSubmitChangeEvent;
exports.createValidationFailedEvent = createValidationFailedEvent;

var _ValidationHelpers = __webpack_require__(6);

var VALUE_CHANGE_EVENT_TYPE = exports.VALUE_CHANGE_EVENT_TYPE = "VALUE_CHANGE";var INITIAL_CHANGE_EVENT_TYPE = exports.INITIAL_CHANGE_EVENT_TYPE = "INITIAL_CHANGE";
var SUBMIT_EVENT_TYPE = exports.SUBMIT_EVENT_TYPE = "SUBMIT";
var VALIDATION_FAILED_EVENT_TYPE = exports.VALIDATION_FAILED_EVENT_TYPE = "VALIDATION_FAILED";

function createValueChangeEvent(newValue, statePath, validation) {
  return {
    type: VALUE_CHANGE_EVENT_TYPE,
    newValue: newValue,
    statePath: statePath,
    validation: validation
  };
}

function createInitialChangeEvent(newInitial) {
  return {
    type: INITIAL_CHANGE_EVENT_TYPE,
    newValue: newInitial
  };
}

function createSubmitChangeEvent() {
  return {
    type: SUBMIT_EVENT_TYPE
  };
}

function createValidationFailedEvent(validation) {
  return {
    type: VALIDATION_FAILED_EVENT_TYPE,
    validation: validation
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isValid = isValid;
exports.getErrorText = getErrorText;

var _immutable = __webpack_require__(0);

var _StateValueHelpers = __webpack_require__(1);

var _StatePathHelpers = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isValid(validation) {
  if (typeof validation === "boolean") return validation;else if (validation == null) return true;else if ((typeof validation === "undefined" ? "undefined" : _typeof(validation)) === "object" && _typeof(validation.infos) === "object" && validation.infos !== null && Object.keys(validation.infos).length === 0) return true;else {
    return validation.infos === true || validation.infos == null;
  }
}

function getErrorText(validation) {
  if (typeof validation.infos === "string") return validation.infos;else return null;
}

function _setErrorForFieldAt(infos, statePath, error) {
  if (statePath == "" || infos == null || (typeof infos === "undefined" ? "undefined" : _typeof(infos)) != "object") {
    return infos;
  } else {
    return (0, _immutable.fromJS)(infos).setIn((0, _StatePathHelpers.getImmutPath)(statePath), error).toJS();
  }
}

function _removeErrorForFieldAt(infos, statePath) {
  return _setErrorForFieldAt(infos, statePath, null);
}

var Validation = exports.Validation = function () {
  function Validation() {
    var infos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Validation);

    this.infos = infos;
  }

  _createClass(Validation, [{
    key: "setErrorForFieldAt",
    value: function setErrorForFieldAt(statePath, error) {
      return new Validation(_setErrorForFieldAt(this.infos, statePath, error));
    }
  }, {
    key: "removeErrorForFieldAt",
    value: function removeErrorForFieldAt(statePath) {
      return new Validation(_removeErrorForFieldAt(this.infos, statePath));
    }
  }, {
    key: "getErrorForFieldAt",
    value: function getErrorForFieldAt(statePath) {
      if (statePath === "") return (0, _StateValueHelpers.getJavascriptEntity)(this.infos);else {
        if (_typeof(this.infos) === "object") {
          var valuePath = (0, _StatePathHelpers.getImmutPath)(statePath);
          return valuePath.reduce(function (red, value, i) {
            if (red !== undefined && red !== null && (typeof red === "undefined" ? "undefined" : _typeof(red)) == "object") {
              return red[value];
            } else {
              return red;
            }
          }, this.infos);
        } else return null;
      }
    }
  }, {
    key: "getNestedValidation",
    value: function getNestedValidation(statePath) {
      if (statePath === "") {
        return this;
      } else {
        return new Validation(this.getErrorForFieldAt(statePath));
      }
    }
  }]);

  return Validation;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImmutPath = getImmutPath;
exports.getNewPath = getNewPath;

function getImmutPath(path) {
  if (path == "") return [];
  return path.split(".").map(function (p) {
    return isNaN(p) ? p : parseInt(p);
  });
}

function getNewPath(immutState, statePath, name) {
  if (isArray(getValue(immutState, statePath))) {
    var index = getValue(immutState, statePath).findIndex(function (obj) {
      return obj.id == name;
    });
    return "" + statePath + (statePath.length > 0 ? "." : "") + index + ".value";
  } else {
    return "" + statePath + (statePath.length > 0 ? "." : "") + name;
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = StateDispatcher;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _immutable = __webpack_require__(0);

var _FormElement = __webpack_require__(13);

var _FormElement2 = _interopRequireDefault(_FormElement);

var _StateValueHelpers = __webpack_require__(1);

var _rxjs = __webpack_require__(4);

var _rxjs2 = _interopRequireDefault(_rxjs);

var _FormEvents = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function StateDispatcher() {
  var convertIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (v, props) {
    return v;
  };
  var convertOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v, props) {
    return v;
  };

  return function (WrappedComponent) {
    var Dispatcher = function (_React$Component) {
      _inherits(Dispatcher, _React$Component);

      function Dispatcher(props) {
        _classCallCheck(this, Dispatcher);

        var _this = _possibleConstructorReturn(this, (Dispatcher.__proto__ || Object.getPrototypeOf(Dispatcher)).call(this, props));

        _this.handlers = {};
        _this.valueChangeObs = props.valueChangeObs.map(function (e) {
          var convertedValue = convertIn(e.value, props);
          if (convertedValue === e.value) return e;else return Object.assign({}, e, {
            value: convertedValue,
            validation: e.validation,
            statePath: e.type === _FormEvents.INITIAL_CHANGE_EVENT_TYPE ? undefined : props.statePath
          });
        });
        return _this;
      }

      _createClass(Dispatcher, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          if (this.context.attachToForm != null) this.context.attachToForm(function () {
            return _this2.getUncontrolledState();
          });
          this.subscription = this.valueChangeObs.filter(function (e) {
            return e.type == _FormEvents.INITIAL_CHANGE_EVENT_TYPE;
          }).do(function (e) {
            if (global.process && global.process.env && global.process.env.FORMALIZR_ENV === "DEBUG") {
              console.log("Dispatching uncontrolled values from " + _this2.props.statePath);
            }
          }).subscribe({
            next: function next(e) {
              return _this2.dispatchUncontrolledValues(e);
            }
          });
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.context.attachToForm != null) this.context.attachToForm(null);
          this.subscription.unsubscribe();
        }
      }, {
        key: "dispatchUncontrolledValues",
        value: function dispatchUncontrolledValues(event) {
          var _this3 = this;

          Object.keys(this.handlers).forEach(function (statePath) {
            if (event.oldValue === undefined || (0, _StateValueHelpers.getValue)(convertIn(event.value, _this3.props), statePath) !== (0, _StateValueHelpers.getValue)(convertIn(event.oldValue, _this3.props), statePath)) _this3.handlers[statePath].set((0, _StateValueHelpers.getValue)(convertIn(event.value, _this3.props), statePath));
          });
        }
      }, {
        key: "getChildContext",
        value: function getChildContext() {
          var _this4 = this;

          return {
            valueChangeObs: this.valueChangeObs,
            rootValueChangeObs: this.props.rootValueChangeObs,
            onStateChange: function onStateChange(v, statePath, validation) {
              var convertedInParentValue = convertIn(_this4.props.getValue(), _this4.props);
              var completeValue = Array.isArray(convertedInParentValue) === false ? Object.assign({}, convertedInParentValue, _defineProperty({}, statePath, v)) : (0, _immutable.List)().concat(convertedInParentValue).update(function (list) {
                return list.update(list.findIndex(function (item) {
                  return item.id === statePath;
                }), function (item) {
                  return Object.assign({}, item, { value: v });
                });
              });
              var convertedValue = convertOut(completeValue, _this4.props);
              // console.log(
              //   "On change",
              //   completeValue,
              //   convertedValue,
              //   completeValue !== convertedValue,
              //   v,
              //   statePath,
              // );
              if (convertedValue !== completeValue || (typeof convertedValue === "undefined" ? "undefined" : _typeof(convertedValue)) != _typeof(_this4.props.getValue())) _this4.props.onChange(convertedValue, _this4.props.statePath, validation);else _this4.props.onChange(v, "" + _this4.props.statePath + (_this4.props.statePath == "" || statePath == "" ? "" : ".") + statePath, validation);
            },
            attachToForm: null,
            addHandler: function (statePath, getHandler, setHandler) {
              _this4.handlers = Object.assign({}, _this4.handlers, _defineProperty({}, statePath, {
                get: getHandler,
                set: setHandler
              }));
            }.bind(this)
          };
        }
      }, {
        key: "getUncontrolledState",
        value: function getUncontrolledState() {
          var _this5 = this;

          var value = Object.keys(this.handlers).reduce(function (red, statePath) {
            return (0, _StateValueHelpers.setValue)(red, statePath, _this5.handlers[statePath].get());
          }, {});
          return convertOut(value, this.props);
        }
      }, {
        key: "render",
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return Dispatcher;
    }(_react2.default.Component);

    Dispatcher.defaultProps = Object.assign({}, WrappedComponent.defaultProps, {
      onChange: function onChange() {},

      value: {},
      valueChangeObs: _rxjs2.default.Observable.never()
    });

    Dispatcher.propTypes = {
      valueChangeObs: _react2.default.PropTypes.any,
      onChange: _react2.default.PropTypes.func
    };

    Dispatcher.childContextTypes = {
      valueChangeObs: _react2.default.PropTypes.any,
      onStateChange: _react2.default.PropTypes.func,
      addHandler: _react2.default.PropTypes.func,
      attachToForm: _react2.default.PropTypes.func,
      rootValueChangeObs: _react2.default.PropTypes.any
    };

    Dispatcher.contextTypes = {
      attachToForm: _react2.default.PropTypes.func
    };

    return (0, _FormElement2.default)({
      root: true,
      getUncontrolledValue: function getUncontrolledValue(child) {
        return child.getUncontrolledState();
      },
      setUncontrolledValue: function setUncontrolledValue(child) {}
    })(Dispatcher);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = FormElement;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _StateValueHelpers = __webpack_require__(1);

var _FormEvents = __webpack_require__(5);

var _rxjs = __webpack_require__(4);

var _rxjs2 = _interopRequireDefault(_rxjs);

var _ValidationHelpers = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NeverObservable = _rxjs2.default.Observable.never();

function FormElement() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$root = _ref.root,
      root = _ref$root === undefined ? false : _ref$root,
      _ref$validate = _ref.validate,
      validate = _ref$validate === undefined ? function () {
    return true;
  } : _ref$validate,
      getUncontrolledValue = _ref.getUncontrolledValue,
      setUncontrolledValue = _ref.setUncontrolledValue;

  return function FormElementHOC(WrappedComponent) {
    var FormElementContainer = function (_React$Component) {
      _inherits(FormElementContainer, _React$Component);

      function FormElementContainer(props, context) {
        _classCallCheck(this, FormElementContainer);

        var _this = _possibleConstructorReturn(this, (FormElementContainer.__proto__ || Object.getPrototypeOf(FormElementContainer)).call(this, props));

        _this.state = {
          value: null,
          validation: null
        };
        _this.configureObs(props, context);
        return _this;
      }

      _createClass(FormElementContainer, [{
        key: "getHumanReadableIdentifier",
        value: function getHumanReadableIdentifier(props, context) {
          var currentStatePath = this.getCurrentStatePath(props, context, {});
          return "ProxiedField with statePath " + (currentStatePath != null && currentStatePath !== "" ? currentStatePath : '""') + " and elementName " + (props.elementName != "" && props.elementName != undefined ? props.elementName : '""');
        }
      }, {
        key: "getAssignedObs",
        value: function getAssignedObs(props, context) {
          if (props.valueChangeObs) {
            return props.valueChangeObs;
          } else if (context.valueChangeObs) {
            return context.valueChangeObs;
          } else {
            return NeverObservable;
          }
        }
      }, {
        key: "configureObs",
        value: function configureObs(props, context) {
          var _this2 = this;

          this.parentValueChangeObs = this.getAssignedObs(props, context);
          if (this.parentValueChangeObs === NeverObservable && props.__debug) console.warn(this.getHumanReadableIdentifier(props, context) + " hasn't received any valueChangeObs neither as props nor context. Maybe you have forgotten the FormController / StateDispatcher duo");
          this.valueChangeObs = this.parentValueChangeObs.do(function (e) {
            if (props.__debug) {
              var path = _this2.getCompleteCurrentStatePath(props, context, e.value);
              if (path != "" && e.type === _FormEvents.VALUE_CHANGE_EVENT_TYPE) {
                console.log("FILTERING", path, "FOR STATEPATH", e.statePath, "PROPS", props, "CONTEXT", context);
              }
            }
          }).filter(function (e) {
            var path = _this2.getCompleteCurrentStatePath(props, context, e.value);
            return e.type === _FormEvents.INITIAL_CHANGE_EVENT_TYPE || e.type === _FormEvents.VALIDATION_FAILED_EVENT_TYPE || path.startsWith(e.statePath) || root && e.statePath.startsWith(path);
          }).do(function (e) {
            if (props.__debug) {
              var path = _this2.getCompleteCurrentStatePath(props, context, e.value);
              if (path != "" && e.type === _FormEvents.VALUE_CHANGE_EVENT_TYPE) {
                console.log("REFRESHING", path, "FOR EVENT", e);
              }
            }
          }).map(function (e) {
            return Object.assign({}, e, {
              value: (0, _StateValueHelpers.getValue)(e.value, _this2.getCurrentStatePath(props, context, e.value)),
              validation: e.validation && e.validation instanceof _ValidationHelpers.Validation ? e.validation.getNestedValidation(_this2.getCurrentStatePath(props, context, e.value)) : e.validation
            });
          }).do(function (e) {
            if (props.__debug) {
              console.log("FOUND VALUE:", e);
            }
          });
        }
      }, {
        key: "connectToFormController",
        value: function connectToFormController(props, context) {
          var _this3 = this;

          if (this.valueChangeObs && this.isControlled(props, context)) {
            this.disconnectFromFormController();
            this.subscription = this.valueChangeObs.subscribe(function (e) {
              if (props.__debug) {
                console.log("Setting value", e, "in " + (root ? "instance" : "state") + " mode");
              }
              if (e.value === undefined) {
                console.warn(_this3.getHumanReadableIdentifier(props, context) + " doesn't have any value set in the state, it may break");
              }
              if (root) {
                _this3.value = e.value;
                _this3.validation = e.validation;
              } else {
                _this3.setState({
                  value: e.value,
                  validation: e.validation
                });
              }
            });
          }
        }
      }, {
        key: "disconnectFromFormController",
        value: function disconnectFromFormController() {
          if (this.subscription) {
            this.subscription.unsubscribe();
          }
        }
      }, {
        key: "connectToUncontrolledHandlers",
        value: function connectToUncontrolledHandlers(props, context) {
          var _this4 = this;

          if (props.elementName && context.addHandler && !this.isControlled(props, context)) {
            if (getUncontrolledValue == null || setUncontrolledValue == null) {
              console.warn(this.getHumanReadableIdentifier(props, context) + " is uncontrolled but has no getValue / setValue defined, thus it is disabled and not connected");
            } else {
              context.addHandler(this.getCurrentStatePath(props, context), function () {
                return root ? _this4.getUncontrolledState() : getUncontrolledValue(_this4.child);
              }, function (value) {
                return root ? _this4.child.dispatchUncontrolledValues({ value: value }) : setUncontrolledValue(_this4.child, value);
              });
            }
          }
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.connectToUncontrolledHandlers(this.props, this.context);
          this.connectToFormController(this.props, this.context);
        }
      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps, nextContext) {
          if (this.parentValueChangeObs !== this.getAssignedObs(nextProps, nextContext)) {
            console.log("Reconnecting " + this.getHumanReadableIdentifier(nextProps, nextContext));
            this.configureObs(nextProps, nextContext);
            this.connectToFormController(nextProps, nextContext);
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.disconnectFromFormController();
        }
      }, {
        key: "getNewPathPart",
        value: function getNewPathPart(props, context, v) {
          var value = (0, _StateValueHelpers.getValue)(v, context.statePath || "");
          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && Array.isArray(value)) {
            var index = value.findIndex(function (v) {
              return v.id == props.elementName;
            });
            return (index != -1 ? index : "") + ".value";
          } else {
            return props.elementName;
          }
        }
      }, {
        key: "getNewCompletePathPart",
        value: function getNewCompletePathPart(props, context, v) {
          var value = (0, _StateValueHelpers.getValue)(v, context.completeStatePath || "");
          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && Array.isArray(value)) {
            var index = value.findIndex(function (v) {
              return v.id == props.elementName;
            });
            return (index != -1 ? index : "") + ".value";
          } else {
            return props.elementName;
          }
        }
      }, {
        key: "getCurrentStatePath",
        value: function getCurrentStatePath(props, context, value) {
          if (context.statePath && context.statePath != "" && props.elementName) return context.statePath + "." + this.getNewPathPart(props, context, value);else if (props.elementName) return this.getNewPathPart(props, context, value);else if (context.statePath) return context.statePath;else return "";
        }
      }, {
        key: "getCompleteCurrentStatePath",
        value: function getCompleteCurrentStatePath(props, context, value) {
          if (props.valueChangeObs == null && context.completeStatePath && context.completeStatePath != "" && props.elementName) return context.completeStatePath + "." + this.getNewCompletePathPart(props, context, value);else if (props.elementName) return this.getNewCompletePathPart(props, context, value);else if (props.valueChangeObs == null && context.completeStatePath) return context.completeStatePath;else return "";
        }
      }, {
        key: "isControlled",
        value: function isControlled(props, context) {
          return props.uncontrolled || context.uncontrolled ? false : true;
        }
      }, {
        key: "getStatePathToDispatch",
        value: function getStatePathToDispatch(props, context) {
          if (root) return "";else return this.getCurrentStatePath(props, context);
        }
      }, {
        key: "getChildContext",
        value: function getChildContext() {
          return {
            statePath: this.getStatePathToDispatch(this.props, this.context),
            completeStatePath: this.getCompleteCurrentStatePath(this.props, this.context),
            uncontrolled: this.isControlled(this.props, this.context) === false
          };
        }
      }, {
        key: "getUncontrolledState",
        value: function getUncontrolledState() {
          return this.child.getUncontrolledState();
        }
      }, {
        key: "render",
        value: function render() {
          var _this5 = this;

          var value = this.state.value == undefined && this.props.value !== undefined ? this.props.value : this.state.value;
          var validation = this.state.validation == undefined && this.props.validation !== undefined ? this.props.validation : this.state.validation;
          var statePath = this.getCurrentStatePath(this.props, this.context);
          if (this.isControlled(this.props, this.context)) {
            return _react2.default.createElement(WrappedComponent, _extends({}, Object.assign({}, this.props, {
              value: value,
              validation: validation,
              valueChangeObs: this.valueChangeObs,
              rootValueChangeObs: this.context.rootValueChangeObs ? this.context.rootValueChangeObs : this.valueChangeObs,
              onChange: this.props.onChange != null ? function (newValue, sp) {
                _this5.props.onChange(newValue, sp !== undefined ? sp : statePath, validate(newValue, _this5.props));
              } : function (newValue, sp) {
                _this5.context.onStateChange(newValue, sp !== undefined ? sp : statePath, validate(newValue, _this5.props));
              },
              statePath: statePath,
              getValue: root ? function () {
                return _this5.value;
              } : undefined
            }), {
              ref: function ref(elem) {
                return _this5.child = elem;
              }
            }));
          } else {
            return _react2.default.createElement(WrappedComponent, _extends({}, Object.assign({}, this.props, {
              statePath: statePath,
              getValue: root ? function () {
                return _this5.value;
              } : undefined
            }), {
              ref: function ref(elem) {
                return _this5.child = elem;
              }
            }));
          }
        }
      }]);

      return FormElementContainer;
    }(_react2.default.Component);

    FormElementContainer.defaultProps = Object.assign({
      uncontrolled: false
    }, {
      elementName: WrappedComponent.defaultProps && WrappedComponent.defaultProps.elementName || undefined
    });

    FormElementContainer.contextTypes = {
      statePath: _react2.default.PropTypes.string,
      completeStatePath: _react2.default.PropTypes.string,
      valueChangeObs: _react2.default.PropTypes.any,
      onStateChange: _react2.default.PropTypes.func,
      addHandler: _react2.default.PropTypes.func,
      uncontrolled: _react2.default.PropTypes.bool,
      rootValueChangeObs: _react2.default.PropTypes.any
    };

    FormElementContainer.childContextTypes = {
      statePath: _react2.default.PropTypes.string,
      completeStatePath: _react2.default.PropTypes.string,
      uncontrolled: _react2.default.PropTypes.bool
    };

    return FormElementContainer;
  };
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(8);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Form = __webpack_require__(16);

Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Form).default;
  }
});

var _StateDispatcher = __webpack_require__(12);

Object.defineProperty(exports, "StateDispatcher", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StateDispatcher).default;
  }
});

var _FormElement = __webpack_require__(13);

Object.defineProperty(exports, "FormElement", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormElement).default;
  }
});

var _FormWatcher = __webpack_require__(17);

Object.defineProperty(exports, "FormWatcher", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormWatcher).default;
  }
});

var _StateValueHelpers = __webpack_require__(1);

Object.defineProperty(exports, "getValue", {
  enumerable: true,
  get: function get() {
    return _StateValueHelpers.getValue;
  }
});

var _ValidationComposition = __webpack_require__(22);

Object.defineProperty(exports, "notNull", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.notNull;
  }
});
Object.defineProperty(exports, "notUndefined", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.notUndefined;
  }
});
Object.defineProperty(exports, "notEmpty", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.notEmpty;
  }
});
Object.defineProperty(exports, "composeValidation", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.composeValidation;
  }
});
Object.defineProperty(exports, "required", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.required;
  }
});
Object.defineProperty(exports, "isTrue", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.isTrue;
  }
});
Object.defineProperty(exports, "maxLength", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.maxLength;
  }
});
Object.defineProperty(exports, "lessThan", {
  enumerable: true,
  get: function get() {
    return _ValidationComposition.lessThan;
  }
});

var _FormModel = __webpack_require__(23);

Object.defineProperty(exports, "convertConversionModelToConversionJobs", {
  enumerable: true,
  get: function get() {
    return _FormModel.convertConversionModelToConversionJobs;
  }
});
Object.defineProperty(exports, "convertIn", {
  enumerable: true,
  get: function get() {
    return _FormModel.convertIn;
  }
});
Object.defineProperty(exports, "convertOut", {
  enumerable: true,
  get: function get() {
    return _FormModel.convertOut;
  }
});
Object.defineProperty(exports, "validateModel", {
  enumerable: true,
  get: function get() {
    return _FormModel.validateModel;
  }
});

var _ValidationHelpers = __webpack_require__(6);

Object.defineProperty(exports, "isValid", {
  enumerable: true,
  get: function get() {
    return _ValidationHelpers.isValid;
  }
});
Object.defineProperty(exports, "getErrorText", {
  enumerable: true,
  get: function get() {
    return _ValidationHelpers.getErrorText;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Form;

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _immutable = __webpack_require__(0);

var _rxjs = __webpack_require__(4);

var _rxjs2 = _interopRequireDefault(_rxjs);

var _FormEvents = __webpack_require__(5);

var _StateValueHelpers = __webpack_require__(1);

var _ValidationHelpers = __webpack_require__(6);

var _StateDispatcher = __webpack_require__(12);

var _StateDispatcher2 = _interopRequireDefault(_StateDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Form() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$applyControl = _ref.applyControl,
      applyControl = _ref$applyControl === undefined ? function (state) {
    return state;
  } : _ref$applyControl,
      _ref$convertIn = _ref.convertIn,
      convertIn = _ref$convertIn === undefined ? function (value, props) {
    return value;
  } : _ref$convertIn,
      _ref$convertOut = _ref.convertOut,
      convertOut = _ref$convertOut === undefined ? function (value, props) {
    return value;
  } : _ref$convertOut,
      _ref$validate = _ref.validate,
      validate = _ref$validate === undefined ? function (value, props) {
    return true;
  } : _ref$validate,
      _ref$checkIfModified = _ref.checkIfModified,
      checkIfModified = _ref$checkIfModified === undefined ? false : _ref$checkIfModified,
      _ref$immutableInitial = _ref.immutableInitial,
      immutableInitial = _ref$immutableInitial === undefined ? false : _ref$immutableInitial;

  return function FormHOC(WrappedComponent) {
    var WrappedComponentWithDispatcher = (0, _StateDispatcher2.default)()(WrappedComponent);

    var FormContainer = function (_React$Component) {
      _inherits(FormContainer, _React$Component);

      function FormContainer(props) {
        _classCallCheck(this, FormContainer);

        var _this = _possibleConstructorReturn(this, (FormContainer.__proto__ || Object.getPrototypeOf(FormContainer)).call(this));

        _this.subject = new _rxjs2.default.Subject().scan(function (acc, e) {
          var newValidation = e.validation != null ? e.validation : acc.validation;
          switch (e.type) {
            case _FormEvents.VALUE_CHANGE_EVENT_TYPE:
              var newState = (0, _StateValueHelpers.setValue)(acc.value, e.statePath, e.newValue);
              var controlledNewState = applyControl(newState, _this.props);
              return {
                type: _FormEvents.VALUE_CHANGE_EVENT_TYPE,
                value: controlledNewState,
                oldValue: acc.value,
                statePath: e.statePath,
                validation: newValidation
              };
            case _FormEvents.SUBMIT_EVENT_TYPE:
              return {
                type: _FormEvents.SUBMIT_EVENT_TYPE,
                value: acc.value,
                validation: acc.validation
              };
            case _FormEvents.INITIAL_CHANGE_EVENT_TYPE:
              return {
                type: _FormEvents.INITIAL_CHANGE_EVENT_TYPE,
                value: e.newValue,
                oldValue: acc.value,
                validation: newValidation
              };
            case _FormEvents.VALIDATION_FAILED_EVENT_TYPE:
              return {
                type: _FormEvents.VALIDATION_FAILED_EVENT_TYPE,
                value: acc.value,
                validation: e.validation
              };
            default:
              return acc;
          }
        }, { value: _this._getInitialValue(props), validation: true }).do(function (e) {
          return global.process && global.process.env && global.process.env.FORMALIZR_ENV === "DEBUG" && console.log("Form event:\n", e);
        }).share();
        _this.subject.filter(function (e) {
          return e.type == _FormEvents.SUBMIT_EVENT_TYPE;
        }).subscribe({
          next: function next(e) {
            return _this._submit(e.value);
          }
        });
        _this.valueChangeObs = _this.subject.filter(function (e) {
          return e.type == _FormEvents.VALUE_CHANGE_EVENT_TYPE || e.type == _FormEvents.INITIAL_CHANGE_EVENT_TYPE || e.type == _FormEvents.VALIDATION_FAILED_EVENT_TYPE;
        }).publishBehavior({
          type: _FormEvents.INITIAL_CHANGE_EVENT_TYPE,
          value: _this._getInitialValue(props),
          validation: true
        }).refCount();
        _this.rootDispatcherGetter = null;
        return _this;
      }

      _createClass(FormContainer, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          var newInitial = this._getInitialValue(nextProps);
          var oldInitial = this._getInitialValue(this.props);
          if (oldInitial != null && "toJS" in oldInitial && newInitial != null && "toJS" in newInitial || immutableInitial) {
            if (newInitial !== oldInitial) this.subject.next((0, _FormEvents.createInitialChangeEvent)(newInitial));
          } else if (oldInitial == null && newInitial != null) {
            this.subject.next((0, _FormEvents.createInitialChangeEvent)(newInitial));
          } else if (oldInitial != null && newInitial != null) {
            if (!(0, _immutable.is)((0, _immutable.fromJS)(newInitial), (0, _immutable.fromJS)(oldInitial))) this.subject.next((0, _FormEvents.createInitialChangeEvent)(newInitial));
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.subject.unsubscribe();
        }
      }, {
        key: "_getInitialValue",
        value: function _getInitialValue(props) {
          var v = typeof props.formInputValue != "function" ? props.formInputValue : props.formInputValue(props);
          return convertIn(v == null ? {} : v, props);
        }
      }, {
        key: "_mergeValues",
        value: function _mergeValues(value) {
          return (0, _immutable.fromJS)(value).mergeDeep(this.rootDispatcherGetter ? (0, _immutable.fromJS)(this.rootDispatcherGetter()) : (0, _immutable.fromJS)({}));
        }
      }, {
        key: "_submit",
        value: function _submit(value) {
          var newValue = this._mergeValues(value);
          if (checkIfModified === false || !(0, _immutable.is)(newValue, (0, _immutable.fromJS)(this._getInitialValue(this.props)))) {
            var validation = validate(newValue.toJS(), this.props);
            if (validation === true || validation == null) {
              if (this.props.onSubmit == null) {
                console.warn("Form hasn't received any onSubmit function as props, you may have forgotten it");
              } else {
                this.props.onSubmit(convertOut(newValue.toJS(), this.props));
              }
            } else {
              var newValidation = new _ValidationHelpers.Validation(validation);
              if (typeof this.props.onValidationFailed === "function") {
                this.props.onValidationFailed(newValidation);
              }
              this.subject.next((0, _FormEvents.createValidationFailedEvent)(newValidation));
            }
          }
        }
      }, {
        key: "getChildContext",
        value: function getChildContext() {
          var _this2 = this;

          return {
            attachToForm: function attachToForm(getter) {
              _this2.rootDispatcherGetter = getter;
            }
          };
        }
      }, {
        key: "render",
        value: function render() {
          var _this3 = this;

          return _react2.default.createElement(WrappedComponentWithDispatcher, _extends({}, this.props, {
            onChange: function onChange(value, statePath, validation) {
              return _this3.subject.next((0, _FormEvents.createValueChangeEvent)(value, statePath, validation));
            },
            valueChangeObs: this.valueChangeObs,
            submit: function submit() {
              return _this3.subject.next((0, _FormEvents.createSubmitChangeEvent)());
            }
          }));
        }
      }]);

      return FormContainer;
    }(_react2.default.Component);

    FormContainer.childContextTypes = {
      attachToForm: _react2.default.PropTypes.func
    };

    return FormContainer;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _FormEvents = __webpack_require__(5);

var _rxjs = __webpack_require__(4);

var _rxjs2 = _interopRequireDefault(_rxjs);

var _propTypes = __webpack_require__(18);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _StateValueHelpers = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NeverObservable = _rxjs2.default.Observable.never();

var FormWatcher = function (_React$Component) {
  _inherits(FormWatcher, _React$Component);

  function FormWatcher(props, context) {
    _classCallCheck(this, FormWatcher);

    var _this = _possibleConstructorReturn(this, (FormWatcher.__proto__ || Object.getPrototypeOf(FormWatcher)).call(this, props));

    _this.state = {
      value: null,
      validation: true
    };

    _this.watchPath = _this.getWatchedPath(props, context);
    if (_this.watchPath == null) {
      throw new Error("watchPath props is not set on FormWatcher, you have to set a statepath string on which the FormWatcher will watch");
    }
    _this.selectObs(props, context);
    return _this;
  }

  _createClass(FormWatcher, [{
    key: "getAssignedObs",
    value: function getAssignedObs(props, context) {
      if (context.rootValueChangeObs != null) return context.rootValueChangeObs;else return NeverObservable;
    }
  }, {
    key: "selectObs",
    value: function selectObs(props, context) {
      var _this2 = this;

      this.valueChangeObs = this.getAssignedObs(props, context).filter(function (e) {
        if (props.__debug) {
          console.log("FILTERING", e, "In watcher", _this2.watchPath);
        }
        if (e.statePath) return _this2.watchPath.startsWith(e.statePath) || e.statePath.startsWith(_this2.watchPath);else if (e.type === _FormEvents.INITIAL_CHANGE_EVENT_TYPE) return true;else if (e.type === _FormEvents.VALIDATION_FAILED_EVENT_TYPE) return true;else return false;
      });
    }
  }, {
    key: "connectsToFormController",
    value: function connectsToFormController() {
      var _this3 = this;

      if (this.subscription) this.subscription.unsubscribe();
      this.subscription = this.valueChangeObs.subscribe(function (e) {
        _this3.setState({
          value: e.value,
          validation: e.validation
        });
      });
    }
  }, {
    key: "getWatchedPath",
    value: function getWatchedPath(props, context) {
      return typeof props.watchPath === "function" ? props.watchPath(context.completeStatePath || "") : props.watchPath;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.connectsToFormController();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      if (this.valueChangeObs !== this.getAssignedObs(nextProps, nextContext)) {
        this.selectObs(nextProps, nextContext);
        this.connectsToFormController();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (typeof this.props.children !== "function") throw new Error("children of FormWatcher must be a function of type (stateValue, props) => React$element");
      var watchedValidation = _typeof(this.state.validation) === "object" && this.state.validation !== null ? this.state.validation.getNestedValidation(this.watchPath) : this.state.validation;
      return this.props.children({
        value: this.state.value,
        watchedValue: (0, _StateValueHelpers.getValue)(this.state.value, this.getWatchedPath(this.props, this.context)),
        watchedStatePath: this.watchPath,
        validation: this.state.validation,
        watchedValidation: watchedValidation
      }, this.props);
    }
  }]);

  return FormWatcher;
}(_react2.default.Component);

exports.default = FormWatcher;


FormWatcher.propTypes = {};

FormWatcher.defaultProps = {
  __debug: false
};

FormWatcher.contextTypes = {
  rootValueChangeObs: _propTypes2.default.any,
  completeStatePath: _propTypes2.default.string
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(19)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(21)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(8);
var invariant = __webpack_require__(9);
var warning = __webpack_require__(14);

var ReactPropTypesSecret = __webpack_require__(10);
var checkPropTypes = __webpack_require__(20);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(9);
  var warning = __webpack_require__(14);
  var ReactPropTypesSecret = __webpack_require__(10);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(8);
var invariant = __webpack_require__(9);
var ReactPropTypesSecret = __webpack_require__(10);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notNull = notNull;
exports.notUndefined = notUndefined;
exports.notEmpty = notEmpty;
exports.composeValidation = composeValidation;
exports.required = required;
exports.isTrue = isTrue;
exports.maxLength = maxLength;
exports.lessThan = lessThan;

var _immutable = __webpack_require__(0);

function notNull() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$errorString = _ref.errorString,
      errorString = _ref$errorString === undefined ? "Not filled" : _ref$errorString;

  return function validateNotNull(value) {
    if (value === null) {
      return errorString;
    } else {
      return true;
    }
  };
}

function notUndefined() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$errorString = _ref2.errorString,
      errorString = _ref2$errorString === undefined ? "not filled" : _ref2$errorString;

  return function validateNotUndefined(value) {
    if (value === undefined) {
      return errorString;
    } else {
      return true;
    }
  };
}

function notEmpty() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$errorString = _ref3.errorString,
      errorString = _ref3$errorString === undefined ? "not filled" : _ref3$errorString;

  return function validateNotEmpty(value) {
    if (value === "") {
      return errorString;
    } else {
      return true;
    }
  };
}

function composeValidation() {
  for (var _len = arguments.length, validates = Array(_len), _key = 0; _key < _len; _key++) {
    validates[_key] = arguments[_key];
  }

  return function validateValue(value, props) {
    return validates.reduce(function (red, validate) {
      if (red !== true) return red;
      var validated = validate(value, props);
      if (validated === true) return true;else return validated;
    }, true);
  };
}

function required() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$errorString = _ref4.errorString,
      errorString = _ref4$errorString === undefined ? "not filled" : _ref4$errorString;

  return composeValidation(notUndefined({ errorString: errorString }), notNull({ errorString: errorString }), notEmpty({ errorString: errorString }));
}

function isTrue() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref5$errorString = _ref5.errorString,
      errorString = _ref5$errorString === undefined ? "not true" : _ref5$errorString;

  return function validateTrue(value) {
    if (value !== true) {
      return errorString;
    } else {
      return true;
    }
  };
}

function maxLength(max) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$errorString = _ref6.errorString,
      errorString = _ref6$errorString === undefined ? "too long" : _ref6$errorString;

  return function validateMaxLength(value) {
    if (typeof value !== "string" || value.length > max) {
      return errorString;
    } else {
      return true;
    }
  };
}

function lessThan(accessor1, accessor2) {
  var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref7$error = _ref7.error,
      error = _ref7$error === undefined ? "Invalid" : _ref7$error;

  return function validateLessThan(value, props) {
    if (typeof accessor1 !== "function" && typeof accessor1 !== "string" || typeof accessor2 !== "function" && typeof accessor2 !== "string") throw new Error("lessThan validator takes either a function or a stringPath as accessor type");
    var value1 = typeof accessor1 === "function" ? accessor1(value, props) : (0, _immutable.fromJS)(value).getIn(accessor1.split("."));
    var value2 = typeof accessor2 === "function" ? accessor2(value, props) : (0, _immutable.fromJS)(value).getIn(accessor2.split("."));
    // $FlowFixMe
    if (value1 > value2) {
      if (typeof error === "function") return error(value, props);else return error;
    } else {
      return true;
    }
  };
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.convertConversionModelToConversionJobs = convertConversionModelToConversionJobs;
exports.convertIn = convertIn;
exports.convertOut = convertOut;
exports.validateModel = validateModel;

var _immutable = __webpack_require__(0);

function convertConversionModelToConversionJobs(model) {
  var currentInPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var parentOutPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  if ((typeof model === "undefined" ? "undefined" : _typeof(model)) !== "object" || model == null) {
    return (0, _immutable.List)();
  }
  var currentNodeOutPath = "out" in model || "out_path" in model ? model.out || model.out_path || "" : "";
  var currentOutPath = "" + (parentOutPath != "" ? parentOutPath + "." + currentNodeOutPath : currentNodeOutPath);
  var jobs = (0, _immutable.List)().concat(currentInPath !== "" ? _immutable.List.of({
    in: currentInPath,
    out: currentOutPath,
    convertIn: "convertIn" in model ? model.convertIn : undefined,
    convertOut: "convertOut" in model ? model.convertOut : undefined,
    default: model.default,
    validate: "validate" in model ? model.validate : undefined
  }) : (0, _immutable.List)()).concat(Object.keys(model).filter(function (nodeKey) {
    return !["convertIn", "convertOut", "out", "out_path", "complex", "default", "validate"].includes(nodeKey);
  }).reduce(function (red, nodeKey) {
    var childNode = model[nodeKey];
    var childInPath = currentInPath ? currentInPath + "." + nodeKey : nodeKey;
    return red.concat(convertConversionModelToConversionJobs(childNode, childInPath, currentOutPath));
  }, (0, _immutable.List)()));
  return jobs;
}

function convertIn(jobs) {
  return function convertInModelValue(value, props) {
    if (value == null) return {};
    var immutableValue = (0, _immutable.fromJS)(value);
    if (props && props.__debug && console.groupCollapsed) {
      console.groupCollapsed("Form ConvertIn");
    }
    var convertedValue = jobs.reduceRight(function (red, job) {
      var inPath = job.in.split(".");
      var outPath = job.out.split(".");
      var notConvertedValue = inPath.length === 1 && inPath[0] === "" ? immutableValue : immutableValue.getIn(inPath, red.getIn(outPath, job.default));
      var inValue = typeof job.convertIn === "function" ? job.convertIn(notConvertedValue, props) : notConvertedValue;
      var newRed = void 0;
      if (red.getIn(outPath) != null && inValue != null && inValue !== false || outPath.length === 1 && outPath[0] === "") newRed = red;else {
        newRed = red.setIn(outPath, (0, _immutable.fromJS)(inValue));
      }
      if (props && props.__debug) {
        console.log("ConvertIn reducing...", "\nState (initial, red):", immutableValue, red, "\nJob:", job, "\nIn:", inPath, inValue, "converted from", notConvertedValue, "\nOut:", outPath, "\nNew reduction:", newRed);
      }
      return newRed;
    }, (0, _immutable.Map)()).toJS();
    if (props && props.__debug) {
      console.log("ConvertIn converted", value, "into", convertedValue, "with props", props, "and jobs", jobs);
      if (console.groupEnd) {
        console.groupEnd();
      }
    }
    return convertedValue;
  };
}

function convertOut(jobs) {
  return function convertOutModelValue(value, props) {
    if (value == null) return {};
    var immutableValue = (0, _immutable.fromJS)(value);
    if (props && props.__debug && console.groupCollapsed) {
      console.groupCollapsed("Form ConvertOut");
    }
    var convertedValue = jobs.reduceRight(function (red, job) {
      var outPath = job.out.split(".");
      var notConvertedValue = immutableValue.getIn(outPath);
      var outValue = typeof job.convertOut === "function" ? job.convertOut(notConvertedValue, props) : notConvertedValue;
      if (outValue === undefined) {
        return red;
      }
      var inPath = job.in.split(".");
      var newRed = void 0;
      if ((red.getIn(inPath) != null && outValue != null || inPath.length === 1 && inPath[0] === "") && !job.convertOut) newRed = red;else {
        newRed = red.setIn(inPath, outValue);
      }
      if (props && props.__debug) {
        console.log("ConvertOut reducing...", "\nState (initial, red):", immutableValue, red, "\nJob:", job, "\nOut:", outPath, outValue, "converted from", notConvertedValue, "\nIn:", inPath, "\nNew reduction:", newRed);
      }
      return newRed;
    }, (0, _immutable.Map)()).toJS();
    if (props && props.__debug) {
      console.log("ConvertOut converted", value, "into", convertedValue, "with props", props, "and jobs", jobs);
      if (console.groupEnd) {
        console.groupEnd();
      }
    }
    return convertedValue;
  };
}

function validateModel(jobs) {
  return function validateState(value, props) {
    var immutableValue = (0, _immutable.fromJS)(value);
    var wholeValidation = jobs.reduceRight(function (red, job) {
      var outPath = job.out.split(".");
      var fieldValue = immutableValue.getIn(outPath);
      if (outPath.length === 1 && outPath[0] === "" && typeof job.validate === "function") throw new Error("You can't use validation if you don't have any out, either in the current node or a parent one. At " + job.in);
      var validation = typeof job.validate === "function" ? job.validate(fieldValue, props) : true;
      if (validation === true || validation === null || validation === undefined) {
        return red;
      } else {
        return ((typeof red === "undefined" ? "undefined" : _typeof(red)) === "object" ? red : (0, _immutable.Map)()).setIn(outPath, validation);
      }
    }, true);

    if ((typeof wholeValidation === "undefined" ? "undefined" : _typeof(wholeValidation)) === "object") return wholeValidation.toJS();else return wholeValidation;
  };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map