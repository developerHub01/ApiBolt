import axios from "axios";

interface StatusInterface {
  [key: string]: {
    reason: string;
    description: string;
  };
}

let statusMessagesCache: StatusInterface | null = null;

export const getStatusMessage = async (statusCode: number) => {
  if (!statusMessagesCache) {
    const res = await axios.get("/data/http_status_details.json");
    statusMessagesCache = res.data as StatusInterface;
  }
  return statusMessagesCache[statusCode];
};