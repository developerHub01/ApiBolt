import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadLocalPassword } from "@/context/redux/local-password/thunks/local-password";

const LoadLocalPassword = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLocalPassword());
  }, [dispatch]);

  return null;
};

export default LoadLocalPassword;
