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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var XVIZContainer = function (_PureComponent) {
  (0, _inherits2["default"])(XVIZContainer, _PureComponent);

  function XVIZContainer() {
    (0, _classCallCheck2["default"])(this, XVIZContainer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(XVIZContainer).apply(this, arguments));
  }

  (0, _createClass2["default"])(XVIZContainer, [{
    key: "render",
    value: function render() {
      var layout = this.props.layout;
      var layoutStyle = {
        display: 'flex',
        width: '100%'
      };
      var childStyle = {};

      switch (layout.toUpperCase()) {
        case 'VERTICAL':
          layoutStyle.flexDirection = 'column';
          childStyle.flex = '0 0 auto';
          break;

        case 'HORIZONTAL':
          layoutStyle.flexDirection = 'row';
          childStyle.flex = '1 1 auto';
          break;

        default:
          return null;
      }

      return _react["default"].createElement("div", {
        className: "xviz-container",
        style: layoutStyle
      }, _react["default"].Children.map(this.props.children, function (child) {
        return _react["default"].createElement("div", {
          style: childStyle
        }, child);
      }));
    }
  }]);
  return XVIZContainer;
}(_react.PureComponent);

exports["default"] = XVIZContainer;
(0, _defineProperty2["default"])(XVIZContainer, "propTypes", {
  layout: _propTypes["default"].string
});
(0, _defineProperty2["default"])(XVIZContainer, "defaultProps", {
  layout: 'VERTICAL'
});
//# sourceMappingURL=xviz-container.js.map