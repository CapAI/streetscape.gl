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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _layers = require("@deck.gl/layers");

var _pointCloudLayerVertex = _interopRequireDefault(require("./point-cloud-layer-vertex.glsl"));

var COLOR_MODE = {
  "default": 0,
  elevation: 1,
  distance_to_vehicle: 2
};
var COLOR_DOMAIN = {
  "default": [0, 0],
  elevation: [0, 3],
  distance_to_vehicle: [0, 60]
};
var defaultProps = {
  colorMode: 'default',
  colorDomain: null
};

var PointCloudLayer = function (_CorePointCloudLayer) {
  (0, _inherits2["default"])(PointCloudLayer, _CorePointCloudLayer);

  function PointCloudLayer() {
    (0, _classCallCheck2["default"])(this, PointCloudLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PointCloudLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(PointCloudLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointCloudLayer.prototype), "getShaders", this).call(this);
      shaders.vs = _pointCloudLayerVertex["default"];
      return shaders;
    }
  }, {
    key: "updateState",
    value: function updateState(params) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointCloudLayer.prototype), "updateState", this).call(this, params);
      var props = params.props,
          oldProps = params.oldProps;

      if (props.modelMatrix !== oldProps.modelMatrix || props.vehicleRelativeTransform !== oldProps.vehicleRelativeTransform) {
        var vehicleDistanceTransform = props.vehicleRelativeTransform.clone().invert();

        if (props.modelMatrix) {
          vehicleDistanceTransform.multiplyRight(props.modelMatrix);
        }

        this.setState({
          vehicleDistanceTransform: vehicleDistanceTransform
        });
      }

      if (props.instanceColors !== oldProps.instanceColors) {
        var _this$getAttributeMan = this.getAttributeManager().getAttributes(),
            instanceColors = _this$getAttributeMan.instanceColors;

        var colorSize = props.instanceColors ? props.instanceColors.length / props.numInstances : 4;
        instanceColors.size = colorSize;
      }
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var _this$props = this.props,
          colorMode = _this$props.colorMode,
          colorDomain = _this$props.colorDomain;
      var vehicleDistanceTransform = this.state.vehicleDistanceTransform;
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointCloudLayer.prototype), "draw", this).call(this, {
        uniforms: Object.assign({}, uniforms, {
          colorMode: COLOR_MODE[colorMode] || COLOR_MODE["default"],
          colorDomain: colorDomain || COLOR_DOMAIN[colorMode] || COLOR_DOMAIN["default"],
          vehicleDistanceTransform: vehicleDistanceTransform
        })
      });
    }
  }]);
  return PointCloudLayer;
}(_layers.PointCloudLayer);

exports["default"] = PointCloudLayer;
PointCloudLayer.layerName = 'PointCloudLayer';
PointCloudLayer.defaultProps = defaultProps;
//# sourceMappingURL=point-cloud-layer.js.map