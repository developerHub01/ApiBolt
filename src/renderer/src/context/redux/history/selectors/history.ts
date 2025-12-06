import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { formatCreatedAt } from "@/utils/history";

export const selectSelectedFilterMethod = createSelector(
  [
    (state: RootState) =>
      state.history.selectedFilterMethod[
        state.requestResponse.selectedTab ?? ""
      ],
  ],
  method => method ?? "all",
);

export const selectHistoryMetaList = createSelector(
  [(state: RootState) => state.history.meta],
  metaList =>
    (metaList ?? [])?.map(meta => {
      const data = { ...meta };

      if (data.createdAt) data.createdAt = formatCreatedAt(data.createdAt);

      return data;
    }),
);

export const selectHistoryMeta = createSelector(
  [
    (state: RootState) =>
      state.history.meta?.find(
        item => item.id === state.history.openedHistory?.id,
      ),
  ],
  meta => {
    if (!meta) return null;
    const data = { ...meta };
    if (data.createdAt) data.createdAt = formatCreatedAt(data.createdAt);

    return data;
  },
);

export const selectHistoryMetaCount = createSelector(
  [(state: RootState) => state.history.meta?.length],
  count => count ?? 0,
);

export const selectIsHistoryMetaHave = createSelector(
  [(state: RootState) => Boolean(state.history.meta)],
  have => have,
);

export const selectOpenedHistory = createSelector(
  [(state: RootState) => state.history.openedHistory],
  opened => opened,
);

export const selectIsHistoryItemOpen = createSelector(
  [(state: RootState) => state.history.openedHistory],
  opened => Boolean(opened?.id && opened?.requestId),
);

export const selectHistoryItemOpenId = createSelector(
  [(state: RootState) => state.history.openedHistory?.id],
  id => id ?? null,
);

export const selectHistoryDetails = createSelector(
  [(state: RootState) => state.history.historyDetails],
  details => {
    const data = { ...(details ?? {}) };

    if (data.createdAt) data.createdAt = formatCreatedAt(data.createdAt);

    return data;
  },
);
