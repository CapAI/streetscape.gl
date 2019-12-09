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
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import assert from 'assert';
import { XVIZStreamBuffer } from '@xviz/parser';
import XVIZWebsocketLoader from './xviz-websocket-loader';
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
      passThroughOptions = _objectWithoutProperties(options, ["logProfile", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);

  var queryParams = _objectSpread2({}, passThroughOptions, {}, serverConfig.queryParams, {
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
  _inherits(XVIZLiveLoader, _XVIZWebsocketLoader);

  function XVIZLiveLoader() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZLiveLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(XVIZLiveLoader).call(this, options));

    _defineProperty(_assertThisInitialized(_this), "_onOpen", function () {});

    _this.requestParams = getSocketRequestParams(options);
    assert(_this.requestParams.bufferLength, 'bufferLength must be provided');
    _this.retrySettings = {
      retries: _this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    var bufferChunk = _this.requestParams.bufferLength / 3;
    _this.streamBuffer = new XVIZStreamBuffer({
      startOffset: -2 * bufferChunk,
      endOffset: bufferChunk
    });
    return _this;
  }

  _createClass(XVIZLiveLoader, [{
    key: "seek",
    value: function seek(timestamp) {
      _get(_getPrototypeOf(XVIZLiveLoader.prototype), "seek", this).call(this, timestamp);

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
      _get(_getPrototypeOf(XVIZLiveLoader.prototype), "_onXVIZTimeslice", this).call(this, message);

      this.seek(message.timestamp);
    }
  }]);

  return XVIZLiveLoader;
}(XVIZWebsocketLoader);

export { XVIZLiveLoader as default };
//# sourceMappingURL=xviz-live-loader.js.map