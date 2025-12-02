import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";

interface Props {
  id?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

const CheckCell = ({ id, checked, disabled = false, onChange }: Props) => {
  return (
    <TableCell className="px-0">
      <div className="w-full flex justify-center items-center">
        <Checkbox
          className="cursor-pointer"
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onChange}
        />
      </div>
    </TableCell>
  );
};

export default CheckCell;
