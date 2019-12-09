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
import { getXVIZConfig } from '@xviz/parser';

function loadImage(frame) {
  const blob = new Blob([frame.imageData], {
    type: frame.imageType
  });

  if (typeof createImageBitmap !== 'undefined') {
    return createImageBitmap(blob);
  }

  return new Promise((resolve, reject) => {
    try {
      const image = new Image();

      image.onload = () => resolve(image);

      image.onerror = reject;
      image.src = URL.createObjectURL(blob);
    } catch (error) {
      reject(error);
    }
  });
}

function deleteImage(image) {
  if (image.close) {
    image.close();
  }
}

export default class ImageBuffer {
  constructor(size, {
    imageLoader = loadImage,
    imageDeleter = deleteImage
  } = {}) {
    this.size = size;
    this.imageLoader = imageLoader;
    this.imageDeleter = imageDeleter;
    this.buffer = new Map();
  }

  get(frame) {
    return this.buffer.get(frame);
  }

  set(allFrames, currentTime) {
    const {
      buffer
    } = this;

    const {
      currentFrame,
      bufferedFrames
    } = this._getCurrentFrames(allFrames, currentTime);

    for (const frame of buffer.keys()) {
      if (bufferedFrames.length === 0 || frame.time < bufferedFrames[0].time || frame.time > bufferedFrames[bufferedFrames.length - 1].time) {
        this.imageDeleter(buffer.get(frame));
        buffer.delete(frame);
      }
    }

    bufferedFrames.forEach(frame => {
      if (!buffer.has(frame)) {
        const data = {};
        data.promise = this.imageLoader(frame.images[0]).then(image => {
          data.image = image;
          return image;
        });
        buffer.set(frame, data);
      }
    });
    return currentFrame;
  }

  _getCurrentFrames(allFrames, currentTime) {
    let currentFrame = null;
    let currentFrameIndex = -1;
    let bestDelta = getXVIZConfig().TIME_WINDOW;
    allFrames.forEach((frame, i) => {
      const delta = currentTime - frame.time;

      if (delta >= 0 && delta < bestDelta) {
        bestDelta = delta;
        currentFrame = frame;
        currentFrameIndex = i;
      }
    });
    const bufferedFrames = currentFrameIndex >= 0 ? allFrames.slice(Math.max(0, currentFrameIndex - this.size), currentFrameIndex + this.size) : [];
    return {
      currentFrame,
      bufferedFrames
    };
  }

}
//# sourceMappingURL=image-buffer.js.map