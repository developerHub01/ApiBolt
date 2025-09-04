import { useEffect, useState } from "react";

const useIsSmallDevice = (breakpoint = 900) => {
  const [isSamllDevice, setIsSamllDevice] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setIsSamllDevice(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isSamllDevice;
};

export default useIsSmallDevice;
