import { memo, useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SettingItem from "@/components/app/setting/content/SettingItem";
import { cn } from "@/lib/utils";
import SettingHttpEditableContent from "@/components/app/setting/content/http-status/SettingHttpEditableContent";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHttpStatusList } from "@/context/redux/http-status/selectors/http-status";
import type { HttpStatusInterface } from "@/types/http-status.type";

const statusSectionList = [
  "information",
  "success",
  "redirection",
  "client error",
  "server error",
];

const statusSectionListObj: Array<{
  type: string;
  value: Record<string, HttpStatusInterface & { code: string }>;
}> = statusSectionList.map((item) => ({
  type: item,
  value: {},
}));

const SettingHttpList = memo(() => {
  const statusList = useAppSelector(selectHttpStatusList);

  const list = useMemo(() => {
    const categorizedList = statusSectionListObj;
    Object.keys(statusList).forEach((code) => {
      const index = Number(code[0]) - 1;
      categorizedList[index].value[code] = {
        code,
        ...statusList[code],
      };
    });
    return categorizedList;
  }, [statusList]);

  return (
    <div className="w-full flex flex-col border rounded-md selection:bg-primary/90 selection:text-primary-foreground">
      <Accordion type="single" collapsible className="w-full">
        {list.map(({ type, value }) => (
          <SettingItem
            key={type}
            id={type}
            title={type}
            triggerClassName="capitalize px-3"
            contentClassName="px-3"
          >
            <Table className="border rounded-md table-auto">
              <TableHeader>
                <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
                  <TableHead className="w-14">Code</TableHead>
                  <TableHead className="w-36">Reason</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(value).map(
                  ({
                    code,
                    reason,
                    editedReason,
                    description,
                    editedDescription,
                  }) => (
                    <TableRow
                      key={code}
                      className={cn(
                        "[&>td]:border-r [&>td]:last:border-r-0",
                        "focus-within:bg-accent/60 duration-75 transition-colors"
                      )}
                    >
                      <TableCell className="font-medium whitespace-break-spaces w-14">
                        <p>{code}</p>
                      </TableCell>
                      <TableCell className="whitespace-break-spaces w-36">
                        <SettingHttpEditableContent
                          type="reason"
                          code={code}
                          editedValue={editedReason}
                          value={reason}
                        />
                      </TableCell>
                      <TableCell className="whitespace-break-spaces">
                        <SettingHttpEditableContent
                          type="description"
                          code={code}
                          editedValue={editedDescription}
                          value={description}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </SettingItem>
        ))}
      </Accordion>
    </div>
  );
});

export default SettingHttpList;
