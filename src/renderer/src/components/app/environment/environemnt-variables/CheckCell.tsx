import { memo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";

interface CheckCellProps {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const CheckCell = memo(({ id, value = true, onChange }: CheckCellProps) => {
  const handleChange = useCallback(
    (value: boolean) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <TableCell className="px-0">
      <div className="flex justify-center items-center">
        <Checkbox
          id={`check_${id}`}
          className="cursor-pointer"
          checked={value}
          onCheckedChange={handleChange}
          defaultChecked
        />
      </div>
    </TableCell>
  );
});

export default CheckCell;
