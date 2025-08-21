import { memo } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewData from "@/components/AddNewData";

const XWWWFormUrlencodedContent = memo(() => {
  return (
    <>
      <MetaTable />
      <AddNewData label="Add Form Data" />
    </>
  );
});
XWWWFormUrlencodedContent.displayName = "X www form urlencoded content";

export default XWWWFormUrlencodedContent;
