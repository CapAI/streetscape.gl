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
exports["default"] = connectToLog;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _xvizLoaderInterface = _interopRequireDefault(require("../loaders/xviz-loader-interface"));

function connectToLog(_ref) {
  var getLogState = _ref.getLogState,
      Component = _ref.Component;

  var WrappedComponent = function (_PureComponent) {
    (0, _inherits2["default"])(WrappedComponent, _PureComponent);

    function WrappedComponent() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, WrappedComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(WrappedComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        logVersion: -1
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_update", function (logVersion) {
        _this.setState({
          logVersion: logVersion
        });
      });
      return _this;
    }

    (0, _createClass2["default"])(WrappedComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var log = this.props.log;

        if (log) {
          log.subscribe(this._update);
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var log = this.props.log;
        var nextLog = nextProps.log;

        if (log !== nextLog) {
          if (log) {
            log.unsubscribe(this._update);
          }

          if (nextLog) {
            nextLog.subscribe(this._update);
          }
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var log = this.props.log;

        if (log) {
          log.unsubscribe(this._update);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            log = _this$props.log,
            otherProps = (0, _objectWithoutProperties2["default"])(_this$props, ["log"]);
        var logState = log && getLogState(log, otherProps);
        return _react["default"].createElement(Component, (0, _extends2["default"])({}, otherProps, logState, {
          log: log
        }));
      }
    }]);
    return WrappedComponent;
  }(_react.PureComponent);

  (0, _defineProperty2["default"])(WrappedComponent, "propTypes", {
    log: _propTypes["default"].instanceOf(_xvizLoaderInterface["default"])
  });
  return WrappedComponent;
}
//# sourceMappingURL=connect.js.map