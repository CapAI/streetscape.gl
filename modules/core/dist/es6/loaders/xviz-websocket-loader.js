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
import assert from 'assert';
import { XVIZStreamBuffer, parseStreamMessage } from '@xviz/parser';
import PromiseRetry from 'promise-retry';
import XVIZLoaderInterface from './xviz-loader-interface';
import XVIZController from './xviz-controller-v2';
export default class XVIZWebsocketLoader extends XVIZLoaderInterface {
  constructor(options = {}) {
    super(options);

    _defineProperty(this, "_onWSOpen", () => {
      this.xvizHandler = new XVIZController(this.socket);

      this._debug('socket_open', this.requestParams);

      this._onOpen();
    });

    _defineProperty(this, "_onWSClose", event => {
      this._debug('socket_closed', event);
    });

    _defineProperty(this, "_onWSError", event => {
      this._debug('socket_error', event);
    });

    this.socket = null;
    this.retrySettings = {
      retries: 3,
      minTimeout: 500,
      randomize: true
    };
    this.streamBuffer = new XVIZStreamBuffer();
    this.WebSocketClass = options.WebSocketClass || WebSocket;
  }

  isOpen() {
    return this.socket;
  }

  seek(timestamp) {
    super.seek(timestamp);
  }

  connect() {
    assert(this.socket === null, 'Socket Manager still connected');

    this._debug('stream_start');

    const {
      url
    } = this.requestParams;
    return PromiseRetry(retry => {
      return new Promise((resolve, reject) => {
        try {
          const ws = new this.WebSocketClass(url);
          ws.binaryType = 'arraybuffer';

          ws.onmessage = message => {
            const hasMetadata = Boolean(this.getMetadata());
            return parseStreamMessage({
              message: message.data,
              onResult: this.onXVIZMessage,
              onError: this.onError,
              debug: this._debug.bind(this, 'parse_message'),
              worker: hasMetadata && this.options.worker,
              maxConcurrency: this.options.maxConcurrency
            });
          };

          ws.onerror = this.onError;

          ws.onclose = event => {
            this._onWSClose(event);

            reject(event);
          };

          ws.onopen = () => {
            this.socket = ws;

            this._onWSOpen();

            resolve(ws);
          };
        } catch (err) {
          reject(err);
        }
      }).catch(event => {
        this._onWSError(event);

        const isAbnormalClosure = event.code > 1000 && event.code !== 1005;

        if (isAbnormalClosure || !this.socket) {
          retry();
        }
      });
    }, this.retrySettings).catch(this._onWSError);
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  _onOpen() {
    throw new Error('_onOpen() method must be overridden');
  }

}
//# sourceMappingURL=xviz-websocket-loader.js.map