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
exports.DARK_THEME = exports.LIGHT_THEME = void 0;

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lightThemePrimitives = _interopRequireDefault(require("./light-theme-primitives"));

var _darkThemePrimitives = _interopRequireDefault(require("./dark-theme-primitives"));

var LIGHT_THEME = (0, _objectSpread4["default"])({}, _lightThemePrimitives["default"], {
  background: _lightThemePrimitives["default"].mono100,
  backgroundAlt: _lightThemePrimitives["default"].mono200,
  backgroundInvert: _lightThemePrimitives["default"].mono1000,
  controlColorPrimary: _lightThemePrimitives["default"].mono600,
  controlColorSecondary: _lightThemePrimitives["default"].mono500,
  controlColorHovered: _lightThemePrimitives["default"].mono900,
  controlColorActive: _lightThemePrimitives["default"].primary400,
  controlColorDisabled: _lightThemePrimitives["default"].mono400,
  textColorPrimary: _lightThemePrimitives["default"].mono900,
  textColorSecondary: _lightThemePrimitives["default"].mono600,
  textColorInvert: _lightThemePrimitives["default"].mono200,
  textColorDisabled: _lightThemePrimitives["default"].mono500,
  textColorWarning: _lightThemePrimitives["default"].warning400,
  textColorError: _lightThemePrimitives["default"].negative400,
  fontFamily: _lightThemePrimitives["default"].primaryFontFamily,
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: 1.5,
  transitionDuration: '300ms',
  transitionTimingFunction: 'ease',
  shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
  controlSize: 18,
  spacingTiny: 4,
  spacingSmall: 8,
  spacingNormal: 12,
  spacingLarge: 24,
  spacingHuge: 48
});
exports.LIGHT_THEME = LIGHT_THEME;
var DARK_THEME = (0, _objectSpread4["default"])({}, _darkThemePrimitives["default"], {
  background: _darkThemePrimitives["default"].mono1000,
  backgroundAlt: _darkThemePrimitives["default"].mono800,
  backgroundInvert: _darkThemePrimitives["default"].mono100,
  controlColorPrimary: _darkThemePrimitives["default"].mono400,
  controlColorSecondary: _darkThemePrimitives["default"].mono500,
  controlColorHovered: _darkThemePrimitives["default"].mono100,
  controlColorActive: _darkThemePrimitives["default"].primary300,
  controlColorDisabled: _darkThemePrimitives["default"].mono600,
  textColorPrimary: _darkThemePrimitives["default"].mono100,
  textColorSecondary: _darkThemePrimitives["default"].mono300,
  textColorInvert: _darkThemePrimitives["default"].mono800,
  textColorDisabled: _darkThemePrimitives["default"].mono500,
  textColorWarning: _darkThemePrimitives["default"].warning300,
  textColorError: _darkThemePrimitives["default"].negative300,
  fontFamily: _darkThemePrimitives["default"].primaryFontFamily,
  fontSize: 12,
  lineHeight: 1.5,
  transitionDuration: '300ms',
  transitionTimingFunction: 'ease',
  shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
  controlSize: 18,
  spacingTiny: 4,
  spacingSmall: 8,
  spacingNormal: 12,
  spacingLarge: 24,
  spacingHuge: 48
});
exports.DARK_THEME = DARK_THEME;
//# sourceMappingURL=index.js.map