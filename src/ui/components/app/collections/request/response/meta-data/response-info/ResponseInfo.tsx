import RequestResponseSize from "@/components/app/collections/request/response/meta-data/response-info/RequestResponseSize";
import ResponseStatus from "@/components/app/collections/request/response/meta-data/response-info/ResponseStatus";
import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";

const ResponseInfo = () => {
  const response = useAppSelector(selectResponse);
  if (!response?.status) return null;

  return (
    <div className="flex items-center gap-1.5">
      <ResponseStatus />
      <RequestResponseSize />
    </div>
  );
};

export default ResponseInfo;
