import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CookieField from "@/components/app/cookies/cookie-editor/CookieField";
import type { CookieInterface } from "@/types/cookies.types";
import { cn } from "@/lib/utils";
import { DEFAULT_COOKIE_DETAILS } from "@/context/redux/cookies/cookies-slice";

interface Props {
  details: CookieInterface;
  onChange: (payload: {
    key: keyof CookieInterface;
    value: CookieInterface[keyof CookieInterface];
  }) => void;
  bottomAction?: React.ReactNode;
  nonEditableField?: Set<string>;
}

const CookieEditor = memo(
  ({
    details,
    onChange,
    bottomAction,
    nonEditableField = new Set(["creation", "lastAccessed"]),
  }: Props) => {
    return (
      <div className="flex flex-col gap-3" key={"add-cookie"}>
        <Table className="w-full border table-fixed overflow-hidden">
          <TableHeader className="bg-secondary font-bold">
            <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
              <TableHead className="w-48 whitespace-normal p-3">Key</TableHead>
              <TableHead className="whitespace-normal p-3">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(
              Object.keys(DEFAULT_COOKIE_DETAILS) as Array<
                keyof CookieInterface
              >
            ).map((key) => {
              const value = details[key] ?? DEFAULT_COOKIE_DETAILS[key];
              return (
                <TableRow
                  key={key}
                  className={cn(
                    "[&>td]:border-r [&>td]:last:border-r-0",
                    "focus-within:bg-accent/60 duration-75 transition-colors"
                  )}
                >
                  <TableCell className="font-bold whitespace-normal break-words break-all capitalize p-3">
                    {key}
                  </TableCell>
                  <TableCell className="font-medium whitespace-normal break-words break-all p-3">
                    {!nonEditableField.has(key) ? (
                      <CookieField
                        fieldKey={key as keyof CookieInterface}
                        value={value}
                        onChange={(value) =>
                          onChange({
                            key,
                            value,
                          })
                        }
                      />
                    ) : (
                      String(value ?? "")
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {bottomAction}
      </div>
    );
  }
);

export default CookieEditor;
