import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EllipsisVertical as ThreeDotIcon,
  Download as ExportIcon,
  FileDown as ImportIcon,
  BrushCleaning as ClearIcon,
  type LucideIcon,
} from "lucide-react";

const actionButtonList = [
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
    id: "clear",
    label: "Clear",
    Icon: ClearIcon,
  },
];

const ThreeeDotAction = () => {
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
}

const ActionButton = ({ Icon, label }: ActionButtonProps) => {
  return (
    <Button variant={"ghost"}>
      <Icon /> {label}
    </Button>
  );
};

export default ThreeeDotAction;
