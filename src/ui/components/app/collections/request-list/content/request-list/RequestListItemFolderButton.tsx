import { memo, type MouseEvent } from "react";
import {
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
} from "lucide-react";

interface Props {
  isExpended: boolean;
  onClick: () => void;
}

const RequestListItemFolderButton = memo(({ isExpended, onClick }: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      className="w-full p-0.5 h-full aspect-square cursor-pointer"
      onClick={handleClick}
    >
      {isExpended ? <FolderOpenIcon size={23} /> : <FolderIcon size={23} />}
    </button>
  );
});

export default RequestListItemFolderButton;
