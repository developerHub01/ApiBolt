import { memo } from "react";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import Params from "@/components/app/request-panel/request/request/meta-data/headers-params/params/Params";
import Authorization from "@/components/app/request-panel/request/request/meta-data/authorization/Authorization";
import Headers from "@/components/app/request-panel/request/request/meta-data/headers-params/headers/Headers";
import Body from "@/components/app/request-panel/request/request/meta-data/body/Body";

const MetaDataContent = memo(() => {
  const { activeMetaTab } = useRequestResponse();

  return (
    <div className="h-full p-2.5 pt-1">
      {activeMetaTab === "params" && <Params />}
      {activeMetaTab === "authorization" && <Authorization />}
      {activeMetaTab === "headers" && <Headers />}
      {activeMetaTab === "body" && <Body />}
    </div>
  );
});
MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
