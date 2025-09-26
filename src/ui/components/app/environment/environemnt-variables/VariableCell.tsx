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
import { cn } from "@/lib/utils";
import VariableWarning from "@/components/app/environment/environemnt-variables/VariableWarning";

interface VariableCellProps {
  id: string;
  keyName: "variable" | "value" | "type";
  value: string;
  placeholder?: string;
  type?: "input" | "select";
  warning?: boolean;
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
    warning = false,
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
    const [inputValue, setInputValue] = useState(value ?? "");

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

    const handleVariableKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        // only letters, numbers, underscore
        const allowedPattern = /^[a-zA-Z0-9_-]$/;
        const key = e.key;

        // Allow navigation/control keys (Backspace, Delete, Tab, etc.)
        if (
          key === "Backspace" ||
          key === "Delete" ||
          key === "ArrowLeft" ||
          key === "ArrowRight" ||
          key === "Tab"
        ) {
          return;
        }

        // Block if not allowed
        if (!allowedPattern.test(key)) e.preventDefault();

        // Prevent first char from being number
        if (inputValue.length === 0 && /^[0-9]$/.test(key)) e.preventDefault();
      },
      [inputValue]
    );

    const isSecretView =
      type === "input" && keyName === "value" && !visibilityType;

    return (
      <TableCell key={id}>
        <div className="flex gap-2">
          {type === "input" && (
            <input
              type={isSecretView ? "password" : "text"}
              className={cn(
                "w-full py-0.5 border-b border-transparent focus:border-primary",
                "placeholder:capitalize placeholder:opacity-50"
              )}
              style={{
                borderRadius: 0,
              }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={
                keyName === "variable" ? handleVariableKeyDown : undefined
              }
              placeholder={placeholder}
            />
          )}
          {type === "select" && (
            <Select value={value} onValueChange={handleValueChange}>
              <SelectTrigger size="sm" className="min-w-28 w-full capitalize">
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
          {warning && <VariableWarning />}
        </div>
      </TableCell>
    );
  }
);

export default VariableCell;
