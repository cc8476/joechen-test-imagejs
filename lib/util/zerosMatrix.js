"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = zerosMatrix;

function zerosMatrix(height, width) {
  let matrix = new Array(height);

  for (let i = 0; i < height; i++) {
    matrix[i] = new Array(width).fill(0);
  }

  return matrix;
}