import type { RequestListInterface } from "@/types/request-response.types";
import { v4 as uuidv4 } from "uuid";

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

export const duplicateRequestOrFolderNode = ({
  source,
  id,
  parentId,
  nodes = {},
}: {
  source: RequestListInterface;
  id: string;
  parentId?: string;
  nodes?: RequestListInterface;
}): RequestListInterface => {
  const nodeId = uuidv4();
  const data = source[id];

  nodes[nodeId] = {
    ...data,
    parentId,
    id: nodeId,
  };

  if (data.children && data.children.length) {
    for (const childId of data.children) {
      duplicateRequestOrFolderNode({
        source,
        id: childId,
        parentId: nodeId,
        nodes,
      });
    }
  }

  return nodes;
};
