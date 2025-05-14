import { memo } from "react";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import MetaTable from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaDataWrapper";
import AddNewData from "@/components/AddNewData";

const Params = memo(() => {
  const { handleAddNewParam } = useRequestResponse();

  return (
    <MetaDataWrapper label="Query Params">
      <MetaTable />
      <AddNewData onClick={handleAddNewParam} label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
