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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread7 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var LookAheadContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread7["default"])({
    display: 'flex',
    alignItems: 'center',
    width: 200,
    '>div': {
      flexGrow: 1
    }
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var LookAheadTimestamp = _styled["default"].span(function (props) {
  return (0, _objectSpread7["default"])({
    marginLeft: props.theme.spacingNormal,
    marginRight: props.theme.spacingNormal
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var lookAheadMarkerStyle = function lookAheadMarkerStyle(props) {
  return (0, _objectSpread7["default"])({
    position: 'absolute',
    boxSizing: 'content-box',
    borderStyle: 'solid',
    marginTop: 6,
    marginLeft: -6,
    borderWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#888',
    borderBottomStyle: 'none',
    transitionProperty: 'left',
    transitionDuration: props.isPlaying ? '0s' : props.theme.transitionDuration
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
};

var DualPlaybackControl = function (_PureComponent) {
  (0, _inherits2["default"])(DualPlaybackControl, _PureComponent);

  function DualPlaybackControl() {
    (0, _classCallCheck2["default"])(this, DualPlaybackControl);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DualPlaybackControl).apply(this, arguments));
  }

  (0, _createClass2["default"])(DualPlaybackControl, [{
    key: "_renderLookAheadSlider",
    value: function _renderLookAheadSlider() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          isPlaying = _this$props.isPlaying,
          lookAhead = _this$props.lookAhead,
          formatLookAhead = _this$props.formatLookAhead,
          maxLookAhead = _this$props.maxLookAhead,
          step = _this$props.step;
      return _react["default"].createElement(LookAheadContainer, {
        theme: theme,
        isPlaying: isPlaying,
        userStyle: style.lookAhead
      }, _react["default"].createElement(LookAheadTimestamp, {
        theme: theme,
        isPlaying: isPlaying,
        userStyle: style.lookAheadTimestamp
      }, "Look ahead: ", formatLookAhead(lookAhead)), _react["default"].createElement(_monochrome.Slider, {
        style: style.lookAheadSlider,
        value: lookAhead,
        min: 0,
        max: maxLookAhead,
        step: step,
        size: 16,
        onChange: this.props.onLookAheadChange
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          isPlaying = _this$props2.isPlaying,
          userMarkers = _this$props2.markers,
          style = _this$props2.style,
          children = _this$props2.children,
          currentTime = _this$props2.currentTime,
          lookAhead = _this$props2.lookAhead,
          endTime = _this$props2.endTime;
      var lookAheadTime = Math.min(endTime, currentTime + lookAhead);
      var markers = userMarkers.concat({
        time: lookAheadTime,
        style: lookAheadMarkerStyle({
          theme: theme,
          isPlaying: isPlaying,
          userStyle: style.lookAheadMarker
        })
      });
      return _react["default"].createElement(_monochrome.PlaybackControl, (0, _extends2["default"])({}, this.props, {
        markers: markers
      }), children, _react["default"].createElement("div", {
        style: {
          flexGrow: 1
        }
      }), this._renderLookAheadSlider());
    }
  }]);
  return DualPlaybackControl;
}(_react.PureComponent);

(0, _defineProperty2["default"])(DualPlaybackControl, "propTypes", (0, _objectSpread7["default"])({}, _monochrome.PlaybackControl.propTypes, {
  lookAhead: _propTypes["default"].number,
  maxLookAhead: _propTypes["default"].number,
  formatLookAhead: _propTypes["default"].func,
  onLookAheadChange: _propTypes["default"].func
}));
(0, _defineProperty2["default"])(DualPlaybackControl, "defaultProps", (0, _objectSpread7["default"])({}, _monochrome.PlaybackControl.defaultProps, {
  step: 0,
  markers: [],
  lookAhead: 0,
  maxLookAhead: 10,
  formatTick: null,
  formatTimestamp: null,
  formatLookAhead: function formatLookAhead(x) {
    return _monochrome.PlaybackControl.formatTimeCode(x, '{ss}.{S}');
  },
  onLookAheadChange: function onLookAheadChange() {}
}));
var ThemedDualPlaybackControl = (0, _monochrome.withTheme)(DualPlaybackControl);
ThemedDualPlaybackControl.formatTimeCode = _monochrome.PlaybackControl.formatTimeCode;
var _default = ThemedDualPlaybackControl;
exports["default"] = _default;
//# sourceMappingURL=dual-playback-control.js.map