import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRequestMetaData } from "@/context/collections/request/RequestMetaDataProvider";

interface AddNewDataProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: unknown;
}

const AddNewData = memo(
  ({ label = "", onClick, className, ...props }: AddNewDataProps) => {
    const { handleAddNewData } = useRequestMetaData();

    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        className={cn("w-full max-w-60 mx-auto", className)}
        onClick={onClick ?? handleAddNewData}
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
