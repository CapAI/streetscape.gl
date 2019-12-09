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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _core = require("@deck.gl/core");

var _core2 = require("@luma.gl/core");

var _constants = _interopRequireDefault(require("@luma.gl/constants"));

var _trafficLightLayerVertex = _interopRequireDefault(require("./traffic-light-layer-vertex.glsl"));

var _trafficLightLayerFragment = _interopRequireDefault(require("./traffic-light-layer-fragment.glsl"));

var _trafficLightUtils = require("./traffic-light-utils");

var fp64LowPart = _core2.fp64.fp64LowPart;
var LIGHT_COLOR = {
  invalid: [0, 0, 0],
  green: [0, 255, 128],
  yellow: [255, 250, 0],
  red: [255, 16, 16]
};
var LIGHT_SHAPE = {
  circular: 0,
  left_arrow: 1,
  right_arrow: 2
};
var defaultProps = {
  getPosition: {
    type: 'accessor',
    value: function value(x) {
      return x.position;
    }
  },
  getAngle: {
    type: 'accessor',
    value: 0
  },
  getShape: {
    type: 'accessor',
    value: function value(x) {
      return 'circular';
    }
  },
  getColor: {
    type: 'accessor',
    value: function value(x) {
      return 'green';
    }
  },
  getState: {
    type: 'accessor',
    value: 1
  },
  sizeScale: {
    type: 'number',
    value: 0.15,
    min: 0
  },
  fp64: false,
  material: new _core2.PhongMaterial({
    shininess: 0,
    specularColor: [0, 0, 0]
  })
};

var TrafficLightLayer = function (_Layer) {
  (0, _inherits2["default"])(TrafficLightLayer, _Layer);

  function TrafficLightLayer() {
    (0, _classCallCheck2["default"])(this, TrafficLightLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TrafficLightLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(TrafficLightLayer, [{
    key: "getShaders",
    value: function getShaders() {
      return {
        vs: _trafficLightLayerVertex["default"],
        fs: _trafficLightLayerFragment["default"],
        modules: ['project32', 'gouraud-lighting', 'picking']
      };
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      var gl = this.context.gl;

      var modelsByName = this._getModels(gl);

      this.setState({
        models: [modelsByName.box, modelsByName.lights],
        modelsByName: modelsByName
      });
      var attributeManager = this.getAttributeManager();
      attributeManager.addInstanced({
        instancePositions: {
          size: 3,
          accessor: 'getPosition'
        },
        instancePositions64xyLow: {
          size: 2,
          accessor: 'getPosition',
          update: this.calculateInstancePositions64xyLow
        },
        instanceAngles: {
          size: 1,
          accessor: 'getAngle'
        },
        instanceShapes: {
          size: 1,
          type: _constants["default"].UNSIGNED_BYTE,
          accessor: 'getShape',
          update: this.calculateInstanceShapes
        },
        instanceColors: {
          size: 3,
          type: _constants["default"].UNSIGNED_BYTE,
          accessor: 'getColor',
          update: this.calculateInstanceColors
        },
        instanceStates: {
          size: 1,
          type: _constants["default"].UNSIGNED_BYTE,
          accessor: 'getState'
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var sizeScale = this.props.sizeScale;
      var modelsByName = this.state.modelsByName;
      modelsByName.box.setUniforms(Object.assign({}, uniforms, {
        modelScale: [sizeScale * 0.8, sizeScale * 1.6, sizeScale * 1.6]
      })).draw();
      modelsByName.lights.setUniforms(Object.assign({}, uniforms, {
        modelScale: [sizeScale, sizeScale, sizeScale]
      })).draw();
    }
  }, {
    key: "_getModels",
    value: function _getModels(gl) {
      var shaders = this.getShaders();
      var box = new _core2.Model(gl, (0, _objectSpread4["default"])({
        id: "".concat(this.props.id, "-box")
      }, shaders, {
        shaderCache: this.context.shaderCache,
        geometry: new _core2.CubeGeometry(),
        isInstanced: true,
        uniforms: {
          modelTranslate: [0, 0, 0],
          useInstanceColor: false
        }
      }));
      var lights = new _core2.Model(gl, (0, _objectSpread4["default"])({
        id: "".concat(this.props.id, "-light")
      }, shaders, {
        shaderCache: this.context.shaderCache,
        geometry: new _core2.SphereGeometry(),
        isInstanced: true,
        uniforms: {
          lightShapeTexture: (0, _trafficLightUtils.makeLightShapeTexture)(gl),
          modelTranslate: [-0.4, 0, 0],
          useInstanceColor: true
        }
      }));
      return {
        box: box,
        lights: lights
      };
    }
  }, {
    key: "updateAttributes",
    value: function updateAttributes(changedAttributes) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(TrafficLightLayer.prototype), "updateAttributes", this).call(this, changedAttributes);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.getModels()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var model = _step.value;
          model.setInstanceCount(this.props.data.length);
          model.setAttributes(changedAttributes);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "calculateInstancePositions64xyLow",
    value: function calculateInstancePositions64xyLow(attribute) {
      var isFP64 = this.use64bitPositions();
      attribute.constant = !isFP64;

      if (!isFP64) {
        attribute.value = new Float32Array(2);
        return;
      }

      var _this$props = this.props,
          data = _this$props.data,
          getPosition = _this$props.getPosition;
      var value = attribute.value;
      var i = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var point = _step2.value;
          var position = getPosition(point);
          value[i++] = fp64LowPart(position[0]);
          value[i++] = fp64LowPart(position[1]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "calculateInstanceColors",
    value: function calculateInstanceColors(attribute) {
      var _this$props2 = this.props,
          data = _this$props2.data,
          getColor = _this$props2.getColor;
      var value = attribute.value;
      var i = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var point = _step3.value;
          var color = LIGHT_COLOR[getColor(point)] || LIGHT_COLOR.invalid;
          value[i++] = color[0];
          value[i++] = color[1];
          value[i++] = color[2];
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "calculateInstanceShapes",
    value: function calculateInstanceShapes(attribute) {
      var _this$props3 = this.props,
          data = _this$props3.data,
          getShape = _this$props3.getShape;
      var value = attribute.value;
      var i = 0;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var point = _step4.value;
          value[i++] = LIGHT_SHAPE[getShape(point)] || 0;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);
  return TrafficLightLayer;
}(_core.Layer);

exports["default"] = TrafficLightLayer;
TrafficLightLayer.layerName = 'TrafficLightLayer';
TrafficLightLayer.defaultProps = defaultProps;
//# sourceMappingURL=traffic-light-layer.js.map