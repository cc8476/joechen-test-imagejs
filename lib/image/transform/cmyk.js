"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cmyk;

var _Image = _interopRequireDefault(require("../Image"));

var _model = require("../model/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://www.easyrgb.com/index.php?X=MATH&H=18#text18
// check rgbToHsl : https://bgrins.github.io/TinyColor/docs/tinycolor.html

/**
 * Make a copy of the current image and convert the color model to CMYK
 * The source image has to be RGB !
 * @memberof Image
 * @instance
 * @return {Image} - New image in CMYK color model
 * @example
 * var cmykImage = image.cmyk();
 * // we can create one image per channel
 * var channels = cmykImage.split();
 */
function cmyk() {
  this.checkProcessable('cmyk', {
    bitDepth: [8, 16],
    alpha: [0, 1],
    colorModel: [_model.RGB]
  });

  let newImage = _Image.default.createFrom(this, {
    components: 4,
    colorModel: _model.CMYK
  });

  let ptr = 0;
  let data = this.data;

  for (let i = 0; i < data.length; i += this.channels) {
    let red = data[i];
    let green = data[i + 1];
    let blue = data[i + 2];
    let black = Math.min(this.maxValue - red, this.maxValue - green, this.maxValue - blue);
    let cyan = (this.maxValue - red - black) / (1 - black / this.maxValue);
    let magenta = (this.maxValue - green - black) / (1 - black / this.maxValue);
    let yellow = (this.maxValue - blue - black) / (1 - black / this.maxValue);
    newImage.data[ptr++] = Math.round(cyan);
    newImage.data[ptr++] = Math.round(magenta);
    newImage.data[ptr++] = Math.round(yellow);
    newImage.data[ptr++] = Math.round(black);

    if (this.alpha) {
      newImage.data[ptr++] = data[i + 3];
    }
  }

  return newImage;
}