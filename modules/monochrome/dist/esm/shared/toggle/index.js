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
var WrapperComponent = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, evaluateStyle(props.userStyle, props));
});
var ToggleComponent = styled.div(function (props) {
  return _objectSpread2({
    outline: 'none',
    position: 'relative',
    height: props.knobSize,
    width: props.knobSize * 2,
    flexShrink: 0
  }, evaluateStyle(props.userStyle, props));
});
var ToggleTrack = styled.div(function (props) {
  return _objectSpread2({
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: 2,
    background: props.isEnabled ? props.value ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    top: '50%',
    transform: 'translateY(-50%)'
  }, evaluateStyle(props.userStyle, props));
});
var ToggleKnob = styled.div(function (props) {
  return _objectSpread2({
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
  }, evaluateStyle(props.userStyle, props));
});

var Toggle = function (_PureComponent) {
  _inherits(Toggle, _PureComponent);

  function Toggle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Toggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Toggle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasFocus: false,
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

    _defineProperty(_assertThisInitialized(_this), "_onKeyDown", function (evt) {
      if (evt.keyCode === 32) {
        _this.props.onChange(!_this.props.value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function () {
      _this.props.onChange(!_this.props.value);
    });

    return _this;
  }

  _createClass(Toggle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          className = _this$props.className,
          style = _this$props.style,
          value = _this$props.value,
          label = _this$props.label,
          isEnabled = _this$props.isEnabled;
      var _style$knobSize = style.knobSize,
          knobSize = _style$knobSize === void 0 ? theme.controlSize : _style$knobSize;
      var styleProps = {
        theme: theme,
        knobSize: knobSize,
        value: value,
        isHovered: this.state.isHovered,
        hasFocus: this.state.hasFocus,
        isEnabled: isEnabled
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
  }]);

  return Toggle;
}(PureComponent);

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
  onChange: function onChange() {}
});

export default withTheme(Toggle);
//# sourceMappingURL=index.js.map