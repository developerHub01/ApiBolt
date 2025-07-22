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
import Empty from "@/components/ui/empty";

const VariableList = memo(() => {
  const dispatch = useAppDispatch();
  const { environmentsListState, searchQuery } = useEnvironments();

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

  if (searchQuery && !list.length)
    return (
      <Empty
        label="No item matched"
        animationSrc="./lottie/no-search-item-available.lottie"
        showFallback
        className="border-0"
        fallbackClassName="w-52"
      />
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
