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

const TAB_LIST: Array<TabItemInterface> = [
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
];

const historyTab: TabItemInterface = {
  id: "history",
  label: "History",
};

const errorTab: TabItemInterface = {
  id: "error",
  label: "Error",
};

const MetaDataTab = memo(() => {
  const { activeMetaTab, handleChangeActiveMetaTab } = useResponse();
  const response = useAppSelector(selectResponse);

  const tabListWithActivity = useMemo(() => {
    const list: Array<TabItemInterface> = [];

    if (response) {
      if (!response.status) list.push(errorTab);
      else {
        TAB_LIST.forEach((item) => {
          if (item.id === "cookies") {
            item.count = response?.cookies?.length ?? 0;
          } else if (item.id === "headers") {
            item.count = Object.keys(response?.headers ?? {}).length;
          }
          list.push(item);
        });
      }
    }

    list.push(historyTab);

    return list;
  }, [response]);

  const tabList = useMemo(() => {
    const list: Array<TabItemInterface> = [];

    if (response) {
      if (!response.status) list.push(errorTab);
      else list.push(...TAB_LIST);
    }

    list.push(historyTab);

    return list;
  }, [response]);

  if (!activeMetaTab) return null;

  return (
    <>
      <SelectV1
        list={tabList}
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
