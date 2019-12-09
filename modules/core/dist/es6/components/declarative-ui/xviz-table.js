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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import { Table, TreeTable, Tooltip } from '@streetscape.gl/monochrome';
import PropTypes from 'prop-types';
import connectToLog from '../connect';

class XVIZTableComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = _objectSpread2({}, this._formatData(props));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns || nextProps.nodes !== this.props.nodes) {
      this.setState(this._formatData(nextProps));
    }
  }

  _formatData({
    columns,
    nodes,
    displayObjectId
  }) {
    if (!columns || !nodes) {
      return {
        columns: null
      };
    }

    columns = columns.map(col => ({
      name: col.display_text,
      type: col.type
    }));
    const rowIds = {};
    const rows = [];
    nodes.forEach(node => {
      const row = {
        data: node.column_values || [],
        children: []
      };
      rowIds[node.id] = row;

      if (!node.hasOwnProperty('parent') || node.parent === undefined) {
        rows.push(row);
      } else {
        const parentRow = rowIds[node.parent];

        if (parentRow) {
          parentRow.children.push(row);
        }
      }
    });
    return {
      columns,
      rows
    };
  }

  render() {
    const {
      columns,
      rows
    } = this.state;

    if (!columns) {
      return null;
    }

    const {
      title,
      description,
      width,
      height,
      style,
      renderHeader,
      renderCell,
      indentSize,
      type
    } = this.props;
    const Component = type === 'table' ? Table : TreeTable;
    return React.createElement("div", {
      style: {
        width,
        height
      }
    }, React.createElement(Tooltip, {
      content: description
    }, React.createElement("h4", null, title)), React.createElement(Component, {
      width: "100%",
      height: "100%",
      style: style,
      renderHeader: renderHeader,
      renderCell: renderCell,
      indentSize: indentSize,
      columns: columns,
      rows: rows
    }));
  }

}

_defineProperty(XVIZTableComponent, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  renderHeader: PropTypes.func,
  renderCell: PropTypes.func,
  indentSize: PropTypes.number,
  stream: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  displayObjectId: PropTypes.bool,
  columns: PropTypes.array,
  nodes: PropTypes.array
});

_defineProperty(XVIZTableComponent, "defaultProps", {
  width: '100%',
  height: 400,
  style: {},
  indentSize: 12,
  renderHeader: ({
    column
  }) => column.name,
  renderCell: ({
    value
  }) => value === null ? null : String(value)
});

const getLogState = (log, ownProps) => {
  const frame = log.getCurrentFrame();
  const data = frame && frame.streams[ownProps.stream];
  return data && data.treetable;
};

export default connectToLog({
  getLogState,
  Component: XVIZTableComponent
});
//# sourceMappingURL=xviz-table.js.map