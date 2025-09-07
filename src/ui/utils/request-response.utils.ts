import { urlPureVariableRegex } from "@/constant/request-url.constant";
import type {
  ParamInterface,
  RequestListInterface,
  TParamContentType,
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
    .map((param) => {
      const key = param.keyType === "env" ? `{{${param.key}}}` : param.key;
      const value =
        param.valueType === "env" ? `{{${param.value}}}` : param.value;
      return `${key}=${value}`;
    })
    .join("&");

  return searchParams ? `?${searchParams}` : searchParams;
};

export const detectAndCleanVariable = (
  str: string,
  type: "keyType" | "valueType"
): {
  key?: string;
  value?: string;
  keyType?: TParamContentType;
  valueType?: TParamContentType;
} => {
  if (!str)
    return {
      [type]: "text",
      [type === "keyType" ? "key" : "value"]: str,
    };
  const match = str.match(urlPureVariableRegex);
  if (match)
    return {
      [type]: "env",
      [type === "keyType" ? "key" : "value"]: match[1],
    };

  return {
    [type]: "text",
    [type === "keyType" ? "key" : "value"]: str,
  };
};
