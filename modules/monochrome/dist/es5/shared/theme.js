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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = ThemeProvider;
exports.evaluateStyle = evaluateStyle;
exports.withTheme = withTheme;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _themes = require("./themes");

var ThemeContext = _react["default"].createContext(createTheme({}));

var themeCache = new Map();

function ThemeProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;
  var resolvedTheme = themeCache.get(theme);

  if (!resolvedTheme) {
    resolvedTheme = createTheme(theme);
    themeCache.set(theme, resolvedTheme);
  }

  return _react["default"].createElement(ThemeContext.Provider, {
    value: resolvedTheme
  }, children);
}

function evaluateStyle(userStyle, props) {
  if (!userStyle) {
    return null;
  }

  if (typeof userStyle === 'function') {
    return userStyle(props);
  }

  return userStyle;
}

function withTheme(Component) {
  var ThemedComponent = function (_React$Component) {
    (0, _inherits2["default"])(ThemedComponent, _React$Component);

    function ThemedComponent() {
      (0, _classCallCheck2["default"])(this, ThemedComponent);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ThemedComponent).apply(this, arguments));
    }

    (0, _createClass2["default"])(ThemedComponent, [{
      key: "render",
      value: function render() {
        var _this = this;

        return _react["default"].createElement(ThemeContext.Consumer, null, function (_theme) {
          return _react["default"].createElement(Component, (0, _extends2["default"])({}, _this.props, {
            theme: _theme
          }));
        });
      }
    }]);
    return ThemedComponent;
  }(_react["default"].Component);

  ThemedComponent.propTypes = Component.propTypes;
  ThemedComponent.defaultProps = Component.defaultProps;
  return ThemedComponent;
}

function createTheme(theme) {
  var base = null;

  switch (theme["extends"]) {
    case 'dark':
      base = _themes.DARK_THEME;
      break;

    default:
      base = _themes.LIGHT_THEME;
      break;
  }

  theme = (0, _objectSpread3["default"])({}, base, {}, theme);
  theme.__reset__ = {
    font: 'initial',
    cursor: 'initial',
    pointerEvents: 'initial',
    background: theme.background,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    lineHeight: theme.lineHeight,
    color: theme.textColorPrimary,
    textAlign: 'start'
  };
  return theme;
}
//# sourceMappingURL=theme.js.map