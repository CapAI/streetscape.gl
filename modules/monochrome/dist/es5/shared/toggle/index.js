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

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var WrapperComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({}, props.theme.__reset__, {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var ToggleComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
    outline: 'none',
    position: 'relative',
    height: props.knobSize,
    width: props.knobSize * 2,
    flexShrink: 0
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var ToggleTrack = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: 2,
    background: props.isEnabled ? props.value ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    top: '50%',
    transform: 'translateY(-50%)'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var ToggleKnob = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
    boxSizing: 'border-box',
    position: 'absolute',
    width: props.knobSize,
    height: props.knobSize,
    background: props.theme.background,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: props.isEnabled ? props.isHovered ? props.theme.controlColorHovered : props.hasFocus ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    borderRadius: '50%',
    left: props.value ? "calc(100% - ".concat(props.knobSize, "px)") : 0,
    transitionProperty: 'left',
    transitionDuration: props.theme.transitionDuration,
    transitionTimingFunction: props.theme.transitionTimingFunction
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Toggle = function (_PureComponent) {
  (0, _inherits2["default"])(Toggle, _PureComponent);

  function Toggle() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Toggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Toggle)).call.apply(_getPrototypeOf2, [this].concat(args)));
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
        _this.props.onChange(!_this.props.value);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function () {
      _this.props.onChange(!_this.props.value);
    });
    return _this;
  }

  (0, _createClass2["default"])(Toggle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          className = _this$props.className,
          style = _this$props.style,
          value = _this$props.value,
          label = _this$props.label,
          isEnabled = _this$props.isEnabled;
      var _style$knobSize = style.knobSize,
          knobSize = _style$knobSize === void 0 ? theme.controlSize : _style$knobSize;
      var styleProps = {
        theme: theme,
        knobSize: knobSize,
        value: value,
        isHovered: this.state.isHovered,
        hasFocus: this.state.hasFocus,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(WrapperComponent, (0, _extends2["default"])({
        className: className,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onClick: this._onClick,
        userStyle: style.wrapper
      }, styleProps), label, _react["default"].createElement(ToggleComponent, (0, _extends2["default"])({
        userStyle: style.toggle
      }, styleProps, {
        tabIndex: isEnabled ? 0 : -1,
        onKeyDown: this._onKeyDown,
        onFocus: this._onFocus,
        onBlur: this._onBlur
      }), _react["default"].createElement(ToggleTrack, (0, _extends2["default"])({
        userStyle: style.track
      }, styleProps)), _react["default"].createElement(ToggleKnob, (0, _extends2["default"])({
        userStyle: style.knob
      }, styleProps))));
    }
  }]);
  return Toggle;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Toggle, "propTypes", {
  value: _propTypes["default"].bool.isRequired,
  onChange: _propTypes["default"].func,
  className: _propTypes["default"].string,
  label: _propTypes["default"].node,
  style: _propTypes["default"].object,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Toggle, "defaultProps", {
  className: '',
  value: true,
  style: {},
  isEnabled: true,
  onChange: function onChange() {}
});

var _default = (0, _theme.withTheme)(Toggle);

exports["default"] = _default;
//# sourceMappingURL=index.js.map