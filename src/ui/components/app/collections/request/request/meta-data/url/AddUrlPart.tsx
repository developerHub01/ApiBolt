import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TAPIUrlTokenType } from "@/types/request.url.types";
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
  onAdd: (type: TAPIUrlTokenType, preTokenId?: string) => void;
}

const AddUrlPart = ({ id, onAdd }: Props) => {
  const handleAdd = (type: TAPIUrlTokenType) => onAdd(type, id);
  return (
    <DropdownMenu key={id}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <AddIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
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
