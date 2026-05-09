import { httpStatus } from "@/data/http_status_details";
import { db } from "@/main/db/index";
import { httpStatusTable } from "@/main/db/schema";

export const generateHttpStatusSeed = async () => {
  try {
    const payload = Object.keys(httpStatus).map(code => ({
      code: code,
      reason: httpStatus[code].reason,
      description: httpStatus[code].description,
    }));

    await db.insert(httpStatusTable).values(payload).onConflictDoNothing();
  } catch (error) {
    console.error("❌ Error seeding HTTP status codes:", error);
  }
};
