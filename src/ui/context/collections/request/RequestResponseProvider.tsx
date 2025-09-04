import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestResponseContext {
  forceCollapse: boolean;
  handleForceCollapse: (value?: boolean) => void;
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
  const [forceCollapse, setForceCollapse] = useState<boolean>(false);
  const handleForceCollapse = useCallback((value?: boolean) => {
    setForceCollapse((prev) => value ?? !prev);
  }, []);

  const handleDownloadRequest = useCallback(async () =>
    // id: string
    {
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
    }, []);

  return (
    <RequestResponseContext.Provider
      value={{
        forceCollapse,
        handleForceCollapse,
        handleDownloadRequest,
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
