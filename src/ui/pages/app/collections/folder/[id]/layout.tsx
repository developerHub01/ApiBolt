import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { Outlet } from "react-router-dom";
import RequestFolderProvider from "@/context/collections/folder/FolderProvider";
import { loadFolder } from "@/context/redux/request-response/thunks/folder";

const FolderLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const payload = { once: true };
    [loadFolder].forEach((action) => dispatch(action(payload)));
  }, [dispatch]);

  return (
    <RequestFolderProvider>
      <Outlet />
    </RequestFolderProvider>
  );
};

export default FolderLayout;
