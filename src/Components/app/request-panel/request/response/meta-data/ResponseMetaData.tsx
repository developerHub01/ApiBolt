import { memo } from "react";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import MetaDataTab from "@/components/app/request-panel/request/response/meta-data/MetaDataTab";
import ResponsCollapseButton from "@/components/app/request-panel/request/response/ResponsCollapseButton";
import ResponseInfo from "@/components/app/request-panel/request/response/meta-data/response-info/ResponseInfo";

const ResponseMetaData = memo(() => {
  const { response } = useRequestResponse();

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
