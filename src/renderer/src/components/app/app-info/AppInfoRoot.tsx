import {
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import AppInfoContent from "@/components/app/app-info/AppInfoContent";
import LoadAppInfo from "@/components/app/app-info/LoadAppInfo";
import AppInfoFooter from "@/components/app/app-info/AppInfoFooter";

const AppInfoRoot = () => {
  return (
    <>
      <AnimatedDialogTop>
        <div className="p-2 text-lg font-medium capitalize">App Info</div>
      </AnimatedDialogTop>
      <AnimatedDialogContent>
        <AnimatedDialogContentScroll>
          <AppInfoContent />
        </AnimatedDialogContentScroll>
      </AnimatedDialogContent>
      <AppInfoFooter />
      <LoadAppInfo />
    </>
  );
};

export default AppInfoRoot;
