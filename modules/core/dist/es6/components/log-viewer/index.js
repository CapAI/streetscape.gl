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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setObjectState } from '../../utils/object-state';
import Core3DViewer from './core-3d-viewer';
import HoverTooltip from './hover-tooltip';
import connectToLog from '../connect';
import { DEFAULT_VIEW_STATE } from '../../constants';

const noop = () => {};

const preventDefault = evt => evt.preventDefault();

class LogViewer extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onViewStateChange", ({
      viewState,
      viewOffset
    }) => {
      this.setState({
        viewState,
        viewOffset
      });
      this.props.onViewStateChange({
        viewState,
        viewOffset
      });
    });

    _defineProperty(this, "_onHoverObject", (info, evt) => {
      if (this.props.showTooltip && info && info.object) {
        this.setState({
          hoverInfo: info
        });
      } else if (this.state.hoverInfo) {
        this.setState({
          hoverInfo: null
        });
      }
    });

    _defineProperty(this, "_onClickObject", (info, evt) => {
      this.props.onClick(info, evt);
      const objectId = info && info.object && info.object.id;

      if (objectId && !this.props.onSelectObject(info, evt)) {
        let {
          objectStates
        } = this.state;
        const isObjectSelected = objectStates.selected && objectStates.selected[objectId];
        objectStates = setObjectState(objectStates, {
          stateName: 'selected',
          id: objectId,
          value: !isObjectSelected
        });
        this.setState({
          objectStates
        });
        this.props.onObjectStateChange(objectStates);
      }
    });

    _defineProperty(this, "_onContextMenu", (info, evt) => {
      this.props.onContextMenu(info, evt);
    });

    this.state = {
      viewState: _objectSpread2({
        width: 1,
        height: 1,
        longitude: 0,
        latitude: 0
      }, DEFAULT_VIEW_STATE, {}, props.viewMode.initialViewState),
      viewOffset: {
        x: 0,
        y: 0,
        bearing: 0
      },
      objectStates: {},
      hoverInfo: null
    };
  }

  _renderTooltip() {
    const {
      showTooltip,
      style,
      renderTooltip
    } = this.props;
    const {
      hoverInfo
    } = this.state;
    return showTooltip && hoverInfo && React.createElement(HoverTooltip, {
      info: hoverInfo,
      style: style.tooltip,
      renderContent: renderTooltip
    });
  }

  render() {
    const viewState = this.props.viewState || this.state.viewState;
    const viewOffset = this.props.viewOffset || this.state.viewOffset;
    const objectStates = this.props.objectStates || this.state.objectStates;
    return React.createElement("div", {
      onContextMenu: preventDefault
    }, React.createElement(Core3DViewer, _extends({}, this.props, {
      onViewStateChange: this._onViewStateChange,
      onClick: this._onClickObject,
      onHover: this._onHoverObject,
      onContextMenu: this._onContextMenu,
      viewState: viewState,
      viewOffset: viewOffset,
      objectStates: objectStates
    }), this._renderTooltip()));
  }

}

_defineProperty(LogViewer, "propTypes", _objectSpread2({}, Core3DViewer.propTypes, {
  renderTooltip: PropTypes.func,
  style: PropTypes.object,
  onSelectObject: PropTypes.func,
  onContextMenu: PropTypes.func,
  onViewStateChange: PropTypes.func,
  onObjectStateChange: PropTypes.func,
  viewState: PropTypes.object,
  viewOffset: PropTypes.object,
  objectStates: PropTypes.object
}));

_defineProperty(LogViewer, "defaultProps", _objectSpread2({}, Core3DViewer.defaultProps, {
  style: {},
  onViewStateChange: noop,
  onObjectStateChange: noop,
  onSelectObject: noop,
  onContextMenu: noop,
  getTransformMatrix: (streamName, context) => null
}));

const getLogState = log => ({
  frame: log.getCurrentFrame(),
  metadata: log.getMetadata(),
  streamsMetadata: log.getStreamsMetadata()
});

export default connectToLog({
  getLogState,
  Component: LogViewer
});
//# sourceMappingURL=index.js.map