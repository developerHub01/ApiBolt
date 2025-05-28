import { type StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { TMethod } from "@/types";
import { isElectron } from "@/utils/electron";

export interface RequestListItemInterface {
  id: string;
  name: string;
  method?: TMethod;
  children?: Array<string>;
  parent?: string;
}

export interface RequestListSliceInterface {
  requestList: Record<string, RequestListItemInterface>;
  deleteFolderOrRequestId: string;
  openFolderList: Set<string>;

  handleGetRequestOrFolderDetails: (id: string) => RequestListItemInterface;
  createSingleRequest: (parent?: string) => Promise<void>;
  createCollection: (parent?: string) => Promise<void>;
  createRestApiBasic: () => Promise<void>;
  duplicateBoltCore: (id: string) => Promise<void>;
  handleChangeDeleteFolderOrRequestId: (value: string) => void;
  handleDeleteFolderOrRequest: (value: boolean) => Promise<void>;
  handleToggleOpenFolder: (id: string) => void;
  handleIsFolderOpen: (id: string) => boolean;
  handleMoveRequest: (
    requestId: string,
    folderId: string | undefined,
    index?: number
  ) => Promise<void>;
  handleLoadList: () => Promise<void>;
  handleLoadOpenFolderList: () => Promise<void>;
}

export const createRequestListSlice: StateCreator<
  RequestListSliceInterface,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  RequestListSliceInterface
> = (set, get) => ({
  requestList: {},
  deleteFolderOrRequestId: "" /* helper state */,
  openFolderList: new Set([]),

  handleGetRequestOrFolderDetails: (id) => get().requestList[id],

  handleChangeDeleteFolderOrRequestId: (value) =>
    set({ deleteFolderOrRequestId: value }),

  handleDeleteFolderOrRequest: async (confirm) => {
    if (confirm && isElectron()) {
      await window.electronAPIDB.deleteBoltCore(get().deleteFolderOrRequestId);
    }
    set({ deleteFolderOrRequestId: "" });
  },

  createSingleRequest: async (parent) => {
    const payload: RequestListItemInterface = {
      id: uuidv4(),
      name: "Request",
      method: "get",
      ...(parent ? { parent } : {}),
    };
    await window.electronAPIDB.addBoltCore(payload);

    // set((state) => {
    //   console.log({
    //     ...state.requestList,
    //     [payload.id]: payload,
    //   });
    //   return {
    //     requestList: {
    //       ...state.requestList,
    //       [payload.id]: payload,
    //     },
    //   };
    // });
  },

  createCollection: async (parent) => {
    const payload: RequestListItemInterface = {
      id: uuidv4(),
      name: parent ? "Folder" : "Collection",
      children: [],
      ...(parent ? { parent } : {}),
    };
    await window.electronAPIDB.addBoltCore(payload);
  },

  createRestApiBasic: async () => {
    const parentFolder: RequestListItemInterface = {
      id: uuidv4(),
      name: "REST API basics: CRUD, test & variable",
      children: [],
    };

    const payload = ["get", "post", "put", "patch", "delete"].map((method) => ({
      id: uuidv4(),
      name: `${method.charAt(0).toUpperCase() + method.slice(1)} data`,
      method: method as TMethod,
    }));

    parentFolder.children = payload.map((item) => item.id);

    await window.electronAPIDB.addMultipleBoltCore([
      parentFolder,
      ...payload.map((item) => ({ ...item, parent: parentFolder.id })),
    ]);
  },

  duplicateBoltCore: async (id) => {
    await window.electronAPIDB.duplicateBoltCore(id);
  },

  handleToggleOpenFolder: async (id) => {
    const currentSet = new Set(get().openFolderList);
    if (currentSet.has(id)) currentSet.delete(id);
    else currentSet.add(id);
    set({ openFolderList: currentSet });

    await window.electronAPIDB.toggleFolder(id);
  },

  handleIsFolderOpen: (id) => get().openFolderList.has(id),

  handleMoveRequest: async (requestId, folderId, index = 0) => {
    await window.electronAPIDB.moveBoltCore(requestId, folderId, index);
  },

  handleLoadList: async () => {
    const data = await window.electronAPIDB.getAllBoltCore();
    console.log({ data });
    set({ requestList: data });
  },

  handleLoadOpenFolderList: async () => {
    const openList = await window.electronAPIDB.getAllOpenFolder();
    set({ openFolderList: new Set(openList ?? []) });
  },
});
