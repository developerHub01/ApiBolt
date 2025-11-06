import TabMotionWrapper from "@/components/app/collections/request/request/meta-data/TabMotionWrapper";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { AnimatePresence } from "motion/react";
import Authorization from "@/components/app/history-details/content/meta/authorization/Authorization";

const MetaDataContent = () => {
  const { activeMetaTab } = useHistoryDetails();

  return (
    <AnimatePresence>
      {activeMetaTab === "params" && (
        <TabMotionWrapper id="params">
          <p>params</p>
          {/* <Params /> */}
        </TabMotionWrapper>
      )}
      {activeMetaTab === "authorization" && (
        <TabMotionWrapper id="authorization">
          <Authorization />
          {/* <RequestAuthorization /> */}
        </TabMotionWrapper>
      )}
      {/* {activeMetaTab === "headers" && (
        <TabMotionWrapper id="headers">
          <Headers />
        </TabMotionWrapper>
      )}
      {activeMetaTab === "body" && (
        <TabMotionWrapper id="body">
          <Body />
        </TabMotionWrapper>
      )}*/}
    </AnimatePresence>
  );
};

export default MetaDataContent;
