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
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var _draggable = _interopRequireDefault(require("../draggable"));

var _math = require("../../utils/math");

function snap(x, min, max, step) {
  if (step > 0) {
    x = Math.round((x - min) / step) * step + min;
  }

  return (0, _math.clamp)(x, min, max);
}

var SliderWrapper = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({}, props.theme.__reset__, {
    outline: 'none',
    color: props.isEnabled ? props.theme.textColorPrimary : props.theme.textColorDisabled,
    cursor: 'pointer',
    pointerEvents: props.isEnabled ? 'all' : 'none',
    paddingTop: props.knobSize / 2,
    paddingBottom: props.knobSize / 2
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var SliderTrack = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
    position: 'relative',
    width: '100%',
    background: props.isEnabled ? props.theme.controlColorPrimary : props.theme.controlColorDisabled,
    height: 2
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var SliderTrackFill = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
    position: 'absolute',
    transitionProperty: 'width',
    transitionDuration: props.isDragging ? '0s' : props.theme.transitionDuration,
    transitionTimingFunction: props.theme.transitionTimingFunction,
    height: '100%',
    background: props.isEnabled ? props.theme.controlColorActive : props.theme.controlColorDisabled
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var SliderKnob = _styled["default"].div(function (props) {
  return (0, _objectSpread6["default"])({
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
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Slider = function (_PureComponent) {
  (0, _inherits2["default"])(Slider, _PureComponent);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      width: 1,
      isHovered: false,
      hasFocus: false,
      isDragging: false,
      hasDragged: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateValue", function (offsetX, width) {
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step;
      var pos = (0, _math.clamp)(offsetX / width, 0, 1);
      var value = snap(min + (max - min) * pos, min, max, step);

      _this.props.onChange(value);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseEnter", function () {
      return _this.setState({
        isHovered: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseLeave", function () {
      return _this.setState({
        isHovered: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFocus", function () {
      return _this.setState({
        hasFocus: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBlur", function () {
      return _this.setState({
        hasFocus: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onKeyDown", function (evt) {
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
      var newValue = (0, _math.clamp)(value + step * delta, min, max);

      if (newValue !== value) {
        _this.props.onChange(newValue);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragStart", function (evt) {
      var width = _this._track.clientWidth;

      _this.setState({
        width: width
      });

      _this._updateValue(evt.offsetX, width);

      _this.setState({
        isDragging: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDrag", function (evt) {
      _this._updateValue(evt.offsetX, _this.state.width);

      _this.setState({
        hasDragged: evt.hasDragged
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragEnd", function (evt) {
      _this.setState({
        isDragging: false,
        hasDragged: false
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(Slider, [{
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
      return _react["default"].createElement(SliderWrapper, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.wrapper,
        className: className,
        tabIndex: isEnabled ? 0 : -1,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown
      }), _react["default"].createElement(_draggable["default"], {
        tolerance: knobSize / 2 + tolerance,
        onDragStart: this._onDragStart,
        onDrag: this._onDrag,
        onDragEnd: this._onDragEnd
      }, _react["default"].createElement(SliderTrack, (0, _extends2["default"])({
        userStyle: style.track
      }, styleProps, {
        ref: function ref(_ref) {
          _this2._track = _ref;
        }
      }), children, _react["default"].createElement(SliderTrackFill, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.trackFill,
        style: {
          width: "".concat(ratio * 100, "%")
        }
      })), _react["default"].createElement(SliderKnob, (0, _extends2["default"])({}, styleProps, {
        userStyle: style.knob,
        style: {
          left: "".concat(ratio * 100, "%")
        }
      })))));
    }
  }]);
  return Slider;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Slider, "propTypes", {
  value: _propTypes["default"].number.isRequired,
  min: _propTypes["default"].number.isRequired,
  max: _propTypes["default"].number.isRequired,
  onChange: _propTypes["default"].func,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  step: _propTypes["default"].number,
  label: _propTypes["default"].string,
  tooltip: _propTypes["default"].string,
  badge: _propTypes["default"].element,
  isEnabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Slider, "defaultProps", {
  className: '',
  style: {},
  step: 0,
  isEnabled: true,
  onChange: function onChange() {}
});

var _default = (0, _theme.withTheme)(Slider);

exports["default"] = _default;
//# sourceMappingURL=index.js.map