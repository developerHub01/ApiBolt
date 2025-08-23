import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddNewDataProps {
  label?: string;
  onClick: () => void;
  className?: string;
  [key: string]: unknown;
}

const AddNewData = memo(
  ({ label = "", onClick, className, ...props }: AddNewDataProps) => {
    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        className={cn("w-full max-w-60 mx-auto", className)}
        onClick={onClick}
        {...props}
      >
        <AddIcon />
        {label}
      </Button>
    );
  }
);
AddNewData.displayName = "Add New Data";

export default AddNewData;
