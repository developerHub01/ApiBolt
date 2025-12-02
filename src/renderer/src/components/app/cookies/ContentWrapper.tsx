import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  open: boolean;
  id: string;
  children: React.ReactNode;
}

const ContentWrapper = memo(({ open, id, children }: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="p-3 border-2 border-dashed rounded-lg flex flex-col gap-3"
          key={id}
          style={{
            transformOrigin: "top center"
          }}
          initial={{
            opacity: 0,
            filter: "blur(5px)"
          }}
          animate={{
            opacity: 1,
            filter: "blur(0)"
          }}
          exit={{
            opacity: 0.5,
            filter: "blur(5px)"
          }}
          transition={{
            duration: 0.5,
            ease: "anticipate"
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default ContentWrapper;
