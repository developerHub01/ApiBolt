import PouchDB from "pouchdb";
export const openFolderDB = new PouchDB("openFolder");

export const toggleFolder = async (_, id) => {
  if (!id) return;

  try {
    const folderData = await openFolderDB.get(id);

    if (folderData) await openFolderDB.remove(folderData);
    else await openFolderDB.put({ _id: id });
  } catch (error) {
    if (error.status === 404) await openFolderDB.put({ _id: id });
  }
};

/**
 * key as id and value rest of the
 * **/
export const getAllOpenFolder = async () => {
  try {
    return (
      await openFolderDB.allDocs({
        include_docs: true,
      })
    )?.rows.map((folder) => folder.id);
  } catch (error) {
    console.log(error);
  }
};
