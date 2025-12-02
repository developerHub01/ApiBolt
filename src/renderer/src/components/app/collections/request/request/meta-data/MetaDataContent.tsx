import { memo, lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
const Url = lazy(
  () => import("@/components/app/collections/request/request/meta-data/url/Url")
);
const Params = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/params/Params")
);
const Headers = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/headers/Headers")
);
const Body = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/body/Body")
);
const RequestAuthorization = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/authorization/RequestAuthorization")
);
const RequestCode = lazy(
  () =>
    import("@/components/app/collections/request/request/meta-data/code/RequestCode")
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

const MetaDataContent = memo(() => {
  const activeMetaTab = useAppSelector(selectActiveMetaTab) ?? "url";

  return (
    <RequestMetaDataProvider>
      <AnimatePresence>
        {activeMetaTab === "url" && (
          <TabMotionWrapper id="url">
            <Suspense fallback={<RequestApiUrlFallback />}>
              <Url />
            </Suspense>
          </TabMotionWrapper>
        )}
        {activeMetaTab === "params" && (
          <TabMotionWrapper id="params">
            <Suspense fallback={<RequestParamsFallback />}>
              <Params />
            </Suspense>
          </TabMotionWrapper>
        )}
        {activeMetaTab === "authorization" && (
          <TabMotionWrapper id="authorization">
            <Suspense fallback={<RequestAuthorizationFallback />}>
              <RequestAuthorization />
            </Suspense>
          </TabMotionWrapper>
        )}
        {activeMetaTab === "headers" && (
          <TabMotionWrapper id="headers">
            <Suspense fallback={<RequestHeadersFallback />}>
              <Headers />
            </Suspense>
          </TabMotionWrapper>
        )}
        {activeMetaTab === "body" && (
          <TabMotionWrapper id="body">
            <Suspense fallback={<RequestBodyFallback />}>
              <Body />
            </Suspense>
          </TabMotionWrapper>
        )}
        {activeMetaTab === "code" && (
          <TabMotionWrapper id="code">
            <Suspense fallback={<RequestCodeSnippitFallback />}>
              <RequestCode />
            </Suspense>
          </TabMotionWrapper>
        )}
      </AnimatePresence>
    </RequestMetaDataProvider>
  );
});

MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
