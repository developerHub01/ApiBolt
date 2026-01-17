import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadThemesDetails } from "@/context/redux/theme-marketplace/thunks/theme-marketplace";

const LoadThemeDetails = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadThemesDetails());
  }, [dispatch]);

  return null;
};

export default LoadThemeDetails;
