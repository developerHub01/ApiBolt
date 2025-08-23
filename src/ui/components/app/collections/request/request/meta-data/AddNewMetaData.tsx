import { memo } from "react";
import { useRequestMetaData } from "@/context/collections/request/RequestMetaDataProvider";
import AddNewData from "@/components/AddNewData";

interface AddNewMetaDataProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: unknown;
}

const AddNewMetaData = memo(
  ({ label = "", onClick, className, ...props }: AddNewMetaDataProps) => {
    const { handleAddNewData } = useRequestMetaData();
    
    return (
      <AddNewData
        className={className}
        onClick={onClick ?? handleAddNewData}
        {...props}
        label={label}
      />
    );
  }
);
AddNewMetaData.displayName = "Add New Meta Data";

export default AddNewMetaData;
