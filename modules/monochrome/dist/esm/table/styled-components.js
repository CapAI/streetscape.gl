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
  return _objectSpread2({}, props.theme.__reset__, {
    display: 'flex',
    flexDirection: 'column'
  }, evaluateStyle(props.userStyle, props));
});
export var TableBody = styled.div(function (props) {
  return _objectSpread2({
    flex: '1 1 auto'
  }, evaluateStyle(props.userStyle, props));
});
export var HeaderContainer = styled.div(function (props) {
  return _objectSpread2({
    display: 'table',
    flex: '0 0 auto'
  }, evaluateStyle(props.userStyle, props));
});
export var HeaderCell = styled.div(function (props) {
  return _objectSpread2({
    cursor: 'pointer',
    display: 'table-cell',
    position: 'relative',
    fontWeight: 'bold',
    background: props.isAscending || props.isDescending ? props.theme.controlColorActive : props.theme.controlColorPrimary,
    color: props.theme.textColorInvert,
    paddingTop: props.theme.spacingTiny,
    paddingBottom: props.theme.spacingTiny,
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingSmall,
    '&:hover': {
      background: props.theme.controlColorHovered
    }
  }, evaluateStyle(props.userStyle, props));
});
export var SortIcon = styled.div(function (props) {
  return _objectSpread2({
    position: 'absolute',
    right: props.theme.spacingTiny,
    bottom: props.theme.spacingTiny
  }, evaluateStyle(props.userStyle, props));
});
export var TableRowComponent = styled.div(function (props) {
  return _objectSpread2({
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: props.theme.controlColorSecondary
  }, evaluateStyle(props.userStyle, props));
});
export var TableCell = styled.div(function (props) {
  return _objectSpread2({
    flex: '0 0 auto',
    overflow: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
    paddingTop: props.theme.spacingTiny,
    paddingBottom: props.theme.spacingTiny,
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingSmall,
    borderLeftStyle: 'solid',
    borderLeftWidth: props.index === 0 ? 0 : 1,
    borderLeftColor: props.theme.controlColorSecondary
  }, evaluateStyle(props.userStyle, props));
});
export var Expander = styled.div(function (props) {
  return _objectSpread2({
    position: 'absolute',
    cursor: 'pointer',
    left: -props.theme.spacingSmall
  }, evaluateStyle(props.userStyle, props));
});
//# sourceMappingURL=styled-components.js.map