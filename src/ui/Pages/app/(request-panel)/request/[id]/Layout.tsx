import RequestBodyProvider from "@/context/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/request/RequestHeaderProvider";
import SingleRequestProvider from "@/context/request/single-request/SingleRequestProvider";
import { Outlet } from "react-router-dom";

const RequestLayout = () => {
  return (
    <SingleRequestProvider>
      <RequestBodyProvider>
        <RequestHeaderProvider>
          <Outlet />
        </RequestHeaderProvider>
      </RequestBodyProvider>
    </SingleRequestProvider>
  );
};

export default RequestLayout;
