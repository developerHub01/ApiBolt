import { useMemo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectEnvironmentsVariableListUnique } from "@/context/redux/environments/selectors/environments";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import type { TParamContentType } from "@shared/types/request-response.types";
import { cn } from "@/lib/utils";
import CellTextContent from "@/components/app/history-details/content/meta/meta-table/CellTextContent";
import { GLOBAL_ENVS_SET } from "@/constant/global-envs.constant";

interface Props {
  value: string;
  cellType: "value" | "key" | "description";
  cellContentType: TParamContentType;
}

const ParamsCell = ({ value, cellType, cellContentType }: Props) => {
  const variableList = useAppSelector(selectEnvironmentsVariableListUnique);

  const isVariableExistInList = useMemo(
    () =>
      GLOBAL_ENVS_SET.has(value) ||
      variableList.find(item => item.variable === value),
    [value, variableList],
  );
  const isExist = value && isVariableExistInList;
  const isNotExist = value && !isVariableExistInList;

  return (
    <>
      {["key", "value"].includes(cellType) && cellContentType === "env" ? (
        <ButtonLikeDiv
          variant={"secondary"}
          size={"sm"}
          className={cn("w-full justify-start h-7", {
            "text-green-500/60": isExist,
            "text-red-500/60": isNotExist,
          })}
        >
          {value as string}
        </ButtonLikeDiv>
      ) : (
        <CellTextContent>{value as string}</CellTextContent>
      )}
    </>
  );
};

export default ParamsCell;
