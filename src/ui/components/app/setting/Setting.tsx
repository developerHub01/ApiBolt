import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import SettingTop from "@/components/app/setting/content/SettingTop";
import SettingContent from "@/components/app/setting/content/SettingContent";
import SettingBottom from "@/components/app/setting/content/SettingBottom";
import { AnimatedDialogContentWrapper } from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";

const Setting = () => {
  const dispatch = useAppDispatch();
  const isSettingOpen = useAppSelector((state) => state.setting.isSettingOpen);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsSettingOpen(false)),
    [dispatch]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Comma") {
        dispatch(handleChangeIsSettingOpen(true));
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  return (
    <AnimatedDialog isOpen={isSettingOpen} onClose={handleClose}>
      <AnimatedDialogContentWrapper>
        <SettingTop />
        <SettingContent />
        <SettingBottom />
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
};

export default Setting;
