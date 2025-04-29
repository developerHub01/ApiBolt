import React from "react";
import AddNewHeader from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/headers/AddNewHeader";
import HeaderList from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/headers/HeaderList";
import MetaDataWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataWrapper";

const Headers = () => {
  return (
    <MetaDataWrapper>
      <p className="text-foreground text-sm select-none">Headers</p>
      <HeaderList />
      <AddNewHeader />
    </MetaDataWrapper>
  );
};

export default Headers;
