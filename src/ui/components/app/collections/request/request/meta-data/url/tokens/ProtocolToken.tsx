import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

const ProtocolToken = memo(() => {
  return (
    <Select defaultValue="http">
      <ButtonLikeDiv variant={"secondary"} className="p-0">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select protocol" />
        </SelectTrigger>
      </ButtonLikeDiv>
      <SelectContent>
        <SelectItem value="http">http://</SelectItem>
        <SelectItem value="https">https://</SelectItem>
      </SelectContent>
    </Select>
  );
});

export default ProtocolToken;
