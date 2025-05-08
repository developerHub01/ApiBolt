import { memo, useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";
import {
  useRequestResponse,
  type TActiveTabType,
} from "@/context/request/RequestResponseProvider";

const tabList: Array<{
  id: TActiveTabType;
  label: string;
  isActive?: boolean;
}> = [
  {
    id: "params",
    label: "Params",
  },
  {
    id: "headers",
    label: "Headers",
  },
  {
    id: "body",
    label: "Body",
  },
  {
    id: "authorization",
    label: "Authorization",
  },
];

const MetaDataTab = memo(() => {
  const { activeMetaTab, handleChangeActiveMetaTab, activeTabList } =
    useRequestResponse();

  const tabListWithActivity = useMemo(
    () =>
      tabList.map((item) => ({
        ...item,
        isActive: !!activeTabList[item.id],
      })),
    [activeTabList]
  );

  return (
    <>
      <SelectV1
        list={tabList}
        value={activeMetaTab}
        handleChange={(value) =>
          handleChangeActiveMetaTab(value as TActiveTabType)
        }
        className="block md:hidden"
      />
      <TabV1
        list={tabListWithActivity}
        activeTab={activeMetaTab}
        handleSelect={(value) =>
          handleChangeActiveMetaTab(value as TActiveTabType)
        }
        className="hidden md:flex select-none"
      />
    </>
  );
});
MetaDataTab.displayName = "Meta data tab";

export default MetaDataTab;
