import { memo } from "react";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import { useResponse } from "@/context/request/ResponseProvider";
import EmptyResponse from "@/components/app/request-panel/request/response/content/EmptyResponse";
import Body from "@/components/app/request-panel/request/response/content/body/Body";
import Cookies from "@/components/app/request-panel/request/response/content/cookies/Cookies";
import Headers from "@/components/app/request-panel/request/response/content/headers/Headers";

const ResposneContent = memo(() => {
  const { activeMetaTab } = useResponse();
  const { response, selectedTab } = useRequestResponse();

  if (!response?.[selectedTab]) return <EmptyResponse />;

  return (
    <div className="p-2.5 pt-1 flex-1 min-h-0">
      {activeMetaTab === "body" && <Body />}
      {activeMetaTab === "cookies" && <Cookies />}
      {activeMetaTab === "headers" && <Headers />}
    </div>
  );
});
ResposneContent.displayName = "Resposne content";

export default ResposneContent;
