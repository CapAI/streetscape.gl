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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _layers = require("@deck.gl/layers");

var _signLayerVertex = _interopRequireDefault(require("./sign-layer-vertex.glsl"));

var _signLayerFragment = _interopRequireDefault(require("./sign-layer-fragment.glsl"));

var defaultProps = (0, _objectSpread4["default"])({}, _layers.IconLayer.defaultProps, {
  sizeUnits: 'meters',
  render3D: true
});

var SignLayer = function (_IconLayer) {
  (0, _inherits2["default"])(SignLayer, _IconLayer);

  function SignLayer() {
    (0, _classCallCheck2["default"])(this, SignLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SignLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(SignLayer, [{
    key: "updateState",
    value: function updateState(_ref) {
      var oldProps = _ref.oldProps,
          props = _ref.props,
          changeFlags = _ref.changeFlags;
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(SignLayer.prototype), "updateState", this).call(this, {
        props: props,
        oldProps: oldProps,
        changeFlags: changeFlags
      });

      if (props.render3D !== oldProps.render3D) {
        this.state.model.setUniforms({
          render3D: props.render3D ? 1 : 0
        });
      }
    }
  }, {
    key: "getShaders",
    value: function getShaders() {
      return (0, _objectSpread4["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(SignLayer.prototype), "getShaders", this).call(this), {
        vs: _signLayerVertex["default"],
        fs: _signLayerFragment["default"]
      });
    }
  }]);
  return SignLayer;
}(_layers.IconLayer);

exports["default"] = SignLayer;
SignLayer.layerName = 'SignLayer';
SignLayer.defaultProps = defaultProps;
//# sourceMappingURL=sign-layer.js.map