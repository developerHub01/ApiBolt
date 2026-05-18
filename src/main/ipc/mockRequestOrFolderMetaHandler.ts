import { ipcMain } from "electron";
import { ElectronAPIMockRequestOrFolderMetaInterface } from "@shared/types/api/electron-mock-request-or-folder-meta";
import {
  collapseAllMockRequestOrFolderMeta,
  createMockRequestOrFolderMeta,
  deleteMockRequestOrFolderMetaAll,
  deleteMockRequestOrFolderMetaById,
  deleteMockRequestOrFolderMetaByProjectId,
  duplicateMockRequestOrFolderMeta,
  expendOrCollapseMockRequestOrFolderMetaAll,
  getMockRequestOrFolderMeta,
  getMockRequestOrFolderMetaById,
  moveMockRequestOrFolderMeta,
  updateMockRequestOrFolderMeta,
} from "@/main/db/mockRequestOrFolderMetaDB";

export const mockRequestOrFolderMetaHandler = (): void => {
  ipcMain.handle(
    "getMockRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["getMockRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["getMockRequestOrFolderMeta"]
      >
    > => await getMockRequestOrFolderMeta(...rest),
  );
  ipcMain.handle(
    "getMockRequestOrFolderMetaById",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["getMockRequestOrFolderMetaById"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["getMockRequestOrFolderMetaById"]
      >
    > => await getMockRequestOrFolderMetaById(...rest),
  );
  ipcMain.handle(
    "createMockRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["createMockRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["createMockRequestOrFolderMeta"]
      >
    > => await createMockRequestOrFolderMeta(...rest),
  );
  ipcMain.handle(
    "updateMockRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["updateMockRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["updateMockRequestOrFolderMeta"]
      >
    > => await updateMockRequestOrFolderMeta(...rest),
  );
  ipcMain.handle(
    "collapseAllMockRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["collapseAllMockRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["collapseAllMockRequestOrFolderMeta"]
      >
    > => await collapseAllMockRequestOrFolderMeta(...rest),
  );
  ipcMain.handle(
    "moveMockRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["moveMockRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["moveMockRequestOrFolderMeta"]
      >
    > => await moveMockRequestOrFolderMeta(...rest),
  );
  ipcMain.handle(
    "deleteMockRequestOrFolderMetaById",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaById"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaById"]
      >
    > => await deleteMockRequestOrFolderMetaById(...rest),
  );
  ipcMain.handle(
    "deleteMockRequestOrFolderMetaByProjectId",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaByProjectId"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaByProjectId"]
      >
    > => await deleteMockRequestOrFolderMetaByProjectId(...rest),
  );
  ipcMain.handle(
    "duplicateMockRequestOrFolderMeta",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["duplicateMockRequestOrFolderMeta"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["duplicateMockRequestOrFolderMeta"]
      >
    > => await duplicateMockRequestOrFolderMeta(...rest),
  );
  ipcMain.handle(
    "deleteMockRequestOrFolderMetaAll",
    async (): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaAll"]
      >
    > => await deleteMockRequestOrFolderMetaAll(),
  );
  ipcMain.handle(
    "expendOrCollapseMockRequestOrFolderMetaAll",
    async (
      _,
      ...rest: Parameters<
        ElectronAPIMockRequestOrFolderMetaInterface["expendOrCollapseMockRequestOrFolderMetaAll"]
      >
    ): Promise<
      ReturnType<
        ElectronAPIMockRequestOrFolderMetaInterface["expendOrCollapseMockRequestOrFolderMetaAll"]
      >
    > => await expendOrCollapseMockRequestOrFolderMetaAll(...rest),
  );
};
