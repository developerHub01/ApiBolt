import { memo, useCallback, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import VariableListHeader from "@/components/app/environment/environemnt-variables/VariableListHeader";
import VariableRow from "@/components/app/environment/environemnt-variables/VariableRow";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useEnvironments } from "@/context/environments/EnvironmentsProvider";
import Empty from "@/components/ui/empty";
import {
  deleteEnvironments,
  updateEnvironments
} from "@/context/redux/environments/thunks/environments";
import animationData from "@/assets/lottie/no-search-item-available.json";

const VariableList = memo(() => {
  const dispatch = useAppDispatch();
  const { environmentsListState, searchQuery } = useEnvironments();
  const environmentsList = useAppSelector(
    state => state.environments.environmentsList ?? {}
  );

  const list = useMemo(() => {
    const seen = new Set();

    return Object.values(environmentsListState ?? {})
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map(item => {
        if (item.variable && seen.has(item.variable)) {
          return { ...item, warning: true };
        } else {
          seen.add(item.variable);
          return { ...item, warning: false };
        }
      });
  }, [environmentsListState]);

  const handleChange = useCallback(
    (
      id: string,
      key: "isCheck" | "variable" | "type" | "value",
      value: string | boolean
    ) =>
      dispatch(
        updateEnvironments({
          id,
          payload: {
            [key]: value
          }
        })
      ),
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => dispatch(deleteEnvironments(id)),
    [dispatch]
  );

  /* search result not found */
  if (searchQuery && !list.length)
    return (
      <Empty
        label="No item matched"
        animationData={animationData}
        showFallback
        innerClassName="w-56"
      />
    );

  /* not variables found */
  if (!Object.keys(environmentsList).length)
    return (
      <Empty
        label="No variables available. Create one."
        description="Your currently have no variables. You can start by clicking on the '+ Add New Variable' button or from right side tab list."
        showFallback
      />
    );

  return (
    <Table className="border-b">
      <VariableListHeader />
      <TableBody>
        {list.map(data => (
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
