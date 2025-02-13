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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DragDropListItem from './drag-drop-list-item';
import { overlap, offsetRect } from './utils';
import { withTheme } from '../shared/theme';
import { ListContainer } from './styled-components';

const noop = () => {};

class DragDropList extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      items: null,
      targetIndex: -1
    });

    _defineProperty(this, "_onDragStart", targetItem => {
      const {
        items
      } = this.props;
      const boundingBoxes = items.map(item => {
        item.boundingBox = item.instance.getBoundingBox();
        return item.boundingBox;
      });
      this.setState({
        items: items.slice(),
        boundingBoxes,
        targetItem,
        targetIndex: items.indexOf(targetItem),
        removedIndex: -1
      });
    });

    _defineProperty(this, "_onDragMove", pos => {
      const {
        items,
        targetItem,
        boundingBoxes,
        targetIndex
      } = this.state;
      let nextIndex = -1;
      let maxOverlap = 0;
      const targetRect = offsetRect(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);
      boundingBoxes.forEach((boundingBox, i) => {
        const p = overlap(boundingBox, targetRect);

        if (p > maxOverlap) {
          nextIndex = i;
          maxOverlap = p;
        }
      });

      if (nextIndex < 0) {
        if (this.props.canRemoveItem) {
          this.setState({
            removedIndex: targetIndex
          });
        }
      } else {
        if (nextIndex !== targetIndex) {
          items.splice(targetIndex, 1);
          items.splice(nextIndex, 0, targetItem);
        }

        this.setState({
          targetIndex: nextIndex,
          removedIndex: -1
        });
      }
    });

    _defineProperty(this, "_onDragEnd", pos => {
      const {
        items,
        targetItem,
        removedIndex
      } = this.state;
      const removedItems = removedIndex >= 0 ? items.splice(removedIndex, 1) : [];
      const targetRect = offsetRect(targetItem.boundingBox, [pos.deltaX, pos.deltaY]);
      this.props.onListChange({
        items,
        removedItems,
        targetRect
      });
      this.setState({
        items: null
      });
    });
  }

  renderContent({
    content
  }) {
    return typeof content === 'function' ? content() : content;
  }

  render() {
    const {
      theme,
      style
    } = this.props;
    const items = this.state.items || this.props.items;
    return React.createElement(ListContainer, {
      theme: theme,
      isDragging: Boolean(this.state.items),
      isRemoving: this.state.removedIndex >= 0,
      userStyle: style.wrapper
    }, items && items.map((item, i) => React.createElement(DragDropListItem, {
      theme: theme,
      key: item.key,
      ref: instance => {
        item.instance = instance;
      },
      style: style,
      title: item.title,
      removed: i === this.state.removedIndex,
      className: item.className,
      onDragStart: this._onDragStart.bind(this, item),
      onDragMove: this._onDragMove,
      onDragEnd: this._onDragEnd
    }, this.renderContent(item))));
  }

}

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