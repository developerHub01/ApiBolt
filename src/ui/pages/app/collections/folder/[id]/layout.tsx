import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { Outlet, useParams } from "react-router-dom";
import RequestFolderProvider from "@/context/collections/folder/FolderProvider";
import { loadFolder } from "@/context/redux/request-response/thunks/folder";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";

const FolderLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestOrFolderId } = useParams();

  useEffect(() => {
    const payload = {
      requestOrFolderId,
      once: true,
    };
    [loadFolder, loadAuthorization].forEach((action) =>
      dispatch(action(payload))
    );
  }, [dispatch, requestOrFolderId]);

  return (
    <RequestFolderProvider>
      <Outlet />
    </RequestFolderProvider>
  );
};

export default FolderLayout;
