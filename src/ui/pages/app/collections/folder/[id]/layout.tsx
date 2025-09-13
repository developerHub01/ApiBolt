import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { Outlet, useParams } from "react-router-dom";
import RequestFolderProvider from "@/context/collections/folder/FolderProvider";
import { loadFolder } from "@/context/redux/request-response/thunks/folder";

const FolderLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestId } = useParams();

  useEffect(() => {
    const payload = { once: true };
    [loadFolder].forEach((action) => dispatch(action(payload)));
  }, [dispatch, requestId]);

  return (
    <RequestFolderProvider>
      <Outlet />
    </RequestFolderProvider>
  );
};

export default FolderLayout;
