import { memo } from "react";
import MetaDataTab from "@/components/app/collections/request/response/meta-data/MetaDataTab";
import ResponsCollapseButton from "@/components/app/collections/request/response/ResponsCollapseButton";
import ResponseInfo from "@/components/app/collections/request/response/meta-data/response-info/ResponseInfo";
import { Separator } from "@/components/ui/separator";

const ResponseMetaData = memo(() => {
  return (
    <div className="flex justify-between items-center gap-2 px-2.5 h-12 min-h-10">
      <p className="select-none text-secondary-foreground">Response</p>
      <div className="h-full py-3">
        <Separator orientation="vertical" />
      </div>
      <MetaDataTab />
      <ResponseInfo />
      <ResponsCollapseButton />
    </div>
  );
});

ResponseMetaData.displayName = "Response meta data";

export default ResponseMetaData;
