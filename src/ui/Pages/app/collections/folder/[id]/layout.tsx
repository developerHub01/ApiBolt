import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadRequestData } from "@/context/redux/request-response/request-response-thunk";
import { Outlet } from "react-router-dom";

const FolderLayout = () => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(
    (state) => state.requestResponse.selectedTab
  );

  useEffect(() => {
    dispatch(loadRequestData(selectedTab));
  }, [dispatch, selectedTab]);

  return <Outlet />;
};

export default FolderLayout;
