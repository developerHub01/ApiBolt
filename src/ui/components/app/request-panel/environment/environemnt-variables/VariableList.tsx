import { Table, TableBody } from "@/components/ui/table";
import VariableListHeader from "@/components/app/request-panel/environment/environemnt-variables/VariableListHeader";
import VariableRow from "@/components/app/request-panel/environment/environemnt-variables/VariableRow";

const VariableList = () => {
  return (
    <Table>
      <VariableListHeader />
      <TableBody>
        <VariableRow />
      </TableBody>
    </Table>
  );
};

export default VariableList;
