import MetaWrapper from "@/components/app/history-details/content/meta/MetaWrapper";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { AnimatePresence } from "motion/react";
import Authorization from "@/components/app/history-details/content/meta/authorization/Authorization";
import Body from "@/components/app/history-details/content/meta/body/Body";
import Params from "@/components/app/history-details/content/meta/params/Params";
import Headers from "@/components/app/history-details/content/meta/headers/Headers";
import PathParams from "@/components/app/history-details/content/meta/path-params/PathParams";

const MetaDataContent = () => {
  const { activeMetaTab } = useHistoryDetails();

  return (
    <AnimatePresence>
      {activeMetaTab === "params" && (
        <MetaWrapper id="params">
          <Params />
        </MetaWrapper>
      )}
      {activeMetaTab === "path-params" && (
        <MetaWrapper id="path-params">
          <PathParams />
        </MetaWrapper>
      )}
      {activeMetaTab === "authorization" && (
        <MetaWrapper id="authorization">
          <Authorization />
        </MetaWrapper>
      )}
      {activeMetaTab === "body" && (
        <MetaWrapper id="body">
          <Body />
        </MetaWrapper>
      )}
      {activeMetaTab === "headers" && (
        <MetaWrapper id="headers">
          <Headers />
        </MetaWrapper>
      )}
    </AnimatePresence>
  );
};

export default MetaDataContent;
