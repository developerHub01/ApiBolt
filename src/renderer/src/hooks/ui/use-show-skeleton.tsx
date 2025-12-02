import { useEffect, useState } from "react";

const useShowSkeleton = (isLoading: boolean, delay = 300) => {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      // Immediately start showing skeleton
      setShowLoading(true);
    } else {
      // Delay hiding to avoid the flash
      timer = setTimeout(() => setShowLoading(false), delay);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoading;
};

export default useShowSkeleton;
