import { memo } from "react";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import type { RequestListItemInterface } from "@/types/request-response.types";

const Request = memo(({ name, method }: RequestListItemInterface) => {
  return (
    <div className="flex items-center gap-2">
      <RequestMethodTag method={method ?? "get"} />
      <p>{name}</p>
    </div>
  );
});

export default Request;
