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
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findNearestValue } from './utils';
import Chart from './chart';
import memoize from '../utils/memoize';

var MetricChart = function (_PureComponent) {
  _inherits(MetricChart, _PureComponent);

  function MetricChart(props) {
    var _this;

    _classCallCheck(this, MetricChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MetricChart).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_getCurrentValues", function (highlightX, data) {
      if (!Number.isFinite(highlightX) || !data) {
        return null;
      }

      var getX = _this.props.getX;
      var result = {};

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          result[key] = findNearestValue(data[key], highlightX, getX);
        }
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (evt) {
      _this.props.onClick(_this.state.hoveredX, evt);
    });

    _defineProperty(_assertThisInitialized(_this), "_onNearestX", function (key, value, evt) {
      var hoveredValues = _this.state.hoveredValues;
      hoveredValues[key] = value;

      _this.setState({
        isHovered: true,
        hoveredX: _this.props.getX(value),
        hoveredValues: _objectSpread2({}, hoveredValues)
      });

      _this.props.onNearestX(key, value, evt);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseLeave", function (evt) {
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
    _this.getCurrentValues = memoize(_this._getCurrentValues);
    return _this;
  }

  _createClass(MetricChart, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          highlightX = _this$props.highlightX,
          data = _this$props.data;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          hoveredValues = _this$state.hoveredValues;
      var currentValues = this.getCurrentValues(highlightX, data);
      return React.createElement(Chart, _extends({}, this.props, {
        onClick: this._onClick,
        onNearestX: this._onNearestX,
        onMouseLeave: this._onMouseLeave,
        highlightValues: isHovered ? hoveredValues : currentValues
      }));
    }
  }]);

  return MetricChart;
}(PureComponent);

_defineProperty(MetricChart, "propTypes", Object.assign({
  highlightX: PropTypes.number
}, Chart.propTypes));

_defineProperty(MetricChart, "defaultProps", Chart.defaultProps);

export { MetricChart as default };
//# sourceMappingURL=metric-chart.js.map