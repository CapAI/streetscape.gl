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
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../shared/theme';
import { Table } from './table';
import TreeTableRow from './tree-table-row';

class TreeTable extends Table {
  constructor(props) {
    super(props);

    _defineProperty(this, "_isRowExpanded", id => {
      return this.state.expanded[id];
    });

    _defineProperty(this, "_toggleRowExpansion", (id, rootId) => {
      const {
        expanded
      } = this.state;
      const rows = this.formatRows(this.props.rows, this.state.sortFunc);
      expanded[id] = !expanded[id];
      const rootRowIndex = rows.findIndex(row => row.id === rootId);

      this._cache.clear(rootRowIndex);

      this._list.recomputeRowHeights(rootRowIndex);
    });

    this.state.expanded = {};
  }

  _renderRow({
    key,
    index,
    style
  }) {
    const {
      indentSize,
      renderCell,
      theme,
      style: userStyle
    } = this.props;
    const rows = this.formatRows(this.props.rows, this.state.sortFunc);
    const row = rows[index];
    return React.createElement(TreeTableRow, {
      key: key,
      id: row.id,
      index: index,
      data: row,
      style: style,
      theme: theme,
      userStyle: userStyle,
      indentSize: indentSize,
      renderCell: renderCell,
      getIsExpanded: this._isRowExpanded,
      toggleExpansion: this._toggleRowExpansion,
      columns: this.state.columns
    });
  }

}

_defineProperty(TreeTable, "propTypes", _objectSpread2({}, Table.propTypes, {
  indentSize: PropTypes.number
}));

_defineProperty(TreeTable, "defaultProps", _objectSpread2({}, Table.defaultProps, {
  indentSize: 12
}));

export default withTheme(TreeTable);
//# sourceMappingURL=tree-table.js.map