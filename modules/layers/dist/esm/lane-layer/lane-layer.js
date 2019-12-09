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
import { PathLayer } from '@deck.gl/layers';
import GL from '@luma.gl/constants';
import { Vector3 } from 'math.gl';

var defaultProps = _objectSpread2({}, PathLayer.defaultProps, {
  highPrecisionDash: false,
  getColor2: {
    type: 'accessor',
    value: [0, 0, 0, 255]
  },
  getWidth: {
    type: 'accessor',
    value: [1, 0, 0]
  },
  getDashArray2: {
    type: 'accessor',
    value: [0, 0]
  }
});

var LaneLayer = function (_PathLayer) {
  _inherits(LaneLayer, _PathLayer);

  function LaneLayer() {
    _classCallCheck(this, LaneLayer);

    return _possibleConstructorReturn(this, _getPrototypeOf(LaneLayer).apply(this, arguments));
  }

  _createClass(LaneLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = _get(_getPrototypeOf(LaneLayer.prototype), "getShaders", this).call(this);

      shaders.vs = shaders.vs.replace('attribute float instanceStrokeWidths', 'attribute vec3 instanceStrokeWidths').replace('attribute vec2 instanceDashArrays', 'attribute vec4 instanceDashArrays').replace('varying vec2 vDashArray', 'varying vec4 vDashArray').replace('instanceStrokeWidths * widthScale', '(instanceStrokeWidths.x + instanceStrokeWidths.y + instanceStrokeWidths.z) * widthScale');
      shaders.fs = shaders.fs.replace(/bool dash_isFragInGap[\s\S]*?\n\}/, "\nbool dash_isFragInGap() {\n  float solid1 = vDashArray.x;\n  float gap1 = solid1 + vDashArray.y;\n  float solid2 = gap1 + vDashArray.z;\n  float unitLength = solid2 + vDashArray.w;\n\n  if (unitLength == 0.0 || vDashArray.y == 0.0) {\n    return false;\n  }\n\n  unitLength = mix(\n    unitLength,\n    vPathLength / round(vPathLength / unitLength),\n    alignMode\n  );\n\n  float offset = mix(vPathOffset, vDashArray.x / 2.0, alignMode);\n  float unitPosition = mod2(vPathPosition.y + offset, unitLength);\n\n  return unitPosition > solid1 && unitPosition < gap1 || unitPosition > solid2;\n}\n").replace('varying vec2 vDashArray', 'varying vec4 vDashArray');
      shaders.inject = {
        'vs:#decl': "\nuniform float strokeIndex;\nattribute float instanceStartRatio;\nvarying vec2 vWidth;\nvarying float vPathOffset;\n",
        'fs:#decl': "\nvarying vec2 vWidth;\nvarying float vPathOffset;\n",
        'vs:#main-end': "\n  float totalWidth = instanceStrokeWidths.x + instanceStrokeWidths.y + instanceStrokeWidths.z;\n  if (strokeIndex == 0.0) {\n    vWidth = vec2(0.0, instanceStrokeWidths.x / totalWidth);\n  } else {\n    vWidth = vec2(1.0 - instanceStrokeWidths.z / totalWidth, 1.0);\n  }\n  // map to [-1.0, 1.0] space\n  vWidth = vWidth * 2.0 - 1.0;\n  vPathOffset = vPathLength * instanceStartRatio;\n",
        'fs:#main-start': "\n  if (vPathPosition.x < vWidth.x || vPathPosition.x > vWidth.y) {\n    discard;\n  }\n"
      };
      return shaders;
    }
  }, {
    key: "initializeState",
    value: function initializeState(context) {
      _get(_getPrototypeOf(LaneLayer.prototype), "initializeState", this).call(this, context);

      this.getAttributeManager().addInstanced({
        instanceStrokeWidths: {
          size: 3,
          accessor: 'getWidth',
          defaultValue: [1, 0, 0]
        },
        instanceColors2: {
          size: this.props.colorFormat.length,
          type: GL.UNSIGNED_BYTE,
          normalized: true,
          accessor: 'getColor2',
          defaultValue: [0, 0, 0, 255]
        },
        instanceStartRatio: {
          size: 1,
          update: this.calculateStartRatios
        },
        instanceDashArrays: {
          size: 4,
          accessor: 'getDashArray'
        },
        instanceDashArrays2: {
          size: 4,
          accessor: 'getDashArray2'
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(params) {
      var model = this.state.model;
      var attributes = this.getAttributeManager().getAttributes();
      model.setUniforms({
        strokeIndex: 0
      });
      model.setAttributes({
        instanceColors: attributes.instanceColors,
        instanceDashArrays: attributes.instanceDashArrays
      });

      _get(_getPrototypeOf(LaneLayer.prototype), "draw", this).call(this, params);

      model.setUniforms({
        strokeIndex: 1
      });
      model.setAttributes({
        instanceColors: attributes.instanceColors2,
        instanceDashArrays: attributes.instanceDashArrays2
      });
      model.draw();
    }
  }, {
    key: "calculateStartRatios",
    value: function calculateStartRatios(attribute) {
      if (!this.props.highPrecisionDash) {
        attribute.constant = true;
        attribute.value = new Float32Array(1);
        return;
      }

      var numInstances = this.state.numInstances;
      var viewport = this.context.viewport;

      var _this$getAttributeMan = this.getAttributeManager().getAttributes(),
          startPositions = _this$getAttributeMan.startPositions,
          endPositions = _this$getAttributeMan.endPositions,
          instanceTypes = _this$getAttributeMan.instanceTypes;

      startPositions = startPositions.value;
      endPositions = endPositions.value;
      instanceTypes = instanceTypes.value;
      var target = attribute.value;
      var startPoint = new Vector3();
      var endPoint = new Vector3();
      var totalLength = 0;

      for (var i = 0; i < numInstances; i++) {
        startPoint.set(startPositions[i * 3 + 3], startPositions[i * 3 + 4], startPositions[i * 3 + 5]);
        endPoint.set(endPoint[0] = endPositions[i * 3], endPoint[1] = endPositions[i * 3 + 1], endPoint[2] = endPositions[i * 3 + 2]);
        startPoint.copy(viewport.projectPosition(startPoint));
        endPoint.copy(viewport.projectPosition(endPoint));
        var segmentLength = startPoint.distance(endPoint);
        target[i] = segmentLength ? totalLength / segmentLength : 0;

        if (instanceTypes[i] <= 1) {
          totalLength += segmentLength;
        } else {
          totalLength = 0;
        }
      }
    }
  }]);

  return LaneLayer;
}(PathLayer);

export { LaneLayer as default };
LaneLayer.layerName = 'LaneLayer';
LaneLayer.defaultProps = defaultProps;
//# sourceMappingURL=lane-layer.js.map