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

const ActivityTag = ({
  isActive,
  style
}) => isActive ? React.createElement("div", {
  style: _objectSpread2({}, STYLES.TAG, {}, STYLES.POSITIVE, {}, style)
}, "ACTIVE") : React.createElement("div", {
  style: _objectSpread2({}, STYLES.TAG, {}, STYLES.NEGATIVE, {}, style)
}, "INACTIVE");

const _formatLastUpdated = lastUpdated => "".concat(lastUpdated.toLocaleDateString(), " ").concat(lastUpdated.toLocaleTimeString());

export const XVIZWorkersStatus = ({
  workers,
  style = {}
}) => Object.entries(workers).map(([workerId, {
  lastUpdated,
  isActive
}]) => React.createElement("div", {
  key: workerId,
  style: _objectSpread2({}, STYLES.WORKERS.CONTAINER, {}, style.container)
}, React.createElement("div", {
  style: _objectSpread2({}, STYLES.WORKERS.TITLE, {}, style.title)
}, React.createElement("h3", null, "Worker ", workerId), React.createElement(ActivityTag, {
  isActive: isActive,
  style: style.tag
})), React.createElement("div", null, lastUpdated ? "Last active at ".concat(_formatLastUpdated(lastUpdated)) : 'This worker has never been active.')));
//# sourceMappingURL=xviz-workers-status.js.map