import { useEffect } from "react";
import { loadCookies } from "@/context/redux/cookies/thunk/cookies-thunk";
import { useAppDispatch } from "@/context/redux/hooks";

const LoadCookies = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCookies());
  }, [dispatch]);

  return null;
};

export default LoadCookies;
