import type { RequestListInterface } from "@/types/request-response.types";

export const getNestedIds = ({
  source,
  id,
  ids = [],
}: {
  source: RequestListInterface;
  id: string;
  ids?: Array<string>;
}): string[] => {
  const data = source[id];
  if (!data) return [...new Set(ids)];

  ids.push(id);

  if (data.children && data.children.length) {
    for (const childId of data.children) {
      getNestedIds({ source, id: childId, ids });
    }
  }

  return [...new Set(ids)];
};
