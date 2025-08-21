import { memo } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewData from "@/components/AddNewData";
const FormDataContent = memo(() => {
  return (
    <>
      <MetaTable />
      <AddNewData label="Add Form Data" />
    </>
  );
});

FormDataContent.displayName = "Request body FormData";

export default FormDataContent;
