import CollectionProvider from "@/context/collections/CollectionProvider";
import { Outlet } from "react-router-dom";

const AuthorizationLayout = () => {
  return (
    <CollectionProvider type="global">
      <section className="p-4 w-full flex justify-center items-center">
        <Outlet />
      </section>
    </CollectionProvider>
  );
};

export default AuthorizationLayout;
