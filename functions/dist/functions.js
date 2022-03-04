"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.findCorners = exports.grayScale = exports.perspectiveCorrection = void 0;
var utils_1 = require("./utils");
var perspectiveCorrection = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var originalImageMat, transformedImageMat, fromPointsMat, rows, cols, dsize, toPoints, M, base64Data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, utils_1.sendMessage)({ loading: true, functionName: "perspectiveCrop" });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, (0, utils_1.base64ToMat)(data.base64)];
            case 2:
                originalImageMat = _a.sent();
                transformedImageMat = new cv.Mat();
                fromPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, [
                    data.points.topLeft.x,
                    data.points.topLeft.y,
                    data.points.topRight.x,
                    data.points.topRight.y,
                    data.points.bottomRight.x,
                    data.points.bottomRight.y,
                    data.points.bottomLeft.x,
                    data.points.bottomLeft.y,
                ]);
                rows = originalImageMat.rows, cols = originalImageMat.cols;
                dsize = new cv.Size(cols, rows);
                toPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, cols, 0, cols, rows, 0, rows]);
                M = cv.getPerspectiveTransform(fromPointsMat, toPoints);
                cv.warpPerspective(originalImageMat, transformedImageMat, M, dsize);
                base64Data = (0, utils_1.matToBase64)(transformedImageMat);
                (0, utils_1.sendMessage)({
                    loading: false,
                    base64: base64Data,
                    functionName: "perspectiveCrop"
                });
                fromPointsMat["delete"]();
                toPoints["delete"]();
                originalImageMat["delete"]();
                transformedImageMat["delete"]();
                return [3, 4];
            case 3:
                error_1 = _a.sent();
                (0, utils_1.sendMessage)({
                    loading: false,
                    error: JSON.stringify(error_1),
                    functionName: "perspectiveCrop"
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.perspectiveCorrection = perspectiveCorrection;
var grayScale = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var originalImageMat, transformedImageMat, base64Data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, utils_1.sendMessage)({ loading: true, functionName: "grayScale" });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, (0, utils_1.base64ToMat)(data.base64)];
            case 2:
                originalImageMat = _a.sent();
                transformedImageMat = new cv.Mat();
                cv.cvtColor(originalImageMat, transformedImageMat, cv.COLOR_BGR2GRAY);
                base64Data = (0, utils_1.matToBase64)(transformedImageMat);
                (0, utils_1.sendMessage)({
                    loading: false,
                    base64: base64Data,
                    functionName: "grayScale"
                });
                originalImageMat["delete"]();
                transformedImageMat["delete"]();
                return [3, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                (0, utils_1.sendMessage)({ loading: false, error: error_2, functionName: "grayScale" });
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.grayScale = grayScale;
var findCorners = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var originalImageMat, contours, hierarchy, points, row, column, value, cornerPoints, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, utils_1.sendMessage)({ loading: true, functionName: "findCorners" });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, (0, utils_1.base64ToMat)(data.base64)];
            case 2:
                originalImageMat = _a.sent();
                cv.cvtColor(originalImageMat, originalImageMat, cv.COLOR_BGR2GRAY, 0);
                cv.GaussianBlur(originalImageMat, originalImageMat, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
                cv.Canny(originalImageMat, originalImageMat, 75, 200);
                contours = new cv.MatVector();
                hierarchy = new cv.Mat();
                cv.findContours(originalImageMat, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
                points = [];
                for (row = 0; row < originalImageMat.rows; row++) {
                    for (column = 0; column < originalImageMat.cols; column++) {
                        value = originalImageMat.ucharPtr(row, column)[0];
                        if (value > 200) {
                            points.push([column, row]);
                        }
                    }
                }
                cornerPoints = (0, utils_1.sortPoints)(points);
                (0, utils_1.sendMessage)({
                    loading: false,
                    points: cornerPoints,
                    functionName: "findCorners"
                });
                originalImageMat["delete"]();
                contours["delete"]();
                hierarchy["delete"]();
                return [3, 4];
            case 3:
                error_3 = _a.sent();
                (0, utils_1.sendMessage)({
                    loading: false,
                    error: error_3,
                    functionName: "findCorners"
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.findCorners = findCorners;
//# sourceMappingURL=functions.js.map