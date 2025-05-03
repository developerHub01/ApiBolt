import axios from "axios";
let statusMessagesCache: Record<
  number,
  {
    reason: string;
    description: string;
  }
> = {};

export const getStatusMessage = async (statusCode: number) => {
  if (!statusMessagesCache) {
    const res = await axios.get("/status-messages.json");
    statusMessagesCache = res.data;
  }
  return statusMessagesCache[statusCode];
};
