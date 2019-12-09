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
import { CheckIcon, IndeterminateIcon } from '../icons';
var CHECKBOX_STATE = {
  OFF: 'off',
  INDETERMINATE: 'indeterminate',
  ON: 'on'
};
var CheckBoxComponent = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, evaluateStyle(props.userStyle, props));
});
var CheckBoxBorder = styled.div(function (props) {
  var color = props.theme.controlColorPrimary;

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
    color: color
  }, evaluateStyle(props.userStyle, props));
});
var CheckBoxIcon = styled.div(function (props) {
  return _objectSpread2({
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
  }, evaluateStyle(props.userStyle, props));
});

var CheckBox = function (_PureComponent) {
  _inherits(CheckBox, _PureComponent);

  function CheckBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CheckBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CheckBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
        _this._onClick(evt);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (event) {
      _this.props.onChange(_this.props.value === CHECKBOX_STATE.ON ? CHECKBOX_STATE.OFF : CHECKBOX_STATE.ON);
    });

    return _this;
  }

  _createClass(CheckBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          style = _this$props.style,
          className = _this$props.className,
          theme = _this$props.theme,
          label = _this$props.label,
          isEnabled = _this$props.isEnabled;
      var _style$size = style.size,
          size = _style$size === void 0 ? theme.controlSize : _style$size;
      var styleProps = {
        theme: theme,
        value: value,
        size: size,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
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
  }]);

  return CheckBox;
}(PureComponent);

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
  onChange: function onChange() {}
});

var ThemedCheckBox = withTheme(CheckBox);
Object.assign(ThemedCheckBox, CHECKBOX_STATE);
export default ThemedCheckBox;
//# sourceMappingURL=index.js.map