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
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import { MetricCard, MetricChart } from '@streetscape.gl/monochrome';
import { HISTORY_SIZE, STATS_NAMES, STYLES, STATS_KEYS, STATS_COLORS, DEFAULT_STATS_TITLE, STATS_HELP, INITIAL_STATS } from './constants';

var Help = function Help() {
  var help = [];

  for (var _i = 0, _Object$entries = Object.entries(STATS_HELP); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        statName = _Object$entries$_i[0],
        statHelp = _Object$entries$_i[1];

    help.push(React.createElement("div", {
      key: statName,
      style: {
        marginBottom: 10
      }
    }, React.createElement("strong", null, STATS_NAMES[statName]), React.createElement("div", null, statHelp)));
  }

  return React.createElement("div", {
    style: STYLES.LOG_VIEWER.STATS_HELP
  }, help);
};

var _updateStats = function _updateStats(stats, statsSnapshot) {
  stats.counter += 1;

  for (var _i2 = 0, _Object$values = Object.values(STATS_KEYS); _i2 < _Object$values.length; _i2++) {
    var statName = _Object$values[_i2];

    if (stats[statName].length >= HISTORY_SIZE) {
      stats[statName] = stats[statName].slice(1);
    }

    var newStatValue = {
      x: stats.counter,
      y: statsSnapshot && statsSnapshot[statName] || 0
    };
    stats[statName].push(newStatValue);
  }

  return stats;
};

export var LogViewerStats = function (_React$Component) {
  _inherits(LogViewerStats, _React$Component);

  function LogViewerStats() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LogViewerStats);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LogViewerStats)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      stats: INITIAL_STATS
    });

    return _this;
  }

  _createClass(LogViewerStats, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      if (nextProps.statsSnapshot !== this.props.statsSnapshot) {
        var stats = _updateStats(this.state.stats, nextProps.statsSnapshot);

        this.setState({
          stats: stats
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state$stats = this.state.stats,
          counter = _this$state$stats.counter,
          data = _objectWithoutProperties(_this$state$stats, ["counter"]);

      var title = this.props.title || DEFAULT_STATS_TITLE;
      return React.createElement("div", {
        id: "stats",
        style: STYLES.LOG_VIEWER.STATS
      }, React.createElement(MetricCard, {
        title: title,
        description: React.createElement(Help, null),
        style: STYLES.LOG_VIEWER.METRIC_CARD
      }, React.createElement(MetricChart, {
        width: 350,
        height: 200,
        data: data,
        highlightX: counter,
        getColor: function getColor(statKey) {
          return STATS_COLORS[statKey];
        },
        formatTitle: function formatTitle(statKey) {
          return STATS_NAMES[statKey];
        }
      })));
    }
  }]);

  return LogViewerStats;
}(React.Component);
//# sourceMappingURL=log-viewer-stats.js.map