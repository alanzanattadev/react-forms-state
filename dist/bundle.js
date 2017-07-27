(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("rxjs"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "rxjs"], factory);
	else if(typeof exports === 'object')
		exports["ReactFormsState"] = factory(require("immutable"), require("react"), require("rxjs"));
	else
		root["ReactFormsState"] = factory(root["immutable"], root["React"], root["Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
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

var _StatePathHelpers = __webpack_require__(8);

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

var _StatePathHelpers = __webpack_require__(8);

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
/* 3 */
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

var _ValidationHelpers = __webpack_require__(2);

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
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = StateProxy;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _StateValueHelpers = __webpack_require__(1);

var _FormEvents = __webpack_require__(3);

var _rxjs = __webpack_require__(5);

var _rxjs2 = _interopRequireDefault(_rxjs);

var _ValidationHelpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NeverObservable = _rxjs2.default.Observable.never();

function StateProxy() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$root = _ref.root,
      root = _ref$root === undefined ? false : _ref$root,
      _ref$validate = _ref.validate,
      validate = _ref$validate === undefined ? function () {
    return true;
  } : _ref$validate;

  var uncontrolledConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    getValue: function getValue() {
      return undefined;
    },
    setValue: function setValue() {
      return undefined;
    }
  };

  return function (WrappedComponent) {
    var ProxiedState = function (_React$Component) {
      _inherits(ProxiedState, _React$Component);

      function ProxiedState(props, context) {
        _classCallCheck(this, ProxiedState);

        var _this = _possibleConstructorReturn(this, (ProxiedState.__proto__ || Object.getPrototypeOf(ProxiedState)).call(this, props));

        _this.state = {
          value: null,
          validation: null
        };
        _this.configureObs(props, context);
        return _this;
      }

      _createClass(ProxiedState, [{
        key: "getHumanReadableIdentifier",
        value: function getHumanReadableIdentifier(props, context) {
          var currentStatePath = this.getCurrentStatePath(props, context, {});
          return "ProxiedField with statePath " + (currentStatePath != null && currentStatePath !== "" ? currentStatePath : '""') + " and name " + (props.name != "" && props.name != undefined ? props.name : '""');
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

          if (props.name && context.addHandler && !this.isControlled(props, context)) {
            if (uncontrolledConfig.getValue == null || uncontrolledConfig.setValue == null) {
              console.warn(this.getHumanReadableIdentifier(props, context) + " is uncontrolled but has no getValue / setValue defined, thus it is disabled and not connected");
            } else {
              context.addHandler(this.getCurrentStatePath(props, context), function () {
                return root ? _this4.getUncontrolledState() : uncontrolledConfig.getValue(_this4.child);
              }, function (value) {
                return root ? _this4.child.dispatchUncontrolledValues({ value: value }) : uncontrolledConfig.setValue(_this4.child, value);
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
              return v.id == props.name;
            });
            return (index != -1 ? index : "") + ".value";
          } else {
            return props.name;
          }
        }
      }, {
        key: "getNewCompletePathPart",
        value: function getNewCompletePathPart(props, context, v) {
          var value = (0, _StateValueHelpers.getValue)(v, context.completeStatePath || "");
          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && Array.isArray(value)) {
            var index = value.findIndex(function (v) {
              return v.id == props.name;
            });
            return (index != -1 ? index : "") + ".value";
          } else {
            return props.name;
          }
        }
      }, {
        key: "getCurrentStatePath",
        value: function getCurrentStatePath(props, context, value) {
          if (context.statePath && context.statePath != "" && props.name) return context.statePath + "." + this.getNewPathPart(props, context, value);else if (props.name) return this.getNewPathPart(props, context, value);else if (context.statePath) return context.statePath;else return "";
        }
      }, {
        key: "getCompleteCurrentStatePath",
        value: function getCompleteCurrentStatePath(props, context, value) {
          if (props.valueChangeObs == null && context.completeStatePath && context.completeStatePath != "" && props.name) return context.completeStatePath + "." + this.getNewCompletePathPart(props, context, value);else if (props.name) return this.getNewCompletePathPart(props, context, value);else if (props.valueChangeObs == null && context.completeStatePath) return context.completeStatePath;else return "";
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

      return ProxiedState;
    }(_react2.default.Component);

    ProxiedState.defaultProps = Object.assign({
      uncontrolled: false
    }, {
      name: WrappedComponent.defaultProps && WrappedComponent.defaultProps.name || undefined
    });

    ProxiedState.contextTypes = {
      statePath: _react2.default.PropTypes.string,
      completeStatePath: _react2.default.PropTypes.string,
      valueChangeObs: _react2.default.PropTypes.any,
      onStateChange: _react2.default.PropTypes.func,
      addHandler: _react2.default.PropTypes.func,
      uncontrolled: _react2.default.PropTypes.bool,
      rootValueChangeObs: _react2.default.PropTypes.any
    };

    ProxiedState.childContextTypes = {
      statePath: _react2.default.PropTypes.string,
      completeStatePath: _react2.default.PropTypes.string,
      uncontrolled: _react2.default.PropTypes.bool
    };

    return ProxiedState;
  };
}

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = FormController;

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _immutable = __webpack_require__(0);

var _rxjs = __webpack_require__(5);

var _rxjs2 = _interopRequireDefault(_rxjs);

var _FormEvents = __webpack_require__(3);

var _StateValueHelpers = __webpack_require__(1);

var _ValidationHelpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function FormController() {
  var applyControl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
    return state;
  };
  var convertIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value, props) {
    return value;
  };
  var convertOut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (value, props) {
    return value;
  };

  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$checkIfModified = _ref.checkIfModified,
      checkIfModified = _ref$checkIfModified === undefined ? true : _ref$checkIfModified,
      _ref$immutableInitial = _ref.immutableInitial,
      immutableInitial = _ref$immutableInitial === undefined ? false : _ref$immutableInitial;

  var validate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (value, props) {
    return true;
  };

  return function (WrappedComponent) {
    var Controller = function (_React$Component) {
      _inherits(Controller, _React$Component);

      function Controller(props) {
        _classCallCheck(this, Controller);

        var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

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
          return global.process && global.process.env && global.process.env.FORMALIZR_ENV === "DEBUG" && console.log("FormController event:\n", e);
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

      _createClass(Controller, [{
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
          var v = typeof props.initial != "function" ? props.initial : props.initial(props);
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
              this.props.onSubmit(convertOut(newValue.toJS(), this.props));
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
            attachToController: function attachToController(getter) {
              _this2.rootDispatcherGetter = getter;
            }
          };
        }
      }, {
        key: "render",
        value: function render() {
          var _this3 = this;

          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
            onChange: function onChange(value, statePath, validation) {
              return _this3.subject.next((0, _FormEvents.createValueChangeEvent)(value, statePath, validation));
            },
            valueChangeObs: this.valueChangeObs,
            onSubmit: function onSubmit() {
              return _this3.subject.next((0, _FormEvents.createSubmitChangeEvent)());
            }
          }));
        }
      }]);

      return Controller;
    }(_react2.default.Component);

    Controller.childContextTypes = {
      attachToController: _react2.default.PropTypes.func
    };

    return Controller;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 10 */
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
  var currentNodeOutPath = "out" in model || "out_path" in model ? model.out || model.out_path : "";
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

function convertIn(value, jobs, props) {
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
}

function convertOut(value, jobs, props) {
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

/***/ }),
/* 11 */
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

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _immutable = __webpack_require__(0);

var _StateProxy = __webpack_require__(6);

var _StateProxy2 = _interopRequireDefault(_StateProxy);

var _StateValueHelpers = __webpack_require__(1);

var _rxjs = __webpack_require__(5);

var _rxjs2 = _interopRequireDefault(_rxjs);

var _FormEvents = __webpack_require__(3);

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

          if (this.context.attachToController != null) this.context.attachToController(function () {
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
          if (this.context.attachToController != null) this.context.attachToController(null);
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
            attachToController: null,
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
      attachToController: _react2.default.PropTypes.func,
      rootValueChangeObs: _react2.default.PropTypes.any
    };

    Dispatcher.contextTypes = {
      attachToController: _react2.default.PropTypes.func
    };

    return (0, _StateProxy2.default)({ root: true }, {
      getValue: function getValue(child) {
        return child.getUncontrolledState();
      },
      setValue: function setValue(child) {}
    })(Dispatcher);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _StateProxy = __webpack_require__(6);

var _StateProxy2 = _interopRequireDefault(_StateProxy);

var _FormEvents = __webpack_require__(3);

var _rxjs = __webpack_require__(5);

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NeverObservable = _rxjs2.default.Observable.never();

var StateInjector = function (_React$Component) {
  _inherits(StateInjector, _React$Component);

  function StateInjector(props, context) {
    _classCallCheck(this, StateInjector);

    var _this = _possibleConstructorReturn(this, (StateInjector.__proto__ || Object.getPrototypeOf(StateInjector)).call(this, props));

    _this.state = {
      value: null,
      validation: true
    };

    _this.watchPath = _this.getWatchedPath(props, context);
    if (_this.watchPath == null) {
      throw new Error("watchPath props is not set on StateInjector, you have to set a statepath string on which the StateInjector will watch");
    }
    _this.selectObs(props, context);
    return _this;
  }

  _createClass(StateInjector, [{
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
      if (typeof this.props.children !== "function") throw new Error("children of StateInjector must be a function of type (stateValue, props) => React$element");
      var watchedValidation = _typeof(this.state.validation) === "object" && this.state.validation !== null ? this.state.validation.getNestedValidation(this.watchPath) : this.state.validation;
      return this.props.children(this.state.value, this.props, {
        watchedStatePath: this.watchPath,
        watchedValidation: watchedValidation,
        validation: this.state.validation
      });
    }
  }]);

  return StateInjector;
}(_react2.default.Component);

exports.default = StateInjector;


StateInjector.propTypes = {};

StateInjector.defaultProps = {
  __debug: false
};

StateInjector.contextTypes = {
  rootValueChangeObs: _react2.default.PropTypes.any,
  completeStatePath: _react2.default.PropTypes.string
};

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FormController = __webpack_require__(9);

Object.defineProperty(exports, "FormController", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormController).default;
  }
});

var _StateDispatcher = __webpack_require__(11);

Object.defineProperty(exports, "StateDispatcher", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StateDispatcher).default;
  }
});

var _StateProxy = __webpack_require__(6);

Object.defineProperty(exports, "StateProxy", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StateProxy).default;
  }
});

var _StateInjector = __webpack_require__(12);

Object.defineProperty(exports, "StateInjector", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StateInjector).default;
  }
});

var _StateValueHelpers = __webpack_require__(1);

Object.defineProperty(exports, "getValue", {
  enumerable: true,
  get: function get() {
    return _StateValueHelpers.getValue;
  }
});

var _ValidationComposition = __webpack_require__(13);

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

var _FormModel = __webpack_require__(10);

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

var _ValidationHelpers = __webpack_require__(2);

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map