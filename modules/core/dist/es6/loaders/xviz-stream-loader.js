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
import { getXVIZConfig } from '@xviz/parser';
import XVIZWebsocketLoader from './xviz-websocket-loader';
import * as rangeUtils from '../utils/buffer-range';
const DEFAULT_LOG_PROFILE = 'default';
const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_BUFFER_LENGTH = {
  seconds: 30,
  milliseconds: 30000
};

function getSocketRequestParams(options) {
  const {
    logGuid,
    logProfile = DEFAULT_LOG_PROFILE,
    duration: requestedDuration,
    timestamp,
    serverConfig,
    bufferLength = DEFAULT_BUFFER_LENGTH[getXVIZConfig().TIMESTAMP_FORMAT],
    maxConcurrency,
    WebSocketClass
  } = options,
        passThroughOptions = _objectWithoutProperties(options, ["logGuid", "logProfile", "duration", "timestamp", "serverConfig", "bufferLength", "maxConcurrency", "WebSocketClass"]);

  const duration = requestedDuration || serverConfig.defaultLogLength;
  assert(logGuid && duration);

  const queryParams = _objectSpread2({}, passThroughOptions, {}, serverConfig.queryParams, {
    log: logGuid,
    profile: logProfile
  });

  if (duration) {
    queryParams.duration = duration;
  }

  if (timestamp) {
    queryParams.timestamp = timestamp;
  }

  const retryAttempts = Number.isInteger(serverConfig.retryAttempts) ? serverConfig.retryAttempts : DEFAULT_RETRY_ATTEMPTS;
  const qs = Object.keys(queryParams).map(key => "".concat(key, "=").concat(queryParams[key])).join('&');
  return {
    url: "".concat(serverConfig.serverUrl, "?").concat(qs),
    logGuid,
    logProfile,
    duration,
    timestamp,
    bufferLength,
    retryAttempts,
    serverConfig
  };
}

export function updateSocketRequestParams(timestamp, metadata, bufferLength, bufferRange) {
  const {
    start_time: logStartTime = -Infinity,
    end_time: logEndTime = Infinity
  } = metadata;
  const totalDuration = logEndTime - logStartTime;
  const chunkSize = bufferLength || totalDuration;

  if (!Number.isFinite(totalDuration)) {
    assert(bufferLength, 'bufferLength is invalid');
  }

  if (chunkSize >= totalDuration) {
    return {
      startTimestamp: logStartTime,
      endTimestamp: logEndTime,
      bufferStart: logStartTime,
      bufferEnd: logEndTime
    };
  }

  const bufferStart = Math.max(timestamp - chunkSize / 2, logStartTime);
  const bufferEnd = Math.min(bufferStart + chunkSize, logEndTime);
  const newBufferRange = rangeUtils.subtract([bufferStart, bufferEnd], bufferRange);

  if (newBufferRange.length === 0) {
    return null;
  }

  const start = newBufferRange[0][0];
  const end = newBufferRange[newBufferRange.length - 1][1];
  return {
    startTimestamp: start,
    endTimestamp: end,
    bufferStart,
    bufferEnd
  };
}
export default class XVIZStreamLoader extends XVIZWebsocketLoader {
  constructor(options = {}) {
    super(options);

    _defineProperty(this, "_onOpen", () => {
      if (this.lastRequest) {
        this.xvizHandler.transformLog(this.lastRequest);
      }
    });

    this.requestParams = getSocketRequestParams(options);
    assert(this.requestParams.bufferLength, 'bufferLength must be provided');
    this.retrySettings = {
      retries: this.requestParams.retryAttempts,
      minTimeout: 500,
      randomize: true
    };
    this.lastRequest = null;
    this.bufferRange = rangeUtils.empty();
  }

  seek(timestamp) {
    super.seek(timestamp);
    timestamp = this.getCurrentTime();

    if (this.lastRequest && this.streamBuffer.isInBufferRange(timestamp)) {
      return;
    }

    const metadata = this.getMetadata();

    if (!metadata) {
      return;
    }

    const params = updateSocketRequestParams(timestamp, metadata, this.requestParams.bufferLength, this.bufferRange);

    if (!params) {
      return;
    }

    this.lastRequest = params;
    this.streamBuffer.updateFixedBuffer(params.bufferStart, params.bufferEnd);
    this.bufferRange = rangeUtils.intersect([params.bufferStart, params.bufferEnd], this.bufferRange);

    if (this.isOpen()) {
      this.xvizHandler.transformLog(params);
    } else {}
  }

  _getBufferedTimeRanges() {
    return this.bufferRange;
  }

  _getBufferStartTime() {
    return this.lastRequest && this.lastRequest.bufferStart;
  }

  _getBufferEndTime() {
    return this.lastRequest && this.lastRequest.bufferEnd;
  }

  _onXVIZTimeslice(message) {
    const bufferUpdated = super._onXVIZTimeslice(message);

    if (bufferUpdated) {
      this.bufferRange = rangeUtils.add([this.lastRequest.startTimestamp, message.timestamp], this.bufferRange);
    }
  }

}
//# sourceMappingURL=xviz-stream-loader.js.map