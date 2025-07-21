import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  // getDownloadableRequestData,
  loadRequestData,
} from "@/context/redux/request-response/request-response-thunk";

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
  const selectedTab = useAppSelector(
    (state) => state.requestResponse.selectedTab
  );

  useEffect(() => {
    dispatch(loadRequestData(selectedTab));
  }, [dispatch, selectedTab]);

  const handleDownloadRequest = useCallback(
    async (
      // id: string
    ) => {
      // const downloadableData = await dispatch(
      //   getDownloadableRequestData(id)
      // ).unwrap();

      // if (!downloadableData) return;

      // const blob = new Blob([JSON.stringify(downloadableData)], {
      //   type: "application/json",
      // });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = `${downloadableData.name || "request"}.json`;
      // link.click();
      // URL.revokeObjectURL(url);
    },
    []
  );

  return (
    <RequestResponseContext.Provider value={{ handleDownloadRequest }}>
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
