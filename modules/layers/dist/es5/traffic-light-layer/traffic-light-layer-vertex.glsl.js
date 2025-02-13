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
var _default = "#define SHADER_NAME traffic-light-layer-vs\n\nuniform vec3 modelScale;\nuniform vec3 modelTranslate;\nuniform bool useInstanceColor;\nuniform float opacity;\n\n// Primitive attributes\nattribute vec3 positions;\nattribute vec3 normals;\nattribute vec2 texCoords;\n\n// Instance attributes\nattribute vec3 instancePositions;\nattribute vec2 instancePositions64xyLow;\nattribute float instanceAngles;\nattribute float instanceShapes;\nattribute vec3 instanceColors;\nattribute float instanceStates;\nattribute vec3 instancePickingColors;\n\n// Outputs to fragment shader\nvarying vec4 vColor;\nvarying vec2 vTexCoord;\n\n// Used for geometry that does not have color\nconst vec4 defaultColor = vec4(0.05, 0.05, 0.05, 1.0);\n\nvoid main(void) {\n  float angle = instanceAngles + PI;\n  mat2 rotationMatrix = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));\n\n  vec3 offset = (positions + modelTranslate) * modelScale;\n  offset.xy = rotationMatrix * offset.xy;\n  offset = project_size(offset);\n  vec3 normal_commonspace = project_normal(vec3(rotationMatrix * normals.xy, normals.z));\n\n  vec4 position_commonpace;\n  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64xyLow, offset, position_commonpace);\n\n  if (useInstanceColor) {\n    float ownLight = instanceStates;\n    vColor = vec4(instanceColors.rgb * ownLight / 255.0, opacity);\n  } else {\n    vColor = vec4(defaultColor.rgb, defaultColor.a * opacity);\n  }\n  vColor.rgb = lighting_getLightColor(vColor.rgb, project_uCameraPosition, position_commonpace.xyz, normal_commonspace);\n\n  vTexCoord = vec2((1.0 - texCoords.y + instanceShapes) / 4.0, texCoords.x);\n\n  picking_setPickingColor(instancePickingColors);\n}\n";
exports["default"] = _default;
//# sourceMappingURL=traffic-light-layer-vertex.glsl.js.map