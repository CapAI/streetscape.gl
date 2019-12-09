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
import { DropdownIcon as DefaultDropdownIcon } from '../icons';

function getControlColor(props) {
  if (!props.isEnabled) {
    return props.theme.controlColorDisabled;
  } else if (props.hasFocus) {
    return props.theme.controlColorActive;
  } else if (props.isHovered) {
    return props.theme.controlColorHovered;
  }

  return props.theme.controlColorPrimary;
}

var WrapperComponent = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    pointerEvents: props.isEnabled ? 'all' : 'none'
  }, evaluateStyle(props.userStyle, props));
});
var DropdownBorder = styled.div(function (props) {
  return _objectSpread2({
    position: 'relative',
    width: '100%',
    height: props.height,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: getControlColor(props)
  }, evaluateStyle(props.userStyle, props));
});
var DropdownInput = styled.select(function (props) {
  return _objectSpread2({
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    lineHeight: "".concat(props.height, "px"),
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    appearance: 'none',
    background: props.theme.background,
    border: 'none',
    outline: 0,
    paddingLeft: props.theme.spacingSmall,
    paddingRight: props.theme.spacingLarge
  }, evaluateStyle(props.userStyle, props));
});
var DropdownIcon = styled.div(function (props) {
  return _objectSpread2({
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: getControlColor(props),
    padding: props.theme.spacingSmall,
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: '16px',
    path: {
      fill: 'currentColor'
    }
  }, evaluateStyle(props.userStyle, props));
});

var Dropdown = function (_PureComponent) {
  _inherits(Dropdown, _PureComponent);

  function Dropdown() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Dropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (event) {
      var onChange = _this.props.onChange;
      onChange(event.target.value);
    });

    return _this;
  }

  _createClass(Dropdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          className = _this$props.className,
          data = _this$props.data,
          value = _this$props.value,
          isEnabled = _this$props.isEnabled;
      var _style$height = style.height,
          height = _style$height === void 0 ? theme.controlSize + theme.spacingTiny * 2 : _style$height;
      var styleProps = {
        theme: theme,
        height: height,
        hasFocus: this.state.hasFocus,
        isHovered: this.state.isHovered,
        isEnabled: isEnabled
      };
      return React.createElement(WrapperComponent, _extends({
        className: className,
        userStyle: style.wrapper
      }, styleProps), React.createElement(DropdownBorder, _extends({
        userStyle: style.border
      }, styleProps, {
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave
      }), React.createElement(DropdownInput, _extends({
        userStyle: style.select
      }, styleProps, {
        tabIndex: isEnabled ? 0 : -1,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onChange: this._onChange,
        value: value
      }), Object.keys(data).map(function (key) {
        return React.createElement("option", {
          key: key,
          value: key
        }, data[key]);
      })), React.createElement(DropdownIcon, _extends({
        userStyle: style.icon
      }, styleProps), style.iconArrow || React.createElement(DefaultDropdownIcon, null))));
    }
  }]);

  return Dropdown;
}(PureComponent);

_defineProperty(Dropdown, "propTypes", {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  isEnabled: PropTypes.bool
});

_defineProperty(Dropdown, "defaultProps", {
  className: '',
  style: {},
  isEnabled: true,
  onChange: function onChange() {}
});

export default withTheme(Dropdown);
//# sourceMappingURL=index.js.map