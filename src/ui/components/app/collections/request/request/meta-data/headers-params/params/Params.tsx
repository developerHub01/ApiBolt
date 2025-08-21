import { memo } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import AddNewData from "@/components/AddNewData";

const Params = memo(() => {
  return (
    <MetaDataWrapper label="Query Params">
      <MetaTable />
      <AddNewData label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
