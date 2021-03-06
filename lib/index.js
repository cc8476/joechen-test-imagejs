"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Image.default;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function () {
    return _Image.default;
  }
});
Object.defineProperty(exports, "Stack", {
  enumerable: true,
  get: function () {
    return _Stack.default;
  }
});
Object.defineProperty(exports, "Shape", {
  enumerable: true,
  get: function () {
    return _Shape.default;
  }
});
Object.defineProperty(exports, "Worker", {
  enumerable: true,
  get: function () {
    return _worker.default;
  }
});
exports.Kernel = exports.Static = void 0;

var _Image = _interopRequireDefault(require("./image/Image"));

var _greyAlgorithms = require("./image/transform/greyAlgorithms");

var _thresholdAlgorithms = require("./image/transform/mask/thresholdAlgorithms");

var Kernel = _interopRequireWildcard(require("./kernel/kernel"));

exports.Kernel = Kernel;

var _Stack = _interopRequireDefault(require("./stack/Stack"));

var _Shape = _interopRequireDefault(require("./util/Shape"));

var _worker = _interopRequireDefault(require("./worker/worker"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Static = {
  grey: _greyAlgorithms.names,
  threshold: _thresholdAlgorithms.names
};
exports.Static = Static;