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
import Draggable from '../draggable';
import { clamp } from '../../utils/math';

function snap(x, min, max, step) {
  if (step > 0) {
    x = Math.round((x - min) / step) * step + min;
  }

  return clamp(x, min, max);
}

var SliderWrapper = styled.div(function (props) {
  return _objectSpread2({}, props.theme.__reset__, {
    outline: 'none',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    paddingTop: props.knobSize / 2,
    paddingBottom: props.knobSize / 2
  }, evaluateStyle(props.userStyle, props));
});
var SliderTrack = styled.div(function (props) {
  return _objectSpread2({
    position: 'relative',
    width: '100%',
    background: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    height: 2
  }, evaluateStyle(props.userStyle, props));
});
var SliderTrackFill = styled.div(function (props) {
  return _objectSpread2({
    position: 'absolute',
    transitionProperty: 'width',
    transitionDuration: props.isDragging ? '0s' : props.theme.transitionDuration,
    transitionTimingFunction: props.theme.transitionTimingFunction,
    height: '100%',
    background: props.isEnabled ? props.theme.controlColorActive : props.theme.controlColorDisabled
  }, evaluateStyle(props.userStyle, props));
});
var SliderKnob = styled.div(function (props) {
  return _objectSpread2({
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: props.isEnabled ? props.isHovered ? props.theme.controlColorHovered : props.hasFocus ? props.theme.controlColorActive : props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    background: props.theme.background,
    boxSizing: 'border-box',
    width: props.knobSize,
    height: props.knobSize,
    borderRadius: '50%',
    margin: -props.knobSize / 2,
    top: '50%',
    transitionProperty: 'left',
    transitionDuration: props.isDragging ? '0s' : props.theme.transitionDuration
  }, evaluateStyle(props.userStyle, props));
});

var Slider = function (_PureComponent) {
  _inherits(Slider, _PureComponent);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      width: 1,
      isHovered: false,
      hasFocus: false,
      isDragging: false,
      hasDragged: false
    });

    _defineProperty(_assertThisInitialized(_this), "_updateValue", function (offsetX, width) {
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step;
      var pos = clamp(offsetX / width, 0, 1);
      var value = snap(min + (max - min) * pos, min, max, step);

      _this.props.onChange(value);
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
      var delta;

      switch (evt.keyCode) {
        case 37:
          delta = -1;
          break;

        case 39:
          delta = 1;
          break;

        default:
          return;
      }

      var _this$props2 = _this.props,
          value = _this$props2.value,
          min = _this$props2.min,
          max = _this$props2.max;
      var step = _this.props.step || (max - min) / 20;
      var newValue = clamp(value + step * delta, min, max);

      if (newValue !== value) {
        _this.props.onChange(newValue);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragStart", function (evt) {
      var width = _this._track.clientWidth;

      _this.setState({
        width: width
      });

      _this._updateValue(evt.offsetX, width);

      _this.setState({
        isDragging: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onDrag", function (evt) {
      _this._updateValue(evt.offsetX, _this.state.width);

      _this.setState({
        hasDragged: evt.hasDragged
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragEnd", function (evt) {
      _this.setState({
        isDragging: false,
        hasDragged: false
      });
    });

    return _this;
  }

  _createClass(Slider, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          value = _this$props3.value,
          min = _this$props3.min,
          max = _this$props3.max,
          step = _this$props3.step,
          isEnabled = _this$props3.isEnabled,
          children = _this$props3.children,
          className = _this$props3.className,
          style = _this$props3.style,
          theme = _this$props3.theme;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          isDragging = _this$state.isDragging,
          hasFocus = _this$state.hasFocus,
          hasDragged = _this$state.hasDragged;
      var _style$tolerance = style.tolerance,
          tolerance = _style$tolerance === void 0 ? 0 : _style$tolerance,
          _style$knobSize = style.knobSize,
          knobSize = _style$knobSize === void 0 ? theme.controlSize : _style$knobSize;
      var ratio = (snap(value, min, max, step) - min) / (max - min);
      var styleProps = {
        theme: theme,
        knobSize: knobSize,
        isEnabled: isEnabled,
        isHovered: isHovered,
        hasFocus: hasFocus,
        isActive: isDragging,
        isDragging: hasDragged
      };
      return React.createElement(SliderWrapper, _extends({}, styleProps, {
        userStyle: style.wrapper,
        className: className,
        tabIndex: isEnabled ? 0 : -1,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown
      }), React.createElement(Draggable, {
        tolerance: knobSize / 2 + tolerance,
        onDragStart: this._onDragStart,
        onDrag: this._onDrag,
        onDragEnd: this._onDragEnd
      }, React.createElement(SliderTrack, _extends({
        userStyle: style.track
      }, styleProps, {
        ref: function ref(_ref) {
          _this2._track = _ref;
        }
      }), children, React.createElement(SliderTrackFill, _extends({}, styleProps, {
        userStyle: style.trackFill,
        style: {
          width: "".concat(ratio * 100, "%")
        }
      })), React.createElement(SliderKnob, _extends({}, styleProps, {
        userStyle: style.knob,
        style: {
          left: "".concat(ratio * 100, "%")
        }
      })))));
    }
  }]);

  return Slider;
}(PureComponent);

_defineProperty(Slider, "propTypes", {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  step: PropTypes.number,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  badge: PropTypes.element,
  isEnabled: PropTypes.bool
});

_defineProperty(Slider, "defaultProps", {
  className: '',
  style: {},
  step: 0,
  isEnabled: true,
  onChange: function onChange() {}
});

export default withTheme(Slider);
//# sourceMappingURL=index.js.map