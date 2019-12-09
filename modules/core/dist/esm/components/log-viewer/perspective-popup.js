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
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React from 'react';
import { Popup } from 'react-map-gl';
import { withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
var ANCHOR_POSITION = {
  top: {
    x: 0.5,
    y: 0
  },
  'top-left': {
    x: 0,
    y: 0
  },
  'top-right': {
    x: 1,
    y: 0
  },
  bottom: {
    x: 0.5,
    y: 1
  },
  'bottom-left': {
    x: 0,
    y: 1
  },
  'bottom-right': {
    x: 1,
    y: 1
  },
  left: {
    x: 0,
    y: 0.5
  },
  right: {
    x: 1,
    y: 0.5
  }
};
var PopupTip = styled.div(function (props) {
  return _objectSpread2({
    position: 'absolute',
    width: 4,
    height: 4,
    margin: -2,
    borderRadius: 2,
    background: props.color
  }, evaluateStyle(props.userStyle, props));
});
var PopupLine = styled.div(function (props) {
  return _objectSpread2({
    position: 'absolute',
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderColor: props.color
  }, evaluateStyle(props.userStyle, props));
});
var PopupContent = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    background: props.color
  }, evaluateStyle(props.userStyle, props));
});

var PerspectivePopup = function (_Popup) {
  _inherits(PerspectivePopup, _Popup);

  function PerspectivePopup() {
    _classCallCheck(this, PerspectivePopup);

    return _possibleConstructorReturn(this, _getPrototypeOf(PerspectivePopup).apply(this, arguments));
  }

  _createClass(PerspectivePopup, [{
    key: "_renderTip",
    value: function _renderTip(positionType) {
      var anchorPosition = ANCHOR_POSITION[positionType];
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var _style$objectLabelTip = style.objectLabelTipSize,
          objectLabelTipSize = _style$objectLabelTip === void 0 ? 30 : _style$objectLabelTip,
          _style$objectLabelCol = style.objectLabelColor,
          objectLabelColor = _style$objectLabelCol === void 0 ? theme.background : _style$objectLabelCol;

      var styleProps = _objectSpread2({}, this.props.styleProps, {
        theme: theme,
        color: objectLabelColor,
        position: positionType
      });

      var tipSize = evaluateStyle(objectLabelTipSize, styleProps);
      var tipStyle = {
        width: tipSize,
        height: tipSize,
        position: 'relative',
        border: 'none'
      };
      var tipCircleStyle = {};
      var tipLineStyle = {};

      switch (anchorPosition.x) {
        case 0.5:
          tipCircleStyle.left = '50%';
          tipLineStyle.left = '50%';
          break;

        case 1:
          tipCircleStyle.right = 0;
          tipLineStyle.right = 0;
          break;

        case 0:
        default:
      }

      switch (anchorPosition.y) {
        case 0.5:
          tipLineStyle.width = '100%';
          tipCircleStyle.top = '50%';
          tipLineStyle.top = '50%';
          break;

        case 1:
          tipCircleStyle.bottom = 0;
          tipLineStyle.height = '100%';
          break;

        case 0:
        default:
          tipLineStyle.height = '100%';
      }

      return React.createElement("div", {
        key: "tip",
        className: "mapboxgl-popup-tip",
        style: tipStyle
      }, React.createElement(PopupTip, _extends({
        style: tipCircleStyle
      }, styleProps, {
        userStyle: style.objectLabelTip
      })), React.createElement(PopupLine, _extends({
        style: tipLineStyle
      }, styleProps, {
        userStyle: style.objectLabelLine
      })));
    }
  }, {
    key: "_renderContent",
    value: function _renderContent() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          styleProps = _this$props2.styleProps,
          style = _this$props2.style;
      return React.createElement(PopupContent, _extends({
        key: "content",
        ref: this._contentLoaded,
        className: "mapboxgl-popup-content",
        theme: theme
      }, styleProps, {
        color: style.objectLabelColor,
        userStyle: style.objectLabelBody
      }), this.props.children);
    }
  }]);

  return PerspectivePopup;
}(Popup);

export default withTheme(PerspectivePopup);
//# sourceMappingURL=perspective-popup.js.map