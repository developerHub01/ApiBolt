import { memo, useCallback } from "react";
import { Table, TableBody } from "@/components/ui/table";
import VariableListHeader from "@/components/app/environment/environemnt-variables/VariableListHeader";
import VariableRow from "@/components/app/environment/environemnt-variables/VariableRow";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useEnvironments } from "@/context/environments/EnvironmentsProvider";
import Empty from "@/components/ui/empty";
import {
  deleteEnvironments,
  updateEnvironments,
} from "@/context/redux/request-response/thunks/environment";

const VariableList = memo(() => {
  const dispatch = useAppDispatch();
  const { environmentsListState, searchQuery } = useEnvironments();
  const environmentsList = useAppSelector(
    (state) => state.requestResponse.environmentsList ?? {}
  );

  const list = Object.values(environmentsListState ?? {}).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
            [key]: value,
          },
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
        animationSrc="./lottie/no-search-item-available.lottie"
        showFallback
        className="max-w-md mt-4 md:mt-10"
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
        className="max-w-md mt-4 md:mt-10"
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
