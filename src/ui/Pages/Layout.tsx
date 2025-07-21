import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { isElectron } from "@/utils/electron";
import Redirector from "@/components/app/Redirector";

const RootLayout = () => {
  const location = useLocation();

  console.log("Current location:", location.pathname);

  return (
    <section
      className={cn({
        "select-none": isElectron(),
      })}
    >
      <Outlet />
      <Redirector />
    </section>
  );
};

export default RootLayout;
