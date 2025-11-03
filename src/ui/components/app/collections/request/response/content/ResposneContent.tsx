import { memo } from "react";
import { useResponse } from "@/context/collections/request/ResponseProvider";
import Body from "@/components/app/collections/request/response/content/body/Body";
import Cookies from "@/components/app/collections/request/response/content/cookies/Cookies";
import Headers from "@/components/app/collections/request/response/content/headers/Headers";
import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";
import History from "@/components/app/collections/request/response/content/history/History";
import EmptyResponse from "@/components/app/collections/request/response/content/EmptyResponse";
import ResponseError from "@/components/app/collections/request/response/content/error/ResponseError";

const ResposneContent = memo(() => {
  const { activeMetaTab } = useResponse();
  const response = useAppSelector(selectResponse);

  if (!activeMetaTab || (!response && activeMetaTab !== "history"))
    return <EmptyResponse />;

  return (
    <div className="p-2.5 pt-1 flex-1 min-h-0 flex">
      {activeMetaTab === "history" ? (
        <History />
      ) : (
        <>
          {Boolean(response) && (
            <>
              {activeMetaTab === "body" && <Body />}
              {activeMetaTab === "cookies" && <Cookies />}
              {activeMetaTab === "headers" && <Headers />}
              {activeMetaTab === "error" && !response?.status && (
                <ResponseError />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
});
ResposneContent.displayName = "Resposne content";

export default ResposneContent;
