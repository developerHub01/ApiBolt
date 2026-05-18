import { ComponentProps, memo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTreeListItem } from "@/context/tree-view/TreeListItemProvider";
import FolderButton from "@/components/ui/folder-button";

interface Props extends ComponentProps<"div"> {}

const TreeItemTag = memo(({ className, children, ...props }: Props) => {
  const { isExpended, type, handleToggleExpended } = useTreeListItem();

  const handleFolderButtonClick = useCallback(
    () => handleToggleExpended(),
    [handleToggleExpended],
  );

  return (
    <div className={cn("h-full w-6.5 flex items-center", className)} {...props}>
      {type === "folder" ? (
        <FolderButton
          isExpended={isExpended ?? false}
          onClick={handleFolderButtonClick}
        />
      ) : (
        children
      )}
    </div>
  );
});

export default TreeItemTag;
