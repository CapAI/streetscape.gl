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
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
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
import { CheckBox, Dropdown, RadioBox, Slider, TextBox, Toggle, Label } from '../shared';
import { Title, Heading, Separator } from './styled-components';
import styled from '@emotion/styled';
import { evaluateStyle } from '../shared/theme';
var InputContainer = styled.div(function (props) {
  return _objectSpread2({
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: props.level * props.theme.spacingLarge,
    marginBottom: props.theme.spacingSmall,
    '>label': {
      marginTop: props.theme.spacingTiny,
      marginRight: props.theme.spacingSmall
    },
    '>label + div': {
      flexGrow: 1,
      maxWidth: 320
    }
  }, evaluateStyle(props.userStyle, props));
});

var Input = function (_PureComponent) {
  _inherits(Input, _PureComponent);

  function Input(_props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (value) {
      _this.props.onChange(_this.props.name, value);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderTitle", function (props, userStyle) {
      return React.createElement(Title, _extends({}, props, {
        userStyle: userStyle
      }), props.title);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderHeading", function (props, userStyle) {
      return React.createElement(Heading, _extends({}, props, {
        userStyle: userStyle
      }), props.title);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderSeparator", function (props, userStyle) {
      return React.createElement(Separator, _extends({}, props, {
        userStyle: userStyle
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_renderToggle", function (props, style) {
      var _this$props = _this.props,
          label = _this$props.label,
          onTitle = _this$props.onTitle,
          offTitle = _this$props.offTitle,
          value = _this$props.value,
          className = _this$props.className;
      var labelText = (value ? onTitle : offTitle) || label;
      return React.createElement(Toggle, _extends({}, props, {
        style: style,
        className: className,
        label: _this._renderLabel(labelText),
        onChange: _this._onChange
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_renderSlider", function (props, style) {
      return [_this._renderLabel(), React.createElement(Slider, _extends({
        key: "slider"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });

    _defineProperty(_assertThisInitialized(_this), "_renderDropdown", function (props, style) {
      return [_this._renderLabel(), React.createElement(Dropdown, _extends({
        key: "dropdown"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });

    _defineProperty(_assertThisInitialized(_this), "_renderRadio", function (props, style) {
      return [_this._renderLabel(), React.createElement(RadioBox, _extends({
        key: "radio"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });

    _defineProperty(_assertThisInitialized(_this), "_renderTextBox", function (props, style) {
      return [_this._renderLabel(), React.createElement(TextBox, _extends({
        key: "textbox"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });

    _defineProperty(_assertThisInitialized(_this), "_renderCheckbox", function (props, style) {
      return React.createElement(CheckBox, _extends({}, props, {
        label: _this._renderLabel(),
        style: style,
        onChange: _this._onChange
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_renderCustom", function () {
      return _this.props.render(_this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderLabel", function () {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.label;
      var _this$props2 = _this.props,
          isEnabled = _this$props2.isEnabled,
          tooltip = _this$props2.tooltip,
          badge = _this$props2.badge,
          style = _this$props2.style;
      return label && React.createElement(Label, {
        key: "label",
        isEnabled: isEnabled,
        tooltip: tooltip,
        badge: badge,
        style: style.label
      }, label);
    });

    _this.renders = {
      title: _this._renderTitle,
      header: _this._renderHeading,
      separator: _this._renderSeparator,
      toggle: _this._renderToggle,
      text: _this._renderTextBox,
      range: _this._renderSlider,
      select: _this._renderDropdown,
      radio: _this._renderRadio,
      checkbox: _this._renderCheckbox,
      custom: _this._renderCustom
    };
    return _this;
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          style = _this$props3.style,
          type = _this$props3.type,
          onChange = _this$props3.onChange,
          label = _this$props3.label,
          tooltip = _this$props3.tooltip,
          badge = _this$props3.badge,
          otherProps = _objectWithoutProperties(_this$props3, ["style", "type", "onChange", "label", "tooltip", "badge"]);

      var render = this.renders[type];

      if (!render) {
        throw new Error("Unknown setting type ".concat(type));
      }

      var inputStyle = style[type];
      return React.createElement(InputContainer, _extends({}, otherProps, {
        userStyle: style.item
      }), render(otherProps, inputStyle));
    }
  }]);

  return Input;
}(PureComponent);

_defineProperty(Input, "propTypes", {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired
});

_defineProperty(Input, "defaultProps", {
  className: ''
});

export { Input as default };
//# sourceMappingURL=input.js.map