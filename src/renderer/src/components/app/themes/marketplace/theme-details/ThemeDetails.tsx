import { lazy, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceDetailsOpen } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSelectedThemeId } from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import {
  AnimatedDialog,
  AnimatedDialogContentWrapper,
} from "@/components/ui/animated-dialog";
import ThemeDetailsFallback from "@renderer/fallback/ThemeDetailsFallback";
const ThemeDetailsRoot = lazy(
  () =>
    import("@/components/app/themes/marketplace/theme-details/ThemeDetailsRoot"),
);

const ThemeDetails = () => {
  const dispatch = useAppDispatch();
  const selectedThemeId = useAppSelector(selectThemeMarketplaceDetailsOpen);

  const handleClose = () => dispatch(handleChangeSelectedThemeId());

  return (
    <AnimatedDialog isOpen={selectedThemeId} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-3xl">
        <Suspense fallback={<ThemeDetailsFallback />}>
          <ThemeDetailsRoot />
        </Suspense>
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
};

export default ThemeDetails;
