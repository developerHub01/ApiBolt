import { db } from "../db/index.js";

export const runInTransaction = async (fn) => {
  return await db.transaction(async (tx) => {
    // backup original functions
    const originalSelect = db.select;
    const originalInsert = db.insert;
    const originalUpdate = db.update;
    const originalDelete = db.delete;

    try {
      // redirect all db calls to tx
      db.select = (...args) => tx.select(...args);
      db.insert = (...args) => tx.insert(...args);
      db.update = (...args) => tx.update(...args);
      db.delete = (...args) => tx.delete(...args);

      const result = await fn();

      return result;
    } finally {
      // restore original db functions
      db.select = originalSelect;
      db.insert = originalInsert;
      db.update = originalUpdate;
      db.delete = originalDelete;
    }
  });
};
