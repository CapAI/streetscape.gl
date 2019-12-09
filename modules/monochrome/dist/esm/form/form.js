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
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../shared/theme';
import { ExpandedIcon, CollapsedIcon } from '../shared/icons';
import Input from './input';
import { Container, Expander } from './styled-components';
var SETTING_STYLES = {
  position: 'relative'
};

var Form = function (_PureComponent) {
  _inherits(Form, _PureComponent);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      collapsed: {}
    });

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (settingName, newValue) {
      _this.props.onChange(_defineProperty({}, settingName, newValue));
    });

    return _this;
  }

  _createClass(Form, [{
    key: "toggleCollapsed",
    value: function toggleCollapsed(_ref) {
      var settingName = _ref.settingName,
          collapsed = _ref.collapsed;

      var newCollapsedState = _objectSpread2({}, this.state.collapsed, _defineProperty({}, settingName, !collapsed));

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
      var input = React.createElement(Input, _extends({
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

      return React.createElement("div", {
        key: settingName,
        style: SETTING_STYLES
      }, setting.collapsible && React.createElement(Expander, {
        theme: theme,
        userStyle: style.expander,
        onClick: function onClick() {
          return _this2.toggleCollapsed({
            settingName: settingName,
            collapsed: collapsed
          });
        },
        isExpanded: !collapsed
      }, collapsed ? style.iconCollapsed || React.createElement(CollapsedIcon, null) : style.iconExpanded || React.createElement(ExpandedIcon, null)), input, !collapsed && this._renderSettings(children, {
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

        var child = this._renderSetting(_objectSpread2({}, opts, {
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
      return React.createElement(Container, {
        theme: theme,
        userStyle: style.wrapper
      }, this._renderSettings(data));
    }
  }]);

  return Form;
}(PureComponent);

_defineProperty(Form, "propTypes", {
  data: PropTypes.object.isRequired,
  style: PropTypes.object,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
});

_defineProperty(Form, "defaultProps", {
  style: {}
});

export default withTheme(Form);
//# sourceMappingURL=form.js.map