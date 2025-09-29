import { memo } from "react";
import Empty from "@/components/ui/empty";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHttpStatusCodeDetailsPartial } from "@/context/redux/http-status/selectors/http-status";
import { cn } from "@/lib/utils";
import SettingHttpEditableContent from "@/components/app/setting/content/http-status/SettingHttpEditableContent";

interface SettingHttpSearchResultProps {
  value: string;
}

const SettingHttpSearchResult = memo(
  ({ value }: SettingHttpSearchResultProps) => {
    const details = useAppSelector(selectHttpStatusCodeDetailsPartial(value));

    if (!details)
      return (
        <Empty
          label="No item matched"
          animationSrc="./lottie/no-search-item-available.lottie"
          showFallback
          innerClassName="w-56"
        />
      );

    return (
      <div className="w-full flex flex-col gap-2">
        {details.map((detail) => (
          <Table
            key={detail.code}
            className="border rounded-md leading-relaxed"
          >
            <TableBody>
              <TableRow
                className={cn(
                  "[&>td]:border-r [&>td]:last:border-r-0",
                  "focus-within:bg-accent/60 duration-75 transition-colors"
                )}
              >
                <TableCell className="font-medium whitespace-break-spaces w-32">
                  Code
                </TableCell>
                <TableCell className="whitespace-break-spaces">
                  {detail.code}
                </TableCell>
              </TableRow>
              <TableRow
                className={cn(
                  "[&>td]:border-r [&>td]:last:border-r-0",
                  "focus-within:bg-accent/60 duration-75 transition-colors"
                )}
              >
                <TableCell className="font-medium whitespace-break-spaces w-32">
                  Reason
                </TableCell>
                <TableCell className="whitespace-break-spaces">
                  <SettingHttpEditableContent
                    type="reason"
                    code={detail.code}
                    editedValue={detail.editedReason}
                    value={detail.reason}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                className={cn(
                  "[&>td]:border-r [&>td]:last:border-r-0",
                  "focus-within:bg-accent/60 duration-75 transition-colors"
                )}
              >
                <TableCell className="font-medium whitespace-break-spaces w-32">
                  Description
                </TableCell>
                <TableCell className="whitespace-break-spaces">
                  <SettingHttpEditableContent
                    type="description"
                    code={detail.code}
                    editedValue={detail.editedDescription}
                    value={detail.description}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
    );
  }
);

export default SettingHttpSearchResult;
