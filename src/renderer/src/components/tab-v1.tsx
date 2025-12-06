import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TabV1Props {
  list: Array<{
    id: string;
    label: string;
    isActive?: boolean;
    count?: number;
  }>;
  activeTab?: string;
  handleSelect: (id: string) => void;
  className?: string;
}

const TabV1 = ({ list, activeTab, handleSelect, className }: TabV1Props) => {
  return (
    <div className={cn("flex items-center gap-4 select-none", className)}>
      {list.map(({ id, label, isActive, count }) => (
        <Button
          key={id}
          size={"sm"}
          variant={"link"}
          className={cn(
            "px-0 border-b-[1.5px] rounded-none flex justify-between items-center",
            "hover:no-underline",
            {
              "border-primary text-primary": activeTab === id,
              "border-transparent text-foreground/70 hover:text-foreground":
                activeTab !== id,
            },
          )}
          onClick={() => handleSelect(id)}
        >
          {label}
          {Boolean(count) && <p className="text-primary">({count})</p>}
          {isActive && (
            <span className="inline-block size-1.5 rounded-full bg-green-500 mt-1"></span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default TabV1;
