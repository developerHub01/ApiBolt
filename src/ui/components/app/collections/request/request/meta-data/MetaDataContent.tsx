import { memo } from "react";
import { AnimatePresence } from "motion/react";
import Url from "@/components/app/collections/request/request/meta-data/url/Url";
import Params from "@/components/app/collections/request/request/meta-data/params/Params";
import Headers from "@/components/app/collections/request/request/meta-data/headers/Headers";
import Body from "@/components/app/collections/request/request/meta-data/body/Body";
import { useAppSelector } from "@/context/redux/hooks";
import RequestMetaDataProvider from "@/context/collections/request/RequestMetaDataProvider";
import TabMotionWrapper from "@/components/app/collections/request/request/meta-data/TabMotionWrapper";
import RequestAuthorization from "@/components/app/collections/request/request/meta-data/authorization/RequestAuthorization";
import { selectActiveMetaTab } from "@/context/redux/request-response/selectors/meta-request";
import RequestCode from "@/components/app/collections/request/request/meta-data/code/RequestCode";

const MetaDataContent = memo(() => {
  const activeMetaTab = useAppSelector(selectActiveMetaTab) ?? "url";

  return (
    <RequestMetaDataProvider>
      <AnimatePresence>
        {activeMetaTab === "url" && (
          <TabMotionWrapper id="url">
            <Url />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "params" && (
          <TabMotionWrapper id="params">
            <Params />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "authorization" && (
          <TabMotionWrapper id="authorization">
            <RequestAuthorization />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "headers" && (
          <TabMotionWrapper id="headers">
            <Headers />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "body" && (
          <TabMotionWrapper id="body">
            <Body />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "code" && (
          <TabMotionWrapper id="code">
            <RequestCode />
          </TabMotionWrapper>
        )}
      </AnimatePresence>
    </RequestMetaDataProvider>
  );
});

MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
