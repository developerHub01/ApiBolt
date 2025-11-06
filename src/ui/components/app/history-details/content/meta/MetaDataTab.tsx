import TabV1 from "@/components/tab-v1";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import type { TActiveTabType } from "@/types/request-response.types";

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
      handleSelect={(value) =>
        handleChangeActiveMetaTab(value as TActiveTabType)
      }
      className="hidden md:flex select-none"
    />
  );
};

export default MetaDataTab;
