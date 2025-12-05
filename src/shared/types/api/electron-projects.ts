import { ElectronResponseInterface } from "@shared/types";
import {
  CreateProjectPayloadInterface,
  ProjectInterface
} from "@shared/types/project.types";

export interface ElectronAPIProjectsInterface {
  getProjects(): Promise<Array<ProjectInterface>>;
  createProjects(payload: CreateProjectPayloadInterface): Promise<boolean>;
  updateProjects(
    id: string,
    payload: Omit<ProjectInterface, "id">
  ): Promise<boolean>;
  deleteProjects(id: string): Promise<boolean>;
  changeActiveProject(id?: string | null): Promise<boolean>;
  getActiveProject(): Promise<string | null>;
  exportProject(id?: string | null): Promise<ElectronResponseInterface>;
  importProject(): Promise<ElectronResponseInterface>;
}
