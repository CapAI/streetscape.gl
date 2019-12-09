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
exports.BufferComponent = exports.MarkerComponent = exports.MarkersContainer = exports.TickLabel = exports.Tick = exports.TicksContainer = exports.Timestamp = exports.PlayPauseButton = exports.ControlsContainer = exports.WrapperComponent = void 0;

var _objectSpread12 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

var WrapperComponent = _styled["default"].div(function (props) {
  var result = (0, _objectSpread12["default"])({}, props.theme.__reset__, {
    boxSizing: 'border-box'
  });

  if (props.isPlaying) {
    result.div = {
      transitionDuration: '0s !important'
    };
  }

  return Object.assign(result, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.WrapperComponent = WrapperComponent;

var ControlsContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    display: 'flex',
    alignItems: 'center',
    marginTop: props.theme.spacingTiny
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.ControlsContainer = ControlsContainer;

var PlayPauseButton = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    width: 16,
    height: 16,
    marginLeft: props.compact ? 0 : -8,
    marginRight: props.theme.spacingSmall,
    cursor: 'pointer',
    color: props.theme.controlColorPrimary,
    '&:hover': {
      color: props.theme.controlColorHovered
    },
    path: {
      fill: 'currentColor'
    }
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.PlayPauseButton = PlayPauseButton;

var Timestamp = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({}, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Timestamp = Timestamp;

var TicksContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    position: 'relative',
    height: 20
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TicksContainer = TicksContainer;

var Tick = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    height: 4,
    bottom: 0,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: props.theme.controlColorSecondary
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.Tick = Tick;

var TickLabel = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    transform: 'translate(-50%, -18px)'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.TickLabel = TickLabel;

var MarkersContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    position: 'relative',
    height: 3
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.MarkersContainer = MarkersContainer;

var MarkerComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    height: '100%'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.MarkerComponent = MarkerComponent;

var BufferComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread12["default"])({
    height: '100%',
    background: props.theme.controlColorHovered
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

exports.BufferComponent = BufferComponent;
//# sourceMappingURL=styled-components.js.map