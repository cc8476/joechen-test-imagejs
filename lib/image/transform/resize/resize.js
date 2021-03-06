"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resize;

var _converter = require("../../../util/converter");

var _Image = _interopRequireDefault(require("../../Image"));

var _checks = require("../../internal/checks");

var _nearestNeighbor = _interopRequireDefault(require("./nearestNeighbor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resize an image
 * @memberof Image
 * @instance
 * @param {object} [options]
 * @param {number} [options.width=this.width] - new width
 * @param {number} [options.height=this.height] - new height
 * @param {number} [options.factor=1] - scaling factor (applied to the new width and height values)
 * @param {InterpolationAlgorithm} [options.interpolation='nearestNeighbor']
 * @param {boolean} [options.preserveAspectRatio=true] - preserve width/height ratio if only one of them is defined
 * @return {Image}
 */
function resize(options = {}) {
  const {
    factor = 1,
    interpolation = _checks.validInterpolations.nearestneighbor,
    preserveAspectRatio = true
  } = options;
  const interpolationToUse = (0, _checks.checkInterpolation)(interpolation);
  let width = options.width;
  let height = options.height;

  if (!width) {
    if (height && preserveAspectRatio) {
      width = Math.round(height * (this.width / this.height));
    } else {
      width = this.width;
    }
  }

  if (!height) {
    if (preserveAspectRatio) {
      height = Math.round(width * (this.height / this.width));
    } else {
      height = this.height;
    }
  }

  ({
    width,
    height
  } = (0, _converter.factorDimensions)(factor, width, height));

  if (width === this.width && height === this.height) {
    const newImage = this.clone();
    newImage.position = [0, 0];
    return newImage;
  }

  let shiftX = Math.round((this.width - width) / 2);
  let shiftY = Math.round((this.height - height) / 2);

  const newImage = _Image.default.createFrom(this, {
    width,
    height,
    position: [shiftX, shiftY]
  });

  switch (interpolationToUse) {
    case _checks.validInterpolations.nearestneighbor:
      _nearestNeighbor.default.call(this, newImage, width, height);

      break;

    default:
      throw new Error(`unsupported resize interpolation: ${interpolationToUse}`);
  }

  return newImage;
}