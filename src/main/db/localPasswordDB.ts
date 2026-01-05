import { eq, } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { LOCAL_PASSWORD_ID, localPasswordTable } from "@/main/db/schema.js";
import { ElectronAPILocalPasswordInterface } from "@shared/types/api/electron-local-password";

export const getLocalPassword: ElectronAPILocalPasswordInterface["getLocalPassword"] =
  async () => {
    try {
      return (
        await db
          .select()
          .from(localPasswordTable)
          .where(eq(localPasswordTable.id, LOCAL_PASSWORD_ID))
          .limit(1)
      )?.[0]?.password ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const changeLocalPassword: ElectronAPILocalPasswordInterface["changeLocalPassword"] =
  async (payload = null) => {
    try {
      return (await db.insert(localPasswordTable).values({
        id: LOCAL_PASSWORD_ID,
        password: payload
      }).onConflictDoUpdate({
        target: [localPasswordTable.id],
        set: {
          password: payload
        }
      }))?.rowsAffected > 0
    } catch (error) {
      console.error(error);
      return false;
    }
  };
