import { memo } from "react";
import LocalPasswordProtector from "@/components/app/local-password/LocalPasswordProtector";
import LocalPasswordOption from "@/components/app/local-password/LocalPasswordOption";
import LocalPasswordChange from "@/components/app/local-password/LocalPasswordChange";
import { useLocalPassword } from "@/context/local-password/LocalPasswordProvider";
import { AnimatePresence } from "motion/react";

const LocalPassowrdContent = memo(() => {
  const { stage } = useLocalPassword();
  if (!stage) return null;

  return (
    <AnimatePresence>
      {stage === "protect" ? (
        <LocalPasswordProtector />
      ) : stage === "change" ? (
        <LocalPasswordChange />
      ) : (
        <LocalPasswordOption />
      )}
    </AnimatePresence>
  );
});

export default LocalPassowrdContent;
