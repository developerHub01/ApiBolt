import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectCodeFontSizeGlobal,
  selectCodeFontSizeLocal,
} from "@/context/redux/setting/selectors/setting";
import { checkApplyingCodeFont } from "@/utils/settings.utils";

const useCheckApplyingCodeFontSize = (): number => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const global = useAppSelector(selectCodeFontSizeGlobal);
  const local = useAppSelector(selectCodeFontSizeLocal);

  const defaultSize = DEFAULT_SETTINGS.codeFontSize;

  return checkApplyingCodeFont({
    activeProjectId,
    localCodeFont: local,
    globalCodeFont: global,
    defaultCodeFont: defaultSize,
  });
};

export default useCheckApplyingCodeFontSize;
