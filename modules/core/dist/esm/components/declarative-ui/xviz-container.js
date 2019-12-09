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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var XVIZContainer = function (_PureComponent) {
  _inherits(XVIZContainer, _PureComponent);

  function XVIZContainer() {
    _classCallCheck(this, XVIZContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(XVIZContainer).apply(this, arguments));
  }

  _createClass(XVIZContainer, [{
    key: "render",
    value: function render() {
      var layout = this.props.layout;
      var layoutStyle = {
        display: 'flex',
        width: '100%'
      };
      var childStyle = {};

      switch (layout.toUpperCase()) {
        case 'VERTICAL':
          layoutStyle.flexDirection = 'column';
          childStyle.flex = '0 0 auto';
          break;

        case 'HORIZONTAL':
          layoutStyle.flexDirection = 'row';
          childStyle.flex = '1 1 auto';
          break;

        default:
          return null;
      }

      return React.createElement("div", {
        className: "xviz-container",
        style: layoutStyle
      }, React.Children.map(this.props.children, function (child) {
        return React.createElement("div", {
          style: childStyle
        }, child);
      }));
    }
  }]);

  return XVIZContainer;
}(PureComponent);

_defineProperty(XVIZContainer, "propTypes", {
  layout: PropTypes.string
});

_defineProperty(XVIZContainer, "defaultProps", {
  layout: 'VERTICAL'
});

export { XVIZContainer as default };
//# sourceMappingURL=xviz-container.js.map