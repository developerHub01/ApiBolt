import { memo, useCallback } from "react";
import type { BottomActionButtonInterface } from "@/types/request-list";
import { Trash2 as DeleteIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectSelectedTab } from "@/context/redux/request-response/request-response-selector";
import { handleChangeDeleteFolderOrRequestId } from "@/context/redux/request-response/request-response-slice";
import ActionButton from "@/components/app/collections/request-list/list-bottom-action/ActionButton";

const deleteButton: BottomActionButtonInterface = {
  id: "delete",
  label: "Delete Selected",
  Icon: DeleteIcon,
};

const DeleteButton = memo(() => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectSelectedTab);
  const handleClick = useCallback(
    () => dispatch(handleChangeDeleteFolderOrRequestId(id!)),
    [dispatch, id]
  );

  if (!id) return null;
  return <ActionButton {...deleteButton} onClick={handleClick} />;
});

export default DeleteButton;
