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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread11 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _math = require("math.gl");

var _baseWidget = _interopRequireDefault(require("./base-widget"));

var GuageArc = _styled["default"].path(function (props) {
  return (0, _objectSpread11["default"])({
    stroke: props.theme.controlColorDisabled,
    strokeCap: 'round'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var ZeroMarker = _styled["default"].circle(function (props) {
  return (0, _objectSpread11["default"])({
    fill: props.theme.textColorPrimary
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var CmdMarker = _styled["default"].path(function (props) {
  return (0, _objectSpread11["default"])({
    fill: props.theme.controlColorActive
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var GuageHand = _styled["default"].line(function (props) {
  return (0, _objectSpread11["default"])({
    stroke: props.theme.textColorPrimary,
    strokeCap: 'round',
    strokeWidth: 2
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var CmdValue = _styled["default"].div(function (props) {
  return (0, _objectSpread11["default"])({
    textAlign: 'right',
    flex: 1,
    padding: props.theme.spacingTiny,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: props.theme.controlColorDisabled,
    color: props.warning ? props.theme.textColorWarning : props.theme.textColorPrimary,
    fontSize: props.theme.fontSize * 2,
    lineHeight: '1em'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var MsrValue = _styled["default"].div(function (props) {
  return (0, _objectSpread11["default"])({
    textAlign: props.isOnlyValue ? 'center' : 'left',
    flex: 1,
    padding: props.theme.spacingTiny,
    fontSize: props.theme.fontSize * 2,
    color: props.warning ? props.theme.textColorWarning : props.theme.textColorPrimary,
    lineHeight: '1em'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var LabelComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread11["default"])({
    fontSize: props.theme.fontSize,
    color: props.theme.textColorSecondary,
    lineHeight: '1em'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var UnitsComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread11["default"])({
    textAlign: 'center',
    fontSize: props.theme.fontSize * 0.9,
    color: props.theme.textColorSecondary
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var Warning = _styled["default"].span(function (props) {
  return (0, _objectSpread11["default"])({
    position: 'absolute',
    marginLeft: props.theme.spacingTiny,
    fontSize: props.theme.fontSize * 0.9,
    lineHeight: '1em',
    padding: props.theme.spacingTiny,
    borderRadius: 2,
    background: props.theme.warning400,
    color: props.theme.textColorInvert
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

function getTransform(centerX, centerY, angle) {
  return "translate(".concat(centerX, " ").concat(centerY, ") rotate(").concat(angle, ") translate(").concat(-centerX, " ").concat(-centerY, ")");
}

function formatValue(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var transformValue = arguments.length > 2 ? arguments[2] : undefined;

  if (!Number.isFinite(value)) {
    return '';
  }

  value = transformValue(value);
  var digits = value ? Math.max(1, Math.floor(Math.log10(Math.abs(value)) + 1)) : 1;
  return "".concat(value.toFixed(Math.max(0, precision - digits)));
}

var MeterWidget = function (_PureComponent) {
  (0, _inherits2["default"])(MeterWidget, _PureComponent);

  function MeterWidget() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MeterWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MeterWidget)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_render", function (_ref) {
      var theme = _ref.theme,
          streams = _ref.streams;
      return _react["default"].createElement("div", null, _this._renderGauge(streams.cmd, streams.msr, theme), _this._renderMetric(streams.cmd, streams.msr, theme));
    });
    return _this;
  }

  (0, _createClass2["default"])(MeterWidget, [{
    key: "_renderGauge",
    value: function _renderGauge(cmdData, msrData, theme) {
      var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max,
          transformValue = _this$props.transformValue,
          style = _this$props.style;
      var _style$arcRadius = style.arcRadius,
          r = _style$arcRadius === void 0 ? 50 : _style$arcRadius,
          _style$arcWidth = style.arcWidth,
          w = _style$arcWidth === void 0 ? 8 : _style$arcWidth;
      var padding = 8;

      if (r <= w / 2) {
        return null;
      }

      var cmdValue = transformValue(cmdData && cmdData.data && cmdData.data.variable || 0);
      var msrValue = transformValue(msrData.data && msrData.data.variable || 0);
      var msr = (0, _math.clamp)((msrValue - min) / (max - min), 0, 1);
      var cmd = (0, _math.clamp)((cmdValue - min) / (max - min), 0, 1);
      var zero = (0, _math.clamp)((0 - min) / (max - min), 0, 1);
      var msrTransform = getTransform(r + padding, r + padding, msr * 180 - 90);
      var cmdTransform = getTransform(r + padding, r + padding, cmd * 180 - 90);
      var zeroTransform = getTransform(r + padding, r + padding, zero * 180 - 90);
      return _react["default"].createElement("svg", {
        width: (r + padding) * 2,
        height: r + padding * 2
      }, _react["default"].createElement(GuageArc, {
        d: "M ".concat(padding + w / 2, " ").concat(r + padding, " a ").concat(r - w / 2, " ").concat(r - w / 2, " 1 1 1 ").concat(r * 2 - w, " 0"),
        fill: "none",
        strokeWidth: w,
        theme: theme,
        userStyle: style.arc
      }), _react["default"].createElement("g", {
        transform: zeroTransform
      }, _react["default"].createElement(ZeroMarker, {
        cx: r + padding,
        cy: padding - 4,
        r: 2,
        theme: theme,
        userStyle: style.zeroMarker
      })), cmdData && _react["default"].createElement("g", {
        transform: cmdTransform
      }, _react["default"].createElement(CmdMarker, {
        transform: "translate(".concat(r + padding, " ").concat(padding, ")"),
        d: "M0,".concat(w, " L").concat(-w / 2, ",0 L").concat(w / 2, ",0z"),
        theme: theme,
        userStyle: style.cmdMarker
      })), msrData && _react["default"].createElement("g", {
        transform: msrTransform
      }, _react["default"].createElement(GuageHand, {
        x1: r + padding,
        y1: r + padding,
        x2: r + padding,
        y2: padding + w + 4,
        theme: theme,
        userStyle: style.hand
      })));
    }
  }, {
    key: "_renderMetric",
    value: function _renderMetric(cmdData, msrData, theme) {
      var _this$props2 = this.props,
          label = _this$props2.label,
          _this$props2$units = _this$props2.units,
          units = _this$props2$units === void 0 ? msrData.units : _this$props2$units,
          transformValue = _this$props2.transformValue,
          precision = _this$props2.precision,
          getWarning = _this$props2.getWarning,
          style = _this$props2.style;
      var cmdValue = cmdData && cmdData.data && cmdData.data.variable;
      var msrValue = msrData.data && msrData.data.variable;
      var cmdWarning = getWarning(cmdValue);
      var msrWarning = getWarning(msrValue);
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        style: {
          display: 'flex'
        }
      }, cmdData && _react["default"].createElement(CmdValue, {
        theme: theme,
        warning: cmdWarning,
        userStyle: style.cmdValue
      }, _react["default"].createElement(LabelComponent, {
        theme: theme,
        warning: cmdWarning,
        userStyle: style.label
      }, "Cmd."), _react["default"].createElement("div", null, formatValue(cmdValue, precision, transformValue) || '-')), _react["default"].createElement(MsrValue, {
        theme: theme,
        warning: msrWarning,
        isOnlyValue: !cmdData,
        userStyle: style.msrValue
      }, _react["default"].createElement(LabelComponent, {
        theme: theme,
        warning: msrWarning,
        userStyle: style.label
      }, label), _react["default"].createElement("div", null, formatValue(msrValue, precision, transformValue) || '-'))), _react["default"].createElement(UnitsComponent, {
        theme: theme,
        userStyle: style.units
      }, units, (cmdWarning || msrWarning) && _react["default"].createElement(Warning, {
        theme: theme,
        userStyle: style.warning
      }, cmdWarning || msrWarning)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          log = _this$props3.log,
          style = _this$props3.style,
          cmdStreamName = _this$props3.cmdStreamName,
          streamName = _this$props3.streamName;
      return _react["default"].createElement(_baseWidget["default"], {
        log: log,
        style: style,
        streamNames: {
          cmd: cmdStreamName,
          msr: streamName
        }
      }, this._render);
    }
  }]);
  return MeterWidget;
}(_react.PureComponent);

exports["default"] = MeterWidget;
(0, _defineProperty2["default"])(MeterWidget, "propTypes", {
  log: _propTypes["default"].object.isRequired,
  style: _propTypes["default"].object,
  precision: _propTypes["default"].number,
  units: _propTypes["default"].string,
  cmdStreamName: _propTypes["default"].string,
  streamName: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  min: _propTypes["default"].number.isRequired,
  max: _propTypes["default"].number.isRequired,
  transformValue: _propTypes["default"].func,
  getWarning: _propTypes["default"].func
});
(0, _defineProperty2["default"])(MeterWidget, "defaultProps", {
  precision: 3,
  style: {},
  transformValue: function transformValue(x) {
    return x;
  },
  getWarning: function getWarning(_) {
    return null;
  }
});
//# sourceMappingURL=meter-widget.js.map