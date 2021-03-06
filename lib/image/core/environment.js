"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchBinary = fetchBinary;
Object.defineProperty(exports, "createWriteStream", {
  enumerable: true,
  get: function () {
    return _fs.createWriteStream;
  }
});
Object.defineProperty(exports, "writeFile", {
  enumerable: true,
  get: function () {
    return _fs.writeFile;
  }
});
exports.DOMImage = exports.ImageData = exports.createCanvas = exports.env = void 0;

var _fs = require("fs");

const message = 'requires the canvas library. Install it with `npm install canvas@next`.';
let createCanvas, DOMImage, ImageData;
exports.ImageData = ImageData;
exports.DOMImage = DOMImage;
exports.createCanvas = createCanvas;

try {
  const canvas = require('canvas');

  exports.createCanvas = createCanvas = canvas.createCanvas;
  exports.DOMImage = DOMImage = canvas.Image;
  exports.ImageData = ImageData = canvas.ImageData;
} catch (e) {
  exports.createCanvas = createCanvas = function () {
    throw new Error(`createCanvas ${message}`);
  };

  exports.DOMImage = DOMImage = function () {
    throw new Error(`DOMImage ${message}`);
  };

  exports.ImageData = ImageData = function () {
    throw new Error(`ImageData ${message}`);
  };
}

const env = 'node';
exports.env = env;

function fetchBinary(path) {
  return new Promise(function (resolve, reject) {
    (0, _fs.readFile)(path, function (err, data) {
      if (err) reject(err);else resolve(data.buffer);
    });
  });
}