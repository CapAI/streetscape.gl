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

var RadioItem = _styled["default"].div(function (props) {
  return (0, _objectSpread5["default"])({
    outline: 'none',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: props.theme.spacingTiny,
    marginBottom: props.theme.spacingTiny
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var RadioButton = _styled["default"].div(function (props) {
  var color = props.theme.controlColorPrimary;

  if (!props.isEnabled) {
    color = props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    color = props.theme.controlColorActive;
  } else if (props.isHovered) {
    color = props.theme.controlColorHovered;
  }

  return (0, _objectSpread5["default"])({
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '50%',
    width: props.size,
    height: props.size,
    marginLeft: props.theme.spacingSmall,
    background: props.theme.background,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: color,
    color: color,
    flexShrink: 0
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var RadioIcon = _styled["default"].div(function (props) {
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

var RadioBoxItem = function (_PureComponent) {
  (0, _inherits2["default"])(RadioBoxItem, _PureComponent);

  function RadioBoxItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, RadioBoxItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(RadioBoxItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
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
        _this.props.onClick(evt);
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(RadioBoxItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          size = _this$props.size,
          isSelected = _this$props.isSelected,
          label = _this$props.label,
          isEnabled = _this$props.isEnabled;
      var styleProps = {
        theme: theme,
        size: size,
        isSelected: isSelected,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(RadioItem, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.item,
        tabIndex: isEnabled ? 0 : -1,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown,
        onClick: this.props.onClick
      }), label, _react["default"].createElement(RadioButton, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.button
      }), _react["default"].createElement(RadioIcon, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.icon
      }), isSelected ? style.iconSelected || '●' : null)));
    }
  }]);
  return RadioBoxItem;
}(_react.PureComponent);

exports["default"] = RadioBoxItem;
(0, _defineProperty2["default"])(RadioBoxItem, "propTypes", {
  onClick: _propTypes["default"].func,
  label: _propTypes["default"].string,
  style: _propTypes["default"].object,
  isEnabled: _propTypes["default"].bool,
  isSelected: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(RadioBoxItem, "defaultProps", {
  style: {},
  isEnabled: true,
  onClick: function onClick() {}
});
//# sourceMappingURL=radio-box-item.js.map