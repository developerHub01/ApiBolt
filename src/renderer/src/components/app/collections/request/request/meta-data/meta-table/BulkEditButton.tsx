import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleMetaBulkEditOpen } from "@/context/redux/request-response/request-response-slice";
import { selectMetaBulkEditOpen } from "@/context/redux/request-response/selectors/meta-request";
import { useRequestMetaTable } from "@/context/collections/request/RequestMetaTableProvider";

const BulkEditButton = memo(() => {
  const { showBulkEdit } = useRequestMetaTable();
  const dispatch = useAppDispatch();
  const isBulkEditorOpen = useAppSelector(selectMetaBulkEditOpen);

  const handleToggleBulkEdit = useCallback(
    () => dispatch(handleToggleMetaBulkEditOpen()),
    [dispatch],
  );

  if (!showBulkEdit) return null;

  return (
    <Button
      variant={"secondary"}
      size={"xs"}
      className="ml-auto"
      onClick={handleToggleBulkEdit}
    >
      {isBulkEditorOpen ? "Key-Value Edit" : "Bulk Edit"}
    </Button>
  );
});

export default BulkEditButton;
