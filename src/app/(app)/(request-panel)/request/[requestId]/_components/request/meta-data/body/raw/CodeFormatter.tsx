import React from "react";
import ToggleCodeLineWrap from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/raw/ToggleCodeLineWrap";
import BeautifyCode from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/raw/BeautifyCode";

const CodeFormatter = () => {
  return (
    <div className="flex items-center gap-3 ml-auto">
      <ToggleCodeLineWrap />
      <BeautifyCode />
    </div>
  );
};

export default CodeFormatter;
