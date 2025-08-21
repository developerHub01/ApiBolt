import useGetTableData from "@/hooks/request-response/meta-table/use-get-table-data";

export const useCellListToShow = () => {
  const { showColumn } = useGetTableData();

  const columns = ["key"];

  if (showColumn?.value) columns.push("value");
  if (showColumn?.description) columns.push("description");

  return columns;
};
