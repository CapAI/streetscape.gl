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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _index = _interopRequireDefault(require("./index"));

var _README = _interopRequireDefault(require("./README.md"));

var SAMPLE_ITEMS = new Array(10).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    className: 'sample-item',
    content: _react["default"].createElement("p", null, "ITEM ", i + 1)
  };
});
var SAMPLE_ITEMS_WITH_HEADER = new Array(8).fill(0).map(function (d, i) {
  return {
    key: "item-".concat(i),
    title: "ITEM ".concat(i + 1),
    className: 'sample-item',
    content: _react["default"].createElement("p", null, "This is the content")
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
  (0, _inherits2["default"])(DragDropListExample, _Component);

  function DragDropListExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, DragDropListExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(DragDropListExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      items: null
    });
    return _this;
  }

  (0, _createClass2["default"])(DragDropListExample, [{
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
      return _react["default"].createElement("div", {
        style: {
          width: 200,
          margin: 'auto'
        }
      }, _react["default"].createElement(_index["default"], {
        style: EXAMPLE_STYLE,
        items: items,
        canRemoveItem: (0, _addonKnobs["boolean"])('canRemoveItem', true),
        onListChange: this._onListChange.bind(this)
      }));
    }
  }]);
  return DragDropListExample;
}(_react.Component);

(0, _react2.storiesOf)('DragDropList', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Basic example', function () {
  return _react["default"].createElement(DragDropListExample, {
    items: SAMPLE_ITEMS
  });
}).add('With headers', function () {
  return _react["default"].createElement(DragDropListExample, {
    items: SAMPLE_ITEMS_WITH_HEADER
  });
});
//# sourceMappingURL=stories.js.map