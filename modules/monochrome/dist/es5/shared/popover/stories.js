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

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = require("./index");

(0, _react2.storiesOf)('Building Blocks', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Popover', function () {
  return _react["default"].createElement(_index.Popover, {
    content: function content() {
      return _react["default"].createElement("div", {
        style: {
          padding: '10px'
        }
      }, _react["default"].createElement("div", null, _react["default"].createElement("button", null, "One fish")), _react["default"].createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, _react["default"].createElement("button", null, "Two fish")), _react["default"].createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, _react["default"].createElement("button", null, "Red fish")), _react["default"].createElement("div", {
        style: {
          marginTop: '5px'
        }
      }, _react["default"].createElement("button", null, "Blue fish")));
    }
  }, _react["default"].createElement("button", null, "Click for popover"));
}).add('Tooltip', function () {
  return _react["default"].createElement("div", {
    style: {
      fontFamily: 'Helvetica, sans-serif',
      margin: 100,
      fontSize: 13
    }
  }, _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.RIGHT,
    content: "Tooltip"
  }, "Right")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.BOTTOM,
    content: "Tooltip"
  }, "Bottom")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.LEFT,
    content: "Tooltip"
  }, "Left")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.TOP,
    content: "Tooltip"
  }, "Top")), _react["default"].createElement("p", null, _react["default"].createElement(_index.Tooltip, {
    position: _index.Popover.RIGHT,
    arrowPosition: _index.Popover.BOTTOM,
    content: function content() {
      return _react["default"].createElement("span", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt et enim vel pellentesque. Aliquam nisl est, dapibus et leo sit amet, venenatis placerat sem.");
    }
  }, _react["default"].createElement("span", null, "Custom positioning"))));
});
//# sourceMappingURL=stories.js.map