import { useCallback } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import {
  checkPermissionToAddFolderAsChildren,
  getRequestNodeLevel,
  getRequestType,
} from "@/utils/request-response.utils";
import { selectSelectedTab } from "@/context/redux/mock/selectors/tab-list";
import { selectRequestOrFolderList } from "@/context/redux/mock/selectors/request-list";

const useRequestItemDetails = () => {
  const selectedTab = useAppSelector(selectSelectedTab);
  const requestList = useAppSelector(selectRequestOrFolderList);

  const getRequestlevel = useCallback(
    (id: string) =>
      getRequestNodeLevel({
        id,
        source: requestList,
      }),
    [requestList],
  );

  const getRequestDetails = useCallback(
    (id: string) => requestList[id],
    [requestList],
  );

  const getRequestTypeById = useCallback(
    (id: string) => getRequestType(requestList[id]),
    [requestList],
  );

  const checkIsRequestDropable = useCallback(
    ({
      dragRequestId,
      dropRequestId,
      level,
    }: {
      dragRequestId: string;
      dropRequestId: string;
      level?: number;
    }) => {
      if (getRequestTypeById(dragRequestId) === "request") return true;

      if (typeof level === "undefined") level = getRequestlevel(dropRequestId);

      return checkPermissionToAddFolderAsChildren(level);
    },
    [getRequestlevel, getRequestTypeById],
  );

  const checkIsFolderAddable = useCallback(
    ({ id }: { id?: string } = {}) => {
      // if both are missing, allow adding at root
      if (!id && !selectedTab) return true;

      // If id is missing but selectedTab exists, use it
      if (!id && selectedTab) id = selectedTab;

      // fallback safety check
      if (!id) return true;

      return checkPermissionToAddFolderAsChildren(getRequestlevel(id));
    },
    [getRequestlevel, selectedTab],
  );

  return {
    getRequestlevel,
    getRequestDetails,
    getRequestTypeById,
    checkIsRequestDropable,
    checkIsFolderAddable,
  };
};

export default useRequestItemDetails;
