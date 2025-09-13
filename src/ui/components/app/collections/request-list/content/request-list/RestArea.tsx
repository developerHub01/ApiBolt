import { memo, useCallback, type DragEvent } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { moveRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";

const RestArea = memo(() => {
  const dispatch = useAppDispatch();
  
  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      dispatch(
        moveRequestOrFolder({
          requestId: draggedId,
        })
      );
    },
    [dispatch]
  );

  return (
    <div
      className="h-full flex flex-col w-full gap-0.5"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    />
  );
});

export default RestArea;
