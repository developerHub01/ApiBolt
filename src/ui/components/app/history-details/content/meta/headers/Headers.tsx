import MetaTable from "@/components/app/history-details/content/meta/meta-table/MetaTable";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";

const Headers = () => {
  const { headers } = useAppSelector(selectHistoryDetails);
  if (!headers) return null;

  return <MetaTable type="headers" data={headers} />;
};

export default Headers;
