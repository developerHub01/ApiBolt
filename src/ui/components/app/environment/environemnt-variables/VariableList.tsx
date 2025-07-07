import { memo, useCallback } from "react";
import { Table, TableBody } from "@/components/ui/table";
import VariableListHeader from "@/components/app/environment/environemnt-variables/VariableListHeader";
import VariableRow from "@/components/app/environment/environemnt-variables/VariableRow";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  deleteEnvironments,
  updateEnvironments,
} from "@/context/redux/request-response/request-response-thunk";
import { useEnvironments } from "@/context/environments/EnvironmentsProvider";

const VariableList = memo(() => {
  const dispatch = useAppDispatch();
  const { environmentsListState } = useEnvironments();

  const list = Object.values(environmentsListState ?? {}).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleChange = useCallback(
    (
      id: string,
      key: "isCheck" | "variable" | "type" | "value",
      value: string | boolean
    ) => {
      dispatch(
        updateEnvironments({
          id,
          payload: {
            [key]: value,
          },
        })
      );
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteEnvironments(id));
    },
    [dispatch]
  );

  return (
    <Table>
      <VariableListHeader />
      <TableBody>
        {list.map((data) => (
          <VariableRow
            key={data.id}
            {...data}
            onChange={(...rest) => handleChange(data.id, ...rest)}
            onDelete={() => handleDelete(data.id)}
          />
        ))}
      </TableBody>
    </Table>
  );
});

export default VariableList;
