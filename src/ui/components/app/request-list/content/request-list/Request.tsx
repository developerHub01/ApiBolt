import RequestMethodTag from "@/components/app/RequestMethodTag";
import type { RequestListItemInterface } from "@/context/request-list/RequestListProvider";

const Request = ({ name, method }: RequestListItemInterface) => {
  return (
    <div className="flex items-center gap-2">
      <RequestMethodTag method={method ?? "get"} />
      <p>{name}</p>
    </div>
  );
};

export default Request;
