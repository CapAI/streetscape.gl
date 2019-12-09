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
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableRowComponent, TableCell } from './styled-components';

var TableRow = function (_PureComponent) {
  _inherits(TableRow, _PureComponent);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableRow).apply(this, arguments));
  }

  _createClass(TableRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          index = _this$props.index,
          data = _this$props.data,
          theme = _this$props.theme,
          userStyle = _this$props.userStyle,
          columns = _this$props.columns,
          style = _this$props.style,
          renderCell = _this$props.renderCell;
      return React.createElement("div", {
        style: style
      }, React.createElement(TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
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
  }]);

  return TableRow;
}(PureComponent);

_defineProperty(TableRow, "propTypes", {
  id: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.array
  }),
  style: PropTypes.object,
  renderCell: PropTypes.func,
  columns: PropTypes.array
});

export { TableRow as default };
//# sourceMappingURL=table-row.js.map