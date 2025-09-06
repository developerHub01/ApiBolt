import type {
  ParamInterface,
  RequestListInterface,
} from "@/types/request-response.types";
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

export const getNodeParentsIdList = ({
  source,
  id,
  ids = [],
}: {
  source: RequestListInterface;
  id: string;
  ids?: Array<string>;
}): string[] => {
  const data = source[id];
  if (!data || !data.parentId) return [...new Set(ids)];

  ids.push(data.parentId);

  return getNodeParentsIdList({ source, id: data.parentId, ids });
};

export const duplicateRequestOrFolderNode = ({
  source,
  id,
  parentId,
  result = {
    nodes: {},
    newParentId: "",
  },
}: {
  source: RequestListInterface;
  id: string;
  parentId?: string;
  result?: {
    nodes: RequestListInterface;
    newParentId: string;
  };
}): {
  nodes: RequestListInterface;
  newParentId: string;
} => {
  const nodeId = uuidv4();
  const data = source[id];

  result.nodes[nodeId] = {
    ...data,
    parentId,
    id: nodeId,
  };
  if (!result.newParentId) result.newParentId = nodeId;

  if (data.children && data.children.length) {
    for (const childId of data.children) {
      duplicateRequestOrFolderNode({
        source,
        id: childId,
        parentId: nodeId,
        result,
      });
    }
  }

  return result;
};

export const paramsTableToString = (
  params: Array<ParamInterface> = []
): string => {
  const searchParams = params
    .filter((param) => param.isCheck)
    .map((param) => `${param.key}=${param.value}`)
    .join("&");

  if (searchParams) return `?${searchParams}`;
  return searchParams;
};
