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
            "bg-green-500/80 text-white backdrop-blur-lg": method === "get",
            "bg-blue-500/80 text-white backdrop-blur-lg": method === "post",
            "bg-yellow-500/80 text-black backdrop-blur-lg": method === "put",
            "bg-orange-500/80 text-white backdrop-blur-lg": method === "patch",
            "bg-red-500/80 text-white backdrop-blur-lg": method === "delete",
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
