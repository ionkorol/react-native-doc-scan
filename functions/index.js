function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

const test = async () => {
  const image = document.getElementById("originalImage");
  toDataURL(image.src, async (base64) => {
    window.postMessage(JSON.stringify({ base64, function: "findCorners" }));
  });
};

window.addEventListener("message", (event) => {
  const dstImage = document.getElementById("outputImage");
  const eventData = JSON.parse(event.data);
  // console.log(eventData);
  if (eventData.points && eventData.points.length) {
    drawImage(dstImage, eventData.points);
  }
  if (eventData.local && eventData.base64) {
    dstImage.src = eventData.base64;
  }
});

const drawImage = (dstImage, points) => {
  const dstCanv = document.getElementById("outputCanvas");
  const dstMat = new cv.Mat(dstImage.height, dstImage.width);
  cv.drawMarker(dstMat, new cv.Point(points.topLeft[0], points.topLeft[1]));

  cv.imshow(dstCanv, dstMat);
};
