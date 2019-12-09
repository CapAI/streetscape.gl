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
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlaybackControl, Slider, withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
var LookAheadContainer = styled.div(function (props) {
  return _objectSpread2({
    display: 'flex',
    alignItems: 'center',
    width: 200,
    '>div': {
      flexGrow: 1
    }
  }, evaluateStyle(props.userStyle, props));
});
var LookAheadTimestamp = styled.span(function (props) {
  return _objectSpread2({
    marginLeft: props.theme.spacingNormal,
    marginRight: props.theme.spacingNormal
  }, evaluateStyle(props.userStyle, props));
});

var lookAheadMarkerStyle = function lookAheadMarkerStyle(props) {
  return _objectSpread2({
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
  }, evaluateStyle(props.userStyle, props));
};

var DualPlaybackControl = function (_PureComponent) {
  _inherits(DualPlaybackControl, _PureComponent);

  function DualPlaybackControl() {
    _classCallCheck(this, DualPlaybackControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(DualPlaybackControl).apply(this, arguments));
  }

  _createClass(DualPlaybackControl, [{
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
      return React.createElement(LookAheadContainer, {
        theme: theme,
        isPlaying: isPlaying,
        userStyle: style.lookAhead
      }, React.createElement(LookAheadTimestamp, {
        theme: theme,
        isPlaying: isPlaying,
        userStyle: style.lookAheadTimestamp
      }, "Look ahead: ", formatLookAhead(lookAhead)), React.createElement(Slider, {
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
      return React.createElement(PlaybackControl, _extends({}, this.props, {
        markers: markers
      }), children, React.createElement("div", {
        style: {
          flexGrow: 1
        }
      }), this._renderLookAheadSlider());
    }
  }]);

  return DualPlaybackControl;
}(PureComponent);

_defineProperty(DualPlaybackControl, "propTypes", _objectSpread2({}, PlaybackControl.propTypes, {
  lookAhead: PropTypes.number,
  maxLookAhead: PropTypes.number,
  formatLookAhead: PropTypes.func,
  onLookAheadChange: PropTypes.func
}));

_defineProperty(DualPlaybackControl, "defaultProps", _objectSpread2({}, PlaybackControl.defaultProps, {
  step: 0,
  markers: [],
  lookAhead: 0,
  maxLookAhead: 10,
  formatTick: null,
  formatTimestamp: null,
  formatLookAhead: function formatLookAhead(x) {
    return PlaybackControl.formatTimeCode(x, '{ss}.{S}');
  },
  onLookAheadChange: function onLookAheadChange() {}
}));

var ThemedDualPlaybackControl = withTheme(DualPlaybackControl);
ThemedDualPlaybackControl.formatTimeCode = PlaybackControl.formatTimeCode;
export default ThemedDualPlaybackControl;
//# sourceMappingURL=dual-playback-control.js.map