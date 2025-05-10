import { cn } from "@/lib/utils";
import { isElectron } from "@/utils/electron";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
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
