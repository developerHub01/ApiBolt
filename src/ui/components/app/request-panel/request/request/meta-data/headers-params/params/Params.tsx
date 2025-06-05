import { memo, useCallback } from "react";
import MetaTable from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTable";
import MetaDataWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaDataWrapper";
import AddNewData from "@/components/AddNewData";
import { handleAddMetaData } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch } from "@/context/redux/hooks";

const Params = memo(() => {
  const dispatch = useAppDispatch();
  const handleAddNewMetaData = useCallback(() => {
    dispatch(
      handleAddMetaData({
        type: "params",
      })
    );
  }, [dispatch]);

  return (
    <MetaDataWrapper label="Query Params">
      <MetaTable />
      <AddNewData onClick={handleAddNewMetaData} label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
