import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { keyboardShortcutTable } from "@/main/db/schema.js";
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
        .where(isNull(keyboardShortcutTable.projectId));

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
      const activeProjectId = projectId ?? (await getActiveProject());

      const result = (
        await db
          .select()
          .from(keyboardShortcutTable)
          .where(
            activeProjectId
              ? and(
                  eq(keyboardShortcutTable.id, id),
                  eq(keyboardShortcutTable.projectId, activeProjectId),
                )
              : and(
                  eq(keyboardShortcutTable.id, id),
                  isNull(keyboardShortcutTable.projectId),
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
  async ({ id, projectId, key, ...payload }) => {
    if (!("projectId" in payload)) payload["projectId"] = null;
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
                isNull(keyboardShortcutTable.projectId),
              ),
            )
            .limit(1)
        )?.[0] ?? keyboardBindings[id];
      if (!defaultPayload) throw new Error();

      const insertPayload = {
        ...defaultPayload,
        ...payload,
        key: keyList ?? defaultPayload["key"],
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
    projectId = projectId ?? null;

    try {
      const defaultPayload =
        (
          await db
            .select()
            .from(keyboardShortcutTable)
            .where(
              and(
                eq(keyboardShortcutTable.id, id),
                isNull(keyboardShortcutTable.projectId),
              ),
            )
            .limit(1)
        )?.[0] ?? keyboardBindings[id];

      if (!defaultPayload) throw new Error();

      /* replacing key with default keybinding */
      const newKeyList = JSON.stringify(keyboardBindings[id].key);

      const insertPayload = {
        ...defaultPayload,
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
        key: JSON.parse(result.key) as TShortcutKey,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
