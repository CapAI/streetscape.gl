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
exports.formatTimeCode = formatTimeCode;
exports.getTimelineTicks = getTimelineTicks;

function formatTimeCode(value) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{hh}:{mm}:{ss}.{SSS}';
  var formatters = {
    h: (format.match(/\{(h+)\}/) || [])[1],
    m: (format.match(/\{(m+)\}/) || [])[1],
    s: (format.match(/\{(s+)\}/) || [])[1],
    S: (format.match(/\{(S+)\}/) || [])[1]
  };
  var parts = {
    h: function h(x) {
      return Math.floor(x / 3600);
    },
    m: function m(x) {
      return Math.floor(x / 60) % 60;
    },
    s: function s(x) {
      return Math.floor(x % 60);
    },
    S: function S(x, len) {
      return Math.floor(x % 1 * Math.pow(10, len));
    }
  };
  var result = format;

  for (var key in parts) {
    var f = formatters[key] || '';

    if (f) {
      var digits = f.length;
      result = result.replace("{".concat(f, "}"), String(parts[key](value, digits)).padStart(digits, '0'));
    }
  }

  return result;
}

function getTimelineTicks(scale) {
  var spacing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var format = arguments.length > 2 ? arguments[2] : undefined;
  var range = scale.range();
  var domain = scale.domain();
  var ticksCount = Math.floor((range[1] - range[0]) / spacing) + 1;
  scale.domain([0, domain[1] - domain[0]]);
  var ticks = scale.ticks(ticksCount);
  scale.domain(domain);
  return ticks.map(function (t) {
    return {
      x: scale(t + domain[0]),
      label: format(t + domain[0])
    };
  });
}
//# sourceMappingURL=utils.js.map