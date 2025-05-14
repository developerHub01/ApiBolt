import { TableRow } from "@/components/ui/table";
import VariableCell from "@/components/app/request-panel/environment/environemnt-variables/VariableCell";
import CheckCell from "@/components/app/request-panel/environment/environemnt-variables/CheckCell";

const VariableRow = () => {
  return (
    <TableRow>
      <CheckCell />
      <VariableCell />
      <VariableCell />
      <VariableCell />
    </TableRow>
  );
};

export default VariableRow;
