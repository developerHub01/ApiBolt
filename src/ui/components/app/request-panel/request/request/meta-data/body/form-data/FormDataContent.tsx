import { memo } from "react";
import { useRequestMetaTable } from "@/context/request/RequestMetaTableProvider";
import MetaTable from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTable";
import AddNewData from "@/components/AddNewData";

const FormDataContent = memo(() => {
  const { handleAddNewMetaData } = useRequestMetaTable();

  return (
    <>
      <MetaTable />
      <AddNewData
        onClick={() => handleAddNewMetaData("form-data")}
        label="Add Form Data"
      />
    </>
  );
});

FormDataContent.displayName = "Request body FormData";

export default FormDataContent;
