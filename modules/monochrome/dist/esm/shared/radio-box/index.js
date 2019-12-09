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
import RadioBoxItem from './radio-box-item';
var WrapperComponent = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled
  }, evaluateStyle(props.userStyle, props));
});

var RadioBox = function (_PureComponent) {
  _inherits(RadioBox, _PureComponent);

  function RadioBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RadioBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RadioBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (value) {
      _this.props.onChange(value);
    });

    return _this;
  }

  _createClass(RadioBox, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          theme = _this$props.theme,
          className = _this$props.className,
          style = _this$props.style,
          data = _this$props.data,
          value = _this$props.value,
          isEnabled = _this$props.isEnabled;
      var _style$size = style.size,
          size = _style$size === void 0 ? theme.controlSize : _style$size;
      var styleProps = {
        theme: theme,
        size: size,
        value: value,
        isEnabled: isEnabled
      };
      return React.createElement(WrapperComponent, _extends({
        className: className
      }, styleProps, {
        userStyle: style.wrapper
      }), Object.keys(data).map(function (key) {
        return React.createElement(RadioBoxItem, {
          key: key,
          label: data[key],
          theme: theme,
          size: size,
          style: style,
          isSelected: key === value,
          isEnabled: isEnabled,
          onClick: function onClick() {
            return _this2._onClick(key);
          }
        });
      }));
    }
  }]);

  return RadioBox;
}(PureComponent);

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
  onChange: function onChange() {}
});

export default withTheme(RadioBox);
//# sourceMappingURL=index.js.map