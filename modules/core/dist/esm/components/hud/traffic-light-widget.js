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
import { evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import BaseWidget from './base-widget';
var Container = styled.div(function (props) {
  return {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: props.layout === 'vertical' ? 'column' : 'row'
  };
});
var COLORS = {
  red: '#d42e22',
  yellow: '#f8ce46',
  green: '#57ad57'
};
var LightComponent = styled.div(function (props) {
  return _objectSpread2({
    boxSizing: 'border-box',
    width: props.theme.controlSize,
    height: props.theme.controlSize,
    margin: props.theme.spacingTiny,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: COLORS[props.color],
    background: props.isOn ? COLORS[props.color] : 'none'
  }, evaluateStyle(props.userStyle, props));
});

var TrafficLightWidget = function (_PureComponent) {
  _inherits(TrafficLightWidget, _PureComponent);

  function TrafficLightWidget() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TrafficLightWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TrafficLightWidget)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_render", function (_ref) {
      var theme = _ref.theme,
          streams = _ref.streams;
      var _this$props = _this.props,
          transformValue = _this$props.transformValue,
          style = _this$props.style;
      var value = streams.light.data && transformValue(streams.light.data.variable);
      var styleProps = {
        theme: theme,
        userStyle: style.light
      };
      return React.createElement(Container, {
        theme: theme,
        layout: style.layout
      }, React.createElement(LightComponent, _extends({
        key: "red",
        color: "red",
        isOn: value === 'red'
      }, styleProps)), React.createElement(LightComponent, _extends({
        key: "yellow",
        color: "yellow",
        isOn: value === 'yellow'
      }, styleProps)), React.createElement(LightComponent, _extends({
        key: "green",
        color: "green",
        isOn: value === 'green'
      }, styleProps)));
    });

    return _this;
  }

  _createClass(TrafficLightWidget, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          log = _this$props2.log,
          style = _this$props2.style,
          streamName = _this$props2.streamName;
      return React.createElement(BaseWidget, {
        log: log,
        style: style,
        streamNames: {
          light: streamName
        }
      }, this._render);
    }
  }]);

  return TrafficLightWidget;
}(PureComponent);

_defineProperty(TrafficLightWidget, "propTypes", {
  log: PropTypes.object.isRequired,
  style: PropTypes.object,
  streamName: PropTypes.string.isRequired,
  transformValue: PropTypes.func
});

_defineProperty(TrafficLightWidget, "defaultProps", {
  style: {},
  transformValue: function transformValue(x) {
    return x;
  }
});

export { TrafficLightWidget as default };
//# sourceMappingURL=traffic-light-widget.js.map