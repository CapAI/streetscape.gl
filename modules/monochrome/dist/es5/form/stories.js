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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = _interopRequireDefault(require("./index"));

var _shared = require("../shared");

var SETTINGS = {
  title: {
    type: 'title',
    title: 'My App Settings'
  },
  sectionSeparator: {
    type: 'separator'
  },
  sectionHeader: {
    type: 'header',
    title: 'Section Header'
  },
  showTitle: {
    type: 'toggle',
    title: 'Show Title'
  },
  richText: {
    type: 'toggle',
    title: 'Rich Text',
    tooltip: 'Fancy text formatting',
    warning: 'An example warning',
    children: {
      format: {
        type: 'select',
        visible: true,
        enabled: function enabled(_ref) {
          var richText = _ref.richText;
          return richText;
        },
        title: 'Format',
        data: {
          html: 'HTML',
          markdown: 'Markdown'
        }
      },
      flavor: {
        type: 'select',
        tooltip: 'Markdown syntax',
        visible: function visible(_ref2) {
          var format = _ref2.format;
          return format === 'markdown';
        },
        enabled: function enabled(_ref3) {
          var richText = _ref3.richText;
          return richText;
        },
        title: 'Flavor',
        data: {
          standard: 'Standard',
          github: 'GitHub',
          wikipedia: 'Wikipedia'
        }
      },
      stylesheet: {
        type: 'select',
        title: 'Stylesheet',
        visible: true,
        enabled: function enabled(_ref4) {
          var richText = _ref4.richText;
          return richText;
        },
        data: {
          light: 'Light',
          dark: 'Dark'
        }
      }
    }
  },
  fontSize: {
    type: 'range',
    tooltip: 'Size of text in pixels',
    title: 'Font Size',
    min: 10,
    max: 80
  },
  fontFamily: {
    type: 'text',
    tooltip: 'Fontface',
    title: 'Font Family'
  },
  alignment: {
    type: 'radio',
    tooltip: 'Align text with viewport',
    title: 'Alignment',
    data: {
      left: 'Left',
      right: 'Right',
      center: 'Center'
    }
  },
  autocorrect: {
    type: 'checkbox',
    title: 'Autocorrect',
    visible: true,
    collapsible: true,
    children: {
      spelling: {
        type: 'checkbox',
        title: 'Spelling',
        visible: true
      },
      grammer: {
        type: 'checkbox',
        title: 'Grammer',
        visible: true
      }
    }
  }
};
var STYLES = {
  wrapper: {
    padding: 24
  },
  label: {
    tooltip: {
      arrowSize: 0,
      borderWidth: 0
    }
  }
};

var FormExample = function (_Component) {
  (0, _inherits2["default"])(FormExample, _Component);

  function FormExample(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, FormExample);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FormExample).call(this, props));
    _this.state = {
      values: {
        showTitle: true,
        richText: true,
        format: 'markdown',
        flavor: 'github',
        stylesheet: 'light',
        fontSize: 24,
        fontFamily: 'Clan Pro Medium',
        alignment: 'left',
        autocorrect: _shared.CheckBox.INDETERMINATE,
        spelling: _shared.CheckBox.ON,
        grammer: _shared.CheckBox.OFF
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(FormExample, [{
    key: "_onSettingsChange",
    value: function _onSettingsChange(changedSettings) {
      var newState = Object.assign({}, this.state.values, changedSettings);

      if (changedSettings.spelling || changedSettings.grammer) {
        if (newState.spelling === newState.grammer) {
          newState.autocorrect = newState.spelling;
        } else {
          newState.autocorrect = _shared.CheckBox.INDETERMINATE;
        }
      } else if (changedSettings.autocorrect) {
        newState.spelling = changedSettings.autocorrect;
        newState.grammer = changedSettings.autocorrect;
      }

      this.setState({
        values: newState
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_index["default"], {
        data: SETTINGS,
        style: STYLES,
        values: this.state.values,
        onChange: this._onSettingsChange.bind(this)
      });
    }
  }]);
  return FormExample;
}(_react.Component);

(0, _react2.storiesOf)('Form', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Basic example', function () {
  return _react["default"].createElement(FormExample, null);
});
//# sourceMappingURL=stories.js.map