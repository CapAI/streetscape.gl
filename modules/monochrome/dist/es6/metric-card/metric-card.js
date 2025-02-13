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
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../shared/spinner';
import { Tooltip } from '../shared/popover';
import { withTheme } from '../shared/theme';
import { CardContainer, CardTitle, ErrorMessage } from './styled-components';

class MetricCard extends PureComponent {
  render() {
    const {
      theme,
      style,
      error,
      isLoading,
      className,
      title,
      description
    } = this.props;
    const styleProps = {
      theme,
      hasError: Boolean(error),
      isLoading
    };
    return React.createElement(CardContainer, _extends({
      className: className
    }, styleProps, {
      userStyle: style.wrapper
    }), title && React.createElement(CardTitle, _extends({}, styleProps, {
      userStyle: style.title
    }), React.createElement(Tooltip, {
      style: style.tooltip,
      content: description
    }, title)), !isLoading && !error && this.props.children, isLoading && React.createElement(Spinner, {
      style: style.spinner
    }), error && React.createElement(ErrorMessage, _extends({}, styleProps, {
      userStyle: style.error
    }), error));
  }

}

_defineProperty(MetricCard, "propTypes", {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: PropTypes.object,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.element
});

_defineProperty(MetricCard, "defaultProps", {
  className: '',
  title: '',
  description: '',
  style: {},
  error: null,
  isLoading: false
});

export default withTheme(MetricCard);
//# sourceMappingURL=metric-card.js.map