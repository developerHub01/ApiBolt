import React from "react";
import MetaDataWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaDataWrapper";
import FormDataContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/form-data/FormDataContent";

const FormData = () => {
  return (
    <MetaDataWrapper>
      <FormDataContent />
    </MetaDataWrapper>
  );
};

export default FormData;
