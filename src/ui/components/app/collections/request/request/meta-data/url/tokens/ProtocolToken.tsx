import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { requestUrlUpdateOriginToken } from "@/context/redux/request-url/thunks/request-url";
import { selectRequestUrlTokenProtocol } from "@/context/redux/request-url/selectors/protocol";

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
      })
    );
  };

  return (
    <Select
      defaultValue={optionList[0].id}
      value={protocol}
      onValueChange={handleChange}
    >
      <ButtonLikeDiv variant={"secondary"} className="p-0">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select protocol" />
        </SelectTrigger>
      </ButtonLikeDiv>
      <SelectContent>
        {optionList.map(({ id, label }) => (
          <SelectItem key={id} value={id}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

export default ProtocolToken;
