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
import assert from 'assert';

var XVIZControllerV2 = function () {
  function XVIZControllerV2(socket) {
    _classCallCheck(this, XVIZControllerV2);

    assert(socket, 'XVIZ socket');
    this.socket = socket;
    this.transformCounter = 0;
  }

  _createClass(XVIZControllerV2, [{
    key: "_send",
    value: function _send(type, message) {
      var msg = {
        type: "xviz/".concat(type),
        data: message
      };
      this.socket.send(JSON.stringify(msg));
    }
  }, {
    key: "transformLog",
    value: function transformLog() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          startTimestamp = _ref.startTimestamp,
          endTimestamp = _ref.endTimestamp;

      var msg = {};

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
  }]);

  return XVIZControllerV2;
}();

export { XVIZControllerV2 as default };
//# sourceMappingURL=xviz-controller-v2.js.map