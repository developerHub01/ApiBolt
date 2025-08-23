import { memo } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import AddNewMetaData from "@/components/app/collections/request/request/meta-data/AddNewMetaData";

const Params = memo(() => {
  return (
    <MetaDataWrapper label="Query Params">
      <MetaTable />
      <AddNewMetaData label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
