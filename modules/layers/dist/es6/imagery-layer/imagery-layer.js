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
import { Layer } from '@deck.gl/core';
import { Model, Texture2D } from '@luma.gl/core';
import { loadImage } from '@loaders.gl/images';
import IMAGERY_VERTEX_SHADER from './imagery-layer-vertex';
import IMAGERY_FRAGMENT_SHADER from './imagery-layer-fragment';
import GridGeometry from './grid-geometry';

function getTexture(gl, src) {
  if (typeof src === 'string') {
    return loadImage(src).then(data => getTextureFromData(gl, data)).catch(error => {
      throw new Error("Could not load texture from ".concat(src, ": ").concat(error));
    });
  }

  return new Promise(resolve => resolve(getTextureFromData(gl, src)));
}

function getTextureFromData(gl, data) {
  if (data instanceof Texture2D) {
    return data;
  }

  return new Texture2D(gl, {
    data,
    parameters: {
      [gl.TEXTURE_MIN_FILTER]: gl.LINEAR_MIPMAP_LINEAR,
      [gl.TEXTURE_MAG_FILTER]: gl.LINEAR,
      [gl.TEXTURE_WRAP_S]: gl.CLAMP_TO_EDGE,
      [gl.TEXTURE_WRAP_T]: gl.CLAMP_TO_EDGE
    }
  });
}

const defaultProps = {
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
export default class ImageryLayer extends Layer {
  initializeState() {
    const {
      gl
    } = this.context;
    gl.getExtension('OES_standard_derivatives');
    this.setState({
      model: this.getModel(gl)
    });
  }

  updateState({
    props,
    oldProps,
    changeFlags
  }) {
    const {
      gl
    } = this.context;
    const {
      model
    } = this.state;
    const {
      heightMap,
      imagery,
      uCount,
      vCount
    } = props;

    if (heightMap && heightMap !== oldProps.heightMap) {
      getTexture(gl, heightMap).then(texture => {
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
      getTexture(gl, imagery).then(texture => {
        this.setState({
          imageLoaded: true
        });
        model.setUniforms({
          imageryTexture: texture
        });
      });
    }

    if (uCount !== oldProps.uCount || vCount !== oldProps.vCount) {
      const geometry = new GridGeometry({
        uCount,
        vCount
      });
      model.setGeometry(geometry);
    }

    if (changeFlags.propsChanged) {
      const {
        heightMapBounds,
        heightRange,
        imageryBounds,
        desaturate,
        transparentColor,
        tintColor
      } = props;
      model.setUniforms({
        heightMapBounds,
        heightRange,
        imageryBounds,
        desaturate,
        transparentColor,
        tintColor
      });
    }
  }

  draw(opts) {
    if (this.state.imageLoaded) {
      this.state.model.draw(opts);
    }
  }

  getModel(gl) {
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

}
ImageryLayer.layerName = 'ImageryLayer';
ImageryLayer.defaultProps = defaultProps;
//# sourceMappingURL=imagery-layer.js.map