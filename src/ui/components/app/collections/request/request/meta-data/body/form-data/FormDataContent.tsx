import { memo, useCallback } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewData from "@/components/AddNewData";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleAddMetaData } from "@/context/redux/request-response/request-response-slice";

const FormDataContent = memo(() => {
  const dispatch = useAppDispatch();
  const handleAddNewMetaData = useCallback(() => {
    dispatch(
      handleAddMetaData({
        type: "form-data",
      })
    );
  }, [dispatch]);

  return (
    <>
      <MetaTable />
      <AddNewData onClick={handleAddNewMetaData} label="Add Form Data" />
    </>
  );
});

FormDataContent.displayName = "Request body FormData";

export default FormDataContent;
