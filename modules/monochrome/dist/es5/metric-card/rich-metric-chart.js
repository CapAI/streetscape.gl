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

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theme = require("../shared/theme");

var _icons = require("../shared/icons");

var _metricChart = _interopRequireDefault(require("./metric-chart"));

var _styledComponents = require("./styled-components");

var _memoize = _interopRequireDefault(require("../utils/memoize"));

var _d3Scale = require("d3-scale");

var _d3Array = require("d3-array");

var DEFAULT_COLORS = (0, _d3Scale.scaleOrdinal)().range(['#12939A', '#DDB27C', '#88572C', '#FF991F', '#F15C17', '#223F9A', '#DA70BF', '#125C77', '#4DC19C', '#776E57', '#17B8BE', '#F6D18A', '#B7885E', '#FFCB99', '#F89570', '#829AE3', '#E79FD5', '#1E96BE', '#89DAC1', '#B3AD9E']);

var MetricChartWithLegends = function (_PureComponent) {
  (0, _inherits2["default"])(MetricChartWithLegends, _PureComponent);

  function MetricChartWithLegends(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MetricChartWithLegends);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MetricChartWithLegends).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_extractDataSeries", function (data) {
      var _this$props = _this.props,
          formatTitle = _this$props.formatTitle,
          getY = _this$props.getY;
      var series = [];

      for (var key in data) {
        var value = data[key];

        if (Array.isArray(value)) {
          var displayName = formatTitle(key);
          var yExtent = (0, _d3Array.extent)(value, getY);
          series.push({
            key: key,
            displayName: displayName,
            color: _this._getColor(key),
            data: value,
            extent: yExtent,
            max: Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]))
          });
        }
      }

      series.sort(function (s1, s2) {
        return s2.max - s1.max;
      });
      return series;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isDataVisible", function (key) {
      var _this$state = _this.state,
          showTopSeriesOnly = _this$state.showTopSeriesOnly,
          dataVisibility = _this$state.dataVisibility;

      var dataSeries = _this.extractDataSeries(_this.props.data);

      if (dataVisibility[key] === false) {
        return false;
      }

      if (showTopSeriesOnly) {
        var topSeriesCount = _this.props.topSeriesCount;
        return dataSeries.findIndex(function (s) {
          return s.key === key;
        }) < topSeriesCount;
      }

      return true;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setHoveredDataName", function (key) {
      _this.setState({
        hoveredSeriesName: key
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleDataVisibility", function (key) {
      var dataVisibility = _this.state.dataVisibility;

      _this.setState({
        dataVisibility: (0, _objectSpread4["default"])({}, dataVisibility, (0, _defineProperty2["default"])({}, key, dataVisibility[key] === false))
      });
    });
    _this.state = {
      dataVisibility: {},
      showTopSeriesOnly: true,
      hoveredSeriesName: null
    };
    _this.extractDataSeries = (0, _memoize["default"])(_this._extractDataSeries);
    return _this;
  }

  (0, _createClass2["default"])(MetricChartWithLegends, [{
    key: "_getColor",
    value: function _getColor(key) {
      var getColor = this.props.getColor;

      switch ((0, _typeof2["default"])(getColor)) {
        case 'object':
          return getColor[key];

        case 'function':
          return getColor(key);

        default:
          return getColor;
      }
    }
  }, {
    key: "_renderDataFilters",
    value: function _renderDataFilters() {
      var _this2 = this;

      var _this$state2 = this.state,
          showTopSeriesOnly = _this$state2.showTopSeriesOnly,
          hoveredSeriesName = _this$state2.hoveredSeriesName;
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          style = _this$props2.style,
          topSeriesCount = _this$props2.topSeriesCount;
      var dataSeries = this.extractDataSeries(this.props.data);
      var series = showTopSeriesOnly ? dataSeries.slice(0, topSeriesCount) : dataSeries;
      return _react["default"].createElement(_styledComponents.FilterContainer, {
        theme: theme,
        userStyle: style.filter,
        isExpanded: !showTopSeriesOnly
      }, dataSeries.length > topSeriesCount && _react["default"].createElement(_styledComponents.FilterToggle, {
        theme: theme,
        userStyle: style.filterToggle,
        isExpanded: !showTopSeriesOnly,
        onClick: function onClick() {
          return _this2.setState({
            showTopSeriesOnly: !showTopSeriesOnly
          });
        }
      }, showTopSeriesOnly ? style.iconCollapsed || _react["default"].createElement(_icons.CollapsedIcon, null) : style.iconExpanded || _react["default"].createElement(_icons.ExpandedIcon, null)), series.map(function (s) {
        var styleProps = {
          theme: theme,
          name: s.key,
          displayName: s.displayName,
          color: s.color,
          isHovered: hoveredSeriesName === s.key,
          isActive: _this2._isDataVisible(s.key)
        };
        return _react["default"].createElement(_styledComponents.FilterItem, (0, _extends2["default"])({
          userStyle: style.filterItem
        }, styleProps, {
          key: "multiplot-".concat(s.key),
          onMouseOver: function onMouseOver() {
            return _this2._setHoveredDataName(s.key);
          },
          onMouseOut: function onMouseOut() {
            return _this2._setHoveredDataName(null);
          },
          onClick: function onClick() {
            return _this2._toggleDataVisibility(s.key);
          }
        }), _react["default"].createElement(_styledComponents.FilterLegend, (0, _extends2["default"])({}, styleProps, {
          userStyle: style.filterLegend
        }), styleProps.isActive ? style.iconOn || _react["default"].createElement(_icons.CheckAltIcon, null) : style.iconOff), _react["default"].createElement("span", null, s.displayName));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement(_metricChart["default"], (0, _extends2["default"])({}, this.props, {
        highlightSeries: this.state.hoveredSeriesName,
        onSeriesMouseOver: function onSeriesMouseOver(key) {
          return _this3._setHoveredDataName(key);
        },
        onMouseLeave: function onMouseLeave() {
          return _this3._setHoveredDataName(null);
        },
        dataFilter: this._isDataVisible
      })), this._renderDataFilters());
    }
  }]);
  return MetricChartWithLegends;
}(_react.PureComponent);

(0, _defineProperty2["default"])(MetricChartWithLegends, "propTypes", Object.assign({}, _metricChart["default"].propTypes, {
  topSeriesCount: _propTypes["default"].number
}));
(0, _defineProperty2["default"])(MetricChartWithLegends, "defaultProps", Object.assign({}, _metricChart["default"].defaultProps, {
  topSeriesCount: 5,
  getColor: DEFAULT_COLORS
}));

var _default = (0, _theme.withTheme)(MetricChartWithLegends);

exports["default"] = _default;
//# sourceMappingURL=rich-metric-chart.js.map