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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setObjectState } from '../../utils/object-state';
import Core3DViewer from './core-3d-viewer';
import HoverTooltip from './hover-tooltip';
import connectToLog from '../connect';
import { DEFAULT_VIEW_STATE } from '../../constants';

var noop = function noop() {};

var preventDefault = function preventDefault(evt) {
  return evt.preventDefault();
};

var LogViewer = function (_PureComponent) {
  _inherits(LogViewer, _PureComponent);

  function LogViewer(props) {
    var _this;

    _classCallCheck(this, LogViewer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LogViewer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onViewStateChange", function (_ref) {
      var viewState = _ref.viewState,
          viewOffset = _ref.viewOffset;

      _this.setState({
        viewState: viewState,
        viewOffset: viewOffset
      });

      _this.props.onViewStateChange({
        viewState: viewState,
        viewOffset: viewOffset
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onHoverObject", function (info, evt) {
      if (_this.props.showTooltip && info && info.object) {
        _this.setState({
          hoverInfo: info
        });
      } else if (_this.state.hoverInfo) {
        _this.setState({
          hoverInfo: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClickObject", function (info, evt) {
      _this.props.onClick(info, evt);

      var objectId = info && info.object && info.object.id;

      if (objectId && !_this.props.onSelectObject(info, evt)) {
        var objectStates = _this.state.objectStates;
        var isObjectSelected = objectStates.selected && objectStates.selected[objectId];
        objectStates = setObjectState(objectStates, {
          stateName: 'selected',
          id: objectId,
          value: !isObjectSelected
        });

        _this.setState({
          objectStates: objectStates
        });

        _this.props.onObjectStateChange(objectStates);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onContextMenu", function (info, evt) {
      _this.props.onContextMenu(info, evt);
    });

    _this.state = {
      viewState: _objectSpread2({
        width: 1,
        height: 1,
        longitude: 0,
        latitude: 0
      }, DEFAULT_VIEW_STATE, {}, props.viewMode.initialViewState),
      viewOffset: {
        x: 0,
        y: 0,
        bearing: 0
      },
      objectStates: {},
      hoverInfo: null
    };
    return _this;
  }

  _createClass(LogViewer, [{
    key: "_renderTooltip",
    value: function _renderTooltip() {
      var _this$props = this.props,
          showTooltip = _this$props.showTooltip,
          style = _this$props.style,
          renderTooltip = _this$props.renderTooltip;
      var hoverInfo = this.state.hoverInfo;
      return showTooltip && hoverInfo && React.createElement(HoverTooltip, {
        info: hoverInfo,
        style: style.tooltip,
        renderContent: renderTooltip
      });
    }
  }, {
    key: "render",
    value: function render() {
      var viewState = this.props.viewState || this.state.viewState;
      var viewOffset = this.props.viewOffset || this.state.viewOffset;
      var objectStates = this.props.objectStates || this.state.objectStates;
      return React.createElement("div", {
        onContextMenu: preventDefault
      }, React.createElement(Core3DViewer, _extends({}, this.props, {
        onViewStateChange: this._onViewStateChange,
        onClick: this._onClickObject,
        onHover: this._onHoverObject,
        onContextMenu: this._onContextMenu,
        viewState: viewState,
        viewOffset: viewOffset,
        objectStates: objectStates
      }), this._renderTooltip()));
    }
  }]);

  return LogViewer;
}(PureComponent);

_defineProperty(LogViewer, "propTypes", _objectSpread2({}, Core3DViewer.propTypes, {
  renderTooltip: PropTypes.func,
  style: PropTypes.object,
  onSelectObject: PropTypes.func,
  onContextMenu: PropTypes.func,
  onViewStateChange: PropTypes.func,
  onObjectStateChange: PropTypes.func,
  viewState: PropTypes.object,
  viewOffset: PropTypes.object,
  objectStates: PropTypes.object
}));

_defineProperty(LogViewer, "defaultProps", _objectSpread2({}, Core3DViewer.defaultProps, {
  style: {},
  onViewStateChange: noop,
  onObjectStateChange: noop,
  onSelectObject: noop,
  onContextMenu: noop,
  getTransformMatrix: function getTransformMatrix(streamName, context) {
    return null;
  }
}));

var getLogState = function getLogState(log) {
  return {
    frame: log.getCurrentFrame(),
    metadata: log.getMetadata(),
    streamsMetadata: log.getStreamsMetadata()
  };
};

export default connectToLog({
  getLogState: getLogState,
  Component: LogViewer
});
//# sourceMappingURL=index.js.map