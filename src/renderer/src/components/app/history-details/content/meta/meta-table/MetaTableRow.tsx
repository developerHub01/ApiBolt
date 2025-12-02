import { memo } from "react";
import { TableRow } from "@/components/ui/table";
import type {
  ParamInterface,
  TMetaTableType,
} from "@shared/types/request-response.types";
import MetaTableCell from "@/components/app/history-details/content/meta/meta-table/MetaTableCell";
import CheckCell from "@/components/app/collections/request/request/meta-data/meta-table/CheckCell";

interface Props extends ParamInterface<string> {
  type: TMetaTableType;
  keyName: string;
  showDescription: boolean;
}

const MetaTableRow = memo(
  ({
    id,
    type,
    keyName,
    value,
    description,
    keyType,
    valueType,
    showDescription,
    calculateDynamicly,
    isCheck,
  }: Props) => {
    const metaValue = calculateDynamicly
      ? "<calculated when request is sent>"
      : value;

    return (
      <TableRow>
        <CheckCell
          id={`${type}-check-${id}`}
          checked={Boolean(isCheck)}
          disabled
        />
        <MetaTableCell
          cellType="key"
          id={id}
          inputType="text"
          value={keyName}
          type={type}
          cellContentType={keyType}
        />
        <MetaTableCell
          cellType="value"
          id={id}
          inputType="text"
          value={metaValue}
          type={type}
          cellContentType={valueType}
        />
        {showDescription && (
          <MetaTableCell
            cellType="value"
            id={id}
            inputType="text"
            value={description ?? ""}
            type={type}
          />
        )}
      </TableRow>
    );
  }
);

export default MetaTableRow;
