import { memo, useCallback, useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { TActiveTabType } from "@shared/types/request-response.types";
import { updateRequestMetaTab } from "@/context/redux/request-response/thunks/request-meta-tab";
import {
  selectActiveMetaTab,
  selectActiveMetaTabList,
  selectMetaData,
} from "@/context/redux/request-response/selectors/meta-request";

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
    id: "authorization",
    label: "Authorization",
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
    id: "code",
    label: "Code",
  },
];

const MetaDataTab = memo(() => {
  const dispatch = useAppDispatch();
  const activeTabList = useAppSelector(selectActiveMetaTabList);
  const activeMetaTab = useAppSelector(selectActiveMetaTab);
  const params = useAppSelector(state =>
    selectMetaData(state, {
      type: "params",
    }),
  );
  const hiddenParams = useAppSelector(state =>
    selectMetaData(state, {
      type: "hiddenParams",
    }),
  );
  const headers = useAppSelector(state =>
    selectMetaData(state, {
      type: "headers",
    }),
  );
  const hiddenHeaders = useAppSelector(state =>
    selectMetaData(state, {
      type: "hiddenHeaders",
    }),
  );

  const tabListWithActivity = useMemo(() => {
    const hiddenParamsCount = hiddenParams?.length ?? 0;
    const paramsCount = params?.filter(param => param.isCheck)?.length ?? 0;

    const headersCount = headers?.filter(header => header.isCheck)?.length ?? 0;
    const hiddenHeadersCount = hiddenHeaders?.length ?? 0;

    return tabList
      .map(item => ({
        ...item,
        isActive: Boolean(activeTabList[item.id]),
      }))
      .map(item => {
        if (item.id === "params") {
          if (item.count && !params?.length) delete item.count;
          else if (item.count !== paramsCount) {
            const totalParams = paramsCount + hiddenParamsCount;
            if (item.count && !totalParams) delete item.count;
            else if (item.count !== totalParams) item.count = totalParams;
          }
        } else if (item.id === "headers") {
          const totalHeaders = headersCount + hiddenHeadersCount;
          if (item.count && !totalHeaders) delete item.count;
          else if (item.count !== totalHeaders) item.count = totalHeaders;
        }

        return item;
      });
  }, [
    hiddenParams?.length,
    params,
    headers,
    hiddenHeaders?.length,
    activeTabList,
  ]);

  const handleChange = useCallback(
    (tab: TActiveTabType) =>
      dispatch(
        updateRequestMetaTab({
          activeMetaTab: tab,
        }),
      ),
    [dispatch],
  );

  return (
    <>
      <SelectV1
        list={tabListWithActivity}
        value={activeMetaTab ?? "url"}
        handleChange={value => handleChange(value as TActiveTabType)}
        className="block md:hidden"
      />
      <TabV1
        list={tabListWithActivity}
        activeTab={activeMetaTab ?? "url"}
        handleSelect={value => handleChange(value as TActiveTabType)}
        className="hidden md:flex select-none"
      />
    </>
  );
});
MetaDataTab.displayName = "Meta data tab";

export default MetaDataTab;
