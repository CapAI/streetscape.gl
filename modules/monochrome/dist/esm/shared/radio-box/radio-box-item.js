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
import { evaluateStyle } from '../theme';
var RadioItem = styled.div(function (props) {
  return _objectSpread2({
    outline: 'none',
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: props.theme.spacingTiny,
    marginBottom: props.theme.spacingTiny
  }, evaluateStyle(props.userStyle, props));
});
var RadioButton = styled.div(function (props) {
  var color = props.theme.controlColorPrimary;

  if (!props.isEnabled) {
    color = props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    color = props.theme.controlColorActive;
  } else if (props.isHovered) {
    color = props.theme.controlColorHovered;
  }

  return _objectSpread2({
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '50%',
    width: props.size,
    height: props.size,
    marginLeft: props.theme.spacingSmall,
    background: props.theme.background,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: color,
    color: color,
    flexShrink: 0
  }, evaluateStyle(props.userStyle, props));
});
var RadioIcon = styled.div(function (props) {
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

var RadioBoxItem = function (_PureComponent) {
  _inherits(RadioBoxItem, _PureComponent);

  function RadioBoxItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RadioBoxItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RadioBoxItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
        _this.props.onClick(evt);
      }
    });

    return _this;
  }

  _createClass(RadioBoxItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          size = _this$props.size,
          isSelected = _this$props.isSelected,
          label = _this$props.label,
          isEnabled = _this$props.isEnabled;
      var styleProps = {
        theme: theme,
        size: size,
        isSelected: isSelected,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
      };
      return React.createElement(RadioItem, _extends({}, styleProps, {
        userStyle: style.item,
        tabIndex: isEnabled ? 0 : -1,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown,
        onClick: this.props.onClick
      }), label, React.createElement(RadioButton, _extends({}, styleProps, {
        userStyle: style.button
      }), React.createElement(RadioIcon, _extends({}, styleProps, {
        userStyle: style.icon
      }), isSelected ? style.iconSelected || '●' : null)));
    }
  }]);

  return RadioBoxItem;
}(PureComponent);

_defineProperty(RadioBoxItem, "propTypes", {
  onClick: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool,
  isSelected: PropTypes.bool
});

_defineProperty(RadioBoxItem, "defaultProps", {
  style: {},
  isEnabled: true,
  onClick: function onClick() {}
});

export { RadioBoxItem as default };
//# sourceMappingURL=radio-box-item.js.map