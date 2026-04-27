import { lazy, Suspense, useCallback } from "react";
import {
  AnimatedDialog,
  AnimatedDialogContentWrapper,
} from "@/components/ui/animated-dialog";
import SettingFallback from "@/fallback/SettingFallback";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectIsAppInfoOpen } from "@/context/redux/app-info/selectors/app-info";
import { handleChangeIsInfoOpen } from "@/context/redux/app-info/app-info-slice";
const AppInfoRoot = lazy(() => import("@/components/app/app-info/AppInfoRoot"));

const AppInfo = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsAppInfoOpen);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsInfoOpen(false)),
    [dispatch],
  );

  return (
    <AnimatedDialog isOpen={isOpen} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-3xl">
        <Suspense fallback={<SettingFallback />}>
          <AppInfoRoot />
        </Suspense>
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
};

export default AppInfo;
