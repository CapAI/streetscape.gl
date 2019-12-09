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
import { TableRowComponent, TableCell } from './styled-components';
export default class TableRow extends PureComponent {
  render() {
    const {
      id,
      index,
      data,
      theme,
      userStyle,
      columns,
      style,
      renderCell
    } = this.props;
    return React.createElement("div", {
      style: style
    }, React.createElement(TableRowComponent, {
      theme: theme,
      index: index,
      userStyle: userStyle.row
    }, data.data.map((colValue, colIndex) => {
      const column = columns[colIndex];
      return React.createElement(TableCell, {
        key: colIndex,
        index: colIndex,
        style: {
          width: column.width
        },
        title: "".concat(column.name, ": ").concat(colValue),
        theme: theme,
        userStyle: userStyle.cell
      }, renderCell({
        value: colValue,
        column: column.srcObject,
        columnIndex: colIndex,
        row: data.srcObject,
        rowId: id
      }));
    })));
  }

}

_defineProperty(TableRow, "propTypes", {
  id: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.array
  }),
  style: PropTypes.object,
  renderCell: PropTypes.func,
  columns: PropTypes.array
});
//# sourceMappingURL=table-row.js.map