import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceDetailsOpen } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSelectedThemeId } from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import {
  AnimatedDialog,
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
  AnimatedDialogContentWrapper,
} from "@/components/ui/animated-dialog";
import LoadThemeDetails from "@/components/app/themes/marketplace/[id]/theme-details/theme-content/LoadThemeDetails";
import ThemeDetailsContent from "@/components/app/themes/marketplace/[id]/theme-details/theme-content/ThemeDetailsContent";
import ThemeDetailsTop from "@/components/app/themes/marketplace/[id]/theme-details/ThemeDetailsTop";
import ThemeDetailsBottom from "@/components/app/themes/marketplace/[id]/theme-details/ThemeDetailsBottom";

const ThemeDetails = () => {
  const dispatch = useAppDispatch();
  const selectedThemeId = useAppSelector(selectThemeMarketplaceDetailsOpen);

  const handleClose = () => dispatch(handleChangeSelectedThemeId());

  return (
    <AnimatedDialog isOpen={selectedThemeId} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-3xl">
        <ThemeDetailsTop />
        <AnimatedDialogContent>
          <AnimatedDialogContentScroll>
            <ThemeDetailsContent />
          </AnimatedDialogContentScroll>
        </AnimatedDialogContent>
        <ThemeDetailsBottom />
      </AnimatedDialogContentWrapper>
      <LoadThemeDetails />
    </AnimatedDialog>
  );
};

export default ThemeDetails;
