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
    id: "body",
    label: "Body",
  },
  {
    id: "authorization",
    label: "Authorization",
  },
];

const MetaDataTab = memo(() => {
  const {
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
            if (item.count && !params.length) delete item.count;
            else if (item.count !== params.length) item.count = params.length;
          } else if (item.id === "headers") {
            const totalHeaders = headers.length + hiddenHeaders.length;
            if (item.count && !totalHeaders) delete item.count;
            else if (item.count !== totalHeaders) item.count = totalHeaders;
          }

          return item;
        }),
    [activeTabList, params, headers, hiddenHeaders]
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
