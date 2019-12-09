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
import { boolean as _boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import FloatPanel from './index';
import { AutoSizer } from '../shared';

var FloatPanelExample = function (_Component) {
  _inherits(FloatPanelExample, _Component);

  function FloatPanelExample() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FloatPanelExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FloatPanelExample)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      x: 0,
      y: 0,
      size: 200,
      minimized: false
    });

    _defineProperty(_assertThisInitialized(_this), "_onUpdatePanel", function (_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          minimized = _ref.minimized;
      width = Math.min(400, Math.max(50, width));

      _this.setState({
        x: x,
        y: y,
        minimized: minimized,
        size: width
      });
    });

    return _this;
  }

  _createClass(FloatPanelExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y,
          size = _this$state.size,
          minimized = _this$state.minimized;
      return React.createElement("div", {
        style: {
          height: '100vh'
        }
      }, React.createElement(AutoSizer, null, function (_ref2) {
        var width = _ref2.width,
            height = _ref2.height;
        return React.createElement(FloatPanel, {
          title: 'My Photo',
          parentWidth: width,
          parentHeight: height,
          x: x,
          y: y,
          width: size,
          height: size,
          minimized: minimized,
          movable: _boolean('movable', true),
          resizable: _boolean('resizable', true),
          minimizable: _boolean('minimizable', true),
          onUpdate: _this2._onUpdatePanel
        }, React.createElement("img", {
          src: "https://avatars2.githubusercontent.com/u/2059298?v=3&s=460",
          width: "100%"
        }));
      }));
    }
  }]);

  return FloatPanelExample;
}(Component);

storiesOf('FloatPanel', module).addDecorator(withReadme(README)).add('Basic example', function () {
  return React.createElement(FloatPanelExample, null);
});
//# sourceMappingURL=stories.js.map