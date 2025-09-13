import React, { memo, useCallback, type DragEvent } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { moveRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";

interface Props {
  children: React.ReactNode;
}

const RestArea = memo(({ children }: Props) => {
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
      className="h-full flex flex-col w-full gap-0.5 p-0"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {children ? children : <div className="h-10" />}
    </div>
  );
});

export default RestArea;
