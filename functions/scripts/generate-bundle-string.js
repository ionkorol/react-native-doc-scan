const fs = require("fs");
const path = require("path");

const main = async () => {
  // const destinationFilePath = path.join(__dirname, "..", "dst.html");
  const destinationFilePath = path.join(__dirname, "..", "dst.js");
  try {
    const bundleBuff = fs.readFileSync(path.join(__dirname, "..", "bundle.js"));
    const opencvBuff = fs.readFileSync(path.join(__dirname, "..", "opencv.js"));

    const htmlString = JSON.stringify(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>App</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script type="application/javascript" >
          {${opencvBuff.toString()}}
        </script>
        <script type="application/javascript" >
          {${bundleBuff.toString()}}
        </script>
      </head>
      <body>
      </body>
    </html>
    `);
    const jsString = `
    export const htmlString = ${htmlString}
    `;
    fs.writeFileSync(destinationFilePath, jsString);
    // fs.writeFileSync(destinationFilePath, htmlString);
  } catch (error) {
    console.log(error);
  }
};

main();
