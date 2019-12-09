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

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _core = require("@emotion/core");

var _theme = require("../theme");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var spin = (0, _core.keyframes)(_templateObject());

var PreLoader = _styled["default"].div(function (props) {
  return (0, _objectSpread3["default"])({
    width: props.size,
    height: props.size,
    marginLeft: -props.size / 2,
    marginTop: props.theme.spacingNormal,
    marginBottom: props.theme.spacingNormal,
    left: '50%',
    borderRadius: '50%',
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: props.theme.controlColorActive,
    clipPath: 'polygon(50% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
    animation: "".concat(spin, " 1s ease infinite")
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Spinner = function (_PureComponent) {
  (0, _inherits2["default"])(Spinner, _PureComponent);

  function Spinner() {
    (0, _classCallCheck2["default"])(this, Spinner);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Spinner).apply(this, arguments));
  }

  (0, _createClass2["default"])(Spinner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var _style$size = style.size,
          size = _style$size === void 0 ? 32 : _style$size;
      return _react["default"].createElement(PreLoader, {
        size: size,
        theme: theme,
        userStyle: style
      });
    }
  }]);
  return Spinner;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Spinner, "propTypes", {
  style: _propTypes["default"].object
});
(0, _defineProperty2["default"])(Spinner, "defaultProps", {
  style: {}
});

var _default = (0, _theme.withTheme)(Spinner);

exports["default"] = _default;
//# sourceMappingURL=index.js.map