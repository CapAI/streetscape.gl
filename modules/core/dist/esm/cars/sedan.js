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
import { mirrorMesh } from './utils';
export default (function () {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4.6;
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2.4;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.5;
  var indices = [0, 1, 2, 1, 3, 2, 4, 5, 6, 7, 6, 5, 8, 9, 10, 9, 11, 10, 12, 13, 14, 13, 15, 14, 16, 13, 17, 13, 12, 17, 18, 16, 19, 16, 17, 19, 20, 21, 19, 21, 18, 19, 22, 23, 20, 23, 21, 20, 24, 23, 25, 23, 22, 25, 26, 27, 25, 27, 24, 25, 28, 27, 29, 27, 26, 29, 30, 31, 32, 31, 33, 32, 34, 35, 36, 35, 34, 37, 38, 39, 40, 39, 41, 40, 42, 43, 44, 43, 45, 44, 46, 42, 47, 42, 44, 47, 48, 46, 49, 46, 47, 49, 50, 51, 49, 51, 48, 49, 52, 53, 50, 53, 51, 50, 54, 53, 55, 53, 52, 55, 56, 54, 57, 54, 55, 57, 58, 59, 57, 59, 56, 57, 60, 61, 62, 61, 63, 62, 64, 65, 66, 65, 67, 66, 68, 69, 70, 69, 71, 70, 72, 73, 74, 73, 75, 74, 76, 77, 78, 77, 79, 78, 80, 81, 82, 81, 83, 82, 84, 85, 86, 85, 87, 86, 88, 85, 89, 85, 84, 89, 90, 91, 92, 91, 93, 92, 94, 95, 96, 94, 96, 97, 98, 99, 100, 99, 101, 100, 102, 103, 104, 103, 105, 104, 106, 107, 108, 107, 109, 108, 110, 111, 112, 111, 113, 112, 114, 115, 116, 117, 118, 119, 120, 119, 118, 117, 119, 121, 118, 117, 122, 123, 124, 125, 126, 116, 124, 127, 128, 129, 129, 130, 131, 132, 117, 133, 132, 133, 131, 117, 121, 133, 130, 132, 131, 129, 134, 127, 127, 115, 135, 129, 131, 134, 136, 129, 128, 137, 138, 139, 138, 137, 140, 124, 123, 126, 123, 125, 141, 142, 143, 144, 140, 142, 138, 144, 138, 142, 136, 128, 145, 126, 114, 116, 135, 115, 114, 135, 146, 128, 135, 128, 127, 146, 147, 128, 147, 148, 139, 148, 137, 139, 146, 148, 147, 149, 150, 151, 151, 152, 149, 153, 154, 155, 155, 156, 153, 157, 158, 159, 160, 161, 162, 163, 164, 165, 165, 166, 163, 167, 168, 169, 169, 170, 167, 171, 172, 173, 174, 175, 176, 177, 178, 179, 179, 180, 177, 181, 182, 183, 182, 181, 184, 183, 185, 181, 186, 187, 188, 188, 189, 186, 190, 191, 192, 191, 190, 193, 192, 194, 190, 195, 196, 197, 197, 198, 195, 199, 200, 201, 201, 202, 199, 203, 204, 205, 206, 205, 204, 207, 203, 205, 205, 206, 208, 205, 208, 207, 209, 210, 211, 211, 212, 209, 213, 214, 215, 213, 216, 217, 214, 213, 218, 219, 220, 214, 214, 221, 219, 222, 221, 214, 223, 213, 217, 213, 224, 225, 225, 218, 213, 218, 226, 214, 227, 222, 214, 228, 227, 214, 214, 226, 228, 213, 223, 224, 229, 230, 231, 229, 232, 233, 231, 234, 229, 235, 231, 236, 231, 235, 237, 238, 231, 237, 239, 232, 229, 229, 240, 241, 240, 229, 234, 234, 231, 242, 243, 231, 238, 244, 231, 243, 231, 244, 242, 229, 241, 239, 245, 246, 247, 247, 248, 245, 249, 250, 246, 246, 245, 249, 251, 252, 250, 250, 249, 251, 253, 254, 252, 252, 251, 253, 255, 256, 254, 254, 253, 255, 257, 258, 256, 256, 255, 257, 259, 260, 258, 258, 257, 259, 261, 262, 260, 260, 259, 261, 263, 264, 262, 262, 261, 263, 265, 266, 264, 264, 263, 265, 267, 268, 266, 266, 265, 267, 269, 270, 268, 268, 267, 269, 271, 272, 270, 270, 269, 271, 273, 274, 272, 272, 271, 273, 275, 276, 274, 274, 273, 275, 277, 278, 276, 276, 275, 277, 279, 280, 281, 279, 282, 283, 279, 284, 285, 285, 286, 280, 279, 285, 280, 287, 285, 288, 283, 289, 279, 284, 279, 289, 284, 290, 285, 285, 290, 291, 288, 285, 292, 292, 285, 291, 291, 290, 293, 294, 289, 283, 295, 296, 297, 295, 298, 299, 295, 300, 301, 300, 297, 302, 295, 297, 300, 303, 304, 300, 298, 295, 305, 301, 305, 295, 301, 300, 306, 300, 307, 306, 304, 308, 300, 308, 307, 300, 307, 309, 306, 310, 298, 305, 311, 312, 313, 313, 314, 311, 315, 316, 312, 312, 311, 315, 317, 318, 316, 316, 315, 317, 319, 320, 318, 318, 317, 319, 321, 322, 320, 320, 319, 321, 323, 324, 322, 322, 321, 323, 325, 326, 324, 324, 323, 325, 327, 328, 326, 326, 325, 327, 329, 330, 328, 328, 327, 329, 331, 332, 330, 330, 329, 331, 333, 334, 332, 332, 331, 333, 335, 336, 334, 334, 333, 335, 337, 338, 336, 336, 335, 337, 339, 340, 338, 338, 337, 339, 341, 342, 340, 340, 339, 341, 343, 344, 342, 342, 341, 343];
  var positions = [-1.93, 0, 0.17, -2, 0, 0.47, -1.93, 0.62, 0.17, -2, 0.65, 0.47, -1.71, 0.69, 0.17, -1.71, 0, 0.17, -1.93, 0.62, 0.17, -1.93, 0, 0.17, -1.66, 0.69, 0.34, -1.66, 0, 0.34, -1.71, 0.69, 0.17, -1.71, 0, 0.17, -1.63, 0.69, 0.49, -1.63, 0, 0.49, -1.66, 0.69, 0.34, -1.66, 0, 0.34, -1.54, 0, 0.63, -1.54, 0.69, 0.63, -1.4, 0, 0.72, -1.4, 0.69, 0.72, -1.25, 0.69, 0.75, -1.25, 0, 0.75, -1.11, 0.69, 0.72, -1.11, 0, 0.72, -0.97, 0, 0.63, -0.97, 0.69, 0.63, -0.88, 0.69, 0.49, -0.88, 0, 0.49, -0.85, 0, 0.34, -0.85, 0.69, 0.34, -0.89, 0.69, 0.17, -0.89, 0, 0.17, -0.85, 0.69, 0.34, -0.85, 0, 0.34, -0.89, 0, 0.17, 0.54, 0.69, 0.17, 0.54, 0, 0.17, -0.89, 0.69, 0.17, 0.54, 0.69, 0.34, 0.54, 0, 0.34, 0.54, 0.69, 0.17, 0.54, 0, 0.17, 0.56, 0, 0.49, 0.54, 0, 0.34, 0.56, 0.69, 0.49, 0.54, 0.69, 0.34, 0.65, 0, 0.63, 0.65, 0.69, 0.63, 0.79, 0, 0.72, 0.79, 0.69, 0.72, 0.94, 0.69, 0.75, 0.94, 0, 0.75, 1.09, 0.69, 0.72, 1.09, 0, 0.72, 1.22, 0, 0.63, 1.22, 0.69, 0.63, 1.31, 0, 0.49, 1.31, 0.69, 0.49, 1.34, 0.69, 0.34, 1.34, 0, 0.34, 1.32, 0.69, 0.17, 1.32, 0, 0.17, 1.34, 0.69, 0.34, 1.34, 0, 0.34, 1.91, 0, 0.17, 1.32, 0, 0.17, 1.91, 0.61, 0.17, 1.32, 0.69, 0.17, 2, 0.65, 0.43, 2, 0, 0.43, 1.91, 0.61, 0.17, 1.91, 0, 0.17, 1.98, 0.65, 0.47, 1.98, 0, 0.47, 2, 0.65, 0.43, 2, 0, 0.43, 1.98, 0, 0.71, 1.98, 0, 0.47, 1.98, 0.65, 0.71, 1.98, 0.65, 0.47, 1.9, 0.65, 0.84, 1.9, 0, 0.84, 1.98, 0.65, 0.71, 1.98, 0, 0.71, 1.51, 0.69, 0.91, 1.51, 0, 0.91, 1.9, 0.65, 0.84, 1.9, 0, 0.84, 1.12, 0, 0.97, 1.12, 0.69, 0.97, 0.21, 0, 1.5, 1.12, 0, 0.97, 0.21, 0.49, 1.5, 1.12, 0.69, 0.97, -0.88, 0.49, 1.5, -0.88, 0, 1.5, 0.21, 0, 1.5, 0.21, 0.49, 1.5, -1.34, 0.66, 1.08, -1.34, 0, 1.08, -0.88, 0.49, 1.5, -0.88, 0, 1.5, -1.92, 0, 0.99, -1.34, 0, 1.08, -1.92, 0.65, 0.99, -1.34, 0.66, 1.08, -1.99, 0, 0.72, -1.92, 0, 0.99, -1.99, 0.65, 0.72, -1.92, 0.65, 0.99, -2, 0.65, 0.47, -2, 0, 0.47, -1.99, 0.65, 0.72, -1.99, 0, 0.72, -0.97, 0.69, 0.63, 0.65, 0.69, 0.63, 0.56, 0.69, 0.49, 1.98, 0.65, 0.47, 1.91, 0.61, 0.17, 1.34, 0.69, 0.34, 1.32, 0.69, 0.17, 1.31, 0.69, 0.49, 2, 0.65, 0.43, -0.85, 0.69, 0.34, 0.54, 0.69, 0.34, 0.54, 0.69, 0.17, -0.88, 0.69, 0.49, 0.79, 0.69, 0.72, -1.34, 0.66, 1.08, 1.12, 0.69, 0.97, 1.9, 0.65, 0.84, 1.09, 0.69, 0.72, 1.98, 0.65, 0.71, 1.22, 0.69, 0.63, 0.94, 0.69, 0.75, -1.11, 0.69, 0.72, 0.21, 0.49, 1.5, -1.54, 0.69, 0.63, -2, 0.65, 0.47, -1.99, 0.65, 0.72, -1.63, 0.69, 0.49, -0.89, 0.69, 0.17, -1.66, 0.69, 0.34, -1.71, 0.69, 0.17, -1.93, 0.62, 0.17, -0.88, 0.49, 1.5, -1.25, 0.69, 0.75, -1.92, 0.65, 0.99, -1.4, 0.69, 0.72, 0.46, 1, 0.99, 0.46, 0.73, 0.99, 0.46, 0.76, 0.92, 0.46, 0.88, 0.92, 0.46, 1, 0.99, 0.46, 0.88, 1.06, 0.46, 0.76, 1.06, 0.46, 0.73, 0.99, 0.46, 0.73, 0.99, 0.53, 0.8, 0.93, 0.46, 0.76, 0.92, 0.46, 0.88, 0.92, 0.46, 0.76, 0.92, 0.53, 0.8, 0.93, 0.46, 1, 0.99, 0.46, 0.88, 0.92, 0.53, 0.8, 0.93, 0.6, 0.89, 0.99, 0.46, 1, 0.99, 0.6, 0.89, 0.99, 0.53, 0.8, 1.04, 0.46, 0.88, 1.06, 0.46, 0.88, 1.06, 0.53, 0.8, 1.04, 0.46, 0.76, 1.06, 0.46, 0.73, 0.99, 0.46, 0.76, 1.06, 0.53, 0.8, 1.04, 0.5, 0.7, 0.99, 0.56, 0.7, 0.96, 0.53, 0.8, 0.93, 0.46, 0.73, 0.99, 0.54, 0.64, 0.97, 0.56, 0.7, 0.96, 0.5, 0.7, 0.99, 0.57, 0.64, 0.96, 0.51, 0.64, 0.99, 0.63, 0.7, 0.99, 0.6, 0.89, 0.99, 0.53, 0.8, 0.93, 0.56, 0.7, 0.96, 0.6, 0.64, 0.97, 0.63, 0.7, 0.99, 0.56, 0.7, 0.96, 0.64, 0.64, 0.99, 0.57, 0.64, 0.96, 0.56, 0.7, 1.02, 0.63, 0.7, 0.99, 0.64, 0.64, 0.99, 0.57, 0.64, 1.02, 0.63, 0.7, 0.99, 0.56, 0.7, 1.02, 0.53, 0.8, 1.04, 0.6, 0.89, 0.99, 0.5, 0.7, 0.99, 0.56, 0.7, 1.02, 0.53, 0.67, 1, 0.57, 0.64, 1.02, 0.51, 0.64, 0.99, 0.54, 0.64, 1, 0.5, 0.7, 0.99, 0.46, 0.73, 0.99, 0.53, 0.8, 1.04, 0.56, 0.7, 1.02, -1.57, 0.71, 0.47, -1.57, 0.71, 0.22, -1.6, 0.71, 0.35, -1.49, 0.71, 0.59, -1.38, 0.71, 0.66, -0.93, 0.71, 0.47, -1.38, 0.71, 0.02, -1.5, 0.71, 0.1, -1.26, 0.71, 0, -1.13, 0.71, 0.02, -1.25, 0.71, 0.69, -1.13, 0.71, 0.66, -1.01, 0.71, 0.58, -0.91, 0.71, 0.34, -1.01, 0.71, 0.1, -0.94, 0.71, 0.21, -1.57, 0.36, 0.47, -1.6, 0.36, 0.35, -1.57, 0.36, 0.22, -1.38, 0.36, 0.66, -1.49, 0.36, 0.59, -0.93, 0.36, 0.47, -1.38, 0.36, 0.02, -1.5, 0.36, 0.1, -1.26, 0.36, 0, -1.13, 0.36, 0.02, -1.25, 0.36, 0.69, -1.01, 0.36, 0.58, -1.13, 0.36, 0.66, -0.91, 0.36, 0.34, -1.01, 0.36, 0.1, -0.94, 0.36, 0.21, -0.94, 0.36, 0.21, -0.94, 0.71, 0.21, -0.91, 0.71, 0.34, -0.91, 0.36, 0.34, -1.01, 0.36, 0.1, -1.01, 0.71, 0.1, -1.13, 0.36, 0.02, -1.13, 0.71, 0.02, -1.26, 0.36, 0, -1.26, 0.71, 0, -1.38, 0.36, 0.02, -1.38, 0.71, 0.02, -1.5, 0.36, 0.1, -1.5, 0.71, 0.1, -1.57, 0.36, 0.22, -1.57, 0.71, 0.22, -1.6, 0.36, 0.35, -1.6, 0.71, 0.35, -1.57, 0.36, 0.47, -1.57, 0.71, 0.47, -1.49, 0.36, 0.59, -1.49, 0.71, 0.59, -1.38, 0.36, 0.66, -1.38, 0.71, 0.66, -1.25, 0.36, 0.69, -1.25, 0.71, 0.69, -1.13, 0.36, 0.66, -1.13, 0.71, 0.66, -1.01, 0.36, 0.58, -1.01, 0.71, 0.58, -0.93, 0.36, 0.47, -0.93, 0.71, 0.47, -0.91, 0.36, 0.34, -0.91, 0.71, 0.34, 0.62, 0.71, 0.47, 0.62, 0.71, 0.22, 0.59, 0.71, 0.35, 0.7, 0.71, 0.59, 0.81, 0.71, 0.66, 1.18, 0.71, 0.58, 0.81, 0.71, 0.02, 0.69, 0.71, 0.1, 0.93, 0.71, 0, 1.06, 0.71, 0.02, 1.07, 0.71, 0.66, 1.26, 0.71, 0.47, 1.26, 0.71, 0.21, 1.18, 0.71, 0.1, 1.28, 0.71, 0.34, 0.94, 0.71, 0.69, 0.62, 0.36, 0.47, 0.59, 0.36, 0.35, 0.62, 0.36, 0.22, 0.81, 0.36, 0.66, 0.7, 0.36, 0.59, 0.81, 0.36, 0.02, 1.18, 0.36, 0.58, 0.69, 0.36, 0.1, 0.93, 0.36, 0, 1.06, 0.36, 0.02, 1.07, 0.36, 0.66, 1.26, 0.36, 0.47, 1.26, 0.36, 0.21, 1.18, 0.36, 0.1, 1.28, 0.36, 0.34, 0.94, 0.36, 0.69, 1.26, 0.36, 0.21, 1.26, 0.71, 0.21, 1.28, 0.71, 0.34, 1.28, 0.36, 0.34, 1.18, 0.36, 0.1, 1.18, 0.71, 0.1, 1.06, 0.36, 0.02, 1.06, 0.71, 0.02, 0.93, 0.36, 0, 0.93, 0.71, 0, 0.81, 0.36, 0.02, 0.81, 0.71, 0.02, 0.69, 0.36, 0.1, 0.69, 0.71, 0.1, 0.62, 0.36, 0.22, 0.62, 0.71, 0.22, 0.59, 0.36, 0.35, 0.59, 0.71, 0.35, 0.62, 0.36, 0.47, 0.62, 0.71, 0.47, 0.7, 0.36, 0.59, 0.7, 0.71, 0.59, 0.81, 0.36, 0.66, 0.81, 0.71, 0.66, 0.94, 0.36, 0.69, 0.94, 0.71, 0.69, 1.07, 0.36, 0.66, 1.07, 0.71, 0.66, 1.18, 0.36, 0.58, 1.18, 0.71, 0.58, 1.26, 0.36, 0.47, 1.26, 0.71, 0.47, 1.28, 0.36, 0.34, 1.28, 0.71, 0.34];
  var normals = [-0.98, 0, -0.22, -0.98, 0, -0.2, -0.98, 0, -0.22, -0.98, 0.01, -0.18, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0.96, 0, -0.28, 0.96, 0, -0.28, 0.96, 0, -0.28, 0.96, 0, -0.28, 0.93, 0, -0.37, 0.93, 0, -0.37, 1, 0, 0, 1, 0, 0, 0.71, 0, -0.71, 0.71, 0, -0.71, 0.37, 0, -0.93, 0.37, 0, -0.93, 0, 0, -1, 0, 0, -1, -0.37, 0, -0.93, -0.37, 0, -0.93, -0.71, 0, -0.71, -0.71, 0, -0.71, -0.93, 0, -0.37, -0.93, 0, -0.37, -1, 0, 0, -1, 0, 0, -0.97, 0, 0.23, -0.97, 0, 0.23, -0.97, 0, 0.23, -0.97, 0, 0.23, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0.93, 0, -0.37, 1, 0, 0, 0.93, 0, -0.37, 1, 0, 0, 0.71, 0, -0.71, 0.71, 0, -0.71, 0.37, 0, -0.93, 0.37, 0, -0.93, 0, 0, -1, 0, 0, -1, -0.37, 0, -0.93, -0.37, 0, -0.93, -0.71, 0, -0.71, -0.71, 0, -0.71, -0.93, 0, -0.37, -0.93, 0, -0.37, -1, 0, 0, -1, 0, 0, -0.99, 0, 0.13, -0.99, 0, 0.13, -0.99, 0, 0.13, -0.99, 0, 0.13, 0.01, 0, -1, 0, 0, -1, 0.01, 0, -1, 0, 0, -1, 0.94, 0, -0.33, 0.94, 0, -0.33, 0.94, 0, -0.33, 0.94, 0, -0.33, 0.89, 0, 0.45, 0.89, 0, 0.45, 0.89, 0, 0.45, 0.89, 0, 0.45, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0.83, 0, 0.56, 0.83, 0, 0.56, 0.83, 0, 0.56, 0.83, 0, 0.56, 0.17, 0, 0.98, 0.17, 0, 0.98, 0.17, 0, 0.98, 0.17, 0, 0.98, 0.17, 0, 0.98, 0.17, 0, 0.98, 0.5, 0, 0.87, 0.5, 0, 0.87, 0.5, 0, 0.87, 0.5, 0, 0.87, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, -0.67, 0, 0.75, -0.67, 0, 0.75, -0.66, 0.01, 0.76, -0.66, 0, 0.75, -0.17, 0, 0.99, -0.17, 0, 0.99, -0.17, 0, 0.99, -0.17, 0, 0.99, -0.99, -0.01, 0.16, -0.99, -0.01, 0.16, -1, -0.03, 0.07, -0.97, 0, 0.25, -1, 0, 0.03, -1, 0, 0.03, -1, 0, 0.03, -1, 0, 0.03, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0.02, 1, -0.04, 0.08, 0.99, -0.1, 0.07, 1, -0.04, 0, 1, 0, 0.06, 1, 0.03, -0.18, 0.98, -0.09, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0.02, 0, 0.99, 0.17, 0.01, 1, 0.07, 0.05, 1, 0.01, 0.03, 1, 0.02, 0.05, 1, 0.03, 0.05, 1, 0.04, 0, 1, 0, 0, 1, 0.04, 0, 0.93, 0.37, -0.09, 0.99, 0.06, -0.11, 0.99, 0.02, -0.07, 1, 0.04, -0.11, 0.99, 0.05, 0, 1, 0, -0.19, 0.98, -0.01, 0, 1, 0, -0.23, 0.97, -0.02, 0, 0.92, 0.38, -0.01, 1, 0.09, -0.05, 1, 0.03, -0.05, 1, 0.08, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -0.54, 0.77, 0.35, -0.54, 0.77, 0.35, -0.54, 0.77, 0.35, -0.16, 0, 0.99, -0.16, 0, 0.99, -0.16, 0, 0.99, -0.34, -0.45, 0.82, -0.55, -0.4, 0.73, -0.39, -0.23, 0.89, -0.26, -0.35, 0.9, -0.34, -0.45, -0.82, -0.26, -0.35, -0.9, -0.39, -0.23, -0.89, -0.55, -0.4, -0.73, -0.16, 0, -0.99, -0.16, 0, -0.99, -0.16, 0, -0.99, -0.54, 0.77, -0.35, -0.54, 0.77, -0.35, -0.54, 0.77, -0.35, 0.37, 0.62, 0.69, 0.45, 0.34, 0.83, 0.35, 0.32, 0.88, 0.25, 0.42, 0.87, 0.48, 0.04, 0.88, 0.48, 0.04, 0.88, 0.48, 0.04, 0.88, 0.48, 0.04, 0.88, 0.48, 0.04, 0.88, -0.43, -0.06, 0.9, -0.52, -0.07, 0.85, -0.56, -0.02, 0.83, -0.43, 0.05, 0.9, -0.43, -0.04, 0.9, -0.43, -0.04, 0.9, -0.43, -0.04, 0.9, -0.43, -0.04, 0.9, -0.43, -0.04, 0.9, -0.43, -0.04, -0.9, -0.43, -0.04, -0.9, -0.43, -0.04, -0.9, -0.43, -0.04, -0.9, -0.43, -0.06, -0.9, -0.43, 0.05, -0.9, -0.56, -0.02, -0.83, -0.52, -0.07, -0.85, 0.48, 0.04, -0.88, 0.48, 0.04, -0.88, 0.48, 0.04, -0.88, 0.48, 0.04, -0.88, 0.48, 0.04, -0.88, 0.48, 0.04, -0.88, 0.37, 0.62, -0.69, 0.25, 0.42, -0.87, 0.35, 0.32, -0.88, 0.45, 0.34, -0.83, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0.93, 0, -0.37, 0.93, 0, -0.37, 1, 0, -0.01, 1, 0, -0.01, 0.7, 0, -0.71, 0.7, 0, -0.71, 0.36, 0, -0.93, 0.36, 0, -0.93, -0.01, 0, -1, -0.01, 0, -1, -0.37, 0, -0.93, -0.37, 0, -0.93, -0.71, 0, -0.7, -0.71, 0, -0.7, -0.93, 0, -0.36, -0.93, 0, -0.36, -1, 0, 0.01, -1, 0, 0.01, -0.93, 0, 0.37, -0.93, 0, 0.37, -0.7, 0, 0.71, -0.7, 0, 0.71, -0.36, 0, 0.93, -0.36, 0, 0.93, 0.01, 0, 1, 0.01, 0, 1, 0.37, 0, 0.93, 0.37, 0, 0.93, 0.71, 0, 0.7, 0.71, 0, 0.7, 0.93, 0, 0.36, 0.93, 0, 0.36, 1, 0, -0.01, 1, 0, -0.01, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0.93, 0, -0.37, 0.93, 0, -0.37, 1, 0, -0.01, 1, 0, -0.01, 0.7, 0, -0.71, 0.7, 0, -0.71, 0.36, 0, -0.93, 0.36, 0, -0.93, -0.01, 0, -1, -0.01, 0, -1, -0.37, 0, -0.93, -0.37, 0, -0.93, -0.71, 0, -0.7, -0.71, 0, -0.7, -0.93, 0, -0.36, -0.93, 0, -0.36, -1, 0, 0.01, -1, 0, 0.01, -0.93, 0, 0.37, -0.93, 0, 0.37, -0.7, 0, 0.71, -0.7, 0, 0.71, -0.36, 0, 0.93, -0.36, 0, 0.93, 0.01, 0, 1, 0.01, 0, 1, 0.37, 0, 0.93, 0.37, 0, 0.93, 0.71, 0, 0.7, 0.71, 0, 0.7, 0.93, 0, 0.36, 0.93, 0, 0.36, 1, 0, -0.01, 1, 0, -0.01];
  var meshSize = [4, 2, 1.5];
  var halfDeltaX = (length - meshSize[0]) / 2;
  var halfDeltaY = (width - meshSize[1]) / 2;
  var deltaZ = height - meshSize[2];
  var vertexSize = positions.length;

  for (var i = 0; i < vertexSize; i += 3) {
    var x = positions[i];
    var y = positions[i + 1];
    var z = positions[i + 2];
    positions[i] = x + Math.sign(x) * halfDeltaX;
    positions[i + 1] = y > 0 ? y + halfDeltaY : 0;
    positions[i + 2] = z > 1.2 ? z + deltaZ : z;
  }

  return mirrorMesh({
    indices: indices,
    positions: positions,
    normals: normals
  });
});
//# sourceMappingURL=sedan.js.map