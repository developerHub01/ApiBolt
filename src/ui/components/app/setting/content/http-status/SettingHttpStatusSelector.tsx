import { memo, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectHttpStatusCodeList } from "@/context/redux/http-status/selectors/http-status";
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
import { handleUpdateSelectedSettingHttpStatusCode } from "@/context/redux/http-status/http-status-slice";

const SettingHttpStatusSelector = memo(() => {
  const list = useAppSelector(selectHttpStatusCodeList);
  const disptch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = useCallback(
    (value: string) => {
      disptch(handleUpdateSelectedSettingHttpStatusCode(value))
           setOpen(false);
    },
    [],
  )
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? list.find((code) => code === value) : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Code..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Code matched.</CommandEmpty>
            <CommandGroup>
              {list.map((code) => (
                <CommandItem
                  key={code}
                  value={code}
                  onSelect={handleChange}
                >
                  {code}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === code ? "opacity-100" : "opacity-0"
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

export default SettingHttpStatusSelector;
