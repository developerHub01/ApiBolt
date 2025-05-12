import RequestBodyProvider from "@/context/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/request/RequestHeaderProvider";
import RequestResponseProvider from "@/context/request/RequestResponseProvider";
import { Outlet } from "react-router-dom";

const RequestLayout = () => {
  return (
    <RequestResponseProvider>
      <RequestBodyProvider>
        <RequestHeaderProvider>
          <Outlet />
        </RequestHeaderProvider>
      </RequestBodyProvider>
    </RequestResponseProvider>
  );
};

export default RequestLayout;
