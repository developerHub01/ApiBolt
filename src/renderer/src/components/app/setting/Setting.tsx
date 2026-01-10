import { lazy, Suspense, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
const SettingRoot = lazy(() => import("@/components/app/setting/SettingRoot"));
import { AnimatedDialogContentWrapper } from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { loadSettings } from "@/context/redux/setting/thunks/setting";
import SettingProvider from "@/context/setting/SettingProvider";
import { selectIsSettingOpen } from "@/context/redux/setting/selectors/setting";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import SettingThemeProvider from "@/context/setting/theme/SettingThemeProvider";
import SettingFallback from "@/fallback/SettingFallback";
import { loadSettingsRequest } from "@/context/redux/setting-request/thunks/setting";

const Setting = () => {
  const dispatch = useAppDispatch();
  const isSettingOpen = useAppSelector(selectIsSettingOpen);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsSettingOpen(false)),
    [dispatch],
  );

  return (
    <SettingProviderStack>
      <AnimatedDialog isOpen={isSettingOpen} onClose={handleClose}>
        <AnimatedDialogContentWrapper className="max-w-3xl">
          <Suspense fallback={<SettingFallback />}>
            <SettingRoot />
          </Suspense>
        </AnimatedDialogContentWrapper>
      </AnimatedDialog>
      <SettingLoader />
    </SettingProviderStack>
  );
};

const SettingLoader = () => {
  const activeProjectId = useAppSelector(selectActiveProjectId);

  const dispatch = useAppDispatch();
  useEffect(() => {
    Promise.all([dispatch(loadSettings()), dispatch(loadSettingsRequest())]);
  }, [dispatch, activeProjectId]);

  return null;
};

interface SettingProviderStackProps {
  children: React.ReactNode;
}

const SettingProviderStack = ({ children }: SettingProviderStackProps) => {
  return (
    <SettingProvider>
      <SettingThemeProvider>{children}</SettingThemeProvider>
    </SettingProvider>
  );
};

export default Setting;
