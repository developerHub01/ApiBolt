// import RequestMetaData from "@/components/app/request/request/meta-data/RequestMetaData";
import ApiUrl from "@/components/app/collections/request/request/api-url/ApiUrl";
import RequestTop from "@/components/app/collections/request/request/request-top/RequestTop";
// import RequestPanel from "@/components/app/collections/request/request/RequestPanel";
import ResizableWrapper from "@/components/app/collections/request/ResizableWrapper";
// import ResponsePanel from "@/components/app/collections/request/response/ResponsePanel";
// import { ResizableHandle } from "@/components/ui/resizable";

const RequestPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full p-2.5 flex flex-col gap-2">
        <RequestTop />
        <ApiUrl />
        {/* <RequestMetaData /> */}
      </div>
      <ResizableWrapper>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos aut
          dolores rerum eum minima omnis ut iste nostrum nisi perspiciatis
          velit, doloribus maxime dolor. Delectus itaque dignissimos et
          excepturi eligendi?
        </p>
        {/* <RequestPanel />
        <ResizableHandle />
        <ResponsePanel /> */}
      </ResizableWrapper>
    </div>
  );
};

export default RequestPage;
