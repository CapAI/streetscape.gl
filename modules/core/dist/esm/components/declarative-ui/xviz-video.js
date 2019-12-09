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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Dropdown, withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import ImageSequence from './image-sequence';
import connectToLog from '../connect';
import { normalizeStreamFilter } from '../../utils/stream-utils';
var WrapperComponent = styled.span(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    position: 'relative'
  }, evaluateStyle(props.userStyle, props));
});

var BaseComponent = function (_PureComponent) {
  _inherits(BaseComponent, _PureComponent);

  function BaseComponent(props) {
    var _this;

    _classCallCheck(this, BaseComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onSelectVideo", function (streamName) {
      _this.setState({
        selectedStreamName: streamName
      });
    });

    _this.state = _objectSpread2({}, _this._getStreamNames(props));
    return _this;
  }

  _createClass(BaseComponent, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.streamsMetadata !== nextProps.streamsMetadata || this.props.cameras !== nextProps.cameras) {
        this.setState(this._getStreamNames(nextProps));
      }
    }
  }, {
    key: "_getStreamNames",
    value: function _getStreamNames(_ref) {
      var streamsMetadata = _ref.streamsMetadata,
          cameras = _ref.cameras;
      var streamNames = Object.keys(streamsMetadata).filter(function (streamName) {
        var type = streamsMetadata[streamName] && streamsMetadata[streamName].primitive_type;
        return type === 'IMAGE' || type === 'image';
      }).filter(normalizeStreamFilter(cameras)).sort();

      var _ref2 = this.state || {},
          selectedStreamName = _ref2.selectedStreamName;

      if (!streamNames.includes(selectedStreamName)) {
        selectedStreamName = streamNames[0] || null;
      }

      return {
        selectedStreamName: selectedStreamName,
        streamNames: streamNames
      };
    }
  }, {
    key: "_renderVideoSelector",
    value: function _renderVideoSelector() {
      var style = this.props.style;
      var _this$state = this.state,
          streamNames = _this$state.streamNames,
          selectedStreamName = _this$state.selectedStreamName;

      if (streamNames.length <= 1) {
        return null;
      }

      var data = {};
      streamNames.forEach(function (name) {
        data[name] = name;
      });
      return React.createElement(Dropdown, {
        style: style.selector,
        value: selectedStreamName,
        data: data,
        onChange: this._onSelectVideo
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currentTime = _this$props.currentTime,
          streams = _this$props.streams,
          width = _this$props.width,
          height = _this$props.height,
          style = _this$props.style,
          theme = _this$props.theme;
      var selectedStreamName = this.state.selectedStreamName;

      if (!streams || !currentTime || !selectedStreamName) {
        return null;
      }

      var images = streams[selectedStreamName];

      if (images) {
        images = images.filter(Boolean);
      }

      return React.createElement(WrapperComponent, {
        theme: theme,
        userStyle: style.wrapper
      }, React.createElement(ImageSequence, {
        width: width,
        height: height,
        src: images,
        currentTime: currentTime
      }), this._renderVideoSelector());
    }
  }]);

  return BaseComponent;
}(PureComponent);

_defineProperty(BaseComponent, "propTypes", {
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cameras: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.func]),
  currentTime: PropTypes.number,
  streamsMetadata: PropTypes.object,
  streams: PropTypes.object
});

_defineProperty(BaseComponent, "defaultProps", {
  style: {},
  width: '100%',
  height: 'auto'
});

var getLogState = function getLogState(log) {
  return {
    currentTime: log.getCurrentTime(),
    streamsMetadata: log.getStreamsMetadata(),
    streams: log.getStreams()
  };
};

var XVIZVideoComponent = withTheme(BaseComponent);
export default connectToLog({
  getLogState: getLogState,
  Component: XVIZVideoComponent
});
//# sourceMappingURL=xviz-video.js.map