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
import { MetricCard, MetricChart, Spinner } from '@streetscape.gl/monochrome';
import { DEFAULT_COLOR_SERIES } from './constants';
import connectToLog from '../connect';
import { MissingDataCard } from './missing-data-card';

var GET_X = function GET_X(d) {
  return d[0];
};

var GET_Y = function GET_Y(d) {
  return d[1];
};

var DATA_LOADING = {
  isLoading: true
};

var XVIZPlotComponent = function (_PureComponent) {
  _inherits(XVIZPlotComponent, _PureComponent);

  function XVIZPlotComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, XVIZPlotComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(XVIZPlotComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      independentVariable: null,
      dependentVariables: {},
      missingStreams: _this.props.dependentVariables
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (x) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          log = _this$props.log;

      if (onClick) {
        onClick(x);
      } else if (log) {}
    });

    _defineProperty(_assertThisInitialized(_this), "_formatTitle", function (streamName) {
      return streamName;
    });

    return _this;
  }

  _createClass(XVIZPlotComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.variables) {
        this.setState({
          independentVariable: null
        });
        return;
      }

      var independentVariable = nextProps.variables[nextProps.independentVariable];
      var independentVariableChanged = false;
      var dependentVariablesChanged = false;
      var updatedDependentVariable = {};

      if (independentVariable !== this.state.independentVariable) {
        independentVariableChanged = true;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nextProps.dependentVariables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var streamName = _step.value;
          var variable = nextProps.variables[streamName];

          if (independentVariableChanged || !this.props.variables || this.props.variables[streamName] !== variable) {
            updatedDependentVariable[streamName] = this._formatDependentVariable(independentVariable, variable);
            dependentVariablesChanged = true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (independentVariableChanged || dependentVariablesChanged) {
        this.setState({
          independentVariable: independentVariable,
          dependentVariables: _objectSpread2({}, this.state.dependentVariables, {}, updatedDependentVariable),
          missingStreams: Object.keys(updatedDependentVariable).filter(function (dv) {
            return !updatedDependentVariable[dv];
          })
        });
      }
    }
  }, {
    key: "_formatDependentVariable",
    value: function _formatDependentVariable(independentVariable, variable) {
      if (!variable || !independentVariable || independentVariable.length === 0) {
        return null;
      }

      var x = independentVariable[0].values;
      return variable.map(function (_ref) {
        var id = _ref.id,
            values = _ref.values;
        var valueTuple = new Array(values.length);
        values.forEach(function (v, k) {
          return valueTuple[k] = [x[k], v];
        });
        return {
          id: id,
          values: valueTuple
        };
      });
    }
  }, {
    key: "_extractDataProps",
    value: function _extractDataProps() {
      var _this$state = this.state,
          independentVariable = _this$state.independentVariable,
          dependentVariables = _this$state.dependentVariables;

      if (!independentVariable) {
        return DATA_LOADING;
      }

      var x = independentVariable[0].values;
      var data = {};

      var _loop = function _loop(streamName) {
        var variable = dependentVariables[streamName];

        if (variable) {
          variable.forEach(function (_ref2, i) {
            var id = _ref2.id,
                values = _ref2.values;
            data["".concat(streamName, "-").concat(id || i)] = values;
          });
        }
      };

      for (var streamName in dependentVariables) {
        _loop(streamName);
      }

      return {
        getX: GET_X,
        getY: GET_Y,
        xDomain: [x[0], x[x.length - 1]],
        data: data
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          title = _this$props2.title,
          description = _this$props2.description,
          width = _this$props2.width,
          height = _this$props2.height,
          style = _this$props2.style,
          xTicks = _this$props2.xTicks,
          yTicks = _this$props2.yTicks,
          formatXTick = _this$props2.formatXTick,
          formatYTick = _this$props2.formatYTick,
          horizontalGridLines = _this$props2.horizontalGridLines,
          verticalGridLines = _this$props2.verticalGridLines,
          getColor = _this$props2.getColor;

      var dataProps = this._extractDataProps();

      var missingStreams = this.state.missingStreams;
      return React.createElement(MetricCard, {
        title: title,
        description: description,
        style: style,
        isLoading: false
      }, React.createElement(React.Fragment, null, missingStreams.length > 0 && React.createElement(MissingDataCard, {
        style: style,
        missingData: missingStreams
      }), dataProps.isLoading ? React.createElement(Spinner, null) : React.createElement(MetricChart, _extends({}, dataProps, {
        getColor: getColor,
        highlightX: 0,
        width: width,
        height: height,
        style: style,
        xTicks: xTicks,
        yTicks: yTicks,
        formatXTick: formatXTick,
        formatYTick: formatYTick,
        onClick: this._onClick,
        formatTitle: this._formatTitle,
        horizontalGridLines: horizontalGridLines,
        verticalGridLines: verticalGridLines
      }))));
    }
  }]);

  return XVIZPlotComponent;
}(PureComponent);

_defineProperty(XVIZPlotComponent, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  getColor: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  xTicks: PropTypes.number,
  yTicks: PropTypes.number,
  formatXTick: PropTypes.func,
  formatYTick: PropTypes.func,
  horizontalGridLines: PropTypes.number,
  verticalGridLines: PropTypes.number,
  onClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  independentVariable: PropTypes.string,
  dependentVariables: PropTypes.arrayOf(PropTypes.string),
  streamsMetadata: PropTypes.object,
  variables: PropTypes.object
});

_defineProperty(XVIZPlotComponent, "defaultProps", {
  streamsMetadata: {},
  variables: {},
  width: '100%',
  height: 300,
  style: {
    margin: {
      left: 45,
      right: 10,
      top: 10,
      bottom: 32
    }
  },
  xTicks: 0,
  yTicks: 5,
  horizontalGridLines: 5,
  verticalGridLines: 0,
  getColor: DEFAULT_COLOR_SERIES
});

var getLogState = function getLogState(log) {
  var frame = log.getCurrentFrame();
  return {
    streamsMetadata: log.getStreamsMetadata(),
    variables: frame && frame.variables
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: XVIZPlotComponent
});
//# sourceMappingURL=xviz-plot.js.map