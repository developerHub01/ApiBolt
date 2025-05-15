import { useMemo } from "react";
import { useRequestList } from "@/context/request-list/RequestListProvider";
import RequestListItem from "@/components/app/request-list/content/request-list/RequestListItem";
import RequestListDeleteAlertDialog from "@/components/app/request-list/content/request-list/RequestListDeleteAlertDialog";

const RequestList = () => {
  const { listData } = useRequestList();

  const rootList = useMemo(() => {
    return Object.values(listData).filter((item) => !item.parent);
  }, [listData]);

  return (
    <div>
      {rootList.map(({ id }) => (
        <RequestListItem key={id} id={id} lavel={0} />
      ))}
      <RequestListDeleteAlertDialog />
    </div>
  );
};

export default RequestList;
