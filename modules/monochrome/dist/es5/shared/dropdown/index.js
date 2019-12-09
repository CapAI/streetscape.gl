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

var _icons = require("../icons");

function getControlColor(props) {
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    return props.theme.controlColorActive;
  } else if (props.isHovered) {
    return props.theme.controlColorHovered;
  }

  return props.theme.controlColorPrimary;
}

var WrapperComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({}, props.theme.__reset__, {
    pointerEvents: props.isEnabled ? 'all' : 'none'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var DropdownBorder = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
    position: 'relative',
    width: '100%',
    height: props.height,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: getControlColor(props)
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var DropdownInput = _styled["default"].select(function (props) {
  return (0, _objectSpread6["default"])({
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    lineHeight: "".concat(props.height, "px"),
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    appearance: 'none',
    background: props.theme.background,
    border: 'none',
    outline: 0,
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingLarge
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var DropdownIcon = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: getControlColor(props),
    padding: props.theme.spacingSmall,
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: '16px',
    path: {
      fill: 'currentColor'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Dropdown = function (_PureComponent) {
  (0, _inherits2["default"])(Dropdown, _PureComponent);

  function Dropdown() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Dropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Dropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (event) {
      var onChange = _this.props.onChange;
      onChange(event.target.value);
    });
    return _this;
  }

  (0, _createClass2["default"])(Dropdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          className = _this$props.className,
          data = _this$props.data,
          value = _this$props.value,
          isEnabled = _this$props.isEnabled;
      var _style$height = style.height,
          height = _style$height === void 0 ? theme.controlSize + theme.spacingTiny * 2 : _style$height;
      var styleProps = {
        theme: theme,
        height: height,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(WrapperComponent, (0, _extends2["default"])({
        className: className,
        userStyle: style.wrapper
      }, styleProps), _react["default"].createElement(DropdownBorder, (0, _extends2["default"])({
        userStyle: style.border
      }, styleProps, {
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave
      }), _react["default"].createElement(DropdownInput, (0, _extends2["default"])({
        userStyle: style.select
      }, styleProps, {
        tabIndex: isEnabled ? 0 : -1,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onChange: this._onChange,
        value: value
      }), Object.keys(data).map(function (key) {
        return _react["default"].createElement("option", {
          key: key,
          value: key
        }, data[key]);
      })), _react["default"].createElement(DropdownIcon, (0, _extends2["default"])({
        userStyle: style.icon
      }, styleProps), style.iconArrow || _react["default"].createElement(_icons.DropdownIcon, null))));
    }
  }]);
  return Dropdown;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Dropdown, "propTypes", {
  value: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func,
  data: _propTypes["default"].object.isRequired,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Dropdown, "defaultProps", {
  className: '',
  style: {},
  isEnabled: true,
  onChange: function onChange() {}
});

var _default = (0, _theme.withTheme)(Dropdown);

exports["default"] = _default;
//# sourceMappingURL=index.js.map