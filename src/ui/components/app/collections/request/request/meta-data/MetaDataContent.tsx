import { memo } from "react";
import Params from "@/components/app/collections/request/request/meta-data/headers-params/params/Params";
import Headers from "@/components/app/collections/request/request/meta-data/headers-params/headers/Headers";
import Body from "@/components/app/collections/request/request/meta-data/body/Body";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveMetaTab } from "@/context/redux/request-response/request-response-selector";
import RequestMetaDataProvider from "@/context/collections/request/RequestMetaDataProvider";

const MetaDataContent = memo(() => {
  const activeMetaTab = useAppSelector(selectActiveMetaTab) ?? "params";

  return (
    <RequestMetaDataProvider>
      <div className="h-full p-2.5 pt-1">
        {activeMetaTab === "params" && <Params />}
        {activeMetaTab === "headers" && <Headers />}
        {activeMetaTab === "body" && <Body />}
      </div>
    </RequestMetaDataProvider>
  );
});
MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
