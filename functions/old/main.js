window.addEventListener("message", (event) => {
  const eventData = JSON.parse(event.data);
  handleMessageType(eventData);
});

document.addEventListener("message", (event) => {
  const eventData = JSON.parse(event.data);
  handleMessageType(eventData);
});

/**
 *
 * @param {InboundMessage} data
 */

const handleMessageType = (data) => {
  switch (data.function) {
    case "crop":
      perspectiveCorrection(data);
      break;
    case "grayscale":
      grayScale(data);
      break;
    case "findCorners":
      findCorners(data);
      break;
    default:
      alert("Bad message");
      break;
  }
};

/**
 *
 * @param {InboundMessage} data
 */
const perspectiveCorrection = async (data) => {
  sendMessage({ loading: true });
  try {
    const originalImageMat = await base64ToMat(data.base64);

    const transformedImageMat = new cv.Mat();
    const fromPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, data.points);
    const { rows, cols } = originalImageMat;
    const dsize = new cv.Size(cols, rows);
    const toPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
      0,
      0,
      cols,
      0,
      cols,
      rows,
      0,
      rows,
    ]);

    const M = cv.getPerspectiveTransform(fromPointsMat, toPoints);
    cv.warpPerspective(originalImageMat, transformedImageMat, M, dsize);

    const base64Data = matToBase64(transformedImageMat);

    sendMessage({ loading: false, base64: base64Data });
    fromPointsMat.delete();
    toPoints.delete();
    originalImageMat.delete();
    transformedImageMat.delete();
  } catch (error) {
    sendMessage({ loading: false, error: JSON.stringify(error) });
  }
};

/**
 *
 * @param {OutboundMessage} message
 */

const sendMessage = (message) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }
};

/**
 *
 * @param {InboundMessage} data
 */
const grayScale = async (data) => {
  sendMessage({ loading: true });
  try {
    const originalImageMat = await base64ToMat(data.base64);
    const transformedImageMat = new cv.Mat();
    cv.cvtColor(originalImageMat, transformedImageMat, cv.COLOR_BGR2GRAY);

    const base64Data = matToBase64(transformedImageMat);
    sendMessage({ loading: false, base64: base64Data });
    originalImageMat.delete();
    transformedImageMat.delete();
  } catch (error) {
    sendMessage({ loading: false, error });
  }
};

/**************** Find Corners ****************/

/**
 *
 * @param {InboundMessage} data
 * @param {HTMLElement} dstImage
 */
const findCorners = async (data) => {
  sendMessage({ loading: true });
  try {
    const originalImageMat = await base64ToMat(data.base64);

    cv.cvtColor(originalImageMat, originalImageMat, cv.COLOR_BGR2GRAY, 0);

    cv.GaussianBlur(
      originalImageMat,
      originalImageMat,
      new cv.Size(5, 5),
      0,
      0,
      cv.BORDER_DEFAULT
    );

    cv.threshold(
      originalImageMat,
      originalImageMat,
      100,
      200,
      cv.THRESH_BINARY
    );

    cv.Canny(originalImageMat, originalImageMat, 50, 100);

    var contours = new cv.MatVector();
    var hierarchy = new cv.Mat();
    cv.findContours(
      originalImageMat,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    );

    const points = [];

    for (let row = 0; row < originalImageMat.rows; row++) {
      for (let column = 0; column < originalImageMat.cols; column++) {
        const value = originalImageMat.ucharPtr(row, column)[0];
        if (value > 200) {
          points.push([column, row]);
        }
      }
    }

    let tl = [];
    let tr = [];
    let br = [];
    let bl = [];

    for (const point of points) {
      const currentPointSum = point.reduce((a, b) => a + b);
      const currentPointDifference = point.reduce((a, b) => a - b);
      // Top Left
      // Lowest sum
      if (!tl.length) {
        tl = point;
      } else {
        const tlPointSum = tl.reduce((a, b) => a + b);
        if (tlPointSum > currentPointSum) {
          tl = point;
        }
      }

      // Top Right
      // Highest difference in x - y
      if (!tr.length) {
        tr = point;
      } else {
        const trPointDifference = tr.reduce((a, b) => a - b);
        if (trPointDifference < currentPointDifference) {
          tr = point;
        }
      }

      // Bottom Right
      // Highest sum
      if (!br.length) {
        br = point;
      } else {
        const brPointSum = br.reduce((a, b) => a + b);
        if (brPointSum < currentPointSum) {
          br = point;
        }
      }
      // Bottom Left
      // Lowest difference in x - y
      if (!bl.length) {
        bl = point;
      } else {
        const blPointDifference = bl.reduce((a, b) => a - b);
        if (blPointDifference > currentPointDifference) {
          bl = point;
        }
      }
    }

    const cornerPoints = {
      topLeft: tl,
      topRight: tr,
      bottomRight: br,
      bottomLeft: bl,
    };

    console.log(cornerPoints);

    sendMessage({
      loading: false,
      points: cornerPoints,
    });

    // Test Only
    const returnData = {
      base64: matToBase64(originalImageMat),
      points: cornerPoints,
    };

    // Clear Mats
    originalImageMat.delete();
    contours.delete();
    hierarchy.delete();

    return matToBase64(originalImageMat);
  } catch (error) {
    sendMessage({
      loading: false,
      error,
    });
  }
};

/**************** UTILS ****************/

/**
 *
 * @param {string} base64
 * @returns {Promise<Mat.Mat>}
 */
const base64ToMat = (base64) => {
  return new Promise((resolve) => {
    const originalImage = new Image();
    originalImage.onload = () => resolve(cv.imread(originalImage));
    originalImage.src = base64;
  });
};

/**
 *
 * @param {Mat} mat
 * @returns {string}
 */
const matToBase64 = (mat) => {
  const outputCanvas = document.createElement("canvas");
  cv.imshow(outputCanvas, mat);
  const base64 = outputCanvas.toDataURL();
  return base64;
};

/**
 *
 * @param {Array} points
 */
const sortPoints = (points) => {
  const topLeft = Math.min();
};

/**
 *
 * @param {number} ms Milliseconds
 * @returns
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
