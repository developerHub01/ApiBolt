import PouchDB from "pouchdb";
export const boltcoreDB = new PouchDB("boltcore");

/**
 * params {
 *  id: string
 *  name: string
 *  method?: string
 *  children?: [string] // if children have then it is a folder
 *  parent?: string // if parent dont have then root level
 * }
 *
 * **/
export const addBoltCore = async (event, payload) => {
  if (typeof payload !== "object") return;

  try {
    const result = await boltcoreDB.put({
      ...payload,
    });

    if (result.ok && payload.parent) {
      const parentId = payload.parent;
      const parentData = await boltcoreDB.get(parentId);
      parentData.children?.push(payload._id);
      await updateBoltCore(event, parentId, parentData);
    }
  } catch (error) {
    console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const addMultipleBoltCore = async (event, payload) => {
  if (typeof payload !== "object") return;

  try {
    await boltcoreDB.bulkDocs(payload);
  } catch (error) {
    console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const updateBoltCore = async (event, id, payload) => {
  if (typeof payload !== "object") return;

  try {
    const oldData = await boltcoreDB.get(id);

    await boltcoreDB.put({
      ...oldData,
      ...payload,
    });
  } catch (error) {
    console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const deleteBoltCore = async (event, id) => {
  const deleteCandidateList = await getNestedChildList(id);

  try {
    const response = await boltcoreDB.bulkDocs(deleteCandidateList);
    console.log({ response });
  } catch (error) {
    console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

/**
 * key as id and value rest of the
 * **/
export const getAllBoltCore = async () => {
  return (
    await boltcoreDB.allDocs({
      include_docs: true,
    })
  ).rows.reduce((acc, curr) => {
    acc[curr.id] = {
      ...curr.doc,
      id: curr.doc._id,
    };
    delete acc[curr.id]._id;
    return acc;
  }, {});
};

export const boltCoreHaveChange = (event) =>
  event.sender.send("boltCoreChange");

const getNestedChildList = async (id, list = []) => {
  try {
    const requestData = await boltcoreDB.get(id);
    if (!requestData) return list;

    list.push({
      _id: requestData._id,
      _rev: requestData._rev,
      _deleted: true,
    });

    if (!requestData.children || !Array.isArray(requestData.children))
      return list;

    for (const child of requestData.children) {
      await getNestedChildList(child, list);
    }
  } catch (error) {
    console.log(error);
  } finally {
    return list;
  }
};
