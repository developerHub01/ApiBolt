import React from "react";
import BodyDetails from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyDetails";
import BodyTypeSelector from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyTypeSelector";
import BodyRawDataTypeSelector from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyRawDataTypeSelector";
import CodeFormatter from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/raw/CodeFormatter";

const Body = () => {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-3 items-center flex-wrap">
        <BodyTypeSelector />
        <BodyRawDataTypeSelector />
        
        {/* format code block */}
        <CodeFormatter />
      </div>
      <BodyDetails />
    </div>
  );
};

export default Body;
