import { InboundMessage, OutboundMessage } from "./types";
import { perspectiveCorrection, grayScale, findCorners } from "./functions";

window.addEventListener("message", (event: MessageEvent<string>) => {
  const eventData = JSON.parse(event.data) as InboundMessage;
  console.log(eventData);
  if (!eventData.local) {
    handleMessageType(eventData);
  }
});

document.addEventListener("message", (event: MessageEvent<string>) => {
  const eventData = JSON.parse(event.data) as InboundMessage;
  console.log(eventData);
  if (!eventData.local) {
    handleMessageType(eventData);
  }
});

const handleMessageType = (data: OutboundMessage) => {
  console.log(data);

  switch (data.functionName) {
    case "perspectiveCrop":
      perspectiveCorrection(data);
      break;
    case "grayScale":
      grayScale(data);
      break;
    case "findCorners":
      findCorners(data);
      break;
    default:
      alert(`Bad message ${data.functionName}`);
      break;
  }
};
