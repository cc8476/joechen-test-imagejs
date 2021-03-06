"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  laplacianOfGaussian: true
};
Object.defineProperty(exports, "laplacianOfGaussian", {
  enumerable: true,
  get: function () {
    return _laplacianOfGaussian.laplacianOfGaussian;
  }
});

var _kernels = require("../util/kernels");

Object.keys(_kernels).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _kernels[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _kernels[key];
    }
  });
});

var _laplacianOfGaussian = require("./laplacianOfGaussian");