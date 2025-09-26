import { httpStatus } from "../../data/http_status_details.js";
import { db } from "../db/index.js";
import { httpStatusTable } from "../db/schema.js";

export const generateHttpStatusSeed = async () => {
  try {
    const payload = Object.keys(httpStatus).map((code) => ({
      code: Number(code),
      reason: httpStatus[code].reason,
      description: httpStatus[code].description,
    }));

    await db.insert(httpStatusTable).values(payload).onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding HTTP status codes:", error);
  }
};
