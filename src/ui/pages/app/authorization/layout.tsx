import { Outlet } from "react-router-dom";

const AuthorizationLayout = () => {
  return (
    <section className="p-4 w-full flex justify-center items-center">
      <Outlet />
    </section>
  );
};

export default AuthorizationLayout;
