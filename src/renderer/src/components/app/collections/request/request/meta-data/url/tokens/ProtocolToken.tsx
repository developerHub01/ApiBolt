import { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { requestUrlUpdateOriginToken } from "@/context/redux/request-url/thunks/request-url";
import { selectRequestUrlTokenProtocol } from "@/context/redux/request-url/selectors/protocol";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown as DownArrowIcon } from "lucide-react";
import type { THostType } from "@shared/types/request-url.types";
import FlexibleHightButtonLikeDiv from "@/components/ui/flexible-hight-button-like-div";

const optionList: Array<{
  id: string;
  label: string;
}> = [
  {
    id: "http:",
    label: "http:",
  },
  {
    id: "https:",
    label: "https:",
  },
];

const ProtocolToken = memo(() => {
  const dispatch = useAppDispatch();
  const protocol = useAppSelector(selectRequestUrlTokenProtocol);

  const handleChange = (value: string) => {
    dispatch(
      requestUrlUpdateOriginToken({
        id: "protocol",
        value,
      }),
    );
  };

  return (
    <FlexibleHightButtonLikeDiv className="min-w-37.5 w-fit p-0 gap-0 overflow-hidden">
      <FlexibleHightButtonLikeDiv className="flex-1 rounded-none justify-start">
        {protocol ?? optionList[0].label}
      </FlexibleHightButtonLikeDiv>
      <Menu value={protocol ?? optionList[0].id} onChange={handleChange} />
    </FlexibleHightButtonLikeDiv>
  );
});

interface MenuProps {
  value: string;
  onChange: (type: string) => void;
}

const Menu = ({ value, onChange }: MenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-l-none border-0 h-full">
          <DownArrowIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-37.5" align="end" side="bottom">
        <DropdownMenuRadioGroup
          defaultValue={optionList[0].id}
          value={value}
          onValueChange={newValue => onChange(newValue as THostType)}
        >
          {optionList.map(({ id, label }) => (
            <DropdownMenuRadioItem key={id} value={id} className="capitalize">
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProtocolToken;
