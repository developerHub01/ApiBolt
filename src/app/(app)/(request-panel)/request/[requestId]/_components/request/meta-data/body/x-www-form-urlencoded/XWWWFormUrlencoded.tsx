import React from "react";
import MetaDataWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaDataWrapper";
import XWWWFormUrlencodedContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/x-www-form-urlencoded/XWWWFormUrlencodedContent";

const XWWWFormUrlencoded = () => {
  return (
    <MetaDataWrapper>
      <XWWWFormUrlencodedContent />
    </MetaDataWrapper>
  );
};

export default XWWWFormUrlencoded;
