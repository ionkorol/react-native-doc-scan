"use strict";
exports.__esModule = true;
var functions_1 = require("./functions");
window.addEventListener("message", function (event) {
    var eventData = JSON.parse(event.data);
    console.log(eventData);
    if (!eventData.local) {
        handleMessageType(eventData);
    }
});
document.addEventListener("message", function (event) {
    var eventData = JSON.parse(event.data);
    console.log(eventData);
    if (!eventData.local) {
        handleMessageType(eventData);
    }
});
var handleMessageType = function (data) {
    console.log(data);
    switch (data.functionName) {
        case "perspectiveCrop":
            (0, functions_1.perspectiveCorrection)(data);
            break;
        case "grayScale":
            (0, functions_1.grayScale)(data);
            break;
        case "findCorners":
            (0, functions_1.findCorners)(data);
            break;
        default:
            alert("Bad message ".concat(data.functionName));
            break;
    }
};
//# sourceMappingURL=index.js.map