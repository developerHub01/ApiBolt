import type { EnvironmentInterface } from "@shared/types/environment.types";

export const DEFAULT_ENVIRONMENT = (
  id: string,
  projectId: string
): Omit<EnvironmentInterface, "createdAt"> => ({
  id,
  type: "default",
  variable: "",
  value: "",
  isCheck: true,
  projectId
});
