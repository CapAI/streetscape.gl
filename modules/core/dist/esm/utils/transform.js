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
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { COORDINATE_SYSTEM } from '@deck.gl/core';
import { _Pose as Pose, Matrix4 } from 'math.gl';
import { addMetersToLngLat } from 'viewport-mercator-project';
import { COORDINATE } from '../constants';
var DEFAULT_ORIGIN = [0, 0, 0];
export function resolveLinksTransform(links, streams, streamName) {
  var transforms = [];
  var parentPose = links[streamName] && links[streamName].target_pose;
  var missingPose = false;

  while (parentPose) {
    if (!streams[parentPose]) {
      missingPose = true;
      break;
    }

    transforms.push(streams[parentPose]);
    parentPose = links[parentPose] && links[parentPose].target_pose;
  }

  if (!missingPose && transforms.length) {
    return transforms.reduceRight(function (acc, val) {
      return acc.multiplyRight(new Pose(val).getTransformationMatrix());
    }, new Matrix4());
  }

  return null;
}
export function resolveCoordinateTransform(frame, streamName) {
  var streamMetadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var getTransformMatrix = arguments.length > 3 ? arguments[3] : undefined;
  var origin = frame.origin,
      links = frame.links,
      streams = frame.streams,
      _frame$transforms = frame.transforms,
      transforms = _frame$transforms === void 0 ? {} : _frame$transforms,
      vehicleRelativeTransform = frame.vehicleRelativeTransform;
  var coordinate = streamMetadata.coordinate,
      transform = streamMetadata.transform,
      pose = streamMetadata.pose;
  var coordinateSystem = COORDINATE_SYSTEM.METER_OFFSETS;
  var modelMatrix = null;
  var streamTransform = transform;

  switch (coordinate) {
    case COORDINATE.GEOGRAPHIC:
      coordinateSystem = COORDINATE_SYSTEM.LNGLAT;
      break;

    case COORDINATE.DYNAMIC:
      transforms[transform] = transforms[transform] || getTransformMatrix(transform, frame);
      modelMatrix = transforms[transform];
      frame.transforms = transforms;
      streamTransform = null;
      break;

    case COORDINATE.VEHICLE_RELATIVE:
      modelMatrix = vehicleRelativeTransform;
      break;

    default:
    case COORDINATE.IDENTITY:
      modelMatrix = resolveLinksTransform(links, streams, streamName);
      break;
  }

  if (pose) {
    streamTransform = new Pose(pose).getTransformationMatrix();
  }

  if (streamTransform && streamTransform.length > 0) {
    modelMatrix = modelMatrix ? new Matrix4(modelMatrix).multiplyRight(streamTransform) : streamTransform;
  }

  return {
    coordinateSystem: coordinateSystem,
    coordinateOrigin: origin || DEFAULT_ORIGIN,
    modelMatrix: modelMatrix
  };
}
export function positionToLngLat(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 3),
      x = _ref3[0],
      y = _ref3[1],
      z = _ref3[2];

  var coordinateSystem = _ref2.coordinateSystem,
      coordinateOrigin = _ref2.coordinateOrigin,
      modelMatrix = _ref2.modelMatrix;

  if (modelMatrix) {
    var _transformAsPoint = new Matrix4(modelMatrix).transformAsPoint([x, y, z]);

    var _transformAsPoint2 = _slicedToArray(_transformAsPoint, 3);

    x = _transformAsPoint2[0];
    y = _transformAsPoint2[1];
    z = _transformAsPoint2[2];
  }

  switch (coordinateSystem) {
    case COORDINATE_SYSTEM.METER_OFFSETS:
      return addMetersToLngLat(coordinateOrigin, [x, y, z]);

    case COORDINATE_SYSTEM.LNGLAT:
    default:
      return [x, y, z];
  }
}
//# sourceMappingURL=transform.js.map