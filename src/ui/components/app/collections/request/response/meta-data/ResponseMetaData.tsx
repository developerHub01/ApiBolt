import { memo } from "react";
import MetaDataTab from "@/components/app/collections/request/response/meta-data/MetaDataTab";
import ResponsCollapseButton from "@/components/app/collections/request/response/ResponsCollapseButton";
import ResponseInfo from "@/components/app/collections/request/response/meta-data/response-info/ResponseInfo";
import { useAppSelector } from "@/context/redux/hooks";

const ResponseMetaData = memo(() => {
  const response = useAppSelector(
    (state) => state.requestResponse.response[state.requestResponse.selectedTab!]
  );

  return (
    <div className="flex justify-between items-center gap-2 px-2.5 h-12 min-h-12">
      {response ? (
        <MetaDataTab />
      ) : (
        <p className="select-none text-secondary-foreground">Response</p>
      )}
      <ResponseInfo />
      <ResponsCollapseButton />
    </div>
  );
});

ResponseMetaData.displayName = "Response meta data";

export default ResponseMetaData;
