import type { EnvironmentInterface } from "@/types/environment.types";

export const removeDuplicateEnvs = (
  environmentsList: Record<string, EnvironmentInterface>
) => {
  const map = new Map<string, EnvironmentInterface>();

  Object.values(environmentsList).forEach((env) => {
    const existing = map.get(env.variable);
    if (
      env.variable &&
      (!existing || new Date(env.createdAt) > new Date(existing.createdAt))
    )
      map.set(env.variable, env);
  });

  return map;
};
