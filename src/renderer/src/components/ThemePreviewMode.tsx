import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@renderer/context/redux/hooks";
import { selectIsThemePreviewModeOn } from "@renderer/context/redux/theme/selectors/theme";
import { motion, AnimatePresence } from "motion/react";
import { handleChangeThemePreviewMode } from "@renderer/context/redux/theme/theme-slice";

const ThemePreviewMode = memo(() => {
  const dispatch = useAppDispatch();
  const isOn = useAppSelector(selectIsThemePreviewModeOn);

  const handleClose = () => dispatch(handleChangeThemePreviewMode(false));

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
