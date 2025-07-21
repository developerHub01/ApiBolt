import { memo } from "react";
import { FolderClosed as FolderIcon } from "lucide-react";
import type { RequestListItemInterface } from "@/types/request-response.types";

const Folder = memo(({ name }: RequestListItemInterface) => {
  return (
    <>
      <div className="w-full flex gap-2 items-center">
        <FolderIcon size={16} />
        <p className="text-sm select-none">{name}</p>
      </div>
    </>
  );
});

export default Folder;
