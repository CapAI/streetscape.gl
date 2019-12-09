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

var _parser = require("@xviz/parser");

function loadImage(frame) {
  var blob = new Blob([frame.imageData], {
    type: frame.imageType
  });

  if (typeof createImageBitmap !== 'undefined') {
    return createImageBitmap(blob);
  }

  return new Promise(function (resolve, reject) {
    try {
      var image = new Image();

      image.onload = function () {
        return resolve(image);
      };

      image.onerror = reject;
      image.src = URL.createObjectURL(blob);
    } catch (error) {
      reject(error);
    }
  });
}

function deleteImage(image) {
  if (image.close) {
    image.close();
  }
}

var ImageBuffer = function () {
  function ImageBuffer(size) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$imageLoader = _ref.imageLoader,
        imageLoader = _ref$imageLoader === void 0 ? loadImage : _ref$imageLoader,
        _ref$imageDeleter = _ref.imageDeleter,
        imageDeleter = _ref$imageDeleter === void 0 ? deleteImage : _ref$imageDeleter;

    (0, _classCallCheck2["default"])(this, ImageBuffer);
    this.size = size;
    this.imageLoader = imageLoader;
    this.imageDeleter = imageDeleter;
    this.buffer = new Map();
  }

  (0, _createClass2["default"])(ImageBuffer, [{
    key: "get",
    value: function get(frame) {
      return this.buffer.get(frame);
    }
  }, {
    key: "set",
    value: function set(allFrames, currentTime) {
      var _this = this;

      var buffer = this.buffer;

      var _this$_getCurrentFram = this._getCurrentFrames(allFrames, currentTime),
          currentFrame = _this$_getCurrentFram.currentFrame,
          bufferedFrames = _this$_getCurrentFram.bufferedFrames;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = buffer.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var frame = _step.value;

          if (bufferedFrames.length === 0 || frame.time < bufferedFrames[0].time || frame.time > bufferedFrames[bufferedFrames.length - 1].time) {
            this.imageDeleter(buffer.get(frame));
            buffer["delete"](frame);
          }
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

      bufferedFrames.forEach(function (frame) {
        if (!buffer.has(frame)) {
          var data = {};
          data.promise = _this.imageLoader(frame.images[0]).then(function (image) {
            data.image = image;
            return image;
          });
          buffer.set(frame, data);
        }
      });
      return currentFrame;
    }
  }, {
    key: "_getCurrentFrames",
    value: function _getCurrentFrames(allFrames, currentTime) {
      var currentFrame = null;
      var currentFrameIndex = -1;
      var bestDelta = (0, _parser.getXVIZConfig)().TIME_WINDOW;
      allFrames.forEach(function (frame, i) {
        var delta = currentTime - frame.time;

        if (delta >= 0 && delta < bestDelta) {
          bestDelta = delta;
          currentFrame = frame;
          currentFrameIndex = i;
        }
      });
      var bufferedFrames = currentFrameIndex >= 0 ? allFrames.slice(Math.max(0, currentFrameIndex - this.size), currentFrameIndex + this.size) : [];
      return {
        currentFrame: currentFrame,
        bufferedFrames: bufferedFrames
      };
    }
  }]);
  return ImageBuffer;
}();

exports["default"] = ImageBuffer;
//# sourceMappingURL=image-buffer.js.map