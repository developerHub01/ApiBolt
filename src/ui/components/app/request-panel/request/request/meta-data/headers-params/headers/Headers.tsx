import { memo } from "react";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import MetaDataWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTable";
import AddNew from "@/components/app/request-panel/request/request/meta-data/meta-table/AddNew";

const Headers = memo(() => {
  const { handleAddNewHeader } = useRequestResponse();

  return (
    <MetaDataWrapper label="Headers">
      <MetaTable />
      <AddNew onClick={handleAddNewHeader} label="Add New Headers" />
    </MetaDataWrapper>
  );
});
Headers.displayName = "Headers";

export default Headers;
