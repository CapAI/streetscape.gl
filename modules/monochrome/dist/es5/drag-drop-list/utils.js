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
exports.overlap = overlap;
exports.offsetRect = offsetRect;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function overlap(rect1, rect2) {
  var overlapX = Math.min(rect1.right - rect2.left, rect2.right - rect1.left);
  var overlapY = Math.min(rect1.bottom - rect2.top, rect2.bottom - rect1.top);

  if (overlapX < 0 || overlapY < 0) {
    return 0;
  }

  return overlapX * overlapY;
}

function offsetRect(rect, _ref) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      _ref2$ = _ref2[0],
      dx = _ref2$ === void 0 ? 0 : _ref2$,
      _ref2$2 = _ref2[1],
      dy = _ref2$2 === void 0 ? 0 : _ref2$2;

  return {
    left: rect.left + dx,
    top: rect.top + dy,
    right: rect.right + dx,
    bottom: rect.bottom + dy,
    width: rect.width,
    height: rect.height
  };
}
//# sourceMappingURL=utils.js.map