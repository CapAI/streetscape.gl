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
import assert from 'assert';
export default class XVIZControllerV2 {
  constructor(socket) {
    assert(socket, 'XVIZ socket');
    this.socket = socket;
    this.transformCounter = 0;
  }

  _send(type, message) {
    const msg = {
      type: "xviz/".concat(type),
      data: message
    };
    this.socket.send(JSON.stringify(msg));
  }

  transformLog({
    startTimestamp,
    endTimestamp
  } = {}) {
    const msg = {};

    if (startTimestamp) {
      msg.start_timestamp = startTimestamp;
    }

    if (endTimestamp) {
      msg.end_timestamp = endTimestamp;
    }

    msg.id = "".concat(this.transformCounter);
    this.transformCounter++;

    this._send('transform_log', msg);
  }

}
//# sourceMappingURL=xviz-controller-v2.js.map