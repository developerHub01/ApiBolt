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
  count?: number;
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
    id: "authorization",
    label: "Authorization",
  },
  {
    id: "body",
    label: "Body",
  },
];

const MetaDataTab = memo(() => {
  const {
    selectedTab,
    activeMetaTab,
    handleChangeActiveMetaTab,
    activeTabList,
    params,
    hiddenHeaders,
    headers,
  } = useRequestResponse();

  const tabListWithActivity = useMemo(
    () =>
      tabList
        .map((item) => ({
          ...item,
          isActive: !!activeTabList[item.id],
        }))
        .map((item) => {
          if (item.id === "params") {
            if (item.count && !params[selectedTab]?.length) delete item.count;
            else if (item.count !== params[selectedTab]?.length)
              item.count = params[selectedTab].filter(
                (param) => !param.hide
              )?.length;
          } else if (item.id === "headers") {
            const totalHeaders =
              headers[selectedTab]?.filter((header) => !header.hide)?.length +
              hiddenHeaders[selectedTab]?.length;
            if (item.count && !totalHeaders) delete item.count;
            else if (item.count !== totalHeaders) item.count = totalHeaders;
          }

          return item;
        }),
    [activeTabList, params, selectedTab, headers, hiddenHeaders]
  );

  return (
    <>
      <SelectV1
        list={tabList}
        value={activeMetaTab[selectedTab] ?? "params"}
        handleChange={(value) =>
          handleChangeActiveMetaTab(value as TActiveTabType)
        }
        className="block md:hidden"
      />
      <TabV1
        list={tabListWithActivity}
        activeTab={activeMetaTab[selectedTab] ?? "params"}
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
