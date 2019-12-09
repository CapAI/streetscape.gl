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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XVIZWorkersStatus = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

var ActivityTag = function ActivityTag(_ref) {
  var isActive = _ref.isActive,
      style = _ref.style;
  return isActive ? _react["default"].createElement("div", {
    style: (0, _objectSpread6["default"])({}, _constants.STYLES.TAG, {}, _constants.STYLES.POSITIVE, {}, style)
  }, "ACTIVE") : _react["default"].createElement("div", {
    style: (0, _objectSpread6["default"])({}, _constants.STYLES.TAG, {}, _constants.STYLES.NEGATIVE, {}, style)
  }, "INACTIVE");
};

var _formatLastUpdated = function _formatLastUpdated(lastUpdated) {
  return "".concat(lastUpdated.toLocaleDateString(), " ").concat(lastUpdated.toLocaleTimeString());
};

var XVIZWorkersStatus = function XVIZWorkersStatus(_ref2) {
  var workers = _ref2.workers,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style;
  return Object.entries(workers).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        workerId = _ref4[0],
        _ref4$ = _ref4[1],
        lastUpdated = _ref4$.lastUpdated,
        isActive = _ref4$.isActive;

    return _react["default"].createElement("div", {
      key: workerId,
      style: (0, _objectSpread6["default"])({}, _constants.STYLES.WORKERS.CONTAINER, {}, style.container)
    }, _react["default"].createElement("div", {
      style: (0, _objectSpread6["default"])({}, _constants.STYLES.WORKERS.TITLE, {}, style.title)
    }, _react["default"].createElement("h3", null, "Worker ", workerId), _react["default"].createElement(ActivityTag, {
      isActive: isActive,
      style: style.tag
    })), _react["default"].createElement("div", null, lastUpdated ? "Last active at ".concat(_formatLastUpdated(lastUpdated)) : 'This worker has never been active.'));
  });
};

exports.XVIZWorkersStatus = XVIZWorkersStatus;
//# sourceMappingURL=xviz-workers-status.js.map