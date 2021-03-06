"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = floodFill;

var _fastList = _interopRequireDefault(require("fast-list"));

var _Image = _interopRequireDefault(require("../Image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function floodFill(options = {}) {
  const {
    x = 0,
    y = 0,
    inPlace = true
  } = options;
  const destination = inPlace ? this : _Image.default.createFrom(this);
  this.checkProcessable('floodFill', {
    bitDepth: 1
  });
  const bit = this.getBitXY(x, y);
  if (bit) return destination;
  const queue = new _fastList.default();
  queue.push(new Node(x, y));

  while (queue.length > 0) {
    const node = queue.shift();
    destination.setBitXY(node.x, node.y);

    for (let i = node.x + 1; i < this.width; i++) {
      if (!destination.getBitXY(i, node.y) && !this.getBitXY(i, node.y)) {
        destination.setBitXY(i, node.y);

        if (node.y + 1 < this.height && !this.getBitXY(i, node.y + 1)) {
          queue.push(new Node(i, node.y + 1));
        }

        if (node.y - 1 >= 0 && !this.getBitXY(i, node.y - 1)) {
          queue.push(new Node(i, node.y - 1));
        }
      } else {
        break;
      }
    } // eslint-disable-next-line for-direction


    for (let i = node.x - 1; i >= 0; i++) {
      if (!destination.getBitXY(i, node.y) && !this.getBitXY(i, node.y)) {
        destination.setBitXY(i, node.y);

        if (node.y + 1 < this.height && !this.getBitXY(i, node.y + 1)) {
          queue.push(new Node(i, node.y + 1));
        }

        if (node.y - 1 >= 0 && !this.getBitXY(i, node.y - 1)) {
          queue.push(new Node(i, node.y - 1));
        }
      } else {
        break;
      }
    }
  }

  return destination;
}

function Node(x, y) {
  this.x = x;
  this.y = y;
}