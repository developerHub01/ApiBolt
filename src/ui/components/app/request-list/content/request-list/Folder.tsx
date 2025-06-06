import type { RequestListItemInterface } from "@/context/request-list/RequestListProvider";
import { FolderClosed as FolderIcon } from "lucide-react";

const Folder = ({ name }: RequestListItemInterface) => {
  return (
    <>
      <div className="w-full flex gap-2 items-center">
        <FolderIcon size={16} />
        <p className="text-sm select-none">{name}</p>
      </div>
    </>
  );
};

export default Folder;
