import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { isElectron } from "@/utils/electron";
import Redirector from "@/components/app/Redirector";

const RootLayout = () => {
  return (
    <section
      className={cn(
        "bg-background",
        "selection:bg-primary selection:text-primary-foreground",
        {
          "select-none": isElectron(),
        }
      )}
    >
      <Outlet />
      <Redirector />
    </section>
  );
};

export default RootLayout;
