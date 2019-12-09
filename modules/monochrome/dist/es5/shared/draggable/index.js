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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = require("../theme");

var ContainerComponent = _styled["default"].div(function (props) {
  return (0, _objectSpread3["default"])({
    margin: -props.tolerance,
    padding: props.tolerance,
    cursor: props.isActive ? 'grabbing' : props.isEnabled ? 'grab' : 'inherit'
  }, (0, _theme.evaluateStyle)(props.userStyle, props));
});

var BACKDROP_STYLES = {
  position: 'fixed',
  zIndex: 999,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

function noop() {}

var Draggable = function (_PureComponent) {
  (0, _inherits2["default"])(Draggable, _PureComponent);

  function Draggable(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Draggable);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Draggable).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getEventData", function (evt) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.offset;
      var _this$state = _this.state,
          dragStartPos = _this$state.dragStartPos,
          hasDragged = _this$state.hasDragged;
      var result = {
        srcEvent: evt,
        x: evt.clientX,
        y: evt.clientY,
        offsetX: evt.clientX - offset.left,
        offsetY: evt.clientY - offset.top,
        hasDragged: hasDragged
      };

      if (dragStartPos) {
        result.deltaX = result.x - dragStartPos.x;
        result.deltaY = result.y - dragStartPos.y;
      } else {
        result.deltaX = 0;
        result.deltaY = 0;
      }

      return result;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseDown", function (evt) {
      if (!_this.props.isEnabled) {
        return;
      }

      evt.stopPropagation();

      var offset = _this._element.getBoundingClientRect();

      var eventData = _this._getEventData(evt, offset);

      _this.setState({
        isMouseDown: true,
        hasDragged: false,
        offset: offset,
        dragStartPos: {
          x: eventData.x,
          y: eventData.y
        }
      });

      _this.props.onDragStart(eventData);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseMove", function (evt) {
      if (!_this.props.isEnabled) {
        return;
      }

      evt.stopPropagation();

      if (_this.state.isMouseDown) {
        var eventData = _this._getEventData(evt);

        var deltaX = eventData.deltaX,
            deltaY = eventData.deltaY;

        if (!_this.state.hasDragged) {
          if (deltaX || deltaY) {
            _this.setState({
              hasDragged: true
            });
          } else {
            return;
          }
        }

        _this.props.onDrag(eventData);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseUp", function (evt) {
      if (_this.state.isMouseDown) {
        _this.setState({
          isMouseDown: false,
          dragStartPos: null
        });

        _this.props.onDragEnd(_this._getEventData(evt));
      }
    });
    _this.state = {
      isMouseDown: false,
      dragStartPos: null,
      hasDragged: false
    };
    return _this;
  }

  (0, _createClass2["default"])(Draggable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          style = _this$props.style,
          isEnabled = _this$props.isEnabled,
          className = _this$props.className,
          tolerance = _this$props.tolerance;
      var isMouseDown = this.state.isMouseDown;
      return _react["default"].createElement(ContainerComponent, {
        className: className,
        ref: function ref(_ref) {
          _this2._element = _ref;
        },
        tolerance: tolerance,
        isEnabled: isEnabled,
        isActive: isMouseDown,
        userStyle: style,
        onMouseDown: this._onMouseDown,
        onMouseMove: this._onMouseMove,
        onMouseLeave: this._onMouseUp,
        onMouseUp: this._onMouseUp
      }, isMouseDown && _react["default"].createElement("div", {
        style: BACKDROP_STYLES
      }), this.props.children);
    }
  }]);
  return Draggable;
}(_react.PureComponent);

exports["default"] = Draggable;
(0, _defineProperty2["default"])(Draggable, "propTypes", {
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  tolerance: _propTypes["default"].number,
  isEnabled: _propTypes["default"].bool,
  onDragStart: _propTypes["default"].func,
  onDrag: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func
});
(0, _defineProperty2["default"])(Draggable, "defaultProps", {
  className: '',
  isEnabled: true,
  tolerance: 0,
  onDragStart: noop,
  onDrag: noop,
  onDragEnd: noop
});
//# sourceMappingURL=index.js.map