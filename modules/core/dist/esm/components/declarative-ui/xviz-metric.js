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
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MetricCard, MetricChart, Spinner } from '@streetscape.gl/monochrome';
import { DEFAULT_COLOR_SERIES } from './constants';
import connectToLog from '../connect';
import { getTimeSeries } from '../../utils/metrics-helper';
import { MissingDataCard } from './missing-data-card';

var defaultFormatValue = function defaultFormatValue(x) {
  return Number.isFinite(x) ? x.toFixed(3) : String(x);
};

var XVIZMetricComponent = function (_PureComponent) {
  _inherits(XVIZMetricComponent, _PureComponent);

  function XVIZMetricComponent(props) {
    var _this;

    _classCallCheck(this, XVIZMetricComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(XVIZMetricComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (x) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          log = _this$props.log;

      if (onClick) {
        onClick(x);
      } else if (log) {
        log.seek(x);
      }
    });

    _this.state = {
      timeSeries: _this._getTimeSeries(props)
    };
    return _this;
  }

  _createClass(XVIZMetricComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.streams !== nextProps.streams || this.props.streamsMetadata !== nextProps.streamsMetadata || this.props.logStreams !== nextProps.logStreams) {
        this.setState({
          timeSeries: this._getTimeSeries(nextProps)
        });
      }
    }
  }, {
    key: "_getTimeSeries",
    value: function _getTimeSeries(props) {
      return getTimeSeries({
        streamNames: props.streams,
        streamsMetadata: props.streamsMetadata,
        streams: props.logStreams
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          title = _this$props2.title,
          description = _this$props2.description,
          startTime = _this$props2.startTime,
          endTime = _this$props2.endTime,
          currentTime = _this$props2.currentTime,
          width = _this$props2.width,
          height = _this$props2.height,
          style = _this$props2.style,
          xTicks = _this$props2.xTicks,
          yTicks = _this$props2.yTicks,
          formatXTick = _this$props2.formatXTick,
          formatYTick = _this$props2.formatYTick,
          formatValue = _this$props2.formatValue,
          horizontalGridLines = _this$props2.horizontalGridLines,
          verticalGridLines = _this$props2.verticalGridLines,
          getColor = _this$props2.getColor;
      var isLoading = currentTime == null;
      var timeDomain = Number.isFinite(startTime) ? [startTime, endTime] : null;
      var missingStreams = this.state.timeSeries.missingStreams;
      return React.createElement(MetricCard, {
        title: title,
        description: description,
        isLoading: false,
        style: style
      }, React.createElement(React.Fragment, null, missingStreams.length > 0 && React.createElement(MissingDataCard, {
        style: style,
        missingData: missingStreams
      }), isLoading ? React.createElement(Spinner, null) : React.createElement(MetricChart, _extends({}, this.state.timeSeries, {
        getColor: getColor,
        highlightX: currentTime,
        width: width,
        height: height,
        style: style,
        xTicks: xTicks,
        yTicks: yTicks,
        formatXTick: formatXTick,
        formatYTick: formatYTick,
        formatValue: formatValue,
        xDomain: timeDomain,
        onClick: this._onClick,
        horizontalGridLines: horizontalGridLines,
        verticalGridLines: verticalGridLines
      }))));
    }
  }]);

  return XVIZMetricComponent;
}(PureComponent);

_defineProperty(XVIZMetricComponent, "propTypes", {
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getColor: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
  xTicks: PropTypes.number,
  yTicks: PropTypes.number,
  formatXTick: PropTypes.func,
  formatYTick: PropTypes.func,
  formatValue: PropTypes.func,
  horizontalGridLines: PropTypes.number,
  verticalGridLines: PropTypes.number,
  onClick: PropTypes.func,
  streams: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  currentTime: PropTypes.number,
  streamsMetadata: PropTypes.object,
  logStreams: PropTypes.objectOf(PropTypes.array),
  startTime: PropTypes.number,
  endTime: PropTypes.number
});

_defineProperty(XVIZMetricComponent, "defaultProps", {
  timeSeries: {},
  width: '100%',
  height: 160,
  style: {
    margin: {
      left: 45,
      right: 10,
      top: 10,
      bottom: 20
    }
  },
  xTicks: 0,
  yTicks: 3,
  formatValue: defaultFormatValue,
  horizontalGridLines: 3,
  verticalGridLines: 0,
  getColor: DEFAULT_COLOR_SERIES
});

var getLogState = function getLogState(log) {
  return {
    currentTime: log.getCurrentTime(),
    streamsMetadata: log.getStreamsMetadata(),
    logStreams: log.getStreams(),
    startTime: log.getBufferStartTime(),
    endTime: log.getBufferEndTime()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: XVIZMetricComponent
});
//# sourceMappingURL=xviz-metric.js.map