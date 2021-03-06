"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradientFilter;

var _convolution = _interopRequireDefault(require("../operator/convolution"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Direction of a gradient filter
 * @typedef {('x'|'y'|'xy')} GradientDirection
 */

/**
 * @memberof Image
 * @instance
 * @param {object} [options]
 * @param {GradientDirection} [options.direction]
 * @param {Array<Array<number>>} [options.kernelX]
 * @param {Array<Array<number>>} [options.kernelY]
 * @param {string} [options.border='copy']
 * @param {*} [options.channels]
 * @param {number} [options.bitDepth=this.bitDepth] Specify the bitDepth of the resulting image
 * @return {Image}
 */
function gradientFilter(options = {}) {
  let {
    direction = 'xy',
    border = 'copy',
    kernelX,
    kernelY,
    channels,
    bitDepth = this.bitDepth
  } = options;
  this.checkProcessable('gradientFilter', {
    bitDepth: [8, 16]
  });

  switch (direction) {
    case 'x':
      if (!kernelX) throw new Error('kernelX option is missing');
      return _convolution.default.call(this, kernelX, {
        channels: channels,
        border: border,
        bitDepth
      });

    case 'y':
      if (!kernelY) throw new Error('kernelY option is missing');
      return _convolution.default.call(this, kernelY, {
        channels: channels,
        border: border,
        bitDepth
      });

    case 'xy':
      {
        if (!kernelX) throw new Error('kernelX option is missing');
        if (!kernelY) throw new Error('kernelY option is missing');

        const gX = _convolution.default.call(this, kernelX, {
          channels: channels,
          border: border,
          bitDepth: 32
        });

        const gY = _convolution.default.call(this, kernelY, {
          channels: channels,
          border: border,
          bitDepth: 32
        });

        return gX.hypotenuse(gY, {
          bitDepth,
          channels: channels
        });
      }

    default:
      throw new Error(`Unknown parameter direction: ${direction}`);
  }
}