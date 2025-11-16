import ApiUrl from "@/components/app/collections/request/request/api-url/ApiUrl";
import MetaDataTab from "@/components/app/collections/request/request/meta-data/MetaDataTab";
import RequestTop from "@/components/app/collections/request/request/request-top/RequestTop";
import RequestPanel from "@/components/app/collections/request/request/RequestPanel";
import RequestResizableWrapper from "@/components/app/collections/request/RequestResizableWrapper";
import ResponsePanel from "@/components/app/collections/request/response/ResponsePanel";
import { ResizableHandle } from "@/components/ui/resizable";

const RequestPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full p-3 flex flex-col gap-2">
        <RequestTop />
        <ApiUrl />
        <MetaDataTab />
      </div>
      <RequestResizableWrapper>
        <RequestPanel />
        <ResizableHandle />
        <ResponsePanel />
      </RequestResizableWrapper>
    </div>
  );
};

export default RequestPage;
