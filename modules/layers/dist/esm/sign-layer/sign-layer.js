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
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import { IconLayer } from '@deck.gl/layers';
import vs from './sign-layer-vertex.glsl';
import fs from './sign-layer-fragment.glsl';

var defaultProps = _objectSpread2({}, IconLayer.defaultProps, {
  sizeUnits: 'meters',
  render3D: true
});

var SignLayer = function (_IconLayer) {
  _inherits(SignLayer, _IconLayer);

  function SignLayer() {
    _classCallCheck(this, SignLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(SignLayer).apply(this, arguments));
  }

  _createClass(SignLayer, [{
    key: "updateState",
    value: function updateState(_ref) {
      var oldProps = _ref.oldProps,
          props = _ref.props,
          changeFlags = _ref.changeFlags;

      _get(_getPrototypeOf(SignLayer.prototype), "updateState", this).call(this, {
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
      return _objectSpread2({}, _get(_getPrototypeOf(SignLayer.prototype), "getShaders", this).call(this), {
        vs: vs,
        fs: fs
      });
    }
  }]);

  return SignLayer;
}(IconLayer);

export { SignLayer as default };
SignLayer.layerName = 'SignLayer';
SignLayer.defaultProps = defaultProps;
//# sourceMappingURL=sign-layer.js.map