import RequestMethodTag from "@/components/app/RequestMethodTag";
import type { RequestListItemInterface } from "@/context/redux/request-list-slice";

const Request = ({ name, method }: RequestListItemInterface) => {
  return (
    <div className="flex items-center gap-2">
      <RequestMethodTag method={method ?? "get"} />
      <p>{name}</p>
    </div>
  );
};

export default Request;
