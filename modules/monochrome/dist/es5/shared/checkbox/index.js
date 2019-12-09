// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var _icons = require("../icons");

var CHECKBOX_STATE = {
  OFF: 'off',
  INDETERMINATE: 'indeterminate',
  ON: 'on'
};

var CheckBoxComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread5["default"])({}, props.theme.__reset__, {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var CheckBoxBorder = _styled["default"].div(function (props) {
  var color = props.theme.controlColorPrimary;

  if (!props.isEnabled) {
    color = props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    color = props.theme.controlColorActive;
  } else if (props.isHovered) {
    color = props.theme.controlColorHovered;
  }

  return (0, _objectSpread5["default"])({
    outline: 'none',
    display: 'inline-block',
    position: 'relative',
    width: props.size,
    height: props.size,
    flexGrow: 0,
    flexShrink: 0,
    marginRight: props.theme.spacingSmall,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: color,
    color: color
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var CheckBoxIcon = _styled["default"].div(function (props) {
  return (0, _objectSpread5["default"])({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: '16px',
    path: {
      fill: 'currentColor'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var CheckBox = function (_PureComponent) {
  (0, _inherits2["default"])(CheckBox, _PureComponent);

  function CheckBox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, CheckBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(CheckBox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      hasFocus: false,
      isHovered: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseEnter", function () {
      return _this.setState({
        isHovered: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseLeave", function () {
      return _this.setState({
        isHovered: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFocus", function () {
      return _this.setState({
        hasFocus: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBlur", function () {
      return _this.setState({
        hasFocus: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onKeyDown", function (evt) {
      if (evt.keyCode === 32) {
        _this._onClick(evt);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (event) {
      _this.props.onChange(_this.props.value === CHECKBOX_STATE.ON ? CHECKBOX_STATE.OFF : CHECKBOX_STATE.ON);
    });
    return _this;
  }

  (0, _createClass2["default"])(CheckBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          style = _this$props.style,
          className = _this$props.className,
          theme = _this$props.theme,
          label = _this$props.label,
          isEnabled = _this$props.isEnabled;
      var _style$size = style.size,
          size = _style$size === void 0 ? theme.controlSize : _style$size;
      var styleProps = {
        theme: theme,
        value: value,
        size: size,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(CheckBoxComponent, (0, _extends2["default"])({
        className: className,
        userStyle: style.wrapper
      }, styleProps, {
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onClick: this._onClick
      }), _react["default"].createElement(CheckBoxBorder, (0, _extends2["default"])({
        userStyle: style.border
      }, styleProps, {
        tabIndex: isEnabled ? 0 : -1,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown
      }), _react["default"].createElement(CheckBoxIcon, (0, _extends2["default"])({
        userStyle: style.icon
      }, styleProps), value === CHECKBOX_STATE.ON && (style.iconOn || _react["default"].createElement(_icons.CheckIcon, null)), value === CHECKBOX_STATE.OFF && style.iconOff, value === CHECKBOX_STATE.INDETERMINATE && (style.iconIndeterminate || _react["default"].createElement(_icons.IndeterminateIcon, null)))), label);
    }
  }]);
  return CheckBox;
}(_react.PureComponent);

(0, _defineProperty2["default"])(CheckBox, "propTypes", {
  value: _propTypes["default"].oneOf([CHECKBOX_STATE.OFF, CHECKBOX_STATE.INDETERMINATE, CHECKBOX_STATE.ON]).isRequired,
  onChange: _propTypes["default"].func,
  className: _propTypes["default"].string,
  label: _propTypes["default"].node,
  style: _propTypes["default"].object,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(CheckBox, "defaultProps", {
  className: '',
  value: CHECKBOX_STATE.OFF,
  label: '',
  style: {},
  isEnabled: true,
  onChange: function onChange() {}
});
var ThemedCheckBox = (0, _theme.withTheme)(CheckBox);
Object.assign(ThemedCheckBox, CHECKBOX_STATE);
var _default = ThemedCheckBox;
exports["default"] = _default;
//# sourceMappingURL=index.js.map