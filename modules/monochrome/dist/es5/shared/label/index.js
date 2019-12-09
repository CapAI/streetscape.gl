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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var _icons = require("../icons");

var _popover = require("../popover");

var LabelComponent = _styled["default"].label(function (props) {
  return (0, _objectSpread4["default"])({}, props.theme.__reset__, {
    display: 'flex',
    alignItems: 'center',
    cursor: 'inherit',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    '>*': {
      marginLeft: props.theme.spacingNormal
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var LabelInfo = _styled["default"].div(function (props) {
  return (0, _objectSpread4["default"])({
    display: 'inline-block',
    color: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    cursor: 'default',
    verticalAlign: 'middle',
    width: 16,
    height: 16,
    lineHeight: '16px',
    textAlign: 'center',
    path: {
      fill: 'currentColor'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Label = function (_PureComponent) {
  (0, _inherits2["default"])(Label, _PureComponent);

  function Label() {
    (0, _classCallCheck2["default"])(this, Label);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Label).apply(this, arguments));
  }

  (0, _createClass2["default"])(Label, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          isEnabled = _this$props.isEnabled,
          htmlFor = _this$props["for"],
          style = _this$props.style,
          children = _this$props.children,
          tooltip = _this$props.tooltip,
          badge = _this$props.badge;
      var labelProps = {};

      if (htmlFor) {
        labelProps.htmlFor = htmlFor;
      }

      var styleProps = {
        theme: theme,
        isEnabled: isEnabled
      };
      return _react["default"].createElement(LabelComponent, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.label
      }), children, tooltip && _react["default"].createElement(_popover.Tooltip, {
        style: style.tooltip,
        content: tooltip
      }, _react["default"].createElement(LabelInfo, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.tooltipTarget
      }), style.iconInfo || _react["default"].createElement(_icons.InfoIcon, null))), badge);
    }
  }]);
  return Label;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Label, "propTypes", {
  "for": _propTypes["default"].string,
  style: _propTypes["default"].object,
  tooltip: _propTypes["default"].string,
  badge: _propTypes["default"].element,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Label, "defaultProps", {
  style: {},
  isEnabled: true
});

var _default = (0, _theme.withTheme)(Label);

exports["default"] = _default;
//# sourceMappingURL=index.js.map