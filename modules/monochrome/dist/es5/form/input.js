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

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shared = require("../shared");

var _styledComponents = require("./styled-components");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../shared/theme");

var InputContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread3["default"])({
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
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var Input = function (_PureComponent) {
  (0, _inherits2["default"])(Input, _PureComponent);

  function Input(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Input);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Input).call(this, _props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (value) {
      _this.props.onChange(_this.props.name, value);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderTitle", function (props, userStyle) {
      return _react["default"].createElement(_styledComponents.Title, (0, _extends2["default"])({}, props, {
        userStyle: userStyle
      }), props.title);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderHeading", function (props, userStyle) {
      return _react["default"].createElement(_styledComponents.Heading, (0, _extends2["default"])({}, props, {
        userStyle: userStyle
      }), props.title);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderSeparator", function (props, userStyle) {
      return _react["default"].createElement(_styledComponents.Separator, (0, _extends2["default"])({}, props, {
        userStyle: userStyle
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderToggle", function (props, style) {
      var _this$props = _this.props,
          label = _this$props.label,
          onTitle = _this$props.onTitle,
          offTitle = _this$props.offTitle,
          value = _this$props.value,
          className = _this$props.className;
      var labelText = (value ? onTitle : offTitle) || label;
      return _react["default"].createElement(_shared.Toggle, (0, _extends2["default"])({}, props, {
        style: style,
        className: className,
        label: _this._renderLabel(labelText),
        onChange: _this._onChange
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderSlider", function (props, style) {
      return [_this._renderLabel(), _react["default"].createElement(_shared.Slider, (0, _extends2["default"])({
        key: "slider"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderDropdown", function (props, style) {
      return [_this._renderLabel(), _react["default"].createElement(_shared.Dropdown, (0, _extends2["default"])({
        key: "dropdown"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderRadio", function (props, style) {
      return [_this._renderLabel(), _react["default"].createElement(_shared.RadioBox, (0, _extends2["default"])({
        key: "radio"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderTextBox", function (props, style) {
      return [_this._renderLabel(), _react["default"].createElement(_shared.TextBox, (0, _extends2["default"])({
        key: "textbox"
      }, props, {
        style: style,
        onChange: _this._onChange
      }))];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderCheckbox", function (props, style) {
      return _react["default"].createElement(_shared.CheckBox, (0, _extends2["default"])({}, props, {
        label: _this._renderLabel(),
        style: style,
        onChange: _this._onChange
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderCustom", function () {
      return _this.props.render(_this.props);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderLabel", function () {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.label;
      var _this$props2 = _this.props,
          isEnabled = _this$props2.isEnabled,
          tooltip = _this$props2.tooltip,
          badge = _this$props2.badge,
          style = _this$props2.style;
      return label && _react["default"].createElement(_shared.Label, {
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

  (0, _createClass2["default"])(Input, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          style = _this$props3.style,
          type = _this$props3.type,
          onChange = _this$props3.onChange,
          label = _this$props3.label,
          tooltip = _this$props3.tooltip,
          badge = _this$props3.badge,
          otherProps = (0, _objectWithoutProperties2["default"])(_this$props3, ["style", "type", "onChange", "label", "tooltip", "badge"]);
      var render = this.renders[type];

      if (!render) {
        throw new Error("Unknown setting type ".concat(type));
      }

      var inputStyle = style[type];
      return _react["default"].createElement(InputContainer, (0, _extends2["default"])({}, otherProps, {
        userStyle: style.item
      }), render(otherProps, inputStyle));
    }
  }]);
  return Input;
}(_react.PureComponent);

exports["default"] = Input;
(0, _defineProperty2["default"])(Input, "propTypes", {
  onChange: _propTypes["default"].func.isRequired,
  name: _propTypes["default"].string.isRequired,
  type: _propTypes["default"].string.isRequired,
  level: _propTypes["default"].number.isRequired
});
(0, _defineProperty2["default"])(Input, "defaultProps", {
  className: ''
});
//# sourceMappingURL=input.js.map