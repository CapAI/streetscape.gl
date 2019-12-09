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

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("./styled-components");

var TreeTableRow = function (_PureComponent) {
  (0, _inherits2["default"])(TreeTableRow, _PureComponent);

  function TreeTableRow() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, TreeTableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(TreeTableRow)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderItem", function (_ref) {
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
      return _react["default"].createElement("div", {
        key: key,
        style: style
      }, _react["default"].createElement(_styledComponents.TableRowComponent, {
        theme: theme,
        index: index,
        userStyle: userStyle.row
      }, hasChildren && _react["default"].createElement(_styledComponents.Expander, {
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
      }, isExpanded ? userStyle.iconExpanded || '▾' : userStyle.iconCollapsed || '▸'), _react["default"].createElement("div", {
        style: {
          flexShrink: 0,
          width: indent
        }
      }), data.data.map(function (colValue, colIndex) {
        var column = columns[colIndex];
        var width = colIndex === 0 ? column.width - indent : column.width;
        return _react["default"].createElement(_styledComponents.TableCell, {
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

  (0, _createClass2["default"])(TreeTableRow, [{
    key: "_toggleExpansion",
    value: function _toggleExpansion(id) {
      this.props.toggleExpansion(id, this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      return this._renderItem((0, _objectSpread3["default"])({}, this.props));
    }
  }]);
  return TreeTableRow;
}(_react.PureComponent);

exports["default"] = TreeTableRow;
(0, _defineProperty2["default"])(TreeTableRow, "propTypes", {
  id: _propTypes["default"].string,
  data: _propTypes["default"].shape({
    data: _propTypes["default"].array,
    children: _propTypes["default"].array
  }),
  style: _propTypes["default"].object,
  indentSize: _propTypes["default"].number,
  renderCell: _propTypes["default"].func,
  columns: _propTypes["default"].array,
  getIsExpanded: _propTypes["default"].func,
  toggleExpansion: _propTypes["default"].func
});
//# sourceMappingURL=tree-table-row.js.map