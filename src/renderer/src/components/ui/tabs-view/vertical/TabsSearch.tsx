import { AnimatePresence, motion } from "motion/react";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";
import TabsView from "@/components/ui/tabs-view/TabsView";

const TabsSearch = () => {
  const { tabList } = useTabsView();

  return (
    <AnimatePresence>
      {Boolean(tabList?.length) && (
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
          <TabsView.SearchBar />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabsSearch;
