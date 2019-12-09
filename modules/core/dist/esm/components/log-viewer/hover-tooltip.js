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
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import { withTheme, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
var TooltipContainer = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    position: 'absolute',
    pointerEvents: 'none',
    margin: props.theme.spacingNormal,
    padding: props.theme.spacingNormal,
    maxWidth: 320,
    overflow: 'hidden',
    background: props.theme.background,
    color: props.theme.textColorPrimary,
    zIndex: 100001
  }, evaluateStyle(props.userStyle, props));
});
var KEY_BLACKLIST = new Set(['vertices', 'base', 'style', 'state', 'index', 'id', 'object_id']);

var HoverTooltip = function (_PureComponent) {
  _inherits(HoverTooltip, _PureComponent);

  function HoverTooltip() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HoverTooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HoverTooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_renderContent", function (info) {
      var streamName = info.layer.props.streamName;

      if (!streamName) {
        return React.createElement("div", null, React.createElement("b", null, info.layer.id));
      }

      var objectId = info.object.base && info.object.base.object_id;
      return [React.createElement("div", {
        key: "-stream-"
      }, React.createElement("div", null, React.createElement("b", null, "stream")), streamName), objectId ? React.createElement("div", {
        key: "-id-"
      }, React.createElement("div", null, React.createElement("b", null, "id")), objectId) : null, React.createElement("hr", {
        key: "-separator-"
      })].concat(_this._renderEntries(info.object.base), _this._renderEntries(info.object));
    });

    return _this;
  }

  _createClass(HoverTooltip, [{
    key: "_renderEntries",
    value: function _renderEntries(object) {
      if (!object) {
        return null;
      }

      return Object.keys(object).filter(function (key) {
        return !KEY_BLACKLIST.has(key) && object[key] !== undefined;
      }).map(function (key) {
        return React.createElement("div", {
          key: key
        }, React.createElement("div", null, React.createElement("b", null, key)), String(object[key]));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          info = _this$props.info,
          style = _this$props.style,
          _this$props$renderCon = _this$props.renderContent,
          renderContent = _this$props$renderCon === void 0 ? this._renderContent : _this$props$renderCon;
      return React.createElement(TooltipContainer, {
        theme: theme,
        style: {
          left: info.x,
          top: info.y
        },
        userStyle: style
      }, renderContent(info));
    }
  }]);

  return HoverTooltip;
}(PureComponent);

export default withTheme(HoverTooltip);
//# sourceMappingURL=hover-tooltip.js.map