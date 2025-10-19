import { memo, useMemo, useState } from "react";
import { CalendarIcon, X as ClearIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { dateFormater } from "@/utils";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

const FieldDateSelector = memo(({ value, onChange }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  console.log({ value });
  const presentableDate = useMemo(() => {
    if (!value) return "Session";
    return dateFormater(value);
  }, [value]);

  const handleOnSelect = (date: Date | undefined) => {
    onChange(date?.toISOString() ?? null);
    setOpen(false);
  };

  return (
    <ButtonLikeDiv
      className="relative w-full flex px-0 gap-0"
      variant={"secondary"}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id="date-picker" variant="secondary" className="flex-1">
            <input
              disabled
              type="text"
              value={presentableDate}
              className="flex-1 border-0 focus-visible:border-b select-none pointer-events-none"
            />
            <CalendarIcon className="size-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          sideOffset={10}
        >
          <Calendar
            mode="single"
            hidden={{
              before: new Date(),
            }}
            captionLayout="label"
            className="w-72"
            onSelect={handleOnSelect}
          />
        </PopoverContent>
      </Popover>
      {value && <ExpireSessionButton onChange={onChange} />}
    </ButtonLikeDiv>
  );
});

interface ExpireSessionButtonProps {
  onChange: (value: null) => void;
}

const ExpireSessionButton = ({ onChange }: ExpireSessionButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          className="border-l"
          onClick={() => onChange(null)}
        >
          <ClearIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="end" side="bottom">
        <p>Make Expire Session</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FieldDateSelector;
