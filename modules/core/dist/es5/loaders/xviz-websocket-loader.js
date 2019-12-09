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

var _assert = _interopRequireDefault(require("assert"));

var _parser = require("@xviz/parser");

var _promiseRetry = _interopRequireDefault(require("promise-retry"));

var _xvizLoaderInterface = _interopRequireDefault(require("./xviz-loader-interface"));

var _xvizControllerV = _interopRequireDefault(require("./xviz-controller-v2"));

var XVIZWebsocketLoader = function (_XVIZLoaderInterface) {
  (0, _inherits2["default"])(XVIZWebsocketLoader, _XVIZLoaderInterface);

  function XVIZWebsocketLoader() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, XVIZWebsocketLoader);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(XVIZWebsocketLoader).call(this, options));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onWSOpen", function () {
      _this.xvizHandler = new _xvizControllerV["default"](_this.socket);

      _this._debug('socket_open', _this.requestParams);

      _this._onOpen();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onWSClose", function (event) {
      _this._debug('socket_closed', event);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onWSError", function (event) {
      _this._debug('socket_error', event);
    });
    _this.socket = null;
    _this.retrySettings = {
      retries: 3,
      minTimeout: 500,
      randomize: true
    };
    _this.streamBuffer = new _parser.XVIZStreamBuffer();
    _this.WebSocketClass = options.WebSocketClass || WebSocket;
    return _this;
  }

  (0, _createClass2["default"])(XVIZWebsocketLoader, [{
    key: "isOpen",
    value: function isOpen() {
      return this.socket;
    }
  }, {
    key: "seek",
    value: function seek(timestamp) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZWebsocketLoader.prototype), "seek", this).call(this, timestamp);
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this2 = this;

      (0, _assert["default"])(this.socket === null, 'Socket Manager still connected');

      this._debug('stream_start');

      var url = this.requestParams.url;
      return (0, _promiseRetry["default"])(function (retry) {
        return new Promise(function (resolve, reject) {
          try {
            var ws = new _this2.WebSocketClass(url);
            ws.binaryType = 'arraybuffer';

            ws.onmessage = function (message) {
              var hasMetadata = Boolean(_this2.getMetadata());
              return (0, _parser.parseStreamMessage)({
                message: message.data,
                onResult: _this2.onXVIZMessage,
                onError: _this2.onError,
                debug: _this2._debug.bind(_this2, 'parse_message'),
                worker: hasMetadata && _this2.options.worker,
                maxConcurrency: _this2.options.maxConcurrency
              });
            };

            ws.onerror = _this2.onError;

            ws.onclose = function (event) {
              _this2._onWSClose(event);

              reject(event);
            };

            ws.onopen = function () {
              _this2.socket = ws;

              _this2._onWSOpen();

              resolve(ws);
            };
          } catch (err) {
            reject(err);
          }
        })["catch"](function (event) {
          _this2._onWSError(event);

          var isAbnormalClosure = event.code > 1000 && event.code !== 1005;

          if (isAbnormalClosure || !_this2.socket) {
            retry();
          }
        });
      }, this.retrySettings)["catch"](this._onWSError);
    }
  }, {
    key: "close",
    value: function close() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  }, {
    key: "_onOpen",
    value: function _onOpen() {
      throw new Error('_onOpen() method must be overridden');
    }
  }]);
  return XVIZWebsocketLoader;
}(_xvizLoaderInterface["default"]);

exports["default"] = XVIZWebsocketLoader;
//# sourceMappingURL=xviz-websocket-loader.js.map