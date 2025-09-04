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
import { useAppSelector } from "@/context/redux/hooks";
import { selectEnvironmentsVariableList } from "@/context/redux/request-response/request-response-selector";
import { Trash2 as DeleteIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

interface VariableTokenProps {
  id: string;
  onDelete: (id: string) => void;
}

const VariableToken = memo(({ id, onDelete }: VariableTokenProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const variableList = useAppSelector(selectEnvironmentsVariableList);

  const isVariableExistInList = useMemo(
    () => variableList.find((item) => item.variable === value),
    [value, variableList]
  );

  const isExist = value && isVariableExistInList;
  const isNotExist = value && !isVariableExistInList;

  console.log({
    isExist,
    isNotExist,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <ButtonLikeDiv
        className={cn("w-fit min-w-40 flex gap-0 p-0 bg-transparent ring", {
          "ring-green-500/60": isExist,
          "ring-red-500/60": isNotExist,
        })}
      >
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className={cn("flex-1 justify-between rounded-r-none", {
              "text-green-500/60": isExist,
              "text-red-/60": isNotExist,
            })}
          >
            <p className="flex-1 overflow-hidden text-left">
              {value
                ? variableList.find((framework) => framework.variable === value)
                    ?.variable
                : "Select variable..."}
            </p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <Button
          variant={"secondary"}
          className="rounded-l-none"
          onClick={() => onDelete(id)}
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
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
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
