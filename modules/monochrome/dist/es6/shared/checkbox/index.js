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
import { CheckIcon, IndeterminateIcon } from '../icons';
const CHECKBOX_STATE = {
  OFF: 'off',
  INDETERMINATE: 'indeterminate',
  ON: 'on'
};
const CheckBoxComponent = styled.div(props => _objectSpread2({}, props.theme.__reset__, {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
}, evaluateStyle(props.userStyle, props)));
const CheckBoxBorder = styled.div(props => {
  let color = props.theme.controlColorPrimary;

  if (!props.isEnabled) {
    color = props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    color = props.theme.controlColorActive;
  } else if (props.isHovered) {
    color = props.theme.controlColorHovered;
  }

  return _objectSpread2({
    outline: 'none',
    display: 'inline-block',
    position: 'relative',
    width: props.size,
    height: props.size,
    flexGrow: 0,
    flexShrink: 0,
    marginRight: props.theme.spacingSmall,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: color,
    color
  }, evaluateStyle(props.userStyle, props));
});
const CheckBoxIcon = styled.div(props => _objectSpread2({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  width: 16,
  height: 16,
  textAlign: 'center',
  lineHeight: '16px',
  path: {
    fill: 'currentColor'
  }
}, evaluateStyle(props.userStyle, props)));

class CheckBox extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hasFocus: false,
      isHovered: false
    });

    _defineProperty(this, "_onMouseEnter", () => this.setState({
      isHovered: true
    }));

    _defineProperty(this, "_onMouseLeave", () => this.setState({
      isHovered: false
    }));

    _defineProperty(this, "_onFocus", () => this.setState({
      hasFocus: true
    }));

    _defineProperty(this, "_onBlur", () => this.setState({
      hasFocus: false
    }));

    _defineProperty(this, "_onKeyDown", evt => {
      if (evt.keyCode === 32) {
        this._onClick(evt);
      }
    });

    _defineProperty(this, "_onClick", event => {
      this.props.onChange(this.props.value === CHECKBOX_STATE.ON ? CHECKBOX_STATE.OFF : CHECKBOX_STATE.ON);
    });
  }

  render() {
    const {
      value,
      style,
      className,
      theme,
      label,
      isEnabled
    } = this.props;
    const {
      size = theme.controlSize
    } = style;
    const styleProps = {
      theme,
      value,
      size,
      hasFocus: this.state.hasFocus,
      isHovered: this.state.isHovered,
      isEnabled
    };
    return React.createElement(CheckBoxComponent, _extends({
      className: className,
      userStyle: style.wrapper
    }, styleProps, {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick
    }), React.createElement(CheckBoxBorder, _extends({
      userStyle: style.border
    }, styleProps, {
      tabIndex: isEnabled ? 0 : -1,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onKeyDown: this._onKeyDown
    }), React.createElement(CheckBoxIcon, _extends({
      userStyle: style.icon
    }, styleProps), value === CHECKBOX_STATE.ON && (style.iconOn || React.createElement(CheckIcon, null)), value === CHECKBOX_STATE.OFF && style.iconOff, value === CHECKBOX_STATE.INDETERMINATE && (style.iconIndeterminate || React.createElement(IndeterminateIcon, null)))), label);
  }

}

_defineProperty(CheckBox, "propTypes", {
  value: PropTypes.oneOf([CHECKBOX_STATE.OFF, CHECKBOX_STATE.INDETERMINATE, CHECKBOX_STATE.ON]).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.node,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(CheckBox, "defaultProps", {
  className: '',
  value: CHECKBOX_STATE.OFF,
  label: '',
  style: {},
  isEnabled: true,
  onChange: () => {}
});

const ThemedCheckBox = withTheme(CheckBox);
Object.assign(ThemedCheckBox, CHECKBOX_STATE);
export default ThemedCheckBox;
//# sourceMappingURL=index.js.map