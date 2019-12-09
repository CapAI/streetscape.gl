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

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theme = require("../shared/theme");

var _icons = require("../shared/icons");

var _input = _interopRequireDefault(require("./input"));

var _styledComponents = require("./styled-components");

var SETTING_STYLES = {
  position: 'relative'
};

var Form = function (_PureComponent) {
  (0, _inherits2["default"])(Form, _PureComponent);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      collapsed: {}
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (settingName, newValue) {
      _this.props.onChange((0, _defineProperty2["default"])({}, settingName, newValue));
    });
    return _this;
  }

  (0, _createClass2["default"])(Form, [{
    key: "toggleCollapsed",
    value: function toggleCollapsed(_ref) {
      var settingName = _ref.settingName,
          collapsed = _ref.collapsed;
      var newCollapsedState = (0, _objectSpread5["default"])({}, this.state.collapsed, (0, _defineProperty2["default"])({}, settingName, !collapsed));
      this.setState({
        collapsed: newCollapsedState
      });
    }
  }, {
    key: "_renderSetting",
    value: function _renderSetting(_ref2) {
      var _this2 = this;

      var settingName = _ref2.settingName,
          setting = _ref2.setting,
          value = _ref2.value,
          _ref2$isEnabled = _ref2.isEnabled,
          isEnabled = _ref2$isEnabled === void 0 ? true : _ref2$isEnabled,
          level = _ref2.level;
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var _setting$enabled = setting.enabled,
          enabled = _setting$enabled === void 0 ? true : _setting$enabled,
          _setting$visible = setting.visible,
          visible = _setting$visible === void 0 ? true : _setting$visible,
          children = setting.children;
      var isVisible;

      if (typeof enabled === 'function') {
        isEnabled = isEnabled && enabled(this.props.values);
      } else {
        isEnabled = isEnabled && Boolean(enabled);
      }

      if (typeof visible === 'function') {
        isVisible = visible(this.props.values);
      } else {
        isVisible = Boolean(visible);
      }

      if (!isVisible) {
        return null;
      }

      var collapsed = typeof this.state.collapsed[settingName] !== 'undefined' ? this.state.collapsed[settingName] : false;

      var input = _react["default"].createElement(_input["default"], (0, _extends2["default"])({
        key: settingName
      }, setting, {
        label: setting.title || settingName,
        name: settingName,
        value: value,
        theme: theme,
        style: style,
        level: level,
        isEnabled: isEnabled,
        onChange: this._onChange
      }));

      if (!children) {
        return input;
      }

      return _react["default"].createElement("div", {
        key: settingName,
        style: SETTING_STYLES
      }, setting.collapsible && _react["default"].createElement(_styledComponents.Expander, {
        theme: theme,
        userStyle: style.expander,
        onClick: function onClick() {
          return _this2.toggleCollapsed({
            settingName: settingName,
            collapsed: collapsed
          });
        },
        isExpanded: !collapsed
      }, collapsed ? style.iconCollapsed || _react["default"].createElement(_icons.CollapsedIcon, null) : style.iconExpanded || _react["default"].createElement(_icons.ExpandedIcon, null)), input, !collapsed && this._renderSettings(children, {
        isEnabled: isEnabled,
        level: level + 1
      }));
    }
  }, {
    key: "_renderSettings",
    value: function _renderSettings(settings) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var values = this.props.values;
      var children = [];

      for (var _i = 0, _Object$keys = Object.keys(settings); _i < _Object$keys.length; _i++) {
        var settingName = _Object$keys[_i];
        var setting = settings[settingName];
        var value = values[settingName];
        var collapsed = this.state.collapsed[settingName];
        var level = opts.level || 0;

        var child = this._renderSetting((0, _objectSpread5["default"])({}, opts, {
          settingName: settingName,
          setting: setting,
          value: value,
          collapsed: collapsed,
          level: level
        }));

        children.push(child);
      }

      return children;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          style = _this$props2.style,
          data = _this$props2.data;
      return _react["default"].createElement(_styledComponents.Container, {
        theme: theme,
        userStyle: style.wrapper
      }, this._renderSettings(data));
    }
  }]);
  return Form;
}(_react.PureComponent);

(0, _defineProperty2["default"])(Form, "propTypes", {
  data: _propTypes["default"].object.isRequired,
  style: _propTypes["default"].object,
  values: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(Form, "defaultProps", {
  style: {}
});

var _default = (0, _theme.withTheme)(Form);

exports["default"] = _default;
//# sourceMappingURL=form.js.map