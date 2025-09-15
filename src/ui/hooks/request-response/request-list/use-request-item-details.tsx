import { useCallback } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import {
  checkPermissionToAddFolderAsChildren,
  getRequestNodeLevel,
  getRequestType,
} from "@/utils/request-response.utils";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";

const useRequestItemDetails = () => {
  const selectedTab = useAppSelector(selectSelectedTab);
  const requestList = useAppSelector(selectRequestOrFolderList);

  const getRequestLavel = useCallback(
    (id: string) =>
      getRequestNodeLevel({
        id,
        source: requestList,
      }),
    [requestList]
  );

  const getRequestDetails = useCallback(
    (id: string) => requestList[id],
    [requestList]
  );

  const getRequestTypeById = useCallback(
    (id: string) => getRequestType(requestList[id]),
    [requestList]
  );

  const checkIsRequestDropable = useCallback(
    ({
      dragRequestId,
      dropRequestId,
      lavel,
    }: {
      dragRequestId: string;
      dropRequestId: string;
      lavel?: number;
    }) => {
      if (getRequestTypeById(dragRequestId) === "request") return true;

      if (typeof lavel === "undefined") lavel = getRequestLavel(dropRequestId);

      return checkPermissionToAddFolderAsChildren(lavel);
    },
    [getRequestLavel, getRequestTypeById]
  );

  const checkIsFolderAddable = useCallback(
    ({ id }: { id?: string } = {}) => {
      // if both are missing, allow adding at root
      if (!id && !selectedTab) return true;

      // If id is missing but selectedTab exists, use it
      if (!id && selectedTab) id = selectedTab;

      // fallback safety check
      if (!id) return true;

      return checkPermissionToAddFolderAsChildren(getRequestLavel(id));
    },
    [getRequestLavel, selectedTab]
  );

  return {
    getRequestLavel,
    getRequestDetails,
    getRequestTypeById,
    checkIsRequestDropable,
    checkIsFolderAddable,
  };
};

export default useRequestItemDetails;
