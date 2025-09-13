import { memo } from "react";
import ActionButton from "@/components/app/collections/request-list/list-bottom-action/ActionButton";
import DeleteButton from "@/components/app/collections/request-list/list-bottom-action/DeleteButton";
import useRequestListAction from "@/hooks/request-response/request-list/use-request-list-action";

const ListBottomAction = memo(() => {
  const { list, handleAction } = useRequestListAction();

  return (
    <div className="flex items-center justify-end gap-1.5 px-2 py-1.5 border-t-2">
      {list.map((item) => (
        <ActionButton key={item.id} {...item} onClick={handleAction} />
      ))}
      <DeleteButton />
    </div>
  );
});

export default ListBottomAction;
