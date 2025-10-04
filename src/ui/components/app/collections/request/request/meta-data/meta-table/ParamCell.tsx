import React, { memo, useCallback } from "react";
import type { TParamContentType } from "@/types/request-response.types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp as ChangeTypeIcon } from "lucide-react";
import { updateParams } from "@/context/redux/request-response/thunks/params";
import { useAppDispatch } from "@/context/redux/hooks";
import EnvVariableSelector from "@/components/app/collections/request/request/EnvVariableSelector";

const typeList = [
  {
    id: "text",
    label: "Text",
  },
  {
    id: "env",
    label: "Variable",
  },
];

interface ParamCellProps {
  id: string;
  value: string;
  children?: React.ReactNode;
  type: TParamContentType;
  prevent?: boolean;
  cellType: string;
}

const ParamCell = memo(
  ({ id, children, type, prevent = true, cellType, value }: ParamCellProps) => {
    const dispatch = useAppDispatch();

    const handleChangeType = useCallback(
      (value: TParamContentType) => {
        dispatch(
          updateParams({
            paramId: id,
            payload: {
              [cellType === "key" ? "keyType" : "valueType"]: value,
            },
          })
        );
      },
      [dispatch, id, cellType]
    );

    const handleChangeValue = useCallback(
      (value: string) => {
        dispatch(
          updateParams({
            paramId: id,
            payload: {
              [cellType]: value,
            },
          })
        );
      },
      [dispatch, id, cellType]
    );

    return (
      <>
        {type === "env" ? (
          <EnvVariableSelector value={value} onChange={handleChangeValue} />
        ) : (
          children
        )}
        {prevent || <TypeMenu value={type} onChange={handleChangeType} />}
      </>
    );
  }
);

interface TypeMenuProps {
  value: TParamContentType;
  onChange: (value: TParamContentType) => void;
}

const TypeMenu = memo(({ value, onChange }: TypeMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size={"iconSm"}>
          <ChangeTypeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuRadioGroup
          value={value ?? typeList[0].id}
          defaultValue={typeList[0].id}
          onValueChange={(value: string) =>
            onChange(value as TParamContentType)
          }
        >
          {typeList.map(({ id, label }) => (
            <DropdownMenuRadioItem key={id} value={id}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default ParamCell;
