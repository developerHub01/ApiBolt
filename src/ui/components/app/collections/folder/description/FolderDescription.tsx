import { memo, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/context/redux/hooks";
import DescriptionEditor from "@/components/app/collections/folder/description/DescriptionEditor";
import DescriptionPreview from "@/components/app/collections/folder/description/DescriptionPreview";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const buttonList: Array<{
  id: TTab;
  label: string;
}> = [
  {
    id: "markdown",
    label: "Markdown",
  },
  {
    id: "preview",
    label: "Preview",
  },
];

type TTab = "markdown" | "preview";

const FolderDescription = memo(() => {
  const description =
    useAppSelector(
      (state) =>
        state.requestResponse.folderDescription[
          state.requestResponse.selectedTab!
        ]
    ) ?? "";
  const [activeTab, setActiveTab] = useState<TTab>("markdown");
  const handleChangeTab = (id: TTab) => setActiveTab(id);

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 gap-4">
      <div className="flex items-center gap-1.5 px-2">
        {buttonList.map(({ id, label }) => (
          <button
            key={id}
            className={cn(
              "border-b-2 px-3 py-1 cursor-pointer hover:bg-accent rounded-t-md",
              {
                "border-b-primary": id === activeTab,
                "border-b-transparent": id !== activeTab,
              }
            )}
            onClick={() => handleChangeTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <ScrollArea
        className={cn(
          "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full relative bg-background/10 rounded-md border",
          "backdrop-blur-xs"
        )}
      >
        {activeTab === "markdown" ? (
          <DescriptionEditor content={description} />
        ) : (
          <DescriptionPreview content={description} />
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
});

export default FolderDescription;
