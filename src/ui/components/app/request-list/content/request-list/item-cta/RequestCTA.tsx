import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRequestFolder } from "@/context/request-list/RequestFolderProvider";

const RequestCTA = () => {
  const { handleRenameAction } = useRequestFolder();

  return (
    <>
      <DropdownMenuItem onClick={handleRenameAction}>Rename</DropdownMenuItem>
      <DropdownMenuItem>Duplicate</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </>
  );
};

export default RequestCTA;
