import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeFolderDescriptionActiveTab } from "@/context/redux/request-response/request-response-slice";
import { cn } from "@/lib/utils";
import type { TRequestFolderDescriptionTab } from "@/types/request-response.types";
import {
  SquareSplitHorizontal as SplitLayoutIcon,
  Code as MarkdownIcon,
  GalleryThumbnails as PreviewIcon,
  KeyRound as AuthorizationIcon,
  type LucideIcon,
} from "lucide-react";
import { selectRequestFolderDescriptionActiveTab } from "@/context/redux/request-response/selectors/folder";

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
  {
    id: "authorization",
    label: "Authorization",
    Icon: AuthorizationIcon,
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
      <div className="w-full flex items-center border-b">
        {buttonList.map(({ id, label, Icon }, index) => (
          <button
            key={id}
            className={cn(
              "flex-1 border-b-2 px-3 py-1 cursor-pointer hover:bg-accent w-full flex items-center justify-center gap-2",
              {
                "border-b-primary bg-accent": id === activeTab,
                "border-b-transparent": id !== activeTab,
                "rounded-tl-md": !index,
                "rounded-tr-md": index === buttonList.length - 1,
              }
            )}
            onClick={() => handleChangeTab(id)}
          >
            {Icon && <Icon size={18} />}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default DescriptionTabs;
