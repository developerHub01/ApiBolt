import { memo, useCallback, useState } from "react";
import SettingHttpList from "@/components/app/setting/content/http-status/SettingHttpList";
import SettingHttpSearch from "@/components/app/setting/content/http-status/SettingHttpSearch";
import SettingHttpSearchResult from "@/components/app/setting/content/http-status/SettingHttpSearchResult";

const SettingHttpStatusContent = memo(() => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChangeSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <>
      <SettingHttpSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      {searchTerm ? (
        <SettingHttpSearchResult value={searchTerm} />
      ) : (
        <SettingHttpList />
      )}
    </>
  );
});

export default SettingHttpStatusContent;
