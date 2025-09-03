import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown as DownArrowIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { cn } from "@/lib/utils";
import type { THostType } from "@/types/request.url.types";
import { apiHostTypeList } from "@/constant/request.url.constant";

interface HostTokenProps {
  hostType: THostType;
  onChangeHostType: (type: THostType) => void;
}

const HostToken = memo(({ hostType, onChangeHostType }: HostTokenProps) => {
  return (
    <ButtonLikeDiv
      variant={"secondary"}
      className={cn("w-[150px] flex items-center p-0 gap-0", {
        "w-[200px]": hostType === "custom",
      })}
    >
      <ButtonLikeDiv
        variant={"outline"}
        className="flex-1 rounded-r-none border-0 justify-start"
      >
        {hostType !== "custom" ? (
          hostType
        ) : (
          <>
            <input
              placeholder="Host name"
              className="w-full border-0 border-b font-normal"
            />
          </>
        )}
      </ButtonLikeDiv>
      <Menu value={hostType} onChange={onChangeHostType} />
    </ButtonLikeDiv>
  );
});

interface MenuProps {
  value: THostType;
  onChange: (type: THostType) => void;
}

const Menu = ({ value, onChange }: MenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-l-none border-0">
          <DownArrowIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-[150px]", {
          "w-[200px]": value === "custom",
        })}
        align="end"
        side="bottom"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => onChange(newValue as THostType)}
        >
          {apiHostTypeList.map((type) => (
            <DropdownMenuRadioItem value={type} className="capitalize">
              {type}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HostToken;
