import { memo, useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectActiveTabList } from "@/context/redux/request-response/request-response-selector";
import {
  handleChangeActiveMetaTab,
  type TActiveTabType,
} from "@/context/redux/request-response/request-response-slice";

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
];

const MetaDataTab = memo(() => {
  const dispatch = useAppDispatch();
  const activeTabList = useAppSelector(selectActiveTabList);
  const activeMetaTab = useAppSelector(
    (state) =>
      state.requestResponse.activeMetaTab[state.requestResponse.selectedTab!]
  );
  const params = useAppSelector(
    (state) => state.requestResponse.params[state.requestResponse.selectedTab!]
  );
  const hiddenHeaders = useAppSelector(
    (state) =>
      state.requestResponse.hiddenHeaders[state.requestResponse.selectedTab!]
  );
  const headers = useAppSelector(
    (state) => state.requestResponse.headers[state.requestResponse.selectedTab!]
  );

  const tabListWithActivity = useMemo(
    () =>
      tabList
        .map((item) => ({
          ...item,
          isActive: !!activeTabList[item.id],
        }))
        .map((item) => {
          if (item.id === "params") {
            if (item.count && !params?.length) delete item.count;
            else if (item.count !== params?.length)
              item.count = params.filter((param) => !param.hide)?.length;
          } else if (item.id === "headers") {
            const totalHeaders =
              headers?.filter((header) => !header.hide)?.length +
              hiddenHeaders?.length;
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
        value={activeMetaTab ?? "params"}
        handleChange={(value) =>
          dispatch(
            handleChangeActiveMetaTab({
              type: value as TActiveTabType,
            })
          )
        }
        className="block md:hidden"
      />
      <TabV1
        list={tabListWithActivity}
        activeTab={activeMetaTab ?? "params"}
        handleSelect={(value) =>
          dispatch(
            handleChangeActiveMetaTab({
              type: value as TActiveTabType,
            })
          )
        }
        className="hidden md:flex select-none"
      />
    </>
  );
});
MetaDataTab.displayName = "Meta data tab";

export default MetaDataTab;
