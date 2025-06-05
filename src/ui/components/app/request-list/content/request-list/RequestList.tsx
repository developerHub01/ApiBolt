import { memo, useMemo } from "react";
import RequestListItem from "@/components/app/request-list/content/request-list/RequestListItem";
import RequestListDeleteAlertDialog from "@/components/app/request-list/content/request-list/RequestListDeleteAlertDialog";
import { useAppSelector } from "@/context/redux/hooks";

const RequestList = memo(() => {
  const requestList = useAppSelector(
    (state) => state.requestResponse.requestList
  );

  const rootList = useMemo(() => {
    return Object.values(requestList)
      .filter((item) => !item.parent)
      .sort((a, b) => b.createdAt! - a.createdAt!);
  }, [requestList]);

  return (
    <div className="flex flex-col w-full py-1 gap-0.5">
      {rootList.map(({ id }, index) => (
        <RequestListItem key={id} id={id} lavel={0} index={index} />
      ))}
      <RequestListDeleteAlertDialog />
    </div>
  );
});

export default RequestList;
