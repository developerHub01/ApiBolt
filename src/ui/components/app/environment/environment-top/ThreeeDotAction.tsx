import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { deleteAllEnvironments } from "@/context/redux/environments/thunks/environments";
import {
  EllipsisVertical as ThreeDotIcon,
  Upload as ExportIcon,
  FileDown as ImportIcon,
  Trash2 as DeleteIcon,
  type LucideIcon,
} from "lucide-react";
import { selectEnvironmentsList } from "@/context/redux/environments/selectors/environments";

const listItemToHide = new Set(["export", "delete"]);

const ThreeeDotAction = () => {
  const dispatch = useAppDispatch();
  const haveListItem = useAppSelector((state) =>
    Boolean(Object.keys(selectEnvironmentsList(state) ?? {}).length)
  );

  const handleDeleteAll = useCallback(() => {
    dispatch(deleteAllEnvironments());
  }, [dispatch]);

  const actionButtonList: Array<{
    id: string;
    label: string;
    Icon: LucideIcon;
    onClick?: () => void;
  }> = useMemo(
    () =>
      [
        {
          id: "import",
          label: "Import",
          Icon: ImportIcon,
        },
        {
          id: "export",
          label: "Export",
          Icon: ExportIcon,
        },
        {
          id: "delete",
          label: "Delete all",
          Icon: DeleteIcon,
          onClick: handleDeleteAll,
        },
      ].filter((item /* if no list item then dont hide listItemToHides */) =>
        haveListItem ? true : !listItemToHide.has(item.id)
      ),
    [handleDeleteAll, haveListItem]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <ThreeDotIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 flex flex-col gap-1 min-w-40 [&>button]:w-full [&>button]:justify-start"
        align="end"
      >
        {actionButtonList.map((item) => (
          <ActionButton key={item.id} {...item} />
        ))}
      </PopoverContent>
    </Popover>
  );
};

interface ActionButtonProps extends React.ComponentProps<"button"> {
  Icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const ActionButton = memo(({ Icon, label, onClick }: ActionButtonProps) => {
  return (
    <Button
      variant={"ghost"}
      {...{
        onClick: onClick,
      }}
      className="w-full justify-start"
    >
      <Icon /> {label}
    </Button>
  );
});

export default ThreeeDotAction;
