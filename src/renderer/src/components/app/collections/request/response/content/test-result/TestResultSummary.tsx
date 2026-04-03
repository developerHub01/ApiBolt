import { memo, useMemo } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TestResultSummaryPayloadInterface } from "@shared/types/test-script.types";

interface Props {
  summary: TestResultSummaryPayloadInterface["summary"];
}

const TestResultSummary = memo(({ summary }: Props) => {
  const summaryContent = useMemo(
    () => ({
      total: summary.total,
      tests: summary.tests,
      prints: summary.prints,
      success: summary.passed,
      failed: summary.failed,
      "success rate": `${summary.successRate}%`,
    }),
    [summary],
  );

  return (
    <Table className="w-full h-full border select-text">
      <TableBody className="[&>tr>td]:border-r [&>tr>td]:last:border-r-0">
        {Object.entries(summaryContent).map(([key, value]) => (
          <TableRow key={key} className="wrap-break-word whitespace-pre-wrap">
            <TableCell className="whitespace-normal wrap-break-word select-text font-bold first-letter:uppercase">
              {key}
            </TableCell>
            <TableCell className="whitespace-normal wrap-break-word select-text">
              {value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default TestResultSummary;
