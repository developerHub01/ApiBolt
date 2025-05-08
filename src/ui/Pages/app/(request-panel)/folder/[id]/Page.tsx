import FolderDescription from "@/components/app/request-panel/folder/description/FolderDescription";
import FolderTitle from "@/components/app/request-panel/folder/FolderTitle";
import { ScrollArea } from "@/components/ui/scroll-area";

const FolderPage = () => {
  return (
    <ScrollArea className="w-full h-full [&>div>div]:min-h-full">
      <div className="pt-5 flex flex-col gap-4 w-full h-full p-2.5 max-w-3xl mx-auto">
        <FolderTitle />
        <FolderDescription />
      </div>
    </ScrollArea>
  );
};

export default FolderPage;
