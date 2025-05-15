import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRequestFolder } from "@/context/request-list/RequestFolderProvider";

const FolderCTA = () => {
  const { handleRenameAction } = useRequestFolder();

  return (
    <>
      <DropdownMenuItem>Add Request</DropdownMenuItem>
      <DropdownMenuItem>Add Folder</DropdownMenuItem>
      <DropdownMenuItem onClick={handleRenameAction}>Rename</DropdownMenuItem>
      <DropdownMenuItem>Duplicate</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </>
  );
};

export default FolderCTA;
