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
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { PointCloudLayer as CorePointCloudLayer } from '@deck.gl/layers';
import vs from './point-cloud-layer-vertex.glsl';
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
  _inherits(PointCloudLayer, _CorePointCloudLayer);

  function PointCloudLayer() {
    _classCallCheck(this, PointCloudLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(PointCloudLayer).apply(this, arguments));
  }

  _createClass(PointCloudLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = _get(_getPrototypeOf(PointCloudLayer.prototype), "getShaders", this).call(this);

      shaders.vs = vs;
      return shaders;
    }
  }, {
    key: "updateState",
    value: function updateState(params) {
      _get(_getPrototypeOf(PointCloudLayer.prototype), "updateState", this).call(this, params);

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

      _get(_getPrototypeOf(PointCloudLayer.prototype), "draw", this).call(this, {
        uniforms: Object.assign({}, uniforms, {
          colorMode: COLOR_MODE[colorMode] || COLOR_MODE["default"],
          colorDomain: colorDomain || COLOR_DOMAIN[colorMode] || COLOR_DOMAIN["default"],
          vehicleDistanceTransform: vehicleDistanceTransform
        })
      });
    }
  }]);

  return PointCloudLayer;
}(CorePointCloudLayer);

export { PointCloudLayer as default };
PointCloudLayer.layerName = 'PointCloudLayer';
PointCloudLayer.defaultProps = defaultProps;
//# sourceMappingURL=point-cloud-layer.js.map