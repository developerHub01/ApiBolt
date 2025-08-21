import { memo } from "react";
import { useRequestHeader } from "@/context/collections/request/RequestHeaderProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectMetaData } from "@/context/redux/request-response/request-response-selector";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";

const LabelPrefix = memo(() => {
  const { showHiddenHeader, handleChangeShowHiddenHeader } = useRequestHeader();
  const hiddenHeader = useAppSelector(selectMetaData("hiddenHeaders")) ?? [];

  if (!hiddenHeader.length) return;

  return (
    <button
      className="select-none flex items-center gap-2 [&>svg]:size-3.5 text-xs px-2 py-1 bg-accent rounded-full cursor-pointer"
      onClick={() => handleChangeShowHiddenHeader()}
    >
      {showHiddenHeader ? <ShowIcon /> : <HideIcon />}
      {showHiddenHeader
        ? `${hiddenHeader.length} hidden`
        : "Hide auto-generated headers"}
    </button>
  );
});

export default LabelPrefix;
