import { AnimatedDialogBottom } from "@/components/ui/animated-dialog";
import { selectAppInfo } from "@/context/redux/app-info/selectors/app-info";
import { useAppSelector } from "@/context/redux/hooks";

const AppInfoFooter = () => {
  const appInfo = useAppSelector(selectAppInfo);

  return (
    <AnimatedDialogBottom>
      <p className="line-clamp-1 text-center max-w-lg text-sm">
        {appInfo.tagline}
      </p>
    </AnimatedDialogBottom>
  );
};

export default AppInfoFooter;
