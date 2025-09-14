export interface EnvironmentInterface {
  id: string;
  variable: string;
  type: "default" | "secret";
  value: string;
  isCheck: boolean;
  projectId: string;
  createdAt: string;
}

export type EnvironmentPayloadInterface = Omit<
  EnvironmentInterface,
  "createdAt"
>;
