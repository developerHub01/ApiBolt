import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import SettingTop from "@/components/app/setting/content/SettingTop";
import SettingContent from "@/components/app/setting/content/SettingContent";
import SettingBottom from "@/components/app/setting/content/SettingBottom";
import { AnimatedDialogContentWrapper } from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { loadSettings } from "@/context/redux/setting/thunks/setting";
import SettingProvider from "@/context/setting/SettingProvider";
import { selectIsSettingOpen } from "@/context/redux/setting/selectors/setting";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import SettingThemeProvider from "@/context/setting/theme/SettingThemeProvider";

const Setting = () => {
  const dispatch = useAppDispatch();
  const isSettingOpen = useAppSelector(selectIsSettingOpen);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsSettingOpen(false)),
    [dispatch]
  );

  return (
    <SettingProviderStack>
      <AnimatedDialog isOpen={isSettingOpen} onClose={handleClose}>
        <AnimatedDialogContentWrapper className="max-w-3xl">
          <SettingTop />
          <SettingContent />
          <SettingBottom />
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
    dispatch(loadSettings());
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
