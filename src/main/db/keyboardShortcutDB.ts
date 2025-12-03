import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { keyboardShortcutTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { keyboardBindings } from "@/data/keyboard_short_cut_list.js";

/* id === projectId */
export const getKeyboardShortcuts = async () => {
  const activeProjectId = await getActiveProject();
  try {
    let globalShortCuts = await db
      .select()
      .from(keyboardShortcutTable)
      .where(isNull(keyboardShortcutTable.projectId));

    let localShortCuts = activeProjectId
      ? await db
          .select()
          .from(keyboardShortcutTable)
          .where(eq(keyboardShortcutTable.projectId, activeProjectId))
      : [];

    globalShortCuts = (globalShortCuts ?? []).reduce((acc, curr) => {
      acc[curr.id] = {
        ...curr,
        key: curr.key ? JSON.parse(curr.key) : curr.key,
      };
      return acc;
    }, {});

    localShortCuts = (localShortCuts ?? []).reduce((acc, curr) => {
      acc[curr.id] = {
        ...curr,
        key: curr.key ? JSON.parse(curr.key) : curr.key,
      };
      return acc;
    }, {});

    return {
      global: globalShortCuts,
      local: localShortCuts,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getKeyboardShortcutsById = async ({ id, projectId } = {}) => {
  try {
    const activeProjectId = projectId ?? (await getActiveProject());

    const result = (
      await db
        .select()
        .from(keyboardShortcutTable)
        .where(
          activeProjectId
            ? and(
                eq(keyboardShortcutTable.id, id),
                eq(keyboardShortcutTable.projectId, activeProjectId)
              )
            : and(
                eq(keyboardShortcutTable.id, id),
                isNull(keyboardShortcutTable.projectId)
              )
        )
        .limit(1)
    )?.[0];

    if (result.key) result.key = JSON.parse(result.key);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateKeyboardShortcuts = async (payload) => {
  if (!payload || typeof payload !== "object" || !("id" in payload))
    return false;

  if (!("projectId" in payload)) payload["projectId"] = null;
  if (payload["key"]) payload["key"] = JSON.stringify(payload["key"]);

  try {
    const defaultPayload =
      (
        await db
          .select()
          .from(keyboardShortcutTable)
          .where(
            and(
              eq(keyboardShortcutTable.id, payload.id),
              isNull(keyboardShortcutTable.projectId)
            )
          )
          .limit(0)
      )?.[0] ?? keyboardBindings[payload.id];

    if (!defaultPayload) return false;

    payload = {
      ...defaultPayload,
      ...payload,
    };

    const { id, projectId, ...upsertPayload } = payload;

    const result = await db
      .insert(keyboardShortcutTable)
      .values({
        ...payload,
      })
      .onConflictDoUpdate({
        target: [keyboardShortcutTable.id, keyboardShortcutTable.projectId],
        set: {
          ...upsertPayload,
        },
      });

    return Boolean(result?.rowsAffected > 0);
  } catch (error) {
    console.error(error);
  }
};

export const resetKeyboardShortcuts = async (payload) => {
  if (!payload || typeof payload !== "object" || !("id" in payload))
    return false;

  if (!("projectId" in payload)) payload["projectId"] = null;

  try {
    const defaultPayload =
      (
        await db
          .select()
          .from(keyboardShortcutTable)
          .where(
            and(
              eq(keyboardShortcutTable.id, payload.id),
              isNull(keyboardShortcutTable.projectId)
            )
          )
          .limit(0)
      )?.[0] ?? keyboardBindings[payload.id];

    if (!defaultPayload) return false;

    /* replacing key with default keybinding */
    let newKeyList = keyboardBindings[payload.id].key;
    if (newKeyList) newKeyList = JSON.stringify(newKeyList);
    payload = {
      ...defaultPayload,
      ...payload,
      key: newKeyList,
    };

    const { id, projectId, ...upsertPayload } = payload;

    const result = (
      await db
        .insert(keyboardShortcutTable)
        .values({
          ...payload,
        })
        .onConflictDoUpdate({
          target: [keyboardShortcutTable.id, keyboardShortcutTable.projectId],
          set: {
            ...upsertPayload,
          },
        })
        .returning()
    )?.[0];

    if (!result || typeof result !== "object") return null;
    if (result.key) result.key = JSON.parse(result.key);

    return result;
  } catch (error) {
    console.error(error);
  }
};
