import { useMemo } from "react";
import RequestListItem from "@/components/app/request-list/content/request-list/RequestListItem";
import RequestListDeleteAlertDialog from "@/components/app/request-list/content/request-list/RequestListDeleteAlertDialog";
import { useStore } from "@/store/store";

const RequestList = () => {
  const requestList = useStore((state) => state.requestList);

  const rootList = useMemo(() => {
    return Object.values(requestList).filter((item) => !item.parent);
  }, [requestList]);

  return (
    <div className="flex flex-col w-full py-1">
      {rootList.map(({ id }, index) => (
        <RequestListItem key={id} id={id} level={0} index={index} />
      ))}
      <RequestListDeleteAlertDialog />
    </div>
  );
};

export default RequestList;
