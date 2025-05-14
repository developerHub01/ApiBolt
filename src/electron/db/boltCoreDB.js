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
export const addBoltCore = async (_, payload) => {
  if (typeof payload !== "object") return;

  await boltcoreDB.put({
    ...payload,
  });

  console.log(JSON.stringify(await getAllBoltCore(), null, 2));
};

export const getAllBoltCore = async () => {
  return await boltcoreDB.allDocs({
    include_docs: true,
  });
};
