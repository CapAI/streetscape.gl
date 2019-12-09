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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _spinner = _interopRequireDefault(require("../shared/spinner"));

var _popover = require("../shared/popover");

var _theme = require("../shared/theme");

var _styledComponents = require("./styled-components");

var MetricCard = function (_PureComponent) {
  (0, _inherits2["default"])(MetricCard, _PureComponent);

  function MetricCard() {
    (0, _classCallCheck2["default"])(this, MetricCard);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MetricCard).apply(this, arguments));
  }

  (0, _createClass2["default"])(MetricCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          error = _this$props.error,
          isLoading = _this$props.isLoading,
          className = _this$props.className,
          title = _this$props.title,
          description = _this$props.description;
      var styleProps = {
        theme: theme,
        hasError: Boolean(error),
        isLoading: isLoading
      };
      return _react["default"].createElement(_styledComponents.CardContainer, (0, _extends2["default"])({
        className: className
      }, styleProps, {
        userStyle: style.wrapper
      }), title && _react["default"].createElement(_styledComponents.CardTitle, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.title
      }), _react["default"].createElement(_popover.Tooltip, {
        style: style.tooltip,
        content: description
      }, title)), !isLoading && !error && this.props.children, isLoading && _react["default"].createElement(_spinner["default"], {
        style: style.spinner
      }), error && _react["default"].createElement(_styledComponents.ErrorMessage, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.error
      }), error));
    }
  }]);
  return MetricCard;
}(_react.PureComponent);

(0, _defineProperty2["default"])(MetricCard, "propTypes", {
  className: _propTypes["default"].string,
  title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  description: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  style: _propTypes["default"].object,
  error: _propTypes["default"].string,
  isLoading: _propTypes["default"].bool,
  children: _propTypes["default"].element
});
(0, _defineProperty2["default"])(MetricCard, "defaultProps", {
  className: '',
  title: '',
  description: '',
  style: {},
  error: null,
  isLoading: false
});

var _default = (0, _theme.withTheme)(MetricCard);

exports["default"] = _default;
//# sourceMappingURL=metric-card.js.map