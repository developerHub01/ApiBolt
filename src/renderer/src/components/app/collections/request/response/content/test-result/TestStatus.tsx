import { memo } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TestStatusInterface {
  success: boolean;
  className?: string;
}

const TestStatus = memo(({ success, className }: TestStatusInterface) => (
  <Badge
    className={cn(
      "uppercase text-xs px-1 font-medium rounded-md border select-none flex justify-center items-center text-white w-15 tracking-wider",
      {
        "bg-success/50 border border-success": success,
        "bg-error/50 border border-error": !success,
      },
      className,
    )}
  >
    {success ? "passed" : "failed"}
  </Badge>
));

export default TestStatus;
