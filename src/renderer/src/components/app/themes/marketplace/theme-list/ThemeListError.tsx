import Empty from "@/components/ui/empty";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemesSearchResultError } from "@/context/redux/status/selectors/theme-marketplace";
import noInernetAnimationData from "@/assets/lottie/no-internet.json";

const ThemeListError = () => {
  const errorMessage = useAppSelector(selectThemesSearchResultError);

  if (errorMessage !== "ERR_NETWORK") return null;

  return (
    <Empty
      label="Network Error"
      description="Check your internet connection and try again"
      animationData={noInernetAnimationData}
      showFallback
      innerClassName="w-80"
      fallbackClassName="w-65"
      className="h-full"
      key="network-error"
    />
  );
};

export default ThemeListError;
