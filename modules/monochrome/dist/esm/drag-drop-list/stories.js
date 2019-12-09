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
import DragDropList from './index';
import README from './README.md';
var SAMPLE_ITEMS = new Array(10).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    className: 'sample-item',
    content: React.createElement("p", null, "ITEM ", i + 1)
  };
});
var SAMPLE_ITEMS_WITH_HEADER = new Array(8).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    title: "ITEM ".concat(i + 1),
    className: 'sample-item',
    content: React.createElement("p", null, "This is the content")
  };
});
var EXAMPLE_STYLE = {
  item: {
    padding: 12,
    border: '1px solid #fff',
    background: '#f8f8f8'
  },
  title: {
    padding: '4px 12px',
    margin: '-12px -12px 12px -12px',
    background: '#ccc',
    color: '#fff'
  }
};

var DragDropListExample = function (_Component) {
  _inherits(DragDropListExample, _Component);

  function DragDropListExample() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DragDropListExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DragDropListExample)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      items: null
    });

    return _this;
  }

  _createClass(DragDropListExample, [{
    key: "_onListChange",
    value: function _onListChange(_ref) {
      var items = _ref.items;
      this.setState({
        items: items
      });
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.state.items || this.props.items;
      return React.createElement("div", {
        style: {
          width: 200,
          margin: 'auto'
        }
      }, React.createElement(DragDropList, {
        style: EXAMPLE_STYLE,
        items: items,
        canRemoveItem: _boolean('canRemoveItem', true),
        onListChange: this._onListChange.bind(this)
      }));
    }
  }]);

  return DragDropListExample;
}(Component);

storiesOf('DragDropList', module).addDecorator(withReadme(README)).add('Basic example', function () {
  return React.createElement(DragDropListExample, {
    items: SAMPLE_ITEMS
  });
}).add('With headers', function () {
  return React.createElement(DragDropListExample, {
    items: SAMPLE_ITEMS_WITH_HEADER
  });
});
//# sourceMappingURL=stories.js.map