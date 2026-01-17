import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@renderer/context/redux/hooks";
import { selectIsThemePreviewModeOn } from "@renderer/context/redux/theme/selectors/theme";
import { motion, AnimatePresence } from "motion/react";
import { exitPreviewTheme } from "@renderer/context/redux/theme-marketplace/thunks/theme-marketplace";
import useCustomToast from "@renderer/hooks/ui/use-custom-toast";

const ThemePreviewMode = memo(() => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const isOn = useAppSelector(selectIsThemePreviewModeOn);

  const handleClose = useCallback(async () => {
    const response = await dispatch(exitPreviewTheme()).unwrap();
    return toast({
      type: response ? "success" : "error",
      title: response
        ? "Preview toggled successfully"
        : "Preview toggle failed",
      description: response
        ? "theme preview toggled"
        : "something went wrong while toggle theme preview",
    });
  }, [dispatch, toast]);

  return (
    <AnimatePresence>
      {isOn && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="p-2 pt-1 bg-accent/50 border-t-2"
        >
          <div className="flex items-center justify-center gap-3 max-w-3xl mx-auto text-xs">
            <p className="text-accent-foreground">
              Currently you are in theme preview mode.
            </p>
            <Button
              type="button"
              size={"xs"}
              className="px-3 h-6 rounded-md capitalize"
              onClick={handleClose}
            >
              Exit preview mode
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default ThemePreviewMode;
