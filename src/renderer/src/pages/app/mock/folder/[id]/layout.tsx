import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectIsRequestOrFolderExist } from "@/context/redux/mock/selectors/request-list";
import RequestOrFolderNotFound from "@/components/app/mock/RequestOrFolderNotFound";
import MockRequestProvider from "@/context/mock/MockRequestProvider";

const MockFolderLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestOrFolderId } = useParams<{ id?: string }>();
  const isExist = useAppSelector(state =>
    selectIsRequestOrFolderExist(state, requestOrFolderId),
  );

  useEffect(() => {
    if (!isExist) return;
    // const payload = {
    //   requestOrFolderId: requestOrFolderId,
    //   once: true,
    // };
    // [].forEach(action => dispatch(action(payload)));
  }, [dispatch, isExist, requestOrFolderId]);

  if (!isExist) return <RequestOrFolderNotFound type="request" />;

  return (
    <MockRequestProvider>
      <Outlet />
    </MockRequestProvider>
  );
};

export default MockFolderLayout;
