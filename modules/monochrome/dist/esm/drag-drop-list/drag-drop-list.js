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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DragDropListItem from './drag-drop-list-item';
import { overlap, offsetRect } from './utils';
import { withTheme } from '../shared/theme';
import { ListContainer } from './styled-components';

var noop = function noop() {};

var DragDropList = function (_PureComponent) {
  _inherits(DragDropList, _PureComponent);

  function DragDropList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DragDropList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DragDropList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      items: null,
      targetIndex: -1
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragStart", function (targetItem) {
      var items = _this.props.items;
      var boundingBoxes = items.map(function (item) {
        item.boundingBox = item.instance.getBoundingBox();
        return item.boundingBox;
      });

      _this.setState({
        items: items.slice(),
        boundingBoxes: boundingBoxes,
        targetItem: targetItem,
        targetIndex: items.indexOf(targetItem),
        removedIndex: -1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragMove", function (pos) {
      var _this$state = _this.state,
          items = _this$state.items,
          targetItem = _this$state.targetItem,
          boundingBoxes = _this$state.boundingBoxes,
          targetIndex = _this$state.targetIndex;
      var nextIndex = -1;
      var maxOverlap = 0;
      var targetRect = offsetRect(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);
      boundingBoxes.forEach(function (boundingBox, i) {
        var p = overlap(boundingBox, targetRect);

        if (p > maxOverlap) {
          nextIndex = i;
          maxOverlap = p;
        }
      });

      if (nextIndex < 0) {
        if (_this.props.canRemoveItem) {
          _this.setState({
            removedIndex: targetIndex
          });
        }
      } else {
        if (nextIndex !== targetIndex) {
          items.splice(targetIndex, 1);
          items.splice(nextIndex, 0, targetItem);
        }

        _this.setState({
          targetIndex: nextIndex,
          removedIndex: -1
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragEnd", function (pos) {
      var _this$state2 = _this.state,
          items = _this$state2.items,
          targetItem = _this$state2.targetItem,
          removedIndex = _this$state2.removedIndex;
      var removedItems = removedIndex >= 0 ? items.splice(removedIndex, 1) : [];
      var targetRect = offsetRect(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);

      _this.props.onListChange({
        items: items,
        removedItems: removedItems,
        targetRect: targetRect
      });

      _this.setState({
        items: null
      });
    });

    return _this;
  }

  _createClass(DragDropList, [{
    key: "renderContent",
    value: function renderContent(_ref) {
      var content = _ref.content;
      return typeof content === 'function' ? content() : content;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          theme = _this$props.theme,
          style = _this$props.style;
      var items = this.state.items || this.props.items;
      return React.createElement(ListContainer, {
        theme: theme,
        isDragging: Boolean(this.state.items),
        isRemoving: this.state.removedIndex >= 0,
        userStyle: style.wrapper
      }, items && items.map(function (item, i) {
        return React.createElement(DragDropListItem, {
          theme: theme,
          key: item.key,
          ref: function ref(instance) {
            item.instance = instance;
          },
          style: style,
          title: item.title,
          removed: i === _this2.state.removedIndex,
          className: item.className,
          onDragStart: _this2._onDragStart.bind(_this2, item),
          onDragMove: _this2._onDragMove,
          onDragEnd: _this2._onDragEnd
        }, _this2.renderContent(item));
      }));
    }
  }]);

  return DragDropList;
}(PureComponent);

_defineProperty(DragDropList, "propTypes", {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func])
  })),
  style: PropTypes.object,
  canRemoveItem: PropTypes.bool,
  onListChange: PropTypes.func
});

_defineProperty(DragDropList, "defaultProps", {
  style: {},
  canRemoveItem: false,
  onListChange: noop
});

export default withTheme(DragDropList);
//# sourceMappingURL=drag-drop-list.js.map