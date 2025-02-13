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
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _constants = _interopRequireDefault(require("@luma.gl/constants"));

var _core = require("@luma.gl/core");

var GridGeometry = function (_Geometry) {
  (0, _inherits2["default"])(GridGeometry, _Geometry);

  function GridGeometry() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$id = _ref.id,
        id = _ref$id === void 0 ? uid('grid-geometry') : _ref$id,
        _ref$uCount = _ref.uCount,
        uCount = _ref$uCount === void 0 ? 1 : _ref$uCount,
        _ref$vCount = _ref.vCount,
        vCount = _ref$vCount === void 0 ? 1 : _ref$vCount,
        _ref$drawMode = _ref.drawMode,
        drawMode = _ref$drawMode === void 0 ? _constants["default"].TRIANGLES : _ref$drawMode,
        opts = (0, _objectWithoutProperties2["default"])(_ref, ["id", "uCount", "vCount", "drawMode"]);

    (0, _classCallCheck2["default"])(this, GridGeometry);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GridGeometry).call(this, Object.assign({}, opts, {
      id: id,
      drawMode: drawMode,
      attributes: {
        indices: calculateIndices({
          uCount: uCount,
          vCount: vCount
        }),
        texCoords: calculateTexCoords({
          uCount: uCount,
          vCount: vCount
        })
      }
    })));
  }

  return GridGeometry;
}(_core.Geometry);

exports["default"] = GridGeometry;
var uidCounters = {};

function uid() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id';
  uidCounters[id] = uidCounters[id] || 1;
  var count = uidCounters[id]++;
  return "".concat(id, "-").concat(count);
}

function calculateIndices(_ref2) {
  var uCount = _ref2.uCount,
      vCount = _ref2.vCount;
  var indicesCount = uCount * vCount * 2 * 3;
  var indices = new Uint32Array(indicesCount);
  var i = 0;

  for (var uIndex = 0; uIndex < uCount; uIndex++) {
    for (var vIndex = 0; vIndex < vCount; vIndex++) {
      var i0 = vIndex * (uCount + 1) + uIndex;
      var i1 = i0 + 1;
      var i2 = i0 + uCount + 1;
      var i3 = i2 + 1;
      indices[i++] = i0;
      indices[i++] = i2;
      indices[i++] = i1;
      indices[i++] = i1;
      indices[i++] = i2;
      indices[i++] = i3;
    }
  }

  return indices;
}

function calculateTexCoords(_ref3) {
  var uCount = _ref3.uCount,
      vCount = _ref3.vCount;
  var texCoords = new Float32Array((uCount + 1) * (vCount + 1) * 2);
  var i = 0;

  for (var vIndex = 0; vIndex <= vCount; vIndex++) {
    for (var uIndex = 0; uIndex <= uCount; uIndex++) {
      texCoords[i++] = uIndex / uCount;
      texCoords[i++] = vIndex / vCount;
    }
  }

  return {
    value: texCoords,
    size: 2
  };
}
//# sourceMappingURL=grid-geometry.js.map