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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dragDropListItem = _interopRequireDefault(require("./drag-drop-list-item"));

var _utils = require("./utils");

var _theme = require("../shared/theme");

var _styledComponents = require("./styled-components");

var noop = function noop() {};

var DragDropList = function (_PureComponent) {
  (0, _inherits2["default"])(DragDropList, _PureComponent);

  function DragDropList() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, DragDropList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(DragDropList)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      items: null,
      targetIndex: -1
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragStart", function (targetItem) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragMove", function (pos) {
      var _this$state = _this.state,
          items = _this$state.items,
          targetItem = _this$state.targetItem,
          boundingBoxes = _this$state.boundingBoxes,
          targetIndex = _this$state.targetIndex;
      var nextIndex = -1;
      var maxOverlap = 0;
      var targetRect = (0, _utils.offsetRect)(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);
      boundingBoxes.forEach(function (boundingBox, i) {
        var p = (0, _utils.overlap)(boundingBox, targetRect);

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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragEnd", function (pos) {
      var _this$state2 = _this.state,
          items = _this$state2.items,
          targetItem = _this$state2.targetItem,
          removedIndex = _this$state2.removedIndex;
      var removedItems = removedIndex >= 0 ? items.splice(removedIndex, 1) : [];
      var targetRect = (0, _utils.offsetRect)(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);

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

  (0, _createClass2["default"])(DragDropList, [{
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
      return _react["default"].createElement(_styledComponents.ListContainer, {
        theme: theme,
        isDragging: Boolean(this.state.items),
        isRemoving: this.state.removedIndex >= 0,
        userStyle: style.wrapper
      }, items && items.map(function (item, i) {
        return _react["default"].createElement(_dragDropListItem["default"], {
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
}(_react.PureComponent);

(0, _defineProperty2["default"])(DragDropList, "propTypes", {
  items: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    key: _propTypes["default"].string,
    className: _propTypes["default"].string,
    content: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
    title: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string, _propTypes["default"].func])
  })),
  style: _propTypes["default"].object,
  canRemoveItem: _propTypes["default"].bool,
  onListChange: _propTypes["default"].func
});
(0, _defineProperty2["default"])(DragDropList, "defaultProps", {
  style: {},
  canRemoveItem: false,
  onListChange: noop
});

var _default = (0, _theme.withTheme)(DragDropList);

exports["default"] = _default;
//# sourceMappingURL=drag-drop-list.js.map