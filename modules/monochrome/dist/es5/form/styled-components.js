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
exports.Separator = exports.Heading = exports.Title = exports.Expander = exports.Container = void 0;

var _objectSpread7 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

var Container = _styled["default"].div(function (props) {
  return (0, _objectSpread7["default"])({}, props.theme.__reset__, {}, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Container = Container;

var Expander = _styled["default"].div(function (props) {
  return (0, _objectSpread7["default"])({
    position: 'absolute',
    cursor: 'pointer',
    left: -20,
    top: 4,
    width: 16,
    height: 16,
    color: props.theme.controlColorPrimary,
    '&:hover': {
      color: props.theme.controlColorHovered
    },
    path: {
      fill: 'currentColor'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Expander = Expander;

var Title = _styled["default"].div(function (props) {
  return (0, _objectSpread7["default"])({
    marginTop: props.theme.spacingNormal,
    marginBottom: props.theme.spacingNormal,
    fontSize: props.theme.fontSize * 2,
    fontWeight: 200
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Title = Title;

var Heading = _styled["default"].div(function (props) {
  return (0, _objectSpread7["default"])({
    marginTop: props.theme.spacingNormal,
    marginBottom: props.theme.spacingNormal,
    fontSize: props.theme.fontSize * 1.2,
    fontWeight: 600
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Heading = Heading;

var Separator = _styled["default"].div(function (props) {
  return (0, _objectSpread7["default"])({
    width: '100%',
    height: 1,
    background: props.theme.controlColorSecondary
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Separator = Separator;
//# sourceMappingURL=styled-components.js.map