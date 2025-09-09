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
import { selectEnvironmentsVariableListUnique } from "@/context/redux/request-response/request-response-selector";

interface EnvVariableSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const EnvVariableSelector = memo(
  ({ value, onChange, className = "" }: EnvVariableSelectorProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const variableList = useAppSelector(selectEnvironmentsVariableListUnique);

    console.log(variableList);

    const isVariableExistInList = useMemo(
      () => variableList.find((item) => item.variable === value),
      [value, variableList]
    );

    const isExist = value && isVariableExistInList;
    const isNotExist = value && !isVariableExistInList;

    const handleChange = (val: string) => {
      onChange(val);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex-1 w-full justify-between cursor-pointer",
              {
                "text-green-500/60": isExist,
                "text-red-500/60": isNotExist,
              },
              className
            )}
            size={"sm"}
          >
            <input
              className="w-full h-full flex-1 truncate text-left 
             bg-transparent border-none outline-none 
             pointer-events-none select-none"
              readOnly
              tabIndex={-1}
              value={
                value
                  ? (variableList.find(
                      (framework) => framework.variable === value
                    )?.variable ?? value)
                  : "Select variable..."
              }
            />
            <ChevronsUpDown className="opacity-80" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full max-w-96 p-0"
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
                    onSelect={handleChange}
                    className="w-full"
                  >
                    <p className="flex-1 overflow-hidden">
                      {variable.variable}
                    </p>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === variable.variable
                          ? "opacity-100"
                          : "opacity-0"
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
  }
);

export default EnvVariableSelector;
