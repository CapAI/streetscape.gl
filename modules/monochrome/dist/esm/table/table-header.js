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
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from '../shared/autosizer';
import memoize from '../utils/memoize';
import { HeaderContainer, HeaderCell, SortIcon } from './styled-components';
var SORT = {
  NONE: 0,
  ASCEND: 1,
  DESCEND: 2
};

var TableHeader = function (_PureComponent) {
  _inherits(TableHeader, _PureComponent);

  function TableHeader(props) {
    var _this;

    _classCallCheck(this, TableHeader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableHeader).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onResize", function () {
      var columns = _this.formatColumns(_this.props.columns);

      columns.map(function (col, colIndex) {
        var ref = _this._cells[colIndex];

        if (ref) {
          col.width = ref.clientWidth;
        }
      });

      _this.props.onResize(columns);
    });

    _defineProperty(_assertThisInitialized(_this), "_sortColumn", function (index) {
      var columns = _this.formatColumns(_this.props.columns);

      var sortType = columns[index].sort === SORT.ASCEND ? SORT.DESCEND : SORT.ASCEND;
      columns.forEach(function (col, colIndex) {
        col.sort = colIndex === index ? sortType : SORT.NONE;
      });
      var multiplier = sortType === SORT.ASCEND ? 1 : -1;

      var sortFunc = function sortFunc(row1, row2) {
        return row1.data[index] <= row2.data[index] ? -multiplier : multiplier;
      };

      _this.props.onSort(sortFunc);

      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "_renderColumn", function (column, colIndex) {
      var _this$props = _this.props,
          renderHeader = _this$props.renderHeader,
          theme = _this$props.theme,
          userStyle = _this$props.userStyle;
      var styleProps = {
        theme: theme,
        isAscending: column.sort === SORT.ASCEND,
        isDescending: column.sort === SORT.DESCEND
      };
      var icon = null;

      if (styleProps.isAscending) {
        icon = userStyle.iconAscending || '↑';
      } else if (styleProps.isDescending) {
        icon = userStyle.iconDescending || '↓';
      }

      return React.createElement(HeaderCell, _extends({}, styleProps, {
        userStyle: userStyle.headerCell,
        style: {
          width: column.defaultWidth
        },
        key: colIndex,
        index: colIndex,
        ref: function ref(cell) {
          _this._cells[colIndex] = cell;
        },
        onClick: function onClick() {
          return _this._sortColumn(colIndex);
        }
      }), renderHeader({
        column: column.srcObject,
        columnIndex: colIndex
      }), icon && React.createElement(SortIcon, _extends({}, styleProps, {
        userStyle: userStyle.sort
      }), icon));
    });

    _this.formatColumns = memoize(_this._formatColumns);
    _this._cells = [];
    return _this;
  }

  _createClass(TableHeader, [{
    key: "_formatColumns",
    value: function _formatColumns(columns) {
      var totalWeight = 0;
      var weights = [];
      columns.forEach(function (col, colIndex) {
        var weight = 1;

        if (colIndex === 0) {
          weight++;
        }

        if (col.type === 'string') {
          weight++;
        }

        weights[colIndex] = weight;
        totalWeight += weight;
      });
      return columns.map(function (col, colIndex) {
        return {
          srcObject: col,
          name: col.name,
          type: col.type,
          sort: SORT.NONE,
          defaultWidth: "".concat(100 / totalWeight * weights[colIndex], "%")
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          userStyle = _this$props2.userStyle;
      var columns = this.formatColumns(this.props.columns);
      return React.createElement(HeaderContainer, {
        theme: theme,
        userStyle: userStyle.header
      }, columns.map(this._renderColumn), React.createElement(AutoSizer, {
        onResize: this._onResize,
        debounceTime: 200
      }));
    }
  }]);

  return TableHeader;
}(PureComponent);

_defineProperty(TableHeader, "propTypes", {
  columns: PropTypes.arrayOf(PropTypes.object),
  renderHeader: PropTypes.func,
  onSort: PropTypes.func,
  onResize: PropTypes.func
});

export { TableHeader as default };
//# sourceMappingURL=table-header.js.map