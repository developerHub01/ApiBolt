import { memo } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import AddNewMetaData from "@/components/app/collections/request/request/meta-data/AddNewMetaData";
import LabelPrefixHidden from "@/components/app/collections/request/request/meta-data/meta-table/LabelPrefixHidden";

const Params = memo(() => {
  return (
    <MetaDataWrapper
      label="Query Params"
      labelPrefix={<LabelPrefixHidden type="param" />}
    >
      <MetaTable />
      <AddNewMetaData label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
