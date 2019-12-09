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
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { withTheme, evaluateStyle } from '../theme';
var spin = keyframes(_templateObject());
var PreLoader = styled.div(function (props) {
  return _objectSpread2({
    width: props.size,
    height: props.size,
    marginLeft: -props.size / 2,
    marginTop: props.theme.spacingNormal,
    marginBottom: props.theme.spacingNormal,
    left: '50%',
    borderRadius: '50%',
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: props.theme.controlColorActive,
    clipPath: 'polygon(50% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
    animation: "".concat(spin, " 1s ease infinite")
  }, evaluateStyle(props.userStyle, props));
});

var Spinner = function (_PureComponent) {
  _inherits(Spinner, _PureComponent);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, _getPrototypeOf(Spinner).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var _style$size = style.size,
          size = _style$size === void 0 ? 32 : _style$size;
      return React.createElement(PreLoader, {
        size: size,
        theme: theme,
        userStyle: style
      });
    }
  }]);

  return Spinner;
}(PureComponent);

_defineProperty(Spinner, "propTypes", {
  style: PropTypes.object
});

_defineProperty(Spinner, "defaultProps", {
  style: {}
});

export default withTheme(Spinner);
//# sourceMappingURL=index.js.map