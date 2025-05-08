import FolderProvider from "@/context/folder/FolderProvider";
import { Outlet } from "react-router-dom";

const FolderLayout = () => {
  return (
    <FolderProvider>
      <Outlet />
    </FolderProvider>
  );
};

export default FolderLayout;
