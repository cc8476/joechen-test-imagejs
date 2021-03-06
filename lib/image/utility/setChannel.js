"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setChannel;

var _channel = require("../../util/channel");

/**
 * @memberof Image
 * @instance
 * @param {*} channel
 * @param {Image} image
 *
 * @return {this}
 */
function setChannel(channel, image) {
  this.checkProcessable('setChannel', {
    bitDepth: [8, 16]
  });
  image.checkProcessable('setChannel (image parameter check)', {
    bitDepth: [this.bitDepth],
    alpha: [0],
    components: [1]
  });

  if (image.width !== this.width || image.height !== this.height) {
    throw new Error('Images must have exactly the same width and height');
  }

  channel = (0, _channel.validateChannel)(this, channel);
  let ptr = channel;

  for (let i = 0; i < image.data.length; i++) {
    this.data[ptr] = image.data[i];
    ptr += this.channels;
  }

  return this;
}