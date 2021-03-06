"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOutputImage = getOutputImage;
exports.getOutputImageOrInPlace = getOutputImageOrInPlace;

var _Image = _interopRequireDefault(require("../Image"));

var _getImageParameters = _interopRequireDefault(require("./getImageParameters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use this function to support getting the output image of an algorithm from user-supplied
 * options.
 * @private
 * @param {Image} thisImage - Original image on which the algorithm will be applied
 * @param {object} options - Options object received by the algorithm
 * @param {Image} [options.out] - If set, must be an image compatible with the algorithm
 * @param {object} newParameters - Parameters that will be combined with the ones from `thisImage`.
 * @param {object} internalOptions - Some additional options on the way to create the output image
 * @return {Image}
 */
function getOutputImage(thisImage, options, newParameters, internalOptions = {}) {
  const {
    out
  } = options;

  if (out === undefined) {
    if (internalOptions.copy) {
      return thisImage.clone();
    } else {
      return _Image.default.createFrom(thisImage, newParameters);
    }
  } else {
    if (!_Image.default.isImage(out)) {
      throw new TypeError('out must be an Image object');
    }

    const requirements = Object.assign((0, _getImageParameters.default)(thisImage), newParameters);

    for (const property in requirements) {
      if (out[property] !== requirements[property]) {
        throw new RangeError(`cannot use out. Its ${property} must be "${requirements[property]}" (found "${out[property]}")`);
      }
    }

    return out;
  }
}
/**
 * Same as getOutputImage but allows for an `inPlace` option.
 * @private
 * @param {Image} thisImage
 * @param {object} options
 * @param {boolean} [options.inPlace=false] - If true, thisImage is returned
 * @param {Image} [options.out]
 * @param {object} internalOptions - Additional internal options on how to create the output image
 * @param {boolean} [interalOptions.copy] - If true will copy the original image instead of creating a new empty image
 * @return {Image}
 */


function getOutputImageOrInPlace(thisImage, options, internalOptions) {
  if (options.inPlace !== undefined && typeof options.inPlace !== 'boolean') {
    throw new TypeError('inPlace option must be a boolean');
  }

  if (options.inPlace) {
    if (options.out !== undefined) {
      throw new TypeError('out option must not be set if inPlace option is true');
    }

    return thisImage;
  }

  return getOutputImage(thisImage, options, null, internalOptions);
}