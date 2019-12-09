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
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, CheckBox, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import connectToLog from './connect';
const Badge = styled.div(props => _objectSpread2({
  '&:before': {
    content: "\"".concat(props.type || '', "\"")
  }
}, evaluateStyle(props.userStyle, props)));

function getParentKey(streamName) {
  const i = streamName.indexOf('/', 1);

  if (i > 1) {
    return streamName.slice(0, i);
  }

  return '';
}

function getParentValue(children, values) {
  let parentValue = null;

  for (const key in children) {
    const value = values[key];

    if (parentValue === null) {
      parentValue = value;
    } else if (parentValue !== value) {
      return CheckBox.INDETERMINATE;
    }
  }

  return parentValue;
}

export function createFormData(metadata, opts) {
  if (!metadata) {
    return null;
  }

  const root = {};
  const {
    style = {},
    collapsible = false
  } = opts;

  for (const streamName in metadata) {
    const parentKey = getParentKey(streamName);
    let siblings = root;

    if (parentKey) {
      root[parentKey] = root[parentKey] || {
        type: 'checkbox',
        children: {},
        collapsible,
        badge: React.createElement(Badge, {
          userStyle: style.badge
        })
      };
      siblings = root[parentKey].children;
    }

    siblings[streamName] = {
      type: 'checkbox',
      title: streamName.replace(parentKey, ''),
      badge: React.createElement(Badge, {
        userStyle: style.badge,
        type: metadata[streamName].primitive_type || metadata[streamName].scalar_type
      })
    };
  }

  return root;
}
export function settingsToFormValues(data, settings) {
  if (!data || !settings) {
    return null;
  }

  const values = {};

  for (const key in data) {
    const {
      children
    } = data[key];

    if (children) {
      for (const streamName in children) {
        values[streamName] = settings[streamName] ? CheckBox.ON : CheckBox.OFF;
      }

      values[key] = getParentValue(children, values);
    } else {
      values[key] = settings[key] ? CheckBox.ON : CheckBox.OFF;
    }
  }

  return values;
}
export function updateFormValues(data, oldValues, newValues) {
  const values = _objectSpread2({}, oldValues, {}, newValues);

  for (const key in newValues) {
    if (data[key] && data[key].children) {
      for (const streamName in data[key].children) {
        values[streamName] = newValues[key];
      }
    } else {
      const parentKey = getParentKey(key);

      if (parentKey) {
        values[parentKey] = getParentValue(data[parentKey].children, values);
      }
    }
  }

  return values;
}
export function formValuesToSettings(metadata, values) {
  const settings = {};

  for (const streamName in metadata) {
    settings[streamName] = values[streamName] === CheckBox.ON;
  }

  return settings;
}

class StreamSettingsPanel extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onValuesChange", newValues => {
      const {
        streamsMetadata,
        log,
        onSettingsChange
      } = this.props;
      const {
        data
      } = this.state;
      const values = updateFormValues(data, this.state.values, newValues);
      const settings = formValuesToSettings(streamsMetadata, values);

      if (!onSettingsChange(settings) && log) {
        log.updateStreamSettings(settings);
      }
    });

    const _data = createFormData(props.streamsMetadata, props);

    const _values = settingsToFormValues(_data, props.streamSettings);

    this.state = {
      data: _data,
      values: _values
    };
  }

  componentWillReceiveProps(nextProps) {
    let {
      data,
      values
    } = this.state;

    if (nextProps.streamsMetadata !== this.props.streamsMetadata) {
      data = createFormData(nextProps.streamsMetadata, nextProps);
      values = null;
    }

    if (nextProps.streamSettings !== this.props.streamSettings) {
      values = settingsToFormValues(data, nextProps.streamSettings);
    }

    this.setState({
      data,
      values
    });
  }

  render() {
    const {
      style
    } = this.props;
    const {
      data,
      values
    } = this.state;

    if (!data || !values) {
      return null;
    }

    return React.createElement(Form, {
      style: style,
      data: data,
      values: values,
      onChange: this._onValuesChange
    });
  }

}

_defineProperty(StreamSettingsPanel, "propTypes", {
  style: PropTypes.object,
  streamsMetadata: PropTypes.object,
  onSettingsChange: PropTypes.func
});

_defineProperty(StreamSettingsPanel, "defaultProps", {
  style: {},
  onSettingsChange: () => {}
});

const getLogState = log => ({
  streamsMetadata: log.getStreamsMetadata(),
  streamSettings: log.getStreamSettings()
});

export default connectToLog({
  getLogState,
  Component: StreamSettingsPanel
});
//# sourceMappingURL=stream-settings-panel.js.map