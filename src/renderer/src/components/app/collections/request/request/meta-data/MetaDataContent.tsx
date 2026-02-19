import { memo, lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
const Url = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/url/Url"),
);
const Params = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/params/Params"),
);
const PathParams = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/path-params/PathParams"),
);
const Headers = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/headers/Headers"),
);
const Body = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/body/Body"),
);
const RequestAuthorization = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/authorization/RequestAuthorization"),
);
const RequestCode = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/code/RequestCode"),
);
import { useAppSelector } from "@/context/redux/hooks";
import RequestMetaDataProvider from "@/context/collections/request/RequestMetaDataProvider";
import TabMotionWrapper from "@/components/app/collections/request/request/meta-data/TabMotionWrapper";
import { selectActiveMetaTab } from "@/context/redux/request-response/selectors/meta-request";
import RequestCodeSnippitFallback from "@/fallback/collection/request/request/RequestCodeSnippitFallback";
import RequestBodyFallback from "@/fallback/collection/request/request/RequestBodyFallback";
import RequestParamsFallback from "@/fallback/collection/request/request/RequestParamsFallback";
import RequestHeadersFallback from "@/fallback/collection/request/request/RequestHeadersFallback";
import RequestApiUrlFallback from "@/fallback/collection/request/request/RequestApiUrlFallback";
import RequestAuthorizationFallback from "@/fallback/collection/request/request/RequestAuthorizationFallback";
import RequestPathParamsFallback from "@/fallback/collection/request/request/RequestPathParamsFallback";
import RequestMetaTableProvider from "@/context/collections/request/RequestMetaTableProvider";

const MetaDataContent = memo(() => {
  const activeMetaTab = useAppSelector(selectActiveMetaTab) ?? "url";

  return (
    <RequestMetaDataProvider>
      <AnimatePresence>
        {activeMetaTab === "url" && (
          <RequestMetaTableProvider>
            <TabMotionWrapper id="url">
              <Suspense fallback={<RequestApiUrlFallback />}>
                <Url />
              </Suspense>
            </TabMotionWrapper>
          </RequestMetaTableProvider>
        )}
        {activeMetaTab === "params" && (
          <RequestMetaTableProvider>
            <TabMotionWrapper id="params">
              <Suspense fallback={<RequestParamsFallback />}>
                <Params />
              </Suspense>
            </TabMotionWrapper>
          </RequestMetaTableProvider>
        )}
        {activeMetaTab === "path-params" && (
          <RequestMetaTableProvider
            showCheck={false}
            showDelete={false}
            preventKey={true}
            showBulkEdit={false}
            showThreeDotAction={false}
          >
            <TabMotionWrapper id="path-params">
              <Suspense fallback={<RequestPathParamsFallback />}>
                <PathParams />
              </Suspense>
            </TabMotionWrapper>
          </RequestMetaTableProvider>
        )}
        {activeMetaTab === "authorization" && (
          <RequestMetaTableProvider>
            <TabMotionWrapper id="authorization">
              <Suspense fallback={<RequestAuthorizationFallback />}>
                <RequestAuthorization />
              </Suspense>
            </TabMotionWrapper>
          </RequestMetaTableProvider>
        )}
        {activeMetaTab === "headers" && (
          <RequestMetaTableProvider>
            <TabMotionWrapper id="headers">
              <Suspense fallback={<RequestHeadersFallback />}>
                <Headers />
              </Suspense>
            </TabMotionWrapper>
          </RequestMetaTableProvider>
        )}
        {activeMetaTab === "body" && (
          <RequestMetaTableProvider>
            <TabMotionWrapper id="body">
              <Suspense fallback={<RequestBodyFallback />}>
                <Body />
              </Suspense>
            </TabMotionWrapper>
          </RequestMetaTableProvider>
        )}
        {activeMetaTab === "code" && (
          <RequestMetaTableProvider>
            <TabMotionWrapper id="code">
              <Suspense fallback={<RequestCodeSnippitFallback />}>
                <RequestCode />
              </Suspense>
            </TabMotionWrapper>
          </RequestMetaTableProvider>
        )}
      </AnimatePresence>
    </RequestMetaDataProvider>
  );
});

MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
