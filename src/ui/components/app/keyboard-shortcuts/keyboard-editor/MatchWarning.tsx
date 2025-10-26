import { motion, AnimatePresence } from "motion/react";

interface Props {
  show: boolean;
}

const MatchWarning = ({ show }: Props) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="text-xs text-destructive"
          style={{
            transformOrigin: "center",
          }}
        >
          This keybinding already exist, try different.
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default MatchWarning;
