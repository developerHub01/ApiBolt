import { memo, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { Trash2 as DeleteIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import TokenDragHandler from "@/components/app/collections/request/request/meta-data/url/TokenDragHandler";
import ChangeTokenType from "@/components/app/collections/request/request/meta-data/url/tokens/ChangeTokenType";
import {
  requestUrlDeleteToken,
  requestUrlUpdateToken,
} from "@/context/redux/request-url/thunks/request-url";
import EnvVariableSelector from "@/components/app/collections/request/request/EnvVariableSelector";
import { selectEnvironmentsVariableList } from "@/context/redux/environments/selectors/environments";

interface VariableTokenProps {
  id: string;
  value: string;
}

const VariableToken = memo(({ id, value }: VariableTokenProps) => {
  const dispatch = useAppDispatch();
  const variableList = useAppSelector(selectEnvironmentsVariableList);

  const handleChangeVariable = useCallback(
    (variable: string) => {
      dispatch(
        requestUrlUpdateToken({
          id,
          value: variable === value ? "" : variable,
        }),
      );
    },
    [dispatch, id, value],
  );

  const handleDelete = () => {
    dispatch(requestUrlDeleteToken(id));
  };

  const isVariableExistInList = useMemo(
    () => variableList.find(item => item.variable === value),
    [value, variableList],
  );

  const isExist = value && isVariableExistInList;
  const isNotExist = value && !isVariableExistInList;

  return (
    <ButtonLikeDiv
      className={cn(
        "w-fit min-w-40 flex gap-0 p-0 rounded-md bg-transparent hover:bg-transparent ring",
        {
          "ring-green-500/60": isExist,
          "ring-red-500/60": isNotExist,
        },
      )}
    >
      <TokenDragHandler />
      <EnvVariableSelector
        value={value}
        onChange={handleChangeVariable}
        className="flex-1 justify-between rounded-none h-full max-w-96"
      />
      <ChangeTokenType id={id} type={"env"} />
      <Button
        variant={"secondary"}
        className="rounded-l-none h-full"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </Button>
    </ButtonLikeDiv>
  );
});

export default VariableToken;
