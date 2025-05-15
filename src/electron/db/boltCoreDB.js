import PouchDB from "pouchdb";
export const boltcoreDB = new PouchDB("boltcore");

// boltcoreDB.put({
//   _id: "1",
//   name: "name1",
//   description: "desc1",
// });
// const docs = await boltcoreDB.allDocs({ include_docs: true });
// console.log(docs);

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

  await boltcoreDB.put({
    ...payload,
  });

  boltCoreHaveChange(event);
};

export const updateBoltCore = async (event, id, payload) => {
  console.log({ id, payload });
  if (typeof payload !== "object") return;

  const oldData = await boltcoreDB.get(id);

  await boltcoreDB.put({
    ...oldData,
    ...payload,
  });

  boltCoreHaveChange(event);
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
