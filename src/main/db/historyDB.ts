import { asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { historyTable } from "@/main/db/schema.js";
import { ElectronAPIHistoryInterface } from "@shared/types/api/electron-history";
import {
  HistoryItemInterface,
  HistoryItemMetaInterface,
} from "@shared/types/history.types";

/* max limit of history track for a request */
const MAX_LIMIT_OF_HISTORY_PER_REQUEST = 30;
const TOTAL_MAX_HISTORY_ROWS = 500;

export const getHistoryById: ElectronAPIHistoryInterface["getHistoryById"] =
  async id => {
    try {
      const response = (
        await db
          .select()
          .from(historyTable)
          .where(eq(historyTable.id, id))
          .limit(1)
      )?.[0];

      return {
        ...response,
        params: response.params ? JSON.parse(response.params) : response.params,
        pathParams: response.pathParams
          ? JSON.parse(response.pathParams)
          : response.pathParams,
        headers: response.headers
          ? JSON.parse(response.headers)
          : response.headers,
        authorization: response.authorization
          ? JSON.parse(response.authorization)
          : response.authorization,
        body: response.body ? JSON.parse(response.body) : response.body,
        responseSize: response.responseSize
          ? JSON.parse(response.responseSize)
          : response.responseSize,
      } as HistoryItemInterface;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getHistoryByRequestId: ElectronAPIHistoryInterface["getHistoryByRequestId"] =
  async id => {
    try {
      if (!id) throw new Error();

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
      return [];
    }
  };

export const createHistory: ElectronAPIHistoryInterface["createHistory"] =
  async payload => {
    try {
      if (!payload.request) throw new Error();

      /* stringify all object type data */
      const keys = [
        "params",
        "pathParams",
        "headers",
        "authorization",
        "body",
        "responseSize",
      ];
      for (const key of keys) {
        if (payload[key]) payload[key] = JSON.stringify(payload[key]);
      }

      const result = (
        await db
          .insert(historyTable)
          .values(payload as typeof historyTable.$inferInsert)
          .returning()
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
      const totalRows = ((
        await db.select({ count: sql`count(*)` }).from(historyTable)
      )?.[0]?.count ?? 0) as number;

      if (totalRows > TOTAL_MAX_HISTORY_ROWS) {
        const oldRows = await db
          .select({ id: historyTable.id })
          .from(historyTable)
          .orderBy(asc(historyTable.createdAt))
          .limit(totalRows - TOTAL_MAX_HISTORY_ROWS);

        const idsToDelete = oldRows.map(r => r.id);

        if (idsToDelete.length) {
          haveTruncated = true;
          await db
            .delete(historyTable)
            .where(inArray(historyTable.id, idsToDelete));
        }
      }

      /* remove this request exiting history rows */
      const requestHistoryRows = ((
        await db
          .select({ count: sql`count(*)` })
          .from(historyTable)
          .where(eq(historyTable.request, payload.request))
      )?.[0]?.count ?? 0) as number;

      if (requestHistoryRows > MAX_LIMIT_OF_HISTORY_PER_REQUEST) {
        const oldRows = await db
          .select({ id: historyTable.id })
          .from(historyTable)
          .orderBy(asc(historyTable.createdAt))
          .limit(requestHistoryRows - MAX_LIMIT_OF_HISTORY_PER_REQUEST);

        const idsToDelete = oldRows.map(r => r.id);

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

      return filteredResult as HistoryItemMetaInterface;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const deleteHistoryById: ElectronAPIHistoryInterface["deleteHistoryById"] =
  async id => {
    try {
      return (
        (await db.delete(historyTable).where(eq(historyTable.id, id)))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteHistoryByRequestId: ElectronAPIHistoryInterface["deleteHistoryByRequestId"] =
  async request => {
    try {
      return (
        (await db.delete(historyTable).where(eq(historyTable.request, request)))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
