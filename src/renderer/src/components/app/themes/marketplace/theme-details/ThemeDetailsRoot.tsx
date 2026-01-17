import {
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
} from "@/components/ui/animated-dialog";
import LoadThemeDetails from "@/components/app/themes/marketplace/theme-details/theme-content/LoadThemeDetails";
import ThemeDetailsContent from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeDetailsContent";
import ThemeDetailsTop from "@/components/app/themes/marketplace/theme-details/ThemeDetailsTop";
import ThemeDetailsBottom from "@/components/app/themes/marketplace/theme-details/ThemeDetailsBottom";

const ThemeDetailsRoot = () => {
  return (
    <>
      <ThemeDetailsTop />
      <AnimatedDialogContent>
        <AnimatedDialogContentScroll>
          <ThemeDetailsContent />
        </AnimatedDialogContentScroll>
      </AnimatedDialogContent>
      <ThemeDetailsBottom />
      <LoadThemeDetails />
    </>
  );
};

export default ThemeDetailsRoot;
