import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateFolder } from "@/context/redux/request-response/thunks/folder";
import {
  selectIsFolderDescriptionLineWrap,
  selectRequestFolderDescription,
} from "@/context/redux/request-response/selectors/folder";
import { handleChangeFolderDescriptionLineWrap } from "@/context/redux/request-response/request-response-slice";

interface RequestFolderContext {
  folderDescription: string;
  isLineWrap: boolean;
  handleChangeDescription: (value: string) => void;
  handleBlurDescription: () => void;
  handleLineWrap: () => void;
}

const RequestFolderContext = createContext<RequestFolderContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestFolder = () => {
  const context = useContext(RequestFolderContext);

  if (!context) {
    throw new Error(
      "useRequestFolder must be used within a RequestFolderProvider."
    );
  }

  return context;
};

interface RequestFolderProviderProps {
  children: React.ReactNode;
}

const RequestFolderProvider = ({ children }: RequestFolderProviderProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const description = useAppSelector(selectRequestFolderDescription);
  const isLineWrap = useAppSelector(selectIsFolderDescriptionLineWrap);
  const [folderDescription, setFolderDescription] = useState<string>("");

  useEffect(() => {
    if (description === folderDescription) return;
    setFolderDescription(description ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  const handleChangeDescription = useCallback(
    (value: string) => setFolderDescription(value),
    []
  );

  const handleBlurDescription = useCallback(
    () =>
      dispatch(
        updateFolder({
          description: folderDescription ?? "",
        })
      ),
    [dispatch, folderDescription]
  );

  const handleLineWrap = useCallback(
    () => dispatch(handleChangeFolderDescriptionLineWrap()),
    [dispatch]
  );

  if (!id) return null;

  return (
    <RequestFolderContext.Provider
      value={{
        isLineWrap,
        folderDescription,
        handleChangeDescription,
        handleBlurDescription,
        handleLineWrap,
      }}
    >
      {children}
    </RequestFolderContext.Provider>
  );
};

export default RequestFolderProvider;
