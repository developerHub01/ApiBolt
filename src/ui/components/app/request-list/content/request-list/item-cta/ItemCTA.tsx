import FolderCTA from "@/components/app/request-list/content/request-list/item-cta/FolderCTA";
import RequestCTA from "@/components/app/request-list/content/request-list/item-cta/RequestCTA";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical as ThreeDotIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRequestFolder } from "@/context/request-list/RequestFolderProvider";

interface ItemCTAProps {
  type: "request" | "folder";
}

const ItemCTA = ({ type }: ItemCTAProps) => {
  const { isContextMenuOpen, handleToggleContextMenu } = useRequestFolder();
  return (
    <DropdownMenu
      open={isContextMenuOpen}
      onOpenChange={handleToggleContextMenu}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"iconXs"}
          className={cn(
            "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto",
            {
              "opacity-100 pointer-events-auto": isContextMenuOpen,
              "opacity-0 pointer-events-none": !isContextMenuOpen,
            }
          )}
        >
          <ThreeDotIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 [&>div]:cursor-pointer"
        align="start"
      >
        {type === "folder" ? <FolderCTA /> : <RequestCTA />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemCTA;
