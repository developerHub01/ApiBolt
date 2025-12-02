import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import RequestResponseSize from "@/components/app/collections/request/response/meta-data/response-info/RequestResponseSize";
import HttpStatus from "@/components/ui/http-status";
import ResponseMetaWrapper from "@/components/app/collections/request/response/meta-data/ResponseMetaWrapper";

const ResponseMetaInfo = () => {
  const { responseSize, responseStatus } = useAppSelector(selectHistoryDetails);

  const statusCode = Number(responseStatus?.split(" ")?.[0]);
  const statusText = responseStatus?.split(" ")?.slice(1)?.join(" ") ?? "";

  return (
    <ResponseMetaWrapper className="bg-accent/50 rounded-md p-2">
      <p className="select-none text-sm text-secondary-foreground mr-auto">
        Response
      </p>
      <HttpStatus status={statusCode} statusText={statusText} />
      <RequestResponseSize
        requestSize={responseSize?.requestSize}
        responseSize={responseSize?.responseSize}
      />
    </ResponseMetaWrapper>
  );
};

export default ResponseMetaInfo;
