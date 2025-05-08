import { memo } from "react";
import { useRequestMetaTable } from "@/context/request/RequestMetaTableProvider";
import MetaTable from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTable";
import AddNew from "@/components/app/request-panel/request/request/meta-data/meta-table/AddNew";

const XWWWFormUrlencodedContent = memo(() => {
  const { handleAddNewMetaData } = useRequestMetaTable();

  return (
    <>
      <MetaTable />
      <AddNew
        onClick={() => handleAddNewMetaData("x-www-form-urlencoded")}
        label="Add Form Data"
      />
    </>
  );
});
XWWWFormUrlencodedContent.displayName = "X www form urlencoded content";

export default XWWWFormUrlencodedContent;
