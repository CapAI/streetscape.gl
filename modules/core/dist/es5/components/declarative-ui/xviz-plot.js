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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _constants = require("./constants");

var _connect = _interopRequireDefault(require("../connect"));

var _missingDataCard = require("./missing-data-card");

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
  (0, _inherits2["default"])(XVIZPlotComponent, _PureComponent);

  function XVIZPlotComponent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, XVIZPlotComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(XVIZPlotComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      independentVariable: null,
      dependentVariables: {},
      missingStreams: _this.props.dependentVariables
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (x) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          log = _this$props.log;

      if (onClick) {
        onClick(x);
      } else if (log) {}
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_formatTitle", function (streamName) {
      return streamName;
    });
    return _this;
  }

  (0, _createClass2["default"])(XVIZPlotComponent, [{
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
          dependentVariables: (0, _objectSpread3["default"])({}, this.state.dependentVariables, {}, updatedDependentVariable),
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
      return _react["default"].createElement(_monochrome.MetricCard, {
        title: title,
        description: description,
        style: style,
        isLoading: false
      }, _react["default"].createElement(_react["default"].Fragment, null, missingStreams.length > 0 && _react["default"].createElement(_missingDataCard.MissingDataCard, {
        style: style,
        missingData: missingStreams
      }), dataProps.isLoading ? _react["default"].createElement(_monochrome.Spinner, null) : _react["default"].createElement(_monochrome.MetricChart, (0, _extends2["default"])({}, dataProps, {
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
}(_react.PureComponent);

(0, _defineProperty2["default"])(XVIZPlotComponent, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  style: _propTypes["default"].object,
  getColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object]),
  xTicks: _propTypes["default"].number,
  yTicks: _propTypes["default"].number,
  formatXTick: _propTypes["default"].func,
  formatYTick: _propTypes["default"].func,
  horizontalGridLines: _propTypes["default"].number,
  verticalGridLines: _propTypes["default"].number,
  onClick: _propTypes["default"].func,
  title: _propTypes["default"].string,
  description: _propTypes["default"].string,
  independentVariable: _propTypes["default"].string,
  dependentVariables: _propTypes["default"].arrayOf(_propTypes["default"].string),
  streamsMetadata: _propTypes["default"].object,
  variables: _propTypes["default"].object
});
(0, _defineProperty2["default"])(XVIZPlotComponent, "defaultProps", {
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
  getColor: _constants.DEFAULT_COLOR_SERIES
});

var getLogState = function getLogState(log) {
  var frame = log.getCurrentFrame();
  return {
    streamsMetadata: log.getStreamsMetadata(),
    variables: frame && frame.variables
  };
};

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: XVIZPlotComponent
});

exports["default"] = _default;
//# sourceMappingURL=xviz-plot.js.map