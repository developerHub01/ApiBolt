import { memo, useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadAppBasicInfo } from "@/context/redux/app-info/thunks/app-info";

const LoadBasicData = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAppBasicInfo());
  }, [dispatch]);

  return null;
});

export default LoadBasicData;
