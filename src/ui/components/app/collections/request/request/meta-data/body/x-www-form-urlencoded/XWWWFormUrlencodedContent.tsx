import { memo, useCallback } from "react";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import AddNewData from "@/components/AddNewData";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleAddMetaData } from "@/context/redux/request-response/request-response-slice";

const XWWWFormUrlencodedContent = memo(() => {
  const dispatch = useAppDispatch();
  const handleAddNewMetaData = useCallback(() => {
    dispatch(
      handleAddMetaData({
        type: "x-www-form-urlencoded",
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
XWWWFormUrlencodedContent.displayName = "X www form urlencoded content";

export default XWWWFormUrlencodedContent;
