import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectIndentationSizeGlobal,
  selectIndentationSizeLocal,
} from "@/context/redux/setting/selectors/setting";
import { checkApplyingCodeFont } from "@/utils/settings.utils";

const useCheckApplyingCodeIndentationSize = (): number => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const global = useAppSelector(selectIndentationSizeGlobal);
  const local = useAppSelector(selectIndentationSizeLocal);

  const defaultSize = DEFAULT_SETTINGS.indentationSize;

  return checkApplyingCodeFont({
    activeProjectId,
    localCodeFont: local,
    globalCodeFont: global,
    defaultCodeFont: defaultSize,
  });
};

export default useCheckApplyingCodeIndentationSize;
