import { Outlet } from "react-router-dom";
import RequestResponseProvider from "@/context/collections/request/RequestResponseProvider";

const RequestLayout = () => {
  return (
    <RequestResponseProvider>
      <Outlet />
    </RequestResponseProvider>
  );
};

export default RequestLayout;
