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
import WebMercatorViewport from 'viewport-mercator-project';
import { MapView, FirstPersonView } from '@deck.gl/core';
export function getViewStateOffset(oldViewState, viewState, oldOffset) {
  if (!oldViewState) {
    return oldOffset;
  }

  const oldViewport = new WebMercatorViewport(oldViewState);
  const oldPos = [oldViewport.width / 2 + oldOffset.x, oldViewport.height / 2 + oldOffset.y];
  const trackedLngLat = oldViewport.unproject(oldPos);
  const newViewport = new WebMercatorViewport(viewState);
  const newPos = newViewport.project(trackedLngLat);
  return {
    x: oldOffset.x + newPos[0] - oldPos[0],
    y: oldOffset.y + newPos[1] - oldPos[1],
    bearing: oldOffset.bearing + viewState.bearing - oldViewState.bearing
  };
}

function offsetViewState(viewState, offset) {
  const shiftedViewState = _objectSpread2({}, viewState, {
    bearing: viewState.bearing + offset.bearing
  });

  const helperViewport = new WebMercatorViewport(shiftedViewState);
  const pos = [viewState.width / 2 + offset.x, viewState.height / 2 + offset.y];
  const lngLat = [viewState.longitude, viewState.latitude];
  const [longitude, latitude] = helperViewport.getLocationAtPoint({
    lngLat,
    pos
  });
  return _objectSpread2({}, shiftedViewState, {
    longitude,
    latitude
  });
}

export function getViews(viewMode) {
  const {
    name,
    orthographic,
    firstPerson,
    mapInteraction
  } = viewMode;

  const controllerProps = _objectSpread2({}, mapInteraction, {
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
    orthographic,
    controller: controllerProps
  });
}
export function getViewStates({
  viewState,
  trackedPosition,
  viewMode,
  offset
}) {
  const {
    name,
    firstPerson,
    tracked = {}
  } = viewMode;
  const viewStates = {};

  if (firstPerson) {
    if (trackedPosition) {
      const bearing = trackedPosition.bearing;
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