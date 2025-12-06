import { memo, lazy, Suspense } from "react";
import { useResponse } from "@/context/collections/request/ResponseProvider";
const Body = lazy(
  () =>
    import("@/components/app/collections/request/response/content/body/Body"),
);
const Cookies = lazy(
  () =>
    import("@/components/app/collections/request/response/content/cookies/Cookies"),
);
const Headers = lazy(
  () =>
    import("@/components/app/collections/request/response/content/headers/Headers"),
);
import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";
import History from "@/components/app/collections/request/response/content/history/History";
import EmptyResponse from "@/components/app/collections/request/response/content/EmptyResponse";
import ResponseError from "@/components/app/collections/request/response/content/error/ResponseError";
import ResposneBodyFallback from "@/fallback/collection/request/response/ResposneBodyFallback";
import ResposneCookiesFallback from "@/fallback/collection/request/response/ResposneCookiesFallback";
import ResposneHeadersFallback from "@/fallback/collection/request/response/ResposneHeadersFallback";

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
              {activeMetaTab === "body" && (
                <Suspense fallback={<ResposneBodyFallback />}>
                  <Body />
                </Suspense>
              )}
              {activeMetaTab === "cookies" && (
                <Suspense fallback={<ResposneCookiesFallback />}>
                  <Cookies />
                </Suspense>
              )}
              {activeMetaTab === "headers" && (
                <Suspense fallback={<ResposneHeadersFallback />}>
                  <Headers />
                </Suspense>
              )}
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
