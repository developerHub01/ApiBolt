import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestFolderDescriptionActiveTab } from "@/context/redux/request-response/request-response-selector";
import { handleChangeFolderDescriptionActiveTab } from "@/context/redux/request-response/request-response-slice";
import { cn } from "@/lib/utils";
import type { TRequestFolderDescriptionTab } from "@/types/request-response.types";
import {
  SquareSplitHorizontal as SplitLayoutIcon,
  Code as MarkdownIcon,
  GalleryThumbnails as PreviewIcon,
  type LucideIcon,
} from "lucide-react";

const buttonList: Array<{
  id: TRequestFolderDescriptionTab;
  label: string;
  Icon?: LucideIcon;
}> = [
  {
    id: "markdown",
    label: "Markdown",
    Icon: MarkdownIcon,
  },
  {
    id: "preview",
    label: "Preview",
    Icon: PreviewIcon,
  },
  {
    id: "split",
    label: "Split",
    Icon: SplitLayoutIcon,
  },
];

const DescriptionTabs = memo(() => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectRequestFolderDescriptionActiveTab);

  const handleChangeTab = useCallback(
    (id: TRequestFolderDescriptionTab) =>
      dispatch(
        handleChangeFolderDescriptionActiveTab({
          value: id,
        })
      ),
    [dispatch]
  );

  return (
    <div className="flex">
      <div className="flex items-center gap-1.5 border-b">
        {buttonList.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={cn(
              "border-b-2 px-3 py-1 cursor-pointer hover:bg-accent rounded-t-md w-32 flex items-center justify-center gap-1.5",
              {
                "border-b-primary": id === activeTab,
                "border-b-transparent": id !== activeTab,
              }
            )}
            onClick={() => handleChangeTab(id)}
          >
            {Icon && <Icon size={20} />}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default DescriptionTabs;
