import { memo, useState } from "react";
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

const VariableToken = memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const variableList = useAppSelector(selectEnvironmentsVariableList);

  console.log(variableList);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="w-[200px] flex">
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className="flex-1 justify-between rounded-r-none"
          >
            <p className="flex-1 overflow-hidden">
              {value
                ? variableList.find((framework) => framework.variable === value)
                    ?.variable
                : "Select variable..."}
            </p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <Button variant={"secondary"} className="rounded-l-none">
          <DeleteIcon />
        </Button>
      </div>
      <PopoverContent className="w-[200px] p-0" side="bottom" align="start">
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
