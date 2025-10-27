import type { ComponentProps } from "react";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface KeyboardCellProps {
  children: React.ReactNode;
}

const KeyboardCell = ({
  children,
  className = "",
  ...props
}: KeyboardCellProps & ComponentProps<"td">) => {
  return (
    <TableCell
      className={cn(
        "font-normal whitespace-normal wrap-break-word break-all min-h-16 px-3 py-2",
        className
      )}
      {...props}
    >
      {children}
    </TableCell>
  );
};

export default KeyboardCell;
