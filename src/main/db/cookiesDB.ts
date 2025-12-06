import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { cookiesTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { ElectronAPICookiesInterface } from "@shared/types/api/electron-cookies";
import { ToughCookieSerializedInterface } from "@/main/types";
import { CookieJar, SerializedCookieJar } from "tough-cookie";

export const getCookiesByProject: ElectronAPICookiesInterface["getCookiesByProject"] =
  async projectId => {
    try {
      projectId = projectId ?? (await getActiveProject());
      if (!projectId) throw new Error();

      let cookiesList = (
        await db
          .select()
          .from(cookiesTable)
          .where(eq(cookiesTable.projectId, projectId))
          .limit(1)
      )?.[0]?.cookies;
      if (!cookiesList) return null;

      try {
        const parsed = JSON.parse(
          cookiesList,
        ) as ToughCookieSerializedInterface;

        /* fallback to raw if structure invalid */
        if (!parsed.cookies || !Array.isArray(parsed.cookies))
          return cookiesList;

        const beforeCount = parsed.cookies.length;

        /* remove expired cookies */
        parsed.cookies = parsed.cookies.filter(
          entry =>
            !entry.expires || new Date(entry.expires).getTime() > Date.now(),
        );

        if (parsed.cookies.length !== beforeCount) {
          cookiesList = JSON.stringify(parsed);

          await db
            .update(cookiesTable)
            .set({
              cookies: cookiesList,
            })
            .where(eq(cookiesTable.projectId, projectId));
        }

        return cookiesList;
      } catch (error) {
        console.error("Error parsing cookies JSON:", error);
        return cookiesList;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getParsedCookiesByProject: ElectronAPICookiesInterface["getParsedCookiesByProject"] =
  async projectId => {
    try {
      const cookies = await getCookiesByProject(projectId);
      if (!cookies) return [];

      return (
        (JSON.parse(cookies) as ToughCookieSerializedInterface)?.cookies ?? []
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const createCookiesByProject: ElectronAPICookiesInterface["createCookiesByProject"] =
  async ({ projectId }) => {
    try {
      projectId = projectId ?? (await getActiveProject());
      if (!projectId) throw new Error();

      return (
        (
          await db.insert(cookiesTable).values({
            projectId,
          })
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const replaceCookiesByProject = async (
  payload: SerializedCookieJar | null,
  projectId?: string | null,
) => {
  try {
    projectId = projectId ?? (await getActiveProject());
    if (!projectId) throw new Error();
    const cookies = payload ? JSON.stringify(payload) : payload;

    return (
      (
        await db
          .insert(cookiesTable)
          .values({
            cookies,
            projectId,
          })
          .onConflictDoUpdate({
            target: [cookiesTable.projectId],
            set: {
              cookies,
            },
          })
      )?.rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCookiesByProject: ElectronAPICookiesInterface["updateCookiesByProject"] =
  async payload => {
    try {
      const projectId = payload.projectId ?? (await getActiveProject());
      if (!projectId) throw new Error();
      const cookiesJSON = new CookieJar().toJSON();
      if (!cookiesJSON) throw new Error();
      cookiesJSON.cookies = payload.cookies as SerializedCookieJar["cookies"];

      return replaceCookiesByProject(cookiesJSON, projectId);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteCookiesByProject: ElectronAPICookiesInterface["deleteCookiesByProject"] =
  async projectId => {
    try {
      projectId = projectId ?? (await getActiveProject());
      if (!projectId) throw new Error();

      return (
        (
          await db
            .delete(cookiesTable)
            .where(eq(cookiesTable.projectId, projectId))
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteCookieKeyByProject: ElectronAPICookiesInterface["deleteCookieKeyByProject"] =
  async ({ projectId, key }) => {
    try {
      if (!key) throw new Error();
      projectId = projectId ?? (await getActiveProject());
      if (!projectId) throw new Error();

      let cookieJSON = new CookieJar().toJSON();

      const existingData = (
        await db
          .select()
          .from(cookiesTable)
          .where(eq(cookiesTable.projectId, projectId))
          .limit(1)
      )?.[0]?.cookies;

      try {
        if (!existingData) throw new Error();
        cookieJSON = JSON.parse(existingData) as SerializedCookieJar;
      } catch (error) {
        console.error(error);
      }

      /* that will never reach but still for safe mode. even if undefiend means no need to clear anything and show success response */
      if (!cookieJSON) return true;

      cookieJSON.cookies = cookieJSON.cookies.filter(
        entry => entry.key !== key,
      );

      const cookies = JSON.stringify(cookieJSON);

      return (
        (
          await db
            .insert(cookiesTable)
            .values({
              cookies,
              projectId,
            })
            .onConflictDoUpdate({
              target: [cookiesTable.projectId],
              set: {
                cookies,
              },
            })
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const clearCookiesByProject: ElectronAPICookiesInterface["clearCookiesByProject"] =
  async projectId => {
    try {
      projectId = projectId ?? (await getActiveProject());
      if (!projectId) return false;

      const cookiesJSON = new CookieJar().toJSON();
      if (!cookiesJSON) throw new Error();
      const cookies = JSON.stringify(cookiesJSON);

      return (
        (
          await db
            .insert(cookiesTable)
            .values({
              cookies,
              projectId,
            })
            .onConflictDoUpdate({
              target: [cookiesTable.projectId],
              set: {
                cookies,
              },
            })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
