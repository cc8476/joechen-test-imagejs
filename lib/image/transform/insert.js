"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insert;

var _getImageParameters = _interopRequireDefault(require("../internal/getImageParameters"));

var _getOutputImage = require("../internal/getOutputImage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Inserts an image within another image.
 * @memberof Image
 * @instance
 * @param {Image} toInsert The image to insert. Out of boundary pixel will be ignored.
 * @param {object} [options]
 * @param {number} [options.x=0] x offset
 * @param {number} [options.y=0] y offset
 * @param {boolean} [options.inPlace=false] - If true modifies the image. If false the insertion is performed on a copy of the image.
 * @return {Image} The modified image or the new image.
 */
function insert(toInsert, options = {}) {
  const parameters = (0, _getImageParameters.default)(toInsert);
  this.checkProcessable('insert', parameters);
  let {
    x = 0,
    y = 0
  } = options;
  const out = (0, _getOutputImage.getOutputImageOrInPlace)(this, options, {
    copy: true
  });
  const maxY = Math.min(out.height, y + toInsert.height);
  const maxX = Math.min(out.width, x + toInsert.width);

  if (out.bitDepth === 1) {
    for (let j = y; j < maxY; j++) {
      for (let i = x; i < maxX; i++) {
        const val = toInsert.getBitXY(i - x, j - y);
        if (val) out.setBitXY(i, j);else out.clearBitXY(i, j);
      }
    }
  } else {
    for (let j = y; j < maxY; j++) {
      for (let i = x; i < maxX; i++) {
        out.setPixelXY(i, j, toInsert.getPixelXY(i - x, j - y));
      }
    }
  }

  return out;
}