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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var TooltipContainer = _styled["default"].div(function (props) {
  return (0, _objectSpread3["default"])({}, props.theme.__reset__, {
    position: 'absolute',
    pointerEvents: 'none',
    margin: props.theme.spacingNormal,
    padding: props.theme.spacingNormal,
    maxWidth: 320,
    overflow: 'hidden',
    background: props.theme.background,
    color: props.theme.textColorPrimary,
    zIndex: 100001
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var KEY_BLACKLIST = new Set(['vertices', 'base', 'style', 'state', 'index', 'id', 'object_id']);

var HoverTooltip = function (_PureComponent) {
  (0, _inherits2["default"])(HoverTooltip, _PureComponent);

  function HoverTooltip() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, HoverTooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(HoverTooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderContent", function (info) {
      var streamName = info.layer.props.streamName;

      if (!streamName) {
        return _react["default"].createElement("div", null, _react["default"].createElement("b", null, info.layer.id));
      }

      var objectId = info.object.base && info.object.base.object_id;
      return [_react["default"].createElement("div", {
        key: "-stream-"
      }, _react["default"].createElement("div", null, _react["default"].createElement("b", null, "stream")), streamName), objectId ? _react["default"].createElement("div", {
        key: "-id-"
      }, _react["default"].createElement("div", null, _react["default"].createElement("b", null, "id")), objectId) : null, _react["default"].createElement("hr", {
        key: "-separator-"
      })].concat(_this._renderEntries(info.object.base), _this._renderEntries(info.object));
    });
    return _this;
  }

  (0, _createClass2["default"])(HoverTooltip, [{
    key: "_renderEntries",
    value: function _renderEntries(object) {
      if (!object) {
        return null;
      }

      return Object.keys(object).filter(function (key) {
        return !KEY_BLACKLIST.has(key) && object[key] !== undefined;
      }).map(function (key) {
        return _react["default"].createElement("div", {
          key: key
        }, _react["default"].createElement("div", null, _react["default"].createElement("b", null, key)), String(object[key]));
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
      return _react["default"].createElement(TooltipContainer, {
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
}(_react.PureComponent);

var _default = (0, _monochrome.withTheme)(HoverTooltip);

exports["default"] = _default;
//# sourceMappingURL=hover-tooltip.js.map