import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  handleInitRequest,
  handleUpdateRequestResponseSelectedTab,
} from "@/context/redux/request-response/request-response-slice";
import { getDownloadableRequestData } from "@/context/redux/request-response/request-response-thunk";

interface RequestResponseContext {
  handleDownloadRequest: (id: string) => Promise<void>;
}

const RequestResponseContext = createContext<RequestResponseContext | null>(
  null
);

/* eslint-disable react-refresh/only-export-components */
export const useRequestResponse = () => {
  const context = useContext(RequestResponseContext);

  if (!context) {
    throw new Error(
      "useRequestResponse must be used within a RequestResponseProvider."
    );
  }

  return context;
};

interface RequestResponseProviderProps {
  children: React.ReactNode;
}

const RequestResponseProvider = ({
  children,
}: RequestResponseProviderProps) => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector((state) => state.tabSidebar.selectedTab);
  const requestResponseSelectedTab = useAppSelector(
    (state) => state.requestResponse.selectedTab
  );
  const isSelectedRequestAlreadyLoaded = useAppSelector(
    (state) =>
      state.requestResponse.loadedRequestList[
        state.tabSidebar.selectedTab ?? ""
      ]
  );

  useEffect(() => {
    if (selectedTab === requestResponseSelectedTab) return;
    dispatch(handleUpdateRequestResponseSelectedTab(selectedTab));

    if (!selectedTab || isSelectedRequestAlreadyLoaded) return;

    (async () => {
      const requestDetails =
        await window.electronAPIRequestAndFolderDB.findRequestOrFolderById(
          selectedTab
        );
      dispatch(
        handleInitRequest({
          id: selectedTab,
          payload: requestDetails,
        })
      );
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const handleDownloadRequest = useCallback(
    async (id: string) => {
      const downloadableData = await dispatch(
        getDownloadableRequestData(id)
      ).unwrap();

      if (!downloadableData) return;

      const blob = new Blob([JSON.stringify(downloadableData)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${downloadableData.name || "request"}.json`;
      link.click();
      URL.revokeObjectURL(url);
    },
    [dispatch]
  );

  return (
    <RequestResponseContext.Provider value={{ handleDownloadRequest }}>
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
