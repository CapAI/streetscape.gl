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
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { Layer } from '@deck.gl/core';
import { Model, Texture2D } from '@luma.gl/core';
import { loadImage } from '@loaders.gl/images';
import IMAGERY_VERTEX_SHADER from './imagery-layer-vertex';
import IMAGERY_FRAGMENT_SHADER from './imagery-layer-fragment';
import GridGeometry from './grid-geometry';

function getTexture(gl, src) {
  if (typeof src === 'string') {
    return loadImage(src).then(function (data) {
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

  if (data instanceof Texture2D) {
    return data;
  }

  return new Texture2D(gl, {
    data: data,
    parameters: (_parameters = {}, _defineProperty(_parameters, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), _defineProperty(_parameters, gl.TEXTURE_MAG_FILTER, gl.LINEAR), _defineProperty(_parameters, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), _defineProperty(_parameters, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), _parameters)
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
  _inherits(ImageryLayer, _Layer);

  function ImageryLayer() {
    _classCallCheck(this, ImageryLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImageryLayer).apply(this, arguments));
  }

  _createClass(ImageryLayer, [{
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
        var geometry = new GridGeometry({
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
      return new Model(gl, {
        id: this.props.id,
        vs: IMAGERY_VERTEX_SHADER,
        fs: IMAGERY_FRAGMENT_SHADER,
        modules: ['picking', 'project32'],
        shaderCache: this.context.shaderCache,
        vertexCount: 0,
        isIndexed: true
      });
    }
  }]);

  return ImageryLayer;
}(Layer);

export { ImageryLayer as default };
ImageryLayer.layerName = 'ImageryLayer';
ImageryLayer.defaultProps = defaultProps;
//# sourceMappingURL=imagery-layer.js.map