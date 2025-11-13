import { useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMetaList,
  selectThemeMetaLoaded,
} from "@/context/redux/theme/selectors/theme";
import SettingThemeCard from "@/components/app/setting/content/theme/SettingThemeCard";

const SettingThemeList = () => {
  const metaList = useAppSelector(selectThemeMetaList);
  const isLoaded = useAppSelector(selectThemeMetaLoaded);

  if (!isLoaded) return <h1>loading....</h1>;

  return (
    <section className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-2.5">
      {metaList.map((meta) => (
        <SettingThemeCard key={meta.id} {...meta} />
      ))}
    </section>
  );
};

export default SettingThemeList;
