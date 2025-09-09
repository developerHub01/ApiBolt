import { memo } from "react";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import { useRequestHeader } from "@/context/collections/request/RequestHeaderProvider";
import AddNewMetaData from "@/components/app/collections/request/request/meta-data/AddNewMetaData";
import LabelPrefix from "@/components/app/collections/request/request/meta-data/headers/LabelPrefix";

const Headers = memo(() => {
  const { showHiddenHeader } = useRequestHeader();

  return (
    <MetaDataWrapper label="Headers" labelPrefix={<LabelPrefix />}>
      <MetaTable showHiddenData={showHiddenHeader} />
      <AddNewMetaData label="Add New Headers" />
    </MetaDataWrapper>
  );
});
Headers.displayName = "Headers";

export default Headers;
