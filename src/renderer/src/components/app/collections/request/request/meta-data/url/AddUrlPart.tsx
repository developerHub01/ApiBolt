import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/context/redux/hooks";
import { requestUrlAddToken } from "@/context/redux/request-url/thunks/request-url";
import type { TAPIUrlTokenType } from "@shared/types/request-url.types";
import { Plus as AddIcon } from "lucide-react";

const urlPartList: Array<{
  id: TAPIUrlTokenType;
  label: string;
}> = [
  {
    id: "text",
    label: "Text",
  },
  {
    id: "env",
    label: "Environment Variables",
  },
];

interface Props {
  id: string;
}

const AddUrlPart = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  const handleAdd = (type: TAPIUrlTokenType) =>
    dispatch(
      requestUrlAddToken({
        type,
        preTokenId: id,
      }),
    );

  return (
    <DropdownMenu key={id}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <AddIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" sideOffset={8}>
        <DropdownMenuGroup>
          {urlPartList.map(({ id, label }) => (
            <DropdownMenuItem key={id} onClick={() => handleAdd(id)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddUrlPart;
