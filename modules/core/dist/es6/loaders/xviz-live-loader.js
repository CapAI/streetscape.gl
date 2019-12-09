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
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import assert from 'assert';
import { XVIZStreamBuffer } from '@xviz/parser';
import XVIZWebsocketLoader from './xviz-websocket-loader';
const DEFAULT_LOG_PROFILE = 'default';
const DEFAULT_RETRY_ATTEMPTS = 3;

function getSocketRequestParams(options) {
  const {
    logProfile = DEFAULT_LOG_PROFILE,
    serverConfig,
    bufferLength = 30,
    maxConcurrency,
    WebSocketClass
  } = options,
        passThroughOptions = _objectWithoutProperties(options, ["logProfile", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);

  const queryParams = _objectSpread2({}, passThroughOptions, {}, serverConfig.queryParams, {
    profile: logProfile
  });

  const retryAttempts = Number.isInteger(serverConfig.retryAttempts) ? serverConfig.retryAttempts : DEFAULT_RETRY_ATTEMPTS;
  const qs = Object.keys(queryParams).map(key => "".concat(key, "=").concat(queryParams[key])).join('&');
  return {
    url: "".concat(serverConfig.serverUrl, "?").concat(qs),
    logProfile,
    bufferLength,
    retryAttempts,
    serverConfig
  };
}

export default class XVIZLiveLoader extends XVIZWebsocketLoader {
  constructor(options = {}) {
    super(options);

    _defineProperty(this, "_onOpen", () => {});

    this.requestParams = getSocketRequestParams(options);
    assert(this.requestParams.bufferLength, 'bufferLength must be provided');
    this.retrySettings = {
      retries: this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    const bufferChunk = this.requestParams.bufferLength / 3;
    this.streamBuffer = new XVIZStreamBuffer({
      startOffset: -2 * bufferChunk,
      endOffset: bufferChunk
    });
  }

  seek(timestamp) {
    super.seek(timestamp);
    this.streamBuffer.setCurrentTime(timestamp);
  }

  _getBufferStartTime() {
    return this.streamBuffer.getBufferRange().start;
  }

  _getBufferEndTime() {
    return this.streamBuffer.getBufferRange().end;
  }

  _onXVIZTimeslice(message) {
    super._onXVIZTimeslice(message);

    this.seek(message.timestamp);
  }

}
//# sourceMappingURL=xviz-live-loader.js.map