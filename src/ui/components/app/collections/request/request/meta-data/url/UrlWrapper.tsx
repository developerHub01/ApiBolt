import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  children: React.ReactNode;
}

const UrlWrapper = memo(({ children }: Props) => {
  return (
    <div className="h-full flex flex-col gap-3 justify-center">
      <p className="text-foreground text-sm select-none">Url</p>
      <ScrollArea className="flex-1 w-full min-h-0 h-full [&>div>div]:h-full">
        {children}
      </ScrollArea>
    </div>
  );
});

export default UrlWrapper;
