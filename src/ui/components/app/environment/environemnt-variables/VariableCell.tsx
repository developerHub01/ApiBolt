import {
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 as DeleteIcon } from "lucide-react";

interface VariableCellProps {
  id: string;
  keyName: "variable" | "value" | "type";
  value: string;
  placeholder?: string;
  type?: "input" | "select";
  selectList?: Array<{
    id: string;
    label: string;
  }>;
  onChange: (value: string) => void;
  visibilityType?: boolean;
  showActionOption?: boolean;
  onDelete?: () => void;
}

const VariableCell = memo(
  ({
    id,
    keyName,
    value = "",
    placeholder = "",
    type = "input",
    selectList = [
      {
        id: "default",
        label: "default",
      },
      {
        id: "secret",
        label: "secret",
      },
    ],
    onChange,
    onDelete,
    visibilityType = true,
    showActionOption = false,
  }: VariableCellProps) => {
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      []
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    const handleValueChange = useCallback(
      (value: string) => {
        onChange(value);
      },
      [onChange]
    );

    const isSecretView =
      type === "input" && keyName === "value" && !visibilityType;

    return (
      <TableCell key={id}>
        <div className="flex gap-2">
          {type === "input" && (
            <input
              type={isSecretView ? "password" : "text"}
              className="w-full py-0.5 border-b border-transparent focus:border-primary"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder={placeholder}
            />
          )}
          {type === "select" && (
            <Select value={value} onValueChange={handleValueChange}>
              <SelectTrigger size="sm" className="w-28 capitalize">
                <SelectValue
                  className="capitalize"
                  placeholder="Select Type"
                  defaultValue={value ?? selectList[0].id}
                />
              </SelectTrigger>
              <SelectContent>
                {selectList.map(({ id, label }) => (
                  <SelectItem value={id} className="capitalize">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {showActionOption && (
            <Button
              size={"iconXs"}
              variant={"ghost"}
              className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
              {...(onDelete
                ? {
                    onClick: onDelete,
                  }
                : {})}
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </TableCell>
    );
  }
);

export default VariableCell;
