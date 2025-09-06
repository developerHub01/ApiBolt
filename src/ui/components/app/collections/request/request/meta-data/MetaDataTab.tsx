import { memo, useCallback, useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectActiveMetaTab,
  selectActiveTabList,
  selectHeaders,
  selectHiddenHeaders,
  selectParams,
} from "@/context/redux/request-response/request-response-selector";
import type { TActiveTabType } from "@/types/request-response.types";
import { updateRequestMetaTab } from "@/context/redux/request-response/thunks/request-meta-tab";

const tabList: Array<{
  id: TActiveTabType;
  label: string;
  isActive?: boolean;
  count?: number;
}> = [
  {
    id: "url",
    label: "API Url",
  },
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
];

const MetaDataTab = memo(() => {
  const dispatch = useAppDispatch();
  const activeTabList = useAppSelector(selectActiveTabList);
  const activeMetaTab = useAppSelector(selectActiveMetaTab);
  const params = useAppSelector(selectParams);
  const hiddenHeaders = useAppSelector(selectHiddenHeaders);
  const headers = useAppSelector(selectHeaders);

  const tabListWithActivity = useMemo(
    () =>
      tabList
        .map((item) => ({
          ...item,
          isActive: Boolean(activeTabList[item.id]),
        }))
        .map((item) => {
          if (item.id === "params") {
            if (item.count && !params?.length) delete item.count;
            else if (item.count !== params?.length)
              item.count = params.filter((param) => param.isCheck)?.length;
          } else if (item.id === "headers") {
            const totalHeaders =
              headers?.filter((header) => header.isCheck)?.length +
              hiddenHeaders?.length;
            if (item.count && !totalHeaders) delete item.count;
            else if (item.count !== totalHeaders) item.count = totalHeaders;
          }

          return item;
        }),
    [activeTabList, params, headers, hiddenHeaders]
  );

  const handleChange = useCallback(
    (tab: TActiveTabType) =>
      dispatch(
        updateRequestMetaTab({
          activeMetaTab: tab,
        })
      ),
    [dispatch]
  );

  return (
    <>
      <SelectV1
        list={tabListWithActivity}
        value={activeMetaTab ?? "url"}
        handleChange={(value) => handleChange(value as TActiveTabType)}
        className="block md:hidden"
      />
      <TabV1
        list={tabListWithActivity}
        activeTab={activeMetaTab ?? "url"}
        handleSelect={(value) => handleChange(value as TActiveTabType)}
        className="hidden md:flex select-none"
      />
    </>
  );
});
MetaDataTab.displayName = "Meta data tab";

export default MetaDataTab;
