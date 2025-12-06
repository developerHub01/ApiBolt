import TabV1 from "@/components/tab-v1";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import type { TActiveTabType } from "@shared/types/request-response.types";

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

  return (
    <TabV1
      list={tabList}
      activeTab={activeMetaTab ?? "params"}
      handleSelect={value => handleChangeActiveMetaTab(value as TActiveTabType)}
      className="select-none"
    />
  );
};

export default MetaDataTab;
