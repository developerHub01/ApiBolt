import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft as ArrowLeftIcon,
  ChevronRight as ArrowRightIcon,
} from "lucide-react";

const MarketplacePagination = memo(() => {
  return (
    <div className="w-full bg-accent/50 flex justify-center p-2 rounded-b-lg border-t-2">
      <Button size={"xs"} variant={"secondary"}>
        <ArrowLeftIcon /> Previous
      </Button>
      <Button size={"xs"} variant={"secondary"} className="ml-auto">
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
});

export default MarketplacePagination;
