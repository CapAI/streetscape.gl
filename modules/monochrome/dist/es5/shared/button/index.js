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

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var BUTTON_TYPE = {
  NORMAL: 0,
  PRIMARY: 1,
  WARNING: 2,
  MUTED: 3
};

function getBackgroundColor(props) {
  if (props.type === BUTTON_TYPE.MUTED) {
    return props.theme.background;
  }

  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  switch (props.type) {
    case BUTTON_TYPE.PRIMARY:
      return props.isHovered ? props.theme.primary500 : props.theme.controlColorActive;

    case BUTTON_TYPE.WARNING:
      return props.isHovered ? props.theme.warning500 : props.theme.warning400;

    case BUTTON_TYPE.NORMAL:
    default:
      return props.isHovered ? props.theme.controlColorHovered : props.theme.controlColorPrimary;
  }
}

function getTextColor(props) {
  if (props.type !== BUTTON_TYPE.MUTED) {
    return props.theme.textColorInvert;
  }

  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  if (props.isHovered) {
    return props.theme.controlColorHovered;
  }

  return props.theme.controlColorPrimary;
}

var WrapperComponent = _styled["default"].button(function (props) {
  return (0, _objectSpread3["default"])({}, props.theme.__reset__, {
    outline: 'none',
    display: 'inline-block',
    boxSizing: 'border-box',
    border: 'none',
    paddingLeft: props.theme.spacingNormal,
    paddingRight: props.theme.spacingNormal,
    height: props.size,
    lineHeight: "".concat(props.size, "px"),
    textAlign: 'center',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    background: getBackgroundColor(props),
    color: getTextColor(props)
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Button = function (_PureComponent) {
  (0, _inherits2["default"])(Button, _PureComponent);

  function Button() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Button);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Button)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function () {
      _this.props.onChange(!_this.props.value);
    });
    return _this;
  }

  (0, _createClass2["default"])(Button, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          type = _this$props.type,
          className = _this$props.className,
          style = _this$props.style,
          isEnabled = _this$props.isEnabled,
          onClick = _this$props.onClick;
      var _style$size = style.size,
          size = _style$size === void 0 ? theme.controlSize + theme.spacingTiny * 2 : _style$size;
      var styleProps = {
        type: type,
        theme: theme,
        size: size,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(WrapperComponent, (0, _extends2["default"])({
        className: className,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onClick: onClick,
        userStyle: style.wrapper
      }, styleProps), this.props.children);
    }
  }]);
  return Button;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Button, "propTypes", {
  type: _propTypes["default"].oneOf(Object.values(BUTTON_TYPE)),
  onClick: _propTypes["default"].func,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Button, "defaultProps", {
  type: BUTTON_TYPE.NORMAL,
  className: '',
  style: {},
  isEnabled: true
});
var ThemedButton = (0, _theme.withTheme)(Button);
Object.assign(ThemedButton, BUTTON_TYPE);
var _default = ThemedButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map