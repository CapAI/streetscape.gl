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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _core = require("@deck.gl/core");

var _core2 = require("@luma.gl/core");

var _images = require("@loaders.gl/images");

var _imageryLayerVertex = _interopRequireDefault(require("./imagery-layer-vertex"));

var _imageryLayerFragment = _interopRequireDefault(require("./imagery-layer-fragment"));

var _gridGeometry = _interopRequireDefault(require("./grid-geometry"));

function getTexture(gl, src) {
  if (typeof src === 'string') {
    return (0, _images.loadImage)(src).then(function (data) {
      return getTextureFromData(gl, data);
    })["catch"](function (error) {
      throw new Error("Could not load texture from ".concat(src, ": ").concat(error));
    });
  }

  return new Promise(function (resolve) {
    return resolve(getTextureFromData(gl, src));
  });
}

function getTextureFromData(gl, data) {
  var _parameters;

  if (data instanceof _core2.Texture2D) {
    return data;
  }

  return new _core2.Texture2D(gl, {
    data: data,
    parameters: (_parameters = {}, (0, _defineProperty2["default"])(_parameters, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), (0, _defineProperty2["default"])(_parameters, gl.TEXTURE_MAG_FILTER, gl.LINEAR), (0, _defineProperty2["default"])(_parameters, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), (0, _defineProperty2["default"])(_parameters, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), _parameters)
  });
}

var defaultProps = {
  heightMap: null,
  heightMapBounds: {
    type: 'array',
    value: [0, 0, 1, 1],
    compare: true
  },
  heightRange: {
    type: 'array',
    value: [0, 1],
    compare: true
  },
  imagery: null,
  imageryBounds: {
    type: 'array',
    value: [0, 0, 1, 1],
    compare: true
  },
  uCount: {
    type: 'number',
    value: 1,
    min: 1
  },
  vCount: {
    type: 'number',
    value: 1,
    min: 1
  },
  desaturate: {
    type: 'number',
    value: 0,
    min: 0,
    max: 1
  },
  transparentColor: {
    type: 'color',
    value: [0, 0, 0, 0]
  },
  tintColor: {
    type: 'color',
    value: [255, 255, 255]
  }
};

var ImageryLayer = function (_Layer) {
  (0, _inherits2["default"])(ImageryLayer, _Layer);

  function ImageryLayer() {
    (0, _classCallCheck2["default"])(this, ImageryLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ImageryLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(ImageryLayer, [{
    key: "initializeState",
    value: function initializeState() {
      var gl = this.context.gl;
      gl.getExtension('OES_standard_derivatives');
      this.setState({
        model: this.getModel(gl)
      });
    }
  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var _this = this;

      var props = _ref.props,
          oldProps = _ref.oldProps,
          changeFlags = _ref.changeFlags;
      var gl = this.context.gl;
      var model = this.state.model;
      var heightMap = props.heightMap,
          imagery = props.imagery,
          uCount = props.uCount,
          vCount = props.vCount;

      if (heightMap && heightMap !== oldProps.heightMap) {
        getTexture(gl, heightMap).then(function (texture) {
          model.setUniforms({
            heightMapTexture: texture,
            hasHeightMap: true
          });
        });
      }

      if (imagery !== oldProps.imagery) {
        this.setState({
          imageLoaded: false
        });
        getTexture(gl, imagery).then(function (texture) {
          _this.setState({
            imageLoaded: true
          });

          model.setUniforms({
            imageryTexture: texture
          });
        });
      }

      if (uCount !== oldProps.uCount || vCount !== oldProps.vCount) {
        var geometry = new _gridGeometry["default"]({
          uCount: uCount,
          vCount: vCount
        });
        model.setGeometry(geometry);
      }

      if (changeFlags.propsChanged) {
        var heightMapBounds = props.heightMapBounds,
            heightRange = props.heightRange,
            imageryBounds = props.imageryBounds,
            desaturate = props.desaturate,
            transparentColor = props.transparentColor,
            tintColor = props.tintColor;
        model.setUniforms({
          heightMapBounds: heightMapBounds,
          heightRange: heightRange,
          imageryBounds: imageryBounds,
          desaturate: desaturate,
          transparentColor: transparentColor,
          tintColor: tintColor
        });
      }
    }
  }, {
    key: "draw",
    value: function draw(opts) {
      if (this.state.imageLoaded) {
        this.state.model.draw(opts);
      }
    }
  }, {
    key: "getModel",
    value: function getModel(gl) {
      return new _core2.Model(gl, {
        id: this.props.id,
        vs: _imageryLayerVertex["default"],
        fs: _imageryLayerFragment["default"],
        modules: ['picking', 'project32'],
        shaderCache: this.context.shaderCache,
        vertexCount: 0,
        isIndexed: true
      });
    }
  }]);
  return ImageryLayer;
}(_core.Layer);

exports["default"] = ImageryLayer;
ImageryLayer.layerName = 'ImageryLayer';
ImageryLayer.defaultProps = defaultProps;
//# sourceMappingURL=imagery-layer.js.map