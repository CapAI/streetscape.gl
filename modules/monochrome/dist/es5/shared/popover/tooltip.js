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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _theme = require("../theme");

var _popover = _interopRequireDefault(require("./popover"));

var Tooltip = function (_React$Component) {
  (0, _inherits2["default"])(Tooltip, _React$Component);

  function Tooltip() {
    (0, _classCallCheck2["default"])(this, Tooltip);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Tooltip).apply(this, arguments));
  }

  (0, _createClass2["default"])(Tooltip, [{
    key: "render",
    value: function render() {
      var style = this.props.style;
      var tooltipStyle = (0, _objectSpread4["default"])({}, style, {
        body: function body(props) {
          return (0, _objectSpread4["default"])({
            maxWidth: 300,
            paddingTop: props.theme.spacingSmall,
            paddingBottom: props.theme.spacingSmall,
            paddingLeft: props.theme.spacingNormal,
            paddingRight: props.theme.spacingNormal
          }, (0, _theme.evaluateStyle)(style.body, props));
        }
      });
      return _react["default"].createElement(_popover["default"], (0, _extends2["default"])({}, this.props, {
        style: tooltipStyle,
        trigger: _popover["default"].HOVER
      }));
    }
  }]);
  return Tooltip;
}(_react["default"].Component);

(0, _defineProperty2["default"])(Tooltip, "propTypes", _popover["default"].propTypes);
(0, _defineProperty2["default"])(Tooltip, "defaultProps", {
  style: {},
  position: _popover["default"].AUTO
});
var _default = Tooltip;
exports["default"] = _default;
//# sourceMappingURL=tooltip.js.map