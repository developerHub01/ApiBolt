import { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";
import { selectMetaDataByCheckingInheritance } from "@/context/redux/request-response/selectors/meta-request";
import { handleToggleShowHiddenHeaderHeaders } from "@/context/redux/request-response/request-response-slice";
import { selectShowHiddenHeader } from "@/context/redux/request-response/selectors/headers";

const LabelPrefix = memo(() => {
  const dispatch = useAppDispatch();
  const showHiddenHeader = useAppSelector(selectShowHiddenHeader);
  const hiddenHeader =
    useAppSelector(
      selectMetaDataByCheckingInheritance({
        type: "hiddenHeaders",
      })
    ) ?? [];

  const handleToggle = () => dispatch(handleToggleShowHiddenHeaderHeaders());

  if (!hiddenHeader.length) return;

  return (
    <button
      className="select-none flex items-center gap-2 [&>svg]:size-3.5 text-xs px-2 py-1 bg-accent rounded-full cursor-pointer"
      onClick={handleToggle}
    >
      {showHiddenHeader ? <ShowIcon /> : <HideIcon />}
      {showHiddenHeader
        ? `${hiddenHeader.length} hidden`
        : "Hide auto-generated headers"}
    </button>
  );
});

export default LabelPrefix;
