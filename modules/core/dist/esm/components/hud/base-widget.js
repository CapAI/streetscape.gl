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
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { evaluateStyle, withTheme } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import connectToLog from '../connect';
var WrapperComponent = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    padding: props.theme.spacingSmall,
    display: 'inline-block'
  }, evaluateStyle(props.userStyle, props));
});

var BaseWidget = function (_PureComponent) {
  _inherits(BaseWidget, _PureComponent);

  function BaseWidget(props) {
    var _this;

    _classCallCheck(this, BaseWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseWidget).call(this, props));
    _this.state = {
      streams: _this._extractStreams(props)
    };
    return _this;
  }

  _createClass(BaseWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.streamNames !== this.props.streamNames || nextProps.streamsMetadata !== this.props.streamsMetadata || nextProps.frame !== this.props.frame) {
        this.setState({
          streams: this._extractStreams(nextProps)
        });
      }
    }
  }, {
    key: "_extractStreams",
    value: function _extractStreams(_ref) {
      var streamNames = _ref.streamNames,
          streamsMetadata = _ref.streamsMetadata,
          frame = _ref.frame;
      var result = {};

      for (var key in streamNames) {
        var streamName = streamNames[key];

        if (streamName) {
          result[key] = _objectSpread2({}, streamsMetadata[streamName], {
            data: frame && frame.streams[streamName]
          });
        }
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          children = _this$props.children;
      var streams = this.state.streams;
      return React.createElement(WrapperComponent, {
        theme: theme,
        userStyle: style.wrapper
      }, children({
        theme: theme,
        streams: streams
      }));
    }
  }]);

  return BaseWidget;
}(PureComponent);

_defineProperty(BaseWidget, "propTypes", {
  style: PropTypes.object,
  streamNames: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  streamsMetadata: PropTypes.object,
  frame: PropTypes.object
});

_defineProperty(BaseWidget, "defaultProps", {
  style: {}
});

var getLogState = function getLogState(log) {
  return {
    streamsMetadata: log.getStreamsMetadata(),
    frame: log.getCurrentFrame()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: withTheme(BaseWidget)
});
//# sourceMappingURL=base-widget.js.map