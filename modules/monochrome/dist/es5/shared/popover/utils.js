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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.getOppositePosition = getOppositePosition;
exports.generateTriangleStyles = generateTriangleStyles;
exports.nodeHasParent = nodeHasParent;
exports.positionsToPopperPlacement = positionsToPopperPlacement;

var _popover = require("./popover");

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function getOppositePosition(side) {
  switch (side) {
    case _popover.POSITIONS.TOP:
      return _popover.POSITIONS.BOTTOM;

    case _popover.POSITIONS.RIGHT:
      return _popover.POSITIONS.LEFT;

    case _popover.POSITIONS.BOTTOM:
      return _popover.POSITIONS.TOP;

    case _popover.POSITIONS.LEFT:
      return _popover.POSITIONS.RIGHT;

    default:
      return _popover.POSITIONS.BOTTOM;
  }
}

function generateTriangleStyles(position, size) {
  var positions = [_popover.POSITIONS.TOP, _popover.POSITIONS.RIGHT, _popover.POSITIONS.BOTTOM, _popover.POSITIONS.LEFT];
  var oppositePosition = getOppositePosition(position);
  var style = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid'
  };

  for (var _i = 0, _positions = positions; _i < _positions.length; _i++) {
    var p = _positions[_i];
    var key = capitalize(p);
    var width = p === oppositePosition ? 0 : size;
    var color = p === position ? undefined : 'transparent';
    style["border".concat(key, "Width")] = width;
    style["border".concat(key, "Color")] = color;
  }

  return style;
}

function nodeHasParent(current, possibleParent) {
  if (current === possibleParent) {
    return true;
  }

  while (current.parentNode) {
    if (current === possibleParent) {
      return true;
    }

    current = current.parentNode;
  }

  return false;
}

function positionsToPopperPlacement(position, arrowPosition) {
  var placement = position || _popover.POSITIONS.AUTO;

  if (arrowPosition === _popover.POSITIONS.LEFT || arrowPosition === _popover.POSITIONS.TOP) {
    placement = "".concat(placement, "-start");
  }

  if (arrowPosition === _popover.POSITIONS.RIGHT || arrowPosition === _popover.POSITIONS.BOTTOM) {
    placement = "".concat(placement, "-end");
  }

  return placement;
}
//# sourceMappingURL=utils.js.map