import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeActiveId } from "@/context/redux/theme/selectors/theme";

const useActiveThemeId = () => {
  const { global: globalThemeId, local: localThemeId } =
    useAppSelector(selectThemeActiveId);

  return localThemeId ?? globalThemeId;
};

export default useActiveThemeId;
