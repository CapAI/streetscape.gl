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
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import GL from '@luma.gl/constants';
import { Geometry } from '@luma.gl/core';
export default class GridGeometry extends Geometry {
  constructor(_ref = {}) {
    let {
      id = uid('grid-geometry'),
      uCount = 1,
      vCount = 1,
      drawMode = GL.TRIANGLES
    } = _ref,
        opts = _objectWithoutProperties(_ref, ["id", "uCount", "vCount", "drawMode"]);

    super(Object.assign({}, opts, {
      id,
      drawMode,
      attributes: {
        indices: calculateIndices({
          uCount,
          vCount
        }),
        texCoords: calculateTexCoords({
          uCount,
          vCount
        })
      }
    }));
  }

}
const uidCounters = {};

function uid(id = 'id') {
  uidCounters[id] = uidCounters[id] || 1;
  const count = uidCounters[id]++;
  return "".concat(id, "-").concat(count);
}

function calculateIndices({
  uCount,
  vCount
}) {
  const indicesCount = uCount * vCount * 2 * 3;
  const indices = new Uint32Array(indicesCount);
  let i = 0;

  for (let uIndex = 0; uIndex < uCount; uIndex++) {
    for (let vIndex = 0; vIndex < vCount; vIndex++) {
      const i0 = vIndex * (uCount + 1) + uIndex;
      const i1 = i0 + 1;
      const i2 = i0 + uCount + 1;
      const i3 = i2 + 1;
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

function calculateTexCoords({
  uCount,
  vCount
}) {
  const texCoords = new Float32Array((uCount + 1) * (vCount + 1) * 2);
  let i = 0;

  for (let vIndex = 0; vIndex <= vCount; vIndex++) {
    for (let uIndex = 0; uIndex <= uCount; uIndex++) {
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