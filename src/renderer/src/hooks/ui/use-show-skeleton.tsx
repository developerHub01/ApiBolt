import { useEffect, useState } from "react";

const useShowSkeleton = (isLoading: boolean, delay = 300) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [prevIsLoading, setPrevIsLoading] = useState<boolean>(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoading(false), delay);
      return () => clearTimeout(timer);
    }
    return;
  }, [isLoading, delay]);

  if (isLoading !== prevIsLoading) {
    setPrevIsLoading(isLoading);
    if (isLoading) setShowLoading(true);
  }

  return showLoading;
};

export default useShowSkeleton;
