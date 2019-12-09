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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _objectState = require("../../utils/object-state");

var _core3dViewer = _interopRequireDefault(require("./core-3d-viewer"));

var _hoverTooltip = _interopRequireDefault(require("./hover-tooltip"));

var _connect = _interopRequireDefault(require("../connect"));

var _constants = require("../../constants");

var noop = function noop() {};

var preventDefault = function preventDefault(evt) {
  return evt.preventDefault();
};

var LogViewer = function (_PureComponent) {
  (0, _inherits2["default"])(LogViewer, _PureComponent);

  function LogViewer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, LogViewer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LogViewer).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewStateChange", function (_ref) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onHoverObject", function (info, evt) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClickObject", function (info, evt) {
      _this.props.onClick(info, evt);

      var objectId = info && info.object && info.object.id;

      if (objectId && !_this.props.onSelectObject(info, evt)) {
        var objectStates = _this.state.objectStates;
        var isObjectSelected = objectStates.selected && objectStates.selected[objectId];
        objectStates = (0, _objectState.setObjectState)(objectStates, {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onContextMenu", function (info, evt) {
      _this.props.onContextMenu(info, evt);
    });
    _this.state = {
      viewState: (0, _objectSpread5["default"])({
        width: 1,
        height: 1,
        longitude: 0,
        latitude: 0
      }, _constants.DEFAULT_VIEW_STATE, {}, props.viewMode.initialViewState),
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

  (0, _createClass2["default"])(LogViewer, [{
    key: "_renderTooltip",
    value: function _renderTooltip() {
      var _this$props = this.props,
          showTooltip = _this$props.showTooltip,
          style = _this$props.style,
          renderTooltip = _this$props.renderTooltip;
      var hoverInfo = this.state.hoverInfo;
      return showTooltip && hoverInfo && _react["default"].createElement(_hoverTooltip["default"], {
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
      return _react["default"].createElement("div", {
        onContextMenu: preventDefault
      }, _react["default"].createElement(_core3dViewer["default"], (0, _extends2["default"])({}, this.props, {
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
}(_react.PureComponent);

(0, _defineProperty2["default"])(LogViewer, "propTypes", (0, _objectSpread5["default"])({}, _core3dViewer["default"].propTypes, {
  renderTooltip: _propTypes["default"].func,
  style: _propTypes["default"].object,
  onSelectObject: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  onViewStateChange: _propTypes["default"].func,
  onObjectStateChange: _propTypes["default"].func,
  viewState: _propTypes["default"].object,
  viewOffset: _propTypes["default"].object,
  objectStates: _propTypes["default"].object
}));
(0, _defineProperty2["default"])(LogViewer, "defaultProps", (0, _objectSpread5["default"])({}, _core3dViewer["default"].defaultProps, {
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

var _default = (0, _connect["default"])({
  getLogState: getLogState,
  Component: LogViewer
});

exports["default"] = _default;
//# sourceMappingURL=index.js.map