import { useMemo } from "react";
import TabV1 from "@/components/tab-v1";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import type { TActiveTabType } from "@/types/request-response.types";

interface TabInterface {
  id: TActiveTabType;
  label: string;
  isActive?: boolean;
}

const tabList: Array<TabInterface> = [
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
];

const MetaDataTab = () => {
  const { activeMetaTab, handleChangeActiveMetaTab } = useHistoryDetails();
  const { body } = useAppSelector(selectHistoryDetails);

  const list = useMemo(() => {
    if (!body) return tabList;

    let doHaveBody = false;
    switch (body.type) {
      case "form-data": {
        if (body.formData) doHaveBody = true;
        break;
      }
      case "x-www-form-urlencoded": {
        if (body.xWWWFormUrlencoded) doHaveBody = true;
        break;
      }
      case "binary": {
        if (body.binaryData?.file || body.binaryData?.path) doHaveBody = true;
        break;
      }
      case "raw": {
        if (body.raw !== undefined) doHaveBody = true;
        break;
      }
    }

    return doHaveBody ? tabList : tabList.filter((tab) => tab.id !== "body");
  }, [body]);

  return (
    <TabV1
      list={list}
      activeTab={activeMetaTab ?? "params"}
      handleSelect={(value) =>
        handleChangeActiveMetaTab(value as TActiveTabType)
      }
      className="select-none"
    />
  );
};

export default MetaDataTab;
