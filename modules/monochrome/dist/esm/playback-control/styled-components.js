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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import styled from '@emotion/styled';
import { evaluateStyle } from '../shared/theme';
export var WrapperComponent = styled.div(function (props) {
  var result = _objectSpread2({}, props.theme.__reset__, {
    boxSizing: 'border-box'
  });

  if (props.isPlaying) {
    result.div = {
      transitionDuration: '0s !important'
    };
  }

  return Object.assign(result, evaluateStyle(props.userStyle, props));
});
export var ControlsContainer = styled.div(function (props) {
  return _objectSpread2({
    display: 'flex',
    alignItems: 'center',
    marginTop: props.theme.spacingTiny
  }, evaluateStyle(props.userStyle, props));
});
export var PlayPauseButton = styled.div(function (props) {
  return _objectSpread2({
    width: 16,
    height: 16,
    marginLeft: props.compact ? 0 : -8,
    marginRight: props.theme.spacingSmall,
    cursor: 'pointer',
    color: props.theme.controlColorPrimary,
    '&:hover': {
      color: props.theme.controlColorHovered
    },
    path: {
      fill: 'currentColor'
    }
  }, evaluateStyle(props.userStyle, props));
});
export var Timestamp = styled.div(function (props) {
  return _objectSpread2({}, evaluateStyle(props.userStyle, props));
});
export var TicksContainer = styled.div(function (props) {
  return _objectSpread2({
    position: 'relative',
    height: 20
  }, evaluateStyle(props.userStyle, props));
});
export var Tick = styled.div(function (props) {
  return _objectSpread2({
    height: 4,
    bottom: 0,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: props.theme.controlColorSecondary
  }, evaluateStyle(props.userStyle, props));
});
export var TickLabel = styled.div(function (props) {
  return _objectSpread2({
    transform: 'translate(-50%, -18px)'
  }, evaluateStyle(props.userStyle, props));
});
export var MarkersContainer = styled.div(function (props) {
  return _objectSpread2({
    position: 'relative',
    height: 3
  }, evaluateStyle(props.userStyle, props));
});
export var MarkerComponent = styled.div(function (props) {
  return _objectSpread2({
    height: '100%'
  }, evaluateStyle(props.userStyle, props));
});
export var BufferComponent = styled.div(function (props) {
  return _objectSpread2({
    height: '100%',
    background: props.theme.controlColorHovered
  }, evaluateStyle(props.userStyle, props));
});
//# sourceMappingURL=styled-components.js.map