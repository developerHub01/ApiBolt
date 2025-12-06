import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { Outlet, useParams } from "react-router-dom";
import RequestFolderProvider from "@/context/collections/folder/FolderProvider";
import { loadFolder } from "@/context/redux/request-response/thunks/folder";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";
import { selectIsRequestOrFolderExist } from "@/context/redux/request-response/selectors/request-list";
import RequestOrFolderNotFound from "@/components/app/collections/RequestOrFolderNotFound";

const FolderLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestOrFolderId } = useParams<{ id?: string }>();
  const isExist = useAppSelector(state =>
    selectIsRequestOrFolderExist(state, requestOrFolderId),
  );

  useEffect(() => {
    if (!isExist) return;
    const payload = {
      requestOrFolderId,
      once: true,
    };
    [loadFolder, loadAuthorization].forEach(action =>
      dispatch(action(payload)),
    );
  }, [dispatch, isExist, requestOrFolderId]);

  if (!isExist) return <RequestOrFolderNotFound type="folder" />;

  return (
    <RequestFolderProvider>
      <Outlet />
    </RequestFolderProvider>
  );
};

export default FolderLayout;
