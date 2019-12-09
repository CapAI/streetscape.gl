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
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, CheckBox, evaluateStyle } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
import connectToLog from './connect';
var Badge = styled.div(function (props) {
  return _objectSpread2({
    '&:before': {
      content: "\"".concat(props.type || '', "\"")
    }
  }, evaluateStyle(props.userStyle, props));
});

function getParentKey(streamName) {
  var i = streamName.indexOf('/', 1);

  if (i > 1) {
    return streamName.slice(0, i);
  }

  return '';
}

function getParentValue(children, values) {
  var parentValue = null;

  for (var key in children) {
    var value = values[key];

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

  var root = {};
  var _opts$style = opts.style,
      style = _opts$style === void 0 ? {} : _opts$style,
      _opts$collapsible = opts.collapsible,
      collapsible = _opts$collapsible === void 0 ? false : _opts$collapsible;

  for (var streamName in metadata) {
    var parentKey = getParentKey(streamName);
    var siblings = root;

    if (parentKey) {
      root[parentKey] = root[parentKey] || {
        type: 'checkbox',
        children: {},
        collapsible: collapsible,
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

  var values = {};

  for (var key in data) {
    var children = data[key].children;

    if (children) {
      for (var streamName in children) {
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
  var values = _objectSpread2({}, oldValues, {}, newValues);

  for (var key in newValues) {
    if (data[key] && data[key].children) {
      for (var streamName in data[key].children) {
        values[streamName] = newValues[key];
      }
    } else {
      var parentKey = getParentKey(key);

      if (parentKey) {
        values[parentKey] = getParentValue(data[parentKey].children, values);
      }
    }
  }

  return values;
}
export function formValuesToSettings(metadata, values) {
  var settings = {};

  for (var streamName in metadata) {
    settings[streamName] = values[streamName] === CheckBox.ON;
  }

  return settings;
}

var StreamSettingsPanel = function (_PureComponent) {
  _inherits(StreamSettingsPanel, _PureComponent);

  function StreamSettingsPanel(props) {
    var _this;

    _classCallCheck(this, StreamSettingsPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StreamSettingsPanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onValuesChange", function (newValues) {
      var _this$props = _this.props,
          streamsMetadata = _this$props.streamsMetadata,
          log = _this$props.log,
          onSettingsChange = _this$props.onSettingsChange;
      var data = _this.state.data;
      var values = updateFormValues(data, _this.state.values, newValues);
      var settings = formValuesToSettings(streamsMetadata, values);

      if (!onSettingsChange(settings) && log) {
        log.updateStreamSettings(settings);
      }
    });

    var _data = createFormData(props.streamsMetadata, props);

    var _values = settingsToFormValues(_data, props.streamSettings);

    _this.state = {
      data: _data,
      values: _values
    };
    return _this;
  }

  _createClass(StreamSettingsPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$state = this.state,
          data = _this$state.data,
          values = _this$state.values;

      if (nextProps.streamsMetadata !== this.props.streamsMetadata) {
        data = createFormData(nextProps.streamsMetadata, nextProps);
        values = null;
      }

      if (nextProps.streamSettings !== this.props.streamSettings) {
        values = settingsToFormValues(data, nextProps.streamSettings);
      }

      this.setState({
        data: data,
        values: values
      });
    }
  }, {
    key: "render",
    value: function render() {
      var style = this.props.style;
      var _this$state2 = this.state,
          data = _this$state2.data,
          values = _this$state2.values;

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
  }]);

  return StreamSettingsPanel;
}(PureComponent);

_defineProperty(StreamSettingsPanel, "propTypes", {
  style: PropTypes.object,
  streamsMetadata: PropTypes.object,
  onSettingsChange: PropTypes.func
});

_defineProperty(StreamSettingsPanel, "defaultProps", {
  style: {},
  onSettingsChange: function onSettingsChange() {}
});

var getLogState = function getLogState(log) {
  return {
    streamsMetadata: log.getStreamsMetadata(),
    streamSettings: log.getStreamSettings()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: StreamSettingsPanel
});
//# sourceMappingURL=stream-settings-panel.js.map