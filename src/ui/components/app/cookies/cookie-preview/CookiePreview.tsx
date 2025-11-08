import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { CookieInterface } from "@/types/cookies.types";
import { Button } from "@/components/ui/button";
import { Pencil as EditIcon } from "lucide-react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeIsEditing } from "@/context/redux/cookies/cookies-slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";

interface Props {
  details: CookieInterface;
}

const CookiePreview = memo(({ details }: Props) => {
  const dispatch = useAppDispatch();
  const handleToggleEdit = () => dispatch(handleChangeIsEditing());

  return (
    <Table className="w-full border table-fixed overflow-hidden relative">
      <TableHeader className="font-bold bg-secondary/80">
        <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
          <TableHead className="w-48 whitespace-normal p-3">Key</TableHead>
          <TableHead className="whitespace-normal px-0">
            <div className="flex justify-between items-center p-3">
              <p>Value</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"secondary"}
                    size={"iconXs"}
                    onClick={handleToggleEdit}
                  >
                    <EditIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end" side="bottom" variant={"secondary"}>
                  <p>Edit Cookie</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(details).map(([key, value]) => (
          <TableRow
            key={key}
            className={cn(
              "[&>td]:border-r [&>td]:last:border-r-0",
              "focus-within:bg-accent/60 duration-75 transition-colors"
            )}
          >
            <TableCell
              className={cn(
                "font-medium whitespace-normal wrap-break-word break-all min-h-16 capitalize p-3"
              )}
            >
              {key}
            </TableCell>
            <TableCell
              className={cn(
                "font-medium whitespace-normal wrap-break-word break-all min-h-16 p-3"
              )}
            >
              {String(value ?? "")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default CookiePreview;
