"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = monotoneChainConvexHull;

var _monotoneChainConvexHull = _interopRequireDefault(require("monotone-chain-convex-hull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the convex hull of a binary image
 * @memberof Image
 * @instance
 * @return {Array<Array<number>>}
 */
function monotoneChainConvexHull() {
  return (0, _monotoneChainConvexHull.default)(this.extendedPoints, {
    sorted: false
  });
}