import { TableCell } from "@/components/ui/table";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequestMetaTable } from "@/context/collections/request/RequestMetaTableProvider";

interface Props {
  prevent: boolean;
  handleDelete: () => void;
}

const MetaDeleteButton = ({ prevent, handleDelete }: Props) => {
  const { showDelete } = useRequestMetaTable();

  return (
    <TableCell className="p-0">
      {!prevent && showDelete && (
        <div className="flex justify-center items-center">
          <Button size={"iconXs"} variant={"ghost"} onClick={handleDelete}>
            <DeleteIcon size={16} />
          </Button>
        </div>
      )}
    </TableCell>
  );
};

export default MetaDeleteButton;
