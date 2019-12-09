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
const WrapperComponent = styled.div(props => _objectSpread2({}, props.theme.__reset__, {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  pointerEvents: props.isEnabled ? 'all' : 'none',
  color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
}, evaluateStyle(props.userStyle, props)));
const ToggleComponent = styled.div(props => _objectSpread2({
  outline: 'none',
  position: 'relative',
  height: props.knobSize,
  width: props.knobSize * 2,
  flexShrink: 0
}, evaluateStyle(props.userStyle, props)));
const ToggleTrack = styled.div(props => _objectSpread2({
  boxSizing: 'border-box',
  position: 'absolute',
  width: '100%',
  height: 2,
  background: props.isEnabled ? props.value ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  top: '50%',
  transform: 'translateY(-50%)'
}, evaluateStyle(props.userStyle, props)));
const ToggleKnob = styled.div(props => _objectSpread2({
  boxSizing: 'border-box',
  position: 'absolute',
  width: props.knobSize,
  height: props.knobSize,
  background: props.theme.background,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: props.isEnabled ? props.isHovered ? props.theme.controlColorHovered : props.hasFocus ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
  borderRadius: '50%',
  left: props.value ? "calc(100% - ".concat(props.knobSize, "px)") : 0,
  transitionProperty: 'left',
  transitionDuration: props.theme.transitionDuration,
  transitionTimingFunction: props.theme.transitionTimingFunction
}, evaluateStyle(props.userStyle, props)));

class Toggle extends PureComponent {
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
        this.props.onChange(!this.props.value);
      }
    });

    _defineProperty(this, "_onClick", () => {
      this.props.onChange(!this.props.value);
    });
  }

  render() {
    const {
      theme,
      className,
      style,
      value,
      label,
      isEnabled
    } = this.props;
    const {
      knobSize = theme.controlSize
    } = style;
    const styleProps = {
      theme,
      knobSize,
      value,
      isHovered: this.state.isHovered,
      hasFocus: this.state.hasFocus,
      isEnabled
    };
    return React.createElement(WrapperComponent, _extends({
      className: className,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick,
      userStyle: style.wrapper
    }, styleProps), label, React.createElement(ToggleComponent, _extends({
      userStyle: style.toggle
    }, styleProps, {
      tabIndex: isEnabled ? 0 : -1,
      onKeyDown: this._onKeyDown,
      onFocus: this._onFocus,
      onBlur: this._onBlur
    }), React.createElement(ToggleTrack, _extends({
      userStyle: style.track
    }, styleProps)), React.createElement(ToggleKnob, _extends({
      userStyle: style.knob
    }, styleProps))));
  }

}

_defineProperty(Toggle, "propTypes", {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.node,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(Toggle, "defaultProps", {
  className: '',
  value: true,
  style: {},
  isEnabled: true,
  onChange: () => {}
});

export default withTheme(Toggle);
//# sourceMappingURL=index.js.map