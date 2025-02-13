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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = _interopRequireDefault(require("./index"));

var _shared = require("../shared");

var PLAYBACK_SPEEDS = {
  '-1': 'Reverse',
  0.5: '0.5x Speed',
  1: 'Normal',
  2: '2x Speed'
};
var CLIP_LENGTH = 20;
var MARKERS = [{
  startTime: 0,
  endTime: 3,
  style: {
    background: '#ccc'
  }
}, {
  startTime: 3,
  endTime: 14,
  style: {
    background: '#0a9'
  }
}, {
  startTime: 14,
  endTime: 20,
  style: {
    background: '#fa0'
  }
}];
var BUFFER_RANGE = [{
  startTime: 0,
  endTime: 15
}];

var PlaybackControlExample = function (_Component) {
  (0, _inherits2["default"])(PlaybackControlExample, _Component);

  function PlaybackControlExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, PlaybackControlExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(PlaybackControlExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isPlaying: false,
      currentTime: 0,
      speed: 1
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_timer", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPlay", function () {
      _this.setState({
        isPlaying: true
      });

      _this._onUpdateTimer(Date.now());
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPause", function () {
      _this.setState({
        isPlaying: false
      });

      window.cancelAnimationFrame(_this._timer);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSeek", function (currentTime) {
      _this.setState({
        currentTime: currentTime
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateSpeed", function (speed) {
      _this.setState({
        speed: Number(speed)
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(PlaybackControlExample, [{
    key: "_onUpdateTimer",
    value: function _onUpdateTimer(lastUpdateTimestamp) {
      window.cancelAnimationFrame(this._timer);
      var timestamp = Date.now();
      var _this$state = this.state,
          currentTime = _this$state.currentTime,
          speed = _this$state.speed;
      var timeElapsed = (timestamp - lastUpdateTimestamp) / 1000;
      var newTime = (timeElapsed * speed + currentTime + CLIP_LENGTH) % CLIP_LENGTH;
      this.setState({
        currentTime: newTime
      });
      this._timer = window.requestAnimationFrame(this._onUpdateTimer.bind(this, timestamp));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$compact = _this$props.compact,
          compact = _this$props$compact === void 0 ? false : _this$props$compact,
          _this$props$showSpeed = _this$props.showSpeedOptions,
          showSpeedOptions = _this$props$showSpeed === void 0 ? false : _this$props$showSpeed,
          _this$props$showMarke = _this$props.showMarkers,
          showMarkers = _this$props$showMarke === void 0 ? false : _this$props$showMarke;
      var _this$state2 = this.state,
          isPlaying = _this$state2.isPlaying,
          currentTime = _this$state2.currentTime,
          speed = _this$state2.speed;
      return _react["default"].createElement(_index["default"], {
        compact: compact,
        currentTime: currentTime,
        startTime: 0,
        endTime: CLIP_LENGTH,
        isPlaying: isPlaying,
        markers: showMarkers ? MARKERS : [],
        bufferRange: showMarkers ? BUFFER_RANGE : [],
        onPlay: this._onPlay,
        onPause: this._onPause,
        onSeek: this._onSeek
      }, showSpeedOptions && _react["default"].createElement("div", {
        style: {
          flexGrow: 1
        }
      }), showSpeedOptions && _react["default"].createElement(_shared.Dropdown, {
        key: "speed-selector",
        className: "speed-selector",
        data: PLAYBACK_SPEEDS,
        value: String(speed),
        onChange: this._updateSpeed
      }));
    }
  }]);
  return PlaybackControlExample;
}(_react.Component);

(0, _react2.storiesOf)('PlaybackControl', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Basic example', function () {
  return _react["default"].createElement(PlaybackControlExample, {
    compact: (0, _addonKnobs["boolean"])('compact', false)
  });
}).add('Markers', function () {
  return _react["default"].createElement(PlaybackControlExample, {
    showMarkers: true,
    compact: (0, _addonKnobs["boolean"])('compact', false)
  });
}).add('Custom controls', function () {
  return _react["default"].createElement(PlaybackControlExample, {
    showSpeedOptions: true
  });
});
//# sourceMappingURL=stories.js.map