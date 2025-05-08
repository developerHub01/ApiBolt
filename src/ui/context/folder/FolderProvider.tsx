import React, { createContext, useCallback, useContext, useState } from "react";

interface FolderContext {
  title: string;
  handleChangeTitle: (title: string) => void;
  description: string;
  handleChangeDescription: (description: string) => void;
}

const FolderContext = createContext<FolderContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useFolder = () => {
  const context = useContext(FolderContext);

  if (!context) {
    throw new Error("useFolder must be used within a FolderProvider.");
  }

  return context;
};

interface FolderProviderProps {
  children: React.ReactNode;
}

const FolderProvider = ({ children }: FolderProviderProps) => {
  const [title, setTitle] = useState<string>("New Folder");
  const [description, setDescription] = useState<string>("");

  const handleChangeTitle = useCallback((title: string) => {
    setTitle(title.trim());
  }, []);
  const handleChangeDescription = useCallback((title: string) => {
    setDescription(title.trim());
  }, []);

  return (
    <FolderContext.Provider
      value={{
        title,
        handleChangeTitle,
        description,
        handleChangeDescription,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderProvider;
