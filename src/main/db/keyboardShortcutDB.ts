import { and, eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { GLOBAL_PROJECT_ID, keyboardShortcutTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { keyboardBindings } from "@/data/keyboard_short_cut_list.js";
import { ElectronAPIKeyboardShortcutInterface } from "@shared/types/api/electron-keyboard-shortcuts";
import {
  KeybaordShortCutInterface,
  TShortcutKey,
} from "@shared/types/keyboard-shortcut.types";

/* id === projectId */
export const getKeyboardShortcuts: ElectronAPIKeyboardShortcutInterface["getKeyboardShortcuts"] =
  async projectId => {
    projectId = projectId ?? (await getActiveProject());
    try {
      const globalShortCuts = await db
        .select()
        .from(keyboardShortcutTable)
        .where(eq(keyboardShortcutTable.projectId, GLOBAL_PROJECT_ID));

      const localShortCuts = projectId
        ? await db
            .select()
            .from(keyboardShortcutTable)
            .where(eq(keyboardShortcutTable.projectId, projectId))
        : [];

      const globalKeyMap: Record<string, KeybaordShortCutInterface> = (
        globalShortCuts ?? []
      ).reduce((acc, curr) => {
        acc[curr.id] = {
          ...curr,
          key: (curr.key
            ? JSON.parse(curr.key)
            : curr.key) as KeybaordShortCutInterface["key"],
        };
        return acc;
      }, {});

      const localKeyMap: Record<string, KeybaordShortCutInterface> = (
        localShortCuts ?? []
      ).reduce(
        (acc, curr) => {
          acc[curr.id] = {
            ...curr,
            key: (curr.key
              ? JSON.parse(curr.key)
              : curr.key) as KeybaordShortCutInterface["key"],
          };
          return acc;
        },
        {} as Record<string, KeybaordShortCutInterface>,
      );

      return {
        global: globalKeyMap,
        local: localKeyMap,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getKeyboardShortcutsById: ElectronAPIKeyboardShortcutInterface["getKeyboardShortcutsById"] =
  async ({ id, projectId }) => {
    try {
      const activeProjectId =
        projectId ?? (await getActiveProject()) ?? GLOBAL_PROJECT_ID;

      const result = (
        await db
          .select()
          .from(keyboardShortcutTable)
          .where(
            and(
              eq(keyboardShortcutTable.id, id),
              eq(keyboardShortcutTable.projectId, activeProjectId),
            ),
          )
          .limit(1)
      )?.[0];

      const key = JSON.parse(result.key) as TShortcutKey;

      return {
        ...result,
        key,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const updateKeyboardShortcuts: ElectronAPIKeyboardShortcutInterface["updateKeyboardShortcuts"] =
  async ({ id, key, projectId, ...payload }) => {
    if (!projectId) projectId = GLOBAL_PROJECT_ID;
    const keyList = key ? JSON.stringify(key) : undefined;

    try {
      const defaultPayload =
        (
          await db
            .select()
            .from(keyboardShortcutTable)
            .where(
              and(
                eq(keyboardShortcutTable.id, id),
                eq(keyboardShortcutTable.projectId, GLOBAL_PROJECT_ID),
              ),
            )
            .limit(1)
        )?.[0] ?? keyboardBindings[id];
      if (!defaultPayload) throw new Error();

      const insertPayload = {
        ...defaultPayload,
        ...payload,
        key: keyList ?? defaultPayload["key"],
        projectId,
      };

      const result = await db
        .insert(keyboardShortcutTable)
        .values({
          ...insertPayload,
        })
        .onConflictDoUpdate({
          target: [keyboardShortcutTable.id, keyboardShortcutTable.projectId],
          set: {
            ...payload,
            key: keyList,
          },
        });

      return Boolean(result?.rowsAffected > 0);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const resetKeyboardShortcuts: ElectronAPIKeyboardShortcutInterface["resetKeyboardShortcuts"] =
  async ({ id, projectId }) => {
    projectId = projectId ?? GLOBAL_PROJECT_ID;

    try {
      const defaultPayload =
        (
          await db
            .select()
            .from(keyboardShortcutTable)
            .where(
              and(
                eq(keyboardShortcutTable.id, id),
                eq(keyboardShortcutTable.projectId, GLOBAL_PROJECT_ID),
              ),
            )
            .limit(1)
        )?.[0] ?? keyboardBindings[id];

      if (!defaultPayload) throw new Error();

      /* replacing key with default keybinding */
      const newKeyList = JSON.stringify(keyboardBindings[id].key);

      const insertPayload = {
        ...defaultPayload,
        projectId,
        key: newKeyList,
      };
      const { id: _, projectId: __, ...updatePayload } = insertPayload;

      const result = (
        await db
          .insert(keyboardShortcutTable)
          .values({
            ...insertPayload,
          })
          .onConflictDoUpdate({
            target: [keyboardShortcutTable.id, keyboardShortcutTable.projectId],
            set: {
              ...updatePayload,
            },
          })
          .returning()
      )?.[0];

      return {
        ...result,
        projectId:
          result.projectId === GLOBAL_PROJECT_ID ? null : result.projectId,
        key: JSON.parse(result.key) as TShortcutKey,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const inheritGlobalKeyboardShortcuts: ElectronAPIKeyboardShortcutInterface["inheritGlobalKeyboardShortcuts"] =
  async ({ id, projectId }) => {
    try {
      if (!id || !projectId) throw new Error();

      await db
        .delete(keyboardShortcutTable)
        .where(
          and(
            eq(keyboardShortcutTable.id, id),
            eq(keyboardShortcutTable.projectId, projectId),
          ),
        );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
