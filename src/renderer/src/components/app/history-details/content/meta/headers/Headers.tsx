import MetaTable from "@/components/app/history-details/content/meta/meta-table/MetaTable";
import { AUTHORIZATION_DATA_ID } from "@/constant/authorization.constant";
import { COOKIE_DATA_ID } from "@/constant/request-response.constant";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";

const alwaysAllowIds = new Set([AUTHORIZATION_DATA_ID, COOKIE_DATA_ID]);

const Headers = () => {
  const { headers } = useAppSelector(selectHistoryDetails);
  if (!headers) return null;

  const modifiedHeaders = headers.map((header) => ({
    ...header,
    isCheck: alwaysAllowIds.has(header.id) ? true : header.isCheck,
  }));

  return <MetaTable type="headers" data={modifiedHeaders} />;
};

export default Headers;
