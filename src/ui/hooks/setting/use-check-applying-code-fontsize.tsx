import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectCodeFontSizeGlobal,
  selectCodeFontSizeLocal,
} from "@/context/redux/setting/selectors/setting";
import { checkApplyingCodeFontSize } from "@/utils/settings.utils";

const useCheckApplyingCodeFontsize = (): number => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const globalCodeFontSize = useAppSelector(selectCodeFontSizeGlobal);
  const localCodeFontSize = useAppSelector(selectCodeFontSizeLocal);

  const defaultCodeFontSize = DEFAULT_SETTINGS.codeFontSize;

  return checkApplyingCodeFontSize({
    activeProjectId,
    localCodeFontSize,
    globalCodeFontSize,
    defaultCodeFontSize,
  });
};

export default useCheckApplyingCodeFontsize;
