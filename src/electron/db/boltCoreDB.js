import { v4 as uuidv4 } from "uuid";
import PouchDB from "pouchdb";
export const boltcoreDB = new PouchDB("boltCore");

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

export const duplicateBoltCore = async (event, id) => {
  if (!id) return;

  try {
    const node = await boltcoreDB.get(id);
    console.log({ node });
    await duplicateRequestOrFolder({ id, parent: node?.parent });
  } catch (error) {
    console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const deleteBoltCore = async (event, id) => {
  const deleteCandidateList = await getNestedChildList(id);

  try {
    await boltcoreDB.bulkDocs(deleteCandidateList);
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

const duplicateRequestOrFolder = async ({ id, parent, lavel = 0 }) => {
  try {
    const node = await boltcoreDB.get(id);

    console.log("=====before node=======");
    console.log(node);

    if (node) {
      const duplicatedId = uuidv4();
      node._id = duplicatedId;
      node.parent = parent;
      delete node._rev;

      console.log("=====after node=======");
      console.log(node);

      await boltcoreDB.put({
        ...node,
      });

      const children = node.children ?? [];

      if (parent) {
        const parentNode = await boltcoreDB.get(parent);

        console.log({ parentNode });

        const parentNodeChildren = parentNode?.children ?? [];

        console.log({ parentNodeChildren, lavel });
        console.log([...parentNodeChildren, duplicatedId]);

        if (Array.isArray(parentNodeChildren)) {
          if (!lavel) {
            await boltcoreDB.put({
              ...parentNode,
              children: [...parentNodeChildren, duplicatedId],
            });
          } else {
            const index = parentNodeChildren.findIndex(
              (childId) => childId === id
            );
            console.log({ index });
            if (index >= 0) {
              parentNodeChildren[index] = duplicatedId;
              await boltcoreDB.put({
                ...parentNode,
                children: parentNodeChildren,
              });
            }
          }
        }
      }

      if (Array.isArray(children)) {
        for (const child of children) {
          await duplicateRequestOrFolder({
            id: child,
            parentId: duplicatedId,
            lavel: lavel + 1,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
