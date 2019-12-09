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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { COORDINATE_SYSTEM } from '@deck.gl/core';
import ObjectLabelsOverlay from './object-labels-overlay';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { XVIZStyleParser } from '@xviz/parser';
import XVIZLayer from '../../layers/xviz-layer';
import { VIEW_MODE, DEFAULT_VIEW_STATE } from '../../constants';
import { getViewStateOffset, getViews, getViewStates } from '../../utils/viewport';
import { resolveCoordinateTransform } from '../../utils/transform';
import { mergeXVIZStyles } from '../../utils/style';
import { normalizeStreamFilter } from '../../utils/stream-utils';
import stats from '../../utils/stats';
import memoize from '../../utils/memoize';
import { DEFAULT_ORIGIN, CAR_DATA, LIGHTS, DEFAULT_CAR } from './constants';

const noop = () => {};

const Z_INDEX = {
  car: 0,
  point: 1,
  polygon: 2,
  customDefault: 3
};
export default class Core3DViewer extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "deckRef", React.createRef());

    _defineProperty(this, "_onMapLoad", evt => {
      const map = evt.target;
      this.props.onMapLoad(map);
    });

    _defineProperty(this, "_onDeckLoad", () => {
      const deck = this.deckRef.current.deck;
      this.props.onDeckLoad(deck);
    });

    _defineProperty(this, "_onMetrics", deckMetrics => {
      if (this.props.debug) {
        const metrics = Object.assign({}, deckMetrics);
        const table = stats.getTable();

        for (const key in table) {
          metrics[key] = table[key].count;
        }

        this.props.debug(metrics);
      }

      stats.reset();
    });

    _defineProperty(this, "_onViewStateChange", ({
      viewState,
      oldViewState
    }) => {
      const viewOffset = getViewStateOffset(oldViewState, viewState, this.props.viewOffset);
      this.props.onViewStateChange({
        viewState,
        viewOffset
      });
    });

    _defineProperty(this, "_onLayerHover", (info, evt) => {
      const objectId = info && info.object && info.object.id;
      this.isHovering = Boolean(objectId);
      this.props.onHover(info, evt);
    });

    _defineProperty(this, "_onLayerClick", (info, evt) => {
      const isRightClick = evt.which === 3;

      if (isRightClick) {
        this.props.onContextMenu(info, evt);
      } else {
        this.props.onClick(info, evt);
      }
    });

    _defineProperty(this, "_layerFilter", ({
      layer,
      viewport,
      isPicking
    }) => {
      if (viewport.id === 'driver' && layer.id === 'car') {
        return false;
      }

      if (isPicking) {
        if (this.props.showTooltip) {
          return true;
        }

        if (layer.id.startsWith('xviz-')) {
          const sampleData = layer.props.data[0];
          return sampleData && sampleData.id;
        }
      }

      return true;
    });

    _defineProperty(this, "_getCursor", () => {
      return this.isHovering ? 'pointer' : 'crosshair';
    });

    this.state = {
      styleParser: this._getStyleParser(props),
      views: getViews(props.viewMode)
    };
    this.getLayers = memoize(this._getLayers.bind(this));
    this.getViewState = memoize(this._getViewState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.viewMode !== nextProps.viewMode) {
      const viewState = _objectSpread2({}, this.props.viewState, {}, DEFAULT_VIEW_STATE, {}, nextProps.viewMode.initialViewState);

      const viewOffset = {
        x: 0,
        y: 0,
        bearing: 0
      };
      nextProps.onViewStateChange({
        viewState,
        viewOffset
      });
      this.setState({
        views: getViews(nextProps.viewMode)
      });
    }

    if (this.props.metadata !== nextProps.metadata || this.props.xvizStyles !== nextProps.xvizStyles) {
      this.setState({
        styleParser: this._getStyleParser(nextProps)
      });
    }

    if (this.props.frame !== nextProps.frame) {
      stats.get('frame-update').incrementCount();
    }
  }

  _getStyleParser({
    metadata,
    xvizStyles
  }) {
    return new XVIZStyleParser(mergeXVIZStyles(metadata && metadata.styles, xvizStyles));
  }

  _getCarLayer({
    frame,
    car
  }) {
    const {
      origin = DEFAULT_ORIGIN,
      mesh,
      scale = [1, 1, 1],
      wireframe = false,
      texture = null,
      color = [0, 0, 0]
    } = car;
    return new SimpleMeshLayer({
      id: 'car',
      opacity: 1,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: frame.origin || DEFAULT_ORIGIN,
      getTransformMatrix: d => frame.vehicleRelativeTransform.clone().translate(origin).scale(scale),
      mesh,
      data: CAR_DATA,
      pickable: true,
      getPosition: d => d,
      getColor: color,
      texture,
      wireframe,
      updateTriggers: {
        getTransformMatrix: frame.vehicleRelativeTransform
      },
      zIndex: Z_INDEX.car
    });
  }

  _getLayers(opts) {
    const {
      frame,
      streamsMetadata,
      objectStates,
      customLayers,
      getTransformMatrix,
      styleParser
    } = opts;

    if (!frame) {
      return [];
    }

    const {
      streams,
      lookAheads = {}
    } = frame;
    const streamFilter = normalizeStreamFilter(opts.streamFilter);
    const featuresAndFutures = new Set(Object.keys(streams).concat(Object.keys(lookAheads)).filter(streamFilter));
    let layerList = [this._getCarLayer(opts)];
    layerList = layerList.concat(Array.from(featuresAndFutures).map(streamName => {
      const stream = lookAheads[streamName] || streams[streamName];
      const coordinateProps = resolveCoordinateTransform(frame, streamName, streamsMetadata[streamName], getTransformMatrix);
      const stylesheet = styleParser.getStylesheet(streamName);
      const primitives = stream.features || stream;

      if (primitives && primitives.length) {
        return new XVIZLayer(_objectSpread2({
          id: "xviz-".concat(streamName)
        }, coordinateProps, {
          pickable: true,
          data: primitives,
          style: stylesheet,
          objectStates,
          vehicleRelativeTransform: frame.vehicleRelativeTransform,
          zIndex: Z_INDEX[primitives[0].type] || 0,
          streamName
        }));
      }

      return null;
    }).filter(Boolean));
    layerList = layerList.concat(customLayers.map(layer => {
      const {
        props
      } = layer;
      const additionalProps = {
        zIndex: 'zIndex' in props ? props.zIndex : Z_INDEX.customDefault
      };

      if (props.streamName) {
        const stream = streams[props.streamName];
        Object.assign(additionalProps, resolveCoordinateTransform(frame, props.streamName, streamsMetadata[props.streamName], getTransformMatrix), {
          data: stream && stream.features
        });
      } else if (props.coordinate) {
        Object.assign(additionalProps, resolveCoordinateTransform(frame, null, props, getTransformMatrix));
      } else {
        return layer;
      }

      return layer.clone(additionalProps);
    }));
    return layerList.sort((layer1, layer2) => (layer1.props.zIndex || 0) - (layer2.props.zIndex || 0));
  }

  _getViewState({
    viewMode,
    frame,
    viewState,
    viewOffset
  }) {
    const trackedPosition = frame ? {
      longitude: frame.trackPosition[0],
      latitude: frame.trackPosition[1],
      altitude: frame.trackPosition[2],
      bearing: 90 - frame.heading
    } : null;
    return getViewStates({
      viewState,
      viewMode,
      trackedPosition,
      offset: viewOffset
    });
  }

  render() {
    const {
      mapboxApiAccessToken,
      frame,
      car,
      streamsMetadata,
      streamFilter,
      objectStates,
      renderObjectLabel,
      customLayers,
      getTransformMatrix,
      style,
      mapStyle,
      viewMode,
      viewState,
      viewOffset,
      showMap
    } = this.props;
    const {
      styleParser,
      views
    } = this.state;
    const layers = this.getLayers({
      frame,
      car,
      streamsMetadata,
      streamFilter,
      objectStates,
      customLayers,
      getTransformMatrix,
      styleParser
    });
    const viewStates = this.getViewState({
      viewMode,
      frame,
      viewState,
      viewOffset
    });
    return React.createElement(DeckGL, {
      width: "100%",
      height: "100%",
      ref: this.deckRef,
      effects: [LIGHTS],
      views: views,
      viewState: viewStates,
      layers: layers,
      layerFilter: this._layerFilter,
      getCursor: this._getCursor,
      onLoad: this._onDeckLoad,
      onHover: this._onLayerHover,
      onClick: this._onLayerClick,
      onViewStateChange: this._onViewStateChange,
      _onMetrics: this._onMetrics
    }, showMap && React.createElement(StaticMap, {
      reuseMap: true,
      attributionControl: false,
      mapboxApiAccessToken: mapboxApiAccessToken,
      mapStyle: mapStyle,
      visible: frame && frame.origin && !viewMode.firstPerson,
      onLoad: this._onMapLoad
    }), React.createElement(ObjectLabelsOverlay, {
      objectSelection: objectStates.selected,
      frame: frame,
      streamsMetadata: streamsMetadata,
      renderObjectLabel: renderObjectLabel,
      xvizStyleParser: styleParser,
      style: style,
      getTransformMatrix: getTransformMatrix
    }), this.props.children);
  }

}

_defineProperty(Core3DViewer, "propTypes", {
  frame: PropTypes.object,
  metadata: PropTypes.object,
  streamsMetadata: PropTypes.object,
  showMap: PropTypes.bool,
  showTooltip: PropTypes.bool,
  mapboxApiAccessToken: PropTypes.string,
  mapStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  xvizStyles: PropTypes.object,
  car: PropTypes.object,
  viewMode: PropTypes.object,
  streamFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.func]),
  customLayers: PropTypes.array,
  renderObjectLabel: PropTypes.func,
  getTransformMatrix: PropTypes.func,
  onMapLoad: PropTypes.func,
  onDeckLoad: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onViewStateChange: PropTypes.func,
  debug: PropTypes.func,
  viewState: PropTypes.object,
  viewOffset: PropTypes.object,
  objectStates: PropTypes.object
});

_defineProperty(Core3DViewer, "defaultProps", {
  car: DEFAULT_CAR,
  viewMode: VIEW_MODE.PERSPECTIVE,
  xvizStyles: {},
  customLayers: [],
  onMapLoad: noop,
  onDeckLoad: noop,
  onViewStateChange: noop,
  onHover: noop,
  onClick: noop,
  onContextMenu: noop,
  showMap: true,
  showTooltip: false
});
//# sourceMappingURL=core-3d-viewer.js.map