import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FilePlus as FileAddIcon,
  FolderPlus as FolderAddIcon,
  type LucideIcon,
} from "lucide-react";

const buttonList: Array<{
  id: string;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "add-request",
    label: "Add Request",
    Icon: FileAddIcon,
  },
  {
    id: "add-folder",
    label: "Add Folder",
    Icon: FolderAddIcon,
  },
];

const ListBottomAction = memo(() => {
  return (
    <div className="flex items-center justify-end gap-1 px-2 py-1.5 border-t-2">
      {buttonList.map(({ id, label, Icon }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button size={"iconXs"} variant={"ghost"}>
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
});

export default ListBottomAction;
