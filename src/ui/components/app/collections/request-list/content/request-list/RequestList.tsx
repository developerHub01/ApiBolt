import { memo, useCallback, useMemo, type DragEvent } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/RequestListItem";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import Empty from "@/components/ui/empty";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import { selectRequestOrFolderList } from "@/context/redux/request-response/request-response-selector";
import { moveRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";

const RequestList = memo(() => {
  const requestList = useAppSelector(selectRequestOrFolderList);

  const rootList = useMemo(() => {
    return Object.values(requestList)
      .filter((item) => !item.parentId)
      .sort((a, b) => b.createdAt! - a.createdAt!);
  }, [requestList]);

  return (
    <div className="h-full flex flex-col w-full gap-0.5">
      <AutoScrollActiveWrapper>
        {rootList.map(({ id }, index) => (
          <RequestListItem
            key={id}
            id={id}
            lavel={0}
            isLastChild={index === rootList.length - 1}
          />
        ))}
      </AutoScrollActiveWrapper>
      <RestArea />
      {Boolean(rootList?.length) || <EmptyBox />}
    </div>
  );
});

const EmptyBox = memo(() => (
  <div className="w-full p-2">
    <Empty
      label="No request available. Create one."
      description="Your currently request list is empty. You can start by clicking on the '+' add button or from right side tab list."
      showFallback
    />
  </div>
));

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

export default RequestList;
