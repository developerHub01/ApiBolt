import { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { Eye as ShowIcon, EyeOff as HideIcon } from "lucide-react";
import {
  selectMetaDataByCheckingInheritance,
  selectShowHiddenMetaData,
} from "@/context/redux/request-response/selectors/meta-request";
import { toggleShowHiddenMetaData } from "@/context/redux/request-response/thunks/show-hidden-meta-data";

interface Props {
  type: "header" | "param";
}

const LabelPrefixHidden = memo(({ type }: Props) => {
  const dispatch = useAppDispatch();
  const showHiddenData = useAppSelector(selectShowHiddenMetaData(type));
  const hiddenData =
    useAppSelector(
      selectMetaDataByCheckingInheritance({
        type: type === "header" ? "hiddenHeaders" : "hiddenParams",
      })
    ) ?? [];

  const handleToggle = () =>
    dispatch(
      toggleShowHiddenMetaData({
        type,
      })
    );

  if (!hiddenData.length) return;

  return (
    <button
      className="select-none flex items-center gap-2 [&>svg]:size-3.5 text-xs px-2 py-1 bg-accent rounded-full cursor-pointer"
      onClick={handleToggle}
    >
      {showHiddenData ? <ShowIcon /> : <HideIcon />}
      {showHiddenData
        ? `${hiddenData.length} hidden`
        : `Hide auto-generated ${type}s`}
    </button>
  );
});

export default LabelPrefixHidden;
