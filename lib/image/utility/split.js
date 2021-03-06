"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = split;

var _Stack = _interopRequireDefault(require("../../stack/Stack"));

var _Image = _interopRequireDefault(require("../Image"));

var _model = require("../model/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof Image
 * @instance
 * @param {object} [options]
 * @param {boolean} [options.preserveAlpha=true]
 * @return {Stack}
 */
function split(options = {}) {
  let {
    preserveAlpha = true
  } = options;
  this.checkProcessable('split', {
    bitDepth: [8, 16]
  }); // split will always return a stack of images

  if (this.components === 1) {
    return new _Stack.default([this.clone()]);
  }

  let images = new _Stack.default();
  let data = this.data;

  if (this.alpha && preserveAlpha) {
    for (let i = 0; i < this.components; i++) {
      let newImage = _Image.default.createFrom(this, {
        components: 1,
        alpha: true,
        colorModel: _model.GREY
      });

      let ptr = 0;

      for (let j = 0; j < data.length; j += this.channels) {
        newImage.data[ptr++] = data[j + i];
        newImage.data[ptr++] = data[j + this.components];
      }

      images.push(newImage);
    }
  } else {
    for (let i = 0; i < this.channels; i++) {
      let newImage = _Image.default.createFrom(this, {
        components: 1,
        alpha: false,
        colorModel: _model.GREY
      });

      let ptr = 0;

      for (let j = 0; j < data.length; j += this.channels) {
        newImage.data[ptr++] = data[j + i];
      }

      images.push(newImage);
    }
  }

  return images;
}