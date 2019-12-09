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
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XVIZLoaderInterface from '../loaders/xviz-loader-interface';
export default function connectToLog({
  getLogState,
  Component
}) {
  class WrappedComponent extends PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        logVersion: -1
      });

      _defineProperty(this, "_update", logVersion => {
        this.setState({
          logVersion
        });
      });
    }

    componentDidMount() {
      const {
        log
      } = this.props;

      if (log) {
        log.subscribe(this._update);
      }
    }

    componentWillReceiveProps(nextProps) {
      const {
        log
      } = this.props;
      const nextLog = nextProps.log;

      if (log !== nextLog) {
        if (log) {
          log.unsubscribe(this._update);
        }

        if (nextLog) {
          nextLog.subscribe(this._update);
        }
      }
    }

    componentWillUnmount() {
      const {
        log
      } = this.props;

      if (log) {
        log.unsubscribe(this._update);
      }
    }

    render() {
      const _this$props = this.props,
            {
        log
      } = _this$props,
            otherProps = _objectWithoutProperties(_this$props, ["log"]);

      const logState = log && getLogState(log, otherProps);
      return React.createElement(Component, _extends({}, otherProps, logState, {
        log: log
      }));
    }

  }

  _defineProperty(WrappedComponent, "propTypes", {
    log: PropTypes.instanceOf(XVIZLoaderInterface)
  });

  return WrappedComponent;
}
//# sourceMappingURL=connect.js.map