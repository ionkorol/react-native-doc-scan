"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.sendMessage = exports.sleep = exports.sortPoints = exports.matToBase64 = exports.base64ToMat = void 0;
var base64ToMat = function (base64) {
    return new Promise(function (resolve) {
        var originalImage = new Image();
        originalImage.onload = function () { return resolve(cv.imread(originalImage)); };
        originalImage.src = base64;
    });
};
exports.base64ToMat = base64ToMat;
var matToBase64 = function (mat) {
    var outputCanvas = document.createElement("canvas");
    cv.imshow(outputCanvas, mat);
    var base64 = outputCanvas.toDataURL();
    return base64;
};
exports.matToBase64 = matToBase64;
var sortPoints = function (points) {
    var topLeftPoint;
    var topRightPoint;
    var bottomRightPoint;
    var bottomLeftPoint;
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        var currentPointSum = point.reduce(function (a, b) { return a + b; });
        var currentPointDifference = point.reduce(function (a, b) { return a - b; });
        if (!topLeftPoint) {
            topLeftPoint = { x: point[0], y: point[1] };
        }
        else {
            var topLeftPointSum = topLeftPoint.x + topLeftPoint.y;
            if (topLeftPointSum > currentPointSum) {
                topLeftPoint = { x: point[0], y: point[1] };
            }
        }
        if (!topRightPoint) {
            topRightPoint = { x: point[0], y: point[1] };
        }
        else {
            var topRightPointDifference = topRightPoint.x - topRightPoint.y;
            if (topRightPointDifference < currentPointDifference) {
                topRightPoint = { x: point[0], y: point[1] };
            }
        }
        if (!bottomRightPoint) {
            bottomRightPoint = { x: point[0], y: point[1] };
        }
        else {
            var bottomRightPointSum = bottomRightPoint.x + bottomRightPoint.y;
            if (bottomRightPointSum < currentPointSum) {
                bottomRightPoint = { x: point[0], y: point[1] };
            }
        }
        if (!bottomLeftPoint) {
            bottomLeftPoint = { x: point[0], y: point[1] };
        }
        else {
            var blPointDifference = bottomLeftPoint.x - bottomLeftPoint.y;
            if (blPointDifference > currentPointDifference) {
                bottomLeftPoint = { x: point[0], y: point[1] };
            }
        }
    }
    var cornerPoints = {
        topLeft: topLeftPoint,
        topRight: topRightPoint,
        bottomRight: bottomRightPoint,
        bottomLeft: bottomLeftPoint
    };
    return cornerPoints;
};
exports.sortPoints = sortPoints;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
var sendMessage = function (message) {
    if ("ReactNativeWebView" in window) {
        window["ReactNativeWebView"].postMessage(JSON.stringify(message));
    }
    else {
        window.postMessage(JSON.stringify(__assign(__assign({}, message), { local: true })));
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=utils.js.map