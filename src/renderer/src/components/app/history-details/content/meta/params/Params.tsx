import MetaTable from "@/components/app/history-details/content/meta/meta-table/MetaTable";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";

const Params = () => {
  const { params } = useAppSelector(selectHistoryDetails);
  if (!params?.length) return null;

  return <MetaTable type="params" data={params} />;
};

export default Params;
