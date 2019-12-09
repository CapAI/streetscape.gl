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

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var _chart = _interopRequireDefault(require("./chart"));

var _memoize = _interopRequireDefault(require("../utils/memoize"));

var MetricChart = function (_PureComponent) {
  (0, _inherits2["default"])(MetricChart, _PureComponent);

  function MetricChart(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MetricChart);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MetricChart).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getCurrentValues", function (highlightX, data) {
      if (!Number.isFinite(highlightX) || !data) {
        return null;
      }

      var getX = _this.props.getX;
      var result = {};

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          result[key] = (0, _utils.findNearestValue)(data[key], highlightX, getX);
        }
      }

      return result;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (evt) {
      _this.props.onClick(_this.state.hoveredX, evt);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onNearestX", function (key, value, evt) {
      var hoveredValues = _this.state.hoveredValues;
      hoveredValues[key] = value;

      _this.setState({
        isHovered: true,
        hoveredX: _this.props.getX(value),
        hoveredValues: (0, _objectSpread3["default"])({}, hoveredValues)
      });

      _this.props.onNearestX(key, value, evt);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseLeave", function (evt) {
      _this.setState({
        isHovered: false,
        hoveredX: null
      });

      _this.props.onMouseLeave(evt);
    });
    _this.state = {
      isHovered: false,
      hoveredX: null,
      hoveredValues: {}
    };
    _this.getCurrentValues = (0, _memoize["default"])(_this._getCurrentValues);
    return _this;
  }

  (0, _createClass2["default"])(MetricChart, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          highlightX = _this$props.highlightX,
          data = _this$props.data;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          hoveredValues = _this$state.hoveredValues;
      var currentValues = this.getCurrentValues(highlightX, data);
      return _react["default"].createElement(_chart["default"], (0, _extends2["default"])({}, this.props, {
        onClick: this._onClick,
        onNearestX: this._onNearestX,
        onMouseLeave: this._onMouseLeave,
        highlightValues: isHovered ? hoveredValues : currentValues
      }));
    }
  }]);
  return MetricChart;
}(_react.PureComponent);

exports["default"] = MetricChart;
(0, _defineProperty2["default"])(MetricChart, "propTypes", Object.assign({
  highlightX: _propTypes["default"].number
}, _chart["default"].propTypes));
(0, _defineProperty2["default"])(MetricChart, "defaultProps", _chart["default"].defaultProps);
//# sourceMappingURL=metric-chart.js.map