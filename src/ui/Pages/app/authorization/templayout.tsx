import AuthorizationProvider from "@/context/authorization/AuthorizationProvider";
import { Outlet } from "react-router-dom";

const AuthorizationLayout = () => {
  return (
    <section className="p-4 w-full flex justify-center items-center">
      <AuthorizationProvider>
        <Outlet />
      </AuthorizationProvider>
    </section>
  );
};

export default AuthorizationLayout;
