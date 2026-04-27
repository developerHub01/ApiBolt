import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadAppInfo } from "@/context/redux/app-info/thunks/app-info";

const LoadAppInfo = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAppInfo());
  }, [dispatch]);

  return null;
};

export default LoadAppInfo;
