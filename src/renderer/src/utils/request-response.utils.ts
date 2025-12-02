import { MAX_REQUEST_LIST_NESTED_FOLDER_COUNT } from "@/constant/request-response.constant";
import { URL_PURE_VARIABLE_REGEX } from "@/constant/request-url.constant";
import type { EnvironmentInterface } from "@shared/types/environment.types";
import type {
  FlexibleRequestListInterface,
  ParamInterface,
  RequestListInterface,
  RequestListItemInterface,
  TParamContentType
} from "@shared/types/request-response.types";
import { v4 as uuidv4 } from "uuid";

export const getFolderChildren = (
  payload: RequestListItemInterface
): Array<string> | null => payload.children ?? (!payload["method"] ? [] : null);

/**
 *
 * @param payload request or folder details
 * @returns "folder" | "request"
 *
 * first check do it have children
 *    if then folder
 *    else check is there not exist method
 *      if method not exist that means it is must a folder so add empty children list else undefined because it is a request.
 */
export const getRequestType = (
  payload: RequestListItemInterface
): "folder" | "request" => (getFolderChildren(payload) ? "folder" : "request");

export const getNestedIds = ({
  source,
  id,
  ids = []
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
  ids = []
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

export const getRequestNodeLevel = ({
  source,
  id,
  lavel = 0
}: {
  source: RequestListInterface;
  id: string;
  lavel?: number;
}): number => {
  const data = source[id];
  if (!data || !data.parentId) return lavel;

  lavel++;

  return getRequestNodeLevel({ source, id: data.parentId, lavel });
};

export const duplicateRequestOrFolderNode = ({
  source,
  id,
  parentId,
  result = {
    nodes: {},
    newParentId: ""
  }
}: {
  source: RequestListInterface;
  id: string;
  parentId?: string;
  result?: {
    nodes: FlexibleRequestListInterface<{
      oldId: string;
    }>;
    newParentId: string;
  };
}): {
  nodes: FlexibleRequestListInterface<{
    oldId: string;
  }>;
  newParentId: string;
} => {
  const nodeId = uuidv4();
  const data = source[id];

  result.nodes[nodeId] = {
    ...data,
    parentId,
    id: nodeId,
    oldId: id
  };
  if (!result.newParentId) result.newParentId = nodeId;

  if (data.children && data.children.length) {
    for (const childId of data.children) {
      duplicateRequestOrFolderNode({
        source,
        id: childId,
        parentId: nodeId,
        result
      });
    }
  }

  return result;
};

export const checkPermissionToAddFolderAsChildren = (lavel: number = 0) =>
  lavel + 1 <= MAX_REQUEST_LIST_NESTED_FOLDER_COUNT;

export const paramsTableToString = (
  params: Array<ParamInterface> = []
): string => {
  const searchParams = params
    .filter(param => param.isCheck)
    .map(param => {
      const key = param.keyType === "env" ? `{{${param.key}}}` : param.key;
      const value =
        param.valueType === "env" ? `{{${param.value}}}` : param.value;
      return `${key}=${value}`;
    })
    .join("&");

  return searchParams ? `?${searchParams}` : searchParams;
};

export const paramsTableToStringParsedFromEnvs = (
  params: Array<ParamInterface> = [],
  envMap: Map<string, EnvironmentInterface> = new Map()
): string => {
  const searchParams = params
    .filter(param => param.isCheck)
    .map(param => {
      const key =
        param.keyType === "env"
          ? envMap.get(param.key)?.value || ""
          : param.key;
      const value =
        param.valueType === "env"
          ? envMap.get(param.value)?.value || ""
          : param.value;
      return `${key}=${value}`;
    })
    .join("&");

  return searchParams ? `?${searchParams}` : searchParams;
};

export function detectAndCleanVariable(
  str: string,
  type: "keyType"
): { key: string; keyType: TParamContentType };

export function detectAndCleanVariable(
  str: string,
  type: "valueType"
): { value: string; valueType: TParamContentType };

// Implementation
export function detectAndCleanVariable(
  str: string,
  type: "keyType" | "valueType"
) {
  if (!str)
    return {
      [type]: "text",
      [type === "keyType" ? "key" : "value"]: str
    };

  const match = str.match(URL_PURE_VARIABLE_REGEX);
  if (match)
    return {
      [type]: "env",
      [type === "keyType" ? "key" : "value"]: match[1]
    };

  return {
    [type]: "text",
    [type === "keyType" ? "key" : "value"]: str
  };
}
