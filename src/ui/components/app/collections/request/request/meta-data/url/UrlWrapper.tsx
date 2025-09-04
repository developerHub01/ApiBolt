import { ScrollArea } from "@/components/ui/scroll-area";
import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

const UrlWrapper = memo(({ children }: Props) => {
  return (
    <div className="h-full flex flex-col gap-3 justify-center">
      <p className="text-foreground text-sm select-none">Url</p>
      <ScrollArea className="flex-1 overflow-hidden w-full min-h-0 h-full [&>div>div]:h-full">
        <div className="w-full flex flex-wrap gap-2 pt-1 pb-5">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
});

export default UrlWrapper;
