import { Outlet } from "react-router-dom";
import EnvironmentsProvider from "@/context/environments/EnvironmentsProvider";

const EnvironmentLayout = () => {
  return (
    <section className="w-full h-full flex flex-col items-center p-4">
      <EnvironmentsProvider>
        <Outlet />
      </EnvironmentsProvider>
    </section>
  );
};

export default EnvironmentLayout;
