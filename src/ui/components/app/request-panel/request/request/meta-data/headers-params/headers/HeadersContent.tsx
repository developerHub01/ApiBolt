import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import MetaDataWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaDataWrapper";
import MetaTable from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTable";
import AddNew from "@/components/app/request-panel/request/request/meta-data/meta-table/AddNew";
import { useRequestHeader } from "@/context/request/RequestHeaderProvider";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";
import { useRequestMetaTable } from "@/context/request/RequestMetaTableProvider";

const HeadersContent = () => {
  const { handleAddNewHeader } = useRequestResponse();
  const { showHiddenHeader } = useRequestHeader();

  return (
    <MetaDataWrapper label="Headers" labelPrefix={<LabelPrefix />}>
      <MetaTable showHiddenData={showHiddenHeader} />
      <AddNew onClick={handleAddNewHeader} label="Add New Headers" />
    </MetaDataWrapper>
  );
};

const LabelPrefix = () => {
  const { showHiddenHeader, handleChangeShowHiddenHeader } = useRequestHeader();
  const { getMetaData } = useRequestMetaTable();

  const hiddenHeader = getMetaData("hiddenHeaders") ?? [];

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

export default HeadersContent;
