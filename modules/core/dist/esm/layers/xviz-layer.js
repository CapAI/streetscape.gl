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
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { CompositeLayer } from '@deck.gl/core';
import { ScatterplotLayer, PathLayer, PolygonLayer, TextLayer } from '@deck.gl/layers';
import PointCloudLayer from './point-cloud-layer/point-cloud-layer';
import { XVIZObject } from '@xviz/parser';
import deepExtend from 'lodash.merge';
var XVIZ_TO_LAYER_TYPE = {
  points2d: 'scatterplot',
  points3d: 'pointcloud',
  point2d: 'scatterplot',
  circle2d: 'scatterplot',
  line2d: 'path',
  path2d: 'path',
  polygon2d: 'polygon',
  point: 'pointcloud',
  circle: 'scatterplot',
  polyline: 'path',
  polygon: 'polygon',
  text: 'text',
  stadium: 'stadium'
};
var STYLE_TO_LAYER_PROP = {
  scatterplot: {
    opacity: 'opacity',
    radius_min_pixels: 'radiusMinPixels',
    radius_max_pixels: 'radiusMaxPixels',
    radius: 'getRadius',
    stroked: 'stroked',
    filled: 'filled',
    stroke_width_min_pixels: 'lineWidthMinPixels',
    stroke_width_max_pixels: 'lineWidthMaxPixels',
    stroke_width: 'getLineWidth',
    stroke_color: 'getLineColor',
    fill_color: 'getFillColor'
  },
  pointcloud: {
    opacity: 'opacity',
    radius_pixels: 'pointSize',
    fill_color: 'getColor',
    point_color_mode: 'colorMode',
    point_color_domain: 'colorDomain'
  },
  path: {
    opacity: 'opacity',
    stroke_width_min_pixels: 'widthMinPixels',
    stroke_width_max_pixels: 'widthMaxPixels',
    stroke_color: 'getColor',
    stroke_width: 'getWidth'
  },
  stadium: {
    opacity: 'opacity',
    radius_min_pixels: 'widthMinPixels',
    radius_max_pixels: 'widthMaxPixels',
    fill_color: 'getColor',
    radius: 'getWidth'
  },
  polygon: {
    opacity: 'opacity',
    stroked: 'stroked',
    filled: 'filled',
    extruded: 'extruded',
    stroke_color: 'getLineColor',
    stroke_width: 'getLineWidth',
    stroke_width_min_pixels: 'lineWidthMinPixels',
    stroke_width_max_pixels: 'lineWidthMaxPixels',
    fill_color: 'getFillColor',
    height: 'getElevation'
  },
  text: {
    opacity: 'opacity',
    fill_color: 'getColor',
    font_family: 'fontFamily',
    font_weight: 'fontWeight',
    text_size: 'getSize',
    text_rotation: 'getAngle',
    text_anchor: 'getTextAnchor',
    text_baseline: 'getAlignmentBaseline'
  }
};
var EMPTY_OBJECT = {};

var getInlineProperty = function getInlineProperty(context, propertyName, objectState) {
  var inlineProp = objectState[propertyName];
  return inlineProp === undefined ? null : inlineProp;
};

var getStylesheetProperty = function getStylesheetProperty(context, propertyName, objectState) {
  return context.style.getProperty(propertyName, objectState);
};

function getProperty(context, propertyName) {
  var f = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;
  var objectState = f;

  if (context.useSemanticColor) {
    switch (propertyName) {
      case 'stroke_color':
      case 'fill_color':
        objectState = XVIZObject.get(f.id) || f;
        break;

      default:
    }
  }

  var altPropertyName = null;

  switch (propertyName) {
    case 'stroke_color':
    case 'fill_color':
      altPropertyName = 'color';
      break;

    case 'stroke_width':
      altPropertyName = 'thickness';
      break;

    case 'radius':
      if (f.radius) {
        return f.radius;
      }

      break;

    default:
      break;
  }

  var property = getStylesheetProperty(context, propertyName, objectState);

  if (property === null && altPropertyName) {
    property = getStylesheetProperty(context, altPropertyName, objectState);
  }

  if (property === null && !context.disableInlineStyling) {
    property = getInlineProperty(context, propertyName, objectState);

    if (property === null && altPropertyName) {
      property = getInlineProperty(context, altPropertyName, objectState);
    }
  }

  if (property === null) {
    property = context.style.getPropertyDefault(propertyName);
  }

  if (propertyName === 'text_anchor' || propertyName === 'text_baseline') {
    property = property.toLowerCase();
  }

  return property;
}

var XVIZLayer = function (_CompositeLayer) {
  _inherits(XVIZLayer, _CompositeLayer);

  function XVIZLayer() {
    _classCallCheck(this, XVIZLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(XVIZLayer).apply(this, arguments));
  }

  _createClass(XVIZLayer, [{
    key: "_getProperty",
    value: function _getProperty(propertyName) {
      return getProperty(this.props, propertyName);
    }
  }, {
    key: "_getPropertyAccessor",
    value: function _getPropertyAccessor(propertyName) {
      var _this = this;

      return function (f) {
        return getProperty(_this.props, propertyName, f);
      };
    }
  }, {
    key: "_getDefaultLayerProps",
    value: function _getDefaultLayerProps(style, styleToLayerProp) {
      var layerProps = {
        updateTriggers: {}
      };

      for (var stylePropName in styleToLayerProp) {
        var layerPropName = styleToLayerProp[stylePropName];
        var isAccessor = layerPropName.startsWith('get');

        if (isAccessor) {
          layerProps.updateTriggers[layerPropName] = {
            style: stylePropName,
            dependencies: style.getPropertyDependencies(stylePropName)
          };
        } else {
          layerProps[layerPropName] = this._getProperty(stylePropName);
        }
      }

      return layerProps;
    }
  }, {
    key: "_getLayerProps",
    value: function _getLayerProps() {
      var _this2 = this;

      var objectStates = this.props.objectStates;
      var layerProps = this.state.layerProps;
      var updateTriggers = layerProps.updateTriggers;

      var _loop = function _loop(key) {
        var trigger = updateTriggers[key];
        layerProps[key] = _this2._getPropertyAccessor(trigger.style);
        updateTriggers[key] = _objectSpread2({}, trigger);
        trigger.dependencies.forEach(function (stateName) {
          updateTriggers[key][stateName] = objectStates[stateName];
        });
      };

      for (var key in updateTriggers) {
        _loop(key);
      }

      return layerProps;
    }
  }, {
    key: "_getLayerType",
    value: function _getLayerType(data) {
      if (data.length > 0) {
        return data[0].type;
      }

      return null;
    }
  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var props = _ref.props,
          oldProps = _ref.oldProps,
          changeFlags = _ref.changeFlags;
      var type = this.state.type;

      if (changeFlags.dataChanged) {
        var data = props.data;

        var dataType = this._getLayerType(data);

        type = XVIZ_TO_LAYER_TYPE[dataType];

        if (type === 'scatterplot' && data[0].vertices && Array.isArray(data[0].vertices[0])) {
          data = data.reduce(function (arr, multiPoints) {
            multiPoints.vertices.forEach(function (pt) {
              arr.push(_objectSpread2({}, multiPoints, {
                vertices: pt
              }));
            });
            return arr;
          }, []);
        }

        this.setState({
          data: data
        });
      }

      if (type !== this.state.type || props.style !== oldProps.style) {
        var styleToLayerProp = STYLE_TO_LAYER_PROP[type];

        var layerProps = this._getDefaultLayerProps(props.style, styleToLayerProp);

        this.setState({
          type: type,
          layerProps: layerProps
        });
      }
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      var lightSettings = this.props.lightSettings;
      var _this$state = this.state,
          type = _this$state.type,
          data = _this$state.data;

      if (!type) {
        return null;
      }

      var _this$props = this.props,
          linkTitle = _this$props.linkTitle,
          streamName = _this$props.streamName,
          objectType = _this$props.objectType;

      var layerProps = this._getLayerProps();

      var updateTriggers = layerProps.updateTriggers;
      var forwardProps = {
        linkTitle: linkTitle,
        streamName: streamName,
        objectType: objectType
      };

      switch (type) {
        case 'scatterplot':
          return new ScatterplotLayer(forwardProps, layerProps, this.getSubLayerProps({
            id: 'scatterplot',
            data: data,
            getPosition: function getPosition(f) {
              return f.vertices || f.center;
            },
            updateTriggers: deepExtend(updateTriggers, {
              getFillColor: {
                useSemanticColor: this.props.useSemanticColor
              }
            })
          }));

        case 'pointcloud':
          return new PointCloudLayer(forwardProps, layerProps, this.getSubLayerProps({
            id: 'pointcloud',
            data: data[0].ids,
            numInstances: data[0].points.length / 3,
            instancePositions: data[0].points,
            instanceColors: data[0].colors,
            vehicleRelativeTransform: this.props.vehicleRelativeTransform,
            getPosition: function getPosition(p) {
              return p;
            }
          }));

        case 'path':
          return new PathLayer(forwardProps, layerProps, this.getSubLayerProps({
            id: 'path',
            data: data,
            getPath: function getPath(f) {
              return f.vertices;
            },
            updateTriggers: deepExtend(updateTriggers, {
              getColor: {
                useSemanticColor: this.props.useSemanticColor
              }
            })
          }));

        case 'stadium':
          return new PathLayer(forwardProps, layerProps, this.getSubLayerProps({
            id: 'stadium',
            data: data,
            getPath: function getPath(f) {
              return [f.start, f.end];
            },
            rounded: true,
            updateTriggers: deepExtend(updateTriggers, {
              getColor: {
                useSemanticColor: this.props.useSemanticColor
              }
            })
          }));

        case 'polygon':
          return new PolygonLayer(forwardProps, layerProps, this.getSubLayerProps({
            id: 'polygon',
            opacity: this.props.opacity || 1,
            data: data,
            lightSettings: lightSettings,
            wireframe: layerProps.stroked,
            getPolygon: function getPolygon(f) {
              return f.vertices;
            },
            updateTriggers: deepExtend(updateTriggers, {
              getLineColor: {
                useSemanticColor: this.props.useSemanticColor
              },
              getFillColor: {
                useSemanticColor: this.props.useSemanticColor
              }
            })
          }));

        case 'text':
          return new TextLayer(forwardProps, layerProps, this.getSubLayerProps({
            id: 'text',
            data: data,
            getText: function getText(f) {
              return f.text;
            },
            updateTriggers: deepExtend(updateTriggers, {
              getColor: {
                useSemanticColor: this.props.useSemanticColor
              }
            })
          }));

        default:
          return null;
      }
    }
  }]);

  return XVIZLayer;
}(CompositeLayer);

export { XVIZLayer as default };
XVIZLayer.layerName = 'XVIZLayer';
//# sourceMappingURL=xviz-layer.js.map