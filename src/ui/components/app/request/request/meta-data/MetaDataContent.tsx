import { memo } from "react";
import Params from "@/components/app/request/request/meta-data/headers-params/params/Params";
import Headers from "@/components/app/request/request/meta-data/headers-params/headers/Headers";
import Body from "@/components/app/request/request/meta-data/body/Body";
import { useAppSelector } from "@/context/redux/hooks";

const MetaDataContent = memo(() => {
  const activeMetaTab = useAppSelector(
    (state) =>
      state.requestResponse.activeMetaTab[state.requestResponse.selectedTab!] ??
      "params"
  );

  return (
    <div className="h-full p-2.5 pt-1">
      {activeMetaTab === "params" && <Params />}
      {activeMetaTab === "headers" && <Headers />}
      {activeMetaTab === "body" && <Body />}
    </div>
  );
});
MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
