import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProject } from "@/context/project/ProjectProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";
import {
  Trash2 as DeleteIcon,
  EllipsisVertical as ThreeDotIcon,
  Upload as ExportIcon,
  type LucideIcon,
} from "lucide-react";
import {
  changeActiveProject,
  exportProject,
} from "@/context/redux/project/thunks/projects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ProjectItemProps {
  id: string;
  name: string;
  activeProjectId?: string | null;
}

type TActionType = "delete" | "export";

const menuList: Array<{
  id: TActionType;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "delete",
    label: "Delete",
    Icon: DeleteIcon,
  },
  {
    id: "export",
    label: "Export",
    Icon: ExportIcon,
  },
];

const ProjectItem = ({ id, name, activeProjectId }: ProjectItemProps) => {
  const dispatch = useAppDispatch();
  const { handleChangeDeletionCandidate } = useProject();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeActiveProject = useCallback(() => {
    dispatch(changeActiveProject(id));
  }, [dispatch, id]);

  const handleDeleteProject = useCallback(() => {
    handleChangeDeletionCandidate(id);
  }, [handleChangeDeletionCandidate, id]);

  const handleExportProject = useCallback(async () => {
    const { success, message } = await dispatch(exportProject(id)).unwrap();
    if (success) toast.success(message);
    else toast.error(message);
  }, [dispatch, id]);

  const handleAction = useCallback(
    (type: TActionType) => {
      switch (type) {
        case "delete": {
          return handleDeleteProject();
        }
        case "export": {
          return handleExportProject();
        }
      }
    },
    [handleDeleteProject, handleExportProject]
  );

  return (
    <div
      onClick={handleChangeActiveProject}
      id={id}
      className={cn(
        "group w-full flex justify-between p-5 rounded-md bg-accent/50 cursor-pointer",
        "hover:bg-accent/80 transition-all duration-200",
        {
          "ring-2 ring-primary/50 backdrop-blur-xs": activeProjectId === id,
          "ring-0": activeProjectId !== id,
        }
      )}
    >
      <h3 className="capitalize text-lg font-semibold line-clamp-2 leading-relaxed">
        {name}
      </h3>
      <DropdownMenu open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={"iconXs"}
            className={cn(
              "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto",
              {
                "opacity-100": isOpen,
              }
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ThreeDotIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-0 w-fit min-w-40 flex flex-col [&>button]:justify-start [&>div]:cursor-pointer"
          align="end"
          onClick={(e) => e.stopPropagation()}
        >
          {menuList.map(({ id, label, Icon }) => (
            <DropdownMenuItem key={id} onClick={() => handleAction(id)}>
              <Icon /> {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProjectItem;
