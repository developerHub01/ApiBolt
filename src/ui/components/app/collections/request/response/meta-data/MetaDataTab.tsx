import { memo, useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";
import { useResponse } from "@/context/collections/request/ResponseProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";

interface TabItemInterface {
  id: string;
  label: string;
  count?: number;
}

const tabList: Array<TabItemInterface> = [
  {
    id: "body",
    label: "Body",
  },
  {
    id: "cookies",
    label: "Cookies",
  },
  {
    id: "headers",
    label: "Headers",
  },
  {
    id: "history",
    label: "History",
  },
];

const MetaDataTab = memo(() => {
  const { activeMetaTab, handleChangeActiveMetaTab } = useResponse();
  const response = useAppSelector(selectResponse);

  const tabListWithActivity = useMemo(() => {
    if (!response) return [tabList.at(-1) as TabItemInterface];

    return tabList.map((item) => {
      if (item.id === "cookies") {
        item.count = response?.cookies?.length ?? 0;
      } else if (item.id === "headers") {
        item.count = Object.keys(response?.headers ?? {}).length;
      }
      return item;
    });
  }, [response]);

  const list = useMemo(() => {
    if (response) return [...tabList];
    return [tabList.at(-1) as TabItemInterface];
  }, [response]);

  return (
    <>
      <SelectV1
        list={list}
        value={activeMetaTab}
        handleChange={handleChangeActiveMetaTab}
        className="block md:hidden"
      />
      <TabV1
        list={tabListWithActivity}
        activeTab={activeMetaTab}
        handleSelect={handleChangeActiveMetaTab}
        className="hidden md:flex"
      />
    </>
  );
});
MetaDataTab.displayName = "MetaData tab";

export default MetaDataTab;
