import { memo, useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";
import { useResponse } from "@/context/request/ResponseProvider";
import { useAppSelector } from "@/context/redux/hooks";

const tabList: Array<{
  id: string;
  label: string;
  count?: number;
}> = [
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

const MetaDataTab = memo(() => {
  const { activeMetaTab, handleChangeActiveMetaTab } = useResponse();
  const response = useAppSelector(
    (state) => state.requestResponse.response[state.tabSidebar.selectedTab!]
  );

  const tabListWithActivity = useMemo(
    () =>
      tabList.map((item) => {
        if (item.id === "cookies") {
          item.count = response?.cookies?.length ?? 0;
        } else if (item.id === "headers") {
          item.count = Object.keys(response?.headers ?? {}).length;
        }
        return item;
      }),
    [response]
  );

  if (!response) return null;

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
