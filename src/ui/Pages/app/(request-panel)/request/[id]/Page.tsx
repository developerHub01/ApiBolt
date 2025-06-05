import ApiUrl from "@/components/app/request-panel/request/request/api-url/ApiUrl";
import RequestMetaData from "@/components/app/request-panel/request/request/meta-data/RequestMetaData";
import RequestTop from "@/components/app/request-panel/request/request/request-top/RequestTop";
import RequestPanel from "@/components/app/request-panel/request/request/RequestPanel";
import ResizableWrapper from "@/components/app/request-panel/request/ResizableWrapper";
import ResponsePanel from "@/components/app/request-panel/request/response/ResponsePanel";
import { ResizableHandle } from "@/components/ui/resizable";
import { useAppSelector } from "@/context/redux/hooks";
import { useNavigate, useParams } from "react-router-dom";

const RequestPage = () => {
  const selectedTab = useAppSelector((state) => state.requestResponse.selectedTab);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!selectedTab || !id) {
    navigate("/");
    return;
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full p-2.5 flex flex-col gap-2">
        <RequestTop />
        <ApiUrl />
        <RequestMetaData />
        {selectedTab}
      </div>
      <ResizableWrapper>
        <RequestPanel />
        <ResizableHandle />
        <ResponsePanel />
      </ResizableWrapper>
    </div>
  );
};

export default RequestPage;
