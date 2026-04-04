import { cn } from "@/lib/utils";

interface LineIndicatorProps {
  level: number;
  isLast?: boolean;
}

const LineIndicator = ({ level, isLast }: LineIndicatorProps) => {
  if (!level) return null;

  return (
    <>
      {/* horizontal */}
      <span
        className="absolute bg-line w-1 h-0.5 left-0 -translate-x-full top-1/2 -translate-y-1/2"
        style={{
          width: `${level * 20}px`,
        }}
      />
      {/* vertical */}
      <span
        className={cn("absolute bg-line w-0.5 h-full left-0 top-0", {
          "h-1/2": isLast,
        })}
        style={{
          transform: `translate(-${level * 20}px)`,
        }}
      />
    </>
  );
};

export default LineIndicator;