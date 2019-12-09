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
import styled from '@emotion/styled';
import { evaluateStyle } from '../theme';
var ContainerComponent = styled.div(function (props) {
  return _objectSpread2({
    margin: -props.tolerance,
    padding: props.tolerance,
    cursor: props.isActive ? 'grabbing' : props.isEnabled ? 'grab' : 'inherit'
  }, evaluateStyle(props.userStyle, props));
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
  _inherits(Draggable, _PureComponent);

  function Draggable(props) {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Draggable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_getEventData", function (evt) {
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

    _defineProperty(_assertThisInitialized(_this), "_onMouseDown", function (evt) {
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

    _defineProperty(_assertThisInitialized(_this), "_onMouseMove", function (evt) {
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

    _defineProperty(_assertThisInitialized(_this), "_onMouseUp", function (evt) {
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

  _createClass(Draggable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          style = _this$props.style,
          isEnabled = _this$props.isEnabled,
          className = _this$props.className,
          tolerance = _this$props.tolerance;
      var isMouseDown = this.state.isMouseDown;
      return React.createElement(ContainerComponent, {
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
      }, isMouseDown && React.createElement("div", {
        style: BACKDROP_STYLES
      }), this.props.children);
    }
  }]);

  return Draggable;
}(PureComponent);

_defineProperty(Draggable, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  tolerance: PropTypes.number,
  isEnabled: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
});

_defineProperty(Draggable, "defaultProps", {
  className: '',
  isEnabled: true,
  tolerance: 0,
  onDragStart: noop,
  onDrag: noop,
  onDragEnd: noop
});

export { Draggable as default };
//# sourceMappingURL=index.js.map