import { Outlet } from "react-router-dom";
import EnvironmentsProvider from "@/context/environments/EnvironmentsProvider";

const EnvironmentLayout = () => {
  return (
    <EnvironmentsProvider>
      <Outlet />
    </EnvironmentsProvider>
  );
};

export default EnvironmentLayout;
