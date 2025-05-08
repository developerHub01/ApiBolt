import RequestBodyProvider from "@/context/request/RequestBodyProvider";
import RequestResponseProvider from "@/context/request/RequestResponseProvider";
import { Outlet } from "react-router-dom";

const RequestLayout = () => {
  return (
    <RequestResponseProvider>
      <RequestBodyProvider>
        <Outlet />
      </RequestBodyProvider>
    </RequestResponseProvider>
  );
};

export default RequestLayout;
