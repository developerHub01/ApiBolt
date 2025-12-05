import { EnvironmentInterface } from "@shared/types/environment.types";

export type EnvironmentExportInterface = Omit<
  EnvironmentInterface,
  "id" | "projectId" | "createdAt"
>;

export type TEnvironmentFile = Array<EnvironmentExportInterface>;
