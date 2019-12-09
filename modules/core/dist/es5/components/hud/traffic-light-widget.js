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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _baseWidget = _interopRequireDefault(require("./base-widget"));

var Container = _styled["default"].div(function (props) {
  return {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: props.layout === 'vertical' ? 'column' : 'row'
  };
});

var COLORS = {
  red: '#d42e22',
  yellow: '#f8ce46',
  green: '#57ad57'
};

var LightComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread3["default"])({
    boxSizing: 'border-box',
    width: props.theme.controlSize,
    height: props.theme.controlSize,
    margin: props.theme.spacingTiny,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: COLORS[props.color],
    background: props.isOn ? COLORS[props.color] : 'none'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var TrafficLightWidget = function (_PureComponent) {
  (0, _inherits2["default"])(TrafficLightWidget, _PureComponent);

  function TrafficLightWidget() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, TrafficLightWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(TrafficLightWidget)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_render", function (_ref) {
      var theme = _ref.theme,
          streams = _ref.streams;
      var _this$props = _this.props,
          transformValue = _this$props.transformValue,
          style = _this$props.style;
      var value = streams.light.data && transformValue(streams.light.data.variable);
      var styleProps = {
        theme: theme,
        userStyle: style.light
      };
      return _react["default"].createElement(Container, {
        theme: theme,
        layout: style.layout
      }, _react["default"].createElement(LightComponent, (0, _extends2["default"])({
        key: "red",
        color: "red",
        isOn: value === 'red'
      }, styleProps)), _react["default"].createElement(LightComponent, (0, _extends2["default"])({
        key: "yellow",
        color: "yellow",
        isOn: value === 'yellow'
      }, styleProps)), _react["default"].createElement(LightComponent, (0, _extends2["default"])({
        key: "green",
        color: "green",
        isOn: value === 'green'
      }, styleProps)));
    });
    return _this;
  }

  (0, _createClass2["default"])(TrafficLightWidget, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          log = _this$props2.log,
          style = _this$props2.style,
          streamName = _this$props2.streamName;
      return _react["default"].createElement(_baseWidget["default"], {
        log: log,
        style: style,
        streamNames: {
          light: streamName
        }
      }, this._render);
    }
  }]);
  return TrafficLightWidget;
}(_react.PureComponent);

exports["default"] = TrafficLightWidget;
(0, _defineProperty2["default"])(TrafficLightWidget, "propTypes", {
  log: _propTypes["default"].object.isRequired,
  style: _propTypes["default"].object,
  streamName: _propTypes["default"].string.isRequired,
  transformValue: _propTypes["default"].func
});
(0, _defineProperty2["default"])(TrafficLightWidget, "defaultProps", {
  style: {},
  transformValue: function transformValue(x) {
    return x;
  }
});
//# sourceMappingURL=traffic-light-widget.js.map