import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import Url from "@/components/app/collections/request/request/meta-data/url/Url";
import Params from "@/components/app/collections/request/request/meta-data/params/Params";
import Headers from "@/components/app/collections/request/request/meta-data/headers/Headers";
import Body from "@/components/app/collections/request/request/meta-data/body/Body";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveMetaTab } from "@/context/redux/request-response/request-response-selector";
import RequestMetaDataProvider from "@/context/collections/request/RequestMetaDataProvider";
import TabMotionWrapper from "@/components/app/collections/request/request/meta-data/TabMotionWrapper";

const MetaDataContent = memo(() => {
  const activeMetaTab = useAppSelector(selectActiveMetaTab) ?? "url";

  return (
    <RequestMetaDataProvider>
      <AnimatePresence>
        {activeMetaTab === "url" && (
          <TabMotionWrapper key="url">
            <Url />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "params" && (
          <TabMotionWrapper key="params">
            <Params />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "headers" && (
          <TabMotionWrapper key="headers">
            <Headers />
          </TabMotionWrapper>
        )}
        {activeMetaTab === "body" && (
          <TabMotionWrapper key="body">
            <Body />
          </TabMotionWrapper>
        )}
      </AnimatePresence>
    </RequestMetaDataProvider>
  );
});

MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
