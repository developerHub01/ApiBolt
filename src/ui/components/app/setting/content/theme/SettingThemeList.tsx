import { useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMetaList,
  selectThemeMetaLoaded,
} from "@/context/redux/theme/selectors/theme";
import SettingThemeCard from "@/components/app/setting/content/theme/SettingThemeCard";
import SettingUseGlobalThemeCard from "@/components/app/setting/content/theme/SettingUseGlobalThemeCard";
import { useSetting } from "@/context/setting/SettingProvider";
import { AnimatePresence, motion } from "motion/react";
import SettingThemeSkeleton from "@/components/app/setting/content/theme/SettingThemeSkeleton";

const SettingThemeList = () => {
  const metaList = useAppSelector(selectThemeMetaList);
  const isLoaded = useAppSelector(selectThemeMetaLoaded);
  const { activeTab } = useSetting();

  return (
    <AnimatePresence>
      {isLoaded ? (
        <motion.section
          initial={{
            opacity: 0,
            filter: "blur(5px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            filter: "blur(5px)",
          }}
          className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-5"
        >
          {activeTab === "project" && <SettingUseGlobalThemeCard />}
          {metaList.map((meta) => (
            <SettingThemeCard key={meta.id} {...meta} />
          ))}
        </motion.section>
      ) : (
        <SettingThemeSkeleton />
      )}
    </AnimatePresence>
  );
};

export default SettingThemeList;
