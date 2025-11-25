import { asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "./index.js";
import { historyTable } from "./schema.js";

/* max limit of history track for a request */
const MAX_LIMIT_OF_HISTORY_PER_REQUEST = 30;
const TOTAL_MAX_HISTORY_ROWS = 500;

export const getHistoryById = async (id) => {
  try {
    if (!id) return null;

    const response = (
      await db
        .select()
        .from(historyTable)
        .where(eq(historyTable.id, id))
        .limit(1)
    )?.[0];

    const keys = ["params", "headers", "authorization", "body", "responseSize"];
    for (const key of keys) {
      if (response[key]) response[key] = JSON.parse(response[key]);
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getHistoryByRequestId = async (id) => {
  try {
    if (!id) return null;

    const response = await db
      .select({
        id: historyTable.id,
        request: historyTable.request,
        method: historyTable.method,
        responseStatus: historyTable.responseStatus,
        createdAt: historyTable.createdAt,
      })
      .from(historyTable)
      .where(eq(historyTable.request, id))
      .orderBy(desc(historyTable.createdAt))
      .limit(MAX_LIMIT_OF_HISTORY_PER_REQUEST);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createHistory = async (payload = {}) => {
  try {
    if (!payload.request) return false;

    /* stringify all object type data */
    const keys = ["params", "headers", "authorization", "body", "responseSize"];
    for (const key of keys) {
      if (payload[key]) payload[key] = JSON.stringify(payload[key]);
    }

    const result = (
      await db.insert(historyTable).values(payload).returning()
    )?.[0];

    /* filtering to get returning meta data */
    let filteredResult = {};
    const resultKeys = ["id", "method", "responseStatus", "createdAt"];
    for (const key of resultKeys) {
      if (result[key]) filteredResult[key] = result[key];
    }

    if (!result) return null;

    let haveTruncated = false;

    /* removing total exiting rows */
    const totalRows = (
      await db.select({ count: sql`count(*)` }).from(historyTable)
    )?.[0]?.count;

    if (totalRows > TOTAL_MAX_HISTORY_ROWS) {
      const oldRows = await db
        .select({ id: historyTable.id })
        .from(historyTable)
        .orderBy(asc(historyTable.createdAt))
        .limit(totalRows - TOTAL_MAX_HISTORY_ROWS);

      const idsToDelete = oldRows.map((r) => r.id);

      if (idsToDelete.length) {
        haveTruncated = true;
        await db
          .delete(historyTable)
          .where(inArray(historyTable.id, idsToDelete));
      }
    }

    /* remove this request exiting history rows */
    const requestHistoryRows = (
      await db
        .select({ count: sql`count(*)` })
        .from(historyTable)
        .where(eq(historyTable.request, payload.request))
    )?.[0]?.count;

    if (requestHistoryRows > MAX_LIMIT_OF_HISTORY_PER_REQUEST) {
      const oldRows = await db
        .select({ id: historyTable.id })
        .from(historyTable)
        .orderBy(asc(historyTable.createdAt))
        .limit(requestHistoryRows - MAX_LIMIT_OF_HISTORY_PER_REQUEST);

      const idsToDelete = oldRows.map((r) => r.id);

      if (idsToDelete.length) {
        haveTruncated = true;
        await db
          .delete(historyTable)
          .where(inArray(historyTable.id, idsToDelete));
      }
    }

    if (haveTruncated) {
      filteredResult = await db
        .select({
          id: historyTable.id,
          method: historyTable.method,
          responseStatus: historyTable.responseStatus,
          createdAt: historyTable.createdAt,
        })
        .from(historyTable)
        .where(eq(historyTable.request, payload.request))
        .orderBy(desc(historyTable.createdAt))
        .limit(MAX_LIMIT_OF_HISTORY_PER_REQUEST);
    }

    return filteredResult;
  } catch (error) {
    console.error(error);
  }
};

export const deleteHistoryById = async (id) => {
  try {
    if (!id) return false;

    const result = await db.delete(historyTable).where(eq(historyTable.id, id));

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteHistoryByRequestId = async (request) => {
  try {
    if (!request) return false;

    const result = await db
      .delete(historyTable)
      .where(eq(historyTable.request, request));

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
