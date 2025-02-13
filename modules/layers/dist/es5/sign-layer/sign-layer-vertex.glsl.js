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
exports["default"] = void 0;
var _default = "#define SHADER_NAME sign-layer-vertex-shader\n\nattribute vec3 positions;\n\nattribute vec3 instancePositions;\nattribute vec2 instancePositions64xyLow;\nattribute float instanceAngles;\nattribute float instanceSizes;\nattribute vec4 instanceColors;\nattribute vec3 instancePickingColors;\nattribute vec4 instanceIconFrames;\nattribute float instanceColorModes;\nattribute vec2 instanceOffsets;\n\nuniform float sizeScale;\nuniform vec2 iconsTextureDim;\nuniform float render3D;\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\n\nvoid main(void) {\n  // rotation\n  float angle = instanceAngles + PI / 2.0;\n  mat2 rotationMatrix = mat2(\n    cos(angle), sin(angle),\n    -sin(angle), cos(angle)\n  );\n\n  vec2 iconSize = instanceIconFrames.zw;\n  vec2 texCoords = positions.xy;\n  vec2 vertex_offset = (texCoords / 2.0 + instanceOffsets / iconSize) * sizeScale * instanceSizes;\n  vec3 vertex = vec3(\n    vertex_offset.x,\n    vertex_offset.y * (render3D - 1.0),\n    -vertex_offset.y * render3D\n  );\n\n  vec3 offset = project_size(vec3(rotationMatrix * vertex.xy, vertex.z));\n  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64xyLow, offset);\n\n  vTextureCoords = mix(\n    instanceIconFrames.xy,\n    instanceIconFrames.xy + iconSize,\n    (texCoords + 1.0) / 2.0\n  ) / iconsTextureDim;\n\n  vTextureCoords.y = 1.0 - vTextureCoords.y;\n\n  vColor = instanceColors;\n\n  picking_setPickingColor(instancePickingColors);\n}\n";
exports["default"] = _default;
//# sourceMappingURL=sign-layer-vertex.glsl.js.map