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
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React from 'react';
import { STYLES } from './constants';

var ActivityTag = function ActivityTag(_ref) {
  var isActive = _ref.isActive,
      style = _ref.style;
  return isActive ? React.createElement("div", {
    style: _objectSpread2({}, STYLES.TAG, {}, STYLES.POSITIVE, {}, style)
  }, "ACTIVE") : React.createElement("div", {
    style: _objectSpread2({}, STYLES.TAG, {}, STYLES.NEGATIVE, {}, style)
  }, "INACTIVE");
};

var _formatLastUpdated = function _formatLastUpdated(lastUpdated) {
  return "".concat(lastUpdated.toLocaleDateString(), " ").concat(lastUpdated.toLocaleTimeString());
};

export var XVIZWorkersStatus = function XVIZWorkersStatus(_ref2) {
  var workers = _ref2.workers,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style;
  return Object.entries(workers).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        workerId = _ref4[0],
        _ref4$ = _ref4[1],
        lastUpdated = _ref4$.lastUpdated,
        isActive = _ref4$.isActive;

    return React.createElement("div", {
      key: workerId,
      style: _objectSpread2({}, STYLES.WORKERS.CONTAINER, {}, style.container)
    }, React.createElement("div", {
      style: _objectSpread2({}, STYLES.WORKERS.TITLE, {}, style.title)
    }, React.createElement("h3", null, "Worker ", workerId), React.createElement(ActivityTag, {
      isActive: isActive,
      style: style.tag
    })), React.createElement("div", null, lastUpdated ? "Last active at ".concat(_formatLastUpdated(lastUpdated)) : 'This worker has never been active.'));
  });
};
//# sourceMappingURL=xviz-workers-status.js.map