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
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableRowComponent, TableCell, Expander } from './styled-components';

var TreeTableRow = function (_PureComponent) {
  _inherits(TreeTableRow, _PureComponent);

  function TreeTableRow() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TreeTableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TreeTableRow)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_renderItem", function (_ref) {
      var id = _ref.id,
          index = _ref.index,
          _ref$depth = _ref.depth,
          depth = _ref$depth === void 0 ? 0 : _ref$depth,
          key = _ref.key,
          data = _ref.data,
          style = _ref.style;
      var _this$props = _this.props,
          indentSize = _this$props.indentSize,
          columns = _this$props.columns,
          theme = _this$props.theme,
          userStyle = _this$props.userStyle,
          renderCell = _this$props.renderCell,
          getIsExpanded = _this$props.getIsExpanded;
      var isExpanded = getIsExpanded(id);
      var hasChildren = data.children.length > 0;
      var indent = indentSize * (depth + 1);
      return React.createElement("div", {
        key: key,
        style: style
      }, React.createElement(TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, hasChildren && React.createElement(Expander, {
        key: "toggle",
        isExpanded: isExpanded,
        theme: theme,
        userStyle: userStyle.expander,
        style: {
          marginLeft: indent
        },
        onClick: function onClick() {
          return _this._toggleExpansion(id);
        }
      }, isExpanded ? userStyle.iconExpanded || '▾' : userStyle.iconCollapsed || '▸'), React.createElement("div", {
        style: {
          flexShrink: 0,
          width: indent
        }
      }), data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
        var width = colIndex === 0 ? column.width - indent : column.width;
        return React.createElement(TableCell, {
          key: colIndex,
          index: colIndex,
          style: {
            width: width
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
      })), hasChildren && isExpanded && data.children.map(function (row, rowIndex) {
        return _this._renderItem({
          depth: depth + 1,
          id: "".concat(id, ".").concat(rowIndex),
          index: rowIndex,
          key: rowIndex,
          data: row
        });
      }));
    });

    return _this;
  }

  _createClass(TreeTableRow, [{
    key: "_toggleExpansion",
    value: function _toggleExpansion(id) {
      this.props.toggleExpansion(id, this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      return this._renderItem(_objectSpread2({}, this.props));
    }
  }]);

  return TreeTableRow;
}(PureComponent);

_defineProperty(TreeTableRow, "propTypes", {
  id: PropTypes.string,
  data: PropTypes.shape({
    data: PropTypes.array,
    children: PropTypes.array
  }),
  style: PropTypes.object,
  indentSize: PropTypes.number,
  renderCell: PropTypes.func,
  columns: PropTypes.array,
  getIsExpanded: PropTypes.func,
  toggleExpansion: PropTypes.func
});

export { TreeTableRow as default };
//# sourceMappingURL=tree-table-row.js.map