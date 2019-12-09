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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("./styled-components");

var TableRow = function (_PureComponent) {
  (0, _inherits2["default"])(TableRow, _PureComponent);

  function TableRow() {
    (0, _classCallCheck2["default"])(this, TableRow);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TableRow).apply(this, arguments));
  }

  (0, _createClass2["default"])(TableRow, [{
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
      return _react["default"].createElement("div", {
        style: style
      }, _react["default"].createElement(_styledComponents.TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
        return _react["default"].createElement(_styledComponents.TableCell, {
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
}(_react.PureComponent);

exports["default"] = TableRow;
(0, _defineProperty2["default"])(TableRow, "propTypes", {
  id: _propTypes["default"].string,
  data: _propTypes["default"].shape({
    data: _propTypes["default"].array
  }),
  style: _propTypes["default"].object,
  renderCell: _propTypes["default"].func,
  columns: _propTypes["default"].array
});
//# sourceMappingURL=table-row.js.map