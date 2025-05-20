import { memo, useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";
import { useResponse } from "@/context/request/ResponseProvider";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

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
  const { response, selectedTab } = useRequestResponse();

  console.log("============MetaDataTab==========");

  const tabListWithActivity = useMemo(
    () =>
      tabList.map((item) => {
        if (item.id === "cookies") {
          item.count = response[selectedTab]?.cookies?.length ?? 0;
        } else if (item.id === "headers") {
          item.count = Object.keys(response[selectedTab]?.headers ?? {}).length;
        }
        return item;
      }),
    [response, selectedTab]
  );

  if (!response || !response[selectedTab]) return null;

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
