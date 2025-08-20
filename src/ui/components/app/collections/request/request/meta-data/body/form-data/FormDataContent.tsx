import { memo, useCallback } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewData from "@/components/AddNewData";
import { useAppDispatch } from "@/context/redux/hooks";
import { addBodyFormData } from "@/context/redux/request-response/thunks/body-form-data";

const FormDataContent = memo(() => {
  const dispatch = useAppDispatch();
  const handleAddNewMetaData = useCallback(
    () => dispatch(addBodyFormData()),
    [dispatch]
  );

  return (
    <>
      <MetaTable />
      <AddNewData onClick={handleAddNewMetaData} label="Add Form Data" />
    </>
  );
});

FormDataContent.displayName = "Request body FormData";

export default FormDataContent;
