import { memo, type MouseEvent } from "react";

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
      type="button"
      className="w-full p-0.5 h-full aspect-square cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="w-full h-full object-contain"
        src={isExpended ? "./icons/folder-open.png" : "./icons/folder.png"}
        alt={isExpended ? "folder-open" : "folder"}
      />
    </button>
  );
});

export default RequestListItemFolderButton;
