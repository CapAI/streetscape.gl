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
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
import RadioBoxItem from './radio-box-item';
const WrapperComponent = styled.div(props => _objectSpread2({}, props.theme.__reset__, {
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
}, evaluateStyle(props.userStyle, props)));

class RadioBox extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", value => {
      this.props.onChange(value);
    });
  }

  render() {
    const {
      theme,
      className,
      style,
      data,
      value,
      isEnabled
    } = this.props;
    const {
      size = theme.controlSize
    } = style;
    const styleProps = {
      theme,
      size,
      value,
      isEnabled
    };
    return React.createElement(WrapperComponent, _extends({
      className: className
    }, styleProps, {
      userStyle: style.wrapper
    }), Object.keys(data).map(key => React.createElement(RadioBoxItem, {
      key: key,
      label: data[key],
      theme: theme,
      size: size,
      style: style,
      isSelected: key === value,
      isEnabled: isEnabled,
      onClick: () => this._onClick(key)
    })));
  }

}

_defineProperty(RadioBox, "propTypes", {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(RadioBox, "defaultProps", {
  className: '',
  style: {},
  isEnabled: true,
  onChange: () => {}
});

export default withTheme(RadioBox);
//# sourceMappingURL=index.js.map