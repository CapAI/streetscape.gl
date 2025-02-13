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
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { boolean as _boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import PlaybackControl from './index';
import { Dropdown } from '../shared';
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
  _inherits(PlaybackControlExample, _Component);

  function PlaybackControlExample() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PlaybackControlExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PlaybackControlExample)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPlaying: false,
      currentTime: 0,
      speed: 1
    });

    _defineProperty(_assertThisInitialized(_this), "_timer", null);

    _defineProperty(_assertThisInitialized(_this), "_onPlay", function () {
      _this.setState({
        isPlaying: true
      });

      _this._onUpdateTimer(Date.now());
    });

    _defineProperty(_assertThisInitialized(_this), "_onPause", function () {
      _this.setState({
        isPlaying: false
      });

      window.cancelAnimationFrame(_this._timer);
    });

    _defineProperty(_assertThisInitialized(_this), "_onSeek", function (currentTime) {
      _this.setState({
        currentTime: currentTime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_updateSpeed", function (speed) {
      _this.setState({
        speed: Number(speed)
      });
    });

    return _this;
  }

  _createClass(PlaybackControlExample, [{
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
      return React.createElement(PlaybackControl, {
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
      }, showSpeedOptions && React.createElement("div", {
        style: {
          flexGrow: 1
        }
      }), showSpeedOptions && React.createElement(Dropdown, {
        key: "speed-selector",
        className: "speed-selector",
        data: PLAYBACK_SPEEDS,
        value: String(speed),
        onChange: this._updateSpeed
      }));
    }
  }]);

  return PlaybackControlExample;
}(Component);

storiesOf('PlaybackControl', module).addDecorator(withReadme(README)).add('Basic example', function () {
  return React.createElement(PlaybackControlExample, {
    compact: _boolean('compact', false)
  });
}).add('Markers', function () {
  return React.createElement(PlaybackControlExample, {
    showMarkers: true,
    compact: _boolean('compact', false)
  });
}).add('Custom controls', function () {
  return React.createElement(PlaybackControlExample, {
    showSpeedOptions: true
  });
});
//# sourceMappingURL=stories.js.map