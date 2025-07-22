import { memo, useMemo } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/RequestListItem";
import RequestListDeleteAlertDialog from "@/components/app/collections/request-list/content/request-list/RequestListDeleteAlertDialog";
import { useAppSelector } from "@/context/redux/hooks";
import Empty from "@/components/ui/empty";

const RequestList = memo(() => {
  const requestList = useAppSelector(
    (state) => state.requestResponse.requestList
  );

  const rootList = useMemo(() => {
    return Object.values(requestList)
      .filter((item) => !item.parentId)
      .sort((a, b) => b.createdAt! - a.createdAt!);
  }, [requestList]);

  return (
    <div className="flex flex-col w-full py-1 gap-0.5">
      {rootList.map(({ id }, index) => (
        <RequestListItem key={id} id={id} lavel={0} index={index} />
      ))}
      {Boolean(rootList?.length) || <EmptyBox />}
      <RequestListDeleteAlertDialog />
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

export default RequestList;
