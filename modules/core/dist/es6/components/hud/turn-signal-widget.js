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
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import BaseWidget from './base-widget';
const CONTAINER_STYLE = {
  lineHeight: 0,
  textAlign: 'center'
};
const ArrowComponent = styled.svg(props => _objectSpread2({
  height: props.theme.controlSize,
  margin: props.theme.spacingTiny,
  fill: props.isOn ? props.theme.textColorPrimary : props.theme.controlColorDisabled
}, evaluateStyle(props.userStyle, props)));
export default class TurnSignalWidget extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_render", ({
      theme,
      streams
    }) => {
      const {
        transformValue,
        style
      } = this.props;
      const value = streams.signal.data && transformValue(streams.signal.data.variable);
      const styleProps = {
        theme,
        userStyle: style.arrow
      };
      return React.createElement("div", {
        style: CONTAINER_STYLE
      }, React.createElement(ArrowComponent, _extends({
        viewBox: "0 0 18 16",
        isOn: value === 'left' || value === 'both'
      }, styleProps), React.createElement("path", {
        d: "M0,8 L8,16 L8,11 L18,11 L18,5 L8,5 L8,0z"
      })), React.createElement(ArrowComponent, _extends({
        viewBox: "0 0 18 16",
        isOn: value === 'right' || value === 'both'
      }, styleProps), React.createElement("path", {
        d: "M18,8 L10,16 L10,11 L0,11 L0,5 L10,5 L10,0z"
      })));
    });
  }

  render() {
    const {
      log,
      style,
      streamName
    } = this.props;
    return React.createElement(BaseWidget, {
      log: log,
      style: style,
      streamNames: {
        signal: streamName
      }
    }, this._render);
  }

}

_defineProperty(TurnSignalWidget, "propTypes", {
  log: PropTypes.object.isRequired,
  style: PropTypes.object,
  streamName: PropTypes.string.isRequired,
  transformValue: PropTypes.func
});

_defineProperty(TurnSignalWidget, "defaultProps", {
  style: {},
  transformValue: x => x
});
//# sourceMappingURL=turn-signal-widget.js.map