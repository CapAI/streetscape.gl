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
exports.Expander = exports.TableCell = exports.TableRowComponent = exports.SortIcon = exports.HeaderCell = exports.HeaderContainer = exports.TableBody = exports.WrapperComponent = void 0;

var _objectSpread10 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

var WrapperComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({}, props.theme.__reset__, {
    display: 'flex',
    flexDirection: 'column'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.WrapperComponent = WrapperComponent;

var TableBody = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({
    flex: '1 1 auto'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TableBody = TableBody;

var HeaderContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({
    display: 'table',
    flex: '0 0 auto'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.HeaderContainer = HeaderContainer;

var HeaderCell = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({
    cursor: 'pointer',
    display: 'table-cell',
    position: 'relative',
    fontWeight: 'bold',
    background: props.isAscending || props.isDescending ? props.theme.controlColorActive : props.theme.controlColorPrimary,
    color: props.theme.textColorInvert,
    paddingTop: props.theme.spacingTiny,
    paddingBottom: props.theme.spacingTiny,
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingSmall,
    '&:hover': {
      background: props.theme.controlColorHovered
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.HeaderCell = HeaderCell;

var SortIcon = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({
    position: 'absolute',
    right: props.theme.spacingTiny,
    bottom: props.theme.spacingTiny
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.SortIcon = SortIcon;

var TableRowComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: props.theme.controlColorSecondary
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TableRowComponent = TableRowComponent;

var TableCell = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({
    flex: '0 0 auto',
    overflow: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
    paddingTop: props.theme.spacingTiny,
    paddingBottom: props.theme.spacingTiny,
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingSmall,
    borderLeftStyle: 'solid',
    borderLeftWidth: props.index === 0 ? 0 : 1,
    borderLeftColor: props.theme.controlColorSecondary
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TableCell = TableCell;

var Expander = _styled["default"].div(function (props) {
  return (0, _objectSpread10["default"])({
    position: 'absolute',
    cursor: 'pointer',
    left: -props.theme.spacingSmall
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Expander = Expander;
//# sourceMappingURL=styled-components.js.map