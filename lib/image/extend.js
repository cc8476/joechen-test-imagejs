"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extend;

var _abs = _interopRequireDefault(require("./filter/abs"));

var _invert = _interopRequireDefault(require("./filter/invert"));

var _flipX = _interopRequireDefault(require("./filter/flipX"));

var _flipY = _interopRequireDefault(require("./filter/flipY"));

var _blurFilter = _interopRequireDefault(require("./filter/blurFilter"));

var _medianFilter = _interopRequireDefault(require("./filter/medianFilter"));

var _gaussianFilter = _interopRequireDefault(require("./filter/gaussianFilter"));

var _sobelFilter = _interopRequireDefault(require("./filter/sobelFilter"));

var _scharrFilter = _interopRequireDefault(require("./filter/scharrFilter"));

var _gradientFilter = _interopRequireDefault(require("./filter/gradientFilter"));

var _level = _interopRequireDefault(require("./filter/level"));

var _add = _interopRequireDefault(require("./filter/add"));

var _subtract = _interopRequireDefault(require("./filter/subtract"));

var _subtractImage = _interopRequireDefault(require("./filter/subtractImage"));

var _hypotenuse = _interopRequireDefault(require("./filter/hypotenuse"));

var _multiply = _interopRequireDefault(require("./filter/multiply"));

var _divide = _interopRequireDefault(require("./filter/divide"));

var _background = _interopRequireDefault(require("./filter/background"));

var _dilate = _interopRequireDefault(require("./morphology/dilate"));

var _erode = _interopRequireDefault(require("./morphology/erode"));

var _open = _interopRequireDefault(require("./morphology/open"));

var _close = _interopRequireDefault(require("./morphology/close"));

var _topHat = _interopRequireDefault(require("./morphology/topHat"));

var _blackHat = _interopRequireDefault(require("./morphology/blackHat"));

var _morphologicalGradient = _interopRequireDefault(require("./morphology/morphologicalGradient"));

var _warping = _interopRequireDefault(require("./transform/warping"));

var _crop = _interopRequireDefault(require("./transform/crop"));

var _cropAlpha = _interopRequireDefault(require("./transform/cropAlpha"));

var _resize = _interopRequireDefault(require("./transform/resize/resize"));

var _hsv = _interopRequireDefault(require("./transform/hsv"));

var _hsl = _interopRequireDefault(require("./transform/hsl"));

var _cmyk = _interopRequireDefault(require("./transform/cmyk"));

var _rgba = _interopRequireDefault(require("./transform/rgba8"));

var _grey = _interopRequireDefault(require("./transform/grey"));

var _mask = _interopRequireDefault(require("./transform/mask/mask"));

var _pad = _interopRequireDefault(require("./transform/pad"));

var _colorDepth = _interopRequireDefault(require("./transform/colorDepth"));

var _rotate = require("./transform/rotate");

var _insert = _interopRequireDefault(require("./transform/insert"));

var _setBorder = _interopRequireDefault(require("./utility/setBorder"));

var _split = _interopRequireDefault(require("./utility/split"));

var _getChannel = _interopRequireDefault(require("./utility/getChannel"));

var _combineChannels = _interopRequireDefault(require("./utility/combineChannels"));

var _setChannel = _interopRequireDefault(require("./utility/setChannel"));

var _getSimilarity = _interopRequireDefault(require("./utility/getSimilarity"));

var _getPixelsGrid = _interopRequireDefault(require("./utility/getPixelsGrid"));

var _getBestMatch = _interopRequireDefault(require("./utility/getBestMatch"));

var _getRow = _interopRequireDefault(require("./utility/getRow"));

var _getColumn = _interopRequireDefault(require("./utility/getColumn"));

var _getMatrix = _interopRequireDefault(require("./utility/getMatrix"));

var _setMatrix = _interopRequireDefault(require("./utility/setMatrix"));

var _getPixelsArray = _interopRequireDefault(require("./utility/getPixelsArray"));

var _getIntersection = _interopRequireDefault(require("./utility/getIntersection"));

var _getClosestCommonParent = _interopRequireDefault(require("./utility/getClosestCommonParent"));

var _getThreshold = _interopRequireDefault(require("./utility/getThreshold"));

var _cannyEdge = _interopRequireDefault(require("./operator/cannyEdge"));

var _convolution = _interopRequireDefault(require("./operator/convolution"));

var _extract = _interopRequireDefault(require("./operator/extract"));

var _floodFill = _interopRequireDefault(require("./operator/floodFill"));

var _paintLabels = _interopRequireDefault(require("./operator/paintLabels"));

var _paintMasks = _interopRequireDefault(require("./operator/paintMasks"));

var _paintPoints = _interopRequireDefault(require("./operator/paintPoints"));

var _paintPolyline = _interopRequireDefault(require("./operator/paintPolyline"));

var _paintPolylines = _interopRequireDefault(require("./operator/paintPolylines"));

var _paintPolygon = _interopRequireDefault(require("./operator/paintPolygon"));

var _paintPolygons = _interopRequireDefault(require("./operator/paintPolygons"));

var _histogram = require("./compute/histogram");

var _colorHistogram = _interopRequireDefault(require("./compute/colorHistogram"));

var _min = _interopRequireDefault(require("./compute/min"));

var _max = _interopRequireDefault(require("./compute/max"));

var _sum = _interopRequireDefault(require("./compute/sum"));

var _moment = _interopRequireDefault(require("./compute/moment"));

var _localMaxima = _interopRequireDefault(require("./compute/localMaxima"));

var _mean = _interopRequireDefault(require("./compute/mean"));

var _median = _interopRequireDefault(require("./compute/median"));

var _points = _interopRequireDefault(require("./compute/points"));

var _extendedPoints = _interopRequireDefault(require("./compute/extendedPoints"));

var _relativePosition = _interopRequireDefault(require("./compute/relativePosition"));

var _countAlphaPixels = _interopRequireDefault(require("./compute/countAlphaPixels"));

var _monotoneChainConvexHull = _interopRequireDefault(require("./compute/monotoneChainConvexHull"));

var _minimalBoundingRectangle = _interopRequireDefault(require("./compute/minimalBoundingRectangle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/order */
// filters
// morphology transforms
// transforms
// utility
// operators
// computers
function extend(Image) {
  let inPlace = {
    inPlace: true
  };
  Image.extendMethod('invert', _invert.default);
  Image.extendMethod('abs', _abs.default);
  Image.extendMethod('level', _level.default, inPlace);
  Image.extendMethod('add', _add.default, inPlace);
  Image.extendMethod('subtract', _subtract.default, inPlace);
  Image.extendMethod('subtractImage', _subtractImage.default);
  Image.extendMethod('multiply', _multiply.default, inPlace);
  Image.extendMethod('divide', _divide.default, inPlace);
  Image.extendMethod('hypotenuse', _hypotenuse.default);
  Image.extendMethod('background', _background.default);
  Image.extendMethod('flipX', _flipX.default);
  Image.extendMethod('flipY', _flipY.default);
  Image.extendMethod('blurFilter', _blurFilter.default);
  Image.extendMethod('medianFilter', _medianFilter.default);
  Image.extendMethod('gaussianFilter', _gaussianFilter.default);
  Image.extendMethod('sobelFilter', _sobelFilter.default);
  Image.extendMethod('gradientFilter', _gradientFilter.default);
  Image.extendMethod('scharrFilter', _scharrFilter.default);
  Image.extendMethod('dilate', _dilate.default);
  Image.extendMethod('erode', _erode.default);
  Image.extendMethod('open', _open.default);
  Image.extendMethod('close', _close.default);
  Image.extendMethod('topHat', _topHat.default);
  Image.extendMethod('blackHat', _blackHat.default);
  Image.extendMethod('morphologicalGradient', _morphologicalGradient.default);
  Image.extendMethod('warpingFourPoints', _warping.default);
  Image.extendMethod('crop', _crop.default);
  Image.extendMethod('cropAlpha', _cropAlpha.default);
  Image.extendMethod('resize', _resize.default).extendMethod('scale', _resize.default);
  Image.extendMethod('hsv', _hsv.default);
  Image.extendMethod('hsl', _hsl.default);
  Image.extendMethod('cmyk', _cmyk.default);
  Image.extendMethod('rgba8', _rgba.default);
  Image.extendMethod('grey', _grey.default).extendMethod('gray', _grey.default);
  Image.extendMethod('mask', _mask.default);
  Image.extendMethod('pad', _pad.default);
  Image.extendMethod('colorDepth', _colorDepth.default);
  Image.extendMethod('setBorder', _setBorder.default, inPlace);
  Image.extendMethod('rotate', _rotate.rotate);
  Image.extendMethod('rotateLeft', _rotate.rotateLeft);
  Image.extendMethod('rotateRight', _rotate.rotateRight);
  Image.extendMethod('insert', _insert.default);
  Image.extendMethod('getRow', _getRow.default);
  Image.extendMethod('getColumn', _getColumn.default);
  Image.extendMethod('getMatrix', _getMatrix.default);
  Image.extendMethod('setMatrix', _setMatrix.default);
  Image.extendMethod('getPixelsArray', _getPixelsArray.default);
  Image.extendMethod('getIntersection', _getIntersection.default);
  Image.extendMethod('getClosestCommonParent', _getClosestCommonParent.default);
  Image.extendMethod('getThreshold', _getThreshold.default);
  Image.extendMethod('split', _split.default);
  Image.extendMethod('getChannel', _getChannel.default);
  Image.extendMethod('combineChannels', _combineChannels.default);
  Image.extendMethod('setChannel', _setChannel.default);
  Image.extendMethod('getSimilarity', _getSimilarity.default);
  Image.extendMethod('getPixelsGrid', _getPixelsGrid.default);
  Image.extendMethod('getBestMatch', _getBestMatch.default);
  Image.extendMethod('cannyEdge', _cannyEdge.default);
  Image.extendMethod('convolution', _convolution.default);
  Image.extendMethod('extract', _extract.default);
  Image.extendMethod('floodFill', _floodFill.default);
  Image.extendMethod('paintLabels', _paintLabels.default, inPlace);
  Image.extendMethod('paintMasks', _paintMasks.default, inPlace);
  Image.extendMethod('paintPoints', _paintPoints.default, inPlace);
  Image.extendMethod('paintPolyline', _paintPolyline.default, inPlace);
  Image.extendMethod('paintPolylines', _paintPolylines.default, inPlace);
  Image.extendMethod('paintPolygon', _paintPolygon.default, inPlace);
  Image.extendMethod('paintPolygons', _paintPolygons.default, inPlace);
  Image.extendMethod('countAlphaPixels', _countAlphaPixels.default);
  Image.extendMethod('monotoneChainConvexHull', _monotoneChainConvexHull.default);
  Image.extendMethod('minimalBoundingRectangle', _minimalBoundingRectangle.default);
  Image.extendMethod('getHistogram', _histogram.getHistogram).extendProperty('histogram', _histogram.getHistogram);
  Image.extendMethod('getHistograms', _histogram.getHistograms).extendProperty('histograms', _histogram.getHistograms);
  Image.extendMethod('getColorHistogram', _colorHistogram.default).extendProperty('colorHistogram', _colorHistogram.default);
  Image.extendMethod('getMin', _min.default).extendProperty('min', _min.default);
  Image.extendMethod('getMax', _max.default).extendProperty('max', _max.default);
  Image.extendMethod('getSum', _sum.default).extendProperty('sum', _sum.default);
  Image.extendMethod('getMoment', _moment.default).extendProperty('moment', _moment.default);
  Image.extendMethod('getLocalMaxima', _localMaxima.default);
  Image.extendMethod('getMedian', _median.default).extendProperty('median', _median.default);
  Image.extendMethod('getMean', _mean.default).extendProperty('mean', _mean.default);
  Image.extendMethod('getPoints', _points.default).extendProperty('points', _points.default);
  Image.extendMethod('getExtendedPoints', _extendedPoints.default).extendProperty('extendedPoints', _extendedPoints.default);
  Image.extendMethod('getRelativePosition', _relativePosition.default);
}