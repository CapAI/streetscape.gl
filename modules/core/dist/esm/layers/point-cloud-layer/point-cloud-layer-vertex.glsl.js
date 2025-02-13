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
export default "#define SHADER_NAME point-cloud-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec4 instanceColors;\nattribute vec3 instancePositions;\nattribute vec2 instancePositions64xyLow;\nattribute vec3 instancePickingColors;\n\nuniform float opacity;\nuniform float radiusPixels;\nuniform float colorMode;\nuniform vec2 colorDomain;\nuniform mat4 vehicleDistanceTransform;\n\nvarying vec4 vColor;\nvarying vec2 unitPosition;\n\nconst float COLOR_MODE_INLINE = 0.0;\nconst float COLOR_MODE_Z = 1.0;\nconst float COLOR_MODE_DISTANCE = 2.0;\nconst float ONE_THIRD = 1.0 / 3.0;\nconst float TWO_THIRD = 2.0 / 3.0;\nconst float ONE_SIXTH = 1.0 / 6.0;\n\n// http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB\n// s = 1.0, l = 0.5\nfloat hue(float t) {\n  t = t + step(t, 0.0) - step(1.0, t);\n  if (t < ONE_SIXTH) return 6.0 * t;\n  if (t < 0.5) return 1.0;\n  if (t < TWO_THIRD) return 4.0 - t * 6.0;\n  return 0.0;\n}\n\nvec3 distToRgb(float dist) {\n  float h = (dist - colorDomain.x) / (colorDomain.y - colorDomain.x);\n  h = clamp(h, 0.0, 1.0);\n  h = mix(0.5, 0.0, h);\n\n  return vec3(\n    hue(h + ONE_THIRD),\n    hue(h),\n    hue(h - ONE_THIRD)\n  );\n}\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n\n  // position on the containing square in [-1, 1] space\n  unitPosition = positions.xy;\n  geometry.uv = unitPosition;\n\n  // Find the center of the point and add the current vertex\n  vec3 offset = vec3(positions.xy * radiusPixels, 0.0);\n  DECKGL_FILTER_SIZE(offset, geometry);\n\n  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64xyLow, vec3(0.), geometry.position);\n  gl_Position.xy += project_pixel_size_to_clipspace(offset.xy) * project_uFocalDistance;\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  vec4 colorPosition;\n  if (colorMode == COLOR_MODE_DISTANCE) {\n    colorPosition = vehicleDistanceTransform * vec4(instancePositions, 1.0);\n    vColor = vec4(distToRgb(length(colorPosition.xyz)), opacity);\n  } else if (colorMode == COLOR_MODE_Z) {\n    colorPosition = project_uModelMatrix * vec4(instancePositions, 1.0);\n    vColor = vec4(distToRgb(colorPosition.z), opacity);\n  } else {\n    vColor = vec4(instanceColors.rgb, instanceColors.a * opacity);\n  }\n\n  // Set color to be rendered to picking fbo (also used to check for selection highlight).\n  DECKGL_FILTER_COLOR(vColor, geometry);\n\n  picking_setPickingColor(instancePickingColors);\n}\n";
//# sourceMappingURL=point-cloud-layer-vertex.glsl.js.map