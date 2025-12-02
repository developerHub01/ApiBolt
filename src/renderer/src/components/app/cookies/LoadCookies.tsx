import { useEffect } from "react";
import { loadCookies } from "@/context/redux/cookies/thunks/cookies";
import { useAppDispatch } from "@/context/redux/hooks";

const LoadCookies = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCookies());
  }, [dispatch]);

  return null;
};

export default LoadCookies;
