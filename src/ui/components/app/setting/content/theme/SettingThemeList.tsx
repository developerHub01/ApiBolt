import { useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMetaList,
  selectThemeMetaLoaded,
} from "@/context/redux/theme/selectors/theme";
import SettingThemeCard from "@/components/app/setting/content/theme/SettingThemeCard";
import SettingUseGlobalThemeCard from "@/components/app/setting/content/theme/SettingUseGlobalThemeCard";
import { useSetting } from "@/context/setting/SettingProvider";

const SettingThemeList = () => {
  const metaList = useAppSelector(selectThemeMetaList);
  const isLoaded = useAppSelector(selectThemeMetaLoaded);
  const { activeTab } = useSetting();

  if (!isLoaded) return <h1>loading....</h1>;

  return (
    <section className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-2.5">
      {activeTab === "project" && <SettingUseGlobalThemeCard />}
      {metaList.map((meta) => (
        <SettingThemeCard key={meta.id} {...meta} />
      ))}
    </section>
  );
};

export default SettingThemeList;
