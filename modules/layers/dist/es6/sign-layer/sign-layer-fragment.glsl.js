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
export default "#define SHADER_NAME sign-layer-fragment-shader\n\nprecision highp float;\n\nuniform float render3D;\nuniform float opacity;\nuniform sampler2D iconsTexture;\n\nvarying vec4 vColor;\nvarying vec2 vTextureCoords;\n\nconst float MIN_ALPHA = 0.05;\n\nvoid main(void) {\n  vec4 texColor = texture2D(iconsTexture, vTextureCoords);\n\n  // front of the sign, uses pixel color from the texture\n  // back of the sign uses texture as transparency mask\n  vec3 color = render3D < 0.5 || gl_FrontFacing ? texColor.rgb : vColor.rgb;\n  float a = texColor.a * opacity;\n\n  if (a < MIN_ALPHA) {\n    discard;\n  }\n\n  gl_FragColor = vec4(color, a);\n\n  gl_FragColor = picking_filterHighlightColor(gl_FragColor);\n\n  gl_FragColor = picking_filterPickingColor(gl_FragColor);\n}\n";
//# sourceMappingURL=sign-layer-fragment.glsl.js.map