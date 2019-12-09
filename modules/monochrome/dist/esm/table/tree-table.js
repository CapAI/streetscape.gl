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
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../shared/theme';
import { Table } from './table';
import TreeTableRow from './tree-table-row';

var TreeTable = function (_Table) {
  _inherits(TreeTable, _Table);

  function TreeTable(props) {
    var _this;

    _classCallCheck(this, TreeTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeTable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_isRowExpanded", function (id) {
      return _this.state.expanded[id];
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleRowExpansion", function (id, rootId) {
      var expanded = _this.state.expanded;

      var rows = _this.formatRows(_this.props.rows, _this.state.sortFunc);

      expanded[id] = !expanded[id];
      var rootRowIndex = rows.findIndex(function (row) {
        return row.id === rootId;
      });

      _this._cache.clear(rootRowIndex);

      _this._list.recomputeRowHeights(rootRowIndex);
    });

    _this.state.expanded = {};
    return _this;
  }

  _createClass(TreeTable, [{
    key: "_renderRow",
    value: function _renderRow(_ref) {
      var key = _ref.key,
          index = _ref.index,
          style = _ref.style;
      var _this$props = this.props,
          indentSize = _this$props.indentSize,
          renderCell = _this$props.renderCell,
          theme = _this$props.theme,
          userStyle = _this$props.style;
      var rows = this.formatRows(this.props.rows, this.state.sortFunc);
      var row = rows[index];
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
  }]);

  return TreeTable;
}(Table);

_defineProperty(TreeTable, "propTypes", _objectSpread2({}, Table.propTypes, {
  indentSize: PropTypes.number
}));

_defineProperty(TreeTable, "defaultProps", _objectSpread2({}, Table.defaultProps, {
  indentSize: 12
}));

export default withTheme(TreeTable);
//# sourceMappingURL=tree-table.js.map