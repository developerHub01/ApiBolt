import { memo } from "react";
import MetaDataTab from "@/components/app/collections/request/response/meta-data/MetaDataTab";
import ResponsCollapseButton from "@/components/app/collections/request/response/ResponsCollapseButton";
import ResponseInfo from "@/components/app/collections/request/response/meta-data/response-info/ResponseInfo";
import { Separator } from "@/components/ui/separator";
import ResponseMetaWrapper from "@/components/app/collections/request/response/meta-data/ResponseMetaWrapper";

const ResponseMetaData = memo(() => {
  return (
    <ResponseMetaWrapper>
      <p className="select-none text-secondary-foreground">Response</p>
      <div className="h-full py-3">
        <Separator orientation="vertical" />
      </div>
      <MetaDataTab />
      <span className="ml-auto"></span>
      <ResponseInfo />
      <ResponsCollapseButton />
    </ResponseMetaWrapper>
  );
});

ResponseMetaData.displayName = "Response meta data";

export default ResponseMetaData;
