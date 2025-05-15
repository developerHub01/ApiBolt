import type { TMethod } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  method: TMethod;
  className?: string;
}

const RequestMethodTag = ({ method, className = "" }: Props) => {
  return (
    <Badge
      className={cn(
        "uppercase text-[10px] px-1 font-semibold rounded-md border",
        {
          "bg-green-500/80 text-white backdrop-blur-lg": method === "get",
          "bg-blue-500/80 text-white backdrop-blur-lg": method === "post",
          "bg-yellow-500/80 text-black backdrop-blur-lg": method === "put",
          "bg-orange-500/80 text-white backdrop-blur-lg": method === "patch",
          "bg-red-500/80 text-white backdrop-blur-lg": method === "delete",
        },
        className
      )}
    >
      {method.slice(0, 4)}
    </Badge>
  );
};

export default RequestMethodTag;
