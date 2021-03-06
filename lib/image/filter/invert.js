"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invert;

var _copyAlphaChannel = _interopRequireDefault(require("../internal/copyAlphaChannel"));

var _getOutputImage = require("../internal/getOutputImage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Invert the colors of an image
 * @memberof Image
 * @instance
 * @param {object} [options]
 * @param {boolean} [options.inPlace=false]
 * @param {Image} [options.out]
 * @return {Image}
 */
function invert(options = {}) {
  this.checkProcessable('invert', {
    bitDepth: [1, 8, 16]
  });
  const out = (0, _getOutputImage.getOutputImageOrInPlace)(this, options);

  if (this.bitDepth === 1) {
    invertBinary(this, out);
  } else {
    invertColor(this, out);

    if (this !== out) {
      (0, _copyAlphaChannel.default)(this, out);
    }
  }

  return out;
}

function invertBinary(image, out) {
  for (let i = 0; i < image.data.length; i++) {
    out.data[i] = ~image.data[i];
  }
}

function invertColor(image, out) {
  for (let pixel = 0; pixel < image.data.length; pixel += image.channels) {
    for (let c = 0; c < image.components; c++) {
      out.data[pixel + c] = image.maxValue - image.data[pixel + c];
    }
  }
}