import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const UrlWrapper = memo(({ className = "", children }: Props) => {
  return (
    <>
      <p className="text-foreground text-sm select-none">Url</p>
      <ScrollArea className="flex-1 w-full min-h-0 h-full [&>div>div]:h-full">
        <div className={cn("w-full flex flex-wrap gap-2 pt-1 pb-5", className)}>
          {children}
        </div>
      </ScrollArea>
    </>
  );
});

export default UrlWrapper;
