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
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme, evaluateStyle } from '../theme';
var BUTTON_TYPE = {
  NORMAL: 0,
  PRIMARY: 1,
  WARNING: 2,
  MUTED: 3
};

function getBackgroundColor(props) {
  if (props.type === BUTTON_TYPE.MUTED) {
    return props.theme.background;
  }

  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  switch (props.type) {
    case BUTTON_TYPE.PRIMARY:
      return props.isHovered ? props.theme.primary500 : props.theme.controlColorActive;

    case BUTTON_TYPE.WARNING:
      return props.isHovered ? props.theme.warning500 : props.theme.warning400;

    case BUTTON_TYPE.NORMAL:
    default:
      return props.isHovered ? props.theme.controlColorHovered : props.theme.controlColorPrimary;
  }
}

function getTextColor(props) {
  if (props.type !== BUTTON_TYPE.MUTED) {
    return props.theme.textColorInvert;
  }

  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  }

  if (props.isHovered) {
    return props.theme.controlColorHovered;
  }

  return props.theme.controlColorPrimary;
}

var WrapperComponent = styled.button(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    outline: 'none',
    display: 'inline-block',
    boxSizing: 'border-box',
    border: 'none',
    paddingLeft: props.theme.spacingNormal,
    paddingRight: props.theme.spacingNormal,
    height: props.size,
    lineHeight: "".concat(props.size, "px"),
    textAlign: 'center',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    background: getBackgroundColor(props),
    color: getTextColor(props)
  }, evaluateStyle(props.userStyle, props));
});

var Button = function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Button)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isHovered: false
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseEnter", function () {
      return _this.setState({
        isHovered: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseLeave", function () {
      return _this.setState({
        isHovered: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onFocus", function () {
      return _this.setState({
        hasFocus: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function () {
      return _this.setState({
        hasFocus: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function () {
      _this.props.onChange(!_this.props.value);
    });

    return _this;
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          type = _this$props.type,
          className = _this$props.className,
          style = _this$props.style,
          isEnabled = _this$props.isEnabled,
          onClick = _this$props.onClick;
      var _style$size = style.size,
          size = _style$size === void 0 ? theme.controlSize + theme.spacingTiny * 2 : _style$size;
      var styleProps = {
        type: type,
        theme: theme,
        size: size,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
      };
      return React.createElement(WrapperComponent, _extends({
        className: className,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onClick: onClick,
        userStyle: style.wrapper
      }, styleProps), this.props.children);
    }
  }]);

  return Button;
}(PureComponent);

_defineProperty(Button, "propTypes", {
  type: PropTypes.oneOf(Object.values(BUTTON_TYPE)),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(Button, "defaultProps", {
  type: BUTTON_TYPE.NORMAL,
  className: '',
  style: {},
  isEnabled: true
});

var ThemedButton = withTheme(Button);
Object.assign(ThemedButton, BUTTON_TYPE);
export default ThemedButton;
//# sourceMappingURL=index.js.map