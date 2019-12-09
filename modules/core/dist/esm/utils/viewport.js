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
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread";
import WebMercatorViewport from 'viewport-mercator-project';
import { MapView, FirstPersonView } from '@deck.gl/core';
export function getViewStateOffset(oldViewState, viewState, oldOffset) {
  if (!oldViewState) {
    return oldOffset;
  }

  var oldViewport = new WebMercatorViewport(oldViewState);
  var oldPos = [oldViewport.width / 2 + oldOffset.x, oldViewport.height / 2 + oldOffset.y];
  var trackedLngLat = oldViewport.unproject(oldPos);
  var newViewport = new WebMercatorViewport(viewState);
  var newPos = newViewport.project(trackedLngLat);
  return {
    x: oldOffset.x + newPos[0] - oldPos[0],
    y: oldOffset.y + newPos[1] - oldPos[1],
    bearing: oldOffset.bearing + viewState.bearing - oldViewState.bearing
  };
}

function offsetViewState(viewState, offset) {
  var shiftedViewState = _objectSpread2({}, viewState, {
    bearing: viewState.bearing + offset.bearing
  });

  var helperViewport = new WebMercatorViewport(shiftedViewState);
  var pos = [viewState.width / 2 + offset.x, viewState.height / 2 + offset.y];
  var lngLat = [viewState.longitude, viewState.latitude];

  var _helperViewport$getLo = helperViewport.getLocationAtPoint({
    lngLat: lngLat,
    pos: pos
  }),
      _helperViewport$getLo2 = _slicedToArray(_helperViewport$getLo, 2),
      longitude = _helperViewport$getLo2[0],
      latitude = _helperViewport$getLo2[1];

  return _objectSpread2({}, shiftedViewState, {
    longitude: longitude,
    latitude: latitude
  });
}

export function getViews(viewMode) {
  var name = viewMode.name,
      orthographic = viewMode.orthographic,
      firstPerson = viewMode.firstPerson,
      mapInteraction = viewMode.mapInteraction;

  var controllerProps = _objectSpread2({}, mapInteraction, {
    keyboard: false
  });

  if (firstPerson) {
    return new FirstPersonView({
      id: name,
      fovy: 75,
      near: 1,
      far: 10000,
      focalDistance: 6,
      controller: controllerProps
    });
  }

  return new MapView({
    id: name,
    orthographic: orthographic,
    controller: controllerProps
  });
}
export function getViewStates(_ref) {
  var viewState = _ref.viewState,
      trackedPosition = _ref.trackedPosition,
      viewMode = _ref.viewMode,
      offset = _ref.offset;
  var name = viewMode.name,
      firstPerson = viewMode.firstPerson,
      _viewMode$tracked = viewMode.tracked,
      tracked = _viewMode$tracked === void 0 ? {} : _viewMode$tracked;
  var viewStates = {};

  if (firstPerson) {
    if (trackedPosition) {
      var bearing = trackedPosition.bearing;
      viewState = _objectSpread2({}, viewState, {}, firstPerson, {
        longitude: trackedPosition.longitude,
        latitude: trackedPosition.latitude,
        bearing: bearing + offset.bearing
      });
      viewState.position = [0, 0, trackedPosition.altitude + 1.3];
    }

    viewStates[name] = viewState;
  } else {
    offset = _objectSpread2({}, offset);

    if (tracked.position && trackedPosition) {
      viewState.longitude = trackedPosition.longitude;
      viewState.latitude = trackedPosition.latitude;
    } else {
      offset.x = 0;
      offset.y = 0;
    }

    if (tracked.heading && trackedPosition) {
      viewState.bearing = trackedPosition.bearing;
    } else {
      offset.bearing = 0;
    }

    if (trackedPosition) {
      viewState.position = [0, 0, trackedPosition.altitude];
    }

    viewStates[name] = offsetViewState(viewState, offset);
  }

  return viewStates;
}
//# sourceMappingURL=viewport.js.map