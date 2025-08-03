import { memo, useCallback } from "react";
import MetaDataWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/collections/request/request/meta-data/meta-table/MetaTable";
import { useRequestHeader } from "@/context/collections/request/RequestHeaderProvider";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";
import AddNewData from "@/components/AddNewData";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectMetaData } from "@/context/redux/request-response/request-response-selector";
import { addHeaders } from "@/context/redux/request-response/request-response-thunk";

const Headers = memo(() => {
  const dispatch = useAppDispatch();
  const { showHiddenHeader } = useRequestHeader();
  const handleAddNewHeader = useCallback(() => {
    dispatch(addHeaders());
  }, [dispatch]);

  return (
    <MetaDataWrapper label="Headers" labelPrefix={<LabelPrefix />}>
      <MetaTable showHiddenData={showHiddenHeader} />
      <AddNewData onClick={handleAddNewHeader} label="Add New Headers" />
    </MetaDataWrapper>
  );
});
Headers.displayName = "Headers";

const LabelPrefix = () => {
  const { showHiddenHeader, handleChangeShowHiddenHeader } = useRequestHeader();
  const hiddenHeader = useAppSelector(selectMetaData("hiddenHeaders")) ?? [];

  if (!hiddenHeader.length) return;

  return (
    <button
      className="select-none flex items-center gap-1 [&>svg]:size-3.5 text-xs px-2 py-1 bg-accent rounded-full cursor-pointer"
      onClick={() => handleChangeShowHiddenHeader()}
    >
      {showHiddenHeader ? <ShowIcon /> : <HideIcon />}
      {showHiddenHeader
        ? `${hiddenHeader.length} hidden`
        : "Hide auto-generated headers"}
    </button>
  );
};

export default Headers;
