import { cn } from "@/lib/utils";
import { isElectron } from "@/utils/electron";
import { Outlet, useLocation } from "react-router-dom";

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
    </section>
  );
};

export default RootLayout;
