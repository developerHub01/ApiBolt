import RequestResponseSize from "@/components/app/request/response/meta-data/response-info/RequestResponseSize";
import ResponseStatus from "@/components/app/request/response/meta-data/response-info/ResponseStatus";

const ResponseInfo = () => {
  return (
    <div className="flex items-center gap-1.5 ml-auto">
      <ResponseStatus />
      <RequestResponseSize />
    </div>
  );
};

export default ResponseInfo;