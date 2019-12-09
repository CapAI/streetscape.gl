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
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { getXVIZConfig, StreamSynchronizer, LOG_STREAM_MESSAGE } from '@xviz/parser';
import { clamp } from 'math.gl';
import createSelector from '../utils/create-selector';
import stats from '../utils/stats';

var XVIZLoaderInterface = function () {
  function XVIZLoaderInterface() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, XVIZLoaderInterface);

    _defineProperty(this, "onXVIZMessage", function (message) {
      switch (message.type) {
        case LOG_STREAM_MESSAGE.METADATA:
          _this._onXVIZMetadata(message);

          _this.emit('ready', message);

          break;

        case LOG_STREAM_MESSAGE.TIMESLICE:
          _this._onXVIZTimeslice(message);

          _this.emit('update', message);

          break;

        case LOG_STREAM_MESSAGE.DONE:
          _this.emit('finish', message);

          break;

        default:
          _this.emit('error', message);

      }
    });

    _defineProperty(this, "onError", function (error) {
      _this.emit('error', error);
    });

    _defineProperty(this, "getCurrentTime", function () {
      return _this.get('timestamp');
    });

    _defineProperty(this, "getLookAhead", function () {
      return _this.get('lookAhead');
    });

    _defineProperty(this, "getMetadata", function () {
      return _this.get('metadata');
    });

    _defineProperty(this, "getStreamSettings", function () {
      return _this.get('streamSettings');
    });

    _defineProperty(this, "_getDataVersion", function () {
      return _this.get('dataVersion');
    });

    _defineProperty(this, "_getStreamsMetadata", function () {
      return _this.get('streamsMetadata');
    });

    _defineProperty(this, "_getStreams", createSelector(this, this._getDataVersion, function () {
      return _this._getDataByStream();
    }));

    _defineProperty(this, "getBufferedTimeRanges", createSelector(this, this._getDataVersion, function () {
      return _this._getBufferedTimeRanges();
    }));

    _defineProperty(this, "getStreams", createSelector(this, [this.getStreamSettings, this._getStreams, this._getDataVersion], function (streamSettings, streams) {
      if (!streamSettings || !streams) {
        return streams;
      }

      var result = {};

      for (var streamName in streams) {
        if (streamSettings[streamName]) {
          result[streamName] = streams[streamName];
        }
      }

      return result;
    }));

    _defineProperty(this, "getStreamsMetadata", getXVIZConfig().DYNAMIC_STREAM_METADATA ? createSelector(this, [this.getMetadata, this._getStreamsMetadata], function (metadata, streamsMetadata) {
      return Object.assign({}, streamsMetadata, metadata && metadata.streams);
    }) : createSelector(this, this.getMetadata, function (metadata) {
      return metadata && metadata.streams || {};
    }));

    _defineProperty(this, "getBufferStartTime", createSelector(this, this.getCurrentTime, function () {
      return _this._getBufferStartTime();
    }));

    _defineProperty(this, "getBufferEndTime", createSelector(this, this.getCurrentTime, function () {
      return _this._getBufferEndTime();
    }));

    _defineProperty(this, "getLogStartTime", createSelector(this, this.getMetadata, function (metadata) {
      return _this._getLogStartTime(metadata);
    }));

    _defineProperty(this, "getLogEndTime", createSelector(this, this.getMetadata, function (metadata) {
      return _this._getLogEndTime(metadata);
    }));

    _defineProperty(this, "getCurrentFrame", createSelector(this, [this.getStreamSettings, this.getCurrentTime, this.getLookAhead, this._getDataVersion], function (streamSettings, timestamp, lookAhead) {
      var logSynchronizer = _this.logSynchronizer;

      if (logSynchronizer && Number.isFinite(timestamp)) {
        logSynchronizer.setTime(timestamp);
        logSynchronizer.setLookAheadTimeOffset(lookAhead);
        return logSynchronizer.getCurrentFrame(streamSettings);
      }

      return null;
    }));

    _defineProperty(this, "_update", function () {
      _this._updateTimer = null;

      _this.listeners.forEach(function (o) {
        return o(_this._version);
      });
    });

    this.options = options;

    this._debug = options.debug || function () {};

    this.callbacks = {};
    this.listeners = [];
    this.state = {};
    this._updates = 0;
    this._version = 0;
    this._updateTimer = null;
  }

  _createClass(XVIZLoaderInterface, [{
    key: "on",
    value: function on(eventType, cb) {
      this.callbacks[eventType] = this.callbacks[eventType] || [];
      this.callbacks[eventType].push(cb);
      return this;
    }
  }, {
    key: "off",
    value: function off(eventType, cb) {
      var callbacks = this.callbacks[eventType];

      if (callbacks) {
        var index = callbacks.indexOf(cb);

        if (index >= 0) {
          callbacks.splice(index, 1);
        }
      }

      return this;
    }
  }, {
    key: "emit",
    value: function emit(eventType, eventArgs) {
      var callbacks = this.callbacks[eventType];

      if (callbacks) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cb = _step.value;
            cb(eventType, eventArgs);
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
      }

      stats.get("loader-".concat(eventType)).incrementCount();
    }
  }, {
    key: "subscribe",
    value: function subscribe(instance) {
      this.listeners.push(instance);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(instance) {
      var index = this.listeners.findIndex(function (o) {
        return o === instance;
      });

      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.state[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (this.state[key] !== value) {
        this.state[key] = value;
        this._version++;

        if (!this._updateTimer) {
          this._updateTimer = requestAnimationFrame(this._update);
        }
      }
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return false;
    }
  }, {
    key: "connect",
    value: function connect() {
      throw new Error('not implemented');
    }
  }, {
    key: "seek",
    value: function seek(timestamp) {
      var metadata = this.getMetadata();

      if (metadata) {
        var startTime = this.getLogStartTime();
        var endTime = this.getLogEndTime();

        if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
          timestamp = clamp(timestamp, startTime, endTime);
        }
      }

      this.set('timestamp', timestamp);
      this.streamBuffer.setCurrentTime(timestamp);
    }
  }, {
    key: "setLookAhead",
    value: function setLookAhead(lookAhead) {
      this.set('lookAhead', lookAhead);
    }
  }, {
    key: "updateStreamSettings",
    value: function updateStreamSettings(settings) {
      var streamSettings = this.get('streamSettings');
      this.set('streamSettings', _objectSpread2({}, streamSettings, {}, settings));
    }
  }, {
    key: "close",
    value: function close() {
      throw new Error('not implemented');
    }
  }, {
    key: "_bumpDataVersion",
    value: function _bumpDataVersion() {
      this._updates++;
      this.set('dataVersion', this._updates);
    }
  }, {
    key: "_onXVIZMetadata",
    value: function _onXVIZMetadata(metadata) {
      this.set('metadata', metadata);

      if (metadata.streams && Object.keys(metadata.streams).length > 0) {
        this.set('streamSettings', metadata.streams);
      }

      if (!this.streamBuffer) {
        throw new Error('streamBuffer is missing');
      }

      this.logSynchronizer = this.logSynchronizer || new StreamSynchronizer(this.streamBuffer);
      var timestamp = this.get('timestamp');
      var newTimestamp = Number.isFinite(timestamp) ? timestamp : metadata.start_time;

      if (Number.isFinite(newTimestamp)) {
        this.seek(newTimestamp);
      }
    }
  }, {
    key: "_onXVIZTimeslice",
    value: function _onXVIZTimeslice(timeslice) {
      var oldStreamCount = this.streamBuffer.streamCount;
      var bufferUpdated = this.streamBuffer.insert(timeslice);

      if (bufferUpdated) {
        this._bumpDataVersion();
      }

      if (getXVIZConfig().DYNAMIC_STREAM_METADATA && this.streamBuffer.streamCount > oldStreamCount) {
        var streamsMetadata = {};
        var streamSettings = this.get('streamSettings');

        for (var streamName in timeslice.streams) {
          streamsMetadata[streamName] = timeslice.streams[streamName].__metadata;

          if (!(streamName in streamSettings)) {
            streamSettings[streamName] = true;
          }
        }

        this.set('streamsMetadata', streamsMetadata);
      }

      return bufferUpdated;
    }
  }, {
    key: "_getDataByStream",
    value: function _getDataByStream() {
      return this.streamBuffer.streams;
    }
  }, {
    key: "_getBufferedTimeRanges",
    value: function _getBufferedTimeRanges() {
      var range = this.streamBuffer.getLoadedTimeRange();

      if (range) {
        return [[range.start, range.end]];
      }

      return [];
    }
  }, {
    key: "_getLogStartTime",
    value: function _getLogStartTime(metadata) {
      return metadata && metadata.start_time && metadata.start_time + getXVIZConfig().TIME_WINDOW;
    }
  }, {
    key: "_getLogEndTime",
    value: function _getLogEndTime(metadata) {
      return metadata && metadata.end_time;
    }
  }, {
    key: "_getBufferStartTime",
    value: function _getBufferStartTime() {
      return this.getLogStartTime();
    }
  }, {
    key: "_getBufferEndTime",
    value: function _getBufferEndTime() {
      return this.getLogEndTime();
    }
  }]);

  return XVIZLoaderInterface;
}();

export { XVIZLoaderInterface as default };
//# sourceMappingURL=xviz-loader-interface.js.map