import { useAppSelector } from "@/context/redux/hooks";
import { AnimatePresence, motion } from "motion/react";
import TabSearchBar from "@/components/app/tab-sidebar/TabSearchBar";

const TabSearch = () => {
  const showTabSearch = useAppSelector(state =>
    Boolean(state.requestResponse.tabList?.length ?? 0),
  );

  return (
    <AnimatePresence>
      {showTabSearch && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          exit={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            type: "spring",
            ease: "anticipate",
          }}
        >
          <TabSearchBar />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabSearch;
