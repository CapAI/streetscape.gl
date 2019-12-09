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
import { getXVIZConfig, StreamSynchronizer, LOG_STREAM_MESSAGE } from '@xviz/parser';
import { clamp } from 'math.gl';
import createSelector from '../utils/create-selector';
import stats from '../utils/stats';
export default class XVIZLoaderInterface {
  constructor(options = {}) {
    _defineProperty(this, "onXVIZMessage", message => {
      switch (message.type) {
        case LOG_STREAM_MESSAGE.METADATA:
          this._onXVIZMetadata(message);

          this.emit('ready', message);
          break;

        case LOG_STREAM_MESSAGE.TIMESLICE:
          this._onXVIZTimeslice(message);

          this.emit('update', message);
          break;

        case LOG_STREAM_MESSAGE.DONE:
          this.emit('finish', message);
          break;

        default:
          this.emit('error', message);
      }
    });

    _defineProperty(this, "onError", error => {
      this.emit('error', error);
    });

    _defineProperty(this, "getCurrentTime", () => this.get('timestamp'));

    _defineProperty(this, "getLookAhead", () => this.get('lookAhead'));

    _defineProperty(this, "getMetadata", () => this.get('metadata'));

    _defineProperty(this, "getStreamSettings", () => this.get('streamSettings'));

    _defineProperty(this, "_getDataVersion", () => this.get('dataVersion'));

    _defineProperty(this, "_getStreamsMetadata", () => this.get('streamsMetadata'));

    _defineProperty(this, "_getStreams", createSelector(this, this._getDataVersion, () => this._getDataByStream()));

    _defineProperty(this, "getBufferedTimeRanges", createSelector(this, this._getDataVersion, () => this._getBufferedTimeRanges()));

    _defineProperty(this, "getStreams", createSelector(this, [this.getStreamSettings, this._getStreams, this._getDataVersion], (streamSettings, streams) => {
      if (!streamSettings || !streams) {
        return streams;
      }

      const result = {};

      for (const streamName in streams) {
        if (streamSettings[streamName]) {
          result[streamName] = streams[streamName];
        }
      }

      return result;
    }));

    _defineProperty(this, "getStreamsMetadata", getXVIZConfig().DYNAMIC_STREAM_METADATA ? createSelector(this, [this.getMetadata, this._getStreamsMetadata], (metadata, streamsMetadata) => {
      return Object.assign({}, streamsMetadata, metadata && metadata.streams);
    }) : createSelector(this, this.getMetadata, metadata => metadata && metadata.streams || {}));

    _defineProperty(this, "getBufferStartTime", createSelector(this, this.getCurrentTime, () => this._getBufferStartTime()));

    _defineProperty(this, "getBufferEndTime", createSelector(this, this.getCurrentTime, () => this._getBufferEndTime()));

    _defineProperty(this, "getLogStartTime", createSelector(this, this.getMetadata, metadata => this._getLogStartTime(metadata)));

    _defineProperty(this, "getLogEndTime", createSelector(this, this.getMetadata, metadata => this._getLogEndTime(metadata)));

    _defineProperty(this, "getCurrentFrame", createSelector(this, [this.getStreamSettings, this.getCurrentTime, this.getLookAhead, this._getDataVersion], (streamSettings, timestamp, lookAhead) => {
      const {
        logSynchronizer
      } = this;

      if (logSynchronizer && Number.isFinite(timestamp)) {
        logSynchronizer.setTime(timestamp);
        logSynchronizer.setLookAheadTimeOffset(lookAhead);
        return logSynchronizer.getCurrentFrame(streamSettings);
      }

      return null;
    }));

    _defineProperty(this, "_update", () => {
      this._updateTimer = null;
      this.listeners.forEach(o => o(this._version));
    });

    this.options = options;

    this._debug = options.debug || (() => {});

    this.callbacks = {};
    this.listeners = [];
    this.state = {};
    this._updates = 0;
    this._version = 0;
    this._updateTimer = null;
  }

  on(eventType, cb) {
    this.callbacks[eventType] = this.callbacks[eventType] || [];
    this.callbacks[eventType].push(cb);
    return this;
  }

  off(eventType, cb) {
    const callbacks = this.callbacks[eventType];

    if (callbacks) {
      const index = callbacks.indexOf(cb);

      if (index >= 0) {
        callbacks.splice(index, 1);
      }
    }

    return this;
  }

  emit(eventType, eventArgs) {
    const callbacks = this.callbacks[eventType];

    if (callbacks) {
      for (const cb of callbacks) {
        cb(eventType, eventArgs);
      }
    }

    stats.get("loader-".concat(eventType)).incrementCount();
  }

  subscribe(instance) {
    this.listeners.push(instance);
  }

  unsubscribe(instance) {
    const index = this.listeners.findIndex(o => o === instance);

    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    if (this.state[key] !== value) {
      this.state[key] = value;
      this._version++;

      if (!this._updateTimer) {
        this._updateTimer = requestAnimationFrame(this._update);
      }
    }
  }

  isOpen() {
    return false;
  }

  connect() {
    throw new Error('not implemented');
  }

  seek(timestamp) {
    const metadata = this.getMetadata();

    if (metadata) {
      const startTime = this.getLogStartTime();
      const endTime = this.getLogEndTime();

      if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
        timestamp = clamp(timestamp, startTime, endTime);
      }
    }

    this.set('timestamp', timestamp);
    this.streamBuffer.setCurrentTime(timestamp);
  }

  setLookAhead(lookAhead) {
    this.set('lookAhead', lookAhead);
  }

  updateStreamSettings(settings) {
    const streamSettings = this.get('streamSettings');
    this.set('streamSettings', _objectSpread2({}, streamSettings, {}, settings));
  }

  close() {
    throw new Error('not implemented');
  }

  _bumpDataVersion() {
    this._updates++;
    this.set('dataVersion', this._updates);
  }

  _onXVIZMetadata(metadata) {
    this.set('metadata', metadata);

    if (metadata.streams && Object.keys(metadata.streams).length > 0) {
      this.set('streamSettings', metadata.streams);
    }

    if (!this.streamBuffer) {
      throw new Error('streamBuffer is missing');
    }

    this.logSynchronizer = this.logSynchronizer || new StreamSynchronizer(this.streamBuffer);
    const timestamp = this.get('timestamp');
    const newTimestamp = Number.isFinite(timestamp) ? timestamp : metadata.start_time;

    if (Number.isFinite(newTimestamp)) {
      this.seek(newTimestamp);
    }
  }

  _onXVIZTimeslice(timeslice) {
    const oldStreamCount = this.streamBuffer.streamCount;
    const bufferUpdated = this.streamBuffer.insert(timeslice);

    if (bufferUpdated) {
      this._bumpDataVersion();
    }

    if (getXVIZConfig().DYNAMIC_STREAM_METADATA && this.streamBuffer.streamCount > oldStreamCount) {
      const streamsMetadata = {};
      const streamSettings = this.get('streamSettings');

      for (const streamName in timeslice.streams) {
        streamsMetadata[streamName] = timeslice.streams[streamName].__metadata;

        if (!(streamName in streamSettings)) {
          streamSettings[streamName] = true;
        }
      }

      this.set('streamsMetadata', streamsMetadata);
    }

    return bufferUpdated;
  }

  _getDataByStream() {
    return this.streamBuffer.streams;
  }

  _getBufferedTimeRanges() {
    const range = this.streamBuffer.getLoadedTimeRange();

    if (range) {
      return [[range.start, range.end]];
    }

    return [];
  }

  _getLogStartTime(metadata) {
    return metadata && metadata.start_time && metadata.start_time + getXVIZConfig().TIME_WINDOW;
  }

  _getLogEndTime(metadata) {
    return metadata && metadata.end_time;
  }

  _getBufferStartTime() {
    return this.getLogStartTime();
  }

  _getBufferEndTime() {
    return this.getLogEndTime();
  }

}
//# sourceMappingURL=xviz-loader-interface.js.map