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
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XVIZLoaderInterface from '../loaders/xviz-loader-interface';
export default function connectToLog(_ref) {
  var getLogState = _ref.getLogState,
      Component = _ref.Component;

  var WrappedComponent = function (_PureComponent) {
    _inherits(WrappedComponent, _PureComponent);

    function WrappedComponent() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WrappedComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WrappedComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        logVersion: -1
      });

      _defineProperty(_assertThisInitialized(_this), "_update", function (logVersion) {
        _this.setState({
          logVersion: logVersion
        });
      });

      return _this;
    }

    _createClass(WrappedComponent, [{
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
            otherProps = _objectWithoutProperties(_this$props, ["log"]);

        var logState = log && getLogState(log, otherProps);
        return React.createElement(Component, _extends({}, otherProps, logState, {
          log: log
        }));
      }
    }]);

    return WrappedComponent;
  }(PureComponent);

  _defineProperty(WrappedComponent, "propTypes", {
    log: PropTypes.instanceOf(XVIZLoaderInterface)
  });

  return WrappedComponent;
}
//# sourceMappingURL=connect.js.map