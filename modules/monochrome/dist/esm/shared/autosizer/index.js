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
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import debounce from 'debounce';

var noop = function noop() {
  return null;
};

var SizeSensor = function (_Component) {
  _inherits(SizeSensor, _Component);

  function SizeSensor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SizeSensor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SizeSensor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_onResize", function (size) {
      if (_this.resize) {
        _this.resize(size);
      } else if (_this.props.onResize) {
        var _this$props = _this.props,
            onResize = _this$props.onResize,
            debounceTime = _this$props.debounceTime;
        onResize(size);
        _this.resize = debounceTime > 0 ? debounce(onResize, debounceTime) : onResize;
      }
    });

    return _this;
  }

  _createClass(SizeSensor, [{
    key: "render",
    value: function render() {
      return React.createElement(AutoSizer, {
        onResize: this._onResize
      }, this.props.children || noop);
    }
  }]);

  return SizeSensor;
}(Component);

_defineProperty(SizeSensor, "propTypes", {
  debounceTime: PropTypes.number
});

export { SizeSensor as default };
//# sourceMappingURL=index.js.map