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
var DEFAULT_GET_X = function DEFAULT_GET_X(d) {
  return d.x;
};

export function findNearestValue(array, x) {
  var getX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_GET_X;
  var lowerBound = 0;
  var upperBound = array.length - 1;
  var currentIndex;
  var currentX;

  while (lowerBound <= upperBound) {
    currentIndex = (lowerBound + upperBound) / 2 | 0;
    currentX = getX(array[currentIndex]);

    if (currentX < x) {
      lowerBound = currentIndex + 1;
    } else if (currentX > x) {
      upperBound = currentIndex - 1;
    } else {
      return array[currentIndex];
    }
  }

  var lowerValue = array[lowerBound];
  var upperValue = array[upperBound];

  if (!lowerValue) {
    return upperValue;
  }

  if (!upperValue) {
    return lowerValue;
  }

  return Math.abs(getX(lowerValue) - x) <= Math.abs(getX(upperValue) - x) ? lowerValue : upperValue;
}
//# sourceMappingURL=utils.js.map