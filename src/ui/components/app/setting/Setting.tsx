import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import SettingTop from "@/components/app/setting/content/SettingTop";
import SettingContent from "@/components/app/setting/content/SettingContent";
import SettingBottom from "@/components/app/setting/content/SettingBottom";
import { AnimatedDialogContentWrapper } from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { loadSettings } from "@/context/redux/setting/setting-thunk";
import SettingProvider from "@/context/setting/SettingProvider";

const Setting = () => {
  const dispatch = useAppDispatch();
  const isSettingOpen = useAppSelector((state) => state.setting.isSettingOpen);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsSettingOpen(false)),
    [dispatch]
  );

  return (
    <SettingProvider>
      <AnimatedDialog isOpen={isSettingOpen} onClose={handleClose}>
        <AnimatedDialogContentWrapper>
          <SettingTop />
          <SettingContent />
          <SettingBottom />
        </AnimatedDialogContentWrapper>
      </AnimatedDialog>
      <SettingLoader />
    </SettingProvider>
  );
};

const SettingLoader = () => {
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch, activeProjectId]);

  return null;
};

export default Setting;
