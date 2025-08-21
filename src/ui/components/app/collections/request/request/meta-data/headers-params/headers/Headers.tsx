import { memo } from "react";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import { useRequestHeader } from "@/context/collections/request/RequestHeaderProvider";
import AddNewData from "@/components/AddNewData";
import LabelPrefix from "@/components/app/collections/request/request/meta-data/headers-params/headers/LabelPrefix";

const Headers = memo(() => {
  const { showHiddenHeader } = useRequestHeader();

  return (
    <MetaDataWrapper label="Headers" labelPrefix={<LabelPrefix />}>
      <MetaTable showHiddenData={showHiddenHeader} />
      <AddNewData label="Add New Headers" />
    </MetaDataWrapper>
  );
});
Headers.displayName = "Headers";

export default Headers;
