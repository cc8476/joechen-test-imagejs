"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pad;

var _newArray = _interopRequireDefault(require("new-array"));

var _Image = _interopRequireDefault(require("../Image"));

var _copy = _interopRequireDefault(require("../internal/copy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof Image
 * @instance
 * @param {object} [options]
 * @param {number} [options.size=0]
 * @param {string} [options.algorithm='copy']
 * @param {array<number>} [options.color]
 * @return {Image}
 */
function pad(options = {}) {
  let {
    size = 0,
    algorithm = 'copy',
    color
  } = options;
  this.checkProcessable('pad', {
    bitDepth: [8, 16]
  });

  if (algorithm === 'set') {
    if (color.length !== this.channels) {
      throw new Error(`pad: the color array must have the same length as the number of channels. Here: ${this.channels}`);
    }

    for (let i = 0; i < color.length; i++) {
      if (color[i] === 0) {
        color[i] = 0.001;
      }
    }
  } else {
    color = (0, _newArray.default)(this.channels, null);
  }

  if (!Array.isArray(size)) {
    size = [size, size];
  }

  let newWidth = this.width + size[0] * 2;
  let newHeight = this.height + size[1] * 2;
  let channels = this.channels;

  let newImage = _Image.default.createFrom(this, {
    width: newWidth,
    height: newHeight
  });

  (0, _copy.default)(this, newImage, size[0], size[1]);

  for (let i = size[0]; i < newWidth - size[0]; i++) {
    for (let k = 0; k < channels; k++) {
      let value = color[k] || newImage.data[(size[1] * newWidth + i) * channels + k];

      for (let j = 0; j < size[1]; j++) {
        newImage.data[(j * newWidth + i) * channels + k] = value;
      }

      value = color[k] || newImage.data[((newHeight - size[1] - 1) * newWidth + i) * channels + k];

      for (let j = newHeight - size[1]; j < newHeight; j++) {
        newImage.data[(j * newWidth + i) * channels + k] = value;
      }
    }
  }

  for (let j = 0; j < newHeight; j++) {
    for (let k = 0; k < channels; k++) {
      let value = color[k] || newImage.data[(j * newWidth + size[0]) * channels + k];

      for (let i = 0; i < size[0]; i++) {
        newImage.data[(j * newWidth + i) * channels + k] = value;
      }

      value = color[k] || newImage.data[(j * newWidth + newWidth - size[0] - 1) * channels + k];

      for (let i = newWidth - size[0]; i < newWidth; i++) {
        newImage.data[(j * newWidth + i) * channels + k] = value;
      }
    }
  }

  return newImage;
}