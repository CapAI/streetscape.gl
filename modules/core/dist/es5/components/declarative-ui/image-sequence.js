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

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _monochrome = require("@streetscape.gl/monochrome");

var _imageBuffer = _interopRequireDefault(require("../../utils/image-buffer"));

var ImageSequence = function (_PureComponent) {
  (0, _inherits2["default"])(ImageSequence, _PureComponent);

  function ImageSequence(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ImageSequence);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ImageSequence).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCanvasLoad", function (ref) {
      _this._canvas = ref;

      if (ref) {
        _this._context = ref.getContext('2d');
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCanvasResize", function (_ref) {
      var width = _ref.width,
          height = _ref.height;

      _this.setState({
        width: width,
        height: height
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getVideoFilterCSS", function () {
      var _this$props = _this.props,
          brightness = _this$props.brightness,
          contrast = _this$props.contrast,
          saturate = _this$props.saturate,
          invert = _this$props.invert;
      var filter = "      ".concat(Number.isFinite(brightness) ? "brightness(".concat(brightness, ") ") : '', "      ").concat(Number.isFinite(saturate) ? "saturate(".concat(saturate, ") ") : '', "      ").concat(Number.isFinite(contrast) ? "contrast(".concat(contrast, ") ") : '', "      ").concat(Number.isFinite(invert) ? "invert(".concat(invert, ") ") : '');
      return filter;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderFrame", function () {
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
    _this._buffer = new _imageBuffer["default"](10);
    _this.state = (0, _objectSpread4["default"])({
      width: 0,
      height: 0
    }, _this._getCurrentFrames(props));
    _this._canvas = null;
    _this._context = null;
    return _this;
  }

  (0, _createClass2["default"])(ImageSequence, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._renderFrame();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState((0, _objectSpread4["default"])({}, this._getCurrentFrames(nextProps)));
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
      return _react["default"].createElement("div", {
        style: style
      }, _react["default"].createElement(_monochrome.AutoSizer, {
        onResize: this._onCanvasResize
      }), _react["default"].createElement("canvas", {
        ref: this._onCanvasLoad
      }));
    }
  }]);
  return ImageSequence;
}(_react.PureComponent);

exports["default"] = ImageSequence;
(0, _defineProperty2["default"])(ImageSequence, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  src: _propTypes["default"].array,
  brightness: _propTypes["default"].number,
  contrast: _propTypes["default"].number,
  saturate: _propTypes["default"].number,
  invert: _propTypes["default"].number,
  currentTime: _propTypes["default"].number.isRequired
});
(0, _defineProperty2["default"])(ImageSequence, "defaultProps", {
  width: '100%',
  height: 'auto',
  src: []
});
//# sourceMappingURL=image-sequence.js.map