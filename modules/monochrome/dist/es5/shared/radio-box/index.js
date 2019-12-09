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

var _radioBoxItem = _interopRequireDefault(require("./radio-box-item"));

var WrapperComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread3["default"])({}, props.theme.__reset__, {
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var RadioBox = function (_PureComponent) {
  (0, _inherits2["default"])(RadioBox, _PureComponent);

  function RadioBox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, RadioBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(RadioBox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (value) {
      _this.props.onChange(value);
    });
    return _this;
  }

  (0, _createClass2["default"])(RadioBox, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          theme = _this$props.theme,
          className = _this$props.className,
          style = _this$props.style,
          data = _this$props.data,
          value = _this$props.value,
          isEnabled = _this$props.isEnabled;
      var _style$size = style.size,
          size = _style$size === void 0 ? theme.controlSize : _style$size;
      var styleProps = {
        theme: theme,
        size: size,
        value: value,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(WrapperComponent, (0, _extends2["default"])({
        className: className
      }, styleProps, {
        userStyle: style.wrapper
      }), Object.keys(data).map(function (key) {
        return _react["default"].createElement(_radioBoxItem["default"], {
          key: key,
          label: data[key],
          theme: theme,
          size: size,
          style: style,
          isSelected: key === value,
          isEnabled: isEnabled,
          onClick: function onClick() {
            return _this2._onClick(key);
          }
        });
      }));
    }
  }]);
  return RadioBox;
}(_react.PureComponent);

(0, _defineProperty2["default"])(RadioBox, "propTypes", {
  value: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func,
  data: _propTypes["default"].object.isRequired,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(RadioBox, "defaultProps", {
  className: '',
  style: {},
  isEnabled: true,
  onChange: function onChange() {}
});

var _default = (0, _theme.withTheme)(RadioBox);

exports["default"] = _default;
//# sourceMappingURL=index.js.map