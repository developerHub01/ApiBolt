import RequestResponseSize from "@/components/app/collections/request/response/meta-data/response-info/RequestResponseSize";
import ResponseStatus from "@/components/app/collections/request/response/meta-data/response-info/ResponseStatus";
import { useAppSelector } from "@/context/redux/hooks";
import {
  selectRequestSize,
  selectResponse,
  selectResponseSize,
} from "@/context/redux/request-response/selectors/response";

const ResponseInfo = () => {
  const response = useAppSelector(selectResponse);
  const requestSize = useAppSelector(selectRequestSize);
  const responseSize = useAppSelector(selectResponseSize);
  if (!response?.status) return null;

  const { status, statusText, statusDescription } = response;

  return (
    <div className="flex items-center gap-1.5">
      <ResponseStatus
        status={status}
        statusText={statusText}
        statusDescription={statusDescription}
      />
      <RequestResponseSize
        requestSize={requestSize}
        responseSize={responseSize}
      />
    </div>
  );
};

export default ResponseInfo;
