import MetaDataTab from "@/components/app/history-details/content/meta/meta-top/MetaDataTab";
import DataContextBasedInfo from "@/components/app/history-details/content/meta/meta-top/DataContextBasedInfo";

const MetaDataTop = () => {
  return (
    <div className="flex justify-between items-center">
      <MetaDataTab />
      <DataContextBasedInfo />
    </div>
  );
};

export default MetaDataTop;
