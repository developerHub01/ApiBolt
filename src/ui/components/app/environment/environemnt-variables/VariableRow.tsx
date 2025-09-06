import { memo } from "react";
import { TableRow } from "@/components/ui/table";
import VariableCell from "@/components/app/environment/environemnt-variables/VariableCell";
import CheckCell from "@/components/app/environment/environemnt-variables/CheckCell";
import type { EnvironmentInterface } from "@/types/request-response.types";
import { cn } from "@/lib/utils";

interface VariableRowProps extends EnvironmentInterface {
  warning?: boolean;
  onChange: (
    key: "isCheck" | "variable" | "type" | "value",
    value: boolean | string
  ) => void;
  onDelete: () => void;
}

const VariableRow = memo(
  ({
    id,
    isCheck,
    type,
    value,
    variable,
    warning,
    onChange,
    onDelete,
  }: VariableRowProps) => {
    return (
      <TableRow
        key={id}
        className={cn(
          "group",
          "[&>td]:border-r [&>td]:last:border-r-0 [&>td>input]:outline-none [&>td>div>input]:outline-none [&>td>input]:rounded-md [&>td>div>input]:rounded-md",
          "focus-within:bg-accent/60 duration-75 transition-colors"
        )}
      >
        <CheckCell
          id={id}
          value={isCheck}
          onChange={(...rest) => onChange("isCheck", ...rest)}
        />
        <VariableCell
          keyName="variable"
          id={id}
          value={variable}
          onChange={(...rest) => onChange("variable", ...rest)}
          placeholder="Variable"
          warning={warning}
        />
        <VariableCell
          keyName="type"
          id={id}
          value={type}
          onChange={(...rest) => onChange("type", ...rest)}
          type="select"
        />
        <VariableCell
          keyName="value"
          id={id}
          value={value}
          onChange={(...rest) => onChange("value", ...rest)}
          placeholder="Value"
          /* if visibility true then show else hide */
          visibilityType={type === "default"}
          showActionOption={true}
          onDelete={onDelete}
        />
      </TableRow>
    );
  }
);

export default VariableRow;
