import { Check as SuccessIcon, X as FailIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestStatusInterface {
  success: boolean;
}

const TestStatus = ({ success }: TestStatusInterface) => (
  <div
    className={cn(
      "size-8 rounded-full text-foreground grid place-items-center",
      {
        "bg-success": success,
        "bg-error": !success,
      },
    )}
  >
    {success ? <SuccessIcon size={22} /> : <FailIcon size={22} />}
  </div>
);

export default TestStatus;
