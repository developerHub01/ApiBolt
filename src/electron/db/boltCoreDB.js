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
    // console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const addMultipleBoltCore = async (event, payload) => {
  if (typeof payload !== "object") return;

  try {
    await boltcoreDB.bulkDocs(payload);
  } catch (error) {
    // console.log(error);
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
    // console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const duplicateBoltCore = async (event, id) => {
  if (!id) return;

  try {
    const node = await boltcoreDB.get(id);

    await duplicateRequestOrFolder({
      id,
      parent: node?.parent,
      newId: uuidv4(),
    });
  } catch (error) {
    // console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const deleteBoltCore = async (event, id) => {
  const deleteCandidateList = await getNestedChildList(id);

  try {
    await boltcoreDB.bulkDocs(deleteCandidateList);
  } catch (error) {
    // console.log(error);
  } finally {
    boltCoreHaveChange(event);
  }
};

export const moveBoltCore = async (event, id, folderId, index = 0) => {
  try {
    if (id === folderId) return;

    const currentData = await boltcoreDB.get(id);

    if (!currentData) return;

    /* remove id from its parent children */
    if (currentData?.parent) {
      const currentParentData = await boltcoreDB.get(currentData.parent);
      currentParentData.children = (currentParentData.children ?? []).filter(
        (item) => item !== id
      );
      await boltcoreDB.put({
        ...currentParentData,
      });
    }

    /* make id under given folderId */
    if (folderId) {
      await boltcoreDB.put({
        ...currentData,
        parent: folderId,
      });
    }

    const folderData = await boltcoreDB.get(folderId);

    const newFolderChildren = folderData.children ?? [];
    newFolderChildren.splice(index, 0, id);
    folderData.children = newFolderChildren;

    /* add id into parent children nth index */
    if (folderData) {
      await boltcoreDB.put({
        ...folderData,
      });
    }
  } catch (error) {
    // console.log(error);
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
    // console.log(error);
  } finally {
    return list;
  }
};

/**
 * Mainly we for each node we are making copy of its and copied id list of its children and passing them for each child id with its new id.
 * and in next traverse just making that new id node and if it have children then repeating same process again and again. Thats why in first call we passed a newId
 *
 * **/

const duplicateRequestOrFolder = async ({ id, parent, level = 0, newId }) => {
  try {
    const node = await boltcoreDB.get(id);
    if (node) {
      node._id = newId;
      node.parent = parent;
      delete node._rev;

      if (!level) node.name += " copy";

      const childrenList = node.children;
      const newChildrenList = Array.isArray(node.children)
        ? node.children.map(() => uuidv4())
        : [];

      await boltcoreDB.put({
        ...node,
        ...(Array.isArray(childrenList)
          ? {
              children: newChildrenList,
            }
          : {}),
      });

      if (parent) {
        const parentNode = await boltcoreDB.get(parent);
        const parentNodeChildren = parentNode?.children ?? [];

        if (parentNode && Array.isArray(parentNodeChildren) && !level) {
          await boltcoreDB.put({
            ...parentNode,
            children: [...parentNodeChildren, newId],
          });
        }
      }

      if (childrenList) {
        for (const [index, child] of childrenList.entries()) {
          await duplicateRequestOrFolder({
            id: child,
            newId: newChildrenList[index],
            parent: newId,
            level: level + 1,
          });
        }
      }
    }
  } catch (error) {
    // console.log(error);
  }
};
