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
exports.ListItemPlaceholder = exports.ListItemTitle = exports.ListItemContainer = exports.ListContainer = void 0;

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

var ListContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread5["default"])({}, props.theme.__reset__, {
    userSelect: 'none'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListContainer = ListContainer;

var ListItemContainer = _styled["default"].div(function (props) {
  var style = props.isActive ? {
    boxSizing: 'border-box',
    position: 'fixed',
    zIndex: 999,
    transitionProperty: 'all',
    transitionTimingFunction: props.theme.transitionTimingFunction,
    transitionDuration: props.isDragging ? 0 : props.theme.transitionDuration,
    boxShadow: props.theme.shadow
  } : {};
  return Object.assign(style, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListItemContainer = ListItemContainer;

var ListItemTitle = _styled["default"].div(function (props) {
  return (0, _objectSpread5["default"])({}, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListItemTitle = ListItemTitle;

var ListItemPlaceholder = _styled["default"].div(function (props) {
  return (0, _objectSpread5["default"])({
    boxSizing: 'border-box',
    transitionProperty: 'height',
    transitionTimingFunction: props.theme.transitionTimingFunction,
    transitionDuration: props.theme.transitionDuration,
    borderStyle: 'dotted',
    borderColor: props.theme.controlColorPrimary,
    borderWidth: 2
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ListItemPlaceholder = ListItemPlaceholder;
//# sourceMappingURL=styled-components.js.map