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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _connect = _interopRequireDefault(require("../connect"));

var WrapperComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread4["default"])({}, props.theme.__reset__, {
    padding: props.theme.spacingSmall,
    display: 'inline-block'
  }, (0, _monochrome.evaluateStyle)(props.userStyle, props));
});

var BaseWidget = function (_PureComponent) {
  (0, _inherits2["default"])(BaseWidget, _PureComponent);

  function BaseWidget(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, BaseWidget);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(BaseWidget).call(this, props));
    _this.state = {
      streams: _this._extractStreams(props)
    };
    return _this;
  }

  (0, _createClass2["default"])(BaseWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.streamNames !== this.props.streamNames || nextProps.streamsMetadata !== this.props.streamsMetadata || nextProps.frame !== this.props.frame) {
        this.setState({
          streams: this._extractStreams(nextProps)
        });
      }
    }
  }, {
    key: "_extractStreams",
    value: function _extractStreams(_ref) {
      var streamNames = _ref.streamNames,
          streamsMetadata = _ref.streamsMetadata,
          frame = _ref.frame;
      var result = {};

      for (var key in streamNames) {
        var streamName = streamNames[key];

        if (streamName) {
          result[key] = (0, _objectSpread4["default"])({}, streamsMetadata[streamName], {
            data: frame && frame.streams[streamName]
          });
        }
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style,
          children = _this$props.children;
      var streams = this.state.streams;
      return _react["default"].createElement(WrapperComponent, {
        theme: theme,
        userStyle: style.wrapper
      }, children({
        theme: theme,
        streams: streams
      }));
    }
  }]);
  return BaseWidget;
}(_react.PureComponent);

(0, _defineProperty2["default"])(BaseWidget, "propTypes", {
  style: _propTypes["default"].object,
  streamNames: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].func.isRequired,
  streamsMetadata: _propTypes["default"].object,
  frame: _propTypes["default"].object
});
(0, _defineProperty2["default"])(BaseWidget, "defaultProps", {
  style: {}
});

var getLogState = function getLogState(log) {
  return {
    streamsMetadata: log.getStreamsMetadata(),
    frame: log.getCurrentFrame()
  };
};

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: (0, _monochrome.withTheme)(BaseWidget)
});

exports["default"] = _default;
//# sourceMappingURL=base-widget.js.map