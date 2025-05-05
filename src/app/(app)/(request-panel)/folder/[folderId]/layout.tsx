import React from "react";
import FolderProvider from "@/app/(app)/(request-panel)/folder/[folderId]/_context/FolderProvider";

const FolderLayout = ({ children }: { children: React.ReactNode }) => {
  return <FolderProvider>{children}</FolderProvider>;
};

export default FolderLayout;
