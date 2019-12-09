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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import { evaluateStyle } from '../theme';
import Popover from './popover';

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: "render",
    value: function render() {
      var style = this.props.style;

      var tooltipStyle = _objectSpread2({}, style, {
        body: function body(props) {
          return _objectSpread2({
            maxWidth: 300,
            paddingTop: props.theme.spacingSmall,
            paddingBottom: props.theme.spacingSmall,
            paddingLeft: props.theme.spacingNormal,
            paddingRight: props.theme.spacingNormal
          }, evaluateStyle(style.body, props));
        }
      });

      return React.createElement(Popover, _extends({}, this.props, {
        style: tooltipStyle,
        trigger: Popover.HOVER
      }));
    }
  }]);

  return Tooltip;
}(React.Component);

_defineProperty(Tooltip, "propTypes", Popover.propTypes);

_defineProperty(Tooltip, "defaultProps", {
  style: {},
  position: Popover.AUTO
});

export default Tooltip;
//# sourceMappingURL=tooltip.js.map