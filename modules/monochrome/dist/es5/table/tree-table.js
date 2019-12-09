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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theme = require("../shared/theme");

var _table = require("./table");

var _treeTableRow = _interopRequireDefault(require("./tree-table-row"));

var TreeTable = function (_Table) {
  (0, _inherits2["default"])(TreeTable, _Table);

  function TreeTable(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TreeTable);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TreeTable).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isRowExpanded", function (id) {
      return _this.state.expanded[id];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleRowExpansion", function (id, rootId) {
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

  (0, _createClass2["default"])(TreeTable, [{
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
      return _react["default"].createElement(_treeTableRow["default"], {
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
}(_table.Table);

(0, _defineProperty2["default"])(TreeTable, "propTypes", (0, _objectSpread4["default"])({}, _table.Table.propTypes, {
  indentSize: _propTypes["default"].number
}));
(0, _defineProperty2["default"])(TreeTable, "defaultProps", (0, _objectSpread4["default"])({}, _table.Table.defaultProps, {
  indentSize: 12
}));

var _default = (0, _theme.withTheme)(TreeTable);

exports["default"] = _default;
//# sourceMappingURL=tree-table.js.map