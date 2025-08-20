import { memo, useCallback } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import AddNewData from "@/components/AddNewData";
import { useAppDispatch } from "@/context/redux/hooks";
import { addParams } from "@/context/redux/request-response/thunks/params";

const Params = memo(() => {
  const dispatch = useAppDispatch();
  const handleAddNewMetaData = useCallback(
    () => dispatch(addParams()),
    [dispatch]
  );

  return (
    <MetaDataWrapper label="Query Params">
      <MetaTable />
      <AddNewData onClick={handleAddNewMetaData} label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
