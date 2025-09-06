import { memo, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectEnvironmentsVariableList } from "@/context/redux/request-response/request-response-selector";
import { Trash2 as DeleteIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import TokenDragHandler from "@/components/app/collections/request/request/meta-data/url/TokenDragHandler";
import ChangeTokenType from "@/components/app/collections/request/request/meta-data/url/tokens/ChangeTokenType";
import {
  requestUrlDeleteToken,
  requestUrlUpdateToken,
} from "@/context/redux/request-url/request-url-thunk";

interface VariableTokenProps {
  id: string;
  value: string;
}

const VariableToken = memo(({ id, value }: VariableTokenProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const variableList = useAppSelector(selectEnvironmentsVariableList);

  const handleChangeVariable = (variable: string) => {
    dispatch(
      requestUrlUpdateToken({
        id,
        value: variable === value ? "" : variable,
      })
    );
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(requestUrlDeleteToken(id));
  };

  const isVariableExistInList = useMemo(
    () => variableList.find((item) => item.variable === value),
    [value, variableList]
  );

  const isExist = value && isVariableExistInList;
  const isNotExist = value && !isVariableExistInList;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <ButtonLikeDiv
        className={cn(
          "w-fit min-w-40 flex gap-0 p-0 rounded-md bg-transparent hover:bg-transparent ring",
          {
            "ring-green-500/60": isExist,
            "ring-red-500/60": isNotExist,
          }
        )}
      >
        <TokenDragHandler />
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className={cn("flex-1 justify-between rounded-none", {
              "text-green-500/60": isExist,
              "text-red-500/60": isNotExist,
            })}
          >
            <p className="flex-1 overflow-hidden text-left">
              {value
                ? (variableList.find(
                    (framework) => framework.variable === value
                  )?.variable ?? value)
                : "Select variable..."}
            </p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <ChangeTokenType id={id} type={"env"} />
        <Button
          variant={"secondary"}
          className="rounded-l-none"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </Button>
      </ButtonLikeDiv>
      <PopoverContent
        className="w-[200px] p-0"
        side="bottom"
        align="start"
        sideOffset={8}
      >
        <Command>
          <CommandInput placeholder="Search variable..." className="h-9" />
          <CommandList>
            <CommandEmpty>No variable found.</CommandEmpty>
            <CommandGroup>
              {variableList.map((variable) => (
                <CommandItem
                  key={variable.variable}
                  value={variable.variable}
                  onSelect={handleChangeVariable}
                  className="w-full"
                >
                  <p className="flex-1 overflow-hidden">{variable.variable}</p>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === variable.variable ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export default VariableToken;
