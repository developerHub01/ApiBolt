import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

const DescriptionWrapper = ({ children }: Props) => {
  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full relative bg-background/10 rounded-md border",
        "backdrop-blur-xs"
      )}
    >
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DescriptionWrapper;
