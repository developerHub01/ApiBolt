import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { THTTPMethods } from "@shared/types/request-response.types";

interface Props {
  method: THTTPMethods;
  className?: string;
  shortCut?: boolean;
  shortCutSizeForAll?: number;
}

const RequestMethodTag = memo(
  ({
    method,
    className = "",
    shortCut = false,
    shortCutSizeForAll = 5,
  }: Props) => {
    const modifiedMethod = method.substring(0, shortCutSizeForAll);

    return (
      <Badge
        className={cn(
          "uppercase text-[10px] px-1 font-semibold rounded-md border select-none flex justify-center items-center",
          {
            "bg-http-get-500/80 text-white backdrop-blur-lg": method === "get",
            "bg-http-post-500/80 text-white backdrop-blur-lg":
              method === "post",
            "bg-http-put-500/80 text-black backdrop-blur-lg": method === "put",
            "bg-http-patch-500/80 text-white backdrop-blur-lg":
              method === "patch",
            "bg-http-delete-500/80 text-white backdrop-blur-lg":
              method === "delete",
            "bg-http-head-500/80 text-white backdrop-blur-lg":
              method === "head",
            "bg-http-options-500/80 text-white backdrop-blur-lg":
              method === "options",
          },
          className,
        )}
      >
        {shortCut && modifiedMethod === "delete" ? "del" : modifiedMethod}
      </Badge>
    );
  },
);

export default RequestMethodTag;
