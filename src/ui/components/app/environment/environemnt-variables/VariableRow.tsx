import { memo } from "react";
import { TableRow } from "@/components/ui/table";
import VariableCell from "@/components/app/environment/environemnt-variables/VariableCell";
import CheckCell from "@/components/app/environment/environemnt-variables/CheckCell";
import type { EnvironmentInterface } from "@/types/request-response.types";

interface VariableRowProps extends EnvironmentInterface {
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
    onChange,
    onDelete,
  }: VariableRowProps) => {
    return (
      <TableRow key={id} className="group">
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
