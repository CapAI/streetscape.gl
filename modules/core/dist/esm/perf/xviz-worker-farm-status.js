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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React from 'react';
import { STYLES } from './constants';
export var XVIZWorkerFarmStatus = function XVIZWorkerFarmStatus(_ref) {
  var backlog = _ref.backlog,
      dropped = _ref.dropped,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return React.createElement("div", {
    style: _objectSpread2({}, STYLES.WORKER_FARM.CONTAINER, {}, style.container)
  }, React.createElement("h3", {
    style: _objectSpread2({}, STYLES.WORKER_FARM.TITLE, {}, style.title)
  }, "XVIZ Worker Farm"), React.createElement("div", null, "Queue backlog: ".concat(backlog)), React.createElement("div", null, "Dropped: ".concat(dropped)));
};
//# sourceMappingURL=xviz-worker-farm-status.js.map