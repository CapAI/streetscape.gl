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
import { AutoSizer } from '@streetscape.gl/monochrome';
import ImageBuffer from '../../utils/image-buffer';
export default class ImageSequence extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onCanvasLoad", ref => {
      this._canvas = ref;

      if (ref) {
        this._context = ref.getContext('2d');
      }
    });

    _defineProperty(this, "_onCanvasResize", ({
      width,
      height
    }) => {
      this.setState({
        width,
        height
      });
    });

    _defineProperty(this, "_getVideoFilterCSS", () => {
      const {
        brightness,
        contrast,
        saturate,
        invert
      } = this.props;
      const filter = "      ".concat(Number.isFinite(brightness) ? "brightness(".concat(brightness, ") ") : '', "      ").concat(Number.isFinite(saturate) ? "saturate(".concat(saturate, ") ") : '', "      ").concat(Number.isFinite(contrast) ? "contrast(".concat(contrast, ") ") : '', "      ").concat(Number.isFinite(invert) ? "invert(".concat(invert, ") ") : '');
      return filter;
    });

    _defineProperty(this, "_renderFrame", () => {
      if (!this._context) {
        return;
      }

      const width = this.state.width;
      let height = this.state.height;

      if (!width) {
        return;
      }

      this._context.filter = this._getVideoFilterCSS();
      const {
        currentFrameImage
      } = this.state;

      if (!currentFrameImage) {
        this._context.clearRect(0, 0, width, height);
      } else {
        if (this.props.height === 'auto') {
          height = width / currentFrameImage.width * currentFrameImage.height;
        }

        this._canvas.width = width;
        this._canvas.height = height;

        this._context.drawImage(currentFrameImage, 0, 0, width, height);
      }
    });

    this._buffer = new ImageBuffer(10);
    this.state = _objectSpread2({
      width: 0,
      height: 0
    }, this._getCurrentFrames(props));
    this._canvas = null;
    this._context = null;
  }

  componentDidMount() {
    this._renderFrame();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(_objectSpread2({}, this._getCurrentFrames(nextProps)));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentFrameImage !== prevState.currentFrameImage && !this.state.currentFrameImagePending || this.state.width !== prevState.width || this.state.height !== prevState.height) {
      this._renderFrame();
    }
  }

  _getCurrentFrames(props) {
    const {
      currentTime,
      src
    } = props;

    const currentFrame = this._buffer.set(src, currentTime);

    const currentFrameData = this._buffer.get(currentFrame);

    if (currentFrameData && !currentFrameData.image) {
      currentFrameData.promise.then(image => {
        if (this.state.currentFrame === currentFrame) {
          this.setState({
            currentFrameImagePending: false,
            currentFrameImage: image
          });
        }
      });
    }

    return {
      currentFrameImage: currentFrameData && currentFrameData.image,
      currentFrameImagePending: currentFrameData && !currentFrameData.image && true,
      currentFrame
    };
  }

  render() {
    const {
      width,
      height
    } = this.props;
    const style = {
      position: 'relative',
      background: '#000',
      lineHeight: 0,
      width,
      height
    };
    return React.createElement("div", {
      style: style
    }, React.createElement(AutoSizer, {
      onResize: this._onCanvasResize
    }), React.createElement("canvas", {
      ref: this._onCanvasLoad
    }));
  }

}

_defineProperty(ImageSequence, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  src: PropTypes.array,
  brightness: PropTypes.number,
  contrast: PropTypes.number,
  saturate: PropTypes.number,
  invert: PropTypes.number,
  currentTime: PropTypes.number.isRequired
});

_defineProperty(ImageSequence, "defaultProps", {
  width: '100%',
  height: 'auto',
  src: []
});
//# sourceMappingURL=image-sequence.js.map