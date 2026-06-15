import * as z from "zod";

export const EnvironmentFileSchema = z.array(
  z.object({
    variable: z.string(),
    type: z.enum(["default", "secret"]),
    value: z.string(),
    isCheck: z.boolean(),
  }),
);
