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
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from '@streetscape.gl/monochrome';
import ImageBuffer from '../../utils/image-buffer';

var ImageSequence = function (_PureComponent) {
  _inherits(ImageSequence, _PureComponent);

  function ImageSequence(props) {
    var _this;

    _classCallCheck(this, ImageSequence);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageSequence).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_onCanvasLoad", function (ref) {
      _this._canvas = ref;

      if (ref) {
        _this._context = ref.getContext('2d');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onCanvasResize", function (_ref) {
      var width = _ref.width,
          height = _ref.height;

      _this.setState({
        width: width,
        height: height
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getVideoFilterCSS", function () {
      var _this$props = _this.props,
          brightness = _this$props.brightness,
          contrast = _this$props.contrast,
          saturate = _this$props.saturate,
          invert = _this$props.invert;
      var filter = "      ".concat(Number.isFinite(brightness) ? "brightness(".concat(brightness, ") ") : '', "      ").concat(Number.isFinite(saturate) ? "saturate(".concat(saturate, ") ") : '', "      ").concat(Number.isFinite(contrast) ? "contrast(".concat(contrast, ") ") : '', "      ").concat(Number.isFinite(invert) ? "invert(".concat(invert, ") ") : '');
      return filter;
    });

    _defineProperty(_assertThisInitialized(_this), "_renderFrame", function () {
      if (!_this._context) {
        return;
      }

      var width = _this.state.width;
      var height = _this.state.height;

      if (!width) {
        return;
      }

      _this._context.filter = _this._getVideoFilterCSS();
      var currentFrameImage = _this.state.currentFrameImage;

      if (!currentFrameImage) {
        _this._context.clearRect(0, 0, width, height);
      } else {
        if (_this.props.height === 'auto') {
          height = width / currentFrameImage.width * currentFrameImage.height;
        }

        _this._canvas.width = width;
        _this._canvas.height = height;

        _this._context.drawImage(currentFrameImage, 0, 0, width, height);
      }
    });

    _this._buffer = new ImageBuffer(10);
    _this.state = _objectSpread2({
      width: 0,
      height: 0
    }, _this._getCurrentFrames(props));
    _this._canvas = null;
    _this._context = null;
    return _this;
  }

  _createClass(ImageSequence, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._renderFrame();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(_objectSpread2({}, this._getCurrentFrames(nextProps)));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.currentFrameImage !== prevState.currentFrameImage && !this.state.currentFrameImagePending || this.state.width !== prevState.width || this.state.height !== prevState.height) {
        this._renderFrame();
      }
    }
  }, {
    key: "_getCurrentFrames",
    value: function _getCurrentFrames(props) {
      var _this2 = this;

      var currentTime = props.currentTime,
          src = props.src;

      var currentFrame = this._buffer.set(src, currentTime);

      var currentFrameData = this._buffer.get(currentFrame);

      if (currentFrameData && !currentFrameData.image) {
        currentFrameData.promise.then(function (image) {
          if (_this2.state.currentFrame === currentFrame) {
            _this2.setState({
              currentFrameImagePending: false,
              currentFrameImage: image
            });
          }
        });
      }

      return {
        currentFrameImage: currentFrameData && currentFrameData.image,
        currentFrameImagePending: currentFrameData && !currentFrameData.image && true,
        currentFrame: currentFrame
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height;
      var style = {
        position: 'relative',
        background: '#000',
        lineHeight: 0,
        width: width,
        height: height
      };
      return React.createElement("div", {
        style: style
      }, React.createElement(AutoSizer, {
        onResize: this._onCanvasResize
      }), React.createElement("canvas", {
        ref: this._onCanvasLoad
      }));
    }
  }]);

  return ImageSequence;
}(PureComponent);

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

export { ImageSequence as default };
//# sourceMappingURL=image-sequence.js.map