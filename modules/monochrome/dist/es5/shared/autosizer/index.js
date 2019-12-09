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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _debounce = _interopRequireDefault(require("debounce"));

var noop = function noop() {
  return null;
};

var SizeSensor = function (_Component) {
  (0, _inherits2["default"])(SizeSensor, _Component);

  function SizeSensor() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, SizeSensor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(SizeSensor)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResize", function (size) {
      if (_this.resize) {
        _this.resize(size);
      } else if (_this.props.onResize) {
        var _this$props = _this.props,
            onResize = _this$props.onResize,
            debounceTime = _this$props.debounceTime;
        onResize(size);
        _this.resize = debounceTime > 0 ? (0, _debounce["default"])(onResize, debounceTime) : onResize;
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(SizeSensor, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(_AutoSizer["default"], {
        onResize: this._onResize
      }, this.props.children || noop);
    }
  }]);
  return SizeSensor;
}(_react.Component);

exports["default"] = SizeSensor;
(0, _defineProperty2["default"])(SizeSensor, "propTypes", {
  debounceTime: _propTypes["default"].number
});
//# sourceMappingURL=index.js.map