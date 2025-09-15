import { memo } from "react";
import { useResponse } from "@/context/collections/request/ResponseProvider";
import EmptyResponse from "@/components/app/collections/request/response/content/EmptyResponse";
import Body from "@/components/app/collections/request/response/content/body/Body";
import Cookies from "@/components/app/collections/request/response/content/cookies/Cookies";
import Headers from "@/components/app/collections/request/response/content/headers/Headers";
import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";

const ResposneContent = memo(() => {
  const { activeMetaTab } = useResponse();
  const response = useAppSelector(selectResponse);

  if (!response) return <EmptyResponse />;

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
