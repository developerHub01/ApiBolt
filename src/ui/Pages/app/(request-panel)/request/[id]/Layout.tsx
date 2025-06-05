import RequestBodyProvider from "@/context/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/request/RequestHeaderProvider";
import { Outlet } from "react-router-dom";

const RequestLayout = () => {
  return (
    <RequestBodyProvider>
      <RequestHeaderProvider>
        <Outlet />
      </RequestHeaderProvider>
    </RequestBodyProvider>
  );
};

export default RequestLayout;
