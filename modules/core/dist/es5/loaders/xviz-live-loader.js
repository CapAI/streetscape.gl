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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _assert = _interopRequireDefault(require("assert"));

var _parser = require("@xviz/parser");

var _xvizWebsocketLoader = _interopRequireDefault(require("./xviz-websocket-loader"));

var DEFAULT_LOG_PROFILE = 'default';
var DEFAULT_RETRY_ATTEMPTS = 3;

function getSocketRequestParams(options) {
  var _options$logProfile = options.logProfile,
      logProfile = _options$logProfile === void 0 ? DEFAULT_LOG_PROFILE : _options$logProfile,
      serverConfig = options.serverConfig,
      _options$bufferLength = options.bufferLength,
      bufferLength = _options$bufferLength === void 0 ? 30 : _options$bufferLength,
      maxConcurrency = options.maxConcurrency,
      WebSocketClass = options.WebSocketClass,
      passThroughOptions = (0, _objectWithoutProperties2["default"])(options, ["logProfile", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);
  var queryParams = (0, _objectSpread3["default"])({}, passThroughOptions, {}, serverConfig.queryParams, {
    profile: logProfile
  });
  var retryAttempts = Number.isInteger(serverConfig.retryAttempts) ? serverConfig.retryAttempts : DEFAULT_RETRY_ATTEMPTS;
  var qs = Object.keys(queryParams).map(function (key) {
    return "".concat(key, "=").concat(queryParams[key]);
  }).join('&');
  return {
    url: "".concat(serverConfig.serverUrl, "?").concat(qs),
    logProfile: logProfile,
    bufferLength: bufferLength,
    retryAttempts: retryAttempts,
    serverConfig: serverConfig
  };
}

var XVIZLiveLoader = function (_XVIZWebsocketLoader) {
  (0, _inherits2["default"])(XVIZLiveLoader, _XVIZWebsocketLoader);

  function XVIZLiveLoader() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, XVIZLiveLoader);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(XVIZLiveLoader).call(this, options));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onOpen", function () {});
    _this.requestParams = getSocketRequestParams(options);
    (0, _assert["default"])(_this.requestParams.bufferLength, 'bufferLength must be provided');
    _this.retrySettings = {
      retries: _this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    var bufferChunk = _this.requestParams.bufferLength / 3;
    _this.streamBuffer = new _parser.XVIZStreamBuffer({
      startOffset: -2 * bufferChunk,
      endOffset: bufferChunk
    });
    return _this;
  }

  (0, _createClass2["default"])(XVIZLiveLoader, [{
    key: "seek",
    value: function seek(timestamp) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZLiveLoader.prototype), "seek", this).call(this, timestamp);
      this.streamBuffer.setCurrentTime(timestamp);
    }
  }, {
    key: "_getBufferStartTime",
    value: function _getBufferStartTime() {
      return this.streamBuffer.getBufferRange().start;
    }
  }, {
    key: "_getBufferEndTime",
    value: function _getBufferEndTime() {
      return this.streamBuffer.getBufferRange().end;
    }
  }, {
    key: "_onXVIZTimeslice",
    value: function _onXVIZTimeslice(message) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZLiveLoader.prototype), "_onXVIZTimeslice", this).call(this, message);
      this.seek(message.timestamp);
    }
  }]);
  return XVIZLiveLoader;
}(_xvizWebsocketLoader["default"]);

exports["default"] = XVIZLiveLoader;
//# sourceMappingURL=xviz-live-loader.js.map